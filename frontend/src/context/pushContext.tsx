// Import Push SDK & Ethers
import {PushAPI, CONSTANTS } from '@pushprotocol/restapi';
import * as ethers from 'ethers';
//import * as PushAPI from '@pushprotocol/restapi';
import { pushContextType } from '@/types/pushContext';
import { useAccount, useWalletClient } from 'wagmi';
import { useEthersSigner, walletClientToSigner } from '@/hooks/useEthersSigner';
import {
  useState,
  useEffect,
  useContext,
  createContext,
  ReactNode,
} from 'react';
//require('dotenv').config();
// const PK = process.env.PRIVATE_KEY; // channel private key
// const Pkey = `0x${PK}`;
// const signer = new ethers.Wallet(Pkey);
// const ACCOUNT = `eip155:${Pkey}`;

// const magic = new Magic(process.env.REACT_APP_MAGICLINK_PUBLISHABLE_KEY, {
//   network: {
//     rpcUrl: process.env.REACT_APP_RPC_URL,
//     chainId: 80001,
//   },
//   extensions: [new OAuthExtension()],
// });

// console.log(magic);

// const rpcProvider = new ethers.providers.Web3Provider(magic.rpcProvider);
// const _signer = rpcProvider.getSigner();

const pushContextDefaultValue: pushContextType = {
  pushProtocolUser: {},
  setPushProtocolUser: () => null,
  groupChats: [],
  setGroupChats: () => null,
  messages: [],
  setMessages: () => null,
  sendPushGroupChat: () => null,
  initialize: () => null
}

type PushContextProviderProps = {
  children: React.ReactNode;
};


const PushProtocolContext = createContext<pushContextType>(
  pushContextDefaultValue
);

export function PushProtocolProvider({ children }: PushContextProviderProps) {
  const [pushProtocolUser, setPushProtocolUser] = useState<any>({});
  const [decryptedPGPKey, setDecryptedPGPKey] = useState<any>({});
  const [groupChats, setGroupChats] = useState<any>([]);
  const { data: walletClient, isError } = useWalletClient();
  const { address } = useAccount();
  const [messages, setMessages] = useState<any>({});
  const [chatId, setChatId] = useState<any>({});
  const signer = useEthersSigner(421613 as unknown as undefined)

  // { chatId: [messages] }

  const initialize = async () => {
    // try {
    //   if (!pushProtocolUser) {
    //     //@ts-ignore
    //     const user: any = await PushAPI.initialize(signer as unknown as undefined, {
    //       env: CONSTANTS.ENV.PROD,
    //     });
    //     console.log('Created New Push User', user);
    //     setPushProtocolUser(user);
    //     return user;
    //   } else {
    //     throw new Error("User already exists, Don't create. ");
    //   }
    // } catch (e) {
    //   setPushProtocolUser(null);
    //   console.log(e);
    // }

        //@ts-ignore
        const user: any = await PushAPI.initialize(walletClient as unknown as undefined, {
          env: CONSTANTS.ENV.PROD,
        });
        console.log('Created New Push User', user);
        setPushProtocolUser(user);
        return user;
  };

  // const initialize = async () => {
  //   //GET USER
  //   //let res = await getUser();

  //   // let res = pushProtocolUser;
  //   // // if (!res) {
  //   // //   //IF USER DOESNT EXIST CREATE
  //   // //   res = await createUser();
  //   // // }

  //   let res = createUser;
  //   //setPushProtocolUser(res);
  //   return res;
  // };

  const sendPushGroupChat = async (
    messageType: string,
    messageText: any,
    //toAddress: any,
    chatID: any
  ) => {
    try {

      //@ts-ignore
      const response: any = await pushProtocolUser.chat.send(chatID, {
        type: messageType,
        content: messageText, // can be "Text" | "Image" | "File" | "GIF
      });

      console.log('Push Chat Response?', response);
      return response;
      //setOnMessages or Replace?
    } catch (e) {
      console.log(e);
    }
  };

  // useEffect(() => {
  //   initialize();
  // }, []);

  return (
    <PushProtocolContext.Provider
      value={{
        messages,
        setMessages,
        groupChats,
        setGroupChats,
        sendPushGroupChat,
        pushProtocolUser,
        setPushProtocolUser,
        initialize
      }}
    >
      {children}
    </PushProtocolContext.Provider>
  );
}

export const usePushProtocolContext = () => useContext(PushProtocolContext);
