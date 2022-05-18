import React from "react";
import { Route, Routes } from "react-router-dom";
import ApplicationContainer from "./ApplicationContainer";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import "./styles.scss";

const App = () => {
    return (
        <>
            <div className={"app-wrapper "}>
                <Header />
                <Routes>
                    <Route path="/*" element={<ApplicationContainer />} />
                </Routes>
                <Footer />
            </div>
        </>
    );
};

export default App;