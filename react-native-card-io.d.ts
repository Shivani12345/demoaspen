declare module 'react-native-card-io' {
  const scanCard: {
    scanCard: () => Promise<CardInfo>;
  };
  interface CardInfo {
    cardType: string;
    cardNumber: string;
    expiryMonth: number;
    expiryYear: number;
    cvv: string;
  }
}
