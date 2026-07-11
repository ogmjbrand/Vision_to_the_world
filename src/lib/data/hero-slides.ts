export type HeroSlide = {
  id: string;
  video: string;
  poster: string;
  location: string;
};

export const heroSlides: HeroSlide[] = [
  {
    id: "golden-hour",
    video: "/media/hero/flight-window-golden-hour.mp4",
    poster: "/media/hero/flight-window-golden-hour-poster.jpg",
    location: "Somewhere Over Europe",
  },
  {
    id: "mexico-city",
    video: "/media/hero/flight-mexico-city-night-departure.mp4",
    poster: "/media/hero/flight-mexico-city-night-departure-poster.jpg",
    location: "Mexico City Departure",
  },
  {
    id: "frankfurt",
    video: "/media/hero/flight-frankfurt-starry-takeoff.mp4",
    poster: "/media/hero/flight-frankfurt-starry-takeoff-poster.jpg",
    location: "Frankfurt, Germany",
  },
];
