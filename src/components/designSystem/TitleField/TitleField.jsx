import { justify } from "@cloudinary/url-gen/qualifiers/textAlignment";
import "./scss/titleField.scss";

export const TitleField = ({
  text,
  size = 1.5,
  center,
  fa,
  fasize,
  className,
}) => (
  <div
    className={`title-field ${className}`}
    style={{
      fontSize: `${size}rem`,
      textAlign: center ? "center" : "left",
      justifyContent: center ? "center" : "flex-start",
    }}
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
