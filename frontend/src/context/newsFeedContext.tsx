import { createContext, useState, ReactNode, useEffect } from "react";
import axios from "axios";
import { useAdminAuth } from "../hooks/useAdminAuth";

export interface NewsFeed {
  _id: string;
  itemId: string;
  // photo: string;
  discount: string;
  description: string;
}

export interface NewsFeedContextType {
  newsFeeds: NewsFeed[];
  addNewsFeed: (newsFeed: NewsFeed) => Promise<boolean>;
  updateNewsFeed: (newsFeed: NewsFeed) => Promise<boolean>;
  deleteNewsFeed: (id: string) => Promise<boolean>;
}

const NewsFeedContext = createContext<NewsFeedContextType | undefined>(
  undefined
);

export const NewsFeedProvider = ({ children }: { children: ReactNode }) => {
  const [newsFeeds, setNewsFeeds] = useState<NewsFeed[]>([]);
  const { token } = useAdminAuth();


  const addNewsFeed = async (newsFeed: NewsFeed) => {
    return await axios
      .post("http://localhost:3000/api/auth/newsfeeds", newsFeed, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        setNewsFeeds([...newsFeeds, newsFeed]);
        return true;
      })
      .catch((error) => {
        console.error("Error adding news feed:", error);
        return false;
      });
  };

  const updateNewsFeed = async (updatedNewsFeed: NewsFeed) => {
    return await axios
      .put(
        `http://localhost:3000/api/auth/newsfeeds/${updatedNewsFeed._id}`,
        updatedNewsFeed,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(() => {
        setNewsFeeds(
          newsFeeds.map((newsFeed) =>
            newsFeed._id === updatedNewsFeed._id ? updatedNewsFeed : newsFeed
          )
        );
        return true;
      })
      .catch((error) => {
        console.error("Error updating news feed:", error);
        return false;
      });
  };

  const deleteNewsFeed = async (id: string) => {
    return await axios.delete(`http://localhost:3000/api/auth/newsfeeds/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(() => {
      setNewsFeeds(newsFeeds.filter((newsFeed) => newsFeed._id !== id));
      return true;
    })
    .catch((error) => {
      console.error("Error deleting news feed:", error);
      return false;
    });
  };

  const getNewsFeeds = async () => {
    const response = await axios.get(
      "http://localhost:3000/api/auth/newsfeeds"
    );
    setNewsFeeds(response.data);
  };

  useEffect(() => {
    getNewsFeeds();
  }, []);

  useEffect(() => {
    console.log("News Feeds:", newsFeeds);
  }, [newsFeeds]);

  return (
    <NewsFeedContext.Provider
      value={{ newsFeeds, addNewsFeed, updateNewsFeed, deleteNewsFeed }}
    >
      {children}
    </NewsFeedContext.Provider>
  );
};

export { NewsFeedContext };
