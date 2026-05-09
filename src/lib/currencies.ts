export interface CountryInfo {
  name: string;
  code: string;
  flag: string;
  currency: string;
  currencyCode: string;
  currencySymbol: string;
  exchangeRate: number; // per 1 USD
  language: string;
  phonePrefix: string;
}

export const COUNTRIES: CountryInfo[] = [
  { name: "United States", code: "US", flag: "🇺🇸", currency: "US Dollar", currencyCode: "USD", currencySymbol: "$", exchangeRate: 1, language: "en", phonePrefix: "+1" },
  { name: "United Kingdom", code: "GB", flag: "🇬🇧", currency: "British Pound", currencyCode: "GBP", currencySymbol: "£", exchangeRate: 0.79, language: "en", phonePrefix: "+44" },
  { name: "Nigeria", code: "NG", flag: "🇳🇬", currency: "Nigerian Naira", currencyCode: "NGN", currencySymbol: "₦", exchangeRate: 1580, language: "en", phonePrefix: "+234" },
  { name: "Ghana", code: "GH", flag: "🇬🇭", currency: "Ghanaian Cedi", currencyCode: "GHS", currencySymbol: "₵", exchangeRate: 15.5, language: "en", phonePrefix: "+233" },
  { name: "Kenya", code: "KE", flag: "🇰🇪", currency: "Kenyan Shilling", currencyCode: "KES", currencySymbol: "KSh", exchangeRate: 129, language: "sw", phonePrefix: "+254" },
  { name: "South Africa", code: "ZA", flag: "🇿🇦", currency: "South African Rand", currencyCode: "ZAR", currencySymbol: "R", exchangeRate: 18.5, language: "en", phonePrefix: "+27" },
  { name: "India", code: "IN", flag: "🇮🇳", currency: "Indian Rupee", currencyCode: "INR", currencySymbol: "₹", exchangeRate: 83.5, language: "hi", phonePrefix: "+91" },
  { name: "Pakistan", code: "PK", flag: "🇵🇰", currency: "Pakistani Rupee", currencyCode: "PKR", currencySymbol: "Rs", exchangeRate: 278, language: "ur", phonePrefix: "+92" },
  { name: "Bangladesh", code: "BD", flag: "🇧🇩", currency: "Bangladeshi Taka", currencyCode: "BDT", currencySymbol: "৳", exchangeRate: 110, language: "bn", phonePrefix: "+880" },
  { name: "Philippines", code: "PH", flag: "🇵🇭", currency: "Philippine Peso", currencyCode: "PHP", currencySymbol: "₱", exchangeRate: 56, language: "tl", phonePrefix: "+63" },
  { name: "Indonesia", code: "ID", flag: "🇮🇩", currency: "Indonesian Rupiah", currencyCode: "IDR", currencySymbol: "Rp", exchangeRate: 15750, language: "id", phonePrefix: "+62" },
  { name: "Malaysia", code: "MY", flag: "🇲🇾", currency: "Malaysian Ringgit", currencyCode: "MYR", currencySymbol: "RM", exchangeRate: 4.7, language: "ms", phonePrefix: "+60" },
  { name: "Thailand", code: "TH", flag: "🇹🇭", currency: "Thai Baht", currencyCode: "THB", currencySymbol: "฿", exchangeRate: 35.5, language: "th", phonePrefix: "+66" },
  { name: "Vietnam", code: "VN", flag: "🇻🇳", currency: "Vietnamese Dong", currencyCode: "VND", currencySymbol: "₫", exchangeRate: 24500, language: "vi", phonePrefix: "+84" },
  { name: "Brazil", code: "BR", flag: "🇧🇷", currency: "Brazilian Real", currencyCode: "BRL", currencySymbol: "R$", exchangeRate: 5.1, language: "pt", phonePrefix: "+55" },
  { name: "Mexico", code: "MX", flag: "🇲🇽", currency: "Mexican Peso", currencyCode: "MXN", currencySymbol: "MX$", exchangeRate: 17.2, language: "es", phonePrefix: "+52" },
  { name: "Colombia", code: "CO", flag: "🇨🇴", currency: "Colombian Peso", currencyCode: "COP", currencySymbol: "COL$", exchangeRate: 3950, language: "es", phonePrefix: "+57" },
  { name: "Argentina", code: "AR", flag: "🇦🇷", currency: "Argentine Peso", currencyCode: "ARS", currencySymbol: "AR$", exchangeRate: 875, language: "es", phonePrefix: "+54" },
  { name: "Canada", code: "CA", flag: "🇨🇦", currency: "Canadian Dollar", currencyCode: "CAD", currencySymbol: "CA$", exchangeRate: 1.36, language: "en", phonePrefix: "+1" },
  { name: "Australia", code: "AU", flag: "🇦🇺", currency: "Australian Dollar", currencyCode: "AUD", currencySymbol: "AU$", exchangeRate: 1.53, language: "en", phonePrefix: "+61" },
  { name: "Germany", code: "DE", flag: "🇩🇪", currency: "Euro", currencyCode: "EUR", currencySymbol: "€", exchangeRate: 0.92, language: "de", phonePrefix: "+49" },
  { name: "France", code: "FR", flag: "🇫🇷", currency: "Euro", currencyCode: "EUR", currencySymbol: "€", exchangeRate: 0.92, language: "fr", phonePrefix: "+33" },
  { name: "Italy", code: "IT", flag: "🇮🇹", currency: "Euro", currencyCode: "EUR", currencySymbol: "€", exchangeRate: 0.92, language: "it", phonePrefix: "+39" },
  { name: "Spain", code: "ES", flag: "🇪🇸", currency: "Euro", currencyCode: "EUR", currencySymbol: "€", exchangeRate: 0.92, language: "es", phonePrefix: "+34" },
  { name: "Russia", code: "RU", flag: "🇷🇺", currency: "Russian Ruble", currencyCode: "RUB", currencySymbol: "₽", exchangeRate: 90, language: "ru", phonePrefix: "+7" },
  { name: "Turkey", code: "TR", flag: "🇹🇷", currency: "Turkish Lira", currencyCode: "TRY", currencySymbol: "₺", exchangeRate: 32, language: "tr", phonePrefix: "+90" },
  { name: "Egypt", code: "EG", flag: "🇪🇬", currency: "Egyptian Pound", currencyCode: "EGP", currencySymbol: "£E", exchangeRate: 31, language: "ar", phonePrefix: "+20" },
  { name: "Saudi Arabia", code: "SA", flag: "🇸🇦", currency: "Saudi Riyal", currencyCode: "SAR", currencySymbol: "﷼", exchangeRate: 3.75, language: "ar", phonePrefix: "+966" },
  { name: "UAE", code: "AE", flag: "🇦🇪", currency: "UAE Dirham", currencyCode: "AED", currencySymbol: "د.إ", exchangeRate: 3.67, language: "ar", phonePrefix: "+971" },
  { name: "Ethiopia", code: "ET", flag: "🇪🇹", currency: "Ethiopian Birr", currencyCode: "ETB", currencySymbol: "Br", exchangeRate: 56, language: "am", phonePrefix: "+251" },
  { name: "Tanzania", code: "TZ", flag: "🇹🇿", currency: "Tanzanian Shilling", currencyCode: "TZS", currencySymbol: "TSh", exchangeRate: 2540, language: "sw", phonePrefix: "+255" },
  { name: "Uganda", code: "UG", flag: "🇺🇬", currency: "Ugandan Shilling", currencyCode: "UGX", currencySymbol: "USh", exchangeRate: 3760, language: "en", phonePrefix: "+256" },
  { name: "Zimbabwe", code: "ZW", flag: "🇿🇼", currency: "Zimbabwean Dollar", currencyCode: "ZWL", currencySymbol: "Z$", exchangeRate: 360, language: "en", phonePrefix: "+263" },
  { name: "Cameroon", code: "CM", flag: "🇨🇲", currency: "Central African CFA", currencyCode: "XAF", currencySymbol: "CFA", exchangeRate: 600, language: "fr", phonePrefix: "+237" },
  { name: "Senegal", code: "SN", flag: "🇸🇳", currency: "West African CFA", currencyCode: "XOF", currencySymbol: "CFA", exchangeRate: 600, language: "fr", phonePrefix: "+221" },
  { name: "China", code: "CN", flag: "🇨🇳", currency: "Chinese Yuan", currencyCode: "CNY", currencySymbol: "¥", exchangeRate: 7.24, language: "zh", phonePrefix: "+86" },
  { name: "Japan", code: "JP", flag: "🇯🇵", currency: "Japanese Yen", currencyCode: "JPY", currencySymbol: "¥", exchangeRate: 150, language: "ja", phonePrefix: "+81" },
  { name: "South Korea", code: "KR", flag: "🇰🇷", currency: "South Korean Won", currencyCode: "KRW", currencySymbol: "₩", exchangeRate: 1330, language: "ko", phonePrefix: "+82" },
  { name: "Morocco", code: "MA", flag: "🇲🇦", currency: "Moroccan Dirham", currencyCode: "MAD", currencySymbol: "MAD", exchangeRate: 10, language: "ar", phonePrefix: "+212" },
  { name: "Ivory Coast", code: "CI", flag: "🇨🇮", currency: "West African CFA", currencyCode: "XOF", currencySymbol: "CFA", exchangeRate: 600, language: "fr", phonePrefix: "+225" },
  { name: "Zambia", code: "ZM", flag: "🇿🇲", currency: "Zambian Kwacha", currencyCode: "ZMW", currencySymbol: "ZK", exchangeRate: 26, language: "en", phonePrefix: "+260" },
  { name: "Malawi", code: "MW", flag: "🇲🇼", currency: "Malawian Kwacha", currencyCode: "MWK", currencySymbol: "MK", exchangeRate: 1730, language: "en", phonePrefix: "+265" },
  { name: "Nepal", code: "NP", flag: "🇳🇵", currency: "Nepalese Rupee", currencyCode: "NPR", currencySymbol: "Rs", exchangeRate: 133, language: "ne", phonePrefix: "+977" },
  { name: "Sri Lanka", code: "LK", flag: "🇱🇰", currency: "Sri Lankan Rupee", currencyCode: "LKR", currencySymbol: "Rs", exchangeRate: 313, language: "si", phonePrefix: "+94" },
  { name: "Myanmar", code: "MM", flag: "🇲🇲", currency: "Myanmar Kyat", currencyCode: "MMK", currencySymbol: "K", exchangeRate: 2100, language: "my", phonePrefix: "+95" },
  { name: "Cambodia", code: "KH", flag: "🇰🇭", currency: "Cambodian Riel", currencyCode: "KHR", currencySymbol: "៛", exchangeRate: 4100, language: "km", phonePrefix: "+855" },
  { name: "Ukraine", code: "UA", flag: "🇺🇦", currency: "Ukrainian Hryvnia", currencyCode: "UAH", currencySymbol: "₴", exchangeRate: 39, language: "uk", phonePrefix: "+380" },
  { name: "Poland", code: "PL", flag: "🇵🇱", currency: "Polish Zloty", currencyCode: "PLN", currencySymbol: "zł", exchangeRate: 3.97, language: "pl", phonePrefix: "+48" },
  { name: "Netherlands", code: "NL", flag: "🇳🇱", currency: "Euro", currencyCode: "EUR", currencySymbol: "€", exchangeRate: 0.92, language: "nl", phonePrefix: "+31" },
  { name: "Sweden", code: "SE", flag: "🇸🇪", currency: "Swedish Krona", currencyCode: "SEK", currencySymbol: "kr", exchangeRate: 10.5, language: "sv", phonePrefix: "+46" },
];

export function getCountryByCode(code: string): CountryInfo | undefined {
  return COUNTRIES.find((c) => c.code === code);
}

export function getCountryByName(name: string): CountryInfo | undefined {
  return COUNTRIES.find((c) => c.name.toLowerCase() === name.toLowerCase());
}

export function formatCurrency(usdAmount: number, country: CountryInfo): string {
  const localAmount = usdAmount * country.exchangeRate;
  if (localAmount >= 1_000_000) {
    return `${country.currencySymbol}${(localAmount / 1_000_000).toFixed(2)}M`;
  }
  if (localAmount >= 1000) {
    return `${country.currencySymbol}${localAmount.toLocaleString("en-US", { maximumFractionDigits: 0 })}`;
  }
  return `${country.currencySymbol}${localAmount.toFixed(2)}`;
}

export function formatDualCurrency(usdAmount: number, country: CountryInfo): string {
  const localStr = formatCurrency(usdAmount, country);
  return `$${usdAmount.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} (${localStr})`;
}
