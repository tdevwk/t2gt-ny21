const functions = require("firebase-functions");

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
const express = require('express');
const engines = require('consolidate');
var hbs = require('handlebars');
const admin = require('firebase-admin');

const app = express();
app.engine('hbs',engines.handlebars);
app.set('views','./views');
app.set('view engine','hbs');

//var serviceAccount = require("./techtalkny-6c3c6-firebase-adminsdk-y5fc0-cd8f0a959b.json");
// admin.initializeApp({
// credential: admin.credential.cert(serviceAccount),
// databaseURL: "https://myfirebaseproject-bx54dasx3.firebaseio.com"
// });

admin.initializeApp(functions.config().firebase);


async function getFirestore(){
const firestore_con  = await admin.firestore();
const writeResult = firestore_con.collection('sample').doc('sample_doc').get().then(doc => {
if (!doc.exists) { console.log('No such document!'); }
else {return doc.data();}})
.catch(err => { console.log('Error getting document', err);});
return writeResult
}

app.get('/',async (request,response) =>{
var db_result = await getFirestore();
response.render('index',{db_result});
});
exports.app = functions.https.onRequest(app);


// async function insertFormData(request){
// const writeResult = await admin.firestore().collection('form_data').add({
// firstname: request.body.firstname,
// lastname: request.body.lastname
// })
// .then(function() {console.log("Document successfully written!");})
// .catch(function(error) {console.error("Error writing document: ", error);});
// }
//
// app.post('/insert_data',async (request,response) =>{
// var insert = await insertFormData(request);
// response.sendStatus(200);
// });
