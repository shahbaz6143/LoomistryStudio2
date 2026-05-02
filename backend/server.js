require('dotenv').config();
const express = require('express');
const cors = require('cors');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const { getProductById } = require('./products');

const app = express();

// Middleware
app.use(cors({ origin: process.env.FRONTEND_URL || 'http://localhost:5173' }));
app.use(express.json());

// Routes
app.post('/api/create-checkout-session', async (req, res) => {
  try {
    const { items } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ error: 'Cart is empty' });
    }

    // Map frontend items to Stripe line_items securely
    const line_items = items.map((item) => {
      // SECURE: Always look up the price from the backend database using the item ID!
      // Never trust the price sent from the frontend.
      const dbProduct = getProductById(item.id);
      
      if (!dbProduct) {
        throw new Error(`Product ${item.id} not found`);
      }

      return {
        price_data: {
          currency: 'usd', // Change to 'inr' for domestic India payments
          product_data: {
            name: `${dbProduct.name} (Size: ${item.size})`,
          },
          // Stripe expects the amount in the smallest currency unit (cents for USD, paise for INR)
          unit_amount: dbProduct.price * 100, 
        },
        quantity: item.quantity,
      };
    });

    // Create Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items,
      mode: 'payment',
      success_url: `${process.env.FRONTEND_URL}/success`,
      cancel_url: `${process.env.FRONTEND_URL}/cart`, // Or wherever they should go back to
    });

    res.json({ url: session.url });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    res.status(500).json({ error: 'Failed to create checkout session' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
