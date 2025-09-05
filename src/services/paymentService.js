// src/services/paymentService.js
// Payments service: works with real backend or mock mode
import API from "./api";

const useMock =
  process.env.REACT_APP_USE_MOCK === "true" ||
  process.env.REACT_APP_USE_MOCK === "1";

const createMockPayments = () => {
  let history = [
    { txn_id: "p-1001", amount: 250, status: "success", to: "merchant1@test.com", date: new Date().toISOString() },
    { txn_id: "p-1002", amount: 120, status: "failed", to: "merchant2@test.com", date: new Date().toISOString() },
  ];

  const delay = (ms) => new Promise((res) => setTimeout(res, ms));

  return {
    makePayment: async ({ to, amount }) => {
      await delay(500);

      const success = Math.random() > 0.2; // 80% success rate
      const txn = {
        txn_id: `p-${Math.floor(Math.random() * 9000) + 1000}`,
        amount,
        to,
        status: success ? "success" : "failed",
        date: new Date().toISOString(),
      };

      history = [txn, ...history];

      return { data: txn };
    },

    getPaymentStatus: async (txn_id) => {
      await delay(200);
      const txn = history.find((t) => t.txn_id === txn_id);
      if (!txn) throw new Error("Transaction not found");
      return { data: txn };
    },

    getPaymentHistory: async () => {
      await delay(300);
      return { data: history };
    },
  };
};

const real = {
  makePayment: (payload) => API.post("/pay", payload),
  getPaymentStatus: (id) => API.get(`/transactions/${id}`),
  getPaymentHistory: () => API.get("/transactions"),
};

const paymentService = useMock ? createMockPayments() : real;

export const makePayment = (...args) => paymentService.makePayment(...args);
export const getPaymentStatus = (...args) => paymentService.getPaymentStatus(...args);
export const getPaymentHistory = (...args) => paymentService.getPaymentHistory(...args);

export default paymentService;
