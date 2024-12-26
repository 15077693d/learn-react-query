import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
const queryClient = new QueryClient({
  defaultOptions: {
    queries: { retry: 5, retryDelay: 1000, refetchOnWindowFocus: false },
  },
});
const localStoragePersister = createSyncStoragePersister({
  storage: window.localStorage,
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{
        persister: localStoragePersister,
        maxAge: Infinity,
        dehydrateOptions: {
          shouldDehydrateQuery: (query) => {
            return query.meta?.isPersist || false;
          },
        },
      }}
    >
      <App />
      <ReactQueryDevtools initialIsOpen={false} />
    </PersistQueryClientProvider>
  </StrictMode>
);
