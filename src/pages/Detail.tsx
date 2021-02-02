import { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'
import { Button } from '../components/Button'
import axios from 'axios'
import dictionary from '../constants/dictionary.json'

import { gegoV2Api } from '../constants'
import { balanceFormat } from '../utils'

import binance from '../assets/binance.png'
import dego from '../assets/dego.png'

export default function Detail() {
  const history = useHistory()
  const pathname = history.location.pathname

  const tokenId = pathname.replace('/detail/', '')

  const [detailInfo, setDetailInfo] = useState<any>({})

  const amount = balanceFormat(detailInfo?.attributes?.amount, 18, 2)
  const nftName = dictionary[detailInfo.name]?.en || detailInfo.name
  const nftDesc = dictionary[detailInfo.description]?.en || detailInfo.description
  const nftImage = detailInfo?.small_image

  useEffect(() => {
    let timer: any = null
    const getNFT = () => {
      clearTimeout(timer)
      axios
        .get(`${gegoV2Api}/${tokenId}`)
        .then(({ data, status }) => {
          if (status === 200 && data.status === 10000) setDetailInfo(data.result.data)
          else timer = setTimeout(getNFT, 3000)
        })
        .catch((error: Error) => {
          console.log('error', error)
        })
    }

    if (tokenId) {
      getNFT()
    }
  }, [tokenId])

  function onClickDego() {
    window.location.href = 'https://bsc.dego.finance/'
  }
  function onClickTrade() {
    window.location.href = 'https://www.treasureland.market/#/in-wallet?version=2&page=1'
  }

  return (
    <Wrapper>
      <NFTImg imgUrl={nftImage} />
      <NFTName>{nftName} (Limited) </NFTName>
      <Description>{nftDesc}</Description>
      <RevealCode>Reveal Code：{tokenId}</RevealCode>
      <DegoValue>Value: {amount} DEGO</DegoValue>
      <TradeButton onClick={onClickTrade}>Trade</TradeButton>
      <WhatIsDego onClick={onClickDego}>What is Dego ?</WhatIsDego>
      <LogoRow>
        <BinanceLogo src={binance} alt={binance} />
        &nbsp;
        {'&'}&nbsp;
        <DegoLogo src={dego} alt={dego} />
      </LogoRow>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  text-align: center;
`

const NFTImg = styled.div<{ imgUrl: string }>`
  background: url(${({ imgUrl }) => imgUrl}) no-repeat center center;
  background-size: contain;
  margin: 2.31rem auto 0;
  width: 9.13rem;
  height: 12.88rem;
`
const NFTName = styled.div`
  margin: 1.06rem auto 0;
  width: 14.69rem;
  height: 2.5rem;
  font-size: 0.88rem;
  color: #b1b1b1;
  line-height: 1.25rem;
`
const Description = styled.div`
  width: 22rem;
  margin: 1.06rem auto 0;
  text-align: left;
  font-size: 0.63rem;
  color: #b1b1b1;
  line-height: 0.88rem;
`
const RevealCode = styled.div`
  margin: 1.3rem auto 0;
  font-size: 0.88rem;
  color: #6c5aff;
`
const DegoValue = styled.div`
  margin: 0.25rem auto 0;
  font-size: 1.5rem;
  color: #fec214;
  line-height: 2.09rem;
`
const TradeButton = styled(Button)`
  margin-top: 1.03rem;
`
const WhatIsDego = styled.a`
  display: block;
  width: 8rem;
  margin: 2.63rem auto 0;
  color: #b1b1b1;
  font-size: 0.88rem;
  text-decoration: underline;
  cursor: pointer;
`
const LogoRow = styled.div`
  margin: 1rem auto 0;
  height: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #b1b1b1;
`

const BinanceLogo = styled.img`
  height: 1rem;
  object-fit: contain;
`
const DegoLogo = styled.img`
  height: 0.8rem;
  object-fit: contain;
`
