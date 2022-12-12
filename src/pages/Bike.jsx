import React, {useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useParams, useNavigate } from "react-router-dom";
import { getBike } from '../features/bike/bikeSlice';
import { toast } from 'react-toastify';
import {
  Flex,
  Heading,
  Text,
} from "@chakra-ui/react"

const Bike = React.memo(() => {
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const params = useParams();
    const { user } = useSelector((state) => state.auth)
    const { isLoading, isError, message } = useSelector((state) => state.bike)
    const [bike, setBike] = useState({
        model: "",
        color: "",
        location: "",
        avgRating: "",
        isAvailable: "",
    });

    useEffect(() => {
    if (!user) {
      navigate('/login')
    }

    if (isError) {
      toast.error(message)
    }
    
    dispatch(getBike(params?.bikeId))

    }, [user, navigate, isError, dispatch, message])

    const { bikes } = useSelector((state) => state.bike)
    
    return (
        <>
         {params.bikeId}
        </>
    )
})

export default Bike;