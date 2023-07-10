import { Outlet, Route, Routes, useNavigate } from "react-router-dom";
import { getStudentSubjects } from "../../../adapters/recordsAdapter";
import { AuthContext } from "../../../contexts/AuthContext";
import { IStudentClass } from "../../../util/types";
import { useContext, useEffect, useState } from "react";

export default function ClassroomsPage() {
  const Auth = useContext(AuthContext);
  const navigate = useNavigate();

  const [studentClasses, setStudentClasses] = useState<IStudentClass[] | null>(
    null
  );

  async function getUserCourses() {
    const foundSubjects: IStudentClass[] = await (getStudentSubjects(
      Auth!.user!.user.email
    ) as Promise<IStudentClass[]>);

    const newStudentClasses: IStudentClass[] = [];

    foundSubjects.forEach((student_class) => {
      if (
        !newStudentClasses.find(
          (c) => c.section_code == student_class.section_code
        )
      )
        newStudentClasses.push(student_class);
    });

    setStudentClasses(newStudentClasses);
    console.log("test");
  }

  function handleSubjectSelection(sectionCode: string) {
    const routerSectionCode = sectionCode.replace(" ", "-");
    navigate(routerSectionCode);
  }

  useEffect(() => {
    if (Auth?.user?.user) void getUserCourses();
  }, [Auth?.user?.user]);

  return (
    <>
      <div className="flex flex-row justify-between">
        <div>
          <div className="text-2xl font-bold">Classrooms</div>

          <div className="mt-5">
            <div className="flex flex-col gap-5 p-3 overflow-scroll h-[300px] items-center rounded-lg">
              {studentClasses?.map((s) => (
                <div
                  key={s.id}
                  className="w-[400px] border-2 border-black p-3 rounded-md flex flex-col items-center bg-subtleBG shadow-sm hover:shadow-black hover:cursor-pointer"
                  onClick={() => handleSubjectSelection(s.section_code)}
                >
                  <span className="text-md font-semibold">{`${s.subject.code.replace(
                    "-",
                    " "
                  )} - ${s.subject.name}`}</span>

                  <div className="w-full flex flex-row mt-5 justify-evenly">
                    <div>
                      <img
                        src={new URL(s.subject.image, import.meta.url).href}
                        alt=""
                        width={100}
                        height={100}
                        className="rounded-lg shadow-sm shadow-black"
                      />
                    </div>

                    <div className="flex flex-col w-[220px] text-xs mx-3 justify-between">
                      <span>{s.subject.description}</span>
                      <div>
                        <span className="underline text-[10px]">{`Section ${s.section_code} by ${s.teacher.user.first_name} ${s.teacher.user.last_name}`}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="w-[200px] bg-secondary border-l-2 border-mauve11">
          <Outlet />
        </div>
      </div>

      <Routes>
        <Route path=":section" element={<div>Hi</div>} />
      </Routes>
    </>
  );
}
