export type GalleryDestination = {
  slug: string;
  title: string;
  location: string;
  image: string;
  span?: "wide" | "tall";
};

export const galleryDestinations: GalleryDestination[] = [
  {
    slug: "giza-sphinx",
    title: "Stand before the Sphinx",
    location: "Giza, Egypt",
    image: "/media/gallery/egypt-sphinx.jpg",
    span: "tall",
  },
  {
    slug: "giza-pyramids",
    title: "Camel treks at the pyramids",
    location: "Giza, Egypt",
    image: "/media/gallery/egypt-pyramids-camels.jpg",
  },
  {
    slug: "giza-panorama",
    title: "All seven wonders in one view",
    location: "Giza, Egypt",
    image: "/media/gallery/egypt-pyramids-panorama.jpg",
    span: "wide",
  },
  {
    slug: "beachfront-dining",
    title: "Dinner on the water",
    location: "Saffron Beach",
    image: "/media/gallery/beachfront-dining.jpg",
    span: "tall",
  },
  {
    slug: "garden-villa",
    title: "Private tropical retreats",
    location: "Garden Villa Estate",
    image: "/media/gallery/tropical-garden-villa.jpg",
  },
  {
    slug: "sunset-road-trip",
    title: "Chasing sunsets on the road",
    location: "Open Road",
    image: "/media/gallery/sunset-road-trip.jpg",
  },
  {
    slug: "vineyard-sunset",
    title: "Golden hour over the vines",
    location: "Lakeside Vineyards",
    image: "/media/gallery/vineyard-lake-sunset.jpg",
  },
  {
    slug: "camel-caravan",
    title: "Caravans across the sand",
    location: "Giza, Egypt",
    image: "/media/gallery/egypt-camel-caravan.jpg",
  },
  {
    slug: "rainbow-valley",
    title: "Chasing rainbows",
    location: "Open Road",
    image: "/media/gallery/rainbow-valley.jpg",
  },
];
