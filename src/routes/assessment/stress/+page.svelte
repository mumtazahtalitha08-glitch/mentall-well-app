<script>
	import { currentLanguage } from '$lib/stores.js';

	// Assessment data (Stress Gen Z Edition 💥✨)
	const assessments = {
		en: {
			id: 'stress',
			title: 'Stress Level Check 💥',
			description: 'Is your stress hitting 💯 or are you still chilling? Let\'s find out, no cap.',
			icon: '💥',
			questions: [
				{
					id: 1,
					text: 'I\'ve been feeling overwhelmed by daily tasks (everything is doing the most).',
					options: [
						{ value: 0, label: 'Never / No Stress' },
						{ value: 1, label: 'Rarely' },
						{ value: 2, label: 'Sometimes' },
						{ value: 3, label: 'Often' },
						{ value: 4, label: 'Very often / Shook' }
					]
				},
				{
					id: 2,
					text: 'I have trouble relaxing or unwinding after a long day (vibe is stuck at 💯).',
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
					text: 'I feel irritable or short-tempered (ready to crash out).',
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
					text: 'I have difficulty concentrating (brain fog is real).',
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
					text: 'My body is acting up (headaches, stomach aches) because of stress.',
					options: [
						{ value: 0, label: 'Never' },
						{ value: 1, label: 'Rarely' },
						{ value: 2, label: 'Sometimes' },
						{ value: 3, label: 'Often' },
						{ value: 4, label: 'Very often' }
					]
				},
				{
					id: 6,
					text: 'I feel like I have zero control over the important stuff in my life.',
					options: [
						{ value: 0, label: 'Never' },
						{ value: 1, label: 'Rarely' },
						{ value: 2, label: 'Sometimes' },
						{ value: 3, label: 'Often' },
						{ value: 4, label: 'Very often' }
					]
				},
				{
					id: 7,
					text: 'I find myself avoiding responsibilities or rotting in bed more than usual.',
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
			id: 'stress',
			title: 'Cek Level Stres 💥',
			description: 'Stres lo udah mencapai 💯 atau masih santuy? Cek di sini yuk, no cap.',
			icon: '💥',
			questions: [
				{
					id: 1,
					text: 'Gue ngerasa kewalahan sama rutinitas harian (semuanya berantakan).',
					options: [
						{ value: 0, label: 'Ga pernah / Santuy' },
						{ value: 1, label: 'Jarang' },
						{ value: 2, label: 'Kadang-kadang' },
						{ value: 3, label: 'Sering' },
						{ value: 4, label: 'Sangat sering / Kacau' }
					]
				},
				{
					id: 2,
					text: 'Susah banget buat rileks atau santuy abis seharian sibuk.',
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
					text: 'Gue gampang marah atau baperan akhir-akhir ini (mo crashing out rasanya).',
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
					text: 'Gue susah fokus (brain fog-nya berasa banget).',
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
					text: 'Badan gue mulai protes (pusing, sakit perut) gara-gara stres.',
					options: [
						{ value: 0, label: 'Ga pernah' },
						{ value: 1, label: 'Jarang' },
						{ value: 2, label: 'Kadang-kadang' },
						{ value: 3, label: 'Sering' },
						{ value: 4, label: 'Sangat sering' }
					]
				},
				{
					id: 6,
					text: 'Ngerasa ga punya kendali sama hal-hal penting di hidup gue.',
					options: [
						{ value: 0, label: 'Ga pernah' },
						{ value: 1, label: 'Jarang' },
						{ value: 2, label: 'Kadang-kadang' },
						{ value: 3, label: 'Sering' },
						{ value: 4, label: 'Sangat sering' }
					]
				},
				{
					id: 7,
					text: 'Gue malah kabur dari tanggung jawab atau kelamaan rebahan gara-gara stres.',
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
			if (totalScore <= 7) {
				interpretation = 'Stres Rendah';
				recommendation = 'Vibe lo masih seger! Terusin gaya hidup sehat lo ya, bestie.';
			} else if (totalScore <= 14) {
				interpretation = 'Stres Sedang';
				recommendation = 'Lo mulai ngerasa beban nih. Coba teknik relaksasi atau manajemen waktu biar ga makin pusing.';
			} else if (totalScore <= 21) {
				interpretation = 'Stres Tinggi';
				recommendation = 'Waduh, ini udah mulai ganggu keseharian lo. Coba cari koping yang asik atau curhat sama orang terpercaya.';
			} else {
				interpretation = 'Stres Sangat Tinggi';
				recommendation = 'Bestie, ini udah darurat. Buruan cari bantuan profesional biar stres lo ga makin ngerusak vibe hidup lo.';
			}
		} else {
			if (totalScore <= 7) {
				interpretation = 'Low Stress';
				recommendation = 'You\'re still chilling! Keep up your healthy lifestyle and good vibes.';
			} else if (totalScore <= 14) {
				interpretation = 'Moderate Stress';
				recommendation = 'You\'re feeling the pressure. Try some relaxation techniques or better time management.';
			} else if (totalScore <= 21) {
				interpretation = 'High Stress';
				recommendation = 'This is affecting your grind. Seek some support and try to find better ways to cope.';
			} else {
				interpretation = 'Very High Stress';
				recommendation = 'You\'re in the red zone! Please reach out to a professional ASAP to get your peace back.';
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
		const a = document.createElement('a'); a.href = url; a.download = `mentalwell_stress_check.txt`; a.click();
	}
</script>

<svelte:head>
	<title>{language === 'id' ? 'Tes Stres' : 'Stress Assessment'} - MentalWell</title>
</svelte:head>

<div class="space-y-10 py-6 animate-in fade-in duration-700">
	<!-- Header -->
	<header class="text-center space-y-4">
		<h1 class="text-4xl md:text-6xl font-black bg-clip-text text-transparent bg-gradient-to-r from-red-400 to-purple-600 tracking-tighter uppercase italic">
			{currentAssessment.title}
		</h1>
	</header>

	{#if !showResults}
		<!-- Assessment Container -->
		<section class="bg-white/30 dark:bg-black/40 backdrop-blur-2xl rounded-[3rem] p-8 md:p-12 border border-white/60 dark:border-white/10 shadow-2xl max-w-3xl mx-auto relative overflow-hidden">
			<div class="absolute -right-10 -top-10 text-9xl opacity-5">💥</div>
			
			<div class="flex justify-between items-center relative z-10">
				<div class="space-y-1">
					<p class="text-xs font-black uppercase tracking-widest text-purple-600 dark:text-cyan-400">Progress</p>
					<h2 class="text-lg font-bold text-gray-900 dark:text-white italic">
						{language === 'id' ? 'Pertanyaan' : 'Question'} {currentQuestionIndex + 1}/{currentAssessment.questions.length}
					</h2>
				</div>
				<button onclick={goBack} class="text-[10px] font-black uppercase tracking-widest text-gray-500 hover:text-gray-900 border-b border-gray-300">Abort Mission</button>
			</div>
			
			<!-- Dynamic Progress Bar -->
			<div class="relative h-4 bg-white/50 dark:bg-black/20 rounded-full overflow-hidden border border-white/50 dark:border-white/5 shadow-inner">
				<div 
					class="absolute inset-y-0 left-0 bg-gradient-to-r from-red-500 to-purple-600 transition-all duration-700 flex items-center justify-end px-2"
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
							class="w-full text-center px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-300 transform border-2 
								{ answers[currentAssessment.questions[currentQuestionIndex].id] === option.value 
									? 'bg-purple-600 text-white border-purple-400 shadow-xl scale-[1.02]' 
									: 'bg-white/60 dark:bg-white/5 text-gray-700 dark:text-gray-300 border-white/50 dark:border-white/10 hover:bg-white/80 dark:hover:bg-white/10 hover:border-purple-300 active:scale-95' }"
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
					class="px-10 py-4 bg-gradient-to-r from-purple-600 to-red-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-purple-500/30 active:scale-95 disabled:opacity-30 transition-all"
				>
					{currentQuestionIndex === currentAssessment.questions.length - 1 ? 'Show Results ✨' : 'Next ➡️'}
				</button>
			</div>
		</section>
	{:else}
		<!-- Results Section -->
		<section class="max-w-3xl mx-auto animate-in zoom-in-95 duration-700">
			<div class="bg-white/30 dark:bg-black/40 backdrop-blur-3xl rounded-[3rem] p-10 md:p-12 border border-white/60 dark:border-white/10 shadow-2xl text-center space-y-10 relative overflow-hidden">
				<div class="absolute inset-0 bg-gradient-to-t from-purple-500/10 to-transparent pointer-events-none"></div>
				
				<div class="space-y-4">
					<h2 class="text-xs font-black uppercase text-purple-600 dark:text-cyan-400 tracking-[0.5em]">Result Summary</h2>
					<div class="text-[7rem] mb-4 drop-shadow-2xl animate-bounce">{currentAssessment.icon}</div>
					<h3 class="text-4xl md:text-5xl font-black text-gray-900 dark:text-white uppercase italic tracking-tighter">
						{results.totalScore} <span class="text-xl text-gray-400 not-italic">/ {currentAssessment.questions.length * 4}</span>
					</h3>
				</div>

				<div class="bg-white/50 dark:bg-black/30 p-8 rounded-[2rem] border border-white/50 dark:border-white/5 shadow-inner">
					<span class="px-8 py-4 rounded-2xl text-white font-black text-xl uppercase tracking-tight italic shadow-2xl inline-block
						{ results.totalScore <= 7 ? 'bg-green-500' : results.totalScore <= 14 ? 'bg-yellow-500' : results.totalScore <= 21 ? 'bg-orange-500' : 'bg-red-600' }">
						{results.interpretation}
					</span>
				</div>

				<div class="text-left bg-white/40 dark:bg-white/5 rounded-[2rem] p-8 border border-white/60 dark:border-white/5">
					<h4 class="text-xs font-black uppercase text-purple-500 mb-2">💡 Note for Lo:</h4>
					<p class="text-lg font-bold text-gray-800 dark:text-gray-200 italic leading-relaxed">"{results.recommendation}"</p>
				</div>

				<div class="flex flex-col sm:flex-row gap-4">
					<button onclick={exportResults} class="flex-1 px-8 py-4 bg-green-500 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl active:scale-95">Export 📥</button>
					<button onclick={resetAssessment} class="flex-1 px-8 py-4 bg-purple-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl active:scale-95">Retake 🔄</button>
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
