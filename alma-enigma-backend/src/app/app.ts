import express from "express";
import cors from "cors";
// import router from "../routes/router";

const app = express();

// Lista de origens permitidas (Frontend)
const allowedOrigins = [
  "http://localhost:5173", // Padrão do Vite (React/Vue)
  // "https://alma-enigma-frontend.vercel.app", // Coloque sua URL de produção aqui depois
];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  }),
);

// Limites aumentados são ótimos se o jogo for ter upload de imagens/desenhos no futuro!
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

// Rotas da API REST (ex: Login, Salvar Progresso Solo)
// app.use(router); 

app.get("/api/status", (req, res) => {
  res.json({ message: "Backend do AlmaEnigma funcionando! 🔮" });
});

export default app;