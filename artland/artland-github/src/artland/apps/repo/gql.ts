import gql from 'graphql-tag';

export const QUERY_SEARCH_USERS = gql`
  query SearchUsers($queryString: String!, $cursor: String) {
    search(query: $queryString, type: USER, first: 10, after: $cursor) {
      edges {
        node {
          ... on User {
            avatarUrl
            login
            name
            repositories {
              totalCount
            }
            starredRepositories {
              totalCount
            }
          }
        }
      }
      pageInfo {
        hasNextPage
        endCursor
    }
  }
  }
`;

export const QUERY_GET_USER_REPOSITORIES = gql`
  query GetUserRepositories($userLogin: String!) {
    user(login: $userLogin) {
      repositories(first: 50, isFork: false) {
        nodes {
          id
          name
          stargazers {
            totalCount
          }
          watchers {
            totalCount
          }
        }
      }
    }
  }
`

export const QUERY_GET_REPOSITORY = gql`
  query GetUserRepositoryDetail($userLogin: String!, $repoName: String!) {
    repositoryOwner(login: $userLogin) {
      repository(name: $repoName) {
        issues(first: 10) {
          nodes {
            ... on Issue {
              id
              author {
                login
              }
              number
              publishedAt
              title
            }
          }
        }
        name
        stargazers {
          totalCount
        }
        watchers {
          totalCount
        }
      }
    }
  }
`;
