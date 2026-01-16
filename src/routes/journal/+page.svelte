<script>
	import { saveJournalEntry, getJournalEntries, deleteJournalEntry } from '$lib/utils.js';
	import { onMount } from 'svelte';
	import { currentLanguage } from '$lib/stores.js';

	let title = $state('');
	let content = $state('');
	let entries = $state([]);
	let showForm = $state(false);
	let showSuccess = $state(false);
	let language = $derived($currentLanguage || 'id');

	onMount(() => {
		entries = getJournalEntries();
	});

	function handleSubmit() {
		if (!title.trim() || !content.trim()) {
			return;
		}
		saveJournalEntry(title.trim(), content.trim());
		entries = getJournalEntries();
		title = ''; content = ''; showForm = false; showSuccess = true;
		setTimeout(() => showSuccess = false, 3000);
	}

	function handleDelete(id) {
		deleteJournalEntry(id);
		entries = getJournalEntries();
	}

	function formatDate(timestamp) {
		return new Date(timestamp).toLocaleDateString(language === 'id' ? 'id-ID' : 'en-US', {
			weekday: 'short', month: 'short', day: 'numeric'
		});
	}

	function formatTime(timestamp) {
		return new Date(timestamp).toLocaleTimeString(language === 'id' ? 'id-ID' : 'en-US', {
			hour: '2-digit', minute: '2-digit'
		});
	}
</script>

<svelte:head>
	<title>{language === 'id' ? 'Curhat Zone' : 'The Deep Thoughts'} - MentalWell</title>
</svelte:head>

<div class="space-y-10 py-6 animate-in fade-in duration-700">
	<!-- Header -->
	<header class="text-center space-y-4">
		<h1 class="text-4xl md:text-6xl font-black bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 to-blue-600 tracking-tighter uppercase italic">
			{language === 'id' ? 'CURHAT ZONE 📝' : 'THE DEEP THOUGHTS 📝'}
		</h1>
		<p class="text-gray-600 dark:text-gray-400 font-bold italic">
			{language === 'id' ? 'Spill semuanya di sini, rahasia aman kok.' : 'No filter needed. Spill the tea on your life here.'}
		</p>
	</header>

	<!-- Success Toast -->
	{#if showSuccess}
		<div class="fixed top-24 left-1/2 -translate-x-1/2 z-50 animate-in slide-in-from-top-4 duration-300">
			<div class="bg-cyan-500 text-white px-8 py-3 rounded-full font-black text-sm uppercase tracking-widest shadow-2xl shadow-cyan-500/40 border border-cyan-400">
				{language === 'id' ? 'Berhasil dicurhatkan! ✨' : 'Thoughts secured. ✨'}
			</div>
		</div>
	{/if}

	<!-- New Entry Section -->
	<section class="max-w-4xl mx-auto px-4">
		{#if !showForm}
			<div class="flex justify-center">
				<button
					onclick={() => showForm = true}
					class="group relative bg-black dark:bg-white text-white dark:text-black px-12 py-5 rounded-[2rem] font-black text-xs uppercase tracking-[0.2em] transform transition-all hover:scale-105 active:scale-95 shadow-2xl"
				>
					<span class="relative z-10 flex items-center gap-3">
						<span class="text-xl">✍️</span> {language === 'id' ? 'Mulai Curhat' : 'Start Spilling'}
					</span>
					<div class="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-[2rem] opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-0"></div>
				</button>
			</div>
		{:else}
			<div class="bg-white/30 dark:bg-black/40 backdrop-blur-2xl rounded-[3rem] p-8 md:p-12 border border-white/60 dark:border-white/10 shadow-2xl animate-in zoom-in-95 duration-500">
				<div class="flex justify-between items-center mb-8">
					<h2 class="text-xl font-black italic uppercase text-gray-900 dark:text-white">
						{language === 'id' ? 'Tulis Cerita Lo' : 'Spill Your Story'}
					</h2>
					<button onclick={() => showForm = false} class="w-10 h-10 flex items-center justify-center rounded-full bg-black/5 dark:bg-white/5 text-gray-500 hover:text-black dark:hover:text-white transition-colors">✕</button>
				</div>
				
				<form onsubmit={handleSubmit} class="space-y-6">
					<div class="space-y-2">
						<label class="text-[10px] font-black uppercase tracking-widest text-cyan-600 ml-4">Title / Vibes</label>
						<input
							type="text"
							bind:value={title}
							placeholder={language === 'id' ? 'Judul curhatan lo...' : 'What\'s the vibe today?'}
							class="w-full px-8 py-4 bg-white/50 dark:bg-white/5 border border-white/60 dark:border-white/10 rounded-2xl focus:ring-4 focus:ring-cyan-500/20 outline-none transition-all font-bold text-gray-900 dark:text-white"
							required
						/>
					</div>
					
					<div class="space-y-2">
						<label class="text-[10px] font-black uppercase tracking-widest text-cyan-600 ml-4">The Content</label>
						<textarea
							bind:value={content}
							placeholder={language === 'id' ? 'Ceritain semuanya di sini tanpa filter...' : 'Spill the tea here without filters...'}
							rows="8"
							class="w-full px-8 py-6 bg-white/50 dark:bg-white/5 border border-white/60 dark:border-white/10 rounded-[2rem] focus:ring-4 focus:ring-cyan-500/20 outline-none transition-all font-bold text-gray-900 dark:text-white resize-none"
							required
						></textarea>
					</div>
					
					<div class="flex gap-4 pt-4">
						<button
							type="submit"
							class="flex-1 py-5 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-cyan-500/20 active:scale-95 transition-all"
						>
							Save Story ✨
						</button>
						<button
							type="button"
							onclick={() => showForm = false}
							class="px-8 bg-black/5 dark:bg-white/5 text-gray-500 rounded-2xl font-black text-xs uppercase tracking-widest active:scale-95 transition-all"
						>
							Discard
						</button>
					</div>
				</form>
			</div>
		{/if}
	</section>

	<!-- Entries Display -->
	<section class="max-w-4xl mx-auto px-4 pb-20">
		<h2 class="text-xs font-black uppercase tracking-[0.5em] text-cyan-600 dark:text-cyan-400 mb-8 ml-4">
			{language === 'id' ? 'Arsip Curhatan' : 'Your Story Archive'}
		</h2>
		
		{#if entries.length === 0}
			<div class="bg-white/30 dark:bg-black/40 backdrop-blur-2xl rounded-[3rem] p-20 border border-white/60 dark:border-white/10 shadow-2xl text-center">
				<div class="text-[8rem] mb-6 opacity-20">📝</div>
				<p class="text-[10px] font-black uppercase tracking-[0.5em] text-gray-400">{language === 'id' ? 'Belum ada curhatan, bestie.' : 'Empty space. Start writing.'}</p>
			</div>
		{:else}
			<div class="grid grid-cols-1 gap-6">
				{#each entries as entry}
					<div class="group relative bg-white/30 dark:bg-black/40 backdrop-blur-2xl rounded-[3rem] p-8 md:p-10 border border-white/60 dark:border-white/10 shadow-2xl hover:border-cyan-400/50 transition-all duration-500 animate-in slide-in-from-bottom-4">
						<div class="flex justify-between items-start mb-6">
							<div>
								<div class="flex items-center gap-3 mb-2">
									<span class="w-3 h-3 rounded-full bg-cyan-500"></span>
									<span class="text-[10px] font-black uppercase tracking-widest text-gray-400">{formatDate(entry.timestamp)} • {formatTime(entry.timestamp)}</span>
								</div>
								<h3 class="text-2xl font-black italic uppercase tracking-tighter text-gray-900 dark:text-white group-hover:text-cyan-500 transition-colors">{entry.title}</h3>
							</div>
							<button
								onclick={() => handleDelete(entry.id)}
								class="opacity-0 group-hover:opacity-100 w-12 h-12 flex items-center justify-center rounded-2xl bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-all duration-300"
							>
								🗑️
							</button>
						</div>
						
						<p class="text-lg font-bold text-gray-700 dark:text-gray-300 leading-relaxed italic border-l-4 border-cyan-500/20 pl-6">
							"{entry.content}"
						</p>
						
						<div class="absolute -right-6 -bottom-6 text-[10rem] opacity-5 pointer-events-none group-hover:rotate-12 transition-transform duration-700">📖</div>
					</div>
				{/each}
			</div>
		{/if}
	</section>
</div>

<style>
	:global(.animate-in) { animation-fill-mode: forwards; animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1); }
</style>