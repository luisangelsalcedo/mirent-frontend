import { ReactComponent as Isotipo } from "../../../assets/svg/isotipo.svg";
import "./scss/preloading.scss";

export const LoadingMain = () => (
  <div className="loading-main">
    <Isotipo />
    <i className="fa fa-circle-o-notch fa-spin fa-5x fa-fw" />
    <span className="sr-only">Loading...</span>
  </div>
);
