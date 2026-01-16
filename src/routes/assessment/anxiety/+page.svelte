<script>
	import { currentLanguage } from '$lib/stores.js';

	// Assessment data (Gen Z Edition 💅)
	const assessments = {
		en: {
			id: 'anxiety',
			title: 'Anxiety Vibe Check 😰',
			description: 'Is it just a busy day or are you actually hitting high anxiety levels? Let\'s see, no gatekeeping.',
			icon: '😰',
			questions: [
				{
					id: 1,
					text: 'I find it difficult to control feelings of anxiety or worry (fr, it\'s a struggle).',
					options: [
						{ value: 0, label: 'Not at all / Chill' },
						{ value: 1, label: 'Several days' },
						{ value: 2, label: 'More than half the days' },
						{ value: 3, label: 'Nearly every day / Non-stop' }
					]
				},
				{
					id: 2,
					text: 'My body is doing the most (heart Racing, trembling, or shortness of breath) when I\'m stressed.',
					options: [
						{ value: 0, label: 'Not at all' },
						{ value: 1, label: 'Several days' },
						{ value: 2, label: 'More than half the days' },
						{ value: 3, label: 'Nearly every day' }
					]
				},
				{
					id: 3,
					text: 'I feel restless, tense, or beneran difficult to truly relax.',
					options: [
						{ value: 0, label: 'Not at all' },
						{ value: 1, label: 'Several days' },
						{ value: 2, label: 'More than half the days' },
						{ value: 3, label: 'Nearly every day' }
					]
				},
				{
					id: 4,
					text: 'I avoid certain situations or activities because I\'m afraid or overthinking it.',
					options: [
						{ value: 0, label: 'Not at all' },
						{ value: 1, label: 'Several days' },
						{ value: 2, label: 'More than half the days' },
						{ value: 3, label: 'Nearly every day' }
					]
				},
				{
					id: 5,
					text: 'My mind is filled with worries that ruin my focus or sleep schedule.',
					options: [
						{ value: 0, label: 'Not at all' },
						{ value: 1, label: 'Several days' },
						{ value: 2, label: 'More than half the days' },
						{ value: 3, label: 'Nearly every day' }
					]
				}
			]
		},
		id: {
			id: 'anxiety',
			title: 'Cek Vibe Kecemasan 😰',
			description: 'Lagi ngerasa cemas terus atau emang lagi "extra" aja? Cek level lo di sini, no cap.',
			icon: '😰',
			questions: [
				{
					id: 1,
					text: 'Gue susah banget ngontrol rasa cemas atau khawatir (beneran struggle).',
					options: [
						{ value: 0, label: 'Ga pernah / Santuy' },
						{ value: 1, label: 'Beberapa hari' },
						{ value: 2, label: 'Sering banget' },
						{ value: 3, label: 'Hampir tiap hari / Tiap saat' }
					]
				},
				{
					id: 2,
					text: 'Badan gue mulai aneh-aneh (jantung deg-degan, gemetar, atau sesak) pas lagi cemas.',
					options: [
						{ value: 0, label: 'Ga pernah' },
						{ value: 1, label: 'Beberapa hari' },
						{ value: 2, label: 'Sering banget' },
						{ value: 3, label: 'Tiap hari' }
					]
				},
				{
					id: 3,
					text: 'Gue ngerasa gelisah, tegang, atau beneran susah buat santuy.',
					options: [
						{ value: 0, label: 'Ga pernah' },
						{ value: 1, label: 'Beberapa hari' },
						{ value: 2, label: 'Sering banget' },
						{ value: 3, label: 'Tiap hari' }
					]
				},
				{
					id: 4,
					text: 'Gue ngehindarin situasi tertentu gara-gara takut atau overthinking parah.',
					options: [
						{ value: 0, label: 'Ga pernah' },
						{ value: 1, label: 'Beberapa hari' },
						{ value: 2, label: 'Sering banget' },
						{ value: 3, label: 'Tiap hari' }
					]
				},
				{
					id: 5,
					text: 'Pikiran gue penuh sama kekhawatiran sampe ngerusak fokus atau tidur gue.',
					options: [
						{ value: 0, label: 'Ga pernah' },
						{ value: 1, label: 'Beberapa hari' },
						{ value: 2, label: 'Sering banget' },
						{ value: 3, label: 'Tiap hari' }
					]
				}
			]
		}
	};

	// State variables (Svelte 5 Runes)
	let currentQuestionIndex = $state(0);
	let answers = $state({});
	let selectedOptions = $state({});
	let showResults = $state(false);
	let results = $state(null);
	let assessmentHistory = $state([]);
	let language = $derived($currentLanguage || 'id');

	function getAssessment() {
		return assessments[language] || assessments['id'];
	}

	let currentAssessment = $derived(getAssessment());

	function nextQuestion() {
		if (currentQuestionIndex < currentAssessment.questions.length - 1) {
			currentQuestionIndex++;
		} else {
			calculateResults();
		}
	}

	function prevQuestion() {
		if (currentQuestionIndex > 0) { currentQuestionIndex--; }
	}

	function selectAnswer(questionId, value) {
		answers = {...answers, [questionId]: value};
		selectedOptions = {...selectedOptions, [questionId]: value};
	}

	function calculateResults() {
		const totalScore = Object.values(answers).reduce((sum, score) => sum + score, 0);
		
		let interpretation = '';
		let recommendation = '';
		
		if (language === 'id') {
			if (totalScore <= 4) {
				interpretation = 'Vibe Masih Santuy';
				recommendation = 'Kondisi lo masih aman, bestie. Keep it up! Jangan lupa self-care tipis-tipis.';
			} else if (totalScore <= 9) {
				interpretation = 'Lagi Agak Cemas';
				recommendation = 'Lo mulai ngerasa beban idup nih. Coba healing bentar, journaling, atau meditasi biar ga makin burnout.';
			} else if (totalScore <= 12) {
				interpretation = 'Cemas Level Tinggi';
				recommendation = 'Waduh, ini udah mulai ganggu vibe harian lo. Coba ngobrol sama orang terpercaya atau cari tenaga ahli ya.';
			} else {
				interpretation = 'Danger Zone! Cemas Parah';
				recommendation = 'Bestie, ini udah darurat. Buruan hubungin profesional ya. Don\'t handle this alone, we care about you!';
			}
		} else {
			if (totalScore <= 4) {
				interpretation = 'Vibe is Chill';
				recommendation = 'You\'re chilling, bestie. Keep maintaining that peace and don\'t forget light self-care.';
			} else if (totalScore <= 9) {
				interpretation = 'Slightly Anxious Era';
				recommendation = 'You\'re feeling the pressure. Try some mini-healing sessions like journaling or breathing to reset.';
			} else if (totalScore <= 12) {
				interpretation = 'High Anxiety Vibe';
				recommendation = 'This is affecting your daily grind. Talk to someone you trust or seek a pro to help you navigate this.';
			} else {
				interpretation = 'Panic! At The Vibe Zone';
				recommendation = 'Bestie, you\'re in the deep end. Reach out to a pro ASAP. You don\'t have to fight this alone!';
			}
		}
		
		results = { totalScore, interpretation, recommendation, timestamp: new Date().toISOString() };
		saveAssessmentResult();
		showResults = true;
	}

	function resetAssessment() {
		currentQuestionIndex = 0; answers = {}; selectedOptions = {}; showResults = false; results = null;
	}

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

	function formatDate(timestamp) {
		return new Date(timestamp).toLocaleDateString(language === 'id' ? 'id-ID' : 'en-US', {
			year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
		});
	}

	function exportResults() {
		const content = language === 'id' ? 
			`Hasil Vibe Check: ${currentAssessment.title}\nSkor: ${results.totalScore}\nInterpretasi: ${results.interpretation}\n\n💡 Rekomendasi:\n${results.recommendation}` :
			`Vibe Check Results: ${currentAssessment.title}\nScore: ${results.totalScore}\nInterpretation: ${results.interpretation}\n\n💡 Recommendation:\n${results.recommendation}`;
		const blob = new Blob([content], { type: 'text/plain' });
		const url = URL.createObjectURL(blob);
		const a = document.createElement('a');
		a.href = url; a.download = `mentalwell_vibe_check.txt`;
		a.click();
	}
	
	function goBack() { window.history.back(); }
</script>

<svelte:head>
	<title>{language === 'id' ? 'Cek Kecemasan' : 'Anxiety Vibe Check'} - MentalWell</title>
</svelte:head>

<div class="space-y-10 py-6 animate-in fade-in duration-700">
	<!-- Header -->
	<header class="text-center space-y-4">
		<h1 class="text-4xl md:text-6xl font-black bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-600 tracking-tighter uppercase italic">
			{currentAssessment.title}
		</h1>
	</header>

	{#if !showResults}
		<!-- Assessment Container -->
		<section class="bg-white/30 dark:bg-black/40 backdrop-blur-2xl rounded-[3rem] p-8 md:p-12 border border-white/60 dark:border-white/10 shadow-2xl space-y-8 max-w-3xl mx-auto relative overflow-hidden">
			<div class="absolute -right-10 -top-10 text-9xl opacity-5">🧬</div>
			
			<div class="flex justify-between items-center relative z-10">
				<div class="space-y-1">
					<p class="text-xs font-black uppercase tracking-widest text-blue-600 dark:text-cyan-400">Progress</p>
					<h2 class="text-lg font-bold text-gray-900 dark:text-white italic">
						{language === 'id' ? 'Pertanyaan' : 'Question'} {currentQuestionIndex + 1}/{currentAssessment.questions.length}
					</h2>
				</div>
				<button onclick={goBack} class="text-[10px] font-black uppercase tracking-widest text-gray-500 hover:text-gray-900 border-b border-gray-300">Abort Mission</button>
			</div>
			
			<!-- Custom Dynamic Progress Bar -->
			<div class="relative h-4 bg-white/50 dark:bg-black/20 rounded-full overflow-hidden border border-white/50 dark:border-white/5 shadow-inner">
				<div 
					class="absolute inset-y-0 left-0 bg-gradient-to-r from-blue-500 to-indigo-600 transition-all duration-700 ease-out flex items-center justify-end px-2"
					style="width: {((currentQuestionIndex + 1) / currentAssessment.questions.length) * 100}%"
				>
					<span class="text-[8px] font-black text-white italic tracking-tighter shadow-sm overflow-hidden whitespace-nowrap">VIBE CHECKING...</span>
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
								{ selectedOptions[currentAssessment.questions[currentQuestionIndex].id] === option.value 
									? 'bg-blue-600 text-white border-blue-400 shadow-xl scale-[1.02]' 
									: 'bg-white/60 dark:bg-white/5 text-gray-700 dark:text-gray-300 border-white/50 dark:border-white/10 hover:bg-white/80 dark:hover:bg-white/10 hover:border-blue-300 active:scale-95' }"
						>
							{option.label}
						</button>
					{/each}
				</div>
			</div>

			<!-- Navigation Buttons -->
			<div class="flex justify-between items-center pt-6 border-t border-white/30 dark:border-white/5">
				<button
					onclick={prevQuestion}
					disabled={currentQuestionIndex === 0}
					class="px-8 py-3 text-xs font-black uppercase tracking-widest text-gray-500 disabled:opacity-0 transition-all"
				>
					🔙 Back
				</button>
				<button
					onclick={nextQuestion}
					disabled={answers[currentAssessment.questions[currentQuestionIndex].id] === undefined}
					class="px-10 py-4 bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-blue-500/30 active:scale-95 disabled:opacity-30 transition-all"
				>
					{currentQuestionIndex === currentAssessment.questions.length - 1 ? 'Show Vibe Check Results ✨' : 'Next Level ➡️'}
				</button>
			</div>
		</section>
	{:else}
		<!-- Results Section (Premium Glow Up) -->
		<section class="max-w-3xl mx-auto space-y-8 animate-in zoom-in-95 duration-700">
			<div class="bg-white/30 dark:bg-black/40 backdrop-blur-3xl rounded-[3rem] p-10 md:p-12 border border-white/60 dark:border-white/10 shadow-2xl text-center space-y-8 relative overflow-hidden">
				<div class="absolute inset-0 bg-gradient-to-t from-blue-500/10 to-transparent pointer-events-none"></div>
				
				<div class="relative z-10 space-y-4">
					<h2 class="text-xs font-black uppercase text-blue-600 dark:text-cyan-400 tracking-[0.5em]">Result Summary</h2>
					<div class="text-[7rem] mb-4 drop-shadow-2xl animate-bounce duration-[2000ms]">{currentAssessment.icon}</div>
					<h3 class="text-4xl md:text-5xl font-black text-gray-900 dark:text-white uppercase italic tracking-tighter">
						{results.totalScore} <span class="text-xl text-gray-400 not-italic">/ {currentAssessment.questions.length * 3}</span>
					</h3>
				</div>

				<!-- Visual Vibe Status -->
				<div class="relative bg-white/50 dark:bg-black/30 p-8 rounded-[2rem] border border-white/50 dark:border-white/5 shadow-inner">
					<div class="text-xs font-black uppercase tracking-widest text-gray-400 mb-6 italic">Current Vibe Level:</div>
					<div class="flex justify-center flex-wrap gap-4">
						<span class="px-8 py-3 rounded-2xl text-white font-black text-lg uppercase tracking-tight italic shadow-2xl scale-125
							{ results.totalScore <= 4 ? 'bg-green-500' : results.totalScore <= 9 ? 'bg-yellow-500' : results.totalScore <= 12 ? 'bg-orange-500' : 'bg-red-600' }">
							{results.interpretation}
						</span>
					</div>
				</div>

				<!-- Conclusion Box -->
				<div class="text-left bg-gradient-to-br from-white/60 to-white/30 dark:from-white/5 dark:to-transparent rounded-[2rem] p-8 border border-white/60 dark:border-white/5 space-y-4">
					<h4 class="text-xs font-black uppercase text-blue-500 flex items-center gap-2">
						<span class="w-2 h-2 rounded-full bg-blue-500"></span>
						Conclusion
					</h4>
					<p class="text-lg font-bold text-gray-800 dark:text-gray-200 leading-relaxed italic">
						"{results.recommendation}"
					</p>
				</div>

				<!-- Action Buttons -->
				<div class="flex flex-col sm:flex-row gap-4 pt-4">
					<button onclick={exportResults} class="flex-1 px-8 py-4 bg-green-500 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-green-500/20 active:scale-95 transition-all">Export Report 📥</button>
					<button onclick={resetAssessment} class="flex-1 px-8 py-4 bg-blue-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-blue-500/20 active:scale-95 transition-all">Retake Test 🔄</button>
					<button onclick={goBack} class="flex-1 px-8 py-4 bg-white/80 dark:bg-white/5 text-gray-700 dark:text-gray-300 border border-white/50 rounded-2xl font-black text-xs uppercase tracking-widest active:scale-95 transition-all">Exit 🔙</button>
				</div>
			</div>
		</section>
	{/if}

	<!-- Important Disclaimer -->
	<footer class="max-w-3xl mx-auto text-center p-8 bg-red-500/5 backdrop-blur-md rounded-[2rem] border border-red-500/10">
		<p class="text-[10px] font-black uppercase text-red-500 tracking-widest mb-2">Notice (Real Talk Only)</p>
		<p class="text-xs font-bold text-gray-500 dark:text-gray-400 italic">
			{language === 'id' 
				? 'Bukan pengganti diagnosis dokter ya. Kalo lo ngerasa berat banget, buruan cari bantuan ahli. You matter, bestie.' 
				: 'Not a replacement for clinical diagnosis. If things get heavy, seek professional help ASAP. You matter, bestie.'}
		</p>
	</footer>
</div>

<style>
	:global(.animate-in) {
		animation-fill-mode: forwards;
		animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
	}
	@keyframes bounce { 
		0%, 100% { transform: translateY(0); }
		50% { transform: translateY(-10px); }
	}
	.animate-bounce { animation: bounce 2s infinite ease-in-out; }
</style>
