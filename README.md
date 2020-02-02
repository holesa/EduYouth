NABUDUCE (Must!!!):
---
- Spravit navbar nahrubo + HTML+CSS practice 
. ako navrhovat Wireframe ==> Pockat na odpoved od FS predtymto 
. Oauth autentikacia (Google)
. Napevno nadizajnovat databazu


Co treba spravit na koniec:
---
- poziadanie zabudnuteho hesla
- mobilna verzia (mysliet pri frontende)
- pridat ES6 syntax - hlavne classes
- testing Mocha/Chai


V1+
----
- filtrovanie bez refreshu



Co potrebujem pochopit v CSS (najdolezitejsi je layout):
https://www.w3schools.com/css/css_website_layout.asp

Flex
https://www.freecodecamp.org/news/flexbox-the-ultimate-css-flex-cheatsheet/


- css box = content, padding, border, margin   ***
- display = inline, block, inline-block        ***
- flex = flex-direction, justify-content,align-items, flex-basis, flex-wrap, flex-grow, flex-basis, flex(flex-grow, flex-shrink, and flex-basis)
order, align-self ***
- grid = grid-template-columns, repeat, minmax, auto-fill, grid-column-gap, grid-gap, grid-column, justify-self, align-self, justify-items, align-items, grid-template-areas, grid-area    *** 
- float, clear = left, right, none, inherit    ***
- position: absolute, static, relative, fixed, sticky  ***
- responzivita  ***
- bootstrap     ***



























Autentikacia
------------------
Fazy:
1. Zasifrovanie hesla z inputu
2. Ulozenie zasifrovaneho hesla a mena do databazy 

Realne fazy:
----
-Nastavenie session, cookies = express - session
-Password hashing = bcryptjs
-Middleware pre autentikaciu = Passport
* configuracia strategie
* initialize Passport - passport.inititialize()
* pre session - passport.session() / musi byt za session
* pre podporu login session - serialize, deserialize user
- middleWare isLoggedIn


Co nechapem:
- Cely proces zasifrovania hesla pri registraci a jeho overovania pri logine



Potrebujem este pridat do univApp
- Po registracii sa autentikujem
- express flesh
-

Databaza     
----------------------
Dilema
- oauth dat spolou s lokalnou registraciou, alebo nie