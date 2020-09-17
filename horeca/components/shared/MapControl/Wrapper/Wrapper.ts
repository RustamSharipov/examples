import styled from 'styled-components'

export default styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 2.5rem;
  height: 2.5rem;
  border: 2px solid var(--color-primary-light);
  border-radius: 4rem 4rem 1rem 4rem;
  cursor: pointer;
  transform: rotate(45deg);

  ::before {
    content: "";
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 1.25rem;
    height: 1.25rem;
    border: 2px solid var(--color-primary-light);
    border-radius: 1rem;
  }
`
