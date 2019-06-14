import React from 'react';
import { Query } from 'react-apollo';
import { PageSection, PageSectionContent } from 'apps/base/components/PageSection';
import { QUERY_GET_REPOSITORY } from 'apps/repo/gql';
import { IssueList, IssueListItem } from 'apps/repo/components/IssueList';
import RepoDetailHeader from './RepoDetailHeader';
import ModalPopup from 'apps/base/components/ModalPopup';
import CreateIssueDialog from './CreateIssueDialog';
import client from 'artland/client';

interface IGitHubIssue {
  id: string;
  author: string;
  number: number;
  publishedAt: string;
  title: string;
}

interface IRepoDetailViewProps {
  match: any;
}

interface IRepoDetailViewState {
  isCreateIssueDialogOpen: boolean;
  issues: IGitHubIssue[];
}

export default class RepoDetailView extends React.PureComponent<IRepoDetailViewProps, IRepoDetailViewState> {
  public state = {
    isCreateIssueDialogOpen: false,
    issues: [],
  };

  public async componentDidMount() {
    const { repoName, userLogin } = this.props.match.params;
    const {
      data: {
        repositoryOwner: {
          repository: {
            issues: {
              nodes,
            },
          },
        },
      },
    } = await client.query({
      query: QUERY_GET_REPOSITORY,
      variables: { repoName, userLogin },
    });
    const issues = nodes
      .map(item => ({
        ...item,
        author: item.author && item.author.login,
      }))
      .sort((a, b) => b.number - a.number);

    this.setState({ issues });
  }

  public render() {
    const { repoName, userLogin } = this.props.match.params;
    const { isCreateIssueDialogOpen } = this.state;

    return (
      <PageSection>
        <Query
          query={QUERY_GET_REPOSITORY}
          variables={{ repoName, userLogin }}>
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

            if (data.repositoryOwner && data.repositoryOwner.repository) {
              const { name, stargazers, watchers } = data.repositoryOwner.repository;
              const { issues } = this.state;

              return (
                <>
                  <RepoDetailHeader
                    name={name}
                    starsCount={stargazers.totalCount}
                    watchCount={watchers.totalCount} />
                  <PageSectionContent>
                    <IssueList onIssueCreateButtonClick={this.openCreateIssueDialog}>
                      {issues.map(({ id, author, number, publishedAt, title }) => (
                        <IssueListItem
                          key={id}
                          author={author}
                          publishedAt={publishedAt}
                          orderNumber={number}
                          title={title} />
                      ))}
                    </IssueList>
                  </PageSectionContent>
                  <ModalPopup
                    isOpen={isCreateIssueDialogOpen}
                    onClose={this.closeCreateIssueDialog}>
                    <CreateIssueDialog
                      onIssueCreate={this.addIssue}
                      onCancel={this.closeCreateIssueDialog} />
                  </ModalPopup>
                </>
              );
            }

            return (
              <div>
                Query is empty
              </div>
            );
          }}
        </Query>
      </PageSection>
    );
  }

  private openCreateIssueDialog = () => {
    this.setState({ isCreateIssueDialogOpen: true });
  }

  private closeCreateIssueDialog = () => {
    this.setState({ isCreateIssueDialogOpen: false });
  }

  private addIssue = ({ title }) => {
    const issues: IGitHubIssue[] = [...this.state.issues];

    this.setState({
      issues: [
        {
          title,
          id: `f${(+new Date()).toString(16)}`,
          author: 'Memo',
          number: issues[0].number + 1,
          publishedAt: new Date().toString(),
        },
        ...issues,
      ],
    });

    this.closeCreateIssueDialog();
  }
};
