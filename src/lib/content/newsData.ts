export type NewsDataType = {
    tag: string;
    title: string;
    img: {
        url: string;
        description: string;
    };
    newsURL: string;
    date: string;
};

/**
 *
 * IMPORTANT: Order here matters, posts at the top will be the first to get displayed.
 *
 * Change NUM_POSTS_DISPLAY in src/routes/+page.server.ts to control how many posts to show.
 * Add newest content to the top of the stack.
 *
 */
export const newsData: NewsDataType[] = [
    {
        tag: 'Black Holes',
        title: "NASA's Hubble, Chandra Find Supermassive Black Hole Duo",
        img: {
            url: 'https://science.nasa.gov/wp-content/uploads/2024/09/hubble-olmstedart-dualagns-stsci-01j29xxpbeg2tqnkcnd6d7z4yn.jpg?w=4096&format=webp',
            description:
                "Artist's depiction of a pair of active black holes at the heart of two merging galaxies.",
        },
        newsURL:
            'https://science.nasa.gov/missions/hubble/nasas-hubble-chandra-find-supermassive-black-hole-duo/',
        date: 'Sep 09, 2024',
    },
    {
        tag: 'Missions',
        title: "NASA's Mini BurstCube Mission Detects Mega Blast",
        img: {
            url: 'https://science.nasa.gov/wp-content/uploads/2024/09/deployment.jpg?w=4096&format=webp',
            description:
                'BurstCube, trailed by another CubeSat named SNOOPI (Signals of Opportunity P-band Investigation), emerges from the International Space Station.',
        },
        newsURL:
            'https://science.nasa.gov/missions/small-satellite-missions/cubesats/burstcube/nasas-mini-burstcube-mission-detects-mega-blast/',
        date: 'Sep 03, 2024',
    },
    {
        tag: 'Gamma-ray Bursts',
        title: "NASA's Fermi Finds New Feature in Brightest Gamma-Ray Burst Yet Seen",
        img: {
            url: 'https://science.nasa.gov/wp-content/uploads/2024/07/grb-jetemerge-4k-00128-ac.jpg?w=4096&format=webp',
            description:
                'A jet of particles moving at nearly light speed emerges from a massive star in an artist’s concept.',
        },
        newsURL:
            'https://science.nasa.gov/science-research/astrophysics/gamma-ray-bursts/nasas-fermi-finds-new-feature-in-brightest-gamma-ray-burst-yet-seen/',
        date: 'Jul 25, 2024',
    },
    {
        tag: 'Novae',
        title: 'NASA, Global Astronomers Await Rare Nova Explosion',
        img: {
            url: 'https://www.nasa.gov/wp-content/uploads/2024/06/novacyg093500952-print.jpg',
            description:
                'A red giant star and white dwarf orbit each other in an animation of a nova similar to T Coronae Borealis',
        },
        newsURL:
            'https://www.nasa.gov/centers-and-facilities/marshall/nasa-global-astronomers-await-rare-nova-explosion/',
        date: 'Jun 06, 2024',
    },
    {
        tag: 'Gamma-ray Bursts',
        title: 'NASA Missions Study What May Be a 1-In-10,000-Year Gamma-ray Burst',
        img: {
            url: 'assets/img/custom/fermi.jpg',
            description: 'The Fermi Gamma-ray Space Telescope',
        },
        newsURL:
            'https://www.nasa.gov/universe/nasa-missions-study-what-may-be-a-1-in-10000-year-gamma-ray-burst/',
        date: 'Mar 28, 2023',
    },
    {
        tag: 'Supernovae',
        title: "NASA's Fermi Mission Sees No Gamma Rays from Nearby Supernova",
        img: {
            url: 'assets/img/custom/fermi.jpg',
            description: 'The Fermi Gamma-ray Space Telescope',
        },
        newsURL:
            'https://science.nasa.gov/missions/fermi/nasas-fermi-mission-sees-no-gamma-rays-from-nearby-supernova/',
        date: 'Apr 16, 2024',
    },
    {
        tag: 'Neutrinos',
        title: "NASA's Fermi Traces Source of Cosmic Neutrino to Monster Black Hole",
        img: {
            url: 'https://www.nasa.gov/wp-content/uploads/2018/07/fermiicecube_as.jpg',
            description:
                "NASA's Fermi (top left) and the IceCube Neutrino Observatory (sensor strings, bottom).",
        },
        newsURL:
            'https://www.nasa.gov/news-release/nasas-fermi-traces-source-of-cosmic-neutrino-to-monster-black-hole/',
        date: 'Jul 12, 2018',
    },
    {
        tag: 'Gamma-rays',
        title: "NASA's Fermi Mission Creates 14-Year Time-Lapse of the Gamma-Ray Sky",
        img: {
            url: 'assets/img/custom/fermi.jpg',
            description: 'The Fermi Gamma-ray Space Telescope',
        },
        newsURL:
            'https://science.nasa.gov/centers-and-facilities/goddard/nasas-fermi-mission-creates-14-year-time-lapse-of-the-gamma-ray-sky/',
        date: 'Dec 20, 2023',
    },
    {
        tag: 'Gamma-rays',
        title: "NASA's Fermi Captures Dynamic Gamma-Ray Sky in New Animation",
        img: {
            url: 'https://www.nasa.gov/wp-content/uploads/2023/03/fermilatlcr900.gif',
            description: 'An animation of the active gamma-ray sky',
        },
        newsURL:
            'https://www.nasa.gov/universe/nasas-fermi-captures-dynamic-gamma-ray-sky-in-new-animation/',
        date: 'Mar 15, 2023',
    },
    {
        tag: 'Gamma-rays',
        title: "NASA's Fermi Detects First Gamma-Ray Eclipses From ‘Spider’ Star Systems",
        img: {
            url: 'https://www.nasa.gov/wp-content/uploads/2023/01/gamrayeclipseg22.jpg',
            description:
                'An orbiting star begins to eclipse its partner, a rapidly rotating, superdense stellar remnant called a pulsar.',
        },
        newsURL:
            'https://www.nasa.gov/universe/nasas-fermi-detects-first-gamma-ray-eclipses-from-spider-star-systems/',
        date: 'Jan 26, 2023',
    },
    {
        tag: 'Mission Selections',
        title: 'NASA Selects Proposals to Study Stellar Explosions, Galaxies, Stars',
        img: {
            url: 'assets/img/custom/hubble_mrk1337_esapotw2145a_0.jpg',
            description: 'hubble data',
        },
        newsURL:
            'https://www.nasa.gov/press-release/nasa-selects-proposals-to-study-stellar-explosions-galaxies-stars',
        date: 'Aug 18, 2022',
    },
    {
        tag: 'James Webb',
        title: 'First Images from the James Webb Space Telescope',
        img: {
            url: 'assets/img/custom/jwst_deepfield.png',
            description: 'First James Webb photo of unseen universe',
        },
        newsURL:
            'https://www.nasa.gov/press-release/nasa-reveals-webb-telescope-s-first-images-of-unseen-universe',
        date: 'Jul 12, 2022',
    },
    {
        tag: 'Cosmic-rays',
        title: "NASA's Fermi Confirms Star Wreck as Source of Extreme Cosmic Particles",
        img: {
            url: 'assets/img/custom/PeVatron.png',
            description: 'cosmic nebula with a bright spot',
        },
        newsURL:
            'https://www.nasa.gov/feature/goddard/2022/nasa-s-fermi-confirms-star-wreck-as-source-of-extreme-cosmic-particles',
        date: 'Aug 10, 2022',
    },
    {
        tag: 'Gamma-rays',
        title: "NASA's Fermi Hunts for Gravitational Waves From Monster Black Holes",
        img: {
            url: 'assets/img/custom/Fermi_Blackhole2.png',
            description: 'depiction of a black hole',
        },
        newsURL:
            'https://www.nasa.gov/feature/goddard/2022/nasa-s-fermi-hunts-for-gravitational-waves-from-monster-black-holes',
        date: 'Apr 7, 2022',
    },
    {
        tag: 'Neutrinos',
        title: "NASA's Fermi Traces Source of Cosmic Neutrino to Monster Black Hole",
        img: {
            url: 'assets/img/custom/Fermi_neutrinos2.png',
            description: 'depiction of a black hole',
        },
        newsURL:
            'https://www.nasa.gov/press-release/nasa-s-fermi-traces-source-of-cosmic-neutrino-to-monster-black-hole/',
        date: 'Jul 12, 2018',
    },
    {
        tag: 'Neutrinos',
        title: "NASA's Swift Helps Tie Neutrino to Star-shredding Black Hole",
        img: {
            url: 'assets/img/custom/AT2019dsg_prores_still_cropped2.jpg',
            description: 'depiction of a black hole',
        },
        newsURL:
            'https://www.nasa.gov/feature/goddard/2021/nasa-s-swift-helps-tie-neutrino-to-star-shredding-black-hole',
        date: 'Feb 22, 2021',
    },
];
