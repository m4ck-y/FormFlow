import {EPhoneType} from "@/domain/enum/user/contact_type"

/**
 * Without id_user
 */
export interface IPhone {

    code: string
    number: string
    type_phone: EPhoneType
}

export interface IUserPhoneCreate extends IPhone {
    id_user: number
}


export interface IUserPhoneUpdate extends IUserPhoneCreate {
    id: number
}

export interface IUserPhone extends IUserPhoneUpdate
{
}