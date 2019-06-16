import React from 'react';
import { PageSection, PageSectionContent } from 'apps/base/components/PageSection';
import { QUERY_GET_REPOSITORY } from 'apps/repo/gql';
import { IssueList, IssueListItem } from 'apps/repo/components/IssueList';
import RepoDetailHeader from './RepoDetailHeader';
import ModalPopup from 'apps/base/components/ModalPopup';
import CreateIssueDialog from './CreateIssueDialog';
import client from 'artland/client';
import { uuid } from 'apps/base/utils/text';

interface IGitHubIssue {
  id: string;
  author: string;
  number: number;
  publishedAt: string;
  title: string;
}

interface IRepoDetailViewProps {
  match: any;
  name?: string;
  starsCount?: number;
  watchCount?: number;
}

interface IRepoDetailViewState {
  isCreateIssueDialogOpen: boolean;
  issues: IGitHubIssue[];
  name?: string;
  starsCount?: number;
  status: string | null;
  watchCount?: number;
}

export default class RepoDetailView extends React.PureComponent<IRepoDetailViewProps, IRepoDetailViewState> {
  constructor(props) {
    super(props);

    this.state = {
      isCreateIssueDialogOpen: false,
      issues: [],
      name: props.match.params.repoName,
      starsCount: props.starsCount,
      status: 'loading',
      watchCount: props.watchCount,
    };
  }

  public async componentDidMount() {
    const { repoName, userLogin } = this.props.match.params;

    try {
      const {
        data: {
          repositoryOwner: {
            repository: {
              issues: {
                nodes,
              },
              name,
              stargazers: {
                totalCount: starsCount,
              },
              watchers: {
                totalCount: watchCount,
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

      this.setState({
        issues,
        name,
        starsCount,
        watchCount,
        status: null,
      });
    }

    catch(error) {
      this.setState({
        status: 'error',
      });
    }
  }

  public render() {
    const { issues, name, starsCount, status, watchCount, isCreateIssueDialogOpen } = this.state;

    return (
      <PageSection>
        <RepoDetailHeader
          name={name}
          starsCount={starsCount}
          watchCount={watchCount} />
        {status === 'loading' && (
          <PageSectionContent>
            Fetching opened issues...
          </PageSectionContent>
        )}
        {status === 'error' && (
          <PageSectionContent>
            Something went wrong! Please try later
          </PageSectionContent>
        )}
        {!status && (
          <PageSectionContent>
            <PageSectionContent>
              <IssueList onIssueCreateButtonClick={this.openCreateIssueDialog}>
                {issues.map(({ id, author, number, publishedAt, title }) => (
                  <IssueListItem
                    key={id}
                    author={author}
                    orderNumber={number}
                    publishedAt={publishedAt}
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
          </PageSectionContent>
        )}
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
    const nextIssueNumber = issues[0] && issues[0].number ? issues[0].number + 1 : 1;

    this.setState({
      issues: [
        {
          title,
          id: uuid(),
          author: 'John Doe',
          number: nextIssueNumber,
          publishedAt: new Date().toString(),
        },
        ...issues,
      ],
    });

    this.closeCreateIssueDialog();
  }
};
