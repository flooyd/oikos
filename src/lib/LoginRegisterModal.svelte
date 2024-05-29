<script lang="ts">
	import Modal from './Modal.svelte';
	import { apiUri, user } from './stores';

	export let title;
	export let modalOpen;

	let username = '';
	let email = 'lordrahl16@gmail.com';
	let password = '123456';
	let disabled = false;
	let registerSuccess = false;
	let errors: any[] = [];

	const handleSubmit = async (e: any) => {
		disabled = true;
		registerSuccess = false;
		errors = [];
		e.preventDefault();
		const body: any = {
			username,
			password,
			email
		};
		if (title === 'Register') {
			body.email = email;
		}
		console.log($apiUri);
		const res = await fetch(`${$apiUri}/users/${title.toLowerCase()}`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(body)
		});
		if (res.ok) {
			const data = await res.json();
			if (title === 'Register') {
				registerSuccess = true;
			}
			disabled = false;
			errors = [];
			if (title === 'Login') {
				$user = data;
				$modalOpen = false;
			}
		} else {
			const data = await res.json();
			if (typeof data.message === 'string') {
				errors.push(data.message);
				errors = errors;
			} else {
				errors = data.message;
			}
			disabled = false;
		}
	};
</script>

<Modal {title} {modalOpen}>
	<form on:submit={handleSubmit}>
		<div class="control">
			<label for="email">Email:</label>
			<input type="email" id="email" name="email" required bind:value={email} />
		</div>
		{#if title === 'Register'}
			<div class="control">
				<label for="username">Username:</label>
				<input type="text" id="username" name="username" required bind:value={username} />
			</div>
		{/if}
		<div class="control">
			<label for="password">Password:</label>
			<input type="password" id="password" name="password" required bind:value={password} />
		</div>
		<button type="submit">{title}</button>
		{#each errors as error}
			<div class="error">{error}</div>
		{/each}
		{#if registerSuccess}
			<div class="success">Registration successful!</div>
		{/if}
	</form>
</Modal>

<style>
	form {
		display: flex;
		flex-direction: column;
		gap: 10px;
	}
	.control {
		margin-bottom: 10px;
		color: white;
		display: flex;
		width: 300px;
		justify-content: space-between;
	}

	button {
		width: fit-content;
	}

	.error {
		color: red;
	}

	.success {
		color: lightblue;
	}
</style>
