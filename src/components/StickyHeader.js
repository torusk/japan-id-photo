// src/components/StickyHeader.js
import React from "react";
import { useTranslation } from "react-i18next";

const StickyHeader = ({ activeStep, onStepClick, i18n }) => {
  const { t } = useTranslation();

  // 各ステップの情報（ローカライズ対応）
  const steps = [
    { id: 1, title: t("step_template") },
    { id: 2, title: t("step_upload") },
    { id: 3, title: t("step_crop") },
    { id: 4, title: t("step_result") },
  ];

  return (
    <div className="sticky-header">
      <div className="language-selector-tier">
        <div className="lang-list">
          <span onClick={() => i18n.changeLanguage('ja')} className={i18n.language === 'ja' ? 'active' : ''}>JP</span>
          <span className="divider">|</span>
          <span onClick={() => i18n.changeLanguage('en')} className={i18n.language === 'en' ? 'active' : ''}>EN</span>
          <span className="divider">|</span>
          <span onClick={() => i18n.changeLanguage('zh-CN')} className={i18n.language === 'zh-CN' ? 'active' : ''}>简体</span>
          <span className="divider">|</span>
          <span onClick={() => i18n.changeLanguage('zh-TW')} className={i18n.language === 'zh-TW' ? 'active' : ''}>繁體</span>
          <span className="divider">|</span>
          <span onClick={() => i18n.changeLanguage('ko')} className={i18n.language === 'ko' ? 'active' : ''}>한국어</span>
        </div>
      </div>
      <div className="steps-indicator">
        {steps.map((step) => (
          <div
            key={step.id}
            className={`step-item ${activeStep >= step.id ? "active" : ""}`}
            onClick={() => onStepClick(step.id)}
          >
            <div className="step-pennant">
              <span className="step-number">{step.id}</span>
            </div>
            <div className="step-title">{step.title}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StickyHeader;
