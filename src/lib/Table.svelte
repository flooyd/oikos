<script lang="ts">
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';

	export let columns: string[] = [];
	export let columnLabels: string[] = [];
	export let data: any[] = [];

	export let sortColumn = '';
	export let sortDirection = 'asc';

	let ready = false;
	let resizingColumn: string | null = null;

	let columnWidths: Record<string, number> = {};
	let rowHeights: Record<string, number> = {};

	const handleClickColumn = (column: string) => {
		if (sortColumn === column) {
			sortDirection = sortDirection === 'asc' ? 'desc' : 'asc';
		} else {
			sortColumn = column;
			sortDirection = 'asc';
		}
	};

	$: data = [...data].sort((a, b) => {
		if (sortDirection === 'asc') {
			return a[sortColumn] > b[sortColumn] ? 1 : -1;
		} else {
			return a[sortColumn] < b[sortColumn] ? 1 : -1;
		}
	});

	const getCellWidth = (cell: any, column: string) => {
		const cellWidth = cell.getBoundingClientRect().width;
		if (cellWidth > columnWidths[column]) {
			columnWidths[column] = cellWidth;
		}
	};
	const getCellHeight = (cell: any, column: string) => {
		const cellHeight = cell.getBoundingClientRect().height;
		if (cellHeight > rowHeights[cell.id]) {
			rowHeights[cell.id] = cellHeight;
		}
	};

	$: ready
		? data.forEach((row, i) => {
				columns.forEach((column, j) => {
					const widthCell = document.getElementById(`${row.id}-${j}`);
					if (!widthCell) {
						return;
					}
					getCellWidth(widthCell, column);
					const heightCell = document.getElementById(`${row.id}`);
					getCellHeight(heightCell, column);
				});
			})
		: null;

	onMount(() => {
		columns.forEach((column, j) => {
			columnWidths[column] = 50;
		});
		data.forEach((row, i) => {
			rowHeights[row.id] = 20;
		});
		ready = true;
	});

	const getColumnHeaderClass = (column: string) => {
		if (column === 'createdAt' || column === 'updatedAt') {
			return 'tableData date';
		}
		if (column === 'title' || column === 'content') {
			return 'tableData longText';
		}
		if (column === 'username' || column === 'author') {
			return 'tableData fixed-medium';
		}
		if (
			column === 'upvotes' ||
			column === 'downvotes' ||
			column === 'comments' ||
			column === 'id'
		) {
			return 'tableData fixed-small';
		}
		return 'tableData';
	};

	const handleClickRow = (row: any) => {
		//navigate to post
		goto(`/posts/${row.id}`);
	};
</script>

<div class="table" style={ready ? '' : 'position: absolute; top: -10000px'}>
	<div class="tableHead">
		{#each columns as column, i}
			<div class={getColumnHeaderClass(column)} style="width: {columnWidths[column]}px;">
				<button id={column} on:click={() => handleClickColumn(column)}>
					{columnLabels[i]}
					{#if sortColumn === column}
						{sortDirection === 'asc' ? '▲' : '▼'}
					{/if}
				</button>
			</div>
		{/each}
	</div>
	{#each data as row, i}
		<button class="tableRow" id={row.id} on:click={() => handleClickRow(row)} tabindex={0}>
			{#each columns as column, j}
				<div
					class={getColumnHeaderClass(column)}
					id={row.id + '-' + j}
					style="width: {columnWidths[column]}px; height: {rowHeights[row.id]}px;"
				>
					{row[column]}
				</div>
			{/each}
		</button>
	{/each}
</div>

<style>
	.table {
		overflow: auto;
	}

	.tableData {
		font-size: 20px;
		position: relative;
		display: flex;
		align-items: center;
		padding: 5px;
		min-height: fit-content;
	}

	.tableData.date {
		min-width: 132px;
	}

	.tableData.fixed-small {
		min-width: 88px;
	}

	.tableData.fixed-medium {
		overflow: hidden;
		min-width: 150px;
		max-width: 150px;
		white-space: nowrap;
	}

	.tableData.longText {
		flex: 1;
		min-width: 250px;
		max-width: 50%;
	}

	.tableHead {
		display: flex;
		background-color: #333;
		color: white;
		border: 2px solid lightblue;
		border-top-left-radius: 5px;
		border-top-right-radius: 5px;
		width: fit-content;
		min-width: calc(100vw - 40px);
	}

	.tableHead button {
		border: none;
		padding: 0px;
	}

	.tableHead button:hover {
		background-color: #333;
		color: white;
	}

	.tableHead .tableData {
		border-right: 2px solid lightblue;
		color: lightblue;
	}

	.tableHead .tableData:last-child {
		border-right: none;
	}

	.tableRow {
		border: 2px solid #333;
		border-top: none;
		display: flex;
		background: white;
		color: black;
		cursor: pointer;
		width: fit-content;
		min-width: calc(100vw - 40px);
		padding: 0px;
	}

	.tableRow:hover {
		background-color: lightyellow;
	}

	.tableRow:nth-child(odd) {
		background-color: #ccc;
	}

	.tableRow:nth-child(odd):hover {
		background-color: lightyellow;
	}

	.tableRow .tableData {
		border-right: 2px solid #333;
	}

	.tableRow .tableData:last-child {
		border-right: none;
	}

	.tableRow:last-child {
		border-bottom-left-radius: 5px;
		border-bottom-right-radius: 5px;
	}

	.tableRow .tableData.date {
		font-size: 10px;
	}
</style>
