import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './registerServiceWorker';
import firebase from 'firebase/app'
import 'firebase/database'

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
  created() {
    firebase.initializeApp({
        apiKey: "AIzaSyCy6h4DXM96T8LGHsojQiOh9i3q80Hl0zE",
        authDomain: "task-project1.firebaseapp.com",
        databaseURL: "https://task-project1.firebaseio.com",
        projectId: "task-project1",
        storageBucket: "",
        messagingSenderId: "418760470681",
        appId: "1:418760470681:web:d37653634054c85e"
    })
  }
}).$mount('#app');


