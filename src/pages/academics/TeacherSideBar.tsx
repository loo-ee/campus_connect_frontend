import * as RadioGroup from "@radix-ui/react-radio-group";
import { useLocation, useNavigate } from "react-router-dom";

export default function TeacherSidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const defaultValue = getDefaultValue();

  function getDefaultValue() {
    if (location.pathname.includes("/academics/panel/sections"))
      return "sections";
    if (location.pathname.includes("/academics/panel/courses"))
      return "courses";
    if (location.pathname.includes("/academics/panel/announcements"))
      return "announcements";
    return "";
  }

  function handleRadioGroupValueChange(value: string) {
    navigate(value);
  }

  return (
    <form>
      <RadioGroup.Root
        className="flex flex-col gap-2.5"
        defaultValue={defaultValue}
        aria-label="View density"
        onValueChange={handleRadioGroupValueChange}
      >
        <div className="flex items-center rounded-lg p-2 hover:border-2 hover:border-secondary hover:shadow-md hover:shadow-secondary">
          <RadioGroup.Item
            className="bg-white w-[25px] h-[25px] rounded-full shadow-[0_2px_10px] shadow-blackA7 hover:bg-violet3 focus:shadow-[0_0_0_2px] focus:shadow-tertiary outline-none cursor-default"
            value="sections"
            id="r1"
          >
            <RadioGroup.Indicator className="flex items-center justify-center w-full h-full relative after:content-[''] after:block after:w-[11px] after:h-[11px] after:rounded-[50%] after:bg-accent2" />
          </RadioGroup.Item>
          <label
            className="text-white text-[15px] leading-none pl-[15px]"
            htmlFor="r1"
          >
            Sections
          </label>
        </div>
        <div className="flex items-center rounded-lg p-2 hover:border-2 hover:border-secondary hover:shadow-md hover:shadow-secondary">
          <RadioGroup.Item
            className="bg-white w-[25px] h-[25px] rounded-full shadow-[0_2px_10px] shadow-blackA7 hover:bg-violet3 focus:shadow-[0_0_0_2px] focus:shadow-tertiary outline-none cursor-default"
            value="courses"
            id="r2"
          >
            <RadioGroup.Indicator className="flex items-center justify-center w-full h-full relative after:content-[''] after:block after:w-[11px] after:h-[11px] after:rounded-[50%] after:bg-accent2" />
          </RadioGroup.Item>
          <label
            className="text-white text-[15px] leading-none pl-[15px]"
            htmlFor="r2"
          >
            Course Management
          </label>
        </div>
        <div className="flex items-center rounded-lg p-2 hover:border-2 hover:border-secondary hover:shadow-md hover:shadow-secondary">
          <RadioGroup.Item
            className="bg-white w-[25px] h-[25px] rounded-full shadow-[0_2px_10px] shadow-blackA7 hover:bg-violet3 focus:shadow-[0_0_0_2px] focus:shadow-tertiary outline-none cursor-default"
            value="announcements"
            id="r3"
          >
            <RadioGroup.Indicator className="flex items-center justify-center w-full h-full relative after:content-[''] after:block after:w-[11px] after:h-[11px] after:rounded-[50%] after:bg-accent2" />
          </RadioGroup.Item>
          <label
            className="text-white text-[15px] leading-none pl-[15px]"
            htmlFor="r3"
          >
            Announcements
          </label>
        </div>
      </RadioGroup.Root>
    </form>
  );
}
