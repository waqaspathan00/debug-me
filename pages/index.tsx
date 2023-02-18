import {useState} from "react";
import {openai} from "../lib/openai";
// @ts-ignore
import {Prism} from 'react-syntax-highlighter';
// @ts-ignore
import {atomOneDark} from 'react-syntax-highlighter/dist/cjs/styles/prism';
import toast from "react-hot-toast";


export default function Home() {
    const [problem, setProblem] = useState("")
    const [code, setCode] = useState("")
    const [resultCode, setResultCode] = useState("")

    function handleAnswerSubmit() {
        const toastId = toast.loading("Processing...");
        openai.createCompletion({
            prompt: `Problem: ${problem}\nCode:\n${code}\nSuggested solution: `,
            model: "text-davinci-003",
            max_tokens: 1024,
            temperature: 0.2
        }).then((res) => {
            //@ts-ignore
            const responseText: any = res.data.choices[0].text;
            console.log(responseText);
            setResultCode(responseText);
        }).finally(() => {
            toast.dismiss(toastId);
        });
    }

    return (
        <div className={"flex flex-col justify-start items-center h-screen"}>
            <div className={"flex flex-col w-1/2 [&>*]:my-1 mt-10"}>
                <input className={"w-full p-2 rounded-lg border-2"} placeholder={"Enter your problem"}
                       onChange={(event) => {
                           setProblem(event.target.value)
                       }}/>
                <textarea className={"w-full p-2 rounded-lg border-2"} placeholder={"Enter your code"}
                          onChange={(event) => {
                              setCode(event.target.value)
                          }}/>
                <button
                    className={"bg-green-600 hover:bg-green-700 transition-all text-white p-2 rounded-lg cursor-pointer"}
                    onClick={handleAnswerSubmit}>Submit
                </button>

            </div>

            <div className={"w-full h-fit"}>
                <Prism language="jsx" style={atomOneDark}>
                    {resultCode}
                </Prism>
            </div>
        </div>
    );
}
