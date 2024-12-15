-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 24, 2024 at 07:54 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `shop_database`
--

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `__typename` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `name`, `__typename`) VALUES
(1, 'all', 'Category'),
(2, 'clothes', 'Category'),
(3, 'tech', 'Category');

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` varchar(255) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `instock` tinyint(1) DEFAULT NULL,
  `gallery` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`gallery`)),
  `description` text DEFAULT NULL,
  `brand` varchar(255) DEFAULT NULL,
  `category` varchar(255) DEFAULT NULL,
  `__typename` varchar(255) DEFAULT NULL,
  `prices` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`prices`)),
  `attributes` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`attributes`))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `name`, `instock`, `gallery`, `description`, `brand`, `category`, `__typename`, `prices`, `attributes`) VALUES
('apple-airpods-pro', 'AirPods Pro', 0, '[\"https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MWP22?wid=572&hei=572&fmt=jpeg&qlt=95&.v=1591634795000\"]', '<h3>Magic like you’ve never heard</h3> <p>AirPods Pro have been designed to deliver Active Noise Cancellation for immersive sound, Transparency mode so you can hear your surroundings, and a customizable fit for all-day comfort. Just like AirPods, AirPods Pro connect magically to your iPhone or Apple Watch. And they’re ready to use right out of the case. <h3>Active Noise Cancellation</h3> <p>Incredibly light noise-cancelling headphones, AirPods Pro block out your environment so you can focus on what you’re listening to. AirPods Pro use two microphones, an outward-facing microphone and an inward-facing microphone, to create superior noise cancellation. By continuously adapting to the geometry of your ear and the fit of the ear tips, Active Noise Cancellation silences the world to keep you fully tuned in to your music, podcasts, and calls. <h3>Transparency mode</h3> <p>Switch to Transparency mode and AirPods Pro let the outside sound in, allowing you to hear and connect to your surroundings. Outward- and inward-facing microphones enable AirPods Pro to undo the sound-isolating effect of the silicone tips so things sound and feel natural, like when you’re talking to people around you.</p> <h3>All-new design</h3> <p>AirPods Pro offer a more customizable fit with three sizes of flexible silicone tips to choose from. With an internal taper, they conform to the shape of your ear, securing your AirPods Pro in place and creating an exceptional seal for superior noise cancellation.</p> <h3>Amazing audio quality</h3> <p>A custom-built high-excursion, low-distortion driver delivers powerful bass. A superefficient high dynamic range amplifier produces pure, incredibly clear sound while also extending battery life. And Adaptive EQ automatically tunes music to suit the shape of your ear for a rich, consistent listening experience.</p> <h3>Even more magical</h3> <p>The Apple-designed H1 chip delivers incredibly low audio latency. A force sensor on the stem makes it easy to control music and calls and switch between Active Noise Cancellation and Transparency mode. Announce Messages with Siri gives you the option to have Siri read your messages through your AirPods. And with Audio Sharing, you and a friend can share the same audio stream on two sets of AirPods — so you can play a game, watch a movie, or listen to a song together.</p>', 'Apple', 'tech', 'Product', '[\n{\n\"amount\": 300.23,\n\"currency\": {\n\"label\": \"USD\",\n\"symbol\": \"$\",\n\"__typename\": \"Currency\"\n},\n\"__typename\": \"Price\"\n}\n]', '[]'),
('apple-airtag', 'AirTag', 1, '[\"https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/airtag-double-select-202104?wid=445&hei=370&fmt=jpeg&qlt=95&.v=1617761672000\"]', '<h1>Lose your knack for losing things.</h1> <p>AirTag is an easy way to keep track of your stuff. Attach one to your keys, slip another one in your backpack. And just like that, they’re on your radar in the Find My app. AirTag has your back.</p>', 'Apple', 'tech', 'Product', '[\n{\n\"amount\": 120.57,\n\"currency\": {\n\"label\": \"USD\",\n\"symbol\": \"$\",\n\"__typename\": \"Currency\"\n},\n\"__typename\": \"Price\"\n}\n]', '[]'),
('apple-imac-2021', 'iMac 2021', 1, '[\"https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/imac-24-blue-selection-hero-202104?wid=904&hei=840&fmt=jpeg&qlt=80&.v=1617492405000\"]', 'The new iMac!', 'Apple', 'tech', 'Product', '[\n{\n\"amount\": 1688.03,\n\"currency\": {\n\"label\": \"USD\",\n\"symbol\": \"$\",\n\"__typename\": \"Currency\"\n},\n\"__typename\": \"Price\"\n}\n]', ' [\n{\n\"id\": \"Capacity\",\n\"items\": [\n{\n\"displayValue\": \"256GB\",\n\"value\": \"256GB\",\n\"id\": \"256GB\",\n\"__typename\": \"Attribute\"\n},\n{\n\"displayValue\": \"512GB\",\n\"value\": \"512GB\",\n\"id\": \"512GB\",\n\"__typename\": \"Attribute\"\n}\n],\n\"name\": \"Capacity\",\n\"type\": \"text\",\n\"__typename\": \"AttributeSet\"\n},\n{\n\"id\": \"With USB 3 ports\",\n\"items\": [\n{\n\"displayValue\": \"Yes\",\n\"value\": \"Yes\",\n\"id\": \"Yes\",\n\"__typename\": \"Attribute\"\n},\n{\n\"displayValue\": \"No\",\n\"value\": \"No\",\n\"id\": \"No\",\n\"__typename\": \"Attribute\"\n}\n],\n\"name\": \"With USB 3 ports\",\n\"type\": \"text\",\n\"__typename\": \"AttributeSet\"\n},\n{\n\"id\": \"Touch ID in keyboard\",\n\"items\": [\n{\n\"displayValue\": \"Yes\",\n\"value\": \"Yes\",\n\"id\": \"Yes\",\n\"__typename\": \"Attribute\"\n},\n{\n\"displayValue\": \"No\",\n\"value\": \"No\",\n\"id\": \"No\",\n\"__typename\": \"Attribute\"\n}\n],\n\"name\": \"Touch ID in keyboard\",\n\"type\": \"text\",\n\"__typename\": \"AttributeSet\"\n}\n]'),
('apple-iphone-12-pro', 'iPhone 12 Pro', 1, '[\"https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-12-pro-family-hero?wid=940&amp;hei=1112&amp;fmt=jpeg&amp;qlt=80&amp;.v=1604021663000\"]', 'This is iPhone 12. Nothing else to say.', 'Apple', 'tech', 'Product', '[\n{\n\"amount\": 1000.76,\n\"currency\": {\n\"label\": \"USD\",\n\"symbol\": \"$\",\n\"__typename\": \"Currency\"\n},\n\"__typename\": \"Price\"\n}\n]', '[\n{\n\"id\": \"Capacity\",\n\"items\": [\n{\n\"displayValue\": \"512G\",\n\"value\": \"512G\",\n\"id\": \"512G\",\n\"__typename\": \"Attribute\"\n},\n{\n\"displayValue\": \"1T\",\n\"value\": \"1T\",\n\"id\": \"1T\",\n\"__typename\": \"Attribute\"\n}\n],\n\"name\": \"Capacity\",\n\"type\": \"text\",\n\"__typename\": \"AttributeSet\"\n},\n{\n\"id\": \"Color\",\n\"items\": [\n{\n\"displayValue\": \"Green\",\n\"value\": \"#44FF03\",\n\"id\": \"Green\",\n\"__typename\": \"Attribute\"\n},\n{\n\"displayValue\": \"Cyan\",\n\"value\": \"#03FFF7\",\n\"id\": \"Cyan\",\n\"__typename\": \"Attribute\"\n},\n{\n\"displayValue\": \"Blue\",\n\"value\": \"#030BFF\",\n\"id\": \"Blue\",\n\"__typename\": \"Attribute\"\n},\n{\n\"displayValue\": \"Black\",\n\"value\": \"#000000\",\n\"id\": \"Black\",\n\"__typename\": \"Attribute\"\n},\n{\n\"displayValue\": \"White\",\n\"value\": \"#FFFFFF\",\n\"id\": \"White\",\n\"__typename\": \"Attribute\"\n}\n],\n\"name\": \"Color\",\n\"type\": \"swatch\",\n\"__typename\": \"AttributeSet\"\n}\n]'),
('huarache-x-stussy-le', 'Nike Air Huarache Le', 1, ' [\n\"https://cdn.shopify.com/s/files/1/0087/6193/3920/products/DD1381200_DEOA_2_720x.jpg?v=1612816087\",\n\"https://cdn.shopify.com/s/files/1/0087/6193/3920/products/DD1381200_DEOA_1_720x.jpg?v=1612816087\",\n\"https://cdn.shopify.com/s/files/1/0087/6193/3920/products/DD1381200_DEOA_3_720x.jpg?v=1612816087\",\n\"https://cdn.shopify.com/s/files/1/0087/6193/3920/products/DD1381200_DEOA_5_720x.jpg?v=1612816087\",\n\"https://cdn.shopify.com/s/files/1/0087/6193/3920/products/DD1381200_DEOA_4_720x.jpg?v=1612816087\"\n]', '<p>Great sneakers for everyday use!</p>', 'Nike x Stussy', 'clothes', 'Product', '[{ \"amount\": 144.69,\n\"currency\": {\n\"label\": \"USD\",\n\"symbol\": \"$\",\n\"__typename\": \"Currency\"\n},\n\"__typename\": \"Price\"\n}]', '[\n{\n\"id\": \"Size\",\n\"items\": [\n{\n\"displayValue\": \"40\",\n\"value\": \"40\",\n\"id\": \"40\",\n\"__typename\": \"Attribute\"\n},\n{\n\"displayValue\": \"41\",\n\"value\": \"41\",\n\"id\": \"41\",\n\"__typename\": \"Attribute\"\n},\n{\n\"displayValue\": \"42\",\n\"value\": \"42\",\n\"id\": \"42\",\n\"__typename\": \"Attribute\"\n},\n{\n\"displayValue\": \"43\",\n\"value\": \"43\",\n\"id\": \"43\",\n\"__typename\": \"Attribute\"\n}\n],\n\"name\": \"Size\",\n\"type\": \"text\",\n\"__typename\": \"AttributeSet\"\n}\n]'),
('jacket-canada-goosee', 'Jacket', 1, '[\"https://images.canadagoose.com/image/upload/w_480,c_scale,f_auto,q_auto:best/v1576016105/product-image/2409L_61.jpg\",\"https://images.canadagoose.com/image/upload/w_480,c_scale,f_auto,q_auto:best/v1576016107/product-image/2409L_61_a.jpg\",\"https://images.canadagoose.com/image/upload/w_480,c_scale,f_auto,q_auto:best/v1576016108/product-image/2409L_61_b.jpg\",\"https://images.canadagoose.com/image/upload/w_480,c_scale,f_auto,q_auto:best/v1576016109/product-image/2409L_61_c.jpg\",\"https://images.canadagoose.com/image/upload/w_480,c_scale,f_auto,q_auto:best/v1576016110/product-image/2409L_61_d.jpg\",\"https://images.canadagoose.com/image/upload/w_1333,c_scale,f_auto,q_auto:best/v1634058169/product-image/2409L_61_o.png\",\"https://images.canadagoose.com/image/upload/w_1333,c_scale,f_auto,q_auto:best/v1634058159/product-image/2409L_61_p.png\"]', '<p>Awesome winter jacket</p>', 'Canada Goose', 'clothes', 'Product', '[\n{\n\"amount\": 518.47,\n\"currency\": {\n\"label\": \"USD\",\n\"symbol\": \"$\",\n\"__typename\": \"Currency\"\n},\n\"__typename\": \"Price\"\n}\n]', '[\n{\n\"id\": \"Size\",\n\"items\": [\n{\n\"displayValue\": \"Small\",\n\"value\": \"S\",\n\"id\": \"Small\",\n\"__typename\": \"Attribute\"\n},\n{\n\"displayValue\": \"Medium\",\n\"value\": \"M\",\n\"id\": \"Medium\",\n\"__typename\": \"Attribute\"\n},\n{\n\"displayValue\": \"Large\",\n\"value\": \"L\",\n\"id\": \"Large\",\n\"__typename\": \"Attribute\"\n},\n{\n\"displayValue\": \"Extra Large\",\n\"value\": \"XL\",\n\"id\": \"Extra Large\",\n\"__typename\": \"Attribute\"\n}\n],\n\"name\": \"Size\",\n\"type\": \"text\",\n\"__typename\": \"AttributeSet\"\n}\n]'),
('ps-5', 'PlayStation 5', 0, '[\"https://images-na.ssl-images-amazon.com/images/I/510VSJ9mWDL._SL1262_.jpg\",\"https://images-na.ssl-images-amazon.com/images/I/610%2B69ZsKCL._SL1500_.jpg\",\"https://images-na.ssl-images-amazon.com/images/I/51iPoFwQT3L._SL1230_.jpg\",\"https://images-na.ssl-images-amazon.com/images/I/61qbqFcvoNL._SL1500_.jpg\",\"https://images-na.ssl-images-amazon.com/images/I/51HCjA3rqYL._SL1230_.jpg\"]', '<p>A good gaming console. Plays games of PS4! Enjoy if you can buy it mwahahahaha</p>', 'Sony', 'tech', 'Product', '[\n{\n\"amount\": 844.02,\n\"currency\": {\n\"label\": \"USD\",\n\"symbol\": \"$\",\n\"__typename\": \"Currency\"\n},\n\"__typename\": \"Price\"\n}\n]', '[\n{\n\"id\": \"Color\",\n\"items\": [\n{\n\"displayValue\": \"Green\",\n\"value\": \"#44FF03\",\n\"id\": \"Green\",\n\"__typename\": \"Attribute\"\n},\n{\n\"displayValue\": \"Cyan\",\n\"value\": \"#03FFF7\",\n\"id\": \"Cyan\",\n\"__typename\": \"Attribute\"\n},\n{\n\"displayValue\": \"Blue\",\n\"value\": \"#030BFF\",\n\"id\": \"Blue\",\n\"__typename\": \"Attribute\"\n},\n{\n\"displayValue\": \"Black\",\n\"value\": \"#000000\",\n\"id\": \"Black\",\n\"__typename\": \"Attribute\"\n},\n{\n\"displayValue\": \"White\",\n\"value\": \"#FFFFFF\",\n\"id\": \"White\",\n\"__typename\": \"Attribute\"\n}\n],\n\"name\": \"Color\",\n\"type\": \"swatch\",\n\"__typename\": \"AttributeSet\"\n},\n{\n\"id\": \"Capacity\",\n\"items\": [\n{\n\"displayValue\": \"512G\",\n\"value\": \"512G\",\n\"id\": \"512G\",\n\"__typename\": \"Attribute\"\n},\n{\n\"displayValue\": \"1T\",\n\"value\": \"1T\",\n\"id\": \"1T\",\n\"__typename\": \"Attribute\"\n}\n],\n\"name\": \"Capacity\",\n\"type\": \"text\",\n\"__typename\": \"AttributeSet\"\n}\n]'),
('xbox-series-s', 'Xbox Series S 512GB', 0, '[\"https://images-na.ssl-images-amazon.com/images/I/71vPCX0bS-L._SL1500_.jpg\",\"https://images-na.ssl-images-amazon.com/images/I/71q7JTbRTpL._SL1500_.jpg\",\"https://images-na.ssl-images-amazon.com/images/I/71iQ4HGHtsL._SL1500_.jpg\",\"https://images-na.ssl-images-amazon.com/images/I/61IYrCrBzxL._SL1500_.jpg\",\"https://images-na.ssl-images-amazon.com/images/I/61RnXmpAmIL._SL1500_.jpg\"]', '<div> <ul> <li><span>Hardware-beschleunigtes Raytracing macht dein Spiel noch realistischer</span></li> <li><span>Spiele Games mit bis zu 120 Bilder pro Sekunde</span></li> <li><span>Minimiere Ladezeiten mit einer speziell entwickelten 512GB NVMe SSD und wechsle mit Quick Resume nahtlos zwischen mehreren Spielen.</span></li> <li><span>Xbox Smart Delivery stellt sicher, dass du die beste Version deines Spiels spielst, egal, auf welcher Konsole du spielst</span></li> <li><span>Spiele deine Xbox One-Spiele auf deiner Xbox Series S weiter. Deine Fortschritte, Erfolge und Freundesliste werden automatisch auf das neue System übertragen.</span></li> <li><span>Erwecke deine Spiele und Filme mit innovativem 3D Raumklang zum Leben</span></li> <li><span>Der brandneue Xbox Wireless Controller zeichnet sich durch höchste Präzision, eine neue Share-Taste und verbesserte Ergonomie aus</span></li> <li><span>Ultra-niedrige Latenz verbessert die Reaktionszeit von Controller zum Fernseher</span></li> <li><span>Verwende dein Xbox One-Gaming-Zubehör -einschließlich Controller, Headsets und mehr</span></li> <li><span>Erweitere deinen Speicher mit der Seagate 1 TB-Erweiterungskarte für Xbox Series X (separat erhältlich) und streame 4K-Videos von Disney+, Netflix, Amazon, Microsoft Movies &amp; TV und mehr</span></li> </ul> </div>', 'Microsoft', 'tech', 'Product', '[\n{\n\"amount\": 333.99,\n\"currency\": {\n\"label\": \"USD\",\n\"symbol\": \"$\",\n\"__typename\": \"Currency\"\n},\n\"__typename\": \"Price\"\n}\n]', '[\n{\n\"id\": \"Color\",\n\"items\": [\n{\n\"displayValue\": \"Green\",\n\"value\": \"#44FF03\",\n\"id\": \"Green\",\n\"__typename\": \"Attribute\"\n},\n{\n\"displayValue\": \"Cyan\",\n\"value\": \"#03FFF7\",\n\"id\": \"Cyan\",\n\"__typename\": \"Attribute\"\n},\n{\n\"displayValue\": \"Blue\",\n\"value\": \"#030BFF\",\n\"id\": \"Blue\",\n\"__typename\": \"Attribute\"\n},\n{\n\"displayValue\": \"Black\",\n\"value\": \"#000000\",\n\"id\": \"Black\",\n\"__typename\": \"Attribute\"\n},\n{\n\"displayValue\": \"White\",\n\"value\": \"#FFFFFF\",\n\"id\": \"White\",\n\"__typename\": \"Attribute\"\n}\n],\n\"name\": \"Color\",\n\"type\": \"swatch\",\n\"__typename\": \"AttributeSet\"\n},\n{\n\"id\": \"Capacity\",\n\"items\": [\n{\n\"displayValue\": \"512G\",\n\"value\": \"512G\",\n\"id\": \"512G\",\n\"__typename\": \"Attribute\"\n},\n{\n\"displayValue\": \"1T\",\n\"value\": \"1T\",\n\"id\": \"1T\",\n\"__typename\": \"Attribute\"\n}\n],\n\"name\": \"Capacity\",\n\"type\": \"text\",\n\"__typename\": \"AttributeSet\"\n}\n]');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
