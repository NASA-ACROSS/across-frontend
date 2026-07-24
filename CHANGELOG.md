# Changelog

## [1.7.0](https://github.com/NASA-ACROSS/across-frontend/compare/across-frontend-v1.6.1...across-frontend-v1.7.0) (2026-07-24)


### Features

* add page limit to public config ([#358](https://github.com/NASA-ACROSS/across-frontend/issues/358)) ([db6fcc3](https://github.com/NASA-ACROSS/across-frontend/commit/db6fcc3110b10fd78f54f183f57d314f71041b91))
* add page limit to public config, update observation and schedule pages to use config for page limit, fix various pagination display bugs ([db6fcc3](https://github.com/NASA-ACROSS/across-frontend/commit/db6fcc3110b10fd78f54f183f57d314f71041b91))

## [1.6.1](https://github.com/NASA-ACROSS/across-frontend/compare/across-frontend-v1.6.0...across-frontend-v1.6.1) (2026-07-24)


### Bug Fixes

* handle text error response, rename type for clarity ([#352](https://github.com/NASA-ACROSS/across-frontend/issues/352)) ([ad6fa4d](https://github.com/NASA-ACROSS/across-frontend/commit/ad6fa4d7af256c1ed7a31e2aeee5df7f10dd8cb1))

## [1.6.0](https://github.com/NASA-ACROSS/across-frontend/compare/across-frontend-v1.5.0...across-frontend-v1.6.0) (2026-07-20)


### Features

* **actions:** standardize form action response interface and parsing form feedback ([#334](https://github.com/NASA-ACROSS/across-frontend/issues/334)) ([1bd7852](https://github.com/NASA-ACROSS/across-frontend/commit/1bd7852f576aab45faf8a61164d9e301884eb065))
* add `callApi` for consistent error handling ([#324](https://github.com/NASA-ACROSS/across-frontend/issues/324)) ([1a92c6c](https://github.com/NASA-ACROSS/across-frontend/commit/1a92c6c4074d172aef122c9b697b98808f8d21ac))


### Bug Fixes

* **docs:** adjust pr template ([#349](https://github.com/NASA-ACROSS/across-frontend/issues/349)) ([a171bb5](https://github.com/NASA-ACROSS/across-frontend/commit/a171bb55ac6541d3789253de0414f1c2a55e2335))

## [1.5.0](https://github.com/NASA-ACROSS/across-frontend/compare/across-frontend-v1.4.0...across-frontend-v1.5.0) (2026-06-26)


### Features

* **about:** clarify schedule status and fidelity ([#336](https://github.com/NASA-ACROSS/across-frontend/issues/336)) ([379db11](https://github.com/NASA-ACROSS/across-frontend/commit/379db111e17d33d76a3ea77005a04114062b8550))


### Bug Fixes

* replace console logs with pino logs ([#326](https://github.com/NASA-ACROSS/across-frontend/issues/326)) ([7aa7d3a](https://github.com/NASA-ACROSS/across-frontend/commit/7aa7d3a0bc29cdcb859ec9121038cf790b61bf6c))
* use transport option for pino-pretty ([#333](https://github.com/NASA-ACROSS/across-frontend/issues/333)) ([8cc46b4](https://github.com/NASA-ACROSS/across-frontend/commit/8cc46b4c90987d0fd0a9f7bfe6b03701e2545bf1))

## [1.4.0](https://github.com/NASA-ACROSS/across-frontend/compare/across-frontend-v1.3.0...across-frontend-v1.4.0) (2026-06-18)


### Features

* forward client ip to core server ([#330](https://github.com/NASA-ACROSS/across-frontend/issues/330)) ([90514b6](https://github.com/NASA-ACROSS/across-frontend/commit/90514b6c6cb6e255b894ab6482d8f3ec444e4749))

## [1.3.0](https://github.com/NASA-ACROSS/across-frontend/compare/across-frontend-v1.2.0...across-frontend-v1.3.0) (2026-06-15)


### Features

* **user:** service account management UI ([#301](https://github.com/NASA-ACROSS/across-frontend/issues/301)) ([7a54504](https://github.com/NASA-ACROSS/across-frontend/commit/7a5450483983c8f2b468c1c8d42e45018ba5da85))


### Bug Fixes

* **logs:** pino-pretty set as stream ([#327](https://github.com/NASA-ACROSS/across-frontend/issues/327)) ([d83fcbf](https://github.com/NASA-ACROSS/across-frontend/commit/d83fcbf630bc54c6cacc9940847fb9d05025dd34))

## [1.2.0](https://github.com/NASA-ACROSS/across-frontend/compare/across-frontend-v1.1.0...across-frontend-v1.2.0) (2026-06-02)


### Features

* add dialog component and examples ([#307](https://github.com/NASA-ACROSS/across-frontend/issues/307)) ([6cfb8e1](https://github.com/NASA-ACROSS/across-frontend/commit/6cfb8e1559dc5b43207b116fba627dce9ad28ae0))
* add pino logger ([#320](https://github.com/NASA-ACROSS/across-frontend/issues/320)) ([bbf6d44](https://github.com/NASA-ACROSS/across-frontend/commit/bbf6d443edb44a22f148a635dbb8e9b5b9272198))
* add USGOVAnalytics component for government analytics tracking ([#319](https://github.com/NASA-ACROSS/across-frontend/issues/319)) ([cfc848a](https://github.com/NASA-ACROSS/across-frontend/commit/cfc848ab2a31e1378e3147633d12bd8208b6e0b0))


### Bug Fixes

* **nav:** refactor nav and menu headers and links ([#303](https://github.com/NASA-ACROSS/across-frontend/issues/303)) ([70a42cc](https://github.com/NASA-ACROSS/across-frontend/commit/70a42cc3853b10c958d0704873ca423079807725))
* **observatories:** pull observatory telescopes based off of observatory id ([#316](https://github.com/NASA-ACROSS/across-frontend/issues/316)) ([94fa8c0](https://github.com/NASA-ACROSS/across-frontend/commit/94fa8c0ae0354776856e449fe87043d15e91e844))
* use buffer for base64, auth tests ([#317](https://github.com/NASA-ACROSS/across-frontend/issues/317)) ([090e80d](https://github.com/NASA-ACROSS/across-frontend/commit/090e80dd57693ac35e54d7289e25a6886cf4af25))

## [1.1.0](https://github.com/NASA-ACROSS/across-frontend/compare/across-frontend-v1.0.0...across-frontend-v1.1.0) (2026-05-11)


### Features

* **auth:** frontend service account and auth refactor using hooks ([#267](https://github.com/NASA-ACROSS/across-frontend/issues/267)) ([a6a6bb8](https://github.com/NASA-ACROSS/across-frontend/commit/a6a6bb875684cd72e7e77c97865b69e72b129067))
* **health:** add api endpoint to webserver for container health check ([#313](https://github.com/NASA-ACROSS/across-frontend/issues/313)) ([f051ca0](https://github.com/NASA-ACROSS/across-frontend/commit/f051ca0dfb8fc91e4c2d77077ee58bacdec01baf))


### Bug Fixes

* **auth:** refresh token extracted from cookie on refresh ([#305](https://github.com/NASA-ACROSS/across-frontend/issues/305)) ([17c8c9f](https://github.com/NASA-ACROSS/across-frontend/commit/17c8c9f5f650d4e425037e86abeac182286e5095))
* **deps:** move dependecies to dev deps ([#304](https://github.com/NASA-ACROSS/across-frontend/issues/304)) ([f824ae6](https://github.com/NASA-ACROSS/across-frontend/commit/f824ae69beb27bed705cc875d9da24297076e31b))
* **docs:** change revisioned to revised ([#299](https://github.com/NASA-ACROSS/across-frontend/issues/299)) ([b1dcde9](https://github.com/NASA-ACROSS/across-frontend/commit/b1dcde943e31145129e2fe1f8c38c29d00ff0f27))
* make ACROSS_SERVER config names consistent to fix doc url string ([#296](https://github.com/NASA-ACROSS/across-frontend/issues/296)) ([bf5a59d](https://github.com/NASA-ACROSS/across-frontend/commit/bf5a59da99d65320a57bf5a9550ec1a04033f962))
* removing inclusive language... ([#294](https://github.com/NASA-ACROSS/across-frontend/issues/294)) ([1e1d72e](https://github.com/NASA-ACROSS/across-frontend/commit/1e1d72eb73a5fb3c16ab9531986106899215def3))
* update workflows to use main ([#311](https://github.com/NASA-ACROSS/across-frontend/issues/311)) ([dd2f3a0](https://github.com/NASA-ACROSS/across-frontend/commit/dd2f3a00771e70c051f4bb051318b54a5bf9cafa))
* use form to load visibility windows ([#282](https://github.com/NASA-ACROSS/across-frontend/issues/282)) ([4be88e8](https://github.com/NASA-ACROSS/across-frontend/commit/4be88e8744d400ceeacd4c8fd98f87dbeb666cf0))

## [1.0.0](https://github.com/NASA-ACROSS/across-frontend/compare/across-frontend-v0.0.1...across-frontend-v1.0.0) (2026-03-24)


### Features

* add cicd workflows ([#227](https://github.com/NASA-ACROSS/across-frontend/issues/227)) ([1bb8ba2](https://github.com/NASA-ACROSS/across-frontend/commit/1bb8ba2eb9ef0a98043f0fa148e8588e96609a30))
* add MultiSelect component to OTI selector component ([#224](https://github.com/NASA-ACROSS/across-frontend/issues/224)) ([87de77e](https://github.com/NASA-ACROSS/across-frontend/commit/87de77ef66389b145b811e196e0770c9370cd4e8))
* add observatory data ingestion status page ([#190](https://github.com/NASA-ACROSS/across-frontend/issues/190)) ([b8980a8](https://github.com/NASA-ACROSS/across-frontend/commit/b8980a88368cc31d35e917214b53b2b714dba78a))
* add observatory-telescope-instrument multi-selects component and use it on Observation table ([#207](https://github.com/NASA-ACROSS/across-frontend/issues/207)) ([f394fbf](https://github.com/NASA-ACROSS/across-frontend/commit/f394fbf86a36d2a68443204ce870fb15da0588d0))
* add schedule query page ([#212](https://github.com/NASA-ACROSS/across-frontend/issues/212)) ([4b995b5](https://github.com/NASA-ACROSS/across-frontend/commit/4b995b59aacc18159dda164cfee3fb99ab48cddc))
* adding coordinate search component ([#258](https://github.com/NASA-ACROSS/across-frontend/issues/258)) ([aaba429](https://github.com/NASA-ACROSS/across-frontend/commit/aaba429c7c893c6dea14f33b45d59dd6aafd2498))
* adding date range inputs component ([#259](https://github.com/NASA-ACROSS/across-frontend/issues/259)) ([5203ae7](https://github.com/NASA-ACROSS/across-frontend/commit/5203ae7069359f98cd253da75c21aaa9563c03ff))
* adding obs/tel/inst pre-load from url query params for observation and schedule query page ([cd9e964](https://github.com/NASA-ACROSS/across-frontend/commit/cd9e9647f37feb914a273395b4cea359e06b2ccc))
* adding the pagination component ([#209](https://github.com/NASA-ACROSS/across-frontend/issues/209)) ([327bfb1](https://github.com/NASA-ACROSS/across-frontend/commit/327bfb188da6cad802e98ee133f2e8e8c7b15525))
* **api:** example api GET request via fetch ([f5ff6db](https://github.com/NASA-ACROSS/across-frontend/commit/f5ff6dbb7fc3d201b9d0f29b28c4f2aac7202c09))
* **api:** example api GET request via fetch ([eb58ad6](https://github.com/NASA-ACROSS/across-frontend/commit/eb58ad6379d858b71ecf11344a8b06591b7e1973))
* **auth:** use access and refresh tokens in user credentials cookie ([#166](https://github.com/NASA-ACROSS/across-frontend/issues/166)) ([2959d9f](https://github.com/NASA-ACROSS/across-frontend/commit/2959d9fa28c26c7f32f7aab403da068037ca1482))
* **card:** created card component, created abstract datatype storage for news content, refactored news section to use datatype and card component compositionally ([a7b4664](https://github.com/NASA-ACROSS/across-frontend/commit/a7b4664132f2b33b6db5b600cc59c2a93eccfa94))
* **code:** Add prettier pre-commit lint / format checks  ([#62](https://github.com/NASA-ACROSS/across-frontend/issues/62)) ([937c27b](https://github.com/NASA-ACROSS/across-frontend/commit/937c27b5a84b0d1a2852f1a3c0e64b78306a4e2e))
* **component:** added card component and news data store ([f83cef8](https://github.com/NASA-ACROSS/across-frontend/commit/f83cef809c15fd37a99de589c367b71be86ed0b5))
* **components:** add common components and use them on the login page. ([#132](https://github.com/NASA-ACROSS/across-frontend/issues/132)) ([a2d2665](https://github.com/NASA-ACROSS/across-frontend/commit/a2d2665a5a70855ed7f27b14ea8f01cf158930ec))
* **content:** JointFacilitiesTable component ([#157](https://github.com/NASA-ACROSS/across-frontend/issues/157)) ([58fb85a](https://github.com/NASA-ACROSS/across-frontend/commit/58fb85a9639cb6015a98b7ab6cb43bbeab8104f2))
* **content:** update missions overview section.  ([#161](https://github.com/NASA-ACROSS/across-frontend/issues/161)) ([a82accd](https://github.com/NASA-ACROSS/across-frontend/commit/a82accd86b58b653e12ff8fdd4080103dbd65497))
* **content:** updated list of upcoming and past conferences ([#39](https://github.com/NASA-ACROSS/across-frontend/issues/39)) ([59f8533](https://github.com/NASA-ACROSS/across-frontend/commit/59f853332312be77f000608b499c5b67b0fc7c88))
* **cookie:** encrypt/decrypt user-login cookie on the server ([5d186c6](https://github.com/NASA-ACROSS/across-frontend/commit/5d186c6efa804755631bd50b6afee1321aa83e95))
* create multi-select component ([#213](https://github.com/NASA-ACROSS/across-frontend/issues/213)) ([c0b8678](https://github.com/NASA-ACROSS/across-frontend/commit/c0b867813c067cc104219437089eaebbca7409de))
* **deploy:** dockerize application ([3dd2e2e](https://github.com/NASA-ACROSS/across-frontend/commit/3dd2e2e671553d7ec0fb1f478da2cee45056cd39))
* **docs:** add documentation ([#278](https://github.com/NASA-ACROSS/across-frontend/issues/278)) ([fa0aa9a](https://github.com/NASA-ACROSS/across-frontend/commit/fa0aa9ad8f0d7cfbf6a2ea366da4d744c3575b38))
* **env:** added .env.development file ([f2cc336](https://github.com/NASA-ACROSS/across-frontend/commit/f2cc336fb40b524add0ea21745af233c28f6ffcf))
* **env:** set local dev env var ACROSS_ADMIN_TOKEN, add env var section to readme ([1908501](https://github.com/NASA-ACROSS/across-frontend/commit/1908501f756542b629cf072411ab3fc3b25214a1))
* **env:** set local dev env var ACROSS_API_TOKEN, add env var section to readme ([c23cbab](https://github.com/NASA-ACROSS/across-frontend/commit/c23cbab3a42ee1054217ccfe517f2a5bd6b3460c))
* **events:** events &gt; meetings page with upcoming and past sections ([#162](https://github.com/NASA-ACROSS/across-frontend/issues/162)) ([a30bec2](https://github.com/NASA-ACROSS/across-frontend/commit/a30bec21a0e786751a41b7d7119882ded5ca4548))
* **frontend:** Update favicons to NASA ones ([5472217](https://github.com/NASA-ACROSS/across-frontend/commit/5472217a0a3181d4fde66048686043886811e0e5))
* **gh-template:** add SPIKE issue template ([5397dc5](https://github.com/NASA-ACROSS/across-frontend/commit/5397dc50de41ca232c17329683ecd520f4cd1989))
* **gh-template:** add SPIKE issue template ([1af19e0](https://github.com/NASA-ACROSS/across-frontend/commit/1af19e0edcea3d5915e527d05153289f3ee070ff))
* **gitignore:** added .svelte-kit to .gitignore ([b2f7fdd](https://github.com/NASA-ACROSS/across-frontend/commit/b2f7fdd68bf52c0807392b8b6889b52ca152453e))
* **gitignore:** added .svelte-kit to .gitignore ([a90af44](https://github.com/NASA-ACROSS/across-frontend/commit/a90af4402bb52b76558c5f1bb0ed21698310a76c))
* **homepage:** add statistics to homepage hero and update homepage content ([#82](https://github.com/NASA-ACROSS/across-frontend/issues/82)) ([86e8d9b](https://github.com/NASA-ACROSS/across-frontend/commit/86e8d9bfa5232d2349fa56831cfa47c9d7e84117))
* **hooks:** add handleError svelte hook to log additional metadata for unexpected errors ([#48](https://github.com/NASA-ACROSS/across-frontend/issues/48)) ([eb95175](https://github.com/NASA-ACROSS/across-frontend/commit/eb95175439a17a1dd3b8b6334e582621e9cba9fb))
* layout components and layout refactor ([#283](https://github.com/NASA-ACROSS/across-frontend/issues/283)) ([d67742b](https://github.com/NASA-ACROSS/across-frontend/commit/d67742b389abaa6cb0d53bbdc9cc0ded6ce8d8e6))
* **limit:** add rate limiter with retryAfter information to /login and /login-verify routes ([8c81a76](https://github.com/NASA-ACROSS/across-frontend/commit/8c81a763d5308c01f1ea7ad2706c32a6d206b02a))
* **limit:** add rate limiter with retryAfter information to /login and /login-verify routes ([2f7c9fd](https://github.com/NASA-ACROSS/across-frontend/commit/2f7c9fd7f15357b4648fe4784b996fe031675c85))
* **login:** add hook to handle login/logout, use svelte store to propagate loggedIn boolean, navigation now reactive to loggedIn svelte store value, set cookie maxAge when rememeber me is checked ([f8a476d](https://github.com/NASA-ACROSS/across-frontend/commit/f8a476db5eb6e4ecab474b1ce6fa33f12d34158d))
* **login:** add profile and logout pages, add login state store, add cookie management to login-verify, add redirects based on login state ([2c12a05](https://github.com/NASA-ACROSS/across-frontend/commit/2c12a05ca37b355661eae6af282fc1e7b0d23272))
* **login:** add secure cookie persistence to user login sessions on the frontend ([cad5d3a](https://github.com/NASA-ACROSS/across-frontend/commit/cad5d3aeb2492e1b3e2de58eaceb2d4ec66dd189))
* **login:** add user login and login-verify routes ([#35](https://github.com/NASA-ACROSS/across-frontend/issues/35)) ([0bfadf6](https://github.com/NASA-ACROSS/across-frontend/commit/0bfadf643cefcf2cedf083b8c4ae76b7fdbb7c33))
* **login:** auto redirect login when running locally for development ([#247](https://github.com/NASA-ACROSS/across-frontend/issues/247)) ([b513651](https://github.com/NASA-ACROSS/across-frontend/commit/b513651b95049d3e6690e792af1bd9ef4bd7439c))
* **manage:** User Management Assign Roles By Admin ([#147](https://github.com/NASA-ACROSS/across-frontend/issues/147)) ([b4f7a8e](https://github.com/NASA-ACROSS/across-frontend/commit/b4f7a8ef41bf586a4b1cbb491495b5aa21529825))
* **manage:** User Management User Group Invite ([#134](https://github.com/NASA-ACROSS/across-frontend/issues/134)) ([837c01f](https://github.com/NASA-ACROSS/across-frontend/commit/837c01f4429ebed03c34f01009144aa604e48732))
* **missions:** add link to missions page, move BurstCube from in development section to active missions section. ([10b774d](https://github.com/NASA-ACROSS/across-frontend/commit/10b774d837afd0e962f72bc18adb8af974c05a78))
* **multiselect:** add clear 'x' btn for search ([fdf214c](https://github.com/NASA-ACROSS/across-frontend/commit/fdf214c08ca0e73058a62fcc91d3c12ada8fc624))
* **multiselect:** add clear `x` button for search ([#221](https://github.com/NASA-ACROSS/across-frontend/issues/221)) ([fdf214c](https://github.com/NASA-ACROSS/across-frontend/commit/fdf214c08ca0e73058a62fcc91d3c12ada8fc624))
* **multiselect:** add count and add component playground for testing ([#220](https://github.com/NASA-ACROSS/across-frontend/issues/220)) ([02fe0e9](https://github.com/NASA-ACROSS/across-frontend/commit/02fe0e9fb07a33df276eaefd7a4dd957774c4025))
* **multiselect:** add select all and select none buttons ([#222](https://github.com/NASA-ACROSS/across-frontend/issues/222)) ([ac38578](https://github.com/NASA-ACROSS/across-frontend/commit/ac38578b849b22c44d3be69b6b2f3026012b1925))
* **nav:** add register link to navigation ([#58](https://github.com/NASA-ACROSS/across-frontend/issues/58)) ([109eef5](https://github.com/NASA-ACROSS/across-frontend/commit/109eef5b0bf546083ae100e620caa25c7da7aed4))
* observation query page ([#194](https://github.com/NASA-ACROSS/across-frontend/issues/194)) ([0f7aa74](https://github.com/NASA-ACROSS/across-frontend/commit/0f7aa748622728ce386ed6b3355e4eab7b82a35b))
* **observations:** add object name resolver component ([#208](https://github.com/NASA-ACROSS/across-frontend/issues/208)) ([bba5761](https://github.com/NASA-ACROSS/across-frontend/commit/bba5761ded4e74e3e7a738d5f9aa2006ea0e60e5))
* **paths:** fix href and src relative paths with base path from $app/paths ([eabd68a](https://github.com/NASA-ACROSS/across-frontend/commit/eabd68a6190a0eaefc7b5283bde8b57b7050e6b4))
* **profile:** add form action to update user information in profile, add redirect to login, login-verify, and register routes, add logout button to profile page, add help text to profile page, add loading spinner to login button on submit before confirmation ([241b643](https://github.com/NASA-ACROSS/across-frontend/commit/241b64389d7260806e74a5c23f025c6201ad715d))
* **profile:** added markup to render profile data ([a0aa190](https://github.com/NASA-ACROSS/across-frontend/commit/a0aa190757d5696ff2e263d89beb0f61dae1ad15))
* **profile:** delete user account UI ([#203](https://github.com/NASA-ACROSS/across-frontend/issues/203)) ([5a269cd](https://github.com/NASA-ACROSS/across-frontend/commit/5a269cd15a505a7ce3cee97c917b4641cfa4827f))
* **profile:** update frontend dev token, hide frontend role from profile ui ([86ce987](https://github.com/NASA-ACROSS/across-frontend/commit/86ce9873baf23868188668f64c66e199ed86c180))
* **profile:** update frontend dev token, hide frontend role from profile ui ([97dcbd4](https://github.com/NASA-ACROSS/across-frontend/commit/97dcbd4e1aac365b37a3d6e912151f245d0ad16d))
* **profile:** update user information compatible with encrypted cookie, api_token ui input disabled from user editing ([39fefb8](https://github.com/NASA-ACROSS/across-frontend/commit/39fefb8f889206b1a4eed0641113b0731db62e6e))
* **roles:** add text when pending or request roles columns are empty, add filter to remove admin from self-service roles list ([31ec1c2](https://github.com/NASA-ACROSS/across-frontend/commit/31ec1c220c927272db96503d3fc396ad3805289f))
* **roles:** profile UI for self-requesting roles ([4061820](https://github.com/NASA-ACROSS/across-frontend/commit/4061820d654bd4257924877fafc3dedca3ca52ef))
* **roles:** profile UI for self-requesting roles ([03a1ddf](https://github.com/NASA-ACROSS/across-frontend/commit/03a1ddf96352815c3cafd49d37929d32263bc94f))
* **roles:** serverside actions for processing profile UI role selection ([6da190f](https://github.com/NASA-ACROSS/across-frontend/commit/6da190f641e4bc0deb24367befaea3aa410c8062))
* **templates:** added pull request template ([ed0f4a7](https://github.com/NASA-ACROSS/across-frontend/commit/ed0f4a79bae3f71431d8a2fad1416bf88072f1f0))
* **templates:** added pull request template ([d662ddd](https://github.com/NASA-ACROSS/across-frontend/commit/d662ddd74faa02ee37d468649ff95193cc21ef91))
* **timeline:** Add D3 plotting library and mission timeline ([#163](https://github.com/NASA-ACROSS/across-frontend/issues/163)) ([b33c2b8](https://github.com/NASA-ACROSS/across-frontend/commit/b33c2b8da957a24130ad14f32593f1fe4b54fc5d))
* **too:** add cell click callback and CellComponentRender to dynamically render cell data as components ([90def7d](https://github.com/NASA-ACROSS/across-frontend/commit/90def7dab7be964a7cdd3f154865fd8ac5a32ace))
* **too:** add Executed action button ([8f81742](https://github.com/NASA-ACROSS/across-frontend/commit/8f81742e0a10d5bd325e113cc468beee2e9275fe))
* **too:** add form actions for action buttons, add progressive form enhancement for improved UX without page reload. ([824f814](https://github.com/NASA-ACROSS/across-frontend/commit/824f814748b3975646881371a2a9097875c43a63))
* **too:** add input for page number, add server-side input validation for url params, add redirect to rewrite url params within bounds ([ec467c2](https://github.com/NASA-ACROSS/across-frontend/commit/ec467c2f31705faaa88603d2a3d4365199359575))
* **too:** add page visibility for public users ([95f1c8f](https://github.com/NASA-ACROSS/across-frontend/commit/95f1c8f9671e377d0769b46b425b0781cc8c54ce))
* **too:** add pagination with page, limit, and offset queries to the api. adjust trigger info modal render ([28f7a38](https://github.com/NASA-ACROSS/across-frontend/commit/28f7a382a8a0ef2391a60bc21c8dcd3c0ed03ec4))
* **too:** add results per page dropdown and handle custom limit from address bar ([2d2d4ee](https://github.com/NASA-ACROSS/across-frontend/commit/2d2d4eede6facc7b1b1edc53c344fa6c3133c59e))
* **too:** add spinner component, add actions column based on user roles, add color coding logic to too_info column, delete PoC table ([85b510f](https://github.com/NASA-ACROSS/across-frontend/commit/85b510f44eef691500a9442af7302b7bb296c4b1))
* **too:** additional input validation when not a number, added comments ([2490f20](https://github.com/NASA-ACROSS/across-frontend/commit/2490f203434596abd89e4b74ddd4c3e9d20b90ed))
* **ToO:** Create a PoC Burstcube ToO data table page ([10e0da8](https://github.com/NASA-ACROSS/across-frontend/commit/10e0da852b18c8f66356b578f51a9235511b7245))
* **tools:** add visibility calculator 1.0 ([#263](https://github.com/NASA-ACROSS/across-frontend/issues/263)) ([03145a6](https://github.com/NASA-ACROSS/across-frontend/commit/03145a6ac014a17d4af60de225acf83f19d6de42))
* **too:** PoC observatory agnostic ToO page data table loader ([2dc78a8](https://github.com/NASA-ACROSS/across-frontend/commit/2dc78a84ecee00bf493b857d509a10bd2d2b21f9))
* **too:** use svelte-tabular-table to render PoC burstcube ToO page ([5a16618](https://github.com/NASA-ACROSS/across-frontend/commit/5a166181b33f91b3b83e617e5ddbbfb4e43879fc))
* **ui:** observatory metadata index and per observatory metadata info pages ([#271](https://github.com/NASA-ACROSS/across-frontend/issues/271)) ([79a4b99](https://github.com/NASA-ACROSS/across-frontend/commit/79a4b99ba1f744726c8001b2f02ffde600d77b24))
* **ui:** only show user pages when running locally for development ([#260](https://github.com/NASA-ACROSS/across-frontend/issues/260)) ([5139dd9](https://github.com/NASA-ACROSS/across-frontend/commit/5139dd9cf7a47b3fba4822fd026d56f683b95414))
* **ui:** only show user pages when running locally for development, added PUBLIC_CONFIG.isLocal(), added LocalOnlyRender component with slot ([5139dd9](https://github.com/NASA-ACROSS/across-frontend/commit/5139dd9cf7a47b3fba4822fd026d56f683b95414))
* **ui:** replace bootstrap with tailwind css and daisyui implementing NASA HDS ([#174](https://github.com/NASA-ACROSS/across-frontend/issues/174)) ([22001d1](https://github.com/NASA-ACROSS/across-frontend/commit/22001d1bc5e0409cb7f44fe370061f1eb560cb1c))
* update user management system routes and types to be compatible with across-server ([#171](https://github.com/NASA-ACROSS/across-frontend/issues/171)) ([3030724](https://github.com/NASA-ACROSS/across-frontend/commit/3030724194f8453b2a11433709a85ea711715cbf))
* **url:** update urls to currently deployed domain ([#47](https://github.com/NASA-ACROSS/across-frontend/issues/47)) ([7268f3c](https://github.com/NASA-ACROSS/across-frontend/commit/7268f3c499a193a4107e1c1f2f48c47eb21dc20c))
* **validation:** improve input sanitization when registering and updating profile information ([#75](https://github.com/NASA-ACROSS/across-frontend/issues/75)) ([41876e7](https://github.com/NASA-ACROSS/across-frontend/commit/41876e7d249474370a3c888056d36b015a60ca6f))
* **version:** add `pollInterval` to version svelte config ([5e0b5c3](https://github.com/NASA-ACROSS/across-frontend/commit/5e0b5c31c94bcddca255b9957352364599c5272b))
* **version:** add pollInterval to version svelte config, remove extra empty section from profile, linting changes ([1d05bad](https://github.com/NASA-ACROSS/across-frontend/commit/1d05badd26fa0a1c508f9618eff667e2a17e95a0))
* **version:** bump version from 0.0.10 to 0.0.11 ([027fa13](https://github.com/NASA-ACROSS/across-frontend/commit/027fa13c7be8e29f49ae3421710c0576865db7e1))
* **version:** bump version from 0.0.5 to 0.0.6 ([da242f0](https://github.com/NASA-ACROSS/across-frontend/commit/da242f0f07c4ec5ccd1eb3cb6a78f8f67d5adaa4))
* **version:** bump version from 0.0.6 to 0.0.7 ([1ce39ff](https://github.com/NASA-ACROSS/across-frontend/commit/1ce39ff6453e47c848ffa5ee14a24e654b3bac0c))
* **version:** bump version from 0.0.7 to 0.0.8 ([ff55775](https://github.com/NASA-ACROSS/across-frontend/commit/ff5577578bd741ebbc8d1cc34ea681d4c7d31e28))
* **version:** bump version from v0.0.8 to v0.0.9 ([fade58a](https://github.com/NASA-ACROSS/across-frontend/commit/fade58a8c6cec32a49706665f3013474ab5eb563))
* **version:** update version from 0.0.4 to 0.0.5 ([4f486e1](https://github.com/NASA-ACROSS/across-frontend/commit/4f486e1629e438738d5b006a5aa28d6231982a53))
* **workflows:** add deploy-to-aws-ecr workflow ([131495b](https://github.com/NASA-ACROSS/across-frontend/commit/131495bb0e2ae6d665a10143e89e10102a997704))
* **workflows:** add deploy-to-aws-ecr workflow ([cff62c2](https://github.com/NASA-ACROSS/across-frontend/commit/cff62c2706cd850c49d821a57e8513cc68aec93f))
* **workflows:** add task-definition.json, modify workflow to edit and deploy new task definition to ECS ([#23](https://github.com/NASA-ACROSS/across-frontend/issues/23)) ([cd4d8ab](https://github.com/NASA-ACROSS/across-frontend/commit/cd4d8ab17ba9a4fceba4a9643d1a99a943534376))
* **workflows:** use git describe for version tagging for prod and dev ([#26](https://github.com/NASA-ACROSS/across-frontend/issues/26)) ([c0ed0f6](https://github.com/NASA-ACROSS/across-frontend/commit/c0ed0f6c8146845816d45069d1ff0e31b6398c05))


### Bug Fixes

* add obs/tel/inst multi select pre-load from url for observation and schedule query pages ([#287](https://github.com/NASA-ACROSS/across-frontend/issues/287)) ([cd9e964](https://github.com/NASA-ACROSS/across-frontend/commit/cd9e9647f37feb914a273395b4cea359e06b2ccc))
* add resolved-by message ([bba5761](https://github.com/NASA-ACROSS/across-frontend/commit/bba5761ded4e74e3e7a738d5f9aa2006ea0e60e5))
* add resolved-by message ([bba5761](https://github.com/NASA-ACROSS/across-frontend/commit/bba5761ded4e74e3e7a738d5f9aa2006ea0e60e5))
* add resolving coordinates while resolving ([bba5761](https://github.com/NASA-ACROSS/across-frontend/commit/bba5761ded4e74e3e7a738d5f9aa2006ea0e60e5))
* **build:** change version name to not require git ([#153](https://github.com/NASA-ACROSS/across-frontend/issues/153)) ([b7205eb](https://github.com/NASA-ACROSS/across-frontend/commit/b7205eb9aded6b796ade9b223175ee9088e27c4a))
* **burstcube:** page displays when not logged in, fix show trigger info button bug in table preventing modal from showing ([#155](https://github.com/NASA-ACROSS/across-frontend/issues/155)) ([4688a42](https://github.com/NASA-ACROSS/across-frontend/commit/4688a427937d843e08c2ce6534e59f47b84cc31b))
* **cicd:** add missing . to filename ([bf48628](https://github.com/NASA-ACROSS/across-frontend/commit/bf486281057769f242f878cd6a9e7ab0c0f001f4))
* **cicd:** bump minor pre major release, ignore changelog formatting ([#245](https://github.com/NASA-ACROSS/across-frontend/issues/245)) ([6be8b1b](https://github.com/NASA-ACROSS/across-frontend/commit/6be8b1b5921464fe24995f3fd9fa6622d6535f1b))
* **cicd:** feature workflow does not run on closed PR ([#254](https://github.com/NASA-ACROSS/across-frontend/issues/254)) ([2860e4c](https://github.com/NASA-ACROSS/across-frontend/commit/2860e4c754b3bc5856e4a15dee2f3a00004a5d43))
* **cicd:** release-please-manifest.json -&gt; .release-please-manifest.json ([#243](https://github.com/NASA-ACROSS/across-frontend/issues/243)) ([bf48628](https://github.com/NASA-ACROSS/across-frontend/commit/bf486281057769f242f878cd6a9e7ab0c0f001f4))
* **cicd:** reset version to 0.0.1 ([3973a0a](https://github.com/NASA-ACROSS/across-frontend/commit/3973a0ace62995363c1a91d3bacbf2a4328f175c))
* **cicd:** run release-please only upon main completion ([#246](https://github.com/NASA-ACROSS/across-frontend/issues/246)) ([3b96133](https://github.com/NASA-ACROSS/across-frontend/commit/3b96133600fb4eea8d5c79f3dca041ec2dbdfc8e))
* **conferences:** tables now react to light-mode switching ([#42](https://github.com/NASA-ACROSS/across-frontend/issues/42)) ([a6f68c7](https://github.com/NASA-ACROSS/across-frontend/commit/a6f68c76971f41f7797552e1bb3d4604534e27ed))
* **env:** change config to use dynamic environment variables ([#21](https://github.com/NASA-ACROSS/across-frontend/issues/21)) ([84bbbc3](https://github.com/NASA-ACROSS/across-frontend/commit/84bbbc353966693e6a9d7f0734977de92e9dbe0c))
* **format:** resolve prettier warnings/errors for ci ([#231](https://github.com/NASA-ACROSS/across-frontend/issues/231)) ([41da8b0](https://github.com/NASA-ACROSS/across-frontend/commit/41da8b03edc422496749c674319af91287134b16))
* **layout:** fix href and src relative paths with base path from $app/paths ([9939aa4](https://github.com/NASA-ACROSS/across-frontend/commit/9939aa49a5e4c9b468948525c4f8d9195adff9be))
* **layout:** section component sets width to fill page component consistently ([#249](https://github.com/NASA-ACROSS/across-frontend/issues/249)) ([ae8d7cb](https://github.com/NASA-ACROSS/across-frontend/commit/ae8d7cb5192a9e96c316a0eac9645db4121461e8))
* lint title is separate with edited trigger type ([6eeb222](https://github.com/NASA-ACROSS/across-frontend/commit/6eeb222080d5238a613b1df4cc9f57b4d2d6e4d4))
* lint title is separated with edited trigger type ([#251](https://github.com/NASA-ACROSS/across-frontend/issues/251)) ([6eeb222](https://github.com/NASA-ACROSS/across-frontend/commit/6eeb222080d5238a613b1df4cc9f57b4d2d6e4d4))
* **lint:** all linting errors from eslint are resolved ([#230](https://github.com/NASA-ACROSS/across-frontend/issues/230)) ([50d168e](https://github.com/NASA-ACROSS/across-frontend/commit/50d168e8a267e37b2ab0c9b2bcf68c33ec2cbde8))
* **log:** update log text, remove unused import ([90f3356](https://github.com/NASA-ACROSS/across-frontend/commit/90f3356aa678bdf63749030f6aae3313d9416efb))
* make object resolver a reuseable component ([bba5761](https://github.com/NASA-ACROSS/across-frontend/commit/bba5761ded4e74e3e7a738d5f9aa2006ea0e60e5))
* make object resolver a reuseable component ([bba5761](https://github.com/NASA-ACROSS/across-frontend/commit/bba5761ded4e74e3e7a738d5f9aa2006ea0e60e5))
* move more API logic into component ([bba5761](https://github.com/NASA-ACROSS/across-frontend/commit/bba5761ded4e74e3e7a738d5f9aa2006ea0e60e5))
* move more API logic into component ([bba5761](https://github.com/NASA-ACROSS/across-frontend/commit/bba5761ded4e74e3e7a738d5f9aa2006ea0e60e5))
* observation query inputs ([#204](https://github.com/NASA-ACROSS/across-frontend/issues/204)) ([6344bfb](https://github.com/NASA-ACROSS/across-frontend/commit/6344bfb6081f56639bfeb82c66e23c7c10b60b66))
* **profile:** remove margin between active roles list items ([580d144](https://github.com/NASA-ACROSS/across-frontend/commit/580d144d3528c5025fea2e26d2ff8fcc57ecb313))
* **profile:** remove margin between active roles list items ([ed18076](https://github.com/NASA-ACROSS/across-frontend/commit/ed18076925d52a77e543e36d2d398de385cc31ee))
* **profile:** safari should reload page on cached navigation using back button ([09d90f3](https://github.com/NASA-ACROSS/across-frontend/commit/09d90f30f10d430a43452523e05e8d054d19d556))
* reduce boilerplate, reduce footprint in page ([bba5761](https://github.com/NASA-ACROSS/across-frontend/commit/bba5761ded4e74e3e7a738d5f9aa2006ea0e60e5))
* reduce boilerplate, reduce footprint in page ([bba5761](https://github.com/NASA-ACROSS/across-frontend/commit/bba5761ded4e74e3e7a738d5f9aa2006ea0e60e5))
* refactor datetime to single input component ([#272](https://github.com/NASA-ACROSS/across-frontend/issues/272)) ([de81114](https://github.com/NASA-ACROSS/across-frontend/commit/de81114ed6e15010222f2dab973499e17501d6c4))
* refactor to add getResolve.ts function ([bba5761](https://github.com/NASA-ACROSS/across-frontend/commit/bba5761ded4e74e3e7a738d5f9aa2006ea0e60e5))
* refactor to add getResolve.ts function ([bba5761](https://github.com/NASA-ACROSS/across-frontend/commit/bba5761ded4e74e3e7a738d5f9aa2006ea0e60e5))
* remove another unnecessary change ([bba5761](https://github.com/NASA-ACROSS/across-frontend/commit/bba5761ded4e74e3e7a738d5f9aa2006ea0e60e5))
* remove another unnecessary change ([bba5761](https://github.com/NASA-ACROSS/across-frontend/commit/bba5761ded4e74e3e7a738d5f9aa2006ea0e60e5))
* remove unnecessary change ([bba5761](https://github.com/NASA-ACROSS/across-frontend/commit/bba5761ded4e74e3e7a738d5f9aa2006ea0e60e5))
* remove unnecessary change ([bba5761](https://github.com/NASA-ACROSS/across-frontend/commit/bba5761ded4e74e3e7a738d5f9aa2006ea0e60e5))
* remove unneeded return ([bba5761](https://github.com/NASA-ACROSS/across-frontend/commit/bba5761ded4e74e3e7a738d5f9aa2006ea0e60e5))
* remove unneeded return ([bba5761](https://github.com/NASA-ACROSS/across-frontend/commit/bba5761ded4e74e3e7a738d5f9aa2006ea0e60e5))
* **review:** change ecr workflow aws_region to us-east-2 ([7196ce1](https://github.com/NASA-ACROSS/across-frontend/commit/7196ce1050d83bf34b6bb018a06e6173feec1268))
* **scripts:** fix file not found errors, fix scripts not loading on page navigation ([#30](https://github.com/NASA-ACROSS/across-frontend/issues/30)) ([85e9ba7](https://github.com/NASA-ACROSS/across-frontend/commit/85e9ba757463120a911176fbf942ee1396c04aa0))
* simplify code a bit ([bba5761](https://github.com/NASA-ACROSS/across-frontend/commit/bba5761ded4e74e3e7a738d5f9aa2006ea0e60e5))
* simplify code a bit ([bba5761](https://github.com/NASA-ACROSS/across-frontend/commit/bba5761ded4e74e3e7a738d5f9aa2006ea0e60e5))
* **too:** fix default sort to be on trigger_time and fix modal displaying incorrect data after sorting table ([03c8f72](https://github.com/NASA-ACROSS/across-frontend/commit/03c8f724f552a10011f64ac7f372580e434c4328))
* **too:** fix default sort to be on trigger_time and fix modal displaying incorrect data after sorting table ([91e7120](https://github.com/NASA-ACROSS/across-frontend/commit/91e71208b421ed7cdc6dce6bf9f5e6e3d54fec2b))
* **types:** add email to UserCredentialsCookie type ([01208f4](https://github.com/NASA-ACROSS/across-frontend/commit/01208f4fcc416331936d296e0065f11d1db1f1be))
* **types:** resolve type errors from npm run check ([#233](https://github.com/NASA-ACROSS/across-frontend/issues/233)) ([46d0808](https://github.com/NASA-ACROSS/across-frontend/commit/46d080883511e9aa97e59bfeb98e2c867cc7a740))
* update box geo ([bba5761](https://github.com/NASA-ACROSS/across-frontend/commit/bba5761ded4e74e3e7a738d5f9aa2006ea0e60e5))
* update box geo ([bba5761](https://github.com/NASA-ACROSS/across-frontend/commit/bba5761ded4e74e3e7a738d5f9aa2006ea0e60e5))
* update for CORs issues ([bba5761](https://github.com/NASA-ACROSS/across-frontend/commit/bba5761ded4e74e3e7a738d5f9aa2006ea0e60e5))
* update for CORs issues ([bba5761](https://github.com/NASA-ACROSS/across-frontend/commit/bba5761ded4e74e3e7a738d5f9aa2006ea0e60e5))
* **workflows:** add id-token write permission ([70d7e7c](https://github.com/NASA-ACROSS/across-frontend/commit/70d7e7c80569386192e24100ccc7dd9d36fee4b2))
* **workflows:** add id-token write permission ([b9ea267](https://github.com/NASA-ACROSS/across-frontend/commit/b9ea267077290e52d1ca26698e7a28a688e88c0a))
* **workflows:** remove aws static secrets and use role assumption to configure aws credentials ([5ffdfe1](https://github.com/NASA-ACROSS/across-frontend/commit/5ffdfe1a19a8741629260f7a3885094092ce0c6e))
* **workflows:** remove aws static secrets and use role assumption to configure aws credentials ([62ae7f3](https://github.com/NASA-ACROSS/across-frontend/commit/62ae7f3ace1f6d12442726b54500dd863bb4cb60))
* **workflows:** rename path for ECS_TASK_DEFINITION ([#25](https://github.com/NASA-ACROSS/across-frontend/issues/25)) ([f70657b](https://github.com/NASA-ACROSS/across-frontend/commit/f70657be96d692f9e99ea39199f564bd73fe252c))


### Miscellaneous Chores

* release 1.0.0 ([04a8ade](https://github.com/NASA-ACROSS/across-frontend/commit/04a8ade6a1113f8aadf81b2aa88c9e92b5dd6aa5))
