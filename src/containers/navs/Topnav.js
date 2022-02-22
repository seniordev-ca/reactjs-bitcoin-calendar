/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-use-before-define */
import React, { useState } from 'react';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';

import { changeLocale } from 'redux/actions';
import { Nav, NavItem } from 'reactstrap';
import navItems from '../../constants/menu';
import IntlMessages from '../../helpers/IntlMessages';
import HamburgerIcon from '../../components/svg/HamburgerIcon';
import CloseIcon from '../../components/svg/CloseIcon';
import AddIcon from '../../components/svg/AddIcon';
import ShareIcon from '../../components/svg/ShareIcon';
import DarkSwitch from '../toolbar/DarkSwitch';
import ShareModal from '../ShareModal';
import AddToCalendarModal from '../AddToCalendarModal';

const TopNav = () => {
  const [enableMobileNav, setEnableMobileNav] = useState(false);
  const [shareModal, setShareModal] = useState(false);
  const [addToCalendarModal, setAddToCalendarModal] = useState(false);
  const showMobileNavHandler = () => {
    setEnableMobileNav(true);
  };
  const closeMobileNavHandler = () => {
    setEnableMobileNav(false);
  };
  return (
    <>
      <nav className="navbar  d-none d-md-block">
        <div className="navbar-content">
          <div className="d-flex align-items-center navbar-left">
            {/* eslint-disable react/jsx-no-target-blank */}
            <a href="http://coinkite.com/" target="_blank">
              <span>Made with</span>
              <img alt="Coinkite" src="/assets/img/heart.png" className="mx-1" />
              <span>by Coinkite</span>
            </a>
          </div>
          <div className="navbar-right">
            <Nav>
              {navItems &&
                navItems.map((item) => {
                  return (
                    <NavItem key={item.id}>
                      <a
                        key={item.id}
                        href={item.to}
                        rel="noopener"
                        target="_blank"
                      >
                        <IntlMessages id={item.label} />
                      </a>
                    </NavItem>
                  );
                })}
            </Nav>
          </div>
        </div>
      </nav>
      <nav className="mobile-navbar d-block d-md-none">
        <div className="navbar-left">
          <a href="http://coinkite.com/" target="_blank">
            <span>Made with</span>
            <img alt="Coinkite" src="/assets/img/heart.png" className="mx-1" />
            <span>by Coinkite</span>
          </a>
        </div>
        <div className="mobile-navbar-content-wrapper">
          {!enableMobileNav && (
            <button
              type="button"
              className="btn btn-empty hamburger-icon-btn"
              onClick={() => {
                showMobileNavHandler();
              }}
            >
              <HamburgerIcon />
            </button>
          )}
          {enableMobileNav && (
            <button
              type="button"
              className="btn btn-empty close-icon-btn"
              onClick={() => {
                closeMobileNavHandler();
              }}
            >
              <CloseIcon />
            </button>
          )}

          <a href="/" className="btc-logo-mobile">
            <img
              src="/assets/logos/black.png"
              alt="Bitcoin Logo"
              className="btc-logo-mobile"
            />
          </a>
          {enableMobileNav && (
            <div className="mobile-navbar-content">
              <div className="mobile-navbar-li">
                {navItems &&
                  navItems.map((item) => {
                    return (
                      <NavItem key={item.id}>
                        <a
                          key={item.id}
                          href={item.to}
                          rel="noopener"
                          target="_blank"
                        >
                          <IntlMessages id={item.label} />
                        </a>
                      </NavItem>
                    );
                  })}
              </div>
              <div className="btn-board">
                <button
                  type="button"
                  className="btn btn-add-to-calendar"
                  onClick={() => setAddToCalendarModal(!addToCalendarModal)}
                >
                  <AddIcon />
                  <span>Add to Calendar</span>
                </button>
                <button
                  type="button"
                  className="btn btn-share"
                  onClick={() => setShareModal(!shareModal)}
                >
                  <ShareIcon />
                </button>
              </div>
              <div className="mobile-theme-toggle">
                <DarkSwitch className="d-flex" />
              </div>
            </div>
          )}
        </div>
      </nav>

      <ShareModal shareModal={shareModal} setShareModal={setShareModal} />
      <AddToCalendarModal
        addToCalendarModal={addToCalendarModal}
        setAddToCalendarModal={setAddToCalendarModal}
      />
    </>
  );
};

const mapStateToProps = ({ settings }) => {
  const { locale } = settings;
  return { locale };
};
export default injectIntl(
  connect(mapStateToProps, {
    changeLocaleAction: changeLocale,
  })(TopNav)
);
