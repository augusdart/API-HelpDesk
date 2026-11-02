const express = require('express');
const router = express.Router();
const verifyToken = require('../middlewares/verifyToken');

router.get('/', verifyToken, (req, res) => {
  //se chegou aqui, é porque o token é válido e req.user existe
  res.json({
    message: `Bem-vindo(a) ao Help Desk, ${req.user.email}!`,
    userId: req.user.id,
    chamados: [
      { id: 101, titulo: "Erro no servidor de e-mail", status: "Aberto", prioridade: "Alta" },
      { id: 102, titulo: "Solicitação de acesso à VPN", status: "Em Andamento", prioridade: "Média"} 
    ]
  });
});

module.exports = router;