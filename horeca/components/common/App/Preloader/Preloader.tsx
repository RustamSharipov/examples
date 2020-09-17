import { inject, observer } from 'mobx-react'

import { Animation, Wrapper } from '.'

import { ConnectedComponent } from 'types'

const Preloader: ConnectedComponent = ({ rootState }) => {
  const { isPreloaderDisplay } = rootState

  return (
    <Wrapper isDisplay={isPreloaderDisplay}>
      <Animation />
    </Wrapper>
  )
}

export default inject('rootState')(observer(Preloader))
