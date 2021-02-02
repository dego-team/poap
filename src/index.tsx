import React from 'react'
import ReactDOM from 'react-dom'
import { createWeb3ReactRoot, Web3ReactProvider } from '@web3-react/core'
// import './reset.less'

import { FixedGlobalStyle } from './theme'
import App from './pages/App'
import reportWebVitals from './reportWebVitals'

import getLibrary from './utils/getLibrary'

const Web3ProviderNetwork = createWeb3ReactRoot('NETWORK')

if ('ethereum' in window) {
  ;(window.ethereum as any).autoRefreshOnNetworkChange = false
}

ReactDOM.render(
  <>
    <FixedGlobalStyle />
    <Web3ReactProvider getLibrary={getLibrary}>
      <Web3ProviderNetwork getLibrary={getLibrary}>
        <App />
      </Web3ProviderNetwork>
    </Web3ReactProvider>
  </>,
  document.getElementById('root')
)

reportWebVitals()
