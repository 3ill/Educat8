import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Link } from 'react-router-dom';

const propTypes = {
  navPosition: PropTypes.string,
  hideNav: PropTypes.bool,
  hideSignin: PropTypes.bool,
  bottomOuterDivider: PropTypes.bool,
  bottomDivider: PropTypes.bool
}

const defaultProps = {
  navPosition: '',
  hideNav: false,
  hideSignin: false,
  bottomOuterDivider: false,
  bottomDivider: false
}

const Header = ({
  className,
  navPosition,
  hideNav,
  hideSignin,
  bottomOuterDivider,
  bottomDivider,
  ...props
}) => {

  const [isActive, setIsactive] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');

  const connectWallet = async () => {
    /**
     * Write Logic to Check if MetaMask is installed 
     */
    if (typeof window != "undefined" && typeof window.ethereum != "undefined" ) {
      try {
        /**
         * MetaMask is Installed
         * We Assume there is a list of accounts
         */
        const accounts = await window.ethereum.request({method: "eth_requestAccounts"});
        setWalletAddress(accounts[0])
        console.log(walletAddress)

      } catch(err) {
        console.error(err.message);
      }
    } else {
      /**
       * MetaMask is Not Installed
       */
      console.log("please Install MetaMask")
    }
  };

  const getCurrentWalletConnected = async () => {
    if(typeof window != "undefined" && typeof window.ethereum != "undefined") {
      try{
        /**
         * Get Accounts
         */
        const accounts = await window.ethereum.request({
          method: "eth_accounts",
        });
        
        if(accounts.length > 0) {
          setWalletAddress(accounts[0])
          console.log(accounts[0])

        } else  {
          console.log("Connect to MetaMask")
        }
        
      } catch(err) {
        console.error(err.message)
      }
    }
  };

  const addWalletListener = async () => {
    if (typeof window != "undefined" && typeof window.ethereum != "undefined") {
      window.ethereum.on("accountsChanged", (accounts) => {
        setWalletAddress(accounts[0]);
        console.log(accounts[0]);
      })
    } else {
      /**
       * MetaMask not Installed 
       */
      setWalletAddress('')
      console.log("Please Install Metamask")
    }
  }

  const nav = useRef(null);
  const hamburger = useRef(null);

  useEffect(() => {
    isActive && openMenu();
    document.addEventListener('keydown', keyPress);
    document.addEventListener('click', clickOutside);
    return () => {
      document.removeEventListener('keydown', keyPress);
      document.removeEventListener('click', clickOutside);
      closeMenu();

    };
    getCurrentWalletConnected();
    addWalletListener();
  });  

  const openMenu = () => {
    document.body.classList.add('off-nav-is-active');
    nav.current.style.maxHeight = nav.current.scrollHeight + 'px';
    setIsactive(true);

  }

  const closeMenu = () => {
    document.body.classList.remove('off-nav-is-active');
    nav.current && (nav.current.style.maxHeight = null);
    setIsactive(false);
  }

  const keyPress = (e) => {
    isActive && e.keyCode === 27 && closeMenu();
  }

  const clickOutside = (e) => {
    if (!nav.current) return
    if (!isActive || nav.current.contains(e.target) || e.target === hamburger.current) return;
    closeMenu();
  }  

  const classes = classNames(
    'site-header',
    bottomOuterDivider && 'has-bottom-divider',
    className
  );

  return (
    <header
      {...props}
      className={classes}
    >
      <div className="container">
        <div className={
          classNames(
            'site-header-inner',
            bottomDivider && 'has-bottom-divider'
          )}>
          {/* <Logo /> */}
          <Link to="/">
            Educa8
          </Link>
          {!hideNav &&
            <>
              <button
                ref={hamburger}
                className="header-nav-toggle"
                onClick={isActive ? closeMenu : openMenu}
              >
                <span className="screen-reader">Menu</span>
                <span className="hamburger">
                  <span className="hamburger-inner"></span>
                </span>
              </button>
              <nav
                ref={nav}
                className={
                  classNames(
                    'header-nav',
                    isActive && 'is-active'
                  )}>
                <div className="header-nav-inner">
                  <ul className={
                    classNames(
                      'list-reset text-xs',
                      navPosition && `header-nav-${navPosition}`
                    )}>
                    <li>
                      <Link to="/about" onClick={closeMenu}>About</Link>
                  </li>
                   <li>
                    <a href='https://github.com/3ill/Educat8' target="_blank" rel="noreferrer">Contact</a>
                  </li>
                   <li>
                      <Link to="/library" onClick={closeMenu}>Library</Link>
                    </li>
                  </ul>
                  {!hideSignin &&
                    <ul
                      className="list-reset header-nav-right"
                    >
                      <li>
                      <button className="button button-primary button-wide-mobile button-sm " onClick={connectWallet}>
                          <span>
                            {walletAddress && walletAddress.length > 0 
                            ? `connected: ${walletAddress.substring(0, 6)}...${walletAddress.substring(38)}`
                            : "Connect Wallet"}
                          </span>
                       </button>
                      </li>
                    </ul>}
                </div>
              </nav>
            </>}
        </div>
      </div>
    </header>
  );
}

Header.propTypes = propTypes;
Header.defaultProps = defaultProps;

export default Header;
