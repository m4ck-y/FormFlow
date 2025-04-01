/** Without id_user. User National Identifier*/
export interface INationalIdentifier{
    id_national_identifier: number
    value: string
}

export interface IUserNationalIdentifierCreate extends INationalIdentifier{
    id_user: number
}

export interface IUserNationalIdentifierUpdate extends IUserNationalIdentifierCreate{
    id: number
}

export interface IUserNationalIdentifier{
    url_file: string | null
}