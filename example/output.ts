export interface User {
  id: number;
  username: string;
  firstName?: string;
  lastName?: string;
  email: string;
  isActive: boolean;
  tags?: Tag[];
  badge?: "pro" | "hero" | "superhero";
  address?: string[];
}

export interface Tag {
  id: number;
  name: string;
}
