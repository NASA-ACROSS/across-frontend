<script lang="ts">
    const colors = {
        planned: 'badge-error',
        scheduled: 'badge-info',
        performed: 'badge-success',
    };

    interface Props {
        status: 'planned' | 'scheduled' | 'performed';
    }

    let { status }: Props = $props();
</script>

<div>
    <div title="Schedule Type" class="badge {colors[status]}">{status.toUpperCase()}</div>
</div>
