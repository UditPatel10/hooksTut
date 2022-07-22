import React, {
  useState,
  useReducer,
  useEffect,
  useRef,
  createContext,
  useMemo,
  useCallback
} from "react";
import "./App.css";
import axios from "axios";
import Button from "./Button";
import Login from "./Login";
import User from "./User";
import Call from "./Call";





const reducer = (state, action) => {
  switch (action.type) {
    case "INCREMENT":
      return { count: state.count + 1, showText: state.showText };
    case "toggle":
      return { count: state.count, showText: !state.showText };
    default:
      return state;
  }
};

export const AppContext = createContext(null);

function App() {
  const [data, setData] = useState("");
  const [callback,setCallBack] = useState("call back hook")
  const [username, setUsername] = useState("");
  const [count, setCount] = useState(0);
  const [state, dispatch] = useReducer(reducer, { count: 0, showText: true });
  const inputRef = useRef(null);
  const buttonref = useRef(null);
//useEffect hook syntax
  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/comments")
      .then((response) => {
        setData(response.data);
        console.log("Api was called");
      });
  }, []);
//logic for useMemo hook
  const findLongName = (comments) => {
    if (!comments) return null;
    let longestName = "";
    for (let i = 0; i < comments.length; i++) {
      let currentName = comments[i].name;
      if (currentName.length > longestName.length) {
        longestName = currentName;
      }
    }
    console.log("computed")
    return longestName;
  };
/******/
  const getLongName = useMemo(()=> findLongName(data),[data])
/******/
//useRef hook syntax
  const onClick = () => {
    inputRef.current.focus();
  };
  // const onChange = (e) =>{
  //     setInputValue(e.target.value);
  // }

//logic for useCallback
const returnComment = useCallback(() => { 
  return callback;
 },[callback]);
  return (
    <div className="App">
     <Call comment={returnComment}/> 
      <h1>{state.count} </h1>
      <h1>{count}</h1>
      <p>{getLongName}</p>
      <button
        onClick={() => {
          dispatch({ type: "INCREMENT" });
          dispatch({ type: "toggle" });
        }}
      >
        +
      </button>
      {state.showText && <p>text</p>}
      <button
        onClick={() => {
          setCount(count + 2);
        }}
      >
        ++
      </button>

      <div>
        <h1>udit</h1>
        <input type="text" placeholder="e.g." ref={inputRef} />
        <button onClick={onClick}>Change Name</button>
      </div>

      <div>
        <button
          onClick={() => {
            buttonref.current.alterToggle();
          }}
        >
          parent
        </button>
        <Button ref={buttonref} />
        
      </div>
      
      <AppContext.Provider value={{ username, setUsername }}>
        <Login /> <User />
      </AppContext.Provider>
      
    </div>
  );
}

export default App;
