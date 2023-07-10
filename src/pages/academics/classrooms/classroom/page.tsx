import {
  getSectionMembers,
  getStudentClass,
  getTasks,
} from "../../../../adapters/recordsAdapter";
import { AuthContext } from "../../../../contexts/AuthContext";
import { IStudentClass, ITask } from "../../../../util/types";
import { useContext, useEffect, useState } from "react";
import TasksDialog from "./TasksDialog";
import { useParams } from "react-router-dom";

interface SectionMember {
  first_name: string;
  last_name: string;
}

export default function ClassroomPage() {
  const Auth = useContext(AuthContext);

  const [tasks, setTasks] = useState<ITask[] | null>(null);
  const [studentClass, setStudentClass] = useState<IStudentClass | null>(null);
  const [sectionMembers, setSectionMembers] = useState<SectionMember[] | null>(
    null
  );

  const { section } = useParams();

  useEffect(() => {
    async function fetchData() {
      if (!Auth?.user?.user.email || !section) return;

      const foundStudentClass: IStudentClass | null = await (getStudentClass(
        section,
        Auth?.user?.user.email
      ) as Promise<IStudentClass | null>);

      if (!foundStudentClass) {
        console.log("No student class found");
        return;
      }

      const foundTasks: ITask[] | null = await (getTasks(
        foundStudentClass.section_code
      ) as Promise<ITask[] | null>);

      const foundSectionMembers: SectionMember[] | null =
        await (getSectionMembers(section) as Promise<SectionMember[] | null>);

      if (!foundSectionMembers) console.log("No members found");
      else
        foundSectionMembers.sort((a, b) =>
          a.last_name.toLowerCase().localeCompare(b.last_name)
        );

      setStudentClass(foundStudentClass);
      setTasks(foundTasks);
      setSectionMembers(foundSectionMembers);
    }

    void fetchData();
  }, [Auth?.user?.user, section]);

  if (!studentClass) return <div>Not Found</div>;

  return (
    <div className="mt-5 flex flex-row w-[600px] justify-between h-[350px]">
      <div>
        <div className="flex flex-col bg-primary max-w-max p-4 rounded-lg shadow-md shadow-mauve11 font-medium">
          <span>
            {studentClass.subject.code.replace("-", " ")} -{" "}
            {studentClass.subject.name}
          </span>
          <span>
            Adviser:{" "}
            {studentClass.teacher.user.first_name +
              " " +
              studentClass.teacher.user.last_name}
          </span>
        </div>

        <div className="flex flex-row gap-3">
          <div className="mt-[30px] w-[150px] h-[100px] bg-accent3 rounded-lg text-2xl font-bold text-secondary text-center shadow-md shadow-black hover:cursor-pointer hover:bg-hovers">
            <TasksDialog sectionCode={section} tasks={tasks} />
          </div>

          <div className="mt-[30px] w-[150px] h-[100px] bg-accent3 rounded-lg p-5 text-2xl font-bold text-secondary text-center shadow-md shadow-black hover:cursor-pointer hover:bg-hovers">
            Grades
          </div>
        </div>
      </div>

      <div className="w-[200px] bg-subtleBG border-2 border-mauve11 shadow-md shadow-mauve11 rounded-md p-3">
        <span className="text-lg font-semibold">Members</span>

        <div className="flex flex-col items-center mt-3 gap-3 w-full">
          {sectionMembers?.map((student) => (
            <div key={student.last_name}>
              {student.last_name != " " && student.first_name != " " && (
                <div
                  key={student.last_name}
                  className="w-full h-[45px] border-2 border-black bg-tertiary p-2 rounded-md overflow-hidden"
                >
                  <span key={student.last_name} className="text-white text-xs">
                    {`${student.last_name}, ${student.first_name}`}
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
