// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import * as firebase from 'firebase/app'


Vue.config.productionTip = false

// Import the functions you need from the SDKs you need
//import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyBBdEb324AktMnZIZbLdI5WlJkz-vrUYFA",
//   authDomain: "vue-locator-dashboard.firebaseapp.com",
//   projectId: "vue-locator-dashboard",
//   storageBucket: "vue-locator-dashboard.appspot.com",
//   messagingSenderId: "783702401315",
//   appId: "1:783702401315:web:26d9570adc0e585d852c96",
//   measurementId: "G-60RDHMPYGK"
// };

// Initialize Firebase
//const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);




// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyBBdEb324AktMnZIZbLdI5WlJkz-vrUYFA",
  authDomain: "vue-locator-dashboard.firebaseapp.com",
  projectId: "vue-locator-dashboard",
  storageBucket: "vue-locator-dashboard.appspot.com",
  messagingSenderId: "783702401315",
  appId: "1:783702401315:web:26d9570adc0e585d852c96",
  measurementId: "G-60RDHMPYGK"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  template: '<App/>'
})
