export type NewsDataType = {
    tag: string,
    title: string,
    imgURL: string,
    imgDescription: string,
    newsURL: string,
    date: string,
}

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
        tag: "Mission Selections",
        title: "NASA Selects Proposals to Study Stellar Explosions, Galaxies, Stars",
        imgURL: "assets/img/custom/hubble_mrk1337_esapotw2145a_0.jpg",
        imgDescription: "hubble data",
        newsURL: "https://www.nasa.gov/press-release/nasa-selects-proposals-to-study-stellar-explosions-galaxies-stars",
        date: "Aug 18, 2022",
    },
    {
        tag: "James Webb",
        title: "First Images from the James Webb Space Telescope",
        imgURL: "assets/img/custom/jwst_deepfield.png",
        imgDescription: "First James Webb photo of unseen universe",
        newsURL: "https://www.nasa.gov/press-release/nasa-reveals-webb-telescope-s-first-images-of-unseen-universe",
        date: "Jul 12, 2022",
    },
    {
        tag: "Cosmic-rays",
        title: "NASA’s Fermi Confirms Star Wreck as Source of Extreme Cosmic Particles",
        imgURL: "assets/img/custom/PeVatron.png",
        imgDescription: "cosmic nebula with a bright spot",
        newsURL: "https://www.nasa.gov/feature/goddard/2022/nasa-s-fermi-confirms-star-wreck-as-source-of-extreme-cosmic-particles",
        date: "Aug 10, 2022",
    },
    {
        tag: "Gamma-rays",
        title: "NASA’s Fermi Hunts for Gravitational Waves From Monster Black Holes",
        imgURL: "assets/img/custom/Fermi_Blackhole2.png",
        imgDescription: "depiction of a black hole",
        newsURL: "https://www.nasa.gov/feature/goddard/2022/nasa-s-fermi-hunts-for-gravitational-waves-from-monster-black-holes",
        date: "Apr 7, 2022",
    },
    {
        tag: "Neutrinos",
        title: "NASA’s Fermi Traces Source of Cosmic Neutrino to Monster Black Hole",
        imgURL: "assets/img/custom/Fermi_neutrinos2.png",
        imgDescription: "depiction of a black hole",
        newsURL: "https://www.nasa.gov/press-release/nasa-s-fermi-traces-source-of-cosmic-neutrino-to-monster-black-hole/",
        date: "Jul 12, 2018",
    },
    {
        tag: "Neutrinos",
        title: "NASA’s Swift Helps Tie Neutrino to Star-shredding Black Hole",
        imgURL: "assets/img/custom/AT2019dsg_prores_still_cropped2.jpg",
        imgDescription: "depiction of a black hole",
        newsURL: "https://www.nasa.gov/feature/goddard/2021/nasa-s-swift-helps-tie-neutrino-to-star-shredding-black-hole",
        date: "Feb 22, 2021",
    },
]