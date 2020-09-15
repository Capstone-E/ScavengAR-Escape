# ScavengARescape

## _An augmented reality escape adventure!_

This project was made as part of our final project in the Grace Hopper Program at Fullstack Academy. Our aim was to learn about the technology required to build an AR experience.

ScavengARescape was built using Viro-ReactNative

### REQUIREMENTS

- This app is only available for demo by using the Testbed feature of the ViroMedia App. You must first download the app onto your mobile device (available on Google Play and the App Store)

* After cloning, CD into the ScavengAR-Escape directory and `npm install`

* You then have a choice to use either the local IP address of your machine and your device connected to WiFi or NGROK. Both are automatically built into the Testbed. You may need to install NGROK on your machine separately if needed.

* `npm start`

* IF YOU ARE USING THE IP ADDRESS METHOD, YOU MAY SKIP THIS STEP. FOR NGROK: Once 'start' has launched, you will first see an attempt to connect to the NGROK server. If you are using NGROK, the server must connect and you will know it was successful when a green box is displayed with the NGROK http address. You may need to `CTRL-C` and `npm start` a few times to get the NGROK server to connect properly. It is notoriously finicky.

- 'Start' will load a few more things and you will be successful when the screen displays "Loading dependency graph, done."

- Launch the ViroMedia App, select from the top-left menu `</> Enter Testbed`. You will then be prompted to enter your NGROK URL or an IP address.

- The app will now build for the first time on your machine. This process can take a few minutes, so please be patient. The app will rebuild completely every time you run `npm start`, however you may reload from within the device at any time without rebuilding.

- If all is successful, you should now see the splash screen of the game and you can proceed.

### TIPS FOR GAMEPLAY

- For best results, please ensure that you have ample space available to play. This is an AR experience and you will be moving about the room.

- It is recommended that you launch the app while standing, preferably in a doorway or against a wall facing the open room.

- The device should be held at a comfortable viewing level and kept in a vertical position.

- Once you have launched and the AR engine has centered itself, you may move the device around freely. Please be careful not to move too quickly however, as the AR tracking cannot keep up with rapid movements.

**TO RELOAD / REFRESH THE GAME, PLEASE _SHAKE_ YOUR DEVICE TO BRING UP THE OPTIONS MENU, YOU CAN SELECT RELOAD FROM HERE**

---

### TROUBLESHOOTING

**My screen is jumpy or freezing**

- Due to the heavy nature of AR and the 3D graphics involved, you may experience some varied load times depending on your device, WiFi or other factors. A little patience with loading, or taking care not to move the device around quickly will help. You may also try reloading the game. Each reload stores the graphics in the Testbed cache and subsequent plays seem to be less jumpy.

**My IP address will not connect**

- Please make sure you are entering the LOCAL address of your machine, this should look something like `192.168.x.xxx`. Your device must also be connected to the same WiFi network as your machine.

**NGROK is not connecting**

- Please make sure you entered the entire URL (including ngrok.io). If you are not able to connect to the NGROK server on your machine, you may need to reinstall NGROK globally `npm install -g ngrok`. Please see NGROK documentation for further instructions if needed

### FOR FURTHER READING

- [Viro Quick-Start Guide](https://docs.viromedia.com/docs/quick-start)
- [Viro AR tutorial](https://docs.viromedia.com/docs/tutorial-ar)
- [NGROK documentation](https://ngrok.com/docs)

## _The team behind ScavengARescape_

(in alphabetical order)

- [Kali](http://www.github.com/SlowGen)
- [Kristi Nanco](http://www.github.com/knanco)
- [Ashlee Pitock](http://www.github.com/AshleeKP)
- [Mona Zheng](http://www.github.com/catmemberMona)

---

- [Teaching Fellow / Project Manager Angie Spears](http://www.github.com/AMSpears)
- [Fullstack Instructor David Patlut](http://www.github.com/dpatlut)

## Source Credit

- [Camping Scene: Alex “SAFFY” Safayan](https://poly.google.com/view/3nj59_uuCbM)
- [Beach Scene: Erica Nguyen](https://poly.google.com/view/2mg94-lj5DS)
- [Train Station: Fr0g](https://sketchfab.com/3d-models/low-poly-american-metro-station-1fd4898142864627a52702061d0ee0f9#download)
- [Unlocking Sound Effect: angelkunev ](https://freesound.org/people/angelkunev/sounds/519065/) 
