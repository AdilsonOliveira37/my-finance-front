import { useTransactions } from "@/contexts/transaction-context";
import { fetchTransactions } from "@/services/api";
import React, { useEffect, useMemo } from "react";
import { TransactionTypeEnum } from "../../utils";
import { Button } from "@headlessui/react";
import { PenNib, Trash } from "@phosphor-icons/react";

const types = {
  [TransactionTypeEnum.INCOME]: "RECEITA",
  [TransactionTypeEnum.EXPENSE]: "DESPESA",
};

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
  }, [changeTransactions]);

  const formattedTransactions = useMemo(() => {
    return transactions.map((transaction) => {
      return {
        id: transaction.id,
        description: transaction.description,
        category: transaction.transactionType.description,
        date: new Date(transaction.createdAt).toLocaleDateString("pt-BR"),
        kind: types[transaction.transactionType?.type],
        value: new Intl.NumberFormat("pt-BR", {
          style: "currency",
          currency: "BRL",
        }).format(transaction.value),
      };
    });
  }, [transactions]);

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
        {formattedTransactions?.map((transaction) => (
          <li key={transaction.id} className="w-full grid grid-cols-6 p-2">
            <span>{transaction.description}</span>
            <span>{transaction.value}</span>
            <span>{transaction.date}</span>
            <span>{transaction.category}</span>
            <span>{transaction.kind}</span>
            <span className="flex gap-2 justify-center">
              <Button
                type="button"
                onClick={() => {}}
                className="rounded-md  p-2 text-xl font-medium focus:outline-none data-[hover]:bg-black/30 data-[focus]:outline-1 data-[focus]:outline-white"
              >
                <PenNib weight="regular" />
              </Button>
              <Button
                type="button"
                onClick={() => {}}
                className="rounded-md text-red-500 p-2 text-xl font-medium focus:outline-none data-[hover]:bg-black/30 data-[focus]:outline-1 data-[focus]:outline-white"
              >
                <Trash weight="regular" />
              </Button>
            </span>
          </li>
        ))}
      </ol>
    </section>
  );
};
