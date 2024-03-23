import './App.css';

import {
    Route, Routes, BrowserRouter
} from "react-router-dom";
import Information from "./Information";
import Mons from "./Mons";
import CoachPage from "./CoachPage";
import NavigationBar from "./NavBar";

function App() {
    return (
        <>

            <div className="holder">
                <BrowserRouter>
                    <NavigationBar />
                    <Routes>
                        <Route path="/" element={<Mons />}/>
                        <Route path="/coach/:coachnum" element={<CoachPage/>}/>
                        <Route path="/about" element={<Information/>}/>

                    </Routes>
                </BrowserRouter>
            </div>
        </>
    );
}

export default App;
