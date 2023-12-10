export interface IAddressToken {
  Link: string;
  Usdt: string;
  Dai: string;
  address: string;
}

export interface IAddressData {
  address: string;
}

export interface User {
  userAddress: string,
  name: string,
  description: string,
  startDate: string,
  endDate: string,
}

export type stateContextType = {
  address: string;
  allTokensData: any;
  loading: boolean;
  isUserConnected: boolean;
  setAllTokenData: (data: any) => void;
  setAddress: (data: string) => void;
  setLoading: (data: boolean) => void;
  setIsUserConnected: (data: boolean) => void;
  user: any;
  setUser: (data: any) => void;
  communities:Community[]|null;
  setCommunities:(data:Community[])=>void
  community:Community|null;
  setCommunity:(data:Community|null)=>void
};

export type Community = {
  name: string;
  description: string;
  cover: string;
  membersCount: number;
  id: number;
  slug: string;
  members: object[];
  messages?:ChatMessages[]|null
};
export type ChatMessages = {
  id: string;
  content: string;
  userAddress: string;
  fullname: string;
  timestamp: Date | number;
};