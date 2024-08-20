<script lang="ts">
    import type { User } from '$lib/types/User';

    export let user: User;

    $: isUserAdmin = user.user_groups.some((group) => group.is_admin);
</script>

isAdmin: {isUserAdmin}
