import { useRouter } from 'next/router'

import { Content, Footer, Wrapper } from '.'

const PlaceView = () => {  
  const router = useRouter()
  const { id } = router.query

  if (!id) return null

  return (
    <Wrapper>
      <Content />
      <Footer />
    </Wrapper>
  )
}

export default PlaceView
