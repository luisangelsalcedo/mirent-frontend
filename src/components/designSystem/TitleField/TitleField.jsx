import "./scss/titleField.scss";

export const TitleField = ({ text = "Text field", size = 1.5, center }) => (
  <div
    className="title-field"
    style={{ fontSize: `${size}rem`, textAlign: center ? "center" : "left" }}
  >
    {text}
  </div>
);
