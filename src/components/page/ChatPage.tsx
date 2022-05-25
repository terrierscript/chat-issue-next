import { Box, Grid } from "@chakra-ui/react"
import { FC } from "react"
import { useChatRouteParam } from "./useChatRouteParam"
// import { ChatInputArea } from "./main/ChatInput"
// import { LeftSidebar } from "./left/LeftSidebar"
// import { ChatHeader } from "./main/header/ChatHeader"
// import { ChatStream } from "./main/ChatStream"
import dynamic from "next/dynamic"
import { alphaBgStyle } from "../atomic/styleUtils"
import { useLayoutStyle } from "./useLayoutStyle"
// import CommentStreamLoader  from "./right/CommentStreamLoader"
// import IssueStreamLoader from "./main/IssueStreamLoader"


const LeftSidebar = dynamic(import("./left/LeftSidebar"))
const ChatInputArea = dynamic(import("./main/ChatInput"))
const IssueStreamLoader = dynamic(import("./main/IssueStreamLoader"))
const ChatHeader = dynamic(import("./main/header/ChatHeader"))
const CommentStreamLoader = dynamic(import("./right/CommentStreamLoader"))

export const ChatPage: FC<{}> = () => {
  const params = useChatRouteParam()
  const layout = useLayoutStyle(params)

  return <Box
    position="absolute"
    top={0} left={0} right={0} bottom={0}
  >
    <Grid h="100%" gridTemplateColumns={{
      base: "auto",
      bp: "max-content 1fr max-content"
    }} >
      <Box {...layout.left}>
        <LeftSidebar />
      </Box>
      <Grid
        {...layout.center}
        minH={0}
        gridTemplateRows={"1fr auto max-content"}
        h="100%"
      >
        <ChatHeader />
        <IssueStreamLoader />
        <ChatInputArea />
      </Grid>

      <Grid minH={0}
        {...layout.right}
        gridTemplateRows={"auto max-content"}
        h="100%"
        {...alphaBgStyle(100)}
      >
        <CommentStreamLoader />
        {/* <ChatInputArea /> */}
      </Grid>
    </Grid>
  </Box>
}

export default ChatPage