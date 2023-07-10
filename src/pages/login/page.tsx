import LoginTab from "./LoginTab";
import loginBG from "./images/login-bg.jpg";

export default function Login() {
  return (
    <div className="w-screen h-screen flex justify-center backdrop-blur-sm">
      <div className="flex flex-row w-[950px] h-[550px] mt-[50px] shadow-lg shadow-black rounded-xl">
        <div className="w-[550px]">
          <img
            src={loginBG}
            alt="login-banner"
            height={550}
            width={550}
            className="rounded-l-xl"
          />
        </div>
        <div className="flex flex-col items-center w-[400px] bg-accent rounded-r-xl">
          <span className="text-2xl mt-[50px] text-secondary">
            Campus Connect
          </span>
          <LoginTab />
        </div>
      </div>
    </div>
  );
}
