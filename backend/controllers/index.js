const dbControllers = require('./dbControllers');

function getTest(req, res) {
  res.status(200).send('Hello World!');
}

function postBusinessInfo(req, res) {
  const { body : { name, address } } = req;
  console.log('name ', name);
  console.log('address ', address);
  res.status(200).send('Hello Test!');
}

const controllers = {
  getTest,
  postBusinessInfo,
  dbControllers,
};

module.exports = controllers;
