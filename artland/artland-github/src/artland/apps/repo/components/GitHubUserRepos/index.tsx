import React from 'react';
import Button from 'apps/base/components/Button';
import { PageSectionContent } from 'apps/base/components/PageSection';
import { RepoList, RepoListItem } from 'apps/repo/components/RepoList';
import Spinner from 'apps/base/components/Spinner';
import client from 'artland/client';
import { QUERY_GET_USER_REPOSITORIES } from 'apps/repo/gql';
import { uuid, numberWithFlexia } from 'apps/base/utils/text';

interface IPageInfo {
  endCursor: string | null;
  hasNextPage: boolean;
}

interface IGithubUserRepo {
  id: string;
  name: string;
  starsCount: number;
  watchCount: number;
}

interface IGitHubUserReposProps {
  userLogin: string | null;
}

interface IGitHubUserReposState {
  repositories: IGithubUserRepo[];
  status: string | null;
  currentPage: number;
  totalPages: number;
  pageInfo: IPageInfo;
}

export default class GitHubUserRepos extends React.PureComponent<IGitHubUserReposProps, IGitHubUserReposState> {
  public state = {
    repositories: [],
    status: 'loading',
    currentPage: 1,
    totalPages: 0,
    pageInfo: {
      hasNextPage: true,
      endCursor: null,
    },
  };

  public componentDidMount() {
    this.fetchRepositories();
  }

  public componentDidUpdate(prevProps) {
    const { userLogin } = this.props;
    if (userLogin && userLogin !== prevProps.userLogin) {
      this.setState(
        {
          totalPages: 0,
          currentPage: 1,
          status: 'loading',
          pageInfo: {
            hasNextPage: true,
            endCursor: null,
          },
          repositories: [],
        },
        () => {
          this.fetchRepositories();
        }
      );
    }
  }

  public render() {
    const { userLogin } = this.props;
    const {
      repositories,
      status,
      currentPage,
      totalPages,
      pageInfo: { hasNextPage },
    } = this.state;

    if (status === 'loading') {
      return (
        <PageSectionContent>
          Fetching {userLogin} repositories...
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
      if (repositories.length > 0) {
        return (
          <>
            <RepoList>
              {repositories.map(({ id, name, starsCount, watchCount }) => (
                <RepoListItem
                  key={id}
                  link={`/${userLogin}/${name}`}
                  name={name}
                  starsCount={starsCount}
                  watchCount={watchCount}>
                  {name}
                </RepoListItem>
              ))}
            </RepoList>
            <div>
              {(status !== 'chunk-loading' && hasNextPage) && (
                <Button onClick={this.handlePageSelect}>
                  Load {numberWithFlexia(currentPage + 1)} of {totalPages} pages
                </Button>
              )}
              {status === 'chunk-loading' && (
                <Spinner />
              )}
            </div>
          </>
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

  private handlePageSelect = () => {
    const { currentPage } = this.state;

    this.setState(
      {
        currentPage: currentPage + 1,
        status: 'chunk-loading'
      },
      () => this.fetchRepositories(),
    );
  }

  private fetchRepositories = async () => {
    const { userLogin } = this.props;
    const {
      pageInfo: {
        endCursor: cursor,
        hasNextPage,
      },
    } =this.state;

    if (hasNextPage) {
      const perPage = 10;

      try {
        const {
          data: {
            user: {
              repositories: {
                totalCount,
                nodes,
                pageInfo: {
                  hasNextPage,
                  endCursor,
                },
              },
            },
          },
        } = await client.query({
          query: QUERY_GET_USER_REPOSITORIES,
          variables: { userLogin, cursor, perPage },
        });
        const repositories = [
          ...this.state.repositories,
          ...nodes.map(({
            name,
            stargazers: {
              totalCount: starsCount,
            },
            watchers: {
              totalCount: watchCount,
            },
          }) => ({
            name,
            starsCount,
            watchCount,
            id: uuid(),
          })),
        ];

        this.setState({
          repositories,
          totalPages: Math.ceil(totalCount / perPage),
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
};
