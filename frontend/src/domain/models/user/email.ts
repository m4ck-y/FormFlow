import {EEmailType} from "@/domain/enum/user/contact_type"

/**
    Without user
    Representa un esquema de correo electrónico con campos para el email y el tipo de email.

    Atributos:
    - email (str): La dirección de correo electrónico.
    - type_email (EmailType): El tipo de correo electrónico. Puede ser personal, de trabajo, etc.,
                                según lo definido en el enum EmailType.
*/
export interface IEmail{
    email: string
    type_email: EEmailType
}

export interface IUserEmailCreate extends IEmail{
    id_user: number
}

export interface IUserEmailUpdate extends IUserEmailCreate{
    id: number
}

export type IUserEmail = IUserEmailUpdate