/* eslint-disable */
import React, { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from "react-router-dom";
import Spinner from '../components/Spinner';
import { toast } from 'react-toastify';
import { getReservationByUser } from '../features/reservation/reservationSlice';
import { createReview } from '../features/review/reviewSlice';
import { updateReservation, cancelReservation, deleteReservation } from '../features/reservation/reservationSlice';

import {
  Flex,
  Avatar,
  Text,
  Stack,
  Box,
  Icon,
  Button,
  Heading,
  Center,
  ButtonGroup,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  RangeSlider,
  RangeSliderTrack,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  FormControl,
  FormLabel,
  Input,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  VStack,
} from "@chakra-ui/react";

// Recommended for icons
import { FiTrash2, FiUser } from "react-icons/fi";
import { EditIcon, ChatIcon, NotAllowedIcon } from '@chakra-ui/icons';
import { Table } from "react-chakra-pagination";
import useBackButton from '../hooks/useBackButton';

const MyReservations = React.memo(() => {
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const backButton = useBackButton();
    const { user } = useSelector((state) => state.auth)
    const { isLoading, isError, message } = useSelector((state) => state.reservation)
    
    const { isOpen: isEditResOpen , onOpen: onEditResOpen, onClose: onEditResClose  } = useDisclosure()
    const { isOpen: isAddRevOpen , onOpen: onAddRevOpen, onClose: onAddRevClose  } = useDisclosure()

    const initialRef = useRef(null)
    const finalRef = useRef(null)
    const firstField = useRef()
    const [sendRequest, setSendRequest] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate('/login')
    }

    if (isError) {
      toast.error(message)
    }

    if (sendRequest) {
      
    }
    dispatch(getReservationByUser(user?.userId))

  }, [user, navigate, isError, dispatch, message, sendRequest])

  const { reservations } = useSelector((state) => state.reservation)
  const [page, setPage] = React.useState(1);
  const [bikeId, setBikeId] = React.useState('');
  const [userId, setUserId] = React.useState('');
  const [resId, setResId] = React.useState('');
  const [review, setReview] = useState({
    userName: '',
    comment: '',
    rating: '',
  });

  const [reserve, setReservation] = useState({
    model: "",
    startDate: "",
    endDate: "",
    userEmail: "",
  });

  const handleSaveReview = async () => {
    const res = await dispatch(createReview({ review, userId, bikeId }));
    if (res?.meta?.requestStatus === 'fulfilled') {
      toast.success("Review successfully added!");
    }
    else toast.error('Your Review could not be added unfortunately!')
    setReview({
      userName: '',
      comment: '',
      rating: '',
    });
    setBikeId('');
    setUserId('');
  }

  const handleSaveReserve = async () => {
    const res = await dispatch(updateReservation({ userId, resId, reserve }));
    if (res?.meta?.requestStatus === 'fulfilled') {
      toast.success("Reservation successfully updated!");
    }
    else toast.error('Your Reservation could not be updated unfortunately!')
    setReservation({
      model: "",
      startDate: "",
      endDate: "",
      userEmail: "",
  });
    setResId('');
    setUserId('');
    setSendRequest(!sendRequest);
  }

  const handleCancelRes = async () => {
    const res = await dispatch(cancelReservation({ userId, resId }));
    if (res?.meta?.requestStatus === 'fulfilled') {
      toast.success("Reservation successfully cancelled!");
    }
    else toast.error('Your Reservation could not be cancelled unfortunately!')
    setReservation({
      model: "",
      startDate: "",
      endDate: "",
      userEmail: "",
  });
    setResId('');
    setUserId('');
    setSendRequest(!sendRequest);
  }
  
  const handleDeleteRes = async () => {
    const res = await dispatch(deleteReservation({ userId, resId }));
    if (res?.meta?.requestStatus === 'fulfilled') {
      toast.success("Reservation successfully deleted!");
    }
    else toast.error('Your Reservation could not be deleted unfortunately!')
    setReservation({
      model: "",
      startDate: "",
      endDate: "",
      userEmail: "",
  });
    setResId('');
    setUserId('');
    setSendRequest(!sendRequest);
  }

  const onInputChange = (e) => {
      setReservation({
        ...reserve,
        [e.target.name]: e.target.value,
      });
    };
  
  const tableData = reservations?.items?.map((reservation) => ({
    bikeId: <Text>{reservation?.bikeId}</Text>,
    model: (
      <Flex align="center">
        <Avatar name={reservation?.model}
          src={'https://st2.depositphotos.com/4129357/9986/v/950/depositphotos_99868528-stock-illustration-motorcycle-rider-sign.jpg'}
          size="sm" mr="4" />
        <Text>{reservation?.model}</Text>
      </Flex>
    ),
    email: <Text>{reservation?.userEmail}</Text>,
    startDate: <Text>{reservation?.startDate}</Text>,
    endDate: <Text>{reservation?.endDate}</Text>,
    status: <Text>{reservation?.status}</Text>,
    actions: (
      <ButtonGroup>
        <Button
          colorScheme="yellow"
          onClick={() => {
            onAddRevOpen();
            setReview({ ...review, ['userName']: user?.userName });
            setBikeId(reservation?.bikeId);
            setUserId(reservation?.userId);
          }}
          size="sm"
        >
          <Icon as={ChatIcon} fontSize="20" />
        </Button>
        <Button
          colorScheme="green"
          onClick={() => {
            onEditResOpen();
            setReservation({ ...reserve, ['userEmail']: user?.userEmail, ['model']: reservation?.model });
            setResId(reservation?.id);
            setUserId(reservation?.userId);
          }}
          size="sm"
        >
          <Icon as={EditIcon} fontSize="20" />
        </Button>
        <Button
          colorScheme="gray"
          onClick={() => {
            setResId(reservation?.id);
            setUserId(reservation?.userId);
            handleCancelRes();
          }}
          size="sm"
        >
          <Icon as={NotAllowedIcon} fontSize="20" />
        </Button>
        <Button
          colorScheme="red"
          onClick={() => {
            setResId(reservation?.id);
            setUserId(reservation?.userId);
            handleDeleteRes();
          }}
          size="sm"
        >
          <Icon as={FiTrash2} fontSize="20" />
        </Button>
      </ButtonGroup>
    )
  }));

  const tableColumns = [
    {
      Header: "BikeId",
      accessor: "bikeId"
    },
    {
      Header: "Model",
      accessor: "model"
    },
    {
      Header: "Email",
      accessor: "email"
    },
    {
      Header: "StartDate",
      accessor: "startDate"
    },
    {
      Header: "EndDate",
      accessor: "endDate"
    },
    {
      Header: "Status",
      accessor: "status"
    },
    {
      Header: "Action",
      accessor: "actions"
    }
  ];

  if (isLoading) {
    return <Spinner />
  }
    
  return (
    <>
      {backButton}
      <Center>
        <Box p="12">
        <Heading size="sm" as="h3">
          My Reservations
        </Heading>
        </Box>
      </Center>
      {reservations?.items?.length > 0 ? (
        <Center>
        <Box mt="6">
          <Table
            colorScheme="blue"
            // Fallback component when list is empty
            emptyData={{
              icon: FiUser,
              text: "You have no Reservations."
            }}
            totalRegisters={reservations?.meta?.itemCount}
            page={page}
            // Listen change page event and control the current page using state
            onPageChange={(page) => setPage(page)}
            columns={tableColumns}
            data={tableData}
          />
          </Box>
        </Center>
        ) : (<Text>You have no Reservations.</Text>)}
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isAddRevOpen}
        onClose={onAddRevClose}
        >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add a Review</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Comment</FormLabel>
              <Input ref={initialRef} placeholder='Comment' onChange={(e) => {setReview((prevState) => ({ ...prevState, ['comment']: e.target.value }))}}/>
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Rating</FormLabel>
              <RangeSlider minW='100%' defaultValue={[1]} min={1} max={5} step={1} onChangeEnd={(val) => setReview((prevState) => ({ ...prevState, ['rating']: val[0] }))}>
                <RangeSliderTrack bg='red.100'>
                    <RangeSliderFilledTrack bg='tomato' />
                </RangeSliderTrack>
                <RangeSliderThumb boxSize={6} index={0} />
              </RangeSlider>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3}
              onClick={() => {
                handleSaveReview();
                onAddRevClose();}}>
              Save
            </Button>
            <Button
              onClick={() => {
                onAddRevClose();
                setReview({
                  userName: '',
                  comment: '',
                  rating: '',
                });
                setBikeId('');
                setUserId('');
              }}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Drawer
        isOpen={isEditResOpen}
        placement='right'
        onClose={onEditResClose}
        initialFocusRef={firstField}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Edit Reservation</DrawerHeader>

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
                  max={reserve?.endDate}
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
                  min={reserve?.startDate ? reserve?.startDate : new Date(new Date().getTime() + (24 * 60 * 60 * 1000)).toISOString().split('T')[0]}
                />
              </Box>
            </Stack>
          </DrawerBody>

          <DrawerFooter>
            <Button colorScheme='blue' mr={3}
              onClick={() => {
                  handleSaveReserve();
                  onEditResClose();
              }}
            >Save</Button>
            <Button variant='outline'
              onClick={() => { onEditResClose(); }}>
              Cancel
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
    )
})

export default MyReservations;