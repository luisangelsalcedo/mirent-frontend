import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  useParams,
  useSearchParams,
  useNavigate,
  useLinkClickHandler,
} from "react-router-dom";
import {
  TitleField,
  MenuItem,
  Btn,
  Preloading,
} from "../../components/designSystem";
import "./property-details.scss";
import { getOnePropertyAction } from "../../redux/actions";
import { PropertySetting } from "./PropertySetting";
import { AgreementList } from "../agreement-page/AgreementList";
import { AgreementOccupant } from "../agreement-page/AgreementOccupant";
import { useFetchAndLoad } from "../../hooks";
import { getPropertyService } from "../../services/property.service";
import { propertyAdapter } from "../../adapters";
import { RentList } from "../rent-page/RentList";
import { OccupantAgreement } from "../occupant-page/OccupantAgreement";
import { OccupantRents } from "../occupant-page/OccupantRents";

const NoFound = () => {
  const toReturn = "/dashboard";
  const goToDashboard = useLinkClickHandler(toReturn);
  return (
    <div className="oneElement">
      {/* <TitleField center fa="times" fasize={5} /> */}
      <TitleField text=" Esta página no existe" center />
      <Btn label="Regresar al inicio" btn="main" onClick={goToDashboard} />
    </div>
  );
};

export const PropertyDetails = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();

  const toReturn = "/dashboard";
  const navigate = useNavigate();

  const { property } = useSelector((state) => state.property);
  const { agreement } = useSelector((state) => state.agreement);
  const { id: userID } = useSelector((state) => state.user.auth);
  const dispatch = useDispatch();

  const { loading, callEndpoint } = useFetchAndLoad();

  const handleGetProperty = async () => {
    const result = await callEndpoint(getPropertyService(id));
    const { property: propertyBack } = propertyAdapter(result);
    if (propertyBack) {
      dispatch(getOnePropertyAction(propertyBack));
    }
  };

  useEffect(() => {
    handleGetProperty();
  }, [id]);

  const info = (
    <div className="info">
      {property?.address && (
        <div>
          <b>Direccíon:</b> {property?.address}
        </div>
      )}
      {property?.details && (
        <div>
          <b>Detalles:</b> {property?.details}
        </div>
      )}
      {property?.price && (
        <div>
          <b>Alquiler:</b> {property?.price} (USD) (mensual)
        </div>
      )}
    </div>
  );

  const menuSetting = (
    <MenuItem fa="home" title="Configurar">
      {!property?.status?.rented ? (
        <PropertySetting />
      ) : (
        <>
          No se puede editar los datos del inmmueble cuando esta rentado.&nbsp;
          <b>Elimine o archive el contrato</b> para acceder a la pantalla de
          edición.
        </>
      )}
    </MenuItem>
  );

  const menuAgreement = (
    <>
      {(property?.status?.available || property?.status?.rented) && (
        <>
          <MenuItem fa="file" title="Contratos">
            <AgreementList />
          </MenuItem>
        </>
      )}
    </>
  );

  const menuOccupant = (
    <>
      {(property?.status?.available || property?.status?.rented) && (
        <>
          <MenuItem fa="user" title="Inquilino">
            <AgreementOccupant />
          </MenuItem>
        </>
      )}
    </>
  );

  const menuRent = (
    <>
      {property?.status?.rented && (
        <>
          <MenuItem fa="money" title="Pagos">
            <RentList />
          </MenuItem>
        </>
      )}
    </>
  );
  return (
    <div className="property-details">
      {loading ? (
        <Preloading />
      ) : (
        <>
          {property?._id ? (
            <div className="container">
              <TitleField text={property?.name} size={2.2} className="title" />
              {info}
              <TitleField text="Quiero:" size={1.3} />

              <div className="content">
                {userID !== property?.occupant?._id ? (
                  <>
                    {menuSetting}
                    {menuAgreement}
                    {menuOccupant}
                    {menuRent}
                  </>
                ) : (
                  <>
                    <MenuItem fa="file" title="Contratos">
                      <OccupantAgreement />
                    </MenuItem>
                    <MenuItem fa="money" title="Pagos">
                      <OccupantRents />
                    </MenuItem>
                  </>
                )}
              </div>
            </div>
          ) : (
            <NoFound />
          )}
        </>
      )}
    </div>
  );
};
