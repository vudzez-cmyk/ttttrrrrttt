import React, { useEffect, useState } from "react";
import { initTelegram } from "./telegram";

export default function App() {
  const [mines, setMines] = useState(3);
  const [loading, setLoading] = useState(false);
  const [signal, setSignal] = useState<number[]>([]);

  useEffect(() => {
    initTelegram();
  }, []);

  async function getSignal() {
    setLoading(true);
    setSignal([]);
    const res = await fetch(`/api/signal?mines=${mines}`);
    const data = await res.json();
    setTimeout(() => {
      setSignal(data.safe);
      setLoading(false);
    }, 2000);
  }

  return (
    <div className="app">
      <h1>Mines Signals</h1>

      {!loading && signal.length === 0 && (
        <>
          <label>Mines: {mines}</label>
          <input
            type="range"
            min={1}
            max={10}
            value={mines}
            onChange={e => setMines(+e.target.value)}
          />
          <button onClick={getSignal}>GET SIGNAL</button>
        </>
      )}

      {loading && <div className="loading">Analyzing game…</div>}

      {signal.length > 0 && (
        <>
          <div className="grid">
            {Array.from({ length: 25 }).map((_, i) => (
              <div
                key={i}
                className={`cell ${signal.includes(i) ? "safe" : ""}`}
              />
            ))}
          </div>
          <button onClick={getSignal}>GENERATE AGAIN</button>
        </>
      )}
    </div>
  );
}
