<script lang="ts">
	import type { Writable } from 'svelte/store';

	export let title = '';
	export let modalOpen: Writable<boolean>;

	const handleClose = () => {
		console.log('close');
		console.log(modalOpen);
		$modalOpen = false;
	};
</script>

<div class="modal">
	<div class="topRow">
		<h1>{title}</h1>
		<button on:click={handleClose}>X</button>
	</div>
	<slot></slot>
</div>

<style>
	.modal {
		position: absolute;
		top: 44px;
		background-color: #333;
		border-top: none;
		width: 100vw;
		height: calc(100vh - 44px);
		padding: 20px;
	}

	.topRow {
		display: flex;
		justify-content: space-between;
		width: 100%;
		background-color: #333;
		color: white;
		margin-bottom: 20px;
		padding-bottom: 5px;
	}

	button {
		background-color: transparent;
		color: white;
		border: none;
		cursor: pointer;
	}

	h1 {
		color: lightblue;
		width: fit-content;
		border-bottom: 2px solid lightblue;
	}
</style>
