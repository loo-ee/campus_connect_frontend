import { useEffect, useContext } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Header from "../../ui-components/Header";
import { AuthContext } from "../../contexts/AuthContext";

export default function HomeLayout() {
  const Auth = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (Auth?.user?.user) navigate("home/");
    else navigate("login/");
  }, [Auth?.user?.user]);

  return (
    <>
      <Header />

      <Outlet />
    </>
  );
}
