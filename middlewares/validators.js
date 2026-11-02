const { body, validationResult } = require('express-validator');

//regras para o Cadastro
const registerValidationRules = () => {
  return [
    body('name').trim().notEmpty().withMessage('O nome é obrigatório.').escape(),
    body('email').trim().isEmail().withMessage('Forneça um e-mail válido.').normalizeEmail(),
    body('password')
      .isLength({ min: 6 })
      .withMessage('A senha deve ter pelo menos 6 caracteres.')
      .trim(),
  ];
};

//regras para o Login
const loginValidationRules = () => {
  return [
    body('email').trim().isEmail().withMessage('E-mail inválido.').normalizeEmail(),
    body('password').notEmpty().withMessage('A senha é obrigatória.'),
  ];
};

//middleware que verifica se houve erros de validação
const validate = (req, res, next) => {
  const errors = validationResult(req);
  
  if (errors.isEmpty()) {
    return next(); // Se não houver erros, continua para o controller
  }

  //se houver erros, extrai e retorna um JSON bonitinho
  const extractedErrors = [];
  errors.array().map(err => extractedErrors.push({ [err.path]: err.msg }));

  return res.status(422).json({ errors: extractedErrors });
};

module.exports = { registerValidationRules, loginValidationRules, validate };