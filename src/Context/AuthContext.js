import React, { createContext, useState, useEffect } from "react";
import { auth } from "../firebase";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const websiteState = {
    moodTracker: "",
    questionsSelected: [],
    userData: null,
    date: null,
  };
  const websiteDataKey = "websitedata";

  const cleanLocalStorage = () => {
    console.log("CLEAN");
    localStorage.removeItem(websiteDataKey);
  };

  function isEightHoursPassed() {
    const earlierTimestamp = new Date(websiteState.date).getTime(); // Replace this with your earlier recorded time
    const currentTimestamp = new Date().getTime();
    const eightHoursInMilliseconds = 8 * 60 * 60 * 1000; // 8 hours in milliseconds
    const timeDifference = currentTimestamp - earlierTimestamp;

    return timeDifference >= eightHoursInMilliseconds;
  }

  const timeRemaining = () => {
    const localdata = JSON.parse(localStorage.getItem(websiteDataKey));
    console.log("THE LOCALA DATE ", localdata.date);
    const earlierTimestamp = new Date(localdata.date).getTime(); // Replace this with your earlier recorded time
    const currentTimestamp = new Date().getTime();
    const eightHoursInMilliseconds = 8 * 60 * 60 * 1000; // 8 hours in milliseconds

    const timeDifference =
      eightHoursInMilliseconds - (currentTimestamp - earlierTimestamp);

    if (timeDifference <= 0) {
      return "It's been 8 hours or more since the earlier recorded time.";
    } else {
      const hours = Math.floor(timeDifference / (60 * 60 * 1000));
      const minutes = Math.ceil(
        (timeDifference % (60 * 60 * 1000)) / (60 * 1000)
      );
      return `Remaining time: ${hours} hours and ${minutes} minutes.`;
    }
  };

  const getDateFormat = () => {
    const date = new Date();

    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Note: Month starts from 0
    const year = date.getFullYear().toString();
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");

    const formattedDate = `${day}/${month}/${year} ${hours}:${minutes}`;
    return formattedDate;
  };

  const getMood = () => {
    const localdata = JSON.parse(localStorage.getItem(websiteDataKey));
    return {
      mood: localdata.moodTracker.toUpperCase(),
      image: "./" + localdata.moodTracker + ".png",
    };
  };

  const setMoodTracker = (mood) => {
    const localWebsiteData = JSON.parse(localStorage.getItem(websiteDataKey));
    localWebsiteData.date = new Date();
    localWebsiteData.moodTracker = mood;

    localStorage.setItem(websiteDataKey, JSON.stringify(localWebsiteData));
  };

  const setQuestionsList = (list) => {
    const localWebsiteData = JSON.parse(localStorage.getItem(websiteDataKey));
    // localWebsiteData.date = new Date();
    localWebsiteData.questionsSelected = list;

    localStorage.setItem(websiteDataKey, JSON.stringify(localWebsiteData));
  };

  const setUserInformation = (userInfo) => {
    websiteState.userData = userInfo;
    websiteState.date = new Date();

    localStorage.setItem(websiteDataKey, JSON.stringify(websiteState));
  };

  const getWebsiteState = () => {
    const val = JSON.parse(localStorage.getItem(websiteDataKey));
    return val;
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        websiteState,
        setMoodTracker,
        setQuestionsList,
        setUserInformation,
        getWebsiteState,
        getDateFormat,
        timeRemaining,
        isEightHoursPassed,
        getMood,
        cleanLocalStorage,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
