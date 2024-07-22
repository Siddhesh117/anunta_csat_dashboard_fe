import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { RouteConstants } from "../../../../constants/ApplicationConstants/RouteConstants";
import { clearReduxStoreAction } from "../../../../appRedux/actions/Common";

export const useUserProfile = () => {
  /* CONSTANTS */
  const dispatch = useDispatch();
  const navigate = useNavigate();

  /* STATE */
  const [open, setOpen] = useState<boolean>(false);

  /* HANDLERS */
  const handleOpenChange = (newOpen: boolean) => setOpen(newOpen);
  const hide = () => setOpen(false);

  const handleAbout = () => hide();
  const handleMyAccount = () => hide();
  const handleLogOut = () => {
    hide();
    localStorage.clear();
    dispatch(clearReduxStoreAction());
    navigate(RouteConstants.ROOT_PAGE);
  };

  return { open, handleOpenChange, handleAbout, handleMyAccount, handleLogOut };
};
