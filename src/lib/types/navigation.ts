export interface Link {
    id: string;
    label: string;
    href?: string;
    localOnly?: boolean;
    newTab?: boolean;
    rel?: string;
    reload?: boolean;
}

export type Header = Link & { links?: Link[] };
