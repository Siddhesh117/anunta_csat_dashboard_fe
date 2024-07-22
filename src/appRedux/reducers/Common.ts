import { CLEAR_REDUX_STORE, RE_RENDER_TOP_BAR, RE_RENDER_SIDE_BAR, TOGGLE_COLLAPSED_NAV, WINDOW_WIDTH } from "../../constants/ApplicationConstants/ActionTypes";
import { AnyAction } from "redux";
import { General } from "../../util/General";

type CommonReducerState = {
  navCollapsed: boolean;
  width: number;
  pathname: string;
  renderLogo: boolean;
  reRenderSideBar: number | null;
  reRenderTopBar: number | null;
};

const INIT_STATE: CommonReducerState = {
  navCollapsed: true,
  width: window.innerWidth,
  pathname: "/",
  renderLogo: false,
  reRenderSideBar: null,
  reRenderTopBar: null
};

const CommonReducer = (state = INIT_STATE, action: AnyAction) => {
  switch (action.type) {
    case "@@router/LOCATION_CHANGE": {
      return {
        ...state,
        pathname: action.payload.location.pathname
      };
    }

    case CLEAR_REDUX_STORE: {
      return INIT_STATE;
    }

    case WINDOW_WIDTH: {
      const width: number = action.width;
      return {
        ...state,
        width: width
      };
    }

    case TOGGLE_COLLAPSED_NAV: {
      const navCollapsed: boolean = action.navCollapsed;
      return {
        ...state,
        navCollapsed: navCollapsed
      };
    }

    case RE_RENDER_SIDE_BAR: {
      return {
        ...state,
        reRenderSideBar: General.getGUID()
      };
    }

    case RE_RENDER_TOP_BAR: {
      return {
        ...state,
        reRenderTopBar: General.getGUID()
      };
    }

    default:
      return state;
  }
};

export default CommonReducer;
