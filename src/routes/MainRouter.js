import React from "react";
import { Route, Routes } from "react-router-dom";
import {
  DashboardPage,
  HomePage,
  LoginPage,
  RegisterPage,
  RecoverPassword,
  ReplacePassword,
  NotfoundPage,
  ProfileEdit,
  PropertyDetails,
  ProfilePage,
} from "../pages";
import { PublicRoutes as Public } from "./PublicRoutes";
import { PrivateRoutes as Private } from "./PrivateRoutes";

const MainRouter = () => (
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
      path="/recover"
      element={
        <Public>
          <RecoverPassword />
        </Public>
      }
      replace
    />
    <Route
      path="/replacepassword/:token"
      element={
        <Public>
          <ReplacePassword />
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
        path="user/:id"
        element={
          <Private>
            <ProfilePage />
          </Private>
        }
        replace
      />
      <Route
        path="user/:id/edit"
        element={
          <Private>
            <ProfileEdit />
          </Private>
        }
        replace
      />
      <Route
        path="property/:id"
        element={
          <Private>
            <PropertyDetails />
          </Private>
        }
        replace
      />
    </Route>
    <Route path="*" element={<NotfoundPage />} />
  </Routes>
);

export default MainRouter;
