import { Metrics } from "@/types/metrics";
import { useState } from "react";
import dotenv from "dotenv";
dotenv.config();



const systemPrompt = `
    You are an intelligent recommendation system for coworking spaces. Your task is to carefully interpret structured User Input and select the workspace that best matches the user's requirements and preferences, using the Workspace Dataset provided. Follow the instructions below closely.
    ****Instructions****
    **User Input:**
    The user input is a JSON object composed of:
    hard_requirements: a JSON dictionary indicating whether each feature is required (1) or not (0). For example, "charging_plugs": 1 means charging plugs are required.
    user_text: a natural language sentence describing the purpose of their visit.
    Example User Input:
    { "hard_requirements": { "charging_plugs": 1, "silent": 0, "high_internet_speed": 1, "low_crowdedness": 0 }, "user_text": "I'm making a Zoom call." }
    **Recommendation Logic:**
    Prioritize all hard requirements. Only consider workspaces that meet all required features. If this is not possible, make it clear in your output.
    Refine using the user's purpose. Use the user's text description to infer ideal conditions.
    Use common sense reasoning (e.g. Zoom calls need quiet, fast internet; reading requires silence and uncrowded spaces; group work benefits from moderate noise and uncrowded areas).
    Select the single best matching workspace based on the above criteria.
    **Output Format:**
    ensure the output is json like same as following format:

    **Dataset Information:**
    The dataset consists of a JSON array of objects, where each object contains a user review of a workspace in the following format:
    [{ "venue": "Name of the selected workspace", "metrics": { "internet_speed": integer, "charging_plug_availability": integer, "noise_level": integer, "crowdedness": integer } }]

    Each review scores a workspace on the following metrics (1-10 scale):
    charging_plug_availability: Availability of plug points (10 = many plugs, 1 = very few)
    noise_level: Ambient noise at the venue (10 = very noisy, 1 = very silent)
    internet_speed: Speed of the internet (10 = very fast, 1 = very slow)
    crowdedness: How crowded the venue feels (10 = very crowded, 1 = very uncrowded)

    ** important: do not send the output using markdpwn code block. just send the json object.**
    {
    "venue": "Name of the selected workspace",
    "reasoning": "1-2 natural, human-friendly sentences explaining why this workspace suits the user's purpose."
    }

    **** Data ****
    ** User Input **
    `;




// function useWorkspaceRecommendation() {
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState<string | null>(null);
//     const [recommendation, setRecommendation] = useState<any | null>(null);
    

//     const fetchRecommendation = async (userIntention: string, hard_requirements: Metrics) => {
//         setLoading(true);
//         setError(null);
//         try {
//             const reviewsResponse = await fetch('/mock-json-data.json')
//             if (!reviewsResponse.ok) {
//                 throw new Error("Failed to load workspace data");
//             }
//             const reviewsData = await reviewsResponse.json();
//             // Simulate an API call remove this later

//             const reviewText = reviewsData.workspaces.map((ws: any, i: number) => {
//                 const reviews = ws.reviews.map(
//                   (r: Metrics, j: number) =>
//                     `  Review ${j + 1}: wifi=${r.wifi_speed}, plugs=${r.plugs}, noise=${r.noice}, business=${r.crowdence}`
//                 ).join('\n');
//                 return `Workspace ${i + 1}: ${ws.name}\n${reviews}`;
//               }).join('\n\n');

//               const userPrompt = `
//                     User intention: ${userIntention}
//                     hard requirements: ${JSON.stringify(hard_requirements)}
//                     Here are workspace reviews:
//                     {reviewText}
//                         ${reviewText}`;
                


//             const response = fetch("https://openrouter.ai/api/v1/chat/completions",{
//                 method: 'POST',
//                 headers: { 
//                     "Authorization": `Bearer ${import.meta.env.VITE_OPENROUTER_API_KEY}`,
//                     "Content-Type": "application/json",
//                 },
//                 body: JSON.stringify({model: "deepseek/deepseek-chat",
//                 messages: [
//                 { role: "system", content: systemPrompt },
//                 { role: "user", content: userPrompt },
//                 ],
//                 temperature: 0.7, }),
//             }).then((res) => {
//                 if (!res.ok) {
//                     throw new Error("Network response was not ok");
//                 }
                
//                 return res.json();
//             })
//             const data = await response;
//             console.log(data);
//             setRecommendation(data?.choices?.[0]?.message?.content);
//         } catch (err) {
//             setError("Failed to fetch recommendation");
//         } finally {
//             setLoading(false);
//         }
//     };

//     return { recommendation, loading, error, fetchRecommendation };
// }

async function makeRequest(systemPrompt: string) {
    // const fetch = require('node-fetch');
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
            "Authorization": "Bearer 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",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            model: "deepseek/deepseek-chat", // Or "deepseek-coder" if applicable
            messages: [
                { role: "system", content: systemPrompt }
            ]
        })
    });

    const data = await response.json();
    return data.choices[0].message.content;
}

async function askAI(var1: Object, var2:Metrics) {
    const systemPrompt = `
    You are an intelligent recommendation system for coworking spaces. Your task is to carefully interpret structured User Input and select the workspace that best matches the user's requirements and preferences, using the Workspace Dataset provided. Follow the instructions below closely.
    ****Instructions****
    **User Input:**
    The user input is a JSON object composed of:
    hard_requirements: a JSON dictionary indicating whether each feature is required (1) or not (0). For example, "charging_plugs": 1 means charging plugs are required.
    user_text: a natural language sentence describing the purpose of their visit.
    Example User Input:
    { "hard_requirements": { "charging_plugs": 1, "silent": 0, "high_internet_speed": 1, "low_crowdedness": 0 }, "user_text": "I'm making a Zoom call." }
    **Recommendation Logic:**
    Prioritize all hard requirements. Only consider workspaces that meet all required features. If this is not possible, make it clear in your output.
    Refine using the user's purpose. Use the user's text description to infer ideal conditions.
    Use common sense reasoning (e.g. Zoom calls need quiet, fast internet; reading requires silence and uncrowded spaces; group work benefits from moderate noise and uncrowded areas).
    Select the single best matching workspace based on the above criteria.
    **Output Format:**
    ensure the output is json like same as following format:

    **Dataset Information:**
    The dataset consists of a JSON array of objects, where each object contains a user review of a workspace in the following format:
    [{ "venue": "Name of the selected workspace", "metrics": { "internet_speed": integer, "charging_plug_availability": integer, "noise_level": integer, "crowdedness": integer } }]

    Each review scores a workspace on the following metrics (1-10 scale):
    charging_plug_availability: Availability of plug points (10 = many plugs, 1 = very few)
    noise_level: Ambient noise at the venue (10 = very noisy, 1 = very silent)
    internet_speed: Speed of the internet (10 = very fast, 1 = very slow)
    crowdedness: How crowded the venue feels (10 = very crowded, 1 = very uncrowded)

    ** important: do not send the output using markdpwn code block. just send the json object.**
    {
    "venue": "Name of the selected workspace",
    "reasoning": "1-2 natural, human-friendly sentences explaining why this workspace suits the user's purpose."
    }

    **** Data ****
    ** User Input **
    `;
    let user_input = {
        "hard_requirements": {
            "charging_plugs": var1["charging_plugs"], 
            "silent": var1["silent"], 
            "high_internet_speed": var1["high_internet_speed"], 
            "low_crowdedness": var1["low_crowdedness"]
        }
    }

    const str_input = JSON.stringify(user_input);
    const str_metrics = JSON.stringify(var2);
    const promt = systemPrompt + '\n' + str_input + '\n**Dataset**\n' + str_metrics;
    const result = await makeRequest(promt);
    return result
}

export {askAI}