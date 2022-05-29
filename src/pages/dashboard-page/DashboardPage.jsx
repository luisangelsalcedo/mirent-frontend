import React, { useContext } from "react";
import "./dashboard-page.scss";
import { Outlet, useParams, useLinkClickHandler } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import {
  Avatar,
  Logo,
  Btn,
  ToggleMode,
  NotificationContext,
  ModalContext,
} from "../../components/designSystem";
import { exit } from "../../redux/actions";
import { PropertyList } from "../property-page/PropertyList";
import { CreditsPage } from "../credits-page/CreditsPage";

export const DashboardPage = () => {
  const { name, image, id: userID } = useSelector((state) => state.user.auth);
  const dispatch = useDispatch();
  const { id: isOpen } = useParams();
  const { openModal } = useContext(ModalContext);
  const { openNotice } = useContext(NotificationContext);

  const goToProfile = useLinkClickHandler(`user/${userID}`);
  const goToHome = useLinkClickHandler(`/dashboard`);

  const handleLogout = async () => {
    dispatch(exit());
    await openNotice(`See you soon ${name.split(" ")[0]}`);
  };

  const openCredits = () => {
    openModal(<CreditsPage />);
  };

  const openNotifications = () => {
    openModal("<NotificationsPage />");
  };

  return (
    <div className={`${isOpen ? "active" : ""}`}>
      <div className="dashboard">
        <div className="dashboard-header">
          <div className="container">
            <div>
              <Logo onClick={openCredits} />
              <div className="separador" />
              <Btn fa="home" btn="circle" onClick={goToHome} />
              <Btn fa="bell-o" btn="circle" onClick={openNotifications} />
            </div>

            <div>
              <Avatar name={name} img={image} handler={goToProfile} />
              <Btn label="Salir" fa="sign-out" onClick={handleLogout} />
            </div>
            <ToggleMode />
          </div>
        </div>
        <div className="dashboard-body">
          <div className="dashboard-body-left bg-red">
            <PropertyList />
          </div>
          <div className="dashboard-body-right">
            <div className="container">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
