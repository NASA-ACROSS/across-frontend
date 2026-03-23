<script>
    import Section from '$lib/components/Section.svelte';
</script>

<Section title="Contributing">
    <div class="border-t border-base-300 pt-3">
        <p class="leading-relaxed">
            So you'd like to contribute to the ACROSS Project? Below are some guidelines for contributors to follow. Contributions come in all shapes and sizes.
            Help is appreciated with documentation, unit tests, framework code, continuous-integration, or simply reporting bugs and improvement ideas. The
            ACROSS team cannot promise to accept every suggestion or bugfix, but will look into each contribution with careful consideration.
        </p>
    </div>
</Section>

<Section title="Code of Conduct">
    <div class="border-t border-base-300 pt-3">
        <p class="leading-relaxed">
            This project and everyone participating in it is governed by the <a href="/docs/code-of-conduct" class="text-blue-600 hover:underline"
                >ACROSS Code of Conduct</a
            >. By participating, you are expected to uphold this code. Please report unacceptable behavior to the product team.
        </p>
    </div>
</Section>

<Section title="Ways to Contribute">
    <div class="border-t border-base-300 pt-3">
        <!-- Bug Reports -->
        <div id="bug-reports" class="space-y-4">
            <h4 class="text-2xl font-semibold">Bug Reports</h4>

            <div id="before-reporting-a-bug" class="space-y-2">
                <h5 class="text-lg font-semibold">Before Reporting a Bug</h5>
                <ol class="list-decimal list-inside space-y-1 ml-2 leading-relaxed">
                    <li>
                        Perform a cursory search to see if the bug has already been reported. If a bug has been reported and the issue is still open, add a
                        comment to the existing issue instead of opening a new one.
                    </li>
                </ol>
            </div>

            <div id="reporting-a-bug" class="space-y-2">
                <h5 class="text-lg font-semibold">Reporting a Bug</h5>
                <p class="leading-relaxed">If a bug is found, don't hesitate to report it:</p>
                <ol class="list-decimal list-inside space-y-1 ml-2 leading-relaxed">
                    <li>Open an issue using the bug report template in the repective git-hub repository</li>
                    <li>Describe the issue.</li>
                    <li>Describe the expected behavior if the bug did not occur.</li>
                    <li>Provide the reproduction steps that someone else can follow to recreate the bug or error on their own.</li>
                    <li>If applicable, add code snippets or references to the software.</li>
                    <li>Provide the system the bug was observed on including the hardware, operating system, and versions.</li>
                    <li>Provide any additional context if applicable.</li>
                    <li>Provide your full name or GitHub username and your company organization if applicable.</li>
                </ol>
            </div>

            <div id="what-happens-bug" class="space-y-2">
                <h5 class="text-lg font-semibold">What Happens to my Bug Report?</h5>
                <ol class="list-decimal list-inside space-y-1 ml-2 leading-relaxed">
                    <li>The ACROSS team will label the issue.</li>
                    <li>
                        A team member will try to reproduce the issue with your provided steps. If the team is able to reproduce the issue, the issue will be
                        left to be implemented by someone.
                    </li>
                </ol>
            </div>
        </div>

        <!-- New Feature Requests -->
        <div id="new-feature-requests" class="mt-4 space-y-4">
            <h4 class="text-2xl font-semibold">New Feature Requests</h4>
            <p class="leading-relaxed">
                ACROSS has a multitude of users from different fields and backgrounds. Feature enhancement ideas from the community are always welcome!
            </p>

            <div id="requesting-a-new-feature" class="space-y-2">
                <h5 class="text-lg font-semibold">Requesting a New Feature</h5>
                <ol class="list-decimal list-inside space-y-1 ml-2 leading-relaxed">
                    <li>Open an issue using the feature request template.</li>
                    <li>Describe the feature.</li>
                    <li>Describe the solution you would like.</li>
                    <li>Describe alternatives you've considered.</li>
                    <li>Provide any additional context if applicable.</li>
                    <li>Provide your company organization if applicable.</li>
                </ol>
            </div>

            <div id="what-happens-feature" class="space-y-2">
                <h5 class="text-lg font-semibold">What Happens to my Feature Request?</h5>
                <ol class="list-decimal list-inside space-y-1 ml-2 leading-relaxed">
                    <li>The project team will label the issue.</li>
                    <li>
                        The project team will evaluate the feature request, possibly asking you more questions to understand its purpose and any relevant
                        requirements. If the issue is closed, the team will convey their reasoning and suggest an alternative path forward.
                    </li>
                    <li>If the feature request is accepted, it will be marked for implementation.</li>
                </ol>
            </div>
        </div>

        <!-- Pull Requests -->
        <div id="pull-requests" class="mt-4 space-y-4">
            <h4 class="text-2xl font-semibold">Pull Requests</h4>

            <div id="before-pr" class="space-y-2">
                <h5 class="text-lg font-semibold">Before starting your Pull Request</h5>
                <p class="leading-relaxed">Ready to Add Your Code? Follow GitHub's fork-branch-pull request pattern.</p>
                <ol class="list-decimal list-inside space-y-1 ml-2 leading-relaxed">
                    <li>Fork the respective git-hub repository.</li>
                    <li>Find the related issue number or create an associated issue that explains the intent of your new code.</li>
                    <li>
                        Create a new branch in your fork to work on your fix. Branch names follow the following format: <code class="bg-base-200 px-1 text-sm"
                            >ISSUE_NUMBER-&lt;ISSUE_TITLE&gt;</code
                        >.
                        <p>
                            For example, an issue #123 titled "add my new feature to do cool thing" will be <code class="bg-base-200 px-1 text-sm"
                                >123-add-my-new-feature-to-do-cool-thing</code
                            >.
                        </p>
                    </li>
                    <li>
                        Add commits to your branch. For information on commit messages, review <a
                            href="https://www.conventionalcommits.org/en/v1.0.0/#summary"
                            class="text-blue-600 hover:underline"
                            target="_blank"
                            rel="noopener noreferrer">conventional commits</a
                        >.
                    </li>
                </ol>
            </div>

            <div id="creating-pr" class="space-y-2">
                <h5 class="text-lg font-semibold">Creating a Pull Request</h5>
                <div class="alert alert-warning alert-soft text-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"
                        />
                    </svg>
                    <span>
                        <strong>Significant new features require design review before development begins.</strong> If your PR introduces a substantial new feature,
                        the ACROSS team strongly recommends opening a discussion or issue to go through a design review and receive approval from the team before
                        writing any code. Pull requests for unapproved features may not be actively monitored or reviewed, and there is no guarantee of acceptance.
                    </span>
                </div>
                <p class="leading-relaxed">
                    When you are ready to create a PR follow the Pull Request template instructions, below is a brief summary of the information needed in a PR.
                    It is recommended to create a pull-request as a "draft" and to commit early and often so the community can give you feedback at the
                    beginning stages of your contribution.
                </p>
                <ol class="list-decimal list-inside space-y-1 ml-2 leading-relaxed">
                    <li>
                        For the title, use <a
                            href="https://www.conventionalcommits.org/en/v1.0.0/#summary"
                            class="text-blue-600 hover:underline"
                            target="_blank"
                            rel="noopener noreferrer">conventional commits</a
                        >.
                    </li>
                    <li>
                        Describe the contribution. First document which issue number was fixed using the template "Fix #XYZ". Then describe the contribution.
                    </li>
                    <li>
                        Provide what testing was used to confirm the pull request resolves the linked issue. If writing new code, also provide the associated
                        coverage unit tests.
                    </li>
                    <li>Provide the expected behavior changes of the pull request.</li>
                    <li>Provide any additional context if applicable.</li>
                    <li>
                        Verify that the PR passes all workflow checks. If you expect some of these checks to fail, please note it in the Pull Request text or
                        comments.
                    </li>
                </ol>
            </div>

            <div id="what-happens-pr" class="space-y-2">
                <h5 class="text-lg font-semibold">What Happens to My Pull Request?</h5>
                <ol class="list-decimal list-inside space-y-1 ml-2 leading-relaxed">
                    <li>The ACROSS team will label and evaluate the pull request in their weekly stakeholder meetings.</li>
                    <li>If the pull request is accepted, it will be merged into the ACROSS repository.</li>
                </ol>
            </div>
        </div>
    </div>
</Section>
