declare module 'react-native-cardscan' {
  const CardScan: {
    scanCard: () => Promise<CardInfo>;
  };

  interface CardInfo {
    number: string;
    expirationMonth: number;
    expirationYear: number;
    // Add more properties as needed
  }

  export default CardScan;
}
