<script lang="ts">
    export let id;
    export let item;
    export let key;
    export let value;
    export let index;
    export let type;

    const probabilityColor = (text) => {
        let color = 'rgb(210,210,210)';
        // test that the required characters are present
        const required_delimiters = [':', '%'];
        if (text.split('').some((val) => required_delimiters.includes(val))) {
            // find the percentage
            const percent = parseInt(
                text
                    .split(required_delimiters[0])[1]
                    .split(required_delimiters[1])[0] || '0'
            );
            if (percent >= 90) color = 'rgb(0,200,0)';
            if (percent >= 70 && percent < 90) color = 'rgb(255,225,0)';
            if (percent < 70) color = 'rgb(255,0,0)';
        }

        // yellow when partially inside SAA
        if (text.includes('partially inside SAA')) color = 'rgb(255,225,0)';

        return color;
    };
</script>

<div>
    {#if type == 'key'}
        {#if key == 'actions'}
            <div style="d-flex flex-row justify-content-end">
                <b style="letter-spacing: 0.1em">{value}</b>
            </div>
        {:else}
            <b style="letter-spacing: 0.1em">{value}</b>
        {/if}
    {:else if key == 'id'}
        <div style="color:rgb(160,160,255)">{value}</div>
    {:else if key == 'trigger_info'}
        <button
            class="btn btn-sm btn-outline-primary"
            data-bs-toggle="modal"
            data-bs-target="#triggerInfoModal">Show Trigger Info</button
        >
    {:else if key == 'status'}
        {#if value == 'Requested'}
            <div style="color:rgb(255,225,0)">{value}</div>
        {:else if value == 'Rejected'}
            <div style="color:rgb(255,50,50)">{value}</div>
        {:else if value == 'Approved'}
            <div style="color:rgb(0,200,0)">{value}</div>
        {/if}
    {:else if key == 'too_info'}
        <div style="color:{probabilityColor(value)}">{value}</div>
    {:else if key == 'actions'}
        <div
            class="btn-group d-flex flex-row justify-content-end"
            role="group"
            aria-label="Approve/Reject Actions"
        >
            <button
                type="button"
                class="btn btn-outline-success btn-icon ms-3"
                aria-label="Approve"
                title="Approve"
            >
                <i class="bx bx-check-circle"></i>
            </button>
            <button
                type="button"
                class="btn btn-outline-danger btn-icon"
                aria-label="Reject"
                title="Reject"
            >
                <i class="bx bx-trash"></i>
            </button>
        </div>
    {:else}
        {value}
    {/if}
</div>
