export type MissionsCardDataType = {
    tags: string[];
    title: string;
    description: string;
    imgURL: string;
    href: string;
    buttons: {
        href: string;
        text: string;
    }[];
};

export const missionsCardData: MissionsCardDataType[] = [
    {
        tags: ['Gamma-Rays'],
        title: 'The Fermi Gamma-ray Space Telescope',
        description:
            'Fermi provides an unprecedented energy coverage of the gamma-ray spectrum. Its two instruments collective cover an energy range from 8 keV to over 200 GeV, with an extremely large field of view, making it indispensable as a gamma-ray monitor.',
        imgURL: '/assets/img/custom/fermi.jpg',
        href: 'https://fermi.gsfc.nasa.gov/',
        buttons: [
            {
                href: 'https://fermi.gsfc.nasa.gov/',
                text: 'Science Support Center',
            },
            {
                href: 'https://fermi.gsfc.nasa.gov/',
                text: 'Data Archive',
            },
        ],
    },
    {
        tags: ['Gamma-Rays', 'X-rays', 'Ultraviolet', 'Optical'],
        title: 'The Neil Gehrels Swift Observatory',
        description:
            'Swift is a multi-wavelength space observatory and has long been a workhorse for time-domain and multimessenger astronomy. Its three instruments work together to observe GRBs and their afterglows in the gamma-ray, X-ray, ultraviolet, and optical wavebands.',
        imgURL: '/assets/img/custom/swift.jpg',
        href: 'https://swift.gsfc.nasa.gov/',
        buttons: [
            {
                href: 'https://swift.gsfc.nasa.gov/',
                text: 'Science Support Center',
            },
            {
                href: 'https://swift.gsfc.nasa.gov/',
                text: 'Data Archive',
            },
        ],
    },
    {
        tags: ['Ultraviolet', 'Optical', 'Infrared'],
        title: 'The Hubble Space Telescope (HST)',
        description:
            'HST is one of the most versatile space telescopes in operation and has become a vital research tool for multimessenger astronomy. HST features a 2.4m mirror, and its five main instruments observe in the ultraviolet, visible, and near-infrared regions of the electromagnetic spectrum.',
        imgURL: '/assets/img/custom/hubble.jpg',
        href: 'https://hubblesite.org',
        buttons: [
            {
                href: 'https://www.stsci.edu',
                text: 'Science Support Center',
            },
            {
                href: 'https://archive.stsci.edu/missions',
                text: 'Data Archive',
            },
        ],
    },
    {
        tags: ['X-rays'],
        title: 'Chandra X-ray Observatory',
        description:
            'Chandra is one of the most versatile X-ray telescopes in orbit, providing sensitive X-ray coverage from 0.1 to 10 keV with at a resolution of 0.5 arcsec, coupled with a robust target of opportunity program.',
        imgURL: '/assets/img/custom/chandra2.jpg',
        href: 'https://chandra.harvard.edu',
        buttons: [
            {
                href: 'https://cxc.harvard.edu/index.html',
                text: 'Science Support Center',
            },
            {
                href: 'https://cxc.harvard.edu/cda/',
                text: 'Data Archive',
            },
        ],
    },
    {
        tags: ['X-rays'],
        title: 'XMM-Newton',
        description:
            'XMM-Newton is an X-ray observatory that consists of 3 high throughput X-ray telescopes with an unprecedented effective area, and an optical monitor. The large collecting area and ability to make long uninterrupted exposures provide highly sensitive observations.',
        imgURL: '/assets/img/custom/xmm2.jpg',
        href: 'https://www.cosmos.esa.int/web/xmm-newton',
        buttons: [
            {
                href: 'https://www.cosmos.esa.int/web/xmm-newton',
                text: 'Science Support Center',
            },
            {
                href: 'https://www.cosmos.esa.int/web/xmm-newton',
                text: 'Data Archive',
            },
        ],
    },
    {
        tags: ['X-rays'],
        title: 'NuStar',
        description:
            'NuStar is a direct-imaging X-ray telescope with energies beyond those of the Chandra X-ray Observatory and XMM-Newton, covering an energy range of 3-79 keV at a resolution of 9.5 arcsec.',
        imgURL: '/assets/img/custom/nustar.png',
        href: 'https://www.nustar.caltech.edu',
        buttons: [
            {
                href: 'https://heasarc.gsfc.nasa.gov/docs/nustar/',
                text: 'Science Support Center',
            },
            {
                href: 'https://heasarc.gsfc.nasa.gov/docs/nustar/archive/nustar_archive.html',
                text: 'Data Archive',
            },
        ],
    },
    {
        tags: ['X-rays'],
        title: 'NICER',
        description:
            'Nicer is a soft X-ray telescope that is capable of providing precise time of arrival information for each photon detected by its array of 56 X-ray Timing Instruments between 0.2 to 12 keV.',
        imgURL: '/assets/img/custom/nicer.jpg',
        href: 'https://www.nasa.gov/nicer',
        buttons: [
            {
                href: 'https://heasarc.gsfc.nasa.gov/docs/nicer/',
                text: 'Science Support Center',
            },
            {
                href: 'https://heasarc.gsfc.nasa.gov/docs/nicer/nicer_archive.html',
                text: 'Data Archive',
            },
        ],
    },
    {
        tags: ['X-rays'],
        title: 'IXPE',
        description:
            'IXPE exploits the polarization state of light from sources to provide insight into our understanding of X-ray production in objects such as neutron stars and pulsar wind nebulae',
        imgURL: '/assets/img/custom/ixpe2.jpg',
        href: 'https://ixpe.msfc.nasa.gov',
        buttons: [
            {
                href: 'https://ixpe.msfc.nasa.gov/for_scientists/index.html',
                text: 'Science Support Center',
            },
            {
                href: 'https://heasarc.gsfc.nasa.gov/docs/ixpe/',
                text: 'Data Archive',
            },
        ],
    },
    {
        tags: ['Optical'],
        title: 'The Transiting Exoplanet Survey Satellite (TESS)',
        description:
            'TESS is designed to discover thousands of exoplanets in orbit around the brightest dwarf stars in the sky. The survey strategy of the night sky employed by TESS makes it sensitive to a number of time-domain transient sources.',
        imgURL: '/assets/img/custom/tess.jpg',
        href: 'https://exoplanets.nasa.gov/tess/',
        buttons: [
            {
                href: 'https://heasarc.gsfc.nasa.gov/docs/tess/',
                text: 'Science Support Center',
            },
            {
                href: 'https://archive.stsci.edu/missions-and-data/tess',
                text: 'Data Archive',
            },
        ],
    },
];
