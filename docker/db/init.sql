CREATE TABLE tools
(
  toolname VARCHAR(40) NOT NULL,
  mouseover VARCHAR(200) NOT NULL,
  toolid VARCHAR(36) NOT NULL,
  PRIMARY KEY (toolid),
  UNIQUE (toolname),
  UNIQUE (mouseover)
);

CREATE TABLE accounts
(
  userid VARCHAR(36) NOT NULL,
  username VARCHAR(40) NOT NULL,
  email VARCHAR(40) NOT NULL,
  password VARCHAR(80) NOT NULL,
  progress FLOAT NOT NULL,
  datestarted timestamp NOT NULL,
  datecompleted timestamp,
  pagescompleted INT NOT NULL,
  fastesttime_dd INT,
  fastesttime_hh INT,
  fastesttime_mm INT,
  fastesttime_ss INT,
  PRIMARY KEY (userid),
  UNIQUE (email),
  UNIQUE (username)
);

CREATE TABLE account_toolids
(
  toolid VARCHAR(36) NOT NULL,
  userId VARCHAR(36) NOT NULL,
  PRIMARY KEY (toolid, userid),
  FOREIGN KEY (userid) REFERENCES accounts(userid)
);

CREATE TABLE account_checkpoints
(
  checkpoint timestamp NOT NULL,
  userid VARCHAR(36) NOT NULL,
  PRIMARY KEY (checkpoint, userid),
  FOREIGN KEY (userid) REFERENCES accounts(userid)
);

CREATE TABLE comments
(
  username VARCHAR(40) NOT NULL,
  message VARCHAR(600) NOT NULL,
  commentid SERIAL,
  commentdate timestamp(6) NOT NULL,
  userid VARCHAR(36) NOT NULL,
  PRIMARY KEY (commentid),
  FOREIGN KEY (userid) REFERENCES Accounts(userid)
);

-- Sessions

CREATE TABLE "session"
(
  "sid" varchar NOT NULL COLLATE "default",
  "sess" json NOT NULL,
  "expire" timestamp(6) NOT NULL
)
WITH (OIDS=FALSE);

ALTER TABLE "session" ADD CONSTRAINT "session_pkey" PRIMARY KEY ("sid") NOT DEFERRABLE INITIALLY IMMEDIATE;
CREATE INDEX "IDX_session_expire" ON "session" ("expire");

CREATE VIEW leaderboard AS
SELECT
username,
(DATE_PART('day', datecompleted::timestamp - datestarted::timestamp)) AS days,
(DATE_PART('hour', datecompleted::timestamp - datestarted::timestamp)) AS hours,
(DATE_PART('minute', datecompleted::timestamp - datestarted::timestamp)) AS minutes,
(DATE_PART('second', datecompleted::timestamp - datestarted::timestamp)) AS seconds
FROM accounts WHERE datecompleted IS NOT NULL ORDER BY days, hours, minutes, seconds DESC;

-- Everything after this line is for testing and should be removed/modified before used in production.
INSERT INTO tools (toolname, mouseover, toolid) VALUES
('Scanner', 'Uncovers hidden messages on the page.', 1),
('Decrypter', 'Decrypts Caesar ciphers.', 2),
('Advanced Scanner', 'Uncovers more hidden elements than the regular scanner.', 3);

INSERT INTO accounts (userid, username, email, password, progress,
datestarted, datecompleted, pagescompleted, fastesttime_dd, fastesttime_hh, fastesttime_mm, fastesttime_ss) VALUES
('574d2eff-3ae4-42e2-8654-81de18f1fd77', 'SimpleUser', 'SimpleUser@email.com', '$2a$10$6GBSF4NgqNyulc/A19t1jewG4Lh1YDK4KLATjLd6Z4gqsvNn3uAha', 0, '2022-03-29 00:00:00', NULL, 0, NULL, NULL, NULL, NULL),
('72cf8e77-bcca-4c86-9676-bef384edd54c', 'AdvancedUser', 'AdvancedUser@email.com', '$2a$10$m/uEnLqbZAb37BnOCY8xxOTqwZGyjh/gLaH0Y/oSsw.c1z0F8mtt.', 100, '2022-03-29 00:00:00', '2022-03-30', 4, 1, 0, 0, 0),
('fe874246-31c1-4bb0-a690-9dd455dd4337', 'User1', 'example1@email.com', '$2a$10$m/uEnLqbZAb37BnOCY8xxOTqwZGyjh/gLaH0Y/oSsw.c1z0F8mtt.', 100, '2022-03-29 00:00:00', '2022-03-31', 4, 2, 0, 0, 0),
('be221613-95df-41ea-ba18-261df3804f0b', 'User2', 'example2@email.com', '$2a$10$m/uEnLqbZAb37BnOCY8xxOTqwZGyjh/gLaH0Y/oSsw.c1z0F8mtt.', 100, '2022-03-29 00:00:00', '2022-04-01', 4, 3, 0, 0, 0),
('bda464b4-0c34-4020-8820-bd1c1810512d', 'User3', 'example3@email.com', '$2a$10$m/uEnLqbZAb37BnOCY8xxOTqwZGyjh/gLaH0Y/oSsw.c1z0F8mtt.', 100, '2022-03-29 00:00:00', '2022-04-02', 4, 4, 0, 0, 0),
('598d18e1-30f6-42ab-8379-5a974164d18f', 'User4', 'example4@email.com', '$2a$10$m/uEnLqbZAb37BnOCY8xxOTqwZGyjh/gLaH0Y/oSsw.c1z0F8mtt.', 100, '2022-03-29 00:00:00', '2022-04-03', 4, 5, 0, 0, 0),
('e2b4be81-d00b-4326-bfa7-b6738cc679f8', 'User5', 'example5@email.com', '$2a$10$m/uEnLqbZAb37BnOCY8xxOTqwZGyjh/gLaH0Y/oSsw.c1z0F8mtt.', 100, '2022-03-29 00:00:00', '2022-04-04', 4, 6, 0, 0, 0),
('e7788ea5-50da-4fc4-91a8-86ae39bfd9ed', 'User6', 'example6@email.com', '$2a$10$m/uEnLqbZAb37BnOCY8xxOTqwZGyjh/gLaH0Y/oSsw.c1z0F8mtt.', 100, '2022-03-29 00:00:00', '2022-04-05', 4, 7, 0, 0, 0),
('7c3ce86c-9fa7-443c-9151-b007833d2e26', 'User7', 'example7@email.com', '$2a$10$m/uEnLqbZAb37BnOCY8xxOTqwZGyjh/gLaH0Y/oSsw.c1z0F8mtt.', 100, '2022-03-29 00:00:00', '2022-04-06', 4, 8, 0, 0, 0),
('d3ebcfad-08a9-473a-a943-437291c215c4', 'User8', 'example8@email.com', '$2a$10$m/uEnLqbZAb37BnOCY8xxOTqwZGyjh/gLaH0Y/oSsw.c1z0F8mtt.', 100, '2022-03-29 00:00:00', '2022-04-07', 4, 9, 0, 0, 0),
('a19cb139-926b-4639-bcd9-d21803a05bb3', 'User9', 'example9@email.com', '$2a$10$m/uEnLqbZAb37BnOCY8xxOTqwZGyjh/gLaH0Y/oSsw.c1z0F8mtt.', 100, '2022-03-29 00:00:00', '2022-04-08', 4, 10, 0, 0, 0),
('c3527ee6-03a5-49cc-9d1f-e8fa43d26232', 'User10', 'example10@email.com', '$2a$10$m/uEnLqbZAb37BnOCY8xxOTqwZGyjh/gLaH0Y/oSsw.c1z0F8mtt.', 100, '2022-03-29 00:00:00', '2022-04-09', 4, 11, 0, 0, 0),
('8e87c63d-25e3-4ef9-b005-4f45e395e34c', 'User11', 'example11@email.com', '$2a$10$m/uEnLqbZAb37BnOCY8xxOTqwZGyjh/gLaH0Y/oSsw.c1z0F8mtt.', 100, '2022-03-29 00:00:00', '2022-04-10', 4, 12, 0, 0, 0),
('4e1a7b4d-f30c-4bed-b6c1-d4211c9e05f1', 'User12', 'example12@email.com', '$2a$10$m/uEnLqbZAb37BnOCY8xxOTqwZGyjh/gLaH0Y/oSsw.c1z0F8mtt.', 100, '2022-03-29 00:00:00', '2022-04-11', 4, 13, 0, 0, 0),
('d3eb7313-bc4d-4b31-a56a-861e5d453d9e', 'User13', 'example13@email.com', '$2a$10$m/uEnLqbZAb37BnOCY8xxOTqwZGyjh/gLaH0Y/oSsw.c1z0F8mtt.', 100, '2022-03-29 00:00:00', '2022-04-12', 4, 14, 0, 0, 0),
('9f7c90a8-683b-4f89-a395-bac73cedc5b5', 'User14', 'example14@email.com', '$2a$10$m/uEnLqbZAb37BnOCY8xxOTqwZGyjh/gLaH0Y/oSsw.c1z0F8mtt.', 100, '2022-03-29 00:00:00', '2022-04-13', 4, 15, 0, 0, 0),
('cfe22a79-10f4-4723-ac4b-d20f28f18004', 'User15', 'example15@email.com', '$2a$10$m/uEnLqbZAb37BnOCY8xxOTqwZGyjh/gLaH0Y/oSsw.c1z0F8mtt.', 100, '2022-03-29 00:00:00', '2022-04-14', 4, 16, 0, 0, 0);

INSERT INTO account_toolids (toolid, userid) VALUES
(1, '574d2eff-3ae4-42e2-8654-81de18f1fd77'),
(2, '574d2eff-3ae4-42e2-8654-81de18f1fd77'),
(1, '72cf8e77-bcca-4c86-9676-bef384edd54c'),
(2, '72cf8e77-bcca-4c86-9676-bef384edd54c'),
(3, '72cf8e77-bcca-4c86-9676-bef384edd54c');

INSERT INTO account_checkpoints (checkpoint, userid) VALUES
('2022-03-29 00:00:00', '574d2eff-3ae4-42e2-8654-81de18f1fd77'),
('2022-03-30 04:11:26', '574d2eff-3ae4-42e2-8654-81de18f1fd77'),
('2022-03-29 00:00:00', '72cf8e77-bcca-4c86-9676-bef384edd54c'),
('2022-03-29 01:15:02', '72cf8e77-bcca-4c86-9676-bef384edd54c'),
('2022-03-30 14:37:11', '72cf8e77-bcca-4c86-9676-bef384edd54c'),
('2022-03-30 21:04:38', '72cf8e77-bcca-4c86-9676-bef384edd54c');