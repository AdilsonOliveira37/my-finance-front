import NewTransactionModal from "@/components/NewTransactionModal";
import { getTransactions } from "@/services/api";

export default async function Home() {
  const transactions = await getTransactions()
    .then((data) => {
      console.log(data);
      const formattedTransactions = data.map((transaction) => {
        return {
          ...transaction,
          date: new Date(transaction.createdAt).toLocaleDateString("pt-BR"),
          value: new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
          }).format(transaction.value),
        };
      });

      return formattedTransactions;
    })
    .catch((error) => {
      console.error(error);
    });

  const types = {
    [TransactionTypeEnum.INCOME]: "RECEITA",
    [TransactionTypeEnum.EXPENSE]: "DESPESA",
  };
  return (
    <main className="w-full  mx-auto  max-w-7xl flex flex-col items-center ">
      <header className="w-full flex items-start justify-between my-14 ">
        <h1 className="text-4xl inline">My Finance Web</h1>

        <NewTransactionModal />
      </header>

      <section className="w-full">
        <ol>
          <li className="w-full grid grid-cols-5 border-b border-gray-500 p-2">
            <span>Descrição</span>
            <span>Valor</span>
            <span>Data</span>
            <span>Categoria</span>
            <span>Tipo</span>
          </li>
          {transactions?.map((transaction) => (
            <li key={transaction.id} className="w-full grid grid-cols-5 p-2">
              <span>{transaction.description}</span>
              <span>{transaction.value}</span>
              <span>{transaction.date}</span>
              <span>{transaction.transactionType?.description}</span>
              <span>{types[transaction.transactionType?.type]}</span>
            </li>
          ))}
        </ol>
      </section>
    </main>
  );
}
