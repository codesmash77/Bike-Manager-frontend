import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout, reset } from '../features/auth/authSlice';
import {
  Flex,
  Box,
  Avatar,
  Stack,
  Text,
  Popover,
  PopoverTrigger,
  PopoverContent,
  useColorModeValue,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Center,
  Icon,
  Grid,
  GridItem
} from '@chakra-ui/react';
import {
  ChevronRightIcon,
} from '@chakra-ui/icons';

import { ColorModeSwitcher } from '../ColorModeSwitcher';

const DesktopSubNav = ({ label, href, subLabel }) => {
  return (
    <Link
      to={href}
      role={'group'}
      display={'block'}
      p={2}
      rounded={'md'}
      style={{fontSize:'m',
              fontWeight:'500',
              color: useColorModeValue('gray.600', 'gray.200'),
              rounded:'md',
              display:'block',}}>
      <Stack direction={'row'} align={'center'}>
        <Box>
          <Text
            transition={'all .3s ease'}
            _groupHover={{ color: 'pink.400' }}
            fontWeight={500}>
            {label}
          </Text>
          <Text fontSize={'sm'}>{subLabel}</Text>
        </Box>
        <Flex
          transition={'all .3s ease'}
          transform={'translateX(-10px)'}
          opacity={0}
          _groupHover={{ opacity: '100%', transform: 'translateX(0)' }}
          justify={'flex-end'}
          align={'center'}
          flex={1}>
          <Icon color={'pink.400'} w={5} h={5} as={ChevronRightIcon} />
        </Flex>
      </Stack>
    </Link>
  );
};


const Header = React.memo(() => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth)
    const onLogout = () => {
        dispatch(logout())
        dispatch(reset())
        navigate('/')
    }

  const linkColor = useColorModeValue('green.800', 'green.200');
  const popoverContentBgColor = useColorModeValue('white', 'gray.800');
  const NAV_ITEMS = [
        { label: 'Home', href: '/home' },
        { label: 'My Reservations', href: '/myReservations' },
  ]
  const ADMIN_NAV_ITEMS =[
        { label: 'Add Bike', href: '/addBike' },
        { label: 'Manage', href: '#', children: [
      {
        label: 'Users',
        subLabel: 'Manage all Users',
        href: '/manage/users',
      },
      {
        label: 'Bikes',
        subLabel: 'Manage all Bikes',
        href: '/manage/bikes',
      },
    ], }
  ]

    return (
       <Flex
        as="nav"
        bg='transparent'
        backdropFilter="saturate(280%) blur(40px)"
        color={useColorModeValue('gray.600', 'white')}
        minH={'60px'}
        maxH={'60px'}
        py={{ base: 3 }}
        px={{ base: 10 }}
        borderBottom={1}
        borderStyle={'solid'}
        align="center"
        wrap="wrap"
        justify="space-between"
        borderColor={useColorModeValue('gray.200', 'gray.900')}
        justifyContent='center'
        >
        <Grid templateColumns = 'repeat(3, 1fr)' gap = {6} alignContent='center'>
        <GridItem colSpan={1} w={'120%'} alignItems='center' pt={2} pr={5}>
            <Box key='logo'>
                <Link
                  pr={2}
                  role={'group'}
                  to={'/'}
                  style={{fontSize:'m',
                  fontWeight:'600',
                  color: useColorModeValue('black', 'white'),}}>
                  <Text
                    transition={'all .3s ease'}
                    _groupHover={{ color: 'green.400' }}
                    fontWeight={600}>
                    BIKE MANAGER
                  </Text>
                </Link>
            </Box>
        </GridItem>
        <GridItem colSpan={3} w='400%' alignItems='center' pt={2}>
        <Flex alignItems={'center'}>
        {user && NAV_ITEMS.map((navItem) => (
        <Box key={navItem.label} pr={6}>
            <Link
                p={2}
                role={'group'}
                to={navItem.href ?? '#'}
                style={{fontSize:'m',
                    fontWeight:'500',
                    color:{linkColor},}}>
                <Text
                    transition={'all .3s ease'}
                    _groupHover={{ color: 'green.400' }}
                    fontWeight={600}>
                    {navItem.label}
                </Text>
            </Link>
        </Box>
      ))}
      {user?.userRole ==='ADMIN' && ADMIN_NAV_ITEMS.map((navItem) => (
        <Box key={navItem.label} pr={6}>
          <Popover trigger={'hover'} placement={'bottom-start'}>
            <PopoverTrigger>
              <Link
                p={2}
                role={'group'}
                to={navItem.href ?? '#'}
                style={{fontSize:'m',
                    fontWeight:'500',
                    color:{linkColor},}}>
                <Text
                    transition={'all .3s ease'}
                    _groupHover={{ color: 'green.400' }}
                    fontWeight={600}>
                    {navItem.label}
                </Text>
              </Link>
            </PopoverTrigger>

            {navItem.children && (
              <PopoverContent
                border={0}
                boxShadow={'xl'}
                bg={popoverContentBgColor}
                p={4}
                rounded={'xl'}
                minW={'sm'}>
                <Stack>
                  {navItem.children.map((child) => (
                    <DesktopSubNav key={child.label} {...child} />
                  ))}
                </Stack>
              </PopoverContent>
            )}
          </Popover>
        </Box>
      ))}
        </Flex>
        </GridItem>
        <GridItem colEnd={47}>
            <Flex alignItems={'center'} justifyContent={'center'} spacing={7}>
            <ColorModeSwitcher justifySelf="flex-end" mr={4} />
            <Menu>
                <MenuButton
                    as={Button}
                    rounded={'full'}
                    variant={'link'}
                    cursor={'pointer'}
                    minW={0}>
                    {user? (<Avatar
                        size={'sm'}
                        src={`https://avatars.dicebear.com/api/bottts/:${user?.username}.svg`}
                        />): (<Avatar
                        size={'sm'}
                        src={'https://cdn-icons-png.flaticon.com/512/3135/3135715.png'}
                        />)}
                </MenuButton>
                <MenuList alignItems={'center'}>
                    <br />
                    <Center>
                      {user? (<Avatar
                        size={'2xl'}
                        src={`https://avatars.dicebear.com/api/bottts/:${user?.username}.svg`}
                        />): (<Avatar
                        size={'2xl'}
                        src={'https://cdn-icons-png.flaticon.com/512/3135/3135715.png'}
                        />)}
                    </Center>
                    <br />
                    <Center role={'group'}>
                      <Text
                        transition={'all .3s ease'}
                        _groupHover={{ color: 'pink.400', cursor:'pointer' }}>
                        {user?.userName}
                    </Text>
                    </Center>
                    <br />
                    <MenuDivider />
                    {user ?(<><MenuItem><Link
                    p={3}
                    role={'group'}
                    to={`/accountSettings`}
                    style={{fontSize:'m',
                    fontWeight:'500',
                    color:{linkColor},}}>
                    <Text
                      transition={'all .3s ease'}
                      _groupHover={{ color: 'green.400' }}>
                      Account Settings
                  </Text>
                </Link></MenuItem>
                    <MenuItem><Link
                    p={3}
                    role={'group'}
                    onClick={onLogout}
                    style={{fontSize:'m',
                    fontWeight:'500',
                    color:{linkColor},}}>
                    <Text
                      transition={'all .3s ease'}
                      _groupHover={{ color: 'green.400' }}>
                      Logout
                    </Text>
                </Link></MenuItem></>) : (<><MenuItem><Link
                    p={3}
                    role={'group'}
                    to={'/login'}
                    style={{fontSize:'m',
                    fontWeight:'500',
                    color:{linkColor},}}
                    >
                    <Text
                      transition={'all .3s ease'}
                      _groupHover={{ color: 'green.400' }}>
                      Login
                    </Text>
                </Link></MenuItem>
                <MenuItem><Link
                    p={3}
                    role={'group'}
                    to={'/register'}
                    style={{fontSize:'m',
                    fontWeight:'500',
                    color:{linkColor},}}>
                    <Text
                      transition={'all .3s ease'}
                      _groupHover={{ color: 'green.400' }}>
                      Sign Up
                    </Text>
                </Link></MenuItem></>)}
                </MenuList>
            </Menu>
            </Flex>
        </GridItem>
        </Grid>
    </Flex>
  );
})

export default Header