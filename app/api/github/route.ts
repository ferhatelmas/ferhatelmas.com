import type { NextRequest } from 'next/server'
import { getCloudflareContext } from '@opennextjs/cloudflare'
import { fetchRepoData } from '~/utils/github'

export async function GET(request: NextRequest) {
  const { env } = getCloudflareContext()
  let { searchParams: params } = new URL(request.url)
  let repo = params.get('repo')
  if (!repo) {
    return Response.json(
      { message: 'Missing repo parameter' },
      {
        status: 400,
      },
    )
  }
  if (repo === 'undefined' || repo === 'null') {
    return Response.json(null)
  }
  let data = await fetchRepoData({
    token: env.GITHUB_API_TOKEN,
    repo,
    includeLastCommit: true,
  })
  return Response.json(data)
}
