import { Route, Routes } from "react-router-dom";
import AcademicsLayout from "./pages/academics/layout";
import HomeLayout from "./pages/home/layout";
import HomePage from "./pages/home/page";
import ClassroomsLayout from "./pages/academics/classrooms/page";
import Login from "./pages/login/page";

function App() {
  return (
    <div className="bg-home-bg1 bg-no-repeat bg-cover bg-center w-screen min-h-screen h-screen overflow-auto flex flex-col items-center font-mono">
      <Routes>
        <Route path="/" element={<HomeLayout />}>
          <Route index path="home/" element={<HomePage />} />
        </Route>

        <Route path="login" element={<Login />}></Route>

        <Route path="academics/" element={<AcademicsLayout />}>
          <Route path="classrooms/" element={<ClassroomsLayout />} />
          <Route path="subjects/" />
          <Route path="announcements/" />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
