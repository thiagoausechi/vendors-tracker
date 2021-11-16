import 'bootstrap/dist/css/bootstrap.css'
import '../styles/globals.css'

function MyApp({ Component, pageProps })
{
  console.log("Starting building ==================================================");
  console.log(pageProps);

  return <Component {...pageProps} />
}

export default MyApp
