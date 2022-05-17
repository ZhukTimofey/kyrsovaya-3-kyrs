import React, { useEffect } from "react";
import LoginPage from "./LoginPage";
import { Route, Routes, useNavigate } from "react-router-dom";
import SignupPage from "./SignupPage";
import GoodsPage from "./GoodsPage";
import CreationPage from "./CreationPage";
import HomePage from "./HomePage";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { cookieLogin } from "./UserStore";
import UsersGoods from "./GoodsPage/UsersGoods";
import ProductPage from "./ProductPage";

const ApplicationContainer = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(cookieLogin());
  }, []);

  return (
    <div>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/" element={<GoodsPage />} />
        <Route path="/your-goods" element={<UsersGoods />} />
        <Route path="/creation" element={<CreationPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/goods/:id" element={<ProductPage />} />
      </Routes>
    </div>
  );
};

export default ApplicationContainer;
