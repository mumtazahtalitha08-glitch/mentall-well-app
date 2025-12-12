<script>
	import { currentLanguage } from '$lib/stores.js';
	import { onMount } from 'svelte';

	onMount(() => {
		currentLanguage.init();
	});

	// English Tips
	const tipsEN = [
		{
			id: 1,
			category: 'Breathing',
			emoji: '🫁',
			title: 'Deep Breathing Exercise',
			description: 'Practice the 4-7-8 breathing technique to reduce stress and anxiety.',
			steps: [
				'Inhale through your nose for 4 counts',
				'Hold your breath for 7 counts',
				'Exhale through your mouth for 8 counts',
				'Repeat 3-4 times'
			]
		},
		{
			id: 2,
			category: 'Mindfulness',
			emoji: '🧘‍♀️',
			title: '5-Minute Mindfulness',
			description: 'A simple mindfulness practice to ground yourself in the present moment.',
			steps: [
				'Find a comfortable sitting position',
				'Close your eyes and focus on your breath',
				'Notice thoughts without judging them',
				'Gently return focus to breathing when mind wanders',
				'Practice for 5 minutes daily'
			]
		},
		{
			id: 3,
			category: 'Exercise',
			emoji: '🏃‍♂️',
			title: 'Daily Movement',
			description: 'Regular physical activity can significantly improve mental health.',
			steps: [
				'Aim for 30 minutes of activity daily',
				'Start with a 10-minute walk',
				'Try yoga or stretching',
				'Dance to your favorite music',
				'Take stairs instead of elevators'
			]
		},
		{
			id: 4,
			category: 'Sleep',
			emoji: '😴',
			title: 'Better Sleep Hygiene',
			description: 'Good sleep is essential for mental wellbeing and emotional regulation.',
			steps: [
				'Keep a consistent sleep schedule',
				'Create a relaxing bedtime routine',
				'Avoid screens 1 hour before bed',
				'Keep bedroom cool and dark',
				'Limit caffeine after 2 PM'
			]
		},
		{
			id: 5,
			category: 'Grounding',
			emoji: '🌱',
			title: '5-4-3-2-1 Grounding Technique',
			description: 'Use your senses to ground yourself during moments of anxiety or panic.',
			steps: [
				'5 things you can see',
				'4 things you can touch',
				'3 things you can hear',
				'2 things you can smell',
				'1 thing you can taste'
			]
		},
		{
			id: 6,
			category: 'Gratitude',
			emoji: '🙏',
			title: 'Daily Gratitude Practice',
			description: 'Cultivating gratitude can improve mood and overall life satisfaction.',
			steps: [
				'Write down 3 things you\'re grateful for',
				'Be specific about why you\'re grateful',
				'Include small everyday moments',
				'Practice at the same time daily',
				'Share gratitude with others'
			]
		},
		{
			id: 7,
			category: 'Social',
			emoji: '👥',
			title: 'Social Connection',
			description: 'Building and maintaining relationships is crucial for mental health.',
			steps: [
				'Reach out to a friend or family member',
				'Join clubs or groups with shared interests',
				'Practice active listening',
				'Be vulnerable and authentic',
				'Offer help and support to others'
			]
		},
		{
			id: 8,
			category: 'Mindfulness',
			emoji: '📱',
			title: 'Digital Detox',
			description: 'Taking breaks from technology can reduce stress and improve focus.',
			steps: [
				'Set specific phone-free times',
				'Remove social media apps temporarily',
				'Use airplane mode for focused work',
				'Keep phones out of the bedroom',
				'Practice being present without documenting'
			]
		}
	];

	// Indonesian Tips
	const tipsID = [
		{
			id: 1,
			category: 'Pernapasan',
			emoji: '🫁',
			title: 'Latihan Pernapasan Dalam',
			description: 'Praktikkan teknik pernapasan 4-7-8 untuk mengurangi stres dan kecemasan.',
			steps: [
				'Hirup melalui hidung selama 4 hitungan',
				'Tahan napas selama 7 hitungan',
				'Hembuskan melalui mulut selama 8 hitungan',
				'Ulangi 3-4 kali'
			]
		},
		{
			id: 2,
			category: 'Kesadaran',
			emoji: '🧘‍♀️',
			title: 'Kesadaran 5 Menit',
			description: 'Praktik kesadaran sederhana untuk membumikan diri di momen ini.',
			steps: [
				'Temukan posisi duduk yang nyaman',
				'Tutup mata dan fokus pada napas',
				'Perhatikan pikiran tanpa menghakimi',
				'Kembalikan fokus ke pernapasan saat pikiran mengembara',
				'Latihan selama 5 menit setiap hari'
			]
		},
		{
			id: 3,
			category: 'Olahraga',
			emoji: '🏃‍♂️',
			title: 'Gerakan Harian',
			description: 'Aktivitas fisik rutin dapat meningkatkan kesehatan mental secara signifikan.',
			steps: [
				'Target 30 menit aktivitas setiap hari',
				'Mulai dengan jalan kaki 10 menit',
				'Coba yoga atau peregangan',
				'Menari dengan musik favorit',
				'Gunakan tangga daripada lift'
			]
		},
		{
			id: 4,
			category: 'Tidur',
			emoji: '😴',
			title: 'Kebersihan Tidur yang Baik',
			description: 'Tidur yang baik penting untuk kesejahteraan mental dan regulasi emosi.',
			steps: [
				'Jaga jadwal tidur yang konsisten',
				'Buat rutinitas santai sebelum tidur',
				'Hindari layar 1 jam sebelum tidur',
				'Jaga kamar tetap sejuk dan gelap',
				'Batasi kafein setelah jam 2 siang'
			]
		},
		{
			id: 5,
			category: 'Grounding',
			emoji: '🌱',
			title: 'Teknik Grounding 5-4-3-2-1',
			description: 'Gunakan indera untuk membumikan diri saat cemas atau panik.',
			steps: [
				'5 hal yang bisa Anda lihat',
				'4 hal yang bisa Anda sentuh',
				'3 hal yang bisa Anda dengar',
				'2 hal yang bisa Anda cium',
				'1 hal yang bisa Anda rasakan'
			]
		},
		{
			id: 6,
			category: 'Syukur',
			emoji: '🙏',
			title: 'Praktik Rasa Syukur Harian',
			description: 'Menumbuhkan rasa syukur dapat meningkatkan suasana hati dan kepuasan hidup.',
			steps: [
				'Tulis 3 hal yang Anda syukuri',
				'Jelaskan mengapa Anda bersyukur',
				'Sertakan momen-momen kecil sehari-hari',
				'Praktik di waktu yang sama setiap hari',
				'Bagikan rasa syukur dengan orang lain'
			]
		},
		{
			id: 7,
			category: 'Sosial',
			emoji: '👥',
			title: 'Koneksi Sosial',
			description: 'Membangun dan memelihara hubungan sangat penting untuk kesehatan mental.',
			steps: [
				'Hubungi teman atau anggota keluarga',
				'Bergabung dengan klub atau kelompok dengan minat yang sama',
				'Praktik mendengarkan aktif',
				'Bersikap terbuka dan autentik',
				'Tawarkan bantuan dan dukungan kepada orang lain'
			]
		},
		{
			id: 8,
			category: 'Kesadaran',
			emoji: '📱',
			title: 'Detoks Digital',
			description: 'Istirahat dari teknologi dapat mengurangi stres dan meningkatkan fokus.',
			steps: [
				'Tetapkan waktu bebas ponsel',
				'Hapus aplikasi media sosial sementara',
				'Gunakan mode pesawat untuk kerja terfokus',
				'Jauhkan ponsel dari kamar tidur',
				'Praktik hadir tanpa mendokumentasi'
			]
		},
		{
			id: 9,
			category: 'Manajemen Stres',
			emoji: '🧠',
			title: 'Relaksasi Otot Progresif',
			description: 'Menegangkan dan merilekskan kelompok otot secara sistematis untuk mengurangi ketegangan fisik.',
			steps: [
				'Mulai dari jari kaki dan naik ke atas',
				'Tegangkan setiap kelompok otot selama 5 detik',
				'Lepaskan dan rasakan relaksasinya',
				'Lakukan secara sistematis pada setiap bagian tubuh',
				'Akhiri dengan pernapasan dalam dan ketenangan'
			]
		},
		{
			id: 10,
			category: 'Perawatan Diri',
			emoji: '🛁',
			title: 'Ritual Perawatan Diri Harian',
			description: 'Buat rutinitas personal yang memelihara kesejahteraan mental dan fisik Anda.',
			steps: [
				'Mandi air hangat dengan penuh kesadaran',
				'Oleskan lotion atau pelembab dengan niat',
				'Minum secangkir teh atau air hangat',
				'Baca sesuatu yang positif selama 10 menit',
				'Tetapkan niat positif untuk hari itu'
			]
		},
		{
			id: 11,
			category: 'Kreativitas',
			emoji: '🎨',
			title: 'Terapi Ekspresi Kreatif',
			description: 'Gunakan seni, musik, atau menulis untuk memproses emosi dan mengurangi stres.',
			steps: [
				'Sisihkan 15-20 menit setiap hari',
				'Pilih media kreatif apapun (menggambar, bernyanyi, menulis)',
				'Fokus pada proses, bukan hasil',
				'Biarkan emosi mengalir melalui kreasi Anda',
				'Refleksikan bagaimana aktivitas itu membuat Anda merasa'
			]
		},
		{
			id: 12,
			category: 'Alam',
			emoji: '🌳',
			title: 'Koneksi dengan Alam',
			description: 'Menghabiskan waktu di alam dapat secara signifikan mengurangi stres dan meningkatkan suasana hati.',
			steps: [
				'Habiskan setidaknya 20 menit di luar ruangan setiap hari',
				'Praktik "forest bathing" - observasi alam yang penuh kesadaran',
				'Berjalan tanpa alas kaki di rumput atau tanah',
				'Dengarkan suara-suara alami (burung, angin, air)',
				'Kumpulkan objek alami dengan penuh kesadaran'
			]
		}
	];

	// Get current tips based on language
	let tips = $derived($currentLanguage === 'id' ? tipsID : tipsEN);

	const categories = $derived([...new Set(tips.map(tip => tip.category))]);
	let selectedCategory = $state('All');
	let filteredTips = $state(tips);

	// Watch for language changes and reset filters
	$effect(() => {
		filteredTips = tips;
		selectedCategory = $currentLanguage === 'id' ? 'Semua' : 'All';
	});

	// Watch for category changes and update filtered tips
	$effect(() => {
		if (selectedCategory === 'All' || selectedCategory === 'Semua') {
			filteredTips = tips;
		} else {
			filteredTips = tips.filter(tip => tip.category === selectedCategory);
		}
	});

	function filterByCategory(category) {
		selectedCategory = category;
	}

	function getTranslation(key) {
		const translations = {
			en: {
				title: 'Mental Health Tips 💡',
				subtitle: 'Practical techniques and strategies for maintaining good mental health',
				filterBy: 'Filter by Category',
				all: 'All',
				howToPractice: 'How to practice:',
				emergencyTitle: '🚨 Emergency Resources',
				emergencyText: 'If you\'re experiencing a mental health crisis, please reach out for help:',
				disclaimer: 'These tips are for general wellness and are not a substitute for professional mental health care. If you\'re struggling with mental health issues, please consult with a qualified healthcare provider or mental health professional.'
			},
			id: {
				title: 'Tips Kesehatan Mental 💡',
				subtitle: 'Teknik dan strategi praktis untuk menjaga kesehatan mental yang baik',
				filterBy: 'Filter berdasarkan Kategori',
				all: 'Semua',
				howToPractice: 'Cara melakukan:',
				emergencyTitle: '🚨 Sumber Darurat',
				emergencyText: 'Jika Anda mengalami krisis kesehatan mental, silakan hubungi bantuan:',
				disclaimer: 'Tips ini untuk kesehatan umum dan bukan pengganti perawatan kesehatan mental profesional. Jika Anda berjuang dengan masalah kesehatan mental, silakan konsultasi dengan penyedia layanan kesehatan yang berkualitas atau profesional kesehatan mental.'
			}
		};
		return translations[$currentLanguage]?.[key] || key;
	}
</script>

<svelte:head>
	<title>{getTranslation('title')} - MentalWell</title>
</svelte:head>

<div class="min-h-screen bg-gradient-to-br from-pink-100 via-purple-50 to-indigo-100 p-6">
<div class="max-w-6xl mx-auto space-y-8">
	<!-- Header -->
	<div class="text-center">
		<h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">
			{getTranslation('title')}
		</h1>
		<p class="text-gray-600 dark:text-gray-300">
			{getTranslation('subtitle')}
		</p>
	</div>

	<!-- Category Filter -->
	<div class="bg-white/70 backdrop-blur-sm dark:bg-gray-800/70 rounded-lg shadow-lg p-6 border border-pink-200/50 dark:border-gray-700">
		<h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">{getTranslation('filterBy')}</h2>
		<div class="flex flex-wrap gap-2">
			<button
				on:click={() => filterByCategory($currentLanguage === 'id' ? 'Semua' : 'All')}
				class="px-4 py-2 rounded-lg font-medium transition-colors duration-200 {(selectedCategory === 'All' || selectedCategory === 'Semua') ? 'bg-blue-600 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'}"
			>
				{getTranslation('all')}
			</button>
			{#each categories as category}
				<button
					on:click={() => filterByCategory(category)}
					class="px-4 py-2 rounded-lg font-medium transition-colors duration-200 {selectedCategory === category ? 'bg-blue-600 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'}"
				>
					{category}
				</button>
			{/each}
		</div>
	</div>

	<!-- Tips Grid -->
	<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
		{#each filteredTips as tip}
			<div class="bg-white/70 backdrop-blur-sm dark:bg-gray-800/70 rounded-lg shadow-lg p-6 border border-purple-200/50 dark:border-gray-700">
				<!-- Tip Header -->
				<div class="flex items-center mb-4">
					<div class="text-3xl mr-3">{tip.emoji}</div>
					<div>
						<h3 class="text-xl font-semibold text-gray-900 dark:text-white">{tip.title}</h3>
						<span class="inline-block bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs px-2 py-1 rounded-full">
							{tip.category}
						</span>
					</div>
				</div>

				<!-- Description -->
				<p class="text-gray-600 dark:text-gray-300 mb-4">{tip.description}</p>

				<!-- Steps -->
				<div class="space-y-2">
					<h4 class="font-medium text-gray-900 dark:text-white">{getTranslation('howToPractice')}</h4>
					<ul class="space-y-1">
						{#each tip.steps as step, index}
							<li class="flex items-start">
								<span class="flex-shrink-0 w-6 h-6 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 rounded-full text-xs font-medium flex items-center justify-center mr-3 mt-0.5">
									{index + 1}
								</span>
								<span class="text-gray-700 dark:text-gray-300 text-sm">{step}</span>
							</li>
						{/each}
					</ul>
				</div>
			</div>
		{/each}
	</div>

	<!-- Emergency Resources -->
	<div class="bg-red-100/80 backdrop-blur-sm dark:bg-red-900/20 border border-red-300/50 dark:border-red-800 rounded-lg p-6 shadow-lg">
		<h2 class="text-xl font-bold text-red-800 dark:text-red-200 mb-4">{getTranslation('emergencyTitle')}</h2>
		<div class="text-red-700 dark:text-red-300 space-y-2">
			<p class="font-medium">{getTranslation('emergencyText')}</p>
			<ul class="space-y-1 text-sm">
				{#if $currentLanguage === 'id'}
					<li>• <strong>Hotline Kesehatan Mental Nasional:</strong> 119 ext 8</li>
					<li>• <strong>Yayasan Pulih:</strong> 021-788-42580</li>
					<li>• <strong>Layanan Darurat:</strong> 112</li>
					<li>• <strong>Crisis Text (WA):</strong> +62 813-1754-8333</li>
				{:else}
					<li>• <strong>National Suicide Prevention Lifeline:</strong> 988 or 1-800-273-8255</li>
					<li>• <strong>Crisis Text Line:</strong> Text HOME to 741741</li>
					<li>• <strong>Emergency Services:</strong> 911</li>
					<li>• <strong>SAMHSA National Helpline:</strong> 1-800-662-4357</li>
				{/if}
			</ul>
			<p class="text-sm italic">
				{#if $currentLanguage === 'id'}
					Ingat: Anda tidak sendirian, dan bantuan selalu tersedia.
				{:else}
					Remember: You are not alone, and help is always available.
				{/if}
			</p>
		</div>
	</div>

	<!-- Disclaimer -->
	<div class="bg-yellow-100/80 backdrop-blur-sm dark:bg-yellow-900/20 border border-yellow-300/50 dark:border-yellow-800 rounded-lg p-4 shadow-lg">
		<p class="text-yellow-800 dark:text-yellow-200 text-sm">
			<strong>{$currentLanguage === 'id' ? 'Penyangkalan:' : 'Disclaimer:'}</strong> {getTranslation('disclaimer')}
		</p>
	</div>
</div>
</div>