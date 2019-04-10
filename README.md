# web components demo with simple pubsub pattern

No frameworks, just pure JavaScript ES6.

It uses webcomponents and the pubsub pattern to allow each component to subscribe and/or publish to the datastore.

![](demo.gif)

### why?

Recently I did the usual `npx create-react-app myapp` and while waiting for it to build I realized that it was producing an *awful* lot of code.

To check, I then ran [tokei](https://github.com/XAMPPRocky/tokei) on the clean install:

```
-------------------------------------------------------------------------------
 Language            Files        Lines         Code     Comments       Blanks
-------------------------------------------------------------------------------
 Autoconf                1          389          226          128           35
 BASH                    2           55           41            3           11
 CoffeeScript           30         2156         1504           60          592
 CSS                    38         1827         1704           24           99
 Handlebars              3           92           77            0           15
 HTML                   58         8598         8389           67          142
 JavaScript          23409      2988527      1990585       618054       379888
 JSON                 2197       233727       233727            0            0
 Makefile               44         1875         1209          196          470
 Markdown             2985       549713       549713            0            0
 Module-Definition       5          540          452            0           88
 Shell                   8         1207          937           96          174
 SVG                     5           27           27            0            0
 Plain Text             81         6863         6863            0            0
 TOML                    1           41           39            0            2
 TypeScript           1708       158430        64152        88341         5937
 XML                     2         2192         1948           11          233
 YAML                    7          107           92            8            7
-------------------------------------------------------------------------------
 Total               30584      3956366      2861685       706988       387693
```
Yikes! 23 thousand+ files, nearly 2 MILLION lines of JavaScript and I haven't even written anything yet?

And then Microsoft announced they were giving up developing their own browser [and going with chromium](https://www.theverge.com/2019/4/8/18300077/microsoft-edge-chromium-canary-development-release-download).

Suddenly I saw the light. Plain ES6 web components and no frameworks. Hence this demo, which clocks in as follows:
```-------------------------------------------------------------------------------
 Language            Files        Lines         Code     Comments       Blanks
-------------------------------------------------------------------------------
 CSS                     1           53           46            0            7
 HTML                    1           23           20            0            3
 JavaScript             10          360          276           35           49
 Markdown                1           88           88            0            0
-------------------------------------------------------------------------------
 Total                  13          524          430           35           59

├── css
│   └── style.css
├── demo.gif
├── favicon.ico
├── index.html
├── js
│   ├── components
│   │   ├── app-addperson.js
│   │   ├── app-chosenpeople.js
│   │   ├── app-chosenperson.js
│   │   ├── app-console.js
│   │   ├── app-messages.js
│   │   ├── app-people.js
│   │   └── app-person.js
│   ├── main.js
│   └── pubsub
│       ├── datastore.js
│       └── pubsub.js
└── README.md
```
### how does it work?
Objects that have something to say publish the type of NewInfo and an object of data:
```
    this.pubsub.publish('NewPerson', person);
    this.pubsub.publish('Message', {"component": "app-addperson", "text": "adding " + person.name});
```
Objects that are interested in those news items subscribe to the NewInfo, state what info they want, pass parameters if needed (eg id) and give the callback function they want to be fired:
```
    this.pubsub.subscribe('NewPerson', 'getChosenPeople', null, this.renderData);
```
I could have wrapped all requests in an object, so instead of 
```
    this.pubsub.subscribe('NewPerson', 'getChosenPeople', null, this.renderData);
    this.pubsub.subscribe('ChangePerson', 'getChosenPeople', null, this.renderData);
    this.pubsub.subscribe('DeletePerson', 'getChosenPeople', null, this.renderData);
```
we would have
```
this.pubsub.subscribe({'NewPerson','ChangePerson','DeletePerson'} 'getChosenPeople', null, this.renderData);
```
but then it would be more tricky to assign specific requests/callbacks to each NewInfo.

Also I've not bothered with shadow dom as I like using Bootstrap to control overall css. If you want to add it, it's an easy two-part step:

* attach the shadow to the root after super() in all constructors:
```
constructor(){
    super();
    this.root = this.attachShadow({mode: 'open'});
    // etc
}
```
* change all `this.innerHTML` references to `this.root.innerHTML`


Enjoy.