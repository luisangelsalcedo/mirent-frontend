import "./scss/avatar.scss";

/**
 * ## Avatar component
 * * Component to display user image
 * **Use:**
 * ```
 * <Avatar name={String} img={String} size={String} handler={Function} />
 * ```
 * @param {object} props
 * @returns {jsx} JSX
 */
export const Avatar = ({ name = "", img, handler, size = 2.3 }) => (
  <button type="button" className="avatar" onClick={handler}>
    <span>{name}</span>
    <div
      className="img"
      style={{
        width: `${size}rem`,
        height: `${size}rem`,
        borderRadius: `${size}rem`,
      }}
    >
      {img ? <img src={img} alt="" /> : [...name][0]}
    </div>
  </button>
);
