# StairWELL
![alt text](https://github.com/Navinate/stairwell-new/blob/main/assets/sculpture.png?raw=true)
## Introduction
Welcome to the main repo for **Purdue StairWell!** This repository holds the code for the interactive art piece including front-end forms, back-end data storage & processing, as well as the code for displaying the resulting visual onto a display.
## Project Structure
Each section of the project is in it's own folder for static "routing" and organization.
- `assets/` Diffrent assests (audio samples, sprites PNG's, etc.) that are used in diffrent places throughout the project.
- `audio/` Debugging and testing for the audio component of the project.
- `form/` The form that people will fill out to design their displayed sprites.
- `form/` Welcome text to give background and introduce the project.
-  `lib/` Shared js files between sections.
- `server/` Hub for websocket interaction that manages data and interacts with the redis database
- `styles/` css files for all routes in one place, main.css contains global styles across the project
- `visual/` code for the visual that is to be displayed
## Setting Up
#### Requirements (click to go to download)
- [git](https://git-scm.com/download/)
- [node.js](https://nodejs.org/en/download)
- [redis](https://redis.io/download/)

#### Steps to Test Locally
First clone the repository.
```bash
git clone https://github.com/Navinate/stairwell-new.git
```
Switch to the cloned directory.
```bash
cd stairwell-new
```
Install needed packages.
```bash
npm ci
```

Next, start the redis on the default port (6379).  NOTE: [On Windows this is run through WSL so milage may vary.](https://redis.io/docs/getting-started/installation/install-redis-on-windows/)
```bash
redis-server
```
For local testing comment line 3, and uncomment line 2 in `lib/socketHelper.js`, then, within the `server/` folder start the server with Node.js.
```bash
node main.js
```
Finally use a tool like "live server" or "Vite" to locally host the files and veiw them.
## Staying Up To Date

Pull the latest changes from this repository.
```bash
git pull
```
