import { getStudentTask } from "../../../../../adapters/recordsAdapter";
import { AuthContext } from "../../../../../contexts/AuthContext";
import CustomProfilePic from "../../../../../ui-components/CustomProfilePic";
import { ISTudentTask } from "../../../../../util/types";
import { useContext, useEffect, useState } from "react";
import DescriptionDialog from "./DescriptionDialog";
import SubmitDialog from "./SubmitDialog";
import { useParams } from "react-router-dom";

export default function TaskPage() {
  const Auth = useContext(AuthContext);

  const [studentTask, setStudentTask] = useState<ISTudentTask | null>(null);
  const [createdAt, setCreatedAt] = useState<Date | null>(null);
  const [deadline, setDeadline] = useState<Date | null>(null);

  const { taskID } = useParams();

  const months = {
    0: "January",
    1: "Febraury",
    2: "March",
    3: "April",
    4: "May",
    5: "June",
    6: "July",
    7: "August",
    8: "September",
    9: "October",
    10: "November",
    11: "December",
  };

  useEffect(() => {
    async function fetchStudentTask() {
      if (!Auth?.user?.user.email || !taskID) return;

      const foundStudentTask = await (getStudentTask(
        Number(taskID),
        Auth.user.user.email
      ) as Promise<ISTudentTask | null>);

      if (!foundStudentTask) {
        console.log("Student task not found");
        return;
      }

      setStudentTask(foundStudentTask);
      const createdAtObj = new Date(foundStudentTask.task.created_at);
      const deadlineObj = new Date(foundStudentTask.task.deadline);
      setCreatedAt(createdAtObj);
      setDeadline(deadlineObj);
    }

    void fetchStudentTask();
  }, [Auth?.user?.user]);

  return (
    <div className="flex flex-col items-center">
      <span className="text-2xl mt-5">Task Details</span>
      <div className="flex flex-row items-center mt-1 w-full justify-between px-5">
        <div className="flex flex-row items-center">
          <div className="float-left z-10">
            <CustomProfilePic imgSrc="/images/pfp.jpg" />
          </div>
          <div className="bg-primary w-[50px] h-[45px] border-y-2 border-black -ml-10"></div>
          <div className="w-max border-l-0 rounded-l-none h-[45px] text-right bg-primary p-2 rounded-lg border-2 border-black">
            {studentTask &&
              studentTask?.student_class.teacher.user.first_name +
                " " +
                studentTask?.student_class.teacher.user.last_name}
          </div>
        </div>

        <div className="mr-10">
          {studentTask?.is_completed ? (
            <div className="bg-accent2 p-3 max-w-max rounded-lg border-2 border-black hover:cursor-not-allowed">
              <span className="">Work Submitted</span>
            </div>
          ) : (
            <SubmitDialog
              studentTask={studentTask}
              setStudentTask={setStudentTask}
            />
          )}
        </div>
      </div>

      <div className="bg-secondary p-5 border-2 border-primary w-[550px] rounded-lg mt-3 h-[210px] overflow-auto">
        <div className="flex flex-row justify-between bg-primary p-5 rounded-lg mt-3 items-center">
          <div className="flex flex-col">
            <span className="text-2xl">{studentTask?.task.title}</span>
            <span className="text-xs ml-1">
              {createdAt &&
                `${months[createdAt?.getMonth() as keyof typeof months]} ${
                  createdAt && createdAt?.getDate()
                }, ${createdAt?.getFullYear()}`}
            </span>
          </div>

          <div className="flex flex-col bg-accent3 w-[250px] items-center justify-center text-sm p-3 text-secondary rounded ml-2 h-[50px]">
            <span>
              Deadline:{" "}
              {deadline &&
                `${
                  months[deadline?.getMonth() as keyof typeof months]
                } ${deadline?.getDate()}, ${deadline?.getFullYear()}`}
            </span>
          </div>
        </div>

        <div className="flex flex-row justify-between items-center w-[500px] bg-primary p-5 rounded-lg mt-3">
          {studentTask?.task.description &&
          studentTask?.task.description.length < 35 ? (
            <span className="text-sm">{studentTask.task.description}</span>
          ) : (
            <>
              <span className="text-sm">
                {studentTask?.task.description.substring(0, 35)}...
              </span>
              <DescriptionDialog description={studentTask?.task.description} />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
