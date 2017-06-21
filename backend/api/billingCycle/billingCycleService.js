const BillingCycle = require('./billingCycle');

// interface diretamente com o mongodb
// é necessário expor essas chamadas nas rotas do express
BillingCycle.methods(['get', 'post', 'put', 'delete']);
BillingCycle.updateOptions({new: true});

module.exports = BillingCycle