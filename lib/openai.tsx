import { Configuration, OpenAIApi } from "openai";

// @ts-ignore
const configuration = new Configuration(JSON.parse(process.env.NEXT_PUBLIC_OPENAI_API_KEY));
export const openai = new OpenAIApi(configuration);
