DROP DATABASE IF EXISTS chemist_storybook_db;

CREATE DATABASE chemist_storybook_db;
-- Always selecting the correct database on line #6,otherwise 
-- mysql will not recognize for which database we are sending quesries.
USE chemist_storybook_db;

CREATE TABLE users(
	id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) NOT NULL,
    password VARCHAR(50) NOT NULL
);
CREATE TABLE chemist_stories(
	id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(50) NOT NULL,
    content VARCHAR(50) NOT NULL,
    authorID int,
    FOREIGN KEY (authorID) REFERENCES users(id)
    
);

INSERT INTO users(username, password)
VALUES ('jupiter', '123');

INSERT INTO users(username, password)
VALUES ('gypsy', '456');

SELECT * FROM users;

INSERT INTO chemist_stories(title, content, authorID)
VALUES ('Elephant toothpaste', 'I blew up the lab', 1);

INSERT INTO chemist_stories(title, content, authorID)
VALUES ('nano technology fluid', 'this fluid is water resistent', 1);

SELECT * FROM chemist_stories;
