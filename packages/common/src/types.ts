import {z} from "zod";

export const CreateUserSchema=z.object({
    email:z.string().email().min(1).max(30),
    password:z.string().min(5).max(15),
    name:z.string()
})

export const SigninSchema=z.object({
    email:z.string().email().min(1).max(30),
    password:z.string().min(5).max(15)
})

export const CreateRoomSchema=z.object({
    name:z.string().min(3).max(20)
})