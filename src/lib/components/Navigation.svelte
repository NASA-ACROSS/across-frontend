<script>
    import { base } from '$app/paths';

    import { loggedIn } from '$lib/stores/login';

    let isLoggedIn = false;
    loggedIn.subscribe((value)=>{
        isLoggedIn = value
    });
</script>

<nav
    class="header navbar navbar-expand-lg bg-light navbar-sticky border-bottom"
>
    <div class="container px-3">
        <a href="{base}/" class="navbar-brand pe-3">
            <img
                src="{base}/assets/img/custom/logo-nasa.svg"
                width="75"
                alt="NASA logo"
            />
            <!-- <span class='navbar-title' >Multimessenger<br> Astrophysics</span> -->
            <p class="navbar-title mt-0 mb-0" style="line-height:25px">
                Multimessenger<br /> Astrophysics
            </p>
        </a>
        <button
            type="button"
            class="navbar-toggler ms-auto"
            data-bs-toggle="offcanvas"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
        >
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="offcanvas offcanvas-end" id="navbarNav">
            <div
                class="offcanvas-header shadow-sm border-bottom"
                data-bs-dismiss="offcanvas"
            >
                <h6 class="offcanvas-title">Menu</h6>
                <button type="button" class="btn-close"></button>
            </div>
            <div class="offcanvas-body">
                <ul class="navbar-nav mb-lg-0 justify-content-end">
                    <!-- <li class="nav-item">
                        <a href="{base}/" class="nav-link">Home</a>
                    </li> -->
                    <li class="nav-item dropdown">
                        <a
                            href="{base}/missions"
                            class="nav-link dropdown-toggle"
                            aria-current="page">Missions</a
                        >
                        <ul class="dropdown-menu">
                            <li>
                                <a
                                    href="{base}/missions#overview"
                                    class="dropdown-item">Overview</a
                                >
                            </li>
                            <li>
                                <a
                                    href="{base}/missions#timeline"
                                    class="dropdown-item">Timeline</a
                                >
                            </li>
                            <li>
                                <a
                                    href="{base}/missions#timeline"
                                    class="dropdown-item">ToO Capabilties</a
                                >
                            </li>                            
                            <li>
                                <a
                                    href="{base}/missions#active"
                                    class="dropdown-item">Active</a
                                >
                            </li>
                            <li>
                                <a
                                    href="{base}/missions#development"
                                    class="dropdown-item">Development</a
                                >
                            </li>
                        </ul>
                    </li>
                    <li class="nav-item dropdown">
                        <a href="#" class="nav-link dropdown-toggle" data-bs-toggle="dropdown">Tools</a>
                        <div class="dropdown-menu">
                          <div class="d-lg-flex pt-lg-3">
                            <div class="mega-dropdown-column" style="width: 235px;">
                                <h6 class="px-3 mb-2">Situational Awareness</h6>
                              <ul class="list-unstyled mb-3">
                                <li><a href="about-v1.html" class="dropdown-item py-1">Mission Status Dashboard</a></li>
                                <li><a href="about-v2.html" class="dropdown-item py-1">Mission Skymap</a></li>
                                <li><a href="about-v3.html" class="dropdown-item py-1">Orbit Plotter</a></li>
                              </ul>   
                              <h6 class="px-3 mb-2">Observation Planning</h6>
                              <ul class="list-unstyled mb-3">
                                  <li><a href="blog-list-with-sidebar.html" class="dropdown-item py-1">Visibility Calculator</a></li>
                                  <!-- <li><a href="blog-list-with-sidebar.html" class="dropdown-item py-1">Sensitivity Calculator</a></li> -->
                              </ul>                                                              
                     
                            </div>
                            <div class="mega-dropdown-column" style="width: 235px;">    
                                <h6 class="px-3 mb-2">Observation Requests</h6>
                                <ul class="list-unstyled mb-3">
                                    <li><a href="blog-list-with-sidebar.html" class="dropdown-item py-1">ToO Capabilities</a></li>
                                    <li><a href="blog-list-with-sidebar.html" class="dropdown-item py-1">Swift ToOs</a></li>
                                    <li><a href="blog-list-with-sidebar.html" class="dropdown-item py-1">BurstCube ToOs</a></li>
                                </ul>                                                              
                                <h6 class="px-3 mb-2">ACROSS API</h6>
                                <ul class="list-unstyled mb-3">
                                    <li><a href="portfolio-grid.html" class="dropdown-item py-1">Documentation</a></li>
                                    <li><a href="portfolio-list.html" class="dropdown-item py-1">FAQ</a></li>
                                </ul>
                            </div>
                          </div>
                        </div>
                      </li>  
                    <li class="nav-item dropdown">
                        <a href="#" class="nav-link dropdown-toggle" data-bs-toggle="dropdown">Resources</a>
                        <div class="dropdown-menu">
                          <div class="d-lg-flex pt-lg-3">
                            <div class="mega-dropdown-column" style="width: 210px;">
                                <h6 class="px-3 mb-2"><a href="#">ACROSS Support</a></h6>
                                <ul class="list-unstyled mb-3">
                                <li><a href="services-v1.html" class="dropdown-item py-1">TDAMM Help Desk</a></li>
                                <li><a href="#" class="dropdown-item py-1">Analysis Tutorials</a></li>
                                </ul>  
                                <h6 class="px-3 mb-2">Papers and Studies</h6>
                                <ul class="list-unstyled mb-3">
                                    <li><a href="services-v1.html" class="dropdown-item py-1">White Papers</a></li>
                                    <li><a href="services-v2.html" class="dropdown-item py-1">SIG Reports</a></li>
                                </ul>                                                                  
                            </div>
                            <div class="mega-dropdown-column" style="width: 235px;">
                                <h6 class="px-3 mb-2">Community Resources</h6>
                                <ul class="list-unstyled mb-3">
                                    <li><a href="tools" class="dropdown-item py-1">Rapid Alerts</a></li>
                                    <li><a href="tools" class="dropdown-item py-1">Observation Planning</a></li>
                                    <li><a href="tools" class="dropdown-item py-1">Community Forums</a></li>
                                    <li><a href="tools" class="dropdown-item py-1">Data Archives</a></li>
                                    <li><a href="tools" class="dropdown-item py-1">Data Analysis Toolkits</a></li>
                                </ul>                                
                            </div>
                          </div>
                        </div>
                      </li>           
                      

                    <li class="nav-item dropdown">
                        <a href="#" class="nav-link dropdown-toggle" data-bs-toggle="dropdown">Proposals</a>
                        <div class="dropdown-menu">
                          <div class="d-lg-flex pt-lg-3">
                            <div class="mega-dropdown-column" style="width: 300px;">
                                <h6 class="px-3 mb-2"><a href="#">ACROSS Funding Support</a></h6>
                                <ul class="list-unstyled mb-3">
                                    <li><a href="about-v1.html" class="dropdown-item py-1">ACROSS Community Grant Program</a></li>
                                </ul>                                  
                                <h6 class="px-3 mb-2">NASA Funding Opportunities</h6>
                                <ul class="list-unstyled mb-3">
                                    <li><a href="blog-list-with-sidebar.html" class="dropdown-item py-1">Guest Investigator Programs</a></li>
                                    <li><a href="blog-list-with-sidebar.html" class="dropdown-item py-1">Joint Observation Programs</a></li>
                                    <li><a href="blog-list-with-sidebar.html" class="dropdown-item py-1">Other ROSES Solicitations</a></li>
                                </ul>
                                <h6 class="px-3 mb-2">Complementary Opportunities</h6>
                                <ul class="list-unstyled mb-3">
                                    <li><a href="blog-list-with-sidebar.html" class="dropdown-item py-1">NSF Funding Opportunties</a></li>
                                </ul>                                
                            </div>
                          </div>
                        </div>
                      </li> 

                      <li class="nav-item dropdown">
                        <a href="{base}/conferences" class="nav-link dropdown-toggle" aria-current="page">Events</a>
                        <ul class="dropdown-menu">
                            <li><a href="{base}/conferences#upcoming" class="dropdown-item">ACROSS Workshops</a></li>
                            <li><a href="{base}/conferences#upcoming" class="dropdown-item">Upcoming Meetings</a></li>
                            <li><a href="{base}/conferences#past" class="dropdown-item">Past Meetings</a></li>
                            <li><a href="{base}/conferences#resources" class="dropdown-item">Presentation Resources</a></li>
                        </ul>
                    </li>

                    <li class="nav-item dropdown">
                        <a href="{base}/conferences" class="nav-link dropdown-toggle" aria-current="page">About</a>
                        <ul class="dropdown-menu">
                            <li><a href="{base}/conferences#upcoming" class="dropdown-item">Team</a></li>
                            <li><a href="{base}/conferences#upcoming" class="dropdown-item">ACROSS Services</a></li>
                            <li><a href="{base}/conferences#past" class="dropdown-item">ACROSS Presentations</a></li>
                            <li><a href="{base}/conferences#resources" class="dropdown-item">Code of Conduct</a></li>
                            <li><a href="{base}/conferences#resources" class="dropdown-item">Glossery & Acronyms</a></li>
                            <li><a href="{base}/conferences#resources" class="dropdown-item">Citing ACROSS</a></li>
                        </ul>
                    </li>


                    <li class="nav-item dropdown">
                        <a
                            data-sveltekit-reload
                            href="{base}/api/v1/docs"
                            class="nav-link dropdown-toggle"
                            aria-current="page">API</a
                        >
                        <ul class="dropdown-menu">
                            <li>
                                <a
                                    data-sveltekit-reload
                                    href="{base}/api/v1/docs"
                                    class="dropdown-item">Documentation</a
                                >
                            </li>
                            {#if isLoggedIn}
                                <li>
                                    <a
                                        href="{base}/user/profile"
                                        class="dropdown-item">Profile</a
                                    >
                                </li>
                                <li>
                                    <a
                                        data-sveltekit-preload-data="false"
                                        href="{base}/user/logout"
                                        class="dropdown-item">Logout</a
                                    >
                                </li>
                            {:else}
                                <li>
                                    <a
                                        href="{base}/user/register"
                                        class="dropdown-item">Register</a
                                    >
                                </li>
                                <li>
                                    <a
                                        href="{base}/user/login"
                                        class="dropdown-item">Login</a
                                    >
                                </li>
                            {/if}
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</nav>
