import { Box } from "@chakra-ui/react"
import { GetServerSideProps } from "next"
import { FC } from "react"
import Head from "next/head"
import { IssueParam, IssueParamScheme } from "../../../../services/github/Schema"
import { IssueChatPage } from "../../../../components/page/main/IssueChatPage"

export type Props = {
  error?: string,
} & IssueParam

const ManifestLink: FC<Props> = ({ owner, repo }) => {
  return <link rel="manifest" href={`/api/issues/${owner}/${repo}/manifest.webmanifest`} />
}
export const Page: FC<Props> = ({ error, ...issueChatProps }) => {
  return <Box>
    <Head>
      <ManifestLink {...issueChatProps} />
    </Head>
    <IssueChatPage  {...issueChatProps} />
  </Box>
}

export const getServerSideProps: GetServerSideProps = async (req) => {
  const { owner, repo, filter } = IssueParamScheme.parse(req.query)

  return {
    props: {
      owner,
      repo,
      filter
      // issues
    }
  }
}

export default Page
