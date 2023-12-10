'use client';
import { createContext, useContext, useState } from 'react';
import { stateContextType, User } from '../types/state';
import { useAccount, useNetwork, useWalletClient } from 'wagmi';

const contextDefaultValue: stateContextType = {
  allTokensData: {},
  address: '',
  setAllTokenData: () => null,
  setAddress: () => null,
  loading: false,
  setLoading: () => null,
  isUserConnected: false,
  setIsUserConnected: () => null,
  user: {},
  setUser: () => null,
  community: {},
  setCommunity: () => null,
};

type StateContextProviderProps = {
  children: React.ReactNode;
};

const AppContext = createContext<stateContextType>(contextDefaultValue);

export function AppWrapper({ children }: StateContextProviderProps) {
  const [allTokensData, setAllTokenData] = useState<any>({
    userNftUri: 'bafkreihfweuclvhaozl7q6zsjjyrkh262vlbzqyd5m3lijrnjefh6pxy3i',
    nutritionistNftUri: '',
  });
  const [address, setAddress] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [isUserConnected, setIsUserConnected] = useState<boolean>(false);
  const [nutritionist, setNutritionist] = useState('');
  const [community, setCommunity] = useState({
    id: '',
    name: '',
    membersCount: "",
    groupChat: {
      groupName: '',
      groupChatId: '',
      description: '',
      image: '',
      members: [],
      admins: [],
      private: false,
      rules: {
        entry: { conditions: [] },
        chat: { conditions: [] },
      },
      events: {
        eventName: '',
        description: '',
      },
      challenges: {
        name: '',
        description: '',
      },
    },
  });

  const [user, setUser] = useState({
    userAddress: '',
    name: '',
    userCidData: '',
    startDate: '',
    endDate: '',
    amount: '',
  });

  let sharedState = {
    allTokensData,
    setAllTokenData,
    address,
    setAddress,
    loading,
    setLoading,
    isUserConnected,
    setIsUserConnected,
    user,
    setUser,
    community,
    setCommunity,
  };

  return (
    <AppContext.Provider value={sharedState}>{children}</AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
