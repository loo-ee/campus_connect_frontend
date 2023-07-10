import {
  checkIfEmailIsCreated,
  registerUser,
} from "../../adapters/authAdapters";
import { registerStudent } from "../../adapters/recordsAdapter";
import CustomSelect, { ItemsProps } from "../../ui-components/CustomSelect";
import { IUserCreation } from "../../util/types";
import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";
import { useRef, useState } from "react";

const StudentRegDialog = () => {
  const firstNameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);
  const usernameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const password1Ref = useRef<HTMLInputElement>(null);
  const password2Ref = useRef<HTMLInputElement>(null);

  const [selectedYearLvl, setSelectedYearLvl] = useState<number | null>(null);
  const [openDialog, setOpenDialog] = useState(false);

  const items: ItemsProps = {
    title: "Year Levels",
    items: [
      {
        value: "first",
        child: "First Year",
      },
      {
        value: "second",
        child: "Second Year",
      },
      { value: "third", child: "Third Year" },
      {
        value: "Fourth",
        child: "Fourth Year",
      },
    ],
  };

  function handleDialogClose() {
    setOpenDialog(false);
  }

  function handleSelect(selectedItem: string) {
    const levels = {
      first: 1,
      second: 2,
      third: 3,
      fourth: 4,
    };

    const yearLevel = levels[selectedItem as keyof typeof levels];
    setSelectedYearLvl(yearLevel);
  }

  async function handleStudentRegistration(
    e: React.MouseEvent<HTMLButtonElement>
  ) {
    e.preventDefault();

    if (!validateInputs()) {
      console.log("Fill all fields");
      return;
    }

    const user: IUserCreation = {
      first_name: firstNameRef.current!.value,
      last_name: lastNameRef.current!.value,
      email: emailRef.current!.value,
      username: usernameRef.current!.value,
      password: password1Ref.current!.value,
    };

    const foundEmail = await (checkIfEmailIsCreated(user.email) as Promise<{
      status: number;
    }>);

    if (foundEmail.status) {
      console.log("EMAIL ALREADY TAKEN");
      return;
    }

    if (password1Ref.current!.value != password2Ref.current!.value) {
      console.log("PASSWORDS DON'T MATCH");
      return;
    }

    if (!selectedYearLvl) {
      console.log("INVALID YEAR LEVEL");
      return;
    }

    const response = await registerUser(user);
    console.log(response);

    if (response) {
      const studCreationRes = await registerStudent(
        user.email,
        selectedYearLvl
      );
      console.log(studCreationRes);
    }

    handleDialogClose();
  }

  function validateInputs() {
    if (
      !firstNameRef.current?.value ||
      !lastNameRef.current?.value ||
      !usernameRef.current?.value ||
      !emailRef.current?.value ||
      !password1Ref.current?.value ||
      !password2Ref.current?.value
    ) {
      return false;
    }

    return true;
  }

  return (
    <Dialog.Root open={openDialog} onOpenChange={setOpenDialog}>
      <Dialog.Trigger asChild>
        <button className="text-secondary my-2 shadow-blackA7 hover:bg-hovers inline-flex h-[35px] items-center justify-center rounded-[4px] bg-accent px-[15px] font-medium leading-none shadow-[0_2px_10px] focus:shadow-[0_0_0_2px] focus:shadow-black focus:outline-none">
          Register as Student
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="bg-blackA9 data-[state=open]:animate-overlayShow fixed inset-0" />
        <Dialog.Content className="data-[state=open]:animate-contentShow overflow-auto fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
          <Dialog.Title className="text-accent m-0 text-[17px] font-medium">
            Register Student
          </Dialog.Title>
          <Dialog.Description className="text-mauve11 mt-[10px] mb-5 text-[15px] leading-normal">
            Please Fill All Required Information
          </Dialog.Description>
          <div className="flex justify-center items-center mb-5">
            <CustomSelect
              color="accent"
              placeholder="Select Year Level"
              items={[items]}
              operation={handleSelect}
            />
          </div>
          <fieldset className="mb-[15px] flex items-center gap-5">
            <label
              className="text-accent w-[90px] text-right text-[15px]"
              htmlFor="first_name"
            >
              First Name
            </label>
            <input
              className="text-accent shadow-violet7 focus:shadow-violet8 inline-flex h-[35px] w-full flex-1 items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px]"
              ref={firstNameRef}
              id="first_name"
              placeholder="Jann Louie"
            />
          </fieldset>
          <fieldset className="mb-[15px] flex items-center gap-5">
            <label
              className="text-accent w-[90px] text-right text-[15px]"
              htmlFor="last_name"
            >
              Last Name
            </label>
            <input
              className="text-accent shadow-violet7 focus:shadow-violet8 inline-flex h-[35px] w-full flex-1 items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px]"
              ref={lastNameRef}
              id="last_name"
              placeholder="Almirante"
            />
          </fieldset>
          <fieldset className="mb-[15px] flex items-center gap-5">
            <label
              className="text-accent w-[90px] text-right text-[15px]"
              htmlFor="username"
            >
              Username
            </label>
            <input
              className="text-accent shadow-violet7 focus:shadow-violet8 inline-flex h-[35px] w-full flex-1 items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px]"
              ref={usernameRef}
              id="username"
              placeholder="jann"
            />
          </fieldset>
          <fieldset className="mb-[15px] flex items-center gap-5">
            <label
              className="text-accent w-[90px] text-right text-[15px]"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="text-accent shadow-violet7 focus:shadow-violet8 inline-flex h-[35px] w-full flex-1 items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px]"
              ref={emailRef}
              id="email"
              placeholder="jann@gmail.com"
            />
          </fieldset>
          <fieldset className="mb-[15px] flex items-center gap-5">
            <label
              className="text-accent w-[90px] text-right text-[15px]"
              htmlFor="password1"
            >
              Password
            </label>
            <input
              className="text-accent shadow-violet7 focus:shadow-violet8 inline-flex h-[35px] w-full flex-1 items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px]"
              ref={password1Ref}
              id="password1"
              type="password"
              placeholder="****"
            />
          </fieldset>
          <fieldset className="mb-[15px] flex items-center gap-5">
            <label
              className="text-accent w-[90px] text-right text-[15px]"
              htmlFor="password2"
            >
              Confirm Password
            </label>
            <input
              className="text-accent shadow-violet7 focus:shadow-violet8 inline-flex h-[35px] w-full flex-1 items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px]"
              ref={password2Ref}
              id="password2"
              type="password"
              placeholder="****"
            />
          </fieldset>
          <div className="mt-[25px] flex justify-end">
            <Dialog.Close asChild>
              <button
                onClick={(e) => {
                  void handleStudentRegistration(e);
                }}
                className="bg-green4 text-green11 hover:bg-green5 focus:shadow-green7 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none focus:shadow-[0_0_0_2px] focus:outline-none"
              >
                Submit
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
};

export default StudentRegDialog;
