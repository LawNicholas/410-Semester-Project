## Project Proposal

A psuedo website that functions as an interactive game. The website will look like a normal business site, but interactive components will, when used in the correct sequence, reveal new components and webpages. The game is over when the secret of the website is discovered.

For example, a profile picture of another (fake) user might have a pass phrase in the background that gives the player access to another page. Think of the website as a puzzle box. Each new discovery will grant access to a part of the puzzle inaccessible before.

Reaching the end of the game will allow the player to view statistics about other players who have completed the maze. Statistics will include time taken to clear each checkpoint as well as the maze as a whole. There will also be a chatroom at the end for anyone who has completed the game.

## Domain Driven Design
### Domain Events
* Account created
* Account updated
* Account deleted
* Discovery found
* Interactable clicked
* Page visited
* Time ellapsed
### Domain Commands
* Create an account
* Delete an account
* Reset account progress
* Validate password
* Change page layout
* Change page availability
* Add discovery to list
* Add tool to toolbar
### Entities
* Account
    * Discovies collected
    * Progress percentage
    * Time of account creation
    * Tools available
* Records List
    * Name of the user
    * Time taken to complete the maze
    * Time taken to complete individual pages/checkpoints
### Value Objects
* Customer support chat window history
* "Finish Line Room" chat history

## REST API
| Description             | Endpoint                          | HTTP Hethod | Path Parameter  | Representations |
|-------------------------|-----------------------------------|-------------|-----------------|-----------------|
| create a new account    | /accounts                         | POST        |                 | Create Account  |
| delete user's account   | /accounts/{userId}                | DELETE      | userId          |                 |
| get account details     | /accounts/{userId}                | GET         | userId          | Get Account     |
| update account info     | /accounts/{userId}                | PUT         | userId          |                 |
| log in                  | /accounts/{userId}/login          | PUT         | userId          | Log In          |
| log out                 | /accounts/{userId}/logout         | PUT         | userId          |                 |
| add tool                | /accounts/{userId}/tools/{toolId} | PUT         | userId, toolId  |                 |
| get tool details        | /tools/{toolId}                   | GET         | toolId          | Get Tool        |
| get leaderboard         | /leaderboard                      | GET         |                 | Get Leaderboard |
| get group chat          | /groupchat                        | GET         |                 |                 |
| add to group chat       | /groupchat                        | PUT         |                 | Add Chat        |

### Create Account
```
{
    "username": "ExampleUser99",
    "email": "example@mail.com",
    "password": "examplepass21!"
}
```

### Get Account
```
{
    "username": "Fast User",
    "dateRegistered": "2022-04-15 08:00:31",
    "pagesCompleted": 4,
    "progress": 1.0,
    "checkpoints": ["2022-04-15 10:02:56", "2022-04-16 13:36:22", "2022-04-16 15:13:28", "2022-04-16 15:42:09"],
    "dateCompleted": "2022-04-16 15:42:09",
    "timeTaken": "31:41:38",
    "leaderBoard": 1,
    "tools": [1, 2, 3, 4]
}
```

### Log In
```
{
    "email": "e-mail",
    "password": "examplepass21!"
}
```

### Get Tool
```
{
    "toolName": "Page Scanner",
    "mouseOver": "Use to Find Hidden Clues",
    "icon": "icon1.png"
}
```

### Get Leaderboard
```
[
    {
        "username": "Fast User",
        "dateRegistered": "2022-04-15 08:00:31",
        "checkpoints": ["2022-04-15 10:02:56", "2022-04-16 13:36:22", "2022-04-16 15:13:28", "2022-04-16 15:42:09"],
        "dateCompleted": "2022-04-16 15:42:09",
        "leaderboard": 1
    },
    {
        "username": "Slow User",
        "dateRegistered": "2022-04-15 09:00:00",
        "checkpoints": ["2022-04-15 15:22:41", "2022-04-17 14:22:36", "2022-04-18 13:02:14", "2022-04-24 10:36:33"],
        "dateCompleted": "2022-04-24 10:36:33",
        "leaderboard": "2"
    }
]
```

### Add Chat
```
{
    "username": "Fast User"
    "message": "Looks like I'm First!"
}
```