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

	// Translations for navigation with Gen Z flavor
	function getTranslation(key) {
		const translations = {
			en: {
				home: 'Home 🏠',
				moodTracker: 'Mood Vibe 🧬',
				journal: 'Dear Diary 📝',
				assessment: 'Vibe Check 🧠',
				tips: 'Pro Tips 💡',
				darkMode: 'Vibe Shift',
				language: 'Switch to ID 🇮🇩'
			},
			id: {
				home: 'Home 🏠',
				moodTracker: 'Cek Mood 🧬',
				journal: 'Curhat Zone 📝',
				assessment: 'Vibe Check 🧠',
				tips: 'Pro Tips 💡',
				darkMode: 'Ganti Vibe',
				language: 'Ganti ke EN 🇺🇸'
			}
		};
		return translations[$currentLanguage]?.[key] || key;
	}
</script>

<svelte:head>
	<title>MentalWell | Gen Z Mental Health</title>
</svelte:head>

<div class="min-h-screen bg-gradient-to-br from-[#FFDEE9] via-[#B5FFFC] to-[#fbc2eb] dark:from-[#1a0b2e] dark:via-[#09090b] dark:to-[#17171e] transition-colors duration-700 font-sans selection:bg-purple-500 selection:text-white">
	
	<!-- Floating Navigation Bar (Glassmorphism) -->
	<nav class="sticky top-4 z-50 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pointer-events-none">
		<div class="bg-white/40 dark:bg-black/40 backdrop-blur-2xl rounded-[2rem] border border-white/50 dark:border-white/10 shadow-2xl pointer-events-auto transition-all duration-300">
			<div class="flex justify-between items-center h-16 px-6">
				<!-- Logo with Vibe -->
				<div class="flex items-center">
					<a href="/" class="text-xl md:text-2xl font-black bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-500 dark:from-cyan-400 dark:to-blue-500 tracking-tighter hover:scale-105 transition-transform">
						🧠 MENTALWELL
					</a>
				</div>

				<!-- Desktop Navigation (Hidden on small screens) -->
				<div class="hidden lg:flex items-center space-x-1">
					{#each ['home', 'moodTracker', 'journal', 'assessment', 'tips'] as link}
						{@const path = link === 'home' ? '/' : `/${link.replace('Tracker', '').toLowerCase()}`}
						<a 
							href={path === '/mood' ? '/mood' : (path === '/journal' ? '/journal' : (path === '/assessment' ? '/assessment' : (path === '/tips' ? '/tips' : '/')))}
							class="px-4 py-2 rounded-2xl text-sm font-bold transition-all duration-300
								{ ($page.url.pathname === path || ($page.url.pathname === '/' && link === 'home')) 
									? 'bg-purple-600 text-white shadow-lg shadow-purple-500/30' 
									: 'text-gray-700 dark:text-gray-300 hover:bg-white/50 dark:hover:bg-white/10' }"
						>
							{getTranslation(link)}
						</a>
					{/each}
				</div>

				<!-- Controls -->
				<div class="flex items-center space-x-3">
					<!-- Language Toggle -->
					<button 
						onclick={toggleLanguage} 
						class="px-3 py-1.5 rounded-xl bg-white/60 dark:bg-white/5 text-gray-700 dark:text-gray-300 border border-white/50 dark:border-white/10 hover:bg-white/80 dark:hover:bg-white/10 transition-all font-black text-[10px] tracking-widest uppercase"
					>
						{$currentLanguage === 'id' ? '🇺🇸 EN' : '🇮🇩 ID'}
					</button>
								
					<!-- Dark Mode Toggle -->
					<button 
						onclick={() => darkMode.toggle()} 
						class="p-2.5 rounded-xl bg-white/60 dark:bg-white/5 text-gray-700 dark:text-gray-300 border border-white/50 dark:border-white/10 hover:bg-white/80 dark:hover:bg-white/10 transition-all shadow-sm"
					>
						{$darkMode ? '✨' : '🌙'}
					</button>
				</div>
			</div>
		</div>
	</nav>

	<!-- Main Content Area -->
	<main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 min-h-[calc(100vh-200px)]">
		<div class="animate-in fade-in duration-1000">
			{@render children?.()}
		</div>
	</main>

	<!-- Footer with Gen Z Style -->
	<footer class="mt-20 border-t border-white/30 dark:border-white/5 bg-white/20 dark:bg-black/20 backdrop-blur-md">
		<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
			<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
				<!-- Brand Section -->
				<div class="space-y-4">
					<div class="flex items-center gap-2">
						<span class="text-3xl">🧠</span>
						<span class="text-2xl font-black text-gray-900 dark:text-white tracking-tighter uppercase italic">MentalWell</span>
					</div>
					<p class="text-sm text-gray-600 dark:text-gray-400 font-medium leading-relaxed">
						{$currentLanguage === 'id' 
							? 'Bestie kesehatan mental lo. Biar mental makin op dan ga gampang kena mental.' 
							: 'Your mental health bestie. Stay based, stay balanced, stay op.'}
					</p>
				</div>

				<!-- Quick Links -->
				<div class="space-y-4">
					<h4 class="text-xs font-black uppercase tracking-widest text-purple-600 dark:text-cyan-400">Navigasi</h4>
					<div class="flex flex-col space-y-2">
						{#each ['home', 'moodTracker', 'journal', 'assessment', 'tips'] as link}
							<a href={link === 'home' ? '/' : `/${link.replace('Tracker', '').toLowerCase()}`} class="text-sm font-bold text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-cyan-400 transition-colors">
								{getTranslation(link)}
							</a>
						{/each}
					</div>
				</div>

				<!-- Credits -->
				<div class="lg:col-span-2 space-y-4">
					<h4 class="text-xs font-black uppercase tracking-widest text-purple-600 dark:text-cyan-400">Created with ❤️</h4>
					<p class="text-sm font-bold text-gray-800 dark:text-gray-200">
						Created by <span class="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500 font-black px-1">Talitha Mumtazah Rosadi</span>
					</p>
					<p class="text-[10px] uppercase font-black tracking-tighter text-gray-500 dark:text-gray-600">
						MA KHA Wahid Hasyim Bangil
					</p>
				</div>
			</div>

			<!-- Legal / Disclaimer -->
			<div class="mt-12 pt-8 border-t border-white/20 dark:border-white/5 text-center space-y-4">
				<p class="text-[10px] text-gray-500 dark:text-gray-600 font-black uppercase tracking-[0.2em]">
					&copy; 2026 MENTALWELL. ALL RIGHTS RESERVED. NO CAP.
				</p>
				<p class="text-xs text-gray-600 dark:text-gray-400 max-w-3xl mx-auto italic font-medium leading-relaxed">
					"{$currentLanguage === 'id' 
						? 'Aplikasi ini buat support kesehatan mental aja ya, bukan gantiin bantuan profesional. Kalo ngerasa butuh bantuan, buruan cari ahli. We care about you.' 
						: 'This app is for mental health vibes and support, not a replacement for professional help. If things get heavy, talk to a pro. We care about you.'}"
				</p>
			</div>
		</div>
	</footer>
</div>

<style>
	:global(html) {
		scroll-behavior: smooth;
	}
	
	:global(.animate-in) {
		animation-fill-mode: forwards;
		animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
	}

	@keyframes fade-in {
		from { opacity: 0; }
		to { opacity: 1; }
	}

	.fade-in { animation: fade-in 0.5s ease-out; }
</style>
