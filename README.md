# angular-contacts-app

Task: Develop a simple contact list application. Use your favorite javascript framework like (Angular, Backbone, React etc) to implement the following features:

- create a basic JSON contact list structure (up to the developer taste, or can be downloaded)
- access to profile data from static JSON file( with ajax or XMLHTTP request, create a separate abstract service for that .The service loads a json based on a parameter url, and after it is loaded, the service sends an event out with a CONTACTS_LOADED event preferably) in the folder of the application
- display contact list with profile picture and name (static JSON file should point to the url of the image in that package)
- create profile panel for contact with details like phone number, address
- allow user to edit or add contact with forms (do not need to save it just let the front end client to add or modify the new or existing record in the collection array)
- use Bootstrap to structure the application, use the components of it to build up the layout
- use LESS or SASS for your css modifiers if needed use their javascript based preprocessors to use them in your application
- create transitions effect wherever possible like changing panels, navigating in the application.
- create code commenting in the application where your code is implemented with description of the specified method or variable
- use the different features in the frameworks like directives, services, controllers where the framework provides these.

Requirements:
- use the attached sample image as reference when creating the wireframe - The web application should run in a local development server like WAMP, XAMPP or equivalent as soon as the given package is put to the www folder of the webserver.
- The wireframe of the application is open to be changed slightly, but it needs to look the same like as the reference image both the layout and the color scheme.  The goal is to check how the front end developer can structure and organize his or her code, spaghetti code is not acceptable solution.
- Where possible use the Bootstrap classes to make the application responsive for the given screen sizes like mobile device.
- Write at least one unit test file running on Jasmine. Please do not use any globally installed module in your package.json without saving it as a dependency or any  process.env.VARIABLE_NAME.


Bonus Task:
- implement searching capabilities
- Implement a feature that with query string navigate the application to the specified contact based on his id property in the JSON (example: application.url#user=123456)
- Write an e2e test for your app if you choose AngularJS
