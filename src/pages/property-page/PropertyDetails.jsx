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

export const PropertyDetails = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const position = searchParams.get("pos");
  const toReturn = "/dashboard";
  const navigate = useNavigate();
  const goToDashboard = useLinkClickHandler(toReturn);

  const { list, property } = useSelector((state) => state.property);
  const dispatch = useDispatch();

  const handleGetProperty = () => {
    if (!position) navigate(toReturn, { replace: true });
    dispatch(getOnePropertyAction(id));
  };

  useEffect(() => {
    if (list.length) handleGetProperty();
  }, [id, list]);

  return (
    <div className="property-details">
      {property ? (
        <div className="container">
          <TitleField text={property?.name} size={2.2} />
          <TitleField text="Quiero:" size={1.3} />

          <div className="content">
            <MenuItem fa="home" title="Configurar">
              <PropertySetting />
            </MenuItem>
            {property?.status?.available && (
              <>
                <MenuItem fa="file" title="Contratos">
                  <AgreementList />
                </MenuItem>
                <MenuItem fa="user" title="Inquilino">
                  Enviar invitación
                  <hr />
                  Ver información del inquilino
                  <hr />
                  Enviar mensaje
                  <hr />
                </MenuItem>

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
        <div className="oneElement">
          <TitleField center fa="times" fasize={5} />
          <TitleField text=" Esta página no existe" center />
          <Btn label="Regresar al inicio" btn="main" onClick={goToDashboard} />
        </div>
      )}
    </div>
  );
};
