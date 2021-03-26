
import {useState} from "react"
import './App.css';

function App() {
  const [num,updateNum] = useState(0)
  return (
    <div className="App">
      {num}
      <button onClick={
        ()=>{updateNum(num+1)}
      }>add</button>
    </div>
  );
}

export default App;
