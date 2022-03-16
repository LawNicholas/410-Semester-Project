CREATE TABLE Tools
(
  toolName VARCHAR(40) NOT NULL,
  mouseOver VARCHAR(200) NOT NULL,
  toolId VARCHAR(36) NOT NULL,
  PRIMARY KEY (toolId),
  UNIQUE (toolName),
  UNIQUE (mouseOver)
);

CREATE TABLE Accounts
(
  userId VARCHAR(36) NOT NULL,
  username VARCHAR(40) NOT NULL,
  email VARCHAR(40) NOT NULL,
  password VARCHAR(80) NOT NULL,
  progress FLOAT NOT NULL,
  dateStarted DATE NOT NULL,
  dateCompleted DATE,
  pagesCompleted INT NOT NULL,
  fastestTime VARCHAR(40),
  leaderboard INT,
  PRIMARY KEY (userId),
  UNIQUE (email),
  UNIQUE (username),
  UNIQUE (leaderboard)
);

CREATE TABLE Account_toolIds
(
  toolIds VARCHAR(36) NOT NULL,
  userId VARCHAR(36) NOT NULL,
  PRIMARY KEY (toolIds, userId),
  FOREIGN KEY (userId) REFERENCES Accounts(userId)
);

CREATE TABLE Account_checkpoints
(
  checkpoints DATE NOT NULL,
  userId VARCHAR(36) NOT NULL,
  PRIMARY KEY (checkpoints, userId),
  FOREIGN KEY (userId) REFERENCES Accounts(userId)
);

CREATE TABLE Comments
(
  username VARCHAR(40) NOT NULL,
  message VARCHAR(300) NOT NULL,
  commentId VARCHAR(36) NOT NULL,
  commentDate DATE NOT NULL,
  userId VARCHAR(36) NOT NULL,
  PRIMARY KEY (commentId),
  FOREIGN KEY (userId) REFERENCES Accounts(userId)
);