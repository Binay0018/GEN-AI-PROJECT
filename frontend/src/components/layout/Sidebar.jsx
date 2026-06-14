import clsx from 'clsx';
import './Sidebar.scss';

const Sidebar = ({ items, activeId, onSelect, footer }) => (
  <aside className="sidebar">
    <nav className="sidebar__nav">
      {items.map((item) => (
        <button
          key={item.id}
          className={clsx('sidebar__item', { 'sidebar__item--active': activeId === item.id })}
          onClick={() => onSelect(item.id)}
        >
          {item.icon && <span className="sidebar__icon">{item.icon}</span>}
          <span className="sidebar__label">{item.label}</span>
          {item.badge && <span className="sidebar__badge">{item.badge}</span>}
        </button>
      ))}
    </nav>
    {footer && <div className="sidebar__footer">{footer}</div>}
  </aside>
);

export default Sidebar;
