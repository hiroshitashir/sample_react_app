
DROP TABLE IF EXISTS businessLogic;

CREATE TABLE businessLogic (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  storeName text TEXT NOT NULL,
  toppings text BLOB,
  pizzaSizes text BLOB,
  flagDelivery BOOLEAN,
  flagDeliveryMinimumFee INTEGER,
  deliveryMinimumFee INTEGER,

  waitTimeMinutesDelivery INTEGER,
  waitTimeMinutesTakeout INTEGER,
  created TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);