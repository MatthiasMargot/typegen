export interface Order {
  id?: number;
  petId?: number;
  quantity?: number;
  shipDate?: string;
  status?: "placed" | "approved" | "delivered";
  complete?: boolean;
}

export interface Category {
  id?: number;
  name?: string;
}

export interface User {
  id?: number;
  username?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  phone?: string;
  userStatus?: number;
}

export interface Tag {
  id?: number;
  name?: string;
}

export interface Pet {
  id?: number;
  category?: Category;
  name: string;
  photoUrls: string[];
  tags?: Tag[];
  status?: "available" | "pending" | "sold";
}

export interface ApiResponse {
  code?: number;
  type?: string;
  message?: string;
}

export type PetFindByStatusGetOK = Pet[];

export type PetFindByTagsGetOK = Pet[];

export type PetByPetIdGetOK = Pet;

export type PetByPetIdUploadImagePostOK = ApiResponse;

export interface StoreInventoryGetOK {}

export type StoreOrderPostOK = Order;

export type StoreOrderByOrderIdGetOK = Order;

export type UserLoginGetOK = string;

export type UserByUsernameGetOK = User;
