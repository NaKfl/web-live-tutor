/* eslint-disable no-restricted-globals */
/* eslint-disable no-undef */
importScripts('https://www.gstatic.com/firebasejs/8.6.8/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.6.8/firebase-messaging.js');

var config = {
  apiKey: 'AIzaSyDRC-BO0CtlqU7-ZU9l0jQb2FcrIp_rpZc',
  authDomain: 'live-tutor-314307.firebaseapp.com',
  projectId: 'live-tutor-314307',
  storageBucket: 'live-tutor-314307.appspot.com',
  messagingSenderId: '602233168613',
  appId: '1:602233168613:web:aee4d782d7abe45a96aa0c',
  measurementId: 'G-79DQKX6NYL',
};

firebase.initializeApp(config);
const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(function (payload) {
  const notificationTitle = payload.data.title;
  const notificationOptions = {
    body: payload.data.body,
    icon: '/logo192.png',
  };

  return self.registration.showNotification(
    notificationTitle,
    notificationOptions,
  );
});

self.addEventListener('notificationclick', event => {
  console.log('event', event);
  event.notification.close();
  clients.openWindow('https://livetutor.live');
});
