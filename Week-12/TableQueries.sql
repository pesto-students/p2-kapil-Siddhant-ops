USE PESTO;

select * from items order by WEIGHT asc limit 1;

select * from warehouses WHERE LOCATION = 'PUNE';

select *
from warehouses
    inner join cities
where
    CITY_NAME = 'Pune'
    AND FK_CITY_ID = CITY_ID;

select *
from orders
    inner join customers on orders.O_NO = customers.C_NO and customers.C_NAME = "Mr. Patil"
    inner join orderitems on orderitems.FK_O_NO = orders.O_NO
    inner join items on items.I_NO = orderitems.FK_I_NO;

select *
from warehouses
where FK_CITY_ID = (
        select
            max(FK_CITY_ID)
        from stores
    )
GROUP BY W_ID
LIMIT 1;

select *
from items
where I_NO = (
        select min(I_NO)
        from orderitems
    );

select *
from orderitems
    inner join items on items.I_NO = orderitems.FK_I_NO
group by orderitems.FK_I_NO
order by
    count(orderitems.FK_I_NO) asc
limit 1;

select *
from customers
    inner join orders on customers.C_NO = orders.FK_C_NO
    inner join orderItems on orderItems.FK_O_NO = orders.O_NO
    inner join items on items.I_NO = orderItems.FK_I_NO
order by customers.C_NO;