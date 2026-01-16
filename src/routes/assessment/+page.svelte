<script>
	import { currentLanguage } from '$lib/stores.js';
	import { goto } from '$app/navigation';

	// Assessment data (Gen Z Glow Up Edition 💅)
	const assessments = {
		en: [
			{
				id: 'anxiety',
				title: 'Anxiety Vibe 😰',
				description: 'Feeling a bit too "extra" or shaky? Check your anxiety levels here.',
				icon: '😰'
			},
			{
				id: 'depression',
				title: 'Mood Drop 😔',
				description: 'Is it just a bad day or a whole mood? Let\'s check for depression symptoms.',
				icon: '😔'
			},
			{
				id: 'burnout',
				title: 'Burnout Alert 🔥',
				description: 'Feeling cooked? See if you\'re hitting the burnout wall.',
				icon: '🔥'
			},
			{
				id: 'stress',
				title: 'Stress Level 💥',
				description: 'A brief check to see if your stress is hitting 💯.',
				icon: '💥'
			},
			{
				id: 'stress_depression',
				title: 'Dual Check 🌿',
				description: 'The ultimate vibe check for both Stress & Depression. Stay balanced.',
				icon: '🌿'
			}
		],
		id: [
			{
				id: 'anxiety',
				title: 'Cek Kecemasan 😰',
				description: 'Lagi ngerasa "extra" cemas atau gemeteran? Cek level lo di sini.',
				icon: '😰'
			},
			{
				id: 'depression',
				title: 'Mood Drop 😔',
				description: 'Cuma hari yang buruk atau emang gejalanya? Cek di sini yuk.',
				icon: '😔'
			},
			{
				id: 'burnout',
				title: 'Burnout Alert 🔥',
				description: 'Ngerasa "cooked" banget? Cek apakah lo udah masuk fase burnout.',
				icon: '🔥'
			},
			{
				id: 'stress',
				title: 'Stress Level 💥',
				description: 'Tes singkat biar tau apakah stres lo udah mencapai 💯.',
				icon: '💥'
			},
			{
				id: 'stress_depression',
				title: 'Cek Dobel 🌿',
				description: 'Vibe check gabungan buat Stres & Depresi. Stay balanced, bestie.',
				icon: '🌿'
			}
		]
	};

	// State variables (Svelte 5 Runes)
	let showHistory = $state(false);
	let assessmentHistory = $state([]);
	let language = $derived($currentLanguage || 'id');

	function getAssessments() {
		return assessments[language] || assessments['id'];
	}

	function startAssessment(assessment) {
		goto(`/assessment/${assessment.id}`);
	}

	function toggleHistory() {
		showHistory = !showHistory;
		if (showHistory) { loadAssessmentHistory(); }
	}

	function loadAssessmentHistory() {
		if (typeof window !== 'undefined') {
			const stored = localStorage.getItem('mentalwell_assessment_history');
			assessmentHistory = stored ? JSON.parse(stored) : [];
		}
	}

	function clearHistory() {
		if (typeof window !== 'undefined' && confirm(language === 'id' ? 
			'Beneran mau hapus riwayat? No takebacks ya!' : 
			'Are you sure you want to clear your history? No takebacks!')) {
			assessmentHistory = [];
			localStorage.removeItem('mentalwell_assessment_history');
		}
	}

	function formatDate(timestamp) {
		return new Date(timestamp).toLocaleDateString(language === 'id' ? 'id-ID' : 'en-US', {
			year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
		});
	}

	function getTranslation(key) {
		const translations = {
			en: {
				title: 'The Vibe Check Zone 🧠',
				subtitle: 'Science-backed tests to see if you\'re actually chill or just pretending. No gatekeeping.',
				select: 'Pick Your Test',
				history: 'My Track Record',
				back: 'Go Back',
				clear: 'Clear Vibe History',
				empty: 'No vibes recorded yet. Go take a test, bestie!',
				infoTitle: 'Real Talk 🗣️',
				infoText: 'These tests are for educational vibes only. If you\'re really struggling, call a pro ASAP. You matter!'
			},
			id: {
				title: 'Vibe Check Zone 🧠',
				subtitle: 'Tes berbasis sains biar tau lo beneran chill atau cuma pura-pura. No gatekeeping.',
				select: 'Pilih Tes Lo',
				history: 'Track Record Gue',
				back: 'Balik Lagi',
				clear: 'Hapus Jejak Vibe',
				empty: 'Belum ada vibe yang tercatat. Buruan tes, bestie!',
				infoTitle: 'Real Talk 🗣️',
				infoText: 'Tes ini buat edukasi aja ya, bukan gantiin bantuan profesional. Kalo lo ngerasa berat banget, buruan cari ahli. Lo berharga!'
			}
		};
		return translations[language]?.[key] || key;
	}
</script>

<svelte:head>
	<title>{getTranslation('title')} - MentalWell</title>
</svelte:head>

<div class="space-y-10 py-6 animate-in fade-in duration-700">
	<!-- Header -->
	<header class="text-center space-y-4">
		<h1 class="text-4xl md:text-6xl font-black bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-red-500 tracking-tighter uppercase italic drop-shadow-sm">
			{getTranslation('title')}
		</h1>
		<p class="text-lg md:text-xl font-bold text-gray-700 dark:text-gray-300 max-w-2xl mx-auto italic leading-relaxed">
			"{getTranslation('subtitle')}"
		</p>
	</header>

	{#if !showHistory}
		<!-- Main Selection Grid -->
		<section class="bg-white/30 dark:bg-black/40 backdrop-blur-2xl rounded-[3rem] p-8 md:p-12 border border-white/60 dark:border-white/10 shadow-2xl space-y-8 animate-in zoom-in-95 duration-700">
			<div class="flex flex-col md:flex-row justify-between items-center gap-6">
				<h2 class="text-2xl font-black uppercase tracking-widest text-orange-500 dark:text-orange-400">
					{getTranslation('select')}
				</h2>
				<button 
					onclick={toggleHistory}
					class="w-full md:w-auto px-8 py-3 bg-white/80 dark:bg-white/5 border border-orange-200 dark:border-orange-900 rounded-2xl font-black text-xs uppercase tracking-widest text-orange-600 dark:text-orange-400 hover:bg-orange-600 hover:text-white transition-all shadow-lg active:scale-95"
				>
					{getTranslation('history')} 🕰️
				</button>
			</div>

			<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
				{#each getAssessments() as assessment}
					<button 
						onclick={() => startAssessment(assessment)}
						class="group relative overflow-hidden bg-white/60 dark:bg-white/5 backdrop-blur-md rounded-[2.5rem] p-8 border border-white/80 dark:border-white/10 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 text-left"
					>
						<div class="absolute -right-6 -bottom-6 text-9xl opacity-10 group-hover:scale-125 transition-transform duration-700">
							{assessment.icon}
						</div>
						<div class="relative z-10 flex flex-col h-full">
							<div class="text-5xl mb-6 group-hover:scale-110 transition-transform origin-left">{assessment.icon}</div>
							<h3 class="text-2xl font-black text-gray-900 dark:text-white mb-2 tracking-tight group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors italic uppercase">
								{assessment.title}
							</h3>
							<p class="text-sm font-bold text-gray-600 dark:text-gray-400 italic">
								{assessment.description}
							</p>
						</div>
					</button>
				{/each}
			</div>
		</section>
	{:else}
		<!-- History View -->
		<section class="bg-white/30 dark:bg-black/40 backdrop-blur-2xl rounded-[3rem] p-8 md:p-12 border border-white/60 dark:border-white/10 shadow-2xl space-y-8 animate-in slide-in-from-right-8 duration-700">
			<div class="flex flex-col md:flex-row justify-between items-center gap-6">
				<h2 class="text-2xl font-black uppercase tracking-widest text-red-500">
					{getTranslation('history')}
				</h2>
				<div class="flex w-full md:w-auto gap-3">
					<button 
						onclick={clearHistory}
						class="flex-1 md:flex-none px-6 py-3 bg-red-500/10 text-red-600 text-[10px] font-black uppercase tracking-widest rounded-2xl hover:bg-red-600 hover:text-white transition-all border border-red-500/20"
						disabled={assessmentHistory.length === 0}
					>
						{getTranslation('clear')} 🧨
					</button>
					<button 
						onclick={toggleHistory}
						class="flex-1 md:flex-none px-6 py-3 bg-gray-500/10 text-gray-600 text-[10px] font-black uppercase tracking-widest rounded-2xl hover:bg-gray-600 hover:text-white transition-all border border-gray-500/20"
					>
						{getTranslation('back')} 🔙
					</button>
				</div>
			</div>
			
			{#if assessmentHistory.length === 0}
				<div class="text-center py-20 bg-white/20 dark:bg-black/10 rounded-[2.5rem] border-2 border-dashed border-white/40 dark:border-white/5">
					<div class="text-[8rem] mb-6 opacity-20">📭</div>
					<p class="text-xl font-bold text-gray-500 italic max-w-xs mx-auto">
						{getTranslation('empty')}
					</p>
				</div>
			{:else}
				<div class="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
					{#each assessmentHistory as entry}
						<div class="bg-white/80 dark:bg-white/5 backdrop-blur-md rounded-3xl p-6 border border-white/50 dark:border-white/10 shadow-lg flex flex-col justify-between group">
							<div class="flex justify-between items-start mb-4">
								<div class="flex items-center gap-4">
									<div class="text-4xl group-hover:scale-125 transition-transform">{entry.assessmentIcon}</div>
									<div>
										<h4 class="text-lg font-black text-gray-900 dark:text-white uppercase italic leading-none">{entry.assessmentTitle}</h4>
										<p class="text-[10px] font-bold text-gray-500 uppercase tracking-widest mt-1">
											{formatDate(entry.timestamp)}
										</p>
									</div>
								</div>
								<div class="text-3xl font-black text-orange-600 dark:text-orange-400 italic">
									{entry.totalScore}
								</div>
							</div>
							<div class="mt-2 p-3 bg-white/50 dark:bg-black/20 rounded-2xl border border-white/50 dark:border-white/5">
								<p class="text-xs font-black text-purple-600 dark:text-cyan-400 uppercase tracking-widest mb-1">Interpretation:</p>
								<p class="text-sm font-bold text-gray-700 dark:text-gray-300 italic">"{entry.interpretation}"</p>
							</div>
						</div>
					{/each}
				</div>
			{/if}
		</section>
	{/if}

	<!-- Important Context -->
	<section class="bg-gradient-to-r from-red-500/10 to-orange-500/10 backdrop-blur-2xl border border-red-500/20 rounded-[3rem] p-10 relative overflow-hidden group">
		<div class="absolute -right-4 -bottom-4 text-9xl opacity-5 group-hover:scale-110 transition-transform">🗣️</div>
		<div class="relative z-10 text-center space-y-4">
			<h3 class="text-xs font-black uppercase tracking-[0.5em] text-red-600 dark:text-red-400">
				{getTranslation('infoTitle')}
			</h3>
			<p class="text-base md:text-lg font-bold text-gray-700 dark:text-gray-300 italic leading-relaxed max-w-3xl mx-auto">
				"{getTranslation('infoText')}"
			</p>
		</div>
	</section>
</div>

<style>
	:global(.custom-scrollbar::-webkit-scrollbar) {
		width: 6px;
	}
	:global(.custom-scrollbar::-webkit-scrollbar-track) {
		background: transparent;
	}
	:global(.custom-scrollbar::-webkit-scrollbar-thumb) {
		background: rgba(128, 128, 128, 0.2);
		border-radius: 10px;
	}
	:global(.custom-scrollbar::-webkit-scrollbar-thumb:hover) {
		background: rgba(128, 128, 128, 0.4);
	}
</style>
