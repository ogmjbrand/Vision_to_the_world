export type HeroSlide = {
  id: string;
  image: string;
  location: string;
};

export const heroSlides: HeroSlide[] = [
  {
    id: "giza",
    image: "/media/gallery/egypt-pyramids-panorama.jpg",
    location: "Giza, Egypt",
  },
  {
    id: "vineyard",
    image: "/media/gallery/vineyard-lake-sunset.jpg",
    location: "Lakeside Vineyards",
  },
  {
    id: "beach",
    image: "/media/gallery/beachfront-dining.jpg",
    location: "Saffron Beach",
  },
  {
    id: "rainbow",
    image: "/media/gallery/rainbow-valley.jpg",
    location: "Open Road",
  },
];
