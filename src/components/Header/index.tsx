import styled from 'styled-components'

import treasureland_logo from '../../assets/logo.svg'
import treasureland_text from '../../assets/logo_text.svg'

export default function Header() {
  return (
    <Wrapper>
      <LogoWrap>
        <Logo src={treasureland_logo} alt={treasureland_logo} />
        <LogoText src={treasureland_text} alt={treasureland_text} />
      </LogoWrap>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: 100%;
  height: 2.5rem;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
`

const LogoWrap = styled.div`
  display: flex;
  justify-self: flex-start;
  align-items: center;
`
const Logo = styled.img`
  height: 1.84rem;
  object-fit: cover;
`
const LogoText = styled.img`
  margin-left: 0.38rem;
  height: 0.75rem;
`
