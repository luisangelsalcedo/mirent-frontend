import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  useParams,
  useSearchParams,
  useNavigate,
  useLinkClickHandler,
} from "react-router-dom";
import { TitleField, MenuItem, Btn } from "../../components/designSystem";
import "./property-details.scss";
import { getOnePropertyAction } from "../../redux/actions";
import { PropertySetting } from "./PropertySetting";
import { AgreementList } from "../agreement-page/AgreementList";
import { AgreementOccupant } from "../agreement-page/AgreementOccupant";

const NoFound = () => {
  const toReturn = "/dashboard";
  const goToDashboard = useLinkClickHandler(toReturn);
  return (
    <div className="oneElement">
      <TitleField center fa="times" fasize={5} />
      <TitleField text=" Esta página no existe" center />
      <Btn label="Regresar al inicio" btn="main" onClick={goToDashboard} />
    </div>
  );
};

export const PropertyDetails = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const position = searchParams.get("pos");
  const toReturn = "/dashboard";
  const navigate = useNavigate();

  const { list, property } = useSelector((state) => state.property);
  const { agreement } = useSelector((state) => state.agreement);
  const dispatch = useDispatch();

  const handleGetProperty = () => {
    if (!position) navigate(toReturn, { replace: true });
    dispatch(getOnePropertyAction(id));
  };

  useEffect(() => {
    if (list.length) handleGetProperty();
  }, [id, list]);

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
    </div>
  );

  return (
    <div className="property-details">
      {property?._id ? (
        <div className="container">
          <TitleField text={property?.name} size={2.2} className="title" />
          {info}
          <TitleField text="Quiero:" size={1.3} />

          <div className="content">
            <MenuItem fa="home" title="Configurar">
              {!property?.status?.rented ? (
                <PropertySetting />
              ) : (
                <>
                  No se puede editar los datos del inmmueble cuando se tiene un
                  contrato vinculado.&nbsp;
                  <b>
                    Elimine el contrato para acceder a la pantalla de edición
                  </b>
                </>
              )}
            </MenuItem>

            {(property?.status?.available || property?.status?.rented) && (
              <>
                <MenuItem fa="file" title="Contratos">
                  <AgreementList />
                </MenuItem>
              </>
            )}

            {property?.status?.rented && (
              <>
                <MenuItem fa="user" title="Inquilino">
                  <AgreementOccupant />
                </MenuItem>
              </>
            )}

            {agreement?.status?.signed && (
              <>
                <MenuItem fa="money" title="Pagos">
                  Generar próximo pago
                  <hr />
                  Ver pagos anteriores
                  <hr />
                </MenuItem>
              </>
            )}
          </div>
        </div>
      ) : (
        <NoFound />
      )}
    </div>
  );
};
