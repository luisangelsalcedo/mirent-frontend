import { useLinkClickHandler, useParams } from "react-router-dom";
import "./scss/favList.scss";

/**
 * ## FavList component
 * * Custom card component
 * **Use:**
 * ```
 * <FavList favs={favs} />
 * ```
 * @param {object} props
 * @returns {jsx} JSX
 */
export const FavList = ({ favs }) => {
  const { _id: id, name, list } = favs;
  const { id: paramID } = useParams();
  const linkOpen = useLinkClickHandler(`/dashboard/favs/${id}`);
  const linkClose = useLinkClickHandler(`/dashboard`);

  return (
    <details className="fav-list" open={id === paramID}>
      <summary onClick={id === paramID ? linkClose : linkOpen}>
        <span>
          <h4>{name}</h4>
          <i className="fa fa-list-ul" aria-hidden="true" /> {list.length} Items
        </span>
        <i className="fa fa-chevron-down" aria-hidden="true" />
      </summary>
    </details>
  );
};
