import axios from "axios";
import { createContext, useState, ReactNode, useEffect } from "react";
import { useAdminAuth } from "../hooks/useAdminAuth";

export interface Feedback {
  _id: string;
  userId: {
    _id: string;
    email: string;
  };
  name: string;
  email: string;
  rating: number;
  comment: string;
  date: string;
  reply: string;
}

export interface FeedbackContextType {
  feedbacks: Feedback[];
  addFeedback: (feedback: Feedback) => Promise<boolean>;
  updateFeedback: (feedback: Feedback) => Promise<boolean>;
  deleteFeedback: (id: string) => Promise<boolean>;
}

const FeedbackContext = createContext<FeedbackContextType | undefined>(
  undefined
);

export const FeedbackProvider = ({ children }: { children: ReactNode }) => {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const { token } = useAdminAuth();

  const addFeedback = async (feedback: Feedback) => {
    return await axios
      .post("http://localhost:3000/api/auth/feedback", feedback, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setFeedbacks([...feedbacks, res.data]);
        return true;
      })
      .catch((err) => {
        console.log(err);
        return false;
      });
  };

  const getFeedbacks = async () => {
    console.log(token);
    await axios
      .get("http://localhost:3000/api/auth/feedbacks", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setFeedbacks(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const updateFeedback = async (updatedFeedback: Feedback) => {
    return await axios
      .put(`http://localhost:3000/api/auth/feedback/reply/`, updatedFeedback, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        setFeedbacks(
          feedbacks.map((feedback) =>
            feedback._id === updatedFeedback._id ? updatedFeedback : feedback
          )
        );
        return true;
      })
      .catch((err) => {
        console.log(err);
        return false;
      });
  };

  const deleteFeedback = async (id: string) => {
    return await axios
      .delete(`http://localhost:3000/api/auth/feedback/reply/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        setFeedbacks(
          feedbacks.map((feedback) =>
            feedback._id === id ? { ...feedback, reply: "" } : feedback
          )
        );
        return true;
      })
      .catch((err) => {
        console.log(err);
        return false;
      });
  };

  useEffect(() => {
    if (token) {
      getFeedbacks();
    } else {
      console.log("No token");
    }
  }, [token]);

  useEffect(() => {
    console.log("Feedbacks:", feedbacks);
  }, [feedbacks]);

  return (
    <FeedbackContext.Provider
      value={{ feedbacks, addFeedback, updateFeedback, deleteFeedback }}
    >
      {children}
    </FeedbackContext.Provider>
  );
};

export { FeedbackContext };
