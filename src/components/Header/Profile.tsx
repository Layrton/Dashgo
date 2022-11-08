import { Avatar, Box, Flex, Text } from '@chakra-ui/react'

export function Profile() {
  return (
    <Flex align="center">
      <Box mr="4" textAlign="right">
        <Text>Layrton Mota</Text>
        <Text color="gray.300" fontSize="sm">
          layrtonalberto@gmail.com
        </Text>
      </Box>
      <Avatar
        size="md"
        name="Layrton Mota"
        src="https://github.com/layrton.png"
      />
    </Flex>
  )
}
