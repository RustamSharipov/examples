import { Footer, Info, DetailedInfo, Main, Photos, Wrapper } from '.'

const Home = () =>
  <Wrapper>
    <Main>
      <Photos />
      <Info />
      <Footer />
    </Main>

    <DetailedInfo />
  </Wrapper>

export default Home
