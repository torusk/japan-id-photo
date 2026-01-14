// src/components/TemplateStep.js
import React from "react";
import { useTranslation } from "react-i18next";

const TemplateStep = ({ templates, onTemplateSelect, isActive }) => {
  const { t } = useTranslation();

  return (
    <div className={`template-container ${isActive ? "active" : ""}`}>
      <h2 className="section-title">{t("step_template")}</h2>
      <p>{t("templates.select_description", "Select the type of ID photo you want to create.")}</p>

      <div className="templates-grid">
        {Object.keys(templates).map((templateId) => {
          const template = templates[templateId];
          return (
            <button
              key={templateId}
              onClick={() => onTemplateSelect(templateId)}
              className="template-button"
              aria-label={t(template.translationKey)}
            >
              <div className="template-name">{t(template.translationKey)}</div>
              <span className="template-size">{template.description}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default TemplateStep;
