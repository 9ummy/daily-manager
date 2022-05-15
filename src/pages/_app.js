import { ConnectedRouter } from 'connected-next-router';
import { wrapper } from 'store/store';
import 'styles/globals.css';
import 'bootstrap/dist/css/bootstrap.css';

function MyApp({ Component, pageProps }) {
  return (
    <ConnectedRouter>
      <Component {...pageProps} />
    </ConnectedRouter>
  );
}

export default wrapper.withRedux(MyApp);
