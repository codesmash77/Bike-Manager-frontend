import React, {useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getReviewByBike } from "../features/review/reviewSlice";
import Spinner from '../components/Spinner';
import { toast } from 'react-toastify';
import { format } from 'date-fns'

import {
    Stat,
    StatLabel,
    StatNumber,
    StatHelpText,
    Wrap,
    WrapItem,
    Text,
    Container,
    VStack,
    Box,
    Avatar,
} from '@chakra-ui/react';
import { StarIcon } from '@chakra-ui/icons';

const ShowReviews = React.memo(({ bikeId }) => {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth)
    const { isLoading, isError, message } = useSelector((state) => state.review)

  useEffect(() => {
    if (isError) {
      toast.error(message)
    }
    
    if(user)
      dispatch(getReviewByBike(bikeId))

  }, [user, isError, dispatch, message])
    
    const { reviews } = useSelector((state) => state.review)
    
    if (isLoading) {
        return <Spinner />
    }

    return (
      <>
        <Container>
          <VStack py={5}>
            {reviews?.length!==0 ? (<Wrap spacing={10}>
                {reviews?.map((review, i) => {
                    return (
                        <WrapItem>
                            <Stat>
                                <StatLabel>
                                  <Avatar name={review?.userName}
                                    src={`https://avatars.dicebear.com/api/bottts/:${review?.userName}.svg`}
                                    size="sm" mr="4" />
                                  <Text>{review?.userName}</Text>
                                </StatLabel>
                                <StatNumber><Box display='flex' mt='2' alignItems='center'>
                                    {Array(5)
                                        .fill('')
                                        .map((_, i) => (
                                        <StarIcon
                                            name="star"
                                            type="star"
                                            key={i}
                                            color={i < review?.rating ? 'yellow.500' : 'gray.300'}
                                        />
                                        ))}
                                    <Box as='span' ml='2' color='gray.600' fontSize='sm'>
                                        Rating
                                    </Box>
                                </Box></StatNumber>
                                <StatNumber>{review.comment}</StatNumber>
                                <StatHelpText>{format(Date.parse(review.created_at), 'dd/mm/yyyy')}</StatHelpText>
                            </Stat>
                        </WrapItem>
                    );
                })}
            </Wrap>) : (<Text>There are no Reviews for this Bike</Text>)}
      
          </VStack>
        </Container>
      </>
    )
})

export default ShowReviews;