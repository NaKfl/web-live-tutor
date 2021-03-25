import { useState, useEffect } from 'react';
const useJitsi = props => {
  const {
    domain = 'meet.jit.si',
    parentNode,
    subject,
    password,
    displayName,
    onMeetingEnd,
    ...options
  } = props;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [jitsi, setJitsi] = useState(null);

  useEffect(() => {
    if (!window.JitsiMeetExternalAPI) {
      setError(
        'JitsiMeetExternalAPI is not available, check if https://meet.jit.si/external_api.js was loaded',
      );
      return;
    }

    options.parentNode = document.getElementById(parentNode);
    if (!options.parentNode) {
      setError(
        `Parent node is not available, check container have the correct id: "${parentNode}"`,
      );
      return;
    }

    const client = new window.JitsiMeetExternalAPI(domain, { ...options });
    setJitsi(client);
    setLoading(false);
    setError(null);

    subject && client.executeCommand('subject', subject);

    client.addEventListener('videoConferenceJoined', () => {
      password && client.executeCommand('password', password);
      setInterval(function () {
        displayName && client.executeCommand('displayName', displayName);
      }, 1000);
    });

    client.addEventListener('participantJoined', () => {
      setInterval(function () {
        displayName && client.executeCommand('displayName', displayName);
      }, 1000);
    });

    client.addEventListener('passwordRequired', () => {
      password && client.executeCommand('password', password);
    });
    onMeetingEnd && client.addEventListener('readyToClose', onMeetingEnd);

    return () => jitsi && jitsi.dispose();
  }, [window.JitsiMeetExternalAPI]);

  return { jitsi, error, loading };
};

export default useJitsi;
