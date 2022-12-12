import React from "react"
import { Box,
  Button,
  Flex,
  Image,
  Heading,
  Stack,
  Text,
} from "@chakra-ui/react"
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';

const Landing = React.memo(() => {
  const { user } = useSelector((state) => state.auth)

  return (
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
          <Stack
          spacing={4}
          w={{ base: "80%", md: "40%" }}
          align={["center", "center", "flex-start", "flex-start"]}
        >
          <Heading
            as="h1"
            size="xl"
            fontWeight="bold"
            color="primary.800"
            textAlign={["center", "center", "left", "left"]}
          >
            Welcome To Bike Rental Manager
          </Heading>
          {user ? (<>
          <Heading
            as="h2"
            size="md"
            color="primary.800"
            opacity="0.8"
            fontWeight="normal"
            lineHeight={1.5}
            textAlign={["center", "center", "left", "left"]}
          >
            You can rent from millions of choices of bikes. Get Started Now 
          </Heading>
            <Button
              colorScheme="green"
              borderRadius="8px"
              py="4"
              px="4"
              lineHeight="1"
              size="md"
            >
              <Link to='/home'> Get Started Now </Link>
            </Button>
          </>) :
          (<>
            <Heading
              as="h2"
              size="md"
              color="primary.800"
              opacity="0.8"
              fontWeight="normal"
              lineHeight={1.5}
              textAlign={["center", "center", "left", "left"]}
            >
              You can rent from millions of choices of bikes. Create An Account Now!
            </Heading>
              <Button
                colorScheme="green"
                borderRadius="8px"
                py="4"
                px="4"
                lineHeight="1"
                size="md"
              >
                <Link to='/register'> Sign Up Now </Link>
              </Button>
              <Button
                colorScheme="green"
                borderRadius="8px"
                py="4"
                px="4"
                lineHeight="1"
                size="md"
              >
                <Link to='/login'> Already have an account? </Link>
              </Button>
          </>)}
          <Text
            fontSize="xs"
            mt={2}
            textAlign="center"
            color="primary.800"
            opacity="0.6"
          >
            No credit card required.
          </Text>
        </Stack>
        <Box w={{ base: "80%", sm: "60%", md: "50%" }} mb={{ base: 12, md: 0 }}>
          <Image src={'https://bd.gaadicdn.com/processedimages/suzuki/hayabusa/640X309/hayabusa614d56bddfc73.jpg'} size="100%" rounded="1rem" shadow="2xl" />
        </Box>
      </Flex>
    </>
  )
})

export default Landing