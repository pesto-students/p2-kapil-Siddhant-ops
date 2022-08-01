USE pesto;

CREATE TABLE
    IF NOT EXISTS cities (
        CITY_ID INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
        CITY_NAME CHAR(20),
        STATE_NAME CHAR(20)
    );

CREATE TABLE
    IF NOT EXISTS warehouses(
        W_ID INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
        W_NAME CHAR(30),
        LOCATION CHAR(20),
        EXTRA_CONTEXT JSON,
        FK_CITY_ID INT NOT NULL,
        FOREIGN KEY (FK_CITY_ID) REFERENCES cities(CITY_ID)
    );

CREATE TABLE
    IF NOT EXISTS stores(
        S_ID INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
        STORE_NAME CHAR(20),
        LOCATION_CITY CHAR(20),
        FK_W_ID INT NOT NULL,
        FOREIGN KEY (FK_W_ID) REFERENCES warehouses(W_ID)
    );

CREATE TABLE
    IF NOT EXISTS customers(
        C_NO INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
        C_NAME CHAR(50),
        ADDR VARCHAR(50),
        C_CITY CHAR(20)
    );

CREATE TABLE
    IF NOT EXISTS orders(
        O_NO INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
        O_DATE DATE,
        FK_C_NO INT NOT NULL,
        FOREIGN KEY (FK_C_NO) REFERENCES customers(C_NO)
    );

CREATE TABLE
    IF NOT EXISTS items(
        I_NO INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
        DESCRIPTION TEXT,
        WEIGHT DECIMAL(5, 2),
        COST DECIMAL(5, 2)
    );

CREATE TABLE
    IF NOT EXISTS orderitems(
        FK_O_NO INT NOT NULL,
        FK_I_NO INT NOT NULL,
        ORDERED_QUANTITY INT,
        FOREIGN KEY (FK_O_NO) REFERENCES orders(O_NO),
        FOREIGN KEY (FK_I_NO) REFERENCES items(I_NO)
    );

CREATE TABLE
    IF NOT EXISTS storeitems(
        FK_S_ID INT NOT NULL,
        FK_I_NO INT NOT NULL,
        STOCK_QUANTITY INT,
        FOREIGN KEY (FK_S_ID) REFERENCES stores(S_ID),
        FOREIGN KEY (FK_I_NO) REFERENCES items(I_NO)
    );

INSERT INTO
    cities (CITY_NAME, STATE_NAME)
VALUES ('Pune', 'Maharashtra'), ('Mumbai', 'Maharashtra'), ('Bangalore', 'Karnataka'), ('Chennai', 'Tamil Nadu'), ('Hyderabad', 'Andhra Pradesh');

INSERT INTO
    warehouses (
        W_NAME,
        LOCATION,
        EXTRA_CONTEXT,
        FK_CITY_ID
    )
VALUES (
        'Warehouse 1',
        'Pune',
        '{"warehouse_id": 1, "location": "Pune"}', (
            SELECT CITY_ID
            FROM cities
            WHERE
                CITY_NAME = 'Pune'
        )
    ), (
        'Warehouse 2',
        'Mumbai',
        '{"warehouse_id": 2, "location": "Mumbai"}', (
            SELECT CITY_ID
            FROM cities
            WHERE
                CITY_NAME = 'Mumbai'
        )
    ), (
        'Warehouse 3',
        'Bangalore',
        '{"warehouse_id": 3, "location": "Bangalore"}', (
            SELECT CITY_ID
            FROM cities
            WHERE
                CITY_NAME = 'Bangalore'
        )
    ), (
        'Warehouse 4',
        'Chennai',
        '{"warehouse_id": 4, "location": "Chennai"}', (
            SELECT CITY_ID
            FROM cities
            WHERE
                CITY_NAME = 'Chennai'
        )
    ), (
        'Warehouse 5',
        'Hyderabad',
        '{"warehouse_id": 5, "location": "Hyderabad"}', (
            SELECT CITY_ID
            FROM cities
            WHERE
                CITY_NAME = 'Hyderabad'
        )
    ), (
        'Warehouse 6',
        'Pune',
        '{"warehouse_id": 6, "location": "Pune"}', (
            SELECT CITY_ID
            FROM cities
            WHERE
                CITY_NAME = 'Pune'
        )
    ), (
        'Warehouse 6',
        'Hyderabad',
        '{"warehouse_id": 7, "location": "Hyderabad"}', (
            SELECT CITY_ID
            FROM cities
            WHERE
                CITY_NAME = 'Hyderabad'
        )
    ), (
        'Warehouse 7',
        'Pune',
        '{"warehouse_id": 8, "location": "Pune"}', (
            SELECT CITY_ID
            FROM cities
            WHERE
                CITY_NAME = 'Pune'
        )
    ), (
        'Warehouse 8',
        'Mumbai',
        '{"warehouse_id": 9, "location": "Mumbai"}', (
            SELECT CITY_ID
            FROM cities
            WHERE
                CITY_NAME = 'Mumbai'
        )
    ), (
        'Warehouse 9',
        'Bangalore',
        '{"warehouse_id": 10, "location": "Bangalore"}', (
            SELECT CITY_ID
            FROM cities
            WHERE
                CITY_NAME = 'Bangalore'
        )
    ), (
        'Warehouse 10',
        'Chennai',
        '{"warehouse_id": 11, "location": "Chennai"}', (
            SELECT CITY_ID
            FROM cities
            WHERE
                CITY_NAME = 'Chennai'
        )
    ), (
        'Warehouse 11',
        'Hyderabad',
        '{"warehouse_id": 12, "location": "Hyderabad"}', (
            SELECT CITY_ID
            FROM cities
            WHERE
                CITY_NAME = 'Hyderabad'
        )
    );

INSERT INTO
    stores (
        STORE_NAME,
        LOCATION_CITY,
        FK_W_ID
    )
VALUES ('Store 1', 'Pune', 1), ('Store 2', 'Mumbai', 2), ('Store 3', 'Bangalore', 3), ('Store 4', 'Chennai', 4), ('Store 5', 'Hyderabad', 5), ('Store 6', 'Pune', 6), ('Store 7', 'Hyderabad', 7), ('Store 8', 'Pune', 8), ('Store 9', 'Mumbai', 9), ('Store 10', 'Bangalore', 10), ('Store 11', 'Chennai', 11), ('Store 12', 'Hyderabad', 12);

INSERT INTO
    customers (C_NAME, ADDR, C_CITY)
VALUES (
        'Mr. Patil',
        'some Pune address',
        'Pune'
    ), (
        'Mr. Smith',
        'some Mumbai address',
        'Mumbai'
    ), (
        'Mr. Johnson',
        'some Bangalore address',
        'Bangalore'
    ), (
        'Mr. Williams',
        'some Chennai address',
        'Chennai'
    ), (
        'Mr. Brown',
        'some Hyderabad address',
        'Hyderabad'
    ), (
        'Mr. Patel',
        'some Pune address',
        'Pune'
    ), (
        'Mr. Singh',
        'some Hyderabad address',
        'Hyderabad'
    ), (
        'Mr. Thomas',
        'some Pune address',
        'Pune'
    ), (
        'Mr. John',
        'some Mumbai address',
        'Mumbai'
    );

insert into
    orders (O_DATE, FK_C_NO)
values ('22,05,01', 2), ('12.12.12', 1), ('22,05,02', 1), ('22,05,03', 2), ('22,05,04', 1), ('22,06,01', 3), ('22,06,01', 4), ('22,06,01', 4), ('22,06,01', 5), ('22,06,01', 5), ('22,06,02', 6), ('22,06,03', 6), ('22,07,20', 6), ('22,07,21', 7), ('22,07,21', 6), ('22,08,01', 3), ('22,08,01', 2), ('22,08,02', 1), ('22,08,03', 1), ('22,08,04', 4), ('22,08,05', 5);

INSERT INTO
    items (DESCRIPTION, WEIGHT, COST)
VALUES ('Sneakers', 0.4, 999), ('T-Shirts', 0.15, 200), ('Shirts', 0.13, 300), ('Belts', 0.08, 400), ('Dress', 5, 500), ('Joggers', 6, 600), ('Perfume', 0.07, 700), ('Shoes', 0.4, 800);

insert into orderitems
values (2, 1, 1), (3, 2, 2), (4, 3, 3), (5, 4, 4), (6, 5, 1), (8, 6, 2), (8, 1, 3), (9, 1, 4), (6, 2, 1), (7, 3, 2), (8, 4, 3), (9, 5, 4), (10, 2, 1), (11, 3, 2), (12, 4, 3), (13, 5, 4), (14, 1, 1), (15, 6, 2), (16, 5, 5), (17, 4, 4), (18, 1, 1), (19, 6, 2), (16, 5, 3), (17, 4, 5), (20, 5, 3), (21, 4, 4), (1, 5, 2), (21, 2, 4), (19, 3, 2);

insert into storeitems
values (1, 1, 1), (2, 2, 2), (3, 3, 3), (4, 4, 4), (5, 5, 5), (6, 5, 6), (5, 6, 5), (6, 6, 1), (7, 7, 2), (8, 8, 3), (9, 2, 4), (10, 5, 5), (11, 7, 1), (12, 2, 2), (3, 4, 3), (5, 7, 4), (7, 3, 5), (8, 6, 10);