import "@/styles/globals.css";
import React from "react";
import {Toaster} from "react-hot-toast";

// @ts-ignore
function MyApp({Component, pageProps}) {
    return (
        <>
            <meta
                name="viewport"
                content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
            />
            <title>DebugMe - AI Powered Code Debugger</title>
            <Toaster/>
            <Component {...pageProps} />
        </>
    );
}

export default MyApp;
