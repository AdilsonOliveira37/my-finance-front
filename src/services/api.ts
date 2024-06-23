import { Categories, Transaction, TransactionTypeEnum } from "@/types/transaction";

const API_URL = "http://localhost:3000";

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

  const data: Categories[] = await response.json();
  return data;
};

export async function getTransactions() {
  const response = await fetch(`${API_URL}/transaction`,{
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  const data: Transaction[] = await response.json();
  return data;
};