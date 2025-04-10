import {z} from "zod";

export const CreateUserSchema=z.object({
    username:z.string().min(1).max(10),
    password:z.string().min(5).max(15),
    name:z.string()
})

export const SigninSchema=z.object({
    username:z.string().min(1).max(10),
    password:z.string().min(5).max(15)
})

export const CreateRoomSchema=z.object({
    name:z.string().min(3).max(20)
})