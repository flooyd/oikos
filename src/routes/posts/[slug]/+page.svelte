<script>
	import Table from '$lib/Table.svelte';

	export let data;

	let columns = ['id', 'author', 'content', 'createdAt', 'updatedAt'];
	let columnLabels = ['ID', 'Author', 'Content', 'Created At', 'Updated At'];
	let sortColumn = 'Created At';
	let sortDirection = 'asc';

	let users = [
		{
			id: 1,
			username: 'user1'
		}
	];
</script>

<div class="post">
	<h1>{data.title}</h1>
	<Table {columns} {columnLabels} data={data.comments} {sortColumn} {sortDirection} />
</div>

<style>
	h1 {
		margin-bottom: 20px;
	}
</style>
