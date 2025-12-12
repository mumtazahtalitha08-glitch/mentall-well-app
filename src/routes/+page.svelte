<script>
	import { getMoodStats, getJournalEntries } from '$lib/utils.js';
	import { onMount } from 'svelte';

	let moodStats = null;
	let journalCount = 0;

	onMount(() => {
		moodStats = getMoodStats();
		journalCount = getJournalEntries().length;
	});
</script>

<svelte:head>
	<title>MentalWell - Your Mental Health Companion</title>
</svelte:head>

<div class="space-y-8">
	<!-- Hero Section -->
	<div class="text-center">
		<h1 class="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-4">
			Welcome to <span class="text-blue-600 dark:text-blue-400">MentalWell</span> 🧠
		</h1>
		<p class="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
			Your personal companion for mental health and wellness. Track your mood, journal your thoughts, assess your mental health, and discover helpful tips for a healthier mind.
		</p>
	</div>

	<!-- Quick Stats -->
	<div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
		<div class="bg-white/70 backdrop-blur-sm dark:bg-gray-800/70 rounded-lg shadow-lg p-6 border border-pink-200/50 dark:border-gray-700">
			<div class="flex items-center">
				<div class="flex-shrink-0">
					<div class="text-3xl">😊</div>
				</div>
				<div class="ml-4">
					<h3 class="text-lg font-medium text-gray-900 dark:text-white">Mood Entries</h3>
					<p class="text-2xl font-bold text-blue-600 dark:text-blue-400">
						{moodStats?.total || 0}
					</p>
				</div>
			</div>
		</div>

		<div class="bg-white/70 backdrop-blur-sm dark:bg-gray-800/70 rounded-lg shadow-lg p-6 border border-purple-200/50 dark:border-gray-700">
			<div class="flex items-center">
				<div class="flex-shrink-0">
					<div class="text-3xl">📝</div>
				</div>
				<div class="ml-4">
					<h3 class="text-lg font-medium text-gray-900 dark:text-white">Journal Entries</h3>
					<p class="text-2xl font-bold text-green-600 dark:text-green-400">
						{journalCount}
					</p>
				</div>
			</div>
		</div>

		<div class="bg-white/70 backdrop-blur-sm dark:bg-gray-800/70 rounded-lg shadow-lg p-6 border border-indigo-200/50 dark:border-gray-700">
			<div class="flex items-center">
				<div class="flex-shrink-0">
					<div class="text-3xl">💯</div>
				</div>
				<div class="ml-4">
					<h3 class="text-lg font-medium text-gray-900 dark:text-white">Weekly Average</h3>
					<p class="text-2xl font-bold text-purple-600 dark:text-purple-400">
						{moodStats?.averageLastWeek ? `${moodStats.averageLastWeek}/5` : 'No data'}
					</p>
				</div>
			</div>
		</div>
	</div>

	<!-- Navigation Cards -->
	<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
		<!-- Mood Tracker Card -->
		<a href="/mood" class="group">
			<div class="bg-white/70 backdrop-blur-sm dark:bg-gray-800/70 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 p-6 border border-pink-200/50 dark:border-gray-700 hover:border-pink-300/70 dark:hover:border-blue-600">
				<div class="text-center">
					<div class="text-6xl mb-4 group-hover:scale-110 transition-transform duration-200">😊</div>
					<h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">Mood Tracker</h3>
					<p class="text-gray-600 dark:text-gray-300">Record how you're feeling and track your emotional patterns over time.</p>
				</div>
			</div>
		</a>

		<!-- Journal Card -->
		<a href="/journal" class="group">
			<div class="bg-white/70 backdrop-blur-sm dark:bg-gray-800/70 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 p-6 border border-purple-200/50 dark:border-gray-700 hover:border-purple-300/70 dark:hover:border-green-600">
				<div class="text-center">
					<div class="text-6xl mb-4 group-hover:scale-110 transition-transform duration-200">📝</div>
					<h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">Journal</h3>
					<p class="text-gray-600 dark:text-gray-300">Write down your thoughts, experiences, and reflections in your personal journal.</p>
				</div>
			</div>
		</a>

		<!-- Self-Assessment Card -->
		<a href="/assessment" class="group">
			<div class="bg-white/70 backdrop-blur-sm dark:bg-gray-800/70 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 p-6 border border-pink-200/50 dark:border-gray-700 hover:border-pink-300/70 dark:hover:border-pink-600">
				<div class="text-center">
					<div class="text-6xl mb-4 group-hover:scale-110 transition-transform duration-200">🧠</div>
					<h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">Self-Assessment</h3>
					<p class="text-gray-600 dark:text-gray-300">Take psychological tests to detect symptoms of anxiety, depression, and burnout.</p>
				</div>
			</div>
		</a>

		<!-- Tips Card -->
		<a href="/tips" class="group">
			<div class="bg-white/70 backdrop-blur-sm dark:bg-gray-800/70 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 p-6 border border-indigo-200/50 dark:border-gray-700 hover:border-indigo-300/70 dark:hover:border-purple-600">
				<div class="text-center">
					<div class="text-6xl mb-4 group-hover:scale-110 transition-transform duration-200">💡</div>
					<h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">Mental Health Tips</h3>
					<p class="text-gray-600 dark:text-gray-300">Discover helpful tips and techniques for maintaining good mental health.</p>
				</div>
			</div>
		</a>
	</div>

	<!-- Daily Inspiration -->
	<div class="bg-gradient-to-r from-pink-100/80 to-purple-100/80 backdrop-blur-sm dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg p-8 text-center border border-pink-200/50 dark:border-blue-800 shadow-lg">
		<h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">Daily Reminder</h2>
		<p class="text-lg text-gray-700 dark:text-gray-200 max-w-2xl mx-auto">
			"Your mental health is a priority. Your happiness is essential. Your self-care is a necessity."
		</p>
		<p class="text-sm text-gray-500 dark:text-gray-400 mt-2">Take a moment today to check in with yourself ❤️</p>
	</div>
</div>