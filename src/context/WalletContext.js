import React, { createContext, useEffect, useMemo, useState } from "react";
import { getBalance, addFunds, getWalletTransactions } from "../services/walletService";

export const WalletContext = createContext(null);

export function WalletProvider({ children }) {
  const [balance, setBalance] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);

  const refreshBalance = async () => {
    setLoading(true);
    try {
      const { data } = await getBalance();
      setBalance(data.balance);
    } finally {
      setLoading(false);
    }
  };

  const addMoney = async (amount) => {
    const { data } = await addFunds({ amount });
    setBalance(data.balance);
    await refreshTransactions();
    return data;
  };

  const refreshTransactions = async () => {
    const { data } = await getWalletTransactions();
    setTransactions(data);
    return data;
  };

  useEffect(() => { refreshBalance(); refreshTransactions(); }, []);

  const value = useMemo(() => ({ balance, transactions, loading, refreshBalance, addMoney, refreshTransactions }), [balance, transactions, loading]);

  return <WalletContext.Provider value={value}>{children}</WalletContext.Provider>;
}
