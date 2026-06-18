export type PaginateParams = {
    /** Which page to start pagination from */
    page?: number;
    /** Number of results per page */
    page_limit?: number;
};

export type Paginate<T> = PaginateParams & {
    total_number: number;
    items: T[];
};
