import { Routes, Route } from "react-router-dom";
import Home from "./components/Home"
import Navbar from "./components/Navbar";
import HighestReview from "./components/HighestReview";
import LowestReview from "./components/LowestReview";
import About from "./components/About"

function App() {
  return(
    <div>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/highest" element={<HighestReview/>}/>
        <Route path="/lowest" element={<LowestReview/>}/>
        <Route path="/about" element={<About/>} />
      </Routes>
    </div>
  )
}

export default App;
