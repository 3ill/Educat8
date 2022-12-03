import React from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';

const FooterNav = ({
  className,
  ...props
}) => {

  const classes = classNames(
    'footer-nav',
    className
  );

  return (
    <nav
      {...props}
      className={classes}
    >
      <ul className="list-reset">
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <a href='mailto:educat8@gmail.com'>Contact</a>
        </li>
        <li>
          <Link to="/library">Library</Link>
        </li>
      </ul>
    </nav>
  );
}

export default FooterNav;