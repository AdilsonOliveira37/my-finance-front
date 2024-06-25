import {
  Category,
  CreateTransactionPayload,
  Transaction,
} from "@/types/transaction";

const API_URL = "http://localhost:3000";

export async function fetchCategories() {
  const response = await fetch(`${API_URL}/transaction-type`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  const data: Category[] = await response.json();
  return data;
}

export async function fetchTransactions() {
  const response = await fetch(`${API_URL}/transaction`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Referer: "http://localhost:3000/",
    },
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  const data: Transaction[] = await response.json();
  return data;
}

export async function createTransaction(transaction: CreateTransactionPayload) {
  const response = await fetch(`${API_URL}/transaction`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(transaction),
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  const data: Transaction = await response.json();
  return data;
}
