import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";
import { useEffect, useState } from "react";
import { getSection } from "../../../../adapters/recordsAdapter";
import { ISection, ITask } from "../../../../util/types";
import TaskBox from "./TaskBox";

interface TasksDialogProps {
  sectionCode: string | undefined;
  tasks: ITask[] | null;
}

export default function TasksDialog({ sectionCode, tasks }: TasksDialogProps) {
  const [section, setSection] = useState<ISection | null>(null);

  useEffect(() => {
    if (!sectionCode) return;

    async function fetchSection(sectionCode: string) {
      const foundSection = await (getSection(
        sectionCode
      ) as Promise<ISection | null>);

      if (foundSection) setSection(foundSection);
    }

    void fetchSection(sectionCode);
  }, [sectionCode]);

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button className="w-full h-full">Tasks</button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="bg-blackA9 data-[state=open]:animate-overlayShow fixed inset-0" />
        <Dialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[510px] w-[90vw] max-w-max translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[30px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
          <Dialog.Title className="text-mauve12 m-0 text-[17px] font-medium">
            {section?.subject.name} Tasks
          </Dialog.Title>
          <Dialog.Description className="text-mauve11 mt-[10px] mb-5 text-[15px] leading-normal">
            {section?.subject.description}
          </Dialog.Description>

          <div className="grid grid-cols-3 grid-flow-row gap-3 mt-3 overflow-auto h-full max-h-[330px] p-3">
            {tasks?.map((task) => (
              <TaskBox key={task.title} task={task} />
            ))}
          </div>

          <div className="mt-[25px] flex justify-end">
            <Dialog.Close asChild>
              <button className="bg-green4 text-green11 hover:bg-green5 focus:shadow-green7 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none focus:shadow-[0_0_0_2px] focus:outline-none">
                Close Tasks
              </button>
            </Dialog.Close>
          </div>
          <Dialog.Close asChild>
            <button
              className="text-violet11 hover:bg-violet4 focus:shadow-violet7 absolute top-[10px] right-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none"
              aria-label="Close"
            >
              <Cross2Icon />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
