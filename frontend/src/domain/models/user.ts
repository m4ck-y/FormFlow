import {IUserBase} from "@/domain/models/user/base"
import {IAddress} from "@/domain/models/user/address"
import {IEmail} from "@/domain/models/user/email"
import {IPhone} from "@/domain/models/user/phone"
import {INationalIdentifier} from "@/domain/models/user/national_identifier"

import {EVerificationStatus} from "@/domain/enum/verification_status"

export interface IUserCreate extends IUserBase {
    password:           string | null
    list_addresses:     IAddress[]
    list_emails:        IEmail[]
    list_phones:        IPhone[]
    list_national_ids:  INationalIdentifier[]
}

export interface IUserUpdate extends IUserBase {
    id:                     number
    password:               string | null
    verification_status:    EVerificationStatus
}

export interface IUser extends IUserUpdate{
    score_general:  number | null
    url_photo:      string | null
}