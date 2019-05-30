import React from 'react';
import AppContent from 'apps/ui/components/AppContent';

interface IContent {
  children: React.ReactNode;
}

const Content: React.SFC<IContent> = (props) => {
  const { children } = props;

  return (
    <AppContent className="spec-app-content">
      {children}
    </AppContent>
  );
};

export default Content;
