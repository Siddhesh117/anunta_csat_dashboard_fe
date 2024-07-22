import { MenuProps } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { RouteConstants } from "../../../../constants/ApplicationConstants/RouteConstants";
import { toggleCollapsedSideNav } from "../../../../appRedux/actions";
import LocalStorageUtil from "../../../../util/LocalStorageUtil";
import { LocalStorageConstants } from "../../../../constants/ApplicationConstants/LocalStorageConstants";

import type { RootState } from "../../../../appRedux/store";

export const useSideBarContent = () => {
  /* CONSTANTS */
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const location = useLocation();
  const { themeType } = useSelector(({ settings }: RootState) => settings);

  /* eslint-disable-next-line */
  const { navCollapsed, reRenderSideBar } = useSelector(({ common }: RootState) => common);
  const { pathname } = location;
  const selectedUserType = LocalStorageUtil.localstorageGetItem(LocalStorageConstants.SELECTED_USER_TYPE);

  /* STATE */
  const [selectedKeys, setSelectedKeys] = useState<string>("");

  /* HANDLERS */
  const handleNavCollapse = () => dispatch(toggleCollapsedSideNav(!navCollapsed));

  const handleOnClick: MenuProps["onClick"] = (menuItem) => {
    handleNavCollapse();

    const keyPath = menuItem.keyPath.at(0);

    switch (keyPath) {
      case "": {
        return navigate(RouteConstants.ROOT_PAGE);
      }
      case "report": {
        return navigate("/report");
      }
      case "gen-ai": {
        return navigate("/gen-ai");
      }
      case "unsatisfied-users": {
        return navigate("/unsatisfied-users");
      }
      /* If no keypath found then move to coming-soon page */
      default:
        return navigate(RouteConstants.PAGE_NOT_FOUND);
    }
  };

  useEffect(() => {
    const pathSegments = pathname.split("/");

    if (!pathSegments?.length) return;

    if (pathSegments.length <= 2) {
      /* last index element is the menu item, in case of home page */
      /* required by home page */
      setSelectedKeys(pathSegments.at(-1)!);
    } else {
      /* 0th index will be empty string 
       1st index element will be portal 
       2nd index element will be menu 
      */

      setSelectedKeys(pathSegments[2]);
    }

    // eslint-disable-next-line
  }, [location.pathname, location.search]);

  return { handleOnClick, selectedKeys, themeType, selectedUserType };
};
