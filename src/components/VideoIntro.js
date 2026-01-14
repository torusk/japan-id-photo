// src/components/VideoIntro.js
import React from "react";
import { useTranslation } from "react-i18next";

const VideoIntro = () => {
  const { t } = useTranslation();

  return (
    <div className="video-intro-container">
      <h2 className="section-title">{t("intro_title")}</h2>
      <div className="video-description">
        <p>{t("intro_description")}</p>
      </div>
      <div className="video-wrapper">
        <video controls autoPlay muted loop playsInline className="intro-video">
          <source src="/videos/idphoto.mp4" type="video/mp4" />
          {t("messages.video_unsupported")}
        </video>
      </div>
    </div>
  );
};

export default VideoIntro;
