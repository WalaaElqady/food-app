export interface ICategory {
    data: ICategoryData[];
    pageNumber: number;
    pageSize: number;
    totalNumberOfPages: number;
    totalNumberOfRecords: number;
}
export interface ICategoryData {
    id: number;
    name: string;
    creationDate?: Date;
    modificationDate?: Date;
}
export interface IGetCategoryParams {
    pageSize: number;
    pageNumber: number;
}