export const registerServiceWorker = async () => {
  if ('serviceWorker' in navigator) {
    try {
      const registration = await navigator.serviceWorker.register(
        'firebase-messaging-sw.js',
      );
      return registration.scope;
    } catch (error) {
      return error;
    }
  }
};
