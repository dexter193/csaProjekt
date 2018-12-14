# Projektvorschlag Lorem ipsum 

**Hochschule Worms CSA 151 WS 2018/19**

Gruppe 9


Marco Bastuck
inf2551@hs-worms.de   
Matrikelnummer: 671515

David Michel
inf2702@hs-worms.de   
Matrikelnummer: 672209

---

## Abstract

Unsere Anwendung soll ein Quiz darstellen. Die wichtigsten Features die wir einbinden wollen, sind ein User-Login, verschiedene Kategorien, die der User waehlen kann, innerhalb derer Fragen gestellt werden und ein Statistikteil, in dem der User verschiedenste Statistiken zu seinen bereits beantworteten Fragen einsehen kann. Die Implementierung der Fragen, des Logins und der Statistiken sollen ueber eine Datenbank realisiert werden, die der Client vom Server bei Bedarf abfragt. Innerhalb des User-Interfaces soll es zu dem auch moeglich sein, die Statistiken nach bestimmten Gesichtspunkten zu sortieren.


## Abstract Client
Verantwortlicher: Marco Bastuck

Der Client soll aus einer Login-Page bestehen, die einen nach dem Login zur Hauptseite navigiert. Hier soll mal ein neues Quiz anfangen koennen und die Statistiken einsehen koennen. Wenn ein neues Quiz angefangen wird, wird der User erst abgefragt, in welcher Kategorie er dieses spielen moechte. Innerhalb der Statistiken lassen sich noch verschiedene Parameter zur Sortierung und Anzeige auswaehlen, um die Statistiken den Wuenschen des Users entsprechend zu filtern.



## Wireframe


## Mobil

Im Folgenden Bild sind die Mobilversionen unserer einzelnen Screens zu sehen:


![](wireframes/mobile.jpeg)

## Desktop

Folgend sind die einzelnen Screens, die im Browser erscheinen sollen, zu sehen:

### Login

Hier kann der User sich einloggen und bei Bedarf sich neu registrieren. Nach dem Login wird er auf die MainPage geleitet.

![](wireframes/Login.png)

### Register

Hier kann der User einen neuen Account anlegen. Nach der Anlegung wird er eingeloggt und zur Mainpage weitergeleitet.

![](wireframes/Register.png)

### MainPage

Hier kann der User sowohl ein neues Quiz starten, als auch seine bisherigen Statistiken anschauen!

![](wireframes/Main_Page.png)

### Category

Wenn der User in der Mainpage auf "New Quiz" geklickt hat, kann er nun hier eine Kategorie fuer eben dieses auswaehlen.

![](wireframes/Categorie.png)

### Questions

Hier werden die einzelnen Fragen dargestellt, durch die der User sich durch Auswaehlen der Antworten durchbewegt.

![](wireframes/Questions.png)


### Statistics

Hier kann der User seine userspezifischen Statistiken einsehen.

![](wireframes/statisticsNew.png)


## Abstract Server
Verantwortlicher: David Michel

Der Server verwaltet die Datenbank, die User, Statistiken und Fragenkatalog enthaelt. Er schickt auf Anfrage die entsprechenden Informationen an den Client und "verifiziert" auch den Login, wobei das Passwort hier fuers Erste nur im Klartext gespeichert wird.

## ORM

In unserem ORM sind die 3 verschiedenen wichtigen Objekte in unserer Anwendung zu sehen, die eben auf diese Art auch in der Datenbank repraesentiert werden. Auf der einen Seite gibt es hier den Fragenkatalog, der jegliche Informationen zu den Fragen enthaelt. Dann gibt es den User, der, sehr schlicht, nur Username und Passwort (fuers erste im Klartext) enthaelt. Der letzte Eintrag ist die Statistik, hier werden Informationen zu User, Kategorie, gespielten Spielen und richtigen Antworten gespeichert. Die Verknuepfung zwischen User und Statistik geschieht hier ueber den Fremdschluessel Username.

![](orm/quizORM.jpeg)


## API-Beschreibung

Im folgenden werden die verschiedenen URI's beschrieben, ueber die der Client mit dem Server kommuniziert und Daten abfragen, sowie in die Datenbank einpflegen kann.


### `GET /login`

In dieser Route fragt der Client den Server ab, ob User und Passwort ueberein stimmen und der User hiermit eingeloggt ist.

### `POST /register/user`

In dieser Route nimmt der Server einen neuen Username & Passwort entgegen und speichert diese in der Datenbank.

### `GET /statistics/user`

Hier nimmt der Server einen bestimmten User entgegen und gibt die entsprechenden Statistiken fuer diesen aus.

### `GET /question/catgegory`

Hier nimmt der Server eine bestimmte Kategorie entegegen und gibt entsprechende Quizfragen fuer diese Kategorie aus.


### `POST /gameFinished`

Nach dem Beenden eines Spiels nimmt der Server hier die Daten entgegen, wie richtige Fragen, gespielte Fragen etc., um diese in die Statistik einzupflegen.

### `DELETE /statistics`

ueber diese Route kann der User die Statistik zuruecksetzen, indem der Server hier die Datenbank fuer die Statistik leert.



### Template Object

Die User-Objekte sollen folgendermassen aussehen:

```javascript
{
    username: "test",
    password: "password"
}
```

In den Question-Objekten muss ein wenig mehr gespeichert werden, da die verschiedenen Antwortmoeglichkeiten und der Frageninhalt hier auch von Relevanz sind:

```javascript
{
  category: "music",
  content: "Wie laut ist Musik"
  possible answer1: "laut",
  possible answer2: "leise",
  possible answer3: "mittel",
  possible answer4: "alles",
  correct answer: "mittel"
}
```
Abschliessend findet sich das Statistics-Objekt, das auch noch den username uebergeben bekommt, um die Statistiken entsprechend user-spezifiziert sortieren zu koennen.

```javascript
{
    correctAnswers: "199999",
    username: "tester",
    category: "testkategorie",
    gamesPlayed: "2"
}
```


## Aufwandsschaetzungen

### Frontend

Verantwortlicher: Marco Bastuck

#### Projektvorbereitung 

Im Folgenden wird der geforderte Zeitaufwand fuer die verschiedenen Unterpunkte geschaetzt und dargestellt.


| Aufgabe                                  | Zeit in Std |
|------------------------------------------|------------:|
| Brainstorming                               |  7             |
| Abstract                                   |  1          |
| Abstract Client                           |  1             |
| Wireframe Mobil                            |  4          |
| Wireframe Desktop                           |  4          |
| Verfassen des Projektvorschlags          |  10         |
| *Summe*                                |  27          |


#### Implementierung

| Aufgabe                                  | Zeit in Std |
|------------------------------------------|------------:|
| HTML-Grundgeruest Login                   |   3         |
| HTML-Grundgeruest Main_Page               |   3         |
| HTML-Grundgeruest Category                |   3         |
| HTML-Grundgeruest Questions               |   3         |
| HTML-Grundgeruest Register               |   3         |
| HTML-Grundgeruest Statistics               |   3         |
| SCSS-Styling                               |  20         |
| Implementierung Funktionen               |  20         |
| *Summe*                                |  58         |

#### Dokumentation / Tests

| Aufgabe                                  | Zeit in Std |
|------------------------------------------|------------:|
| Dokumentation Funktionen.                |  10         |
| Tests                                    |   5         |
|                                           |             |
| Vergleich SOLL / IST Stunden             |  100        |
| *Summe*                                |  15         |

#### Zusammenfassung
| Teil                                     | Zeit in Std |
|------------------------------------------|------------:|
| Projektvorbereitung                      |   27        |
| Implementierung                          |   58        |
| Dokumentation / Tests                    |   15        |
| *Summe*                                |  100        |

### Backend

Verantwortlicher: David Michel

#### Projektvorbereitung

| Aufgabe                                  | Zeit in Std |
|------------------------------------------|------------:|
| Brainstorming                               |  7             |
| Abstract Server                           |  1          |
| Backend Endpunkte / API - Beschreibung   |  6          |
| ORM                                         |  3          |
| Verfassen des Projektvorschlags          |  10         |     
| *Summe*                                |  27         |

#### Implementierung und Validierung

| Aufgabe                                  | Zeit in Std |
|------------------------------------------|------------:|
| Setup Frameworks                         |  5             |                               
| DB ...                                   |  0          |
| - Setup                                  |  4          |
| - Tabelle Statistics                       |  2             |
| - Tabelle Questions                       |  2             |
| - Tabelle Users                          |  2             |
| Implementierung Login-Route              |  5          |
| Implementierung Register-Route           |  5          |
| Implementierung Statistics-Route         |  5          |
| Implementierung Question-Route           |  5          |
| Implementierung GameFinished-Route       |  5          |
| Implementierung StatisticDelete-Route    |  5          |
| *Summe*                                |  45         |

#### Dokumentation / Tests

| Aufgabe                                  | Zeit in Std |
|------------------------------------------|------------:|
| Setup Tests                              |  8          |
| Test DB                                  |  2          |
| Test Login-Route                            |  2          |
| Test Register-Route                         |  2          |
| Test Statistics-Route                    |  2          |
| Test Question-Route                        |  2          |
| Test GameFinished-Route                  |  2          |
| Test StatisticDelete-Route               |  2          |
| Dokumentation Login-Route                 |  1          |
| Dokumentation Register-Route                |  1          |
| Dokumentation Statistics-Route              |  1          |
| Dokumentation Question-Route             |  1          |
| Dokumentation GameFinished-Route          |  1          |
| Dokumentation StatisticsDelete-Route        |  1          |
| Vergleich SOLL / IST Stunden             |100          |
| *Summe*                                | 28          |


#### Zusammenfassung
| Teil                                     | Zeit in Std |
|------------------------------------------|------------:|
| Projektvorbereitung                      |  27         |
| Implementierung                          |  45         |
| Dokumentation / Tests                    |  28         |
| *Summe*                                |  100        |
