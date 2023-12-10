'use client';
import Icon from '@/components/Icon';
// Import Push SDK & Ethers
import { PushAPI, CONSTANTS } from '@pushprotocol/restapi';
import {
  usePushProtocolContext,
  PushProtocolProvider,
} from '@/context/pushContext';
import { ENV } from '@pushprotocol/socket/src/lib/constants';
import { ethers } from 'ethers';
import { Community } from '@/types/state';
import { format } from 'date-fns';
import { formatPushDIDForFrontEnd, formatEtherAddressFromPushDID } from '@/utils/format';
import { useAccount, useWalletClient, useConnect, useNetwork,  type WalletClient} from 'wagmi';
import { useEthersSigner, walletClientToSigner } from '@/hooks/useEthersSigner';
import {
  Avatar,
  Box,
  Button,
  Flex,
  HStack,
  Heading,
  Input,
  Stack,
  StackDivider,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from '@chakra-ui/react';
import BoringAvatars from 'boring-avatars';
import { KeyboardEvent, useEffect, useState } from 'react';
import { MdChat, MdEvent, MdViewAgenda } from 'react-icons/md';
import { formatChatTimestamp, maskHexAddress } from '@/helpers/prompt';
import { initialize } from 'next/dist/server/lib/render-server';
// import { randomUUID } from 'crypto';

type ChatMessages = {
  id: string;
  content: string;
  userAddress: string;
  fullname: string;
  timestamp: Date | number;
};

async function getCommunity(id: any) {}

//I am supposed to link to individual community pages from here
export default function CommunityViewPage({ params }: { params: any }) {
  //const id = params.id;

  //chat id should be gotten from the community state in the updated code
  const [chatId, setChatId] = useState('b758f421a981a8498c200265ee96f5da0636b79fe28c8c598d4650f806d78973');
  //const router = useRouter();
  const {chain, chains} = useNetwork();
  const { connectors } = useConnect();
  const [messages, setMessages] = useState({});
  const [messageToSend, setMessageToSend] = useState('');
  const [isSending, setIsSending] = useState<boolean>(false);
  const { address } = useAccount();
  const { data: walletClient} = useWalletClient();
 
  //const signer = walletClientToSigner(421613);
  const signer = useEthersSigner(421613 as unknown as undefined)
  const { sendPushGroupChat, pushProtocolUser, initialize, setPushProtocolUser } = usePushProtocolContext();
  const [chatHistory, setChatHistory] = useState<any>([{}]);
  // // Scroll to bottom on new message
  // const Scroll = () => {
  // 	const { offsetHeight, scrollHeight, scrollTop } =
  // 		chatContainer.current as HTMLDivElement;
  // 	if (scrollHeight <= scrollTop + offsetHeight + 100) {
  // 		chatContainer.current?.scrollTo(0, scrollHeight);
  // 	}
  // };

  const community: Community & { messages: Array<ChatMessages> } = {
    name: 'All for good',
    id: 1,
    slug: 'all-for-good-erd4',
    membersCount: 20,
    messages: [
      {
        id: '1',
        content: 'Hello there!',
        userAddress: '0x456****8bc45',
        fullname: 'John Doe',
        timestamp: 1700825400000,
      },
      {
        id: '2',
        content: "Hey, how's it going?",
        userAddress: '0x456****8bc45',
        fullname: 'Jane Smith',
        timestamp: 1700825400000,
      },
      {
        id: '3',
        content: "I'm doing well, thanks!",
        userAddress: '0x456****8bc45',
        fullname: 'John Doe',
        timestamp: 1700922600000,
      },
      {
        id: '4',
        content: 'What about you?',
        userAddress: '0x456****8bc45',
        fullname: 'Jane Smith',
        timestamp: 1700922601750,
      },
      {
        id: '5',
        content: 'Just relaxing at home.',
        userAddress: '0x456****8bc45',
        fullname: 'John Doe',
        timestamp: 1700922623000,
      },
      {
        id: '6',
        content: 'Nice! Anything exciting happening?',
        userAddress: '0x456****8bc45',
        fullname: 'Jane Smith',
        timestamp: 1700994295507,
      },
      {
        id: '7',
        content: 'Not much, just enjoying the day.',
        userAddress: '0x456****8bc45',
        fullname: 'John Doe',
        timestamp: 1700991000000,
      },
      {
        id: '8',
        content: 'Sounds nice! Have a great day!',
        userAddress: '0x456****8bc45',
        fullname: 'Jane Smith',
        timestamp: 1700991000000,
      },
    ],

    members: [{}],
    cover: '',
    description:
      'Join a movement that goes beyond personal well-being. In the "All for Good" nutrition community, we believe in the power of nutrition to create positive change. Share your journey towards a healthier you, engage in impactful discussions about sustainable eating, and explore how good nutrition can contribute to a better world. Every meal counts, and together, we\'re making choices that are "All for Good."',
  };

  const [chats, setChats] = useState<Array<ChatMessages>>(community?.messages);
  const randomID = () => Math.random().toString(32).substring(2);

  //FETCH HISTORY

  const totalFetch = async () => {
      
        const _chatHistory = await pushProtocolUser.chat.history(chatId);
  
        console.log('Chat History', _chatHistory);
        setChatHistory(_chatHistory);
  
        let formattedChatHistory = _chatHistory.map((_message: any) => {

          let maskedAddress = maskHexAddress(address as unknown as string)
         
          return {
            //..._message,
            id: _message.timestamp,
            //userAddress: formatEtherAddressFromPushDID(_message.toDID),
            userAddress: maskedAddress,
            timestamp: new Date(_message.timestamp).toISOString(),
            content: _message.messageContent,
            fullname: `${maskedAddress}`,
            status: 'sent',
            show_status: true,
          };
        });

        
        setChats(formattedChatHistory.reverse());
  
        // replaceCurrentMessagesForChat(
        //   chat.chatId,
        //   formattedChatHistory.reverse()
        // );
  
      //   return chatHistory;
      // } catch (e) {
      //   console.log('error fetching all chats', e);
      // }
    };

  // const replaceCurrentMessagesForChat = (chatId, newMessagesArray) => {
  //   console.log("Saving Chat History for ID: ", chatId, newMessagesArray);
  //   setMessages((prevData) => ({
  //     ...prevData,
  //     [chatId]: newMessagesArray,
  //   }));

  //   let textArray = [];
  //   let metadataArray = [];

  //   newMessagesArray.forEach((message) => {
  //     console.log("Adding Message Text", message.messageContent);
  //     textArray.push(message.messageContent);
  //     metadataArray.push({ ...message, type: "message" });
  //   });

  // };

  function handleInputKeyUp(evt: KeyboardEvent) {
    if (evt.key == 'Enter' && messageToSend !== '') {
      sendMessage('Text');
    }
  }
  const sendMessage = async (messageType: string) => {
    // try {
    //   setIsSending(true);
    //   sendPushGroupChat(messageType, messageToSend, chatId);
    //   setMessageToSend('');
    // } catch (error) {
    // } finally {
    //   setIsSending(false);
    // }
    //console.log(walletClient)
    //const groupInfo = await pushProtocolUser.chat.group.info(chatId);
    // const groupPermissions = await pushProtocolUser.chat.group.permissions(chatId);
    // console.log(groupPermissions)
    console.log(pushProtocolUser)
    let _message = await sendPushGroupChat(messageType, messageToSend, chatId);
    //setMessage(_message)
   
    // const user: any = await PushAPI.initialize(walletClient as unknown as undefined, {
    //   env: CONSTANTS.ENV.PROD,
    // });

    //setPushProtocolUser(user);
    console.log("sending message")
    //console.log(`pushProtocolUser: ${JSON.stringify(pushProtocolUser, null, 2)}`)
    
    console.log(_message)
    if(_message){
      // setChats((prev) => [
      //   ...prev,
      //   {
      //     timestamp: new Date().getTime(),
      //     content: messageToSend,
      //     userAddress: maskHexAddress(address as string),
      //     id: randomID(),
      //     fullname: 'Lucky Victory',
      //   },
       
      // ]);
      totalFetch();
    }
    //setMessage('')
    setMessageToSend('');
  };
  
  
  useEffect(() => {
    initialize();
  }, []);


  return (
    <Box className='h-screen' minH={'620px'} bg={'secondaryColor.50'}>
      <Box bg={'white'} maxW={1250} mx={'auto'}>
        <Box h={'120px'} bg={'primaryColor.800'}></Box>
        <Flex gap={4}>
          <Box
            rounded={'full'}
            w={'80px'}
            h={'80px'}
            border={'2px'}
            borderColor={'white'}
            mt={'-6'}
            ml={6}
          >
            <Box
              as={community?.cover ? Avatar : BoringAvatars}
              variant='sunset'
              w={'full'}
              h={'full'}
              size={'auto'}
              {...{ src: community?.cover, alt: '' }}
            ></Box>
          </Box>
          <Flex>
            <Heading size={'md'} pt={1} fontSize={{ lg: '24px' }}>
              {community?.name}
            </Heading>
          </Flex>
        </Flex>
        <HStack alignItems={'start'} gap={6} my={6} px={6}>
          <Tabs flex={1} variant={'soft-rounded'} colorScheme='primaryColor'>
            <TabList>
              <Tab>
                <HStack spacing={3} alignItems={'center'}>
                  <MdChat />
                  <span>Chats</span>
                </HStack>
              </Tab>
              <Tab>
                <HStack spacing={3} alignItems={'center'}>
                  <MdEvent />
                  <span>Events</span>
                </HStack>
              </Tab>
              <Tab>
                <HStack spacing={3} alignItems={'center'}>
                  <MdViewAgenda />
                  <span>Challenges</span>
                </HStack>
              </Tab>
            </TabList>
            <TabPanels h={'full'} py={3}>
              <TabPanel pl={0} minH={'400px'} pos={'relative'}>
                <Box maxH={'350px'} overflowY={'auto'}>
                  <Stack
                    divider={<StackDivider />}
                    py={4}
                    px={2}
                    rounded={'md'}
                    // bg={'gray.100'}
                  >
                    {chats?.map((message, i) => (
                      <HStack
                        key={message?.id}
                        align={'flex-start'}
                        gap={3}
                        bg={'white'}
                        p={3}
                        rounded={'md'}
                      >
                        <Box as={BoringAvatars} variant='beam'></Box>

                        <Stack>
                          <HStack>
                            <Heading size={'sm'} color={'primaryColor.800'}>
                              {message?.userAddress || '0x456****8bc45'}{' '}
                            </Heading>
                            <Text
                              as={'span'}
                              color={'gray'}
                              fontSize={'sm'}
                              fontWeight={'medium'}
                            >
                              {formatChatTimestamp(message?.timestamp)}
                            </Text>
                          </HStack>

                          <Text>{message?.content}</Text>
                        </Stack>
                      </HStack>
                    ))}
                  </Stack>
                </Box>
                <HStack
                  pos={'sticky'}
                  bg={'white'}
                  py={3}
                  bottom={0}
                  w={'full'}
                  left={0}
                >
                  <Input
                    value={messageToSend}
                    onChange={(e) => setMessageToSend(e.target.value)}
                    colorScheme='primaryColor'
                    placeholder='Type a message...'
                    onKeyUp={handleInputKeyUp}
                  />
                  <Button
                    variant={'solid'}
                    onClick={() => sendMessage("Text")}
                    // colorScheme='primaryColor'
                    // colorScheme='blue'
                    isDisabled={messageToSend === ''}
                  >
                    Send
                  </Button>
                </HStack>
              </TabPanel>
              <TabPanel>
                <Flex
                  minH={'200px'}
                  align={'center'}
                  justify={'center'}
                  bg={'gray.100'}
                  fontWeight={'bold'}
                  fontSize={'lg'}
                  color={'gray.500'}
                >
                  No Events Available
                </Flex>
              </TabPanel>
              <TabPanel>
                <Flex
                  minH={'200px'}
                  align={'center'}
                  justify={'center'}
                  bg={'gray.100'}
                  fontWeight={'bold'}
                  fontSize={'lg'}
                  color={'gray.500'}
                >
                  No Challenges Available
                </Flex>
              </TabPanel>
            </TabPanels>
          </Tabs>

          <Stack bg={'white'} maxW={'350px'} pb={6}>
            <Box
              borderBottom={'1px'}
              borderBottomColor={'gray.300'}
              py={3}
              px={5}
            >
              <Heading size={'md'} as={'h3'}>
                About {community?.name}
              </Heading>
              <Text fontSize={'sm'} mt={2}>
                {community?.description}
              </Text>
            </Box>
          </Stack>
        </HStack>
      </Box>
    </Box>
  );
}
