<script>
	import Table from '$lib/Table.svelte';

	const columns = [
		'username',
		'title',
		'comments',
		'createdAt',
		'updatedAt',
		'upvotes',
		'downvotes'
	];
	const columnLabels = [
		'Username',
		'Title',
		'Comms.',
		'Created At',
		'Updated At',
		'Upvotes',
		'Downvotes'
	];
	let sortColumn = 'Created At';
	let sortDirection = 'asc';
	let data = [
		{
			username: 'user1',
			createdAt: new Date().toLocaleString(),
			updatedAt: new Date().toLocaleString(),
			title: 'this is an example of a post t',
			id: 1,
			comments: 0,
			upvotes: 0,
			downvotes: 0
		},
		{
			username: 'user2',
			createdAt: new Date().toLocaleString(),
			updatedAt: new Date().toLocaleString(),
			title: 'title2',
			id: 2,
			comments: 0,
			upvotes: 0,
			downvotes: 0
		}
	];
</script>

<h1>Posts</h1>

<Table {columns} {columnLabels} {data} {sortColumn} {sortDirection} />

<style>
	h1 {
		margin-bottom: 20px;
	}
</style>
