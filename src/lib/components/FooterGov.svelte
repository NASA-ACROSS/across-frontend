<script>
    import {
        Identifier,
        IdentifierLogo,
        IdentifierLink,
        Link,
    } from "svelte-uswds";

    import NasaLogoRef from "assets/img/nasa-logo.svg";
</script>

<div class="footer-container">
    <Identifier
        description="Identifier description"
        domain="multimessenger.nasa.gov"
        disclaimer="An official website of the National Aeronautics and Space Administration"
    >
        <div slot="logos" let:props {...props}>
            <IdentifierLogo src={NasaLogoRef} />
        </div>

        <IdentifierLink href="https://nasa.gov">NASA</IdentifierLink>
        <IdentifierLink href="#">Link 2</IdentifierLink>

        <div slot="description" let:props>
            <div {...props}>For more information,</div>
            <Link
                href="https://designsystem.digital.gov/components/identifier/"
            >
                visit the source code
            </Link>
        </div>
    </Identifier>
</div>

<style>
    .footer-container {
        display: flex;
        flex-flow: column;
        justify-self: flex-end;
    }
</style>
