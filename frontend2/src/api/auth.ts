import { http } from "./http";
import { Login } from "@/domain/dto/auth/login";
import type { ITokenPayload } from "@/domain/models/auth/auth";

export class AuthService {
    async Login(user:string, password: string) {
        const userCredentials = new Login(user, password);
        return http.post<ITokenPayload>('/auth', userCredentials);
    }
}