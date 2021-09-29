const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

module.exports = (req, res) => {
    const { price, token } = req.body;

    return stripe.customers
      .create({
        email: token.email,
        source: token.id
      })
      .then(customer => {
        stripe.charges.create(
          {
            amount: parseInt(price) * 100,
            currency: "usd",
            customer: customer.id,
            receipt_email: token.email,
            description: `Order Placed Successfully`
          }
        );
      })
      .then(result => {
        res.status(200).json(result)
      })
      .catch(err => console.log(err));
}
