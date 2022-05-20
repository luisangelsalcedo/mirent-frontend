import React from "react";
import { Route, Routes } from "react-router-dom";
import {
  DashboardPage,
  HomePage,
  LoginPage,
  NotfoundPage,
  PropertyPage,
  RegisterPage,
} from "../pages";
import { PublicRoutes as Public } from "./PublicRoutes";
import { PrivateRoutes as Private } from "./PrivateRoutes";

export const MainRouter = () => (
  <Routes>
    <Route
      path="/"
      element={
        <Public>
          <HomePage />
        </Public>
      }
      replace
    />
    <Route
      path="/register"
      element={
        <Public>
          <RegisterPage />
        </Public>
      }
      replace
    />
    <Route
      path="/login"
      element={
        <Public>
          <LoginPage />
        </Public>
      }
      replace
    />
    <Route
      path="/dashboard"
      element={
        <Private>
          <DashboardPage />
        </Private>
      }
      replace
    >
      <Route
        path="property/:id"
        element={
          <Private>
            <PropertyPage />
          </Private>
        }
        replace
      />
    </Route>
    <Route path="*" element={<NotfoundPage />} />
  </Routes>
);
