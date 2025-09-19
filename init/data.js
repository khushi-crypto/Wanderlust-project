const sampleListings = [
  {
    title: "Cozy Beachfront Cottage",
    description:
      "Escape to this charming beachfront cottage for a relaxing getaway. Enjoy stunning ocean views and easy access to the beach.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    },
    price: 1500,
    location: "Malibu",
    country: "United States",
    reviews: [],
  },
  {
    title: "Modern Loft in Downtown",
    description:
      "Stay in the heart of the city in this stylish loft apartment. Perfect for urban explorers!",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    },
    price: 1200,
    location: "New York City",
    country: "United States",
    reviews: [],
  },
  {
    title: "Mountain Retreat",
    description:
      "Unplug and unwind in this peaceful mountain cabin. Surrounded by nature, it's a perfect place to recharge.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    },
    price: 1000,
    location: "Aspen",
    country: "United States",
    reviews: [],
  },
  {
    title: "Historic Villa in Tuscany",
    description:
      "Experience the charm of Tuscany in this beautifully restored villa. Explore the rolling hills and vineyards.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    },
    price: 2500,
    location: "Florence",
    country: "Italy",
    reviews: [],
  },
  {
    title: "Secluded Treehouse Getaway",
    description:
      "Live among the treetops in this unique treehouse retreat. A true nature lover's paradise.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    },
    price: 800,
    location: "Portland",
    country: "United States",
    reviews: [],
  },
  {
    title: "Desert Oasis in Dubai",
    description:
      "Experience luxury in the middle of the desert in this opulent oasis in Dubai with a private pool.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1518684079-3c830dcef090?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    },
    price: 5000,
    location: "Dubai",
    country: "United Arab Emirates",
    reviews: [],
  },
  {
    title: "Rustic Log Cabin in Montana",
    description:
      "Unplug and unwind in this cozy log cabin surrounded by the natural beauty of Montana.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1586375300773-8384e3e4916f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    },
    price: 1100,
    location: "Montana",
    country: "United States",
    reviews: [],
  },
  {
    title: "Beachfront Villa in Greece",
    description:
      "Enjoy the crystal-clear waters of the Mediterranean in this beautiful beachfront villa on a Greek island.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1602343168117-bb8ffe3e2e9f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    },
    price: 2500,
    location: "Mykonos",
    country: "Greece",
    reviews: [],
  },
  {
    title: "Eco-Friendly Treehouse Retreat",
    description:
      "Stay in an eco-friendly treehouse nestled in the forest. It's the perfect escape for nature lovers.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1488462237308-ecaa28b729d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    },
    price: 750,
    location: "Costa Rica",
    country: "Costa Rica",
    reviews: [],
  },
  {
    title: "Historic Cottage in Charleston",
    description:
      "Experience the charm of historic Charleston in this beautifully restored cottage with a private garden.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1587381420270-3e1a5b9e6904?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    },
    price: 1600,
    location: "Charleston",
    country: "United States",
    reviews: [],
  },

  // 🔥 NEW LISTINGS ADDED BELOW
  {
    title: "Luxury Penthouse with Skyline View",
    description:
      "Enjoy breathtaking views of the city from this modern penthouse with floor-to-ceiling windows and a private terrace.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    },
    price: 4500,
    location: "Singapore",
    country: "Singapore",
    reviews: [],
  },
  {
    title: "Lakeside A-Frame Cabin",
    description:
      "Relax in this stunning A-frame cabin located right on the lake. Perfect for weekend getaways and stargazing.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1600585154084-4e5fe7e0d4d1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    },
    price: 2000,
    location: "Lake Tahoe",
    country: "United States",
    reviews: [],
  },
  {
    title: "Minimalist Studio in Tokyo",
    description:
      "Experience Japanese minimalism in this cozy studio apartment, ideal for solo travelers or couples.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1551907234-280fa005d6a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    },
    price: 1800,
    location: "Tokyo",
    country: "Japan",
    reviews: [],
  },
  {
    title: "Countryside Farmhouse",
    description:
      "Stay in a peaceful farmhouse surrounded by fields and orchards. A great rural escape from the city noise.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1600607688969-2c3b92b0d06f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    },
    price: 900,
    location: "Punjab",
    country: "India",
    reviews: [],
  },
  {
    title: "Snowy Chalet in Swiss Alps",
    description:
      "A cozy chalet with a fireplace, perfect for ski trips and hot chocolate evenings with friends.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1600585154364-f0d9b5d64df0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    },
    price: 6000,
    location: "Zermatt",
    country: "Switzerland",
    reviews: [],
  },
  {
    title: "Luxury Houseboat Stay",
    description:
      "Experience the charm of Kerala backwaters with a stay on a fully equipped luxury houseboat.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1610620370221-5d10f8917ac8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    },
    price: 3200,
    location: "Alleppey",
    country: "India",
    reviews: [],
  },
  {
    title: "Cliffside Villa with Infinity Pool",
    description:
      "This cliffside villa offers breathtaking sunset views and a private infinity pool.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    },
    price: 7000,
    location: "Bali",
    country: "Indonesia",
    reviews: [],
  },
  {
    title: "Traditional Rajasthani Haveli",
    description:
      "Live like royalty in this heritage haveli featuring courtyards, jharokhas, and traditional decor.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1602940659805-907f0cc0d2c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    },
    price: 2800,
    location: "Jaipur",
    country: "India",
    reviews: [],
  },
];

module.exports = sampleListings;
