import { useDispatch, useSelector } from "react-redux";

import type { RootState } from "../../../appRedux/store";
import { useEffect } from "react";
import { updateWindowWidth } from "../../../appRedux/actions";

export const useMainApp = () => {
  /* CONSTATNTS */
  const dispatch = useDispatch();

  /*  STATE */
  const { navStyle } = useSelector(({ settings }: RootState) => settings);

  /* EFFECTS */
  useEffect(() => {
    window.addEventListener("resize", () => {
      dispatch(updateWindowWidth(window.innerWidth));
    });
  }, [dispatch]);

  return { navStyle };
};
