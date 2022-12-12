import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { register, reset } from '../features/auth/authSlice';
import Spinner from '../components/Spinner'

import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Image,
} from '@chakra-ui/react';

const Register = React.memo(() => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    })

    const { name, email, password, confirmPassword } = formData;

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { user, isLoading, isError, isSuccess, message } = useSelector(
        (state) => state.auth
    )

    useEffect(() => {
        if (isError) {
            toast.error(message)
        }
        if (isSuccess || user) {
            navigate('/')
        }

        dispatch(reset())

    },[user, isError, isSuccess, message, navigate, dispatch])

    const handleChange = (e) => { setFormData((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));}
    const handleSubmit = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            toast.error('Passwords do not match')
        }
        else {
            const userData = {
                name,email,password
            }
            dispatch(register(userData))
        }
    }

    if (isLoading) {
        return <Spinner/>
    }

  return (
    <>
    <Stack minH={'91vh'} direction={{ base: 'column', md: 'row' }}>
      <Flex p={8} flex={1} align={'center'} justify={'center'}>
        <Stack spacing={4} w={'full'} maxW={'md'}>
          <Heading fontSize={'2xl'} pb={5}>Sign Up Now!</Heading>
          <FormControl id="name">
            <FormLabel>Username</FormLabel>
            <Input
              required
              id="name"
              type='text'
              name="name"
              value={name}
              autoComplete="name"
              autoFocus
              onChange={handleChange}/>
          </FormControl>
          <FormControl id="email">
            <FormLabel>Email address</FormLabel>
            <Input 
              type="email" 
              required
              id="email"
              name="email"
              value={email}
              autoComplete="email"
              autoFocus
              onChange={handleChange} />
          </FormControl>
          <FormControl id="password">
            <FormLabel>Password</FormLabel>
            <Input 
              required
              name="password"
              value={password}
              type="password"
              id="password"
              onChange={handleChange} />
          </FormControl>
          <FormControl id="confirmPassword">
            <FormLabel>Confirm Password</FormLabel>
            <Input 
              required
              name="confirmPassword"
              value={confirmPassword}
              type="password"
              id="confirmPassword"
              onChange={handleChange}/>
          </FormControl>
          <Stack spacing={6}>
            <Stack
              direction={{ base: 'column', sm: 'row' }}
              align={'start'}
              justify={'space-between'}>
              <Link to="/login" style={{textDecoration: 'none', color:'#3182CE', fontSize: 'xl'}}>{"Already have an account? Sign In"}</Link>
            </Stack>
            <Button disabled={formData?.name === '' || formData?.email === '' || formData?.password === '' || formData?.confirmPassword === ''}
                type="submit" colorScheme={'blue'} variant={'solid'} onClick={handleSubmit} p={4}>
              Register
            </Button>
          </Stack>
        </Stack>
      </Flex>
      <Flex flex={1}>
        <Image
          alt={'Signup Image'}
          objectFit={'cover'}
          src={
            'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1352&q=80'
          }
        />
      </Flex>
    </Stack>
    </>
  )
})

export default Register