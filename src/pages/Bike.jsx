import React, {useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from "react-router-dom";
import { getBike } from '../features/bike/bikeSlice';
import Spinner from '../components/Spinner';
import { toast } from 'react-toastify';
import {
  Box, Badge, Text, Button, ButtonGroup, Center, Drawer, Input, Heading,
  DrawerBody, DrawerFooter, DrawerHeader, DrawerOverlay, DrawerContent,
  DrawerCloseButton, useDisclosure, Stack, FormLabel, Spacer, Container, Flex,
} from "@chakra-ui/react";
import { StarIcon } from '@chakra-ui/icons';
import { createReservation } from '../features/reservation/reservationSlice';
import useBackButton from '../hooks/useBackButton';
import ShowReviews from '../components/ShowReviews';

const Bike = React.memo(() => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const params = useParams();
    const backButton = useBackButton();
    const { user } = useSelector((state) => state.auth)
    const { isLoading, isError, message } = useSelector((state) => state.bike)
    const [reservation, setReservation] = useState({
        model: "",
        startDate: "",
        endDate: "",
        userEmail: "",
    });

  useEffect(() => {
    if (!user) {
      navigate('/login')
    }

    if (isError) {
      toast.error(message)
    }
    
    dispatch(getBike(params?.bikeId))

  }, [user, navigate, isError, dispatch, message, params?.bikeId])

    const { bikes } = useSelector((state) => state.bike)
    const { isOpen, onOpen, onClose } = useDisclosure()
    const btnRef = React.useRef()
    const firstField = React.useRef()
    
    const onInputChange = (e) => {
      setReservation({
        ...reservation,
        [e.target.name]: e.target.value,
      });
    };
  
  const handleSave = async () => {
    const { id } = bikes
    const { userId } = user
    const res = await dispatch(createReservation({ reservation, id, userId }));
    if (res?.meta?.requestStatus === 'fulfilled') {
      toast.success("Bike successfully reserved!");
      setReservation({
        model: "",
        startDate: "",
        endDate: "",
        userEmail: "",
      });
    }
    else {
      toast.error('Bike could not be reserved for some unknown reason!');
      toast.error('Make sure the startDate and endDate are valid!')
    }
  }
    
    if (isLoading) {
    return <Spinner />
  }
    
  return (
    <>
      {backButton}
    <Center p={10}>
      <Box maxW='sm' borderWidth='1px' borderRadius='lg' overflow='hidden'>
          <Box bg={bikes?.color} maxW='m' maxH='m' p={20}>
          </Box>
          <Box p='6'>
            <Box display='flex' alignItems='center'>
              <Badge borderRadius='full' px='2' colorScheme='teal'>
                <Text>{bikes?.location}</Text>
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
                {bikes?.isAvailable ? 'Available' : 'Unavailable'}
            </Box>
            <Box
              mt='4'
              fontWeight='semibold'
              as='h4'
              lineHeight='tight'
              noOfLines={1}
            >
              {bikes?.model}
            </Box>
            <Box display='flex' mt='2' alignItems='center'>
              {Array(5)
                .fill('')
                .map((_, i) => (
                  <StarIcon
                    name="star"
                    type="star"
                    key={i}
                    color={i < bikes?.avgRating ? 'teal.500' : 'gray.300'}
                  />
                ))}
              <Box as='span' ml='2' color='gray.600' fontSize='sm'>
                Avg Rating
              </Box>
            </Box>
            <Box display='flex' mt='5' alignItems='center'>
              <Center>
                <ButtonGroup colorScheme='teal' variant='solid'>
                <Button disabled={!bikes?.isAvailable} ref={btnRef} colorScheme='teal'
                  onClick={() => {
                    onOpen();
                    setReservation({
                      ...reservation,
                      ['userEmail']: user?.userEmail,
                      ['model'] : bikes?.model,
                    })}}>
                    Add Reservation
                </Button>
                </ButtonGroup>
              </Center>
            </Box>
          </Box>
        </Box>
        <Drawer
        isOpen={isOpen}
        placement='right'
        onClose={onClose}
        initialFocusRef={firstField}
        finalFocusRef={btnRef}
      >
      <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Add a Reservation</DrawerHeader>

          <DrawerBody>
            <Stack spacing='24px'>
              <Box>
                <FormLabel>Start Date</FormLabel>
                <Input
                  ref={firstField}
                  placeholder="Select Date and Time"
                  size="md"
                  type="date"
                  name='startDate'
                  min={new Date().toISOString().split('T')[0]}
                  max={reservation?.endDate}
                  onChange={(e) => onInputChange(e)}
                />
              </Box>

              <Box>
                <FormLabel>End Date</FormLabel>
                <Input
                  type="date"
                  placeholder="Select Date and Time"
                  size="md"
                  name='endDate'
                  onChange={(e) => onInputChange(e)}
                  min={reservation?.startDate ? reservation?.startDate : new Date(new Date().getTime() + (24 * 60 * 60 * 1000)).toISOString().split('T')[0]}
                />
              </Box>
            </Stack>
          </DrawerBody>

          <DrawerFooter>
            <Button variant='outline' mr={3}
              onClick={() => {
                onClose(); setReservation({
                  model: "",
                  startDate: "",
                  endDate: "",
                  userEmail: "",
                }); }}>
              Cancel
            </Button>
            <Button colorScheme='blue'
              onClick={() => {
                handleSave();
                onClose();
              }}>Save</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
      </Center>
      <Spacer />
      <Container minW={'auto'}>
        <Heading as='h2' size='lg' p={10}>
          User Ratings and Comments.............
        </Heading>
        <Box borderRadius={'xl'} my={4} boxShadow={'md'}>
          <Flex justifyContent="space-between" alignItems={'baseline'} mb={20}>
              <ShowReviews bikeId = {params?.bikeId} />
          </Flex>
        </Box>
      </Container>
    </>
    )
})

export default Bike;