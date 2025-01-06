# The Workout Plan
The Workout plan är en single page webbapp skapad med Vue.Js (https://theworkoutplan.netlify.app/). Webbappen kan användas för att skapa veckoträningsscheman. 

Den här webbplatsen är en deluppgift i kursen DT192G - Fullstacks-utveckling med ramverk. Webbplatsen innehåller bland annat:
* Webbplatsen består av 3 sidor.
* Stor headerbild
* Vue.Js routing
* Komponentspecifik CSS
* Ska innehålla props, emits, reaktiv-data, two-way-binding
* Responsiv design


# Webbappen använder en Api för att lagra data
Ändpunkten finns här: [https://mackes-nest-js-api-1050979898493.europe-north1.run.app/api](https://mackes-nest-js-api-1050979898493.europe-north1.run.app/api).

### Träningsinlägg
Apiet hanterar planerade övningar att träna i form av träningsinlägg som kan klarmarkeras. Dessa inlägg innehåller kolumner för name, description, set, rep, isCompleted samt ett autogenererat id för identifiering. POST och put måste följa standarden för dessa för att skapa nya inlägg eller redigera inlägg. Specifikationer:

|                         | Api                                      |              |
|-------------------------|------------------------------------------|--------------|
|id                       |int autoincrement                         | PK           |
|name                     |varchar(500)                              |              |
|description              |varchar                                   |              |
|set                      |int                                       |              |
|rep                      |int                                       |              |
|isCompleted              |boolean                                   |              |

###  
När id krävs skickas det med som en html-parameter.
POST kräver name, description, set och rep.

|Metod  |Ändpunkt        |Beskrivning                                                                                       |
|-------|----------------|--------------------------------------------------------------------------------------------------|
|GET    |/api/           |Hämtar alla lagrade Tränings-inlägg.                                                              |
|GET    |/api/:ID        |Hämtar ett specifikt lagrat tränings-inlägg.                                                      |
|POST   |/api/           |Lagrar ett nytt tränings-inlägg. Alla parametrar för tabellen skickas med utom isCompleted och id |
|PUT    |/api/:ID        |Uppdaterar ett tränings-inlägg. Skicka med de parametrar du vill ändra.                           |
|DELETE |/api/:ID        |Raderar ett tränings-inlägg med angivet ID.                                                       |


## Installera projektet
```sh
npm install
```

### Kompilera och Hot-Reload under utvecklingsstadiet

```sh
npm run dev
```

### Kompilera och minifiera för produktion

```sh
npm run build
```
Färdiga produktionsfilerna sparas i dist-katalogen.

#### Markus Vickman, MAVI2302
