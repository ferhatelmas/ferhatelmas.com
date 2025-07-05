import type { Document, MDX } from 'contentlayer2/core'

export type Project = {
  type: 'work' | 'self'
  title: string
  description?: string
  imgSrc: string
  url?: string
  repo?: string
  builtWith: string[]
  links?: { title: string; url: string }[]
}

export type GithubRepository = {
  stargazerCount: number
  description: string
  homepageUrl: string
  languages: {
    color: string
    name: string
  }[]
  name: string
  nameWithOwner: string
  url: string
  forkCount: number
  repositoryTopics: string[]
  lastCommit?: GithubRepositoryCommit
  owner: {
    avatarUrl: string
    login: string
    url: string
  }
}

// https://docs.github.com/en/graphql/reference/enums#statusstate
export type CommitState =
  | 'SUCCESS'
  | 'PENDING'
  | 'FAILURE'
  | 'ERROR'
  | 'EXPECTED'

export type GithubRepositoryCommit = {
  id: string
  abbreviatedOid: string
  committedDate: string
  message: string
  url: string
  status: {
    state: CommitState
  }
}

export type MDXDocument = Document & { body: MDX }
export type MDXDocumentDate = MDXDocument & {
  date: string
}

export type CoreContent<T> = Omit<T, 'body' | '_raw' | '_id'>
