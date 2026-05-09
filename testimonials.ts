export interface Testimony {
  id: string;
  name: string;
  country: string;
  countryCode: string;
  flag: string;
  amount: string;
  date: string;
  text: string;
  avatar: string;
  paymentProofBg: string;
}

// Diverse testimonials — each unique, emotional, and inspiring
export const TESTIMONIALS: Testimony[] = [
  // Nigeria
  {
    id: "ng1",
    name: "Adaeze Okonkwo",
    country: "Nigeria",
    countryCode: "NG",
    flag: "🇳🇬",
    amount: "$2,500",
    date: "2024-12-18",
    text: "Chai! I could not believe my eyes when I saw the alert. ₦3,950,000 entered my account! GlobalMinersPay changed everything for me. I was struggling to pay school fees for my children but now I have cleared all debts and even built a small shop. This platform is the real deal. God bless whoever created this. I have told everyone in my street!",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=adaeze&backgroundColor=b6e3f4",
    paymentProofBg: "from-green-900 to-emerald-800",
  },
  {
    id: "ng2",
    name: "Emeka Nwosu",
    country: "Nigeria",
    countryCode: "NG",
    flag: "🇳🇬",
    amount: "$1,500",
    date: "2024-11-30",
    text: "To be honest I was skeptical at first. Many platforms have cheated us before. But this one paid me! ₦2,370,000 was credited to my account. I have been mining for 3 months and every withdrawal has been processed. My wife stopped selling tomatoes at the market because we can now afford better. GlobalMinersPay is legitimate!",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=emeka&backgroundColor=ffdfbf",
    paymentProofBg: "from-yellow-900 to-amber-800",
  },
  {
    id: "ng3",
    name: "Fatima Mohammed",
    country: "Nigeria",
    countryCode: "NG",
    flag: "🇳🇬",
    amount: "$3,000",
    date: "2025-01-05",
    text: "Alhamdulillah! I keep thanking Allah for leading me to this platform. ₦4,740,000! I used part of it to pay bride price for my son. The mining process is simple, just tap daily and accumulate. When I first withdrew $1,000 I screamed so loud my neighbors came to check on me! This is not a scam, I swear on my life.",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=fatima&backgroundColor=d1d4f9",
    paymentProofBg: "from-purple-900 to-violet-800",
  },
  // Ghana
  {
    id: "gh1",
    name: "Kwame Asante",
    country: "Ghana",
    countryCode: "GH",
    flag: "🇬🇭",
    amount: "$2,000",
    date: "2024-12-28",
    text: "Ei! Me de me ho ato GlobalMinersPay mu a me nya ₵31,000! Akwaaba platforms like this in Ghana. I told my friends and family and now we are all mining together. The $50 investment I made has returned 40 times already. I even bought a new motorbike for my transport business. Life is good!",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=kwame&backgroundColor=c0aede",
    paymentProofBg: "from-blue-900 to-indigo-800",
  },
  {
    id: "gh2",
    name: "Akosua Mensah",
    country: "Ghana",
    countryCode: "GH",
    flag: "🇬🇭",
    amount: "$1,800",
    date: "2025-01-12",
    text: "I have been looking for legitimate online income for years. Every time I tried something it was a scam. My cousin introduced me to GlobalMinersPay and I was very careful. I started with just watching for 2 weeks before paying. But when I saw her receive her money, I joined immediately! Now I have received ₵27,900 and I am so happy!",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=akosua&backgroundColor=ffd5dc",
    paymentProofBg: "from-pink-900 to-rose-800",
  },
  // Kenya
  {
    id: "ke1",
    name: "Wanjiku Kamau",
    country: "Kenya",
    countryCode: "KE",
    flag: "🇰🇪",
    amount: "$2,200",
    date: "2024-12-10",
    text: "Mungu ni mwema! God is good! KSh 283,800 imeningia! Nilikuwa mkulima mdogo lakini sasa nimeweza kununua mbegu bora na kulima shamba kubwa zaidi. GlobalMinersPay imebadilisha maisha yangu kabisa. Ninaomba kila mtu anayesoma hii ajaribu — hii ni halali, mimi ni shahidi.",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=wanjiku&backgroundColor=b6e3f4",
    paymentProofBg: "from-teal-900 to-cyan-800",
  },
  {
    id: "ke2",
    name: "Brian Otieno",
    country: "Kenya",
    countryCode: "KE",
    flag: "🇰🇪",
    amount: "$1,200",
    date: "2025-01-18",
    text: "Hakika hii platform ni ya kweli. KSh 154,800 imefika mpaka account yangu! Nilikuwa na deni ya serikali lakini sasa nimeilipa yote. Bwana asifiwe. Nilikuwa naona watu wakijaribu Bitcoin na kushindwa, lakini GlobalMinersPay ni tofauti kabisa. Rahisi, salama, na inafanya kazi.",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=brian&backgroundColor=ffdfbf",
    paymentProofBg: "from-orange-900 to-red-800",
  },
  // India
  {
    id: "in1",
    name: "Priya Sharma",
    country: "India",
    countryCode: "IN",
    flag: "🇮🇳",
    amount: "$2,500",
    date: "2025-01-02",
    text: "यह सच में अद्भुत है! मुझे ₹2,08,750 मिले! मैं एक गृहिणी हूं और मेरे पति ने इसे मुझे दिखाया था। पहले मुझे डर लग रहा था लेकिन जब मेरे पड़ोस की आंटी को पैसे मिले तो मैंने भी जोड़ लिया। अब मैं अपने बच्चों की पढ़ाई का खर्च खुद उठाती हूं। GlobalMinersPay ने मेरे जीवन में बड़ा बदलाव लाया है!",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=priya&backgroundColor=d1d4f9",
    paymentProofBg: "from-indigo-900 to-blue-800",
  },
  {
    id: "in2",
    name: "Rajesh Kumar",
    country: "India",
    countryCode: "IN",
    flag: "🇮🇳",
    amount: "$3,000",
    date: "2024-12-22",
    text: "भाई साब, यह प्लेटफॉर्म सोने की खान है! ₹2,50,500 सच में खाते में आए। मैं एक auto चालक हूं, बहुत मुश्किल से घर चलाता था। अब तीन महीने में इतना कमाया जितना पूरे साल नहीं होता था। सपने में भी नहीं सोचा था कि online mining इतना अच्छा काम करेगा। जय हो!",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=rajesh&backgroundColor=c0aede",
    paymentProofBg: "from-amber-900 to-yellow-800",
  },
  // Philippines
  {
    id: "ph1",
    name: "Maria Santos",
    country: "Philippines",
    countryCode: "PH",
    flag: "🇵🇭",
    amount: "$2,000",
    date: "2025-01-08",
    text: "Salamat po sa GlobalMinersPay! ₱112,000 natanggap ko! OFW ang tatay ko at palagi kaming nangangailangan ng pera. Ngayon kaya ko na tumulong sa pamilya kahit nandito lang sa Pilipinas. Ang dali ng proseso — mine daily, mag-ipon, at mag-withdraw. Tunay na legit ang platform na ito. Inirekomenda ko na sa lahat ng kaibigan ko!",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=maria&backgroundColor=ffd5dc",
    paymentProofBg: "from-rose-900 to-pink-800",
  },
  // Indonesia
  {
    id: "id1",
    name: "Siti Rahayu",
    country: "Indonesia",
    countryCode: "ID",
    flag: "🇮🇩",
    amount: "$1,500",
    date: "2024-12-15",
    text: "Alhamdulillah, rezeki nomplok! Rp 23.625.000 masuk rekening saya! Saya ibu rumah tangga yang tidak punya penghasilan sendiri. Suami saya yang pertama kali menemukan GlobalMinersPay dan kami coba bersama. Sekarang saya sudah withdraw 3 kali dan total sudah dapat lebih dari $3000. Platform ini luar biasa dan sangat terpercaya!",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=siti&backgroundColor=b6e3f4",
    paymentProofBg: "from-green-900 to-teal-800",
  },
  // Brazil
  {
    id: "br1",
    name: "Carlos Oliveira",
    country: "Brazil",
    countryCode: "BR",
    flag: "🇧🇷",
    amount: "$2,800",
    date: "2025-01-14",
    text: "Caramba! R$14.280,00 caiu na minha conta! Não acreditei quando vi. Trabalhei 20 anos como mecânico e nunca vi tanto dinheiro de uma vez. Minha filha me mostrou esse aplicativo e eu duvidei muito. Mas quando ela sacou o dinheiro na minha frente, fiquei com a boca aberta. O GlobalMinersPay é real e eu sou a prova viva!",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=carlos&backgroundColor=ffdfbf",
    paymentProofBg: "from-yellow-900 to-green-800",
  },
  // South Africa
  {
    id: "za1",
    name: "Thabo Dlamini",
    country: "South Africa",
    countryCode: "ZA",
    flag: "🇿🇦",
    amount: "$2,000",
    date: "2024-12-05",
    text: "Eish, I can't believe this is real! R37,000 paid to my FNB account! Life in SA is tough with the economy but GlobalMinersPay gave me hope. I used the money to fix my roof and buy school uniforms for my kids. My boss at work asked how I got the money so I showed him the app. Now 5 people from my workplace are also mining!",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=thabo&backgroundColor=c0aede",
    paymentProofBg: "from-blue-900 to-green-800",
  },
  // Pakistan
  {
    id: "pk1",
    name: "Zara Ahmed",
    country: "Pakistan",
    countryCode: "PK",
    flag: "🇵🇰",
    amount: "$1,800",
    date: "2024-11-25",
    text: "ماشاءاللہ! Rs 500,400 میرے اکاؤنٹ میں آگئے! مجھے یقین نہیں ہو رہا تھا پہلے۔ میرے گھر کی حالت بہت خراب تھی لیکن اب الحمدللہ سب کچھ ٹھیک ہو رہا ہے۔ GlobalMinersPay نے میری زندگی بدل دی۔ میں نے اپنی بہن کی شادی کا خرچ بھی اسی پیسے سے اٹھایا۔",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=zara&backgroundColor=d1d4f9",
    paymentProofBg: "from-emerald-900 to-green-800",
  },
  // UAE
  {
    id: "ae1",
    name: "Ahmed Al-Rashid",
    country: "UAE",
    countryCode: "AE",
    flag: "🇦🇪",
    amount: "$3,500",
    date: "2025-01-20",
    text: "الحمد لله، استلمت 12,845 درهم! كنت أعمل في دبي وأبحث عن طريقة للادخار. GlobalMinersPay كانت الحل المثالي. العملية بسيطة جداً والدفع سريع. أنصح كل أخ وأخت بالانضمام لهذه المنصة الرائعة. لقد غيرت حياتي المالية بشكل كامل وأنا ممتن جداً.",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=ahmed&backgroundColor=ffd5dc",
    paymentProofBg: "from-purple-900 to-indigo-800",
  },
  // Ethiopia
  {
    id: "et1",
    name: "Tigist Haile",
    country: "Ethiopia",
    countryCode: "ET",
    flag: "🇪🇹",
    amount: "$1,600",
    date: "2024-12-20",
    text: "እናቱ ሆይ! ብር 89,600 ወደ ሂሳቤ ገቡ! ይህ ምን ድንቅ ነው! እኔ ትንሽ ሻይ ቤት ነው ያለኝ ግን ዛሬ GlobalMinersPay ብዙ ሰጠኝ። ልጆቼ ትምህርት ቤት ላልፈቀዳቸው ጊዜ ሊሆን ነበር ግን አሁን ሁሉም ነገር ተፈቷል። ለዚህ ታላቅ ፕላትፎርም ምስጋናዬን አቀርባለሁ!",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=tigist&backgroundColor=b6e3f4",
    paymentProofBg: "from-amber-900 to-orange-800",
  },
  // Malaysia
  {
    id: "my1",
    name: "Nurul Hana",
    country: "Malaysia",
    countryCode: "MY",
    flag: "🇲🇾",
    amount: "$2,200",
    date: "2024-12-30",
    text: "Subhanallah! RM10,340 masuk akaun saya! Saya seorang guru sekolah dan gaji saya tidak mencukupi untuk hidup di KL. Kawan saya perkenalkan GlobalMinersPay dan saya cuba. Sekarang sudah 4 bulan dan setiap kali withdraw tidak pernah gagal. Dengan duit ini saya boleh bantu ibu bapa saya di kampung. Syukur alhamdulillah!",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=nurul&backgroundColor=c0aede",
    paymentProofBg: "from-teal-900 to-blue-800",
  },
  // Tanzania
  {
    id: "tz1",
    name: "Amina Hassan",
    country: "Tanzania",
    countryCode: "TZ",
    flag: "🇹🇿",
    amount: "$1,400",
    date: "2025-01-10",
    text: "Asante sana GlobalMinersPay! TSh 3,556,000 nimepata! Nikiwa mtumishi wa nyumba, sikuweza ndoto hata ya kupata pesa nyingi hivyo. Lakini leo nimeweza kulipa mkopo wangu wa benki na kubaki na pesa za ziada. Hii ni furaha kubwa sana! Naomba watu wote wajaribu — hii inafanya kazi kweli kweli!",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=amina&backgroundColor=ffdfbf",
    paymentProofBg: "from-cyan-900 to-teal-800",
  },
  // Russia
  {
    id: "ru1",
    name: "Natasha Petrova",
    country: "Russia",
    countryCode: "RU",
    flag: "🇷🇺",
    amount: "$2,000",
    date: "2024-12-12",
    text: "Не верила своим глазам! 180,000 рублей на счёте! Я работаю медсестрой и зарплата небольшая. Подруга посоветовала GlobalMinersPay и я попробовала. Сначала была осторожна, но когда деньги пришли — расплакалась от радости! Смогла купить дочке новый ноутбук для учёбы. Эта платформа — настоящее чудо!",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=natasha&backgroundColor=d1d4f9",
    paymentProofBg: "from-red-900 to-rose-800",
  },
  // Vietnam
  {
    id: "vn1",
    name: "Nguyen Thi Lan",
    country: "Vietnam",
    countryCode: "VN",
    flag: "🇻🇳",
    amount: "$1,500",
    date: "2025-01-06",
    text: "Ôi trời ơi! 36,750,000 đồng vào tài khoản của tôi! Tôi là công nhân nhà máy, lương thấp lắm. Bạn bè giới thiệu GlobalMinersPay và tôi thử thôi. Kết quả thật tuyệt vời! Với số tiền này tôi đã trả được tiền thuê nhà 6 tháng và còn dư. Cảm ơn GlobalMinersPay từ tận đáy lòng!",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=lan&backgroundColor=ffd5dc",
    paymentProofBg: "from-green-900 to-lime-800",
  },
  // Mexico
  {
    id: "mx1",
    name: "Sofía García",
    country: "Mexico",
    countryCode: "MX",
    flag: "🇲🇽",
    amount: "$1,800",
    date: "2024-11-28",
    text: "¡Dios mío! ¡MX$30,960 en mi cuenta! Soy mamá soltera con dos hijos y siempre batallaba para llegar a fin de mes. Una amiga me habló de GlobalMinersPay y al principio dudé mucho. Pero cuando vi el dinero llegar, lloré de felicidad. Pude pagar la colegiatura de mis hijos y hasta salir de vacaciones por primera vez en 5 años. ¡Gracias!",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sofia&backgroundColor=b6e3f4",
    paymentProofBg: "from-orange-900 to-yellow-800",
  },
  // Colombia
  {
    id: "co1",
    name: "Andrés Herrera",
    country: "Colombia",
    countryCode: "CO",
    flag: "🇨🇴",
    amount: "$2,500",
    date: "2025-01-15",
    text: "¡Parcero, esto sí funciona! COL$9,875,000 en mi bolsillo! Trabajaba como mesero ganando el mínimo y soñaba con algo mejor. Un amigo del trabajo me mostró GlobalMinersPay. Hice el pago de $50 USDT con miedo pero en 3 meses tengo este resultado increíble. Con ese dinero empecé mi propio negocio de comidas. ¡La vida cambió!",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=andres&backgroundColor=c0aede",
    paymentProofBg: "from-yellow-900 to-amber-800",
  },
  // United Kingdom
  {
    id: "gb1",
    name: "James Wilson",
    country: "United Kingdom",
    countryCode: "GB",
    flag: "🇬🇧",
    amount: "$3,000",
    date: "2024-12-08",
    text: "Absolutely brilliant! £2,370 cleared in my Barclays account! I was made redundant last year and things were looking bleak. A family friend who lives in the US told me about GlobalMinersPay. I was sceptical — I'm a Brit, we're naturally suspicious! But after seeing her payment screenshots I gave it a go. Best decision ever. Proper platform!",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=james&backgroundColor=ffdfbf",
    paymentProofBg: "from-blue-900 to-indigo-800",
  },
  // Uganda
  {
    id: "ug1",
    name: "Grace Nakimuli",
    country: "Uganda",
    countryCode: "UG",
    flag: "🇺🇬",
    amount: "$1,200",
    date: "2025-01-22",
    text: "Webale nyo GlobalMinersPay! USh 4,512,000 yakunjira! Nali ndi obuwufu bw'ensimbi ennyo nga sisobola nokuwa omuzigo gw'abaana bange ow'essomero. Naye GlobalMinersPay yansooka. Nsaba buli omu awulira okujjukira okugezesa — tekola kukyusa omutima nawe!",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=grace&backgroundColor=d1d4f9",
    paymentProofBg: "from-amber-900 to-orange-800",
  },
  // Bangladesh
  {
    id: "bd1",
    name: "Razia Begum",
    country: "Bangladesh",
    countryCode: "BD",
    flag: "🇧🇩",
    amount: "$1,500",
    date: "2024-12-25",
    text: "আল্লাহর রহমতে ৳১,৬৫,০০০ পেয়েছি! আমি একজন গৃহিণী, স্বামীর একার রোজগারে সংসার চালাতে কষ্ট হতো। বান্ধবীর কাছ থেকে GlobalMinersPay সম্পর্কে জানলাম। প্রথমে ভয় পেয়েছিলাম কিন্তু এখন সত্যিই টাকা পেয়ে চোখে পানি এসে গেল আনন্দে! আমার পরিবারের জন্য অনেক কিছু করতে পারছি এখন।",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=razia&backgroundColor=ffd5dc",
    paymentProofBg: "from-green-900 to-emerald-800",
  },
  // Zimbabwe
  {
    id: "zw1",
    name: "Tendai Moyo",
    country: "Zimbabwe",
    countryCode: "ZW",
    flag: "🇿🇼",
    amount: "$2,000",
    date: "2025-01-03",
    text: "Mwari ndatenda! $2,000 USD received! Here in Zimbabwe we know the value of hard currency. When I got my GlobalMinersPay payment I couldn't stop shaking. I was selling vegetables at Mbare Musika to survive. Now I have used the money to buy stock for a proper grocery shop. My children are eating well. This platform is a blessing from above!",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=tendai&backgroundColor=b6e3f4",
    paymentProofBg: "from-red-900 to-orange-800",
  },
];

export function getTestimonialsByCountry(countryCode: string): Testimony[] {
  const countryTestimonials = TESTIMONIALS.filter(
    (t) => t.countryCode === countryCode
  );
  if (countryTestimonials.length > 0) {
    return countryTestimonials;
  }
  // Fallback: return a random selection of global testimonials
  return TESTIMONIALS.slice(0, 4);
}

export function getAllTestimonials(): Testimony[] {
  return TESTIMONIALS;
}
