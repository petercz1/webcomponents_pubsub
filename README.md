# web components demo with simple pubsub pattern

No frameworks, just pure JavaScript ES6.

It uses webcomponents and pubsub pattern to allow each component to subscribe and/or publish to the datastore.

### why?

Recently I did the usual create-react-app myapp and while waiting for it to build I realized that it was producing an *awful* lot of code.

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

And then Microsoft announced they were giving up with writing their own browser [and going with chromium](https://www.theverge.com/2019/4/8/18300077/microsoft-edge-chromium-canary-development-release-download).

Suddenly I saw the light. Plain ES6 web components and no frameworks. Hence this demo, which clocks in as follows:
```-------------------------------------------------------------------------------
 Language            Files        Lines         Code     Comments       Blanks
-------------------------------------------------------------------------------
 CSS                     1           56           49            0            7
 HTML                    1           21           20            0            1
 JavaScript             10          358          274           33           51
 Markdown                1           42           42            0            0
-------------------------------------------------------------------------------
 Total                  13          477          385           33           59
 ```
### how does it work?
Objects that have something to say publish the type of news item and an object of data:
```
    this.pubsub.publish('NewPerson', person);
    this.pubsub.publish('Message', {"component": "app-addperson", "text": "adding " + person.name});
```
Objects that are interested in those news items subscribe to them, giving the callback function they want used whenever anything happens:
```
this.pubsub.subscribe(this.renderData, 'ChosenPeople', null);
```
The third parameter is to pass data eg 'id' - I

![](demo.gif)