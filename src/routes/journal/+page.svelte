<script>
	import { saveJournalEntry, getJournalEntries, deleteJournalEntry } from '$lib/utils.js';
	import { onMount } from 'svelte';

	let title = '';
	let content = '';
	let entries = [];
	let showForm = false;
	let showSuccess = false;

	onMount(() => {
		entries = getJournalEntries();
	});

	function handleSubmit() {
		if (!title.trim() || !content.trim()) {
			alert('Please fill in both title and content');
			return;
		}

		saveJournalEntry(title.trim(), content.trim());
		entries = getJournalEntries(); // Refresh the list
		
		// Reset form
		title = '';
		content = '';
		showForm = false;
		showSuccess = true;
		setTimeout(() => showSuccess = false, 3000);
	}

	function handleDelete(id) {
		if (confirm('Are you sure you want to delete this journal entry?')) {
			deleteJournalEntry(id);
			entries = getJournalEntries(); // Refresh the list
		}
	}

	function formatDate(timestamp) {
		return new Date(timestamp).toLocaleDateString('en-US', {
			weekday: 'long',
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		});
	}

	function formatTime(timestamp) {
		return new Date(timestamp).toLocaleTimeString('en-US', {
			hour: '2-digit',
			minute: '2-digit'
		});
	}

	function truncateContent(text, maxLength = 150) {
		return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
	}
</script>

<svelte:head>
	<title>Journal - MentalWell</title>
</svelte:head>

<div class="min-h-screen bg-gradient-to-br from-pink-100 via-purple-50 to-indigo-100 p-6">
<div class="max-w-4xl mx-auto space-y-8">
	<!-- Header -->
	<div class="text-center">
		<h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">
			Your Personal Journal 📔
		</h1>
		<p class="text-gray-600 dark:text-gray-300">
			Write down your thoughts, experiences, and reflections
		</p>
	</div>

	<!-- Success Message -->
	{#if showSuccess}
		<div class="bg-green-100/80 backdrop-blur-sm dark:bg-green-900/50 border border-green-300/50 dark:border-green-800 rounded-lg p-4 text-center shadow-lg">
			<p class="text-green-800 dark:text-green-200 font-medium">
				✅ Journal entry saved successfully!
			</p>
		</div>
	{/if}

	<!-- New Entry Button / Form -->
	<div class="bg-white/70 backdrop-blur-sm dark:bg-gray-800/70 rounded-lg shadow-lg p-6 border border-pink-200/50 dark:border-gray-700">
		{#if !showForm}
			<div class="text-center">
				<button
					on:click={() => showForm = true}
					class="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-lg transition-colors duration-200"
				>
					✍️ Write New Entry
				</button>
			</div>
		{:else}
			<div class="space-y-4">
				<div class="flex justify-between items-center">
					<h2 class="text-xl font-semibold text-gray-900 dark:text-white">New Journal Entry</h2>
					<button
						on:click={() => showForm = false}
						class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
					>
						✕
					</button>
				</div>
				
				<form on:submit|preventDefault={handleSubmit}>
					<div class="space-y-4">
						<div>
							<label for="title" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
								Title
							</label>
							<input
								id="title"
								type="text"
								bind:value={title}
								placeholder="Enter a title for your entry..."
								class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
								required
							/>
						</div>
						
						<div>
							<label for="content" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
								Content
							</label>
							<textarea
								id="content"
								bind:value={content}
								placeholder="Write your thoughts here..."
								rows="6"
								class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white resize-none"
								required
							></textarea>
						</div>
						
						<div class="flex gap-4">
							<button
								type="submit"
								class="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2 rounded-lg transition-colors duration-200"
							>
								Save Entry
							</button>
							<button
								type="button"
								on:click={() => showForm = false}
								class="bg-gray-300 hover:bg-gray-400 dark:bg-gray-600 dark:hover:bg-gray-500 text-gray-800 dark:text-white font-medium px-6 py-2 rounded-lg transition-colors duration-200"
							>
								Cancel
							</button>
						</div>
					</div>
				</form>
			</div>
		{/if}
	</div>

	<!-- Journal Entries -->
	<div class="space-y-6">
		<h2 class="text-2xl font-bold text-gray-900 dark:text-white">Your Entries</h2>
		
		{#if entries.length === 0}
			<div class="bg-white/70 backdrop-blur-sm dark:bg-gray-800/70 rounded-lg shadow-lg p-8 border border-purple-200/50 dark:border-gray-700 text-center">
				<div class="text-6xl mb-4">📝</div>
				<p class="text-gray-500 dark:text-gray-400">No journal entries yet. Start writing to capture your thoughts!</p>
			</div>
		{:else}
			<div class="space-y-4">
				{#each entries as entry}
					<div class="bg-white/70 backdrop-blur-sm dark:bg-gray-800/70 rounded-lg shadow-lg p-6 border border-purple-200/50 dark:border-gray-700">
						<div class="flex justify-between items-start mb-4">
							<h3 class="text-xl font-semibold text-gray-900 dark:text-white">{entry.title}</h3>
							<button
								on:click={() => handleDelete(entry.id)}
								class="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 text-sm"
								title="Delete entry"
							>
								🗑️
							</button>
						</div>
						
						<p class="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
							{entry.content.length > 300 ? truncateContent(entry.content, 300) : entry.content}
						</p>
						
						{#if entry.content.length > 300}
							<details class="mb-4">
								<summary class="text-blue-600 dark:text-blue-400 cursor-pointer hover:underline">
									Read more...
								</summary>
								<p class="text-gray-700 dark:text-gray-300 mt-2 leading-relaxed">
									{entry.content}
								</p>
							</details>
						{/if}
						
						<div class="text-sm text-gray-500 dark:text-gray-400">
							{formatDate(entry.timestamp)} at {formatTime(entry.timestamp)}
						</div>
					</div>
				{/each}
			</div>
		{/if}
	</div>
</div>
</div>