export interface FormResult{
    name:string;
    children: CategoryResult[];
}

export interface CategoryResult{
    name:string;
    children: any[];
}

export interface QuestionResult{
    name:string;
    values:string[];
}
