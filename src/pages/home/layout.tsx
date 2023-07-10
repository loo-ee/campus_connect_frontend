import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Header from "../../ui-components/Header";

export default function HomeLayout() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("home/");
  }, []);

  return (
    <>
      <Header />

      <Outlet />
    </>
  );
}
