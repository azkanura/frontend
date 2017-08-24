// Copyright (c) 2015-2016. Docentron PTY LTD. All rights reserved.
// This material may not be reproduced, displayed, modified or distributed without
// the express prior written permission of the copyright holder.
//
// No part of this file or any derived works can be distributed without written permission from the copyright holder.

// gN/gassets/world1 contains assets for theme 0, and so on
// gN/common contains common assets for all themes. Put your assets in there


var game_common_assets = {  //** DO NOT CHANGE
    // List all common image and sprite assets you want to load here
    "imageSprites":{
        // images
        // assetKey: [URL]
        "banner": ['gassets/common/banner.jpg'],
        "dialog": ['gassets/common/dialog.png'],
        "retry": ['gassets/common/restart.png'],
        "hud": ['gassets/common/hud.png'],
        "score": ['gassets/common/score.png'],
        "star": ['gassets/common/star.png'],

        // Basic UI elements. Replace the image files to customise for your game.
        // These keys are used by the API. ** do not change the key names, but you can replace image files
        // assetKey      [URL]
        "userIconFrame": ['../assets/gassets/ui/userIconFrame.png'],
        "joystick_base": ['../assets/gassets/joystick/joystick_base.png'],
        "joystick_stick": ['../assets/gassets/joystick/joystick_stick.png'],
        "topBarImage": ['../assets/gassets/ui/topBarImage.png'],
        "cardFrame1": ['../assets/gassets/ui/cardFrame1.png'],
        "timerBarFrame": ['../assets/gassets/ui/timerBarFrame.png'],
        "timerBar": ['../assets/gassets/ui/timerBar.png'],
        "questionFrame": ['../assets/gassets/ui/questionFrame.png'],
        "questionBar": ['../assets/gassets/ui/questionBar.png'],
        "blueBackground": ['../assets/gassets/ui/blueBackground.png'],
        "squareFrame1": ['../assets/gassets/ui/squareFrame1.png'],
        "textFrame1": ['../assets/gassets/ui/textFrame1.png'],
        "miniMap": ['../assets/gassets/ui/miniMap.png'],
        "dialGasGauge": ['../assets/gassets/ui/dialGasGauge.png'],
        "dialNeedle": ['../assets/gassets/ui/dialNeedle.png'],
        "dialKnob": ['../assets/gassets/ui/dialKnob.png'],
        "dialSpeedOmeter": ['../assets/gassets/ui/dialSpeedOmeter.png'],

        // key is index of the asset, we use key to add to stage to show later.
        // key    fileName
        "resume": ['gassets/common/resume.png'],
        "restart": ['gassets/common/restart.png'],
        "exit": ['gassets/common/exit.png'],

        // Sprites: assetKey: [URL, width, hieght of each cell]
        "fire": ['gassets/common/fire.png',64,64],
        "ice": ['gassets/common/ice.png',64,64],
        "coin": ['gassets/common/coin1.png',16,16],
        "diamond": ['gassets/common/coin3.png', 112, 113],

        // Basic UI and Effect sprites. Change the sprite files to customise for your game.
        // These keys are used by the API. ** do not change the key names, but you can replace image files
        //  key               URL
        "rotatingGoldCoin": ['../assets/gassets/effects/rotatingGoldCoin.png', 30, 30],
        "pauseButton": ['../assets/gassets/ui/pauseButtonYellow.png', 108, 115],
        "scoreSprite": ['../assets/gassets/ui/scoreBoxNumbers.png', 40, 40]

        // Common tile set images
        // ** the keys must be the same as the tile set name used in Tiled
        //"tiles": ["gassets/common/ctiles.png"],
    },

    // List all commeon audio assets you want to load here
    "audio": {
        // key is index of the asset, we use key to add to stage to show later.
        // key          fileName
        "menu": ['gassets/common/sound/menu.mp3'],
        "end": ['gassets/common/sound/end.mp3'],
        "wrong": ['gassets/common/sound/wrong.mp3'],
        "get": ['gassets/common/sound/get.mp3'],
        "pickUp": ['gassets/common/sound/pickUp.wav'],
        "earn": ['gassets/common/sound/get.mp3']
    }
};

// Edit theme as you like
var theme0 = {
    "imagesSprites": {
        // sprites: assetkey: [URL, width, height]
        "playerSprite": ["gassets/world1/hero.png", 22, 32],
        "monster1": ["gassets/world1/monster2.png", 32, 32],
        "monster2": ["gassets/world1/monster.png", 32, 32],
        "textFrame": ["gassets/world1/gift.png"],
        "lifeIcon": ["gassets/world1/icon.png"],
        "background":["gassets/world1/background.jpg"],

        // Tile set Images and Sprites.
        // ** the keys must be the same as the tile set name used in Tiled
        "tiles":["gassets/common/ctiles.png"]
    },
    "audio":{
        "music": ["gassets/world1/hills.mp3"]
    },

    // Tile Map files
    "tileMaps": {
        // tile map asset key: [URL, [ list of tile set image asset keys for this tilemap]]
        "worldTileMap": ["gassets/world1/tileMap.json", ["tiles"]]
    }
};
var theme1 = {
    "imagesSprites": {
        // sprites: assetkey: [URL, width, height]
        "playerSprite": ["gassets/world2/hero.png", 22, 32],
        "monster1": ["gassets/world2/monster3.png", 32, 32],
        "monster2": ["gassets/world2/monster4.png", 32, 32],
        "textFrame": ["gassets/world2/light.png"],
        "lifeIcon": ["gassets/world2/icon.png"],
        "background":["gassets/world2/background.jpg"],

        // Tile set Images and Sprites.
        "tiles":["gassets/common/ctiles.png"]
    },
    "audio":{
        "music": ["gassets/world2/nature.mp3"]
    },
    // Tile Map files
    "tileMaps": {
        // tile map asset key: [URL, [ list of tile set image asset keys for this tilemap]]
        "worldTileMap": ["gassets/world2/tileMap.json", ["tiles"]]
    }
};
var theme2 = {
    "imagesSprites": {
        "playerSprite": ["gassets/world3/hero.png",22,29],
        "monster1": ["gassets/world3/monster2.png", 32, 32],
        "monster2": ["gassets/world3/monster5.png", 32, 32],

        "textFrame": ["gassets/world3/box.png"],
        "lifeIcon": ["gassets/world3/icon.png"],
        "background": ["gassets/world3/background.jpg"],

        // Tile set Images and Sprites.
        "tiles": ["gassets/common/ctiles.png"]
    },
    "audio":{
        "music":["gassets/world3/wetlands.mp3"]
    },
    // Tile Map files
    "tileMaps": {
        // tile map asset key: [URL, [ list of tile set image asset keys for this tilemap]]
        "worldTileMap": ["gassets/world3/tileMap.json", ["tiles"]]
    }
};
var theme3 = {
    "color":"#000000",
    "imagesSprites": {
        "playerSprite": ["gassets/world4/hero.png", 24, 29],
        "monster1": ["gassets/world4/monster.png", 32, 32],
        "monster2": ["gassets/world4/monster4.png", 32, 32],

        "textFrame": ["gassets/world4/light.png"],
        "lifeIcon": ["gassets/world4/icon.png"],
        "background": ["gassets/world4/background.jpg"],

        // Tile set Images and Sprites.
        "tiles": ["gassets/common/ctiles.png"]
    },
    "audio": {
        "music":"gassets/world4/rainforest.mp3"
    },
    // Tile Map files
    "tileMaps": {
        // tile map asset key: [URL, [ list of tile set image asset keys for this tilemap]]
        "worldTileMap": ["gassets/world4/tileMap.json", ["tiles"]]
    }
};


// Edit theme as you like
var theme4 = {
    "imagesSprites": {
        // sprites: assetkey: [URL, width, height]
        "playerSprite": ["gassets/world5/hero.png", 22, 32], //http://opengameart.org/content/base-character-spritesheet-16x16
        "monster1": ["gassets/world5/monster2.png", 32, 32], //http://opengameart.org/content/slime-0
        "monster2": ["gassets/world5/monster.png", 32, 32], //http://opengameart.org/content/slime-0
        "textFrame": ["gassets/world5/gift.png"],
        "lifeIcon": ["gassets/world5/icon.png"],
        "background":["gassets/world5/background.jpg"], //http://opengameart.org/content/forest-background-art-2

        // Tile set Images and Sprites.
        // ** the keys must be the same as the tile set name used in Tiled
        "tiles":["gassets/world5/tileset.png"] //http://opengameart.org/content/cobblestone-tileset
    },
    "audio":{
        "music": ["gassets/world5/hills.mp3","gassets/world5/hills.ogg"] //http://opengameart.org/content/wind-music-futuristic-atmospheric
    },

    // Tile Map files
    "tileMaps": {
        // tile map asset key: [URL, [ list of tile set image asset keys for this tilemap]]
        "worldTileMap": ["gassets/world5/tileMap.json", ["tiles"]]
    }
};
var theme5 = {
    "imagesSprites": {
        // sprites: assetkey: [URL, width, height]
        "playerSprite": ["gassets/world6/hero.png", 29, 32], //http://opengameart.org/content/alternate-lpc-character-sprites-george
        "monster1": ["gassets/world6/monster2.png", 32, 32], //http://opengameart.org/content/slime-2-frame-animation-32x32
        "monster2": ["gassets/world6/monster.png", 32, 32], //http://opengameart.org/content/slime-2-frame-animation-32x32
        "textFrame": ["gassets/world6/gift.png"],
        "lifeIcon": ["gassets/world6/icon.png"], //http://opengameart.org/content/alternate-lpc-character-sprites-george
        "background":["gassets/world6/background.jpg"], //http://opengameart.org/content/tiling-background-pack-ground

        // Tile set Images and Sprites.
        "tiles":["gassets/world6/32x32_map_tile.png"] //http://opengameart.org/content/basic-map-32x32-by-silver-iv
    },
    "audio":{
        "music": ["gassets/world6/bgm.mp3","gassets/world6/bgm.ogg"] //http://opengameart.org/content/outdoor-environment-music
    },
    // Tile Map files
    "tileMaps": {
        // tile map asset key: [URL, [ list of tile set image asset keys for this tilemap]]
        "worldTileMap": ["gassets/world6/tileMap.json", ["tiles"]]
    }
};

// List themes here
var game_themes = [  // ** DO NOT CHANGE
    theme0,
    theme1,
    theme2,
    theme3,
    theme4,
    theme5
];
