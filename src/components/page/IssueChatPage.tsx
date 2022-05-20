import { Avatar, Box, Divider, Flex, Grid, HStack, Link, Spacer, Stack, Textarea } from "@chakra-ui/react"
import { FC } from "react"
import { IssueResponse } from "../../services/github/client"
import { ChatInputArea } from "./ChatInput"
import { IssuePageProps } from "./Props"

const Issue: FC<{ issue: IssueResponse }> = ({ issue }) => {
  return <Stack>
    <HStack spacing={4}>
      <Box alignSelf={"start"} py={2}>
        <Avatar size="sm"
          name={issue.user.login}
          src={issue.user.avatar_url}
        />
      </Box>
      <Stack spacing={0}>
        <HStack>
          <Box fontWeight={"bold"}>{issue.user.login}</Box>
          <Box fontSize={"sm"}>{issue.updated_at}</Box>
          <Box fontSize={"xs"} color="gray.500">
            <Link href={issue.html_url} target="_blank" >
              #{issue.number}
            </Link>
          </Box>
        </HStack>
        <Stack>
          <Box>
            {issue.title}
          </Box>
        </Stack>
      </Stack>
    </HStack>
  </Stack>
}


const IssueStream: FC<{ issues: IssueResponse[] }> = ({ issues }) => {
  return <Stack spacing={4}>
    <Spacer minH="100vh" />
    {issues.map((issue, key) => {
      return <Issue issue={issue} key={key} />
    })}
  </Stack>

}


const ChatHeader: FC<Omit<IssuePageProps, "issues">> = ({ owner, repo }) => {
  return <Box>
    <Box p={4} fontWeight="bold" >
      # {owner}/{repo}
    </Box>
    <Divider />
  </Box>

}

export const IssueChatPage: FC<IssuePageProps> = ({ issues, owner, repo, filter }) => {

  return <Grid gridTemplateRows={"1fr auto 1fr"} h="100vh">
    <ChatHeader {...{ owner, repo, filter }} />
    <Flex overflow="scroll" w="100%" p={4}
      flexDirection="column-reverse">
      <IssueStream issues={issues} />
    </Flex>
    <Box bg="gray.200" p={2}>
      <ChatInputArea {...{ owner, repo }} />
    </Box>
  </Grid >
}