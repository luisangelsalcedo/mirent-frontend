import { useEffect } from "react";
import { useLinkClickHandler, useParams } from "react-router-dom";
import "./scss/card.scss";
import { Avatar } from "../Avatar/Avatar";

/**
 * ## Card component
 * * Custom Card component
 * **Use:**
 * ```
 * <Card data={Property} />
 * ```
 * @param {object} props
 * @returns {jsx} JSX
 */
export const Card = ({ data, i }) => {
  const { id: paramID } = useParams();

  const goToOpen = useLinkClickHandler(
    `/dashboard/property/${data?._id}?pos=${i}`
  );
  const goToClose = useLinkClickHandler(`/dashboard`);

  return (
    <details className="card" open={data?._id === paramID}>
      <summary onClick={data?._id === paramID ? goToClose : goToOpen}>
        <span>
          <h4>{data?.name}</h4>
          <div>{!!data?.agreement?.occupant || "Agregar inquilino"}</div>

          {data?.status?.maintenance && (
            <div className="card-status">
              <i className="fa fa-info-circle" aria-hidden="true" />
              &nbsp;&nbsp; Por configurar
            </div>
          )}
          {data?.status?.available && (
            <div className="card-status">
              <i className="fa fa-info-circle" aria-hidden="true" />
              &nbsp;&nbsp; Disponible
            </div>
          )}
          {data?.agreement?.status?.disabled && (
            <div className="card-status">
              <i className="fa fa-info-circle" aria-hidden="true" />
              &nbsp;&nbsp; Contrato por editar
            </div>
          )}
          {data?.agreement?.status?.active && (
            <div className="card-status">
              <i className="fa fa-info-circle" aria-hidden="true" />
              &nbsp;&nbsp; Contrato por firmar
            </div>
          )}
          {data?.agreement?.status?.signed && (
            <div className="card-status">
              <i className="fa fa-check-circle" aria-hidden="true" />
              &nbsp;&nbsp; Alquilado
            </div>
          )}
        </span>
        <i className="fa fa-chevron-down" aria-hidden="true" />
      </summary>
    </details>
  );
};
