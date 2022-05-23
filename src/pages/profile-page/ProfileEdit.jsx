import React, { useContext, useEffect, useRef, useState } from "react";
import "./profile-page.scss";
import { useParams, useLinkClickHandler, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AdvancedImage } from "@cloudinary/react";
import {
  TitleField,
  Btn,
  InputForm,
  NotificationContext,
} from "../../components/designSystem";
import { useCloudinaryWidget, useFetchAndLoad } from "../../hooks";
import { getUserService, updateUserService } from "../../services";
import { userAdapter } from "../../adapters";
import {
  getUserAction,
  loginAction,
  updateUserAction,
} from "../../redux/actions";
import { config } from "../../config";
import { loadAbort } from "../../utils/loadAbortAxios.utils";

export const ProfileEdit = () => {
  const { id } = useParams();
  const nameRef = useRef();
  const dniRef = useRef();
  const phoneRef = useRef();
  const btnRef = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toReturn = `/dashboard/user/${id}`;
  const goToProfilePage = useLinkClickHandler(toReturn);
  const { user } = useSelector((state) => state.user);
  const { openNotice } = useContext(NotificationContext);
  const { loading, callEndpoint } = useFetchAndLoad();
  const { imgCld, imgCldId, thumbCld, showWidget, changed } =
    useCloudinaryWidget();

  const handleChange = () => {
    let disabled = true;
    const nameVal = nameRef.current.value;
    const dniVal = dniRef.current.value;
    const phoneVal = phoneRef.current.value;
    if (nameVal.length && dniVal.length && phoneVal.length) disabled = false;
    btnRef.current.disabled = disabled;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const updated = {
      name: nameRef.current.value,
      dni: dniRef.current.value,
      phone: phoneRef.current.value,
    };
    const { user: userUpdated, message } = userAdapter(
      await callEndpoint(updateUserService(id, updated))
    );
    dispatch(updateUserAction(userUpdated));
    openNotice(message);

    const { name, image } = userUpdated;
    if (name !== user.name || image !== user.image.thumb) {
      dispatch(loginAction({ name, image: image.thumb }));
    }
    navigate(toReturn);
  };

  const handleLoadPerfilData = async () => {
    const { user: userLoad } = userAdapter(
      await callEndpoint(getUserService(id))
    );
    dispatch(getUserAction(userLoad));
  };

  const handleChangeImage = async () => {
    const imageUpdate = {
      image: { origin: imgCld, imageId: imgCldId, thumb: thumbCld },
    };
    const { user: userUpdated } = userAdapter(
      await callEndpoint(updateUserService(id, imageUpdate))
    );
    dispatch(loginAction({ image: thumbCld }));
    dispatch(updateUserAction(userUpdated));
    openNotice("image has been updated");
  };

  useEffect(() => {
    if (!user) handleLoadPerfilData();
  }, []);

  useEffect(() => {
    if (imgCld) handleChangeImage();
  }, [imgCld]);

  return (
    <div className="profile">
      <div className="container">
        <TitleField text="Editar Perfil" />
        <div className="image">
          <div>
            {user?.image.thumb ? <img src={user?.image.thumb} alt="" /> : "L"}
          </div>
          <Btn
            fa={changed ? "circle-o-notch fa-spin fa-fw" : "image"}
            btn="circle"
            onClick={showWidget}
            className="closeBtn"
            disabled={changed}
          />
        </div>

        <form onSubmit={handleSubmit}>
          <div className="content">
            <InputForm
              placeholder="Nombre"
              fa="user"
              ref={nameRef}
              defaultValue={user?.name}
              onChange={handleChange}
            />

            <InputForm
              placeholder="Email"
              fa="envelope"
              defaultValue={user?.email}
              onChange={handleChange}
              disabled
            />

            <InputForm
              placeholder="DNI"
              fa="id-card-o"
              ref={dniRef}
              defaultValue={user?.dni}
              onChange={handleChange}
            />

            <InputForm
              placeholder="Celular"
              fa="phone"
              ref={phoneRef}
              defaultValue={user?.phone}
              onChange={handleChange}
              pattern=".*^[9](?:\+|-)?\d+$.*"
              title="Ingresa solo números y empiece con el digito 9"
            />
          </div>
          <div className="operations">
            <Btn
              label="Cancelar"
              btn="outline"
              onClick={goToProfilePage}
              disabled={loading}
            />
            <Btn
              type="submit"
              ref={btnRef}
              label={loading ? "Cargando..." : "Guardar Cambios"}
              btn="main"
              fa={loading ? "circle-o-notch fa-spin fa-fw" : "floppy-o"}
              disabled
            />
          </div>
        </form>
      </div>
    </div>
  );
};
