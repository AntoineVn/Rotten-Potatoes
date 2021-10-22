import "../styles/globals.css";
import Router from 'next/router';
import NProgress from 'nprogress'; //nprogress module
import 'nprogress/nprogress.css'; //styles of nprogress//Binding events. 
Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

import UseUserContext from './context/users'

function MyApp({ Component, pageProps }) {
  return (

    <Component {...pageProps} />


  );
}

export default MyApp;
