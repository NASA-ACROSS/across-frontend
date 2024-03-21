<script>
    import { Header, Button, HeaderLogo, HeaderNav } from "svelte-uswds";
    import NasaLogoRef from "$lib/assets/img/nasa-logo.svg";
    import SearchImg from "$lib/assets/uswds/img/usa-icons-bg/search--white.svg";
</script>

<div class="usa-overlay"></div>
<header class="usa-header usa-header--extended">
    <div class="usa-navbar">
        <div class="usa-logo">
            <img alt="NASA Logo" src={NasaLogoRef} />
            <em class="usa-logo__text"
                ><a href="/" title="Multimessenger Astrophysics"
                    >Multimessenger Astrophysics</a
                ></em
            >
        </div>
        <button type="button" class="usa-menu-btn">Menu</button>
    </div>
    <nav aria-label="Primary navigation" class="usa-nav">
        <div class="usa-nav__inner">
            <button type="button" class="usa-nav__close">
                <img
                    src="/assets/img/usa-icons/close.svg"
                    role="img"
                    alt="Close"
                />
            </button>
            <ul class="usa-nav__primary usa-accordion">
                <li class="usa-nav__primary-item">
                    <button
                        type="button"
                        class="usa-accordion__button usa-nav__link"
                        aria-expanded="false"
                        aria-controls="extended-nav-section-one"
                    >
                        <span>Missions</span>
                    </button>
                    <ul id="extended-nav-section-one" class="usa-nav__submenu">
                        <li class="usa-nav__submenu-item">
                            <a href="javascript:void(0);"
                                ><span>Overview</span></a
                            >
                        </li>
                        <li class="usa-nav__submenu-item">
                            <a href="javascript:void(0);"
                                ><span>Timeline</span></a
                            >
                        </li>
                        <li class="usa-nav__submenu-item">
                            <a href="javascript:void(0);"><span>Active</span></a
                            >
                        </li>
                        <li class="usa-nav__submenu-item">
                            <a href="javascript:void(0);"
                                ><span>Development</span></a
                            >
                        </li>
                    </ul>
                </li>
                <li class="usa-nav__primary-item">
                    <button
                        type="button"
                        class="usa-accordion__button usa-nav__link"
                        aria-expanded="false"
                        aria-controls="extended-nav-section-two"
                    >
                        <span>Tools</span>
                    </button>
                    <ul id="extended-nav-section-two" class="usa-nav__submenu">
                        <li class="usa-nav__submenu-item">
                            <a href="javascript:void(0);"
                                ><span>Overview</span></a
                            >
                        </li>
                        <li class="usa-nav__submenu-item">
                            <a href="javascript:void(0);"
                                ><span>Rapid Reporting Resources</span></a
                            >
                        </li>
                        <li class="usa-nav__submenu-item">
                            <a href="javascript:void(0);"
                                ><span>Data Analytics Toolkits</span></a
                            >
                        </li>
                        <li class="usa-nav__submenu-item">
                            <a href="javascript:void(0);"
                                ><span>Observation Planning Tools</span></a
                            >
                        </li>
                        <li class="usa-nav__submenu-item">
                            <a href="javascript:void(0);"
                                ><span>Data Archives and Repositories</span></a
                            >
                        </li>
                    </ul>
                </li>
                <li class="usa-nav__primary-item">
                    <button
                        type="button"
                        class="usa-accordion__button usa-nav__link"
                        aria-expanded="false"
                        aria-controls="extended-nav-section-two"
                    >
                        <span>Proposals</span>
                    </button>
                    <ul id="extended-nav-section-two" class="usa-nav__submenu">
                        <li class="usa-nav__submenu-item">
                            <a href="javascript:void(0);"
                                ><span>Overview</span></a
                            >
                        </li>
                        <li class="usa-nav__submenu-item">
                            <a href="javascript:void(0);"
                                ><span>Rapid Reporting Resources</span></a
                            >
                        </li>
                        <li class="usa-nav__submenu-item">
                            <a href="javascript:void(0);"
                                ><span>Data Analytics Toolkits</span></a
                            >
                        </li>
                        <li class="usa-nav__submenu-item">
                            <a href="javascript:void(0);"
                                ><span>Observation Planning Tools</span></a
                            >
                        </li>
                        <li class="usa-nav__submenu-item">
                            <a href="javascript:void(0);"
                                ><span>Data Archives and Repositories</span></a
                            >
                        </li>
                    </ul>
                </li>
            </ul>

            <div class="usa-nav__secondary">
                <ul class="usa-nav__secondary-links"></ul>
                <section aria-label="Search component">
                    <form class="usa-search usa-search--small" role="search">
                        <label class="usa-sr-only" for="search-field"
                            >Search</label
                        >
                        <input
                            class="usa-input"
                            id="search-field"
                            type="search"
                            name="search"
                        />
                        <button class="usa-button" type="submit">
                            <img
                                src={SearchImg}
                                class="usa-search__submit-icon"
                                alt="Search"
                            />
                        </button>
                    </form>
                </section>
            </div>
        </div>
    </nav>
</header>

<style>
    .usa-logo {
        display: flex;
        flex-direction: row;
    }

    .usa-nav__primary-item:hover,
    .usa-nav__primary-item:focus,
    .usa-nav__primary-item:hover > .usa-nav__submenu,
    .usa-nav__primary-item:focus > .usa-nav__submenu {
        display: block;
        visibility: visible;
        opacity: 1;
    }

    .usa-nav__submenu {
        display: none;
    }
</style>
