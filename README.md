# StairWELL
![alt text](https://github.com/Navinate/stairwell-new/blob/main/assets/sculpture.png?raw=true)
## Introduction
Welcome to the main repo for **Purdue StairWell!** This repository holds the code for the interactive art piece including front-end forms, back-end data storage & processing, as well as the code for displaying the resulting visual onto a display.
## Project Structure
Each section of the project is in it's own folder for static "routing" and organization.
- `form/` the form that students will fill out and draw their gesture with
-  `lib/` shared js files between sections
- `server/` hub for websocket interaction that manages data and interacts with the redis database
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
npm install
```

Next, start the redis server on the default port (6379).
```bash
redis-server
```
For local testing comment line 3, and uncomment line 2 in `lib/socketHelper.js`, then within the `server/` folder start the server with Node.js.
```bash
node main.js
```
Finally use a tool like "live server" to locally host the files and open them in the browser.
## Staying Up To Date

Pull the latest changes from this repository.
```bash
git pull
```
