import { Dispatch } from "redux";
import { CLEAR_REDUX_STORE, RE_RENDER_SIDE_BAR, RE_RENDER_TOP_BAR } from "../../constants/ApplicationConstants/ActionTypes";

export function clearReduxStoreAction() {
  return (dispatch: Dispatch) => {
    dispatch({ type: CLEAR_REDUX_STORE });
  };
}

export function reRenderSideBar() {
  return (dispatch: Dispatch) => {
    dispatch({ type: RE_RENDER_SIDE_BAR });
  };
}

export function reRenderTopBar() {
  return (dispatch: Dispatch) => {
    dispatch({ type: RE_RENDER_TOP_BAR });
  };
}
