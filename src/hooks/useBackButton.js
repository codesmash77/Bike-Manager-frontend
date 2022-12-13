import { useNavigate } from "react-router-dom";
import { ChevronLeftIcon } from '@chakra-ui/icons';
import {
    Stack,
    Button,
} from '@chakra-ui/react';

export default function useBackButton() {
    const navigate = useNavigate();

    return (
        <Stack p={5} direction='row' align='center'>
            <Button size={'sm'} onClick={() => {navigate(-1);}}>
            <ChevronLeftIcon w={10} h={10} color="green.400"/>
            </Button>
        </Stack>
    )
}