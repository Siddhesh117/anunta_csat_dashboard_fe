import { useNavigate } from "react-router-dom";

import IntlMessages from "../../../../util/IntlMessages";
import CustomButton from "../../CustomButton";

const Forbidden403 = () => {
  const navigate = useNavigate();

  const handleClick = () => navigate("/");

  return (
    <div className="gx-page-error-container">
      <div className="gx-page-error-content">
        <div className="gx-error-code gx-mb-4">403</div>
        <h2 className="gx-text-center">
          <IntlMessages id="extraPages.403Msg" />
        </h2>
        <p className="gx-text-center">
          <CustomButton text="Go to home" onClick={handleClick} />
        </p>
      </div>
    </div>
  );
};

export default Forbidden403;
