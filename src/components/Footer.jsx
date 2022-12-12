import { Flex, Text, Link } from '@chakra-ui/react';
import React from 'react';

const Footer = React.memo(() => {
  return (
    <Flex
      w="full"
      bg="blackAlpha.50"
      minHeight="20vh"
      flexDirection="column"
      alignItems="center"
      textAlign="center"
      justifyContent="center"
    >
      <Text mb="3">
        Created by{' '}
        <Link href="https://github.com/codesmash77" isExternal color="blue.500">
          codesmash77
        </Link>
      </Text>
      <Text opacity="0.5">Open-Source Bike Rental Manager - Buit with Chakra UI</Text>
    </Flex>
  );
});

export default Footer;