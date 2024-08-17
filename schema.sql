CREATE DATABASE Help4Code;

use Help4Code;

CREATE TABLE User (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    phone_no VARCHAR(15),
    password VARCHAR(255) NOT NULL
);


CREATE TABLE Course (
    course_id INT AUTO_INCREMENT PRIMARY KEY,
    course_name VARCHAR(1000) NOT NULL,
    course_introduction TEXT
);

CREATE TABLE Chapter (
    chapter_id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(1000) NOT NULL,
    course_id INT NOT NULL,
    FOREIGN KEY (course_id) REFERENCES Course(course_id)
);

CREATE TABLE SubChapter (
    sub_chapter_id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(1000) NOT NULL,
    content TEXT,
    chapter_id INT NOT NULL,
    FOREIGN KEY (chapter_id) REFERENCES Chapter(chapter_id)
);
