import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import useToMuiJson from "./useToMuiJson";

function App() {
  const { muiJson, convertToMui } = useToMuiJson();

  const onTextAreaChange = (e: any) => {
    convertToMui(e.target.value);
  };
  return (
    <>
      <p>Enter in CSS </p>
      <textarea
        onChange={onTextAreaChange}
        name="cssArea"
        rows={20}
        cols={50}
      ></textarea>

      <p>Mui JSON</p>
      <textarea name="cssArea" rows={20} cols={50} value={muiJson}></textarea>
    </>
  );
}

export default App;
