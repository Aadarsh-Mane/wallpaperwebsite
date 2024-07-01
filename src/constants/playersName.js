export const players = [
    "Lionel Messi",
    "Cristiano Ronaldo",
    "Kylian Mbappe",
    "Erling Haaland",
    "Neymar Jr.",
    "Robert Lewandowski",
    "Kevin De Bruyne",
    "Harry Kane",
    "Mohamed Salah",
    "Virgil van Dijk",
    "Sadio Mane",
    "Karim Benzema",
    "Bruno Fernandes",
    "Romelu Lukaku",
    "Thibaut Courtois",
    "Jan Oblak",
    "N'Golo Kante",
    "Joshua Kimmich",
    "Trent Alexander-Arnold",
    "Alphonso Davies",
    "Paul Pogba",
    "Luis Suarez",
    "Gareth Bale",
    "Raheem Sterling",
    "Luka Modric",
    "Sergio Ramos",
    "Jadon Sancho",
    "Bernardo Silva",
    "Mason Mount",
    "Phil Foden",
    // Premier League Players
    "Bukayo Saka",           // Arsenal
    "Martin Ødegaard",       // Arsenal
    "Gabriel Martinelli",    // Arsenal
    "Declan Rice",           // Arsenal
    "Rodri",                 // Manchester City
    "Jack Grealish",         // Manchester City
    "Marcus Rashford",       // Manchester United
    "Casemiro",              // Manchester United
    "Bruno Guimarães",       // Newcastle United
    "Kieran Trippier",       // Newcastle United
    "James Maddison",        // Tottenham Hotspur
    "Son Heung-min",         // Tottenham Hotspur
    "Dominic Calvert-Lewin", // Everton
    "Moises Caicedo",        // Chelsea
    "Thiago Silva",          // Chelsea
    "Alexis Mac Allister",   // Liverpool
    "Dominik Szoboszlai",    // Liverpool
    "João Palhinha",         // Fulham
    "Jarrod Bowen",          // West Ham United
    "James Ward-Prowse",     // West Ham United
    "Solly March",           // Brighton & Hove Albion
    "Kaoru Mitoma",          // Brighton & Hove Albion
    "Ollie Watkins",         // Aston Villa
    "Douglas Luiz",          // Aston Villa
    // La Liga Players
    "Antoine Griezmann",     // Atletico Madrid
    "Jan Oblak",             // Atletico Madrid
    "Frenkie de Jong",       // Barcelona
    "Pedri",                 // Barcelona
    "Gavi",                  // Barcelona
    "Marc-André ter Stegen", // Barcelona
    "Robert Lewandowski",    // Barcelona
    "Vinícius Júnior",       // Real Madrid
    "Rodrygo",               // Real Madrid
    "Jude Bellingham",       // Real Madrid
    "Eduardo Camavinga",     // Real Madrid
    "Aurelien Tchouameni",   // Real Madrid
    "Federico Valverde",     // Real Madrid
    "David Alaba",           // Real Madrid
    "Isco",                  // Real Betis
    "Borja Iglesias",        // Real Betis
    "Mikel Oyarzabal",       // Real Sociedad
    "Takefusa Kubo",         // Real Sociedad
    "Samuel Chukwueze",      // Villarreal
    "Gerard Moreno",         // Villarreal
    "Kieran Trippier",       // Atletico Madrid
    "Iago Aspas",            // Celta Vigo
    "Óscar Trejo",           // Rayo Vallecano
    // Serie A Players
    "Victor Osimhen",        // Napoli
    "Khvicha Kvaratskhelia", // Napoli
    "Giovanni Di Lorenzo",   // Napoli
    "Mike Maignan",          // AC Milan
    "Rafael Leão",           // AC Milan
    "Sandro Tonali",         // AC Milan
    "Lautaro Martínez",      // Inter Milan
    "Nicolò Barella",        // Inter Milan
    "Hakan Çalhanoğlu",      // Inter Milan
    "Federico Chiesa",       // Juventus
    "Dusan Vlahovic",        // Juventus
    "Paul Pogba",            // Juventus
    "Paulo Dybala",          // Roma
    "Tammy Abraham",         // Roma
    "Sergej Milinković-Savić", // Lazio
    "Ciro Immobile",         // Lazio
    "Ricardo Rodriguez",     // Torino
    "Matteo Darmian",        // Inter Milan
    "Giorgio Scalvini",      // Atalanta
    "Andrea Belotti",        // Roma
    "Juan Cuadrado",         // Inter Milan
    "Luis Alberto",          // Lazio
    "Pedro",                 // Lazio
    "Nico González",         // Fiorentina
    // Switzerland National Team Players
    "Yann Sommer",           // Bayern Munich
    "Granit Xhaka",          // Bayer Leverkusen
    "Xherdan Shaqiri",       // Chicago Fire
    "Manuel Akanji",         // Manchester City
    "Breel Embolo",          // AS Monaco
    "Denis Zakaria",         // AS Monaco
    "Nico Elvedi",           // Borussia Mönchengladbach
    "Remo Freuler",          // Nottingham Forest
    "Ricardo Rodriguez",     // Torino
    "Fabian Schär",          // Newcastle United
    "Ruben Vargas",          // FC Augsburg
    "Steven Zuber",          // AEK Athens
    "Djibril Sow",           // Sevilla
    "Noah Okafor",           // AC Milan
    "Silvan Widmer",         // Mainz 05
    "Christian Fassnacht",   // Young Boys
    "Cedric Itten",          // Young Boys
    "Michael Lang",          // Basel
    // France National Team Players
    "Kylian Mbappe",         // Paris Saint-Germain
    "Antoine Griezmann",     // Atletico Madrid
    "Karim Benzema",         // Al-Ittihad
    "Paul Pogba",            // Juventus
    "N'Golo Kante",          // Al-Ittihad
    "Hugo Lloris",           // Tottenham Hotspur
    "Raphael Varane",        // Manchester United
    "Kingsley Coman",        // Bayern Munich
    "Ousmane Dembele",       // Paris Saint-Germain
    "Theo Hernandez",        // AC Milan
    "Aurélien Tchouameni",   // Real Madrid
    "Eduardo Camavinga",     // Real Madrid
    "Jules Koundé",          // Barcelona
    "Dayot Upamecano",       // Bayern Munich
    "Mike Maignan",          // AC Milan
    "Benjamin Pavard",       // Inter Milan
    "Christopher Nkunku",    // Chelsea
    // Netherlands National Team Players
    "Virgil van Dijk",       // Liverpool
    "Frenkie de Jong",       // Barcelona
    "Matthijs de Ligt",      // Bayern Munich
    "Memphis Depay",         // Atletico Madrid
    "Denzel Dumfries",       // Inter Milan
    "Nathan Ake",            // Manchester City
    "Cody Gakpo",            // Liverpool
    "Wout Weghorst",         // Manchester United
    "Donyell Malen",         // Borussia Dortmund
    "Steven Berghuis",       // Ajax
    "Steven Bergwijn",       // Ajax
    "Jeremie Frimpong",      // Bayer Leverkusen
    "Jurrien Timber",        // Arsenal
    "Xavi Simons",           // RB Leipzig
    // Germany National Team Players
    "Manuel Neuer",          // Bayern Munich
    "Joshua Kimmich",        // Bayern Munich
    "Thomas Müller",         // Bayern Munich
    "Ilkay Gundogan",        // Barcelona
    "Serge Gnabry",          // Bayern Munich
    "Kai Havertz",           // Arsenal
    "Timo Werner",           // RB Leipzig
    "Jamal Musiala",         // Bayern Munich
    "Leroy Sané",            // Bayern Munich
    "Antonio Rüdiger",       // Real Madrid
    "Niklas Süle",           // Borussia Dortmund
    "Leon Goretzka",         // Bayern Munich
    "Marc-André ter Stegen", // Barcelona
    "Julian Brandt",         // Borussia Dortmund
    "Nico Schlotterbeck",    // Borussia Dortmund
    // Spain National Team Players
    "Pedri",                 // Barcelona
    "Gavi",                  // Barcelona
    "Rodri",                 // Manchester City
    "Alvaro Morata",         // Atletico Madrid
    "Ferran Torres",         // Barcelona
    "Aymeric Laporte",       // Al-Nassr
    "David de Gea",          // Free Agent
    "Jordi Alba",            // Inter Miami
    "Dani Olmo",             // RB Leipzig
    "Marco Asensio",         // Paris Saint-Germain
    "Pau Torres",            // Aston Villa
    "Ansu Fati",             // Brighton & Hove Albion
    "Unai Simón",            // Athletic Bilbao
    "Cesar Azpilicueta",     // Atletico Madrid
    "Mikel Oyarzabal",       // Real Sociedad
    // Belgium National Team Players
    "Kevin De Bruyne",       // Manchester City
    "Romelu Lukaku",         // AS Roma
    "Thibaut Courtois",      // Real Madrid
    "Eden Hazard",           // Retired
    "Yannick Carrasco",      // Al-Shabab
    "Axel Witsel",           // Atletico Madrid
    "Toby Alderweireld",     // Royal Antwerp
    "Dries Mertens",         // Galatasaray
    "Leandro Trossard",      // Arsenal
    "Youri Tielemans",       // Aston Villa
    "Timothy Castagne",      // Fulham
    "Amadou Onana",          // Everton
    "Charles De Ketelaere",  // Atalanta
    "Thorgan Hazard",        // Anderlecht
    "Jeremy Doku",           // Manchester City
    // England National Team Players
    "Harry Kane",            // Bayern Munich
    "Bukayo Saka",           // Arsenal
    "Marcus Rashford",       // Manchester United
    "Raheem Sterling",       // Chelsea
    "Jack Grealish",         // Manchester City
    "Phil Foden",            // Manchester City
    "Jude Bellingham",       // Real Madrid
    "Trent Alexander-Arnold", // Liverpool
    "Declan Rice",           // Arsenal
    "Jordan Henderson",      // Al-Ettifaq
    "Reece James",           // Chelsea
    "John Stones",           // Manchester City
    "Kyle Walker",           // Manchester City
    "Kieran Trippier",       // Newcastle United
    "James Maddison",        // Tottenham Hotspur
    "Aaron Ramsdale",        // Arsenal
    "Mason Mount",           // Manchester United
    "Luke Shaw",             // Manchester United
    // Portugal National Team Players
    "Cristiano Ronaldo",     // Al-Nassr
    "Bruno Fernandes",       // Manchester United
    "Bernardo Silva",        // Manchester City
    "Joao Cancelo",          // Barcelona
    "Diogo Jota",            // Liverpool
    "Ruben Dias",            // Manchester City
    "Rafael Leão",           // AC Milan
    "Joao Felix",            // Barcelona
    "Ruben Neves",           // Al-Hilal
    "Pedro Gonçalves",       // Sporting CP
    "William Carvalho",      // Real Betis
    "Pepe",                  // Porto
    "Diogo Dalot",           // Manchester United
    "Otávio",                // Al-Nassr
    "Nuno Mendes",           // Paris Saint-Germain
    // Italy National Team Players
    "Gianluigi Donnarumma",  // Paris Saint-Germain
    "Leonardo Bonucci",      // Union Berlin
    "Giorgio Chiellini",     // Los Angeles FC
    "Marco Verratti",        // Al-Arabi
    "Jorginho",              // Arsenal
    "Federico Chiesa",       // Juventus
    "Lorenzo Insigne",       // Toronto FC
    "Ciro Immobile",         // Lazio
    "Nicolo Barella",        // Inter Milan
    "Leonardo Spinazzola",   // Roma
    "Alessandro Bastoni",    // Inter Milan
    "Manuel Locatelli",      // Juventus
    "Domenico Berardi",      // Sassuolo
    "Matteo Politano",       // Napoli
    "Emerson Palmieri",      // West Ham United
    "Davide Calabria",       // AC Milan
    "Sandro Tonali",         // Newcastle United
    "Lorenzo Pellegrini",    // Roma
    "Bryan Cristante",       // Roma
    "Francesco Acerbi",      // Inter Milan
    "Matteo Pessina",        // Monza
    "Andrea Belotti",        // Roma
    "Giacomo Raspadori",     // Napoli
    "Salvatore Sirigu",      // Free Agent
  ];
  