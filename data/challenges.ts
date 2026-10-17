import type { Category, Puzzle } from "@/types/game";

export const categories: Category[] = [
  "Population", "Geography", "Sports", "Technology", "Cars", "Luxury", "Finance",
  "Movies", "Music", "Animals", "Businesses", "Space", "Science", "History"
];

export const challenges: Puzzle[] = [
  { id: "pop-cities", category: "Population", title: "City scale", prompt: "Rank these cities by population", unit: "people",
    items: [
      { label: "Tokyo metro", value: 37400000, displayValue: "37.4M", explanation: "The Greater Tokyo Area is the world's largest metropolitan area." },
      { label: "Delhi metro", value: 32900000, displayValue: "32.9M", explanation: "Delhi's urban region has grown rapidly over recent decades." },
      { label: "Shanghai", value: 29200000, displayValue: "29.2M", explanation: "Shanghai is China's most populous city proper by many estimates." },
      { label: "São Paulo", value: 22400000, displayValue: "22.4M", explanation: "Brazil's largest metro area is also the biggest in the Americas." },
      { label: "Mexico City", value: 22100000, displayValue: "22.1M", explanation: "The Valley of Mexico is home to more than 22 million people." }
    ], sourceNote: "Approximate metropolitan-area estimates." },
  { id: "geo-mountains", category: "Geography", title: "Above the clouds", prompt: "Rank these mountains by height", unit: "meters",
    items: [
      { label: "Mount Everest", value: 8849, displayValue: "8,849 m", explanation: "Earth's highest mountain above sea level, on the Nepal–China border." },
      { label: "K2", value: 8611, displayValue: "8,611 m", explanation: "The second-highest peak is known for its especially difficult ascent." },
      { label: "Kangchenjunga", value: 8586, displayValue: "8,586 m", explanation: "The world's third-highest mountain lies on the India–Nepal border." },
      { label: "Lhotse", value: 8516, displayValue: "8,516 m", explanation: "Lhotse is connected to Everest by the South Col." },
      { label: "Makalu", value: 8485, displayValue: "8,485 m", explanation: "This sharply pyramidal peak is the fifth-highest on Earth." }
    ] },
  { id: "sports-sprint", category: "Sports", title: "Track legends", prompt: "Rank these 100m men's world records by time", unit: "seconds",
    items: [
      { label: "Usain Bolt (2009)", value: 958, displayValue: "9.58 s", explanation: "Bolt's Berlin world record has stood since 2009." },
      { label: "Tyson Gay (2009)", value: 969, displayValue: "9.69 s", explanation: "Gay set his personal best at the 2009 World Championships." },
      { label: "Yohan Blake (2012)", value: 969, displayValue: "9.69 s", explanation: "Blake ran 9.69 seconds in Lausanne in 2012." },
      { label: "Asafa Powell (2008)", value: 972, displayValue: "9.72 s", explanation: "Powell set this then-world record in 2008." },
      { label: "Justin Gatlin (2015)", value: 974, displayValue: "9.74 s", explanation: "Gatlin recorded his personal best in Doha." }
    ] },
  { id: "tech-companies", category: "Technology", title: "Tech titans", prompt: "Rank these companies by market cap (approx.)", unit: "trillions USD",
    items: [
      { label: "Apple", value: 3500, displayValue: "$3.5T", explanation: "Apple has repeatedly crossed the $3 trillion milestone." },
      { label: "Microsoft", value: 3200, displayValue: "$3.2T", explanation: "Microsoft's cloud and AI businesses have driven its valuation." },
      { label: "Nvidia", value: 2900, displayValue: "$2.9T", explanation: "Nvidia's GPUs power much of the current AI boom." },
      { label: "Alphabet", value: 2100, displayValue: "$2.1T", explanation: "Alphabet is the parent company of Google." },
      { label: "Amazon", value: 2200, displayValue: "$2.2T", explanation: "Amazon combines e-commerce with the leading cloud platform AWS." }
    ], sourceNote: "Illustrative values; market capitalizations change daily." },
  { id: "cars-speed", category: "Cars", title: "Speed machines", prompt: "Rank these cars by top speed", unit: "km/h",
    items: [
      { label: "Bugatti Chiron Super Sport", value: 490, displayValue: "490 km/h", explanation: "A modified pre-production car reached nearly 490 km/h in 2019." },
      { label: "Koenigsegg Jesko Absolut", value: 482, displayValue: "482 km/h*", explanation: "Theoretical top speed estimate; not yet independently verified." },
      { label: "SSC Tuatara", value: 455, displayValue: "455 km/h", explanation: "SSC reports this as a verified two-way average top speed." },
      { label: "Hennessey Venom F5", value: 437, displayValue: "437 km/h*", explanation: "Manufacturer target speed; top-speed attempts are ongoing." },
      { label: "McLaren Speedtail", value: 403, displayValue: "403 km/h", explanation: "McLaren's fastest road car reaches 250 mph." }
    ] },
  { id: "luxury-watches", category: "Luxury", title: "Timeless value", prompt: "Rank these watches by auction price", unit: "USD",
    items: [
      { label: "Patek Philippe Grandmaster Chime", value: 31000000, displayValue: "$31M", explanation: "One-off charity auction sale in 2019." },
      { label: "Rolex Paul Newman Daytona", value: 17800000, displayValue: "$17.8M", explanation: "Paul Newman's personal Rolex sold at Phillips in 2017." },
      { label: "Patek Philippe Henry Graves", value: 24000000, displayValue: "$24M", explanation: "The supercomplication sold for CHF 23.2 million in 2014." },
      { label: "Patek Philippe 1518", value: 11200000, displayValue: "$11.2M", explanation: "A stainless-steel 1518 sold at Phillips in 2016." },
      { label: "Rolex Bao Dai", value: 5060000, displayValue: "$5.06M", explanation: "The rare Rolex sold at auction in 2017." }
    ] },
  { id: "finance-companies", category: "Finance", title: "Market movers", prompt: "Rank these companies by market cap (approx.)", unit: "billions USD",
    items: [
      { label: "Berkshire Hathaway", value: 1000, displayValue: "$1.0T", explanation: "The first non-tech US company to reach a trillion-dollar valuation." },
      { label: "JPMorgan Chase", value: 700, displayValue: "$700B", explanation: "The largest US bank by assets." },
      { label: "Visa", value: 650, displayValue: "$650B", explanation: "Visa operates one of the world's largest payment networks." },
      { label: "Mastercard", value: 500, displayValue: "$500B", explanation: "Mastercard's global network processes billions of transactions." },
      { label: "Bank of America", value: 350, displayValue: "$350B", explanation: "One of the largest financial institutions in the United States." }
    ], sourceNote: "Illustrative values; market capitalizations change daily." },
  { id: "movies-boxoffice", category: "Movies", title: "Blockbuster scale", prompt: "Rank these movies by worldwide box office", unit: "billions USD",
    items: [
      { label: "Avatar", value: 292, displayValue: "$2.92B", explanation: "James Cameron's film reclaimed the top spot after a re-release." },
      { label: "Avengers: Endgame", value: 279, displayValue: "$2.80B", explanation: "Marvel's 2019 finale was briefly the highest-grossing film." },
      { label: "Avatar: The Way of Water", value: 232, displayValue: "$2.32B", explanation: "The long-awaited sequel became one of cinema's biggest hits." },
      { label: "Titanic", value: 226, displayValue: "$2.26B", explanation: "Titanic's worldwide total includes several successful re-releases." },
      { label: "Star Wars: The Force Awakens", value: 207, displayValue: "$2.07B", explanation: "The 2015 release became the highest-grossing film in North America." }
    ] },
  { id: "music-streams", category: "Music", title: "Streaming era", prompt: "Rank these songs by Spotify streams (approx.)", unit: "billions",
    items: [
      { label: "Blinding Lights", value: 4500, displayValue: "4.5B", explanation: "The Weeknd's synth-pop hit is Spotify's most-streamed song." },
      { label: "Shape of You", value: 4100, displayValue: "4.1B", explanation: "Ed Sheeran's 2017 hit was the first song to pass 3 billion streams." },
      { label: "Someone You Loved", value: 3600, displayValue: "3.6B", explanation: "Lewis Capaldi's breakout ballad became a global streaming staple." },
      { label: "Sunflower", value: 3500, displayValue: "3.5B", explanation: "Post Malone and Swae Lee recorded this for Spider-Man: Into the Spider-Verse." },
      { label: "As It Was", value: 3400, displayValue: "3.4B", explanation: "Harry Styles' 2022 single broke multiple streaming records." }
    ], sourceNote: "Stream counts are approximate and continue to change." },
  { id: "animals-weight", category: "Animals", title: "Gentle giants", prompt: "Rank these animals by typical adult weight", unit: "tonnes",
    items: [
      { label: "Blue whale", value: 150, displayValue: "150 t", explanation: "The largest animal known to have ever lived." },
      { label: "African bush elephant", value: 6, displayValue: "6 t", explanation: "The largest living land animal." },
      { label: "White rhinoceros", value: 2.3, displayValue: "2.3 t", explanation: "A large adult male can exceed two tonnes." },
      { label: "Hippopotamus", value: 1.8, displayValue: "1.8 t", explanation: "Hippos spend much of their day in or near water." },
      { label: "Giraffe", value: 1.2, displayValue: "1.2 t", explanation: "The tallest living land animal." }
    ] },
  { id: "business-brands", category: "Businesses", title: "Big brands", prompt: "Rank these brands by estimated value", unit: "billions USD",
    items: [
      { label: "Apple", value: 516, displayValue: "$516B", explanation: "Brand Finance ranked Apple the world's most valuable brand." },
      { label: "Microsoft", value: 340, displayValue: "$340B", explanation: "Its brand value has surged alongside cloud and AI growth." },
      { label: "Google", value: 333, displayValue: "$333B", explanation: "Google remains one of the world's most recognizable brands." },
      { label: "Amazon", value: 309, displayValue: "$309B", explanation: "The Amazon name spans retail, cloud, and entertainment." },
      { label: "Walmart", value: 96, displayValue: "$96B", explanation: "The world's largest retailer by revenue." }
    ], sourceNote: "Approximate Brand Finance 2024 estimates." },
  { id: "space-planets", category: "Space", title: "Planetary giants", prompt: "Rank these planets by diameter", unit: "kilometers",
    items: [
      { label: "Jupiter", value: 139820, displayValue: "139,820 km", explanation: "Jupiter is the largest planet in our solar system." },
      { label: "Saturn", value: 116460, displayValue: "116,460 km", explanation: "Saturn's rings extend far beyond its planetary diameter." },
      { label: "Uranus", value: 50724, displayValue: "50,724 km", explanation: "Uranus rotates on its side relative to its orbit." },
      { label: "Neptune", value: 49244, displayValue: "49,244 km", explanation: "Neptune is slightly smaller in diameter than Uranus." },
      { label: "Earth", value: 12742, displayValue: "12,742 km", explanation: "Our home planet is the largest of the rocky inner planets." }
    ] },
  { id: "science-elements", category: "Science", title: "Tiny atoms, big numbers", prompt: "Rank these elements by atomic number", unit: "protons",
    items: [
      { label: "Oganesson", value: 118, displayValue: "118", explanation: "The heaviest confirmed element, first synthesized in 2002." },
      { label: "Tennessine", value: 117, displayValue: "117", explanation: "A synthetic element named after the US state of Tennessee." },
      { label: "Livermorium", value: 116, displayValue: "116", explanation: "Named after the Lawrence Livermore National Laboratory." },
      { label: "Moscovium", value: 115, displayValue: "115", explanation: "A synthetic element named after the Moscow region." },
      { label: "Flerovium", value: 114, displayValue: "114", explanation: "Named for the Flerov Laboratory of Nuclear Reactions." }
    ] },
  { id: "history-empires", category: "History", title: "Empires at their peak", prompt: "Rank these empires by estimated land area", unit: "million km²",
    items: [
      { label: "British Empire", value: 35.5, displayValue: "35.5M km²", explanation: "At its largest in the early 20th century, it covered roughly a quarter of Earth's land." },
      { label: "Mongol Empire", value: 24, displayValue: "24M km²", explanation: "The largest contiguous land empire in history." },
      { label: "Russian Empire", value: 22.8, displayValue: "22.8M km²", explanation: "At its 19th-century height it spanned eastern Europe and northern Asia." },
      { label: "Qing dynasty", value: 14.7, displayValue: "14.7M km²", explanation: "The Qing dynasty ruled China at its greatest territorial extent." },
      { label: "Spanish Empire", value: 13.7, displayValue: "13.7M km²", explanation: "Spain's global empire reached across the Americas and beyond." }
    ] }
];

export function puzzleForCategory(category: Category): Puzzle {
  const matches = challenges.filter((challenge) => challenge.category === category);
  return matches[Math.floor(Math.random() * matches.length)] ?? challenges[0];
}
