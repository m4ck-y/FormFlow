import {EAddressType} from "@/domain/enum/user/contact_type"

/** Without id_user */
export interface IAddress {

    type_address:EAddressType
    key_country: string
    key_state: string
    key_municipality: string
    key_locality: string
    address: string
    complement: string | null
    postal_code: string | null
    latitud: number
    longitud: number
}

export interface IUserAddressCreate extends IAddress{
    id_user: number
}

export interface IUserAddressUpdate extends IUserAddressCreate {
    id: number
}

export interface IUserAddress extends IUserAddressUpdate {

}