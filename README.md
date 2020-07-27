<img src="https://challengepost-s3-challengepost.netdna-ssl.com/photos/production/software_photos/001/167/464/datas/original.png" alt="Miro" width="1000" height="500">

## Introduction

As four Muslim brothers came together at the start of this project we discussed various problems we faced as Muslims living in the West. After much brainstorming, we realized that there was a common problem we all faced; getting a ride to Jummah. Many students and professionals in our community share this issue especially. We wanted to come up with a solution using our skills as Muslim programmers. We believe our web app can address: the well-known parking issues at Masjids, traffic congestion, unnecessary trips from the same area, folks not having a ride to Jummah, and minimizing harm to the planet from vehicle emissions.

Our inspiration came from our religion teaching us to take care of our planet and the importance of going to Jummah. As stated in a Hadith: "The world is beautiful and verdant, and verily God, be He exalted, has made you His stewards in it, and He sees how you acquit yourselves.” (Sahih Muslim). We realized this was a prominent issue and Jummah Connections was started.

## What is Jummah Connections

Our [web app](https://jummah-carpool.herokuapp.com/) provides a platform for users to carpool with other users to their local Jummah. There are riders using our intuitive map feature to find rides in their locality, and there are drivers seeking to help their fellow Muslims find a ride to Jummah and fulfil their obligations.

## How we built it

We used the MERN stack for our web app. This consists of a front-end of ReactJS, a backend built upon NodeJS using a framework called ExpressJS. The database of our choice was MongoDB.

For our app design we implemented an MVC architecture. We chose to host our web app on Heroku.

## Challenges & Learning

- Learning how to coordinate and collaborate effectively, despite timezone barriers and different proficiency levels in different programming areas
- Making our project inclusive by walking each other through the code base and having everyone involved
- Designing templates/wireframes in our design phase and translating that web app using Miro
- Teaching our teammates the workflow and build process of developing a full-stack web app. This included but is not limited to:
  - Tutorials on the use of Git and GitHub
  - Using the terminal for increased productivity
  - Editing and source control on Visual Studio Code
  - Details on npm, NodeJS, and the use of development servers

Our Miro wireframes:
<img src="https://i.imgur.com/tQoLnan.png" alt="Miro" width="1000" height="400">

## Accomplishments

- We implemented a library to redirect HTTP traffic to HTTPS
- We used "@hapi/joi" to validate in coming request on the server. We also used "antd" for validation of input data for the front end

Diagram explaining our authentication and authorization process:
<img src="http://www.dnnsoftware.com/docs/common/img/gra-jwtprocess.png" alt="JWT"  width="1000" height="450" style="border: solid 10px black;" >

- We Implemented Google Maps to show drivers current and end locations. We also used Google Places API so users could easily pick address with an auto complete address bar
- We coordinated with our team mates on Zoom, scheduled sessions almost daily, and used GItHub for collaboration and source control
- We were successful in sharing our technical skillsets with each other, and helping one another to become better programmers. Using this experience not just to complete a project to show others, but for our own personal development.

## What's next for Jummah Connections

We hope to continue adding features, fixing bugs, and improving our web app. A view into a few proposed features would be:

- Ramadan: Taraweeh Version
- clearing rides weekly
- improving mobile experience
- passenger count and data
- map filters for mosques, timings etc.
- shareable link
