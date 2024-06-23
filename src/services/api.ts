const API_URL = "http://localhost:3000/";

export async function getCategories() {
  const response = await fetch(`${API_URL}/transaction-type`,{
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  const data: TransactionTypeEnum[] = await response.json();
  return data;
};

export async function getTransactions() {
  const response = await fetch("http://localhost:3000/transaction",%7B
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Something went wrong");
  }

  const data: Transaction[] = await response.json();
  return data;
};