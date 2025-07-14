import {http} from "@/api/http";
import type { IItemCategory } from "@/domain/models/form/category";

export class CategoryService {
    async List(){
        return http.get<IItemCategory[]>('/form/category/list');
    }

    async Create(name: string, key_industry: number) {
        return http.post<number>('/form/category', { name, key_industry });
    }

}