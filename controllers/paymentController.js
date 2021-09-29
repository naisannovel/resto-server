const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

module.exports = (req, res) => {
    const { service, token } = req.body;
  
    return stripe.customers
      .create({
        email: token.email,
        source: token.id
      })
      .then(customer => {
        stripe.charges.create(
          {
            amount: service.price * 100,
            currency: "usd",
            customer: customer.id,
            receipt_email: token.email,
            description: `purchase of ${service.name}`
          }
        );
      })
      .then(result => res.status(200).json(result))
      .catch(err => console.log(err));
  }