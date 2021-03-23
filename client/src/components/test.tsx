import React from "react";

const Test = () => {
  return (
    <div className="w-full h-screen flex flex-col">
      <div className="w-screen h-16 border-2 border-red-500"> </div>
      <div className="w-screen h-full border-2 p-1 border-green-500 flex justify-center">
        <div className="w-1/5 border-2 border-yellow-500 h-full mr-4"></div>
        <div className="w-1/2 border-2 border-blue-500 h-full mr-4"></div>
        <div className="w-1/4 border-2 border-gray-900 h-full"></div>
      </div>
    </div>
  );
};

export default Test;
