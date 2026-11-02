const express = require('express');
const sequelize = require('./config/database');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const ticketRoutes = require('./routes/ticketRoutes');

const app = express();
app.use(express.json());


app.use('/api/auth', authRoutes);
app.use('/api/tickets', ticketRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'API está funcionando!' });
});

//sincroniza com o banco e inicia o servidor
sequelize.sync({ alter: true }) //'alter: true' atualiza a tabela se o Model mudar
  .then(() => {
    console.log('Conexão com o MySQL estabelecida com sucesso!');
    app.listen(process.env.PORT || 3000, () => {
      console.log(`Servidor rodando na porta ${process.env.PORT || 3000}`);
    });
  })
  .catch((err) => {
    console.error('Erro ao conectar no banco de dados:', err);
  });