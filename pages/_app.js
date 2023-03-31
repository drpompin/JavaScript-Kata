import React from 'react'
import Context from '../context'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
        <Context>
            <Component {...pageProps} />
        </Context>
    )
}

export default MyApp
