import React, { useState,useEffect } from "react";
import { Navigate } from "react-router-dom";
import {
  Flex,
  Heading,
} from "@chakra-ui/react"

const ForbiddenAccess = React.memo(() => {
    const [redirectNow, setRedirectNow] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setRedirectNow(true), 1000); 
        return () => {
            clearTimeout(timer);
        }
    }, [setRedirectNow]);

    return redirectNow ?
    (
        <Navigate to="/login" replace={true} />
    ) : (
        <>
            <Flex
                align="center"
                justify={{ base: "center", md: "space-around", xl: "space-between" }}
                direction={{ base: "column-reverse", md: "row" }}
                wrap="no-wrap"
                minH="70vh"
                px={8}
                mb={16}
                p={20}
            >
                <Heading>You are not allowed to access this path</Heading>
            </Flex>
        </>
    );
})
export default ForbiddenAccess;