<script>
	import { MOODS, saveMood, getMoods, getMoodStats, getMoodGraphData, getMoodInsights, getMoodColor } from '$lib/utils.js';
	import { onMount } from 'svelte';
	import { currentLanguage } from '$lib/stores.js';

	// Gen Z Mood Labels override
	const GENZ_MOODS = {
		en: [
			{ emoji: '😠', label: 'Cooked 💀', value: 1 },
			{ emoji: '😢', label: 'Down Bad 📉', value: 2 },
			{ emoji: '😐', label: 'Mid 😐', value: 3 },
			{ emoji: '😊', label: 'Vibing ✨', value: 4 },
			{ emoji: '😄', label: 'Peak Vibes 🚀', value: 5 }
		],
		id: [
			{ emoji: '😠', label: 'Emosi Cuy 😠', value: 1 },
			{ emoji: '😢', label: 'Sad Boy/Girl 😢', value: 2 },
			{ emoji: '😐', label: 'B aja 😐', value: 3 },
			{ emoji: '😊', label: 'Mantap ✨', value: 4 },
			{ emoji: '😄', label: 'Gokil Parah 🚀', value: 5 }
		]
	};

	let selectedMood = $state(null);
	let moods = $state([]);
	let stats = $state(null);
	let showSuccess = $state(false);
	let graphPeriod = $state('weekly');
	let detailedGraphData = $state([]);
	let insights = $state([]);
	let language = $derived($currentLanguage || 'id');

	const currentMoods = $derived(GENZ_MOODS[language] || GENZ_MOODS['id']);

	onMount(() => {
		refreshData();
	});

	function refreshData() {
		moods = getMoods();
		stats = getMoodStats();
		detailedGraphData = getDetailedMoodGraphData(graphPeriod);
		insights = getMoodInsights();
	}

	function handleMoodSelect(mood) {
		selectedMood = mood;
		saveMood(mood);
		refreshData();
		showSuccess = true;
		setTimeout(() => showSuccess = false, 3000);
	}

	function toggleGraphPeriod() {
		graphPeriod = graphPeriod === 'weekly' ? 'monthly' : 'weekly';
		detailedGraphData = getDetailedMoodGraphData(graphPeriod);
	}

	function getDetailedMoodGraphData(period = 'weekly') {
		if (typeof window === 'undefined') return [];
		const allMoods = getMoods();
		const now = new Date();
		let daysToCheck = period === 'monthly' ? 30 : 7;
		const graphData = [];
		for (let i = daysToCheck - 1; i >= 0; i--) {
			const date = new Date(now);
			date.setDate(date.getDate() - i);
			const dayMoods = allMoods.filter(m => new Date(m.timestamp).toDateString() === date.toDateString());
			const dayName = date.toLocaleDateString(language === 'id' ? 'id-ID' : 'en-US', { weekday: 'short' });
			const fullDate = date.toLocaleDateString(language === 'id' ? 'id-ID' : 'en-US', { month: 'short', day: 'numeric' });
			if (dayMoods.length > 0) {
				const average = dayMoods.reduce((sum, m) => sum + m.mood.value, 0) / dayMoods.length;
				graphData.push({ dayName, fullDate, value: Math.round(average * 10) / 10, count: dayMoods.length });
			} else {
				graphData.push({ dayName, fullDate, value: null, count: 0 });
			}
		}
		return graphData;
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

	function getOverallTrend() {
		if (detailedGraphData.length < 2) return null;
		const recent = detailedGraphData.filter(d => d.value !== null);
		if (recent.length < 2) return null;
		const first = recent[0].value;
		const last = recent[recent.length - 1].value;
		if (last > first + 0.5) return 'improving';
		if (last < first - 0.5) return 'declining';
		return 'stable';
	}
</script>

<svelte:head>
	<title>{language === 'id' ? 'Cek Vibe Mood' : 'Mood Vibe Check'} - MentalWell</title>
</svelte:head>

<div class="space-y-10 py-6 animate-in fade-in duration-700">
	<!-- Header -->
	<header class="text-center space-y-4">
		<h1 class="text-4xl md:text-6xl font-black bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-600 tracking-tighter uppercase italic">
			{language === 'id' ? 'VIBE CHECK HARI INI 🌟' : 'DAILY VIBE CHECK 🌟'}
		</h1>
		<p class="text-gray-600 dark:text-gray-400 font-bold italic">
			{language === 'id' ? 'Gimana kondisi lo hari ini? Jangan di-gatekeep ya.' : 'How\'s your energy today? No gatekeeping allowed.'}
		</p>
	</header>

	<!-- Success Toast -->
	{#if showSuccess}
		<div class="fixed top-24 left-1/2 -translate-x-1/2 z-50 animate-in slide-in-from-top-4 duration-300">
			<div class="bg-emerald-500 text-white px-8 py-3 rounded-full font-black text-sm uppercase tracking-widest shadow-2xl shadow-emerald-500/40 border border-emerald-400">
				{language === 'id' ? 'Vibe lo udah kecatat! ✨' : 'Vibe recorded! Stay slaying. ✨'}
			</div>
		</div>
	{/if}

	<!-- Mood Selection Grid -->
	<section class="bg-white/30 dark:bg-black/40 backdrop-blur-2xl rounded-[3rem] p-8 md:p-12 border border-white/60 dark:border-white/10 shadow-2xl max-w-4xl mx-auto relative overflow-hidden">
		<div class="absolute -right-20 -top-20 text-[15rem] opacity-5 pointer-events-none">✨</div>
		
		<h2 class="text-xs font-black uppercase tracking-[0.3em] text-pink-600 dark:text-pink-400 mb-8 text-center">{language === 'id' ? 'Pilih Vibe Lo' : 'Pick Your Vibe'}</h2>
		
		<div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 relative z-10">
			{#each currentMoods as mood}
				<button
					onclick={() => handleMoodSelect(mood)}
					class="group relative p-6 rounded-[2rem] border-2 transition-all duration-300 transform active:scale-95
						{selectedMood?.value === mood.value 
							? 'bg-gradient-to-br from-pink-500 to-violet-600 text-white border-pink-400 shadow-xl scale-105' 
							: 'bg-white/60 dark:bg-white/5 border-white/50 dark:border-white/10 hover:border-pink-300 hover:bg-white/80 dark:hover:bg-white/10'}"
				>
					<div class="text-5xl mb-4 transition-transform group-hover:scale-125 duration-500">{mood.emoji}</div>
					<div class="text-xs font-black uppercase tracking-tighter">{mood.label}</div>
					
					{#if selectedMood?.value === mood.value}
						<div class="absolute -top-2 -right-2 bg-white text-pink-600 rounded-full p-1 shadow-lg">
							<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
								<path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
							</svg>
						</div>
					{/if}
				</button>
			{/each}
		</div>
	</section>

	<!-- Stats & Trends Container -->
	<div class="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-6">
		<!-- Quick Stats Bento -->
		{#if stats}
			<div class="md:col-span-4 space-y-6">
				<div class="bg-gradient-to-br from-blue-500 to-cyan-500 p-8 rounded-[2.5rem] text-white shadow-xl shadow-blue-500/20 relative overflow-hidden group">
					<div class="absolute -right-4 -bottom-4 text-6xl opacity-20 transition-transform group-hover:scale-150 duration-700">✍️</div>
					<p class="text-[10px] font-black uppercase tracking-widest opacity-80">Total Vibe Checks</p>
					<h3 class="text-5xl font-black italic mt-2">{stats.total}</h3>
				</div>
				<div class="bg-gradient-to-br from-emerald-500 to-teal-500 p-8 rounded-[2.5rem] text-white shadow-xl shadow-emerald-500/20 relative overflow-hidden group">
					<div class="absolute -right-4 -bottom-4 text-6xl opacity-20 transition-transform group-hover:scale-150 duration-700">🔥</div>
					<p class="text-[10px] font-black uppercase tracking-widest opacity-80">This Week Grind</p>
					<h3 class="text-5xl font-black italic mt-2">{stats.last7Days}</h3>
				</div>
				<div class="bg-gradient-to-br from-violet-500 to-fuchsia-500 p-8 rounded-[2.5rem] text-white shadow-xl shadow-violet-500/20 relative overflow-hidden group">
					<div class="absolute -right-4 -bottom-4 text-6xl opacity-20 transition-transform group-hover:scale-150 duration-700">📊</div>
					<p class="text-[10px] font-black uppercase tracking-widest opacity-80">Vibe Level AVG</p>
					<h3 class="text-5xl font-black italic mt-2">{stats.averageLastWeek}<span class="text-xl not-italic opacity-60">/5</span></h3>
				</div>
			</div>
		{/if}

		<!-- Charts & Insights -->
		<div class="md:col-span-8 space-y-6">
			<section class="bg-white/30 dark:bg-black/40 backdrop-blur-2xl rounded-[3rem] p-8 border border-white/60 dark:border-white/10 shadow-2xl">
				<div class="flex justify-between items-center mb-10">
					<h2 class="text-xl font-black italic uppercase tracking-tighter text-gray-900 dark:text-white">
						{language === 'id' ? 'Tren Vibe Lo' : 'Vibe Analytics'}
					</h2>
					<button
						onclick={toggleGraphPeriod}
						class="px-6 py-2 bg-black dark:bg-white text-white dark:text-black rounded-full text-[10px] font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all"
					>
						{graphPeriod === 'weekly' ? (language === 'id' ? 'Lihat Bulanan' : 'Switch to Monthly') : (language === 'id' ? 'Lihat Mingguan' : 'Switch to Weekly')}
					</button>
				</div>

				<!-- Trend Banner -->
				{#if getOverallTrend()}
					<div class="mb-8 p-6 rounded-3xl bg-white/40 dark:bg-white/5 border border-white/60 dark:border-white/5 flex items-center gap-6">
						<div class="text-4xl">
							{getOverallTrend() === 'improving' ? '🚀' : getOverallTrend() === 'declining' ? '🆘' : '💎'}
						</div>
						<div>
							<h4 class="font-black text-sm uppercase tracking-tighter text-gray-900 dark:text-white">
								{getOverallTrend() === 'improving' ? (language === 'id' ? 'STOKS MENINGKAT!' : 'VIBES ARE UP!') : 
								 getOverallTrend() === 'declining' ? (language === 'id' ? 'Lagi Down Bad...' : 'Major Skill Issue...') : 
								 (language === 'id' ? 'Vibe Stabil' : 'Steady Vibes')}
							</h4>
							<p class="text-xs text-gray-600 dark:text-gray-400 font-bold">
								{getOverallTrend() === 'improving' ? (language === 'id' ? 'Lo lagi on fire banget belakangan ini!' : 'You\'re literally slaying right now.') : 
								 getOverallTrend() === 'declining' ? (language === 'id' ? 'Gpp kok lagi capek, lo butuh self-care.' : 'It\'s okay to be cooked sometimes. Take a break.') : 
								 (language === 'id' ? 'Vibe lo terjaga banget, no cap.' : 'Your energy is consistent, stay gold.')}
							</p>
						</div>
					</div>
				{/if}

				<!-- Visual Bars -->
				<div class="space-y-4">
					{#each detailedGraphData as data}
						<div class="flex items-center gap-4 group">
							<div class="w-12 text-[10px] font-black uppercase text-gray-500">
								{data.dayName}
							</div>
							<div class="flex-1 h-8 bg-black/5 dark:bg-white/5 rounded-full overflow-hidden relative border border-white/20">
								{#if data.value !== null}
									<div 
										class="absolute inset-y-0 left-0 bg-gradient-to-r from-pink-500 to-violet-600 transition-all duration-1000 flex items-center justify-end px-4 group-hover:brightness-110"
										style="width: {(data.value / 5) * 100}%"
									>
										<span class="text-[10px] font-black text-white italic drop-shadow-md">{data.value}</span>
									</div>
								{:else}
									<div class="w-full h-full flex items-center px-4">
										<span class="text-[8px] font-black text-gray-400 uppercase italic">No Data 📉</span>
									</div>
								{/if}
							</div>
						</div>
					{/each}
				</div>
			</section>

			<!-- Insights Card -->
			{#if insights.length > 0}
				<section class="bg-white/30 dark:bg-black/40 backdrop-blur-2xl rounded-[3rem] p-8 border border-white/60 dark:border-white/10 shadow-2xl">
					<h2 class="text-xl font-black italic uppercase tracking-tighter text-gray-900 dark:text-white mb-6">🧠 Vibe Insights</h2>
					<div class="space-y-4">
						{#each insights as insight}
							<div class="p-6 rounded-3xl bg-white/50 dark:bg-white/5 border border-white relative overflow-hidden flex items-center gap-4">
								<div class="text-3xl relative z-10">{insight.icon}</div>
								<div class="relative z-10">
									<h4 class="font-black text-xs uppercase tracking-tight text-gray-900 dark:text-white mb-1">{insight.title}</h4>
									<p class="text-xs text-gray-600 dark:text-gray-400 font-bold leading-tight">{insight.message}</p>
								</div>
							</div>
						{/each}
					</div>
				</section>
			{/if}
		</div>
	</div>

	<!-- History Table - Premium List -->
	<section class="max-w-4xl mx-auto bg-white/30 dark:bg-black/40 backdrop-blur-2xl rounded-[3rem] p-8 md:p-12 border border-white/60 dark:border-white/10 shadow-2xl relative overflow-hidden">
		<h2 class="text-xl font-black italic uppercase tracking-tighter text-gray-900 dark:text-white mb-8">
			{language === 'id' ? 'Riwayat Vibe' : 'Vibe History Archive'}
		</h2>

		{#if moods.length === 0}
			<div class="text-center py-20 opacity-30">
				<div class="text-[10rem] mb-4">👻</div>
				<p class="text-xs font-black uppercase tracking-[0.5em]">{language === 'id' ? 'Kosong Melompong' : 'Ghost Town'}</p>
			</div>
		{:else}
			<div class="space-y-3 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
				{#each moods.slice(0, 50) as m}
					<div class="group flex items-center justify-between p-6 bg-white/50 dark:bg-white/5 rounded-3xl border border-white hover:border-pink-400/50 transition-all duration-300">
						<div class="flex items-center gap-6">
							<div class="text-4xl group-hover:scale-125 transition-transform duration-500">{m.mood.emoji}</div>
							<div>
								<div class="text-xs font-black uppercase tracking-tighter text-gray-900 dark:text-white">
									{GENZ_MOODS[language]?.find(gm => gm.value === m.mood.value)?.label || m.mood.label}
								</div>
								<div class="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">
									{formatDate(m.timestamp)} • {formatTime(m.timestamp)}
								</div>
							</div>
						</div>
						<div class="px-4 py-2 bg-black dark:bg-white/10 rounded-xl text-white font-black italic text-sm">
							{m.mood.value}/5
						</div>
					</div>
				{/each}
			</div>
		{/if}
	</section>
</div>

<style>
	:global(.animate-in) { animation-fill-mode: forwards; animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1); }
	.custom-scrollbar::-webkit-scrollbar { width: 4px; }
	.custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
	.custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(0,0,0,0.1); border-radius: 10px; }
</style>