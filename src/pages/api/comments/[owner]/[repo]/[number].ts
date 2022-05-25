import { NextApiHandler } from "next"
import { getSessionAccount } from "../../../../../services/auth/getSessionAccount"
import { GithubClient } from "../../../../../services/github/GithubClient"
import { IssueCommentQueryScheme } from "../../../../../services/github/Schema"

const getIssueCommentHandler: NextApiHandler = async (req, res) => {
  const account = await getSessionAccount({ req })
  const accessor = new GithubClient(account)
  const param = IssueCommentQueryScheme.parse(req.query)
  const comments = await accessor.getComments(param)
  res.json({
    comments
  })
}

// const postIssueCommentHandler: NextApiHandler = async (req, res) => {
//   const account = await getSessionAccount({ req })
//   const accessor = new GithubClient(account)
//   const issue = await accessor.postIssue(param, body)
//   res.json(issue)
// }

export const handler: NextApiHandler = async (req, res) => {
  // if (req.method === "POST") {
  //   await postIssueHandler(req, res)
  //   return
  // }

  await getIssueCommentHandler(req, res)

}


export default handler