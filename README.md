# Project1

Overview:

This is a recipes app that pulls various information from an recipe API. It shows ingredients, images, and nutritional information about a particular recipe.

Tools used:

- Animations
There are animations on hover, for example, for the navigation bar and the fake loading screen. These were done with key frames in CSS and utilize basic animation properties.

- Modals
The modals are used in displaying results as well as the fake loading screen. The modals are created with a div sitting in front of the whole page and positioned in the center of the page. During the fake loading screen, all items in the background are greyscaled and the navigation links become unclickable. 

- Fake loading
The fake loading is created using a setTimeOut function that lets the animation run for 1.2 seconds, and then 100ms after the animation is done, the page is changed. 

- Results
Results are created using flex boxes inside a div container. The image and name of a particular recipe matching the user's search is displayed, and users can click on the images/name to open up a modal displaying the ingredients. There is also a link to the original recipe for every result and hovering the mouse over the blue scroll will display nutritional facts about the recipe. 

- Responsive
The app is responsive and will respond to users resizing the window. 
