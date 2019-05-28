# JoA Dices

a CLI and a library for dice rolls in Time of Legends: Joan of Arc

## install

```
npm install -g joa-dice
```

## usage

```
joa-dice <attack dices> [: <defense dices>]
```

where `<attack dices>` and `<defence dices>` are
- `nN` n black combat dices
- `nR` n red combat dices
- `nJ` n yellow combat dices
- `nB` n white combat dices
- `nG` n gigantic combat dices
- `nD` n doom dices

for example:

- `joa-dice 2R` is 2 red dices in attack

- `joa-dice 2R 1J : 2N` is 2 red and 1 yellow dices in attack vs 2 black dices in defence, in that case the CLI is also calculating the net attack score by substracting defence shileds

## notes

this CLI is French language oriented but quite easy to switch to any other language, I might do it if there is a demand.
