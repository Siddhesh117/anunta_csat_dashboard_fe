import { createBrowserRouter, Outlet, useRouteError } from "react-router-dom";

/* general */
import App from "../components/App";
import { LocalStorageConstants } from "../constants/ApplicationConstants/LocalStorageConstants";
import { useEffect } from "react";
import { RouteConstants } from "../constants/ApplicationConstants/RouteConstants";
import Error400Page from "../pages/Error400Page";
import ReportPage from "../pages/ReportPage";
import DashboardPage from "../pages/DashboardPage";
import GenAIMIS from "../components/GenAIMIS";
import TopNUnsatisfiedUserList from "../components/TopNUnsatisfiedUserList";

const ErrorPage = () => {
  let error = useRouteError();

  useEffect(() => {
    if (error instanceof Error) {
      localStorage.setItem(LocalStorageConstants.ERROE_MESSAGE, error.message);
    }
    window.location.href = RouteConstants.ERROR_PAGE;
  }, [error]);

  return <></>;
};

const routes = [
  {
    path: RouteConstants.ROOT_PAGE,
    element: (
      <App>
        <DashboardPage />
      </App>
    ),
    errorElement: <ErrorPage />,
    index: true
  },
  {
    path: RouteConstants.ERROR_PAGE,
    element: <Error400Page />
  },
  {
    path: "/*",
    errorElement: <ErrorPage />,
    element: (
      <App>
        <Outlet />
      </App>
    ),
    children: [
      {
        path: "report",
        element: <ReportPage />
      },
      {
        path: "gen-ai",
        element: <GenAIMIS />
      },
      {
        path: "unsatisfied-users",
        element: <TopNUnsatisfiedUserList />
      }
    ]
  }
];

const AppRouter = createBrowserRouter(routes);

export default AppRouter;
