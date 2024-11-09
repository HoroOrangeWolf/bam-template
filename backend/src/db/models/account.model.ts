import AccountTypeConstant from '@main/db/constant/accountType.constant.ts';
import { QueryResultRow } from 'pg';

type AccountTypeType = typeof AccountTypeConstant;

export type AccountTypes = AccountTypeType[keyof AccountTypeType];

export interface AccountModel {
    account_id: number;
    name: string;
    surname: string;
    password: string;
    account_name: string;
    street: string;
    city: string;
    state: string;
    account_type: AccountTypes;
    zip_code: string;
    country: string;
    phone_number: string;
}

export interface AccountModelQueryResult extends QueryResultRow {
    account_id: number;
    name: string;
    surname: string;
    password: string;
    account_name: string;
    street: string;
    city: string;
    state: string;
    account_type: AccountTypes;
    zip_code: string;
    country: string;
    phone_number: string;
}
