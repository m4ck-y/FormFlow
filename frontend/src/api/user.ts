import { http } from "./http";
import { UserCreate } from "@/domain/dto/user";

export class UserService {
    async getProfile() {
        return http.get('/user/profile');
    }

    async Register(firstName: string, lastName: string, secondLastName: string, email: string, password: string) {
        const newUser = new UserCreate(email, firstName, lastName, secondLastName);
        newUser.password = password;
        return http.post('/user/register', newUser);
    }

    async Exists(username: string) {
        return http.get('/user/exists', { username });
    }
}