export interface IGetUsersParams {
    pageSize: number;
    pageNumber: number;
}
export interface IGetSearchParams {
    userName: string;
    groups?: number;
    pageSize: number;
    pageNumber: number;
}
export interface IGroupData {
    id: number;
    name: string; 
}
export interface IUserData {
    id?: number;
    userName: string;
    email: string;
    country: string;
    phoneNumber: string;
    imagePath?: string;
    group?: IGroupData;
    creationDate: Date;
    modificationDate: Date;
}
export interface User {
    id?: number;
    userName: string;
    email: string;
    country: string;
    phoneNumber: string;
    imagePath: string;
    group: IGroup;
    creationDate: string;
    modificationDate: string;
  }
export interface IUpdateUserData {
    id?: number;
    userName: string;
    email: string;
    country: string;
    phoneNumber: string;
    imagePath?: string;
    confirmPassword: string;

}

export interface IUser {
    data: IUserData[];
    pageNumber: number;
    pageSize: number;
    totalNumberOfPages: number;
    totalNumberOfRecords: number;
}

export interface IGroup {
    id: number;
    name: string;
    creationDate: Date;
    modificationDate: Date;
}