import React from 'react';
import { PageSectionContent } from 'apps/base/components/PageSection';
import Spinner from 'apps/base/components/Spinner';
import { UserList, UserListItem } from 'apps/repo/components/UserList';
import client from 'artland/client';
import { QUERY_SEARCH_USERS } from 'apps/repo/gql';
import { uuid } from 'apps/base/utils/text';

interface IPageInfo {
  endCursor: string | null;
  hasNextPage: boolean;
}

interface IGithubUser {
  id: string;
  avatarUrl: string;
  login: string;
  name: string;
  reposCount: number;
  starsCount: number;
}

interface IGitHubUsersProps {
  onUserListItemClick: ({ userLogin: string }) => void;
  queryString: string;
  userLogin: string | null;
}

interface IGitHubUsersState {
  users: IGithubUser[] | null;
  pageInfo: IPageInfo;
  status: string | null;
}

export default class GitHubUsers extends React.PureComponent<IGitHubUsersProps, IGitHubUsersState> {
  public state = {
    users: [],
    pageInfo: {
      hasNextPage: true,
      endCursor: null,
    },
    status: 'loading',
  };

  public componentDidMount() {
    this.fetchUsers();
  }

  public componentDidUpdate(prevProps) {
    const { queryString } = this.props;
    if (queryString && queryString !== prevProps.queryString) {
      this.searchNew();
    }
  }

  public render() {
    const { onUserListItemClick, userLogin } = this.props;
    const { status, users } = this.state;

    if (status === 'loading') {
      return (
        <PageSectionContent>
          Fetching users...
        </PageSectionContent>
      );
    }

    if (status === 'error') {
      return (
        <PageSectionContent>
          Something went wrong! Please try later
        </PageSectionContent>
      );
    }

    if (status !== 'loading' && status !== 'error') {
      if (users.length > 0) {
        return (
          <UserList onScroll={this.handleUserListScroll}>
            {users.map(({ id, avatarUrl, login, name, reposCount, starsCount }) => (
              <UserListItem
                key={id}
                avatarUrl={avatarUrl}
                isActive={login === userLogin}
                onClick={() => onUserListItemClick && onUserListItemClick({ userLogin: login })}
                reposCount={reposCount}
                starsCount={starsCount}
                userName={name} />
            ))}
            {status === 'chunk-loading' && (
              <Spinner />
            )}
          </UserList>
        );
      }

      return (
        <PageSectionContent>
          Sorry! We couldn't find any matches
        </PageSectionContent>
      );
    }

    return null;
  }

  private fetchUsers = async () => {
    const { queryString } = this.props;
    const {
      pageInfo: {
        endCursor: cursor,
        hasNextPage,
      },
    } =this.state;

    if (hasNextPage) {
      try {
        const {
          data: {
            search: {
              edges,
              pageInfo: {
                hasNextPage,
                endCursor,
              },
            },
          },
        } = await client.query({
          query: QUERY_SEARCH_USERS,
          variables: { cursor, queryString },
        });
        const users = [
          ...this.state.users,
          ...edges.map(({
            node: {
              avatarUrl,
              login,
              name,
              repositories: {
                totalCount: reposCount,
              },
              starredRepositories: {
                totalCount: starsCount,
              },
            },
          }) => ({
            avatarUrl,
            login,
            name,
            reposCount,
            starsCount,
            id: uuid(),
          })),
        ];

        this.setState({
          users,
          pageInfo: {
            endCursor,
            hasNextPage,
          },
          status: null,
        });
      }

      catch (error) {
        this.setState({
          status: 'error',
        });
      }
    }
  }

  private handleUserListScroll = ({ position, width }) => {
    const { status } = this.state;

    // Load next chumk of users if scroll position is equal or more then 90% of the right edge of the user list element
    if (status !== 'chunk-loading' && position >= width * 0.9) {
      this.setState({ status: 'chunk-loading' });
      this.fetchUsers();
    }
  }

  private searchNew = () => {
    this.setState(
      {
        users: [],
        pageInfo: {
          hasNextPage: true,
          endCursor: null,
        },
        status: 'loading',
      },
      () => {
        this.fetchUsers();
      },
    );
  }
};
