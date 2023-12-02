
import { Box, Flex, HStack, Heading, LinkBox,Stack, Text,Image,Skeleton, LinkOverlay } from "@chakra-ui/react"
import NextLink from 'next/link'

const BlogSection = () => {
    const posts=[{id:'1'
,        title:'Fitness Recipes: Healthy Food for any workout',intro:'',content:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto qui saepe rerum pariatur nemo facilis quam incidunt laudantium iure officia. Itaque impedit iste nemo facere, temporibus ab quasi qui quas!',image:'/images/fruit.jpg'
    },{id:'2',
        title:'This may be the untold secret to longetivity',intro:'',content:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto qui saepe rerum pariatur nemo facilis quam incidunt laudantium iure officia. Itaque impedit iste nemo facere, temporibus ab quasi qui quas!',image:'/images/fruit.jpg'
    },{id:'3',
        title:'Walking leads to longer life, better outcomes.',intro:'',content:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto qui saepe rerum pariatur nemo facilis quam incidunt laudantium iure officia. Itaque impedit iste nemo facere, temporibus ab quasi qui quas!',image:'/images/fruit.jpg'
    }]
  return (
    <Box as="section" my={12}>
        <Heading textTransform={'uppercase'} color={'primaryColor.800'} size={'2xl'} my={6} textAlign={'center'}>Our Blog</Heading>
<HStack wrap={'wrap'} gap={4} maxW={'1100px'} mx={'auto'} my={6} py={4} px={{base:3,lg:0}}>

    {posts.length && posts.map((post)=><LinkBox key={post?.id} _hover={{bg:'white',shadow:'md'}}  display={'flex'} flexDir={'column'} gap={'2'} maxW={'350px'}  rounded={'md'} p={'2'} pb={4}>
    <Image alt="" src={'/images/fruit.jpg'} objectFit={'cover'} rounded={'inherit'} placeholder="blur" w={'full'} h={200} />
    <LinkOverlay href={'#'} as={NextLink}>
        <Heading as={'h3'} size={'md'} color={'primaryColor.800'}> {post?.title}</Heading>
    </LinkOverlay>
    <Text>
    {post?.intro ? post?.intro : post?.content}
    </Text>
</LinkBox>)} 

</HStack>
    </Box>
  )
}

export default BlogSection