import { Suspense } from 'react'
import { Route, BrowserRouter } from 'react-router-dom'
import styled from 'styled-components'
import Web3ReactManager from '../components/Web3ReactManager'
import Header from '../components/Header'

import Receipt from './dapp'
import Detail from './Detail'

export default function App() {
  return (
    <Suspense fallback={null}>
      <AppWrapper>
        <Header />
        <BodyWrapper>
          <Web3ReactManager>
            <BrowserRouter>
              <Route exact strict path="/dapp/:qrcode" component={Receipt} />
              <Route exact strict path="/detail/:tokenId" component={Detail} />
            </BrowserRouter>
          </Web3ReactManager>
        </BodyWrapper>
      </AppWrapper>
    </Suspense>
  )
}

const AppWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-flow: column;
  align-items: flex-start;
  overflow-x: hidden;
`
const BodyWrapper = styled.div`
  width: 100%;
  background: linear-gradient(180deg, #1c2b39 0%, #0b0e11 100%);
  min-height: calc(100vh - 2.5rem);
`
