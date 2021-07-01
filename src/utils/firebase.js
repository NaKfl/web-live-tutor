import firebase from 'firebase/app';
import 'firebase/messaging';
import { registerToken } from 'fetchers/notificationFetcher';
import { notifySuccess } from 'utils/notify';

var config = {
  apiKey: 'AIzaSyDRC-BO0CtlqU7-ZU9l0jQb2FcrIp_rpZc',
  authDomain: 'live-tutor-314307.firebaseapp.com',
  projectId: 'live-tutor-314307',
  storageBucket: 'live-tutor-314307.appspot.com',
  messagingSenderId: '602233168613',
  appId: '1:602233168613:web:aee4d782d7abe45a96aa0c',
  measurementId: 'G-79DQKX6NYL',
};

if (!firebase.apps.length) {
  firebase.initializeApp(config);
} else {
  firebase.app();
}

const messaging = firebase.messaging();

messaging.onMessage(payload => {
  const { title, body } = payload.data;
  notifySuccess(title, body);
});

export const requestFirebaseNotificationPermission = async () => {
  if (Notification.permission === 'granted') {
    const token = await messaging.getToken();
    return registerToken(token);
  }
  if (Notification.permission === 'denied') {
    const permission = await Notification.requestPermission();
    if (permission === 'granted') {
      const token = await messaging.getToken();
      return registerToken(token);
    }
  }
};
