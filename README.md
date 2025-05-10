# Node.js

Node.js is a javascript runtime built on google's V8 javascript engine.

Any browser natively understands HTML, CSS and Javascript. Gets directly executed in the browser. So in this case browser is the javascript runtime.

Javascript Runtime :

    We can put the javascipt outside the browser and run the Javascipt code outside the browser without the restrictions of the browser using node.js

    Node.js is like a container or an environment in which a program written is Javascript can be executed, but outside of any browser. The google's V8 engine parased and runs the javascript code.

    Using node.js we can now access the file systems and many more.

# Node.js Pros:

    1. Single threaded, based on event-driven, non-blocking I/O model.
    2. Perfect for building fast and scalable data-intensive apps.
    3. NPM : has huge library of open source packages.
    4. Javascript across the entire stack,can be used on  frontend as well as backend.

Repl : Read-eval-print-loop ( can be used in cmd to have an instance of node env )

Node.js is built around the concepts of "modules", where all kinds of additional functionality are stored in the modules, for ex: to read files from disk we use "fs" module.

## Synchronous:

    1. Each statement is processed one after another line by line.
    2. Each line waits for the result of the previous line.
    3. Each line blocks the execution of the rest of the code.
    4. Synchronous code is also called blocking code.

## Asynchronous:

    1. In asynchronous code we off loads the heavy work to be worked in the background and once the work is done in the background, a callback function that we have written before, is called to handle the result.
    All that time the rest of code can be executed without been blocked.

    Thread is basically where our node application is being run in the CPU's processor.

    All the users that are using our application is accessing this thread, so this thread should be non-blocking so that the users doesn't get blocked from using the application.

## Modules

    In Node every single file is treated as a module.

## NPM

    Node package manager is a command line interface manager that automatically comes with node.js and which we use to install and manage third party open source packages.

    "npm init" creates a package.json file, that is configuration file of our project where all kind of data about our project is stored.

    Types of packages:
        1. Simple/Regular dependencies : Depnedencies on which our project depends.
        2. Development dependencies : Dependencies that we need only at the time of development.

    Package versioning:

    "slugify": "^1.6.5"

    1 : for major changes, can have breaking changes
    6 : for minor changes, non-breaking changes
    5 : patching changes or bug fixes, non-breaking

    updating control:

    ^ : accepts minor and patch updates for the package, default
    ~ : accepts only patch updates
    * : accepts all the updates
