import React from 'react';
import { PageSection, PageSectionTitle } from 'apps/base/components/PageSection';
import GitHubUsers from 'apps/repo/components/GitHubUsers';
import GitHubUserRepos from 'apps/repo/components/GitHubUserRepos';

interface IReposIndexViewProps {
  onUserSelect: ({ userLogin: string }) => void;
  queryString: string;
  userLogin: string | null;
}

export default class ReposIndexView extends React.PureComponent<IReposIndexViewProps> {
  public render() {
    const { queryString, userLogin } = this.props;

    if (queryString.length > 0) {
      return (
        <div>
          <PageSection>
            <PageSectionTitle>
              Users
            </PageSectionTitle>
            <GitHubUsers
              onUserListItemClick={this.handleUserListItemClick}
              queryString={queryString}
              userLogin={userLogin} />
          </PageSection>
          {userLogin && (
            <PageSection>
              <PageSectionTitle>
                User Repositories
              </PageSectionTitle>
              <GitHubUserRepos userLogin={userLogin} />
            </PageSection>
          )}
        </div>
      );
    }

    return null;
  }

  private handleUserListItemClick = ({ userLogin }) => {
    const { onUserSelect } = this.props;

    if (onUserSelect) {
      onUserSelect({ userLogin });
    }
  }
};
