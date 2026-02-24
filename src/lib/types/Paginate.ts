export type Paginate<T> = {
    total_number: number;
    page?: number;
    page_limit?: number;
    items: T[];
};
