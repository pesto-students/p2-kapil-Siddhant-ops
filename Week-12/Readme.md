# W12 Assignments

In this assignment students need to design and create a WareHouse Database.

Student should create table as mentioned below

```sql
CITIES(
    CITY CHAR(20),
    STATE CHAR(20)
    )
```

```sql
WAREHOUSES(
    WID INTEGER,
    WNAME CHAR(30),
    LOCATIONCHAR(20),
    EXTRA CONTEXT json
    )
```

```sql
STORES(
    SID INTEGER,
    STORE_NAME CHAR(20),
    LOCATION_CITYCHAR(20)
    )
```

```sql
CUSTOMER(
    CNO INTEGER,
    CNAME CHAR(50),
    ADDR VARCHAR(50),
    CU_CITY CHAR(20)
    )
```

```sql
ORDERS(
    ONO INT,
    ODATE DATE
    )
```

```sql
ITEMS(
    ITEMNO INTEGER,
    DESCRIPTION TEXT,
    WEIGHT DECIMAL(5,2),
    COST DECIMAL(5,2)
    )
```

Feel free to create more tables or add more columns in the table if required.

Table design should follow the below mentioned relationship between tables.

- `CITIES-WAREHOUSES 1 TO M`
- `WAREHOUSES - STORES 1 TO M`
- `CUSTOMER – ORDERS 1 TO M`
- `ITEMS – ORDERS M TO M` relationship with descriptive attribute `ordered_quantity`
- `STORES-ITEMS M TO M` RELATION with descriptive attribute `quantity`

Try to solve the following problems using queries.

- Find the item that has minimum weight.
- Find the different warehouses in “Pune”.
- Find the details of items ordered by a customer “Mr. Patil”.
- Find a Warehouse which has maximum stores.
- Find an item which is ordered for a minimum number of times.
- Find the detailed orders given by each customer
