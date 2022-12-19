# Phaser 3 Mini Games support
Test for Embedding SeparatePhaser.GameInstances as mini-games into Main one
## Pros
* Full Control over each game instance - you don't have to match game configuration with main one
* Clean - save your minigame separate from Main game stuff
* Memory Safe - assets & memory allocated to your instance are disposed and released for garbage collector
## Features:
* Code-splitting & Dynamic importing support with Custom Loader - see MiniGameLoader
* Easy to Use - Simply spawn new mini-game instance as gameobject - see MiniGame
