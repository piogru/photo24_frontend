import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { render } from "@testing-library/react";
import {
  createMemoryRouter,
  RouteObject,
  RouterProvider,
} from "react-router-dom";
import TestOptions from "./types/testOptions";

export function renderWithQueryClient(ui: React.ReactElement) {
  const queryCache = new QueryCache();
  const queryClient = new QueryClient({
    queryCache,
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  const { rerender, ...result } = render(
    <QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>,
  );

  return {
    ...result,
    rerender: (rerenderUi: React.ReactElement) =>
      rerender(
        <QueryClientProvider client={queryClient}>
          {rerenderUi}
        </QueryClientProvider>,
      ),
  };
}

export function renderWithProviders(
  ui: React.ReactElement,
  { route = "/", url = route, loader }: TestOptions = {},
) {
  const queryCache = new QueryCache();
  const queryClient = new QueryClient({
    queryCache,
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  const routeObj: RouteObject = { path: route, element: ui };
  if (loader) {
    routeObj.loader = loader(queryClient);
  }

  const router = createMemoryRouter([routeObj], {
    initialEntries: ["/", url],
  });
  const { rerender, ...result } = render(
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />,
    </QueryClientProvider>,
  );

  return {
    ...result,
    rerender: () =>
      rerender(
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
        </QueryClientProvider>,
      ),
  };
}
