# star_catcher

## Local Install Instructions:
- Run npm install
- Run npm start

***

A simple, fun exercise I did to get accustomed to Phaser and expand my capabilities with the framework. This was my first "solo" attempt at a Phaser 3 project (that is, not following along with a tutorial's source code), as well as my first experiment with using the Tiled map editor. The challenge I gave myself in this project: to have the stars spawn at random coordinates... but only where they wouldn't be overlapping the platforms. To resolve this, I turned to the Phaser community for help, at the [Phaser Discourse group](https://phaser.discourse.group/). With their guidance, I arrived at the solution of filtering empty tiles on the collision layer and spawning each star at the coordinates of a randomly selected tile from the array of empties.

[Check it out on Heroku](https://star--catcher.herokuapp.com/)
