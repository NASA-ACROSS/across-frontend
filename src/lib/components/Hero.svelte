<script>
    import HeroBackgroundImageSrc from "$lib/assets/img/bli_grc_sm.jpg";
</script>

<div class="hero-background">
    <div class="hero-text">
        <h1>The Dawn of a New Era in Astronomy</h1>
        <p class="usa-intro">
            Multimessenger and time-domain astrophysics are opening entirely new
            windows on the Universe. The Astrophysics Cross-Observatory Science
            Support (ACROSS) center is an initiative to facilitate
            communication, coordination, and collaboration in this new era of
            astronomy.
        </p>
    </div>
    <img
        src={HeroBackgroundImageSrc}
        alt="Artist's rendition of a black hole merger event"
    />
</div>

<style>
    .hero-background {
        position: relative;
        display: flex;
        flex-direction: column;
        height: auto;
        overflow: visible;
        background-color: #0003;
    }

    .hero-text {
        padding-top: 5em;
        padding-bottom: 6em;
        padding-left: 10%;
        padding-right: 30%;

        text-shadow: 3px 3px 8px #0007;
    }

    h1 {
        color: #fff;
    }

    p {
        color: #eeee;
    }

    img {
        z-index: -100;
        height: 100%;
        width: 100%;
        opacity: 100%;
        position: absolute;
        object-fit: cover;
    }
</style>
