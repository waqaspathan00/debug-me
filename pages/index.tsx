import {useState} from "react";
import {openai} from "../lib/openai";
// @ts-ignore
import {Prism} from 'react-syntax-highlighter';
// @ts-ignore
import {dracula} from 'react-syntax-highlighter/dist/cjs/styles/prism';
import toast from "react-hot-toast";
import {IconType} from "react-icons";
import {GrLanguage} from "react-icons/gr";


export default function Home() {
    const [problem, setProblem] = useState("")
    const [code, setCode] = useState("")
    const [resultCode, setResultCode] = useState("")
    const [language, setLanguage] = useState("jsx");

    function handleAnswerSubmit() {
        const toastId = toast.loading("Processing...");
        const prompt = `Problem: ${problem}\n${code ? `Code:\n${code}\n` : ""}Suggested solution: `;
        openai.createCompletion({
            prompt: prompt,
            model: "text-davinci-003",
            max_tokens: 1024,
            temperature: 0.2
        }).then((res) => {
            //@ts-ignore
            const responseText: any = res.data.choices[0].text;
            console.log(responseText);
            setResultCode(responseText.trim());
        }).catch((err) => {
            console.log(err)
            toast.error("Something went wrong");
        }).finally(() => {
            toast.dismiss(toastId);
        });
    }

    const handleLanguageChange = (event: any) => {
        setLanguage(event.target.value);
    }

    return (
        <div className={"flex flex-col justify-start items-center h-screen bg-grey-100"}>

            {/* Hero Section */}
            <div
                className={"flex md:flex-row flex-col [&>*]:my-2 justify-between items-center h-fit md:w-1/3 w-full mt-12"}>
                {/*<h1 className={"text-6xl text-white"}><span*/}
                {/*    className={"text-green-400 font-rock-salt"}>Debug</span><span className={"text-green-700 font-rock-salt"}>Me</span>*/}
                {/*</h1>*/}
                {/*<img className={"w-32"} alt={"logo"} src={"/icon.png"} />*/}
                <h1 className={"text-6xl text-white mt-20 font-rock-salt text-green-100"}>DebugMe</h1>
                <h2 className={"flex md:flex-col flex-row [&>*]:mx-2 items-end text-2xl text-white"}>
                    <span className={"text-red-700"}>Squish🦶🏼</span>
                    <span className={"text-yellow-500"}>Bugs🐞</span>
                    <span className={"text-green-600"}>Faster🏃🏽‍</span>
                </h2>
            </div>


            {/* Form Inputs Section */}
            <div className={"flex flex-col items-center md:w-1/2 w-full [&>*]:my-1 mt-10"}>
                <input onChange={(event: any) => {
                    setLanguage(event.target.value)
                }} className={"w-11/12 bg-grey-200 p-2 rounded-lg"}
                       placeholder={"Programming language (optional) - python, javascript, sql..."}/>
                {/*<IconInputBox icon={GrLanguage} placeholder={"Enter programming language"} state={language} handleChange={handleLanguageChange}/>*/}
                <textarea className={"w-11/12 p-2 bg-grey-200 rounded-lg"}
                          placeholder={"Your problem - 'Why is there a syntax error..., How to get today's date...'"}
                          onChange={(event) => {
                              setProblem(event.target.value)
                          }}/>
                <textarea className={"w-11/12 h-60 bg-grey-200 p-2 rounded-lg"}
                          placeholder={"Paste your code here (optional)"}
                          onChange={(event) => {
                              setCode(event.target.value)
                          }}/>
                <button
                    className={"w-1/2 p-2 rounded-lg transition-all text-white duration-300 bg-gradient-to-r from-green-300 to-green-700 via-green-600 bg-size-200 bg-pos-0 hover:bg-pos-100"}
                    onClick={handleAnswerSubmit}>Submit
                </button>
            </div>

            <div className={"w-full border-r-8 h-fit mt-12 border-t-8 border-black"}>
                <Prism language={language.toLowerCase()} style={dracula} showLineNumbers={true} wrapLines={true}
                       lineProps={{style: {wordBreak: 'break-all', whiteSpace: 'pre-wrap'}}}>
                    {resultCode}
                </Prism>
            </div>
        </div>
    );
}

interface IconInputBoxProps {
    icon: IconType;
    placeholder: string;
    state: any;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const IconInputBox = ({icon: Icon, placeholder, state, handleChange}: IconInputBoxProps) => {
    return (
        <div className={"relative"}>
            <div className={"absolute top-1/2 h-6 w-6 p-1 left-1 -translate-y-1/2"}>
                <Icon fill={"yellow-500"} fontSize={24}/>
            </div>
            <input
                className={"bg-grey-200 text-white h-12 p-2 rounded-lg indent-8 w-full"}
                placeholder={placeholder}
                onChange={handleChange}
                value={state}
            />
        </div>
    );
};

const ExampleQuizTag = ({selectedTag, setSelectedTag, quizTopic}: any) => {
    function getRandomQuizType() {
        const items = ["sa", "mc", "tf", "fb"];
        const idx = Math.floor(Math.random() * 4);
        return items[idx];
    }

    function handleClick() {
        setSelectedTag(quizTopic);
    }

    return (
        <button
            className={`${
                selectedTag === quizTopic ? "bg-blue" : "bg-grey-300"
            } cursor-pointer border-blue border-2 rounded-full m-1 px-4 py-1 w-fit hover:bg-blue transition-all`}
            onClick={handleClick}
        >
            {quizTopic}
        </button>
    );
};