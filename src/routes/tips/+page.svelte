<script>
	import { currentLanguage } from '$lib/stores.js';

	// English Tips (Gen Z Edition 💅)
	const tipsEN = [
		{
			id: 1,
			category: 'Vibe Check',
			emoji: '😮‍💨',
			title: 'Core Breathing (No Cap)',
			description: 'Reset your nervous system with the 4-7-8 tech. It\'s literally a cheat code for anxiety.',
			steps: [
				'Inhale for 4s (inhale the good vibes)',
				'Hold for 7s (let it marinate)',
				'Exhale for 8s (let that ☕️ out)',
				'Repeat until you\'re chill'
			]
		},
		{
			id: 2,
			category: 'Era',
			emoji: '🧘✨',
			title: 'Main Character Zen',
			description: 'Stop the brain rot. 5 mins of grounding to remember you\'re that girl/guy.',
			steps: [
				'Sit like a boss',
				'Close eyes, focus on breath (the real aesthetic)',
				'Thoughts? Just "seen" them and let go',
				'Bring it back when you start scrolling in your head',
				'5 mins daily for the glow up'
			]
		},
		{
			id: 3,
			category: 'Hustle',
			emoji: '👟',
			title: 'Get That Movement',
			description: 'Endorphins are the flex. Don\'t be a couch potato, bestie.',
			steps: [
				'30 mins of vibing/moving',
				'10 min hot girl/boy walk',
				'Stretches or Yoga (flexible era)',
				'Dance like nobody\'s watching (TikTok style)',
				'Stairs > Elevator (leg day is every day)'
			]
		},
		{
			id: 4,
			category: 'Snooze',
			emoji: '😴',
			title: 'Sleep Hygiene (For Real)',
			description: 'Blue light is the enemy. Fix your sleep schedule or you\'ll be cooked.',
			steps: [
				'Consistency is key (same time, every night)',
				'Bedtime routine is a whole mood',
				'No phone 1 hour before (the hardest part)',
				'Dark & cool room = elite sleep',
				'Cut caffeine after 2 PM (no more iced lattes)'
			]
		},
		{
			id: 5,
			category: 'Reality Check',
			emoji: '🌱',
			title: '5-4-3-2-1 Grounding',
			description: 'When the panic hits, use your senses to come back to earth. No gatekeeping here.',
			steps: [
				'5 things you see (look around local)',
				'4 things you can touch (feel the texture)',
				'3 things you hear (aesthetic sounds only)',
				'2 things you smell (vibe check)',
				'1 thing you can taste (keep it 💯)'
			]
		},
		{
			id: 6,
			category: 'Energy',
			emoji: '🙏',
			title: 'Gratitude Flex',
			description: 'Flexing what you have > what you don\'t. It\'s a whole lifestyle change.',
			steps: [
				'Write 3 wins/gratitudes',
				'Be specific, not mid',
				'Small things count too (like a good coffee)',
				'Daily habit = massive glow up',
				'Tell your besties you appreciate them'
			]
		}
	];

	// Indonesian Tips (Gen Z/Bahasa Gaul 🇮🇩)
	const tipsID = [
		{
			id: 1,
			category: 'Vibe Check',
			emoji: '😮‍💨',
			title: 'Napas Anti-Panic (No Cap)',
			description: 'Reset saraf lo pake teknik 4-7-8. Beneran cheat code buat ilangin cemas.',
			steps: [
				'Tarik napas 4 detik (hirup energi positif)',
				'Tahan 7 detik (biar meresap)',
				'Buang napas 8 detik (buang beban idup)',
				'Ulang sampe lo ngerasa chill'
			]
		},
		{
			id: 2,
			category: 'Era',
			emoji: '🧘✨',
			title: 'Main Character Zen',
			description: 'Stop brain rot. 5 menit grounding biar lo sadar kalo lo itu berharga banget.',
			steps: [
				'Duduk santuy tapi tegap',
				'Merem, fokus ke napas (ini baru aesthetic)',
				'Kalo ada pikiran lewat, "di-read" aja terus biarin',
				'Balik fokus pas pikiran lo mulai overthinking',
				'5 menit sehari biar makin glow up mentalnya'
			]
		},
		{
			id: 3,
			category: 'Healing',
			emoji: '👟',
			title: 'Gerak Dikit Yuk',
			description: 'Endorfin itu flex yang sebenernya. Jangan mager terus, bestie.',
			steps: [
				'Minimal 30 menit gerak/vibing',
				'10 menit jalan santai (Hot Girl/Boy Walk)',
				'Peregangan atau Yoga (biar ga jompo)',
				'Joget bebas ala TikTok',
				'Naik tangga > Lift (hitung-hitung cardio)'
			]
		},
		{
			id: 4,
			category: 'Snooze',
			emoji: '😴',
			title: 'Tidur Berkualitas (FR)',
			description: 'Blue light itu musuh. Benerin jam tidur lo atau lo bakal gampang "cooked".',
			steps: [
				'Jadwal tidur harus konsisten (ga boleh skip)',
				'Bikin ritual sebelum tidur yang "cozy" banget',
				'Jauhkan HP 1 jam sebelum tidur (tantangan terberat)',
				'Kamar gelap & adem = elite sleep',
				'Kurangi kafein abis jam 2 siang (stop iced latte dulu)'
			]
		},
		{
			id: 5,
			category: 'Reality Check',
			emoji: '🌱',
			title: 'Grounding 5-4-3-2-1',
			description: 'Pas cemas parah, pake panca indera lo biar balik lagi ke realita. Ga pake drama.',
			steps: [
				'5 hal yang lo liat (cek sekitar lo)',
				'4 hal yang bisa lo pegang (rasain teksturnya)',
				'3 hal yang lo denger (suara yang vibey)',
				'2 hal yang lo cium aroma-nya',
				'1 hal yang bisa lo rasain di lidah'
			]
		},
		{
			id: 6,
			category: 'Blessing',
			emoji: '🙏',
			title: 'Gratitude Flex',
			description: 'Pamer rasa syukur > pamer harta. Ini beneran bumbu rahasia bahagia.',
			steps: [
				'Tulis 3 hal yang lo syukuri hari ini',
				'Harus spesifik, jangan template',
				'Hal simpel juga oke (misal: dapet parkiran)',
				'Lakuin tiap hari biar mental makin op',
				'Kasih tau bestie lo kalo lo sayang mereka'
			]
		}
	];

	// State Management (Svelte 5 Runes)
	let language = $derived($currentLanguage);
	let allTips = $derived(language === 'id' ? tipsID : tipsEN);
	
	let selectedCategory = $state('All');
	
	let categories = $derived(() => {
		const langAll = language === 'id' ? 'Semua' : 'All';
		const cats = [...new Set(allTips.map(t => t.category))];
		return [langAll, ...cats];
	});

	let filteredTips = $derived(() => {
		const langAll = language === 'id' ? 'Semua' : 'All';
		if (selectedCategory === 'All' || selectedCategory === 'Semua' || !categories().includes(selectedCategory)) {
			return allTips;
		}
		return allTips.filter(t => t.category === selectedCategory);
	});

	function setCategory(cat) {
		selectedCategory = cat;
	}

	function getTranslation(key) {
		const translations = {
			en: {
				title: 'Mental Health Glow Up 💡',
				subtitle: 'Vibey tips & tricks to keep your mental game strong.',
				filterBy: 'Vibe Category',
				howTo: 'How to vibe:',
				emergency: '🆘 Critical Help (Real Talk)',
				emergencySub: 'If you\'re feeling cooked, reach out ASAP:',
				disclaimer: 'Disclaimer: These are general vibes only. If you\'re really struggling, talk to a pro. You matter, bestie.'
			},
			id: {
				title: 'Mental Health Glow Up 💡',
				subtitle: 'Tips & trik asik biar mental lo makin kuat dan ga gampang kena mental.',
				filterBy: 'Kategori Vibe',
				howTo: 'Cara biar makin chill:',
				emergency: '🆘 Bantuan Darurat (Real Talk)',
				emergencySub: 'Kalo lo ngerasa beneran lagi down parah, buruan hubungin ini:',
				disclaimer: 'Penyangkalan: Ini cuma tips umum ya. Kalo lo ngerasa beneran butuh bantuan, hubungin profesional. Lo itu berharga, bestie.'
			}
		};
		return translations[language]?.[key] || key;
	}
</script>

<svelte:head>
	<title>{getTranslation('title')} - MentalWell</title>
</svelte:head>

<div class="min-h-screen bg-gradient-to-br from-[#FFDEE9] via-[#B5FFFC] to-[#fbc2eb] dark:from-[#2e1065] dark:via-[#0c0a09] dark:to-[#1e1b4b] p-4 md:p-8 transition-colors duration-500">
	<div class="max-w-6xl mx-auto space-y-10">
		
		<!-- Header Segment with Entrance Animation -->
		<div class="text-center space-y-4 animate-in fade-in slide-in-from-top-4 duration-1000">
			<h1 class="text-5xl md:text-7xl font-black bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-500 dark:from-cyan-400 dark:to-blue-500 drop-shadow-sm italic uppercase tracking-tighter">
				{getTranslation('title')}
			</h1>
			<p class="text-lg md:text-xl font-medium text-gray-700 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
				{getTranslation('subtitle')}
			</p>
		</div>

		<!-- Category Filter Grid (Glassmorphism) -->
		<div class="bg-white/30 dark:bg-black/30 backdrop-blur-xl rounded-3xl p-6 border border-white/40 dark:border-white/10 shadow-2xl animate-in zoom-in-95 duration-700">
			<h2 class="text-xs font-bold uppercase tracking-widest text-purple-600 dark:text-cyan-400 mb-4 px-2">
				{getTranslation('filterBy')}
			</h2>
			<div class="flex flex-wrap gap-3">
				{#each categories() as category}
					<button
						onclick={() => setCategory(category)}
						class="px-5 py-2.5 rounded-2xl font-bold text-sm transition-all duration-300 transform hover:scale-105 active:scale-95
							{ (selectedCategory === category || (category === 'Semua' && selectedCategory === 'All') || (category === 'All' && selectedCategory === 'Semua')) 
								? 'bg-gradient-to-r from-purple-600 to-pink-500 text-white shadow-lg shadow-purple-500/30 ring-2 ring-purple-300 dark:ring-purple-900' 
								: 'bg-white/60 dark:bg-white/5 text-gray-700 dark:text-gray-300 hover:bg-white/80 dark:hover:bg-white/10 border border-white/50 dark:border-white/5 backdrop-blur-md' 
							}"
					>
						{category}
					</button>
				{/each}
			</div>
		</div>

		<!-- Main Tips Grid -->
		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
			{#each filteredTips() as tip (tip.id)}
				<div 
					class="group bg-white/40 dark:bg-white/5 backdrop-blur-lg rounded-[2rem] p-8 border border-white/50 dark:border-white/10 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 flex flex-col h-full"
				>
					<div class="flex justify-between items-start mb-6">
						<div class="text-6xl group-hover:scale-125 transition-transform duration-500 rotate-3 group-hover:rotate-0 drop-shadow-lg">
							{tip.emoji}
						</div>
						<span class="px-4 py-1.5 rounded-full bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300 text-[10px] font-black uppercase tracking-wider border border-purple-200 dark:border-purple-800">
							{tip.category}
						</span>
					</div>

					<h3 class="text-2xl font-black text-gray-900 dark:text-white mb-3 tracking-tight group-hover:text-purple-600 dark:group-hover:text-cyan-400 transition-colors">
						{tip.title}
					</h3>
					
					<p class="text-gray-600 dark:text-gray-400 mb-8 font-medium leading-relaxed italic">
						"{tip.description}"
					</p>

					<div class="mt-auto space-y-4">
						<h4 class="text-xs font-black uppercase text-gray-400 tracking-widest flex items-center gap-2">
							<span class="w-4 h-[2px] bg-purple-400 dark:bg-cyan-500"></span>
							{getTranslation('howTo')}
						</h4>
						<ul class="space-y-3">
							{#each tip.steps as step, i}
								<li class="flex items-center gap-4 group/step">
									<span class="flex-shrink-0 w-7 h-7 bg-white/80 dark:bg-black/40 rounded-xl text-purple-600 dark:text-cyan-400 text-xs font-black flex items-center justify-center shadow-sm border border-purple-100 dark:border-white/5 group-hover/step:bg-purple-600 group-hover/step:text-white transition-colors">
										{i + 1}
									</span>
									<span class="text-gray-700 dark:text-gray-300 text-sm font-semibold tracking-tight leading-tight">
										{step}
									</span>
								</li>
							{/each}
						</ul>
					</div>
				</div>
			{/each}
		</div>

		<!-- Footer Sections -->
		<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
			<!-- Critical Help Area -->
			<div class="bg-red-500/10 dark:bg-red-900/10 backdrop-blur-xl border-2 border-red-500/30 rounded-[2.5rem] p-8 shadow-inner relative overflow-hidden group">
				<div class="absolute top-0 right-0 p-8 text-8xl opacity-10 group-hover:scale-110 transition-transform duration-700">🆘</div>
				<h2 class="text-2xl font-black text-red-600 dark:text-red-400 mb-2 uppercase tracking-tighter">
					{getTranslation('emergency')}
				</h2>
				<p class="text-red-800 dark:text-red-300 font-bold mb-6 text-sm">
					{getTranslation('emergencySub')}
				</p>
				<ul class="space-y-3 text-sm font-black grid grid-cols-1 sm:grid-cols-2 gap-2">
					{#if language === 'id'}
						<li class="bg-white/50 dark:bg-black/20 p-3 rounded-2xl flex flex-col border border-red-200 dark:border-red-900/30">
							<span class="text-[10px] text-red-400 uppercase">National Hotline</span>
							<span class="text-red-800 dark:text-red-200">119 ext 8</span>
						</li>
						<li class="bg-white/50 dark:bg-black/20 p-3 rounded-2xl flex flex-col border border-red-200 dark:border-red-900/30">
							<span class="text-[10px] text-red-400 uppercase">Yayasan Pulih</span>
							<span class="text-red-800 dark:text-red-200">021-788-42580</span>
						</li>
						<li class="bg-white/50 dark:bg-black/20 p-3 rounded-2xl flex flex-col border border-red-200 dark:border-red-900/30">
							<span class="text-[10px] text-red-400 uppercase">Darurat</span>
							<span class="text-red-800 dark:text-red-200">112</span>
						</li>
						<li class="bg-white/50 dark:bg-black/20 p-3 rounded-2xl flex flex-col border border-red-200 dark:border-red-900/30">
							<span class="text-[10px] text-red-400 uppercase">WA Crisis Center</span>
							<span class="text-red-800 dark:text-red-200">0813-1754-8333</span>
						</li>
					{:else}
						<li class="bg-white/50 dark:bg-black/20 p-3 rounded-2xl flex flex-col border border-red-200 dark:border-red-900/30">
							<span class="text-[10px] text-red-400 uppercase">Suicide Lifeline</span>
							<span class="text-red-800 dark:text-red-200">988</span>
						</li>
						<li class="bg-white/50 dark:bg-black/20 p-3 rounded-2xl flex flex-col border border-red-200 dark:border-red-900/30">
							<span class="text-[10px] text-red-400 uppercase">Crisis Text Line</span>
							<span class="text-red-800 dark:text-red-200">Text HOME to 741741</span>
						</li>
					{/if}
				</ul>
			</div>

			<!-- Vibes Disclaimer -->
			<div class="bg-white/30 dark:bg-black/20 backdrop-blur-xl border border-white/40 dark:border-white/5 rounded-[2.5rem] p-8 flex items-center justify-center text-center">
				<p class="text-gray-700 dark:text-gray-300 text-sm font-bold italic leading-relaxed">
					<span class="text-purple-600 dark:text-cyan-400 not-italic block mb-2 text-lg font-black uppercase">Vibe Disclaimer</span>
					"{getTranslation('disclaimer')}"
				</p>
			</div>
		</div>

	</div>
</div>

<style>
	:global(body) {
		overflow-x: hidden;
	}

	/* Animation Utility Classes */
	.animate-in {
		animation-fill-mode: forwards;
		animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
	}

	@keyframes fade-in {
		from { opacity: 0; }
		to { opacity: 1; }
	}

	@keyframes slide-in-from-top-4 {
		from { transform: translateY(-1rem); }
		to { transform: translateY(0); }
	}

	@keyframes zoom-in-95 {
		from { transform: scale(0.95); opacity: 0; }
		to { transform: scale(1); opacity: 1; }
	}

	.fade-in { animation: fade-in 1s; }
	.slide-in-from-top-4 { animation: slide-in-from-top-4 1s; }
	.zoom-in-95 { animation: zoom-in-95 0.7s; }
</style>