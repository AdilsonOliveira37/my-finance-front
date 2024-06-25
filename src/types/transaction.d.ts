import { TransactionTypeEnum } from "@/app/utils";

export interface Category {
  id: string;
  description: string;
  type: TransactionTypeEnum;
  created_at: string;
  deleted_at: string | null;
}

export interface Transaction {
  description: string;
  value: number;
  date: string;
  id: string;
  transactionType: Category;
  createdAt: string;
  deletedAt: string | null;
}

export type CreateTransactionPayload = Omit<
  Transaction,
  "id" | "createdAt" | "deletedAt" | "transactionType"
> & { transactionTypeId: string };
