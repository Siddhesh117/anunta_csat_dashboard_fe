import { useNavigate } from "react-router-dom";
import CustomButton from "../../CustomButton";
import { LocalStorageConstants } from "../../../../constants/ApplicationConstants/LocalStorageConstants";
import { useDispatch } from "react-redux";
import { clearReduxStoreAction } from "../../../../appRedux/actions/Common";
import { APPMODE, RouteConstants } from "../../../../constants/ApplicationConstants/RouteConstants";

const Error400 = () => {
  /* CONSTANT */
  const errorMessage = localStorage.getItem(LocalStorageConstants.ERROE_MESSAGE);
  const APP_MODE = process.env.REACT_APP_MODE;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClick = () => {
    localStorage.clear();
    dispatch(clearReduxStoreAction());
    navigate(RouteConstants.ROOT_PAGE);
  };

  return (
    <div className="gx-page-error-container">
      <div className="gx-page-error-content">
        <div className="gx-error-code gx-mb-4">400</div>
        {APP_MODE === APPMODE.DEVELOPMENT ? (
          <h3 style={{ lineHeight: "30px" }} className="gx-text-center">
            {errorMessage}
          </h3>
        ) : (
          <h2 style={{ lineHeight: "30px" }} className="gx-text-center">
            Oops, A component error has occurred Something went wrong!
          </h2>
        )}
        <p className="gx-text-center">
          <CustomButton text="Go to home" onClick={handleClick} />
        </p>
      </div>
    </div>
  );
};

export default Error400;
