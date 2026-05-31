export enum UserRole {
  ADMIN = "ADMIN",
  USER = "USER",
}

export interface UserEntity {
  id: string
  name: string
  email: string
  password: string
  role: UserRole
  createdAt: Date
  updatedAt: Date
}

export interface CreateUserDTO {
  name: string
  email: string
  password: string
  role?: UserRole
}

export interface UpdateUserDTO {
  name?: string
  email?: string
  password?: string
  role?: UserRole
}
