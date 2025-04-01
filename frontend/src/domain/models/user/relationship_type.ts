export interface IRelatinshipTypeCreate {
    name: string
}

export interface IRelatinshipTypeUpdate extends IRelatinshipTypeCreate {
    validated: boolean
}

export interface IRelatinshipType extends IRelatinshipTypeUpdate{
    
}