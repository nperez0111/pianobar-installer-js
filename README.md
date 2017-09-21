# Pianobar-Installer-JS
> Installs Pianobar using JavaScript instead of bash

This script does the same thing as my [other installer](https://github.com/nperez0111/pianobar-installer), but does so in JavaScript allowing to handle errors more efficiently.

# Install
In order to run this script you do need to have Node.js installed
1. Download all the files above
2. cd into the directory holding all the files
3. run `node menu.js` 

It will then run the installer for you asking the proper questions to get to the right installer. 

# Difference between Simple and Advanced Installer


## What the Simple Install does
* Pianobar on mac is not so simple of an install.
* This is a full install that can be performed on a mac with absolutely no prior apps or commands.
* This fixes non-obvious errors in the install of pianobar that have to do with the audio.
* Fully sets up the config file of pianobar so that you don't have to mess with its config file.
* Sets up auto login to pianobar so that you don't have to enter the username and password every time you use it.
* Sets up auto start station to automatically specify a station to start pianobar with.

## What the Advanced Install does (All options are optional)
  * Does everything that the simple installer does. 
  * Adds Notifications on changing a song
  	* Notification looks like this:
  	* ![Notification Image](Notification.png)
  * Adds Shortcuts to (Play/Pause, Next, Select Station, Like, Dislike, Ban, Quit)
  	* These can be accessed in any app which supports services, the keyboard shortcuts themselves are specified by you.
