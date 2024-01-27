import { ChangeEvent, useEffect, useState } from "react";

import "./App.css";
import { readFile } from "./fileReaderHelper";

function App() {
  const [fileText, setFileText] = useState<string>("");
  const [currentState, setCurrentState] = useState<number>(0);
  const [complierAcceptedTokens, setCompilerAcceptedTokens] = useState<string[]>([]);

  const onTextChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const value = event.target.value;
    setFileText(value);
  };

  useEffect(() => {
    const { currentState, acceptedTokens } = readFile(fileText);
    setCurrentState(currentState);
    setCompilerAcceptedTokens(acceptedTokens);
  }, [fileText]);

  return (
    <div>
      <p>استیت اتوماتا در این مرحله: {currentState}</p>

      <div style={{ border: "1px dotted gold", padding: 4, direction: "ltr" }}>
        <p>هر متنی در این باکس قرار دهید، به عنوان فایل ورودی در نظر گرفته میشود </p>
        <input onChange={onTextChange} style={{ width: 400, height: 50 }}></input>
      </div>

      {!!complierAcceptedTokens.length && <p>توکن های اکسپت شده عبارتند از :</p>}
      {complierAcceptedTokens.map((token) => {
        return token === "COMPILE ERROR" ? <p style={{ color: "red" }}>{token}</p> : <p style={{ color: "#2ad12d" }}>{token}</p>;
      })}
    </div>
  );
}

export default App;
