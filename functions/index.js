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
// データベースの参照を作成
var firestore = admin.firestore()
//body-parser機能をexpressで
const app = express();
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

//stripeCharge関数
const stripeCharge = (request, response) => {
    // response.send(request.body);//送ってきたrequestをresponseとして返す
    // const currency = 'jpy';
    // const description = 'Stripe ikuyo';
    console.log(request.body);
    // const { amount } = request.body.token;
    const source = request.body.token.id;
    const shipping = {
        address: {
            line1: request.body.token.card.address_line1
        },
        name: request.body.token.card.name,
        phone:request.body.token.card.address_city
    };
    const receipt_email = request.body.token.card.address_line2;

    const charge = {amount: request.body.amount, currency: 'jpy', description: 'ikuyo', source, shipping,receipt_email,metadata:request.body.description};
 
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

// exports.stock = functions.https.onRequest((request, response) => {
//     const stockvalue = firestore.collection('items').where("groupID", "==", "01");
//     stockvalue.get()
//         .then(function (querySnapshot) {
//             return querySnapshot.forEach(function (doc) {
//                 return response.send('success');
//             });
//         })
//         .catch(error => {
//             return response.send(error)
//         })
// })


// exports.stock = functions.https.onRequest((request, response) => {
//     return firestore.collection('items').where('groupID', '==', '03').get()
//         .then(querySnapshot => {
//             return querySnapshot.forEach(queryDocSnapshot => {
//                 return queryDocSnapshot.data().set({ "stock": false }, { merge: true })
//                     .then(res => {
//                         return response.send('success')
//                     })
//             })
//                 .catch(error => {
//                     return response.send('faileda.');
//                 });
//         })
// })

exports.stock = functions.https.onRequest((request, response) => {
    firestore.collection('items').doc('k3hijHibtRXBnyj1laFX').set({ "stock": false }, { merge: true })
    .then(res => {
        return response.send('success');
    })
    .catch(error => {
        return response.send('failed!');
    });
})



//https://stripe.com/docs/stripe-js/reference#the-elements-object stripe.JS
//https://stripe.com/docs/api/tokens/object stripeAPI