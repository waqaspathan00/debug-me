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
    const [language, setLanguage] = useState("");
    const [problem, setProblem] = useState("")
    const [code, setCode] = useState("")
    const [resultCode, setResultCode] = useState("")
    const [selectedTag, setSelectedTag] = useState("");


    const ExampleQuizTag = ({
                                selectedTag,
                                setSelectedTag,
                                tagText,
                                exampleLanguage,
                                exampleProblem,
                                exampleCode
                            }: any) => {
        function handleClick() {
            setSelectedTag(tagText);
            setLanguage(exampleLanguage);
            setProblem(exampleProblem);
            setCode(exampleCode);
        }

        return (
            <div className={"w-fit p-1 bg-gradient-to-r from-green-400 to-green-700 rounded-full cursor-pointer"}>
                {/*<button*/}
                {/*    className={`${*/}
                {/*        selectedTag === tagText ? "bg-blue" : "bg-grey-300"*/}
                {/*    } cursor-pointer bg-gradient-to-r from-green-300 to-green-700 rounded-full w-full h-full hover:bg-blue transition-all`}*/}
                {/*    onClick={handleClick}*/}
                {/*>*/}
                <button
                    className={`w-full h-full text-white ${selectedTag === tagText ? "bg-gradient-to-r from-green-400 to-green-700" : "bg-grey-200"} rounded-full px-4 py-0.5`}
                    onClick={handleClick}>
                    {tagText}
                </button>
            </div>
        );
    };

    function handleAnswerSubmit() {
        if (!problem) {
            toast.error("Please enter a problem");
            return;
        }

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

    function handleClearClick() {
        setLanguage("")
        setProblem("");
        setCode("");
        setResultCode("");
        setSelectedTag("");
    }

    return (
        <div className={"flex flex-col justify-start items-center h-screen bg-grey-200"}>
            {/* Hero Section */}
            <div
                className={"flex md:flex-row flex-col [&>*]:my-2 justify-between items-center h-fit md:w-2/5 w-full mt-12"}>
                {/*<h1 className={"text-6xl text-white"}><span*/}
                {/*    className={"text-green-400 font-rock-salt"}>Debug</span><span className={"text-green-700 font-rock-salt"}>Me</span>*/}
                {/*</h1>*/}
                {/*<img className={"w-32"} alt={"logo"} src={"/icon.png"} />*/}
                <h1 className={"text-6xl text-white mt-20 font-rock-salt text-green-100 my-4"}>DebugMe</h1>
                <h2 className={"flex md:flex-col flex-row [&>*]:mx-4 items-end text-2xl text-white"}>
                    <span className={"text-green-300 font-rock-salt whitespace-nowrap"}>Squish🦶🏼</span>
                    <span className={"text-green-500 font-rock-salt whitespace-nowrap"}>Bugs🐞</span>
                    <span className={"text-green-700 font-rock-salt whitespace-nowrap"}>Faster🏃🏽‍</span>
                </h2>
            </div>

            {/* Example Section */}
            <div className={"flex flex-col mt-12 md:w-1/2 w-full"}>
                <h3 className={"text-2xl text-white ml-4"}>Try an Example</h3>
                <div className={"flex flex-wrap [&>*]:m-2 ml-2"}>
                    <ExampleQuizTag selectedTag={selectedTag} setSelectedTag={setSelectedTag}
                                    tagText={"Missing syntax"} exampleLanguage={"python"}
                                    exampleProblem={"why does this code keep crashing?"}
                                    exampleCode={"print(\"hello world)"}/>
                    <ExampleQuizTag selectedTag={selectedTag} setSelectedTag={setSelectedTag}
                                    tagText={"Modify function"} exampleLanguage={"javascript"}
                                    exampleProblem={"modify this function so that it left pads the variables with 0 if they are less than 10 and returns the result"}
                                    exampleCode={"export function getFormattedTime2(time: number) {\n" +
                                        "    const minutes = time / 60;\n" +
                                        "    const seconds = time % 60;\n" +
                                        "\n" +
                                        "    return `${minutes}:${seconds}`;\n" +
                                        "}"}/>
                    <ExampleQuizTag selectedTag={selectedTag} setSelectedTag={setSelectedTag}
                                    tagText={"HTML button differences"} exampleLanguage={""}
                                    exampleProblem={"difference between button and submit button in HTML"}
                                    exampleCode={""}/>
                </div>
            </div>


            {/* Form Inputs Section */}
            <div className={"flex flex-col items-center md:w-1/2 w-full [&>*]:my-1 mt-10"}>
                <input onChange={(event: any) => {
                    setLanguage(event.target.value)
                }} className={"w-11/12 bg-grey-100 p-2 rounded-lg text-grey-200"}
                       placeholder={"Programming language (optional) - jsx, python, javascript, sql..."} value={language}/>
                {/*<IconInputBox icon={GrLanguage} placeholder={"Enter programming language"} state={language} handleChange={handleLanguageChange}/>*/}
                <textarea className={"w-11/12 p-2 bg-grey-100 text-grey-200 rounded-lg"}
                          placeholder={"Your problem - 'Why is there a syntax error..., How to get today's date...'"}
                          onChange={(event) => {
                              setProblem(event.target.value)
                          }} value={problem}/>
                <textarea className={"w-11/12 h-60 bg-grey-100 p-2 rounded-lg text-grey-200"}
                          placeholder={"Paste your code here (optional)"}
                          onChange={(event) => {
                              setCode(event.target.value)
                          }} value={code}/>
                <div className={"flex w-11/12 justify-around"}>
                    <button
                        onClick={handleClearClick}
                        className={"w-2/5 border-4 border-red-700 rounded-lg text-red-500 font-bold hover:bg-red-700 hover:text-white transition-all"}>
                        Clear
                    </button>
                    <button
                        className={"w-2/5 p-2 rounded-lg transition-all text-white duration-300 bg-gradient-to-r from-green-300 to-green-700 via-green-600 bg-size-200 bg-pos-0 hover:bg-pos-100"}
                        onClick={handleAnswerSubmit}>Submit
                    </button>
                </div>
            </div>

            <div className={"w-full border-r-8 h-fit mt-12 border-t-8 border-black"}>
                <h3 className={"text-3xl text-white m-4 font-rock-salt"}>AI Generated Response</h3>
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
