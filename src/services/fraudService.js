// src/services/fraudService.js
// Fraud service: works with backend or mock (REACT_APP_USE_MOCK=true)
import API from "./api";

const useMock =
  process.env.REACT_APP_USE_MOCK === "true" ||
  process.env.REACT_APP_USE_MOCK === "1";

const createMockFraud = () => {
  let logs = [
    {
      id: "f-1001",
      txn_id: "p-1001",
      score: 85,
      risk: "HIGH",
      date: new Date().toISOString(),
    },
    {
      id: "f-1002",
      txn_id: "p-1002",
      score: 40,
      risk: "MEDIUM",
      date: new Date().toISOString(),
    },
  ];

  const delay = (ms) => new Promise((res) => setTimeout(res, ms));

  return {
   getFraudScore: async ({ txn_id, user_id, merchant_id, amount }) => {
  await delay(500);
  const score = Math.floor(Math.random() * 100);
  const risk = score > 70 ? "HIGH" : score > 40 ? "MEDIUM" : "LOW";

  const entry = {
    id: `f-${Math.floor(Math.random() * 9000) + 1000}`,
    txn_id: txn_id || `mock-txn-${Date.now()}`,  // ✅ ensure txn_id always exists
    user_id,
    merchant_id,
    amount,
    score,
    risk,
    date: new Date().toISOString(),
  };

  logs = [entry, ...logs];
  return { data: entry };
},

    getFraudLogs: async () => {
      await delay(300);
      return { data: logs };
    },
  };
};

const real = {
  getFraudScore: (payload) => API.post("/fraud/score", payload),
  getFraudLogs: () => API.get("/fraud/logs"),
};

const fraudService = useMock ? createMockFraud() : real;

export const getFraudScore = (...args) => fraudService.getFraudScore(...args);
export const getFraudLogs = (...args) => fraudService.getFraudLogs(...args);

export default fraudService;
