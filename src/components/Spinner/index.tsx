import styled, { keyframes } from 'styled-components'

export default function Spinner() {
  return (
    <Wrapper>
      <SpinnerSpan />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  color: #fff;
`

const spinnerBorder = keyframes`
  to {
    transform: rotate(1turn)
  }
`

const SpinnerSpan = styled.div`
  width: 2rem;
  height: 2rem;
  border-width: 0.4rem;
  vertical-align: text-bottom;
  border: 0.5rem solid;
  border-right: 0.5rem solid transparent;
  border-radius: 50%;
  animation: ${spinnerBorder} 0.75s linear infinite;
`
