import {IUserCreate} from "@/domain/models/user";
import { IAddress } from "../models/user/address";
import { IEmail } from "../models/user/email";
import { INationalIdentifier } from "../models/user/national_identifier";
import { IPhone } from "../models/user/phone";
import { UserBase } from "@/domain/dto/user/base";

export class UserCreate extends UserBase implements IUserCreate {
    password: string | null;
    list_addresses: IAddress[];
    list_emails: IEmail[];
    list_phones: IPhone[];
    list_national_ids: INationalIdentifier[];
    
    constructor(username : string, first_name : string, last_name : string, second_last_name : string) {
        super(username, first_name, last_name, second_last_name);
        this.password = null;
        this.list_addresses = [];
        this.list_emails = [];
        this.list_phones = [];
        this.list_national_ids = [];
    }
} 