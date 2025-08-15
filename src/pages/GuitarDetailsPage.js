import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { useTranslation } from "react-i18next";
import { GET_GUITAR_MODEL } from "../graphql/queries";
import "./GuitarDetailsPage.css";

const GuitarDetailsPage = () => {
  const { guitarId, brandId } = useParams();
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState("specifications");
  const [currentMusicianPage, setCurrentMusicianPage] = useState(0);
  const musiciansPerPage = 2;
  const actualBrandId = brandId || "1";
  const modelId = guitarId;
  const { loading, error, data } = useQuery(GET_GUITAR_MODEL, {
    variables: { brandId: actualBrandId, modelId },
  });

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>{t('loadingGuitarDetails')}</p>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="error-container">
        <h2>{t('errorLoadingDetails')}</h2>
        <p>{error.message}</p>
        <button onClick={() => window.location.reload()}>{t('tryAgain')}</button>
      </div>
    );
  }
  
  const guitar = data?.findUniqueModel;
  
  return (
    <div className="guitar-details-page">
      <div className="hero-header">

        <div className="hero-title-block">
          <h1 className="hero-title">
            {t('heroTitleLine1')} <br /> {t('heroTitleLine2')}
          </h1>
        </div>
        <div className="hero-arc">
          <img
            className="hero-guitar"
            src={guitar.image}
            alt={guitar.name}
            onError={(e) => {
              e.target.style.display = 'none';
            }}
            onLoad={(e) => {
              e.target.style.display = 'block';
            }}
          />
        </div>
      </div>

      <div className="details-container">
        <div className="tab-navigation">
          <button
            className={`tab-button ${
              activeTab === "specifications" ? "active" : ""
            }`}
            onClick={() => setActiveTab("specifications")}
          >
            {t('specification')}
          </button>
          <button
            className={`tab-button ${activeTab === "who-plays" ? "active" : ""}`}
            onClick={() => setActiveTab("who-plays")}
          >
            {t('whoPlaysIt')}
          </button>
        </div>

        <div className="tab-content">
          {activeTab === "specifications" && (
            <div className="specifications-tab">
              <p className="guitar-description">
                The {guitar.name} is a modern take on the classic Precision Bass design, featuring a sleek body 
                shape and a comfortable neck profile for easy playability. It is equipped with dual active pickups 
                that deliver a powerful and versatile tone, perfect for any genre from rock to funk. The robust 
                build quality ensures reliability on stage, while the high-quality hardware provides excellent 
                tuning stability and resonance, and smooth tone shaping that enhances both sound and style.
              </p>
              <ul className="specs-list">
                {guitar.specs?.bodyWood && (
                  <li><span className="spec-label">{t('bodyWood')}:</span> <span className="spec-value">{guitar.specs.bodyWood}</span></li>
                )}
                {guitar.specs?.neckWood && (
                  <li><span className="spec-label">{t('neckWood')}:</span> <span className="spec-value">{guitar.specs.neckWood}</span></li>
                )}
                {guitar.specs?.fingerboardWood && (
                  <li><span className="spec-label">{t('fingerboard')}:</span> <span className="spec-value">{guitar.specs.fingerboardWood}</span></li>
                )}
                {guitar.specs?.pickups && (
                  <li><span className="spec-label">{t('pickups')}:</span> <span className="spec-value">{guitar.specs.pickups}</span></li>
                )}
                {guitar.specs?.tuners && (
                  <li><span className="spec-label">{t('tuners')}:</span> <span className="spec-value">{guitar.specs.tuners}</span></li>
                )}
                {guitar.specs?.scaleLength && (
                  <li><span className="spec-label">{t('scaleLength')}:</span> <span className="spec-value">{guitar.specs.scaleLength}</span></li>
                )}
                {guitar.specs?.bridge && (
                  <li><span className="spec-label">{t('bridge')}:</span> <span className="spec-value">{guitar.specs.bridge}</span></li>
                )}
              </ul>
            </div>
          )}

          {activeTab === "who-plays" && (
            <div className="who-plays-tab">
              <div className="musicians-grid">
                {guitar.musicians && guitar.musicians.length > 0 ? (
                  guitar.musicians
                    .slice(currentMusicianPage * musiciansPerPage, (currentMusicianPage + 1) * musiciansPerPage)
                    .map((musician, index) => (
                      <div key={index} className="musician-card">
                        <div className="musician-image">
                          {musician.musicianImage ? (
                            <img src={musician.musicianImage} alt={musician.name} />
                          ) : (
                            <div className="musician-placeholder">
                              <span>🎸</span>
                            </div>
                          )}
                        </div>
                        <div className="musician-info">
                          <div className="musician-name">{musician.name}</div>
                          {musician.bands && musician.bands.length > 0 && (
                            <div className="musician-bands">{musician.bands.join(", ")}</div>
                          )}
                        </div>
                      </div>
                    ))
                ) : (
                  <div className="no-musicians">{t('noMusicianData')}</div>
                )}
              </div>
              
              {guitar.musicians && guitar.musicians.length > musiciansPerPage && (
                <div className="musician-pagination">
                  <div className="pagination-dots">
                    {Array.from({ length: Math.ceil(guitar.musicians.length / musiciansPerPage) }, (_, index) => (
                      <button
                        key={index}
                        className={`pagination-dot ${currentMusicianPage === index ? 'active' : ''}`}
                        onClick={() => setCurrentMusicianPage(index)}
                        aria-label={`Show musicians ${index * musiciansPerPage + 1}-${Math.min((index + 1) * musiciansPerPage, guitar.musicians.length)}`}
                      />
                    ))}
                  </div>
                  <div className="pagination-info">
                    {t('showingMusicians')} {currentMusicianPage * musiciansPerPage + 1}-{Math.min((currentMusicianPage + 1) * musiciansPerPage, guitar.musicians.length)} of {guitar.musicians.length} {t('musicians')}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GuitarDetailsPage;
