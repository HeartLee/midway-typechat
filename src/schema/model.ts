interface Field {
    fieldName: string;
    fieldType: 'date' | 'string';
    alias: string;
}

export type Model ={
    modelName: string;
    fields: Field[];
}