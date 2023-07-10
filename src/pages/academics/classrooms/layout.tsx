import { useContext, useEffect, useState } from "react";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import ClassroomsPage from "./page";
import { AuthContext } from "../../../contexts/AuthContext";

export default function ClassroomsLayout() {
  const Auth = useContext(AuthContext);
  const navigate = useNavigate();
  const { section } = useParams();

  const [isLobby, setIsLobby] = useState(true);

  useEffect(() => {
    if (section) setIsLobby(false);
    else setIsLobby(true);
  }, [section]);

  useEffect(() => {
    if (!Auth?.user?.user) navigate("/login/");
  }, [Auth?.user?.user]);

  return (
    <>
      <div className="w-full bg-secondary">
        {isLobby ? (
          <ClassroomsPage />
        ) : (
          <div className="flex flex-col items-center">
            <span className="text-2xl font-bold">Section {section}</span>
            <Outlet />
          </div>
        )}
      </div>
    </>
  );
}
