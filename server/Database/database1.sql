CREATE DATABASE IF NOT EXISTS db;
use db;

-- GRANT SELECT, INSERT, UPDATE, DELETE ON db.* TO 'user'@'localhost' IDENTIFIED BY 'mysql@10';


CREATE TABLE IF NOT EXISTS user(
	uid int AUTO_INCREMENT primary key,
    user_name varchar(50),
    phone varchar(10),
    email varchar(50),
    passwords char(64)
);
-- Insert data into the user table
-- Insert data into the user table
INSERT INTO user (user_name, phone, email, passwords) VALUES
    ('ARYAN', '7992405620', 'abcbiva83@gmail.com', 'a'),
    ('John Doe', '1234567890', 'john.doe@example.com', 'a'),
    ('Jane Smith', '9876543210', 'jane.smith@example.com', 'a'),
    ('Alice Johnson', '5551234567', 'alice.johnson@example.com', 'a'),
    ('Bob Williams', '8885551234', 'bob.williams@example.com', 'a'),
    ('Emily Davis', '7778889999', 'emily.davis@example.com', 'a'),
    ('Michael Brown', '4445556666', 'michael.brown@example.com', 'a'),
    ('Jessica Miller', '2223334444', 'jessica.miller@example.com', 'a'),
    ('David Wilson', '9998887777', 'david.wilson@example.com', 'a'),
    ('Sarah Martinez', '6667778888', 'sarah.martinez@example.com', 'a');

    
    
    
CREATE TABLE IF NOT EXISTS car (
	uid int,
	FOREIGN KEY (uid) REFERENCES user(uid),
    car_num varchar(15) primary key
);

-- Insert data into the car table for additional uids
INSERT INTO car (car_num, uid) VALUES
    ('ABC123', 1), ('DEF456', 1), ('GHI784', 1),  -- for uid 1
    ('JKL153', 2), ('PQR729', 2),  -- for uid 2
    ('STU124', 3), ('VWX456', 3), ('YZA289', 3), 
    ('GHI709', 4),  -- for uid 4
    ('JKL123', 5), ('MNO456', 5), ('PQR781', 5),  -- for uid 5
    ('YZA783', 6),  -- for uid 6
    ('ABC124', 7), ('DEF446', 7), ('GHI789', 7),  -- for uid 7
    ('JKL126', 8), ('MNO455', 8), ('PQR389', 8),  -- for uid 8
    ('STU123', 9), ('VWX452', 9),  -- for uid 9
    ('ABC623', 10), ('DEF459', 10), ('GHI786', 10);  -- for uid 10
    
    
    select * from user;
    select * from car;







