import React, { useState, useRef, useEffect } from "react";

/**
 * DiceBearAvatar
 * Renders a whimsical avatar (SVG) from DiceBear.
 * Shows a magical spinner while loading,
 * and a fairy-like fallback if the image fails.
 *
 * Props:
 *   seed (string): Unique string for avatar (e.g. 'Fairy123' or user name)
 *   style (object): Optional extra style
 *   size (number): Size in px (default 96)
 */

const fairyFont =
  "'Comic Sans MS', 'Brush Script MT', 'Caveat', 'Pacifico', cursive, sans-serif";
const pastelBg = "linear-gradient(120deg,#ffe4fa 50%,#f3e6ff 100%)";

function spinnerStyle(size) {
  return {
    border: "6px solid #ffe4fa",
    borderTop: "6px solid #ffd700bb",
    borderRight: "6px solid #8a2be288",
    borderRadius: "50%",
    width: size * 0.48,
    height: size * 0.48,
    animation: "fairy-spin 1.2s linear infinite",
    margin: "0 auto 13px auto",
  };
}

// PUBLIC_INTERFACE
function DiceBearAvatar({ seed = "Fairy123", style = {}, size = 96 }) {
  const [loading, setLoading] = useState(true);
  const [failed, setFailed] = useState(false);
  const [retryKey, setRetryKey] = useState(0);
  const isMounted = useRef(true);

  // Robust mount/unmount
  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  useEffect(() => {
    setLoading(true);
    setFailed(false);
  }, [seed, retryKey]);

  // Compose DiceBear URL
  const url = `https://api.dicebear.com/7.x/fun-emoji/svg?seed=${encodeURIComponent(
    seed
  )}&backgroundColor=ffabea,ffd700,fff8dc`;

  // Spinner
  const spinner = (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        minHeight: size,
        minWidth: size,
        padding: 8,
      }}
    >
      <div style={spinnerStyle(size)} />
      <div
        style={{
          fontFamily: fairyFont,
          color: "#b373eb",
          fontSize: "1.1rem",
          fontWeight: 500,
        }}
      >
        ✨ Conjuring fairy avatar...
      </div>
      <style>
        {`
        @keyframes fairy-spin {
          0% { transform: rotate(0deg);}
          100% { transform: rotate(360deg);}
        }
        `}
      </style>
    </div>
  );

  // Fallback for error
  const fallback = (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        background: pastelBg,
        alignItems: "center",
        justifyContent: "center",
        minHeight: size,
        minWidth: size,
        borderRadius: "50%",
        border: "2px dashed #ffd700",
        boxShadow: "0 1px 14px #ffd70033",
        padding: "10px 8px 11px 8px",
        textAlign: "center",
      }}
    >
      <span style={{ fontSize: size / 2.4, marginBottom: 9 }}>🧚‍♀️</span>
      <span
        style={{
          fontFamily: fairyFont,
          fontSize: "1.13rem",
          color: "#ff69b4",
          fontWeight: 500,
          marginBottom: 8,
          maxWidth: size * 1.1,
        }}
      >
        Avatar flew away!<br />
        <span style={{ color: "#b373eb" }}>
          Try calling the fairy again.<br />
        </span>
      </span>
      <button
        className="btn"
        style={{
          fontFamily: fairyFont,
          background: "#ffd700",
          color: "#fff",
          borderRadius: 8,
          marginTop: 7,
          padding: "6px 18px",
          boxShadow: "0 2px 8px #ffd70022",
          border: "none",
          fontWeight: 600,
          fontSize: "1rem",
        }}
        onClick={() => setRetryKey((k) => k + 1)}
      >
        ✨ Summon Again
      </button>
    </div>
  );

  function handleLoad() {
    if (isMounted.current) {
      setLoading(false);
      setFailed(false);
    }
  }
  function handleError() {
    if (isMounted.current) {
      setLoading(false);
      setFailed(true);
    }
  }

  return (
    <div
      className="dicebear-avatar"
      style={{
        margin: "14px auto 14px auto",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        ...style,
      }}
    >
      <div
        style={{
          fontFamily: fairyFont,
          color: "#8a2be2",
          fontSize: size / 3.5,
          fontWeight: 700,
          marginBottom: -5,
          textShadow: "0 2px 8px #ffd70044",
        }}
      >
        ✧ Fairy Avatar ✧
      </div>
      {loading && !failed && spinner}
      {!loading && !failed && (
        <img
          key={seed + retryKey}
          src={url + `&cacheBust=${retryKey}`}
          alt={`Avatar of ${seed}`}
          style={{
            width: size,
            height: size,
            borderRadius: "50%",
            boxShadow: "0 2px 10px #ffd70033, 0 2px 8px #b373eb15",
            background: "#fff9fa",
            border: "2px solid #ffd70033",
            margin: "0 auto",
            display: "block",
            objectFit: "cover",
          }}
          onLoad={handleLoad}
          onError={handleError}
          loading="lazy"
        />
      )}
      {failed && fallback}
    </div>
  );
}

// PUBLIC_INTERFACE
export default DiceBearAvatar;
