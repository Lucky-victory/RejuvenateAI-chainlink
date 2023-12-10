// Import Push SDK & Ethers
import { PushAPI, CONSTANTS } from "@pushprotocol/restapi";
import { ethers } from "ethers";
// import dotenv from 'dotenv';
// dotenv.config();

require('dotenv').config()
// Creating a random signer from a wallet, ideally this is the wallet you will connect
//const signer = ethers.Wallet.createRandom();

const privateKey = process.env.PRIVATE_KEY as string;
const privateKey2 = process.env.PRIVATE_KEY2 as string;
const signer = new ethers.Wallet(privateKey);
const secondSigner = new ethers.Wallet(privateKey2);

////To create HD wallet, so as to create multiple addresses with one private key

//const mnemonic = process.env.MNEMONIC;
// if(!mnemonic || mnemonic.length <= 0)
//     throw new Error("Missing private key");
//     const HDNode = ethers.utils.HDNode.fromMnemonic(mnemonic);  
//     const derivedNode = HDNode.derivePath(`m/44'/60'/0'/0/${1}`);
//     const derivedNode2 = HDNode.derivePath(`m/44'/60'/0'/0/${2}`);

// console.log(`Connected to the wallet ${derivedNode.address}`)
// console.log(`Connected to the wallet ${derivedNode2.address}`)


// This will be the wallet address of the recipient
const bobWalletAddress: any = "0xc24eC41d45b9db53EE68400a7126D460598934dd";



// // Send a message to Bob
// const aliceMessagesBob = await userAlice.chat.send(bobWalletAddress, {
//   content: "Gm gm! It's a me... Mario",
// });

// // Initialize Stream
// const stream = await userAlice.initStream([CONSTANTS.STREAM.CHAT]);

// // Configure stream listen events and what to do
// stream.on(CONSTANTS.STREAM.CHAT, (message) => {
//   console.log(message);
// });

// // Connect Stream
// stream.connect();


interface GroupRules {
  entry?: { conditions?: any[] };
  chat?: { conditions?: any[] };
}

interface GroupOptions {
  description?: string;
  image?: string; // base 64 encoded string
  members?: string[];
  admins?: string[];
  private?: boolean;
  rules?: GroupRules;
}

interface CreateGroupParams {
  name: string;
  options?: GroupOptions;
}

const createdGroup = async ({ name, options }: CreateGroupParams): Promise<any> => {
  // Your implementation here
};

// Example
const groupName = "Example Group";
const groupDescription = "This is an example group.";
const groupImage = "data:image/png;base64,iVBORw0K..."; // example base64 encoded image string
const walletAddress1 = "0xc24eC41d45b9db53EE68400a7126D460598934dd";
const walletAddress2 = "0x26dC41904Dce6516852D82797ED0BbB97E5eCb0F";
const walletAddress3 = "0x296c1e5c5631E38F7F5dbAD707B9dD331338d282";

const newGroup = async (signer: any) => {
  let userAlice: any;
  try {
    userAlice = await PushAPI.initialize(signer, { env: CONSTANTS.ENV.STAGING })
  } catch (e) {
    console.log(e);
  }
  let result = await userAlice.chat.group.create(groupName,
    {
      description: groupDescription,
      image: groupImage,
      members: [walletAddress1, walletAddress2, walletAddress3],
      admins: [],
      private: false,
      rules: {
        entry: { conditions: [] },
        chat: { conditions: [] },
      },
    },
  );
  console.log(result);
  return result;
}

const sendMessage = async (_signer: any) => {

  let userAlice: any;
  try {
    userAlice = await PushAPI.initialize(_signer, { env: CONSTANTS.ENV.STAGING })
  } catch (error) {
    console.log(error);
  }

  let createdGroup = await userAlice.chat.group.create(groupName,
    {
      description: groupDescription,
      image: groupImage,
      members: [walletAddress1, walletAddress2, walletAddress3],
      admins: [],
      private: false,
      rules: {
        entry: { conditions: [] },
        chat: { conditions: [] },
      },
    },
  );

  let aliceMessages = await userAlice.chat.send(
    "chatid:be73d61c9db47fa3b80fc2736ea08c8fe6891f23cd895aab41026e855c98beff", {
    content: 'Hello Community, my name is alice!',
  },);
  //console.log(aliceMessages)
  return aliceMessages;
}
//sendMessage(secondSigner);
//newGroup(signer);

(async () => {
  let userAlice: any;
  let createdGroup: any;
  try {
    userAlice = await PushAPI.initialize(secondSigner, { env: CONSTANTS.ENV.PROD })
    console.log("userAlice connected")

    // createdGroup = await userAlice.chat.group.create(groupName,
    //   {
    //     description: groupDescription,
    //     image: groupImage,
    //     members: [walletAddress1, walletAddress2, walletAddress3],
    //     admins: [],
    //     private: false,
    //     rules: {
    //       entry: { conditions: [] },
    //       chat: { conditions: [] },
    //     },
    //   },
    // );
    // console.log(`group created with chatId:${createdGroup.chatId}`);
  } catch (error) {
    //console.log(error);
    console.log(JSON.stringify(error, undefined, 3))
  }
  try {
    const bobAcceptAliceRequest = await userAlice.chat.accept("b758f421a981a8498c200265ee96f5da0636b79fe28c8c598d4650f806d78973");
    let aliceMessages = await userAlice.chat.send(
      "b758f421a981a8498c200265ee96f5da0636b79fe28c8c598d4650f806d78973",
      {
        type: "Text",
        content: 'Hello Community, my name is alice!',
      },);
    console.log("message sent successfully")
    console.log(aliceMessages)
    // return aliceMessages;

    //console.log("getting chat history")
    //let chatHistory = await userAlice.chat.history(createdGroup.chatId)
    
    //console.log(chatHistory)
  } catch (error: any) {
    console.error("[Push SDK] - API  - Error - API send -:",  error.message);
  }

})();



// groupCreator: 'eip155:0x5e869af2Af006B538f9c6D231C31DE7cDB4153be',
//   chatId: 'bf18870b2dcb76df86808bbd76875bb413866fc599b881cf746c98ce3c7c064a',

// "chatid:bf18870b2dcb76df86808bbd76875bb413866fc599b881cf746c98ce3c7c064a"

// const response = await PushAPI.chat.createGroup({
//   account: '0xC30d02aE661C996C8dB04D44f4759D6c4672c99D',
//   groupName: 'Trader1', 
//   groupDescription: 'Group for Trader1',
//   members: [],
//   admins: [],
//   isPublic: false,
//   contractAddressNFT: '0x9105D95577575116948F5afcF479254f49F27939',
//   numberOfNFTs: 1,
//   rules: {
//     'chat': {
//       'conditions': [
//         {
//           'all': [
//             {
//               'type': PushAPI.ConditionType.PUSH,
//               'category': 'ERC721',
//               'subcategory': 'holder',
//               'data': {
//                 'contract': 'eip155:80001:0x9105D95577575116948F5afcF479254f49F27939',
//                 'amount': 1,
//                 'decimals': 18
//               }
//             }
//           ]
//         }
//       ]
//     }
//   }
// });