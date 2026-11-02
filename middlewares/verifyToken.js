const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];

  const token = authHeader && authHeader.split(' ')[1]; 

  if (!token) {
    return res.status(401).json({ message: 'Acesso negado. Token não fornecido.' });
  }

  try {
    //verifica a assinatura do token com o segredo do .env
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; //salva os dados do usuário na requisição
    next(); //libera a passagem para o controller
  } catch (error) {
    return res.status(403).json({ message: 'Token inválido ou expirado.' });
  }
};

module.exports = verifyToken;