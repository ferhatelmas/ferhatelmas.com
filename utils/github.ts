import { type GraphQlQueryResponseData, graphql } from '@octokit/graphql'
import type { GithubRepository } from '~/types/data'

const HISTORY_QUERY = `
  defaultBranchRef {
    target {
      ... on Commit {
        history(first: 1) {
          edges {
            node {
              ... on Commit {
                id
                abbreviatedOid
                committedDate
                message
                url
                status {
                  state
                }
              }
            }
          }
        }
      }
    }
  }
`

export async function fetchRepoData({
  token,
  repo = '',
  includeLastCommit = false,
}: {
  token: string
  repo: string
  includeLastCommit?: boolean
}): Promise<GithubRepository | null> {
  if (!token || !repo) {
    console.error('Missing `token` or `repo`')
    return null
  }
  try {
    let { repository }: GraphQlQueryResponseData = await graphql(
      `
        query repository($owner: String!, $repo: String!) {
          repository(owner: $owner, name: $repo) {
            stargazerCount
            description
            homepageUrl
            owner {
              avatarUrl
              login
              url
            }
            ${includeLastCommit ? HISTORY_QUERY : ''}
            languages(first: 10, orderBy: { field: SIZE, direction: DESC }) {
              edges {
                node {
                  color
                  name
                }
              }
            }
            name
            nameWithOwner
            url
            forkCount
            repositoryTopics(first: 20) {
              edges {
                node {
                  topic {
                    name
                  }
                }
              }
            }
          }
        }
      `,
      {
        owner: repo.split('/')[0],
        repo: repo.split('/')[1],
        headers: {
          authorization: `token ${token}`,
        },
      },
    )
    if (includeLastCommit) {
      repository.lastCommit =
        repository.defaultBranchRef.target.history.edges[0].node
      repository.defaultBranchRef = undefined
    }
    repository.languages = repository.languages.edges.map((edge) => {
      return {
        color: edge.node.color,
        name: edge.node.name,
      }
    })
    repository.repositoryTopics = repository.repositoryTopics.edges.map(
      (edge) => edge.node.topic.name,
    )
    return repository
  } catch (err) {
    console.error(err)
    return null
  }
}
