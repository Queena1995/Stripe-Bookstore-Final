const express = require('express');
const path = require('path');
const { engine } = require('express-handlebars');
require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const app = express();

app.engine('hbs', engine({
  defaultLayout: 'main',
  extname: '.hbs'
}));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', function(req, res) {
  res.render('index', {
    STRIPE_PUBLISHABLE_KEY: process.env.STRIPE_PUBLISHABLE_KEY
  });
});

app.get('/checkout', function(req, res) {
  const item = req.query.item;
  let title, amount, error;

  switch (item) {
    case '1':
      title = "The Art of Doing Science and Engineering";
      amount = 2300;
      break;
    case '2':
      title = "The Making of Prince of Persia: Journals 1985-1993";
      amount = 2500;
      break;
    case '3':
      title = "Working in Public: The Making and Maintenance of Open Source";
      amount = 2800;
      break;
    default:
      error = "No item selected";
  }

  res.render('checkout', {
    title,
    amount,
    error,
    STRIPE_PUBLISHABLE_KEY: process.env.STRIPE_PUBLISHABLE_KEY
  });
});

app.post('/create-payment-intent', async (req, res) => {
  const { amount, email, title } = req.body;

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'usd',
      receipt_email: email,
      automatic_payment_methods: { enabled: true },
      metadata: { title },
    });

    // ✅ 只发送一次响应
    res.send({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



app.get('/success', function(req, res) {
  const { title, amount, payment_intent } = req.query;
  res.render('success', {
    title,
    amount,
    amount_display: (amount / 100).toFixed(2),
    payment_intent
  });  
});


app.listen(3000, () => {
  console.log('Getting served on port 3000');
});