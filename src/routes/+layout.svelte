<script>
	import '../app.css';
	import { darkMode, currentLanguage } from '$lib/stores.js';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';

	let { children } = $props();

	onMount(() => {
		darkMode.init();
		currentLanguage.init();
	});

	// Apply dark mode class to html element
	$effect(() => {
		if (typeof document !== 'undefined') {
			if ($darkMode) {
				document.documentElement.classList.add('dark');
			} else {
				document.documentElement.classList.remove('dark');
			}
		}
	});

	function toggleLanguage() {
		const newLang = $currentLanguage === 'en' ? 'id' : 'en';
		currentLanguage.setLanguage(newLang);
	}

	// Translations for navigation
	function getTranslation(key) {
		const translations = {
			en: {
				home: 'Home',
				moodTracker: 'Mood Tracker',
				journal: 'Journal',
				assessment: 'Self-Assessment',
				tips: 'Tips',
				darkMode: 'Toggle dark mode',
				language: 'Switch to Indonesian'
			},
			id: {
				home: 'Beranda',
				moodTracker: 'Pelacak Mood',
				journal: 'Jurnal',
				assessment: 'Self-Assessment',
				tips: 'Tips',
				darkMode: 'Aktifkan mode gelap',
				language: 'Ganti ke Bahasa Inggris'
			}
		};
		return translations[$currentLanguage]?.[key] || key;
	}
</script>

<svelte:head>
	<title>MentalWell</title>
</svelte:head>

<div class="min-h-screen bg-gradient-to-br from-pink-100 via-purple-50 to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-200">
	<!-- Navigation Header -->
	<nav class="bg-white/80 backdrop-blur-sm dark:bg-gray-800/80 shadow-lg border-b border-pink-200/50 dark:border-gray-700">
		<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
			<div class="flex justify-between items-center h-16">
				<!-- Logo -->
				<div class="flex items-center">
					<a href="/" class="text-2xl font-bold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors">
						🧠 MentalWell
					</a>
				</div>

				<!-- Navigation Links -->
				<div class="hidden md:flex items-center space-x-8">
					<a 
						href="/" 
						class="{$page.url.pathname === '/' ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400' : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'} px-3 py-2 text-sm font-medium transition-colors"
					>
						{getTranslation('home')}
					</a>
					<a 
						href="/mood" 
						class="{$page.url.pathname === '/mood' ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400' : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'} px-3 py-2 text-sm font-medium transition-colors"
					>
						{getTranslation('moodTracker')}
					</a>
					<a 
						href="/journal" 
						class="{$page.url.pathname === '/journal' ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400' : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'} px-3 py-2 text-sm font-medium transition-colors"
					>
						{getTranslation('journal')}
					</a>
					<a 
						href="/assessment" 
						class="{$page.url.pathname === '/assessment' ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400' : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'} px-3 py-2 text-sm font-medium transition-colors"
					>
						{getTranslation('assessment')}
					</a>
					<a 
						href="/tips" 
						class="{$page.url.pathname === '/tips' ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400' : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'} px-3 py-2 text-sm font-medium transition-colors"
					>
						{getTranslation('tips')}
					</a>
				</div>

				<!-- Controls -->
				<div class="flex items-center space-x-2">
					
					<!-- Language Toggle -->
					<button 
						onclick={() => toggleLanguage()} 
						class="px-3 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors text-xs font-medium"
						title={getTranslation('language')}
					>
						🌍 {$currentLanguage === 'id' ? 'EN' : 'ID'}
					</button>
								
					<!-- Dark Mode Toggle -->
					<button 
						onclick={() => darkMode.toggle()} 
						class="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
						title={getTranslation('darkMode')}
					>
						{$darkMode ? '☀️' : '🌙'}
					</button>
				</div>
			</div>
		</div>

		<!-- Mobile Navigation -->
		<div class="md:hidden border-t border-pink-200/50 dark:border-gray-700">
			<div class="px-2 pt-2 pb-3 space-y-1 bg-white/80 backdrop-blur-sm dark:bg-gray-800/80">
				<!-- Mobile Language & Dark Mode Toggle -->
				<div class="flex justify-between items-center px-3 py-2">
					<button 
						onclick={() => toggleLanguage()} 
						class="px-3 py-1 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors text-xs font-medium"
						title={getTranslation('language')}
					>
						🌍 {$currentLanguage === 'id' ? 'EN' : 'ID'}
					</button>
					<button 
						onclick={() => darkMode.toggle()} 
						class="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
						title={getTranslation('darkMode')}
					>
						{$darkMode ? '☀️' : '🌙'}
					</button>
				</div>
				
				<a 
					href="/" 
					class="{$page.url.pathname === '/' ? 'bg-blue-50 dark:bg-blue-900 text-blue-600 dark:text-blue-400' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'} block px-3 py-2 rounded-md text-base font-medium transition-colors"
				>
					{getTranslation('home')}
				</a>
				<a 
					href="/mood" 
					class="{$page.url.pathname === '/mood' ? 'bg-blue-50 dark:bg-blue-900 text-blue-600 dark:text-blue-400' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'} block px-3 py-2 rounded-md text-base font-medium transition-colors"
				>
					{getTranslation('moodTracker')}
				</a>
				<a 
					href="/journal" 
					class="{$page.url.pathname === '/journal' ? 'bg-blue-50 dark:bg-blue-900 text-blue-600 dark:text-blue-400' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'} block px-3 py-2 rounded-md text-base font-medium transition-colors"
				>
					{getTranslation('journal')}
				</a>
				<a 
					href="/assessment" 
					class="{$page.url.pathname === '/assessment' ? 'bg-blue-50 dark:bg-blue-900 text-blue-600 dark:text-blue-400' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'} block px-3 py-2 rounded-md text-base font-medium transition-colors"
				>
					{getTranslation('assessment')}
				</a>
				<a 
					href="/tips" 
					class="{$page.url.pathname === '/tips' ? 'bg-blue-50 dark:bg-blue-900 text-blue-600 dark:text-blue-400' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'} block px-3 py-2 rounded-md text-base font-medium transition-colors"
				>
					{getTranslation('tips')}
				</a>
			</div>
		</div>
	</nav>

	<!-- Main Content -->
	<main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
		{@render children?.()}
	</main>

	<!-- Footer -->
	<footer class="bg-white/80 backdrop-blur-sm dark:bg-gray-800/80 border-t border-pink-200/50 dark:border-gray-700 mt-8">
		<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
			<div class="md:flex md:items-center md:justify-between">
				<div class="flex justify-center md:justify-start">
					<div class="flex items-center">
						<span class="text-2xl font-bold text-blue-600 dark:text-blue-400">🧠</span>
						<span class="ml-2 text-xl font-bold text-gray-900 dark:text-white">MentalWell</span>
					</div>
				</div>
				<div class="mt-4 md:mt-0 flex justify-center space-x-6">
					<a href="/" class="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">
						{getTranslation('home')}
					</a>
					<a href="/mood" class="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">
						{getTranslation('moodTracker')}
					</a>
					<a href="/journal" class="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">
						{getTranslation('journal')}
					</a>
					<a href="/assessment" class="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">
						{getTranslation('assessment')}
					</a>
					<a href="/tips" class="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">
						{getTranslation('tips')}
					</a>
				</div>
			</div>
			<div class="mt-4 pt-4 border-t border-pink-200/50 dark:border-gray-700 text-center">
				<p class="text-sm text-gray-600 dark:text-gray-400">
					{$currentLanguage === 'id' 
						? '© 2023 MentalWell. Semua hak dilindungi. Aplikasi ini dimaksudkan untuk mendukung kesehatan mental dan bukan pengganti layanan kesehatan profesional.' 
						: '© 2023 MentalWell. All rights reserved. This app is intended to support mental health and is not a substitute for professional healthcare services.'}
				</p>
				<p class="mt-2 text-xs text-gray-500 dark:text-gray-500">
					{$currentLanguage === 'id' 
						? 'Jika Anda sedang mengalami krisis mental, segera hubungi layanan darurat atau profesional kesehatan mental di daerah Anda.' 
						: 'If you are experiencing a mental health crisis, please contact emergency services or a mental health professional in your area immediately.'}
				</p>
				<p class="mt-2 text-xs text-gray-500 dark:text-gray-500">
					{$currentLanguage === 'id' 
						? 'Website dibuat oleh Talitha Mumtazah Rosadi - MA KHA Wahid Hasyim Bangil' 
						: 'Website created by Talitha Mumtazah Rosadi - MA KHA Wahid Hasyim Bangil'}
				</p>
			</div>
		</div>
	</footer>
</div>
