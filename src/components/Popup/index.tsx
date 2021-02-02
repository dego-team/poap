import { useEffect } from 'react'
import styled from 'styled-components'

export default function Popup({
  show,
  content,
  delay,
  onClose,
}: {
  show: boolean
  content: string
  delay: number
  onClose: () => void
}) {
  useEffect(() => {
    if (show) {
      setTimeout(onClose, delay)
    }
  }, [show, delay, onClose])

  return show ? (
    <MaskWrapper>
      <Content>{content}</Content>
    </MaskWrapper>
  ) : null
}

const MaskWrapper = styled.div`
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
`
const Content = styled.div`
  background: rgba(0, 0, 0, 0.5);
  padding: 0.5rem;
  color: #fff;
  font-size: 0.88rem;
`
