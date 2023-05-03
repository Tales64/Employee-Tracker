INSERT INTO departments (department_name)
VALUES 
('Banking'),
('Transportation'),
('Research and Development'),
('Finance'),
('Legal'),
('Insurance'),
('Pet PI'),
('Holiday Reclaimation'),
('Heaven'),
('Marketing'),
('Fire'),
('Personal Training');


INSERT INTO roles (title, salary, department_id)
VALUES 
('Chief Executive Officer', 555000.00, 1),
('Limousine Driver', 125000.00, 2),
('Junior Engineer of Augmented Reality', 189000.00, 3),
('Finance Head', 145000.00, 4),
('Attorney', 95000.00, 5),
('Salesman', 185000.00, 6),
('Pet Detective', 125000.00, 7),
('Smasher of Hope', 75000.00, 8),
('News Anchor ', 185000.00, 9),
('VP of Communications', 135000.00, 10),
('Fire Marshal', 135000.00, 11),
('Maintenance Manager', 135000.00, 12);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES
('Stanley', 'Ipkiss', 1, 1),
('Lloyd', 'Christmas', 2, 2),
('Edward', 'Nygma', 3, 3),
('Ernie', 'Douglas', 4, 4),
('Fletcher', 'Reede', 5, 5),
('Truman', 'Burbank', 6, 6),
('Ace', 'Ventura', 7, 7),
('The', 'Grinch', 8, 8),
('Bruce', 'Nolan', 9, 9),
('Richard', 'Harper', 10, 10),
('William', 'Burns', 11, 11),
('Vera', 'De Milo', 12, 12);