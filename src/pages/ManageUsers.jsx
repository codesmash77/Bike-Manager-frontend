import React, {useEffect, useState, useRef} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import Spinner from '../components/Spinner';
import { toast } from 'react-toastify';
import authService from '../features/auth/authService';
import reservationService from '../features/reservation/reservationService';
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
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";

import { FiTrash2, FiUser } from "react-icons/fi";
import { EditIcon, CalendarIcon, ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { Table } from "react-chakra-pagination";
import useBackButton from '../hooks/useBackButton';
import useReserveModal from '../hooks/useReserveModal';

const ManageUsers = React.memo(() => {
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const backButton = useBackButton();
    const { user, isError, message, isLoading } = useSelector((state) => state.auth)
    const [users, setUsers] = useState([])
    const [page, setPage] = useState(1);
    const [userData, setUserData] = useState({
        username: '',
        email: '',
        password: '',
    })

    const firstField = useRef()

    const [userId, setUserId] = useState('');
    const [sendRequest, setSendRequest] = useState(false);
    const [reservations, setReservations] = useState([])

    const { isOpen: isEditOpen , onOpen: onEditOpen, onClose: onEditClose  } = useDisclosure()
    const { isOpen: isViewOpen, onOpen: onViewOpen, onClose: onViewClose } = useDisclosure()
    const reservationList = useReserveModal(reservations, onViewClose, isViewOpen)

  useEffect(() => {
    if (!user) {
      navigate('/login')
    }

    if (isError) {
      toast.error(message)
    }

    if (sendRequest) {
      
    }
    fetchUsers()

  }, [user, navigate, isError, message, dispatch, sendRequest])
    
    const fetchReservations = async (id) => {
        const res = await reservationService.getReservationByUser(id, user?.access_token)
        setReservations(res)
        console.log(reservations)
    }
    
    const fetchUsers = async () => {
        const res = await authService.getUsers(user?.access_token)
        setUsers(res)
    }

    const [show, setShow] = React.useState(false)
    const handleClick = () => setShow(!show)

    const updateUser = async () => {
        const res = await authService.update(userId, userData, user?.access_token)
        if (res.request.status === 200) {
            setUserData({
                    username: '',
                    email: '',
                    password: '',
                })
            setUserId('')
            toast.success('User successfully updated!')
        }
        else toast.error('Could not update user unfortunately')
        setSendRequest(!sendRequest)
    }

    const removeUser = async () => {
        const res = await authService.deleteUser(userId, user?.access_token)
        setUserId('')
        setSendRequest(!sendRequest)
    }

    const handleChange = (e) => { setUserData((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));}

    const tableData = users?.map((u) => ({
    userId: <Text>{u?.id}</Text>,
    username: (
      <Flex align="center">
        <Avatar name={u?.username}
          src={`https://avatars.dicebear.com/api/bottts/:${u?.username}.svg`}
          size="sm" mr="4" />
        <Text>{u?.username}</Text>
      </Flex>
    ),
    email: <Text>{u?.email}</Text>,
    role: <Text>{u?.role}</Text>,
    actions: (
      <ButtonGroup>
        <Button
          colorScheme="yellow"
            onClick={() => {
              fetchReservations(u?.id);
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
            setUserId(u?.id);
            setUserData({ ...userData, ['username']: u?.username, ['email']: u?.email, ['password']: u?.password})
          }}
          size="sm"
        >
          <Icon as={EditIcon} fontSize="20" />
        </Button>
        <Button
          colorScheme="red"
          onClick={() => {
            setUserId(u?.id);
            removeUser()
          }}
          disabled={u?.id === user.userId}
          size="sm"
        >
        <Icon as={FiTrash2} fontSize="20" />
        </Button>
      </ButtonGroup>
    )
  }));
  
  const tableColumns = [
    {
      Header: "UserId",
      accessor: "userId"
    },
    {
      Header: "Username",
      accessor: "username"
    },
    {
      Header: "Email",
      accessor: "email"
    },
    {
      Header: "Role",
      accessor: "role"
    },
    {
      Header: "Action",
      accessor: "actions"
    }
  ];

  if (isLoading) {
    return <Spinner />
  }

  return(
    <>
      {backButton}
      <Center>
        <Box p="12">
        <Heading size="sm" as="h3">
          Manage Users
        </Heading>
        </Box>
      </Center>
      {users?.length > 0 ? (
        <Center>
        <Box mt="6">
          <Table
            colorScheme="blue"
            emptyData={{
              icon: FiUser,
              text: "You have no Reservations."
            }}
            totalRegisters={users?.length}
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
                setUserData({
                    username: '',
                    email: '',
                    password: '',
                })
                setUserId('')
            }}/>
          <DrawerHeader>Edit user</DrawerHeader>

          <DrawerBody>
            <Stack spacing='24px'>
              <Box>
                <FormLabel>Username</FormLabel>
                <Input
                    required
                    ref={firstField}
                    id="username"
                    type='text'
                    name="username"
                    value={userData?.username}
                    autoFocus
                    onChange={handleChange}/>
              </Box>

              <Box>
                <FormLabel>Email</FormLabel>
                <Input
                    required
                    id="email"
                    type='text'
                    name="email"
                    value={userData?.email}
                    autoFocus
                    onChange={handleChange}/>
              </Box>
              <Box>
                <FormLabel>Password</FormLabel>
                <InputGroup size='md'>
                    <Input
                        required
                        id="password"
                        type={show ? 'text' : 'password'}
                        name="password"
                        value={userData?.password}
                        autoFocus
                        onChange={handleChange}/>
                    <InputRightElement width='4.5rem'>
                        <Button h='1.75rem' size='sm' onClick={handleClick}>
                        {show ? <ViewIcon/> : <ViewOffIcon/>}
                        </Button>
                    </InputRightElement>
                </InputGroup>
              </Box>
            </Stack>
          </DrawerBody>

          <DrawerFooter>
            <Button colorScheme='blue' mr={3}
              onClick={() => {
                updateUser();
                onEditClose();
              }}
            >Save</Button>
            <Button variant='outline'
              onClick={() => { 
                onEditClose(); 
                setUserData({
                    username: '',
                    email: '',
                    password: '',
                })
                setUserId('')
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

export default ManageUsers;