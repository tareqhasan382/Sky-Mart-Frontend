import React, { ReactNode, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { isLoggedIn } from "../utils/local-storage";
interface PrivateRouteProps {
  children: ReactNode;
}
const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const navigate = useNavigate();
  const userLoggedIn = isLoggedIn();
  const [loading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!userLoggedIn) {
      navigate("/login");
    }
    setIsLoading(true);
  }, [loading, userLoggedIn, navigate]);

  if (!loading) {
    return (
      <div>
        <h1>Loading..........</h1>
      </div>
    );
  }

  return <>{children}</>;
};

export default PrivateRoute;
