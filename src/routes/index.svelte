<script>
    import { Dialog } from "$lib";

    let open = false;

    function save() {
        alert("Saved");
        open = false;
    }
</script>

<button on:click={() => open = true}>Open Dialog</button>

<Dialog bind:open title="Title">
    This is a simple Dialog.
    <!-- <svelte:fragment slot="footer">
        <button on:click={save}>Save</button>
        <button on:click={() => open = false}>Close</button>
    </svelte:fragment> -->
</Dialog>