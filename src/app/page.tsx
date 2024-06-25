"use client";

import NewTransactionModal from "@/app/components/NewTransactionModal";
import { TransactionList } from "./components/TransactionList";
import { TransactionProvider } from "@/contexts/transaction-context";

export default function Home() {
  return (
    <TransactionProvider>
      <main className="w-full  mx-auto  max-w-7xl flex flex-col items-center ">
        <header className="w-full flex items-start justify-between my-14 ">
          <h1 className="text-4xl inline">My Finance Web</h1>

          <NewTransactionModal />
        </header>

        <TransactionList />
      </main>
    </TransactionProvider>
  );
}
