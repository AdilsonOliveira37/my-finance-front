import { Transaction } from "@/types/transaction";
import React, { createContext, useState } from "react";

type TransactionContextType = {
  transactions: Transaction[];
  addTransaction: (transaction: Transaction) => void;
  changeTransactions: (transactions: Transaction[]) => void;
  deleteTransaction: (id: string) => void;
  updateTransaction: (transaction: Transaction) => void;
};

export const TransactionContext = createContext<TransactionContextType>({
  transactions: [],
  addTransaction: () => {},
  changeTransactions: () => {},
  deleteTransaction: () => {},
  updateTransaction: () => {},
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

  const deleteTransaction = (id: string) => {
    setTransactions(
      transactions.filter((transaction) => transaction.id !== id)
    );
  };

  const updateTransaction = (newTransaction: Transaction) => {
    const updatedTransactions = transactions.map((transactionItem) => {
      if (newTransaction.id === transactionItem.id) {
        return newTransaction;
      }
      return transactionItem;
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
        deleteTransaction,
        updateTransaction,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};

export const useTransactions = () => React.useContext(TransactionContext);
