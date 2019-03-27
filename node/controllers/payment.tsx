const stripe = require('stripe')('sk_test_RPteUCZuJsV8NV8NgoYQDeuD00CeHJQgu8');

exports.stripPayment = (req, res, next) => {

    const customer =  stripe.customers.create({
        email: req.body.email
    });
    console.log(req.body.email);
    stripe.customers.create({
        email: req.body.email,
        description:"USTX"
    }).then((customer) => {
        return stripe.customers.createSource(customer.id, {
            source: 'tok_visa'
        });
    }).then((source) => {
        return stripe.charges.create({
            amount: req.body.amount,
            currency: 'usd',
            description:'Get Money From Users USTX',


            customer: source.customer
        });

    }
    ).then((charge) => {
        return res.status(200).json({
            message: "success",
            charge:charge,
            customer:customer


        });
    }).catch((err) => {
        // Deal with an error
    });
}