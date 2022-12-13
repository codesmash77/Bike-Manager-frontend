import React from 'react';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    Flex,
    Avatar,
    Text,
    Box,
    Center,
} from '@chakra-ui/react';
import { Table } from "react-chakra-pagination";
import { FiUser } from "react-icons/fi";

export default function useReserveModal(reservations, onClose, isOpen) {
    const [page, setPage] = React.useState(1);

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
  ];

    return (
     <Modal onClose={onClose} size={'full'} isOpen={isOpen}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Reservations List</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
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
                ) : (<Text>There are no Reservations for this bike/user .</Text>)}
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    )
}