import React, { useState, useEffect, useCallback } from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { useTranslation } from "react-i18next";
import { GET_GUITAR_MODELS, GET_BRAND, SEARCH_MODELS } from "../graphql/queries";
import "./GuitarModelsPage.css";

const GuitarModelsPage = () => {
  const { brandId } = useParams();
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [guitarTypes, setGuitarTypes] = useState([]);
  const [useSearch, setUseSearch] = useState(false);
  const [displayedCount, setDisplayedCount] = useState(4);
  const modelsPerPage = 4;


  
  const { data: brandData } = useQuery(GET_BRAND, { variables: { id: brandId } });

  
  const { loading, error, data } = useQuery(GET_GUITAR_MODELS, {
    variables: { brandId, sortBy: "name", sortOrder: "ASC" },
    skip: useSearch && searchQuery.trim() !== "",
  });

  const {
    loading: searchLoading,
    error: searchError,
    data: searchData,
  } = useQuery(SEARCH_MODELS, {
    variables: { brandId, name: searchQuery.trim() },
    skip: !useSearch || searchQuery.trim() === "",
  });

  const currentLoading =
    useSearch && searchQuery.trim() !== "" ? searchLoading : loading;
  const currentError =
    useSearch && searchQuery.trim() !== "" ? searchError : error;
  const currentData =
    useSearch && searchQuery.trim() !== ""
      ? searchData?.searchModels
      : data?.findBrandModels;

  useEffect(() => {
    if (currentData) {
      const types = [...new Set(currentData.map((m) => m.type))];
      setGuitarTypes(types);
    }
  }, [currentData]);

  const handleSearchSubmit = () => {
    setSearchQuery(searchTerm.trim());
    setUseSearch(searchTerm.trim() !== '');
    setDisplayedCount(4);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearchSubmit();
    }
  };

  const filteredModels = (currentData || []).filter((m) => {
    const matchesType = !selectedType || m.type === selectedType;
    return matchesType;
  });
  
  const currentModels = filteredModels.slice(0, displayedCount);
  const hasMore = displayedCount < filteredModels.length;

  const handleScroll = useCallback(() => {
    if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 1000) {
      if (hasMore) {
        setDisplayedCount(prev => prev + modelsPerPage);
      }
    }
  }, [hasMore, modelsPerPage]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  useEffect(() => setDisplayedCount(4), [filteredModels.length, brandId]);

  useEffect(() => {
    setSearchTerm("");
    setSearchQuery("");
    setSelectedType("");
    setUseSearch(false);
    setDisplayedCount(4);
  }, [brandId]);

  if (currentLoading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner" />
        <p>{t('loadingGuitarModels')}</p>
      </div>
    );
  }
  if (currentError) {
    console.error("GraphQL Error for brand", brandId, ":", currentError);
    return (
      <div className="error-container">
        <h2>{t('errorLoadingModels')}</h2>
        <p>{currentError.message}</p>
        <p>Brand ID: {brandId}</p>
        <button onClick={() => window.location.reload()}>{t('tryAgain')}</button>
      </div>
    );
  }

  const handleTypeChange = (e) => {
    setSelectedType(e.target.value);
    setDisplayedCount(4);
  };
  const clearFilters = () => {
    setSearchTerm("");
    setSearchQuery("");
    setSelectedType("");
    setUseSearch(false);
    setDisplayedCount(4);
  };

  const brand = brandData?.findUniqueBrand;


  const CUT_R = 260;
  const CUT_CY = 600;

  const formatPrice = (p) =>
    typeof p === "number"
      ? p.toLocaleString("en-US", {
          style: "currency",
          currency: "USD",
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })
      : "";

  return (
    <div className="guitar-models-page">
  

      <section className="models-hero">
        <div className="models-hero-container">
          <div className="models-hero-content">
            <h1 className="models-hero-title">
              {t('playLikeRockstar')} <span className="accent">{t('rockstar')}</span>
            </h1>

            <p className="models-hero-description">
              {t('modelsDescription')}
            </p>
            <a href="#filters" className="models-hero-ask">{t('askChatGPT')}</a>
          </div>

          <aside className="hero-svg-wrap">
            <svg
              className="hero-svg"
              viewBox="0 0 800 600"
              preserveAspectRatio="xMidYMid slice"
              aria-hidden="true"
            >
              <defs>
                <linearGradient id="gradBrand" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--vs-grad-start)" />
                  <stop offset="100%" stopColor="var(--vs-grad-end)" />
                </linearGradient>
                <mask id="cutMask">
                  <rect x="0" y="10" width="600" height="400" rx="28" ry="28" fill="white" />
                  <circle cx="400" cy={CUT_CY} r={CUT_R} fill="black" />
                </mask>
              </defs>

              <rect
                x="0"
                y="0"
                width="600"
                height="400"
                rx="28"
                ry="28"
                fill="url(#gradBrand)"
                mask="url(#cutMask)"
              />

              {brand?.image ? (
                <image
                  href={brand.image}
                  x="255" y="150" width="330" height="240"
                  preserveAspectRatio="xMidYMid meet" opacity="0.9"
                />
              ) : null}
            </svg>
          </aside>
        </div>
      </section>

      <section id="filters" className="filter-section figma">
        <div className="filter-container">
          <h2 className="filters-title-figma">
            {t('checkOutThe')} <span className="accent">{t('selection')}</span>
          </h2>

          <div className="filters-row">
            <div className={`select-control ${!selectedType ? "is-placeholder" : ""}`}>
              <span className="icon icon-filter" aria-hidden>
                <svg viewBox="0 0 24 24" width="20" height="20">
                  <path d="M3 5h18l-7 8v4l-4 2v-6L3 5z" fill="currentColor"/>
                </svg>
              </span>
              <select
                value={selectedType}
                onChange={handleTypeChange}
                className="select-native"
                aria-label="Filter by type"
              >
                <option value="">{t('filterByType')}</option>
                {guitarTypes.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
              <span className="icon icon-chevron" aria-hidden>
                <svg viewBox="0 0 24 24" width="20" height="20">
                  <path d="M6 9l6 6 6-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </span>
            </div>

            <div className="search-control">
              <span className="icon icon-search" aria-hidden>
                <svg viewBox="0 0 24 24" width="20" height="20">
                  <circle cx="11" cy="11" r="7" fill="none" stroke="currentColor" strokeWidth="2"/>
                  <path d="M20 20l-3.5-3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </span>
              <input
                type="text"
                className="search-native"
                placeholder={t('searchPlaceholder')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyPress={handleKeyPress}
                aria-label="Search by name"
              />
            </div>
          </div>

          {(searchQuery || selectedType) && (
            <button onClick={clearFilters} className="clear-filters-btn compact">
              {t('clearFilters')}
            </button>
          )}
        </div>
      </section>

      <section className="models-section models-section--figma">
        <div className="models-container">
          {currentModels.length === 0 ? (
            <div className="no-results">
              <h3>No guitars found</h3>
              <p>Try adjusting your search or filter criteria.</p>
            </div>
          ) : (
            <div className="models-grid models-grid--figma">
              {currentModels.map((model) => (
                <Link
                  key={model.id}
                  to={`/brand/${brandId}/guitar/${model.id}`}
                  className="model-card model-card--figma"
                >
                  <div className="model-image model-image--figma">
                    {model.image ? (
                      <img src={model.image} alt={model.name} />
                    ) : (
                      <div className="model-placeholder"><span>🎸</span></div>
                    )}
                  </div>
                  <div className="model-info model-info--figma">
                    <h3 className="model-name model-name--figma">{model.name}</h3>
                    <span className="model-price model-price--figma">
                      {formatPrice(model.price)}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {hasMore && filteredModels.length > 0 && (
        <section className="infinite-loading-section">
          <div className="infinite-loading-container">
            <div className="loading-spinner" />
            <p>{t('loadingMore')}</p>
          </div>
        </section>
      )}

      {filteredModels.length > 0 && (
        <section className="results-summary-section">
          <div className="results-summary-container">
            <div className="results-lite">
              {t('showingResults')} <strong>{currentModels.length}</strong> {t('resultsFrom')}{" "}
              <strong>{filteredModels.length}</strong>
            </div>
          </div>
        </section>
      )}

      
    </div>
  );
};

export default GuitarModelsPage;
