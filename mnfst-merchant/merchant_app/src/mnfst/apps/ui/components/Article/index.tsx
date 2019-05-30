import React from 'react';

interface IArticle {
  children?: React.ReactNode;
}

const Article: React.SFC<IArticle> = (props) => {
  const { children } = props;
  return (
    <article>
      {children}
    </article>
  );
};

export default Article;
