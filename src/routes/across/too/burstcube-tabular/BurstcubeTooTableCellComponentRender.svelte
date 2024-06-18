<script>
    export let id;
    export let item;
    export let key;
    export let value;
    export let index;
    export let type;

    const isProbable = (text) => {
        // test that the required characters are present
        const required_delimiters = [':', '%'];
        if (text.split('').some((val) => required_delimiters.includes(val))) {
            // find the percentage
            const percent = parseInt(
                text
                    .split(required_delimiters[0])[1]
                    .split(required_delimiters[1])[0] || '0'
            );
            if (percent > 90) return true;
        }

        return false;
    };
</script>

{#if type == 'key'}
    <b style="letter-spacing: 0.1em">{value}</b>
{:else if key == 'id'}
    <blink style="color:rgb(160,160,255)">{value}</blink>
{:else if key == 'trigger_info'}
    <button class="btn btn-primary">Show Info</button>
{:else if key == 'status'}
    {#if value == 'Requested'}
        <div style="color:rgb(255,255,0)">{value}</div>
    {:else if value == 'Rejected'}
        <div style="color:rgb(255,50,50)">{value}</div>
    {:else if value == 'Approved'}
        <div style="color:rgb(0,200,0)">{value}</div>
    {/if}
{:else if key == 'too_info'}
    <div style={isProbable(value) ? 'color:rgb(0,200,0)' : ''}>{value}</div>
{:else}
    {value}
{/if}
