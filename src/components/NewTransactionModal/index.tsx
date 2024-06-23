"use client";

import { useState, useRef, Fragment, useEffect } from "react";
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

export default function NewTransactionModal() {
  const [isOpen, setIsOpen] = useState<boolean>(true);

  function handleOpen() {
    setIsOpen(true);
  }

  function handleClose() {
    setIsOpen(false);
  }

  useEffect(() => {
    getCategories()
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <>
      <Button
        onClick={handleOpen}
        className="rounded-md bg-black/20 py-2 px-4 text-sm font-medium text-white focus:outline-none data-[hover]:bg-black/30 data-[focus]:outline-1 data-[focus]:outline-white"
      >
        Nova Transação
      </Button>

      <Transition
        show={isOpen}
        as={Fragment}
        afterEnter={() => videoRef.current?.play()}
      >
        <Dialog
          open={isOpen}
          as="div"
          className="relative z-10 focus:outline-none"
          onClose={handleClose}
        >
          <DialogBackdrop className="fixed inset-0 bg-black/50" />
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
                      />
                    </Field>
                    <Field className="col-span-2">
                      <Label className="text-sm/6 font-medium text-white">
                        Valor
                      </Label>
                      <Input
                        className="mt-3 block w-full rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6 text-white                          focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25"
                        type="number"
                      />
                    </Field>
                    <Field className="col-span-2">
                      <Label className="text-sm/6 font-medium text-white">
                        Data
                      </Label>
                      <Input
                        className="mt-3 block w-full rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6 text-white                          focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25"
                        type="date"
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
                        >
                          <option>Moradia</option>
                          <option>Serviços</option>
                          <option>Salário</option>
                        </Select>
                      </div>
                    </Field>
                  </div>
                </form>
                <div className="mt-4">
                  <Button
                    className="inline-flex items-center gap-2 rounded-md bg-gray-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[focus]:outline-1 data-[focus]:outline-white data-[open]:bg-gray-700"
                    onClick={handleClose}
                  >
                    Adicionar
                  </Button>
                </div>
              </DialogPanel>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
