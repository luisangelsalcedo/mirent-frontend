import React, { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useSearchParams } from "react-router-dom";
import { propertyAdapter } from "../../adapters";
import {
  Check,
  NotificationContext,
  Preloading,
} from "../../components/designSystem";
import { useFetchAndLoad } from "../../hooks";
import { updatePropertyAction } from "../../redux/actions";
import { updatePropertyService } from "../../services";
import { PropertyEdit } from "./PropertyEdit";

export const PropertySetting = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const position = searchParams.get("pos");

  const { property } = useSelector((state) => state.property);
  const dispatch = useDispatch();

  const { loading, callEndpoint } = useFetchAndLoad();
  const { openNotice } = useContext(NotificationContext);

  const handleChangeStatus = async () => {
    const available = { status: { available: true } };
    const maintenance = { status: { maintenance: true } };
    const update = property?.status?.available ? maintenance : available;

    const result = await callEndpoint(updatePropertyService(id, update));
    const { property: updated, message } = propertyAdapter(result);

    dispatch(updatePropertyAction(updated, position));
    if (updated) openNotice(message);
  };

  return (
    <div>
      <div className="content-item">
        {property?.status?.available ? "Inmueble Activado" : "Activar inmueble"}
        <Check
          id={id}
          check={property?.status?.available}
          changeMode={handleChangeStatus}
        />
        {loading && (
          <>
            <Preloading className="inline" /> cargando...
          </>
        )}
      </div>
      <div className="content-item">
        <PropertyEdit />
      </div>
    </div>
  );
};
