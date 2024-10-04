
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Formulário de Contato' });
});

// Lista de DDDs válidos no Brasil
const validDDDs = [
  '11', '12', '13', '14', '15', '16', '17', '18', '19', // São Paulo
  '21', '22', '24', // Rio de Janeiro
  '27', '28', // Espírito Santo
  '31', '32', '33', '34', '35', '37', '38', // Minas Gerais
  '41', '42', '43', '44', '45', '46', // Paraná
  '47', '48', '49', // Santa Catarina
  '51', '53', '54', '55', // Rio Grande do Sul
  '61', // Distrito Federal
  '62', '64', // Goiás
  '63', // Tocantins
  '65', '66', // Mato Grosso
  '67', // Mato Grosso do Sul
  '68', // Acre
  '69', // Rondônia
  '71', '73', '74', '75', '77', // Bahia
  '79', // Sergipe
  '81', '87', // Pernambuco
  '82', // Alagoas
  '83', // Paraíba
  '84', // Rio Grande do Norte
  '85', '88', // Ceará
  '86', '89', // Piauí
  '91', '93', '94', // Pará
  '92', '97', // Amazonas
  '95', // Roraima
  '96', // Amapá
  '98', '99' // Maranhão
];

// Função de validação de e-mail
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Função de validação de data
function isValidDate(date) {
  const parsedDate = new Date(date);
  return !isNaN(parsedDate.getTime());
}

// Função para validação do formulário
router.post('/submit', function (req, res) {
  const {
    nome,
    data_nascimento,
    nome_mae,
    nome_pai,
    ddd,
    telefone,
    ramal,
    email,
    serie,
    turno,
    atividade = []
  } = req.body;

  // Verificar se todos os campos obrigatórios estão preenchidos
  if (!nome || !data_nascimento || !nome_mae || !nome_pai || !ddd || !telefone || !email || !serie || !turno) {
    return res.status(400).send('Todos os campos obrigatórios devem ser preenchidos.');
  }

  // Validar a data de nascimento
  if (!isValidDate(data_nascimento)) {
    return res.status(400).send('Data de nascimento inválida.');
  }

  // Validar o e-mail
  if (!isValidEmail(email)) {
    return res.status(400).send('E-mail inválido. O e-mail deve conter "@" e "."');
  }

  // Validar DDD
  if (!validDDDs.includes(ddd)) {
    return res.status(400).send('DDD inválido. Insira um DDD válido no Brasil.');
  }

  // Validar o número de atividades extracurriculares (máximo de 3)
  if (atividade.length > 3) {
    return res.status(400).send('Você pode selecionar no máximo 3 atividades extracurriculares.');
  }

  // Se tudo estiver válido, retornar página de sucesso
  res.send('<h1>Sucesso</h1>');
});

module.exports = router;

