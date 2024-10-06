import { Box, Button, Container, Heading, Input, useColorModeValue, VStack, useToast } from "@chakra-ui/react";
import { useState } from "react";
import { productStore } from "../store/product"; // this is called super sate we can use any component we want the same stae we do not need to create the same state in the different component we just use the zustand.


const CreatePage = () => {
	const [newProduct, setNewProduct] = useState({
		name: "",
		price: "",
		image: "",
	});

const toast = useToast();

const { createProduct } = productStore(); 

const handleAddProduct = async () => {
	const {success,message} = await createProduct(newProduct);
	if(!success){
		toast({
			title: "Error",
			description: message,
			isClosable: true,
			duration: 3000,
			status : "error"	
		});
		
	}else {
		toast({
           title : "Success",
		   description : message,
		   isClosable : true,
		   duration : 3000,
		   status : "success"
		});

	}
	setNewProduct({name : "", price: "", image: ""});
	
} 	
	
	return (
		<Container maxW={"container.sm"}>
			<VStack spacing={8}>
				<Heading as={"h1"} size={"2xl"} textAlign={"center"} mb={8}>
					Create New Product
				</Heading>

				<Box w={"full"} bg={useColorModeValue("white", "gray.800")} p={6} rounded={"lg"} shadow={"md"}>
					<VStack spacing={4}>
						<Input
							placeholder='Name'
							name='name'
							value={newProduct.name}
							onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
						/>
						<Input
							placeholder='Price'
							name='price'
							type="number"
							value={newProduct.price}
							onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
						/>
						<Input
							placeholder='URL'
							name='image'
							value={newProduct.image}
							onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
						/>

						<Button colorScheme='blue' onClick={handleAddProduct} w='full'>
							Add Product
						</Button>
					</VStack>
				</Box>
			</VStack>
		</Container>
	);
};
export default CreatePage;