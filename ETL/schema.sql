DROP DATABASE IF EXISTS `catwalk`;
CREATE DATABASE catwalk;

USE catwalk;
DROP TABLE IF EXISTS `product`;

CREATE TABLE `product` (
  `id` INTEGER,
  `name` TEXT,
  `slogan` TEXT,
  `description` TEXT,
  `category` TEXT,
  `default_price` INTEGER,
  PRIMARY KEY (`id`)
);

DROP TABLE IF EXISTS `features`;

CREATE TABLE `features` (
  `id` INTEGER,
  `feature` TEXT,
  `value` TEXT,
  `product_id` INTEGER,
  PRIMARY KEY (`id`)
);

DROP TABLE IF EXISTS `related`;

CREATE TABLE `related` (
  `id` INTEGER,
  `current_product_id` INTEGER,
  `related_product_id` INTEGER,
  PRIMARY KEY (`id`)
);

DROP TABLE IF EXISTS `skus`;

CREATE TABLE `skus` (
  `id` INTEGER,
  `styleId` INTEGER,
  `size` TEXT,
  `quantity` INTEGER,
  PRIMARY KEY (`id`)
);

DROP TABLE IF EXISTS `styles`;

CREATE TABLE `styles` (
  `id` INTEGER,
  `productId` INTEGER,
  `name` TEXT,
  `sale_price` INTEGER,
  `original_price` INTEGER,
  `default_style` BOOLEAN,
  PRIMARY KEY (`id`)
);

DROP TABLE IF EXISTS `photos`;

CREATE TABLE `photos` (
  `id` INTEGER,
  `styleid` INTEGER,
  `url` TEXT,
  `thumbnail_url` TEXT,
  PRIMARY KEY (`id`)
);