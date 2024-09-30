import { useContext } from "react";
import {
  FeedbackContext,
  FeedbackContextType,
} from "../context/feedbackContext";

export const useFeedback = (): FeedbackContextType => {
  const context = useContext(FeedbackContext);
  if (!context) {
    throw new Error("useFeedback must be used within a FeedbackProvider");
  }
  return context;
};
