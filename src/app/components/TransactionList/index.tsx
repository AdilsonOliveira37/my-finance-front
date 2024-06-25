import { useTransactions } from "@/contexts/transaction-context";
import { fetchTransactions } from "@/services/api";
import React, { useEffect } from "react";
import { TransactionListItem } from "./TransactionListItem";

export const TransactionList: React.FC = () => {
  const { changeTransactions, transactions } = useTransactions();

  useEffect(() => {
    async function getTransactions() {
      await fetchTransactions()
        .then((data) => {
          changeTransactions(data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
    getTransactions();
  }, []);

  return (
    <section className="w-full">
      <ol>
        <li className="w-full grid grid-cols-6 border-b border-gray-500 p-2">
          <span>Descrição</span>
          <span>Valor</span>
          <span>Data</span>
          <span>Categoria</span>
          <span>Tipo</span>
          <span className="flex items-center justify-center">Ações</span>
        </li>
        {transactions?.map((transaction) => (
          <TransactionListItem key={transaction.id} {...transaction} />
        ))}
      </ol>
    </section>
  );
};
