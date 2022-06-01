import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Btn,
  ModalContext,
  Preloading,
  FaIcon,
} from "../../components/designSystem";
import { useFetchAndLoad } from "../../hooks";

import { getAllRentByPropertyService } from "../../services";
import { rentAdapter } from "../../adapters";
import { getAllRentAction } from "../../redux/actions";
import { PayPage } from "../pay-page/PayPage";

export const OccupantRents = () => {
  const { id } = useParams();
  const { loading, callEndpoint } = useFetchAndLoad();
  const { openModal } = useContext(ModalContext);

  const { list } = useSelector((state) => state.rent);
  const dispatch = useDispatch();

  const handleLoadRent = async () => {
    const result = await callEndpoint(getAllRentByPropertyService(id));
    const { rent: arrRent } = rentAdapter(result);

    if (arrRent) {
      dispatch(getAllRentAction(arrRent));
    }
  };

  const payRent = async (rent) => {
    openModal(<PayPage rent={rent} />);
  };

  useEffect(() => {
    handleLoadRent();
  }, []);

  return (
    <div>
      {loading ? (
        <Preloading />
      ) : (
        <>
          {list.length ? (
            <>
              <div className="rents">
                {list.map((rent, i) => (
                  <div className="rents-item" key={i}>
                    <div className="box">
                      {rent.status.paymented ? (
                        <>
                          <FaIcon fa="check-square-o" color="primary" />
                        </>
                      ) : (
                        <>
                          <FaIcon fa="square-o" />
                        </>
                      )}

                      <div>
                        <span>{rent?.name}</span>
                        <span>{rent?.amount} (USD)</span>
                      </div>
                    </div>
                    {!rent.status.paymented ? (
                      <Btn
                        label="Pagar"
                        fa="credit-card"
                        btn="primary"
                        onClick={() => payRent(rent)}
                      />
                    ) : (
                      <div className="success">Realizado</div>
                    )}
                  </div>
                ))}
              </div>
            </>
          ) : (
            <>No tiene rentas por pagar</>
          )}
        </>
      )}
    </div>
  );
};
