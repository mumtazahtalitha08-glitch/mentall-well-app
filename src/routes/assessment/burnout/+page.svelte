<script>
	import { onMount } from 'svelte';
	import { currentLanguage } from '$lib/stores.js';

	// Assessment data
	const assessments = {
		en: {
			id: 'burnout',
			title: 'Burnout Assessment',
			description: 'A brief assessment to detect symptoms of burnout',
			icon: '🔥',
			questions: [
				{
					id: 1,
					text: 'I feel emotionally drained from my work',
					options: [
						{ value: 0, label: 'Never' },
						{ value: 1, label: 'Rarely' },
						{ value: 2, label: 'Sometimes' },
						{ value: 3, label: 'Often' },
						{ value: 4, label: 'Very often' }
					]
				},
				{
					id: 2,
					text: 'I feel tired when I get up in the morning and have to face another day at work',
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
					text: 'I feel frustrated by my job',
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
					text: 'I feel like I am at the end of my rope',
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
					text: 'I feel burned out from my work',
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
			title: 'Tes Burnout',
			description: 'Tes singkat untuk mendeteksi gejala burnout',
			icon: '🔥',
			questions: [
				{
					id: 1,
					text: 'Saya merasa emosional terkuras dari pekerjaan saya',
					options: [
						{ value: 0, label: 'Tidak pernah' },
						{ value: 1, label: 'Jarang' },
						{ value: 2, label: 'Kadang-kadang' },
						{ value: 3, label: 'Sering' },
						{ value: 4, label: 'Sangat sering' }
					]
				},
				{
					id: 2,
					text: 'Saya merasa lelah ketika bangun di pagi hari dan harus menghadapi hari kerja lainnya',
					options: [
						{ value: 0, label: 'Tidak pernah' },
						{ value: 1, label: 'Jarang' },
						{ value: 2, label: 'Kadang-kadang' },
						{ value: 3, label: 'Sering' },
						{ value: 4, label: 'Sangat sering' }
					]
				},
				{
					id: 3,
					text: 'Saya merasa frustrasi dengan pekerjaan saya',
					options: [
						{ value: 0, label: 'Tidak pernah' },
						{ value: 1, label: 'Jarang' },
						{ value: 2, label: 'Kadang-kadang' },
						{ value: 3, label: 'Sering' },
						{ value: 4, label: 'Sangat sering' }
					]
				},
				{
					id: 4,
					text: 'Saya merasa seperti berada di ujung tanduk',
					options: [
						{ value: 0, label: 'Tidak pernah' },
						{ value: 1, label: 'Jarang' },
						{ value: 2, label: 'Kadang-kadang' },
						{ value: 3, label: 'Sering' },
						{ value: 4, label: 'Sangat sering' }
					]
				},
				{
					id: 5,
					text: 'Saya merasa burnout dari pekerjaan saya',
					options: [
						{ value: 0, label: 'Tidak pernah' },
						{ value: 1, label: 'Jarang' },
						{ value: 2, label: 'Kadang-kadang' },
						{ value: 3, label: 'Sering' },
						{ value: 4, label: 'Sangat sering' }
					]
				}
			]
		}
	};

	// State variables
	let currentQuestionIndex = 0;
	let answers = {};
	let showResults = false;
	let results = null;
	let assessmentHistory = [];

	// Get current language assessments
	let language = 'id'; // Default to Indonesian
	
	$effect(() => {
		console.log('Current language from store:', $currentLanguage);
		language = $currentLanguage || 'id';
		console.log('Language variable set to:', language);
	});

	function getAssessment() {
		console.log('Getting assessment for language:', language);
		const result = assessments[language] || assessments['id'];
		console.log('Returning assessment:', result);
		return result;
	}

	let currentAssessment = getAssessment();

	onMount(() => {
		// Initialize with correct language
		currentAssessment = getAssessment();
	});

	function nextQuestion() {
		if (currentQuestionIndex < currentAssessment.questions.length - 1) {
			currentQuestionIndex++;
		} else {
			calculateResults();
		}
	}

	function prevQuestion() {
		if (currentQuestionIndex > 0) {
			currentQuestionIndex--;
		}
	}

	function selectAnswer(questionId, value) {
		answers = {...answers, [questionId]: value};
	}

	function calculateResults() {
		const totalScore = Object.values(answers).reduce((sum, score) => sum + score, 0);
		
		let interpretation = '';
		let recommendation = '';
		
		if (language === 'id') {
			// Indonesian interpretations
			if (totalScore <= 5) {
				interpretation = 'Burnout Rendah';
				recommendation = 'Anda memiliki tingkat burnout yang rendah. Pertahankan keseimbangan antara pekerjaan dan kehidupan pribadi.';
			} else if (totalScore <= 10) {
				interpretation = 'Burnout Sedang';
				recommendation = 'Anda memiliki tingkat burnout yang sedang. Pertimbangan untuk mengambil waktu istirahat dan mengevaluasi beban kerja Anda.';
			} else if (totalScore <= 15) {
				interpretation = 'Burnout Tinggi';
				recommendation = 'Anda memiliki tingkat burnout yang tinggi. Disarankan untuk mencari dukungan dan mengevaluasi keseimbangan hidup Anda.';
			} else {
				interpretation = 'Burnout Sangat Tinggi';
				recommendation = 'Anda memiliki tingkat burnout yang sangat tinggi. Sangat disarankan untuk segera mencari bantuan profesional.';
			}
		} else {
			// English interpretations
			if (totalScore <= 5) {
				interpretation = 'Low Burnout';
				recommendation = 'You have a low level of burnout. Maintain a balance between work and personal life.';
			} else if (totalScore <= 10) {
				interpretation = 'Moderate Burnout';
				recommendation = 'You have a moderate level of burnout. Consider taking time off and evaluating your workload.';
			} else if (totalScore <= 15) {
				interpretation = 'High Burnout';
				recommendation = 'You have a high level of burnout. It is recommended to seek support and evaluate your life balance.';
			} else {
				interpretation = 'Very High Burnout';
				recommendation = 'You have a very high level of burnout. It is highly recommended to seek professional help immediately.';
			}
		}
		
		results = {
			totalScore,
			interpretation,
			recommendation,
			timestamp: new Date().toISOString()
		};
		
		// Save to history
		saveAssessmentResult();
		
		showResults = true;
	}

	function resetAssessment() {
		currentQuestionIndex = 0;
		answers = {};
		showResults = false;
		results = null;
	}

	function loadAssessmentHistory() {
		if (typeof window !== 'undefined') {
			const stored = localStorage.getItem('mentalwell_assessment_history');
			assessmentHistory = stored ? JSON.parse(stored) : [];
		}
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
			
			// Add to history
			assessmentHistory.unshift(historyEntry);
			
			// Keep only last 20 entries
			if (assessmentHistory.length > 20) {
				assessmentHistory = assessmentHistory.slice(0, 20);
			}
			
			// Save to localStorage
			localStorage.setItem('mentalwell_assessment_history', JSON.stringify(assessmentHistory));
		}
	}

	function formatDate(timestamp) {
		return new Date(timestamp).toLocaleDateString(language === 'id' ? 'id-ID' : 'en-US', {
			year: 'numeric',
			month: 'short',
			day: 'numeric',
			hour: '2-digit',
			minute: '2-digit'
		});
	}

	function exportResults() {
		if (typeof window !== 'undefined' && currentAssessment && results) {
			const content = language === 'id' ? 
				`Hasil Tes MentalWell
=================

Tes: ${currentAssessment.title}
Tanggal: ${formatDate(results.timestamp)}
Skor Total: ${results.totalScore}
Interpretasi: ${results.interpretation}

Rekomendasi:
${results.recommendation}

---
Hasil ini hanya untuk tujuan edukasi dan tidak menggantikan diagnosis profesional.
` :
				`MentalWell Test Results
=================

Test: ${currentAssessment.title}
Date: ${formatDate(results.timestamp)}
Total Score: ${results.totalScore}
Interpretation: ${results.interpretation}

Recommendation:
${results.recommendation}

---
This result is for educational purposes only and does not replace professional diagnosis.
`;
			
			const blob = new Blob([content], { type: 'text/plain' });
			const url = URL.createObjectURL(blob);
			const a = document.createElement('a');
			a.href = url;
			a.download = `mentalwell_${currentAssessment.id}_results.txt`;
			document.body.appendChild(a);
			a.click();
			document.body.removeChild(a);
			URL.revokeObjectURL(url);
		}
	}
	
	function goBack() {
		window.history.back();
	}
</script>

<svelte:head>
	<title>{language === 'id' ? 'Tes Burnout - MentalWell' : 'Burnout Assessment - MentalWell'}</title>
</svelte:head>

<div class="min-h-screen bg-gradient-to-br from-pink-100 via-purple-50 to-indigo-100 p-6">
	<div class="max-w-4xl mx-auto space-y-6">
		<!-- Header -->
		<div class="text-center">
			<h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">
				{language === 'id' ? 'Tes Burnout' : 'Burnout Assessment'}
			</h1>
		</div>

		{#if !showResults}
			<!-- Assessment Questions -->
			<div class="bg-white/70 backdrop-blur-sm dark:bg-gray-800/70 rounded-lg shadow-lg p-6 border border-purple-200/50 dark:border-gray-700">
				<div class="flex justify-between items-center mb-4">
					<h2 class="text-xl font-semibold text-gray-900 dark:text-white">
						{currentAssessment.title}
					</h2>
					<button 
						on:click={goBack}
						class="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
					>
						{language === 'id' ? 'Kembali' : 'Back'}
					</button>
				</div>
				
				<!-- Progress bar -->
				<div class="mb-6">
					<div class="flex justify-between text-sm text-gray-600 dark:text-gray-300 mb-1">
						<span>
							{language === 'id' 
								? `Pertanyaan ${currentQuestionIndex + 1} dari ${currentAssessment.questions.length}` 
								: `Question ${currentQuestionIndex + 1} of ${currentAssessment.questions.length}`}
						</span>
						<span>
							{Math.round(((currentQuestionIndex + 1) / currentAssessment.questions.length) * 100)}%
						</span>
					</div>
					<div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
						<div 
							class="bg-blue-600 h-2 rounded-full transition-all duration-300" 
							style={`width: ${((currentQuestionIndex + 1) / currentAssessment.questions.length) * 100}%`}
						></div>
					</div>
				</div>
				
				<!-- Instructions -->
				<div class="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-700">
					<p class="text-center text-blue-800 dark:text-blue-200 font-medium">
						{language === 'id' 
							? 'Jawab dengan jujur berdasarkan perasaan Anda selama 2 minggu terakhir.' 
							: 'Answer honestly based on your feelings over the past 2 weeks.'}
					</p>
				</div>
				
				<!-- Question -->
				<div class="mb-6">
					<h3 class="text-lg font-medium text-gray-900 dark:text-white mb-4">
						{currentAssessment.questions[currentQuestionIndex].text}
					</h3>
					
					<!-- Options -->
					<div class="space-y-2">
						{#each currentAssessment.questions[currentQuestionIndex].options as option}
							<button
								on:click={() => selectAnswer(currentAssessment.questions[currentQuestionIndex].id, option.value)}
								class="w-full text-left px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors {answers[currentAssessment.questions[currentQuestionIndex].id] === option.value ? 'bg-blue-100 dark:bg-blue-900 border-blue-500' : ''}"
							>
								{option.label}
							</button>
						{/each}
					</div>
				</div>
				
				<!-- Navigation buttons -->
				<div class="flex justify-between">
					<button
						on:click={prevQuestion}
						disabled={currentQuestionIndex === 0}
						class="px-4 py-2 text-gray-600 dark:text-gray-300 disabled:opacity-50"
					>
						{language === 'id' ? 'Sebelumnya' : 'Previous'}
					</button>
					<button
						on:click={nextQuestion}
						disabled={answers[currentAssessment.questions[currentQuestionIndex].id] === undefined}
						class="px-4 py-2 bg-blue-600 text-white rounded-lg disabled:opacity-50"
					>
						{currentQuestionIndex === currentAssessment.questions.length - 1 
							? (language === 'id' ? 'Selesai' : 'Finish') 
							: (language === 'id' ? 'Berikutnya' : 'Next')}
					</button>
				</div>
			</div>
		{:else}
			<!-- Results -->
			<div class="bg-white/70 backdrop-blur-sm dark:bg-gray-800/70 rounded-lg shadow-lg p-6 border border-purple-200/50 dark:border-gray-700">
				<div class="text-center mb-6">
					<h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">
						{language === 'id' ? 'Hasil Tes' : 'Test Results'}
					</h2>
					<div class="text-5xl mb-4">{currentAssessment.icon}</div>
					<h3 class="text-xl font-semibold text-gray-900 dark:text-white">
						{currentAssessment.title}
					</h3>
				</div>
				
				<div class="bg-blue-50 dark:bg-blue-900/30 rounded-lg p-6 mb-6">
					<div class="text-center">
						<div class="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
							{results.totalScore}
						</div>
						<div class="text-lg font-semibold text-gray-900 dark:text-white whitespace-pre-line">
							{results.interpretation}
						</div>
					</div>
				</div>
				
				<div class="mb-6">
					<h4 class="font-semibold text-gray-900 dark:text-white mb-2">
						{language === 'id' ? 'Rekomendasi' : 'Recommendation'}
					</h4>
					<p class="text-gray-700 dark:text-gray-300">
						{results.recommendation}
					</p>
				</div>
				
				<div class="flex justify-center gap-4">
					<button
						on:click={exportResults}
						class="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
					>
						{language === 'id' ? 'Ekspor Hasil' : 'Export Results'}
					</button>
					<button
						on:click={resetAssessment}
						class="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
					>
						{language === 'id' ? 'Ulangi Tes' : 'Retake Test'}
					</button>
					<button
						on:click={goBack}
						class="px-6 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
					>
						{language === 'id' ? 'Kembali' : 'Back'}
					</button>
				</div>
			</div>
		{/if}

		<!-- Information Section -->
		<div class="bg-gradient-to-r from-pink-100/80 to-purple-100/80 backdrop-blur-sm dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg p-6 text-center border border-pink-200/50 dark:border-blue-800 shadow-lg">
			<h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
				{language === 'id' ? 'Penting untuk Diingat' : 'Important to Remember'}
			</h3>
			<p class="text-gray-700 dark:text-gray-200">
				{language === 'id' 
					? 'Tes ini hanya untuk tujuan edukasi dan tidak menggantikan diagnosis profesional. Jika Anda mengalami gejala yang serius, segera hubungi profesional kesehatan mental.' 
					: 'This test is for educational purposes only and does not replace professional diagnosis. If you are experiencing serious symptoms, please contact a mental health professional immediately.'}
			</p>
		</div>
	</div>
</div>