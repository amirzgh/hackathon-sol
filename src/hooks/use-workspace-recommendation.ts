//import { Metrics } from "@/types/metrics";
import { getAllReviews } from "@/functionalities/new";
//import { useState } from "react";
// import dotenv from "dotenv";
// dotenv.config();

async function makeRequest(systemPrompt: string, userPromt: string) {
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
                { role: "system", content: systemPrompt },
                { role: "user", content: userPromt}
            ]
        })
    });

    const data = await response.json();
    console.log(data)
    return data.choices[0].message.content;
}

async function askAI(user_request: string = '', requirements: string[] = []) {
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

    Each review scores a workspace on the following metrics (0-10 scale):
    charging_plug_availability: Availability of plug points (true/false, true = there are plugs available, false = no plugs available)
    noise_level: Ambient noise at the venue (10 = very noisy, 0 = very quiet)
    internet_speed: Speed of the internet (10 = very fast, 0 = very slow)
    crowdedness: How crowded the venue feels (10 = very crowded, 0 = very empty)

    ** important: do not send the output using markdpwn code block. just send the json object.**
    {
    "venue": "Name of the selected workspace",
    "reasoning": "1-2 natural, human-friendly sentences explaining why this workspace suits the user's purpose."
    }

    **** Data ****
    ** User Input **
    `;
    if (user_request == '' && requirements.length == 0) {
        return 0;
    }

    const user_input = {
        "hard_requirements": requirements,
        "user_text": user_request
    }

    const metrics = await getAllReviews();

    const str_input = JSON.stringify(user_input);
    const str_metrics = JSON.stringify(metrics);
    const promt = str_input + '\n**Dataset**\n' + str_metrics;
    const result = await makeRequest(systemPrompt, promt);
    console.log(result);
    return result;
}

export {askAI}