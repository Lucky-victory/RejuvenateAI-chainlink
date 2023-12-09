'use client';

import DashboardSideBar from '@/components/dashboard-sidebar';
import {
  Td,
  Box,
  Button,
  Flex,
  Heading,
  Table,
  TableContainer,
  Tbody,
  Text,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';

import { format } from 'date-fns';
import AdminDashBoardLayout from '../layout';
export default function DashBoard() {
  const today = new Date().getTime();
  return (
    <AdminDashBoardLayout>


    <Box className='min-h-full h-full px-4 mt-6'>
      <Flex align={'center'} justify={'space-between'}>
        <Flex align={'center'} gap={6}>
          <Heading size={'lg'} className='text-primaryGreen'>
          Communities
          </Heading>{' '}
          <Text
            className='bg-primaryGreen text-white rounded-full py-1 px-4 '
            fontSize={'sm'}
            fontWeight={'semibold'}
          >
            {format(today, 'E, d MMM yyyy')}
          </Text>
        </Flex>
        <Button className='bg-primaryGreen text-primaryBeige hover:bg-primaryYellowTrans hover:text-primaryGreen'>
          Create a Community
        </Button>
      </Flex>

      <TableContainer my={6}>
        <Table>
          <Thead bg={'white'} className='mb-4'>
            <Tr>
              <Th>Time</Th>
              <Th>Meal Name</Th>
              <Th>Details</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr bg={'white'} rounded={'md'} my={4}>
              <Td>Breakfast</Td>
              <Td>Bread with Chocolate</Td>
              <Td minW={'300'} maxW={400}>
                Bread and chocolate is a great choice...
              </Td>
              <Td>
                <Flex gap={2}>
                  <Button
                    size={'sm'}
                    variant={'outline'}
                    rounded={'full'}
                    className='text-primaryGreen'
                  >
                    View
                  </Button>
                  <Button
                    size={'sm'}
                    variant={'outline'}
                    rounded={'full'}
                    className='text-primaryGreen'
                  >
                    Edit
                  </Button>
                </Flex>
              </Td>
            </Tr>
            <Tr bg={'white'} rounded={'md'} my={4}>
              <Td>Lunch</Td>
              <Td>Fried Rice and Chicken</Td>
              <Td minW={'200px'} maxW={350}>
                Fried Rice and Chicken is a great choice...
              </Td>
              <Td>
                <Flex gap={2}>
                  <Button
                    size={'sm'}
                    variant={'outline'}
                    rounded={'full'}
                    className='text-primaryGreen'
                  >
                    View
                  </Button>
                  <Button
                    size={'sm'}
                    variant={'outline'}
                    rounded={'full'}
                    className='text-primaryGreen'
                  >
                    Edit
                  </Button>
                </Flex>
              </Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
    </AdminDashBoardLayout>

  );
}
