import { useDispatch, useSelector } from "react-redux";

import { toggleCollapsedSideNav } from "../../../appRedux/actions";

import type { RootState } from "../../../appRedux/store/index";

export const useTopBar = () => {
  /* CONSTANTS */
  const dispatch = useDispatch();

  const { navStyle } = useSelector(({ settings }: RootState) => settings);
  const { navCollapsed, width } = useSelector(({ common }: RootState) => common);

  /* STATE */

  /* HANDLERS */
  const handleNavCollapse = () => dispatch(toggleCollapsedSideNav(!navCollapsed));

  /* EFFECT */

  return { navStyle, width, navCollapsed, handleNavCollapse };
};
