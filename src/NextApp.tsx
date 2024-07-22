import "assets/vendors/style";
import { RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";

import store from "./appRedux/store";
import AppRouter from "./routes";

const NextApp = () => {
  return (
    <Provider store={store}>
      <RouterProvider router={AppRouter} />
    </Provider>
  );
};

export default NextApp;
