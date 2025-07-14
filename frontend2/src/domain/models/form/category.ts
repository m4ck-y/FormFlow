export interface IBaseCategory {
    key_industry: number
    name: string
}

export interface ICreateAPICategory extends IBaseCategory {
}

export interface IItemCategory extends IBaseCategory {
    id: number
}


export interface IDetailCategory extends IItemCategory {
}

export interface IUpateCategory extends IBaseCategory {
    id: number
}