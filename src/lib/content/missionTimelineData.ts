export const missionTimelineData: MissionTimelineData[] = [
    {
        name: 'Fermi',
        type: 'Gamma-ray',
        start: 2010,
        end: 2028,
        fade: 2025,
        index: 1,
    },
    {
        name: 'Swift',
        type: 'Gamma-ray',
        start: 2010,
        end: 2028,
        fade: 2025,
        index: 2,
    },
    {
        name: 'ULTRASAT',
        type: 'Gamma-ray',
        start: 2026,
        end: 2032,
        fade: 2029,
        index: 3,
    },
    {
        name: 'StarBurst',
        type: 'Gamma-ray',
        start: 2027.5,
        end: 2030.5,
        fade: 2028.5,
        index: 4,
    },
    {
        name: 'COSI',
        type: 'Gamma-ray',
        start: 2027.5,
        end: 2033,
        fade: 2030.5,
        index: 5,
    },
    {
        name: 'Chandra',
        type: 'X-ray',
        start: 2010,
        end: 2029,
        fade: 2026,
        index: 1,
    },
    {
        name: 'XMM',
        type: 'X-ray',
        start: 2010,
        end: 2028,
        fade: 2026,
        index: 2,
    },
    {
        name: 'Swift',
        type: 'X-ray',
        start: 2010,
        end: 2028,
        fade: 2026,
        index: 3,
    },
    {
        name: 'NuStar',
        type: 'X-ray',
        start: 2012.5,
        end: 2030,
        fade: 2027,
        index: 4,
    },
    {
        name: 'Nicer',
        type: 'X-ray',
        start: 2017.5,
        end: 2027,
        fade: 2025,
        index: 5,
    },
    {
        name: 'HST',
        type: 'Optical & UV',
        start: 2010,
        end: 2030,
        fade: 2027,
        index: 1,
    },
    {
        name: 'Swift',
        type: 'Optical & UV',
        start: 2010,
        end: 2030,
        fade: 2025,
        index: 2,
    },
    {
        name: 'TESS',
        type: 'Optical & UV',
        start: 2018.416,
        end: 2027,
        fade: 2025,
        index: 3,
    },
    {
        name: 'Euclid',
        type: 'Optical & UV',
        start: 2023.58,
        end: 2033.58,
        fade: 2030,
        index: 4,
    },
    {
        name: 'HST',
        type: 'Infrared',
        start: 2010,
        end: 2030,
        fade: 2027,
        index: 1,
    },
    {
        name: 'JWST',
        type: 'Infrared',
        start: 2021,
        end: 2032,
        fade: 2030,
        index: 2,
    },
    {
        name: 'SPHEREx',
        type: 'Infrared',
        start: 2025.3,
        end: 2028,
        fade: 2026,
        index: 3,
    },
    {
        name: 'Roman',
        type: 'Infrared',
        start: 2027,
        end: 2034,
        fade: 2034,
        index: 4,
    },
    {
        name: 'O1',
        type: 'GW & nu',
        start: 2015.5,
        end: 2016.2,
        fade: 2016.2,
        index: 2,
    },
    {
        name: 'O2',
        type: 'GW & nu',
        start: 2016.75,
        end: 2017.75,
        fade: 2017.75,
        index: 2,
    },
    {
        name: 'O3',
        type: 'GW & nu',
        start: 2019.2,
        end: 2020.25,
        fade: 2020.25,
        index: 2,
    },
    {
        name: 'O4',
        type: 'GW & nu',
        start: 2023.5,
        end: 2025,
        fade: 2025,
        index: 2,
    },
    {
        name: 'LIGO O5',
        type: 'GW & nu',
        start: 2027.5,
        end: 2030.5,
        fade: 2030.5,
        index: 2,
    },
    {
        name: 'IceCube',
        type: 'GW & nu',
        start: 2011,
        end: 2027.75,
        fade: 2027.75,
        index: 3,
    },
    {
        name: 'IceCube-Gen2',
        type: 'GW & nu',
        start: 2028,
        end: 2034,
        fade: 2032,
        index: 3,
    },
];

type MissionTimelineData = {
    name: string;
    type: MissionObservingType;
    start: number;
    end: number;
    fade: number;
    index: number;
};

type MissionObservingType =
    | 'Gamma-ray'
    | 'X-ray'
    | 'Optical & UV'
    | 'Infrared'
    | 'GW & nu';
