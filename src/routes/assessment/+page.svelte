<script>
	import { onMount } from 'svelte';
	import { currentLanguage } from '$lib/stores.js';
	import { goto } from '$app/navigation';

	// Assessment data
	const assessments = {
		en: [
			{
				id: 'anxiety',
				title: 'Anxiety Screening',
				description: 'A brief assessment to detect symptoms of anxiety',
				icon: '😰'
			},
			{
				id: 'depression',
				title: 'Depression Screening',
				description: 'A brief assessment to detect symptoms of depression',
				icon: '😔'
			},
			{
				id: 'burnout',
				title: 'Burnout Assessment',
				description: 'A brief assessment to detect symptoms of burnout',
				icon: '🔥'
			},
			{
				id: 'stress',
				title: 'Stress Assessment',
				description: 'A brief assessment to detect symptoms of stress',
				icon: '💥'
			},
			{
				id: 'stress_depression',
				title: 'Stress & Depression Check',
				description: 'A combined assessment to detect symptoms of stress and depression',
				icon: '🌿'
			}
		],
		id: [
			{
				id: 'anxiety',
				title: 'Tes Kecemasan',
				description: 'Tes singkat untuk mendeteksi gejala kecemasan',
				icon: '😰'
			},
			{
				id: 'depression',
				title: 'Tes Depresi',
				description: 'Tes singkat untuk mendeteksi gejala depresi',
				icon: '😔'
			},
			{
				id: 'burnout',
				title: 'Tes Burnout',
				description: 'Tes singkat untuk mendeteksi gejala burnout',
				icon: '🔥'
			},
			{
				id: 'stress',
				title: 'Tes Stres',
				description: 'Tes singkat untuk mendeteksi gejala stres',
				icon: '💥'
			},
			{
				id: 'stress_depression',
				title: 'Tes Stres & Depresi',
				description: 'Tes gabungan untuk mendeteksi gejala stres dan depresi',
				icon: '🌿'
			}
		]
	};

	// State variables
	let showHistory = false;
	let assessmentHistory = [];

	// Get current language assessments
	let language = 'id'; // Default to Indonesian
	
	$effect(() => {
		console.log('Current language from store:', $currentLanguage);
		language = $currentLanguage || 'id';
		console.log('Language variable set to:', language);
	});

	function getAssessments() {
		console.log('Getting assessments for language:', language);
		console.log('Available assessments:', assessments);
		const result = assessments[language] || assessments['id'];
		console.log('Returning assessments:', result);
		return result;
	}

	function startAssessment(assessment) {
		console.log('Starting assessment:', assessment);
		// Navigate to the specific assessment page
		goto(`/assessment/${assessment.id}`);
	}

	function toggleHistory() {
		showHistory = !showHistory;
		if (showHistory) {
			loadAssessmentHistory();
		}
	}

	function loadAssessmentHistory() {
		if (typeof window !== 'undefined') {
			const stored = localStorage.getItem('mentalwell_assessment_history');
			assessmentHistory = stored ? JSON.parse(stored) : [];
		}
	}

	function clearHistory() {
		if (typeof window !== 'undefined' && confirm(language === 'id' ? 
			'Apakah Anda yakin ingin menghapus riwayat tes?' : 
			'Are you sure you want to clear your test history?')) {
			assessmentHistory = [];
			localStorage.removeItem('mentalwell_assessment_history');
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
</script>

<svelte:head>
	<title>{language === 'id' ? 'Tes Psikologi - MentalWell' : 'Psychological Tests - MentalWell'}</title>
</svelte:head>

<div class="min-h-screen bg-gradient-to-br from-pink-100 via-purple-50 to-indigo-100 p-6">
	<div class="max-w-4xl mx-auto space-y-6">
		<!-- Header -->
		<div class="text-center">
			<h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">
				{language === 'id' ? 'Tes Psikologi & Self-Assessment' : 'Psychological Tests & Self-Assessment'}
			</h1>
			<p class="text-gray-600 dark:text-gray-300">
				{language === 'id' 
					? 'Tes singkat berbasis sains untuk mendeteksi gejala kecemasan, depresi, burnout, dsb.' 
					: 'Brief science-based tests to detect symptoms of anxiety, depression, burnout, etc.'}
			</p>
		</div>

		{#if !showHistory}
			<!-- Assessment Selection -->
			<div class="bg-white/70 backdrop-blur-sm dark:bg-gray-800/70 rounded-lg shadow-lg p-6 border border-purple-200/50 dark:border-gray-700">
				<div class="flex justify-between items-center mb-4">
					<h2 class="text-xl font-semibold text-gray-900 dark:text-white">
						{language === 'id' ? 'Pilih Tes' : 'Select a Test'}
					</h2>
					<button 
						on:click={toggleHistory}
						class="text-sm bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-lg transition-colors"
					>
						{language === 'id' ? 'Riwayat' : 'History'}
					</button>
				</div>
				<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
					{#each getAssessments() as assessment}
						<div 
							class="bg-white dark:bg-gray-700 rounded-lg shadow p-4 border border-gray-200 dark:border-gray-600 hover:shadow-md transition-shadow cursor-pointer flex flex-col items-center text-center"
							role="button"
							aria-label="{assessment.title}"
							on:click={() => startAssessment(assessment)}
						>
							<div class="text-3xl mb-2">{assessment.icon}</div>
							<h3 class="font-semibold text-gray-900 dark:text-white">{assessment.title}</h3>
							<p class="text-sm text-gray-600 dark:text-gray-300 mt-1">{assessment.description}</p>
						</div>
					{/each}
				</div>
			</div>
		{:else}
			<!-- Assessment History -->
			<div class="bg-white/70 backdrop-blur-sm dark:bg-gray-800/70 rounded-lg shadow-lg p-6 border border-purple-200/50 dark:border-gray-700">
				<div class="flex justify-between items-center mb-4">
					<h2 class="text-xl font-semibold text-gray-900 dark:text-white">
						{language === 'id' ? 'Riwayat Tes' : 'Test History'}
					</h2>
					<div class="flex gap-2">
						<button 
							on:click={clearHistory}
							class="text-sm bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-lg transition-colors"
							disabled={assessmentHistory.length === 0}
						>
							{language === 'id' ? 'Hapus Semua' : 'Clear All'}
						</button>
						<button 
							on:click={toggleHistory}
							class="text-sm bg-gray-600 hover:bg-gray-700 text-white px-3 py-1 rounded-lg transition-colors"
						>
							{language === 'id' ? 'Kembali' : 'Back'}
						</button>
					</div>
				</div>
				
				{#if assessmentHistory.length === 0}
					<div class="text-center py-8 text-gray-500 dark:text-gray-400">
						<div class="text-5xl mb-4">📋</div>
						<p>{language === 'id' ? 'Belum ada riwayat tes' : 'No test history yet'}</p>
					</div>
				{:else}
					<div class="space-y-4 max-h-96 overflow-y-auto">
						{#each assessmentHistory as historyEntry}
							<div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 border border-gray-200 dark:border-gray-600">
								<div class="flex justify-between items-start">
									<div class="flex items-center space-x-3">
										<div class="text-2xl">{historyEntry.assessmentIcon}</div>
										<div>
											<h3 class="font-semibold text-gray-900 dark:text-white">{historyEntry.assessmentTitle}</h3>
											<p class="text-sm text-gray-600 dark:text-gray-300">
												{formatDate(historyEntry.timestamp)}
											</p>
										</div>
									</div>
									<div class="text-right">
										<div class="text-lg font-bold text-blue-600 dark:text-blue-400">
											{historyEntry.totalScore}
										</div>
										<div class="text-sm text-gray-600 dark:text-gray-300">
											{historyEntry.interpretation}
										</div>
									</div>
								</div>
							</div>
						{/each}
					</div>
				{/if}
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