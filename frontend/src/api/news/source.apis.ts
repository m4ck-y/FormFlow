import { ENewsSource } from "@/domain/enum/news/source";

export interface NewsSourceApi {
    List: (skip: number, limit: number) => string;
    Detail: (id: string) => string;
}

export const newsSourceApis: Record<ENewsSource, NewsSourceApi> = {

    [ENewsSource.MEXICO_AEROSPACE]: {
        List: (skip: number, limit?: number) => `https://api.mexicoaeroespacial.mx/news?skip=${skip}&limit=${limit}`,

        Detail: (id: string) => `https://api.mexicoaeroespacial.mx/news/${id}`,
    },
    [ENewsSource.MILENIO]: {
        List: (skip: number, limit: number) => `https://api.milenio.com/news?skip=${skip}&limit=${limit}`,

        Detail: (id: string) => `https://api.milenio.com/news/${id}`,
    },[ENewsSource.SECRETARIA_SALUD_MX]:{
        List: (skip: number, limit?: number) => `http://192.168.100.123:6616/getListNews?offset=${skip}&limit=${limit}`,
        
        Detail: (id: string) => `https://api.mexicoaeroespacial.mx/news/${id}`,
    }
};
