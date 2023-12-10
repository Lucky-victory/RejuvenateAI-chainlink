
export const formatPushDIDForFrontEnd = (address: any) => {
  return `${address.slice(7, 12)}...${address.slice(-4)}`;
};

export const formatEtherAddressFromPushDID = (did: any) => {
  const addressRegex = /^eip155:(0x[a-fA-F0-9]{40})$/;
  const match = did.match(addressRegex);
  return match ? match[1] : null;
};