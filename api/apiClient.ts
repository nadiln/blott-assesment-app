// // type APIClientOptions = Parameters<typeof window.fetch>;

// type ApiClientOptions = Parameters<typeof window.fetch>[1];

// export default async function ApiClient(url: string, options: ApiClientOptions) {
//   const baseUrl = "https://finnhub.io/docs/api";
//   const fullUrl = baseUrl + url;
//   console.log("2", fullUrl);
//   const response = await window.fetch(fullUrl, {
//     ...options,
//     // method: "GET",
//     headers: {
//       "Content-Type": "application/json",
//       "X-AppApiToken": "ZjN1dEJlcmk4ZjU0amRBWjFORFdFNVBENzlaTWUyVDk=",
//       "X-AppType": "doc",
//       apiKey: "crals9pr01qhk4bqotb0crals9pr01qhk4bqotbg",
//     },
//   });
//   if (!response.ok) {
//     console.log("Error response --", options?.method, fullUrl, response.status);
//   }
//   //   console.log(response.ok);
//   console.log("API request --", fullUrl, options, response.status);

//   const responseBody = await response.json();
//   //   console.log("API response --", response.json());
//   return responseBody;
// }

import { DefaultApi, MarketNews } from "finnhub-ts";

const finnhubClient = new DefaultApi({
  apiKey: "crals9pr01qhk4bqotb0crals9pr01qhk4bqotbg",
  isJsonMime: (input) => {
    try {
      JSON.parse(input);
      return true;
    } catch (error) {
      console.log("[Error-API-Client]", error);
    }
    return false;
  },
});

// const { marketNews } = finnhubClient;
type MarketNewsResponse = {
  data?: MarketNews[];
  error?: string;
};
const fetchMarketNews = async (): Promise<MarketNewsResponse> => {
  try {
    const response = await finnhubClient.marketNews("general");
    if (response.status !== 200) {
      console.log("Error response --", response.status);
      return { error: response.statusText };
    }
    // console.log("API request --", response.data);
    return { data: response.data };
  } catch (error) {
    console.log("[Error-API-Client]", error);
    return { error: error.message };
  }
};

export { fetchMarketNews };
