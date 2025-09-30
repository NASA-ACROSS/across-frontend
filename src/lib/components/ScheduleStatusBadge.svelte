<script lang="ts">
    const colors = {
        planned: 'badge-error',
        scheduled: 'badge-info',
        performed: 'badge-success',
    };

    export let status: 'planned' | 'scheduled' | 'performed';
</script>

<div>
    <div title="Schedule Type" class="badge {colors[status]}">{status.toUpperCase()}</div>
</div>
