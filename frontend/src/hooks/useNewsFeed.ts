import { useContext } from "react";
import {
  NewsFeedContext,
  NewsFeedContextType,
} from "../context/newsFeedContext";

export const useNewsFeed = (): NewsFeedContextType => {
  const context = useContext(NewsFeedContext);
  if (!context) {
    throw new Error("useNewsFeed must be used within a NewsFeedProvider");
  }
  return context;
};
