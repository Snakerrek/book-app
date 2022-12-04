import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoadingOverlay from "../../Components/LoadingOverlay/LoadingOverlay";

const Logout = () => {
  const navigate = useNavigate();
  useEffect(() => {
    localStorage.removeItem("token");
    navigate("/login");
    // eslint-disable-next-line
  }, []);
  return (
    <>
      <LoadingOverlay />
    </>
  );
};

export default Logout;
