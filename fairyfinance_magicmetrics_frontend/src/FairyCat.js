import React, { useState, useEffect, useRef } from 'react';

/**
 * FairyCat - Shows a cat image with a custom fairy message via the Cataas API.
 * Handles loading and errors, with fairy-tale styling.
 */

// PUBLIC_INTERFACE
function FairyCat({ message = "Fairy Blessings" }) {
  const [loading, setLoading] = useState(true);
  const [failed, setFailed] = useState(false);
  const [retryKey, setRetryKey] = useState(0);
  const fairyFont = "'Comic Sans MS', 'Brush Script MT', 'Caveat', 'Pacifico', cursive, sans-serif";
  const pastelBg = "linear-gradient(120deg, #f3e6ff, #ffe4fa 75%)";
  const catUrl = `https://cataas.com/cat/says/${encodeURIComponent(message)}?width=350&fontColor=8a2be2&fontSize=32&type=png`;

  // Ref for <img>, prevents onLoad/onError firing after unmount
  const isMounted = useRef(true);

  // After mount, track if component is unmounted to avoid state update warning
  useEffect(() => {
    isMounted.current = true;
    return () => { isMounted.current = false; }
  }, []);

  // Reset loading when props.message OR retryKey changes (new cat should always be "loading...")
  useEffect(() => {
    setLoading(true);
    setFailed(false);
  }, [message, retryKey]);

  // Spinner with fairy styling
  const spinner = (
    <div
      style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        minHeight: 226, minWidth: 250
      }}
    >
      <div
        className="fairy-spinner"
        style={{
          border: '6px solid #ffe4fa',
          borderTop: '6px solid #ffd700BB',
          borderRight: '6px solid #8a2be288',
          borderRadius: '50%',
          width: 58,
          height: 58,
          animation: 'fairy-spin 1.2s linear infinite',
          marginBottom: 16,
        }}
      ></div>
      <div
        style={{
          fontFamily: fairyFont,
          color: "#b373eb",
          marginTop: 2,
          fontSize: "1.11rem",
          fontWeight: 500,
        }}
      >✨ Summoning a magical cat...
      </div>
      <style>{`
        @keyframes fairy-spin {
          0% { transform: rotate(0deg);}
          100% { transform: rotate(360deg);}
        }
      `}</style>
    </div>
  );

  // Fallback for error
  const fallback = (
    <div
      style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        background: pastelBg, minHeight: 220, minWidth: 235,
        borderRadius: 18, border: "2.2px dashed #ffd700",
        boxShadow: "0 5px 24px #b373eb22",
        padding: "19px 16px 12px 16px"
      }}
    >
      <div style={{ fontSize: 55, marginBottom: 7 }}>🐾</div>
      <div style={{ fontFamily: fairyFont, color: "#ff69b4", fontSize: "1.28rem", textAlign: "center", fontWeight: 500 }}>
        Oh whiskers! The fairy cat hid behind the moon.<br />
        <span style={{ fontSize: "1.1rem", color: "#b373eb" }}>Try again for another sprinkle of magic!</span>
      </div>
      <button
        onClick={() => {
          // Reset state to reattempt load
          setRetryKey((k) => k + 1);
        }}
        className="btn"
        style={{
          fontFamily: fairyFont, marginTop: 17,
          background: "#ffd700", color: "#fff", borderRadius: 10, fontWeight: 600,
          fontSize: "1rem", boxShadow: "0 2px 8px #ffd70044", border: "none"
        }}
      >✨ Retry Fairy Cat</button>
    </div>
  );

  // Image event handlers always clear spinner/loading states robustly
  function handleLoad() {
    // Only set state if component is still mounted
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
      className="fairy-cat"
      style={{
        margin: "30px auto",
        background: pastelBg,
        borderRadius: 24,
        border: "2.5px dotted #e6cdfa",
        boxShadow: "0 2px 15px #ffd70033, 0 2px 12px #b373eb29",
        maxWidth: 410,
        minHeight: 236,
        textAlign: "center",
        padding: "18px 18px 7px 18px",
        position: "relative",
        zIndex: 2,
      }}
    >
      <div style={{
        fontFamily: fairyFont,
        fontSize: "1.37rem",
        color: "#8a2be2",
        marginBottom: 8,
        fontWeight: 600,
        textShadow: "0 1px 10px #fff1"
      }}>
        🐱 Fairy Cat of the Day
      </div>
      {/* Robust state logic ensures spinner only shows while loading */}
      {loading && !failed && spinner}
      {/* Key on [message, retryKey] so React reloads the image whenever props or retry changes */}
      {!loading && !failed && (
        <img
          key={message + retryKey}
          src={catUrl + `&cacheBust=${retryKey}`}
          alt={message}
          style={{
            maxWidth: 340, maxHeight: 180,
            borderRadius: 15,
            boxShadow: "0 2px 9px #ffd70055, 0 2px 12px #b373eb35",
            background: "#fff9fc",
            border: "2px solid #ffd70033",
            margin: '0 auto',
            display: "block",
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

export default FairyCat;
