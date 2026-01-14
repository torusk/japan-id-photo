import React from "react";

const sizes = [128, 48, 32, 16];

export default function IconPreview() {
  return (
    <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
      {sizes.map((s) => (
        <div key={s} style={{ textAlign: "center" }}>
          <img
            src={`${process.env.PUBLIC_URL}/icons/icon_${s}x${s}.png`}
            alt={`${s}×${s} アイコン`}
            width={s}
            height={s}
            style={{ display: "block", margin: "0 auto" }}
          />
          <p style={{ fontSize: "12px", color: "#555" }}>{s}×{s}px</p>
        </div>
      ))}
    </div>
  );
}