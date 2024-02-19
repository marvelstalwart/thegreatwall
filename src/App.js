import React, {useState, useEffect} from "react"
import Navbar from "./components/Navbar";
import NavBarLayout from "./components/NavBarLayout";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
function App() {
  const [reviewFormOpen, setReviewFormOpen] = useState(false)


  return (
    <div className="font-nunito">
    
      <Router>

        <Routes>
          <Route  element={<NavBarLayout setReviewFormOpen={setReviewFormOpen}/>}>
          <Route path="/:token" element={<Home reviewFormOpen={reviewFormOpen} setReviewFormOpen={setReviewFormOpen}/>}/>
          <Route path="*" element={<Home  reviewFormOpen={reviewFormOpen} setReviewFormOpen={setReviewFormOpen}/>}/>

          </Route>
        </Routes>
        </Router>

    </div>
  );
}

export default App;
