import React, { useState } from 'react';
import { Box, useColorModeValue, Text, Image, HStack, Heading, IconButton, useToast, VStack, Input} from '@chakra-ui/react';
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { productStore } from "../store/product.js";
import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	ModalCloseButton,
	useDisclosure,
	Button,
  } from '@chakra-ui/react'

const  ProductCard = ({product}) => {
	const [updatedProduct, setUpdatedProduct] = useState(product);
	const { isOpen, onOpen, onClose } = useDisclosure();

    const textColor = useColorModeValue("gray.600", "gray.200");
	const bg = useColorModeValue("white", "gray.800");

  const {deleteProduct , updateProduct } = productStore();
  const toast = useToast();

	const handleProduct = async (pid) => {
       const {success,message} = await deleteProduct(pid);
	   if(!success){
		toast({
			title: "Error",
			description: message,
			status: "error",
			duration: 3000,
			isClosable: true,
		});
	   }else{
		toast({
			title: "Success",
			description: message,
			status: "success",
			duration: 3000,
			isClosable: true,
		});
	   }
	   
	}

const handleUpdateProduct = async (pid,updatedProduct) => {
  const {success,message} = await updateProduct(pid,updatedProduct);
  onClose();
  if(!success){
	toast({
		title: "Error",
		description: message,
		status: "error",
		duration: 3000,
		isClosable: true,
	});
  }else {
	toast({
		title: "Success",
		description: message,
		status: "success",
		duration: 3000,
		isClosable: true,
	});
  }

}	
 return (
    <Box
			shadow='lg'
			rounded='lg'
			overflow='hidden'
			transition='all 0.3s'
			_hover={{ transform: "translateY(-5px)", shadow: "xl" }}
			bg={bg}
		>
			<Image src={product.image} alt={product.name} h={48} w='full' objectFit='cover' />

			<Box p={4}>
				<Heading as='h3' size='md' mb={2}>
					{product.name}
				</Heading>

				<Text fontWeight='bold' fontSize='xl' color={textColor} mb={4}>
					${product.price}
				</Text>

				<HStack spacing={2}>
					<IconButton icon={<EditIcon />}
					onClick={onOpen}
					 colorScheme='blue' />
					<IconButton
						icon={<DeleteIcon />}
						onClick={()=>handleProduct(product._id)}
						colorScheme='red'
					/>
				</HStack>
			</Box>

			<Modal isOpen={isOpen} onClose={onOpen}>
				<ModalOverlay />
				<ModalContent >
					<ModalHeader >Update Product </ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<VStack spacing={4} >
							<Input
							placeholder='Product name'
							name='name'
							value={updatedProduct.name}
							onChange={(e) => setUpdatedProduct({ ...updatedProduct, name: e.target.value })}
							 />

							 <Input 
							 placeholder='Product Price'
							 name='price'
							 type='number'
							 value={updatedProduct.price}
							 onChange={(e)=>setUpdatedProduct({...updatedProduct,price : e.target.value})}
							 
							 />

							 <Input 
							 placeholder='Product URL'
							 name='image'
							 value={updatedProduct.image}
							 onChange={(e)=>setUpdatedProduct({...updatedProduct,image:e.target.value})}
							 
							 />
							 
						</VStack>
					</ModalBody>

					<ModalFooter>
					<Button
							colorScheme='blue'
							mr={3}
							onClick={() => handleUpdateProduct(product._id, updatedProduct)}
						>
							Update
						</Button>
						<Button variant='ghost' onClick={onClose}>
							Cancel
						</Button>
					</ModalFooter>
				</ModalContent>

			</Modal>


        </Box>
		
 )
}
export default ProductCard;