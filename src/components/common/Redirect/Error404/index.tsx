import { useNavigate } from "react-router-dom";

import CustomButton from "../../CustomButton";

const Error404 = () => {
  const navigate = useNavigate();

  const handleClick = () => navigate("/");

  return (
    <div className="gx-page-error-container">
      <div className="gx-page-error-content">
        <div className="gx-error-code gx-mb-4">404</div>
        <h2 className="gx-text-center">Page Not Found!</h2>
        <p className="gx-text-center">
          <CustomButton text="Go to home" onClick={handleClick} />
        </p>
      </div>
    </div>
  );
};

export default Error404;
