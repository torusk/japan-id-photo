// src/components/CropStep.js
import React, { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import {
  Stage,
  Layer,
  Rect,
  Image as KonvaImage,
  Transformer,
} from "react-konva";

const CropStep = ({
  image,
  cropRect,
  updateCropRect,
  onCrop,
  onBack,
  template,
  isActive,
}) => {
  const { t } = useTranslation();
  const [zoomLevel, setZoomLevel] = useState(1);
  const [stageSize, setStageSize] = useState({ width: 0, height: 0 });

  const imageRef = useRef(null);
  const rectRef = useRef(null);
  const transformerRef = useRef(null);
  const containerRef = useRef(null);

  // アスペクト比を計算
  const aspectRatio = template.width / template.height;

  // ステージのサイズを計算
  useEffect(() => {
    if (image && containerRef.current) {
      const containerWidth = containerRef.current.clientWidth - 40; // パディングを考慮
      const maxHeight = window.innerHeight * 0.6; // 画面の60%を最大高さに

      const ratio = Math.min(
        containerWidth / image.width,
        maxHeight / image.height
      );

      setStageSize({
        width: image.width * ratio,
        height: image.height * ratio,
      });
    }
  }, [image, containerRef]);

  // トランスフォーマーを設定
  useEffect(() => {
    if (rectRef.current && transformerRef.current) {
      transformerRef.current.nodes([rectRef.current]);
      transformerRef.current.getLayer().batchDraw();
    }
  }, [cropRect]);

  // ズームレベルの変更
  const handleZoomChange = (e) => {
    setZoomLevel(parseFloat(e.target.value));
  };

  // クロップ領域のトランスフォーム処理
  const handleTransform = () => {
    if (rectRef.current) {
      const rect = rectRef.current;

      // スケールを適用
      const width = rect.width() * rect.scaleX();
      const height = width / aspectRatio;

      // 新しい位置とサイズを設定
      rect.setAttrs({
        width: width,
        height: height,
        scaleX: 1,
        scaleY: 1,
      });

      // 親コンポーネントの状態を更新
      const scale = image.width / stageSize.width;
      updateCropRect({
        x: rect.x() * scale,
        y: rect.y() * scale,
        width: width * scale,
        height: height * scale,
      });
    }
  };

  // ドラッグ終了時の処理
  const handleDragEnd = () => {
    if (rectRef.current) {
      const scale = image.width / stageSize.width;
      updateCropRect({
        ...cropRect,
        x: rectRef.current.x() * scale,
        y: rectRef.current.y() * scale,
      });
    }
  };

  // バウンディングボックスの制約関数
  const boundFunc = (oldBox, newBox) => {
    // アスペクト比を維持
    newBox.height = newBox.width / aspectRatio;

    // 最小サイズを制限
    if (newBox.width < 30 || newBox.height < 30) {
      return oldBox;
    }

    return newBox;
  };

  // ズームを適用したステージサイズ
  const zoomedStageSize = {
    width: stageSize.width * zoomLevel,
    height: stageSize.height * zoomLevel,
  };

  // クロップ領域のステージ座標変換
  const getStageCropRect = () => {
    if (!cropRect || !image || !stageSize.width) return null;

    const scale = stageSize.width / image.width;
    return {
      x: cropRect.x * scale,
      y: cropRect.y * scale,
      width: cropRect.width * scale,
      height: cropRect.height * scale,
    };
  };

  const stageCropRect = getStageCropRect();

  // 非アクティブな場合は表示しない
  if (!isActive) return null;

  return (
    <div
      className={`crop-container ${isActive ? "active" : ""}`}
      ref={containerRef}
    >
      <h2 className="section-title">{t("step_crop")}</h2>
      <p>
        {t("crop.instruction", {
          name: t(template.translationKey),
          description: template.description
        }) || `${t(template.translationKey)} (${template.description})`}
        <br />
        {t("crop.guide_text")}
      </p>

      <div className="zoom-control">
        <span>{t("crop.zoom_out")}</span>
        <input
          type="range"
          min="0.5"
          max="2"
          step="0.1"
          value={zoomLevel}
          onChange={handleZoomChange}
          aria-label={t("crop.zoom_label")}
        />
        <span>{t("crop.zoom_in")}</span>
      </div>

      <div className="stage-container">
        {image && stageSize.width > 0 && (
          <Stage
            width={zoomedStageSize.width}
            height={zoomedStageSize.height}
            scale={{ x: zoomLevel, y: zoomLevel }}
            style={{ margin: "0 auto" }}
          >
            <Layer>
              <KonvaImage
                ref={imageRef}
                image={image}
                width={stageSize.width}
                height={stageSize.height}
              />
              {stageCropRect && (
                <Rect
                  ref={rectRef}
                  x={stageCropRect.x}
                  y={stageCropRect.y}
                  width={stageCropRect.width}
                  height={stageCropRect.height}
                  stroke="red"
                  strokeWidth={2}
                  draggable
                  onTransform={handleTransform}
                  onDragEnd={handleDragEnd}
                />
              )}
              <Transformer
                ref={transformerRef}
                boundBoxFunc={boundFunc}
                keepRatio={true}
                enabledAnchors={[
                  "top-left",
                  "top-right",
                  "bottom-left",
                  "bottom-right",
                ]}
              />
            </Layer>
          </Stage>
        )}
      </div>

      <div className="crop-tips">
        <h3>{t("crop.tips_title", "ID Photo Guide:")}</h3>
        <ul>
          <li>{t("crop.tip_head", "Top of head to chin should be 70-80% of photo height")}</li>
          <li>{t("crop.tip_eye", "Look straight ahead")}</li>
          <li>{t("crop.tip_center", "Center the face in the photo")}</li>
        </ul>
      </div>

      <div className="button-container">
        <button onClick={onCrop} className="crop-button">
          {t("buttons.crop")}
        </button>
        <button onClick={onBack} className="back-button">
          {t("buttons.back")}
        </button>
      </div>
    </div>
  );
};

export default CropStep;
