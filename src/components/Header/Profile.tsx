import { Avatar, Box, Flex, Text } from '@chakra-ui/react'

interface ProfileProps {
  showProfileData?: boolean
}

export function Profile({ showProfileData = true }: ProfileProps) {
  return (
    <Flex align="center">
      {showProfileData ? (
        <Box mr="4" textAlign="right">
          <Text>Layrton Mota</Text>
          <Text color="gray.300" fontSize="sm">
            layrtonalberto@gmail.com
          </Text>
        </Box>
      ) : null}
      <Avatar
        size="md"
        name="Layrton Mota"
        src="https://github.com/layrton.png"
      />
    </Flex>
  )
}
