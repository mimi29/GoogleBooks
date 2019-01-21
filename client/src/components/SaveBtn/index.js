import React from "react";
import "./style.css";

// The ...props means, spread all of the passed props onto this element
// That way we don't have to define them all individually
function SaveBtn(props) {
  return (
    <span className="save-btn btn" {...props} role="button" tabIndex="1">
      Save
    </span>
  );
}

export default SaveBtn;
