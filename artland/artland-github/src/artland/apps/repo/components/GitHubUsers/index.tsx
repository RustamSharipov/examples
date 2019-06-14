import React from 'react';
import { Query } from 'react-apollo';
import { UserList, UserListItem } from 'apps/repo/components/UserList';
import { QUERY_SEARCH_USERS } from 'apps/repo/gql';
import { PageSectionContent } from 'apps/base/components/PageSection';

interface IGitHubUsersProps {
  onUserListItemClick: ({ userLogin: string }) => void;
  queryString: string;
  userLogin: string | null;
}

export default (props: IGitHubUsersProps) => {
  const { onUserListItemClick, queryString, userLogin } = props;

  return (
    <Query
      query={QUERY_SEARCH_USERS}
      variables={{ queryString }}>
      {({ loading, error, data }) => {
        if (loading) {
          return (
            <PageSectionContent>
              Fetching...
            </PageSectionContent>
          );
        }

        if (error) {
          return (
            <PageSectionContent>
              Error
            </PageSectionContent>
          );
        }

        if (data.search && data.search.edges) {
          return (
            <UserList>
              {data.search.edges.map(({ node: { id, avatarUrl, login, name, repositories, starredRepositories } }) => (
                <UserListItem
                  key={id}
                  avatarUrl={avatarUrl}
                  isActive={login === userLogin}
                  onClick={() => onUserListItemClick && onUserListItemClick({ userLogin: login })}
                  reposCount={repositories.totalCount}
                  starsCount={starredRepositories.totalCount}
                  userName={name} />
              ))}
            </UserList>
          );
        }

        return (
          <div>
            Query is empty
          </div>
        );
      }}
    </Query>
  );
};
