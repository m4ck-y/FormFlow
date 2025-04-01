
import { IRelatinshipTypeCreate } from "./relationship_type"

/**
 * Without id, id_user(owner)
 */
export interface IEmergencyContactBase {
    //id_user_owner:      number
    id_user_contact:    number | null
    retionship_type:    number | IRelatinshipTypeCreate
    full_name:          string | null
    phone:              string | null
    email:              string | null
    notes:              string | null
}

export interface IEmergencyContactCreate extends IEmergencyContactBase {
    id_user_owner: number
}

export interface IEmergencyContactUpdate extends IEmergencyContactCreate {
    id: number
}

export interface IEmergencyContact extends IEmergencyContactUpdate {
}