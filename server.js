const express = require('express');
const app = express();
const port = 4555
const Razorpay = require('razorpay');
const bodyParser = require('body-parser');

const razorpay = new Razorpay({
    key_id: 'rzp_test_d4FYg6aMhU82lt',
    key_secret: 'SCdgwAHb7BCCzsArpWjfjkmI'
});

app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.sendFile('index.html', { root: __dirname });
})

app.post('/payment', (req, res) => {
    const options = {
        amount: Number(req.body.amount) * 100,  // amount in paise
        currency: 'INR',
        receipt: 'receipt_order_123',
        payment_capture: 1
    };
    razorpay.orders.create(options, function (err, order) {
        res.json(order);
    });
});

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
