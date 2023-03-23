<<<<<<< HEAD
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default MyApp
=======
import '../styles/globals.css';
import { MantineProvider } from '@mantine/core';

export default function App({ Component, pageProps }) {
  return (
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{
        colorScheme: "dark"
      }}
    >
      <Component {...pageProps} />
    </MantineProvider>
  )
}
>>>>>>> b7f7eab77916d404e57b3ceb609ff6e9af3a733e
