import "./scss/favItem.scss";
import { useDispatch, useSelector } from "react-redux";
import { useContext } from "react";
import { Btn } from "../Btn";
import { useFetchAndLoad } from "../../../hooks";
import { updateFavsByIdService } from "../../../services";
import { updateFavs } from "../../../redux";
import { Preloading } from "../Preloading";
import { NotificationContext } from "../Notificaction";

/**
 * ## FavItem component
 * * Custom item component
 * **Use:**
 * ```
 * <FavItem fa={String} fav={String} index={Number} handleEdit={Function} />
 * ```
 * @param {object} props
 * @returns {jsx} JSX
 */
export const FavItem = ({ fa, fav, index, handleEdit }) => {
  const { openAlert } = useContext(NotificationContext);
  const { title, link, description } = fav;
  const { loading, callEndpoint } = useFetchAndLoad();
  const { open } = useSelector((state) => state.favs);
  const dispatch = useDispatch();

  const handleDelete = async () => {
    open.list.splice(index, 1);
    const favsUpdate = {
      _id: open._id,
      list: open.list,
    };
    const { data } = await callEndpoint(updateFavsByIdService(favsUpdate));
    const { data: favs } = data;
    dispatch(updateFavs(favs));

    await openAlert(`The item has been deleted`);
  };

  return (
    <>
      {loading ? (
        <div className="fav-item">
          <Preloading />
        </div>
      ) : (
        <details className="fav-item">
          <summary>
            <span>
              {fa && <i className={`fa fa-${fa}`} aria-hidden="true" />}
              {title}
            </span>
            <i className="fa fa-chevron-down" aria-hidden="true" />
          </summary>
          <div>{description}</div>

          <Btn fa="edit" btn="primary" onClick={handleEdit} />
          {!!link && (
            <Btn
              fa="external-link-square"
              btn="primary"
              onClick={() => window.open(link, "_blank")}
            />
          )}
          <Btn fa="trash" btn="danger" onClick={handleDelete} />
        </details>
      )}
    </>
  );
};
