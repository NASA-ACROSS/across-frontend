<h2 class="text-3xl flex flex-col md:flex-row justify-between text-primary md:items-center items-start pb-3">
    <div>Contributing</div>
</h2>
<div class="space-y-8">
    <p class="text-base leading-relaxed">
        So you'd like to contribute to the ACROSS Project? Below are some guidelines for contributors to follow. Contributions come in all shapes and sizes. We
        appreciate your help with documentation, unit tests, framework code, continuous-integration, or simply reporting bugs and improvement ideas. We can't
        promise that we'll accept every suggestion or fix every bug in a timely manner but we'll respond to you as quickly as possible.
    </p>

    <!-- Code of Conduct -->
    <section id="code-of-conduct" class="space-y-2">
        <h3 class="text-2xl font-semibold text-primary border-b border-base-300 pb-2">Code of Conduct</h3>
        <p class="text-base leading-relaxed">
            This project and everyone participating in it is governed by the <a href="/docs/code-of-conduct" class="text-blue-600 hover:underline"
                >ACROSS Code of Conduct</a
            >. By participating, you are expected to uphold this code. Please report unacceptable behavior to the product team.
        </p>
    </section>

    <!-- Ways to Contribute -->
    <section id="ways-to-contribute" class="space-y-6">
        <h3 class="text-2xl font-semibold text-primary border-b border-base-300 pb-2">Ways to Contribute</h3>

        <!-- Bug Reports -->
        <div id="bug-reports" class="space-y-4">
            <h4 class="text-xl font-semibold">Bug Reports</h4>

            <div id="before-reporting-a-bug" class="space-y-2">
                <h5 class="text-lg font-semibold">Before Reporting a Bug</h5>
                <ol class="list-decimal list-inside space-y-1 ml-2 text-base leading-relaxed">
                    <li>
                        Perform a cursory search to see if the bug has already been reported. If a bug has been reported and the issue is still open, add a
                        comment to the existing issue instead of opening a new one.
                    </li>
                </ol>
            </div>

            <div id="reporting-a-bug" class="space-y-2">
                <h5 class="text-lg font-semibold">Reporting a Bug</h5>
                <p class="text-base leading-relaxed">If you find a bug in our code don't hesitate to report it:</p>
                <ol class="list-decimal list-inside space-y-1 ml-2 text-base leading-relaxed">
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
                <ol class="list-decimal list-inside space-y-1 ml-2 text-base leading-relaxed">
                    <li>The ACROSS team will label the issue.</li>
                    <li>
                        A team member will try to reproduce the issue with your provided steps. If the team is able to reproduce the issue, the issue will be
                        left to be implemented by someone.
                    </li>
                </ol>
            </div>
        </div>

        <!-- New Feature Requests -->
        <div id="new-feature-requests" class="space-y-4">
            <h4 class="text-xl font-semibold">New Feature Requests</h4>
            <p class="text-base leading-relaxed">
                ACROSS has a multitude of users from different fields and backgrounds. We appreciate your ideas for enhancements!
            </p>

            <div id="requesting-a-new-feature" class="space-y-2">
                <h5 class="text-lg font-semibold">Requesting a New Feature</h5>
                <ol class="list-decimal list-inside space-y-1 ml-2 text-base leading-relaxed">
                    <li>Open an issue using the feature request template.</li>
                    <li>Describe the feature.</li>
                    <li>Describe the solution you would like.</li>
                    <li>Describe alternatives you've considered.</li>
                    <li>Provide any additional context if applicable.</li>
                    <li>Provide your full name or GitHub username and your company organization if applicable.</li>
                </ol>
            </div>

            <div id="what-happens-feature" class="space-y-2">
                <h5 class="text-lg font-semibold">What Happens to my Feature Request?</h5>
                <ol class="list-decimal list-inside space-y-1 ml-2 text-base leading-relaxed">
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
        <div id="pull-requests" class="space-y-4">
            <h4 class="text-xl font-semibold">Pull Requests</h4>

            <div id="before-pr" class="space-y-2">
                <h5 class="text-lg font-semibold">Before starting your Pull Request</h5>
                <p class="text-base leading-relaxed">Ready to Add Your Code? Follow GitHub's fork-branch-pull request pattern.</p>
                <ol class="list-decimal list-inside space-y-1 ml-2 text-base leading-relaxed">
                    <li>Fork the respective git-hub repository.</li>
                    <li>Find the related issue number or create an associated issue that explains the intent of your new code.</li>
                    <li>
                        Create a new branch in your fork to work on your fix. We recommend naming your branch <code class="bg-base-200 px-1 rounded text-sm"
                            >[fix/feat]:ISSUE_NUMBER-&lt;FIX_SUMMARY&gt;</code
                        >.
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
                <p class="text-base leading-relaxed">
                    We recommend creating your pull-request as a "draft" and to commit early and often so the community can give you feedback at the beginning
                    of the process as opposed to asking you to change hours of hard work at the end.
                </p>
                <ol class="list-decimal list-inside space-y-1 ml-2 text-base leading-relaxed">
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
                <ol class="list-decimal list-inside space-y-1 ml-2 text-base leading-relaxed">
                    <li>The ACROSS team will label and evaluate the pull request in their weekly stakeholder meetings.</li>
                    <li>If the pull request is accepted, it will be merged into the ACROSS repository.</li>
                </ol>
            </div>
        </div>
    </section>
</div>
