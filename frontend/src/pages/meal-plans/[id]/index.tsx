import MarkdownRenderer from "@/components/MarkdownRenderer";
import { useAppContext } from "@/context/state";
import { MealPlan } from "@/types/shared";
import { Box, Image, Stack, Text } from "@chakra-ui/react";



const MealPlansPage = () => {
    const {selectedMealPlan}=useAppContext();
    const handleAddMealPlan=(plan:MealPlan)=>{

    }
  return (
   <Box className="bg-primaryBeige" >
    <Stack direction={'row'} px={{lg:6,base:4}} py={8} wrap={'wrap'} spacing={{base:4,lg:6}} mx={'auto'} maxW={1200} bg={'gray.100'}>
<Box>

</Box>
<Box h={'150px'} bg={'gray.200'} roundedTop={'md'} overflow={'hidden'} pos={'relative'}>
    <Box pos={'absolute'} roundedRight={'md'} left={0} bottom={0} bg={'primaryColor.700'} color={'white'} px={3} py={2}>
<Text as={'span'} fontWeight={'bold'}>{selectedMealPlan?.time}</Text>
    </Box>
<Image h={'full'} w={'full'} src="/images/meal-plan.jpg"/>
</Box>
<Box>
    <MarkdownRenderer markdown=""/>
</Box>
    </Stack>
|</Box>
        )}