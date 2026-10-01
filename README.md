# FCdle

A daily Wordle-style football game: guess the mystery **EA SPORTS FC 27** card in five tries.

Every guess is compared against the mystery card:

| Clue | Green | Yellow | Grey |
| --- | --- | --- | --- |
| OVR, PAC, SHO, PAS, DRI, DEF, PHY, STR, age | Exact | Within ±3 | Off by more than 3 |
| Position | Exact | Same line (DEF / MID / ATT) | Different line |
| Nation | Exact | Same continent | Different continent |
| Club | Exact | Same league | Different league |

Numbers that aren't exact show ▲ or ▼ to say whether the mystery card is higher or lower. The card on the left reveals each attribute once you guess it exactly.

## Features

- **Daily** puzzle, the same card for everyone each day, drawn from 80+ OVR players
- **Unlimited** mode with three pools: 84+, 80+ and 75+
- **Hard mode**: search results show names only, with no rating, position, club or flag
- Search by card name, first name or last name, with or without accents
- **Forfeit** to reveal the answer (counts as a loss)
- Shareable emoji result grid, plus win %, streak and best streak saved in the browser
- Light and dark themes, and works on phones

## Player pool

Outfield players (no goalkeepers) from the top flight of the Premier League, LaLiga, Bundesliga, Serie A and Ligue 1, 2,481 players in total. Ratings are frozen at FC 27's launch database (snapshot of 12 September 2026), so in-season upgrades and transfers don't change the game.

## Running locally

It's a static site with no build step. Open `index.html` in a browser, or serve the folder:

```sh
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Project structure

```
index.html            Page markup
css/style.css         Styles and light/dark theme tokens
js/game.js            Game logic: comparison, daily seed, search, saving stats
data/players.js       Player data (generated)
scripts/build_data.py Rebuilds data/players.js from the source CSVs
```

## Rebuilding the data

1. Download `players_raw.csv` from the Kaggle dataset below, and `data/players.csv` from the Footle repo.
2. Put both in `scripts/input/`.
3. Run `python3 scripts/build_data.py`.

The daily puzzle picks a player by their row position, so changing the data changes which player each day uses.

## Credits

- Player ratings: [EA SPORTS FC 27 Player Ratings](https://www.kaggle.com/datasets/mikedpad/ea-sports-fc27-player-ratings) by MikeDPad on Kaggle
- Ages and nation continents: the [Footle](https://github.com/Akif-b-Atif/Football-wordle) project's cleaned dataset

FCdle is a fan-made project and is not affiliated with or endorsed by EA SPORTS. EA SPORTS FC is a trademark of Electronic Arts Inc.
