import React from 'react';
import { Query } from 'react-apollo';
import { QUERY_GET_USER_REPOSITORIES } from 'apps/repo/gql';
import { PageSectionContent } from 'apps/base/components/PageSection';
import { RepoList, RepoListItem } from 'apps/repo/components/RepoList';

interface IGitHubUserReposProps {
  userLogin: string | null;
}

export default (props: IGitHubUserReposProps) => {
  const { userLogin } = props;

  return (
    <PageSectionContent>
      <Query
        query={QUERY_GET_USER_REPOSITORIES}
        variables={{ userLogin }}>
        {({ loading, error, data }) => {
          if (loading) {
            return (
              <div>
                Fetching {userLogin} repositories...
              </div>
            );
          }

          if (error) {
            return (
              <div>
                Something went wrong! Please try later
              </div>
            );
          }

          if (data.user && data.user.repositories) {
            return (
              <RepoList>
                {data.user.repositories.nodes.map(({ id, name, stargazers, watchers }) => (
                  <RepoListItem
                    key={id}
                    link={`/${userLogin}/${name}`}
                    name={name}
                    starsCount={stargazers.totalCount}
                    watchCount={watchers.totalCount}>
                    {name}
                  </RepoListItem>
                ))}
              </RepoList>
            );
          }

          return (
            <div>
              Query is empty
            </div>
          );
        }}
      </Query>
    </PageSectionContent>
  );
};
