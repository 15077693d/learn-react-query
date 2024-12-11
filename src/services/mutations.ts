import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTodo, deleteTodo, updateTodo } from "./api";
import { Todo } from "../types/todo";

export function useCreateTodo() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Todo) => createTodo(data),
    onMutate: () => {
      console.log("onMutate: before mutationFn");
    },
    onError: () => {
      console.log("onError");
    },
    onSettled: async (_, error) => {
      console.log("onSettled: after error or success");
      if (error) {
        console.log("error");
      } else {
        await queryClient.invalidateQueries({ queryKey: ["todos"] });
      }
    },
    onSuccess: () => {
      console.log("onSuccess");
    },
  });
}

export const useUpdateTodo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Todo) => updateTodo(data),
    onMutate: () => {
      console.log("onMutate: before mutationFn");
    },
    onError: () => {
      console.log("onError");
    },
    onSettled: async (_, error, variables) => {
      console.log("onSettled: after error or success");
      if (error) {
        console.log("error");
      } else {
        await queryClient.invalidateQueries({
          queryKey: ["todo", { id: variables.id }],
        });
      }
    },
    onSuccess: () => {
      console.log("onSuccess");
    },
  });
};

export const useDeleteTodo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => deleteTodo(id),
    onMutate: () => {
      console.log("onMutate: before mutationFn");
    },
    onError: () => {
      console.log("onError");
    },
    onSettled: async (_, error) => {
      console.log("onSettled: after error or success");
      if (error) {
        console.log("error");
      } else {
        await queryClient.invalidateQueries({
          queryKey: ["todos"],
        });
      }
    },
    onSuccess: () => {
      console.log("onSuccess");
    },
  });
};
