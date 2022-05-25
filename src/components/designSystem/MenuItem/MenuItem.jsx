import "./scss/menu-item.scss";

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
export const MenuItem = ({ fa, title, children }) => (
  <>
    <details className="menu-item">
      <summary>
        <span>
          {fa && <i className={`fa fa-${fa}`} aria-hidden="true" />}
          {title}
        </span>
        <i className="fa fa-chevron-down" aria-hidden="true" />
      </summary>
      <div>{children}</div>
    </details>
  </>
);
