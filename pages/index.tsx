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
        })
            .finally(() => {
            toast.dismiss(toastId);
        });
    }

    return (
        <div className={"flex flex-col justify-start items-center h-screen"}>
            <div className={"flex flex-col items-center sm:w-1/2 w-full [&>*]:my-1 mt-10"}>
                {/*input box that asks user to enter programming language*/}
                <input onChange={(event: any) => {setLanguage(event.target.value)}} className={"w-11/12 p-2 rounded-lg border-2"} placeholder={"Enter your language"}/>
                <textarea className={"w-11/12 p-2 rounded-lg border-2"} placeholder={"Enter your problem"}
                       onChange={(event) => {
                           setProblem(event.target.value)
                       }}/>
                <textarea className={"w-11/12 h-60 p-2 rounded-lg border-2"} placeholder={"Enter your code"}
                          onChange={(event) => {
                              setCode(event.target.value)
                          }}/>
                <button
                    className={"w-1/2 p-2 rounded-lg transition-all text-white duration-300 bg-gradient-to-r from-green-300 to-green-700 via-green-600 bg-size-200 bg-pos-0 hover:bg-pos-100"}
                    onClick={handleAnswerSubmit}>Submit
                </button>

            </div>

            <div className={"w-full h-fit"}>
                <Prism language={language.toLowerCase()} style={atomOneDark}>
                    {resultCode}
                </Prism>
            </div>
        </div>
    );
}
