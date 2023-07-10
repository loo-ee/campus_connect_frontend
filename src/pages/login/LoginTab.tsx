import { getUser, loginUser } from "../../adapters/authAdapters";
import { AuthContext } from "../../contexts/AuthContext";
import * as Tabs from "@radix-ui/react-tabs";
import { useContext, useEffect, useRef } from "react";
import StudentRegDialog from "./StudentRegDialog";
import TeacherRegDialog from "./TeacherRegDialog";
import { useNavigate } from "react-router-dom";
import { IToken } from "../../util/types";

function LoginTab() {
  const Auth = useContext(AuthContext);
  const navigate = useNavigate();

  const emailInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);

  async function loginHandler(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();

    if (!emailInputRef.current && !passwordInputRef) {
      console.log("Nope");
      return;
    }

    const email = emailInputRef.current!.value;
    const password = passwordInputRef.current!.value;

    const response = await loginUser(email, password);
    const data = await (response.json() as Promise<IToken>);

    if (response.status == 200) {
      console.log("hey");
      const foundUser = await getUser(email);
      if (foundUser) console.log(foundUser);

      Auth?.setAuthTokens(data);
      Auth?.setUser(foundUser);
      localStorage.setItem("authTokens", JSON.stringify(data));
      navigate("/");
    }
  }

  useEffect(() => {
    if (Auth!.user) navigate("/");
  }, [Auth!.user]);

  return (
    <div>
      <Tabs.Root
        className="flex flex-col w-[300px] shadow-[0_2px_10px] mt-[40px]"
        defaultValue="tab1"
      >
        <Tabs.List
          className="shrink-0 flex border-b border-mauve6"
          aria-label="Manage your account"
        >
          <Tabs.Trigger
            className="bg-white px-5 h-[45px] flex-1 flex items-center justify-center text-[15px] leading-none text-black select-none first:rounded-tl-md last:rounded-tr-md hover:text-hovers data-[state=active]:text-accent data-[state=active]:shadow-[inset_0_-1px_0_0,0_1px_0_0] data-[state=active]:shadow-current data-[state=active]:focus:relative data-[state=active]:focus:shadow-[0_0_0_2px] data-[state=active]:focus:shadow-black outline-none cursor-default"
            value="tab1"
          >
            Login
          </Tabs.Trigger>
          <Tabs.Trigger
            className="bg-white px-5 h-[45px] flex-1 flex items-center justify-center text-[15px] leading-none text-black select-none first:rounded-tl-md last:rounded-tr-md hover:text-hovers data-[state=active]:text-accent data-[state=active]:shadow-[inset_0_-1px_0_0,0_1px_0_0] data-[state=active]:shadow-current data-[state=active]:focus:relative data-[state=active]:focus:shadow-[0_0_0_2px] data-[state=active]:focus:shadow-black outline-none cursor-default"
            value="tab2"
          >
            Register
          </Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content
          className="grow p-5 rounded-b-md outline-none focus:shadow-[0_0_0_2px] focus:shadow-black bg-subtleBG"
          value="tab1"
        >
          <p className="mb-5 text-center text-[15px] leading-normal">
            Login with Email and Password
          </p>
          <fieldset className="mb-[15px] w-full flex flex-col justify-start">
            <label
              className="text-[13px] leading-none mb-2.5 text-accent block"
              htmlFor="email"
            >
              Email
            </label>
            <input
              ref={emailInputRef}
              className="grow shrink-0 rounded px-2.5 text-[15px] leading-none text-accent shadow-[0_0_0_1px] shadow-violet7 h-[35px] focus:shadow-[0_0_0_2px] focus:shadow-violet8 outline-none"
              id="email"
              placeholder="jann@gmail.com"
            />
          </fieldset>
          <fieldset className="mb-[15px] w-full flex flex-col justify-start">
            <label
              className="text-[13px] leading-none mb-2.5 text-accent block"
              htmlFor="password"
            >
              Password
            </label>
            <input
              ref={passwordInputRef}
              className="grow shrink-0 rounded px-2.5 text-[15px] leading-none text-accent shadow-[0_0_0_1px] shadow-hovers h-[35px] focus:shadow-[0_0_0_2px] focus:shadow-violet8 outline-none"
              id="password"
              placeholder="1234"
              type="password"
            />
          </fieldset>
          <div className="flex justify-end mt-5">
            <button
              onClick={(e) => {
                void loginHandler(e);
              }}
              className="inline-flex items-center justify-center rounded px-[15px] text-[15px] leading-none font-medium h-[35px] bg-green4 text-green11 hover:bg-green5 focus:shadow-[0_0_0_2px] focus:shadow-green7 outline-none cursor-default"
            >
              Login
            </button>
          </div>
        </Tabs.Content>
        <Tabs.Content
          className="grow p-5 bg-subtleBG rounded-b-md outline-none focus:shadow-[0_0_0_2px] focus:shadow-black"
          value="tab2"
        >
          <p className="mb-5 text-black text-[15px] leading-normal">
            New to Campus Connect? Register now!
          </p>
          <div className="flex flex-col items-center">
            <StudentRegDialog />
            <TeacherRegDialog />
          </div>
        </Tabs.Content>
      </Tabs.Root>
    </div>
  );
}

export default LoginTab;
