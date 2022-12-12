import React from 'react';
import { Box, Badge, Text, Button, ButtonGroup, Center } from '@chakra-ui/react';
import { StarIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';

const BikeCard = React.memo(({ bike }) => {
  const navigate = useNavigate()
  return (
    <Box maxW='sm' borderWidth='1px' borderRadius='lg' overflow='hidden'>
      <Box bg={bike?.color} maxW='m' maxH='m' p={20}>
      </Box>
      <Box p='6'>
        <Box display='flex' alignItems='center'>
          <Badge borderRadius='full' px='2' colorScheme='teal'>
            <Text>{bike?.location}</Text>
          </Badge>
        </Box>
        <Box
            color='gray.500'
            fontWeight='semibold'
            letterSpacing='wide'
            fontSize='xs'
            textTransform='uppercase'
            mt='2'
          >
            {bike?.isAvailable ? 'Available' : 'Unavailable'}
        </Box>
        <Box
          mt='4'
          fontWeight='semibold'
          as='h4'
          lineHeight='tight'
          noOfLines={1}
        >
          {bike?.model}
        </Box>
        <Box display='flex' mt='2' alignItems='center'>
          {Array(5)
            .fill('')
            .map((_, i) => (
              <StarIcon
                name="star"
                type="star"
                key={i}
                color={i < bike?.avgRating ? 'teal.500' : 'gray.300'}
              />
            ))}
          <Box as='span' ml='2' color='gray.600' fontSize='sm'>
             Avg Rating
          </Box>
        </Box>
        <Box display='flex' mt='5' alignItems='center'>
          <Center>
            <ButtonGroup colorScheme='teal' variant='solid'>
              <Button onClick={() => { navigate(`/Bike/${bike?.id}`) }}>
                Reserve
              </Button>
            </ButtonGroup>
          </Center>
        </Box>
      </Box>
    </Box>
  )
})

export default BikeCard