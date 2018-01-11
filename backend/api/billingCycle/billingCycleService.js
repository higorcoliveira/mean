const _ = require('lodash');
const BillingCycle = require('./billingCycle');

// interface diretamente com o mongodb
// é necessário expor essas chamadas nas rotas do express
BillingCycle.methods(['get', 'post', 'put', 'delete']);
BillingCycle.updateOptions({new: true, runValidators: true});

// interceptor de resposta
BillingCycle.after('post', sendErrorsOrNext)
            .after('put', sendErrorsOrNext)
            .after('delete', sendErrorsOrNext);

function sendErrorsOrNext(req, res, next) {
    // pegar os erros do node-restful
    const bundle = res.locals.bundle;

    if (bundle.errors) {
        var errors = parseErrors(bundle.errors);
        res.status(500).json({errors});
    } else {
        next();
    }
}

function parseErrors(nodeRestfulErrors) {
    const errors = [];

    _.forIn(nodeRestfulErrors, error => errors.push(error.message));

    return errors;
}

BillingCycle.route('count', function(req, res, next) {
    BillingCycle.count(function(error, value) {
        if (error) {
            res.status(500).json({errors: [error]});
        } else {
            res.json({value});
        }
    })
})

module.exports = BillingCycle
