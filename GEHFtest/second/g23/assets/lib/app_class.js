/*
 * Copyright (c) 2015-2016. Docentron PTY LTD. All rights reserved.
 * This material may not be reproduced, displayed, modified or distributed without
 * the express prior written permission of the copyright holder.
 */

// Customise state classes in this file for your game
// Extend/customise the states defined here

var ga_assets_common = {};
var ga_assets_themes = [];
/**************************************************************************************************************
 **************************************************************************************************************
 * Entry point of the game app
 * This is automatically called when the application is loaded.
 **************************************************************************************************************
 **************************************************************************************************************/
window["ibsgl"] = ibStartGameLevel;  // **DO NOT CHANGE
window["startDCApp"] = function (){ ibStartGameLevel("game_stage_one"); }; // DEVELOPER_CODE **DO NOT CHANGE
function ibStartGameLevel(gameContainer) {
    //-----------------------------------------------
    // DO NOT change these lines
    ga_assets_common = window["game_common_assets"];         // DEVELOPER_CODE **DO NOT CHANGE
    ga_assets_common["imageSprites"]["userIcon"] = [Genari.getUserPhoto()];
    ga_assets_themes = window["game_themes"];                // DEVELOPER_CODE **DO NOT CHANGE
    // load API interface classes and classes extending the interface classes
    Genari.loadClasses(myClassLoader);      //  DEVELOPER_CODE REMOVE_FOR_THEME **DO NOT CHANGE

    //-----------------------------------------------
    // Create the game object. The only game object. This is not a Phaser object.
    // Do not change these lines
    Genari.dcGame = Genari.dcGame || new MazeGame(ga_assets_themes);

    //-----------------------------------------------
    // Configure the game object
    var ga = Genari.dcGame;
    ga.backgroundMusicKey = "music";
    ga.endMusicKey = "end";
    ga.userPhotoKey = 'userIcon';           // User's profile photo is loaded using this key
    ga.userPhotoFrameKey = 'userIconFrame'; // User's profile photo frame image is loaded using this key

    // Load Phaser and preload and create common assets. This calls preload() and create() defined below.
    ga.createPhaser(gameContainer, preload, create, "CANVAS", "ARCADE");

    // Add game states to the game. We need to do this after loading Phaser shown above.
    // We are using 3 game states
    ga.stateMainMenu = new PStateMenu(ga, "menu");  // This is activated in create() to show the splash screen. And then activate PStatePlay to start the game.
    ga.stateError = new PStateError(ga, "error");  // this is not used at the moment
    ga.statePlay = new PStatePlay(ga, "play");  // this is used show the stage and control characters (game levels)

    //---------------------------------------------
    // Download common assets from server. This preload is called only once when the page is loaded.
    // Therefore, add here all necessary common setups you need to do for the game.
    // Avoid adding things in DCPlayState.preload/create() that can be put here and done once.
    // TODO: customise preload and create for your game
    function preload(){
        ga.rescaleGame();

        ga.showLoading('Loading, please wait...');

        // To avoid memory leak, if an asset is no longer needed, must unload by clearing the cache
        // ** if a file (asset) is already loaded, Phaser will not load again.
        // ** Mobile phone browsers have 5M memory limitations

        // preload image and sprite assets
        Genari.loadImageSpriteAssets(ga_assets_common["imageSprites"]);

        // preload common audio
        Genari.loadAudioAssets(ga_assets_common["audio"]);
    }

    // Add some assets to the game stage, which then can be shown and played
    function create(){
        //-----------------------------------------------------------
        // Prepare input keys commonly used
        // Add UP/DOWN/LEFT/RIGHT keys
        ga.cursorKeys = Genari.createCursorKeys();  // UP/DOWN/LEFT/RIGHT keys on PC

        // Add enter key. This is used to dismiss dialog boxes using Enter key
        ga.enterKey = ga.enterKey || Genari.addKey("ENTER"); //ga.phaserGame["input"]["keyboard"]["addKey"](Phaser["Keyboard"]["ENTER"]);

        // We can add additional keys if needed like this
        //ga.spaceBarKey = this.spaceBarKey || Genari.addKey("SPACEBAR");

        // add more pointers for multi touch. 2 is Default
        //ga.phaserGame["input"]["addPointer"]();  // 3
        //ga.phaserGame["input"]["addPointer"]();  // 4

        ga.addAudioFromList(ga_assets_common["audio"]);

        // Shouldn't this be moved out?
        ga.stateMainMenu.start(); // this will call gaStateMenuState.preload() and create()

        // Load game score
            // Hide loading message
            ga.hideLoading();
    }
}

/**************************************************************
 * Controls class for running games.
 * Manage all keyboard controls and on-screen button or joystick controls
 * Modify or extend this for your own game.
 * @param {MazeGame} theGameObj The only game object
 * @param {Genari.MazePlayer} player The player character that user controls
 *
 * @constructor
 * @extends {Genari.Control}
 **************************************************************/
var DCMazeControl = function(theGameObj, player){
    if( !(this instanceof DCMazeControl)){
        return new DCMazeControl(theGameObj, player); // Make sure we create the right class
    }

    // Call superclass constructor, which will add its attributes and configure them.
    Genari.Control.call(this, theGameObj, player);   // must call the parent class.
                                                // Never redefine inherited properties and methods.
                                                // To override methods, must use prototype.
    this.player = player;       // DEVELOPER_CODE REMOVE_FOR_THEME **DO NOT CHANGE

    // Constants
    this.BUTTON_EDGE_MARGIN = 10;

    this.createControls();
};
DCMazeControl.prototype = Object.create(Genari.Control.prototype); // extend DCControl
DCMazeControl.prototype.constructor = DCMazeControl;  // set constructor property

/**
 * Create on-screen button controls for the run game
 * @public
 **/
DCMazeControl.prototype.createControls = function() {
    // Prevent event propagation of certain keys. Certain keys can interfere with browser.
    Genari.phaserAddKeyCapture("SPACEBAR");

    // Destroy any existing buttons
    this.destroyControlButtons();

    // Now add click event handlers for the buttons.
    // Due to bug in Phaser, we must call this whenever we resize the window
    this.createButtonHitArea();

    //--------------------------
    // create a joystick if you need one
    // see this.update on how to use the joystick state to control the game
    Genari.createJoyStick(
        0.5, // alpha
        22,  // offset
        30,  // x
        Genari.dcGame.gc_ground_height + 30,  // y
        'joystick_base', 'joystick_stick');
};
/**
 * Update button control states. Call this from play-state.update()
 */
DCMazeControl.prototype.update = function() {
    //---------------------------
    // Update joystick and get its direction
    var jtstate = Genari.updateJoyStick();
    this.joyStickLeftRight = jtstate[0];  // + if right, - if left
    this.joyStickUpDown = jtstate[1];     // + if up, - if down
};

/***********************************************************************************
 * The game class. There should be only one Game object. * This is not Phaser.Game object.
 * Use this to implement your game by modifying this or extending it
 * Avoid overriding methods unless necessary.
 * See annotation doc: https://developers.google.com/closure/compiler/docs/js-for-compiler#tags
 *
 * @constructor
 * @extends {Genari.Game}
 ***********************************************************************************/
var MazeGame = function(game_themes){
    if( !(this instanceof MazeGame)) return new MazeGame();
    Genari.Game.call(this, game_themes, 800, 432); // call the parent constructor

    this.gc_life_icon_x = 90;
    this.gc_life_text_x = 127;

    this.gc_ground_height = this.gc_game_height/1.4516; //310; // gaHeight
    this.gc_player_fall_line = this.gc_ground_height + (this.gc_game_height - this.gc_ground_height)/2; //380; // if player hit this line, die

    this.gc_score_text_x = this.gc_game_width - 60;
    this.gc_score_icon_x = this.gc_score_text_x - 35;

    this.enemyVelocity = 40; // determine the speed of the monsters

    // Create groups for interactive display objects for the game to manage collisions
    this.groupPlatform = null;
    this.groupBullets = null;
    this.groupCorrectBox = null;
    this.groupIncorrectBox = null;

    /** @type {Genari.Hud} */
    this.hud = null;

};
MazeGame.prototype = Object.create(Genari.Game.prototype); // extend DBGame
MazeGame.prototype.constructor = MazeGame;  // set constructor property

MazeGame.prototype.updateScore = function (score){
    this.levelScore += score;
    this.scoreBox.gainScore(score);
};

MazeGame.prototype.setupInvader = function (bomb){
    //Creating the animation of explosion when words is touched or shot.
    bomb["anchor"]["x"] = 0.5;
    bomb["anchor"]["y"] = 0.5;
    bomb["animations"]["add"]('explode');
};

/**
 * Overriding the superclass method createPhaser
 * @override
 **/
MazeGame.prototype.createPhaser = function(gameContainer, preloadFn, createFn, renderMethod, gamePhysics) {
    // ** Make sure to call the parent
    Genari.Game.prototype.createPhaser.call(this, gameContainer, preloadFn, createFn, renderMethod, gamePhysics);

    // Your own stuff here
};

/**
 * Overriding the superclass method restartLevel
 * @override
 * */
MazeGame.prototype.restartLevel = function(){
    // custom settings
    this.player.remainingLife = 3;

    // ** Make sure to call the parent
    Genari.Game.prototype.restartLevel.call(this);
};

// Return true if reached end of the game
MazeGame.prototype.checkReachedEnd = function (){
    return (!this.groupCorrectBox.getGroup() || this.groupCorrectBox.getGroup()["total"] == 0);
};

// This is how to check the end of the game level for run games
MazeGame.prototype.checkLevelEnd = function (){
    if( this.checkReachedEnd() ) {
        this.enemyVelocity += 5;
        // completed the game. Save game and Go to next level
        // TODO: initialize these two before saving
        this.correctWordsCollected = [];
        this.incorrectWordsDestroyed = [];
        this.saveAndStartNextLevel(false);
    }
};

/**
 * When the pause button is pressed, we pause the game by disabling components when paused.
 * @override
 */
/*
MazeGame.prototype.pauseGame = function () {
    if(!this.statePlay.isPlaying) return; // game level is not playing yet

    this.player.pause();
    this.audioAssets[this.backgroundMusicKey]["pause"]();

    this.gameControl.hideOnScreenButtons();

    // if you need to recreate the dialog box to appear on the top, uncomment this
    this.createDialogBox();
    this.setGameDialogBoxContentAndShow("Game Paused", "", -1, 0, "Click or press Enter to resume");

    // buttons
    var bx = (this.gameDialogBox["width"] / 2);
    var by = (this.gameDialogBox["height"] / 3 + 10);

    this.addButtonToDialogBox(bx, by, "exit", -115, this.startNew, this);
    this.addButtonToDialogBox(bx, by, "restart", 0, this.restartLevel, this);
    this.addButtonToDialogBox(bx, by, "resume", 118, this.continueGame, this);
    this.addOnceDialogAction(this.continueGame, this, false);
};
MazeGame.prototype["_pg"] = MazeGame.prototype.pauseGame;
*/

// http://phaser.io/docs/2.4.4/Phaser.State.html
// Phaser state. Must use "name" format for these
//   create, initload, Render, loadUpdate, paused, pauseUpdate, preload,
//   preRender, render, resize, resumed, shutdown, update

// Public methods called by Phaser:
//  init is the very first function called when your State starts up. It's called before preload,
//   It's called before preload, create or anything else.
//   If you need to route the game away to another State you could do so here, or
//     if you need to prepare a set of variables or objects before the preloading starts.
//  preload is called first. Normally you'd use this to load your game assets (or those needed for the current State)
//    ** You shouldn't create any objects in this method that require assets that you're also loading in this method,
//       as they won't yet be available.
//  create is called once preload has completed, this includes the loading of any assets from the Loader.
//  preRender method is called after all Game Objects have been updated, but before any rendering takes place.
//  resumed. This method will be called when the core game loop resumes from a paused state.
//  shutdown: This method will be called when the State is shutdown (i.e. you switch to another state from this one).
//  resize: If your game is set to Scalemode RESIZE then each time the browser resizes it will call this function, passing in the new width and height.
//  update: The update method is left empty for your own use.
//    It is called during the core game loop AFTER debug, physics, plugins and the Stage have had their preUpdate methods called.

/**************************************************************
 * Phaser state class for displaying error messages.
 *
 * @constructor
 * @extends {Genari.GameState}
 **************************************************************/
var PStateError = function(theGameObj, key) {
    if (!(this instanceof PStateError)) return new PStateError();
    Genari.GameState.call(this, theGameObj, key); // call parent constructor

    this["preload"] = function() {
    };

    this["create"] = function() {
        var ga = this.dcGame;

        ga.setToBaseScaleMode();

        var error = Genari.phaserAddText(0,0, "Sorry, network error. Please check network connection", {fill:"#ffffff"});
        error["x"] = Genari.calcBoxCenterX(ga.phaserGame["camera"], error);
        error["y"] = Genari.calcBoxCenterY(ga.phaserGame["camera"], error) - 40;
        var bt = Genari.phaserAddButton(0,0,'retry',
            function(){
                var ga = this.dcGame;
                ga.startGame();  //ibGetCurrentGameLevel(ga.startGameLevel.bind(ga));
            }.bind(this),
            ga, 0, 1, 2, 1
        );
        bt["x"] = Genari.calcBoxCenterX(ga.phaserGame["camera"], bt);
        bt["y"] = Genari.calcBoxCenterY(ga.phaserGame["camera"], bt) + 40;

        ga.setToScaledMode();
    }.bind(this);
};
PStateError.prototype = Object.create(Genari.GameState.prototype); // extend DBGame
PStateError.prototype.constructor = PStateError;  // set constructor property

/****************************************************************
 * Phaser state class, display splash screen. This is the main Menu
 *
 * @constructor
 * @extends {Genari.GameState}
 ***************************************************************/
var PStateMenu = function(theGameObj, key){
    if( !(this instanceof PStateMenu)) return new PStateMenu();
    Genari.GameState.call(this, theGameObj, key); // call parent constructor

    this.menuAudio = null;

    // override
    this["preload"] = function() {
        // load here any theme specific assets
    }.bind(this);

    // override
    this["create"] = function() {
        // Add here custom initialization for starting a new game.

        // Create theme specific objects for menu state

        var ga = this.dcGame; //GApp.cgame;

        // scale to original scale. ** Must do this
        this.dcGame.setToBaseScaleMode();

        ga.removeGameDialogBox();

        ga.totalGameScore = 0;
        this.menuAudio = Genari.phaserAddAudio('menu');
        this.menuAudio["play"]();
        var screen = Genari.phaserAddSprite(0,0, 'banner');
        screen["fixedToCamera"] = true;

        // click and Enter will load the game data from the server and start the game (play state)
        ga.addOnceDialogAction(
            function (){
                //console.info("gaSateMenuState.start PStateMenu", this);
                var ga = this.dcGame;
                ga.isLevelCleared = false;
                this.menuAudio["stop"]();
                ga.removeGameDialogBox();
                // Load the game level data from server and start the game level
                ga.startGame(); //ibGetCurrentGameLevel(ga.startGameLevel.bind(ga));
            }.bind(this),
            this
        );

        // Scale to fit the window. ** Must do this
        this.dcGame.setToScaledMode();
    }.bind(this);
};
PStateMenu.prototype = Object.create(Genari.GameState.prototype); // extend DBGame
PStateMenu.prototype.constructor = PStateMenu;  // set constructor property

/**************************************************************
 * Phaser state class, Play state
 * You can extend this class to customise your Play state
 * @param {MazeGame} theGameObj the only game object
 * @param {string} key name of the state E.g., "play"
 *
 * @constructor
 * @extends {Genari.GameState}
 **************************************************************/
var PStatePlay = function(theGameObj, key){
    if( !(this instanceof PStatePlay)) return new PStatePlay(theGameObj, key);
    Genari.GameState.call(this, theGameObj, key); // call parent constructor

    this.dcGame = theGameObj;     // reassign to show info on PHPStorm  DEVELOPER_CODE REMOVE_FOR_THEME **DO NOT CHANGE
    // Game states
    this.isPlaying = false;       // used to prevent update being processed during state transition
    this.isLevelCleared = false;  // is repeating the game?

    // Game assets
    this.explosions = null;       // explosion objects
    this.pauseMenuButtons = [];    // pause menu buttons

    /** @type {Genari.MazePlayer} */
    this.player = null;

    var ga = this.dcGame; // GApp.cgame;
    this.backgroundWidth = 2200;         // the width of the world

    this["preload"] = function() {
        // Load here any theme specific assets
        ga.showLoading("Loading, please wait...");
        // TODO: destroy previous assets/objects loaded

        //console.info("gaStatePlayState.preload"); //, JSON.stringify(ga.levelData));
        if(Genari.getThemeNo() >= 0){
            this.loadThemeAssets();
        }else{
            //console.info("no game data. go to menu state");
            ga.stateMainMenu.start();
        }
    }.bind(this);

    /**
     * Function called by for the state during create stage
     * Add here any level specific initialization code
     * Create theme specific objects for play state
     * @type {function}
     */
    this["create"] = function() {
        // TODO: destroy previous assets/objects loaded if any.

        this.prepareLayersGroups();

        // Add display objects to the appropriate layers like this when you create them
        // ga.dialogBoxLayer["add"](displayObject);

        // ** Must set scale to the orginal game scale
        ga.setToBaseScaleMode();

        ga.addThemeAudio();

        this.createWorld();

        this.player = new Genari.MazePlayer(ga, 3, 32, ga.gc_game_height/3);
                                      // the game, [maxLife, entryX, entryY]
        this.createHud();

        // place coins
        ga.groupPickups.createObjects();

        // create monsters
        ga.groupIncorrectBox.createObjects(true);
        ga.groupCorrectBox.createObjects(false);

        // create control keys and onscreen control buttons
        ga.gameControl = new DCMazeControl(theGameObj, this.player); // game, player, bullet obj, bullet sound key
        ga.gameControl.hideOnScreenButtons();

        this.showLevelOpeningDialogBox();

        // scale to fit the window
        ga.setToScaledMode();

        // completed loading the game
        this.isPlaying = true;  // we are now playing the level, Enable update
        ga.hideLoading();
    }.bind(this);

    this["update"] = function() {
        if(!this.isPlaying) return; // game level over

        // must call this
        this.stateCheck();

        this.player.update();

        ga.groupIncorrectBox.update();

        ga.groupCorrectBox.update();

        ga.gameControl.update();  // ** place this after collision checks

        // check if game level ended. If ended, save the game and start a new level
        ga.checkLevelEnd();
    }.bind(this);
};
PStatePlay.prototype = Object.create(Genari.GameState.prototype); // extend DBGame
PStatePlay.prototype.constructor = PStatePlay;  // set constructor property

// Define here PStatePlay methods.
//  ** DO NOT include methods in gaStatePlay. No need to use ["key"] format
PStatePlay.prototype.loadThemeAssets = function(){
    var theme = Genari.getTheme();

    // Load tileMap assets before use
    Genari.loadThemeTileMaps();

    Genari.loadThemeImageSpriteAssets(); // load all images and sprites including tile set images here

    Genari.loadAudioAssets(theme["audio"]);
};

PStatePlay.prototype.prepareLayersGroups = function(){
    var ga = this.dcGame;

    // Layer to control rendering order. You can add your own layers to control z-order.
    if(ga.layerBottom) ga.layerBottom["destroy"](true);
    if(ga.layerPlayer) ga.layerPlayer["destroy"](true);
    if(ga.layerEffects) ga.layerEffects["destroy"](true);
    if(ga.layerButtons) ga.layerButtons["destroy"](true);
    if(ga.layerDialog) ga.layerDialog["destroy"](true);
    // layers are ordered based on the order they are created
    ga.layerBottom = ga.phaserGame["add"]["group"]();    // Use this as the bottom layer, Always show at the button. Holds background, platforms
    ga.layerPickups = ga.phaserGame["add"]["group"]();   // holds player interactive items.
    ga.layerPlayer = ga.phaserGame["add"]["group"]();    // holds player.
    ga.layerMonsters = ga.phaserGame["add"]["group"]();  // holds monsters.
    ga.layerEffects = ga.phaserGame["add"]["group"]();   // holds explosions, bullets, effects
    ga.layerButtons = ga.phaserGame["add"]["group"]();   // holds control buttons, frames, windows, HUD items
    ga.layerDialog = ga.phaserGame["add"]["group"]();    // Always show at the top. Holds dialog boxes. Top layer

    Genari.Effect.setEffectLayer(ga.layerEffects);    // force all effects to be drawn on ga.layerEffects

    if(ga.groupPlatform) ga.groupPlatform.destroy();
    if(ga.groupCorrectBox) ga.groupCorrectBox.destroy();
    if(ga.groupIncorrectBox) ga.groupIncorrectBox.destroy();
    ga.groupPlatform = new Genari.PlatformGroup(ga.layerBottom);     // put all collidable platform items, such as buildings
    ga.groupPickups = new Genari.CoinsGroup(ga.layerPickups);     // put all collidable platform items, such as buildings
    ga.groupCorrectBox = new Genari.MonsterGroup(ga.layerMonsters);    // add correct word boxes here
    ga.groupIncorrectBox = new Genari.MonsterGroup(ga.layerMonsters);  // add incorrect word boxes here

    //Creating groups for the word boxes and bullets to be placed in.
    //ga.phaserAddGroup("coins", true);

    Genari.Effect.setEffectLayer(ga.layerEffects);    // force all effects to be drawn on ga.layerEffects
};

// Place game assets as display object in the stage
PStatePlay.prototype.createWorld = function(){
    var ga = this.dcGame;

    // Check if background asset is given
    var theme = Genari.getTheme();
    if(typeof theme["imagesSprites"]["background"] !== "undefined"){
        if(this.background) this.background["destroy"]();
        this.background = ga.phaserGame["add"]["image"](0, 0, 'background');
        ga.layerBottom["add"](this.background);
    }

    //---------------------------------------------------------
    // Place the loaded tilemap and tileset images to show
    this.addThemeTileMaps(16,16);

    // load the background layer and show. For this, game we are using image for the background.
    // uncomment if you want to show the background layer
    this.loadTileMapBackgroundLayer(ga.layerBottom);

    // Now load "collisionLayer" that you created in the tilemap
    // This set the rendering layer of the tilemap and turn on collisions for the tiles placed in the layer
    this.loadTileMapCollisionLayer(ga.layerBottom);
};

PStatePlay.prototype.createHud = function (){
    var ga = this.dcGame;

    ga.hud = Genari.add.hud(ga.layerButtons);

    ga.hud.addTopBar(0, 0, 'hud', null, 70); // 4x16 = 80

    //Create the pause button so that player can pause the game.
    ga.hud.addPauseButton(ga.BUTTON_EDGE_MARGIN+1, ga.BUTTON_EDGE_MARGIN+1, 'pauseButton', 44, ga.pauseGame.bind(ga), ga);

    ga.hud.addUserPhoto(
        ga.gc_game_width - 160, ga.BUTTON_EDGE_MARGIN+3,
        ga.userPhotoKey, ga.userPhotoFrameKey, 39
    );

    //Create the elements of the status bar on the top.
    //                                key, size, endX, y, layer
    ga.scoreBox = Genari.add.scoreBox('scoreSprite', 30, ga.gc_game_width - 45, 18, ga.layerButtons);

    // Create Level text
    ga.hud.addLevelText(
        ga.gc_game_width, 10,
        'Level '+ (ga.currentGameLevel + 1),
        { "fontSize": '18px', "fill": "#000000" }
    );

    // Create Game objective text
    ga.hud.addGameObjectiveText(
        ga.gc_game_width, 31,
        Genari.getQuestion(),
        { "fontSize": '14px', "fill": "#000000" }
    );

    ga.hud.addLifeIcon(ga.gc_life_icon_x-30, ga.BUTTON_EDGE_MARGIN+1, 'lifeIcon');

    ga.lifeText = ga.hud.addLifeText(
        ga.gc_life_text_x-30, ga.BUTTON_EDGE_MARGIN+3,
        this.player.remainingLife, { fontSize: '32px', fill: '#0000ff' }
    );
};

/*
PStatePlay.prototype.addOpeningText = function(text, fontSize, offsetY, wordWrapWidth, y) {
    var ga = Genari.dcGame;

    var display = Genari.phaserAddText(0, 0, text,
        (wordWrapWidth === undefined) ? {"font":fontSize + 'px Arial', "fill":'#000000'} :
        {"font":fontSize + 'px Arial', "fill":'#000000', "wordWrap": true, "wordWrapWidth": wordWrapWidth}
    );
    display["x"] = Genari.calcBoxCenterX(ga.gameDialogBox, display);
    display["y"] = (y != undefined) ? y : Genari.calcBoxCenterY(ga.gameDialogBox,display) + offsetY;
    display["fixedToCamera"] = true;

    ga.gameDialogBox["addChild"](display);
};*/

PStatePlay.prototype.dialogAction = function() {
    var ga = this.dcGame;
    //ga.audioAssets["earn"]["stop"]();
    ga.removeGameDialogBox();
    ga.gameControl.showOnScreenButtons();
    this.player.resume();
    ga.audioAssets[ga.backgroundMusicKey]["play"]();

    [ga.groupCorrectBox, ga.groupIncorrectBox].forEach(function(group) {
        if(group.getGroup()){
            group.getGroup()["children"].forEach(function(item) {
                item["body"]["velocity"]["y"] = -ga.enemyVelocity;
                item["body"]["bounce"]["setTo"](1, 1);
            });
        }
    });
};

PStatePlay.prototype.showLevelOpeningDialogBox = function(){
    var ga = this.dcGame;

    //------------------------------------------
    // Level opening
    //console.info("Showing level opening");

    ga.audioAssets["earn"]["play"]();
    ga.audioPlay(Genari.getQuestionSoundKey());

    // Create game dialog box and Show level opening dialog box
    ga.addGameDialogBox('dialog');

    if(this.isLevelCleared) this.dialogAction();
    else { // show dialog only for the first attempt
        this.player.pause();
        //this.addOpeningText("Level " + (ga.currentGameLevel+1), 50, -100);
        //this.addOpeningText(Genari.getQuestion(), 24, 10, ga.gameDialogBox["width"]-50);
        //this.addOpeningText("Click or Press ENTER to start", 24, undefined, undefined, ga.gameDialogBox["height"]-50);
        ga.setGameDialogBoxContentAndShow(
            "Level " + (ga.currentGameLevel+1),
            Genari.getQuestion(),
            -1, 0,
            "Click or Press ENTER to start",
            {"font": '28px  Georgia', "fill": "#000000"},
            {"font": '20px Georgia', "fill": "#000000", "wordWrap": true, "wordWrapWidth": ga.gameDialogBox.width-50},
            null,
            null,
            {font:'20px Arial', "fill": "#000000"}
        );

        ga.gameDialogBox["inputEnabled"] = true;

        // click or Enter to start the game
        ga.addOnceDialogAction(this.dialogAction, this);
    }
};

// Load classes that extends classes defined in Genari.loadClasses
var myClassLoader = function(){   // DEVELOPER_CODE REMOVE_FOR_THEME **DO NOT CHANGE

    /***********************************************************************************
     * The player object of the game.
     *
     * @param theGameObj The game object where the player object is placed to.
     * @param maxLife The maximum number of life that the player has throughout the game.
     * @param entryX The initial horizontal point of the player.
     * @param entryY The initial vertical point of the player.
     * @param jumpSoundKey The sound key used for jumping.
     * @constructor
     * @extends {Genari.RunPlayer}
     ***********************************************************************************/
    Genari.MazePlayer = function(theGameObj, maxLife, entryX, entryY, jumpSoundKey) {
        if( !(this instanceof Genari.MazePlayer)) return new Genari.MazePlayer(theGameObj, maxLife, entryX, entryY, jumpSoundKey);
        Genari.RunPlayer.call(this, theGameObj, maxLife, entryX, entryY);

        this.remainingLife = 3;
        // create a player using an asset, which must be loaded already
        this.createPlayerAnimation("playerSprite", -1, null,
            [9,10,11,10], [3,4,5,4], 4, true, [0,1,2,1], [6,7,8,7], true);

    };
    Genari.MazePlayer.prototype = Object.create(Genari.RunPlayer.prototype);
    Genari.MazePlayer.prototype.constructor = Genari.MazePlayer;

    Genari.MazePlayer.prototype.update = function(){
        var ga = this.dcGame;
        var gac = this.dcGame.gameControl;

        //------------------------------------------------------------------
        // Check Player collide with tiles
        ga.phaserGame["physics"]["arcade"]["collide"](this.playerSprite, ga.statePlay.tileMapCollisionLayer);

        // Check Player hits the word boxes
        if (this.isBlinking == false) {
            ga.groupCorrectBox.checkOverlap(this.playerSprite, this.collectStar, null, this);
            ga.groupIncorrectBox.checkOverlap(this.playerSprite, this.hitWrong, null, this);
        }

        // check player hits pickup items
        ga.groupPickups.checkOverlap(this.playerSprite, this.collectCoin, null, this);

        //------------------------------------------------------------------
        // Control player
        var isWalking = false;

        // Allow 8 way walking
        if (gac.joyStickUpDown > 0 || gac.checkCursorKeyUpDown()) {
            this.walkUp();
            isWalking = true;
        } else if (gac.joyStickUpDown < 0 || gac.checkCursorKeyDownDown()) {
            this.walkDown();
            isWalking = true;
        }else{
            // set y speed to 0
            this.playerSprite["body"]["velocity"]["y"] = 0;
        }

        if (gac.joyStickLeftRight < 0 || gac.checkCursorKeyLeftDown()) {
            this.walkLeft();
            isWalking = true;
        } else if (gac.joyStickLeftRight > 0 || gac.checkCursorKeyRightDown()) {
            this.walkRight();
            isWalking = true;
        }else{
            // set x speed to 0
            this.playerSprite["body"]["velocity"]["x"] = 0;
        }

        if(!isWalking) {
            this.standStill();
        }
    };

    /**
     * The function triggered when the player overlaps with the wrong object.
     * @param object1 The overlapping object.
     * @param object2 The overlapped object.
     */
    Genari.MazePlayer.prototype.collectStar = function(object1, object2){
        var ga = this.dcGame;

        var objs = ga.groupCorrectBox.getObjInGroup(object1, object2);
        var wordbox = objs[0]; // first object is the object in the group
        //var player = objs[1];

        //When player touches the right words, the word gets exploded and player gains 1 score.
        ga.audioAssets["earn"]["play"]();
        Genari.Effect.bubbleScore(wordbox);
        wordbox["destroy"]();
        ga.updateScore(1);
    };

    /**
     * The function trigerred when the player overlaps with the wrong object.
     * @param object1 The overlapping object.
     * @param object2 The overlapped object.
     */
    Genari.MazePlayer.prototype.hitWrong = function(object1, object2){
        var ga = this.dcGame;

        var objs = ga.groupIncorrectBox.getObjInGroup(object1, object2);
        var wordbox = objs[0];  // first object is the object in the group
        //var player = objs[1];

        //When player touches the wrong words, the player loses 1 life and continues (if there is life) or game over (if no more life).
        ga.audioAssets["wrong"]["play"]();
        wordbox["destroy"]();
        ga.player.killPlayer();
    };

    /**
     * The function triggered when player collides with coin.
     * @param object1 The player object.
     * @param object2 The word box object.
     */
    Genari.MazePlayer.prototype.collectCoin = function(object1, object2){
        var ga = this.dcGame;

        var objs = ga.groupPickups.getObjInGroup(object1, object2);
        var coin = objs[0];  // first object is the object in the group
        //var player = objs[1];

        ga.audioAssets["pickUp"]["play"]();
        Genari.Effect.bubbleScore(coin, 0.1);
        coin["destroy"]();
        ga.updateScore(0.1);
    };

    /**
     * The function which ensures the player stay standing.
     * @override
     */
    Genari.MazePlayer.prototype.standStill = function(){
        this.playerSprite["body"]["velocity"]["x"] = 0;
        this.playerSprite["body"]["velocity"]["y"] = 0;
        this.playerSprite["animations"]["stop"]();
        this.playerSprite["frame"] = 7;
    };

    /**
     * The function triggered when the down button is pressed or joystick moved downwards.
     * @param speed The target speed of the player.
     * @override
     */
    Genari.MazePlayer.prototype.walkDown = function(speed){
        if(typeof speed == "undefined") speed = this.walkSpeed;
        this.playerSprite["body"]["velocity"]["y"] = speed;
        this.playerSprite["animations"]["play"]('down');
    };

    /**
     * The function triggered when the down button is pressed or joystick moved downwards.
     * @param speed The target speed of the player.
     * @override
     */
    Genari.MazePlayer.prototype.walkUp = function(speed) {
        if(typeof speed == "undefined") speed = this.walkSpeed;
        this.playerSprite["body"]["velocity"]["y"] = -speed;
        this.playerSprite["animations"]["play"]('up');
    };

    /**
     * Pause the game and all its animations
     * @override
     */
    Genari.MazePlayer.prototype.pause = function(){
        this.controlSprite(false);
    };

    /**
     * Resume the game and all its animations
     * @override
     */
    Genari.MazePlayer.prototype.resume = function() {
        this.controlSprite(true);
    };

    /**
     * The function which either enable or disable the movement of all sprite.
     * @param enable The boolean which decides whether to enable or disable all movements.
     */
    Genari.MazePlayer.prototype.controlSprite = function(enable) {
        this.playerSprite["body"]["enable"] = enable;

        [Genari.dcGame.groupCorrectBox, Genari.dcGame.groupIncorrectBox].forEach(function(group) {
            if(group.getGroup()){
                group.getGroup()["children"].forEach(function(item) {
                    if(item && item["body"]) item["body"]["enable"] = enable;
                });
            }
        }.bind(this));
    };

    //The restart function called during gameplay for purposes like player falls down.
    Genari.MazePlayer.prototype.killPlayer = function () {
        var ga = this.dcGame;
        this.remainingLife -= 1;
        ga.hud.setLifeValue(this.remainingLife);

        if (this.remainingLife == 0) {
            // ** DO NOT Pause Phaser game. It will stop playing gavme over audio
            ga.gameOver();
        }
        else
            this.blinkFor();
    };

    /************************************************************************************
     * Example of how to extend a class defined in loadClasses()
     *
     * Manage monsters in maze
     * @param {object} layer Phaser.Group. Rendering layer of this group.
     * @param {boolean} [fixedToCamera] If set to true, it move with camera. The location is then camera offsets.
     * @param {boolean} [enableBody] If set to true, any objects added will have physics enables
     * @param {number} [physicsBodyType] Default 0. Phaser.Physics.ARCADE, Phaser.Physics.P2, Phaser.Physics.NINJA
     * @constructor
     * @extends {Genari.NPCMonsterGroup}
     ***********************************************************************************/
    Genari.MonsterGroup = function(layer, fixedToCamera, enableBody, physicsBodyType) {
        if (!(this instanceof Genari.MonsterGroup)) return new Genari.MonsterGroup(layer, fixedToCamera, enableBody, physicsBodyType);  // make sure this refer to a DCGame
        Genari.NPCMonsterGroup.call(this, layer, fixedToCamera, enableBody, physicsBodyType);
    };
    Genari.MonsterGroup.prototype = Object.create(Genari.NPCMonsterGroup.prototype); // extend DCGroup
    Genari.MonsterGroup.prototype.constructor = Genari.MonsterGroup;       // set constructor property

    Genari.MonsterGroup.prototype.createObjects = function(isEnemy) {
        var ga = this.dcGame;

        // Fill the world with invaders
        var statement, i, monster;
        var monsterNo = (6+(ga.currentGameLevel*1.5))/2;  // control the number of monsters

        // Create equal number of monsters
        var maxAttempt = 100, attempts = 0;
        i = 0;

        var spriteType = ['monster1', 'monster2'];

        var velocity = ga.enemyVelocity * (1+ga.currentGameLevel/10);
        // create enemy monsters
        this.setMonsterType(isEnemy);
        this.setDefaultVelocity(velocity);
        this.setDefaultFrameRate(4);
        //Genari.dcGame.groupIncorrectBox.turnOnDebug(); // turn on debug mode to show the route planning of monster
        while(i<monsterNo && attempts < maxAttempt){
            statement = Genari.getRandomStatement();
            if ((isEnemy && statement["score"] < 0) || (!isEnemy && statement["score"] >= 0)){
                monster = this.addMonsterFramedWordBox(
                    380, 250, // monster spawn location
                    statement, statement["score"],
                    spriteType[Math.floor(Math.random()*spriteType.length)], // randomly select a monster sprite
                    "textFrame",  // text box frame image
                    2       // (optional) the initial frame of the monster sprite
                );
                // add monster animations
                ga.groupIncorrectBox.addAnimation(monster); // add default walk animation that will be used for all directions
                //ga.groupIncorrectBox.addWalkUpAnimation(monster, [0,1]); // add walk up animation and specify frames
                //ga.groupIncorrectBox.addWalkDownAnimation(monster, [2,3]); // add walk down animation and specify frames
                //ga.groupIncorrectBox.addWalkLeftAnimation(monster, [4,5]); // add walk left animation and specify frames
                //ga.groupIncorrectBox.addWalkRightAnimation(monster, [6,7]); // add walk right animation and specify frames
                i++;
            }
            attempts++;
        }
    };

    Genari.MonsterGroup.prototype.update = function() {
        // monsters collide with tiles and bounce off
        var ga = this.dcGame;
        if(this.isEnemy)
            this.checkCollision(ga.statePlay.tileMapCollisionLayer);
        else
            this.checkCollision(ga.statePlay.tileMapCollisionLayer, this.collideWithTilemap, null, this);

        this.updateMonsterWalk(ga.player.playerSprite);
    };

    /**
     * The function triggered when object collides with tile.
     * @param object The colliding object.
     */
    Genari.MonsterGroup.prototype.collideWithTilemap = function (object) {

        var ga = this.dcGame;

        var velocity = ga.enemyVelocity;
        velocity *= Math.floor(Math.random()*2) == 1 ? 1 : -1;

        if (object["body"]["velocity"]["x"] == 0) {
            object["body"]["velocity"]["x"] = velocity;
            object["body"]["velocity"]["y"] = 0;
        } else if (object["body"]["velocity"]["y"] == 0) {
            object["body"]["velocity"]["y"] = velocity;
            object["body"]["velocity"]["x"] = 0;
        }
    };

    Genari.MonsterGroup.prototype.distance = function(x1, y1, x2, y2) {
        var dx = x1 - x2;
        var dy = y1 - y2;
        return Math.sqrt(dx * dx + dy * dy);
    };

    /**
     * Control the movements of the monsters in this group at each frame
     * @param playerSprite
     */
    Genari.MonsterGroup.prototype.updateMonsterWalk = function(playerSprite){
        if(!this.getGroup()) return;

        var distanceToPlayer = 0;
        var isEnemy = this.getMonsterType();
        var rx, ry;
        var wd = Genari.phaserGame["world"]["width"];
        var wh = Genari.phaserGame["world"]["height"];
        // Iterate through each monster in this group
        this.getGroup().forEach(function (monster) {
            // Move text box location based on the position of the monster, so players can see the text
            this.updateWordBoxLocation(monster);

            // if at the center box of the maze, try to get out of there!
            if(monster["x"] > wd/2 - 100 && monster["x"] < wd/2 + 100 &&
                monster["y"] > wh/2 && monster["y"] < wh/2 +200){
                rx = wd/2 + Math.random()*100 - 50;  // scatter monsters
                ry = 0; // move to top
                this.quickRoute(monster, playerSprite, 2, rx, ry); // create routes and let them follow the route
            }else{
                // Distance to the player
                distanceToPlayer = this.distance(
                    playerSprite["x"] + (playerSprite["width"] / 2), playerSprite["y"] + (playerSprite["height"] / 2),
                    monster["x"] + (monster["width"]/2), monster["y"] + (monster["height"]/2)
                );

                // Set the movement of the monster based on the distance to the player
                if (distanceToPlayer <= 200) {
                    if(isEnemy)
                        // chase the player
                        this.quickRoute(monster, playerSprite, 2);
                    else{
                        // Run away from the player
                        // Pick a location away from the player, but scatter them
                        var deltaX = monster["x"] - playerSprite["x"];
                        deltaX = deltaX/Math.abs(deltaX)*(Math.random()+1)*200;
                        var deltaY = monster["y"] - playerSprite["y"];
                        deltaY = deltaY/Math.abs(deltaY)*(Math.random()+1)*200;
                        rx = monster["x"] + deltaX;
                        ry = monster["y"] + deltaY;
                        this.quickRoute(monster, playerSprite, 2, rx, ry);
                    }
                }else{
                    // just wonder around to someplace nice. or do you wan them to wonder near the player?
                    rx = Math.random()*Genari.phaserGame["world"]["width"];
                    ry = Math.random()*Genari.phaserGame["world"]["height"];
                    this.quickRoute(monster, playerSprite, 2, rx, ry);
                }
            }
        }.bind(this));
    };


    /************************************************************************************
     * Example of how to extend a class defined in loadClasses()
     *
     * Manage monsters in maze
     * @param {object} layer Phaser.Group. Rendering layer of this group.
     * @param {boolean} [fixedToCamera] If set to true, it move with camera. The location is then camera offsets.
     * @param {boolean} [enableBody] If set to true, any objects added will have physics enables
     * @param {number} [physicsBodyType] Default 0. Phaser.Physics.ARCADE, Phaser.Physics.P2, Phaser.Physics.NINJA
     * @constructor
     * @extends {Genari.PickupGroup}
     ***********************************************************************************/
    Genari.CoinsGroup = function(layer, fixedToCamera, enableBody, physicsBodyType) {
        if (!(this instanceof Genari.CoinsGroup)) return new Genari.CoinsGroup(layer, fixedToCamera, enableBody, physicsBodyType);  // make sure this refer to a DCGame
        Genari.PickupGroup.call(this, layer, fixedToCamera, enableBody, physicsBodyType);
    };
    Genari.CoinsGroup.prototype = Object.create(Genari.PickupGroup.prototype); // extend DCGroup
    Genari.CoinsGroup.prototype.constructor = Genari.CoinsGroup;       // set constructor property

    Genari.CoinsGroup.prototype.createObjects = function() {
        var ga = this.dcGame;

        // prepare the grid before placing pickup items
        var grid = ga.groupPickups.setupGrid(ga.statePlay.tileMapCollisionLayer, 16, 16, 1, 1, 5, 0);

        // Now place pickup items in the grid
        ga.groupPickups.addPickupsOnTileMap("diamond", 0.2, true, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14], true);
        ga.groupPickups.addPickupsOnTileMap("coin", 0.1, false, [4], false);

        // also set the grid for monsters for smart routing
        ga.groupCorrectBox.setGrid(ga.statePlay.tileMapCollisionLayer, 16, 16, grid);
        ga.groupIncorrectBox.setGrid(ga.statePlay.tileMapCollisionLayer, 16, 16, grid);

    };

    Genari.CoinsGroup.prototype.update = function() {

    };
};   // DEVELOPER_CODE REMOVE_FOR_THEME **DO NOT CHANGE

