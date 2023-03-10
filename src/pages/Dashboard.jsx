import React, {useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Spinner from '../components/Spinner';
import { toast } from 'react-toastify';
import { getAllBikes, getAllBikesAdmin } from '../features/bike/bikeSlice';
import { Container, Wrap, WrapItem, VStack, Center,Modal, Button, ButtonGroup, useDisclosure,
  ModalOverlay,
  ModalContent, Text,
 } from '@chakra-ui/react';
import ReactPaginate from 'react-paginate';
import BikeCard from '../components/BikeCard';
import Filter from '../components/Filter';
import './pagination.css';

import {ArrowLeftIcon, ArrowRightIcon } from '@chakra-ui/icons';

const Dashboard = React.memo(() => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { user } = useSelector((state) => state.auth)
  const { isLoading, isError, message } = useSelector((state) => state.bike)
  const [limit, setLimit] = useState(2);
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState({
    model: "",
    color: "",
    location: "",
    avgRating: "",
  });
  
  useEffect(() => {
    if (!user) {
      navigate('/login')
    }

    if (isError) {
      toast.error(message)
    }
    
    // if(user?.userRole !== 'ADMIN')
    //   dispatch(getAllBikes({ limit, page, filter }))
    // else dispatch(getAllBikesAdmin({ limit, page, filter }))
    // dispatch, filter, limit, page
    
    applyFilters();

  }, [user, navigate, isError , message, page, limit])

  const { bikes } = useSelector((state) => state.bike)

  const handlePageClick = async (data) => {
    setPage(data?.selected + 1);
  };
 
  console.log(user)

  const applyFilters = async () => {
    if(user?.userRole !== 'ADMIN')
      dispatch(getAllBikes({ limit, page, filter }))
    else dispatch(getAllBikesAdmin({ limit, page, filter }))
  }

  if (isLoading) {
    return <Spinner />
  }

  return (
    <>
      <Center p={10}><Button bg='green.300' onClick={onOpen}>Show Filters</Button></Center>
      <Modal isOpen={isOpen} onClose={() => { onClose(); applyFilters();}} isCentered size={'2xl'}>
        <ModalOverlay
          bg='none'
          backdropFilter='auto'
          backdropInvert='80%'
          backdropBlur='2px'/>
        <ModalContent>
          <Filter
          filter={filter}
          setFilter={setFilter}/>
          <Center p={5}>
            <ButtonGroup gap='4'>
              <Button colorScheme='blue' variant='solid' mr={3} onClick={() => { onClose(); applyFilters();}}>
                Apply Filters
              </Button>
              <Button variant='outline'
                onClick={async() => {
                  await setFilter({
                    model: "",
                    color: "",
                    location: "",
                    avgRating: "",
                  }).then(async() => { applyFilters(); onClose(); })
                }}>Clear Filters</Button>
            </ButtonGroup>
          </Center>
        </ModalContent>
      </Modal>
      <VStack>
      {bikes?.items?.length!==0 ? (<Wrap spacing={8}>
        {bikes?.items?.map((bike, i) => {
          return (<WrapItem><BikeCard bike={bike} key={bike?.id}/></WrapItem>);
        })}
      </Wrap>) : (<Text>There are no Bikes at the moment</Text>)}
      
    </VStack>
    <Container centerContent p={10}>
      {bikes?.items?.length!==0 ? 
      (<ReactPaginate
        breakLabel="..."
        previousLabel={<ArrowLeftIcon style={{ fontSize: 18, width: 50 }} />}
        nextLabel={<ArrowRightIcon style={{ fontSize: 18, width: 50 }}/>}
        onPageChange={handlePageClick}
        pageRangeDisplayed={10}
        containerClassName={"pagination"}
        previousLinkClassName={"pagination__link"}
        nextLinkClassName={"pagination__link"}
        disabledClassName={"pagination__link--disabled"}
        activeClassName={"pagination__link--active"}
        pageCount={bikes?.meta?.totalPages}
        renderOnZeroPageCount={null}
          />)
          :
          <>
            <Text>There are no Bikes at the moment</Text>
          </>}
    </Container>
    </>
  )
})

export default Dashboard