export type GalleryMediaItem = {
  id: number;
  type: "image" | "video";
  title: string;
  desc: string;
  url: string;
  poster?: string;
  span: string;
};

export const galleryMediaItems: GalleryMediaItem[] = [
  {
    id: 1,
    type: "image",
    title: "Stand before the Sphinx",
    desc: "Giza, Egypt",
    url: "/media/gallery/egypt-sphinx.jpg",
    span: "col-span-1 row-span-8",
  },
  {
    id: 2,
    type: "image",
    title: "Camel treks at the pyramids",
    desc: "Giza, Egypt",
    url: "/media/gallery/egypt-pyramids-camels.jpg",
    span: "col-span-1 row-span-4",
  },
  {
    id: 3,
    type: "video",
    title: "Wheels up for the next adventure",
    desc: "Mexico City Departure",
    url: "/media/hero/flight-mexico-city-night-departure.mp4",
    poster: "/media/hero/flight-mexico-city-night-departure-poster.jpg",
    span: "col-span-1 sm:col-span-2 row-span-4",
  },
  {
    id: 4,
    type: "image",
    title: "Dinner on the water",
    desc: "Saffron Beach",
    url: "/media/gallery/beachfront-dining.jpg",
    span: "col-span-1 row-span-8",
  },
  {
    id: 5,
    type: "image",
    title: "Private tropical retreats",
    desc: "Garden Villa Estate",
    url: "/media/gallery/tropical-garden-villa.jpg",
    span: "col-span-1 row-span-4",
  },
  {
    id: 6,
    type: "image",
    title: "Chasing sunsets on the road",
    desc: "Open Road",
    url: "/media/gallery/sunset-road-trip.jpg",
    span: "col-span-1 row-span-4",
  },
  {
    id: 7,
    type: "video",
    title: "Golden hour, thirty thousand feet up",
    desc: "Somewhere Over Europe",
    url: "/media/hero/flight-window-golden-hour.mp4",
    poster: "/media/hero/flight-window-golden-hour-poster.jpg",
    span: "col-span-1 sm:col-span-2 row-span-8",
  },
  {
    id: 8,
    type: "image",
    title: "Caravans across the sand",
    desc: "Giza, Egypt",
    url: "/media/gallery/egypt-camel-caravan.jpg",
    span: "col-span-1 row-span-4",
  },
  {
    id: 9,
    type: "image",
    title: "Chasing rainbows",
    desc: "Open Road",
    url: "/media/gallery/rainbow-valley.jpg",
    span: "col-span-1 row-span-4",
  },
  {
    id: 10,
    type: "video",
    title: "Two hearts, one sandbar",
    desc: "Zanzibar, Tanzania",
    url: "/media/gallery/zanzibar-sandbar.mp4",
    poster: "/media/gallery/zanzibar-sandbar-poster.jpg",
    span: "col-span-1 sm:col-span-2 row-span-8",
  },
  {
    id: 11,
    type: "video",
    title: "Beneath the reef, you coming soon?",
    desc: "Zanzibar, Tanzania",
    url: "/media/gallery/zanzibar-reef.mp4",
    poster: "/media/gallery/zanzibar-reef-poster.jpg",
    span: "col-span-1 row-span-4",
  },
  {
    id: 12,
    type: "video",
    title: "Sunset above the waves",
    desc: "Phuket, Thailand",
    url: "/media/gallery/phuket-beach-club.mp4",
    poster: "/media/gallery/phuket-beach-club-poster.jpg",
    span: "col-span-1 sm:col-span-2 row-span-4",
  },
];
