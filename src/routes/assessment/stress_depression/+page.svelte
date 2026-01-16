<script>
	import { currentLanguage } from '$lib/stores.js';

	// Assessment data (Dual Vibe Check: Stress & Depression Gen Z Edition 🌿✨)
	const assessments = {
		en: {
			id: 'stress_depression',
			title: 'Dual Vibe Check 🌿',
			description: 'The ultimate assessment for both Stress & Depression. Let\'s see how your mental game is holding up.',
			icon: '🌿',
			questions: [
				{
					id: 1,
					text: 'I feel tense or nervous almost every day (the anxiety is "extra").',
					options: [
						{ value: 1, label: 'Never / Chill' },
						{ value: 2, label: 'Rarely' },
						{ value: 3, label: 'Sometimes' },
						{ value: 4, label: 'Often' },
						{ value: 5, label: 'Always / Non-stop' }
					]
				},
				{
					id: 2,
					text: 'I find it difficult to calm my mind (overthinking is high key winning).',
					options: [
						{ value: 1, label: 'Never' }, { value: 2, label: 'Rarely' }, { value: 3, label: 'Sometimes' }, { value: 4, label: 'Often' }, { value: 5, label: 'Always' }
					]
				},
				{
					id: 3,
					text: 'I feel overwhelmed by my responsibilities (literally too much to handle).',
					options: [
						{ value: 1, label: 'Never' }, { value: 2, label: 'Rarely' }, { value: 3, label: 'Sometimes' }, { value: 4, label: 'Often' }, { value: 5, label: 'Always' }
					]
				},
				{
					id: 4,
					text: 'I get angry or irritated easily lately (on the verge of crashing out).',
					options: [
						{ value: 1, label: 'Never' }, { value: 2, label: 'Rarely' }, { value: 3, label: 'Sometimes' }, { value: 4, label: 'Often' }, { value: 5, label: 'Always' }
					]
				},
				{
					id: 5,
					text: 'I find it hard to focus because of too many thoughts (brain is "cooked").',
					options: [
						{ value: 1, label: 'Never' }, { value: 2, label: 'Rarely' }, { value: 3, label: 'Sometimes' }, { value: 4, label: 'Often' }, { value: 5, label: 'Always' }
					]
				},
				{
					id: 6,
					text: 'I have lost interest in things I usually enjoy (nothing is hitting).',
					options: [
						{ value: 1, label: 'Never' }, { value: 2, label: 'Rarely' }, { value: 3, label: 'Sometimes' }, { value: 4, label: 'Often' }, { value: 5, label: 'Always' }
					]
				},
				{
					id: 7,
					text: 'I feel sad or empty almost every day (feeling low key hollow).',
					options: [
						{ value: 1, label: 'Never' }, { value: 2, label: 'Rarely' }, { value: 3, label: 'Sometimes' }, { value: 4, label: 'Often' }, { value: 5, label: 'Always' }
					]
				},
				{
					id: 8,
					text: 'I feel tired without a clear reason (battery is eternally low).',
					options: [
						{ value: 1, label: 'Never' }, { value: 2, label: 'Rarely' }, { value: 3, label: 'Sometimes' }, { value: 4, label: 'Often' }, { value: 5, label: 'Always' }
					]
				},
				{
					id: 9,
					text: 'I feel worthless or guilty without a strong reason (the internal "saboteur" is loud).',
					options: [
						{ value: 1, label: 'Never' }, { value: 2, label: 'Rarely' }, { value: 3, label: 'Sometimes' }, { value: 4, label: 'Often' }, { value: 5, label: 'Always' }
					]
				},
				{
					id: 10,
					text: 'I have trouble sleeping or sleep too much (sleep schedule is non-existent).',
					options: [
						{ value: 1, label: 'Never' }, { value: 2, label: 'Rarely' }, { value: 3, label: 'Sometimes' }, { value: 4, label: 'Often' }, { value: 5, label: 'Always' }
					]
				}
			]
		},
		id: {
			id: 'stress_depression',
			title: 'Cek Dobel 🌿',
			description: 'Vibe check gabungan buat Stres & Depresi. Paling lengkap buat tau kondisi lo, no cap.',
			icon: '🌿',
			questions: [
				{
					id: 1,
					text: 'Gue ngerasa tegang atau gugup hampir tiap hari (cemasnya "extra" banget).',
					options: [
						{ value: 1, label: 'Ga pernah / Santuy' },
						{ value: 2, label: 'Jarang' },
						{ value: 3, label: 'Kadang-kadang' },
						{ value: 4, label: 'Sering' },
						{ value: 5, label: 'Selalu / Tiap saat' }
					]
				},
				{
					id: 2,
					text: 'Gue susah banget buat nenangin pikiran (overthinking terooos).',
					options: [
						{ value: 1, label: 'Ga pernah' }, { value: 2, label: 'Jarang' }, { value: 3, label: 'Kadang-kadang' }, { value: 4, label: 'Sering' }, { value: 5, label: 'Selalu' }
					]
				},
				{
					id: 3,
					text: 'Gue ngerasa kewalahan sama tanggung jawab (tugas numpuk parah).',
					options: [
						{ value: 1, label: 'Ga pernah' }, { value: 2, label: 'Jarang' }, { value: 3, label: 'Kadang-kadang' }, { value: 4, label: 'Sering' }, { value: 5, label: 'Selalu' }
					]
				},
				{
					id: 4,
					text: 'Gue gampang marah atau baperan akhir-akhir ini (mo "crashing out" rasanya).',
					options: [
						{ value: 1, label: 'Ga pernah' }, { value: 2, label: 'Jarang' }, { value: 3, label: 'Kadang-kadang' }, { value: 4, label: 'Sering' }, { value: 5, label: 'Selalu' }
					]
				},
				{
					id: 5,
					text: 'Gue susah fokus gara-gara kebanyakan pikiran (otak gue beneran "cooked").',
					options: [
						{ value: 1, label: 'Ga pernah' }, { value: 2, label: 'Jarang' }, { value: 3, label: 'Kadang-kadang' }, { value: 4, label: 'Sering' }, { value: 5, label: 'Selalu' }
					]
				},
				{
					id: 6,
					text: 'Gue kehilangan minat sama hal-hal yang biasanya gue suka (ga ada yang asik lagi).',
					options: [
						{ value: 1, label: 'Ga pernah' }, { value: 2, label: 'Jarang' }, { value: 3, label: 'Kadang-kadang' }, { value: 4, label: 'Sering' }, { value: 5, label: 'Selalu' }
					]
				},
				{
					id: 7,
					text: 'Gue ngerasa sedih atau hampa hampir tiap hari (ngerasa "low" terus).',
					options: [
						{ value: 1, label: 'Ga pernah' }, { value: 2, label: 'Jarang' }, { value: 3, label: 'Kadang-kadang' }, { value: 4, label: 'Sering' }, { value: 5, label: 'Selalu' }
					]
				},
				{
					id: 8,
					text: 'Gue ngerasa capek terus padahal ga ngapa-ngapain (batre selalu 1%).',
					options: [
						{ value: 1, label: 'Ga pernah' }, { value: 2, label: 'Jarang' }, { value: 3, label: 'Kadang-kadang' }, { value: 4, label: 'Sering' }, { value: 5, label: 'Selalu' }
					]
				},
				{
					id: 9,
					text: 'Gue ngerasa "mid" atau bersalah tanpa alasan yang jelas (mental gue lagi diuji banget).',
					options: [
						{ value: 1, label: 'Ga pernah' }, { value: 2, label: 'Jarang' }, { value: 3, label: 'Kadang-kadang' }, { value: 4, label: 'Sering' }, { value: 5, label: 'Selalu' }
					]
				},
				{
					id: 10,
					text: 'Gue susah tidur atau malah tidur terus-terusan (no sleep schedule).',
					options: [
						{ value: 1, label: 'Ga pernah' }, { value: 2, label: 'Jarang' }, { value: 3, label: 'Kadang-kadang' }, { value: 4, label: 'Sering' }, { value: 5, label: 'Selalu' }
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
		let stressScore = 0; let depressionScore = 0;
		for (let i = 1; i <= 5; i++) { stressScore += answers[i] || 0; }
		for (let i = 6; i <= 10; i++) { depressionScore += answers[i] || 0; }
		
		let interpretation = ''; let recommendation = '';
		
		if (language === 'id') {
			let sInf = stressScore <= 10 ? 'Aman' : stressScore <= 18 ? 'Mayan Stres' : 'Waduh, Stres Parah';
			let dInf = depressionScore <= 10 ? 'Chill' : depressionScore <= 18 ? 'Lagi Low' : 'Parah, Butuh Bantuan';
			interpretation = `Stres: ${sInf} | Depresi: ${dInf}`;
			
			if (stressScore <= 10 && depressionScore <= 10) {
				recommendation = 'Lo masih vibing, bestie! Pertahanin aura positif lo ya.';
			} else if (stressScore > 18 || depressionScore > 18) {
				recommendation = 'Kondisi lo udah merah banget. Please buruan cari ahli ya, lo berharga banget!';
			} else {
				recommendation = 'Lo lagi di titik jenuh nih. Coba curhat atau healing tipis-tipis biar ga makin burnout.';
			}
		} else {
			let sInf = stressScore <= 10 ? 'Chill' : stressScore <= 18 ? 'Medium Stress' : 'Stress Mode: ON';
			let dInf = depressionScore <= 10 ? 'Steady' : depressionScore <= 18 ? 'Low Vibes' : 'Critical Depressed Era';
			interpretation = `Stress: ${sInf} | Depression: ${dInf}`;
			
			if (stressScore <= 10 && depressionScore <= 10) {
				recommendation = 'You\'re doing great, bestie! Keep that energy consistent.';
			} else if (stressScore > 18 || depressionScore > 18) {
				recommendation = 'You\'re in the danger zone. Please reach out to a professional ASAP. We care!';
			} else {
				recommendation = 'You\'re feeling the weight. Time for some serious self-care or a quality chat with a friend.';
			}
		}
		
		results = { totalScore: stressScore + depressionScore, stressScore, depressionScore, interpretation, recommendation, timestamp: new Date().toISOString() };
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
				stressScore: results.stressScore,
				depressionScore: results.depressionScore,
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
		const content = `Dual Vibe Check: ${currentAssessment.title}\nStress Score: ${results.stressScore}/25\nDepression Score: ${results.depressionScore}/25\nSummary: ${results.interpretation}\n\n💡 Advice: ${results.recommendation}`;
		const blob = new Blob([content], { type: 'text/plain' });
		const url = URL.createObjectURL(blob);
		const a = document.createElement('a'); a.href = url; a.download = `mentalwell_dual_check.txt`; a.click();
	}
</script>

<svelte:head>
	<title>{language === 'id' ? 'Cek Dobel' : 'Dual Vibe Check'} - MentalWell</title>
</svelte:head>

<div class="space-y-10 py-6 animate-in fade-in duration-700">
	<!-- Header -->
	<header class="text-center space-y-4">
		<h1 class="text-4xl md:text-6xl font-black bg-clip-text text-transparent bg-gradient-to-r from-emerald-500 to-cyan-600 tracking-tighter uppercase italic">
			{currentAssessment.title}
		</h1>
	</header>

	{#if !showResults}
		<!-- Assessment Container -->
		<section class="bg-white/30 dark:bg-black/40 backdrop-blur-2xl rounded-[3rem] p-8 md:p-12 border border-white/60 dark:border-white/10 shadow-2xl max-w-3xl mx-auto relative overflow-hidden">
			<div class="absolute -right-10 -top-10 text-9xl opacity-5">🌿</div>
			
			<div class="flex justify-between items-center relative z-10">
				<div class="space-y-1">
					<p class="text-xs font-black uppercase tracking-widest text-emerald-600 dark:text-cyan-400">Section: {currentQuestionIndex < 5 ? (language === 'id' ? 'Stres' : 'Stress') : (language === 'id' ? 'Depresi' : 'Depression')}</p>
					<h2 class="text-lg font-bold text-gray-900 dark:text-white italic">
						{language === 'id' ? 'Pertanyaan' : 'Question'} {currentQuestionIndex + 1}/{currentAssessment.questions.length}
					</h2>
				</div>
				<button onclick={goBack} class="text-[10px] font-black uppercase tracking-widest text-gray-500 hover:text-gray-900 border-b border-gray-300">Abort Mission</button>
			</div>
			
			<!-- Dynamic Progress Bar -->
			<div class="relative h-4 bg-white/50 dark:bg-black/20 rounded-full overflow-hidden border border-white/50 dark:border-white/5 shadow-inner">
				<div 
					class="absolute inset-y-0 left-0 bg-gradient-to-r from-emerald-500 to-cyan-600 transition-all duration-700 flex items-center justify-end px-2"
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
									? 'bg-emerald-600 text-white border-emerald-400 shadow-xl scale-[1.02]' 
									: 'bg-white/60 dark:bg-white/5 text-gray-700 dark:text-gray-300 border-white/50 dark:border-white/10 hover:bg-white/80 dark:hover:bg-white/10 hover:border-emerald-300 active:scale-95' }"
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
					class="px-10 py-4 bg-gradient-to-r from-emerald-600 to-cyan-700 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-emerald-500/30 active:scale-95 disabled:opacity-30 transition-all"
				>
					{currentQuestionIndex === currentAssessment.questions.length - 1 ? 'Show Analysis ✨' : 'Next Level ➡️'}
				</button>
			</div>
		</section>
	{:else}
		<!-- Results Section -->
		<section class="max-w-3xl mx-auto animate-in zoom-in-95 duration-700">
			<div class="bg-white/30 dark:bg-black/40 backdrop-blur-3xl rounded-[3rem] p-10 md:p-12 border border-white/60 dark:border-white/10 shadow-2xl text-center space-y-10 relative overflow-hidden">
				<div class="absolute inset-0 bg-gradient-to-t from-emerald-500/10 to-transparent pointer-events-none"></div>
				
				<div class="space-y-4">
					<h2 class="text-xs font-black uppercase text-emerald-600 dark:text-cyan-400 tracking-[0.5em]">Result Summary</h2>
					<div class="text-[7rem] mb-4 drop-shadow-2xl animate-bounce">{currentAssessment.icon}</div>
					<h3 class="text-4xl md:text-5xl font-black text-gray-900 dark:text-white uppercase italic tracking-tighter mb-4">
						Analysis Complete ✨
					</h3>
					
					<!-- Dual Score Display -->
					<div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
						<div class="bg-white/50 dark:bg-black/30 p-8 rounded-[2rem] border border-white/50 dark:border-white/5 shadow-inner">
							<p class="text-xs font-black text-emerald-600 uppercase tracking-widest mb-2">Stress Score</p>
							<div class="text-4xl font-black text-gray-900 dark:text-white italic">{results.stressScore} <span class="text-sm text-gray-400 not-italic">/ 25</span></div>
							<div class="mt-4 px-4 py-2 rounded-xl text-white font-black text-[10px] uppercase { results.stressScore <= 10 ? 'bg-green-500' : results.stressScore <= 18 ? 'bg-yellow-500' : 'bg-red-600' } animate-pulse">
								{results.stressScore <= 10 ? 'CHILL' : results.stressScore <= 18 ? 'MODERATE' : 'CRITICAL'}
							</div>
						</div>
						<div class="bg-white/50 dark:bg-black/30 p-8 rounded-[2rem] border border-white/50 dark:border-white/5 shadow-inner">
							<p class="text-xs font-black text-cyan-600 uppercase tracking-widest mb-2">Mood Score</p>
							<div class="text-4xl font-black text-gray-900 dark:text-white italic">{results.depressionScore} <span class="text-sm text-gray-400 not-italic">/ 25</span></div>
							<div class="mt-4 px-4 py-2 rounded-xl text-white font-black text-[10px] uppercase { results.depressionScore <= 10 ? 'bg-green-500' : results.depressionScore <= 18 ? 'bg-yellow-500' : 'bg-red-600' } animate-pulse">
								{results.depressionScore <= 10 ? 'STEADY' : results.depressionScore <= 18 ? 'LOW' : 'CRITICAL'}
							</div>
						</div>
					</div>
				</div>

				<div class="text-left bg-white/40 dark:bg-white/5 rounded-[2rem] p-10 border border-white/60 dark:border-white/5">
					<h4 class="text-xs font-black uppercase text-emerald-600 mb-4">💡 Interpretation:</h4>
					<p class="text-xl font-bold text-gray-800 dark:text-gray-200 italic leading-relaxed">"{results.recommendation}"</p>
				</div>

				<div class="flex flex-col sm:flex-row gap-4">
					<button onclick={exportResults} class="flex-1 px-8 py-4 bg-green-500 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl active:scale-95">Export 📥</button>
					<button onclick={resetAssessment} class="flex-1 px-8 py-4 bg-emerald-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl active:scale-95">Retake 🔄</button>
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
