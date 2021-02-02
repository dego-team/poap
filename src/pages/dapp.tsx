import { useCallback, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'
import { Button } from '../components/Button'
import Popup from '../components/Popup'
import Spinner from '../components/Spinner'

import { getUrlParams } from '../utils'
import axios from 'axios'
import { requestUrl } from '../constants'

import binance_logo from '../assets/binance-vertical.png'
import limited_nft from '../assets/limited-nft.png'

import { useActiveWeb3React, injected } from '../hooks'

export default function Receipt() {
  const { account, activate } = useActiveWeb3React()
  const history = useHistory()
  const locationSearch = history.location.search

  const urlParams = getUrlParams(locationSearch)

  const pathName = history.location.pathname

  const qrcode = pathName.replace('/dapp/', '')

  const { uuid, channel, sign } = urlParams

  const [token, setToken] = useState('')
  const [popupState, setPopupState] = useState({ show: false, content: '' })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const getToken = () => {
      axios
        .get(`${requestUrl}/dapp/${qrcode}?uuid=${uuid}&channel=${channel}&sign=${sign}`)
        .then(({ data, status }) => {
          if (status === 200 && data.code === 0) setToken(data.data.token)
        })
    }
    if (uuid && channel && sign && qrcode) {
      getToken()
    }
  }, [uuid, channel, sign, qrcode])

  const connectWallet = useCallback(() => {
    try {
      activate(injected, undefined, true)
    } catch (error) {
      throw new Error(error)
    }
  }, [activate])

  const onReceive = useCallback(() => {
    if (!token) return
    setLoading(true)
    const params = { address: account, token }
    axios
      .post(`${requestUrl}/receive`, params)
      .then(({ data, status }) => {
        if (status === 200 && data.code === 0) {
          setLoading(false)
          history.push(`/detail/${data.data.token_id}`)
        } else {
          setPopupState({ show: true, content: data.message })
        }
      })
      .finally(() => {
        setLoading(false)
      })
  }, [account, token, history, setPopupState])
  return (
    <Wrapper>
      <BinanceLogo src={binance_logo} alt={binance_logo} />
      <LimitedNFTLogo src={limited_nft} alt={limited_nft} />
      <NFTText>Binance Blockchain Week 2021 NFT (Limited)</NFTText>
      {!account ? (
        <ReceiveButton onClick={connectWallet}>Connect Wallet</ReceiveButton>
      ) : (
        <ReceiveButton onClick={onReceive}>Receive</ReceiveButton>
      )}

      <Popup
        show={popupState.show}
        content={popupState.content}
        onClose={() => setPopupState({ show: false, content: '' })}
        delay={1500}
      />
      {loading && <Spinner />}
    </Wrapper>
  )
}

const Wrapper = styled.div``

const BinanceLogo = styled.img`
  display: block;
  width: 9.88rem;
  height: 6.81rem;
  margin: 3rem auto 0;
`

const LimitedNFTLogo = styled.img`
  display: block;
  width: 11.44rem;
  height: 9.88rem;
  margin: 3.56rem auto 0;
`
const NFTText = styled.p`
  margin: 1.06rem auto 0;
  width: 14.8rem;
  height: 3.75rem;
  font-size: 0.88rem;
  color: #b1b1b1;
  line-height: 1.25rem;
  text-align: center;
`
const ReceiveButton = styled(Button)`
  margin-top: 3.63rem;
`
