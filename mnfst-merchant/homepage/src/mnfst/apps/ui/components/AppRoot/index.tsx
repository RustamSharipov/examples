import React from 'react';
import './style.css';

interface IAppRootProps {
  children: React.ReactNode;
}

const AppRoot: React.SFC<IAppRootProps> = (props) => {
  const { children } = props;

  return (
    <React.Fragment>
      {children}
    </React.Fragment>
  );
};

export default AppRoot;
