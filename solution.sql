use salesperson;

SELECT MAX(order_date) as 'first_order',MIN(order_date) as 'last_order'
FROM orders,salesperson,customer
WHERE customer.Name='Samony'
LIMIT 1