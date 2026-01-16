<script>
	import { currentLanguage } from '$lib/stores.js';

	// Assessment data (Depression Gen Z Glow Up Edition 😔✨)
	const assessments = {
		en: {
			id: 'depression',
			title: 'Mood Drop Check 😔',
			description: 'Is it a temporary slump or a whole depression era? Let\'s check the vibes, no cap.',
			icon: '😔',
			questions: [
				{
					id: 1,
					text: 'Little interest or pleasure in doing things (nothing hits the same).',
					options: [
						{ value: 0, label: 'Not at all / Vibing' },
						{ value: 1, label: 'Several days' },
						{ value: 2, label: 'More than half the days' },
						{ value: 3, label: 'Nearly every day / Chronic' }
					]
				},
				{
					id: 2,
					text: 'Feeling down, depressed, or hopeless (the "everything is mid" feeling).',
					options: [
						{ value: 0, label: 'Not at all' },
						{ value: 1, label: 'Several days' },
						{ value: 2, label: 'More than half the days' },
						{ value: 3, label: 'Nearly every day' }
					]
				},
				{
					id: 3,
					text: 'Trouble falling or staying asleep, or sleeping too much (sleep schedule is cooked).',
					options: [
						{ value: 0, label: 'Not at all' },
						{ value: 1, label: 'Several days' },
						{ value: 2, label: 'More than half the days' },
						{ value: 3, label: 'Nearly every day' }
					]
				},
				{
					id: 4,
					text: 'Feeling tired or having zero energy (battery is always at 1%).',
					options: [
						{ value: 0, label: 'Not at all' },
						{ value: 1, label: 'Several days' },
						{ value: 2, label: 'More than half the days' },
						{ value: 3, label: 'Nearly every day' }
					]
				},
				{
					id: 5,
					text: 'Poor appetite or overeating (stress eating is real).',
					options: [
						{ value: 0, label: 'Not at all' },
						{ value: 1, label: 'Several days' },
						{ value: 2, label: 'More than half the days' },
						{ value: 3, label: 'Nearly every day' }
					]
				},
				{
					id: 6,
					text: 'Feeling bad about yourself - like you\'re a failure or let the squad down.',
					options: [
						{ value: 0, label: 'Not at all' },
						{ value: 1, label: 'Several days' },
						{ value: 2, label: 'More than half the days' },
						{ value: 3, label: 'Nearly every day' }
					]
				},
				{
					id: 7,
					text: 'Trouble concentrating (can\'t even focus on a 15s TikTok).',
					options: [
						{ value: 0, label: 'Not at all' },
						{ value: 1, label: 'Several days' },
						{ value: 2, label: 'More than half the days' },
						{ value: 3, label: 'Nearly every day' }
					]
				},
				{
					id: 8,
					text: 'Moving or speaking so slowly people noticed. Or being way too restless.',
					options: [
						{ value: 0, label: 'Not at all' },
						{ value: 1, label: 'Several days' },
						{ value: 2, label: 'More than half the days' },
						{ value: 3, label: 'Nearly every day' }
					]
				},
				{
					id: 9,
					text: 'Thoughts that you would be better off dead or of hurting yourself (real talk).',
					options: [
						{ value: 0, label: 'Not at all' },
						{ value: 1, label: 'Several days' },
						{ value: 2, label: 'More than half the days' },
						{ value: 3, label: 'Nearly every day / Need help' }
					]
				}
			]
		},
		id: {
			id: 'depression',
			title: 'Cek Mood Drop 😔',
			description: 'Lagi ngerasa "low" terus atau emang fasenya aja? Cek gejalanya di sini, no cap.',
			icon: '😔',
			questions: [
				{
					id: 1,
					text: 'Minat atau kesenangan gue lagi drop parah (ga ada yang asik lagi).',
					options: [
						{ value: 0, label: 'Ga pernah / Aman' },
						{ value: 1, label: 'Beberapa hari' },
						{ value: 2, label: 'Sering banget' },
						{ value: 3, label: 'Hampir tiap hari / Parah' }
					]
				},
				{
					id: 2,
					text: 'Merasa sedih, tertekan, atau putus asa (ngerasa hampa banget).',
					options: [
						{ value: 0, label: 'Ga pernah' },
						{ value: 1, label: 'Beberapa hari' },
						{ value: 2, label: 'Sering banget' },
						{ value: 3, label: 'Tiap hari' }
					]
				},
				{
					id: 3,
					text: 'Susah tidur atau malah tidur terus (jam tidur berantakan).',
					options: [
						{ value: 0, label: 'Ga pernah' },
						{ value: 1, label: 'Beberapa hari' },
						{ value: 2, label: 'Sering banget' },
						{ value: 3, label: 'Tiap hari' }
					]
				},
				{
					id: 4,
					text: 'Merasa lelah atau batre diri lo selalu low (ga ada energi).',
					options: [
						{ value: 0, label: 'Ga pernah' },
						{ value: 1, label: 'Beberapa hari' },
						{ value: 2, label: 'Sering banget' },
						{ value: 3, label: 'Tiap hari' }
					]
				},
				{
					id: 5,
					text: 'Nafsu makan ancur atau malah stres eating berlebihan.',
					options: [
						{ value: 0, label: 'Ga pernah' },
						{ value: 1, label: 'Beberapa hari' },
						{ value: 2, label: 'Sering banget' },
						{ value: 3, label: 'Tiap hari' }
					]
				},
				{
					id: 6,
					text: 'Ngerasa diri lo gagal atau ngecewain orang-orang terdekat.',
					options: [
						{ value: 0, label: 'Ga pernah' },
						{ value: 1, label: 'Beberapa hari' },
						{ value: 2, label: 'Sering banget' },
						{ value: 3, label: 'Tiap hari' }
					]
				},
				{
					id: 7,
					text: 'Susah fokus (baca atau nonton aja ga bisa konsen).',
					options: [
						{ value: 0, label: 'Ga pernah' },
						{ value: 1, label: 'Beberapa hari' },
						{ value: 2, label: 'Sering banget' },
						{ value: 3, label: 'Tiap hari' }
					]
				},
				{
					id: 8,
					text: 'Gerak atau ngomong jadi lambat banget. Atau malah jadi gelisah parah.',
					options: [
						{ value: 0, label: 'Ga pernah' },
						{ value: 1, label: 'Beberapa hari' },
						{ value: 2, label: 'Sering banget' },
						{ value: 3, label: 'Tiap hari' }
					]
				},
				{
					id: 9,
					text: 'Pernah kepikiran mending "udahan" aja atau mau nyakitin diri sendiri.',
					options: [
						{ value: 0, label: 'Ga pernah' },
						{ value: 1, label: 'Beberapa hari' },
						{ value: 2, label: 'Sering banget' },
						{ value: 3, label: 'Hampir tiap hari / Butuh bantuan' }
					]
				}
			]
		}
	};

	// State variables (Svelte 5 Runes)
	let currentQuestionIndex = $state(0);
	let answers = $state({});
	let showResults = $state(false);
	let results = $state(null);
	let assessmentHistory = $state([]);
	let language = $derived($currentLanguage || 'id');

	function getAssessment() { return assessments[language] || assessments['id']; }
	let currentAssessment = $derived(getAssessment());

	function nextQuestion() {
		if (currentQuestionIndex < currentAssessment.questions.length - 1) {
			currentQuestionIndex++;
		} else { calculateResults(); }
	}

	function prevQuestion() { if (currentQuestionIndex > 0) { currentQuestionIndex--; } }
	function selectAnswer(questionId, value) { answers = {...answers, [questionId]: value}; }

	function calculateResults() {
		const totalScore = Object.values(answers).reduce((sum, score) => sum + score, 0);
		let interpretation = ''; let recommendation = '';
		
		if (language === 'id') {
			if (totalScore <= 4) {
				interpretation = 'Mood Aman Jaya';
				recommendation = 'Lo masih vibing, bestie. Tetep jaga kesehatan mental lo ya!';
			} else if (totalScore <= 9) {
				interpretation = 'Lagi Mood Drop';
				recommendation = 'Mood lo lagi turun nih. Coba curhat sama bestie atau lakuin hobi lo lagi.';
			} else if (totalScore <= 14) {
				interpretation = 'Lagi High Mood Drop';
				recommendation = 'Kondisi lo udah mulai berat. Coba deh ngobrol sama profesional biar ga makin larut.';
			} else if (totalScore <= 19) {
				interpretation = 'Depresi Level Serius';
				recommendation = 'Sangat disarankan buat segera cari bantuan ya. You don\'t have to deal with this alone.';
			} else {
				interpretation = 'Danger Zone! Butuh Bantuan';
				recommendation = 'Buruan cari ahli ya. Please, lo berharga banget buat kita semua. reach out ASAP!';
			}
		} else {
			if (totalScore <= 4) {
				interpretation = 'Mood is Stable';
				recommendation = 'You\'re doing great! Keep maintaining your positive vibes.';
			} else if (totalScore <= 9) {
				interpretation = 'Mild Mood Drop';
				recommendation = 'You\'re in a bit of a slump. Try doing things that used to make you happy.';
			} else if (totalScore <= 14) {
				interpretation = 'Moderate Depression Era';
				recommendation = 'This is getting heavy. Consider talking to a counselor to help you navigate these feelings.';
			} else if (totalScore <= 19) {
				interpretation = 'Severe Depression Vibe';
				recommendation = 'You\'re going through a tough time. Please reach out for professional support immediately.';
			} else {
				interpretation = 'Critical Risk Area';
				recommendation = 'Please seek help right now. You matter, and help is available. Reach out ASAP!';
			}
		}
		
		results = { totalScore, interpretation, recommendation, timestamp: new Date().toISOString() };
		saveAssessmentResult(); showResults = true;
	}

	function resetAssessment() { currentQuestionIndex = 0; answers = {}; showResults = false; results = null; }

	function saveAssessmentResult() {
		if (typeof window !== 'undefined' && currentAssessment && results) {
			const historyEntry = {
				id: Date.now(),
				assessmentId: currentAssessment.id,
				assessmentTitle: currentAssessment.title,
				assessmentIcon: currentAssessment.icon,
				totalScore: results.totalScore,
				interpretation: results.interpretation,
				timestamp: results.timestamp,
				language: language
			};
			const stored = localStorage.getItem('mentalwell_assessment_history');
			let history = stored ? JSON.parse(stored) : [];
			history.unshift(historyEntry);
			localStorage.setItem('mentalwell_assessment_history', JSON.stringify(history.slice(0, 20)));
		}
	}
	
	function goBack() { window.history.back(); }
	function exportResults() {
		const content = `Vibe Check: ${currentAssessment.title}\nScore: ${results.totalScore}\nInterpretation: ${results.interpretation}\n\n💡 Advice:\n${results.recommendation}`;
		const blob = new Blob([content], { type: 'text/plain' });
		const url = URL.createObjectURL(blob);
		const a = document.createElement('a'); a.href = url; a.download = `mentalwell_mood_drop.txt`; a.click();
	}
</script>

<svelte:head>
	<title>{language === 'id' ? 'Cek Mood Drop' : 'Mood Drop Check'} - MentalWell</title>
</svelte:head>

<div class="space-y-10 py-6 animate-in fade-in duration-700">
	<!-- Header -->
	<header class="text-center space-y-4">
		<h1 class="text-4xl md:text-6xl font-black bg-clip-text text-transparent bg-gradient-to-r from-gray-700 to-gray-900 dark:from-indigo-400 dark:to-blue-500 tracking-tighter uppercase italic">
			{currentAssessment.title}
		</h1>
	</header>

	{#if !showResults}
		<!-- Assessment Container -->
		<section class="bg-white/30 dark:bg-black/40 backdrop-blur-2xl rounded-[3rem] p-8 md:p-12 border border-white/60 dark:border-white/10 shadow-2xl max-w-3xl mx-auto relative overflow-hidden">
			<div class="absolute -right-10 -top-10 text-9xl opacity-5">😔</div>
			
			<div class="flex justify-between items-center relative z-10">
				<div class="space-y-1">
					<p class="text-xs font-black uppercase tracking-widest text-indigo-600 dark:text-cyan-400">Progress</p>
					<h2 class="text-lg font-bold text-gray-900 dark:text-white italic">
						{language === 'id' ? 'Pertanyaan' : 'Question'} {currentQuestionIndex + 1}/{currentAssessment.questions.length}
					</h2>
				</div>
				<button onclick={goBack} class="text-[10px] font-black uppercase tracking-widest text-gray-500 hover:text-gray-900 border-b border-gray-300">Abort Mission</button>
			</div>
			
			<!-- Dynamic Progress Bar -->
			<div class="relative h-4 bg-white/50 dark:bg-black/20 rounded-full overflow-hidden border border-white/50 dark:border-white/5 shadow-inner">
				<div 
					class="absolute inset-y-0 left-0 bg-gradient-to-r from-indigo-500 to-blue-600 transition-all duration-700 flex items-center justify-end px-2"
					style="width: {((currentQuestionIndex + 1) / currentAssessment.questions.length) * 100}%"
				>
					<span class="text-[8px] font-black text-white italic tracking-tighter">VIBE CHECKING...</span>
				</div>
			</div>
			
			<!-- Question Text -->
			<div class="py-10 text-center animate-in fade-in duration-500" key={currentQuestionIndex}>
				<h3 class="text-2xl md:text-3xl font-black text-gray-900 dark:text-white leading-tight italic tracking-tight mb-8">
					"{currentAssessment.questions[currentQuestionIndex].text}"
				</h3>
				
				<!-- Options Grid -->
				<div class="grid grid-cols-1 gap-4">
					{#each currentAssessment.questions[currentQuestionIndex].options as option}
						<button
							onclick={() => selectAnswer(currentAssessment.questions[currentQuestionIndex].id, option.value)}
							class="w-full text-center px-8 py-5 rounded-2xl font-bold text-lg transition-all duration-300 transform border-2 
								{ answers[currentAssessment.questions[currentQuestionIndex].id] === option.value 
									? 'bg-indigo-600 text-white border-indigo-400 shadow-xl scale-[1.02]' 
									: 'bg-white/60 dark:bg-white/5 text-gray-700 dark:text-gray-300 border-white/50 dark:border-white/10 hover:bg-white/80 dark:hover:bg-white/10 hover:border-indigo-300 active:scale-95' }"
						>
							{option.label}
						</button>
					{/each}
				</div>
			</div>

			<!-- Navigation Buttons -->
			<div class="flex justify-between items-center pt-6 border-t border-white/30 dark:border-white/5">
				<button onclick={prevQuestion} disabled={currentQuestionIndex === 0} class="px-8 py-3 text-xs font-black uppercase tracking-widest text-gray-500 disabled:opacity-0 transition-all">
					🔙 Back
				</button>
				<button onclick={nextQuestion} disabled={answers[currentAssessment.questions[currentQuestionIndex].id] === undefined}
					class="px-10 py-4 bg-gradient-to-r from-indigo-600 to-blue-700 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-indigo-500/30 active:scale-95 disabled:opacity-30 transition-all"
				>
					{currentQuestionIndex === currentAssessment.questions.length - 1 ? 'Show Results ✨' : 'Next ➡️'}
				</button>
			</div>
		</section>
	{:else}
		<!-- Results Section -->
		<section class="max-w-3xl mx-auto animate-in zoom-in-95 duration-700">
			<div class="bg-white/30 dark:bg-black/40 backdrop-blur-3xl rounded-[3rem] p-10 md:p-12 border border-white/60 dark:border-white/10 shadow-2xl text-center space-y-10 relative overflow-hidden">
				<div class="absolute inset-0 bg-gradient-to-t from-indigo-500/10 to-transparent pointer-events-none"></div>
				
				<div class="space-y-4">
					<h2 class="text-xs font-black uppercase text-indigo-600 dark:text-cyan-400 tracking-[0.5em]">Result Summary</h2>
					<div class="text-[7rem] mb-4 drop-shadow-2xl animate-bounce">{currentAssessment.icon}</div>
					<h3 class="text-4xl md:text-5xl font-black text-gray-900 dark:text-white uppercase italic tracking-tighter">
						{results.totalScore} <span class="text-xl text-gray-400 not-italic">/ {currentAssessment.questions.length * 3}</span>
					</h3>
				</div>

				<div class="bg-white/50 dark:bg-black/30 p-8 rounded-[2rem] border border-white/50 dark:border-white/5 shadow-inner">
					<span class="px-8 py-4 rounded-2xl text-white font-black text-xl uppercase tracking-tight italic shadow-2xl inline-block
						{ results.totalScore <= 4 ? 'bg-green-500' : results.totalScore <= 9 ? 'bg-yellow-500' : results.totalScore <= 14 ? 'bg-orange-500' : 'bg-red-600' }">
						{results.interpretation}
					</span>
				</div>

				<div class="text-left bg-white/40 dark:bg-white/5 rounded-[2rem] p-8 border border-white/60 dark:border-white/5">
					<h4 class="text-xs font-black uppercase text-indigo-500 mb-2">💡 Note for Lo:</h4>
					<p class="text-lg font-bold text-gray-800 dark:text-gray-200 italic leading-relaxed">"{results.recommendation}"</p>
				</div>

				<div class="flex flex-col sm:flex-row gap-4">
					<button onclick={exportResults} class="flex-1 px-8 py-4 bg-green-500 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl active:scale-95">Export 📥</button>
					<button onclick={resetAssessment} class="flex-1 px-8 py-4 bg-indigo-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl active:scale-95">Retake 🔄</button>
					<button onclick={goBack} class="flex-1 px-8 py-4 bg-white/80 dark:bg-white/5 border border-white rounded-2xl font-black text-xs uppercase tracking-widest active:scale-95">Exit 🔙</button>
				</div>
			</div>
		</section>
	{/if}
</div>

<style>
	:global(.animate-in) { animation-fill-mode: forwards; animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1); }
	@keyframes bounce { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
	.animate-bounce { animation: bounce 2s infinite ease-in-out; }
</style>
