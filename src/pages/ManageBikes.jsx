import React, {useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import Spinner from '../components/Spinner';
import { toast } from 'react-toastify';
import reservationService from '../features/reservation/reservationService';
import bikeService from '../features/bike/bikeService';
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
  FormLabel,
  Input,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Checkbox,
} from "@chakra-ui/react";

import { FiTrash2, FiUser } from "react-icons/fi";
import { EditIcon, CalendarIcon } from '@chakra-ui/icons';
import { Table } from "react-chakra-pagination";
import useBackButton from '../hooks/useBackButton';
import useReserveModal from '../hooks/useReserveModal';

const ManageBikes = React.memo(() => {
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const backButton = useBackButton();
    const { user, isError, message, isLoading } = useSelector((state) => state.auth)
    const [page, setPage] = React.useState(1);

    const firstField = React.useRef()

    const [bikeId, setBikeId] = React.useState('');
    const [userId, setUserId] = React.useState(user?.userId);
    const [sendRequest, setSendRequest] = useState(false);
    const [reservations, setReservations] = useState([])

    const { isOpen: isEditOpen , onOpen: onEditOpen, onClose: onEditClose  } = useDisclosure()
    const { isOpen: isViewOpen, onOpen: onViewOpen, onClose: onViewClose } = useDisclosure()
    const reservationList = useReserveModal(reservations, onViewClose, isViewOpen)
    const [filter, setFilter] = useState({
        model: "",
        color: "",
        location: "",
        avgRating: "",
    });

    const [bikes, setBikes] = useState([])

    const [bike, setBike] = useState({
        model: "",
        color: "",
        location: "",
        isAvailable: '',
    });

    useEffect(() => {
    if (!user) {
      navigate('/login')
    }

    if (isError) {
      toast.error(message)
    }

    if (sendRequest) {
      
    }
    fetchBikes()

  }, [user, navigate, isError, dispatch, message, sendRequest])
  
    const fetchReservations = async (id) => {
        const res = await reservationService.getReservationByUser(id, user?.access_token)
        setReservations(res)
        console.log(reservations)
    }

    const fetchBikes = async () => {
        const res = await bikeService.getAllBikesAdmin(10,page,filter,user?.access_token)
        setBikes(res)
    }

    const updateBike = async () => {
        const res = await bikeService.updateBike(bike,bikeId,userId)
        if (res.request.status === 200) {
            setBike({
                    model: "",
                    color: "",
                    location: "",
                    isAvailable: true,
                })
            setBikeId('')
            toast.success('Bike successfully updated!')
        }
        else toast.error('Could not update bike unfortunately')
        setSendRequest(!sendRequest)
    }

    const removeBike = async () => {
        const res = await bikeService.deleteBike(bikeId, userId, user?.access_token)
        setUserId('')
        setSendRequest(!sendRequest)
    }

    const handleChange = (e) => {
        let { name, checked, value } = e.target;
        value = name === "isAvailable" ? checked : value;
        setBike({
        ...bike,
        [name]: value,
        });
    }
    
    const tableData = bikes?.items?.map((b) => ({
    bikeId: <Text>{b?.id}</Text>,
    userId: <Text>{b?.userId}</Text>,
    model: (
      <Flex align="center">
        <Avatar name={b?.model}
          src={'https://st2.depositphotos.com/4129357/9986/v/950/depositphotos_99868528-stock-illustration-motorcycle-rider-sign.jpg'}
          size="sm" mr="4" />
        <Text>{b?.model}</Text>
      </Flex>
    ),
    color: <Text>{b?.color}</Text>,
    location: <Text>{b?.location}</Text>,
    avgRating: <Text>{b?.avgRating}</Text>,
    Available: <Text>{b?.isAvailable? 'Available' : 'Unavailable'}</Text>,
    actions: (
      <ButtonGroup>
        <Button
          colorScheme="yellow"
            onClick={() => {
              fetchReservations(b?.id);
              onViewOpen()
          }}
          size="sm"
        >
          <Icon as={CalendarIcon} fontSize="20" />
        </Button>
        <Button
          colorScheme="green"
          onClick={() => {
            onEditOpen();
            setBikeId(b?.id);
            setBike({ ...bike, ['model']: b?.model, ['color'] : b?.color,  ['location'] : b?.location,  ['isAvailable'] : b?.isAvailable})
          }}
          size="sm"
        >
          <Icon as={EditIcon} fontSize="20" />
        </Button>
        <Button
          colorScheme="red"
          onClick={() => {
            setBikeId(b?.id);
            removeBike()
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
      Header: "Created By UserId",
      accessor: "userId"
    },
    {
      Header: "Model",
      accessor: "model"
    },
    {
      Header: "Color",
      accessor: "color"
    },
    {
      Header: "Location",
      accessor: "location"
    },
    {
      Header: "Avg Rating",
      accessor: "avgRating"
    },
    {
      Header: "Availablity",
      accessor: "Available"
    },
    {
      Header: "Actions",
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
          Manage Bikes
        </Heading>
        </Box>
      </Center>
      {bikes?.items?.length > 0 ? (
        <Center>
          <Box mt="6">
            <Table
                colorScheme="blue"
                emptyData={{
                icon: FiUser,
                text: "You have no Reservations."
                }}
                totalRegisters={bikes?.items?.length}
                page={page}
                onPageChange={(page) => setPage(page)}
                columns={tableColumns}
                data={tableData}
            />
          </Box>
        </Center>
        ) : (<Text>You have no Reservations.</Text>)}
        
        <Drawer
            isOpen={isEditOpen}
            placement='right'
            onClose={onEditClose}
            initialFocusRef={firstField}
            size='lg'
        >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton onClick={() => { 
                onEditClose(); 
                setBike({
                    model: "",
                    color: "",
                    location: "",
                    isAvailable: '',
                })
                setBikeId('')}}/>
          <DrawerHeader>Edit Bike</DrawerHeader>

          <DrawerBody>
            <Stack spacing='24px'>
              <Box>
                <FormLabel>Model</FormLabel>
                <Input
                    required
                    ref={firstField}
                    id="model"
                    type='text'
                    name="model"
                    value={bike?.model}
                    autoFocus
                    onChange={handleChange}/>
              </Box>

              <Box>
                <FormLabel>Color</FormLabel>
                <Input
                    required
                    id="color"
                    type='text'
                    name="color"
                    value={bike?.color}
                    autoFocus
                    onChange={handleChange}/>
              </Box>
              <Box>
                <FormLabel>Location</FormLabel>
                <Input
                    required
                    id="location"
                    type='text'
                    name="location"
                    value={bike?.location}
                    autoFocus
                    onChange={handleChange}/>
              </Box>
              <Box>
                <FormLabel>Availability</FormLabel>
                <Checkbox 
                id="isAvailable"
                name="isAvailable"
                isChecked={bike?.isAvailable}
                onChange={handleChange} />
              </Box>
            </Stack>
          </DrawerBody>

          <DrawerFooter>
            <Button colorScheme='blue' mr={3}
              onClick={() => {
                updateBike();
                onEditClose();
              }}
            >Save</Button>
            <Button variant='outline'
              onClick={() => { 
                onEditClose(); 
                setBike({
                    model: "",
                    color: "",
                    location: "",
                    isAvailable: '',
                })
                setBikeId('')
            }}>
              Cancel
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
      {reservationList}
    </>
    )
})

export default ManageBikes;