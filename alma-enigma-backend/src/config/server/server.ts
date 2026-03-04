import app from "../../app/app"; // Mantendo o seu padrão de importação com alias
import http from "http";
import { Server } from "socket.io";

const PORT = process.env.PORT || 3001;

// 1. Cria o servidor HTTP nativo envelopando o seu App do Express
const httpServer = http.createServer(app);

// 2. Inicializa o Socket.io passando esse mesmo servidor
const io = new Server(httpServer, {
  cors: {
    origin: [
      "http://localhost:5173",
      // Adicione a URL de produção do frontend aqui também
    ],
    credentials: true,
    methods: ["GET", "POST"],
  },
});

// 3. Gerenciador de eventos em Tempo Real (Multiplayer do AlmaEnigma)
io.on("connection", (socket) => {
  console.log(`[Socket] Nova alma conectada: ${socket.id}`);

  // Evento: Jogador entrando em uma sala
  socket.on("join_room", (roomCode) => {
    socket.join(roomCode);
    console.log(`Jogador ${socket.id} entrou na sala: ${roomCode}`);

    // Avisa todos da sala (menos quem acabou de entrar)
    socket.to(roomCode).emit("player_joined", { playerId: socket.id });
  });

  // Evento: Desconexão
  socket.on("disconnect", () => {
    console.log(`[Socket] Conexão perdida com: ${socket.id}`);
  });
});

// 4. Inicia o servidor HTTP (que agora escuta tanto rotas Express quanto eventos Socket)
httpServer.listen(PORT, () => {
  console.log(`🚀 Servidor do AlmaEnigma rodando na porta ${PORT}`);
});
