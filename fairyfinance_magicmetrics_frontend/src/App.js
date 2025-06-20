import React, { useState, useEffect } from 'react';
import './App.css';

/**
 * THEME COLORS
 * Primary: #ffd700 (gold)
 * Secondary: #ff69b4 (hot pink)
 * Accent: #8a2be2 (blue-violet/magic)
 * Whimsical pastel backgrounds, playful but readable UI.
 */

// Helper: pretty fairy font stack
const fairyFont = "'Comic Sans MS', 'Brush Script MT', 'Caveat', 'Pacifico', cursive, sans-serif";

// PUBLIC_INTERFACE
function FairyFinanceMagicMetrics() {
  // State for user input form
  const [age, setAge] = useState('');
  const [name, setName] = useState('');
  const [teethLost, setTeethLost] = useState([]); // [{date, notes, value}]
  const [currentTooth, setCurrentTooth] = useState({date: '', notes: '', value: ''});
  const [error, setError] = useState('');
  const [showReport, setShowReport] = useState(false);

  // Derived stats:
  const totalEarnings = teethLost.reduce((acc, t) => acc + Number(t.value || 0), 0);
  const teethCount = teethLost.length;
  const avgValue = teethCount ? (totalEarnings / teethCount).toFixed(2) : 0;

  // Trend: teeth lost per month
  const months = {};
  teethLost.forEach(tooth => {
    if (!tooth.date) return;
    const month = (new Date(tooth.date)).toLocaleString('default', { month: 'short', year: 'numeric' });
    months[month] = (months[month] || 0) + 1;
  });

  // Add tooth record
  function handleAddTooth(e) {
    e.preventDefault();
    setError('');
    if (!currentTooth.date || !currentTooth.value) {
      setError('Please enter the date and the value for each tooth!');
      return;
    }
    setTeethLost([
      ...teethLost,
      { ...currentTooth }
    ]);
    setCurrentTooth({date:'', notes:'', value:''});
  }

  // Remove tooth
  function handleRemoveTooth(idx) {
    setTeethLost(teethLost.filter((_, i) => i !== idx));
  }

  // PUBLIC_INTERFACE
  function handleReport(e) {
    e.preventDefault();
    if (!age || !name || teethLost.length === 0) {
      setError("Please fill out your name, age, and at least one tooth loss record!");
      setShowReport(false);
      return;
    }
    setError('');
    setShowReport(true);
  }

  // PUBLIC_INTERFACE
  function handleReset() {
    setAge('');
    setName('');
    setTeethLost([]);
    setShowReport(false);
    setCurrentTooth({date:'', notes:'', value:''});
    setError('');
  }

  // Color helpers
  const pastelPurple = "#f3e6ff";
  const pastelGold = "#fff8dc";
  const pastelPink = "#ffe4fa";
  const borderColor = "#e6cdfa";

  return (
    <div className="fairy-root"
      style={{
        minHeight: '100vh',
        background: `linear-gradient(120deg, ${pastelPurple}, ${pastelGold}, ${pastelPink})`,
        fontFamily: "'Inter', Arial, " + fairyFont,
        color: "#8a2be2"
      }}>
      {/* Whimsical NavBar */}
      <nav style={{
        background: 'rgba(255,218,251,0.8)',
        borderBottom: `4px double ${pastelPink}`,
        padding: '16px 0',
        fontFamily: fairyFont,
      }}>
        <div style={{
          maxWidth: 950, margin: "0 auto",
          display:'flex', alignItems:'center', justifyContent:'space-between', padding: '0 32px'
        }}>
          <div style={{
            fontSize: 32,
            fontWeight: 700,
            display:'flex', alignItems:'center',
            letterSpacing: 2,
            color: "#ff69b4", textShadow:'0 2px 10px #ffd70099'
          }}>
            🧚 FairyFinance <span style={{fontSize:'1.7rem',marginLeft:10, color:'#8a2be2'}}>✧</span>
            <span style={{color:'#ffd700',fontSize:'1.5rem',marginLeft:3}}>MagicMetrics</span>
          </div>
          <span style={{
            border: `2px dashed #ffd700`,
            borderRadius: 14,
            background: '#fffbe91a',
            fontFamily: fairyFont,
            fontSize: 20,
            padding: "6px 20px",
            color: "#b373eb"
          }}>
            Tooth Fairy’s Ledger
          </span>
        </div>
      </nav>

      {/* Main container */}
      <div className="container" style={{
        margin: '48px auto',
        maxWidth: 900,
        background: '#ffffffee',
        borderRadius: "30px",
        boxShadow: '0 0 36px #ffd70055, 0 0 64px #ff69b466',
        border: `2.5px solid ${borderColor}`,
        padding: '34px 28px 50px 28px'
      }}>
        <header style={{textAlign:"center", paddingBottom:16}}>
          <h1 style={{
            fontFamily: fairyFont,
            fontSize: '2.8rem',
            letterSpacing: 1.5,
            marginBottom: 6,
            color: "#8a2be2",
            textShadow: '0 1px 0 #ffd700, 0 8px 16px #ff69b41a'
          }}>
            Welcome to FairyFinance & MagicMetrics!
          </h1>
          <div style={{color:'#ff69b4',fontFamily:fairyFont, fontSize:'1.4rem',marginBottom:8}}>
            Where lost teeth become magical fortunes ✨
          </div>
          <div style={{
            fontSize:'1.08rem', maxWidth: 580, margin:'0 auto',
            fontWeight: 400, color:"#4c3363"
          }}>
            Enter your details below to let the Tooth Fairy work her magic, tracking your shiny teeth earnings and whimsical stories!
          </div>
        </header>

        {/* Magical Message / Fairy Wisdom */}
        <MagicMessage />

        {/* User Input Form */}
        {!showReport && (
          <form
            onSubmit={handleReport}
            style={{
              margin: "36px auto 20px auto",
              borderRadius:24,
              background: '#ffe4fab0',
              padding: '32px 18px',
              maxWidth: 500,
              boxShadow: "0 2px 12px #ffd70020",
              border: `1.5px dashed #ffd700`
            }}
          >
            <fieldset style={{border:"none",padding:0,margin:0}}>
              <legend style={{
                fontFamily: fairyFont, fontSize: "1.6rem", color: "#b373eb",
                letterSpacing: 1, marginBottom: 12, textAlign:'center'
              }}>
                Tell us about yourself!
              </legend>

              <div style={{marginBottom: 18, display:'flex',gap:12}}>
                <input
                  type="text"
                  placeholder="Your Name"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  maxLength={22}
                  style={{
                    flex:1,
                    borderRadius: '9px',
                    border: `1.5px solid #8a2be2`,
                    padding: "10px 14px",
                    fontSize: 18,
                    fontFamily: fairyFont,
                    marginRight: 0,
                  }}
                  autoFocus
                  required
                />
                <input
                  type="number"
                  min={1}
                  max={99}
                  placeholder="Age"
                  value={age}
                  onChange={e => setAge(e.target.value)}
                  style={{
                    width: 80,
                    borderRadius: '9px',
                    border: `1.5px solid #ffd700`,
                    padding: "10px 13px",
                    fontSize: 18,
                    fontFamily: fairyFont,
                  }}
                  required
                />
              </div>

              {/* Tooth loss inputs */}
              <div style={{
                background: "#ffe4fff3",
                borderRadius: "12px",
                padding: "18px 14px",
                border: "1.3px solid #b373eb",
                marginBottom: 10,
              }}>
                <label style={{fontWeight: 500, fontFamily: fairyFont, color: "#8a2be2", fontSize:"1.1rem"}}>
                  Add a lost tooth:
                </label>
                <div style={{display: 'flex', alignItems:'center', gap:10, marginTop: 5}}>
                  <input type="date"
                    min="2000-01-01"
                    max={new Date().toISOString().split('T')[0]}
                    value={currentTooth.date}
                    onChange={e=>setCurrentTooth({...currentTooth, date:e.target.value})}
                    style={{
                      borderRadius: 8, border:'1px solid #ffd700', padding:'6px 12px',
                      fontFamily: fairyFont, fontSize:15
                    }}
                    required
                  />
                  <input type="number"
                    min="0"
                    step=".01"
                    placeholder={'$'}
                    value={currentTooth.value}
                    onChange={e=>setCurrentTooth({...currentTooth, value:e.target.value})}
                    style={{
                      width:66,
                      borderRadius: 8,
                      border:'1.1px solid #ffd700',
                      padding:"7px 10px",
                      fontFamily: fairyFont,
                      fontSize:16
                    }}
                    required
                  />
                  <input type="text"
                    maxLength={40}
                    placeholder="Whimsical notes (optional)"
                    value={currentTooth.notes}
                    onChange={e=>setCurrentTooth({...currentTooth, notes:e.target.value})}
                    style={{
                      flex:1,
                      borderRadius: 8,
                      border:'1.1px solid #b373eb',
                      padding:"7px 12px",
                      fontFamily: fairyFont,
                      fontSize:15,
                    }}
                  />
                  <button type="button"
                    className="btn"
                    style={{
                      background:"#ffd700",
                      color:'#8a2be2',
                      borderRadius: 8,
                      fontFamily: fairyFont,
                      fontWeight:600,
                      marginLeft: 4,
                      fontSize: '1.05rem',
                      padding: '7px 13px'
                    }}
                    onClick={handleAddTooth}
                  >Add</button>
                </div>

                {/* Display the list of entered teeth */}
                {teethLost.length > 0 && (
                  <div style={{
                    marginTop:12,
                    borderTop:`1.1px dotted #ff69b4`,
                    paddingTop:6,
                    maxHeight:110,
                    overflowY:'auto'
                  }}>
                    <ul style={{ listStyle: 'none', paddingLeft: 0, margin:0 }}>
                    {teethLost.map((t, idx)=>(
                      <li
                        key={idx}
                        style={{
                          display:'flex',
                          alignItems:'center',
                          gap:7,
                          fontSize:'1.01rem',
                          borderRadius:7,
                          background:'#fffbe7bb',
                          margin:'6px 0',
                          padding:'3px 6px'
                        }}
                      >
                        <span title={t.notes} style={{color:"#8a2be2"}}>
                           🦷 {t.date} <span style={{color:"#b373eb",fontWeight:600}}>${t.value}</span>
                           {t.notes && <span style={{color:"#ff69b4",marginLeft:6}}>{t.notes}</span>}
                        </span>
                        <button type="button"
                          title="Remove"
                          onClick={()=>handleRemoveTooth(idx)}
                          style={{
                            background:"none",
                            border:"none",
                            color:"#ff69b4",
                            fontSize:"1.3em",
                            marginLeft: 8,
                            cursor: 'pointer',
                            lineHeight: 1
                          }}>✗</button>
                      </li>
                    ))}
                    </ul>
                  </div>
                )}
              </div>

              {error && <div style={{color: "#e62e8e", fontWeight: 500, marginBottom: 10}}>{error}</div>}

              <button
                type="submit"
                className="btn btn-large"
                style={{
                  background: `linear-gradient(90deg, #ffd700 40%, #ff69b4 100%)`,
                  color: "#fff",
                  fontFamily: fairyFont,
                  fontWeight: 700,
                  fontSize: '1.2rem',
                  borderRadius: 14,
                  marginTop: 10,
                  boxShadow: "0 2px 16px #ffd70038",
                  border:"none"
                }}>
                Generate Magical Report
              </button>
            </fieldset>
          </form>
        )}

        {/* Main Report/Stats & Visualization */}
        {showReport && (
        <div>
          <button
            onClick={handleReset}
            className="btn"
            style={{
              float: 'right',
              background: "#ff69b4",
              color: "#fff",
              borderRadius: 12,
              fontFamily: fairyFont,
              marginBottom: 20,
              fontWeight: 'bold',
              letterSpacing: 1
            }}>
            Start Over
          </button>
          {/* Section: Main Ledger Report */}
          <MagicalLedger
            name={name}
            age={age}
            teethLost={teethLost}
            totalEarnings={totalEarnings}
            avgValue={avgValue}
          />

          {/* Section: Detailed Ledger Table */}
          <LedgerTable
            teethLost={teethLost}
          />

          {/* Section: MagicMetrics Visualization */}
          <div style={{marginTop:30, marginBottom:16}}>
            <h2 style={{
              fontFamily: fairyFont,
              color: "#ff69b4",
              fontSize:'1.7rem',
              margin:"6px 0 14px 0",
              letterSpacing: 1
            }}>
              MagicMetrics: 🪄 Tooth Loss Trends
            </h2>
            <ToothLossTrendsChart months={months} />
            <div style={{
              fontFamily: fairyFont,
              fontWeight: 500,
              fontSize: '1.1rem',
              marginTop: 10,
              color: "#8a2be2",
              background: "#fffae2",
              borderRadius: 8,
              padding: "10px 10px 12px 15px",
              border: '1.2px dashed #ffd700',
              boxShadow: '0 2px 12px #ffd70019'
            }}>
              {analyzeTrends(teethLost)}
            </div>
          </div>
        </div>
        )}

      </div>
      <footer style={{
        marginTop: 47,
        textAlign: 'center',
        fontFamily: fairyFont,
        color: "#b373ebbb",
        fontSize: '1.07rem',
        letterSpacing: 1
      }}>
        Powered by fairy dust ✨ and magical math
      </footer>
    </div>
  );
}

// PUBLIC_INTERFACE
function MagicalLedger({name, age, teethLost, totalEarnings, avgValue}) {
  const fairyFont = "'Comic Sans MS', 'Brush Script MT', 'Caveat', 'Pacifico', cursive, sans-serif";
  return (
    <section style={{
      background: 'linear-gradient(90deg,#ffd70020 50%,#ff69b438)',
      boxShadow: "0 2px 18px #8a2be210",
      borderRadius: '22px',
      padding: '26px 28px 15px 28px',
      margin: '20px 0 16px 0',
      border: '1.8px solid #ffd700',
      position: 'relative'
    }}>
      <h2 style={{
        margin: 0, fontSize: '2rem',
        color: "#8a2be2",
        fontFamily: fairyFont,
        textShadow:'0 0px 9px #fff1'
      }}>
        🧚 Fairy’s Magical Ledger
      </h2>
      <div style={{
        marginTop: 10,
        fontFamily: fairyFont,
        fontSize: "1.15rem",
        color:'#ff69b4',
        fontWeight: 500
      }}>
        Report for: <span style={{color: "#8a2be2", fontWeight:600}}>{name}</span>, age <span style={{color:"#ffd700"}}>{age}</span>
      </div>
      <ul style={{
        fontFamily: fairyFont,
        fontWeight: 500,
        listStyle:"none", paddingLeft:0, marginTop: 17, marginBottom: 0,
        fontSize:'1.18rem', color:'#aa2db3'
      }}>
        <li>✨ Total teeth lost: <strong style={{color:"#ff69b4"}}>{teethLost.length}</strong></li>
        <li>💰 Total earnings: <strong style={{color:"#ffd700"}}>${totalEarnings}</strong></li>
        <li>🌈 Average per tooth: <strong style={{color:"#b373eb"}}>${avgValue}</strong></li>
        <li>🦷 First lost: <strong style={{color:"#ff69b4"}}>{teethLost.length ? teethLost[0].date : '-'}</strong></li>
        <li>🍭 Last lost: <strong style={{color:"#ff69b4"}}>{teethLost.length ? teethLost[teethLost.length-1].date : '-'}</strong></li>
      </ul>
    </section>
  );
}


// PUBLIC_INTERFACE
function LedgerTable({teethLost}) {
  if (teethLost.length === 0) return null;

  return (
    <section style={{
      margin: '30px 0',
      borderRadius: 20,
      background: 'linear-gradient(90deg, #ffe4fa88, #ffd70030 90%)',
      border: "2px solid #ffd70033",
      boxShadow:"0 3px 12px #8a2be214"
    }}>
      <table style={{
        width:'100%',
        fontFamily: "'Caveat', 'Comic Sans MS', cursive, sans-serif",
        fontSize:"1.12rem",
        borderCollapse: "separate",
        borderSpacing: "0 8px",
        background:'none'
      }}>
        <thead>
        <tr style={{
          background: "#ffd70040",
          color: "#8a2be2",
          textShadow:"0 2px 8px #fff7",
          fontSize:"1.15em"
        }}>
          <th style={{padding:"11px 2px"}}>Date</th>
          <th>Value</th>
          <th>Notes</th>
        </tr>
        </thead>
        <tbody>
        {teethLost.map((tooth, idx) =>
          <tr key={idx}
            style={{
              background: "#fff7fa",
              borderRadius: 18,
              color: "#8527a7",
              boxShadow: "0 1px 9px #ffd70010",
            }}>
            <td style={{padding:"9px 2px 9px 6px"}}>{tooth.date}</td>
            <td style={{color:"#ffd700",fontWeight:600}}>${tooth.value}</td>
            <td style={{color:"#ff69b4"}}>{tooth.notes || <span style={{color:"#8a2be2"}}>–</span>}</td>
          </tr>
        )}
        </tbody>
      </table>
    </section>
  );
}

// PUBLIC_INTERFACE
function ToothLossTrendsChart({months}) {
  // Simple bar visualization with magic effect, pure SVG
  const labels = Object.keys(months);
  const maxY = Math.max(1, ...Object.values(months));
  const colorBar = "#ffd700";
  const colorAccent = "#8a2be2";

  return (
    <div style={{
      width:"95%",
      margin: "0 auto",
      background: "#f3e6ff",
      borderRadius: 20,
      padding: "18px 12px",
      border: `1.7px solid #b373eb`,
      boxShadow:"0 3px 12px #8a2be224"
    }}>
      {labels.length === 0 ? (
        <div style={{textAlign:'center', color:"#b373eb", fontFamily:"'Caveat', cursive"}}>
          No trends yet! <span role="img" aria-label="sparkles">✨</span>
        </div>
      ) : (
        <svg
          width="100%"
          height="120"
          viewBox={`0 0 ${labels.length * 60} 120`}
          style={{display: "block", margin: "0 auto", minWidth: labels.length * 55}}
        >
          {labels.map((label, idx) => {
            const height = 85 * (months[label] / maxY);
            return (
              <g key={label}>
                <rect
                  x={idx * 60 + 18}
                  y={110 - height}
                  width="32"
                  height={height}
                  fill={colorBar}
                  stroke={colorAccent}
                  strokeWidth="1.5"
                  rx="10"
                  style={{
                    filter:"drop-shadow(0 2px 8px #ffd70099)"
                  }}
                />
                <text
                  x={idx * 60 + 35}
                  y={110 - height - 7}
                  textAnchor="middle"
                  fontSize="13"
                  fontFamily="'Caveat', cursive"
                  fill="#ff69b4"
                  style={{
                    textShadow: '0 1px 10px #fffaf8'
                  }}>
                  {months[label]}
                </text>
                <text
                  x={idx * 60 + 34}
                  y={116}
                  textAnchor="middle"
                  fontSize="12.5"
                  fontFamily="'Pacifico', 'Comic Sans MS', cursive"
                  fill={colorAccent}
                >{label}</text>
              </g>
            );
          })}
        </svg>
      )}
    </div>
  );
}

// PUBLIC_INTERFACE
function analyzeTrends(teethLost) {
  if (!teethLost.length) return "No data yet! Start adding tooth losses to discover magical stories ✨";
  // Major trends:
  const sorted = [...teethLost].sort((a, b)=>a.date.localeCompare(b.date));
  let msg = "";
  if (teethLost.length > 1) {
    // Earliest and most recent:
    msg += `First tooth lost on ${sorted[0].date}, most recently on ${sorted[sorted.length-1].date}. `;
    // Most valuable tooth
    const max = teethLost.reduce((a, b)=>Number(a.value) > Number(b.value) ? a : b);
    msg += `Your most sparkling tooth earned $${max.value} ${max.notes ? `with note: "${max.notes}"`:''}. `;
  }
  // Month with most losses
  const monthCounts = {};
  teethLost.forEach(t => {
    const month = t.date ? (new Date(t.date)).toLocaleString('default', { month: 'long', year: 'numeric' }) : "Unknown";
    monthCounts[month] = (monthCounts[month] || 0) + 1;
  });
  const bigMonth = Object.entries(monthCounts).sort((a,b)=>b[1]-a[1])[0];
  if (bigMonth && bigMonth[1] > 1)
    msg += `You lost the most teeth in ${bigMonth[0]} (${bigMonth[1]} teeth)! `;
  // Special note
  if (teethLost.find(t => t.notes && t.notes.match(/courage|brave|hero|prize/i)))
    msg += "Such bravery! The Tooth Fairy awards a courage star 🏅✨.";
  if (!msg) msg="What a magical tooth journey!";
  return msg;
}


/**
 * Magical Message Component
 * Fetches a random "fairy wisdom" quote and displays it with styled sparkle.
 */
// PUBLIC_INTERFACE
function MagicMessage() {
  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('');
  const [loading, setLoading] = useState(true);
  const [failed, setFailed] = useState(false);

  // Whimsical style variables
  const fairyFont = "'Comic Sans MS', 'Brush Script MT', 'Caveat', 'Pacifico', cursive, sans-serif";
  const fairyGradient = "linear-gradient(90deg,#ffd70050,#ff69b460,#8a2be220 90%)";

  // Fetch a magic message on mount
  useEffect(() => {
    setLoading(true); setFailed(false);
    fetch('https://api.quotable.io/random')
      .then(resp => {
        if (!resp.ok) throw new Error("Bad quote response");
        return resp.json();
      })
      .then(data => {
        setQuote(data.content);
        setAuthor(data.author);
        setLoading(false);
      })
      .catch(() => {
        setFailed(true);
        setLoading(false);
      });
  }, []);

  let content;
  if (loading) {
    content = (
      <span style={{
        color: "#b373eb",
        fontFamily: fairyFont,
        fontWeight: 500,
        fontSize: "1.18rem"
      }}>
        🧚‍♀️ Summoning fairy wisdom...
      </span>
    );
  } else if (failed) {
    content = (
      <span style={{
        color: "#ff69b4",
        fontFamily: fairyFont,
        fontWeight: 500,
        fontSize: "1.15rem"
      }}>
        ✨ The fairy folk are thinking... "Even the smallest tooth holds great magic!"
      </span>
    );
  } else {
    content = (
      <span>
        <span style={{
          color: "#8a2be2",
          fontFamily: fairyFont,
          fontWeight: 600,
          fontSize: "1.28rem"
        }}>
          <span style={{marginRight: 7}}>🧚 Magic Message:</span>
          “{quote}”
        </span>
        <span style={{
          color: "#b373eb",
          fontFamily: fairyFont,
          fontSize: "1.02rem",
          marginLeft: 12
        }}>
          — {author}
        </span>
      </span>
    );
  }

  return (
    <div
      aria-label="Magical message of the day"
      style={{
        margin: "20px auto 15px auto",
        maxWidth: 620,
        background: fairyGradient,
        border: "2.5px dashed #ffd700",
        borderRadius: 22,
        textAlign: "center",
        padding: "18px 22px 15px 22px",
        fontFamily: fairyFont,
        letterSpacing: .5,
        boxShadow: "0 2px 24px #ffd70028, 0 2px 10px #ff69b420",
        position: 'relative',
        zIndex: 2
      }}
    >
      <span
        style={{
          display: "inline-block",
          marginRight: "9px",
          verticalAlign: "middle",
          fontSize: "1.55rem"
        }}
        role="img"
        aria-label="sparkle"
      >✨</span>
      {content}
      <span
        style={{
          display: "inline-block",
          marginLeft: "9px",
          verticalAlign: "middle",
          fontSize: "1.55rem"
        }}
        role="img"
        aria-label="sparkle"
      >✨</span>
    </div>
  );
}

export default FairyFinanceMagicMetrics;
