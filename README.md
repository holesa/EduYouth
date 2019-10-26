Autentikacia
------------------
Fazy:
1. Zasifrovanie hesla z inputu
2. Ulozenie zasifrovaneho hesla a mena do databazy 
3. 

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

