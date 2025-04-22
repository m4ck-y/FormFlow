import { http } from "../http";

export const SendPrompt = async (value:string) => {
    return fetch("http://localhost:8100/gemini/SendPrompt?format_output=TEXT", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ value })
    })
    //return await http.post<string>(URL + "/SendPrompt", {value})
}