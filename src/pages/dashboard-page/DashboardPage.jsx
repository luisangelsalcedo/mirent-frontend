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
// import { FavListPage } from "../../pages/FavListPage";
import { exit } from "../../redux/actions";
// import { CreditsPage } from "../../pages/CreditsPage";

export const DashboardPage = () => {
  const { name, imageUrl, id: userID } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { id: isOpen } = useParams();
  const { openModal } = useContext(ModalContext);
  const { openNotice } = useContext(NotificationContext);

  const toUser = useLinkClickHandler(`user/${userID}`);

  const handleLogout = async () => {
    dispatch(exit());
    await openNotice(`See you soon ${name.split(" ")[0]}`);
  };

  const handleCredits = () => {
    openModal("<CreditsPage />");
  };

  return (
    <div className={`${isOpen ? "active" : ""}`}>
      <div className="dashboard">
        <div className="dashboard-header">
          <div className="container">
            <Logo onClick={handleCredits} />
            <div>
              <Avatar name={name} img={imageUrl} handler={toUser} />
              <Btn label="Salir" fa="sign-out" onClick={handleLogout} />
            </div>
            <ToggleMode />
          </div>
        </div>
        <div className="dashboard-body">
          <div className="dashboard-body-left bg-red">
            {/* <FavListPage /> */}
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
