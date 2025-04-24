# Stripe Press Bookstore

A simple yet complete online bookstore application built using Node.js and Express, seamlessly integrated with Stripe’s Payment Intents API and Elements to enable secure and intuitive online payments.

---

## 🛠 Features

- Displays a curated collection of three purchasable books
- Provides a smooth checkout experience using Stripe
- Confirms and displays payment status along with order summary

---

## 🚀 How to Build, Configure, and Run the Application

This demo is written in Javascript (Node.js) with the Express framework. 

To simplify this project, we're also not using any database here, either. Instead app.js includes a simple switch statement to read the GET params for item.

### 1. Clone the Repository and Install Dependencies
```bash
git clone https://github.com/yourname/stripe-bookstore.git
cd stripe-bookstore
npm install
```

### 2. Configure Stripe API Keys

You'll need to retrieve a set of testmode API keys from the Stripe dashboard (you can create a free test account here: https://dashboard.stripe.com/test/dashboard) to run this locally.

Create a `.env` file in the root directory and add your Stripe credentials:

```
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PUBLISHABLE_KEY=pk_test_...
```

### 3. Start the Application

```bash
npm start
```

The application will launch at: `http://localhost:3000`

---

## 📁 Project Structure

```
├── app.js               // Backend server with Stripe logic
├── views/               // Handlebars templates
│   ├── index.hbs        // Book listings
│   ├── checkout.hbs     // Payment page
│   ├── success.hbs      // Post-payment confirmation
│   └── layouts/
│       └── main.hbs     // Layout template
├── public/
│   └── css/
│       └── custom.css   // Styling
├── .env                 // Stripe configuration (not tracked in Git)
└── package.json         // App dependencies
```

---

## 🧪 Stripe Test Cards

To simulate payments during development, you may use:

- Card Number: `4242 4242 4242 4242`
- Expiry: any future date (e.g., 12/34)
- CVC: any 3 digits (e.g., 123)

- Card Number: `4000 0000 0000 9995` to simulate insufficient balance in the card;
- Card Number: `4000 0027 6000 3184` to trigger the 3D Secure process;
- Card Number: `4000 0000 0000 0069` tto simulate expired cards;

---

## ⚙️ How the Solution Works

This solution combines frontend and backend capabilities to provide a complete Stripe-integrated payment flow:

- **Frontend (checkout.hbs):**
  - Uses Stripe.js and Stripe Elements to render a secure, dynamic payment form
  - Submits the payment using the client secret tied to a PaymentIntent

- **Backend (app.js):**
  - Creates a `PaymentIntent` using the Stripe Node.js SDK
  - Returns the `client_secret` to the frontend
  - Renders a confirmation page after successful payment

### 🔌 Stripe APIs Used

- `stripe.paymentIntents.create()` — Initializes the payment and defines its amount, currency, metadata
- `stripe.confirmPayment()` — Called via Stripe.js to complete the payment securely from the browser

The architecture of the solution is included as a separate file.
---

## 🧠 My Approach and Challenges

Despite having no prior programming experience, I set out to complete this solution independently.

- **Initial Learning Curve:** I did not even know how to run code in VS Code. To overcome this, I scheduled a 1 houe Teams call with a friend (CS student at NUS) who guided me through VS Code basics.
- **Self-Learning:** I explored [Stripe Docs](https://docs.stripe.com)（https://docs.stripe.com/payments/elements）(https://docs.stripe.com/api/payment_intents/create), followed Architect tutorials on Stripe Training like Getting started with Stripe & Product Fundamentals, and used AI to help interpret errors and implement adjustments.
- **Outcome:** Within 4–5 hours, I built a fully functional Stripe-enabled application.

This journey was both challenging and incredibly rewarding.

---

## 🔮 Extending for Enterprise-Grade Use

To scale this project for high-traffic or enterprise-grade usage, I would:


### Advanced Stripe Features:
- Enable Adaptive Acceptance to improve authorization rates dynamically.
- Use Card Account Updater (CAU) and Network Tokens to automatically update expired cards and reduce transaction declines.
- Introduce Stripe Webhooks to handle asynchronous events such as failed payments, chargebacks, and refunds.

### High Concurrency and Performance:
- Optimize the backend for concurrent requests and large-scale traffic using load balancing and session management. Deploy using a cloud provider such as AWS, Azure, or Vercel.

### Security and Compliance:
- Implement HTTPS across all environments
- Follow PCI compliance guidelines strictly by continuing to offload sensitive data collection to Stripe Elements

### User Experience Enhancements:
- Add a login system and user dashboards for managing orders
- Offer multiple payment methods (e.g., Apple Pay, Google Pay, Link)

### Monitoring and Alerts:
- Set up monitoring tools (like Sentry, LogRocket, or Stripe Radar) to track transaction success rates and proactively detect anomalies.

### Others
- highlight 99.999% uptime for Stripe API. A live status of Stripe API can be found here: https://status.stripe.com/
- Highlight that Stripe can support more than 100 local payment method like Wechat Pay and Ali Pay.


Stripe’s robust and modular platform offers everything required to scale securely and flexibly.

---



## 👩‍💻 Author

- 👤 Queena Liu
- ✉️ lqw520007@gmail.com
