//functionのインスタンスを生成
const functions = require('firebase-functions');
//サーバーにfirebase admin SDKを追加する
const admin = require('firebase-admin');
//クロスドメイン対策
const cors = require('cors')({ origin: true });
//stripeAPIを使用https://qiita.com/nerdyboy_cool/items/695c8af7ca8d22761927環境変数の設定
const stripe = require('stripe')(functions.config().stripe.secret_token);
//expressを使用
const express = require('express');
//admin アプリ インスタンスが初期化される
admin.initializeApp(functions.config().firebase);

//body-parser機能をexpressで
const app = express();
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

//stripeCharge関数
const stripeCharge = (request, response) => {
    // response.send(request.body);//送ってきたrequestをresponseとして返す
    // const amount = 1000;
    // const currency = 'jpy';
    // const description = 'Stripe ikuyo';
    const source = request.body.token.id;
    const shipping = {
        address: {
            line1: request.body.token.card.address_line1
        },
        name: request.body.token.card.name
    };
    const email = request.body.token.email

    const charge = {amount: 1000, currency: 'jpy', description: 'Stripe ikuyo', source, shipping};
 
    stripe.charges.create(charge)
    .then(res => {
        return send(response, 200, {message: 'success！'});
    })
    .catch(err => {
        return send(response, 500, {error: err.message});
    });
};

//send関数
function send(response, statusCode, body) {
    response.send({
      statusCode,
      data: JSON.stringify(body)
    });
}
 
app.post('/app', stripeCharge);


exports.app = functions.https.onRequest((request, response) => {
    cors(request, response, () => {//cors対応
        try {
            return stripeCharge(request, response);
        } catch(error) {
            // send(response, 500, { error: error.message });
            return console.log('failed.');
        }
    })
})


//https://stripe.com/docs/stripe-js/reference#the-elements-object stripe.JS
//https://stripe.com/docs/api/tokens/object stripeAPI