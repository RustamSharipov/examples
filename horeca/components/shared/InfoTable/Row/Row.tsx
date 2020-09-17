import { FC, ReactNode, useState } from 'react'

import { Title, Content, Wrapper } from '.'

interface IProps {
  children?: ReactNode
  icon?: ReactNode
  title: string
}

const Row: FC<IProps> = ({ children, icon, title }) => {
  const isExpandable = !!children
  const [isExpanded, setExpanded] = useState(false)

  const handleToggle = () => {
    if (children) {
      setExpanded(!isExpanded)
    }
  }

  return (
    <Wrapper isExpandable={isExpandable}>
      <Title
        icon={icon}
        isExpandable={isExpandable}
        isExpanded={isExpanded}
        onClick={handleToggle}
      >
        {title}
      </Title>

      {children &&
        <Content
          isExpanded={isExpanded}
          onClick={handleToggle}
        >
          {children}
        </Content>
      }
    </Wrapper>
  )
}

export default Row
