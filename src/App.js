import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import ImageLoader from "./components/ImageLoader";

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/mirock/:imageId" element={<ImageLoader />} />
                    <Route
                        path="/mirock/hamilton/:imageId"
                        element={<ImageLoader />}
                    />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
