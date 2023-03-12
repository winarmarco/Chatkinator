import React from "react";
import {AiOutlineLoading3Quarters} from "react-icons/ai";

const LoadingText = () => {
  return (
    <div className="flex items-center justify-center w-full h-16 text-slate-50">
      <span className="flex items-center justify-center gap-2">
        <AiOutlineLoading3Quarters className="inline animate-spin" />
        <p>Loading...</p>
      </span>
    </div>
  );
};

export default LoadingText;
