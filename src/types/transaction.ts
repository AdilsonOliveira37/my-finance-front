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
  
  export enum TransactionTypeEnum {
    INCOME = "R",
    EXPENSE = "D",
  }