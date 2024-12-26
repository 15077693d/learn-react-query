import "@tanstack/react-query";

interface Meta {
  queryMeta: { isPersist?: boolean };
  mutationMeta: { isPersist?: boolean };
}

declare module "@tanstack/react-query" {
  interface Register extends Meta {}
}
