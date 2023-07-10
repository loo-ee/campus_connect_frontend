import { useNavigate } from "react-router-dom";
import { ITask } from "../../../../util/types";

interface TaskBoxProps {
  task: ITask;
}

export default function TaskBox({ task }: TaskBoxProps) {
  const navigate = useNavigate();

  function handleTaskSelection(e: React.MouseEvent<HTMLDivElement>) {
    e.preventDefault();

    navigate(task.id.toString());
  }

  return (
    <div
      onClick={handleTaskSelection}
      className="w-[180px] h-[150px] p-4 rounded-lg text-secondary bg-accent3 hover:bg-hovers shadow-md shadow-black hover:cursor-pointer overflow-hidden"
    >
      <div className="flex flex-col">
        <span className="text-lg font-medium hover:text-accent2">
          {task.title}
        </span>
        <div className="border-2 border-secondary my-2"></div>
        <span className="text-xs mt-3">{task.description}</span>
      </div>
    </div>
  );
}
