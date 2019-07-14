# Yet another web cv

Just yet another™ template for resumes using pug and scss. Your resume data is in json.

![example resume](https://i.imgur.com/MYV9mpY.jpg)
(Kitty photo by [Erik-Jan Leusink](https://unsplash.com/photos/IbPxGLgJiMI?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText) on [Unsplash](https://unsplash.com/search/photos/cat?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText))

## Usage

### Requirements

* [node.js](https://nodejs.org/en/download/)
* bit of knowledge of your system's command line and json

### Startup

Start it up via...
```
npm install
npm start
```
Then navigate in your browser to localhost:[given port]
(i.e. program if outputs "Listening on port 60356", enter localhost:60356 in your address bar).
You can set a specific port simply via the environment variable *PORT*

### Entering your resume

* Create a .json file (with any name) in ```content``` and open it (or just open the exising ```en.json```)  
* Changes to the .json file are applied on every refresh. There is no need to restart the whole app.
* Place your image(s) under public/images

The .json file's structure should be pretty self-explanatory. If you are unsure which content appears where, look at the provided example (the shipped en.json).

(In other words: Im to lazy to write a json schema)

* For each file in ```content```, the app will serve each file's content under the file's name.

    For instance, if you have two files, ```en.json``` and ```de.json```, you will have one version of your resume available under ```localhost:[port]/en``` with the contents of en.json, another one at ```localhost:[port]/de```.

 ## Customizing

 Feel free to edit the ```public/stylesheets/style.scss``` to your likes. All important properties are defined as variables the top.

 Changes get applied instantly on refresh without needing to restart the whole app (thanks to [node-sass-middleware](https://www.npmjs.com/package/node-sass-middleware)).  
