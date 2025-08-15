import React from "react";
import { GiButterfly } from "react-icons/gi";
import { useTranslation } from "react-i18next";
import "./Footer.css";

const Footer = () => {
  const { t, i18n } = useTranslation();

  const handleLanguageChange = (language) => {
    i18n.changeLanguage(language);
  };

  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__grid">
          <div className="footer__brandCol">
            <div className="footer__brand">
              <GiButterfly className="footer__butterfly-icon" />
              <span className="footer__brandName">VibeStrings</span>
            </div>

            <ul className="footer__contact">
              <li>
                <span className="footer__icon" aria-hidden>
                  <svg viewBox="0 0 24 24" width="22" height="22">
                    <rect x="3" y="5" width="18" height="14" rx="2" ry="2" fill="none" stroke="currentColor" strokeWidth="1.8"/>
                    <path d="M3 7l9 6 9-6" fill="none" stroke="currentColor" strokeWidth="1.8" />
                  </svg>
                </span>
                <a href="mailto:Enquiry@VibeStrings.com">Enquiry@VibeStrings.com</a>
              </li>
              <li>
                <span className="footer__icon" aria-hidden>
                  <svg viewBox="0 0 24 24" width="22" height="22">
                    <path d="M12 3a7 7 0 0 1 7 7c0 5-7 11-7 11S5 15 5 10a7 7 0 0 1 7-7z" fill="none" stroke="currentColor" strokeWidth="1.8"/>
                    <circle cx="12" cy="10" r="2.2" fill="none" stroke="currentColor" strokeWidth="1.8"/>
                  </svg>
                </span>
                <span>San Francisco</span>
              </li>
            </ul>
          </div>

          <div className="footer__col">
            <h4 className="footer__head">{t('company')}</h4>
            <ul className="footer__links">
              <li><a href="#about">{t('about')}</a></li>
              <li><a href="#careers">{t('careers')}</a></li>
              <li><a href="#press">{t('press')}</a></li>
              <li><a href="#blog">{t('blog')}</a></li>
            </ul>
          </div>

          <div className="footer__col">
            <h4 className="footer__head">{t('support')}</h4>
            <ul className="footer__links">
              <li><a href="#help">{t('helpCenter')}</a></li>
              <li><a href="#contact">{t('contactUs')}</a></li>
              <li><a href="#shipping">{t('shippingInfo')}</a></li>
              <li><a href="#returns">{t('returns')}</a></li>
            </ul>
          </div>

          <div className="footer__col">
            <h4 className="footer__head">{t('legal')}</h4>
            <ul className="footer__links">
              <li><a href="#privacy">{t('privacyPolicy')}</a></li>
              <li><a href="#terms">{t('termsOfService')}</a></li>
              <li><a href="#cookies">{t('cookiePolicy')}</a></li>
            </ul>
          </div>

          <div className="footer__col">
            <h4 className="footer__head">{t('followUs')}</h4>
            <div className="footer__social">
              <a href="#facebook" aria-label="Facebook" className="footer__socialBtn">
                <svg viewBox="0 0 24 24" width="22" height="22">
                  <path d="M14 9h3V6h-3c-1.7 0-3 1.3-3 3v2H8v3h3v7h3v-7h3l1-3h-4V9c0-.6.4-1 1-1z" fill="currentColor"/>
                </svg>
              </a>
              <a href="#twitter" aria-label="Twitter" className="footer__socialBtn">
                <svg viewBox="0 0 24 24" width="22" height="22">
                  <path d="M22 5.9a8.5 8.5 0 01-2.4.7 4.2 4.2 0 001.9-2.3 8.5 8.5 0 01-2.7 1 4.2 4.2 0 00-7.2 3v.7A12 12 0 013 5.1a4.2 4.2 0 001.3 5.6 4.1 4.1 0 01-1.9-.5v.1a4.2 4.2 0 003.3 4.1 4.2 4.2 0 01-1.9.1 4.2 4.2 0 003.9 2.9A8.5 8.5 0 012 19.5a12 12 0 006.5 1.9c7.8 0 12.1-6.4 12.1-12v-.6A8.6 8.6 0 0022 5.9z" fill="currentColor"/>
                </svg>
              </a>
              <a href="#instagram" aria-label="Instagram" className="footer__socialBtn">
                <svg viewBox="0 0 24 24" width="22" height="22">
                  <path d="M7 2h10a5 5 0 015 5v10a5 5 0 01-5 5H7a5 5 0 01-5-5V7a5 5 0 015-5zm5 5a5 5 0 100 10 5 5 0 000-10zm6.5-.9a1.1 1.1 0 10-2.2 0 1.1 1.1 0 002.2 0zM12 9a3 3 0 110 6 3 3 0 010-6z" fill="currentColor"/>
                </svg>
              </a>
            </div>
            
            <div className="footer__language">
              <h5 className="footer__languageLabel">{t('language')}</h5>
              <select 
                className="footer__languageSelect"
                value={i18n.language}
                onChange={(e) => handleLanguageChange(e.target.value)}
              >
                <option value="en">{t('englishLanguage')}</option>
                <option value="mk">{t('macedonianLanguage')}</option>
              </select>
            </div>
          </div>
        </div>

        <div className="footer__copy">{t('copyright')}</div>
      </div>
    </footer>
  );
};

export default Footer;
