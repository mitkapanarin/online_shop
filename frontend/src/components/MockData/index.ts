import { IProduct } from "../../_Types";

export const mockData: IProduct[] = [
  {
    category: "tech",
    id: "apple-airpods-pro",
    attributes: [],
    name: "AirPods Pro",
    instock: false,
    gallery: [
      "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MWP22?wid=572&hei=572&fmt=jpeg&qlt=95&.v=1591634795000",
    ],
    prices: [
      {
        amount: 300.23,
        __typename: "Price",
        currency: {
          label: "USD",
          symbol: "$",
          __typename: "Currency",
        },
      },
    ],
    description:
      "<h3>Magic like you’ve never heard</h3> <p>AirPods Pro have been designed to deliver Active Noise Cancellation for immersive sound, Transparency mode so you can hear your surroundings, and a customizable fit for all-day comfort. Just like AirPods, AirPods Pro connect magically to your iPhone or Apple Watch. And they’re ready to use right out of the case. <h3>Active Noise Cancellation</h3> <p>Incredibly light noise-cancelling headphones, AirPods Pro block out your environment so you can focus on what you’re listening to. AirPods Pro use two microphones, an outward-facing microphone and an inward-facing microphone, to create superior noise cancellation. By continuously adapting to the geometry of your ear and the fit of the ear tips, Active Noise Cancellation silences the world to keep you fully tuned in to your music, podcasts, and calls. <h3>Transparency mode</h3> <p>Switch to Transparency mode and AirPods Pro let the outside sound in, allowing you to hear and connect to your surroundings. Outward- and inward-facing microphones enable AirPods Pro to undo the sound-isolating effect of the silicone tips so things sound and feel natural, like when you’re talking to people around you.</p> <h3>All-new design</h3> <p>AirPods Pro offer a more customizable fit with three sizes of flexible silicone tips to choose from. With an internal taper, they conform to the shape of your ear, securing your AirPods Pro in place and creating an exceptional seal for superior noise cancellation.</p> <h3>Amazing audio quality</h3> <p>A custom-built high-excursion, low-distortion driver delivers powerful bass. A superefficient high dynamic range amplifier produces pure, incredibly clear sound while also extending battery life. And Adaptive EQ automatically tunes music to suit the shape of your ear for a rich, consistent listening experience.</p> <h3>Even more magical</h3> <p>The Apple-designed H1 chip delivers incredibly low audio latency. A force sensor on the stem makes it easy to control music and calls and switch between Active Noise Cancellation and Transparency mode. Announce Messages with Siri gives you the option to have Siri read your messages through your AirPods. And with Audio Sharing, you and a friend can share the same audio stream on two sets of AirPods — so you can play a game, watch a movie, or listen to a song together.</p>",
    brand: "Apple",
    __typename: "Product",
  },
  {
    category: "tech",
    id: "apple-airtag",
    attributes: [],
    name: "AirTag",
    instock: true,
    gallery: [
      "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/airtag-double-select-202104?wid=445&hei=370&fmt=jpeg&qlt=95&.v=1617761672000",
    ],
    prices: [
      {
        amount: 120.57,
        __typename: "Price",
        currency: {
          label: "USD",
          symbol: "$",
          __typename: "Currency",
        },
      },
    ],
    description:
      "<h1>Lose your knack for losing things.</h1> <p>AirTag is an easy way to keep track of your stuff. Attach one to your keys, slip another one in your backpack. And just like that, they’re on your radar in the Find My app. AirTag has your back.</p>",
    brand: "Apple",
    __typename: "Product",
  },
  {
    category: "tech",
    id: "apple-imac-2021",
    attributes: [
      {
        id: "Capacity",
        name: "Capacity",
        items: [
          {
            id: "256GB",
            displayValue: "256GB",
            value: "256GB",
            __typename: "AttributeItem",
          },
          {
            id: "512GB",
            displayValue: "512GB",
            value: "512GB",
            __typename: "AttributeItem",
          },
        ],
        type: "text",
        __typename: "Attribute",
      },
      {
        id: "With USB 3 ports",
        name: "With USB 3 ports",
        items: [
          {
            id: "Yes",
            displayValue: "Yes",
            value: "Yes",
            __typename: "AttributeItem",
          },
          {
            id: "No",
            displayValue: "No",
            value: "No",
            __typename: "AttributeItem",
          },
        ],
        type: "text",
        __typename: "Attribute",
      },
      {
        id: "Touch ID in keyboard",
        name: "Touch ID in keyboard",
        items: [
          {
            id: "Yes",
            displayValue: "Yes",
            value: "Yes",
            __typename: "AttributeItem",
          },
          {
            id: "No",
            displayValue: "No",
            value: "No",
            __typename: "AttributeItem",
          },
        ],
        type: "text",
        __typename: "Attribute",
      },
    ],
    name: "iMac 2021",
    instock: true,
    gallery: [
      "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/imac-24-blue-selection-hero-202104?wid=904&hei=840&fmt=jpeg&qlt=80&.v=1617492405000",
    ],
    prices: [
      {
        amount: 1688.03,
        __typename: "Price",
        currency: {
          label: "USD",
          symbol: "$",
          __typename: "Currency",
        },
      },
    ],
    description: "The new iMac!",
    brand: "Apple",
    __typename: "Product",
  },
  {
    category: "tech",

    id: "apple-iphone-12-pro",
    attributes: [
      {
        id: "Capacity",
        name: "Capacity",
        items: [
          {
            id: "512G",
            displayValue: "512G",
            value: "512G",
            __typename: "AttributeItem",
          },
          {
            id: "1T",
            displayValue: "1T",
            value: "1T",
            __typename: "AttributeItem",
          },
        ],
        type: "text",
        __typename: "Attribute",
      },
      {
        id: "Color",
        name: "Color",
        items: [
          {
            id: "Green",
            displayValue: "Green",
            value: "#44FF03",
            __typename: "AttributeItem",
          },
          {
            id: "Cyan",
            displayValue: "Cyan",
            value: "#03FFF7",
            __typename: "AttributeItem",
          },
          {
            id: "Blue",
            displayValue: "Blue",
            value: "#030BFF",
            __typename: "AttributeItem",
          },
          {
            id: "Black",
            displayValue: "Black",
            value: "#000000",
            __typename: "AttributeItem",
          },
          {
            id: "White",
            displayValue: "White",
            value: "#FFFFFF",
            __typename: "AttributeItem",
          },
        ],
        type: "swatch",
        __typename: "Attribute",
      },
    ],
    name: "iPhone 12 Pro",
    instock: true,
    gallery: [
      "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-12-pro-family-hero?wid=940&amp;hei=1112&amp;fmt=jpeg&amp;qlt=80&amp;.v=1604021663000",
    ],
    prices: [
      {
        amount: 1000.76,
        __typename: "Price",
        currency: {
          label: "USD",
          symbol: "$",
          __typename: "Currency",
        },
      },
    ],
    description: "This is iPhone 12. Nothing else to say.",
    brand: "Apple",
    __typename: "Product",
  },
  {
    category: "tech",

    id: "huarache-x-stussy-le",
    attributes: [
      {
        id: "Size",
        name: "Size",
        items: [
          {
            id: "40",
            displayValue: "40",
            value: "40",
            __typename: "AttributeItem",
          },
          {
            id: "41",
            displayValue: "41",
            value: "41",
            __typename: "AttributeItem",
          },
          {
            id: "42",
            displayValue: "42",
            value: "42",
            __typename: "AttributeItem",
          },
          {
            id: "43",
            displayValue: "43",
            value: "43",
            __typename: "AttributeItem",
          },
        ],
        type: "text",
        __typename: "Attribute",
      },
    ],
    name: "Nike Air Huarache Le",
    instock: true,
    gallery: [
      "https://cdn.shopify.com/s/files/1/0087/6193/3920/products/DD1381200_DEOA_2_720x.jpg?v=1612816087",
      "https://cdn.shopify.com/s/files/1/0087/6193/3920/products/DD1381200_DEOA_1_720x.jpg?v=1612816087",
      "https://cdn.shopify.com/s/files/1/0087/6193/3920/products/DD1381200_DEOA_3_720x.jpg?v=1612816087",
      "https://cdn.shopify.com/s/files/1/0087/6193/3920/products/DD1381200_DEOA_5_720x.jpg?v=1612816087",
      "https://cdn.shopify.com/s/files/1/0087/6193/3920/products/DD1381200_DEOA_4_720x.jpg?v=1612816087",
    ],
    prices: [
      {
        amount: 144.69,
        __typename: "Price",
        currency: {
          label: "USD",
          symbol: "$",
          __typename: "Currency",
        },
      },
    ],
    description: "<p>Great sneakers for everyday use!</p>",
    brand: "Nike x Stussy",
    __typename: "Product",
  },
  {
    category: "tech",

    id: "jacket-canada-goosee",
    attributes: [
      {
        id: "Size",
        name: "Size",
        items: [
          {
            id: "Small",
            displayValue: "Small",
            value: "S",
            __typename: "AttributeItem",
          },
          {
            id: "Medium",
            displayValue: "Medium",
            value: "M",
            __typename: "AttributeItem",
          },
          {
            id: "Large",
            displayValue: "Large",
            value: "L",
            __typename: "AttributeItem",
          },
          {
            id: "Extra Large",
            displayValue: "Extra Large",
            value: "XL",
            __typename: "AttributeItem",
          },
        ],
        type: "text",
        __typename: "Attribute",
      },
    ],
    name: "Jacket",
    instock: true,
    gallery: [
      "https://images.canadagoose.com/image/upload/w_480,c_scale,f_auto,q_auto:best/v1576016105/product-image/2409L_61.jpg",
      "https://images.canadagoose.com/image/upload/w_480,c_scale,f_auto,q_auto:best/v1576016107/product-image/2409L_61_a.jpg",
      "https://images.canadagoose.com/image/upload/w_480,c_scale,f_auto,q_auto:best/v1576016108/product-image/2409L_61_b.jpg",
      "https://images.canadagoose.com/image/upload/w_480,c_scale,f_auto,q_auto:best/v1576016109/product-image/2409L_61_c.jpg",
      "https://images.canadagoose.com/image/upload/w_480,c_scale,f_auto,q_auto:best/v1576016110/product-image/2409L_61_d.jpg",
      "https://images.canadagoose.com/image/upload/w_1333,c_scale,f_auto,q_auto:best/v1634058169/product-image/2409L_61_o.png",
      "https://images.canadagoose.com/image/upload/w_1333,c_scale,f_auto,q_auto:best/v1634058159/product-image/2409L_61_p.png",
    ],
    prices: [
      {
        amount: 518.47,
        __typename: "Price",
        currency: {
          label: "USD",
          symbol: "$",
          __typename: "Currency",
        },
      },
    ],
    description: "<p>Awesome winter jacket</p>",
    brand: "Canada Goose",
    __typename: "Product",
  },
  {
    category: "tech",

    id: "ps-5",
    attributes: [
      {
        id: "Color",
        name: "Color",
        items: [
          {
            id: "Green",
            displayValue: "Green",
            value: "#44FF03",
            __typename: "AttributeItem",
          },
          {
            id: "Cyan",
            displayValue: "Cyan",
            value: "#03FFF7",
            __typename: "AttributeItem",
          },
          {
            id: "Blue",
            displayValue: "Blue",
            value: "#030BFF",
            __typename: "AttributeItem",
          },
          {
            id: "Black",
            displayValue: "Black",
            value: "#000000",
            __typename: "AttributeItem",
          },
          {
            id: "White",
            displayValue: "White",
            value: "#FFFFFF",
            __typename: "AttributeItem",
          },
        ],
        type: "swatch",
        __typename: "Attribute",
      },
      {
        id: "Capacity",
        name: "Capacity",
        items: [
          {
            id: "512G",
            displayValue: "512G",
            value: "512G",
            __typename: "AttributeItem",
          },
          {
            id: "1T",
            displayValue: "1T",
            value: "1T",
            __typename: "AttributeItem",
          },
        ],
        type: "text",
        __typename: "Attribute",
      },
    ],
    name: "PlayStation 5",
    instock: false,
    gallery: [
      "https://images-na.ssl-images-amazon.com/images/I/510VSJ9mWDL._SL1262_.jpg",
      "https://images-na.ssl-images-amazon.com/images/I/610%2B69ZsKCL._SL1500_.jpg",
      "https://images-na.ssl-images-amazon.com/images/I/51iPoFwQT3L._SL1230_.jpg",
      "https://images-na.ssl-images-amazon.com/images/I/61qbqFcvoNL._SL1500_.jpg",
      "https://images-na.ssl-images-amazon.com/images/I/51HCjA3rqYL._SL1230_.jpg",
    ],
    prices: [
      {
        amount: 844.02,
        __typename: "Price",
        currency: {
          label: "USD",
          symbol: "$",
          __typename: "Currency",
        },
      },
    ],
    description:
      "<p>A good gaming console. Plays games of PS4! Enjoy if you can buy it mwahahahaha</p>",
    brand: "Sony",
    __typename: "Product",
  },
  {
    category: "tech",

    id: "xbox-series-s",
    attributes: [
      {
        id: "Color",
        name: "Color",
        items: [
          {
            id: "Green",
            displayValue: "Green",
            value: "#44FF03",
            __typename: "AttributeItem",
          },
          {
            id: "Cyan",
            displayValue: "Cyan",
            value: "#03FFF7",
            __typename: "AttributeItem",
          },
          {
            id: "Blue",
            displayValue: "Blue",
            value: "#030BFF",
            __typename: "AttributeItem",
          },
          {
            id: "Black",
            displayValue: "Black",
            value: "#000000",
            __typename: "AttributeItem",
          },
          {
            id: "White",
            displayValue: "White",
            value: "#FFFFFF",
            __typename: "AttributeItem",
          },
        ],
        type: "swatch",
        __typename: "Attribute",
      },
      {
        id: "Capacity",
        name: "Capacity",
        items: [
          {
            id: "512G",
            displayValue: "512G",
            value: "512G",
            __typename: "AttributeItem",
          },
          {
            id: "1T",
            displayValue: "1T",
            value: "1T",
            __typename: "AttributeItem",
          },
        ],
        type: "text",
        __typename: "Attribute",
      },
    ],
    name: "Xbox Series S 512GB",
    instock: false,
    gallery: [
      "https://images-na.ssl-images-amazon.com/images/I/71vPCX0bS-L._SL1500_.jpg",
      "https://images-na.ssl-images-amazon.com/images/I/71q7JTbRTpL._SL1500_.jpg",
      "https://images-na.ssl-images-amazon.com/images/I/71iQ4HGHtsL._SL1500_.jpg",
      "https://images-na.ssl-images-amazon.com/images/I/61IYrCrBzxL._SL1500_.jpg",
      "https://images-na.ssl-images-amazon.com/images/I/61RnXmpAmIL._SL1500_.jpg",
    ],
    prices: [
      {
        amount: 333.99,
        __typename: "Price",
        currency: {
          label: "USD",
          symbol: "$",
          __typename: "Currency",
        },
      },
    ],
    description:
      "<div> <ul> <li><span>Hardware-beschleunigtes Raytracing macht dein Spiel noch realistischer</span></li> <li><span>Spiele Games mit bis zu 120 Bilder pro Sekunde</span></li> <li><span>Minimiere Ladezeiten mit einer speziell entwickelten 512GB NVMe SSD und wechsle mit Quick Resume nahtlos zwischen mehreren Spielen.</span></li> <li><span>Xbox Smart Delivery stellt sicher, dass du die beste Version deines Spiels spielst, egal, auf welcher Konsole du spielst</span></li> <li><span>Spiele deine Xbox One-Spiele auf deiner Xbox Series S weiter. Deine Fortschritte, Erfolge und Freundesliste werden automatisch auf das neue System übertragen.</span></li> <li><span>Erwecke deine Spiele und Filme mit innovativem 3D Raumklang zum Leben</span></li> <li><span>Der brandneue Xbox Wireless Controller zeichnet sich durch höchste Präzision, eine neue Share-Taste und verbesserte Ergonomie aus</span></li> <li><span>Ultra-niedrige Latenz verbessert die Reaktionszeit von Controller zum Fernseher</span></li> <li><span>Verwende dein Xbox One-Gaming-Zubehör -einschließlich Controller, Headsets und mehr</span></li> <li><span>Erweitere deinen Speicher mit der Seagate 1 TB-Erweiterungskarte für Xbox Series X (separat erhältlich) und streame 4K-Videos von Disney+, Netflix, Amazon, Microsoft Movies &amp; TV und mehr</span></li> </ul> </div>",
    brand: "Microsoft",
    __typename: "Product",
  },
];
