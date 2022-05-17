import React from "react";
import { Route, Routes } from "react-router-dom";
import ApplicationContainer from "./ApplicationContainer";
import Header from "../Components/Header";

const App = () => {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/*" element={<ApplicationContainer />} />
      </Routes>
    </div>
  );
};

export default App;
