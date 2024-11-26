import { NewsProp } from "@Screens/NewsFlowStack/HomeScreen";
import constate from "constate";
import { MarketNews } from "finnhub-ts";
import { useState } from "react";

export const [NewsModuleProvider, useNewsModule] = constate(() => {
  const [allNews, setAllNews] = useState<undefined | NewsProp[]>([]);
  const [visitedPlaces, setVisitedPlaces] = useState<undefined | {}>(undefined);

  const setNewsData = (allNews) => {
    const newsData = allNews?.map((news: NewsProp, index: number) => {
      return {
        id: news.id,
        headline: news.headline.substring(0, 50),
        summary: news.summary,
        image: news.image,
        source: news.source,
        datetime: new Date(Number(news.datetime) * 1000).toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        }),
      };
    });

    setAllNews(newsData);
  };

  return {
    allNews,
    visitedPlaces,
    setNewsData,
    setVisitedPlaces,
    setAllNews,
  };
});
