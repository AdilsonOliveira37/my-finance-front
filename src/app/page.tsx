interface Categories {
  id: string;
  description: string;
  type: TransactionTypeEnum;
  created_at: string;
  deleted_at: string | null;
}

interface Transaction {
  description: string;
  value: number;
  date: string;
  transactionType: Categories;
  id: string;
  createdAt: string;
  deletedAt: string | null;
}

enum TransactionTypeEnum {
  INCOME = "R",
  EXPENSE = "D",
}

const getTransactions = async () => {
  const response = await fetch("http://localhost:3000/transaction");

  if (!response.ok) {
    console.error(response.statusText);
    console.error(response.status);
    throw new Error("Something went wrong");
  }

  const data: Transaction[] = await response.json();
  return data;
};

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
    <main className="w-full max-w-7xl flex flex-col items-center ">
      <header className="w-full flex items-start justify-between my-14 ">
        <h1 className="text-4xl inline">My Finance Web</h1>

        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Nova Transação
        </button>
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
