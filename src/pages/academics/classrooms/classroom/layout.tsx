import { useEffect, useState } from "react";
import { Outlet, useParams } from "react-router-dom";
import ClassroomPage from "./page";

export default function ClassroomLayout() {
  const { taskID } = useParams();
  const [isClassroom, setIsClassroom] = useState(true);

  useEffect(() => {
    if (taskID) setIsClassroom(false);
    else setIsClassroom(true);
  }, [taskID]);

  return (
    <>
      {isClassroom ? (
        <ClassroomPage />
      ) : (
        <>
          <Outlet />
        </>
      )}
    </>
  );
}
