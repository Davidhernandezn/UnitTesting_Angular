export interface Book {
  id?: string; //opcional
  name: string;
  author: string;
  isbn: string;
  description?: string;
  photoUrl?: string;
  //UTILIZAR PARA EL TEST
  price?: number; 
  amount?: number;
}
