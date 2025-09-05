// src/services/walletService.js
// Wallet service that works with real backend or a mock when REACT_APP_USE_MOCK=true
import API from "./api";

/**
 * Mock implementation (keeps state in-memory for the session).
 * Useful when backend isn't running so you can continue frontend work.
 */
const createMockWallet = () => {
  let balance = 1200.5;
  let txns = [
    { txn_id: "m-1001", amount: 500, type: "credit", date: new Date().toISOString() },
    { txn_id: "m-1002", amount: 200, type: "debit", date: new Date().toISOString() },
  ];

  const delay = (ms) => new Promise((res) => setTimeout(res, ms));

  return {
    getBalance: async () => {
      await delay(300);
      return { data: { balance } };
    },
    addFunds: async ({ amount }) => {
      await delay(400);
      const txn = {
        txn_id: `m-${Math.floor(Math.random() * 9000) + 1000}`,
        amount,
        type: "credit",
        date: new Date().toISOString(),
      };
      balance = Number((balance + Number(amount)).toFixed(2));
      txns = [txn, ...txns];
      return { data: { balance, status: "success", txn } };
    },
    getWalletTransactions: async () => {
      await delay(250);
      return { data: txns };
    },
  };
};

const useMock = (process.env.REACT_APP_USE_MOCK === "true" || process.env.REACT_APP_USE_MOCK === "1");

const mock = createMockWallet();

const real = {
  getBalance: () => API.get("/wallet/balance"),
  addFunds: (payload) => API.post("/wallet/add", payload),
  getWalletTransactions: () => API.get("/wallet/transactions"),
};

const walletService = useMock ? mock : real;

export const getBalance = (...args) => walletService.getBalance(...args);
export const addFunds = (...args) => walletService.addFunds(...args);
export const getWalletTransactions = (...args) => walletService.getWalletTransactions(...args);

export default walletService;
