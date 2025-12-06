export interface Business {
  name: string;
  category: string;
  description: string;
}

export interface BusinessWithId extends Business {
  id: string;
}
