import React, { useContext, useEffect, useRef } from "react";
import "./profile-page.scss";
import { useParams, useLinkClickHandler, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  TitleField,
  Btn,
  Preloading,
  InputForm,
  NotificationContext,
} from "../../components/designSystem";
import { useFetchAndLoad } from "../../hooks";
import { getUserService, updateUserService } from "../../services";
import { userAdapter } from "../../adapters";
import {
  getUserAction,
  loginAction,
  updateUserAction,
} from "../../redux/actions";

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
    if (name !== user.name || image !== user.image) {
      dispatch(loginAction({ name, image }));
    }

    navigate(toReturn);
  };

  const handlePerfilData = async () => {
    const { user: userLoad } = userAdapter(
      await callEndpoint(getUserService(id))
    );
    dispatch(getUserAction(userLoad));
  };

  useEffect(() => {
    if (!user) {
      handlePerfilData();
    }
  }, []);

  return (
    <div className="profile">
      <div className="container">
        <TitleField text="Editar Perfil" />
        <div className="image">
          <div>L</div>
          <Btn
            fa="image"
            btn="circle"
            onClick={() => {}}
            className="closeBtn"
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
            <Btn label="Cancelar" btn="outline" onClick={goToProfilePage} />
            <Btn
              type="submit"
              ref={btnRef}
              label={loading ? "Cargando..." : "Guardar Cambios"}
              btn="main"
              fa={loading ? "circle-o-notch fa-spin fa-fw" : "floppy-o"}
              disabled={loading}
            />
          </div>
        </form>
      </div>
    </div>
  );
};
