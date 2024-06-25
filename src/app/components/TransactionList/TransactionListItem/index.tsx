import { Button } from "@headlessui/react";
import React from "react";
import EditTransactionModal from "../../EditTransactionModal";
import { Transaction } from "@/types/transaction";
import { TransactionTypeEnum } from "@/app/utils";
import { PenNib, Trash } from "@phosphor-icons/react";
import { deleteTransaction } from "@/services/api";
import { useTransactions } from "@/contexts/transaction-context";

const types = {
  [TransactionTypeEnum.INCOME]: "RECEITA",
  [TransactionTypeEnum.EXPENSE]: "DESPESA",
};

export const TransactionListItem: React.FC<Transaction> = (transaction) => {
  const [isEditModalOpen, setIsEditModalOpen] = React.useState(false);
  const { handleDeleteTransaction } = useTransactions();
  const transactionFormatted = {
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

  function handleOpenEditModal() {
    setIsEditModalOpen(true);
  }

  function handleCloseEditModal() {
    setIsEditModalOpen(false);
  }

  async function handleDelete() {
    await deleteTransaction(transaction.id)
      .then(() => {
        handleDeleteTransaction(transaction.id);
        alert("Transação deletada com sucesso!");
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <li className="w-full grid grid-cols-6 p-2">
      <span>{transactionFormatted.description}</span>
      <span>{transactionFormatted.value}</span>
      <span>{transactionFormatted.date}</span>
      <span>{transactionFormatted.category}</span>
      <span>{transactionFormatted.kind}</span>
      <span className="flex gap-2 justify-center">
        <Button
          type="button"
          onClick={handleOpenEditModal}
          className="rounded-md  p-2 text-xl font-medium focus:outline-none data-[hover]:bg-black/30 data-[focus]:outline-1 data-[focus]:outline-white"
        >
          <PenNib weight="regular" />
        </Button>
        <Button
          type="button"
          onClick={handleDelete}
          className="rounded-md text-red-500 p-2 text-xl font-medium focus:outline-none data-[hover]:bg-black/30 data-[focus]:outline-1 data-[focus]:outline-white"
        >
          <Trash weight="regular" />
        </Button>
      </span>
      {isEditModalOpen && (
        <EditTransactionModal
          isOpen={isEditModalOpen}
          onClose={handleCloseEditModal}
          transaction={transaction}
        />
      )}
    </li>
  );
};
