import { ICategoryData } from "../../categories/models/categories";
export interface IGetRecipeParams {
    pageSize: number;
    pageNumber: number;
}
export interface IGetSearchParams {
    name: string;
    pageSize: number;
    pageNumber: number;
    tagId: number;
    categoryId: number;
}
export interface IRecipeData {
    id?: number;
    name: string;
    imagePath?: string;
    description: string;
    price : number;
    category? : ICategoryData[];
    creationDate: Date;
    modificationDate: Date;
    tag?: ITag ;
    recipe?: IRecipeData;

}
export interface ITag {
    id: number;
    name: string;
    creationDate: Date;
    modificationDate: Date;
}
export interface IRecipe {
    data: IRecipeData[];
    pageNumber: number;
    pageSize: number;
    totalNumberOfPages: number;
    totalNumberOfRecords: number;
}