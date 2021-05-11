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

ALTER TABLE features ADD INDEX product_features (product_id);
ALTER TABLE features DROP INDEX product_features;

DROP TABLE IF EXISTS `related`;

CREATE TABLE `related` (
  `id` INTEGER,
  `current_product_id` INTEGER,
  `related_product_id` INTEGER,
  PRIMARY KEY (`id`)
);

ALTER TABLE related ADD INDEX product_related (related_product_id);
ALTER TABLE related DROP INDEX product_related;

DROP TABLE IF EXISTS `skus`;

CREATE TABLE `skus` (
  `id` INTEGER,
  `styleId` INTEGER,
  `size` TEXT,
  `quantity` INTEGER,
  PRIMARY KEY (`id`)
);

ALTER TABLE skus ADD INDEX style_skus (styleId);
ALTER TABLE skus DROP INDEX style_skus;

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

ALTER TABLE styles ADD INDEX product_styles (productId);
ALTER TABLE styles DROP INDEX product_styles;

DROP TABLE IF EXISTS `photos`;

CREATE TABLE `photos` (
  `id` INTEGER,
  `styleid` INTEGER,
  `url` TEXT,
  `thumbnail_url` TEXT,
  PRIMARY KEY (`id`)
);

ALTER TABLE photos ADD INDEX styles_photos (styleid);
ALTER TABLE photos DROP INDEX styles_photos;
