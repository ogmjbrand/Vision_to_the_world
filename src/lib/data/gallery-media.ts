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
    title: "All seven wonders in one view",
    desc: "Giza, Egypt",
    url: "/media/hero/hero-clip-2.mp4",
    poster: "/media/gallery/egypt-pyramids-panorama.jpg",
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
    title: "Golden hour over the vines",
    desc: "Lakeside Vineyards",
    url: "/media/hero/hero-clip-1.mp4",
    poster: "/media/gallery/vineyard-lake-sunset.jpg",
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
];
