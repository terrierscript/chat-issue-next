import { Box } from "@chakra-ui/react"
import { GetServerSideProps } from "next"
import { FC } from "react"
import Head from "next/head"
import { IssuesTargetQueryScheme, RepositoryQuery, RepositoryQueryScheme } from "../../../../services/github/Schema"
import { IssueChatPage } from "../../../../components/page/IssueChatPage"

export type Props = {
  error?: string,
} & RepositoryQuery

const PageHead: FC<Props> = ({ owner, repo }) => {
  return <Head>
    <title>{owner}/{repo}</title>
    <link rel="manifest" href={`/api/issues/${owner}/${repo}/manifest.webmanifest`} />
  </Head>
}
export const Page: FC<Props> = ({ error, ...issueChatProps }) => {
  return <Box>
    <PageHead {...issueChatProps} />
    <IssueChatPage  {...issueChatProps} />
  </Box>
}

export const getServerSideProps: GetServerSideProps = async (req) => {
  const { owner, repo, filter } = IssuesTargetQueryScheme.parse(req.query)

  return {
    props: {
      owner,
      repo,
      filter
    }
  }
}

export default Page
