import "./scss/titleField.scss";

export const TitleField = ({ text, size = 1.5, center, fa, fasize }) => (
  <div
    className="title-field"
    style={{ fontSize: `${size}rem`, textAlign: center ? "center" : "left" }}
  >
    {fa && (
      <i
        style={fasize && { fontSize: `${fasize}rem` }}
        className={`fa fa-${fa}`}
        aria-hidden="true"
      />
    )}
    {text && text}
  </div>
);
