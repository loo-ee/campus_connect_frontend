import { AuthContext } from "../../contexts/AuthContext";
import { useContext } from "react";
import StudentSideBar from "./StudentSideBar";
import TeacherSidebar from "./TeacherSideBar";
import { Outlet } from "react-router-dom";
import Header from "../../ui-components/Header";

export default function AcademicsLayout() {
  const Auth = useContext(AuthContext);

  return (
    <>
      <Header />

      <div className="flex flex-row mt-[100px] w-[950px] bg-accent h-[450px] px-5 py-3 rounded-xl shadow-lg shadow-black">
        <div className="w-[200px] text-secondary flex flex-col">
          <div>
            <span className="text-lg font-bold">Campus Connect</span>
          </div>

          <div className="mt-10 mr-5">
            {Auth?.user?.user.isTeacher ? (
              <TeacherSidebar />
            ) : (
              <StudentSideBar />
            )}
          </div>
        </div>

        <div className="w-[700px] flex flex-col bg-secondary rounded-lg p-4">
          <Outlet />
        </div>
      </div>
    </>
  );
}
