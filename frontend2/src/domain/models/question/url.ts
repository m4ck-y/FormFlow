export enum EUrlType {
  LINK = "LINK",
  IMAGE = "IMAGE",
}

export interface IBaseURL {
    value: string
    type: EUrlType
}

export interface ICreateAPIURL extends IBaseURL {
    value: string
    type: EUrlType
}

export interface IItemURL extends IBaseURL {
    id: number
}

export interface IDetailURL extends IItemURL {
    id: number
}

export interface IUpdateURL extends IBaseURL {
    id: number
}