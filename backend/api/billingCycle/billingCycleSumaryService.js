//feito diretamente com o mongo, sem intermedio do mongoose
const _ = require('lodash');
const BillingCycle = require('./billingCycle');

function getSummary(req, res) {
    BillingCycle.aggregate({
        $project: {credit: {$sum: "$credits.value"}, debt: {$sum: "$debts.value"}}
        }, {
        $group: {_id: null, credit: {$sum: "$credit"}, debt: {$sum: "$debt"}}
        }, {
        $project: {_id: 0, credit: 1, debt: 1}
        }, function(error, result) {
            if (error) {
                res.status(500).json({errors: [error]});
            } else {
                // se não houver resultado retorna 0 em credito e debito
                res.json(_.defaults(result[0], {credit: 0, debt: 0}));
            }
        })
}

module.exports = { getSummary }