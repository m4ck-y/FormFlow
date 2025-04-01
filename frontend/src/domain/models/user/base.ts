import {EBloodType} from "@/domain/enum/user/blood_type"
import {ECivilStatus} from "@/domain/enum/user/civil_status"
import {EGenderIdentity} from "@/domain/enum/user/gender"
import {EBiologicalSex} from "@/domain/enum/user/biological_sex"
import {CURPSex} from "@/domain/enum/user/curp_sex"
import {EAnswerGeneral, EAnswerMigrant} from "@/domain/enum/user/answer"

export interface IUserBase{
    folio:      string | null
    username:   string

    first_name:         string
    last_name:          string
    second_last_name:   string

    type_blood:         EBloodType | null
    type_civil_status:  ECivilStatus | null

    birthdate:          string | null
    key_country_origin: string | null
    key_birth_country:  string | null
    key_nationality:    string | null
    key_state_birth:    string | null

    occupation: string | null
    known_as:   string | null
    about_me:   string | null
    website:    string | null

    id_religion:            number | null
    id_indigenous_language: number | null
    type_gender:            EGenderIdentity | null
    type_biological_sex:    EBiologicalSex | null
    type_national_id_sex:   CURPSex | null

    self_considers_indigenous:  EAnswerGeneral | null
    self_considers_migrant:     EAnswerMigrant | null

}