// Chatbot utilities
export function saveChatMessage(message, isUser = true) {
	if (!browser) return;
	
	const chatMessage = {
		id: Date.now(),
		message,
		isUser,
		timestamp: new Date().toISOString()
	};
	
	const messages = getChatHistory();
	messages.push(chatMessage);
	localStorage.setItem('mentalwell_chat', JSON.stringify(messages));
}

export function getChatHistory() {
	if (!browser) return [];
	
	const stored = localStorage.getItem('mentalwell_chat');
	return stored ? JSON.parse(stored) : [];
}

export function clearChatHistory() {
	if (!browser) return;
	localStorage.removeItem('mentalwell_chat');
}

// AI Chatbot Response System
export function generateChatbotResponse(userMessage, currentMood = null, language = 'en') {
	const message = userMessage.toLowerCase();
	const responses = getChatbotResponses(currentMood, language);
	
	// Indonesian greeting patterns
	const indonesianGreetings = ['halo', 'hai', 'selamat', 'pagi', 'siang', 'sore', 'malam'];
	
	// Greeting responses
	if (message.includes('hello') || message.includes('hi') || message.includes('hey') || 
		indonesianGreetings.some(greeting => message.includes(greeting))) {
		return responses.greetings[Math.floor(Math.random() * responses.greetings.length)];
	}
	
	// Feeling responses (English and Indonesian)
	if (message.includes('feel') || message.includes('feeling') || message.includes('emotion') ||
		message.includes('merasa') || message.includes('perasaan') || message.includes('emosi')) {
		return responses.feelings[Math.floor(Math.random() * responses.feelings.length)];
	}
	
	// Stress/anxiety responses (English and Indonesian)
	if (message.includes('stress') || message.includes('anxious') || message.includes('anxiety') || message.includes('worried') ||
		message.includes('stres') || message.includes('cemas') || message.includes('khawatir') || message.includes('gelisah')) {
		return responses.stress[Math.floor(Math.random() * responses.stress.length)];
	}
	
	// Sad/depression responses (English and Indonesian)
	if (message.includes('sad') || message.includes('depressed') || message.includes('down') || message.includes('lonely') ||
		message.includes('sedih') || message.includes('depresi') || message.includes('kesepian') || message.includes('terpuruk')) {
		return responses.sadness[Math.floor(Math.random() * responses.sadness.length)];
	}
	
	// Happy/positive responses (English and Indonesian)
	if (message.includes('happy') || message.includes('good') || message.includes('great') || message.includes('amazing') ||
		message.includes('senang') || message.includes('bahagia') || message.includes('baik') || message.includes('bagus') || message.includes('hebat')) {
		return responses.happiness[Math.floor(Math.random() * responses.happiness.length)];
	}
	
	// Help/support responses (English and Indonesian)
	if (message.includes('help') || message.includes('support') || message.includes('advice') ||
		message.includes('bantu') || message.includes('bantuan') || message.includes('tolong') || message.includes('saran') || message.includes('nasihat')) {
		return responses.help[Math.floor(Math.random() * responses.help.length)];
	}
	
	// Gratitude responses (English and Indonesian)
	if (message.includes('thank') || message.includes('thanks') ||
		message.includes('terima kasih') || message.includes('makasih') || message.includes('thanks')) {
		return responses.gratitude[Math.floor(Math.random() * responses.gratitude.length)];
	}
	
	// Default responses based on current mood
	if (currentMood) {
		return getMoodBasedResponse(currentMood, language);
	}
	
	// Fallback responses
	return responses.fallback[Math.floor(Math.random() * responses.fallback.length)];
}

function getChatbotResponses(currentMood, language = 'en') {
	if (language === 'id') {
		return {
			greetings: [
				"Halo! Saya di sini untuk mendukung Anda hari ini. Bagaimana perasaan Anda? 😊",
				"Hai! Senang bertemu dengan Anda. Apa yang ada di pikiran Anda hari ini?",
				"Halo! Saya teman pendukung emosional Anda. Bagaimana saya bisa membantu Anda merasa lebih baik hari ini?",
				"Halo! Ingat, tidak apa-apa untuk tidak baik-baik saja. Saya di sini untuk mendengarkan. 💙"
			],
			feelings: [
				"Sangat normal untuk memiliki naik turun. Perasaan Anda valid. Bisakah Anda ceritakan lebih banyak tentang apa yang Anda alami?",
				"Terima kasih telah berbagi perasaan Anda. Mengakui emosi adalah langkah pertama untuk memahaminya dengan lebih baik.",
				"Saya mendengar Anda. Terkadang berbicara tentang perasaan kita dapat membantu kita memprosesnya. Apa yang ada di pikiran Anda akhir-akhir ini?",
				"Kesadaran emosional Anda adalah kekuatan. Apakah Anda ingin mengeksplorasi apa yang mungkin berkontribusi pada perasaan ini?"
			],
			stress: [
				"Saya mengerti Anda merasa stres. Mari coba latihan pernapasan cepat: Tarik napas selama 4 hitungan, tahan selama 4, buang napas selama 6. 🌬️",
				"Stres bisa terasa luar biasa, tapi Anda lebih kuat dari yang Anda kira. Coba luangkan waktu beberapa menit untuk fokus pada sesuatu yang Anda syukuri hari ini.",
				"Ketika kecemasan terasa terlalu besar, coba teknik 5-4-3-2-1: Sebutkan 5 hal yang Anda lihat, 4 hal yang bisa Anda sentuh, 3 hal yang Anda dengar, 2 hal yang Anda cium, 1 hal yang Anda rasakan.",
				"Ingat: Anda telah mengatasi tantangan sebelumnya, dan Anda bisa melewati ini juga. Ambil satu napas pada satu waktu. 💪"
			],
			sadness: [
				"Saya turut prihatin Anda merasa sedih. Tidak apa-apa duduk dengan perasaan ini - mereka bersifat sementara dan valid. Anda tidak harus menghadapi ini sendirian. 🤗",
				"Kesedihan adalah bagian dari pengalaman manusia. Meskipun menyakitkan, itu juga menunjukkan kapasitas Anda untuk perasaan dan koneksi yang mendalam.",
				"Terkadang langkah terkecil ke depan sudah cukup. Mungkin coba lakukan satu hal kecil yang biasanya membawa Anda kenyamanan hari ini.",
				"Anda penting, dan perasaan Anda juga penting. Apakah berbicara tentang apa yang membuat Anda sedih akan membantu sekarang?"
			],
			happiness: [
				"Saya senang mendengar bahwa Anda merasa baik! Apa yang membawa Anda kegembiraan akhir-akhir ini? 😄",
				"Itu luar biasa! Kebahagiaan harus dirayakan. Apa yang ingin Anda bagikan tentang hari baik Anda?",
				"Energi positif Anda menular! Ingatlah untuk menikmati momen-momen baik ini - mereka sama pentingnya dengan memproses yang sulit.",
				"Indah ketika hidup terasa cerah! Apakah ada sesuatu yang khusus yang berkontribusi pada suasana hati baik Anda hari ini?"
			],
			help: [
				"Saya di sini untuk mendukung Anda dengan cara apa pun yang saya bisa. Bantuan seperti apa yang Anda cari hari ini? Saya bisa menawarkan latihan pernapasan, afirmasi positif, atau hanya mendengarkan.",
				"Anda mengambil langkah positif dengan meminta dukungan. Itu butuh keberanian! Bagaimana saya bisa membantu Anda sebaik mungkin sekarang?",
				"Ada banyak cara untuk menemukan dukungan. Saya bisa berbagi beberapa teknik koping, atau kita bisa hanya berbicara. Apa yang terasa tepat untuk Anda?",
				"Meminta bantuan adalah tanda kekuatan, bukan kelemahan. Saya senang Anda menghubungi. Mari kita bekerja sama untuk mengatasi ini."
			],
			gratitude: [
				"Sama-sama! Saya di sini kapan pun Anda butuh seseorang untuk diajak bicara. Jaga diri Anda! 💙",
				"Sangat berarti mendengar bahwa saya bisa membantu. Ingat, Anda memiliki kekuatan dalam diri Anda - saya hanya membantu Anda menemukannya! 🌟",
				"Sama-sama! Jangan lupa untuk bersikap baik pada diri sendiri. Anda layak mendapatkan kasih sayang yang sama seperti yang Anda tunjukkan kepada orang lain.",
				"Saya senang bisa di sini untuk Anda. Kesejahteraan Anda penting, dan saya merasa terhormat menjadi bagian dari perjalanan perawatan diri Anda."
			],
			fallback: [
				"Saya ingin memahami Anda lebih baik. Bisakah Anda ceritakan lebih banyak tentang apa yang Anda alami sekarang?",
				"Terkadang membantu hanya memiliki seseorang yang mendengarkan. Saya di sini untuk Anda. Apa yang ada di pikiran Anda?",
				"Perasaan Anda penting. Apakah Anda ingin mengeksplorasi apa yang Anda lalui, atau Anda lebih suka beberapa strategi koping?",
				"Saya mungkin tidak memiliki semua jawaban, tapi saya di sini untuk mendukung Anda. Bagaimana kita bisa bekerja sama untuk membantu Anda merasa lebih baik?"
			]
		};
	}
	
	// English responses (default)
	return {
		greetings: [
			"Hello! I'm here to support you today. How are you feeling? 😊",
			"Hi there! It's great to see you. What's on your mind today?",
			"Hey! I'm your emotional support companion. How can I help you feel better today?",
			"Hello! Remember, it's okay to not be okay. I'm here to listen. 💙"
		],
		feelings: [
			"It's completely normal to have ups and downs. Your feelings are valid. Can you tell me more about what you're experiencing?",
			"Thank you for sharing how you feel. Acknowledging your emotions is the first step toward understanding them better.",
			"I hear you. Sometimes just talking about our feelings can help us process them. What's been on your mind lately?",
			"Your emotional awareness is a strength. Would you like to explore what might be contributing to these feelings?"
		],
		stress: [
			"I understand you're feeling stressed. Let's try a quick breathing exercise: Breathe in for 4 counts, hold for 4, exhale for 6. 🌬️",
			"Stress can feel overwhelming, but you're stronger than you think. Try taking a few minutes to focus on something you're grateful for today.",
			"When anxiety feels too big, try the 5-4-3-2-1 technique: Name 5 things you see, 4 things you can touch, 3 things you hear, 2 things you smell, 1 thing you taste.",
			"Remember: You've overcome challenges before, and you can get through this too. Take it one breath at a time. 💪"
		],
		sadness: [
			"I'm sorry you're feeling down. It's okay to sit with these feelings - they're temporary and valid. You don't have to face this alone. 🤗",
			"Sadness is part of the human experience. While it's painful, it also shows your capacity for deep feeling and connection.",
			"Sometimes the smallest step forward is enough. Maybe try doing one small thing that usually brings you comfort today.",
			"You matter, and your feelings matter too. Would talking about what's making you sad help right now?"
		],
		happiness: [
			"I love hearing that you're feeling good! What's been bringing you joy lately? 😄",
			"That's wonderful! Happiness is meant to be celebrated. What would you like to share about your good day?",
			"Your positive energy is contagious! Remember to savor these good moments - they're just as important as processing difficult ones.",
			"It's beautiful when life feels bright! Is there anything special that contributed to your good mood today?"
		],
		help: [
			"I'm here to support you in any way I can. What kind of help are you looking for today? I can offer breathing exercises, positive affirmations, or just listen.",
			"You're taking a positive step by asking for support. That takes courage! How can I best help you right now?",
			"There are many ways to find support. I can share some coping techniques, or we can just talk. What feels right for you?",
			"Asking for help is a sign of strength, not weakness. I'm glad you reached out. Let's work through this together."
		],
		gratitude: [
			"You're so welcome! I'm here whenever you need someone to talk to. Take care of yourself! 💙",
			"It means a lot to hear that I could help. Remember, you have the strength within you - I just helped you find it! 🌟",
			"You're very welcome! Don't forget to be kind to yourself. You deserve the same compassion you show others.",
			"I'm glad I could be here for you. Your wellbeing matters, and I'm honored to be part of your self-care journey."
		],
		fallback: [
			"I want to understand you better. Can you tell me more about what you're experiencing right now?",
			"Sometimes it helps just to have someone listen. I'm here for you. What's been on your mind?",
			"Your feelings are important. Would you like to explore what you're going through, or would you prefer some coping strategies?",
			"I may not have all the answers, but I'm here to support you. How can we work together to help you feel better?"
		]
	};
}

function getMoodBasedResponse(mood, language = 'en') {
	if (language === 'id') {
		const moodResponses = {
			1: [ // Angry
				"Saya bisa merasakan Anda mungkin merasa frustrasi atau marah. Itu sangat dapat dimengerti. Terkadang kemarahan adalah cara kita melindungi diri. Apakah Anda ingin mencoba teknik pelepasan kemarahan cepat? 🌊",
				"Kemarahan bisa terasa luar biasa, tapi itu juga energi yang bisa disalurkan secara positif. Coba ambil 10 napas dalam atau lakukan gerakan fisik untuk membantu melepaskan ketegangan itu.",
				"Tidak apa-apa merasa marah. Emosi Anda valid. Ketika Anda siap, mungkin kita bisa mengeksplorasi apa yang ada di balik kemarahan itu - terkadang itu adalah luka, ketakutan, atau frustrasi."
			],
			2: [ // Sad
				"Saya perhatikan Anda mungkin merasa sedih hari ini. Tidak apa-apa - kesedihan adalah bagian alami dari hidup. Anda tidak harus menanggung ini sendirian. Terkadang hanya mengakui kesedihan bisa membantu. 💙",
				"Ketika kita sedih, penting untuk ekstra lembut pada diri sendiri. Apa satu hal kecil yang bisa Anda lakukan hari ini untuk menunjukkan kebaikan pada diri sendiri?",
				"Kesedihan bisa terasa berat, tapi ingat bahwa perasaan seperti cuaca - mereka berubah. Momen sulit ini akan berlalu. Anda lebih kuat dari yang Anda tahu."
			],
			3: [ // Neutral
				"Terkadang merasa netral atau 'oke-oke saja' juga sangat baik. Tidak setiap hari harus luar biasa. Bagaimana Anda merawat diri hari ini? 🌱",
				"Hari-hari netral bisa tenang dengan caranya sendiri. Apakah ada sesuatu yang ingin Anda eksplorasi atau bicarakan, atau Anda puas dengan posisi Anda sekarang?",
				"Baik untuk memeriksa diri sendiri secara teratur. Bahkan di hari-hari netral, berlatih rasa syukur atau kesadaran bisa menambah sedikit kecerahan."
			],
			4: [ // Happy
				"Saya bisa merasakan energi positif dari Anda hari ini! Itu luar biasa. Apa yang berkontribusi pada suasana hati baik Anda? Mari rayakan itu! 🌟",
				"Kebahagiaan terlihat bagus pada Anda! Ingatlah untuk menikmati momen-momen baik ini - mereka sama pentingnya dengan mengatasi masa-masa sulit.",
				"Indah ketika hidup terasa cerah! Apakah ada cara Anda bisa berbagi energi positif ini dengan orang lain hari ini?"
			],
			5: [ // Very Happy
				"Kegembiraan Anda memancar! Saya senang melihat Anda merasa sangat positif. Apa yang membuat hari Anda begitu istimewa? Mari kita pertahankan perasaan ini! ✨",
				"Ini luar biasa! Ketika kita merasa sebaik ini, patut dicatat apa yang berkontribusi padanya sehingga kita bisa mengunjungi kembali strategi ini selama masa-masa sulit.",
				"Kebahagiaan Anda menular! Pertimbangkan untuk berbagi energi positif ini - mungkin bisa mencerahkan hari orang lain juga! 🌈"
			]
		};
		
		return moodResponses[mood.value] 
			? moodResponses[mood.value][Math.floor(Math.random() * moodResponses[mood.value].length)]
			: "Saya di sini untuk mendukung Anda, apa pun perasaan Anda hari ini. Apa yang ada di pikiran Anda? 💙";
	}
	
	// English responses (default)
	const moodResponses = {
		1: [ // Angry
			"I can sense you might be feeling frustrated or angry. That's completely understandable. Sometimes anger is our way of protecting ourselves. Would you like to try a quick anger release technique? 🌊",
			"Anger can feel overwhelming, but it's also energy that can be channeled positively. Try taking 10 deep breaths or doing some physical movement to help release that tension.",
			"It's okay to feel angry. Your emotions are valid. When you're ready, maybe we can explore what's beneath that anger - sometimes it's hurt, fear, or frustration."
		],
		2: [ // Sad
			"I notice you might be feeling sad today. That's okay - sadness is a natural part of life. You don't have to carry this alone. Sometimes just acknowledging the sadness can help. 💙",
			"When we're sad, it's important to be extra gentle with ourselves. What's one small thing you could do today to show yourself kindness?",
			"Sadness can feel heavy, but remember that feelings are like weather - they change. This difficult moment will pass. You're stronger than you know."
		],
		3: [ // Neutral
			"Sometimes feeling neutral or 'okay' is perfectly fine too. Not every day needs to be amazing. How are you taking care of yourself today? 🌱",
			"Neutral days can be peaceful in their own way. Is there anything you'd like to explore or talk about, or are you content with where you are right now?",
			"It's good to check in with yourself regularly. Even on neutral days, practicing gratitude or mindfulness can add a little brightness."
		],
		4: [ // Happy
			"I can sense some positive energy from you today! That's wonderful. What's been contributing to your good mood? Let's celebrate that! 🌟",
			"Happiness looks good on you! Remember to savor these good moments - they're just as important as working through difficult times.",
			"It's beautiful when life feels bright! Is there a way you can share this positive energy with someone else today?"
		],
		5: [ // Very Happy
			"Your joy is radiating! I love seeing you feel so positive. What's making your day so special? Let's hold onto this feeling! ✨",
			"This is amazing! When we feel this good, it's worth noting what contributed to it so we can revisit these strategies during harder times.",
			"Your happiness is contagious! Consider sharing this positive energy - it might just brighten someone else's day too! 🌈"
		]
	};
	
	return moodResponses[mood.value] 
		? moodResponses[mood.value][Math.floor(Math.random() * moodResponses[mood.value].length)]
		: "I'm here to support you, no matter how you're feeling today. What's on your mind? 💙";
}

// Quick exercises and tips based on mood
export function getMoodBasedExercise(mood, language = 'en') {
	if (language === 'id') {
		const exercises = {
			1: {
				title: "Teknik Pelepasan Kemarahan",
				icon: "🌊",
				steps: [
					"Ambil 5 napas dalam, hitung sampai 4 di setiap tarikan dan buangan napas",
					"Tegang semua otot Anda selama 5 detik, lalu lepaskan",
					"Bayangkan kemarahan Anda sebagai energi merah yang meninggalkan tubuh dengan setiap buangan napas",
					"Katakan pada diri sendiri: 'Perasaan ini akan berlalu, dan saya yang mengendalikan'"
				]
			},
			2: {
				title: "Belas Kasih Diri yang Lembut",
				icon: "🤗",
				steps: [
					"Letakkan tangan Anda di hati dan rasakan detaknya",
					"Katakan: 'Ini adalah momen penderitaan, dan itu tidak apa-apa'",
					"Ingatkan diri Anda: 'Saya tidak sendirian dalam perasaan ini'",
					"Berikan diri Anda kebaikan yang sama yang Anda berikan kepada teman baik"
				]
			},
			3: {
				title: "Momen Penuh Kesadaran",
				icon: "🧘‍♀️",
				steps: [
					"Ambil 3 napas sadar, perhatikan udara yang masuk dan keluar",
					"Perhatikan 3 hal yang bisa Anda lihat di sekitar Anda sekarang",
					"Perhatikan 2 hal yang bisa Anda dengar",
					"Perhatikan 1 hal yang bisa Anda rasakan (tekstur, suhu, dll.)"
				]
			},
			4: {
				title: "Amplifikasi Rasa Syukur",
				icon: "🌟",
				steps: [
					"Pikirkan 3 hal spesifik yang Anda syukuri hari ini",
					"Untuk setiap hal, pikirkan MENGAPA Anda bersyukur",
					"Pertimbangkan untuk berbagi rasa syukur Anda dengan seseorang",
					"Simpan perasaan ini - ingat betapa baiknya rasa syukur itu"
				]
			},
			5: {
				title: "Berbagi Kegembiraan",
				icon: "🌈",
				steps: [
					"Luangkan waktu untuk sepenuhnya merasakan kebahagiaan ini",
					"Pikirkan tentang apa yang berkontribusi pada perasaan ini",
					"Pertimbangkan cara untuk menyebarkan kegembiraan ini kepada orang lain",
					"Tuliskan apa yang membuat hari ini istimewa"
				]
			}
		};
		
		return exercises[mood] || exercises[3];
	}
	
	// English exercises (default)
	const exercises = {
		1: {
			title: "Anger Release Technique",
			icon: "🌊",
			steps: [
				"Take 5 deep breaths, counting to 4 on each inhale and exhale",
				"Tense all your muscles for 5 seconds, then release",
				"Imagine your anger as red energy leaving your body with each exhale",
				"Say to yourself: 'This feeling will pass, and I am in control'"
			]
		},
		2: {
			title: "Gentle Self-Compassion",
			icon: "🤗",
			steps: [
				"Place your hand on your heart and feel it beating",
				"Say: 'This is a moment of suffering, and that's okay'",
				"Remind yourself: 'I am not alone in this feeling'",
				"Offer yourself the same kindness you'd give a good friend"
			]
		},
		3: {
			title: "Mindful Moment",
			icon: "🧘‍♀️",
			steps: [
				"Take 3 conscious breaths, noticing the air entering and leaving",
				"Notice 3 things you can see around you right now",
				"Notice 2 things you can hear",
				"Notice 1 thing you can feel (texture, temperature, etc.)"
			]
		},
		4: {
			title: "Gratitude Amplification",
			icon: "🌟",
			steps: [
				"Think of 3 specific things you're grateful for today",
				"For each one, think about WHY you're grateful",
				"Consider sharing your gratitude with someone",
				"Save this feeling - remember how good gratitude feels"
			]
		},
		5: {
			title: "Joy Sharing",
			icon: "🌈",
			steps: [
				"Take a moment to fully experience this happiness",
				"Think about what contributed to this feeling",
				"Consider ways to spread this joy to others",
				"Write down what made today special"
			]
		}
	};
	
	return exercises[mood] || exercises[3];
}

export function getDailyAffirmations(language = 'en') {
	if (language === 'id') {
		const affirmations = [
			"Saya layak mendapatkan cinta, kebahagiaan, dan kedamaian.",
			"Perasaan saya valid, dan saya menghormatinya dengan kasih sayang.",
			"Saya memiliki kekuatan untuk menangani apa pun yang menghampiri saya.",
			"Saya memilih untuk sabar dan baik pada diri sendiri hari ini.",
			"Saya tumbuh dan belajar dengan setiap pengalaman.",
			"Saya layak mendapatkan istirahat, kegembiraan, dan momen kedamaian.",
			"Kesehatan mental saya penting, dan saya memprioritaskannya.",
			"Saya bukan pikiran saya - saya adalah pengamat pikiran saya.",
			"Saya memilih kemajuan daripada kesempurnaan.",
			"Saya berada tepat di tempat yang seharusnya saya berada saat ini.",
			"Saya telah selamat dari masa-masa sulit sebelumnya, dan saya akan melakukannya lagi.",
			"Saya layak mendapatkan dukungan, perhatian, dan pengertian."
		];
		
		return affirmations[Math.floor(Math.random() * affirmations.length)];
	}
	
	// English affirmations (default)
	const affirmations = [
		"I am worthy of love, happiness, and peace.",
		"My feelings are valid, and I honor them with compassion.",
		"I have the strength to handle whatever comes my way.",
		"I choose to be patient and kind with myself today.",
		"I am growing and learning with each experience.",
		"I deserve rest, joy, and moments of peace.",
		"My mental health matters, and I prioritize it.",
		"I am not my thoughts - I am the observer of my thoughts.",
		"I choose progress over perfection.",
		"I am exactly where I need to be in this moment.",
		"I have survived difficult times before, and I will again.",
		"I am worthy of support, care, and understanding."
	];
	
	return affirmations[Math.floor(Math.random() * affirmations.length)];
}

// Mood tracking functions
export const MOODS = [
	{ emoji: '😠', label: 'Angry', value: 1 },
	{ emoji: '😢', label: 'Sad', value: 2 },
	{ emoji: '😐', label: 'Neutral', value: 3 },
	{ emoji: '😊', label: 'Happy', value: 4 },
	{ emoji: '😄', label: 'Very Happy', value: 5 }
];

export function saveMood(mood) {
	if (typeof window === 'undefined') return;
	
	const moodEntry = {
		id: Date.now(),
		mood,
		timestamp: new Date().toISOString()
	};
	
	const moods = getMoods();
	moods.unshift(moodEntry); // Add to beginning of array
	localStorage.setItem('mentalwell_moods', JSON.stringify(moods));
}

export function getMoods() {
	if (typeof window === 'undefined') return [];
	
	const stored = localStorage.getItem('mentalwell_moods');
	return stored ? JSON.parse(stored) : [];
}

export function getMoodStats() {
	if (typeof window === 'undefined') return null;
	
	const moods = getMoods();
	if (moods.length === 0) return null;
	
	const now = new Date();
	const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
	const twoWeeksAgo = new Date(now.getTime() - 14 * 24 * 60 * 60 * 1000);
	
	const last7Days = moods.filter(mood => new Date(mood.timestamp) > oneWeekAgo).length;
	const last14Days = moods.filter(mood => new Date(mood.timestamp) > twoWeeksAgo).length;
	
	// Calculate average for last week
	const lastWeekMoods = moods.filter(mood => new Date(mood.timestamp) > oneWeekAgo);
	const averageLastWeek = lastWeekMoods.length > 0 
		? lastWeekMoods.reduce((sum, mood) => sum + mood.mood.value, 0) / lastWeekMoods.length
		: 0;
	
	return {
		total: moods.length,
		last7Days,
		last14Days,
		averageLastWeek: Math.round(averageLastWeek * 10) / 10 // Round to 1 decimal place
	};
}

export function getMoodGraphData(period = 'weekly') {
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
		
		if (dayMoods.length > 0) {
			const average = dayMoods.reduce((sum, mood) => sum + mood.mood.value, 0) / dayMoods.length;
			graphData.push({
				dayName,
				value: Math.round(average * 10) / 10,
				count: dayMoods.length
			});
		} else {
			graphData.push({
				dayName,
				value: null,
				count: 0
			});
		}
	}
	
	return graphData;
}

export function getMoodInsights() {
	if (typeof window === 'undefined') return [];
	
	const moods = getMoods();
	if (moods.length === 0) return [];
	
	const insights = [];
	const now = new Date();
	const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
	const twoWeeksAgo = new Date(now.getTime() - 14 * 24 * 60 * 60 * 1000);
	
	// Get mood counts for last week and two weeks
	const lastWeekMoods = moods.filter(mood => new Date(mood.timestamp) > oneWeekAgo);
	const twoWeeksMoods = moods.filter(mood => 
		new Date(mood.timestamp) > twoWeeksAgo && new Date(mood.timestamp) <= oneWeekAgo
	);
	
	// Insight: Consistency
	if (lastWeekMoods.length >= 4) {
		insights.push({
			icon: '📈',
			title: 'Great Consistency!',
			message: 'You\'ve been tracking your mood regularly this week. Keep up the good work!',
			type: 'positive'
		});
	}
	
	// Insight: Mood trend
	if (lastWeekMoods.length > 0 && twoWeeksMoods.length > 0) {
		const lastWeekAvg = lastWeekMoods.reduce((sum, mood) => sum + mood.mood.value, 0) / lastWeekMoods.length;
		const twoWeeksAvg = twoWeeksMoods.reduce((sum, mood) => sum + mood.mood.value, 0) / twoWeeksMoods.length;
		
		if (lastWeekAvg > twoWeeksAvg + 0.5) {
			insights.push({
				icon: '😊',
				title: 'Mood Improvement!',
				message: 'Your average mood has improved compared to last week. That\'s wonderful!',
				type: 'positive'
			});
		} else if (lastWeekAvg < twoWeeksAvg - 0.5) {
			insights.push({
				icon: '🤔',
				title: 'Mood Dip Notice',
				message: 'Your average mood seems lower than last week. Remember, it\'s okay to have ups and downs.',
				type: 'neutral'
			});
		}
	}
	
	// Insight: Most common mood
	if (moods.length >= 5) {
		const moodCounts = {};
		moods.forEach(mood => {
			moodCounts[mood.mood.value] = (moodCounts[mood.mood.value] || 0) + 1;
		});
		
		const mostCommonValue = Object.keys(moodCounts).reduce((a, b) => 
			moodCounts[a] > moodCounts[b] ? a : b
		);
		
		const mostCommonMood = MOODS.find(m => m.value == mostCommonValue);
		if (mostCommonMood) {
			insights.push({
				icon: mostCommonMood.emoji,
				title: 'Pattern Recognition',
				message: `You most often feel "${mostCommonMood.label}". Awareness helps with understanding yourself better.`,
				type: 'neutral'
			});
		}
	}
	
	return insights;
}

export function getMoodColor(value) {
	const colors = {
		1: '#EF4444', // Angry - Red
		2: '#F59E0B', // Sad - Amber
		3: '#6B7280', // Neutral - Gray
		4: '#10B981', // Happy - Green
		5: '#3B82F6'  // Very Happy - Blue
	};
	return colors[value] || '#6B7280';
}

// Journal functions
export function saveJournalEntry(title, content) {
	if (typeof window === 'undefined') return;
	
	const entry = {
		id: Date.now(),
		title,
		content,
		timestamp: new Date().toISOString()
	};
	
	const entries = getJournalEntries();
	entries.unshift(entry); // Add to beginning of array
	localStorage.setItem('mentalwell_journal', JSON.stringify(entries));
}

export function getJournalEntries() {
	if (typeof window === 'undefined') return [];
	
	const stored = localStorage.getItem('mentalwell_journal');
	return stored ? JSON.parse(stored) : [];
}

export function deleteJournalEntry(id) {
	if (typeof window === 'undefined') return;
	
	let entries = getJournalEntries();
	entries = entries.filter(entry => entry.id !== id);
	localStorage.setItem('mentalwell_journal', JSON.stringify(entries));
}
