<script lang="ts">
    export let title = '';
</script>

<fieldset class="fieldset bg-base-200 border-base-300 w-auto p-8">
    <legend class="fieldset-legend text-carbon-90 text-2xl">{title}</legend>
    <slot></slot>
    <!-- <label class="label" for="email">Email</label>
    <input id="email" type="email" class="input" placeholder="Email" />

    <label class="label" for="password">Password</label>
    <input id="password" type="password" class="input" placeholder="Password" />

    <button class="btn btn-neutral mt-4">Login</button> -->
</fieldset>
