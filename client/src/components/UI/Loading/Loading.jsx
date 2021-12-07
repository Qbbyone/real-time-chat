import React from "react";
import Loader from "react-loader-spinner";

const Loading = () => {
  return (
    <div className="wrapper">
      <div className="loading">
        <Loader
          type="ThreeDots"
          color="#ffffff"
          height={50}
          width={50}
        />
      </div>
    </div>
  );
};

export default Loading;
