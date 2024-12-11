import React, { useState } from "react";
import { useProjects } from "../services/query";

export default function Projects() {
  const [page, setPage] = useState(1);
  const { data, isPending, error, isError, isPlaceholderData, isFetching } =
    useProjects(page);
  return (
    <div style={{ border: "1px white solid" }}>
      {isPending ? (
        <div>loading...</div>
      ) : isError ? (
        <div>Error: {error.message}</div>
      ) : (
        <div>
          {data.map((project) => {
            return <p key={project.id}>{project.name}</p>;
          })}
        </div>
      )}
      <span>Current page: {page}</span>
      <button onClick={() => setPage((old) => Math.max(old - 1, 0))}>
        {"<"}
      </button>
      {"   "}
      <button
        onClick={() => {
          if (!isPlaceholderData) {
            setPage((old) => Math.max(old + 1, 0));
          }
        }}
        disabled={isPlaceholderData}
      >
        {">"}
      </button>
      {isFetching ? <>Loading</> : null}
    </div>
  );
  return <div>Project</div>;
}
