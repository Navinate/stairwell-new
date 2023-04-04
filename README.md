# StairWELL
![alt text](https://github.com/Navinate/stairwell-new/blob/main/assets/sculpture.png?raw=true)
## Intro
Welcome to the main repo for **Purdue StairWell!** This repository hold the code for the interactive art piece including front-end forms, back-end data storage & processing, as well as the code for displaying the resulting visual onto a display.
## Project Structure
Each section of the project is in it's own folder for static "routing" and organization.
- `form/` the form that students will fill out and draw their gesture with
-  `lib/` shared js files between sections
- `server/` hub for websocket interaction that manages data and interacts with the redis database
- `styles/` css files for all routes in one place, main.css contains global styles across the project
- `visual/` code for the visual that is to be displayed
## Setting Up
First clone the repository using [git](https://git-scm.com/download/win).
```
git clone https://github.com/Navinate/stairwell-new.git
```
Next