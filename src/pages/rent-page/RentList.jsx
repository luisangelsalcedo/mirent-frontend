import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  ModalContext,
  Btn,
  Preloading,
  FaIcon,
} from "../../components/designSystem";
import { useFetchAndLoad } from "../../hooks";
import { RentForm } from "./RentForm";
import { deleteRentService, getAllRentByPropertyService } from "../../services";
import { rentAdapter } from "../../adapters";
import { getAllRentAction, deleteRentAction } from "../../redux/actions";
import "./rent-page.scss";

export const RentList = () => {
  const { id } = useParams();
  const { openModal } = useContext(ModalContext);
  const { loading, callEndpoint } = useFetchAndLoad();

  const { list } = useSelector((state) => state.rent);
  const dispatch = useDispatch();

  const handleLoadRent = async () => {
    const result = await callEndpoint(getAllRentByPropertyService(id));
    const { rent: arrRent } = rentAdapter(result);

    if (arrRent) {
      dispatch(getAllRentAction(arrRent));
    }
  };

  const deleteRent = async (rent) => {
    const { _id: rentID } = rent;

    const result = await callEndpoint(deleteRentService(rentID));
    const { rent: deleted } = rentAdapter(result);
    if (deleted) dispatch(deleteRentAction(rentID));
  };

  //   const editRent = (rent) => {
  //     const { _id: rentID } = rent;
  //     console.log(rentID);
  //   };

  useEffect(() => {
    handleLoadRent();
  }, []);

  return (
    <div>
      {loading ? (
        <Preloading />
      ) : (
        <>
          <div className="rents">
            {list.map((rent, i) => (
              <div className="rents-item" key={i}>
                <div className="box">
                  {rent.status.paymented ? (
                    <FaIcon className="faicon-circle" fa="check" />
                  ) : (
                    <Btn
                      fa="close"
                      className="btn-circle"
                      onClick={() => deleteRent(rent)}
                    />
                  )}

                  <div>
                    <span>{rent?.name}</span>
                    <span>{rent?.amount} (USD)</span>
                  </div>
                </div>
                {/* <Btn fa="edit" onClick={() => editRent(rent)} /> */}
              </div>
            ))}
          </div>
          <Btn
            label="Generar próximo pago"
            btn="main"
            fa="credit-card"
            className="btn-block"
            onClick={() => openModal(<RentForm id={id} />)}
          />
        </>
      )}
    </div>
  );
};
