import React, { useEffect, useState } from "react";
import { EStatus, INotification } from "./types";

const Notification: React.FC<INotification> = ({ status, message }) => {
  let icon;
  let classNames;
  let border;
  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    const duration = 5000;
    const interval = 10;
    const steps = duration / interval;

    const timer = setInterval(() => {
      setProgress((prevProgress) => prevProgress - 100 / steps);
    }, interval);

    const hideTimer = setTimeout(() => {
      setVisible(false);
      clearInterval(timer);
    }, duration);

    return () => {
      clearTimeout(hideTimer);
      clearInterval(timer);
    };
  }, []);
  switch (status) {
    case EStatus.SUCCESS: {
      icon = (
        <span className="mr-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-5 w-5"
          >
            <path
              fill-rule="evenodd"
              d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
              clip-rule="evenodd"
            />
          </svg>
        </span>
      );
      classNames = `bg-green-100 text-green-700`;
      border = "bg-green-500";
      break;
    }
    case EStatus.ERROR: {
      icon = (
        <span className="mr-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-5 w-5"
          >
            <path
              fill-rule="evenodd"
              d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.72 6.97a.75.75 0 10-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 101.06 1.06L12 13.06l1.72 1.72a.75.75 0 101.06-1.06L13.06 12l1.72-1.72a.75.75 0 10-1.06-1.06L12 10.94l-1.72-1.72z"
              clip-rule="evenodd"
            />
          </svg>
        </span>
      );
      classNames = `bg-red-100 text-red-700`;
      border = "bg-red-500";
      break;
    }
  }

  return (
    <div
      className={`mb-3 absolute top-20 right-5 items-center rounded-lg px-3 py-3 lg:px-6 lg:py-5 text-base ${classNames} ${
        visible ? "opacity-100" : "opacity-0 transition-opacity duration-500"
      }`}
      role="alert"
    >
      <div className="flex flex-row">
        <span className="cursor-pointer mr-2" onClick={() => setVisible(false)}>
          {icon}
        </span>
        {message}
      </div>
      <div className={`h-1 ${border}`} style={{ width: `${progress}%` }}></div>
    </div>
  );
};

export default Notification;
