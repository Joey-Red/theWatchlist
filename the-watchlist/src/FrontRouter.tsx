import { Routes, Route } from "react-router-dom";
import App from "./App";
import React from "react";
import SharedProfile from "./components/mini-components/SharedProfile";

function FrontRouter() {
    return (
        <div>
            <Routes>
                {" "}
                <Route path="/" element={<App />} />
                <Route path="/user:id" element={<SharedProfile />} />
                {/* <App /> */}
            </Routes>
        </div>
    );
}

export default FrontRouter;
