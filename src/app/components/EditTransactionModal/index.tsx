"use client";

import { useState, Fragment, useEffect, useCallback } from "react";
import {
  Button,
  Description,
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
  Field,
  Input,
  Label,
  Select,
  Transition,
} from "@headlessui/react";
import { updateTransaction, fetchCategories } from "@/services/api";
import type { Category, Transaction } from "@/types/transaction";
import { useTransactions } from "@/contexts/transaction-context";

type EditTransactionModalProps = {
  readonly isOpen: boolean;
  readonly onClose: () => void;
  readonly transaction: Transaction;
};

export default function EditTransactionModal({
  isOpen,
  onClose,
  transaction,
}: EditTransactionModalProps) {
  const [categories, setCategories] = useState<Category[]>([]);
  const { handleUpdateTransaction } = useTransactions();
  const [formData, setFormData] = useState({
    description: transaction.description,
    value: transaction.value,
    date: transaction.date,
    category: transaction.transactionType.description,
  });

  function handleChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  }

  const handleEditTransaction = useCallback(async () => {
    const data = {
      description: formData.description,
      date: formData.date,
      // transactionTypeId: formData.category,
      value: Number(formData.value),
    };

    await updateTransaction(transaction.id, data)
      .then((data) => {
        handleUpdateTransaction({
          ...formData,
          id: transaction.id,
        });
        onClose();
        alert("Transação editada com sucesso!");
      })
      .catch((error) => {
        alert(error);
      });
  }, [formData, onClose]);

  useEffect(() => {
    async function getCategories() {
      await fetchCategories()
        .then((data) => {
          setCategories(data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
    getCategories();
  }, []);

  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog
        open={isOpen}
        as="div"
        className="relative z-10 focus:outline-none"
        onClose={onClose}
      >
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel
              transition
              className="w-full max-w-md rounded-xl bg-white/5 p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
            >
              <DialogTitle
                as="h3"
                className="text-base/7 font-medium text-white"
              >
                Crie uma Transação
              </DialogTitle>
              <form action="">
                <div className="mt-4 grid grid-cols-4 gap-2">
                  <Field className="col-span-4">
                    <Label className="text-sm/6 font-medium text-white">
                      Descrição
                    </Label>
                    <Description className="text-sm/6 text-white/50">
                      Use uma descrição curta e objetiva
                    </Description>
                    <Input
                      className="mt-3 block w-full rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6 text-white                          focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25"
                      type="text"
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                    />
                  </Field>
                  <Field className="col-span-2">
                    <Label className="text-sm/6 font-medium text-white">
                      Valor
                    </Label>
                    <Input
                      className="mt-3 block w-full rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6 text-white                          focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25"
                      type="number"
                      name="value"
                      value={formData.value}
                      onChange={handleChange}
                    />
                  </Field>
                  <Field className="col-span-2">
                    <Label className="text-sm/6 font-medium text-white">
                      Data
                    </Label>
                    <Input
                      className="mt-3 block w-full rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6 text-white                          focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25"
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleChange}
                    />
                  </Field>
                  <Field className="col-span-4">
                    <Label className="text-sm/6 font-medium text-white">
                      Categoria
                    </Label>
                    <Description className="text-sm/6 text-white/50">
                      Selecione uma categoria
                    </Description>
                    <div className="relative">
                      <Select
                        className="mt-3 block w-full appearance-none rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6 text-white
                            focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25
                            *:text-black
                          "
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                      >
                        {categories.map((category) => (
                          <option key={category.id} value={category.id}>
                            {category.description}
                          </option>
                        ))}
                      </Select>
                    </div>
                  </Field>
                </div>
              </form>
              <div className="mt-4 flex justify-end">
                <Button
                  className="inline-flex items-center gap-2 rounded-md  bg-gray-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[focus]:outline-1 data-[focus]:outline-white data-[open]:bg-gray-700"
                  onClick={handleEditTransaction}
                >
                  Editar
                </Button>
              </div>
            </DialogPanel>
          </div>
        </div>
        <DialogBackdrop className="fixed inset-0 bg-black/50" />
      </Dialog>
    </Transition>
  );
}
