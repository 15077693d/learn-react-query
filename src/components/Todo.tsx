import React from "react";
import { useTodos, useTodosIds } from "../services/query";
import { useIsFetching } from "@tanstack/react-query";
import {
  useCreateTodo,
  useDeleteTodo,
  useUpdateTodo,
} from "../services/mutations";
import { SubmitHandler, useForm } from "react-hook-form";
import { Todo } from "../types/todo";

export default function Todos() {
  const todosIdsQuery = useTodosIds();
  const isFetching = useIsFetching();
  const todosQueries = useTodos(todosIdsQuery.data);
  const createTodoMutation = useCreateTodo();
  const updateTodoMutation = useUpdateTodo();
  const deleteTodoMutation = useDeleteTodo();

  const { register, handleSubmit } = useForm<Todo>();
  const handleCreateTodoSubmit: SubmitHandler<Todo> = (data) => {
    createTodoMutation.mutate(data);
  };
  const handleDone = (data: Todo) => {
    updateTodoMutation.mutate({ ...data, checked: true });
  };
  const handleDelete = async (id: number) => {
    await deleteTodoMutation.mutateAsync(id);
    console.log("cool!");
  };

  return (
    <div style={{ border: "1px white solid" }}>
      Global isFetching: {isFetching}
      <div style={{ display: "flex", gap: 30 }}>
        <div>
          todosIdsQuery
          <br /> fetchStatus:{todosIdsQuery.fetchStatus}
          <br />
          status:{todosIdsQuery.status}
          <br />
          <br />
          {todosIdsQuery?.data?.map((id) => (
            <div key={id}>id: {id}</div>
          ))}
        </div>
        <form onSubmit={handleSubmit(handleCreateTodoSubmit)}>
          <h4>New todo:</h4>
          <br />
          <input placeholder="title" {...register("title")} />
          <br />
          <input placeholder="description" {...register("description")} />
          <br />
          <input
            type="submit"
            disabled={createTodoMutation.isPending}
            value={createTodoMutation.isPending ? "waiting..." : "create"}
          />
        </form>
        <div>
          todosQuery
          <br />
          {todosQueries?.map(({ fetchStatus, status, data }) => (
            <div key={data?.id}>
              fetchStatus:{fetchStatus} status:{status}
              {JSON.stringify(data)}
              <button
                disabled={updateTodoMutation.isPending || data?.checked}
                onClick={() => data && handleDone(data)}
              >
                {data?.checked ? "Done" : "Mark as done"}
              </button>
              <button onClick={() => data && handleDelete(data.id)}>
                delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
