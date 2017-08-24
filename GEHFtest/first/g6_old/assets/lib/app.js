// Copyright (c) 2015-2016. Docentron PTY LTD. All rights reserved.
// This material may not be reproduced, displayed, modified or distributed without
// the express prior written permission of the copyright holder.
//
// No part of this file or any derived works can be distributed without written permission from the copyright holder.


// Common assets for all game levels. ** Make sure the asset file sizes are less than 50kb
var game_common_assets = {
    "imageSprites": {
        // Images
        // Basic UI elements. Replace the image files to customise for your game.
        // These keys are used by the API. ** do not change the key names, but you can replace image files
        // asset key: [URL]
        "userIconFrame": ['../assets/gassets/ui/userIconFrame.png'],
        'joystick_base': ['../assets/gassets/joystick/joystick_base.png'],
        'joystick_stick': ['../assets/gassets/joystick/joystick_stick.png'],
        //'topBarImage': ['../assets/gassets/ui/topBarImage.png'],
        //"cardFrame1": ['../assets/gassets/ui/cardFrame1.png'],
        //'timerBarFrame': ['../assets/gassets/ui/timerBarFrame.png'],
        //'timerBar': ['../assets/gassets/ui/timerBar.png'],
        //'questionFrame': ['../assets/gassets/ui/questionFrame.png'],
        //'questionBar': ['../assets/gassets/ui/questionBar.png'],
        //'blueBackground': ['../assets/gassets/ui/blueBackground.png'],
        //'squareFrame1': ['../assets/gassets/ui/squareFrame1.png'],
        //'textFrame1': ['../assets/gassets/ui/textFrame1.png'],
        //'miniMap': ['../assets/gassets/ui/miniMap.png'],
        'dialGasGauge': ['../assets/gassets/ui/dialGasGauge.png'],
        'dialNeedle': ['../assets/gassets/ui/dialNeedle.png'],
        'dialKnob': ['../assets/gassets/ui/dialKnob.png'],
        'dialSpeedOmeter': ['../assets/gassets/ui/dialSpeedOmeter.png'],

        // asset key: [URL]
        'dialog': ['gassets/common/dialog.png'],
        'banner': ['gassets/common/banner.png'],
        "hook": ['gassets/common/hook.png'],
        "star": ['gassets/common/star.png'],

        // Sprites
        // asset key name :  [URL to the asset, width, height of each cell]
        'retry': ['gassets/common/retry.png',108,115],
        'pause': ['gassets/common/pause.png', 108, 115],
        'resume': ['gassets/common/resume.png', 108, 115],
        'restart': ['gassets/common/restart.png', 108, 115],
        'exit': ['gassets/common/exit.png', 108, 115],
        'explosion': ['gassets/common/explode.png', 16, 16],
        'jump': ['gassets/common/jump.png', 76, 80],
        'puff': ['gassets/common/puff.png', 32, 32],
        'shoot': ['gassets/common/shoot.png', 76, 80],
        'brake': ['gassets/common/brake.png', 67, 80],
        'gas': ['gassets/common/gas.png', 66, 80],

        // Basic UI and Effect sprites. Change the sprite files to customise for your game.
        // These keys are used by the API. ** do not change the key names, but you can replace image files
        //  key               URL
        'pauseButton': ['../assets/gassets/ui/pauseButtonYellow.png', 108, 115],
        //'rotatingGoldCoin': ['../assets/gassets/effects/rotatingGoldCoin.png', 30, 30],
        'scoreSprite': ['../assets/gassets/ui/scoreBoxNumbers.png', 40, 40]

        // Common tileset image assets are listed here as well
        //"firetile": ["gassets/common/fire.png", 160, 64]
    },
    "audio":{
        // assetkey: [URL]
        'menu': ['gassets/common/sound/menu.mp3'],
        "end": ['gassets/common/sound/end.mp3'],   // music that will be played at the and of the game
        'wrongHit': ['gassets/common/sound/wrong.mp3'],
        'engine': ['gassets/common/sound/engine.mp3'],
        'gas': ['gassets/common/sound/gas.wav'],
        'brake': ['gassets/common/sound/brake.wav'],
        'earn': ['gassets/common/sound/get.mp3']
    }
};

// Edit theme as you like
var theme0 = {
        "ropeColour": "#ff0000",
        "anchorY": "0.5",  // the y offset of the player sprite. Range [0,1] Increase this to raise the sprite over the platform.
        "imagesSprites": {
            // Images
            // assetkey: [URL]
            "carPlayer": ["gassets/world1/truck.png"],
            "background": ["gassets/world1/hills.png"],
            "wordBox": ["gassets/world1/box.png"],

            //"sbox": ["gassets/world1/sbox.png"],
            "lifeIcon": ["gassets/world1/icon.png"],

            // Tileset images
            // tileset image asset key (tileset name): [URL]
            "platformTiles": ["gassets/world1/platform.png"],
            "tubeTiles": ["gassets/world1/tube.png"]
            // source created by self
            // license free to use
        },
        "audio":{
            "music": ["gassets/world1/hills.mp3","gassets/world1/hills.ogg"]
        },
        // Tile Map files
        "tileMaps":{
            // tile map asset key: [URL, [ list of tileset image asset keys for this tilemap]]
            "worldTileMap":["gassets/world1/platform.json", ["platformTiles","tubeTiles"]]
        },
        // Tile Map files
        "physics":{
            // tile map asset key: [URL, [ list of tile set image asset keys for this tilemap]]
            "sprite_physics": ["gassets/world1/car.json"]
        }
    };
var theme1 = {
        "ropeColour": "#ffffff",
        "anchorY": "0.5",
        "imagesSprites": {
            // Images
            // assetkey: [URL]
            "carPlayer": ["gassets/world2/car.png"],
            // source https://opengameart.org/content/racing-car-game-character
            // license https://creativecommons.org/licenses/by/3.0/

            "background": ["gassets/world2/night.png"],
            // source https://opengameart.org/content/winter-platformer-game-tileset
            // license https://creativecommons.org/publicdomain/zero/1.0/

            "wordBox": ["gassets/world2/crate.png"],
            // source https://opengameart.org
            // license https://creativecommons.org/publicdomain/zero/1.0/

            "lifeIcon": ["gassets/world2/icon.png"],
            // source https://opengameart.org/content/racing-car-game-character
            // license https://creativecommons.org/licenses/by/3.0/

            //"sbox": ["gassets/world1/sbox.png"],

            // Tileset images
            // tileset image asset key (tileset name): [URL]
            "platformTiles": ["gassets/world2/platform.png"],
            // source http://kenney.nl/assets/platformer-pack-industrial
            // license https://creativecommons.org/publicdomain/zero/1.0/

            "tubeTiles": ["gassets/world2/tube.png"]
            // source created by self
            // license free to use
        },
        "audio":{
            "music": ["gassets/world2/winter.mp3","gassets/world2/winter.ogg"]
            // source https://www.playonloop.com/
            // license https://creativecommons.org/licenses/by/3.0/
        },
        // Tile Map files
        "tileMaps":{
            // tile map asset key: [URL, [ list of tile set image asset keys for this tilemap]]
            "worldTileMap":["gassets/world2/platform.json", ["platformTiles","tubeTiles"]]
        },
        // Tile Map files
        "physics":{
            // tile map asset key: [URL, [ list of tile set image asset keys for this tilemap]]
            "sprite_physics": ["gassets/world2/car.json"]
        }
    };

var theme2 = {
        "ropeColour": "#2345ee",
        "anchorY": "0.5",
        "imagesSprites": {
            // Images
            // assetkey: [URL]
            "carPlayer": ["gassets/world3/car.png"],
            // source https://opengameart.org/content/free-off-road-racing-truck
            // license https://opengameart.org/content/oga-by-30-faq
            "background": ["gassets/world3/city.png"],
            // source https://opengameart.org/content/bevouliin-free-game-background-for-game-developers
            // license https://creativecommons.org/publicdomain/zero/1.0/
            "wordBox": ["gassets/world3/box.png"],
            // source https://opengameart.org/content/pixel-wooden-crate
            // license https://creativecommons.org/publicdomain/zero/1.0/
            "lifeIcon": ["gassets/world3/icon.png"],
            // source https://opengameart.org/content/free-off-road-racing-truck
            // license https://opengameart.org/content/oga-by-30-faq

            //"sbox": ["gassets/world1/sbox.png"],

            // Tileset images
            // tileset image asset key (tileset name): [URL]
            "platformTiles": ["gassets/world3/platform.png"],
            // source http://kenney.nl/assets/platformer-art-candy
            // license https://creativecommons.org/publicdomain/zero/1.0/
            "tubeTiles": ["gassets/world3/tube.png"]
            // source created by self
            // license free to use
        },
        "audio":{
            "music": ["gassets/world3/city.mp3","gassets/world3/city.ogg"]
            // source https://www.playonloop.com/
            // license https://creativecommons.org/licenses/by/3.0/
        },
        // Tile Map files
        "tileMaps":{
            // tile map asset key: [URL, [ list of tile set image asset keys for this tilemap]]
            "worldTileMap":["gassets/world3/platform.json", ["platformTiles","tubeTiles"]]
        },
        // Tile Map files
        "physics":{
            // tile map asset key: [URL, [ list of tile set image asset keys for this tilemap]]
            "sprite_physics": ["gassets/world3/car.json"]
        }
    };
var theme3 = {
        "ropeColour": "#eeeeee",
        "anchorY": "0.5",
        "imagesSprites": {
            // Images
            // assetkey: [URL]
            "carPlayer": ["gassets/world4/car.png"],
            // source https://opengameart.org/content/2d-car-sprite-0
            // license https://creativecommons.org/publicdomain/zero/1.0/
            "background": ["gassets/world4/desert.png"],
            // source https://opengameart.org/content/free-desert-platformer-tileset
            // license https://creativecommons.org/publicdomain/zero/1.0/
            "wordBox": ["gassets/world4/cratehole.png"],
            // source https://opengameart.org/content/2d-wooden-box
            // license https://creativecommons.org/publicdomain/zero/1.0/
            "lifeIcon": ["gassets/world4/icon.png"],
            // source https://opengameart.org/content/2d-car-sprite-0
            // license https://creativecommons.org/publicdomain/zero/1.0/

            //"sbox": ["gassets/world1/sbox.png"],

            // Tileset images
            // tileset image asset key (tileset name): [URL]
            "platformTiles": ["gassets/world4/platform.png"],
            // source http://kenney.nl/assets/platformer-art-candy
            // license https://creativecommons.org/publicdomain/zero/1.0/
            "tubeTiles": ["gassets/world4/tube.png"]
            // source created by self
            // license free to use
        },
        "audio":{
            "music": ["gassets/world4/desert.mp3","gassets/world4/desert.ogg"]
            // source https://www.playonloop.com/
            // license https://creativecommons.org/licenses/by/3.0/
        },
        // Tile Map files
        "tileMaps":{
            // tile map asset key: [URL, [ list of tile set image asset keys for this tilemap]]
            "worldTileMap":["gassets/world4/platform.json", ["platformTiles","tubeTiles"]]
        },
        // Tile Map files
        "physics":{
            // tile map asset key: [URL, [ list of tile set image asset keys for this tilemap]]
            "sprite_physics": ["gassets/world4/car.json"]
        }
    };
var game_themes = [
    theme0,
    theme1,
    theme2,
    theme3
];

$(function() {
    //-----------------------------------------------------------
    // Add here anything to init when all scripts are loaded. This is the same as window.onload()

});
