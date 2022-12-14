import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link  } from 'react-router-dom';
import { toast } from 'react-toastify';
import { login, reset } from '../features/auth/authSlice';
import Spinner from '../components/Spinner';
import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Image,
  FormErrorMessage,
} from '@chakra-ui/react';

const Login = React.memo(() => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    })

    const { email, password } = formData;
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

    const handleChange = (e) => { setFormData((prevState) =>({...prevState, [e.target.name]: e.target.value }))}
    const handleSubmit = (e) => {
        e.preventDefault()
        const userData = {
                email,password
        }
        
        if(userData.email!=='' && userData.password!=='')
            dispatch(login(userData))
        else toast.error('credentials must be provided')
    }
    
    if (isLoading) {
        return <Spinner/>
    }

  return (
    <>
     <Stack minH={'91vh'} direction={{ base: 'column', md: 'row' }}>
      <Flex p={8} flex={1} align={'center'} justify={'center'}>
        <Stack spacing={5} w={'full'} maxW={'md'}>
          <Heading fontSize={'2xl'} pb={5}>Sign in to your account</Heading>
          <FormControl id="email" isInvalid={email === ''}>
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
              <FormErrorMessage>Email is required.</FormErrorMessage>
          </FormControl>
          <FormControl id="password" isInvalid={password === ''}>
            <FormLabel>Password</FormLabel>
            <Input 
              required
              name="password"
              value={password}
              type="password"
              id="password"
              onChange={handleChange} />
              <FormErrorMessage>Password is required.</FormErrorMessage>
          </FormControl>
          <Stack spacing={6}>
            <Stack
              direction={{ base: 'column', sm: 'row' }}
              align={'start'}
              justify={'space-between'}>
              <Link to="/register" style={{textDecoration: 'none', color:'#3182CE', fontSize: 'xl'}}>{"Don't have an account? Sign Up"}</Link>
            </Stack>
            <Button disabled={formData?.email === '' || formData?.password === ''}
            type="submit" colorScheme={'blue'} variant={'solid'} onClick={handleSubmit} p={4}>
              Sign in
            </Button>
          </Stack>
        </Stack>
      </Flex>
      <Flex flex={1}>
        <Image
          alt={'Login Image'}
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

export default Login