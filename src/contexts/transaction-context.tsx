import { Transaction } from "@/types/transaction";
import React, { createContext, useState } from "react";

type TransactionContextType = {
  transactions: Transaction[];
  addTransaction: (transaction: Transaction) => void;
  changeTransactions: (transactions: Transaction[]) => void;
  handleDeleteTransaction: (id: string) => void;
  handleUpdateTransaction: (transaction: Partial<Transaction>) => void;
};

export const TransactionContext = createContext<TransactionContextType>({
  transactions: [],
  addTransaction: () => {},
  changeTransactions: () => {},
  handleDeleteTransaction: () => {},
  handleUpdateTransaction: () => {},
});

export const TransactionProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const changeTransactions = (transactions: Transaction[]) => {
    setTransactions(transactions);
  };

  const addTransaction = (transaction: Transaction) => {
    setTransactions([...transactions, transaction]);
  };

  const handleDeleteTransaction = (id: string) => {
    setTransactions(
      transactions.filter((transaction) => transaction.id !== id)
    );
  };

  const handleUpdateTransaction = (newTransaction: Partial<Transaction>) => {
    const updatedTransactions = transactions.map((transaction) => {
      if (transaction.id === newTransaction.id) {
        return { ...transaction, ...newTransaction };
      }
      return transaction;
    });

    setTransactions(updatedTransactions);
  };

  console.log(transactions);

  return (
    <TransactionContext.Provider
      value={{
        transactions,
        addTransaction,
        changeTransactions,
        handleDeleteTransaction,
        handleUpdateTransaction,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};

export const useTransactions = () => React.useContext(TransactionContext);
