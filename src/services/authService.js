// src/services/authService.js
// Works with backend or mock mode (REACT_APP_USE_MOCK=true)
import API from "./api";

const useMock =
  process.env.REACT_APP_USE_MOCK === "true" ||
  process.env.REACT_APP_USE_MOCK === "1";

// ---- MOCK IMPLEMENTATION ----
const createMockAuth = () => {
  let users = [
    { email: "admin@test.com", password: "123456", role: "admin" },
    { email: "user@test.com", password: "123456", role: "user" },
  ];

  const delay = (ms) => new Promise((res) => setTimeout(res, ms));

  return {
    signupUser: async ({ email, password, role }) => {
      await delay(400);
      if (users.find((u) => u.email === email)) {
        throw new Error("User already exists");
      }
      const newUser = { email, password, role };
      users.push(newUser);
      return { data: { msg: "Account created", email, role } };
    },

    loginUser: async ({ email, password }) => {
      await delay(400);
      const found = users.find(
        (u) => u.email === email && u.password === password
      );
      if (!found) throw new Error("Invalid credentials");

      // Fake JWT token string
      const token = `mock-token-${Date.now()}`;
      return {
        data: { token, role: found.role, email: found.email },
      };
    },

    logoutUser: async () => {
      await delay(200);
      return { data: { msg: "Logged out" } };
    },
  };
};

// ---- REAL IMPLEMENTATION ----
const real = {
  signupUser: (payload) => API.post("/auth/signup", payload),
  loginUser: (payload) => API.post("/auth/login", payload),
  logoutUser: () => API.post("/auth/logout"),
};

const authService = useMock ? createMockAuth() : real;

export const signupUser = (...args) => authService.signupUser(...args);
export const loginUser = (...args) => authService.loginUser(...args);
export const logoutUser = (...args) => authService.logoutUser(...args);

export default authService;
