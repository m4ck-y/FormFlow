
import React, { useEffect } from "react";
import Profile from "./account/profile";
const TestUI = () => {


  return (
    <div>
      <h1>Test UI</h1>
      <p>This is a test component.</p>
      <div style={{ border: "1px solid black", padding: "20px" }}>
     <Profile/>
      </div>
    </div>
  );
};

export default TestUI;
