import React, {useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { createBike } from '../features/bike/bikeSlice';
import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    Image,
    Stack,
    Flex,
    Heading,
    Input,
    Checkbox,
    Button,
} from '@chakra-ui/react';

import useBackButton from '../hooks/useBackButton';


const AddBike = React.memo(() => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth)
  const backButton = useBackButton();
  
  useEffect(() => {
    if (!user) {
      navigate('/login')
    }
    
    if (user?.userRole !== "ADMIN") {
        navigate('/forbiden')
    }

  }, [user, navigate])
  
  const [bike, setBike] = useState({
    model: "",
    color: "",
    location: "",
    avgRating: 0,
    isAvailable: true,
    userId: user?.userId,
  });
  const { model, color, location, isAvailable } = bike;
  
  const handleChange = (e) => {
    let { name, checked, value } = e.target;
    value = name === "isAvailable" ? checked : value;
    setBike({
      ...bike,
      [name]: value,
    });
  };
    
  const handleSubmit = async (e) => {
      e.preventDefault();
      if (user?.userRole === "ADMIN") {
          const {userId} = user
          const res = await dispatch(createBike({ bike, userId }));
          if (res?.meta?.requestStatus === 'fulfilled')
          {
            toast.success('Bike has been created!');
            setBike({
                model: "",
                color: "",
                location: "",
                avgRating: 0,
                isAvailable: true,
                userId: user?.userId,
            });
          }
          else { toast.error("Failed to create Bike!");}
    }
    else toast.error("User not authorized to create Bike")
  }

  return (
    <>
      {backButton}
    <Stack minH={'91vh'} direction={{ base: 'column', md: 'row' }}>
      <Flex p={8} flex={1} align={'center'} justify={'center'}>
        <Stack spacing={5} w={'full'} maxW={'md'}>
          <Heading fontSize={'2xl'} pb={5}>Add A Bike</Heading>
          <FormControl id="model" isInvalid={model === ''}>
            <FormLabel>Model</FormLabel>
            <Input 
              type="text" 
              required
              id="model"
              name="model"
              value={model}
              autoFocus
              onChange={handleChange} />
            <FormErrorMessage>Model of the Bike is required.</FormErrorMessage>
          </FormControl>
          <FormControl id="color" isInvalid={color === ''}>
            <FormLabel>Color</FormLabel>
            <Input 
              type="text" 
              required
              id="color"
              name="color"
              value={color}
              autoFocus
              onChange={handleChange} />
            <FormErrorMessage>Color of the Bike is required.</FormErrorMessage>
          </FormControl>
          <FormControl id="location" isInvalid={location === ''}>
            <FormLabel>Location</FormLabel>
            <Input 
              type="text" 
              required
              id="location"
              name="location"
              value={location}
              autoFocus
              onChange={handleChange} />
            <FormErrorMessage>Location of the Bike is required.</FormErrorMessage>
          </FormControl>
          <FormControl id="isAvailable" isInvalid={isAvailable === ''}>
            <FormLabel>Availability</FormLabel>
            <Checkbox 
              id="isAvailable"
              name="isAvailable"
              isChecked={isAvailable}
              defaultChecked
              onChange={handleChange} />
            <FormErrorMessage>Availability of the Bike is required.</FormErrorMessage>
          </FormControl>
          <Stack spacing={6}>
            <Button disabled={bike.model === '' || bike.color ==='' || bike.location ===''} 
            type="submit" colorScheme={'blue'} variant={'solid'} onClick={handleSubmit} p={4}>
              Submit
            </Button>
          </Stack>
        </Stack>
      </Flex>
      <Flex flex={1}>
        <Image
          alt={'Add Bike'}
          objectFit={'cover'}
          src={
            'https://media.wired.com/photos/5926afe1cefba457b079ad3d/master/w_2400,h_1800,c_limit/BMWMotorcycle1.jpg'
          }
        />
      </Flex>
    </Stack>
    </>
  )
})

export default AddBike