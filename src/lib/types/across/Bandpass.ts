// Energy units enum
export type EnergyUnit = 'eV' | 'keV' | 'MeV' | 'GeV' | 'TeV';

// Frequency units enum
export type FrequencyUnit = 'Hz' | 'kHz' | 'MHz' | 'GHz' | 'THz';

// Wavelength units enum
export type WavelengthUnit = 'nm' | 'angstrom' | 'um' | 'mm';

// Base interface for all bandpass types
interface BaseBandpass {
    filter_name: string | null;
    min: number | null;
    max: number | null;
}

// Energy bandpass type
interface EnergyBandpass extends BaseBandpass {
    type: 'ENERGY';
    unit: EnergyUnit;
}

// Frequency bandpass type
interface FrequencyBandpass extends BaseBandpass {
    type: 'FREQUENCY';
    unit: FrequencyUnit;
}

// Wavelength bandpass type
interface WavelengthBandpass extends BaseBandpass {
    type: 'WAVELENGTH';
    unit: WavelengthUnit;
    central_wavelength?: number | null;
    peak_wavelength?: number | null;
    bandwidth?: number | null;
}

// Union type that can be any of the bandpass types
export type Bandpass = EnergyBandpass | FrequencyBandpass | WavelengthBandpass;
