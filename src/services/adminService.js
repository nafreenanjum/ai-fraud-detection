// src/services/adminService.js
import API from "./api";

const useMock =
  process.env.REACT_APP_USE_MOCK === "true" ||
  process.env.REACT_APP_USE_MOCK === "1";

const createMockAdmin = () => {
  let merchants = [
    { id: "m-101", name: "Merchant One", email: "merchant1@test.com", active: true },
    { id: "m-102", name: "Merchant Two", email: "merchant2@test.com", active: false },
  ];

  let alerts = [
    { id: "a-201", message: "High fraud detected on txn p-1002", severity: "HIGH", date: new Date().toISOString() },
    { id: "a-202", message: "Suspicious IP flagged on txn p-1003", severity: "MEDIUM", date: new Date().toISOString() },
  ];

  const delay = (ms) => new Promise((res) => setTimeout(res, ms));

  return {
    getDashboardStats: async () => {
      await delay(300);
      return {
        data: {
          totalMerchants: merchants.length,
          activeMerchants: merchants.filter((m) => m.active).length,
          fraudAlerts: alerts.length,
        },
      };
    },
    getMerchants: async () => {
      await delay(300);
      return { data: merchants };
    },
    getAlerts: async () => {
      await delay(300);
      return { data: alerts };
    },
  };
};

const real = {
  getDashboardStats: () => API.get("/admin/stats"),
  getMerchants: () => API.get("/admin/merchants"),
  getAlerts: () => API.get("/admin/alerts"),
};

const adminService = useMock ? createMockAdmin() : real;

export const getDashboardStats = (...args) => adminService.getDashboardStats(...args);
export const getMerchants = (...args) => adminService.getMerchants(...args);
export const getAlerts = (...args) => adminService.getAlerts(...args);

export default adminService;
