<script lang="ts">
    export let dateBegin: string = '';
    export let timeBegin: string = '';
    export let dateEnd: string = '';
    export let timeEnd: string = '';
</script>

<div class="grid grid-cols-1 md:grid-cols-2 gap-2 mb-4">
    <div>
        <label class="label text-lg" for="date-begin-input">
            <span class="label-text">Begin Date/Time</span>
        </label>
        <div class="grid grid-cols-2 space-x-2">
            <input id="date-begin-input" type="date" bind:value={dateBegin} class="input w-full text-primary" />
            <input id="time-begin-input" type="time" bind:value={timeBegin} class="input w-full" />
        </div>
    </div>
    <div>
        <label class="label text-lg" for="date-end-input">
            <span class="label-text">End Date/Time</span>
        </label>
        <div class="grid grid-cols-2 space-x-2">
            <input id="date-end-input" type="date" bind:value={dateEnd} class="input w-full" />
            <input id="time-end-input" type="time" bind:value={timeEnd} class="input w-full" />
        </div>
    </div>
</div>

<style>
    #date-begin-input::-webkit-calendar-picker-indicator,
    #date-end-input::-webkit-calendar-picker-indicator,
    #time-begin-input::-webkit-calendar-picker-indicator,
    #time-end-input::-webkit-calendar-picker-indicator {
        filter: invert();
    }
</style>
