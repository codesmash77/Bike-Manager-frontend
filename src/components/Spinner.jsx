import React from 'react';
import { Center, Flex, Spinner as Spin } from '@chakra-ui/react'

const Spinner = React.memo(() => {
  return (
    <Flex display={'block'}>
      <Center>
        <Spin
          thickness='4px'
          speed='0.65s'
          emptyColor='gray.200'
          color='blue.500'
          size='xl'
        />
      </Center>
    </Flex>
  )
})

export default Spinner