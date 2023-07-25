import { useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const ProtectRoute = ({ children }): JSX.Element => {
  const { isAuthenicate } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenicate) {
      navigate("/login");
    }
  }, [isAuthenicate, navigate]);

  return isAuthenicate ? children : null;
};

export default ProtectRoute;
