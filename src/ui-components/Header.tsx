import { Link, useLocation } from "react-router-dom";
import Profile from "./Profile";
import book from "./images/book.png";

export default function Header() {
  const location = useLocation();

  if (location.pathname == "/login") return <></>;

  return (
    <div className="flex flex-row justify-between fixed w-full h-[80px] opacity-100 filter ">
      <div className="w-1/2"></div>
      <div className="w-1/2 flex flex-row justify-between">
        <div className="flex flex-row items-center justify-evenly text-center text-secondary w-[500px]">
          <button className="w-32 h-10 bg-accent3 rounded-md p-2 shadow-lg shadow-black hover:bg-hovers hover:text-secondary">
            <span>Faculty</span>
          </button>
          <button className="w-32 h-10 bg-accent3 rounded-md p-2 shadow-lg shadow-black hover:bg-hovers">
            <span>About Us</span>
          </button>
          <button className="w-32 h-10 bg-accent3 rounded-md p-2 shadow-lg shadow-black hover:bg-hovers">
            <span>Contact Us</span>
          </button>
        </div>
      </div>
      <div className="flex flex-row w-[300px] justify-evenly">
        <Link to="login/">
          <img src={book} width={70} height={70} alt="academics" />
        </Link>
        <Profile />
      </div>
    </div>
  );
}
