import { Box, Center, HStack, IconButton, Input } from '@chakra-ui/react'
import { ChevronRightIcon } from '@primer/octicons-react'
import React, { useMemo, useState } from 'react'

const Generate = () => {
  const [value, setValue] = useState("")
  const destination = useMemo(() => {
    const normalized = value
      .replace("https://", "")
      .replace("github.com/", "")
    if (normalized.includes("/")) {
      return normalized
    }
    return null
  }, [value])
  return <HStack w={{ base: "80vw", bp: "50vw" }} >
    <Input size="lg" value={value} placeholder="Input repository URL" textAlign={"center"} onChange={(e) => setValue(e.target.value)} />
    <IconButton as="a"
      size="lg"
      isDisabled={destination === null}
      href={`/${destination}`}
      p={2} icon={<ChevronRightIcon />} aria-label={'GO'}
    />
  </HStack>
}

export default function Home() {
  return (
    <Box>
      <Center h="100vh" p={4}>
        <Generate />
      </Center>
    </Box>
  )
}
