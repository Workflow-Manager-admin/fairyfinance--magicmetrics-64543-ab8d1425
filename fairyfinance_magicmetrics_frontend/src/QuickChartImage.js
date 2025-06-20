import React, { useState, useRef, useEffect } from "react";

/**
 * QuickChartImage
 * Renders a chart image from QuickChart.io (PNG).
 * Shows a spinner while loading and a whimsical fallback if it fails.
 *
 * Props:
 *   url (string): URL for the QuickChart image
 *   style (object): Extra styles
 *   alt (string): Image alt text
 *   height (number): Height in px (default 168)
 */

const fairyFont =
  "'Comic Sans MS', 'Brush Script MT', 'Caveat', 'Pacifico', cursive, sans-serif";
const pastelBg = "linear-gradient(120deg, #ffe4fa 55%, #f3e6ff 100%)";

// Sample earnings bar chart: fairytale theme
const defaultQuickChartUrl = `https://quickchart.io/chart?w=450&h=180&bkg=white&f=png&c=${encodeURIComponent(
  JSON.stringify({
    type: "bar",
    data: {
      labels: [
        "Spring",
        "Summer",
        "Autumn",
        "Winter"
      ],
      datasets: [
        {
          label: "Earnings (Fairy Dust $)",
          data: [4, 7, 2, 6],
          backgroundColor: [
            "#ffd700", "#ff69b4", "#b373eb", "#f3e6ff"
          ],
          borderRadius: 18,
          borderSkipped: false
        }
      ],
    },
    options: {
      plugins: {
        legend: {
          labels: {
            font: { family: "Comic Sans MS", size: 14, weight: "bold"},
            color: "#8a2be2",
          }
        },
        title: {
          display: true,
          text: "Fairy Earnings per Season ✨",
          font: { family: "Pacifico", size: 21 },
          color: "#ff69b4"
        }
      },
      scales: {
        x: {
          ticks: {
            font: { family: "Caveat", size: 18 },
            color: "#b373eb"
          }
        },
        y: {
          ticks: {
            font: { family: "Pacifico", size: 13 },
            color: "#8a2be2"
          },
          suggestedMin: 0
        }
      }
    }
  })
)}`;

// PUBLIC_INTERFACE
function QuickChartImage({ url = defaultQuickChartUrl, style = {}, alt = "Fairy Chart", height = 168 }) {
  const [loading, setLoading] = useState(true);
  const [failed, setFailed] = useState(false);
  const [retryKey, setRetryKey] = useState(0);
  const isMounted = useRef(true);

  useEffect(() => {
    isMounted.current = true;
    return () => { isMounted.current = false; };
  }, []);

  useEffect(() => {
    setLoading(true);
    setFailed(false);
  }, [url, retryKey]);

  const spinner = (
    <div style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      minHeight: height + 12, minWidth: 222,
      padding: 10
    }}>
      <div style={{
        border: '6px solid #ffe4fa',
        borderTop: '6px solid #ffd700bb',
        borderRight: '6px solid #8a2be288',
        borderRadius: '50%',
        width: Math.max(36, (height / 2.8)),
        height: Math.max(36, (height / 2.8)),
        animation: 'fairy-spin 1.25s linear infinite',
        marginBottom: 17,
      }}></div>
      <div style={{
        fontFamily: fairyFont,
        color: "#b373eb",
        fontSize: "1.1rem",
        fontWeight: 500,
      }}>
        📊 Painting a magic chart...
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

  const fallback = (
    <div
      style={{
        background: pastelBg,
        border: "2.2px dashed #ffd700",
        borderRadius: 18,
        boxShadow: "0 2px 12px #ffd70017, 0 2px 12px #b373eb16",
        padding: "21px 8px 14px 8px",
        minHeight: height,
        minWidth: 200,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent:"center"
      }}
    >
      <span style={{ fontSize: 51, marginBottom: 8 }}>🪄</span>
      <div style={{
        fontFamily: fairyFont,
        color: "#ff69b4",
        fontSize: "1.14rem",
        fontWeight: 500,
        marginBottom: 4,
        textAlign: "center",
        maxWidth: 230,
      }}>
        The chart magic fizzled!<br />
        <span style={{ fontSize: "1.09rem", color: "#b373eb" }}>
          Please try to conjure it again.
        </span>
      </div>
      <button
        className="btn"
        style={{
          fontFamily: fairyFont,
          marginTop: 9,
          background: "#ffd700",
          color: "#fff",
          borderRadius: 8,
          fontWeight: 600,
          fontSize: "1rem",
          border: "none",
          boxShadow: "0 2px 8px #ffd70014"
        }}
        onClick={() => setRetryKey((k) => k + 1)}
      >
        ✨ Repaint Chart
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
      className="quickchart-image"
      style={{
        margin: "18px auto 10px auto",
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
          fontSize: "1.25rem",
          fontWeight: 700,
          marginBottom: -2,
          textShadow: "0 2px 8px #ffd70033",
        }}
      >
        ✧ Fairy Earnings Chart ✧
      </div>
      {loading && !failed && spinner}
      {!loading && !failed && (
        <img
          key={alt + retryKey}
          src={url + `&cacheBust=${retryKey}`}
          alt={alt}
          style={{
            height: height,
            maxWidth: 440,
            minWidth: 205,
            borderRadius: 20,
            background: "#fff",
            boxShadow: "0 3px 11px #ffd70012, 0 2px 7px #b373eb22",
            border: "2px solid #ffd70033",
            margin: "0 auto",
            marginTop: 2,
            display: "block",
            objectFit: "contain",
          }}
          onLoad={e => {
            if (isMounted.current) {
              if (e?.target?.naturalWidth > 10) {
                setLoading(false);
                setFailed(false);
              } else {
                setLoading(false);
                setFailed(true);
              }
            }
          }}
          onError={handleError}
          loading="lazy"
          crossOrigin="anonymous"
        />
      )}
      {failed && fallback}
    </div>
  );
}

// PUBLIC_INTERFACE
export default QuickChartImage;
