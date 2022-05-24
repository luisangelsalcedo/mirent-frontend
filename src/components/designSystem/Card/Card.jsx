import { useEffect } from "react";
import { useLinkClickHandler, useParams } from "react-router-dom";
import "./scss/card.scss";

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
          {/* <i className="fa fa-list-ul" aria-hidden="true" /> {list.length} Items */}
        </span>
        <i className="fa fa-chevron-down" aria-hidden="true" />
      </summary>
    </details>
  );
};
