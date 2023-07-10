import { Configuration, OpenAIApi } from "openai";

export const backendURL = "http://127.0.0.1:8000";
// export const backendURL = "https://octopus-app-fjfrx.ondigitalocean.app";

const configuration = new Configuration({
  apiKey: "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",
});

export const openai = new OpenAIApi(configuration);
