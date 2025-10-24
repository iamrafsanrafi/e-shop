require("dotenv").config();
const express = require("express");
const cors = require("cors");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const app = express();
const port = process.env.PORT || 4242;

// Middleware
app.use(express.json());
app.use(cors());

// Create checkout session
app.post("/create-checkout-session", async (req, res) => {
    try {
        const { products } = req.body;

        const lineItems = products.map(product => ({
            price_data: {
                currency: "usd",
                product_data: {
                    name: product.title,
                    images: [product.images[0]],
                },
                unit_amount: Math.round(product.price * 100),
            },
            quantity: product.quantity,
        }));

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: lineItems,
            mode: "payment",
            success_url: "https://eshop-global.vercel.app/success",
            cancel_url: "https://eshop-global.vercel.app/cancel",
        });

        console.log("SESSION:", session);

        res.json({ id: session.id });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get("/", (req, res) => {
    res.send("HELLO");
})

// Start server
app.listen(port, () => console.log(`Server running on port ${port}`));