<script>
	import { MOODS, saveMood, getMoods, getMoodStats, getMoodGraphData, getMoodInsights, getMoodColor } from '$lib/utils.js';
	import { onMount } from 'svelte';

	let selectedMood = null;
	let moods = [];
	let stats = null;
	let showSuccess = false;
	let graphData = [];
	let insights = [];
	let graphPeriod = 'weekly';
	let detailedGraphData = [];

	onMount(() => {
		moods = getMoods();
		stats = getMoodStats();
		graphData = getMoodGraphData(graphPeriod);
		detailedGraphData = getDetailedMoodGraphData(graphPeriod);
		insights = getMoodInsights();
	});

	function handleMoodSelect(mood) {
		selectedMood = mood;
		saveMood(mood);
		moods = getMoods(); // Refresh the list
		stats = getMoodStats(); // Refresh stats
		graphData = getMoodGraphData(graphPeriod); // Refresh graph
		detailedGraphData = getDetailedMoodGraphData(graphPeriod); // Refresh detailed graph
		insights = getMoodInsights(); // Refresh insights
		showSuccess = true;
		setTimeout(() => showSuccess = false, 3000);
	}

	function toggleGraphPeriod() {
		graphPeriod = graphPeriod === 'weekly' ? 'monthly' : 'weekly';
		graphData = getMoodGraphData(graphPeriod);
		detailedGraphData = getDetailedMoodGraphData(graphPeriod);
	}

	// New function to get more detailed graph data with trend analysis
	function getDetailedMoodGraphData(period = 'weekly') {
		if (typeof window === 'undefined') return [];
		
		const moods = getMoods();
		const now = new Date();
		let daysToCheck = 7;
		
		if (period === 'monthly') {
			daysToCheck = 30;
		}
		
		const startDate = new Date(now.getTime() - daysToCheck * 24 * 60 * 60 * 1000);
		
		// Create array with data for each day
		const graphData = [];
		for (let i = daysToCheck - 1; i >= 0; i--) {
			const date = new Date(now);
			date.setDate(date.getDate() - i);
			
			const dayMoods = moods.filter(mood => {
				const moodDate = new Date(mood.timestamp);
				return moodDate.toDateString() === date.toDateString();
			});
			
			const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
			const fullDate = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
			
			if (dayMoods.length > 0) {
				const average = dayMoods.reduce((sum, mood) => sum + mood.mood.value, 0) / dayMoods.length;
				const moodDistribution = {};
				
				// Calculate distribution of moods for this day
				dayMoods.forEach(mood => {
					moodDistribution[mood.mood.value] = (moodDistribution[mood.mood.value] || 0) + 1;
				});
				
				graphData.push({
					dayName,
					fullDate,
					value: Math.round(average * 10) / 10,
					count: dayMoods.length,
					distribution: moodDistribution,
					trend: calculateTrend(graphData, dayMoods, i)
				});
			} else {
				graphData.push({
					dayName,
					fullDate,
					value: null,
					count: 0,
					distribution: {},
					trend: null
				});
			}
		}
		
		return graphData;
	}

	// Function to calculate trend for a day
	function calculateTrend(graphData, dayMoods, index) {
		if (index === 0 || graphData.length === 0) return null;
		
		const currentAvg = dayMoods.reduce((sum, mood) => sum + mood.mood.value, 0) / dayMoods.length;
		const previousData = graphData[graphData.length - 1];
		
		if (previousData && previousData.value !== null) {
			if (currentAvg > previousData.value + 0.5) return 'up';
			if (currentAvg < previousData.value - 0.5) return 'down';
			return 'stable';
		}
		
		return null;
	}

	function formatDate(timestamp) {
		return new Date(timestamp).toLocaleDateString('en-US', {
			weekday: 'short',
			year: 'numeric',
			month: 'short',
			day: 'numeric'
		});
	}

	function formatTime(timestamp) {
		return new Date(timestamp).toLocaleTimeString('en-US', {
			hour: '2-digit',
			minute: '2-digit'
		});
	}

	// Function to get overall mood trend
	function getOverallTrend() {
		if (detailedGraphData.length < 2) return null;
		
		const recentData = detailedGraphData.filter(d => d.value !== null);
		if (recentData.length < 2) return null;
		
		const firstValue = recentData[0].value;
		const lastValue = recentData[recentData.length - 1].value;
		
		if (lastValue > firstValue + 0.5) return 'improving';
		if (lastValue < firstValue - 0.5) return 'declining';
		return 'stable';
	}

	// Function to get mood count for distribution chart
	function getMoodCount(moodValue) {
		return moods.filter(mood => mood.mood.value === moodValue).length;
	}

	// Function to get mood pattern insights
	function getMoodPatterns() {
		if (moods.length === 0) return [];
		
		const patterns = [];
		
		// Frequency of each mood
		const moodCounts = {};
		moods.forEach(mood => {
			moodCounts[mood.mood.value] = (moodCounts[mood.mood.value] || 0) + 1;
		});
		
		// Find most and least frequent moods
		const moodValues = Object.keys(moodCounts);
		if (moodValues.length > 0) {
			const mostFrequent = moodValues.reduce((a, b) => moodCounts[a] > moodCounts[b] ? a : b);
			const leastFrequent = moodValues.reduce((a, b) => moodCounts[a] < moodCounts[b] ? a : b);
			
			const mostFrequentMood = MOODS.find(m => m.value == mostFrequent);
			const leastFrequentMood = MOODS.find(m => m.value == leastFrequent);
			
			if (mostFrequentMood) {
				patterns.push({
					type: 'most_frequent',
					title: 'Most Common Mood',
					value: mostFrequentMood.label,
					count: moodCounts[mostFrequent],
					emoji: mostFrequentMood.emoji,
					percentage: Math.round((moodCounts[mostFrequent] / moods.length) * 100)
				});
			}
			
			if (leastFrequentMood) {
				patterns.push({
					type: 'least_frequent',
					title: 'Least Common Mood',
					value: leastFrequentMood.label,
					count: moodCounts[leastFrequent],
					emoji: leastFrequentMood.emoji,
					percentage: Math.round((moodCounts[leastFrequent] / moods.length) * 100)
				});
			}
		}
		
		return patterns;
	}
</script>

<svelte:head>
	<title>Mood Tracker - MentalWell</title>
</svelte:head>

<div class="min-h-screen bg-gradient-to-br from-pink-100 via-purple-50 to-indigo-100 p-6">
<div class="max-w-4xl mx-auto space-y-8">
	<!-- Header ---->
	<div class="text-center">
		<h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">
			How are you feeling today? 🌟
		</h1>
		<p class="text-gray-600 dark:text-gray-300">
			Select your current mood to track your emotional well-being
		</p>
	</div>

	<!-- Success Message -->
	{#if showSuccess}
		<div class="bg-green-100/80 backdrop-blur-sm dark:bg-green-900/50 border border-green-300/50 dark:border-green-800 rounded-lg p-4 text-center shadow-lg">
			<p class="text-green-800 dark:text-green-200 font-medium">
				✅ Mood recorded successfully! Keep tracking your journey.
			</p>
		</div>
	{/if}

	<!-- Mood Selection -->
	<div class="bg-white/70 backdrop-blur-sm dark:bg-gray-800/70 rounded-lg shadow-lg p-6 border border-pink-200/50 dark:border-gray-700">
		<h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-6 text-center">
			Select Your Mood
		</h2>
		<div class="grid grid-cols-5 gap-4">
			{#each MOODS as mood}
				<button
					onclick={() => handleMoodSelect(mood)}
					class="p-4 rounded-lg border-2 transition-all duration-200 hover:scale-105 {selectedMood?.emoji === mood.emoji ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/50' : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'}"
				>
					<div class="text-4xl mb-2">{mood.emoji}</div>
					<div class="text-sm font-medium text-gray-900 dark:text-white">{mood.label}</div>
				</button>
			{/each}
		</div>
	</div>

	<!-- Stats Overview -->
	{#if stats}
		<div class="grid grid-cols-1 md:grid-cols-3 gap-6">
			<div class="bg-white/70 backdrop-blur-sm dark:bg-gray-800/70 rounded-lg shadow-lg p-6 border border-pink-200/50 dark:border-gray-700">
				<h3 class="text-lg font-medium text-gray-900 dark:text-white mb-2">Total Entries</h3>
				<p class="text-3xl font-bold text-blue-600 dark:text-blue-400">{stats.total}</p>
			</div>
			<div class="bg-white/70 backdrop-blur-sm dark:bg-gray-800/70 rounded-lg shadow-lg p-6 border border-purple-200/50 dark:border-gray-700">
				<h3 class="text-lg font-medium text-gray-900 dark:text-white mb-2">This Week</h3>
				<p class="text-3xl font-bold text-green-600 dark:text-green-400">{stats.last7Days}</p>
			</div>
			<div class="bg-white/70 backdrop-blur-sm dark:bg-gray-800/70 rounded-lg shadow-lg p-6 border border-indigo-200/50 dark:border-gray-700">
				<h3 class="text-lg font-medium text-gray-900 dark:text-white mb-2">Weekly Average</h3>
				<p class="text-3xl font-bold text-purple-600 dark:text-purple-400">{stats.averageLastWeek}/5</p>
			</div>
		</div>
	{/if}

	<!-- Enhanced Mood Graph with Trends -->
	{#if detailedGraphData.length > 0}
		<div class="bg-white/70 backdrop-blur-sm dark:bg-gray-800/70 rounded-lg shadow-lg p-6 border border-purple-200/50 dark:border-gray-700">
			<div class="flex justify-between items-center mb-6">
				<h2 class="text-xl font-semibold text-gray-900 dark:text-white">Mood Trends & Patterns</h2>
				<button
					onclick={() => toggleGraphPeriod()}
					class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200 text-sm font-medium"
				>
					{graphPeriod === 'weekly' ? '📊 Switch to Monthly' : '📅 Switch to Weekly'}
				</button>
			</div>
			
			<div class="mb-4">
				<p class="text-sm text-gray-600 dark:text-gray-300">
					{graphPeriod === 'weekly' ? 'Last 7 days' : 'Last 30 days'} mood pattern
				</p>
			</div>
			
			<!-- Trend Summary -->
			{#if getOverallTrend()}
				<div class="mb-6 p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
					<div class="flex items-center">
						<div class="text-2xl mr-3">
							{getOverallTrend() === 'improving' ? '📈' : getOverallTrend() === 'declining' ? '📉' : '➡️'}
						</div>
						<div>
							<h3 class="font-semibold text-gray-900 dark:text-white">
								{getOverallTrend() === 'improving' ? 'Improving Trend' : 
								 getOverallTrend() === 'declining' ? 'Declining Trend' : 'Stable Trend'}
							</h3>
							<p class="text-sm text-gray-600 dark:text-gray-300">
								{getOverallTrend() === 'improving' ? 'Your mood has been improving over this period' : 
								 getOverallTrend() === 'declining' ? 'Your mood has been declining over this period' : 
								 'Your mood has remained relatively stable'}
							</p>
						</div>
					</div>
				</div>
			{/if}
			
			<!-- Detailed Bar Chart -->
			<div class="space-y-4 mb-6">
				{#each detailedGraphData as data}
					<div class="flex items-center space-x-3">
						<div class="w-16 text-xs text-gray-600 dark:text-gray-300 font-medium">
							<div>{data.dayName}</div>
							<div class="text-[10px] text-gray-500">{data.fullDate}</div>
						</div>
						<div class="flex-1 bg-gray-200 dark:bg-gray-600 rounded-full h-10 flex items-center relative">
							{#if data.value !== null}
								<div 
									class="h-10 rounded-full flex items-center justify-center text-white text-sm font-medium transition-all duration-300 flex items-center"
									style="width: {(data.value / 5) * 100}%; background-color: {getMoodColor(Math.round(data.value))}"
								>
									<span class="ml-2">{data.value.toFixed(1)}</span>
									{#if data.trend === 'up'}
										<span class="ml-1 text-xs">↗️</span>
									{:else if data.trend === 'down'}
										<span class="ml-1 text-xs">↘️</span>
									{/if}
								</div>
								<div class="absolute right-2 text-xs text-gray-700 dark:text-gray-300">
									{data.count} entries
								</div>
							{:else}
								<span class="text-gray-500 dark:text-gray-400 text-sm ml-3">No data</span>
							{/if}
						</div>
					</div>
				{/each}
			</div>
			
			<!-- Mood Distribution Visualization -->
			<div class="mt-8">
				<h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Mood Distribution</h3>
				<div class="flex items-end h-20 space-x-1">
					{#each MOODS as mood}
						{@const moodCount = getMoodCount(mood.value)}
						<div class="flex flex-col items-center flex-1">
							<div 
								class="w-full rounded-t transition-all duration-300"
								style="height: {moodCount > 0 ? (moodCount / moods.length) * 100 : 0}%; background-color: {getMoodColor(mood.value)}"
							></div>
							<div class="text-xs mt-1 text-gray-600 dark:text-gray-300">{mood.emoji}</div>
							<div class="text-xs text-gray-500">{moodCount}</div>
						</div>
					{/each}
				</div>
			</div>
			
			<!-- Legend -->
			<div class="mt-6 flex flex-wrap gap-4 text-xs">
				<div class="flex items-center space-x-2">
					<div class="w-3 h-3 rounded-full" style="background-color: {getMoodColor(5)}"></div>
					<span class="text-gray-600 dark:text-gray-300">Very Happy (5)</span>
				</div>
				<div class="flex items-center space-x-2">
					<div class="w-3 h-3 rounded-full" style="background-color: {getMoodColor(4)}"></div>
					<span class="text-gray-600 dark:text-gray-300">Happy (4)</span>
				</div>
				<div class="flex items-center space-x-2">
					<div class="w-3 h-3 rounded-full" style="background-color: {getMoodColor(3)}"></div>
					<span class="text-gray-600 dark:text-gray-300">Neutral (3)</span>
				</div>
				<div class="flex items-center space-x-2">
					<div class="w-3 h-3 rounded-full" style="background-color: {getMoodColor(2)}"></div>
					<span class="text-gray-600 dark:text-gray-300">Sad (2)</span>
				</div>
				<div class="flex items-center space-x-2">
					<div class="w-3 h-3 rounded-full" style="background-color: {getMoodColor(1)}"></div>
					<span class="text-gray-600 dark:text-gray-300">Angry (1)</span>
				</div>
			</div>
		</div>
	{/if}

	<!-- Mood Patterns Summary -->
	{#if getMoodPatterns().length > 0}
		<div class="bg-white/70 backdrop-blur-sm dark:bg-gray-800/70 rounded-lg shadow-lg p-6 border border-indigo-200/50 dark:border-gray-700">
			<h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-6">Mood Patterns Summary</h2>
			
			<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
				{#each getMoodPatterns() as pattern}
					<div class="p-4 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600">
						<div class="flex items-center justify-between">
							<div class="flex items-center">
								<span class="text-2xl mr-3">{pattern.emoji}</span>
								<div>
									<h3 class="font-medium text-gray-900 dark:text-white">{pattern.title}</h3>
									<p class="text-sm text-gray-600 dark:text-gray-300">{pattern.value}</p>
								</div>
							</div>
							<div class="text-right">
								<div class="text-lg font-bold text-gray-900 dark:text-white">{pattern.percentage}%</div>
								<div class="text-xs text-gray-500">({pattern.count} times)</div>
							</div>
						</div>
					</div>
				{/each}
			</div>
		</div>
	{/if}

	<!-- Mood Insights -->
	{#if insights.length > 0}
		<div class="bg-white/70 backdrop-blur-sm dark:bg-gray-800/70 rounded-lg shadow-lg p-6 border border-indigo-200/50 dark:border-gray-700">
			<h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
				🧠 Your Mood Insights
			</h2>
			
			<div class="space-y-4">
				{#each insights as insight}
					<div class="p-4 rounded-lg {insight.type === 'positive' ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800' : 'bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800'}">
						<div class="flex items-start space-x-3">
							<div class="text-2xl">{insight.icon}</div>
							<div>
								<h3 class="font-medium {insight.type === 'positive' ? 'text-green-800 dark:text-green-200' : 'text-yellow-800 dark:text-yellow-200'} mb-1">
									{insight.title}
								</h3>
								<p class="text-sm {insight.type === 'positive' ? 'text-green-700 dark:text-green-300' : 'text-yellow-700 dark:text-yellow-300'}">
									{insight.message}
								</p>
							</div>
						</div>
					</div>
				{/each}
			</div>
		</div>
	{/if}

	<!-- Mood History -->
	<div class="bg-white/70 backdrop-blur-sm dark:bg-gray-800/70 rounded-lg shadow-lg p-6 border border-purple-200/50 dark:border-gray-700">
		<h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-6">Mood History</h2>
		
		{#if moods.length === 0}
			<div class="text-center py-8">
				<div class="text-6xl mb-4">📊</div>
				<p class="text-gray-500 dark:text-gray-400">No mood entries yet. Select your mood above to get started!</p>
			</div>
		{:else}
			<div class="space-y-4 max-h-96 overflow-y-auto">
				{#each moods.slice(0, 20) as mood}
					<div class="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
						<div class="flex items-center space-x-4">
							<div class="text-2xl">{mood.mood.emoji}</div>
							<div>
								<p class="font-medium text-gray-900 dark:text-white">{mood.mood.label}</p>
								<p class="text-sm text-gray-500 dark:text-gray-400">
									{formatDate(mood.timestamp)} at {formatTime(mood.timestamp)}
								</p>
							</div>
						</div>
						<div class="text-right">
							<div class="text-lg font-bold text-gray-900 dark:text-white">{mood.mood.value}/5</div>
						</div>
					</div>
				{/each}
			</div>
			
			{#if moods.length > 20}
				<p class="text-center text-gray-500 dark:text-gray-400 mt-4 text-sm">
					Showing latest 20 entries of {moods.length} total
				</p>
			{/if}
		{/if}
	</div>
</div>
</div>