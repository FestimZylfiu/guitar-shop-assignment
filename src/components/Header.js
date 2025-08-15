import React from "react";
import { Link, useLocation } from "react-router-dom";
import { GiButterfly } from "react-icons/gi";
import { useTranslation } from "react-i18next";
import "./Header.css";

const Header = () => {
  const location = useLocation();
  const { t } = useTranslation();

  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo">
          <GiButterfly className="butterfly-icon" />
          <span className="logo-text">VibeStrings</span>
        </Link>

        {location.pathname !== "/" && (
          <Link to="/" className="back-link">
            {t('backToHome')}
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
