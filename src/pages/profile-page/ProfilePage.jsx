import React, { useEffect } from "react";
import { useParams, useLinkClickHandler } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { TitleField, Btn, Preloading } from "../../components/designSystem";
import { useFetchAndLoad } from "../../hooks";
import { getUserService } from "../../services";
import { userAdapter } from "../../adapters";
import { getUserAction } from "../../redux/actions";
import "./profile-page.scss";

export const ProfilePage = () => {
  const { id } = useParams();
  const goToProfileEdit = useLinkClickHandler("edit");
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const { loading, callEndpoint } = useFetchAndLoad();

  const handleLoadPerfilData = async () => {
    const result = await callEndpoint(getUserService(id));
    const { user: userLoad } = userAdapter(result);
    dispatch(getUserAction(userLoad));
  };

  useEffect(() => {
    if (!user) {
      handleLoadPerfilData();
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
            <div>
              {user?.image.thumb ? (
                <img src={user?.image.thumb} alt="" />
              ) : (
                user?.name.split("")[0].toUpperCase()
              )}
            </div>
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
