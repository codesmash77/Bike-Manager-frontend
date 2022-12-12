import React from "react";
import { Link } from "react-router-dom";
import {
  Flex,
  Heading,
  Text,
} from "@chakra-ui/react"

const NotFound = React.memo(() => {
    return (
        <Flex
            align="center"
            justify={{ base: "center", md: "space-around", xl: "space-between" }}
            direction={{ base: "row-reverse", md: "column" }}
            wrap="no-wrap"
            minH="70vh"
            px={8}
            mb={16}
            p={20}
        >
            <Heading>Oops! You seem to be lost.</Heading>
            <Text>Here are some helpful links:</Text>
            <ul>
                <li><Link to='/' style={{textDecoration: 'none', color:'#3182CE', fontSize: 'xl'}}>Landing page</Link></li>
                <li><Link to='/login' style={{textDecoration: 'none', color:'#3182CE', fontSize: 'xl'}}>Login</Link></li>
                <li><Link to='/register' style={{textDecoration: 'none', color:'#3182CE', fontSize: 'xl'}}>Register</Link></li>
            </ul>
        </Flex>
    )
})

export default NotFound;