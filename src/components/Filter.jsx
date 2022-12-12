import React from 'react';
import { HStack, VStack, Box, Input, Container, RangeSlider,
  RangeSliderTrack,
  RangeSliderFilledTrack,
  RangeSliderThumb, Text, } from '@chakra-ui/react'

const Filter = React.memo(({ filter, setFilter }) => {

    const handleSearch = (e) => {
        setFilter((prevState) => ({ ...prevState, [e.target.name]: e.target.value }))
    }
    
  return (
    <Container p={10}>
    <VStack spacing={5}>
        <HStack spacing={5}>
            <Box>
                <Input name="model" value={filter?.model} variant='outline' placeholder='search model' onChange={handleSearch} />
            </Box>
            <Box>
                <Input name="color" value={filter?.color} variant='outline' placeholder='search color' onChange={handleSearch}/>
            </Box>
        </HStack>
        <HStack spacing={5} minH={'-webkit-fit-content'}>
            <Box>
                <Input name="location" value={filter?.location} variant='outline' placeholder='search location' onChange={handleSearch}/>
            </Box>
            <Box>
                <Text>Select AvgRating</Text>
                <RangeSlider minW='100%' defaultValue={[filter?.avgRating]} min={1} max={5} step={1} onChangeEnd={(val) => setFilter((prevState) => ({ ...prevState, ['avgRating']: val }))}>
                <RangeSliderTrack bg='red.100'>
                    <RangeSliderFilledTrack bg='tomato' />
                </RangeSliderTrack>
                <RangeSliderThumb boxSize={6} index={0} />
                </RangeSlider>
            </Box>
        </HStack>
    </VStack>
    </Container>
  )
})

export default Filter