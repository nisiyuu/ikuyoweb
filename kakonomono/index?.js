'use strict';

const functions = require('firebase-functions');
//firebasefunctionを使うためのSDK


// Set your secret key: remember to change this to your live secret key in production
// See your keys here: https://dashboard.stripe.com/account/apikeys
const stripe = require('stripe')('pk_test_5gyOP7rzmNXPmgwShLtUnGV600YIHFo8fP');


// Token is created using Checkout or Elements!
// Get the payment token ID submitted by the form:
// const token = request.body.stripeToken; // Using Express

const charge = null;


doPay();

async function doPay() {
  await pay();
  console.log(charge);
}

async function pay(){
  charge = await stripe.charges.create({
    amount: 999,
    currency: 'usd',
    source: 'tok_visa',
    receipt_email: 'jenny.rosen@example.com',
  });
  charge();
}


console.log('charge ===>', charge);

exports.hello = functions.https.onRequest((request, response) => {
  response.status(200).send("Hello World")
})