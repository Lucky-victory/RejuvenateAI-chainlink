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
  Tr,Modal,ModalBody,ModalCloseButton,ModalContent,ModalHeader,ModalOverlay, useDisclosure, Stack, FormControl, Input, Select, Textarea, FormLabel, FormHelperText, HStack
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { format } from 'date-fns';
import NutritionistDashBoardLayout from '../layout';
import { useState } from 'react';


export default function DashBoard() {
  const today = new Date().getTime();
const {isOpen,onClose,onOpen}=useDisclosure();
const [isSubmitting,setIsSubmitting]=useState(false)
const [formData,setFormData]=useState({title:'',time:'',details:''})

  // form validation rules
  const validationSchema = Yup.object().shape({
    title: Yup.string().required('Field is required'),
    time: Yup.string().required('Field is required'),
    details: Yup.string().required('Field is required')
    
  });
  const formOptions = { resolver: yupResolver(validationSchema) };

  // get functions to build form with useForm() hook
  const { register, handleSubmit, formState } = useForm(formOptions);
  const { errors, isValid} = formState;
  const onValidSubmit=(data:any)=>{
if(isValid){
setFormData((prev)=>({...prev,...data}))

setTimeout(()=>{

  onClose()
},3000)
}
  }
  return (
    <NutritionistDashBoardLayout>

<Modal isOpen={isOpen} onClose={onClose} size={'lg'} closeOnOverlayClick={false}>
<ModalOverlay/>
  <ModalContent>

<ModalHeader>
  <Heading as='h3' size='lg'> Add a New Plan</Heading>
</ModalHeader>
  <ModalCloseButton />

<ModalBody mb={5}>

  <FormControl as={'form'} onSubmit={handleSubmit(onValidSubmit)}>
    <Stack spacing='2'>

    <Box>
<FormLabel htmlFor='meal-title'>Meal Title</FormLabel>
    <Input id={'meal-title'}  placeholder='Meal Title' {...register('title')} />
    <Text my={2} color='red.600'>{errors.title?.message}</Text>
    </Box>
    <Box>

      <FormLabel htmlFor='meal-time'>Choose Meal Time</FormLabel>
    <Select id='meal-time' defaultValue={''} {...register('time')} >
      <option value="" disabled></option>
      <option value="breakfast">Breakfast</option>
      <option value="lunch">Lunch</option>
      <option value="dinner">Dinner</option>
    </Select>
    <Text my={2} color='red.600'>{errors.time?.message}</Text>

    </Box>

<Box>
  <HStack justify={'space-between'} mb={2}>

<FormLabel htmlFor='meal-details'>Details about this Meal:</FormLabel><Text color={'gray.500'} as={'em'} fontSize={'small'}>*markdown supported*</Text>
  </HStack>
    <Textarea minH={120} maxH={250} id='meal-details' {...register('details')} placeholder='Write a well detailed information about this meal...'>

    </Textarea>
    <Text my={2} color='red.600'>{errors.details?.message}</Text>

</Box>
<Button type='submit' mt={3} isLoading={isSubmitting}>Create Plan</Button>
    </Stack>
  </FormControl>

</ModalBody>
  </ModalContent>
</Modal>
    <Box className='min-h-full h-full px-4 mt-6'>
      <Flex align={'center'} justify={'space-between'}>
        <Flex align={'center'} gap={6}>
          <Heading size={'lg'} className='text-primaryGreen'>
            Meal Plans
          </Heading>{' '}
          <Text
            className='bg-primaryGreen text-white rounded-full py-1 px-4 '
            fontSize={'sm'}
            fontWeight={'semibold'}
          >
            {format(today, 'E, d MMM yyyy')}
          </Text>
        </Flex>
        <Button onClick={onOpen} className='bg-primaryGreen text-primaryBeige hover:bg-primaryYellowTrans hover:text-primaryGreen'>
          Create Meal Plan
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
    
    </NutritionistDashBoardLayout>

  );
}
