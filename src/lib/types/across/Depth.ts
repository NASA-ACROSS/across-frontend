export enum DepthUnit {
    AB_MAG = 'ab_mag',
    VEGA_MAG = 'vega_mag',
    FLUX_ERG = 'flux_erg',
    FLUX_JY = 'flux_jy',
}

export type Depth = {
    value: number;
    unit: DepthUnit;
};
