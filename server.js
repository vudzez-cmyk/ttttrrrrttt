import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());

app.get("/api/signal", (req, res) => {
  const mines = Number(req.query.mines || 3);
  const safeCount = Math.max(3, 7 - mines);
  const cells = Array.from({ length: 25 }, (_, i) => i);
  const shuffled = cells.sort(() => 0.5 - Math.random());
  res.json({ safe: shuffled.slice(0, safeCount) });
});

app.use(express.static(path.join(__dirname, "client/build")));
app.get("*", (_, res) =>
  res.sendFile(path.join(__dirname, "client/build/index.html"))
);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server started on", PORT));
