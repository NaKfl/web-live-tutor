import { useEffect } from 'react';
import { withRouter } from 'react-router-dom';

function ScrollToTop({ history }) {
  useEffect(() => {
    const unListen = history.listen(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    return () => {
      unListen();
    };
  }, [history]);

  return null;
}

export default withRouter(ScrollToTop);
