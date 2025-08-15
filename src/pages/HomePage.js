import React from "react";
import { useQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { GET_BRANDS } from "../graphql/queries";
import "./HomePage.css";
import hero from "../images/brands/hero.jpg";
import { FaShippingFast, FaCreditCard, FaRocket, FaGooglePlay, FaApple } from "react-icons/fa";
import cto from "../images/brands/cto.png";
import cto1 from "../images/brands/cto1.png";

const HomePage = () => {
  const { loading, error, data } = useQuery(GET_BRANDS);
  const { t } = useTranslation();

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>{t('loading')}</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <h2>{t('errorLoadingBrands')}</h2>
        <p>{error.message}</p>
        <button onClick={() => window.location.reload()}>{t('tryAgain')}</button>
      </div>
    );
  }

  const brands = data?.findAllBrands || [];

  return (
    <div className="home-page">
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
            {t('homeTitle')} <span className="highlight">Guitars</span> online
          </h1>
          <p className="hero-description">
            {t('homeSubtitle')}
          </p>
        </div>

        <div className="hero-image">
          <div className="hero-image-placeholder">
            <img src={hero} alt="Hero" />
          </div>
        </div>
      </section>


      <section className="brands-section">
        <div className="brands-container">
          <h2 className="brands-title">
            {t('featuredBrandsPrefix')} <span className="highlight">{t('featuredBrandsSuffix')}</span>
          </h2>
          <p className="brands-description">
            {t('brandsDescription')}
          </p>

          <div className="brands-grid">
            {brands.map((brand) => (
              <Link
                key={brand.id}
                to={`/brand/${brand.id}`}
                className="brand-card"
              >
                <div className="brand-image">
                  {brand.image ? (
                    <img src={brand.image} alt={brand.name} />
                  ) : (
                    <div className="brand-placeholder">
                      <span>{brand.name.charAt(0)}</span>
                    </div>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>


      <section className="features-section">
        <div className="features-container">
          <h2 className="features-title">
            {t('whyTryPrefix')} <span className="highlight">{t('whyTrySuffix')}</span>
          </h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon"><FaRocket /></div>
              <h3>{t('smoothBrowsing')}</h3>
              <p>{t('smoothBrowsingDesc')}</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon"><FaShippingFast /></div>
              <h3>{t('easyDelivery')}</h3>
              <p>{t('easyDeliveryDesc')}</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon"><FaCreditCard /></div>
              <h3>{t('swiftPayments')}</h3>
              <p>{t('swiftPaymentsDesc')}</p>
            </div>
          </div>
        </div>
      </section>


      <section className="app-section">
        <div className="app-container">
          <div className="app-content">
            <h2 className="app-title">
              {t('appTitlePrefix')}{" "}
              <span className="highlight">{t('appTitleHighlight')}</span> {t('appTitleSuffix')}
            </h2>
            <div className="app-buttons">
              <button className="app-button">
                <FaGooglePlay />
                <div className="button-text">
                  <span className="button-main">{t('getItOn')}</span>
                  <span className="button-subtext">{t('googlePlay')}</span>
                </div>
              </button>
              <button className="app-button">
                <FaApple />
                <div className="button-text">
                  <span className="button-main">{t('downloadOn')}</span>
                  <span className="button-subtext">{t('appStore')}</span>
                </div>
              </button>
            </div>
          </div>
          <div className="app-mockup">
            <div className="rounded-figure">
              <div className="image-pair">
                <img 
                  className="left-image" 
                  src={cto}
                  alt="Guitar collection" 
                />
                <img 
                  className="right-image" 
                  src={cto1} 
                  alt="Guitar details" 
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
