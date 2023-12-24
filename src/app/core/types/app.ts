export type Environment = {
    production: boolean;
    apiBaseUrl: string;
};

export type Filter<T> = {
    key: keyof T;
    value: T[keyof T];
};

export type Page = {
    index: number;
    size: number;
    length: number;
};
