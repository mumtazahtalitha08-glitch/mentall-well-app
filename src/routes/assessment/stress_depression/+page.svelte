<script>
	import { onMount } from 'svelte';
	import { currentLanguage } from '$lib/stores.js';

	// Assessment data
	const assessments = {
		en: {
			id: 'stress_depression',
			title: 'Stress & Depression Check',
			description: 'A combined assessment to detect symptoms of stress and depression',
			icon: '🌿',
			questions: [
				{
					id: 1,
					text: 'I feel tense or nervous almost every day',
					options: [
						{ value: 1, label: 'Never' },
						{ value: 2, label: 'Rarely' },
						{ value: 3, label: 'Sometimes' },
						{ value: 4, label: 'Often' },
						{ value: 5, label: 'Always' }
					]
				},
				{
					id: 2,
					text: 'I find it difficult to calm my mind',
					options: [
						{ value: 1, label: 'Never' },
						{ value: 2, label: 'Rarely' },
						{ value: 3, label: 'Sometimes' },
						{ value: 4, label: 'Often' },
						{ value: 5, label: 'Always' }
					]
				},
				{
					id: 3,
					text: 'I feel overwhelmed by my responsibilities',
					options: [
						{ value: 1, label: 'Never' },
						{ value: 2, label: 'Rarely' },
						{ value: 3, label: 'Sometimes' },
						{ value: 4, label: 'Often' },
						{ value: 5, label: 'Always' }
					]
				},
				{
					id: 4,
					text: 'I get angry or irritated easily lately',
					options: [
						{ value: 1, label: 'Never' },
						{ value: 2, label: 'Rarely' },
						{ value: 3, label: 'Sometimes' },
						{ value: 4, label: 'Often' },
						{ value: 5, label: 'Always' }
					]
				},
				{
					id: 5,
					text: 'I find it hard to focus because of too many thoughts',
					options: [
						{ value: 1, label: 'Never' },
						{ value: 2, label: 'Rarely' },
						{ value: 3, label: 'Sometimes' },
						{ value: 4, label: 'Often' },
						{ value: 5, label: 'Always' }
					]
				},
				{
					id: 6,
					text: 'I have lost interest in things I usually enjoy',
					options: [
						{ value: 1, label: 'Never' },
						{ value: 2, label: 'Rarely' },
						{ value: 3, label: 'Sometimes' },
						{ value: 4, label: 'Often' },
						{ value: 5, label: 'Always' }
					]
				},
				{
					id: 7,
					text: 'I feel sad or empty almost every day',
					options: [
						{ value: 1, label: 'Never' },
						{ value: 2, label: 'Rarely' },
						{ value: 3, label: 'Sometimes' },
						{ value: 4, label: 'Often' },
						{ value: 5, label: 'Always' }
					]
				},
				{
					id: 8,
					text: 'I feel tired without a clear physical reason',
					options: [
						{ value: 1, label: 'Never' },
						{ value: 2, label: 'Rarely' },
						{ value: 3, label: 'Sometimes' },
						{ value: 4, label: 'Often' },
						{ value: 5, label: 'Always' }
					]
				},
				{
					id: 9,
					text: 'I feel worthless or guilty without a strong reason',
					options: [
						{ value: 1, label: 'Never' },
						{ value: 2, label: 'Rarely' },
						{ value: 3, label: 'Sometimes' },
						{ value: 4, label: 'Often' },
						{ value: 5, label: 'Always' }
					]
				},
				{
					id: 10,
					text: 'I have trouble sleeping or sleep too much',
					options: [
						{ value: 1, label: 'Never' },
						{ value: 2, label: 'Rarely' },
						{ value: 3, label: 'Sometimes' },
						{ value: 4, label: 'Often' },
						{ value: 5, label: 'Always' }
					]
				}
			]
		},
		id: {
			id: 'stress_depression',
			title: 'Tes Stres & Depresi',
			description: 'Tes gabungan untuk mendeteksi gejala stres dan depresi',
			icon: '🌿',
			questions: [
				{
					id: 1,
					text: 'Saya merasa tegang atau gugup hampir setiap hari',
					options: [
						{ value: 1, label: 'Tidak pernah' },
						{ value: 2, label: 'Jarang' },
						{ value: 3, label: 'Kadang-kadang' },
						{ value: 4, label: 'Sering' },
						{ value: 5, label: 'Selalu' }
					]
				},
				{
					id: 2,
					text: 'Saya sulit menenangkan pikiran saya',
					options: [
						{ value: 1, label: 'Tidak pernah' },
						{ value: 2, label: 'Jarang' },
						{ value: 3, label: 'Kadang-kadang' },
						{ value: 4, label: 'Sering' },
						{ value: 5, label: 'Selalu' }
					]
				},
				{
					id: 3,
					text: 'Saya merasa kewalahan dengan tanggung jawab saya',
					options: [
						{ value: 1, label: 'Tidak pernah' },
						{ value: 2, label: 'Jarang' },
						{ value: 3, label: 'Kadang-kadang' },
						{ value: 4, label: 'Sering' },
						{ value: 5, label: 'Selalu' }
					]
				},
				{
					id: 4,
					text: 'Saya mudah marah atau tersinggung akhir-akhir ini',
					options: [
						{ value: 1, label: 'Tidak pernah' },
						{ value: 2, label: 'Jarang' },
						{ value: 3, label: 'Kadang-kadang' },
						{ value: 4, label: 'Sering' },
						{ value: 5, label: 'Selalu' }
					]
				},
				{
					id: 5,
					text: 'Saya sulit untuk fokus karena banyak pikiran',
					options: [
						{ value: 1, label: 'Tidak pernah' },
						{ value: 2, label: 'Jarang' },
						{ value: 3, label: 'Kadang-kadang' },
						{ value: 4, label: 'Sering' },
						{ value: 5, label: 'Selalu' }
					]
				},
				{
					id: 6,
					text: 'Saya kehilangan minat terhadap hal-hal yang biasanya saya sukai',
					options: [
						{ value: 1, label: 'Tidak pernah' },
						{ value: 2, label: 'Jarang' },
						{ value: 3, label: 'Kadang-kadang' },
						{ value: 4, label: 'Sering' },
						{ value: 5, label: 'Selalu' }
					]
				},
				{
					id: 7,
					text: 'Saya merasa sedih atau hampa hampir setiap hari',
					options: [
						{ value: 1, label: 'Tidak pernah' },
						{ value: 2, label: 'Jarang' },
						{ value: 3, label: 'Kadang-kadang' },
						{ value: 4, label: 'Sering' },
						{ value: 5, label: 'Selalu' }
					]
				},
				{
					id: 8,
					text: 'Saya merasa kelelahan tanpa alasan fisik yang jelas',
					options: [
						{ value: 1, label: 'Tidak pernah' },
						{ value: 2, label: 'Jarang' },
						{ value: 3, label: 'Kadang-kadang' },
						{ value: 4, label: 'Sering' },
						{ value: 5, label: 'Selalu' }
					]
				},
				{
					id: 9,
					text: 'Saya merasa tidak berharga atau bersalah tanpa alasan kuat',
					options: [
						{ value: 1, label: 'Tidak pernah' },
						{ value: 2, label: 'Jarang' },
						{ value: 3, label: 'Kadang-kadang' },
						{ value: 4, label: 'Sering' },
						{ value: 5, label: 'Selalu' }
					]
				},
				{
					id: 10,
					text: 'Saya kesulitan untuk tidur atau terlalu banyak tidur',
					options: [
						{ value: 1, label: 'Tidak pernah' },
						{ value: 2, label: 'Jarang' },
						{ value: 3, label: 'Kadang-kadang' },
						{ value: 4, label: 'Sering' },
						{ value: 5, label: 'Selalu' }
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
		
		// For the combined stress & depression assessment, calculate separate scores
		let stressScore = 0;
		let depressionScore = 0;
		for (let i = 1; i <= 5; i++) {
			stressScore += answers[i] || 0;
		}
		// Questions 6-10 are depression questions
		for (let i = 6; i <= 10; i++) {
			depressionScore += answers[i] || 0;
		}
		
		let interpretation = '';
		let recommendation = '';
		
		if (language === 'id') {
			// Interpret stress score
			let stressInterpretation = '';
			if (stressScore >= 5 && stressScore <= 10) {
				stressInterpretation = 'Rendah';
			} else if (stressScore >= 11 && stressScore <= 18) {
				stressInterpretation = 'Sedang';
			} else if (stressScore >= 19 && stressScore <= 25) {
				stressInterpretation = 'Tinggi';
			}
			
			// Interpret depression score
			let depressionInterpretation = '';
			if (depressionScore >= 5 && depressionScore <= 10) {
				depressionInterpretation = 'Ringan';
			} else if (depressionScore >= 11 && depressionScore <= 18) {
				depressionInterpretation = 'Sedang';
			} else if (depressionScore >= 19 && depressionScore <= 25) {
				depressionInterpretation = 'Berat';
			}
			
			interpretation = `Stres: ${stressScore} → Tingkat ${stressInterpretation}\\nDepresi: ${depressionScore} → ${depressionInterpretation}`;
			
			if (stressScore <= 10 && depressionScore <= 10) {
				recommendation = 'Sepertinya kamu sedang mengalami sedikit tekanan dan mungkin kelelahan emosional. Coba atur waktu istirahatmu, dan jangan ragu untuk mencari bantuan profesional jika gejala ini terus berlanjut.';
			} else if (stressScore > 18 || depressionScore > 18) {
				recommendation = 'Hasil menunjukkan tingkat stres atau depresi yang tinggi. Sangat disarankan untuk segera mencari bantuan profesional kesehatan mental. Kamu tidak sendiri, dan ada banyak dukungan yang tersedia untukmu.';
			} else {
				recommendation = 'Hasil menunjukkan tingkat stres atau depresi yang sedang. Pertimbangkan untuk berbicara dengan seseorang yang kamu percayai, dan jangan ragu untuk mencari bantuan profesional jika gejala ini terus berlanjut atau memburuk.';
			}
		} else {
			// Interpret stress score
			let stressInterpretation = '';
			if (stressScore >= 5 && stressScore <= 10) {
				stressInterpretation = 'Low';
			} else if (stressScore >= 11 && stressScore <= 18) {
				stressInterpretation = 'Moderate';
			} else if (stressScore >= 19 && stressScore <= 25) {
				stressInterpretation = 'High';
			}
			
			// Interpret depression score
			let depressionInterpretation = '';
			if (depressionScore >= 5 && depressionScore <= 10) {
				depressionInterpretation = 'Mild';
			} else if (depressionScore >= 11 && depressionScore <= 18) {
				depressionInterpretation = 'Moderate';
			} else if (depressionScore >= 19 && depressionScore <= 25) {
				depressionInterpretation = 'Severe';
			}
			
			interpretation = `Stress: ${stressScore} → ${stressInterpretation} level\\nDepression: ${depressionScore} → ${depressionInterpretation}`;
			
			if (stressScore <= 10 && depressionScore <= 10) {
				recommendation = 'It seems you are experiencing some pressure and possibly emotional fatigue. Try to set aside rest time, and don\'t hesitate to seek professional help if these symptoms persist.';
			} else if (stressScore > 18 || depressionScore > 18) {
				recommendation = 'The results show a high level of stress or depression. It is highly recommended to seek professional mental health support immediately. You are not alone, and there is much support available to you.';
			} else {
				recommendation = 'The results show a moderate level of stress or depression. Consider talking to someone you trust, and don\'t hesitate to seek professional help if these symptoms persist or worsen.';
			}
		}
		
		results = {
			totalScore,
			stressScore,
			depressionScore,
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
				stressScore: results.stressScore,
				depressionScore: results.depressionScore,
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
Skor Stres: ${results.stressScore}
Skor Depresi: ${results.depressionScore}
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
Stress Score: ${results.stressScore}
Depression Score: ${results.depressionScore}
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
	<title>{language === 'id' ? 'Tes Stres & Depresi - MentalWell' : 'Stress & Depression Check - MentalWell'}</title>
</svelte:head>

<div class="min-h-screen bg-gradient-to-br from-pink-100 via-purple-50 to-indigo-100 p-6">
	<div class="max-w-4xl mx-auto space-y-6">
		<!-- Header -->
		<div class="text-center">
			<h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">
				{language === 'id' ? 'Tes Stres & Depresi' : 'Stress & Depression Check'}
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