<script lang="ts">
	import LoginRegisterModal from '$lib/LoginRegisterModal.svelte';
	import { fade } from 'svelte/transition';
	import { loginModalOpen, registerModalOpen, user } from '$lib/stores';
	import { goto } from '$app/navigation';

	const handleClickLogin = () => {
		$loginModalOpen = true;
		$registerModalOpen = false;
	};

	const handleClickRegister = () => {
		$registerModalOpen = true;
		$loginModalOpen = false;
	};

	const handleClickTitle = () => {
		$loginModalOpen = false;
		$registerModalOpen = false;
		goto('/');
	};
</script>

<nav>
	<div class="title">
		<button on:click={handleClickTitle}><h1>Οἶκος</h1></button>
	</div>
	<div class="options">
		{#if !$user}
			<button on:click={handleClickRegister}>Register</button>
			<button on:click={handleClickLogin}>Login</button>
		{/if}
		{#if $user}
			<button class="user">{$user.username}</button>
		{/if}
	</div>
</nav>
<main>
	<slot></slot>
</main>
{#if $loginModalOpen}
	<div transition:fade>
		<LoginRegisterModal title="Login" modalOpen={loginModalOpen} />
	</div>
{/if}

{#if $registerModalOpen}
	<div transition:fade>
		<LoginRegisterModal title="Register" modalOpen={registerModalOpen} />
	</div>
{/if}

<style>
	:global(*) {
		box-sizing: border-box;
		border: none;
		outline: none;
		font-size: 15px;
		margin: 0px;
		padding: 0px;
		font-family: 'Roboto Mono', monospace;
	}

	:global(h1, h2, h3) {
		font-family: 'Roboto Slab', monospace;
	}

	:global(h1) {
		font-size: 25px;
	}

	:global(h2) {
		font-size: 20px;
	}

	:global(h3) {
		font-size: 15px;
	}

	:global(button) {
		background-color: #333;
		color: white;
		border: 2px solid lightblue;
		padding: 5px;
		cursor: pointer;
		font-family: 'Roboto Slab', monospace;
	}

	:global(button:hover) {
		background-color: #ccc;
		color: black;
	}

	nav {
		display: flex;
		justify-content: space-between;
		align-items: center;
		background-color: #333;
		color: white;
		padding: 5px 20px;
		height: 44px;
		border-bottom: 2px solid lightblue;
	}

	.title button {
		background-color: transparent;
		border: none;
		padding: 0px;
	}

	main {
		height: calc(100vh - 44px);
		padding: 20px;
		width: calc(100vw);
	}
</style>
