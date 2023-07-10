import { useEffect, useState } from "react";
import { Outlet, useParams } from "react-router-dom";
import ClassroomsPage from "./page";

export default function ClassroomsLayout() {
  const { section } = useParams();

  const [isLobby, setIsLobby] = useState(true);

  useEffect(() => {
    if (section) setIsLobby(false);
    else setIsLobby(true);
  }, [section]);

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
