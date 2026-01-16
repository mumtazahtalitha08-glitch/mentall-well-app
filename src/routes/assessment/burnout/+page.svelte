<script>
	import { currentLanguage } from '$lib/stores.js';

	// Assessment data (Burnout Gen Z Edition 🔥✨)
	const assessments = {
		en: {
			id: 'burnout',
			title: 'Burnout Alert 🔥',
			description: 'Feeling cooked? Let\'s see if you\'re just tired or actually hitting the burnout wall. No gatekeeping.',
			icon: '🔥',
			questions: [
				{
					id: 1,
					text: 'I feel emotionally drained from my work/tasks (the battery is literally at 0%).',
					options: [
						{ value: 0, label: 'Never / Full Battery' },
						{ value: 1, label: 'Rarely' },
						{ value: 2, label: 'Sometimes' },
						{ value: 3, label: 'Often' },
						{ value: 4, label: 'Very often / Fried' }
					]
				},
				{
					id: 2,
					text: 'I feel tired when I get up in the morning and have to face another day.',
					options: [
						{ value: 0, label: 'Never' },
						{ value: 1, label: 'Rarely' },
						{ value: 2, label: 'Sometimes' },
						{ value: 3, label: 'Often' },
						{ value: 4, label: 'Very often' }
					]
				},
				{
					id: 3,
					text: 'I feel frustrated by what I have to do (everything feels mid or worse).',
					options: [
						{ value: 0, label: 'Never' },
						{ value: 1, label: 'Rarely' },
						{ value: 2, label: 'Sometimes' },
						{ value: 3, label: 'Often' },
						{ value: 4, label: 'Very often' }
					]
				},
				{
					id: 4,
					text: 'I feel like I am at the end of my rope (ready to throw the whole vibe away).',
					options: [
						{ value: 0, label: 'Never' },
						{ value: 1, label: 'Rarely' },
						{ value: 2, label: 'Sometimes' },
						{ value: 3, label: 'Often' },
						{ value: 4, label: 'Very often' }
					]
				},
				{
					id: 5,
					text: 'I feel beneran burned out (literally cooked).',
					options: [
						{ value: 0, label: 'Never' },
						{ value: 1, label: 'Rarely' },
						{ value: 2, label: 'Sometimes' },
						{ value: 3, label: 'Often' },
						{ value: 4, label: 'Very often' }
					]
				}
			]
		},
		id: {
			id: 'burnout',
			title: 'Burnout Alert 🔥',
			description: 'Ngerasa "cooked" banget? Cek apakah lo emang cuma capek atau beneran burnout, no cap.',
			icon: '🔥',
			questions: [
				{
					id: 1,
					text: 'Gue ngerasa emosional gue terkuras parah (batrenya beneran 0%).',
					options: [
						{ value: 0, label: 'Ga pernah / Seger' },
						{ value: 1, label: 'Jarang' },
						{ value: 2, label: 'Kadang-kadang' },
						{ value: 3, label: 'Sering' },
						{ value: 4, label: 'Sangat sering / Hangus' }
					]
				},
				{
					id: 2,
					text: 'Bangun pagi aja udah males banget mikirin kerjaan/tugas hari ini.',
					options: [
						{ value: 0, label: 'Ga pernah' },
						{ value: 1, label: 'Jarang' },
						{ value: 2, label: 'Kadang-kadang' },
						{ value: 3, label: 'Sering' },
						{ value: 4, label: 'Sangat sering' }
					]
				},
				{
					id: 3,
					text: 'Gue ngerasa frustrasi sama kesibukan gue sekarang (semuanya berantakan).',
					options: [
						{ value: 0, label: 'Ga pernah' },
						{ value: 1, label: 'Jarang' },
						{ value: 2, label: 'Kadang-kadang' },
						{ value: 3, label: 'Sering' },
						{ value: 4, label: 'Sangat sering' }
					]
				},
				{
					id: 4,
					text: 'Ngerasa kayak udah di titik jenuh banget (mau "log out" aja rasanya).',
					options: [
						{ value: 0, label: 'Ga pernah' },
						{ value: 1, label: 'Jarang' },
						{ value: 2, label: 'Kadang-kadang' },
						{ value: 3, label: 'Sering' },
						{ value: 4, label: 'Sangat sering' }
					]
				},
				{
					id: 5,
					text: 'Gue ngerasa bener-bener burnout (udah "cooked" parah).',
					options: [
						{ value: 0, label: 'Ga pernah' },
						{ value: 1, label: 'Jarang' },
						{ value: 2, label: 'Kadang-kadang' },
						{ value: 3, label: 'Sering' },
						{ value: 4, label: 'Sangat sering' }
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
			if (totalScore <= 5) {
				interpretation = 'Burnout Rendah';
				recommendation = 'Vibe lo masih seger, bestie! Pertahanin keseimbangan hidup lo ya.';
			} else if (totalScore <= 10) {
				interpretation = 'Burnout Sedang';
				recommendation = 'Lo mulai ngerasa "cooked" nih. Waktunya ambil cuti atau istirahat sejenak dari rutinitas.';
			} else if (totalScore <= 15) {
				interpretation = 'Burnout Tinggi';
				recommendation = 'Waduh, api burnout-nya makin gede. Coba cari bantuan atau ngobrol sama atasan/mentor lo.';
			} else {
				interpretation = 'Burnout Parah (HANGUS)';
				recommendation = 'Bestie, lo udah angus beneran. Please cari bantuan profesional demi kesehatan mental lo.';
			}
		} else {
			if (totalScore <= 5) {
				interpretation = 'Low Burnout';
				recommendation = 'You\'re still vibing! Keep that healthy balance going.';
			} else if (totalScore <= 10) {
				interpretation = 'Moderate Burnout';
				recommendation = 'You\'re starting to feel cooked. Time for a mini-vacay or some serious downtime.';
			} else if (totalScore <= 15) {
				interpretation = 'High Burnout';
				recommendation = 'The burnout is real. Seek support and try to re-evaluate your current workload.';
			} else {
				interpretation = 'Severe Burnout (FRIED)';
				recommendation = 'You\'re completely fried, bestie. Please reach out to a professional before it gets worse.';
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
		const a = document.createElement('a'); a.href = url; a.download = `mentalwell_burnout_alert.txt`; a.click();
	}
</script>

<svelte:head>
	<title>{language === 'id' ? 'Cek Burnout' : 'Burnout Alert'} - MentalWell</title>
</svelte:head>

<div class="space-y-10 py-6 animate-in fade-in duration-700">
	<!-- Header -->
	<header class="text-center space-y-4">
		<h1 class="text-4xl md:text-6xl font-black bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-red-600 tracking-tighter uppercase italic">
			{currentAssessment.title}
		</h1>
	</header>

	{#if !showResults}
		<!-- Assessment Container -->
		<section class="bg-white/30 dark:bg-black/40 backdrop-blur-2xl rounded-[3rem] p-8 md:p-12 border border-white/60 dark:border-white/10 shadow-2xl max-w-3xl mx-auto relative overflow-hidden">
			<div class="absolute -right-10 -top-10 text-9xl opacity-5">🔥</div>
			
			<div class="flex justify-between items-center relative z-10">
				<div class="space-y-1">
					<p class="text-xs font-black uppercase tracking-widest text-orange-600 dark:text-orange-400">Progress</p>
					<h2 class="text-lg font-bold text-gray-900 dark:text-white italic">
						{language === 'id' ? 'Pertanyaan' : 'Question'} {currentQuestionIndex + 1}/{currentAssessment.questions.length}
					</h2>
				</div>
				<button onclick={goBack} class="text-[10px] font-black uppercase tracking-widest text-gray-500 hover:text-gray-900 border-b border-gray-300">Abort Mission</button>
			</div>
			
			<div class="relative h-4 bg-white/50 dark:bg-black/20 rounded-full overflow-hidden border border-white/50 dark:border-white/5 shadow-inner">
				<div 
					class="absolute inset-y-0 left-0 bg-gradient-to-r from-orange-500 to-red-600 transition-all duration-700 flex items-center justify-end px-2"
					style="width: {((currentQuestionIndex + 1) / currentAssessment.questions.length) * 100}%"
				>
					<span class="text-[8px] font-black text-white italic tracking-tighter">VIBE CHECKING...</span>
				</div>
			</div>
			
			<div class="py-10 text-center animate-in fade-in duration-500" key={currentQuestionIndex}>
				<h3 class="text-2xl md:text-3xl font-black text-gray-900 dark:text-white leading-tight italic tracking-tight mb-8">
					"{currentAssessment.questions[currentQuestionIndex].text}"
				</h3>
				
				<div class="grid grid-cols-1 gap-4">
					{#each currentAssessment.questions[currentQuestionIndex].options as option}
						<button
							onclick={() => selectAnswer(currentAssessment.questions[currentQuestionIndex].id, option.value)}
							class="w-full text-center px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-300 transform border-2 
								{ answers[currentAssessment.questions[currentQuestionIndex].id] === option.value 
									? 'bg-orange-600 text-white border-orange-400 shadow-xl scale-[1.02]' 
									: 'bg-white/60 dark:bg-white/5 text-gray-700 dark:text-gray-300 border-white/50 dark:border-white/10 hover:bg-white/80 dark:hover:bg-white/10 hover:border-orange-300 active:scale-95' }"
						>
							{option.label}
						</button>
					{/each}
				</div>
			</div>

			<div class="flex justify-between items-center pt-6 border-t border-white/30 dark:border-white/5">
				<button onclick={prevQuestion} disabled={currentQuestionIndex === 0} class="px-8 py-3 text-xs font-black uppercase tracking-widest text-gray-500 disabled:opacity-0 transition-all">
					🔙 Back
				</button>
				<button onclick={nextQuestion} disabled={answers[currentAssessment.questions[currentQuestionIndex].id] === undefined}
					class="px-10 py-4 bg-gradient-to-r from-orange-600 to-red-700 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-orange-500/30 active:scale-95 disabled:opacity-30 transition-all"
				>
					{currentQuestionIndex === currentAssessment.questions.length - 1 ? 'Show Results ✨' : 'Next ➡️'}
				</button>
			</div>
		</section>
	{:else}
		<!-- Results Section -->
		<section class="max-w-3xl mx-auto animate-in zoom-in-95 duration-700">
			<div class="bg-white/30 dark:bg-black/40 backdrop-blur-3xl rounded-[3rem] p-10 md:p-12 border border-white/60 dark:border-white/10 shadow-2xl text-center space-y-10 relative overflow-hidden">
				<div class="absolute inset-0 bg-gradient-to-t from-orange-500/10 to-transparent pointer-events-none"></div>
				
				<div class="space-y-4">
					<h2 class="text-xs font-black uppercase text-orange-600 dark:text-orange-400 tracking-[0.5em]">Result Summary</h2>
					<div class="text-[7rem] mb-4 drop-shadow-2xl animate-bounce">{currentAssessment.icon}</div>
					<h3 class="text-4xl md:text-5xl font-black text-gray-900 dark:text-white uppercase italic tracking-tighter">
						{results.totalScore} <span class="text-xl text-gray-400 not-italic">/ {currentAssessment.questions.length * 4}</span>
					</h3>
				</div>

				<div class="bg-white/50 dark:bg-black/30 p-8 rounded-[2rem] border border-white/50 dark:border-white/5 shadow-inner">
					<span class="px-8 py-4 rounded-2xl text-white font-black text-xl uppercase tracking-tight italic shadow-2xl inline-block
						{ results.totalScore <= 5 ? 'bg-green-500' : results.totalScore <= 10 ? 'bg-yellow-500' : results.totalScore <= 15 ? 'bg-orange-500' : 'bg-red-600' }">
						{results.interpretation}
					</span>
				</div>

				<div class="text-left bg-white/40 dark:bg-white/5 rounded-[2rem] p-8 border border-white/60 dark:border-white/5">
					<h4 class="text-xs font-black uppercase text-orange-500 mb-2">💡 Note for Lo:</h4>
					<p class="text-lg font-bold text-gray-800 dark:text-gray-200 italic leading-relaxed">"{results.recommendation}"</p>
				</div>

				<div class="flex flex-col sm:flex-row gap-4">
					<button onclick={exportResults} class="flex-1 px-8 py-4 bg-green-500 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl active:scale-95">Export 📥</button>
					<button onclick={resetAssessment} class="flex-1 px-8 py-4 bg-orange-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl active:scale-95">Retake 🔄</button>
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
