import type { Movie, MovieRow as MovieRowType } from '@/types';

export const FEATURED_MOVIE: Movie = {
  id: 'stranger-things-s5',
  title: 'Stranger Things',
  description:
    'When a young boy vanishes, a small town uncovers a mystery involving secret experiments, terrifying supernatural forces and one strange little girl. The final season brings the battle against the Upside Down to its epic conclusion.',
  genre: 'Sci-Fi, Horror, Drama',
  year: 2024,
  rating: 'TV-14',
  score: 97,
  duration: '4 Seasons',
  thumbnail: 'https://picsum.photos/seed/stranger-things/400/225',
  backdrop: 'https://picsum.photos/seed/stranger-things-bg/1920/1080',
  isTrending: true,
  isNew: true,
  type: 'tv'
};

export const ALL_MOVIES: Movie[] = [
  {
    id: 'oppenheimer',
    title: 'Oppenheimer',
    description:
      'The story of J. Robert Oppenheimer and his role in the development of the atomic bomb during World War II.',
    genre: 'Drama, History, Thriller',
    year: 2023,
    rating: 'R',
    score: 94,
    duration: '3h',
    thumbnail: 'https://picsum.photos/seed/oppenheimer/400/225',
    backdrop: 'https://picsum.photos/seed/oppenheimer-bg/1920/1080',
    isTrending: true,
    isNew: false,
    type: 'movie'
  },
  {
    id: 'barbie',
    title: 'Barbie',
    description:
      'Barbie and Ken are having the time of their lives in the colorful and seemingly perfect world of Barbie Land. When they get a chance to go to the real world, things get complicated.',
    genre: 'Comedy, Adventure, Fantasy',
    year: 2023,
    rating: 'PG-13',
    score: 88,
    duration: '1h 54m',
    thumbnail: 'https://picsum.photos/seed/barbie/400/225',
    backdrop: 'https://picsum.photos/seed/barbie-bg/1920/1080',
    isTrending: false,
    isNew: false,
    type: 'movie'
  },
  {
    id: 'dune-part-two',
    title: 'Dune: Part Two',
    description:
      'Paul Atreides unites with Chani and the Fremen while seeking revenge against the conspirators who destroyed his family.',
    genre: 'Sci-Fi, Adventure, Drama',
    year: 2024,
    rating: 'PG-13',
    score: 92,
    duration: '2h 46m',
    thumbnail: 'https://picsum.photos/seed/dune2/400/225',
    backdrop: 'https://picsum.photos/seed/dune2-bg/1920/1080',
    isTrending: true,
    isNew: true,
    type: 'movie'
  },
  {
    id: 'poor-things',
    title: 'Poor Things',
    description:
      'The incredible tale about the fantastical evolution of Bella Baxter, a young woman brought back to life by the brilliant and unorthodox scientist Dr. Godwin Baxter.',
    genre: 'Comedy, Drama, Romance',
    year: 2023,
    rating: 'R',
    score: 91,
    duration: '2h 21m',
    thumbnail: 'https://picsum.photos/seed/poor-things/400/225',
    backdrop: 'https://picsum.photos/seed/poor-things-bg/1920/1080',
    isTrending: false,
    isNew: false,
    type: 'movie'
  },
  {
    id: 'killers-flower-moon',
    title: 'Killers of the Flower Moon',
    description:
      'Members of the Osage Nation are murdered under mysterious circumstances in the 1920s, sparking a major FBI investigation.',
    genre: 'Crime, Drama, History',
    year: 2023,
    rating: 'R',
    score: 89,
    duration: '3h 26m',
    thumbnail: 'https://picsum.photos/seed/killers-flower/400/225',
    backdrop: 'https://picsum.photos/seed/killers-flower-bg/1920/1080',
    isTrending: false,
    isNew: false,
    type: 'movie'
  },
  {
    id: 'past-lives',
    title: 'Past Lives',
    description:
      'Two childhood friends are separated and then reunited over two decades, forced to confront notions of love, fate, and the choices that make a life.',
    genre: 'Drama, Romance',
    year: 2023,
    rating: 'PG-13',
    score: 96,
    duration: '1h 46m',
    thumbnail: 'https://picsum.photos/seed/past-lives/400/225',
    backdrop: 'https://picsum.photos/seed/past-lives-bg/1920/1080',
    isTrending: false,
    isNew: false,
    type: 'movie'
  },
  {
    id: 'the-holdovers',
    title: 'The Holdovers',
    description:
      'A curmudgeonly instructor at a New England prep school is forced to remain on campus during Christmas break to babysit the handful of students with nowhere to go.',
    genre: 'Comedy, Drama',
    year: 2023,
    rating: 'R',
    score: 90,
    duration: '2h 13m',
    thumbnail: 'https://picsum.photos/seed/holdovers/400/225',
    backdrop: 'https://picsum.photos/seed/holdovers-bg/1920/1080',
    isTrending: false,
    isNew: false,
    type: 'movie'
  },
  {
    id: 'maestro',
    title: 'Maestro',
    description:
      'A towering and fearless love story chronicling the lifelong relationship between Leonard Bernstein and Felicia Montealegre Cohn Bernstein.',
    genre: 'Biography, Drama, Music',
    year: 2023,
    rating: 'R',
    score: 82,
    duration: '2h 9m',
    thumbnail: 'https://picsum.photos/seed/maestro/400/225',
    backdrop: 'https://picsum.photos/seed/maestro-bg/1920/1080',
    isTrending: false,
    isNew: false,
    type: 'movie'
  },
  {
    id: 'society-snow',
    title: 'Society of the Snow',
    description:
      'A Uruguayan rugby team stranded in the Andes following a plane crash must resort to extreme measures to survive.',
    genre: 'Drama, History, Thriller',
    year: 2023,
    rating: 'R',
    score: 93,
    duration: '2h 24m',
    thumbnail: 'https://picsum.photos/seed/society-snow/400/225',
    backdrop: 'https://picsum.photos/seed/society-snow-bg/1920/1080',
    isTrending: true,
    isNew: false,
    type: 'movie'
  },
  {
    id: 'leave-world-behind',
    title: 'Leave the World Behind',
    description:
      'A family vacation is disrupted by two strangers bearing news of a mysterious blackout. As the threat grows, both families must navigate a terrifying new reality.',
    genre: 'Drama, Mystery, Thriller',
    year: 2023,
    rating: 'R',
    score: 67,
    duration: '2h 18m',
    thumbnail: 'https://picsum.photos/seed/leave-world/400/225',
    backdrop: 'https://picsum.photos/seed/leave-world-bg/1920/1080',
    isTrending: false,
    isNew: false,
    type: 'movie'
  },
  {
    id: 'rebel-ridge',
    title: 'Rebel Ridge',
    description:
      'A former Marine arrives in a small Southern town to pay his cousin\'s bail, only to have his money seized by corrupt local police.',
    genre: 'Action, Thriller',
    year: 2024,
    rating: 'R',
    score: 88,
    duration: '2h 10m',
    thumbnail: 'https://picsum.photos/seed/rebel-ridge/400/225',
    backdrop: 'https://picsum.photos/seed/rebel-ridge-bg/1920/1080',
    isTrending: true,
    isNew: true,
    type: 'movie'
  },
  {
    id: 'atlas',
    title: 'Atlas',
    description:
      'A data analyst with a deep distrust of AI joins a mission to capture a renegade robot with whom she shares a mysterious past.',
    genre: 'Action, Sci-Fi',
    year: 2024,
    rating: 'PG-13',
    score: 55,
    duration: '1h 58m',
    thumbnail: 'https://picsum.photos/seed/atlas-movie/400/225',
    backdrop: 'https://picsum.photos/seed/atlas-movie-bg/1920/1080',
    isTrending: false,
    isNew: true,
    type: 'movie'
  }
];

export const ALL_TV_SHOWS: Movie[] = [
  {
    id: 'stranger-things',
    title: 'Stranger Things',
    description:
      'When a young boy vanishes, a small town uncovers a mystery involving secret experiments, terrifying supernatural forces and one strange little girl.',
    genre: 'Sci-Fi, Horror, Drama',
    year: 2016,
    rating: 'TV-14',
    score: 97,
    duration: '4 Seasons',
    thumbnail: 'https://picsum.photos/seed/stranger-things/400/225',
    backdrop: 'https://picsum.photos/seed/stranger-things-bg/1920/1080',
    isTrending: true,
    isNew: false,
    type: 'tv'
  },
  {
    id: 'the-crown',
    title: 'The Crown',
    description:
      'This drama follows the political rivalries and romance of Queen Elizabeth II\'s reign and the events that shaped the second half of the 20th century.',
    genre: 'Drama, History, Biography',
    year: 2016,
    rating: 'TV-MA',
    score: 88,
    duration: '6 Seasons',
    thumbnail: 'https://picsum.photos/seed/the-crown/400/225',
    backdrop: 'https://picsum.photos/seed/the-crown-bg/1920/1080',
    isTrending: false,
    isNew: false,
    type: 'tv'
  },
  {
    id: 'wednesday',
    title: 'Wednesday',
    description:
      'Smart, sarcastic and a little dead inside, Wednesday Addams investigates a murder spree while making new friends and enemies at Nevermore Academy.',
    genre: 'Comedy, Fantasy, Horror',
    year: 2022,
    rating: 'TV-14',
    score: 91,
    duration: '2 Seasons',
    thumbnail: 'https://picsum.photos/seed/wednesday/400/225',
    backdrop: 'https://picsum.photos/seed/wednesday-bg/1920/1080',
    isTrending: true,
    isNew: true,
    type: 'tv'
  },
  {
    id: 'squid-game',
    title: 'Squid Game',
    description:
      'Hundreds of cash-strapped players accept a strange invitation to compete in children\'s games. Inside, a tempting prize awaits with deadly high stakes.',
    genre: 'Action, Drama, Mystery',
    year: 2021,
    rating: 'TV-MA',
    score: 95,
    duration: '2 Seasons',
    thumbnail: 'https://picsum.photos/seed/squid-game/400/225',
    backdrop: 'https://picsum.photos/seed/squid-game-bg/1920/1080',
    isTrending: true,
    isNew: false,
    type: 'tv'
  },
  {
    id: 'bridgerton',
    title: 'Bridgerton',
    description:
      'Wealth, lust, and betrayal set against the backdrop of Regency-era England, seen through the eyes of the powerful Bridgerton family.',
    genre: 'Drama, Romance',
    year: 2020,
    rating: 'TV-MA',
    score: 83,
    duration: '3 Seasons',
    thumbnail: 'https://picsum.photos/seed/bridgerton/400/225',
    backdrop: 'https://picsum.photos/seed/bridgerton-bg/1920/1080',
    isTrending: false,
    isNew: false,
    type: 'tv'
  },
  {
    id: 'ozark',
    title: 'Ozark',
    description:
      'A financial advisor drags his family from Chicago to the Missouri Ozarks, where he must launder money to appease a drug boss.',
    genre: 'Crime, Drama, Thriller',
    year: 2017,
    rating: 'TV-MA',
    score: 92,
    duration: '4 Seasons',
    thumbnail: 'https://picsum.photos/seed/ozark/400/225',
    backdrop: 'https://picsum.photos/seed/ozark-bg/1920/1080',
    isTrending: false,
    isNew: false,
    type: 'tv'
  },
  {
    id: 'dark',
    title: 'Dark',
    description:
      'A family saga with a supernatural twist, set in a German town where the disappearance of two young children exposes the relationships among four families.',
    genre: 'Crime, Drama, Mystery',
    year: 2017,
    rating: 'TV-MA',
    score: 96,
    duration: '3 Seasons',
    thumbnail: 'https://picsum.photos/seed/dark-show/400/225',
    backdrop: 'https://picsum.photos/seed/dark-show-bg/1920/1080',
    isTrending: false,
    isNew: false,
    type: 'tv'
  },
  {
    id: 'money-heist',
    title: 'Money Heist',
    description:
      'A criminal mastermind who goes by "The Professor" has a plan to pull off the biggest heist in recorded history — to print billions of euros in the Royal Mint of Spain.',
    genre: 'Action, Crime, Mystery',
    year: 2017,
    rating: 'TV-MA',
    score: 90,
    duration: '5 Seasons',
    thumbnail: 'https://picsum.photos/seed/money-heist/400/225',
    backdrop: 'https://picsum.photos/seed/money-heist-bg/1920/1080',
    isTrending: false,
    isNew: false,
    type: 'tv'
  }
];

export const MOVIE_ROWS: MovieRowType[] = [
  {
    id: 'trending',
    title: 'Trending Now',
    movies: ALL_MOVIES.filter((m) => m.isTrending)
  },
  {
    id: 'new-arrivals',
    title: 'New Arrivals',
    movies: ALL_MOVIES.filter((m) => m.isNew)
  },
  {
    id: 'top-movies',
    title: 'Top Movies',
    movies: ALL_MOVIES.slice(0, 8)
  },
  {
    id: 'top-tv',
    title: 'Popular TV Shows',
    movies: ALL_TV_SHOWS
  },
  {
    id: 'action',
    title: 'Action & Adventure',
    movies: ALL_MOVIES.filter((m) => m.genre.includes('Action') || m.genre.includes('Thriller'))
  },
  {
    id: 'drama',
    title: 'Award-Winning Dramas',
    movies: ALL_MOVIES.filter((m) => m.genre.includes('Drama'))
  }
];
