import React, { useContext, useEffect, useState } from "react";

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
import {
  getAllPropertyByOccupandService,
  getAllPropertyService,
} from "../../services";
import { getAllPropertyAction } from "../../redux/actions";
import "./property-list.scss";

export const PropertyList = () => {
  const { loading, callEndpoint } = useFetchAndLoad();
  const dispatch = useDispatch();
  const { list } = useSelector((state) => state.property);
  const { id: userID } = useSelector((state) => state.user.auth);
  const { openNotice } = useContext(NotificationContext);
  const { openModal } = useContext(ModalContext);
  const [isOccupant, setIsOccupant] = useState(false);

  const handleClick = () => {
    openModal(<PropertyForm />);
    setIsOccupant(false);
  };

  const handleLoad = async () => {
    //
    //
    // OWNER
    //
    const result = await callEndpoint(getAllPropertyService());
    const { property: arrProperties } = propertyAdapter(result);
    if (arrProperties) {
      dispatch(getAllPropertyAction(arrProperties));
    } else {
      //
      //
      // OCCUPANT
      //
      const resultOccupant = await callEndpoint(
        getAllPropertyByOccupandService(userID)
      );
      const { property: properties } = propertyAdapter(resultOccupant);
      if (properties) {
        dispatch(getAllPropertyAction(properties));
        setIsOccupant(true);
      }
    }
  };

  useEffect(() => {
    handleLoad();
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
          {!isOccupant && (
            <Btn
              label="Crear una inmueble"
              fa="plus"
              btn="outline"
              onClick={handleClick}
            />
          )}
        </div>
        {list?.map((property, i) => (
          <Card key={i} data={property} i={i} />
        ))}
      </div>
    </div>
  );

  return (
    <div className="properties">
      {loading || <div>{list.length ? viewFull : viewEmpty}</div>}
    </div>
  );
};
