export interface User {
  /* The id of the user */
  id: number;
  username: string;
  firstName?: string;
  lastName?: string;
  email: string;
  isActive: boolean;
  tags?: Tag[];
  /* Order Status */
  badge?: "pro" | "hero" | "superhero";
  address?: string[];
}

export interface Tag {
  id: number;
  name: string;
}
