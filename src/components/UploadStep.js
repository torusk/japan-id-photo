// src/components/UploadStep.js
import React, { useRef } from "react";
import { useTranslation } from "react-i18next";

const UploadStep = ({ onImageUpload, onBack, isActive, selectedTemplate }) => {
  const { t } = useTranslation();
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      onImageUpload(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      onImageUpload(e.dataTransfer.files[0]);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  // 選択されていない場合は表示しない
  if (!selectedTemplate) return null;

  return (
    <div
      className={`upload-container ${isActive ? "active" : ""}`}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <h2 className="section-title">{t("step_upload")}</h2>
      <p>
        {t("upload.instruction", {
          name: t(selectedTemplate.translationKey),
          description: selectedTemplate.description
        }) || `${t(selectedTemplate.translationKey)} (${selectedTemplate.description})`}
      </p>

      <div className="upload-area" onClick={handleUploadClick}>
        <i className="upload-icon">📁</i>
        <p>
          {t("upload.click_or_drag")}
        </p>
        <input
          type="file"
          ref={fileInputRef}
          accept="image/*"
          onChange={handleFileChange}
          style={{ display: "none" }}
        />
      </div>

      <div className="tips-container">
        <h3>{t("upload.tips_title", "Photo Taking Tips:")}</h3>
        <ul>
          <li>{t("upload.tip_light", "Take photos in a bright place")}</li>
          <li>{t("upload.tip_bg", "Use a plain background if possible")}</li>
          <li>{t("upload.tip_quality", "Use high-resolution photos for better quality")}</li>
        </ul>
      </div>

      <div className="button-container">
        <button onClick={onBack} className="back-button">
          {t("buttons.back")}
        </button>
      </div>
    </div>
  );
};

export default UploadStep;
