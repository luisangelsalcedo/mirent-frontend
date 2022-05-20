import "./scss/preloading.scss";

export const Preloading = () => (
  <div className="preloading">
    <i className="fa fa-circle-o-notch fa-spin fa-3x fa-fw" />
    <span className="sr-only">Loading...</span>
  </div>
);
