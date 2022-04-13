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
  fastesttime VARCHAR(40),
  leaderboard INT,
  PRIMARY KEY (userid),
  UNIQUE (email),
  UNIQUE (username),
  UNIQUE (leaderboard)
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
  message VARCHAR(300) NOT NULL,
  commentid VARCHAR(36) NOT NULL,
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


-- Everything after this line is for testing and should be removed/modified before used in production.
INSERT INTO tools (toolname, mouseover, toolid) VALUES
('Tool01', 'This is tool 1', 1),
('Tool02', 'This is tool 2', 2),
('Tool03', 'This is tool 3', 3),
('Tool04', 'This is tool 4', 4);

INSERT INTO accounts (userid, username, email, password, progress,
datestarted, datecompleted, pagescompleted, fastesttime, leaderboard) VALUES
('574d2eff-3ae4-42e2-8654-81de18f1fd77', 'SimpleUser', 'example@email.com', '$2a$10$6GBSF4NgqNyulc/A19t1jewG4Lh1YDK4KLATjLd6Z4gqsvNn3uAha', 0, '2022-03-29 00:00:00', NULL, 0, NULL, NULL),
('72cf8e77-bcca-4c86-9676-bef384edd54c', 'AdvancedUser', 'example2@email.com', '$2a$10$GqQzQEJx85wj6KgE1Q1m5u52alASIw24lH105MwxgG.LWWwNCDmHa', 100, '2022-03-29 00:00:00', '2022-03-30', 4, '1d0h0m', 1);

INSERT INTO account_toolids (toolid, userid) VALUES
(1, '574d2eff-3ae4-42e2-8654-81de18f1fd77'),
(2, '574d2eff-3ae4-42e2-8654-81de18f1fd77'),
(1, '72cf8e77-bcca-4c86-9676-bef384edd54c'),
(2, '72cf8e77-bcca-4c86-9676-bef384edd54c'),
(3, '72cf8e77-bcca-4c86-9676-bef384edd54c'),
(4, '72cf8e77-bcca-4c86-9676-bef384edd54c');

INSERT INTO account_checkpoints (checkpoint, userid) VALUES
('2022-03-29 00:00:00', '574d2eff-3ae4-42e2-8654-81de18f1fd77'),
('2022-03-30 04:11:26', '574d2eff-3ae4-42e2-8654-81de18f1fd77'),
('2022-03-29 00:00:00', '72cf8e77-bcca-4c86-9676-bef384edd54c'),
('2022-03-29 01:15:02', '72cf8e77-bcca-4c86-9676-bef384edd54c'),
('2022-03-30 14:37:11', '72cf8e77-bcca-4c86-9676-bef384edd54c'),
('2022-03-30 21:04:38', '72cf8e77-bcca-4c86-9676-bef384edd54c');