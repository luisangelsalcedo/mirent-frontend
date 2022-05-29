import React, { useContext, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import {
  TitleField,
  Btn,
  Card,
  ModalContext,
  Preloading,
  NotificationContext,
} from "../../components/designSystem";
import { PropertyForm } from "./PropertyForm";
import { useFetchAndLoad } from "../../hooks";
import { propertyAdapter } from "../../adapters";
import { getAllPropertyService } from "../../services";
import { getAllPropertyAction } from "../../redux/actions";
import "./property-list.scss";

export const PropertyList = () => {
  const { openModal } = useContext(ModalContext);
  const { loading, callEndpoint } = useFetchAndLoad();
  const dispatch = useDispatch();
  const { list } = useSelector((state) => state.property);
  const { list: arrAgreement } = useSelector((state) => state.agreement);
  const { openNotice } = useContext(NotificationContext);

  const handleClick = () => {
    openModal(<PropertyForm />);
  };

  const handleLoad = async () => {
    const result = await callEndpoint(getAllPropertyService());
    const { property: arrProperties } = propertyAdapter(result);
    if (arrProperties) {
      dispatch(getAllPropertyAction(arrProperties));
    }
    await openNotice(`No tienes notificaciones nuevas`);
  };

  useEffect(() => {
    if (!list.length) handleLoad();
  }, []);

  const viewEmpty = (
    <div className="container">
      <div className="properties-init">
        <div className="icon" />
        <Btn
          label="crear una inmueble"
          fa="plus"
          btn="outline"
          onClick={handleClick}
        />
      </div>
    </div>
  );

  const viewFull = (
    <div className="container">
      <div className="properties-list">
        <div className="title">
          <TitleField text="Mis inmuebles" size="1.5" />
          <Btn
            label="Crear una inmueble"
            fa="plus"
            btn="outline"
            onClick={handleClick}
          />
        </div>
        {list?.map((property, i) => (
          <Card key={i} data={property} i={i} />
        ))}
      </div>
    </div>
  );

  return (
    <div className="properties">
      {loading ? (
        <Preloading />
      ) : (
        <div>{list.length ? viewFull : viewEmpty}</div>
      )}
    </div>
  );
};
