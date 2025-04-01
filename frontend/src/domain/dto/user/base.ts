import { EAnswerGeneral, EAnswerMigrant } from "@/domain/enum/user/answer";
import { EBiologicalSex } from "@/domain/enum/user/biological_sex";
import { EBloodType } from "@/domain/enum/user/blood_type";
import { ECivilStatus } from "@/domain/enum/user/civil_status";
import { CURPSex } from "@/domain/enum/user/curp_sex";
import { EGenderIdentity } from "@/domain/enum/user/gender";
import {IUserBase} from "@/domain/models/user/base";

export class UserBase implements IUserBase {
    folio: string | null;
    username: string;
    first_name: string;
    last_name: string;
    second_last_name: string;
    type_blood: EBloodType | null;
    type_civil_status: ECivilStatus | null;
    birthdate: string | null;
    key_country_origin: string | null;
    key_birth_country: string | null;
    key_nationality: string | null;
    key_state_birth: string | null;
    occupation: string | null;
    known_as: string | null;
    about_me: string | null;
    website: string | null;
    id_religion: number | null;
    id_indigenous_language: number | null;
    type_gender: EGenderIdentity | null;
    type_biological_sex: EBiologicalSex | null;
    type_national_id_sex: CURPSex | null;
    self_considers_indigenous: EAnswerGeneral | null;
    self_considers_migrant: EAnswerMigrant | null;


    constructor(username : string, first_name : string, last_name : string, second_last_name : string) {
        this.username = username;
        this.first_name = first_name;
        this.last_name = last_name;
        this.second_last_name = second_last_name;
        this.folio = null;
        this.type_blood = null;
        this.type_civil_status = null;
        this.birthdate = null;
        this.key_country_origin = null;
        this.key_birth_country = null;
        this.key_nationality = null;
        this.key_state_birth = null;
        this.occupation = null;
        this.known_as = null;
        this.about_me = null;
        this.website = null;
        this.id_religion = null;
        this.id_indigenous_language = null;
        this.type_gender = null;
        this.type_biological_sex = null;
        this.type_national_id_sex = null;
        this.self_considers_indigenous = null;
        this.self_considers_migrant = null;
    }

}