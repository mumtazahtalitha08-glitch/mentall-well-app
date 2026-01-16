<script>
	import { getMoodStats, getJournalEntries } from '$lib/utils.js';
	import { onMount } from 'svelte';
	import { currentLanguage } from '$lib/stores.js';

	let moodStats = $state(null);
	let journalCount = $state(0);

	onMount(() => {
		moodStats = getMoodStats();
		journalCount = getJournalEntries().length;
	});

	function getTranslation(key) {
		const translations = {
			en: {
				welcome: 'Stay Based, Stay Balanced.',
				brand: 'MentalWell',
				subtitle: 'Your ultimate mental health glow up. Track vibes, dump your thoughts, and keep your mental game strong. No cap.',
				statMood: 'Vibe Checks',
				statJournal: 'Thought Dumps',
				statAverage: 'Weekly Vibe',
				averageNoData: 'No vibes yet',
				cardMoodTitle: 'Vibe Tracker 🧬',
				cardMoodDesc: 'Log how you\'re feeling fr. Spot the patterns, fix the mood.',
				cardJournalTitle: 'Dear Diary 📝',
				cardJournalDesc: 'Unfiltered thought dump zone. Spills the tea with yourself.',
				cardAssessmentTitle: 'Vibe Check 🧠',
				cardAssessmentDesc: 'Take the tests. Catch the burnout before it hatches.',
				cardTipsTitle: 'Pro Tips 💡',
				cardTipsDesc: 'Level up your mental health with actual useful hacks.',
				reminderTitle: 'Daily Vibe Check ✨',
				reminderText: '"You\'re literally doing great, bestie. Don\'t let the minor inconveniences break your character arc."',
				reminderSub: 'Take a second for yourself, you earned it.'
			},
			id: {
				welcome: 'Stay Based, Stay Balanced.',
				brand: 'MentalWell',
				subtitle: 'Glow up mental lo bareng kita. Cek mood, curhat sepuasnya, dan pastiin mental lo tetep ON. No cap.',
				statMood: 'Cek Vibe',
				statJournal: 'Curhatan',
				statAverage: 'Vibe Mingguan',
				averageNoData: 'Belum ada vibe',
				cardMoodTitle: 'Cek Mood 🧬',
				cardMoodDesc: 'Catat perasaan lo yang sebenernya. Liat polanya, benerin moodnya.',
				cardJournalTitle: 'Curhat Zone 📝',
				cardJournalDesc: 'Tempat tumpah ruah pikiran lo. Spill the tea sama diri sendiri.',
				cardAssessmentTitle: 'Vibe Check 🧠',
				cardAssessmentDesc: 'Ikutin tesnya. Jangan sampe kena mental pas lagi sayang-sayangnya.',
				cardTipsTitle: 'Tips Pro 💡',
				cardTipsDesc: 'Upgrade kesehatan mental lo pake cara yang beneran asik.',
				reminderTitle: 'Vibe Check Harian ✨',
				reminderText: '"Lo beneran udah keren banget, bestie. Jangan biarin hal kecil ngerusak vibe lo hari ini."',
				reminderSub: 'Istirahat bentar yuk, lo pantes dapetin ini.'
			}
		};
		return translations[$currentLanguage]?.[key] || key;
	}
</script>

<div class="space-y-16 py-10">
	<!-- Hero Section: Ultra Bold Gen Z Style -->
	<section class="text-center space-y-6 animate-in fade-in slide-in-from-bottom-8 duration-1000">
		<h1 class="text-5xl md:text-[8rem] font-black leading-none tracking-tighter uppercase italic text-gray-900 dark:text-white">
			{getTranslation('welcome')}
		</h1>
		<div class="flex items-center justify-center gap-4">
			<span class="h-[2px] w-12 bg-purple-600 dark:bg-cyan-400"></span>
			<span class="text-3xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500 dark:from-cyan-400 dark:to-blue-500 tracking-tighter italic">
				{getTranslation('brand')}
			</span>
			<span class="h-[2px] w-12 bg-purple-600 dark:bg-cyan-400"></span>
		</div>
		<p class="text-lg md:text-2xl font-bold text-gray-700 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed border-l-4 border-purple-600 dark:border-cyan-400 pl-6 italic">
			{getTranslation('subtitle')}
		</p>
	</section>

	<!-- Quick Stats: Glassmorphic Floating Cards -->
	<section class="grid grid-cols-1 md:grid-cols-3 gap-8">
		<div class="group bg-white/40 dark:bg-white/5 backdrop-blur-xl rounded-[2.5rem] p-8 border border-white/50 dark:border-white/10 shadow-2xl hover:scale-105 transition-all duration-500">
			<div class="flex items-center gap-6">
				<div class="text-5xl group-hover:rotate-12 transition-transform">😊</div>
				<div>
					<h3 class="text-xs font-black uppercase tracking-widest text-purple-600 dark:text-cyan-400 mb-1">{getTranslation('statMood')}</h3>
					<p class="text-4xl font-black text-gray-900 dark:text-white leading-none">
						{moodStats?.total || 0}
					</p>
				</div>
			</div>
		</div>

		<div class="group bg-white/40 dark:bg-white/5 backdrop-blur-xl rounded-[2.5rem] p-8 border border-white/50 dark:border-white/10 shadow-2xl hover:scale-105 transition-all duration-500">
			<div class="flex items-center gap-6">
				<div class="text-5xl group-hover:scale-110 transition-transform">📝</div>
				<div>
					<h3 class="text-xs font-black uppercase tracking-widest text-pink-600 dark:text-pink-400 mb-1">{getTranslation('statJournal')}</h3>
					<p class="text-4xl font-black text-gray-900 dark:text-white leading-none">
						{journalCount}
					</p>
				</div>
			</div>
		</div>

		<div class="group bg-white/40 dark:bg-white/5 backdrop-blur-xl rounded-[2.5rem] p-8 border border-white/50 dark:border-white/10 shadow-2xl hover:scale-105 transition-all duration-500">
			<div class="flex items-center gap-6">
				<div class="text-5xl group-hover:-rotate-12 transition-transform">📊</div>
				<div>
					<h3 class="text-xs font-black uppercase tracking-widest text-blue-600 dark:text-cyan-400 mb-1">{getTranslation('statAverage')}</h3>
					<p class="text-2xl font-black text-gray-900 dark:text-white leading-none">
						{moodStats?.averageLastWeek ? `${moodStats.averageLastWeek}/5` : getTranslation('averageNoData')}
					</p>
				</div>
			</div>
		</div>
	</section>

	<!-- Navigation Bento Grid -->
	<section class="grid grid-cols-1 md:grid-cols-2 gap-8 lg:aspect-[16/6]">
		<!-- Big Cards -->
		<a href="/mood" class="group relative overflow-hidden bg-gradient-to-br from-purple-600 to-pink-500 rounded-[3rem] p-10 shadow-2xl transition-all duration-500 hover:shadow-purple-500/20">
			<div class="absolute -right-10 -bottom-10 text-[15rem] opacity-20 group-hover:scale-110 group-hover:-rotate-12 transition-all duration-700">🧬</div>
			<div class="relative z-10 h-full flex flex-col justify-end">
				<h3 class="text-4xl font-black text-white italic tracking-tighter uppercase mb-2">
					{getTranslation('cardMoodTitle')}
				</h3>
				<p class="text-purple-50 font-bold text-lg max-w-xs">{getTranslation('cardMoodDesc')}</p>
			</div>
		</a>

		<a href="/journal" class="group relative overflow-hidden bg-gradient-to-br from-cyan-500 to-blue-600 rounded-[3rem] p-10 shadow-2xl transition-all duration-500 hover:shadow-cyan-500/20">
			<div class="absolute -right-10 -bottom-10 text-[15rem] opacity-20 group-hover:scale-110 group-hover:rotate-12 transition-all duration-700">📝</div>
			<div class="relative z-10 h-full flex flex-col justify-end">
				<h3 class="text-4xl font-black text-white italic tracking-tighter uppercase mb-2">
					{getTranslation('cardJournalTitle')}
				</h3>
				<p class="text-cyan-50 font-bold text-lg max-w-xs">{getTranslation('cardJournalDesc')}</p>
			</div>
		</a>

		<a href="/assessment" class="group relative overflow-hidden bg-gradient-to-br from-orange-400 to-red-500 rounded-[3rem] p-10 shadow-2xl transition-all duration-500 hover:shadow-orange-500/20">
			<div class="absolute -right-10 -bottom-10 text-[15rem] opacity-20 group-hover:scale-110 transition-all duration-700">🧠</div>
			<div class="relative z-10 h-full flex flex-col justify-end">
				<h3 class="text-4xl font-black text-white italic tracking-tighter uppercase mb-2">
					{getTranslation('cardAssessmentTitle')}
				</h3>
				<p class="text-orange-50 font-bold text-lg max-w-xs">{getTranslation('cardAssessmentDesc')}</p>
			</div>
		</a>

		<a href="/tips" class="group relative overflow-hidden bg-gradient-to-br from-indigo-600 to-purple-700 rounded-[3rem] p-10 shadow-2xl transition-all duration-500 hover:shadow-indigo-500/20">
			<div class="absolute -right-10 -bottom-10 text-[15rem] opacity-20 group-hover:scale-110 transition-all duration-700">💡</div>
			<div class="relative z-10 h-full flex flex-col justify-end">
				<h3 class="text-4xl font-black text-white italic tracking-tighter uppercase mb-2">
					{getTranslation('cardTipsTitle')}
				</h3>
				<p class="text-indigo-50 font-bold text-lg max-w-xs">{getTranslation('cardTipsDesc')}</p>
			</div>
		</a>
	</section>

	<!-- Daily Inspiration: Trendy Quote Section -->
	<section class="bg-white/50 dark:bg-black/40 backdrop-blur-2xl rounded-[3rem] p-12 text-center border-2 border-white/60 dark:border-white/5 shadow-2xl relative overflow-hidden">
		<div class="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-pink-500/5 pointer-events-none"></div>
		<div class="relative z-10 space-y-4">
			<h2 class="text-xs font-black uppercase tracking-[0.5em] text-purple-600 dark:text-cyan-400 mb-2">
				{getTranslation('reminderTitle')}
			</h2>
			<p class="text-3xl md:text-5xl font-black text-gray-900 dark:text-white max-w-4xl mx-auto leading-tight italic tracking-tight">
				{getTranslation('reminderText')}
			</p>
			<p class="text-sm font-bold text-gray-500 dark:text-gray-400 tracking-wide">
				{getTranslation('reminderSub')} ❤️
			</p>
		</div>
	</section>
</div>

<style>
	:global(.animate-in) {
		animation-fill-mode: forwards;
		animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
	}

	@keyframes fade-in-slide {
		from { opacity: 0; transform: translateY(2rem); }
		to { opacity: 1; transform: translateY(0); }
	}

	.slide-in-from-bottom-8 { animation: fade-in-slide 1s ease-out; }
</style>