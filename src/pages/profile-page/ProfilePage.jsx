import React, { useEffect } from "react";
import "./profile-page.scss";
import { useParams, useLinkClickHandler } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { TitleField, Btn, Preloading } from "../../components/designSystem";
import { useFetchAndLoad } from "../../hooks";
import { getUserService } from "../../services";
import { userAdapter } from "../../adapters";
import { getUserAction } from "../../redux/actions";

export const ProfilePage = () => {
  const { id } = useParams();
  const { loading, callEndpoint } = useFetchAndLoad();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const goToProfileEdit = useLinkClickHandler("edit");

  const handleProfileData = async () => {
    const { user: userLoad } = userAdapter(
      await callEndpoint(getUserService(id))
    );
    if (!userLoad) return;
    dispatch(getUserAction(userLoad));
  };

  useEffect(() => {
    if (!user) {
      handleProfileData();
    }
  }, []);

  return (
    <div className="profile">
      {loading ? (
        <Preloading />
      ) : (
        <div className="container">
          <TitleField text="Perfil" />
          <div className="image">
            <div>L</div>
          </div>

          <div className="content">
            <div className="content-item">
              <div className="content-item-label">Nombre:</div>
              <div className="content-item-info">
                {user?.name ?? "Falta configurar"}
              </div>
            </div>

            <div className="content-item">
              <div className="content-item-label">Email:</div>
              <div className="content-item-info">
                {user?.email ?? "Falta configurar"}
              </div>
            </div>

            <div className="content-item">
              <div className="content-item-label">DNI:</div>
              <div className="content-item-info">
                {user?.dni ?? "Falta configurar"}
              </div>
            </div>

            <div className="content-item">
              <div className="content-item-label">Celular:</div>
              <div className="content-item-info">
                {user?.phone ?? "Falta configurar"}
              </div>
            </div>
          </div>
          <div className="operations">
            <Btn
              label="Editar perfil"
              btn="main"
              fa="edit"
              onClick={goToProfileEdit}
            />
          </div>
        </div>
      )}
    </div>
  );
};
