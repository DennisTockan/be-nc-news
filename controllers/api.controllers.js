const apiEndpoints = require('../endpoints.json')

exports.getAllApiEndpoints = (req, res) => {
res.status(200).send(apiEndpoints);
console.log
}

