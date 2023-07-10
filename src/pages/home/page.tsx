import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { openai } from "../../util/globalVars";

export default function HomePage() {
  const [promptText, setPromptText] = useState("");
  const [introText, setIntroText] = useState("");
  const [selectedPrompt, setSelectedPrompt] = useState("");
  const [index, setIndex] = useState(0);
  const [introIndex, setIntroIndex] = useState(0);
  const [fallback, setFallBack] = useState("");

  const promptQuestionRef = useRef<HTMLDivElement>(null);
  const promptRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  async function fetchResponse(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    e.currentTarget.disabled = true;

    setFallBack("Generating Response...");

    if (promptQuestionRef.current)
      promptQuestionRef.current.innerText = e.currentTarget.innerText;

    setSelectedPrompt("");
    setPromptText("");
    setIndex(0);

    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "You are an assistant that guides students to this university portal, named 'Campus Connect'. Make your reponses not longer than 200 characters.",
        },
        { role: "user", content: e.currentTarget.value },
      ],
    });

    const data = response.data.choices[0].message!.content;

    if (data) setSelectedPrompt(data);
    else setSelectedPrompt("Cannot contact servers. Please try again");

    setFallBack("");
  }

  function redirectPage(route: string) {
    navigate("/" + route);
  }

  useEffect(() => {
    if (index < selectedPrompt.length) {
      const timeout = setTimeout(() => {
        setPromptText(promptText + selectedPrompt[index]);
        setIndex(index + 1);
      }, 20);

      if (promptRef.current) promptRef.current.innerHTML = promptText;
      return () => clearTimeout(timeout);
    }

    return;
  }, [promptText, index, selectedPrompt]);

  const intro = "Hello, I am Campus Connect's AI.";

  useEffect(() => {
    if (introIndex < intro.length) {
      const timeout = setTimeout(() => {
        setIntroText(introText + intro[introIndex]);
        setIntroIndex(introIndex + 1);
      }, 100);
      return () => clearTimeout(timeout);
    }

    return;
  }, [intro, introText, introIndex]);

  return (
    <main className=" flex flex-col items-center mt-[100px] gap-28 h-auto">
      <div className="w-[1100px] h-[400px] flex flex-row justify-center items-center">
        <div className="w-1/2 items-center justify-center flex">
          <div className="flex flex-col justify-between w-[450px] min-h-[300px] max-h-[430px] overflow-auto bg-tertiary p-4 text-secondary rounded-xl shadow-md shadow-black border-4 border-black">
            <div className="flex flex-col justify-between">
              <div className="text-lg">{introText}</div>
              <div className="mt-4 underline" ref={promptQuestionRef}></div>
              <div className="mt-2" ref={promptRef}>
                {!promptText && fallback}
              </div>
            </div>

            <div className="flex flex-row items-center justify-start mt-5 w-full overflow-auto gap-5 p-5">
              <button
                onClick={(e) => {
                  void fetchResponse(e);
                }}
                value="What does this school offer?"
                className="disabled:hidden bg-accent3 p-2 rounded-lg min-w-max hover:bg-hovers"
              >
                What can I learn here?
              </button>
              <button
                onClick={(e) => {
                  void fetchResponse(e);
                }}
                value="Give me 3 common FAQs about Campus Connect and its answers. Wrap each FAQ inside a div component and 2 <br/> after each FAQ. Number each FAQ and an arrow to each answer"
                className="disabled:hidden bg-accent3 p-2 rounded-lg min-w-max hover:bg-hovers"
              >
                FAQs
              </button>
              <button
                onClick={(e) => {
                  void fetchResponse(e);
                }}
                value="How can a freshman decide which program to take in this university?"
                className="disabled:hidden bg-accent3 p-2 rounded-lg min-w-max hover:bg-hovers"
              >
                How to decide which program?
              </button>
            </div>
          </div>
        </div>
        <div className="w-1/2 h-full flex flex-col items-center justify-evenly justify-self-end">
          <div className="w-2/3 text-center">
            <span className="text-2xl font-extrabold">
              Connecting you to a smarter university experience...
            </span>
          </div>
          <div className="flex flex-row w-full justify-evenly items-center">
            <button
              onClick={() => redirectPage("academics/")}
              className="w-[150px] h-[60px] bg-accent p-4 rounded-2xl text-secondary shadow-lg shadow-black hover:bg-hovers"
            >
              Academics
            </button>
            <button className="w-[150px] h-[60px] bg-accent p-4 rounded-2xl text-secondary shadow-lg shadow-black hover:bg-hovers">
              Learn More
            </button>
          </div>
        </div>
      </div>

      <div className="w-[1100px] h-[400px] bg-subtleBG border-4 border-black rounded-2xl shadow-md shadow-black p-4">
        School Info
      </div>

      <div className="w-[1100px] h-[400px] bg-subtleBG border-4 border-black rounded-2xl shadow-md shadow-black p-4">
        Faculty
      </div>

      <div className="w-[1100px] h-[400px] bg-subtleBG border-4 border-black rounded-2xl shadow-md shadow-black p-4">
        About Us
      </div>

      <div className="w-[1100px] h-[400px] bg-subtleBG border-4 border-black rounded-2xl shadow-md shadow-black p-4">
        Contact Us
      </div>
    </main>
  );
}
