import { css } from 'styled-components'

import colors from './colors'

export function createColors() {
  const styles = Object.entries(colors)
    .reduce(
      (result, [prop, value]) => ([
        ...result,
        `--color-${prop.replace(/\./g,'-')}: ${value};`,
      ]),
      [],
    )
    .join('\n')
  return css`${styles}`
}

export { default as snippets } from './snippets'
