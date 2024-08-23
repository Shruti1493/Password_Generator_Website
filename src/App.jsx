import { useCallback, useEffect, useRef, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [length, setLength] = useState(13);
  const [char, setChar] = useState(false);
  const [num, setNum] = useState(false);
  const [pass, setPass] = useState("");

  const handleCursor = (e) => {
    setLength(e.target.value);
  };

  const GeneratePassword = useCallback(() => {
    const alphastr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    const charstr = "-_+=)(*&^%$#@!?><`~";
    const numstr = "1234567890";

    var generatedpass = "";
    let i = 1;
    while (i <= length) {
      let x = Math.floor(Math.random() * 52);
      generatedpass += alphastr[x];
      i++;
      if (num && i < length) {
        let x1 = Math.floor(Math.random() * numstr.length);
        generatedpass += numstr[x1];
        i++;
      }
      if (char && i < length) {
        let x2 = Math.floor(Math.random() * charstr.length);
        generatedpass += charstr[x2];
        i++;
      }
    }
    setPass(generatedpass);
  }, [length, char, num, setPass]);

  useEffect(() => {
    GeneratePassword();
  }, [length, char, num, setPass]);

  const passref = useRef(null);
  const copyPassword = useCallback(() => {
    passref.current?.select();
    window.navigator.clipboard.writeText(pass);
  }, [length, num, pass, setPass]);
  return (
    <div className="p-4 max-w-md mx-auto bg-white rounded-xl shadow-md space-y-4 dark:bg-gray-800">
      <h1 className="text-3xl font-bold underline text-gray-900 dark:text-white">
        Password Generator
      </h1>
      <div className="flex flex-col space-y-2">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
          Password Length: {length}
        </h2>
        <input
          type="range"
          min="1"
          max="15"
          onChange={handleCursor}
          value={length}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
        />
      </div>

      <div className="flex items-center space-x-2">
        <input
          id="character"
          type="checkbox"
          checked={char}
          onChange={() => setChar(!char)}
          className="h-4 w-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600"
        />
        <label
          htmlFor="character"
          className="text-sm font-medium text-gray-900 dark:text-gray-300"
        >
          Character
        </label>

        <input
          id="number"
          type="checkbox"
          checked={num}
          onChange={() => setNum(!num)}
          className="h-4 w-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600"
        />
        <label
          htmlFor="number"
          className="text-sm font-medium text-gray-900 dark:text-gray-300"
        >
          Number
        </label>
      </div>

      <div className="flex flex-col space-y-2">
        <label
          htmlFor="password"
          className="text-sm font-medium text-gray-900 dark:text-white"
        >
          Password
        </label>
        <input
          type="text"
          id="password"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          value={pass}
          ref={passref}
        />
      </div>

      <button
        type="button"
        onClick={copyPassword}
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
      >
        Copy
      </button>
    </div>
  );
}

export default App;
