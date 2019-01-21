import React from "react";

function ResultMsg({ children }) {
  return (
    <div
      style={{ height: 100, clear: "both", paddingTop: 50, textAlign: "center" }}    >
      {children}
    </div>
  );
}

export default ResultMsg;
