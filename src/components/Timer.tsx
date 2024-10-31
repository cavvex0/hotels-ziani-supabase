"use client";

import { format } from "date-fns";
import { useEffect, useState } from "react";

const Timer = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    // Update time every second
    const intervalId = setInterval(() => {
      setTime(new Date());
    }, 1000);

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, []);
  return (
    <div className="bg">
      <span className="font-realce text-2xl text-orange-600">
        {format(time, "dd/MM/yyyy ||| HH:mm:ss |||")}
      </span>
    </div>
  );
};

export default Timer;
