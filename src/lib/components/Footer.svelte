<script lang="ts">
    import { base } from '$app/paths';
    import ThemeSwitch from './ThemeSwitch.svelte';
</script>

<!-- Footer -->
<footer class="footer bg-light border-top">
    <div class="container pt-3">
        <div class="row pb-3 mt-4">
            <div class="col-4">
                <div class="navbar-brand text-dark p-0 me-0 mb-3 mb-lg-4">
                    <img
                        src="{base}/assets/img/custom/logo-nasa.svg"
                        width="75"
                        alt="NASA logo"
                    />
                    <h5 class="mt-1 mb-0 d-lg-block text-wrap">
                        National Aeronautics and Space Administration
                    </h5>                    
                </div>
                <p class="fs-sm">The <strong class="text-white" data-svelte-h="svelte-whelvc">Astrophysics Cross-Observatory Science Support
                    (ACROSS)</strong> center is part of NASA's Physics of the Cosmos program and is intended to help better coordinate NASA's time domain and multimessenger resources.
                </p>
                <!-- <a href="#" class="nav nav-link d-inline-block fw-medium ms--4">Learn About ACROSS' Mission</a> -->

            </div>

            <div class="col-xl-6 col-lg-7 col-md-5 offset-xl-2 offset-md-1 pt-4">
                <div id="footer-links" class="row">
                  <div class="col-lg-4">
                    <div id="useful-links" class="collapse d-lg-block" data-bs-parent="#footer-links">
                      <ul class="nav flex-column pb-lg-1 mb-lg-3">
                        <li class="nav-item"><a href="#" class="nav-link d-inline-block px-0 pt-1 pb-2">Home</a></li>
                        <li class="nav-item"><a href="#" class="nav-link d-inline-block px-0 pt-1 pb-2">Missions</a></li>
                        <li class="nav-item"><a href="#" class="nav-link d-inline-block px-0 pt-1 pb-2">Proposals</a></li>
                        <li class="nav-item"><a href="#" class="nav-link d-inline-block px-0 pt-1 pb-2">Conferences</a></li>
                      </ul>
                    </div>
                  </div>
                  <div class="col-lg-4">
                    <div id="useful-links" class="collapse d-lg-block" data-bs-parent="#footer-links">
                      <ul class="nav flex-column pb-lg-1 mb-lg-3">
                        <li class="nav-item"><a href="#" class="nav-link d-inline-block px-0 pt-1 pb-2">Tools</a></li>
                        <li class="nav-item"><a href="#" class="nav-link d-inline-block px-0 pt-1 pb-2">API</a></li>
                        <li class="nav-item"><a href="#" class="nav-link d-inline-block px-0 pt-1 pb-2">About</a></li>
                      </ul>
                    </div>
                  </div>
                  <div class="col-xl-4 col-lg-5 pt-2 pt-lg-0">
                    <h6 class="mb-2">Contact Us</h6>
                    <a href="mailto:ACROSS@nasa.gov" class="text-decoration-none fw-medium">ACROSS@nasa.gov</a>
                  </div>
                </div>
              </div>
            

        </div>
<!-- 
        <div class="row pb-4">
            <div class="container">
                <div class="d-flex">
                  <span style="margin-right: 50px;">Page Last Updated:&nbsp;&nbsp;<strong>Oct 11, 2024</strong></span>
                  <span style="margin-right: 50px;">Page Editor:&nbsp;&nbsp;<strong>Daniel Kocevski</strong></span>
                  <span style="margin-right: 50px;">Responsible NASA Offical:&nbsp;&nbsp;<strong>Daniel Kocevski</strong></span>
                </div>
              </div>
        </div> -->

        <hr class="my-0">
        
        <div class="row pb-3 mt-3">
            <div class="container">
                <div class="d-flex justify-content-between w-75">
                  <a href="#" class="text-decoration-none">About NASA</a>
                  <a href="#" class="text-decoration-none">Accessibility</a>
                  <a href="#" class="text-decoration-none">Budget and Performance</a>
                  <a href="#" class="text-decoration-none">FOIA Requests</a>
                  <a href="#" class="text-decoration-none">Office of the IG</a>
                  <a href="#" class="text-decoration-none">No FEAR Act</a>
                  <a href="#" class="text-decoration-none">Privacy Policy</a>
                </div>
              </div>
        </div>


        <div class="row pb-5 mt-0">
            <div class="container">
                <div class="d-flex">
                  <span style="margin-right: 50px;">Page Last Updated:&nbsp;&nbsp;<strong>Oct 11, 2024</strong></span>
                  <span style="margin-right: 50px;">Page Editor:&nbsp;&nbsp;<strong>Daniel Kocevski</strong></span>
                  <span style="margin-right: 50px;">Responsible NASA Offical:&nbsp;&nbsp;<strong>Daniel Kocevski</strong></span>
                </div>
              </div>
        </div>

    </div>
</footer>
 