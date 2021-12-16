<script lang="ts">
	import { createEventDispatcher } from "svelte";
	import { uid, focusTrap } from "../utils";

	/** Determines whether the dialog is open or not */
	export let open = false;

	/** Title text displayed as the dialog header */
	export let title = "";

	/** Determines whether the dialog can be conventially closed using the escape key or backdrop click. */
	export let closable = true;

	/** Determines the node the dialog should be appended to */
	export let append: HTMLElement = undefined;

	/** Specifies a custom class name for the dialog */
	let className = "";
	export { className as class };

	const dispatch = createEventDispatcher();
	const titleId = uid("dialog-title-");
	const bodyId = uid("dialog-body-");

	function mountDialog(node) {
		if (append) append.appendChild(node);
		node.focus();
		dispatch("open");
		return {
			destroy() {
				dispatch("close");
			}
		}
	}

	function close() {
		if (closable && open) open = false;
	}

	function handleEscapeKey({ key }) {
		if (key === "Escape") close();
	}
</script>

<svelte:window on:keydown={handleEscapeKey} />

<!--
@component
An ARIA accessible Dialog component for displaying important information to users.
- Basic Usage:
    ```tsx
    <Dialog bind:open title="Title">
		This is a simple Dialog.
		<svelte:fragment slot="footer">
			<button>Option 1</button>
			<button>Option 2</button>
		</svelte:fragment>
	</Dialog>
    ```
-->
{#if open}
	<div
		class="dialog-backdrop"
		on:click={e => {
			dispatch("backdropclick", e);
			close();
		}}
		use:mountDialog
		use:focusTrap
	>
		<div
			on:click|stopPropagation
			class="dialog {className ?? ''}"
			role="dialog"
			aria-modal="true"
			aria-labelledby={titleId}
			aria-describedby={bodyId}
			{...$$restProps}
		>
			<div class="dialog-body" id={bodyId}>
				{#if title}
					<h2 id={titleId}>{title}</h2>
				{/if}
				<slot />
			</div>
			{#if $$slots.footer}
				<footer>
					<slot name="footer" />
				</footer>
			{/if}
		</div>
		<slot name="outer" />
	</div>
{/if}

<style lang="scss">
    @use "./Dialog";
</style>