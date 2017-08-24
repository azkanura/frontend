/*
 * Copyright (c) 2015-2016. Docentron PTY LTD. All rights reserved.
 * This material may not be reproduced, displayed, modified or distributed without
 * the express prior written permission of the copyright holder.
 */
//-----------------------------------------------------------
// !!! DO NOT MODIFY THIS FILE  !!!
//     If you need to change this file, please send the request to the Project manager.
//     If you change this file, it may not compile.
//     Extend or create your own classes in app_class.js and call the functions provided here.
//

// -------------------------------------------------------------------
// Doncetnron Game API Overview
//
//  Genari defines interface functions for Doncentron Game API and Phaser functions that are commonly used.
//     Genari.Effect   // effect functions such as bubbling scores, explosions. See examples in app_class.js
//     Genari.add.
//
//  Genari.Game is the game object representing the current game. We use this to hold global states of the game.
//    This is the overall flow of the game.
//
//    game --> phaserGame
//             stateError
//             stateMenu --> ["create"] --> show splash screen
//             statePlay --> ["create"]
//                                 player
//                                 control
//                                 <create layers>
//                                 <create groups>  ** define your own groups in myClasses in app_class.js
//                                 <create objects using the groups>
//                       --> ["update"]
//                                 call update methods of all groups
//  Layers and groups:
//     See RunningGame defined in app_class.js for running games.
//     The game uses layers to control z-index (rendering orders of display objects).
//          layerBottom    holds background, platforms
//          layerPlaer     holds players, player interactive items
//          layerEffects   holds explosions, bullets, effects
//          layerButtons   holds control buttons, frames, windows, HUD items
//          layerDialog    holds dialog boxes. Top layer
//
//          Initialize these layers in PStatePlay["create"]
//
//     The game also uses groups to manage a group of display objects and manage collision detection
//          groupPlatform
//          groupBullets
//          groupCorrectBox
//          groupIncorrectBox
//
//          ** Create your own group classes in myClasses by extending Genari.Group or subclasses
//
//          Detect collisions and overlaps using the class
//              This detects collision of bullets with correct boxes and call shootRight function if collide
//              Genari.dcGame.groupBullets.checkOverlap(ga.groupCorrectBox, this.shootRight, null, this);
//
//  Roles of classes:
//     Genari.GameState  Use this to control the flow. We normally require at least 2 states: menu and play
//     Genari.Control.   Use this to add control keys, buttons and update their states.
//     Genari.Player.    This is optional. Use this to control the player character. Some games don't have a player.
//                       Genari.RunPlayer is a sub-class of Genari.Player for running games.
//                       We use this for scrolling running games.
//     Genari.Group          Use this to create, update, pause, resume a group of game objects
//     Genari.PlatformGroup  A subclass of Group holding collidable buildings
//     Genari.BulletGroup    A subclass of Group for bullets, containes addBullet, updateBullet which destroy bullets automatically.
//     Genari.PicktupGroup   A subclass of Group for pickup items
//     Genari.WordBoxGroup   A subclass of Group for word box items, which contain statements.
//
//     ** Extend these classes in myClasses in app_class.js for your game.
//     ** See app.js for the illustration of setting up a game environment.
// -----------------------------------------------------------
// Steps to create your game:
// 1. Configure game_common_assets and game_themes in app.js. Define theme specific game assets.
// 2. Go to PStatePlay.create in app_class.js.
//    The game assets listed in game_common_assets and game_themes are automatically loaded by the template by now.
//    We now place game assets for the game level
//     var PStatePlay = function(theGameObj, key){
//         ...
//         this{"create"] = function(){
//             // place the loaded game assets to display
//         };
//         ..
//     }
//
// 3. When the user completes the level (this is checked in PStatePlay.update() using RunningGame.checkLevelEnd()),
//    Genari.Game.saveAndStartNextLevel() is called to save the game and load the next game level.
//
//     These are used to start a new game, save and start next level, restart current level, pause game, and unpause game.
//     You don't need to change these methods. Just call them whenever appropriate.
//             Genari.Game:startNew()              // Start a new game
//             Genari.Game:saveAndStartNextLevel() // Save score and start a next game level
//             RunningGame:restartLevel()     // Restart the current game level. You can customise this for your need
//             RunningGame:pause()        // You can customise this for your need
//             Genari.Game:resume()          // un-pause the game
// -------------------------------------------------------------------
var ga_assets_common = {};
var ga_assets_themes = [];

// Docentron Game API interface functions.
/**
 * Genari Game API Interface
 */
var Genari = {
    dcGame: null,       // the Genari.Game obj created for this game
    phaserGame: null,   // the phaser game created for Genari.Game
    worldTileMap: null, // tileMap for the game. This is set if loaded

    //-----------------------------------------------------------------------------------
    /**
     * Return a random flash card question and its choices.
     * There are a total of 4 questions for the demo.
     *
     * @param {boolean} [resetIdx] Set to true to reset the index: start from the beginning.
     * @return {Array|null}
     *                  [  qNo,
     *                    "question",
     *                    correctChoiceNo, iconUrl, img1Url,
     *                    ["choice1 text", imgUrl],
     *                    ["choice2 text", imgUrl],
     *                    ["choice3 text", imgUrl],
     *                    ["choice4 text", imgUrl]
     *                  ]
     *                 Returns an empty array if there are no more questions. You can set resetIdx to true to start again.
     *                 If there is no image, url = null
     *                 See the returned urls for debugging.
     *                 For testing, replace files_N.png etc with your own images.
     */
    getFlashCardQuestion: function(resetIdx){
        return _gitf049(resetIdx);
    },

    /**
     * Return the max score of the current flash card question
     * @returns {number} max score of the current question
     */
    getFlashCardQuestionScore: function(){
        return _gitf073();
    },

    /**
     * Set to flash-card-game mode. This forces the game to load all questions.
     * Call this for flash card games.
     */
    setToFlashCardGameMode: function(){
        _gitf069();
    },

    setToTestMode: function(){
        _gitf069b();
    },

    /**
     * Return the number of questions for flash card game
     * @returns {number} The total number of questions.
     */
    getNumberOfQuestions: function(){
        return _gitf068();
    },

    /**
     * Return statistics of the statements
     * @returns {Object} {totalShown:TotalNoOfStatements, totalCorrect: NofCorrectStatements, totalIncorrect: noIncorrectStatements}
     */
    getStatementStat: function(){
        return _gitf058();
    },

    /**
     * Randomly generate the words and call the callback function with the word info
     * @param {Function} callBack
     */
    forEachStatement: function(callBack){
        _gitf059(callBack);
    },

    /**
     * Return image urls of all statements
     * Use this to load image assets for the current game level during "create" call of the Phaser state
     * @returns {Array} array of image urls for the current game level.
     */
    getStatementImages: function(){
        return _gitf057();
    },

    /**
     * Return a random statement (word)
     * @deprecated use getRandomAnswer
     * @param {boolean} [reset] Set to true to reset the counter.
     * @returns {Object} {word:wordText, score:Score, [img:urlToImage]}
     */
    getRandomStatement: function(reset){
        return _gitf056(reset);
    },

    /**
     * Return a random statement (word)
     * @param {boolean} [reset] Set to true to reset the counter.
     * @returns {Object} {word:wordText, score:Score, [img:urlToImage]}
     */
    getRandomAnswer: function(reset){
        return _gitf056(reset);
    },

    /**
     * Return l_showhint state for current game level
     * @returns {boolean} l_showhint = True show hint
     */
    isShowHint: function(){
        return _gitf062();
    },

    /**
     * Return the objective of current game level
     * @returns {string} question text. Max 70 characters
     */
    getQuestion: function(){
        return _gitf060();
    },

    /**
     * Return the stroke data for the current character (current level)
     * @returns {Object} {"char": char, "strokes": [[[x,y],...],...], "language": language, }
     */
    getCharStrokeData: function(){
        return _gitf061a();
    },

    /**
     * Return question id of current game level
     * @returns {number} question id
     */
    getQuestionId: function(){
        return _gitf063();
    },

    /**
     * Return sound asset key of the question of the current game level
     * @returns {string|null} sound asset key
     */
    getQuestionSoundKey: function(){
        //console.log(JSON.stringify(qd));
        if((typeof qd !== "undefined") && qd)
            return qd[13];
        else
            return null;
    },

    /**
     * Return image asset key of the question of the current game level
     * @returns {string|null} sound asset key
     */
    getQuestionImageKey: function(){
        //console.log(JSON.stringify(qd));
        if((typeof qd !== "undefined") && qd)
            return qd[12];
        else
            return null;
    },

    /**
     * Return a list of top 10 scores of the game
     * @returns {Array} a list of scores, descending order
     */
    getScoreBoard: function(){
        return _gitf063();
    },

    /**
     * Get phaser game time
     * @returns {number} phaser game time
     */
    getGameTime: function(){
        return _gitf051();
    },

    /**
     * Limit the length of the sentence to 35 or to the length
     * @param {string} sentence
     * @param {number} [maxLength]
     * @returns {string}
     */
    limitSentence: function(sentence, maxLength){
        return _gitf052(sentence, maxLength);
    },

    /**
     * Add event handlers for a phaser keyboard key
     * @param keyName Name of a key E.g., "UP", "ENTER", "SPACEBAR". http://phaser.io/docs/2.4.6/Phaser.KeyCode.html
     * @param [downActionFunction] listener function for key down event
     * @param [upActionFunction]  listener function for key up event
     * @param [listenerContext]
     * @returns {*}
     */
    addKey: function(keyName, downActionFunction, upActionFunction, listenerContext){
        return _gitf053(keyName, downActionFunction, upActionFunction, listenerContext);
    },

    /**
     * Check if a key is down
     * @param {string} key Key name. E.g., "UP", "ENTER", "SPACEBAR". http://phaser.io/docs/2.4.6/Phaser.KeyCode.html
     * @return {boolean} true if down
     *
     **/
    checkKeyDown: function(key){
        return _gitf020(key);
    },

    /**
     * Not used
     * @param array
     * @returns {*}
     */
    shuffleWordList: function (array) {
        return _gitf054(array);
    },

    /**
     * Return path to the game asset folder
     * @param pathToFileInGassets
     * @returns {*}
     */
    gameAssetPath: function(pathToFileInGassets){
        return _gitf055(pathToFileInGassets);
    },

    // return a character for stroke games
    getChar: function(charIdx){
        //console.log(char_strokes, charIdx);
        return char_strokes[charIdx]["character"];
    },

    // return the stroke sequence for a character for stroke games
    getStroke: function(charIdx, strokeIdx){
        return char_strokes[charIdx]["strokes"][strokeIdx];
    },

    // Use this to save the stroke sequence of a character
    saveCharStrokes: function(character, strokes){
        // mockup-do nothing
    },

    /**
     * Show score board when paused
     */
    showScoreBoard: function(){
        _gitf065();
    },

    /**
     * Get user name
     */
    getUserName: function(){
        return _gitf066();
    },

    /**
     * Get URL of user photo
     */
    getUserPhoto: function(){
        if(typeof _gitf067 !== "undefined")
            return _gitf067();
        else
            return "../assets/images/user.png";
    },

    //getAssetUrl: function (assetName){
    //    return _gitf041(assetName);
    //},

    /**
     * Return the theme-no of the current game level
     */
    getThemeNo: function (){
        return _gitf016();
    },

    /**
     * Return the theme data of the current game level. Each level can have different theme
     * @returns {Object} See app.js for a list of themes defined
     */
    getTheme: function(){
        return _gitf070();
    },

    //
    /**
     * Return true if minscore is achieved
     */
    checkMinScore: function (levelScore){
        return _gitf017(levelScore);
    },

    /**
     * Phaser interface functions
     * Prevent event propagation of a keybaord key. E.g., add arrow keys to stop browser scrolling up.
     * @param {string} key Key name. E.g., "ENTER", "SPACEBAR"
     */
    phaserAddKeyCapture: function(key){
        _gitf018(key);
    },

    /**
     * Creates and returns an object containing 4 hotkeys for Up, Down, Left and Right.
     * @return {Object} Creates and returns an object containing 4 hotkeys for Up, Down, Left and Right.
     */
    createCursorKeys: function(){
        return _gitf021();
    },

    /**
     * Create a joystick at the location (x,y).
     * Supports multi-touch. See app_class.js for an example on creating one.
     * @param {number} alpha Transparency.
     * @param {number} stickOffset location of the center of the stick within the circle
     * @param {number} x
     * @param {number} y
     * @param {string} stickBaseSpriteKey Name of the sprite asset loaded.
     * @param {string} StickSpriteKey  Name of the sprite asset loaded
     */
    createJoyStick: function(alpha, stickOffset, x, y, stickBaseSpriteKey, StickSpriteKey){
        return _gitf036(alpha, stickOffset, x, y, stickBaseSpriteKey, StickSpriteKey);
    },

    /**
     * Update joystick state and get its direction info
     * @return {Array} [stickLeftRight, stickUpDown] + for right and up
     */
    updateJoyStick: function(){
        return _gitf037b();
    },

    /**
     * Given a sprite, which was initially placed with the given offset values (E.g., center it to the stage),
     * get scaled center of a sprite from the current location of the sprite.
     * This works for all scales of the game.
     * @param sprite
     * @param xOffset
     * @param yOffset
     * @returns {{x, y}|*}
     */
    getScaledCenter: function(sprite, xOffset, yOffset){
        return _gitf095(sprite, xOffset, yOffset);
    },

    /**
     * Update joystick state and get its direction info
     * @param {Object} monsterSprite Phaser.Sprite
     * @param {boolean|null} updateLocation Default true
     * @param {number} x monster x
     * @param {number} y monster y  Distance of the monster from the screen
     * @param {number} z monster z  Distance of the monster from the ground
     * @param {number} cx Default 400 Camera x location
     * @param {number} cy Default 400 Camera distance from the screen
     * @param {number} cz Default 200 Camera height from the ground.
     * @param {number | null} [minScale] Default 0.2
     * @param {number | null} [maxScale] Default 1
     * @return {Array} [x, y]
     */
    calcProjection: function(monsterSprite, updateLocation, x, y, z, cx, cy, cz, minScale, maxScale){
        return _gitf078(monsterSprite, updateLocation, x, y, z, cx, cy, cz, minScale, maxScale);
    },

    /**
     * Calculate the travelled distance since the last call
     * @param {Object} monsterSprite Phaser.Sprite
     * @param {number} v Pixels per second
     * @param {number} [deltaTime] millisecondss. If given, this is used to calculate
     * @returns {number} Travelled distance
     */
    calcTravelDistance: function(monsterSprite, v, deltaTime){
        return _gitf079(monsterSprite, v, deltaTime);
    },

    /**
     * Add actions for a cursor key. key = up, down, left, right
     *
     * @param {Object} cursorKeys An object created using Genari.Game.createCursorKey()
     * @param {string} key key name: up, down, left, right
     * @param {Function} downAction Function that will be called when the key is down.
     * @param {Function} upAction Function that will be called when the key is up.
     * @param {Object} listenerContext
     */
    addCursorKeyActions: function(cursorKeys, key, downAction, upAction, listenerContext){
        _gitf022(cursorKeys, key, downAction, upAction, listenerContext);
    },

    /**
     * Add a scrolling background image and set the world bound to the world size.
     *
     * @param layer Layer to which you want to add the background to
     * @param key Key of the image asset
     * @param {number|null} [worldWidth] Default screen width
     * @param {number|null} [worldHeight] Default screen height
     * @param {number|null} [x] Default 0 The initial location of the tile sprite
     * @param {number|null} [y] Default 0 The initial location of the tile sprite
     * @param {number|null} [width] Default screen width.  The width of the tile sprite
     * @param {number|null} [height] Default screen height.  The height of the tile sprite
     * @param {number|null} [frame] Default 0. Frame of the sprite to use
     * @return {Object} Phaser.TileSprite
     */
    addBackground: function(layer, key, worldWidth, worldHeight, x, y, width, height, frame){
        return _gitf080(layer, key, worldWidth, worldHeight, x, y, width, height, frame);
    },

    /**
     * Scroll background as the camera move
     * @param {number|null} scale
     * @param {Object|null} [backgroundTileSprite] Phaser.TileSprite Default the last background set using Genari.addBackground()
     */
    scrollBackground: function(scale, backgroundTileSprite){
        _gitf081(scale, backgroundTileSprite);
    },

    /**
     * Import Polygons from a TileMap layer to use as a platform
     * @param layerNameInTileMap
     * @param collideWithThisGroup
     * @returns {Object|null} Phaser.CollisionGroup of the platform p2 bodies. Use this to set collisions for other p2 bodies
     */
    p2ImportPolygonsAsPlatforms: function(layerNameInTileMap, collideWithThisGroup){
        var p2Bodies = Genari.p2ConvertCollisionObjects(layerNameInTileMap);
        var collisionGroup = Genari.p2CreateCollisionGroup();
        return Genari.p2SetCollisionGroup(p2Bodies, collisionGroup, collideWithThisGroup);
    },

    /**
     * Import Polygon from a TileMap layer to use as collision body
     * @param layerNameInTileMap
     * @returns {Array} an array of Phaser.Physics.Body
     */
    p2ConvertCollisionObjects: function(layerNameInTileMap){
        return _gitf082(Genari.dcGame.statePlay.map["worldTileMap"], layerNameInTileMap, true);
    },

    /**
     * Create p2 collision group
     * @returns {Object} Phaser.CollisionGroup
     */
    p2CreateCollisionGroup: function(){
        return _gitf083();
    },

    /**
     * Create a collision group for a p2Bodies and set it to collide with another collision group given.
     * @param {Array} p2Bodies The p2Bodies An array of P2 Bodies
     * @param {Object|null} collisionGroup set the collisiongroup of the p2Bodies with this
     * @param {Object|null} collideWithThisGroup Collide with this
     * @param {Object|null} [callback]
     * @param {Object|null} [callbackContext]
     * @param {Object|null} [shape]
     * @returns {Object} Phaser.CollisionGroup of the p2Bodies
     */
    p2SetCollisionGroup: function(p2Bodies, collisionGroup, collideWithThisGroup, callback, callbackContext, shape){
        return _gitf084(p2Bodies, collisionGroup, collideWithThisGroup, callback, callbackContext, shape);
    },

    /**
     *
     * @param {string} key
     * @param {Object|null} [parentSprite]
     * @param {number|null} [x] Default 0
     * @param {number|null} [y] Default 0
     * @param {number|null} [maxParticles] Default 5
     * @param {number|null} [lifespan] Default 150
     * @param {Array|null} [maxParticleSpeed] [xSpeed, ySpeed]
     * @param {Array|null} [minParticleSpeed] [xSpeed, ySpeed]
     * @returns {*}
     */
    addParticleEmitter: function(key, parentSprite, x, y, maxParticles, lifespan, maxParticleSpeed, minParticleSpeed){
        return _gitf085(key, parentSprite, x, y, maxParticles, lifespan, maxParticleSpeed, minParticleSpeed);
    },

    /**
     * Create a P2 body from a physics asset.
     * Create physics using Physics eidtor: https://www.codeandweb.com/physicseditor
     * @param {Object|null} layer
     * @param {string} key
     * @param {number} x
     * @param {number} y
     * @param {string} physicsAssetKey
     * @param {string} objectName
     * @param {Object} collisionGroup Phaser.CollisionGroup
     * @param {number|null} [mass] Default 80
     * @param {number|null} [bounce] Default 0.5 The elasticity of the Body when colliding. bounce.x/y = 1 means full rebound, bounce.x/y = 0.5 means 50% rebound velocity.
     * @param {Array|null} [friction] Default [10, 1] [xFriction, yFriction]
     */
    createP2BodyFromPhysics: function(layer, key, x, y, physicsAssetKey, objectName, collisionGroup, mass, bounce, friction){
        return _gitf086(layer, key, x, y, physicsAssetKey, objectName, collisionGroup, mass, bounce, friction);
    },

    /**
     * Set the p2Sprite collide with the collision group and call the callback upon collision
     * @param p2Sprite Phaser.Body
     * @param collisionGroup
     * @param [callback]
     * @param [callbackContext]
     * @param [shape]
     */
    setP2BodyCollision: function(p2Sprite, collisionGroup, callback, callbackContext, shape) {
        _gitf087(p2Sprite, collisionGroup, callback, callbackContext, shape);
    },

    phaserWorldWidth: function(){
        return _gitf071();
    },

    /**
     * Phaser function: addText
     * @param x
     * @param y
     * @param text
     * @param style
     * @returns {Object} Phaser text
     */
    phaserAddText: function (x, y, text, style){
        return _gitf025(x, y, text, style);
    },

    /**
     * Wrapper for Phaser.Tilemap.getTile()
     *
     * @param tilemap
     * @param {number} x
     * @param {number} y
     * @param {string|number} layer
     * @returns {Phaser.Tile}
     */
    phaserGetTile: function (tilemap, x, y, layer){
        return tilemap["getTile"](x, y, layer);
    },

    /**
     * Add answer image or text to a sprite or image as a child
     * @param sprite
     * @param answer
     * @param score
     * @param textOffset
     * @param width
     * @param height
     * @param align
     * @param maxFontSize
     * @return {Object} Phaser Text or Image
     */
    addAnswerToSprite: function(sprite, answer, score, textOffset, width, height, align, maxFontSize){
        return _gitf090(sprite, answer, score, textOffset, width, height, align, maxFontSize);
    },

    /**
     * Check if an answer image is given
     * @param {Object} answer an answer object obtained from Genari.getRandomAnswer()
     */
    checkAnswerImageExist: function(answer){
        return _gitf096(answer);
    },

    /**
     * Check if an answer image is given
     * @param {Object} answer an answer object obtained from Genari.getRandomAnswer()
     */
    checkAnswerSoundExist: function(answer){
        return _gitf096b(answer);
    },

    /**
     * Phaser function: add phaser button object to the current stage
     * http://phaser.io/docs/2.4.4/Phaser.Button.html
     * @param x
     * @param y
     * @param key
     * @param callback
     * @param callbackContext
     * @param overFrame
     * @param outFrame
     * @param downFrame
     * @param upFrame
     * @returns {Object} Phaser Button
     */
    phaserAddButton: function (x, y, key, callback, callbackContext, overFrame, outFrame, downFrame, upFrame){
        return _gitf014(x, y, key, callback, callbackContext, overFrame, outFrame, downFrame, upFrame);
    },

    /**
     * Phaser function: Add audio to stage
     * @param key
     * @param volume
     * @param loop
     * @returns {Object} Phaser audio object
     */
    phaserAddAudio: function (key, volume, loop){
        return _gitf026(key, volume, loop);
    },

    /**
     * Phaser function: Add sprite to stage
     *
     * @param x
     * @param y
     * @param key
     * @param frame
     * @param {Object} [layer] Phaser.Group. If porvided, add to the group
     * @returns {Object} Phaser sprite
     */
    phaserAddSprite: function (x, y, key, frame, layer){
        return _gitf027(x, y, key, frame, layer);
    },

    /**
     * Phaser function: Add image to stage
     *
     * @param x
     * @param y
     * @param key
     * @param {Object} [layer] Phaser.Group. If porvided, add to the group
     * @returns {Object} Phaser image
     */
    phaserAddImage: function (x, y, key, layer){
        return _gitf027b(x, y, key, layer);
    },

    /**
     * Rescale the given image or sprite to the given size and center it horizontally
     * @param obj
     * @param width
     * @param height
     */
    rescaleAndCenter: function(obj, width, height){
        _gitf094(obj, width, height);
    },

    /**
     * A TileSprite is a Sprite that has a repeating texture.
     * You shouldn't ever create a TileSprite any larger than your actual screen size.
     * Use the tilePosition property to scroll the texture as the player moves.
     * @param {number} x
     * @param {number} y
     * @param {number} width Must same or less than the screen size
     * @param {number} height Must same or less than the screen size
     * @param {string} key Sprite
     * @param frame Frame of the sprite to use. Default Null
     * @returns {Object} Phaser tile sprite
     */
    phaserAddTileSprite: function (x, y, width, height, key, frame){
        return _gitf028(x, y, width, height, key, frame);
    },

    /**
     * Phaser function: Load sprite sheet
     *
     * @param key
     * @param url
     * @param frameWidth
     * @param frameHeight
     * @param frameMax
     * @param margin
     * @param spacing
     * @returns {Object} Phaser sprite sheet
     */
    phaserLoadSpriteSheet: function (key, url, frameWidth, frameHeight, frameMax, margin, spacing){
        return _gitf029(key, url, frameWidth, frameHeight, frameMax, margin, spacing);
    },

    /**
     * Phaser function: Load image
     *
     * @param key
     * @param url
     * @param overwrite
     * @returns {Object} Phaser image
     */
    phaserLoadImage: function (key, url, overwrite){
        return _gitf030(key, url, overwrite);
    },

    /**
     * Phaser function: Load audio
     *
     * @param key
     * @param urls
     * @param autoDecode
     * @returns {Object} Phaser audio
     */
    phaserLoadAudio: function (key, urls, autoDecode){
        return _gitf031(key, urls, autoDecode);
    },

    calcHalfX: function(obj) { return obj["x"] + obj["width"] / 2; },
    calcHalfY: function(obj) { return obj["y"] + obj["height"] / 2; },

    /**
     * Calculate the x offset from the box left boundary to center obj horizontally in the box
     * @param {Object} box Has width and height properties
     * @param {Object} obj Has width and height properties
     * @returns {number} x offset from the box left boundary to center obj horizontally in the box
     */
    calcBoxCenterX: function (box, obj) {
        return _gitf033(box, obj);
    },

    /**
     * Calculate the y offset from the box top boundary to center obj vertically in the box
     * @param {Object} box Has width and height properties
     * @param {Object} obj Has width and height properties
     * @returns {number} x offset from the box left boundary to center obj horizontally in the box
     */
    // Return the y offset from the box top boundary to center obj vertically in the box
    calcBoxCenterY: function (box, obj) {
        return _gitf034(box, obj);
    },

    /**
     * Calculate the offset from the boundary of the container in order to center the obj
     * @param {number} containerSize in pixels
     * @param {number} objectSize in pixels
     * @returns {number} offset from the boundary of the container
     */
    calcCenter: function (containerSize, objectSize) {
        return (containerSize - objectSize)/2;
    },

    /**
     * Draw a line between two sprites
     * @param sprite1
     * @param sprite2
     * @param line
     * @param x
     * @param y
     * @param lineThickness
     * @param lineColor
     */
    drawLineBetweenSprites: function (sprite1, sprite2, line, x, y, lineThickness, lineColor) {
        _gitf091(sprite1, sprite2, line, x, y, lineThickness, lineColor);
    },

    /**
     * Calculate dX, dY of a line
     * @param graphicLine
     * @returns {Array} [dx, dy]
     */
    calcLineDelta: function (graphicLine) {
        return _gitf092(graphicLine);
    },

    /**
     * @returns {Array} [x, y]
     */
    getActivePointerLocation: function(){
        return _gitf093();
    },

    /**
     * Create legends (numbers) along the edge of a board game board.
     * @param {number} numRows
     * @param {number} numCols
     * @param {number} borderThickness
     * @param {Object} boardBorderImg Phaser.Image
     * @param {Object} fontStyle font style of the legend text
     * @param {Object} tileMapBoardLayer Phaser.Tilemap
     * @param {number} boardTileMap Phaser.TilemapLayer
     * @param {Object} boardRenderingLayer Phaser.Layer
     */
    createBoardLegends: function(
        numRows, numCols,
        borderThickness, boardBorderImg,
        fontStyle,
        boardTileMap, tileMapBoardLayer,
        boardRenderingLayer
    ){
        _gitf098(numRows, numCols, borderThickness, boardBorderImg, fontStyle, boardTileMap, tileMapBoardLayer, boardRenderingLayer);
    },

    /**
     *
     * Check if the location is allowed for the player.
     * If calcFlipList is set, it also calculate list of pads that need to be flipped and change its states (flip).
     * If updateCellState is set to false, the pads will not be flipped.
     *
     * @param {number} col base 0 The column number to base the move on. ** col 0 and the last row are boarder cols
     * @param {number} row base 0 The row number to base the move on. ** row 0 and the last row are boarder rows
     * @param {number} playerId The group of the pad.
     * @param {Array} boardCellStates Default true. Set true to update cell states. Must set calcFlipList
     * @param {boolean} [calcFlipList] True to return a list of pads to flip for the player
     * @param {boolean} [updateCellState] Default true. Set true to update cell states. Must set calcFlipList
     * @returns {Array} [isLegalMove, {"x":positionX, "y":positionY, "player":player},...] col, row: Base 0.
     */
    othelloGameCheckLegalMove: function(col, row, playerId, boardCellStates, calcFlipList, updateCellState){
        return _gitf099(col, row, playerId, boardCellStates, calcFlipList, updateCellState);
    },

    /**
     * Calculate best position for Othello Game
     * @param {Array} boardCellStates N by M array of integers representing the board state. 0 = empty. 1 = human player, 2 = computer player
     * @param {Function} utilityFunction This function takes two arguments (col, row) and returns [utilityValue, validMove], where validMove is {Array} [isLegalMove, {"x":positionX, "y":positionY, "player":player},...] col, row: Base 0.
     * @returns {*} [bestLocation, nomoreMove] bestLocation = default [0,0,[false]]
     */
    othelloGameGetBestPosition: function(boardCellStates, utilityFunction){
        return _gitf101(boardCellStates, utilityFunction);
    },

    /**
     *
     * @param {number} col  base 0
     * @param {number} row  base 0
     * @param {number} interval  blinking interval
     * @param {number} duration msec blink for this duration
     * @param {string} normalTileIndex normal board tile
     * @param {string} highlightBoardTileIndex tile that will be used as a highlighted tile
     * @param {Object} boardTileMap Phaser.Tilemap
     * @param {Object} tileMapBoardLayer Phaser.TilemapLayer
     * @param {Function} callback This is called after the duration
     */
    blinkTile: function(col, row, interval, duration, normalTileIndex, highlightBoardTileIndex, boardTileMap, tileMapBoardLayer, callback){
        _gitf100(col, row, interval, duration, normalTileIndex, highlightBoardTileIndex, boardTileMap, tileMapBoardLayer, callback);
    },

    /**
     * Perform the initial configuration after loading game contents before starting states
     */
    configSystem: function(){
        //-----------------------------------------------
        // DO NOT change these lines
        ga_assets_common = window["game_common_assets"];         // DEVELOPER_CODE **DO NOT CHANGE
        ga_assets_common["imagesSprites"]["userIcon"] = [Genari.getUserPhoto()];
        ga_assets_themes = window["game_themes"];                // DEVELOPER_CODE **DO NOT CHANGE
        // load API interface classes and classes extending the interface classes
        Genari.loadClasses(myClassLoader);      //  DEVELOPER_CODE REMOVE_FOR_THEME **DO NOT CHANGE
    },

    loadScore: function(){
        var isDeveloperMode = true;                             // DEVELOPER_CODE
        if(typeof isDeveloperMode !== "undefined"){
            // Hide loading message
            Genari.dcGame.hideLoading();
        }
        else{
            _gitf072(function(isError, msg){  // load score
                // Hide loading message
                Genari.dcGame.hideLoading();
            });
        }
    },

    /**
     * Create audio assets from the asset list
     * @param assetList
     */
    addAudioFromList: function(assetList){
        for (var k in assetList){
            if (assetList.hasOwnProperty(k)) {
                Genari.dcGame.audioAssets[k] = Genari.phaserAddAudio(k);
            }
        }
    },

    /**
     * @deprecated
     * @param urlToTileMap
     */
    loadWorldTileMap: function(urlToTileMap){
        Genari.phaserGame["load"]["tilemap"](
            'worldTileMap',
            urlToTileMap,
            null, Phaser["Tilemap"]["TILED_JSON"]
        );
    },

    loadThemeTileMaps: function(){
        _gitf074();
    },

    /**
     * Load all image and sprite assets in the list
     * @param assetList
     */
    loadImageSpriteAssets: function(assetList){
        _gitf075(assetList);
    },

    /**
     * Load an Image or Sprite asset
     * @deprecated
     * @param key
     * @param assetDesc [key, url] for image, [key, url, wiidth, height] for sprite
     */
    loadImageSpriteAsset: function(key, assetDesc){
        if(assetDesc.length >1){
            // sprite
            Genari.phaserLoadSpriteSheet(key, assetDesc[0], assetDesc[1], assetDesc[2]);
        }else{
            // image
            Genari.phaserLoadImage(key, assetDesc[0]);
        }
    },

    /**
     * Load all image and sprite assets in the list
     * @param assetList
     */
    loadAudioAssets: function(assetList){
        _gitf076(assetList);
    },

    /**
     * Load all image and sprite assets in the list
     */
    loadThemeAudioAssets: function(){
        _gitf076(Genari.getTheme()["audio"]);
    },

    loadThemeImageSpriteAssets: function(){
        _gitf077();
    },

    /**
     * @deprecated
     * @param key
     * @param theme
     */
    loadThemeAsset: function(key, theme){
        if(theme[key]){
            if(theme[key].length >1){
                // sprite
                Genari.phaserLoadSpriteSheet(key, theme[key][0], theme[key][1], theme[key][2]);
            }else{
                // image
                Genari.phaserLoadImage(key, theme[key][0]);
            }
        }
    },

    /**
     * Load all answer assets for the level: images and audio.
     * These are assets specified by content authors, not theme assets.
     * Call this in the prepload function of the play-state
     * @param fileComplete
     * @param loadComplete
     * @param callBackContext
     */
    loadLevelAssets: function(fileComplete, loadComplete, callBackContext){
    },

    /**
     * Call the callback after delay ms
     * @param {number} delay ms
     * @param {Function} callback
     * @param {Object} [context]
     */
    delayedCall: function(delay, callback, context){
        if(context)
            Genari.dcGame.phaserGame["time"]["events"]["add"](delay, callback.bind(context));
        else
            Genari.dcGame.phaserGame["time"]["events"]["add"](delay, callback);
    },

    /**
     * Synchronous foreach
     * @param {Array} array
     * @param {Function} callForEachElement This is called for all non-last element
     * @param {Function} callLast this is called for the last element
     */
    synchronousForEach: function(array, callForEachElement, callLast){
        var arrayLength = array.length;
        for (var i = 0; i < arrayLength; i++) {
            if(i >= array.length-1){
                callLast(array[i], i);
            }else{
                callForEachElement(array[i], i);
            }
        }
    },

    /**
     * Get all tiles (Phaser.Tile) with given ID.
     * @param tileMap Phaser.Tilemap
     * @param tileID The given ID to match tiles with.
     * @returns {Array} The array of Phaser.Tile having the given tile Id.
     */
    getTilesById: function(tileMap, tileID) {
        return _gitf097(tileMap, tileID);
    },

    //----------------------------------------------------------------------
    // Object factories
    add: {
        /** @return {Genari.MiniMap} */
        miniMap: function(key, x, y, playerSprite, scaleFactor, mapSize, layer){
            return new Genari.MiniMap(key, x, y, playerSprite, scaleFactor, mapSize, layer);
        },
        /** @return {Genari.CounterBar} */
        counterBar: function(x, y, width, height, initialNumber, minNumber, maxNumber, frameKey, barKey, layer, barXoffset, barYoffset) {
            return new Genari.CounterBar(x, y, width, height, initialNumber, minNumber, maxNumber, frameKey, barKey, layer, barXoffset, barYoffset);
        },
        /** @return {Genari.TimerBar} */
        timerBar: function(x, y, width, height, initialNumber, minNumber, maxNumber, frameKey, barKey, layer, barXoffset, barYoffset) {
            return new Genari.TimerBar(x, y, width, height, initialNumber, minNumber, maxNumber, frameKey, barKey, layer, barXoffset, barYoffset);
        },
        /** @return {Genari.ScoreBox} */
        scoreBox: function(key, size, endX, y, layer){
             return new Genari.ScoreBox(key, size, endX, y, layer);
        },
        /** @return {Genari.Hud} */
        hud: function(layer){
            return new Genari.Hud(layer);
        }
    }

};
// Exporting for testing
//window["Genari"] = Genari; // DEVELOPER_CODE REMOVE_FOR_THEME

//-----------------------------------------------------------------------------------
// Effect functions
Genari.Effect = {
    /**
     * Set the layer to show the effects. Set to button or dialogbox layer
     * @param layer
     */
    setEffectLayer: function(layer){
        DCEffect.setEffectLayer(layer);
    },

    /**
     * Create lightning effects from startPos to endPos
     * @param {number} x
     * @param {number} y
     * @param {number} delay in msec. Delay before the effect
     * @param {number} duration in msec
     * @param {boolean=} [redraw] Recreate the lightning
     * @param {number=} [width] Width of the lightning area
     * @param {number=} [height] The length of the lightining
     * @param {number=} [angle] Radian. 0 = down, PI/2 = left, PI = up, -PI/2 = right
     * @param {string=} [strokeStyle] Lightning stoke style. Default 'rgb(255, 255, 255)', white color
     * @param {string=} [soundKey] Sound asset key to play for the effect
     * @param {Function=} [callback]
     * @param {Object=} [callContext]
     * @param {number} [delayAfter] in msec. Delay after the effect
     */
    effLightning: function (x, y, delay, duration, redraw, width, height, angle, strokeStyle, soundKey, callback, callContext, delayAfter) {
        DCEffect.effLightning(x, y, delay, duration, redraw, width, height, angle, strokeStyle, soundKey, callback, callContext, delayAfter);
    },
    /**
     * Method which highlight a rectagular object boundary.
     * @param {Object} phaserObj A Phaser display object: group, text, button, image, sprite
     * @param {number} delay msec
     * @param {number} duration msec
     * @param {Function} [callback]
     * @param {Object} [callContext]
     * @param {Array} [callBackParameters]  Parameters of the callback
     */
    effHighlightRectangleObj: function(phaserObj, delay, duration, callback, callContext, callBackParameters){
        DCEffect.effHighlightRectangleObj(phaserObj, delay, duration, callback, callContext, callBackParameters);
    },
    /**
     * Shake the Phaser display object
     * @param {Object} phaserDisplayObject Object to shake.
     * @param {number} [delay] msec Default 0
     * @param {number} [duration] msec Default 500 msec
     * @param {number} [shrinkScale] Default 0.9. Shrink by 10%
     * @param {number} [enlargeScale] Default 1.1 Enlarge by 10%
     * @param {Function} [callback]
     * @param {Object} [callContext]
     * @param {Array} [callBackParameters]  Parameters of the callback
     */
    effShake: function(phaserDisplayObject, delay, duration, shrinkScale, enlargeScale, callback, callContext, callBackParameters){
        DCEffect.effShake(phaserDisplayObject, delay, duration, shrinkScale, enlargeScale, callback, callContext, callBackParameters);
    },
    /**
     * pop coin effect
     * @param {Object} startPoint This can be Phaser.Pointer or simply {"x":x, "y":y}
     * @param {Object} endPoint This can be Phaser.Pointer or simply {"x":x, "y":y}
     * @param {number} [delay] msec
     * @param {number} [duration] msec
     * @param {string} [particleKey]
     * @param {Function} [callback]
     * @param {Object} [callContext]
     * @param {Array} [callBackParameters]  Parameters of the callback
     * @param {number} [delayAfter] msec Default 0
     */
    effCoin: function(startPoint, endPoint, delay, duration, particleKey, callback, callContext, callBackParameters, delayAfter){
        DCEffect.effCoin(startPoint, endPoint, delay, duration, particleKey, callback, callContext, callBackParameters, delayAfter)
    },
    /**
     * Flip horizontally
     * @param {Array} phaserDisplayObj An array of Phaser display objects
     * @param {number} [delay] msec
     * @param {number} [inDuration] msec
     * @param {number} [outDuration] msec
     * @param {Function} [callback]
     * @param {Object} [callContext]
     * @param {Array} [callBackParameters]  Parameters of the callback
     */
    effFlip: function(phaserDisplayObj, delay, inDuration, outDuration, callback, callContext, callBackParameters){
        DCEffect.effFlip(phaserDisplayObj, delay, inDuration, outDuration, callback, callContext, callBackParameters);
    },
    /**
     * Show score at the top center of the target sprite
     * @param {Object} targetSprite
     * @param {string|number|null} [score] Default 1
     * @param {number|null} [x] Default center of the target sprite
     * @param {number|null} [y] Default the top of the target sprite
     * @param {string|null} [style] font style of the bubble text
     * @param {string|null} [bubbleSpriteKey] if provided, show this sprite (e.g., Star) in addition to the score text
     * @param {number|null} [duration] How long show we show. Default 500msec
     * @param {number|null} [textOffsetX] Offset of text relative to the bubbleSprite. Default -8 px
     * @param {number|null} [textOffsetY] Default -8 px
     */
    bubbleScore: function(targetSprite, score, x, y, style, bubbleSpriteKey, duration, textOffsetX, textOffsetY){
        if(targetSprite.answer){
            Genari.dcGame.audioPlay(targetSprite.answer["soundKey"], undefined, undefined, 1);
        }
        DCEffect.bubbleScore(targetSprite, score, x, y, style, bubbleSpriteKey, duration, textOffsetX, textOffsetY);
    },
    /**
     * Add an explosion sprite, animation, and add to the layer
     * @param {string} key
     * @param {string} [animationName]
     * @param {Object} [layer] Phaser.Group
     * @return {Object} Phaser sprite of the xxplosion animation
     */
    addExplosion: function(key, animationName, layer){
        return DCEffect.addExplosion(key, animationName, layer);
    },
    /**
     * Play explosion animation at the target sprite object
     * @param {Object} targetSprite object where we show the explosion
     * @param {boolean} [destroy] Set to true to destroy
     * @param {Object} [explosionSprite] Sprite animation for the explosion
     * @param {string} [animationName] Animation name
     */
    explosion: function(targetSprite, destroy, explosionSprite, animationName){
        DCEffect.explosion(targetSprite, destroy, explosionSprite, animationName);
    }
};

/*********************************************************************************************
 * A Phaser state. Used by Genari.Games
 * This is used to add new Phaser states E.g., play, error, menu
 * See app_class.js to see how this class is extended to create the menu state and play state classes.
 *
 * @param {Genari.Game} theGameObj An instance of Genari.Game, the only game object.
 * @param {string} key Name of the state E.g., "play". This is used to register and start the state using Phaser.
 *
 * @constructor
 ********************************************************************************************/
Genari.GameState = function(theGameObj, key){
    if( !(this instanceof Genari.GameState)){
        return new Genari.GameState(theGameObj, key);
    }

    // Create a Phaser.State object and attach this.
    // TODO: remove this after testing. Working without this call
    //Phaser["State"].call(this); // call parent constructor.
            // **Phaser is already loaded.
            // Genari.GameState extends Phaser.State class.
            // For inherited attributes and methods, see http://phaser.io/docs/2.4.4/Phaser.State.html
            // To start a state, call this.start(..)

    // Attributes that should not be redefined in subclasses.
    // If you redefine, it will simply replace things that are defined here.
    // It is ok to reassign new values, but must know its consequence.
    this.dcGame = theGameObj;  // An instance of Genari.Game, the only game object.
    this.phaserGame = this.dcGame.phaserGame;

    /** @type {Genari.Control} */
    this.gameControl = null;
    this.key = key;
    this.worldTileMap = null;
    this.tileMapCollisionLayer = null;

    // Add this to Phaser state
    this.addState(key, this);

    // Replace Phaser.State methods
    // Implement this on your extended classes by redefining them like this but with proper function body.
    // DO NOT use Genari.GameState.prototype.preload approach for these functions. Must redefine with proper function body.
    this["preload"] = function(){}.bind(this);  // redefine this in the sub-class
    this["create"] = function(){}.bind(this);   // redefine this in the sub-class
    this["update"] = function(){}.bind(this);   // redefine this in the sub-class
};
Genari.GameState.prototype.constructor = Genari.GameState;  // set constructor property

// You can override these methods in subclasses, but make sure to call superclass methods like this:
//   Genari.GameState.prototype.methodName.call(this, ....);
/**
 * Call this to add a new state
 * @param key
 * @param phaserState
 */
Genari.GameState.prototype.addState = function(key, phaserState){
    _gitf011(key, phaserState);
};

/**
 * Start this state. This causes Phaser to call preload() and create() of this state
 * @param clearWorld
 * @param clearCache
 */
Genari.GameState.prototype.start = function(clearWorld, clearCache){
    _gitf012(this.key, clearWorld, clearCache);
};

/**
 * basic house keeping. Call this from update()
 */
Genari.GameState.prototype.stateCheck = function(){
    //_gitf042();
};

/**
 * The default function that display the level opening dialog box.
 * Usually you don't need to customise this. Use this default if possible.
 * It display the level question and ask user to click or press enter to start the game level.
 * It calls, GameState.openingDialogAction() if clicked. openingDialogAction() should then unpause the game and start the game.
 *
 * @param {string} titleStyle CSS style string of the text
 * @param {string} questionStyle CSS style string of the text
 * @param {string} instructionStyle CSS style string of the text
 */
Genari.GameState.prototype.showLevelOpeningDialogBox = function(titleStyle, questionStyle, instructionStyle){
    var ga = this.dcGame;

    //------------------------------------------
    // Level opening basic operations
    ga.audioPlay(Genari.getQuestionSoundKey());

    // We need to create a dialog box for loading screen etc.
    ga.addGameDialogBox('dialog');

    if(!ga.isShowLevelOpeningDialog){
        // Skip showing the opening dialog box
        this.openingDialogAction();
        return;
    }

    //------------------------------------------
    // Show level opening dialog box
    ga.isPaused = true;
    if(this.isLevelCleared)
        this.openingDialogAction();
    else {
        // show dialog only for the first attempt of the level
        titleStyle = titleStyle || {
                "font": '40px Arial',
                "fill": "#000000",
                "stroke":'#FFFFFF', "strokeThickness":6
        };
        questionStyle = questionStyle || {
                "font": '20px Arial',
                "fill": "#000000",
                "wordWrap": true,
                "stroke":'#FFFFFF', "strokeThickness":6,
                "wordWrapWidth": ga.gameDialogBox.width-50
        };
        instructionStyle = instructionStyle || {
                "font": '20px Arial',
                "fill": "#000000",
                "stroke":'#FFFFFF', "strokeThickness":6
            };

        ga.setGameDialogBoxContentAndShow(
            "Level " + (ga.currentGameLevel+1),
            Genari.getQuestion(),
            -1, 0,
            "Click or Press ENTER to start",
            titleStyle,
            questionStyle, null, null,
            instructionStyle
        );
        ga.gameDialogBox["inputEnabled"] = true;
        ga.addOnceDialogAction(this.openingDialogAction, this);
    }
};

/**
 * This is the default callback handler for the opening dialog box.
 * Usually you don't need to override this. Use this default function if possbile.
 */
Genari.GameState.prototype.openingDialogAction = function() {
    var ga = this.dcGame;

    //ga.audioPlay("earn");
    ga.removeGameDialogBox();
    if(ga.gameControl)
        ga.gameControl.showOnScreenButtons();
    ga.isPaused = false;
    ga.audioPlayLoopFull(ga.backgroundMusicKey, undefined, undefined, 0.5); // "music"
};

/**
 * Helper function that load a tilemap image asset
 * @param timeMapImageItem
 */
Genari.GameState.prototype.loadTileMapImage = function(timeMapImageItem){
    if(timeMapImageItem){
        if(timeMapImageItem.length >2){
            // sprite
            Genari.phaserLoadSpriteSheet(timeMapImageItem[0], timeMapImageItem[1], timeMapImageItem[2], timeMapImageItem[3]);
        }else{
            // image
            Genari.phaserLoadImage(timeMapImageItem[0], timeMapImageItem[1]);
        }
    }
};

/**
 * All all tilemaps to the stage for the current theme. We must do this before importing (creating) layers within the tilemaps
 * @param gridWidth
 * @param gridHeight
 * @return {Object} dictionary of tilemaps imported.
 */
Genari.GameState.prototype.addThemeTileMaps = function(gridWidth, gridHeight){
    this.tileMaps = {};
    var theme = Genari.getTheme();
    var tms = theme["tileMaps"];
    for (var assetKey in tms){
        if (tms.hasOwnProperty(assetKey)) {
            this.tileMaps[assetKey] = Genari.phaserGame["add"]["tilemap"](assetKey);
            this.addTileSetImages(this.tileMaps[assetKey], tms[assetKey][1], gridWidth, gridHeight);
        }
    }
    Genari.tileMap = this.tileMaps;
    return Genari.tileMap;
};

/**
 * Load all layers of the theme
 * @param layer Rendering layer
 */
Genari.GameState.prototype.createThemeTileMapLayers = function(layer){
    var theme = Genari.getTheme();
    if (theme['tileMaps']["worldTileMap"][2]){
        theme['tileMaps']["worldTileMap"][2].forEach(function(layerName){
            this.createTileMapLayer(layer, layerName);
        }.bind(this));
    }
};

/**
 * Add tile set images
 * @param tileMap
 * @param tileSetImages
 * @param gridWidth
 * @param gridHeight
 */
Genari.GameState.prototype.addTileSetImages = function(tileMap, tileSetImages, gridWidth, gridHeight){
    tileSetImages.forEach(
        function(imageAssetKey){
            tileMap["addTilesetImage"](imageAssetKey, imageAssetKey, gridWidth, gridHeight);
        }.bind(this));
};

/**
 * @deprecated
 * @returns {*}
 */
Genari.GameState.prototype.placeWorldTileMap = function(){
    this.worldTileMap = Genari.phaserGame["add"]["tilemap"]('worldTileMap');
    Genari.worldTileMap = this.worldTileMap;
    return this.worldTileMap;
};

/**
 * @deprecated
 * @param gridWidth
 * @param gridHeight
 */
Genari.GameState.prototype.placeTileSetImages = function(gridWidth, gridHeight){
    var ga = this.dcGame;
    var theme = Genari.getTheme();

    theme["tileSetImages"].forEach(
      function(key){
          this.placeTileSetImage(key, key, gridWidth, gridHeight);
      }.bind(this)
    );
};

/**
 *
 * @param tileSetNameInTheTileMap
 * @param imageKey
 * @param gridWidth
 * @param gridHeight
 */
Genari.GameState.prototype.placeTileSetImage = function(tileSetNameInTheTileMap, imageKey, gridWidth, gridHeight){
    gridWidth = gridWidth || 16;
    gridHeight = gridHeight || 16;
    if(this.worldTileMap)
        this.worldTileMap["addTilesetImage"](tileSetNameInTheTileMap, imageKey, gridWidth, gridHeight);
};

/**
 * @deprecated Use createTileMapLayer
 * @param layer
 * @param tileMapLayerName
 * @returns {*}
 */
Genari.GameState.prototype.loadTileMapLayer = function(layer, tileMapLayerName){
    return this.createTileMapLayer(layer, tileMapLayerName);
};

/**
 * Create a tilemap layer. tileMapLayerName must be defined in the tilemap you have loaded earlier.
 * @param {Object} layer The rendering layer to order the rendering of the layer.
 * @param {string} [tileMapLayerName]
 * @returns {Phaser.TilemapLayer}
 */
Genari.GameState.prototype.createTileMapLayer = function(layer, tileMapLayerName){
    tileMapLayerName = tileMapLayerName || 'background';
    var tileMapLayer;
    if(this.worldTileMap)
        tileMapLayer = this.worldTileMap["createLayer"](tileMapLayerName);
    else
        tileMapLayer = this.tileMaps["worldTileMap"]["createLayer"](tileMapLayerName);
    if(layer) layer["add"](tileMapLayer);
    return tileMapLayer;
};

/**
 * @param startTileIndex
 * @param endTileIndex
 * @param collide
 * @param tileMapLayerName
 */
Genari.GameState.prototype.setTileMapCollisionBetween = function(startTileIndex, endTileIndex, collide, tileMapLayerName){
    if(this.worldTileMap)
        this.worldTileMap["setCollisionBetween"](startTileIndex, endTileIndex, collide, tileMapLayerName);
    else
        this.tileMaps["worldTileMap"]["setCollisionBetween"](startTileIndex, endTileIndex, collide, tileMapLayerName);
};

/**
 * Create a tilemap layer for the background.
 * @param layer
 * @param backgroundLayerName
 */
Genari.GameState.prototype.loadTileMapBackgroundLayer = function(layer, backgroundLayerName){
    backgroundLayerName = backgroundLayerName || 'background';
    if(this.worldTileMap)
        this.tileMapBackgroundLayer = this.worldTileMap["createLayer"](backgroundLayerName);
    else
        this.tileMapBackgroundLayer = this.tileMaps["worldTileMap"]["createLayer"](backgroundLayerName);

    if(this.tileMapBackgroundLayer){
        if(layer) layer["add"](this.tileMapBackgroundLayer);
    }else{
        console.log("background layer not present");
    }
};

Genari.GameState.prototype.loadTileMapCollisionLayer = function(layer, collisionLayerName, startTileIndex, endTileIndex){
    startTileIndex = startTileIndex || 0;
    endTileIndex = endTileIndex || 20000;
    collisionLayerName = collisionLayerName || 'collisionLayer';
    if(this.worldTileMap){
        this.tileMapCollisionLayer = this.worldTileMap["createLayer"](collisionLayerName);
        this.worldTileMap["setCollisionBetween"](startTileIndex, endTileIndex, true, collisionLayerName);
    }else{
        this.tileMapCollisionLayer = this.tileMaps["worldTileMap"]["createLayer"](collisionLayerName);
        this.tileMaps["worldTileMap"]["setCollisionBetween"](startTileIndex, endTileIndex, true, collisionLayerName);
    }
    if(this.tileMapCollisionLayer)
        if(layer) layer["add"](this.tileMapCollisionLayer);
};

/*********************************************************************************************
 * Base control class. Manages the main control keys and onscreen controls of the game.
 * Extend this for your control keys and onscreen buttons.
 *      See DCRunControl in app_class.js for usage
 *
 * @param {Genari.Game} theGameObj The only game object
 * @param {Genari.Player} player The player character to be controlled
 *
 * @constructor
 ********************************************************************************************/
Genari.Control = function(theGameObj, player){
    if( !(this instanceof Genari.Control)){
        return new Genari.Control(theGameObj, player);
    }
    // Attributes that should not be redefined in subclasses.
    //   If you redefine, it will simply replace things that are defined here.
    this.dcGame = theGameObj;
    this.dcGame.gameControl = this;
    this.dcGame.statePlay.gameControl = this;

    this.phaserGame = this.dcGame.phaserGame;

    /** @type {Genari.Player} */
    /** @protected */
    this.player = player;

    // Joystick states
    this.joyStickLeftRight = 0;  // + if right, - if left
    this.joyStickUpDown = 0;     // + if up, - if down

    this.controlButtons = [];   // holds the control buttons created for display

    /** @private */
    this.controlButtonHitAreas = [];  // holds the control buttons created for hit detection.
};
Genari.Control.prototype.constructor = Genari.Control;  // set constructor property

// You can override these methods in subclasses, but make sure to call superclass methods like this:
//    Genari.Control.prototype.methodName.call(this, ....);
/**
 * Use this to process a press event (key or button) only once until it is released.
 * Use idx for up to 5 keys or buttons
 * E.g.,  this.firstClick(cursor.up.isDown, 0)
 *        This will return true if up key is pressed for the first time until it is released
 * @param {boolean} cond The condition you want to check for this event.
 * @param {number} idx Index of the event 0 to 7: this can track max seven events
 * @return {boolean} Returns true if the condition for the event is the first time since the last time you called this.
 * @public
 */
Genari.Control.prototype.isFirstClick = function(cond, idx){
    return _gitf043(cond, idx);
};

// Destroy any existing managed buttons (buttons whose hitAreas are managed)
Genari.Control.prototype.destroyControlButtons = function(){
    _gitf013(this.controlButtons);
    this.controlButtons = [];
    this.destroyHitAreas();
};

/** @private */
Genari.Control.prototype.destroyHitAreas = function(){
    _gitf013(this.controlButtonHitAreas);
    this.controlButtonHitAreas = [];
};

/**
 * Create a hit area for a button. Phaser bug fix for button hit
 * @param btn
 * @param x
 * @param y
 * @param downAction
 * @param upAction
 * @param listenerContext
 * @param manage
 * @returns {Object} Phaser.Button
 * @protected
 */
Genari.Control.prototype.createHitArea = function (btn, x, y, downAction, upAction, listenerContext, manage){
    var key = btn["key"];
    var ga = this.dcGame;
    var hitArea = ga.addButton(x*ga.screenScaleRatio, y*ga.screenScaleRatio, key);
    return _gitf000(btn, downAction, upAction, listenerContext, manage, hitArea, this.controlButtonHitAreas, ga.screenScaleRatio);
};

/**
 * Move the hit area of a button. Call this if your button is moved.
 * @param btn
 * @param x
 * @param y
 */
Genari.Control.prototype.updateHitArea = function (btn, x, y){
    if(btn && btn["ga_btnIdx"]){
        btn["position"]["x"] = x;
        btn["position"]["y"] = y;

        if(this.controlButtons[btn["ga_btnIdx"]]){
            var hitArea = this.controlButtons[btn["ga_btnIdx"]][4];
            hitArea["position"]["x"] = x * this.dcGame.screenScaleRatio;
            hitArea["position"]["y"] = y * this.dcGame.screenScaleRatio;
        }
    }
};

/**
 * Call this to hide control buttons temporally
 */
Genari.Control.prototype.hideOnScreenButtons = function () {
    this.controlButtons.forEach(function(key){key["visible"] = false;});
};

Genari.Control.prototype.showOnScreenButtons = function () {
    this.controlButtons.forEach(function(key){key["visible"] = true;});
};

/** @protected */
Genari.Control.prototype.createButtonHitArea = function (){
    _gitf004(this.destroyHitAreas, this.controlButtons, this.createHitArea, this);
};

/**
 * Add a control button
 *
 * @param {number} x
 * @param {number} y
 * @param {string} key The asset name that is already loaded
 * @param {Function} downAction method of an object will be called when clicked
 * @param {Function} upAction method of an object will be called when button is up
 * @param {Object} listenerContext the object to which the methods are attached to.
 * @param {number} [alpha] alpha of the button. 1 = opaque, 0 = completely transparent (invisible)
 * @param {boolean} [fixedToCamera] Set to false to allow it move
 *
 **/
Genari.Control.prototype.addControlButton = function(x, y, key, downAction, upAction, listenerContext, alpha, fixedToCamera) {
    var ga = this.dcGame;
    var btn = ga.addButton(x, y, key);

    if(typeof alpha === "undefined") alpha = 1.0;
    if(typeof fixedToCamera === "undefined") fixedToCamera = true;
    btn["fixedToCamera"] = fixedToCamera;
    btn["inputEnabled"] = false;
    btn["alpha"] = alpha;
    btn["ga_btnIdx"] = this.controlButtons.push([
        btn,
        downAction,
        upAction,
        listenerContext,
        null                // hit area. This is added later
    ])-1;
    return btn;
};

Genari.Control.prototype.checkCursorKeyLeftDown = function(){
    return this.dcGame.cursorKeys["left"]["isDown"];
};

Genari.Control.prototype.checkCursorKeyRightDown = function(){
    return this.dcGame.cursorKeys["right"]["isDown"];
};

Genari.Control.prototype.checkCursorKeyUpDown = function(){
    return this.dcGame.cursorKeys["up"]["isDown"];
};

Genari.Control.prototype.checkCursorKeyDownDown = function(){
    return this.dcGame.cursorKeys["down"]["isDown"];
};

Genari.Control.prototype.rescale = function(){
    this.createButtonHitArea();
};

/*********************************************************************************************
 * Player class
 * DO NOT EDIT. Override if necessary
 * @param {Genari.Game} theGameObj The only game object
 * @param {number} maxLife Name of the state E.g., "play"
 * @param {number} entryX Name of the state E.g., "play"
 * @param {number} entryY Name of the state E.g., "play"
 *
 * @constructor
 ********************************************************************************************/
Genari.Player = function(theGameObj, maxLife, entryX, entryY){
    if( !(this instanceof Genari.Player))
        return new Genari.Player(theGameObj, maxLife, entryX, entryY);

    // Attributes that should not be redefined in subclasses.
    // If you redefine, it will simply replace things that are defined here.
    this.dcGame = theGameObj;
    this.phaserGame = this.dcGame.phaserGame;
    this.dcGame.player = this;

    this.maxLife = maxLife || 3;
    this.remainingLife = this.maxLife;

    /** @type {Phaser.Sprite} */
    this.playerSprite = null;  // Phaser.Sprite

    // TODO: rename this to playerEntryX
    this.playerEntryX = entryX || 32;
    this.playerEntryY = entryY || this.dcGame.gc_game_height/3;;

    /** @deprecated */
    this.gaPlayerEntryX = this.playerEntryX;

    /** @deprecated */
    this.gaPlayerEntryY = this.playerEntryY;
};
Genari.Player.prototype.constructor = Genari.Player;  // set constructor property

// You can override these methods in subclasses, but make sure to call superclass methods like this:
// Genari.Player.prototype.methodName.call(this, ....);
// ** DO NOT change this file.
Genari.Player.prototype.resetPlayer = function(){
    //this.remainingLife = this.maxLife;
};

/**
 * @deprecated
 */
Genari.Player.prototype.unPause = function(){
    // Un pause the player, allowing it move
    // Implement this on your player
    //this.player["animations"]["paused"] = false;
    //this.player["body"]["enable"] = true;
};

Genari.Player.prototype.resume = function(){
    // Un pause the player, allowing it move
    // Implement this on your player
    //this.player["animations"]["paused"] = false;
    //this.player["body"]["enable"] = true;
};

Genari.Player.prototype.pause = function(){
    // Implement this on your player
    //this.player["animations"]["paused"] = true;
    //this.player["body"]["enable"] = false;
};

Genari.Player.prototype.getX = function(){
    // Implement this on your player
    //return this.player['body']['x'];
};

Genari.Player.prototype.getY = function(){
    // Implement this on your player
    //return this.player['body']['y'];
};

Genari.Player.prototype.getMidY = function(){
    // Implement this on your player
    //return this.player['body']["y"] + this.player['body']["height"] / 2;
};

Genari.Player.prototype.getWidth = function(){
    // Implement this on your player
    //return this.player['body']['width'];
};

Genari.Player.prototype.destroy = function(){
    // implement anything to clean up if you need to destroy the player
};

/*********************************************************************************************
 * Player for horizontally scrolling running games
 * DO NOT EDIT. Extend if necessary
 * @param {Genari.Game} theGameObj The only game object
 * @param {number} maxLife Name of the state E.g., "play"
 * @param {number} entryX Name of the state E.g., "play"
 * @param {number} entryY Name of the state E.g., "play"
 * @param {string} [jumpSoundKey] Name of the state E.g., "play"
 *
 * @constructor
 * @extends {Genari.Player}
 ********************************************************************************************/
Genari.RunPlayer = function(theGameObj, maxLife, entryX, entryY, jumpSoundKey){
    if( !(this instanceof Genari.RunPlayer))
        return new Genari.RunPlayer(theGameObj, maxLife, entryX, entryY, jumpSoundKey);

    Genari.Player.call(this, theGameObj, maxLife, entryX, entryY);   // must call the parent class.

    // Never redefine inherited properties and methods.
    // To override methods, must use prototype.

    // We define attributes that should not be redefined in subclasses.
    // If you redefine, it will simply replace things that are defined here.

    // Genari.RunPlayer specific
    this.isBlinking = false;      // player is invincible mode after death
    this.jumpSoundKey = jumpSoundKey || "jumping";
    this.walkSpeed = 150;
    this.jumpDistance = 100;
    this.standStillFrameNo = -1;
};
Genari.RunPlayer.prototype = Object.create(Genari.Player.prototype); // extend Genari.Player
Genari.RunPlayer.prototype.constructor = Genari.RunPlayer;  // set constructor property

// Add methods to the prototype of the superclass
/**
 * @deprecated use resume()
 * @override */
Genari.RunPlayer.prototype.unPause = function(){
    this.resume();
};

/**
 * @override
 */
Genari.RunPlayer.prototype.resume = function(){
    if(this.playerSprite){
        if(this.playerSprite["animations"] && this.playerSprite["animations"]["getAnimation"]())
            this.playerSprite["animations"]["paused"] = false;
        if(this.playerSprite["body"])
            this.playerSprite["body"]["enable"] = true;
    }
};

/** @override */
Genari.RunPlayer.prototype.pause = function(){
    if(this.playerSprite){
        if(this.playerSprite["animations"] && this.playerSprite["animations"]["getAnimation"]())
            this.playerSprite["animations"]["paused"] = true;
        // A disabled body won't be checked for any form of collision or overlap or have its pre/post updates run.
        if(this.playerSprite["body"])
            this.playerSprite["body"]["enable"] = false;
    }
};

/** @override */
Genari.RunPlayer.prototype.getX = function(){
    return this.playerSprite['body']['x'];
};

/** @override */
Genari.RunPlayer.prototype.getY = function(){
    return this.playerSprite['body']['y'];
};

/** @override */
Genari.RunPlayer.prototype.getMidY = function(){
    return this.playerSprite['body']["y"] + this.playerSprite['body']["height"] / 2;
};

/** @override */
Genari.RunPlayer.prototype.getWidth = function(){
    return this.playerSprite['body']['width'];
};

Genari.RunPlayer.prototype.checkFall = function(){
    if(this.dcGame.gc_ground_height)
        return this.playerSprite["body"]["y"] > this.dcGame.gc_ground_height - this.playerSprite["height"] + 3;
    else
        return false;
};

Genari.RunPlayer.prototype.checkTouchingDown = function(){
    return this.playerSprite["body"]["touching"]["down"];
};

// blink the player once. used after die
Genari.RunPlayer.prototype.blink = function(){
    _gitf015(this.playerSprite);
};

// blink the player for the given msec during which the player should be invulnerable
Genari.RunPlayer.prototype.blinkFor = function(duration){
    var timer = this.dcGame.phaserGame["time"]["create"](false);
    duration = duration || 2000;
    this.isBlinking = true;
    timer["loop"](200, function() {
        this.blink();
    }, this);

    timer["start"]();
    this.dcGame.phaserGame["time"]["events"]["add"](duration, function(timer){
        timer["stop"]();
        this.stopBlinking();
    }, this, timer);
};

Genari.RunPlayer.prototype.stopBlinking = function(){
    this.playerSprite["revive"]();
    this.isBlinking = false;
};

// Override these functions in your Player class if you need to customise movements. Do not change this file
Genari.RunPlayer.prototype.standStill = function(){
    this.playerSprite["body"]["velocity"]["x"] = 0;
    this.playerSprite["animations"]["stop"]();
    if(this.standStillFrameNo >= 0)
        this.playerSprite["frame"] = this.standStillFrameNo;
};

Genari.RunPlayer.prototype.walkLeft = function(speed){
    if(typeof speed == "undefined") speed = -1*this.walkSpeed;
    this.playerSprite["body"]["velocity"]["x"] = speed; // -1*this.walkSpeed;
    this.playerSprite["animations"]["play"]('left');
};

Genari.RunPlayer.prototype.walkRight = function(speed){
    if(typeof speed == "undefined") speed = this.walkSpeed;
    this.playerSprite["body"]["velocity"]["x"] = speed; //this.walkSpeed;
    this.playerSprite["animations"]["play"]('right');
};

Genari.RunPlayer.prototype.walkDown = function(speed){
    if(typeof speed == "undefined")
        speed = 0.3*250; //this.dcGame.gc_player_jump_distance;
    this.playerSprite["body"]["velocity"]["y"] = speed; //0.3*this.dcGame.gc_player_jump_distance;
};

Genari.RunPlayer.prototype.walkUp = function(speed) {
    this.jumpUp(speed);
};

Genari.RunPlayer.prototype.jumpUp = function(speed){
    if(typeof speed === "undefined"){
        if(this.dcGame.gc_player_jump_distance){
            speed = -1*this.dcGame.gc_player_jump_distance;
        }
        else
            speed = -1*250;
    }
    //this.dcGame.audioAssets[this.jumpSoundKey]["play"]();
    this.dcGame.audioPlay(this.jumpSoundKey, undefined, undefined, 0.5);
    this.playerSprite["body"]["velocity"]["y"] = speed; // -1*this.dcGame.gc_player_jump_distance;
};

/**
 * Create player sprite and animations
 * Override this if you need to customise.
 *
 * @param {string} key the name of the image asset, which must be loaded before calling this in preload.
 * @param {number|null} [gravity] Player physics property: Y gravity amount. Defult 310
 * @param {number|null} [bounceY] Player physics property: Y bounce amount. Default 0.2
 * @param {Array|null} [leftFrames] Frame numbers in the sprite for walking left
 * @param {Array|null} [rightFrames] Frame numbers in the sprite for walking right
 * @param {number|null} [frameRate] How fast does the player walk? Default 10 frames per second
 * @param {boolean|null} [loop] Loop the animation for walking? Default true
 * @param {Array|null} [upframes] Frame numbers in the sprite for walking upwards
 * @param {Array|null} [downframes] Frame numbers in the sprite for walking downwards
 * @param {boolean|null} [camFollowPlayer] Set to false to make the camera not to follow the player. Default true.
 */
Genari.RunPlayer.prototype.createPlayerAnimation = function(key, gravity, bounceY, leftFrames, rightFrames, frameRate, loop, upframes, downframes, camFollowPlayer){
    var ga = this.dcGame;
    var fr = frameRate || 10;
    var lf = leftFrames || [0, 1, 2, 3];
    var rf = rightFrames || [5, 6, 7, 8];

    var uf;
    if(upframes)
        uf = upframes || [9, 10, 11, 12];
    var df;
    if(downframes)
        df = downframes || [13, 14, 15, 16];

    var camfp = true;
    if(typeof camfp !== "undefined")
        camfp = camFollowPlayer;

    var l = true;
    if(typeof loop !== "undefined")
        l = loop;

    this.playerSprite = _gitf019(this.playerSprite, this.gaPlayerEntryX, this.gaPlayerEntryY, key, gravity, bounceY, lf, rf, fr, l, uf, df, camfp);

    if(ga.layerPlayer)
        ga.layerPlayer["add"](this.playerSprite);
};

/**
 * Reduce the life of player
 */
Genari.RunPlayer.prototype.killPlayer = function () {
    var ga = this.dcGame;

    this.remainingLife -= 1;
    if(ga.hud) ga.hud.setLifeValue(this.remainingLife);

    if(ga.gameControl) ga.gameControl.bulletCount = 0;

    if (this.remainingLife <= 0) {
        ga.gameOver();
    }
    else if (this.checkFall()){
        this.resetBody();
        this.blinkFor();
    }
    else{
        this.blinkFor();
    }
};

/**
 * After player dies, move the player back onto the platform
 * @param {number|null} [x]
 * @param {number|null} [y]
 */
Genari.RunPlayer.prototype.resetBody = function(x, y){
    if(this.dcGame.gc_ground_height && this.dcGame.gc_back_distance_when_die){
        this.playerSprite["body"]["y"] = this.dcGame.gc_ground_height - this.playerSprite["height"]; //262;
        this.playerSprite["body"]["x"] -= this.dcGame.gc_back_distance_when_die;
    }else if(x && y) {
        this.playerSprite["body"]["y"] = x;
        this.playerSprite["body"]["x"] = y;
    }
};

/*********************************************************************************************
 * Genari.Game class. The base class of all Game applications
 *
 * Game --> phaserGame
 *          gameDialogBox
 *          gameControl
 *          stateError
 *          stateMenu
 *          statePlay
 *          player  --> playerSprite
 *          layer____: rendering layers
 *          group____: groups of display object
 *
 * @param {Object} game_themes An array of themes. A theme is a dictionary. See app.js for theme data
 * @param {number} game_width Width of the canvas
 * @param {number} game_height Height of the canvas
 *
 * @constructor
 ********************************************************************************************/
Genari.Game = function(game_themes, game_width, game_height){  // Docentron Game Class
    if( !(this instanceof Genari.Game)) return new Genari.Game(game_themes, game_width, game_height);  // make sure this refer to a Genari.Game

    game_width = game_width || 800;    // ** if you change, make sure the screen ratio should remain the same
    game_height = game_height || 426;
    this.gc_game_width = game_width;
    this.gc_game_height = game_height;

    // Initialize API
    Genari.dcGame = this;

    // update the scale ratio
    //console.log("Genari.Game", game_themes);
    this.screenScaleRatio = _gitf040(this, game_themes, game_width, game_height);

    // Constants
    /** @const */
    this.BUTTON_EDGE_MARGIN = 10;
    /** @const */
    this.gc_building_height = 60; // crate height

    /** @private */
    this.screenScaleRatio = 1;  // this is automatically calculated

    // Game states
    this.levelScore = 0;
    this.currentGameLevel = 0;
    this.totalGameScore = 0;

    //this.levelData = 0;     // holds the current game level data
    this.totalWordNo = 0;   // the total number of words for the current level
    this.wordNo = 0; // idx of the word to show next

    // Loaded/created assets
    /** @type {Phaser.Game} */
    this.phaserGame = null;  // Phaser.Game. the Phaser instance

    this.isPaused = false; // true if game is paused

    /** @type {string} */
    this.backgroundMusicKey = "music";  // phaser asset key for music that will be played during play state
    this.endMusicKey = "end";           // phaser asset key for music that will be played at the end of a level
    this.dialogBoxKey = "dialog";       // phaser asset key for the diglogbox

    this.enterKey = null;               // Phaser "ENTER" keyboard key
    this.spaceBarKey = null;            // Phaser "SPACEBAR" keyboard key
    this.cursorKeys = null;             // Phaser cusorkey

    this.gameDialogBox = null;
    this.audioAssets = {};      // a list of audio assets ready to play for the game state.
    /** @deprecated */
    this.phaserGroups = {};
    this.scoreBox = null;
    this.gameThemes = game_themes;  // game themes

    this.lifeText = null;
    this.currentStroke = 0;         // used by stroke game

    /** @type {Genari.Control} */
    this.gameControl = null;

    /** @type {Genari.Player} */
    this.player = null;

    /** @type {Genari.GameState} */
    this.statePlay = null;      // level play state
    /** @type {Genari.GameState} */
    this.stateError = null;     // show error message
    /** @type {Genari.GameState} */
    this.stateMainMenu = null;  // show main menu

    this.recreateDialogBox = false; // set this to true to recreate dialog boxes for game over and pause events.
                                    // this forces the dialog box to appear on the top.
    this.isShowLevelOpeningDialog = true;  // if set to true show a dialog box when start a new level
    this.isShowLevelCompleteDialog = true;  // if set to true show a dialog box when a level is completed

    // Layers. Use layers to control z-order
    this.layerBottom = null;    // holds background, platforms
    this.layerPlayer = null;    // holds players, player interactive items
    this.layerEffects = null;   // holds explosions, bullets, effects
    this.layerButtons = null;   // holds control buttons, frames, windows, HUD items
    this.layerDialog = null;    // holds dialog boxes. Top layer

    // Learning statistics
    this.correctWordsCollected = [];   // add correct words collected here
    this.incorrectWordsDestroyed = []; // add incorrect words collected here
    this.correctWordsDestroyed = [];
    this.incorrectWordsCollected = [];

    // Exports symbols to external libraries
    this["_sn"] = this.startNew;
    this["_rs"] = this.rescaleGame;
    this["_cg"] = this.resume;
    this["_p"] = this.phaserGame;
    this["_gdb"] = this.gameDialogBox;
};
// You can override these methods in subclasses, but make sure to call superclass methods like this:
//   Genari.Game.prototype.methodName.call(this, ....);
Genari.Game.prototype = {
    /**
     * Create Phaser and initialize for this game
     * You can override this to customise Phaser initialization, but must set ["_p"] and scale mode properly
     *
     * @public
     *
     * @param {string | HTMLElement} gameContainer Parent
     * @param {Function} preloadFn
     * @param {Function} createFn
     * @param {string} renderMethod Default "AUTO"
     * @param {string} gamePhysics Default "ARCADE"
     */
    createPhaser: function(gameContainer, preloadFn, createFn, renderMethod, gamePhysics){
        // Phaser["CANVAS"]
        renderMethod = renderMethod || "AUTO";
        this.phaserGame = new Phaser["Game"](this.gc_game_width, this.gc_game_height, Phaser[renderMethod], gameContainer, { "preload": preload2.bind(this), "create": createFn});
        this["_p"] = this.phaserGame;  // ** must export
        Genari.phaserGame = this.phaserGame;

        function preload2(){
            // Set game physics.
            if(typeof gamePhysics !== "undefined" )
                this.phaserGame["physics"]["startSystem"](Phaser["Physics"][gamePhysics]); // "ARCADE"// ** this refers to collect obj as we used bind. See above.
            // Scale mode
            // see http://stackoverflow.com/questions/27086220/how-can-i-make-a-phaser-game-automatically-fill-the-window
            //ga.phaserGame["stage"]["scaleMode"] = Phaser["ScaleManager"]["SHOW_ALL"];
            //ga.phaserGame["stage"]["scaleMode"] = Phaser["ScaleManager"]["USER_SCALE"];
            //ga.phaserGame["scale"]["maxWidth"] = 800;
            //ga.phaserGame["scale"]["maxHeight"] = 450;
            //ga.phaserGame["scale"]["pageAlignVertically"] = true;
            //ga.phaserGame["scale"]["pageAlignHorizontally "] = true;
            //ga.phaserGame["scale"]["setShowAll"]();
            //ga.phaserGame["scale"]["setUserScale"](2, 2, 0, 0);
            //ga.phaserGame["scale"]["refresh"]();
            // this here is ok, passed by caller
            this.phaserGame["stage"]["scaleMode"] = Phaser["ScaleManager"]["RESIZE"];

            /*
            // Prepare input keys commonly used
            this.cursorKeys = this.createCursorKeys();  // UP/DOWN/LEFT/RIGHT keys on PC
            if(createEnterKey){
                this.enterKey = this.enterKey || this.phaserGame["input"]["keyboard"]["addKey"](Phaser["Keyboard"]["ENTER"]);
            }
            if(createSpaceBarKey){
                this.spaceBarKey = this.spaceBarKey || this.phaserGame["input"]["keyboard"]["addKey"](Phaser["Keyboard"]["SPACEBAR"]);
            }*/

            // Now call the preload function provided
            preloadFn();
        }
    },

    /**
     * Return true if minscore is achieved
     * @protected */
    checkMinScore: function (){
        return Genari.checkMinScore(this.levelScore);
    },

    setToBaseScaleMode: function(){
        _gitf023(this.gc_game_width, this.gc_game_height);
    },

    setToScaledMode: function(){
        _gitf024(this.gc_game_width*this.screenScaleRatio, this.gc_game_height*this.screenScaleRatio);
    },

    /**
     * Add audio asset to the game and store it in an array for easy access.
     * @param audioAssets
     */
    addAudios: function (audioAssets) {
        audioAssets.forEach(function(key) {
            this.audioAssets[key[0]] = Genari.phaserAddAudio(key[1]);
        }.bind(this));
    },

    /**
     * Create audio assets from the asset list
     * @param assetList
     */
    addAudioFromList: function(assetList){
        Genari.addAudioFromList(assetList);
    },

    /**
     * Add all theme audio assets of the current level
     */
    addThemeAudio: function(){
        this.addAudioFromList(Genari.getTheme()["audio"]);
    },

    /**
     * Add all answer audio assets for the current level.
     * These are audio files added by game level authors, not the theme audio files.
     * Loaded audio assets are added to Genari.dcGame.audioAssets with their keys
     * @param {number} [qNo] question number. Leave this blank for non-card games
     */
    addLevelAudio: function(qNo){
    },

    /**
     * Add audio assets for a card game
     * These are audio files added by game level authors, not the theme audio files.
     * Loaded audio assets are added to Genari.dcGame.audioAssets with their keys
     * @param {number} qNo question number. Default 0.
     */
    addQuestionAudio: function(qNo){
    },

    /**
     * Play an audio asset from the asset list
     * @param key
     * @param [marker]
     * @param [position]
     * @param [volume]
     * @param [loop]
     * @param [forceRestart]
     * @param [stopIfPlaying] Default true
     */
    audioPlay: function(key, marker, position, volume, loop, forceRestart, stopIfPlaying){
        stopIfPlaying = stopIfPlaying || true;
        //console.log("audioPlay", key, this.audioAssets[key], this.audioAssets);
        if(key && this.audioAssets[key]){
            if(this.audioAssets[key]["isPlaying"] && stopIfPlaying)
                this.audioAssets[key]["stop"]();
            this.audioAssets[key]["play"](marker, position, volume, loop, forceRestart);
        }
    },

    /**
     * Play an audio asset from the asset list
     * @param key
     * @param [volume]
     */
    audioPlayLoopFull: function(key, volume){
        if(key && this.audioAssets[key] && !this.audioAssets[key]["isPlaying"]){
            this.audioAssets[key]["loopFull"](volume);
        }
    },

    /**
     * Stop audio
     * @param key
     */
    audioStop: function(key){
        if(key && this.audioAssets[key]){
            this.audioAssets[key]["stop"]();
        }
    },

    /**
     * Pause audio
     * @param key
     */
    audioPause: function(key){
        if(key && this.audioAssets[key]){
            this.audioAssets[key]["pause"]();
        }
    },

    /**
     * Resume audio
     * @param key
     */
    audioResume: function(key){
        if(key && this.audioAssets[key]){
            this.audioAssets[key]["resume"]();
        }
    },

    // Add text to the stage
    addText: function (variable, x, y, text, property, camera, visible, parent) {
        var t = Genari.phaserAddText(0, 0, text, property);
        t["x"] = x | 0;
        t["y"] = y | 0;
        t["fixedToCamera"] = camera;
        t["visible"] = visible;
        if (typeof parent !== "undefined" && parent != null) parent["addChild"](t);
    },

    // Add level info text to the stage
    addLevelText: function (y, text, style, x_offset) {
        x_offset = x_offset || 0;
        return _gitf032(this.gc_game_width + x_offset, y, text, style);
    },

    /**
     * Create a phaser group (a display object) and add it to this.phaserGroups array using the arrayKey.
     * Use this to create and manage phaser groups. A phaser group is a display object which can contain other display objects
     * @deprecated use Genari.Group classes to manage groups
     * @param {string} arrayKey index key for this.phaserGroups
     * @param {boolean} enableBody Set to true to enable physics
     * @returns {Object} Phaser.Group object
     */
    phaserAddGroup: function (arrayKey, enableBody) {
        return _gitf001(this.phaserGroups, arrayKey, enableBody);
    },

    // Rescale the entire game when window is re-sized. ** call this AFTER adding/creating all assets. Not before
    rescaleGame: function (){
        //console.log("game rescale");

        this.screenScaleRatio = _gitf003(this.gc_game_width, this.gc_game_height);

        // Due to bug in Phaser, we must call this whenever we resize the window
        if(this.gameControl)
            this.gameControl.rescale();
    },

    /**
     * @deprecated Use resume()
     */
    continueGame: function(){
        this.resume();
    },

    resumePhysics: function(){
        if(Genari.phaserGame["physics"]["arcade"])
            Genari.phaserGame["physics"]["arcade"]["isPaused"] = false;
        if(Genari.phaserGame["physics"]["p2"])
            Genari.phaserGame["physics"]["p2"]["paused"] = false;
    },

    //-----------------------------------------------------------
    // resume paused game
    resume: function () {
        this.isPaused = false;
        this.removeGameDialogBox();
        this.audioResume(this.backgroundMusicKey);  // "music"

        this.resumePhysics();

        if(this.phaserGame != null){
            if((typeof this.player !== "undefined") && this.player != null){
                this.player.resume();
                if(this.audioAssets[this.backgroundMusicKey]["paused"]){
                    try {
                        this.audioAssets[this.backgroundMusicKey]["resume"]();
                    } catch (Exception) {
                        console.info("Error resuming audio.", Exception);
                    }
                }
                if(this.gameControl)
                    this.gameControl.showOnScreenButtons();
            }
            return true;
        }else
            return false;
    },

    // Create game dialog box to show level openings, scores, etc
    addGameDialogBox: function (dialogBoxFrameSpriteKey){
        // Destroy previous one
        if(this.gameDialogBox)
            this.gameDialogBox["destroy"]();

        // Create a new dialog box frame and center it to the screen
        this.gameDialogBox = Genari.phaserAddSprite(0, 0, dialogBoxFrameSpriteKey);
        this.gameDialogBox["x"] = Genari.calcBoxCenterX(this.phaserGame, this.gameDialogBox);
        this.gameDialogBox["y"] = Genari.calcBoxCenterY(this.phaserGame, this.gameDialogBox);
        this.gameDialogBox["fixedToCamera"] = true;
        if(this.layerDialog){
            this.layerDialog["add"](this.gameDialogBox);
        }

        // ** make sure to set this
        this["_gdb"] = this.gameDialogBox;
    },

    /**
     * Set game dialog box content with the given title, message, score, or menu options and show the box
     *
     * @param {string} titleMsg
     * @param {string} bodyText
     * @param {number} levelScore
     * @param {number} totalScore
     * @param {string} [instructionMsg]
     * @param {Object} [titleStyle]  text style E.g., {font:'40px Arial', fill:'#ffffff'}
     * @param {Object} [msgStyle]
     * @param {Object} [scoreStyle]
     * @param {Object} [totalScoreStyle]
     * @param {Object} [instructionStyle]
     * @param {number} [titleYOffset] Default -100
     * @param {number} [strokeColor]
     */
    setGameDialogBoxContentAndShow: function (
        titleMsg, bodyText, levelScore, totalScore, instructionMsg,
        titleStyle, msgStyle, scoreStyle, totalScoreStyle, instructionStyle,
        titleYOffset, strokeColor
    ) {
        //console.info("setGameDialogBoxContentAndShow", titleMsg);
        _gitf005(this.gameDialogBox,
            titleMsg, bodyText, levelScore, totalScore, instructionMsg, this,
            titleStyle, msgStyle, scoreStyle, totalScoreStyle, instructionStyle,
            titleYOffset, strokeColor
        );
    },

    addButton: function (x, y, key, action) {
        return Genari.phaserAddButton(x, y ,key, action, this, 1, 1, 0, 1);
    },

    /**
     * Add a button to the dialogbox
     * @param x
     * @param y
     * @param key
     * @param offsetX
     * @param btnAction
     * @param listenerContext
     * @returns {Object} Phaser.Button
     */
    addButtonToDialogBox: function (x, y, key, offsetX, btnAction, listenerContext){
        return _gitf006(x, y, key, offsetX,
            this.addButton,
            //dcGAPI.calcBoxCenterX,
            this.gameDialogBox,
            this.gameControl.createHitArea,
            btnAction,
            this.statePlay.pauseMenuButtons,
            listenerContext,
            this,
            this.gameControl
        );
    },

    /**
     * When the user click or press the Enter key, remove the game dialog box and call action()
     * @param {Function} action The event handler
     * @param {Object} listenerContext Set this so we can use this in the event handler
     * @param {boolean} [addClick] Set to true to add click handler as well
     */
    addOnceDialogAction: function(action, listenerContext, addClick){
        _gitf007(this.enterKey, addClick, action, listenerContext);
    },

    /**
     * Do not call this directly. Game flow controls
     * This function is called when a game level data is received automatically.
     * Callback function signature. DO NOT CHANGE
     * @param isError
     * @param hasLevelData
     * @param message
     */
    startGameLevel: function (isError, hasLevelData, message) { // ** callback function signature. DO NOT CHANGE
        //console.info("this.startGameLevel RunningGame", isError, JSON.stringify(levelData));

        // Received the game level data from the server
        this.phaserGame["paused"] = false;

        // TODO: display message if isError = true. Allow user to retry loading the game data.
        if (isError == true)
            this.stateError.start();
        else {
            if(hasLevelData){
                //console.info("startGameLevel");
                //console.info("starting play state");
                this.statePlay.start(true); // set true to re-create the game
            }else{
                // completed the game or no data
                // show "no data" dialog box
                if(this.recreateDialogBox) this.createDialogBox();
                this.setGameDialogBoxContentAndShow("Error", "Sorry, no more game data available for this game.", -1, 0, "");
                this.addOnceDialogAction(
                    function(){
                        this.phaserGame["input"]["onDown"]["removeAll"]();
                        this.stateMainMenu.start();
                    }  // TODO: CHECK
                    ,this
                );
            }
        }
    },

    // Hide game dialog box
    removeGameDialogBox: function (){
        _gitf008(this.gameDialogBox, this.statePlay.pauseMenuButtons);
        this.statePlay.pauseMenuButtons = [];
    },

    // Start a new game. Show the splash screen
    // start stateMainMenu state
    // Do not override this. Add additional initialization to stateMainMeu.create()
    /** @final */
    startNew: function () {
        if(this.backgroundMusicKey)
            this.audioStop(this.backgroundMusicKey);

        this.removeGameDialogBox();
        this.statePlay.isLevelCleared = false;
        this.statePlay.isPlaying = false; // prevent update calls

        this.currentGameLevel = 0;
        this.totalGameScore = 0;
        this.levelScore = 0;
        this.phaserGame["paused"] = false;
        this.isPaused = false;

        this.resumePhysics();

        this.stateMainMenu.start();
    },

    /**
     * Save game and start a new
     */
    gameOver: function(){
        this.saveAndStartNextLevel(true);
    },

    /**
     * Call this to save the game score and go to the next game level.
     * If there is no more game data, it will end the game.
     * If you need, you can override this in a subclass.
     * @param [gameOver] Set to true if game over. Default false.
     */
    saveAndStartNextLevel: function (gameOver){
        // Completed the game:
        //    End the game level,
        //    Save game, and
        //    Go to the next level
        this.statePlay.isPlaying = false;        // Use this to prevent any code in play state update()
        this.statePlay.isLevelCleared = false;
        this.gameControl.bulletCount = 0;

        this.totalGameScore += this.levelScore;

        if(this.backgroundMusicKey)
            this.audioStop(this.backgroundMusicKey);

        // Show loading dialog box
        if(this.recreateDialogBox)
            this.createDialogBox();

        // We need to add a dialog box for loading dialog
        if(!this.gameDialogBox)
            this.addGameDialogBox('dialog');

        this.setGameDialogBoxContentAndShow(
            "Loading...", "Loading please wait", -1, 0, null,
            {"font":'40px Arial', "fill":'#808080', "stroke":'#000000', "strokeThickness":6},
            {"font":'18px Arial', "fill":'#808080', "stroke":'#000000', "strokeThickness":6}
        );

        this.audioPlay(this.endMusicKey, undefined, undefined, 0.5);
        //if(this.audioAssets[this.endMusicKey])
        //    this.audioAssets[this.endMusicKey]["play"]();

        if(this.player)
            this.player.pause();

        // TODO: make sure to record correctWordsCollected and incorretWordsDestroyed before calling this.
        // Save game and try to get the next level data
        ibcgl(
            Genari.getQuestionId(),
            this.levelScore,
            this.totalGameScore,
            this.correctWordsCollected,
            this.incorrectWordsDestroyed,
            this.currentGameLevel,
            this.gameLevelComplete,  // this function is called when the server respond
            this,
            gameOver
        );
        this.levelScore = 0;
    },

    // ** DO NOT call this directly.
    // ** DO NOT change the signature of this function
    // This is called by ibcgl()
    // This function is called when we receive the next level game data from the server
    // We show level-complete dialog box based on the availability of the game data.
    // If you need, you can override in a subclass.
    gameLevelComplete: function (isError, hasLevelData, score, totalScore, message, gameOver) {
        //console.log("gameLevelComplete", totalScore, hasLevelData, isError);
        this.correctWordsCollected = [];
        this.incorrectWordsDestroyed = [];
        this.correctWordsDestroyed = [];
        this.incorrectWordsCollected = [];

        this.gameControl.hideOnScreenButtons();
        this.removeGameDialogBox();

        // TODO: test show-message if isError is true. Allow user to retry to save the game.
        if (isError == true)
            this.stateError.start();
        else {
            var msg, actionMsg, buttonAction, title;
            // Based on the availability of the game data,
            // we configure the level-complete dialog box.
            if(hasLevelData){
                // We have the next level game data
                msg = "You have completed Level " + (this.currentGameLevel+1);
                actionMsg = "Press Enter to continue";
                buttonAction = function() {
                    this.currentGameLevel += 1;
                    this.levelScore = 0;
                    this.removeGameDialogBox();
                    if(this.audioAssets[this.endMusicKey])
                        this.audioAssets[this.endMusicKey]["stop"]();
                    this.startGameLevel(isError, hasLevelData, message); // starts the next game level
                    this.phaserGame["paused"] = false;  // just in case. Avoid pausing the game
                }.bind(this);

                //if(this.recreateDialogBox) this.createDialogBox();
                if(this.isShowLevelCompleteDialog){
                    this.showLevelCompleteDialogBox(msg, score, totalScore, actionMsg, buttonAction, title);
                }else{
                    buttonAction();
                }
            }
            else {
                if(gameOver){
                    // No more game data. End the game
                    title = "Game Over!";
                    msg = "";
                    actionMsg = "Press Enter to start again";
                }else{
                    // No more game data. End the game
                    msg = "You have completed the game!";
                    actionMsg = "Press Enter to start again";
                }
                buttonAction = function() {
                    this.audioAssets[this.endMusicKey]["stop"]();
                    this.startNew(); // start a new game
                    this.phaserGame["paused"] = false;  // just in case. Avoid pausing the game
                }.bind(this);
                //console.log("game over");
                this.showLevelCompleteDialogBox(msg, score, totalScore, actionMsg, buttonAction, title);
            }
        }
    },

    /**
     * Show the dialog box when completed the level
     * Override this to customise the dialog box appearance
     * @param bodyText
     * @param score
     * @param totalScore
     * @param actionMsg
     * @param buttonClickHandler
     * @param title
     */
    showLevelCompleteDialogBox: function(bodyText, score, totalScore, actionMsg, buttonClickHandler, title){
        title = title || "Congratulations!";

        this.setGameDialogBoxContentAndShow(
            title,
            bodyText,
            score,
            totalScore,
            actionMsg
        );
        this.addOnceDialogAction(buttonClickHandler, this);
    },

    /**
     * Loads the game data and starts the game
     */
    startGame: function(){
        ibgcgl(this.startGameLevel.bind(this), this.currentGameLevel);
    },

    // Restart just the current game level.
    // Call this if user requests to retry.
    // If you need to change, make sure to call this function from your own function.
    restartLevel: function (){
        this.statePlay.isLevelCleared = false;  // we haven't finished the current level yet.
        this.statePlay.isPlaying = false; // prevent update calls
        this.levelScore = 0;
        this.isPaused = false;

        this.resumePhysics();
        // Now start Play state
        this.statePlay.start(true); // set true to re-create the game
    },

    // Use this to recreate the dialog box during the game play to make it appear on the top
    createDialogBox: function(){
        this.setToBaseScaleMode();
        this.addGameDialogBox(this.dialogBoxKey);
        this.setToScaledMode();
    },

    // Show the loading progress. Call this in preload() of state
    showLoading: function(loadingMsg, x, y){
        _gitf038(this.gc_game_width, this.gc_game_height, loadingMsg);
    },

    // Hide loading message. Call this in create after loading and creating assets
    hideLoading: function(){
        _gitf039();
    },

    addTextToGameDialogBox: function(message, fontSize, fontName, fillColor, offsetY) {
        if (typeof message !=="undefined") { // "undefined.undefined") {
            var style = {
                "font":'' + fontSize + 'px ' + fontName,
                "fill":fillColor,
                "wordWrap": true,
                "wordWrapWidth": this.gameDialogBox["width"]-50
            };
            var text = Genari.phaserAddText(0, 0, message, style);
            text["x"] = Genari.calcBoxCenterX(this.gameDialogBox, text);
            text["y"] = Genari.calcBoxCenterY(this.gameDialogBox, text) + offsetY;
            text["fixedToCamera"] = true;
            this.gameDialogBox["addChild"](text);
        }
    }
};
Genari.Game.prototype.constructor = Genari.Game;  // set constructor property

/**
 * @deprecated Use pause()
 */
Genari.Game.prototype.pauseGame = function () {
    this.pause();
};

/**
 * When the pause button is pressed, we pause the game by disabling components.
 * Also display the pause dialogbox
 */
Genari.Game.prototype.pause = function () {
    this.isPaused = true;
    if(!this.statePlay || !this.statePlay.isPlaying)
        return false; // game level is not playing yet

    if(Genari.phaserGame["physics"]["arcade"])
        Genari.phaserGame["physics"]["arcade"]["isPaused"] = true;
    if(Genari.phaserGame["physics"]["p2"])
        Genari.phaserGame["physics"]["p2"]["paused"] = true;

    if(this.player)
        this.player.pause();
    if(this.audioAssets[this.backgroundMusicKey])
        this.audioAssets[this.backgroundMusicKey]["pause"]();

    this.gameControl.hideOnScreenButtons();

    // if you need to recreate the dialog box to appear on the top, uncomment this
    this.createDialogBox();

    // Show the pause dialog box
    this.setGameDialogBoxContentAndShow("Game Paused", "", -1, 0, "Click or press Enter to resume");

    // buttons
    var bx = (this.gameDialogBox["width"] / 2);
    var by = (this.gameDialogBox["height"] / 3 + 10);

    this.addButtonToDialogBox(bx, by, "exit", -115, this.startNew, this);
    this.addButtonToDialogBox(bx, by, "restart", 0, this.restartLevel, this);
    this.addButtonToDialogBox(bx, by, "resume", 118, this.resume, this);
    this.addOnceDialogAction(this.resume, this, false);

    return true;
};
Genari.Game.prototype["_pg"] = Genari.Game.prototype.pause;

/**
 * Load API classes when the game data is loaded. This must be called before creating the game.
 * @param {Function} [myClassLoader] If provided, this is called to load the classes of your game. Use this to initialize classes the classes extend classes defined here.
 */
Genari.loadClasses = function(myClassLoader){ // DEVELOPER_CODE REMOVE_FOR_THEME
    /*********************************************************************************************
     * Represent a statement with score.
     *
     * @constructor
     ********************************************************************************************/
    Genari.Statement = function(){
        if( !(this instanceof Genari.Statement)) return new Genari.Statement();
        this.word = "";
        this.score = 0;
        this.statement = null;
    };
    Genari.Statement.prototype.constructor = Genari.Statement;

    /**
     * Non-replacement sampling of statements. If all statements are retrieved, it starts from thebeginningg again.
     * @param reset Set to true to start from the beginning.
     */
    Genari.Statement.prototype.loadRandomStatement = function(reset){
        this.statement = Genari.getRandomStatement(reset);
        this.word = this.statement["word"];
        this.score = this.statement["score"];
    };

    /*********************************************************************************************
     * Use this to manage a group of display objects in the game: monsters, platforms, bullets
     * Extend this to customise for your game.
     *
     * @param {Object} layer Phaser.Group. Rendering layer of this group.
     * @param {boolean} [fixedToCamera] Default false. If set to true, it move with camera. The location is then camera offsets.
     * @param {boolean} [enableBody] Default true. If set to true, any objects added will have physics enables
     * @param {number} [physicsBodyType] Default 0. Phaser.Physics.ARCADE, Phaser.Physics.P2, Phaser.Physics.NINJA
     * @constructor
     * @extends {DCGroup}
     ********************************************************************************************/
    Genari.Group = function(layer, fixedToCamera, enableBody, physicsBodyType){
        if( !(this instanceof Genari.Group)) return new Genari.Group(layer, fixedToCamera, enableBody, physicsBodyType);  // make sure this refer to a Genari.Game
        DCGroup.call(this, layer, fixedToCamera, enableBody, physicsBodyType);
    };
    Genari.Group.prototype = Object.create(DCGroup.prototype); // extend Genari.Group
    Genari.Group.prototype.constructor = Genari.Group;

    /**
     * Return the number of display objects added to this group
     * @returns {number}
     * @override
     */
    Genari.Group.prototype.length = function(){
        return DCGroup.prototype.length.call(this);
    };

    /**
     * Return the Phaser Group of this group that holds all display objects added to this group.
     * @returns {Object} Phaser.Group
     * @override
     */
    Genari.Group.prototype.getGroup = function(){
        return DCGroup.prototype.getGroup.call(this);
    };

    /**
     * Checks for collision and separate objects if collide
     * @param {Object|Array} object The object that this group collide with. Can be Phaser.Sprite, Phaser.Group or Phaser.Particles.Emitter.
     * @param {Function} [overlapCallback] overlapCallback(an object in this group, object it collides with)
     * @param {Function} [processCallback]
     * @param {Object} [callbackContext]
     * @override
     */
    Genari.Group.prototype.checkCollision = function(object, overlapCallback, processCallback, callbackContext){
        return DCGroup.prototype.checkCollision.call(this, object, overlapCallback, processCallback, callbackContext);
    };

    /**
     * Add Physics collision to sprite
     * @param {Object|Array} object object or array of objects to check. Can be Phaser.Sprite, Phaser.Group or Phaser.Particles.Emitter.
     * @param {Function|null} [overlapCallback]
     * @param {Function|null} [processCallback]
     * @param {Object|null} [callbackContext]
     * @return {boolean} True if collision is detected.
     * @override
     */
    Genari.Group.prototype.checkOverlap = function(object, overlapCallback, processCallback, callbackContext){
        return DCGroup.prototype.checkOverlap.call(this, object, overlapCallback, processCallback, callbackContext);
    };

    /**
     * Add a Phaser display object as a child of the Phaser group, so they will move together
     * @param {Object} child Phaser display object
     * @override
     */
    Genari.Group.prototype.addChild = function(child){
        DCGroup.prototype.addChild.call(this, child);
    };

    /**
     * Add a Phaser image object and add as a child of this group.
     * @param {number} x
     * @param {number} y
     * @param {string} imageKey
     * @override
     */
    Genari.Group.prototype.addImage = function(x, y, imageKey){
        return DCGroup.prototype.addImage.call(this, x, y, imageKey);
    };

    /**
     * Add a control button
     *
     * @param {number} x
     * @param {number} y
     * @param {string} key The asset name that is already loaded
     * @param {Function} downAction method of an object will be called when clicked
     * @param {Function} upAction method of an object will be called when button is up
     * @param {Object} listenerContext the object to which the methods are attached to.
     * @param {number} [alpha] alpha of the button. 1 = opaque, 0 = completely transparent (invisible)
     * @param {boolean} [fixedToCamera] Set to false to allow it move
     *
     **/
    Genari.Group.prototype.addControlButton = function(x, y, key, downAction, upAction, listenerContext, alpha, fixedToCamera) {
        return DCGroup.prototype.addControlButton.call(this, x, y, key, downAction, upAction, listenerContext, alpha, fixedToCamera);
    };

    /**
     * Set tileMap to be use with this group. All tileMap related operations will performed with this tileMap
     * @param tileMap
     * @override
     */
    Genari.Group.prototype.setTileMap = function(tileMap){
        DCGroup.prototype.setTileMap.call(this, tileMap);
    };

    /**
     * Pause animation of all objects in this group
     * @override
     */
    Genari.Group.prototype.pause = function(){
        DCGroup.prototype.pause.call(this);
    };

    /**
     * Resume animation of all objects in this group
     * @override
     */
    Genari.Group.prototype.resume = function(){
        DCGroup.prototype.resume.call(this);
    };

    /**
     * Add a sprite to the group
     * @param {number} x
     * @param {number} y
     * @param {string} key
     * @param {number|null} [frame]
     * @return {Object} Phaser display object
     * @override
     */
    Genari.Group.prototype.create = function(x, y, key, frame){
        return DCGroup.prototype.create.call(this, x, y, key, frame);
    };

    /**
     * Set property of all display objects in this group
     * @param {string} propertyName
     * @param {string|number} value
     * @override
     */
    Genari.Group.prototype.setAll = function(propertyName, value){
        DCGroup.prototype.setAll.call(this, propertyName, value);
    };

    /**
     * Create group items from tilemap
     * We can import sprites and location information from tileemap into a Phaser Group.
     * See http://phaser.io/docs/2.4.4/Phaser.Tilemap.html#createFromObjects
     *
     * @param {Phaser.TileMap} tileMap
     * @param {string} name The object layer name in Tiled.
     * @param {number|string} gid Object name in the object layer in Tiled
     * @param {string} key The loaded tileset image asset key. This must be loaded before called
     * @param {number | string} [frame]	If the Sprite image contains multiple frames you can specify which one to use here.
     * @param {boolean} [exists] true The default exists state of the Sprite.
     * @param {boolean} [autoCull] false The default autoCull state of the Sprite. Sprites that are autoCulled are culled from the camera if out of its range.
     * @param {Object} [CustomClass] Phaser.Sprite If you wish to create your own class, rather than Phaser.Sprite, pass the class here. Your class must extend Phaser.Sprite and have the same constructor parameters.
     * @param {boolean} [adjustY] true By default the Tiled map editor uses a bottom-left coordinate system. Phaser uses top-left. So most objects will appear too low down. This parameter moves them up by their height.
     * @override
     */
    Genari.Group.prototype.createFromObjects = function(tileMap, name, gid, key, frame, exists, autoCull, CustomClass, adjustY){
        DCGroup.prototype.createFromObjects.call(this, tileMap, name, gid, key, frame, exists, autoCull, CustomClass, adjustY);
    };

    /**
     * Import objects from an ojbect layer in TileMap. We can use this as locations of objects to be spawned.
     *
     * @param {Phaser.Group} group
     * @param {Phaser.TileMap} tileMap
     * @param {string} name The object layer name in Tiled.
     * @param {number|string} gid Object name in the object layer in Tiled
     * @param {string} key The loaded tileset image asset key. This must be loaded before called
     * @param {number | string} [frame]	If the Sprite image contains multiple frames you can specify which one to use here.
     * @param {boolean} [exists] true The default exists state of the Sprite.
     * @param {boolean} [autoCull] false The default autoCull state of the Sprite. Sprites that are autoCulled are culled from the camera if out of its range.
     * @param {Object} [CustomClass] Phaser.Sprite If you wish to create your own class, rather than Phaser.Sprite, pass the class here. Your class must extend Phaser.Sprite and have the same constructor parameters.
     * @param {boolean} [adjustY] true By default the Tiled map editor uses a bottom-left coordinate system. Phaser uses top-left. So most objects will appear too low down. This parameter moves them up by their height.
     * @return {Object} Phaser.Group with the objects imported.
     */
    Genari.Group.prototype.createRefObjsFromTileMap = function(group, tileMap, name, gid, key, frame, exists, autoCull, CustomClass, adjustY){
        return DCGroup.prototype.createRefObjsFromTileMap.call(this, group, tileMap, name, gid, key, frame, exists, autoCull, CustomClass, adjustY);
    };

    /**
     * Add a sprite. Sprite can have animations set.
     * @param x
     * @param y
     * @param key
     * @param frame
     * @override
     */
    Genari.Group.prototype.addSprite = function(x,y, key, frame){
        return DCGroup.prototype.addSprite.call(this, x,y, key, frame);
    };


    /**
     * Draw a line in this group
     * @param {number} sx
     * @param {number} sy
     * @param {number} ex
     * @param {number} ey
     * @param {number|null} [lineWidth]
     * @param {number|null} [color]
     * @param {number|null} [alpha]
     * @param {Object|null} [previousLine] Phaser.Graphic
     * @override
     */
    Genari.Group.prototype.drawLine = function(sx, sy, ex, ey, lineWidth, color, alpha, previousLine) {
        return DCGroup.prototype.drawLine.call(this, sx, sy, ex, ey, lineWidth, color, alpha, previousLine);
    };

    /**
     * Add animation for a sprite
     * @param {Object} sprite Phaser.Sprite
     * @param {string} animationName
     * @param {Array} [frames]
     * @param {number} [frameRate]
     * @param {boolean} [loop]
     * @param {boolean} [useNumericIndex]
     * @override
     */
    Genari.Group.prototype.addAnimation = function(sprite, animationName, frames, frameRate, loop, useNumericIndex){
        DCGroup.prototype.addAnimation.call(this, sprite, animationName, frames, frameRate, loop, useNumericIndex);
    };

    /**
     * Add animation for a sprite
     * @param {string} animationName
     * @param {Array} [frames]
     * @param {number} [frameRate]
     * @param {boolean} [loop]
     * @param {boolean} [useNumericIndex]
     * @override
     */
    Genari.Group.prototype.addAnimationToAll = function(animationName, frames, frameRate, loop, useNumericIndex){
        DCGroup.prototype.addAnimationToAll.call(this, animationName, frames, frameRate, loop, useNumericIndex);
    };

    /**
     * Play animation for the sprite and set speed of the invader if enabled physics
     * @param {Object} sprite
     * @param {string} name Name of the animation sequence, which must be added previously using addAnimation()
     * @param {number} [xSpeed]
     * @param {number} [ySpeed]
     * @param {number|null} [frameRate] Default 30
     * @param {number|null} [loop] Default false
     * @param {number|null} [killOnComplete] Deafult false
     * @override
     */
    Genari.Group.prototype.playAnimation = function(sprite, name, xSpeed, ySpeed, frameRate, loop, killOnComplete){
        DCGroup.prototype.playAnimation.call(this, sprite, name, xSpeed, ySpeed, frameRate, loop, killOnComplete);
    };

    /**
     * Get idx child
     * @param idx
     * @returns {Object} Phaser display object
     * @override
     */
    Genari.Group.prototype.getChild = function(idx){
        return DCGroup.prototype.getChild.call(this, idx);
    };

    /**
     * Get X coordinate of idx child
     * @param idx
     * @returns {number}
     * @override
     */
    Genari.Group.prototype.getChildX = function(idx){
        return DCGroup.prototype.getChildX.call(this, idx);
    };

    /**
     * Get Y coordinate of idx child
     * @param idx
     * @returns {number}
     * @override
     */
    Genari.Group.prototype.getChildY = function(idx){
        return DCGroup.prototype.getChildY.call(this, idx);
    };

    /**
     * Set speed
     * @param {Object} sprite
     * @param {number} [xSpeed]
     * @param {number} [ySpeed]
     * @override
     */
    Genari.Group.prototype.setSpeed = function(sprite, xSpeed, ySpeed){
        DCGroup.prototype.setSpeed.call(this, sprite, xSpeed, ySpeed);
    };

    /**
     * Move a display object
     * @param {Object} object
     * @param {number} x
     * @param {number} y
     * @override
     */
    Genari.Group.prototype.moveTo = function(object, x, y){
        DCGroup.prototype.moveTo.call(this, object, x, y);
    };

    /**
     * Destroy all display objects in the group
     * @param destroyChildren
     * @param soft
     * @override
     */
    Genari.Group.prototype.destroy = function(destroyChildren, soft){
        DCGroup.prototype.destroy.call(this, destroyChildren, soft);
    };

    /**
     * Use this in callback functions for overlap or collision detection.
     * One of the object is a member of this group.
     * Sort the objects based on membership.
     * The first object returned is a member of this group.
     * @param {Object} object1
     * @param {Object} object2
     * @returns {Array} [MemberObject, nonMemberObject]
     * @override
     */
    Genari.Group.prototype.getObjInGroup = function(object1, object2){
        return DCGroup.prototype.getObjInGroup.call(this, object1, object2);
    };

    /**
     * Scan the tileMapLayer and mark the cells (value >0) in where tiles are.
     * Use this to place pickup items on the grid of the world.
     * @param {Object} tileMapLayer. The layer you create when imported a tileMap. If you've created your map in Tiled then you can get this by looking in Tiled and looking at the Layer name. Or you can open the JSON file it exports and look at the layers[].name value. Either way it must match.
     * @param {number|null} [gridWidth] The width of the grid cell. Default 16
     * @param {number|null} [gridHeight] The height of the grid cell. Default 16
     * @param {number|null} [marginXN1] The first marginXN1 columns will be blocked. Default 0
     * @param {number|null} [marginXN2] The last marginXN2 columns will be blocked. Default 0
     * @param {number|null} [marginYN1] The first marginYN1 rows will be blocked. Default 0
     * @param {number|null} [marginYN2] The last marginYN2 rows will be blocked. Default 0
     * @return {Array} grid. 2 dimensional array of columns and rows of cells. grid[column:X][row:Y] > 0 if there is a tile.
     * @override
     */
    Genari.Group.prototype.setupGrid = function(tileMapLayer, gridWidth, gridHeight, marginXN1, marginXN2, marginYN1, marginYN2) {
        return DCGroup.prototype.setupGrid.call(this, tileMapLayer, gridWidth, gridHeight, marginXN1, marginXN2, marginYN1, marginYN2);
    };

    /**
     * Configure the grid for this group
     * @param {Object} tileMapLayer Phaser.TileMapLayer you created
     * @param {number} gridWidth
     * @param {number} gridHeight
     * @param {Array} grid. 2 dimensional array of columns and rows of cells. grid[column:X][row:Y] > 0 if there is a tile.
     * @override
     */
    Genari.Group.prototype.setGrid = function(tileMapLayer, gridWidth, gridHeight, grid) {
        DCGroup.prototype.setGrid.call(this, tileMapLayer, gridWidth, gridHeight, grid);
    };

    /*********************************************************************************************
     * Use this to manage a group of wordbox display objects
     *
     * @param {Object} layer Phaser.Group. Rendering layer of this group.
     * @param {boolean} [fixedToCamera] If set to true, it move with camera. The location is then camera offsets.
     * @param {boolean} [enableBody] If set to true, any objects added will have physics enables
     * @param {number} [physicsBodyType] Default 0. Phaser.Physics.ARCADE, Phaser.Physics.P2, Phaser.Physics.NINJA
     * @constructor
     * @extends {DCWordBoxGroup}
     ********************************************************************************************/
    Genari.WordBoxGroup = function(layer, fixedToCamera, enableBody, physicsBodyType) {
        if (!(this instanceof Genari.WordBoxGroup)) return new Genari.WordBoxGroup(layer, fixedToCamera, enableBody, physicsBodyType);  // make sure this refer to a Genari.Game
        DCWordBoxGroup.call(this, layer, fixedToCamera, enableBody, physicsBodyType);
    };
    Genari.WordBoxGroup.prototype = Object.create(DCWordBoxGroup.prototype); // extend Genari.Group
    Genari.WordBoxGroup.prototype.constructor = Genari.WordBoxGroup;  // set constructor property

    /**
     * Create a sprite for physics body, add an image, and text on top of the image.
     * @param {number} x
     * @param {number} y
     * @param {string|Object} statement  the answer data or the sentence to fit in the box. Font is scaled automatically to fit in to box
     * @param {number|null} score + means correct, - means incorrect words
     * @param {string} [imageKey] Optional image to add
     * @param {number} [width]    If not given, the image size is used.
     * @param {number} [height]
     * @param {string} [align] vertical text align. "center", "top", "bottom", Default "center"
     * @param {number|null} [maxFontSize] Default 16
     * @return {Object} Phaser sprite Returns the sprite containing the image and text
     * @override
     */
    Genari.WordBoxGroup.prototype.addImageTextBox = function(x, y, statement, score, imageKey, width, height, align, maxFontSize){
        return DCWordBoxGroup.prototype.addImageTextBox.call(this, x, y, statement, score, imageKey, width, height, align, maxFontSize);
    };

    /**
     * Create a group with arcade physics enabled, and add a sprite.
     * Text is added on top of the sprite centered correctly. Font size is fixed 20px.
     * The returned group has body and can be set velocity and collidable.
     * @param {number} x
     * @param {number} y
     * @param {string|Object} statement  The word or sentence to fit in the box. Font is scaled automatically to fit in to box
     * @param {number} score      + means correct, - means incorrect words
     * @param {string} [spriteKey] Optional sprite to add under the text. E.g., a crate, jelly
     * @param {number} [frame] The initial frame number of the sprite
     * @param {Array} [spriteScale] [scaleX, scaleY]
     * @param {Array} [textOffset] [x, y]
     * @param {number} [textBoxWidth]
     * @param {number} [textBoxHeight]
     * @param {string} [align] vertical text align. "center", "top", "bottom", Default "center"
     * @param {number|null} [maxFontSize] Default 16
     * @return {Object} Returns a Phaser sprite containing the sprite and text
     * @override
     */
    Genari.WordBoxGroup.prototype.addSpriteTextBox = function(
        x, y, statement, score, spriteKey, frame, spriteScale,
        textOffset, textBoxWidth, textBoxHeight, align, maxFontSize){
        return DCWordBoxGroup.prototype.addSpriteTextBox.call(this, x, y, statement, score, spriteKey, frame, spriteScale, textOffset, textBoxWidth, textBoxHeight, align, maxFontSize);
    };

    /*********************************************************************************************
     * Use this to manage a group of platform display objects in the game
     *
     * @param {Object} layer Phaser.Group. Rendering layer of this group.
     * @param {boolean} [fixedToCamera] If set to true, it move with camera. The location is then camera offsets.
     * @param {boolean} [enableBody] If set to true, any objects added will have physics enables
     * @param {number} [physicsBodyType] Default 0. Phaser.Physics.ARCADE, Phaser.Physics.P2, Phaser.Physics.NINJA
     * @constructor
     * @extends {DCPlatformGroup}
     ********************************************************************************************/
    Genari.PlatformGroup = function(layer, fixedToCamera, enableBody, physicsBodyType) {
        if (!(this instanceof Genari.PlatformGroup)) return new Genari.PlatformGroup(layer, fixedToCamera, enableBody, physicsBodyType);  // make sure this refer to a Genari.Game
        DCPlatformGroup.call(this, layer, fixedToCamera, enableBody, physicsBodyType);
    };
    Genari.PlatformGroup.prototype = Object.create(DCPlatformGroup.prototype); // extend Genari.Group
    Genari.PlatformGroup.prototype.constructor = Genari.PlatformGroup;  // set constructor property

    /**
     * Add a ground platform at the location.
     * @param {number} x
     * @param {number} y
     * @param {string} key
     * @override
     */
    Genari.PlatformGroup.prototype.addPlatform = function(x, y, key){
        return DCPlatformGroup.prototype.addPlatform.call(this, x, y, key);
    };

    /*********************************************************************************************
     * Use this to manage a group of platform display objects in the game
     *
     * @param {Object} layer Phaser.Group. Rendering layer of this group.
     * @param {boolean} [fixedToCamera] If set to true, it move with camera. The location is then camera offsets.
     * @param {boolean} [enableBody] If set to true, any objects added will have physics enables
     * @param {number} [physicsBodyType] Default 0. Phaser.Physics.ARCADE, Phaser.Physics.P2, Phaser.Physics.NINJA
     * @constructor
     * @extends {DCBulletGroup}
     ********************************************************************************************/
    Genari.BulletGroup = function(layer, fixedToCamera, enableBody, physicsBodyType) {
        if (!(this instanceof Genari.BulletGroup)) return new Genari.BulletGroup(layer, fixedToCamera, enableBody, physicsBodyType);  // make sure this refer to a Genari.Game
        DCBulletGroup.call(this, layer, fixedToCamera, enableBody, physicsBodyType);
    };
    Genari.BulletGroup.prototype = Object.create(DCBulletGroup.prototype); // extend Genari.Group
    Genari.BulletGroup.prototype.constructor = Genari.BulletGroup;  // set constructor property

    /**
     * Return the number of bullets alive
     * @return {number}
     * @override
     */
    Genari.BulletGroup.prototype.getBulletCount = function(){
        return DCBulletGroup.prototype.getBulletCount.call(this);
    };

    /**
     * Add a bullet object to the group
     * @param {number} x
     * @param {number} y
     * @param {string|null} [key] Default null
     * @param {number|null} [xSpeed]
     * @param {number|null} [ySpeed]
     * @param {number|null} [maxDistance] Default 100
     * @param {number|null} [angle] Default 0. Values from 0 to 180 represent clockwise rotation; values from 0 to -180 represent counterclockwise rotation.
     * @param {boolean|null} [animate] Default false. If set to true, animate using all available frames or the given frames
     * @param {Array|null} [frames] Default null (use all available frames). List of frame numbers for the animation
     * @param {number|null} [frameRate] Default 15
     * @param {boolean|null} [loop] Default true.
     * @return {Object} Phaser sprite
     * @override
     */
    Genari.BulletGroup.prototype.addBullet = function(x, y, key, xSpeed, ySpeed, maxDistance, angle, animate, frames, frameRate, loop){
        return DCBulletGroup.prototype.addBullet.call(this, x, y, key, xSpeed, ySpeed, maxDistance, angle, animate, frames, frameRate, loop);
    };

    /**
     * Add a bullet object to the group
     * ** This method calls addBullet!! Do not call this method from addBullet!!
     * @param {number} x
     * @param {number} y
     * @param {string|null} [key] Default null
     * @param {number|null} [speed]
     * @param {number|null} [dirAngle] Bullet direction degrees. 0 right, 90 down, 180 left, 270 (-90) up
     * @param {number|null} [maxDistance] Default 100
     * @param {number|null} [spriteAngle] Default 0. Angle in degrees.
     * @param {boolean|null} [animate] Default false. If set to true, animate using all available frames or the given frames
     * @param {Array|null} [frames] Default null (use all available frames). List of frame numbers for the animation
     * @param {number|null} [frameRate] Default 15
     * @param {boolean|null} [loop] Default true
     * @return {Object} Phaser sprite
     * @override
     */
    Genari.BulletGroup.prototype.addBulletWithAngle = function(x, y, key, speed, dirAngle, maxDistance, spriteAngle, animate, frames, frameRate, loop) {
        return DCBulletGroup.prototype.addBulletWithAngle.call(this, x, y, key, speed, dirAngle, maxDistance, spriteAngle, animate, frames, frameRate, loop);
    };

    /**
     * Add a line to a bullet object
     * @param {Object} bullet Phaser.Sprite
     * @param {number|null} [sx]
     * @param {number|null} [sy]
     * @param {number|null} [lineWidth]
     * @param {number|null} [color]
     * @param {number|null} [alpha]
     * @param {number|null} [eXOffset]
     * @param {number|null} [eYOffset]
     * @return {Object} Phaser Graphics Line
     * @override
     */
    Genari.BulletGroup.prototype.addLineToBullet = function(bullet, sx, sy, lineWidth, color, alpha, eXOffset, eYOffset){
        return DCBulletGroup.prototype.addLineToBullet.call(this, bullet, sx, sy, lineWidth, color, alpha, eXOffset, eYOffset);
    };

    /**
     * Check bullet and kill if travelled the max distance or out of the speed range
     * Call this in State.update()
     * @param {Object} [bullet] Phaser display object
     * @override
     */
    Genari.BulletGroup.prototype.killBullet = function(bullet) {
        DCBulletGroup.prototype.killBullet.call(this, bullet);
    };

    /**
     * Check bullet and kill if travelled the max distance or out of the speed range
     * Call this in State.update()
     * @param {number} [sx] Line start x if a line is drawn for the bullets
     * @param {number} [sy]
     * @override
     */
    Genari.BulletGroup.prototype.updateBullets = function(sx, sy){
        DCBulletGroup.prototype.updateBullets.call(this, sx, sy);
    };


    /*********************************************************************************************
     * Use this to manage a group of pickups. Extend this for your own pickup.
     *
     * @param {Object} layer Phaser.Group. Rendering layer of this group.
     * @param {boolean} [fixedToCamera] If set to true, it move with camera. The location is then camera offsets.
     * @param {boolean} [enableBody] If set to true, any objects added will have physics enables
     * @param {number} [physicsBodyType] Default 0. Phaser.Physics.ARCADE, Phaser.Physics.P2, Phaser.Physics.NINJA
     * @constructor
     * @extends {DCPickupGroup}
     ********************************************************************************************/
    Genari.PickupGroup = function(layer, fixedToCamera, enableBody, physicsBodyType) {
        if (!(this instanceof Genari.PickupGroup)) return new Genari.PickupGroup(layer, fixedToCamera, enableBody, physicsBodyType);  // make sure this refer to a Genari.Game
        DCPickupGroup.call(this, layer, fixedToCamera, enableBody, physicsBodyType);
    };
    Genari.PickupGroup.prototype = Object.create(DCPickupGroup.prototype); // extend Genari.Group
    Genari.PickupGroup.prototype.constructor = Genari.PickupGroup;  // set constructor property

    /**
     * Add pickup items on the grid of the world
     * Must setup the grid first by calling setupGrid()
     * @param {Object} spriteKey
     * @param {number|null} [placementRate] Default 0.5
     * @param {boolean|null} [animate] Default false
     * @param {Array|null} [frames] Default null
     * @param {boolean|null} [loop] Default null
     * @param {Function|null} [callBackForPlacement] Default null
     * @param {Object|null} [callbackContext] Default null
     * @override
     */
    Genari.PickupGroup.prototype.addPickupsOnTileMap = function(spriteKey, placementRate, animate, frames, loop, callBackForPlacement, callbackContext) {
        DCPickupGroup.prototype.addPickupsOnTileMap.call(this, spriteKey, placementRate, animate, frames, loop, callBackForPlacement, callbackContext);
    };

    /*********************************************************************************************
     * Represents a question
     *
     * @constructor
     * @extends {DCQuestion}
     ********************************************************************************************/
    Genari.Question = function() {
        if (!(this instanceof Genari.Question)) {
            return new Genari.Question();
        }
        DCQuestion.call(this);
        this.effectOn = false;
    };
    Genari.Question.prototype = Object.create(DCQuestion.prototype); // extend DCQuestion
    Genari.Question.prototype.constructor = Genari.Question;  // set constructor property

    /**
     * Get a next randome question. Return null if there are no more questions.
     * @param {boolean} [resetIdx] Set to true to reset the index: start from the beginning.
     * @return {Array|null}
     *                  [  qNo,
     *                    "question",
     *                    correctChoiceNo, iconUrl, img1Url,
     *                    ["choice1 text", imgUrl],
     *                    ["choice2 text", imgUrl],
     *                    ["choice3 text", imgUrl],
     *                    ["choice4 text", imgUrl]
     *                  ]
     *                 Returns an empty array if there are no more questions. You can set resetIdx to true to start again.
     *                 If there is no image, url = null
     *                 See the returned urls for debugging.
     *                 For testing, replace files_N.png etc with your own images.
     * @override
     **/
    Genari.Question.prototype.getNextQuestion = function(resetIdx){
        return DCQuestion.prototype.getNextQuestion.call(this, resetIdx);
    };
    /**
     * @returns {number}
     * @override
     */
    Genari.Question.prototype.getQuestionNo = function(){
        return DCQuestion.prototype.getQuestionNo.call(this);
    };
    /**
     * @returns {number}
     * @override
     */
    Genari.Question.prototype.getCorrectChoiceNo = function(){
        return DCQuestion.prototype.getCorrectChoiceNo.call(this);
    };
    /**
     * @returns {Object}
     * @override
     */
    Genari.Question.prototype.getChoiceSndKey = function(choiceNo){
        return DCQuestion.prototype.getChoiceSndKey.call(this, choiceNo);
    };
    /**
     * Show the current question
     * @param [fileComplete]
     * @param [loadComplete]
     * @param [callBackContext]
     * @override
     */
    Genari.Question.prototype.loadQuestionAssets = function(fileComplete, loadComplete, callBackContext){
        DCQuestion.prototype.loadQuestionAssets.call(this, fileComplete, loadComplete, callBackContext);
    };

    /**
     * Create a box to hold image of the current question and a text box to hold the question text
     *
     * @param {number} x
     * @param {number} y
     * @param {string} questionImgBoxImgKey Default "blueBackground"
     * @param {string} textBoxFrameImgKey Default "blueBackground"
     * @param {number} imgWidth
     * @param {number} imgHeight
     * @param {number} textBoxHeight
     * @param {number} space
     * @param {Object} layer
     * @returns {*}
     * @override
     */
    Genari.Question.prototype.addQuestionBoxes = function(
        x, y,
        questionImgBoxImgKey, textBoxFrameImgKey,
        imgWidth, imgHeight,
        textBoxHeight, space, layer) {
        return DCQuestion.prototype.addQuestionBoxes.call(
            this,
            x, y, questionImgBoxImgKey, textBoxFrameImgKey, imgWidth, imgHeight, textBoxHeight, space, layer);
    };

    /**
     * Create 2 to 4 (answer) choice boxes for the question and show.
     * @param x
     * @param y
     * @param {string} twoFrameImgKey
     * @param {string} fourFrameImgKey
     * @param boxWidth
     * @param boxHeight
     * @param space Gap between buttons/boxes in pixels
     * @param {Function} [clickHandler]
     * @override
     */
    Genari.Question.prototype.addChoices = function(x, y, twoFrameImgKey, fourFrameImgKey, boxWidth, boxHeight, space, clickHandler) {
        DCQuestion.prototype.addChoices.call(this, x, y, twoFrameImgKey, fourFrameImgKey, boxWidth, boxHeight, space, clickHandler);
    };
    /**
     * @override
     */
    Genari.Question.prototype.destroy = function() {
        DCQuestion.prototype.destroy.call(this);
    };

    /*********************************************************************************************
     * Draw a world minimap
     * @param {string} mapSpriteKey Map sprite key
     * @param {number} x
     * @param {number} y
     * @param {Object} playerSprite Phaser.Sprite
     * @param {number} scaleFactor Scale of the map. The coordinates of monsters around the player are scaled to this factor. E.g., (minimap_width) / (world_width *2)
     * @param {number} [mapSize] size of the map. Default the size of the sprite
     * @param {Object} [layer] Phaser Group. The rendering layer
     * @constructor
     * @extends {DCPlayerMap}
     ********************************************************************************************/
    Genari.MiniMap = function (mapSpriteKey, x, y, playerSprite, scaleFactor, mapSize, layer) {
        if (!(this instanceof Genari.MiniMap)) return new Genari.MiniMap(mapSpriteKey, x, y, playerSprite, scaleFactor, mapSize, layer);  // make sure this refer to a Genari.Game
        DCPlayerMap.call(this, mapSpriteKey, x, y, playerSprite, scaleFactor, mapSize, layer);
    };
    Genari.MiniMap.prototype = Object.create(DCPlayerMap.prototype); // extend DCPlayerMap
    Genari.MiniMap.prototype.constructor = Genari.MiniMap;  // set constructor property
    /**
     * Draw a dot of monster in the map
     * @param {Object} monsters Phaser.Sprite
     * @override
     */
    Genari.MiniMap.prototype.drawMonsters = function (monsters){
        DCPlayerMap.prototype.drawMonsters.call(this, monsters);
    };
    /**
     * Draw a dot of monster in the map
     * @param {Object} monster Phaser.Sprite
     * @override
     */
    Genari.MiniMap.prototype.drawLocation = function (monster){
        DCPlayerMap.prototype.drawLocation.call(this, monster);
    };
    /**
     * If a monster died, remove it from the map
     * @param {Object} monster Phaser.sprite
     * @override
     */
    Genari.MiniMap.prototype.removeDot = function (monster){
        DCPlayerMap.prototype.removeDot.call(this, monster);
    };

    /*********************************************************************************************
     * Creates a type of progress bar.
     * @param {number} x The horizontal position (x-coordinate) of the progress bar, i.e. frame
     * @param {number} y The horizontal position (x-coordinate) of the progress bar, i.e. frame
     * @param {number|null} frameWidth Width of the bar
     * @param {number} frameHeight
     * @param {number} initialNumber The number to be displayed when the bar is first created.
     * @param {number} minNumber The number which is represented by the starting point.
     * @param {number} maxNumber The number which is represented by the ending point.
     * @param {string} frameKey The sprite key which is used to be the frame of progress bar.
     * @param {string} barKey The sprite key which is used to be the bar itself.
     * @param {Object} [layer] Phaser Group
     * @param {number} [barXoffset] The horizontal position (x-coordinate) of the progress bar, i.e. frame
     * @param {number} [barYoffset] The horizontal position (x-coordinate) of the progress bar, i.e. frame
     * @param {number} [barWidth] The horizontal position (x-coordinate) of the progress bar, i.e. frame
     * @param {number} [barHeight] The horizontal position (x-coordinate) of the progress bar, i.e. frame
     * @constructor
     * @extends {DCCounterBar}
     ********************************************************************************************/
    Genari.CounterBar = function(x, y, frameWidth, frameHeight, initialNumber, minNumber, maxNumber, frameKey, barKey, layer, barXoffset, barYoffset, barWidth, barHeight) {
        if (!(this instanceof Genari.CounterBar)) return new Genari.CounterBar(
            x, y, frameWidth, frameHeight, initialNumber, minNumber, maxNumber, frameKey, barKey, layer, barXoffset, barYoffset, barWidth, barHeight);
        DCCounterBar.call(this, x, y, frameWidth, frameHeight, initialNumber, minNumber, maxNumber, frameKey, barKey, layer, barXoffset, barYoffset, barWidth, barHeight);
    };
    Genari.CounterBar.prototype = Object.create(DCCounterBar.prototype); // extend DCCounterBar
    Genari.CounterBar.prototype.constructor = Genari.CounterBar;         // set constructor property
    /**
     * Set the value of the bar to given value.
     * @return {number} current value
     * @override
     */
    Genari.CounterBar.prototype.getValue = function() {
        return DCCounterBar.prototype.getValue.call(this);
    };
    /**
     * Set the value of the bar to given value.
     * @param {number} barValue The value which is to be set.
     * @override
     */
    Genari.CounterBar.prototype.setValue = function(barValue) {
        DCCounterBar.prototype.setValue.call(this, barValue);
    };
    /**
     * Set the value of the bar to given value.
     * @param {number} xOffset
     * @param {number} yOffset
     */
    Genari.CounterBar.prototype.moveBar = function(xOffset,yOffset) {
        DCCounterBar.prototype.moveBar.call(this, xOffset,yOffset);
    };

    /*********************************************************************************************
     * The class of timer object.
     * @param {number} x The horizontal position (x-coordinate) of the progress bar, i.e. frame
     * @param {number} y The horizontal position (x-coordinate) of the progress bar, i.e. frame
     * @param {number} width Width of the bar
     * @param {number} height
     * @param {number} initialNumber The number to be displayed when the bar is first created.
     * @param {number} minNumber The number which is represented by the starting point.
     * @param {number} maxNumber The number which is represented by the ending point.
     * @param {string} frameKey The sprite key which is used to be the frame of progress bar.
     * @param {string} barKey The sprite key which is used to be the bar itself.
     * @param {Object} [layer] Phaser Group
     * @param {number} [barXoffset] The horizontal position (x-coordinate) of the progress bar, i.e. frame
     * @param {number} [barYoffset] The horizontal position (x-coordinate) of the progress bar, i.e. frame
     * @constructor
     * @extends {DCTimerBar}
     ********************************************************************************************/
    Genari.TimerBar = function(x, y, width, height, initialNumber, minNumber, maxNumber, frameKey, barKey, layer, barXoffset, barYoffset) {
        if (!(this instanceof Genari.TimerBar))
            return new Genari.TimerBar(x, y, width, height, initialNumber, minNumber, maxNumber, frameKey, barKey, layer, barXoffset, barYoffset);
        DCTimerBar.call(this, x, y, width, height, initialNumber, minNumber, maxNumber, frameKey, barKey, layer, barXoffset, barYoffset);
    };
    Genari.TimerBar.prototype = Object.create(DCTimerBar.prototype); // extend DCTimerBar
    Genari.TimerBar.prototype.constructor = Genari.TimerBar;         // set constructor property
    /**
     * Reset time
     * @return {number} Return the remaining time
     * @override
     */
    Genari.TimerBar.prototype.stopTimer = function() {
        return DCTimerBar.prototype.stopTimer.call(this);
    };
    /**
     * Pause timer
     * @override
     */
    Genari.TimerBar.prototype.pauseTimer = function() {
        DCTimerBar.prototype.pauseTimer.call(this);
    };
    /**
     * resume timer
     * @override
     */
    Genari.TimerBar.prototype.resumeTimer = function() {
        DCTimerBar.prototype.resumeTimer.call(this);
    };
    /**
     * Update timer bar and get the remaining time
     * @return {number} Return the remaining time
     * @override
     */
    Genari.TimerBar.prototype.updateBar = function() {
        return DCTimerBar.prototype.updateBar.call(this);
    };
    /**
     * tick timer
     * @return {number} Return the remaining time
     * @override
     */
    Genari.TimerBar.prototype.reduceTime = function() {
        return DCTimerBar.prototype.reduceTime.call(this);
    };

    /*********************************************************************************************
     * Creates score box which displays the score.
     * @param {string} [key] Sprite key
     * @param {number} [size] size of the number blocks (width and height)
     * @param {number} [endX]  The x-coordinate of the last reel.
     * @param {number} [y] The y-coordinate of the reels.
     * @param {Object} [layer] Phaser.Group
     *
     * @constructor
     * @extends {DCScoreBox}
     ********************************************************************************************/
    Genari.ScoreBox = function(key, size, endX, y, layer) {
        if (!(this instanceof Genari.ScoreBox)) return new Genari.ScoreBox(key, size, endX, y, layer);
        DCScoreBox.call(this, key, size, endX, y, layer);
    };
    Genari.ScoreBox.prototype = Object.create(DCScoreBox.prototype); // extend DCScoreBox
    Genari.ScoreBox.prototype.constructor = Genari.ScoreBox;         // set constructor property

    /**
     * Get the current score value
     * @return {number} current score
     * @override
     */
    Genari.ScoreBox.prototype.getValue = function() {
        return DCScoreBox.prototype.getValue.call(this);
    };

    /**
     * This function gains the score by given amount of score.
     * @param {number} score How much score is added.
     * @override
     */
    Genari.ScoreBox.prototype.gainScore = function(score) {
        DCScoreBox.prototype.gainScore.call(this, score);
    };

    /**
     * This function reduces the score by given amount of score.
     * @param {number} score How much score is subtracted.
     * @param {Function} callBack
     * @override
     */
    Genari.ScoreBox.prototype.reduceScore = function(score, callBack) {
        DCScoreBox.prototype.reduceScore.call(this, score, callBack);
    };

    /**********************************************************************************
     * Create user icon and life text box
     * @param [layer]
     * @constructor
     * @extends {DCHud}
     *********************************************************************************/
    Genari.Hud = function(layer) {
        if (!(this instanceof Genari.Hud)) return new Genari.Hud(layer);
        DCHud.call(this, layer);
    };
    Genari.Hud.prototype = Object.create(DCHud.prototype); // extend DCHud
    Genari.Hud.prototype.constructor = Genari.Hud;         // set constructor property
    /**
     * Add UserPhoto
     * @param x
     * @param y
     * @param userPhotoImgKey user portrait image
     * @param [photoFrameImgKey] image asset key for the frame of the photo
     * @param [height]
     * @return {Object} Phaser.sprite
     * @override
     */
    Genari.Hud.prototype.addUserPhoto = function(x, y, userPhotoImgKey, photoFrameImgKey, height){
        return DCHud.prototype.addUserPhoto.call(this, x, y, userPhotoImgKey, photoFrameImgKey, height);
    };
    /**
     * Add Top bar. Hud Background
     * @param [x] Default 0
     * @param [y] Default -5
     * @param [key] Phaser.Sprite asset key. Default 'topBarImage'
     * @param width
     * @param [height]
     * @return {Object} Phaser.Sprite
     * @override
     */
    Genari.Hud.prototype.addTopBar = function(x, y, key, width, height){
        return DCHud.prototype.addTopBar.call(this, x, y, key, width, height);
    };
    /**
     * Add level text
     *
     * @param {number} game_width
     * @param {number} y
     * @param {string} text
     * @param {Object} style
     * @return {Object} Phaser.Sprite
     * @override
     */
    Genari.Hud.prototype.addLevelText = function(game_width, y, text, style) {
        return DCHud.prototype.addLevelText.call(this, game_width, y, text, style);
    };
    /**
     * Add Game objective Text
     *
     * @param {number} game_width
     * @param {number} y
     * @param {string} text
     * @param {Object} style
     * @return {Object} Phaser.Sprite
     * @override
     */
    Genari.Hud.prototype.addGameObjectiveText = function(game_width, y, text, style) {
        return DCHud.prototype.addGameObjectiveText.call(this, game_width, y, text, style);
    };
    /**
     * Add life icon
     * @param x
     * @param y
     * @param iconKey
     * @param [height] Default 40
     * @return {Object} Phaser.Sprite
     * @override
     */
    Genari.Hud.prototype.addLifeIcon = function(x, y, iconKey, height){
        return DCHud.prototype.addLifeIcon.call(this, x, y, iconKey, height);
    };
    /**
     * Add an icon to hud
     * @param x
     * @param y
     * @param iconKey
     * @param [height] Default 40
     * @return {Object} Phaser.Sprite
     * @override
     */
    Genari.Hud.prototype.addHudIcon = function(x, y, iconKey, height){
        return DCHud.prototype.addHudIcon.call(this, x, y, iconKey, height);
    };
    /**
     * Add score icon
     * @param x
     * @param y
     * @param iconKey
     * @param [height] Default 48
     * @return {Object} Phaser.Sprite
     * @override
     */
    Genari.Hud.prototype.addScoreIcon = function(x, y, iconKey, height){
        return DCHud.prototype.addScoreIcon.call(this, x, y, iconKey, height);
    };
    /**
     * Add Pause Button
     * @param [x] Default 9
     * @param [y] Default 7
     * @param [key] Default 'pauseButton'  Phaser.Sprite asset key.
     * @param [height] Default 45
     * @param [callBack]
     * @param [callBackContext]
     * @param [overFrame] Default 0
     * @param [outFrame] Default 1
     * @param [downFrame] Default 2
     * @param [upFrame] Default 1
     * @return {Object} Phaser.Sprite
     * @override
     */
    Genari.Hud.prototype.addPauseButton = function(x, y, key, height, callBack, callBackContext, overFrame, outFrame, downFrame, upFrame){
        return DCHud.prototype.addPauseButton.call(this, x, y, key, height, callBack, callBackContext, overFrame, outFrame, downFrame, upFrame);
    };
    /**
     * Add life text box
     * @param x
     * @param y
     * @param text
     * @param textStyle
     * @return {Phaser.Text}
     * @override
     */
    Genari.Hud.prototype.addLifeText = function(x, y, text, textStyle){
        return DCHud.prototype.addLifeText.call(this, x, y, text, textStyle);
    };
    /**
     * Add life text box
     * @param x
     * @param y
     * @param text
     * @param textStyle
     * @return {Phaser.Text}
     * @override
     */
    Genari.Hud.prototype.addHudText = function(x, y, text, textStyle){
        return DCHud.prototype.addHudText.call(this, x, y, text, textStyle);
    };
    /**
     * Set life text
     * @param text
     * @override
     */
    Genari.Hud.prototype.setLifeValue = function(text){
        DCHud.prototype.setLifeValue.call(this, text);
    };

    /**
     * Add a mouse/pointer cursor fixed to the camera and follow the mouse pointer or where the finger touches
     * @param {string|null} [key]
     * @param {number|null} [upFrame] Default 0 Sprite frame for mouse up
     * @param {number|null} [downFrame] Default 1 Sprite frame for mouse down
     * @param {number|null} [collisionRadius] Cursor collision radius for detecting touch of an object. This is for P2 Physics. Default 10
     * @param {Function|null} [onPointerMoveCallBack]
     * @param {Object|null} [callBackContext]
     * @returns {Object} Phaser.Sprite
     */
    Genari.Hud.prototype.addPointerCursor = function(key, upFrame, downFrame, collisionRadius, onPointerMoveCallBack, callBackContext) {
        key = key || 'mouseCursorCircle';
        collisionRadius = collisionRadius || 10;

        this.pointerCursorUpFrame = upFrame || 0;
        this.pointerCursorDownFrame = downFrame || 0;

        if(!onPointerMoveCallBack){
            onPointerMoveCallBack = pointerMoveCallBack;
            callBackContext = this;
        }

        return DCHud.prototype.addPointerCursor.call(this, key, upFrame, downFrame, collisionRadius, onPointerMoveCallBack, callBackContext);

        // The default mouse cursor move handler. You can provide your own callback to replace this
        function pointerMoveCallBack(pointer, x, y, isDown) {
            var ga = Genari.dcGame;
            if(this.pointerCursor){
                //console.log(x,y, ga.screenScaleRatio);
                this.pointerCursor["cameraOffset"]["x"] = x/ga.screenScaleRatio;
                this.pointerCursor["cameraOffset"]["y"] = y/ga.screenScaleRatio;

                if(isDown && this.pointerCursor["frame"] != this.pointerCursorDownFrame){
                    this.pointerCursor["frame"] = this.pointerCursorDownFrame;
                }else if(!isDown && this.pointerCursor["frame"] != this.pointerCursorUpFrame){
                    this.pointerCursor["frame"] = this.pointerCursorUpFrame;
                }
            }
        }
    };

    /**
     * Destroy display objects
     * @override
     */
    Genari.Hud.prototype.destroy = function(text){
        DCHud.prototype.destroy.call(this, text);
    };


    /**********************************************************************************
     * Create a dial indicator
     * @param {number} dialX
     * @param {number} dialY
     * @param {string} dialSpriteKey
     * @param {string} needleSpriteKey
     * @param {string} dialKnobSpriteKey
     * @param {number|null} [dialSign]
     * @param {number|null} [needleAngle]
     * @param {number|null} [needleX]
     * @param {number|null} [needleY]
     * @param {Object|null} [layer] Phaser.Group
     * @constructor
     *********************************************************************************/
    Genari.Dial = function(dialX, dialY, dialSpriteKey, needleSpriteKey, dialKnobSpriteKey, dialSign, needleAngle, needleX, needleY, layer) {
        if (!(this instanceof Genari.Dial)) return new Genari.Dial(dialX, dialY, dialSpriteKey, needleSpriteKey, dialKnobSpriteKey, dialSign, needleAngle, needleX, needleY, layer);
        DCDial.call(this, dialX, dialY, dialSpriteKey, needleSpriteKey, dialKnobSpriteKey, dialSign, needleAngle, needleX, needleY, layer);
    };
    Genari.Dial.prototype = Object.create(DCDial.prototype); // extend DCHud
    Genari.Dial.prototype.constructor = Genari.Dial;         // set constructor property
    /**
     * Set Angle of the needle
     * @param {number} angle Degrees, clockwise. 0 = right, 90 = down, 180 = right, 270 = up
     * @override
     */
    Genari.Dial.prototype.setNeedleAngle = function(angle) {
        DCDial.prototype.setNeedleAngle.call(this, angle);
    };

    /**
     * Get Angle of the needle
     * @return {number} angle Degrees, clockwise. 0 = right, 90 = down, 180 = right, 270 = up
     * @override
     */
    Genari.Dial.prototype.getNeedleAngle = function() {
        return DCDial.prototype.getNeedleAngle.call(this);
    };

    /*********************************************************************************************
     * Use this to manage a group of monsters with text or text boxes in 2D world.
     *
     * @param {Object} layer Phaser.Group. Rendering layer of this group.
     * @param {boolean} [fixedToCamera] If set to true, it move with camera. The location is then camera offsets.
     * @param {boolean} [enableBody] If set to true, any objects added will have physics enables
     * @param {number} [physicsBodyType] Default 0. Phaser.Physics.ARCADE, Phaser.Physics.P2, Phaser.Physics.NINJA
     * @constructor
     * @extends {DC2DMonsterGroup}
     ********************************************************************************************/
    Genari.NPCMonsterGroup = function(layer, fixedToCamera, enableBody, physicsBodyType) {
        if (!(this instanceof Genari.NPCMonsterGroup)) return new Genari.NPCMonsterGroup(layer, fixedToCamera, enableBody, physicsBodyType);  // make sure this refer to a Genari.Game
        DC2DMonsterGroup.call(this, layer, fixedToCamera, enableBody, physicsBodyType);
    };
    Genari.NPCMonsterGroup.prototype = Object.create(DC2DMonsterGroup.prototype); // extend DCMonsterGroup
    Genari.NPCMonsterGroup.prototype.constructor = Genari.NPCMonsterGroup;  // set constructor property

    /**
     * Set the type of monsters for this group
     * @param {boolean} isEnemy Default true. Set to true for enemies. Set to false for supplies
     * @override
     */
    Genari.NPCMonsterGroup.prototype.setMonsterType = function(isEnemy) {
        DC2DMonsterGroup.prototype.setMonsterType.call(this, isEnemy);
    };

    /**
     * Set the type of monsters for this group
     * @return {boolean} isEnemy
     * @override
     */
    Genari.NPCMonsterGroup.prototype.getMonsterType = function() {
        return DC2DMonsterGroup.prototype.getMonsterType.call(this);
    };

    /**
     * Create a monster with Arcade physics body, add text and optionally add frame of the text
     * Add animations for this monster using addAnimation, addWalkUpAnimation, ...
     * Play animation using playWalkAnimation, walk, walkUp, ...
     * @param {number} x The spawn point of the monster
     * @param {number} y
     * @param {string|Object} answer to show
     * @param {number} score score for capturing or destroying this monster
     * @param {string} monsterSpriteKey sprite asset key for the monster
     * @param {string|null} [frameImageKey]  If provided, a frame box will be created to for the text
     * @param {number|null} [initialMonsterFrame]
     * @return {Object} monster Phaser.Group containing the monster sprite, text, text box frame
     * @override
     */
    Genari.NPCMonsterGroup.prototype.addMonsterFramedWordBox = function(x, y, answer, score, monsterSpriteKey, frameImageKey, initialMonsterFrame){
        return DC2DMonsterGroup.prototype.addMonsterFramedWordBox.call(this, x, y, answer, score, monsterSpriteKey, frameImageKey, initialMonsterFrame);
    };
    /**
     * Add an animation sequence details for a monster
     * @param {Object} monster Phaser.Group containing monster sprite
     * @param {string|null} [animationName] Default "walk"
     * @param {Array|null} [frames] If null, all frames are used
     * @param {number|null} [frameRate] Default 60
     * @param {boolean|null} [loop] Default false
     * @override
     */
    Genari.NPCMonsterGroup.prototype.addAnimation = function(monster, animationName, frames, frameRate, loop) {
        DC2DMonsterGroup.prototype.addAnimation.call(this, monster, animationName, frames, frameRate, loop);
    };
    /**
     * Add walk up animation sequence details for a monster
     * @param {Object} monster Phaser.Group containing monster sprite
     * @param {Array|null} [frames] If null, all frames are used
     * @param {number|null} [frameRate] Default 60
     * @param {boolean|null} [loop] Default false
     * @override
     */
    Genari.NPCMonsterGroup.prototype.addWalkUpAnimation = function(monster, frames, frameRate, loop) {
        DC2DMonsterGroup.prototype.addWalkUpAnimation.call(this, monster, frames, frameRate, loop);
    };
    /**
     * Add walk down animation sequence details for a monster
     * @param {Object} monster Phaser.Group containing monster sprite
     * @param {Array|null} [frames] If null, all frames are used
     * @param {number|null} [frameRate] Default 60
     * @param {boolean|null} [loop] Default false
     * @override
     */
    Genari.NPCMonsterGroup.prototype.addWalkDownAnimation = function(monster, frames, frameRate, loop) {
        DC2DMonsterGroup.prototype.addWalkDownAnimation.call(this, monster, frames, frameRate, loop);
    };
    /**
     * Add walk left animation sequence details for a monster
     * @param {Object} monster Phaser.Group containing monster sprite
     * @param {Array|null} [frames] If null, all frames are used
     * @param {number|null} [frameRate] Default 60
     * @param {boolean|null} [loop] Default false
     * @override
     */
    Genari.NPCMonsterGroup.prototype.addWalkLeftAnimation = function(monster, frames, frameRate, loop) {
        DC2DMonsterGroup.prototype.addWalkLeftAnimation.call(this, monster, frames, frameRate, loop);
    };
    /**
     * Add walk right animation sequence details for a monster
     * @param {Object} monster Phaser.Group containing monster sprite
     * @param {Array|null} [frames] If null, all frames are used
     * @param {number|null} [frameRate] Default 60
     * @param {boolean|null} [loop] Default false
     * @override
     */
    Genari.NPCMonsterGroup.prototype.addWalkRightAnimation = function(monster, frames, frameRate, loop) {
        DC2DMonsterGroup.prototype.addWalkRightAnimation.call(this, monster, frames, frameRate, loop);
    };
    /**
     * Play animation
     * @param {Object} monster Phaser.Group containing monster sprite
     * @param {number|null} [angle] In degrees. Clockwise. 0 = right, 90 = down, 180 = left, 270 = up
     * @param {number|null} [velocity] pixels per second.
     * @param {string|null} [animationName]
     * @param {number|null} [frameRate] Default 60
     * @param {boolean|null} [loop] Default false
     * @param {boolean|null} [killOnComplete] Default false
     * @return {boolean} Return true if playing
     * @override
     */
    Genari.NPCMonsterGroup.prototype.playWalkAnimation = function(monster, angle, velocity, animationName, frameRate , loop, killOnComplete) {
        return DC2DMonsterGroup.prototype.playWalkAnimation.call(this, monster, angle, velocity, animationName, frameRate , loop, killOnComplete);
    };
    /**
     * Play walk animation
     * @param {Object} monster Phaser.Group containing monster sprite
     * @param {number|null} [angle] Default 0=right. In degrees. Clockwise. 0 = left, 90 = down, 180 = right, 270 = up
     * @param {number|null} [velocity] Default the velocity set using setDefaultVelocity(). pixels per second.
     * @param {string|null} [animationName] Default "walk"
     * @param {number|null} [frameRate] Default the frame rate set using setDefaultFrameRate()
     * @param {boolean|null} [loop] Default false
     * @param {boolean|null} [killOnComplete] Default false
     * @override
     */
    Genari.NPCMonsterGroup.prototype.walk = function(monster, angle, velocity, animationName, frameRate , loop, killOnComplete) {
        DC2DMonsterGroup.prototype.walk.call(this, monster, angle, velocity, animationName, frameRate , loop, killOnComplete);
    };
    /**
     * Play walk up animation
     * @param {Object} monster Phaser.Group containing monster sprite
     * @param {number|null} [angle] In degrees. Clockwise. 0 = left, 90 = down, 180 = right, 270 = up
     * @param {number|null} [velocity] pixels per second.
     * @param {number|null} [frameRate] Default 60
     * @param {boolean|null} [loop] Default false
     * @param {boolean|null} [killOnComplete] Default false
     * @override
     */
    Genari.NPCMonsterGroup.prototype.walkUp = function(monster, angle, velocity, frameRate , loop, killOnComplete) {
        DC2DMonsterGroup.prototype.walkUp.call(this, monster, angle, velocity, frameRate , loop, killOnComplete);
    };
    /**
     * Play walk down animation
     * @param {Object} monster Phaser.Group containing monster sprite
     * @param {number|null} [angle] In degrees. Clockwise. 0 = left, 90 = down, 180 = right, 270 = up
     * @param {number|null} [velocity] pixels per second.
     * @param {number|null} [frameRate] Default 60
     * @param {boolean|null} [loop] Default false
     * @param {boolean|null} [killOnComplete] Default false
     * @override
     */
    Genari.NPCMonsterGroup.prototype.walkDown = function(monster, angle, velocity, frameRate , loop, killOnComplete) {
        DC2DMonsterGroup.prototype.walkDown.call(this, monster, angle, velocity, frameRate , loop, killOnComplete);
    };
    /**
     * Play walk left animation
     * @param {Object} monster Phaser.Group containing monster sprite
     * @param {number|null} [angle] In degrees. Clockwise. 0 = left, 90 = down, 180 = right, 270 = up
     * @param {number|null} [velocity] pixels per second.
     * @param {number|null} [frameRate] Default 60
     * @param {boolean|null} [loop] Default false
     * @param {boolean|null} [killOnComplete] Default false
     * @override
     */
    Genari.NPCMonsterGroup.prototype.walkLeft = function(monster, angle, velocity, frameRate , loop, killOnComplete) {
        DC2DMonsterGroup.prototype.walkLeft.call(this, monster, angle, velocity, frameRate , loop, killOnComplete);
    };
    /**
     * Play walk right animation
     * @param {Object} monster Phaser.Group containing monster sprite
     * @param {number|null} [angle] In degrees. Clockwise. 0 = left, 90 = down, 180 = right, 270 = up
     * @param {number|null} [velocity] pixels per second.
     * @param {number|null} [frameRate] Default 60
     * @param {boolean|null} [loop] Default false
     * @param {boolean|null} [killOnComplete] Default false
     * @override
     */
    Genari.NPCMonsterGroup.prototype.walkRight = function(monster, angle, velocity, frameRate , loop, killOnComplete) {
        DC2DMonsterGroup.prototype.walkRight.call(this, monster, angle, velocity, frameRate , loop, killOnComplete);
    };

    /**
     * Change the position of text and text box based on the location of the monster
     * @param {Object} monster Phaser.Group containing monster sprite
     * @param {number|null} [yMin] monster.textBox["height"] + 64
     * @override
     */
    Genari.NPCMonsterGroup.prototype.updateWordBoxLocation = function(monster, yMin) {
        DC2DMonsterGroup.prototype.updateWordBoxLocation.call(this, monster, yMin);
    };

    /**
     * Change walk direction randomly every N frames
     * @param playerSprite
     * @param monster
     * @param [velocity] Default is the group default velocity
     * @param [timeInSeconds] change direction every this seconds Default 2 seconds
     * @override
     */
    Genari.NPCMonsterGroup.prototype.random2DWalk = function(playerSprite, monster, velocity, timeInSeconds){
        DC2DMonsterGroup.prototype.random2DWalk.call(this, playerSprite, monster, velocity, timeInSeconds);
    };

    /**
     * Control the movements of the monster using the 2D grid generated using setupGrid()
     * @param monster The monster to control
     * @param playerSprite Target
     * @param [timeInSeconds] Default 2. Generate a new route every this seconds.
     * @param [rx] Alternative target. E.g., a random point in the game world
     * @param [ry]
     * @override
     */
    Genari.NPCMonsterGroup.prototype.quickRoute = function(monster, playerSprite, timeInSeconds, rx, ry) {
        DC2DMonsterGroup.prototype.quickRoute.call(this, monster, playerSprite, timeInSeconds, rx, ry);
    };


    /************************************************************************************
     * Board game treasure box groups
     * This manages a group of treasure box objects for a player.
     *
     * @param {Phaser.Group} layer Rendering layer of this group.
     * @param {Genari.BoardPlayer} treasureOwner Treasures are for this player
     * @param {boolean} [fixedToCamera] If set to true, it move with camera. The location is then camera offsets.
     * @param {boolean} [enableBody] If set to true, any objects added will have physics enables
     * @param {number} [physicsBodyType] Default 0. Phaser.Physics.ARCADE, Phaser.Physics.P2, Phaser.Physics.NINJA
     * @constructor
     * @extends {DCTreasureGroup}
     ***********************************************************************************/
    Genari.BGTreasureGroup = function(layer, treasureOwner, fixedToCamera, enableBody, physicsBodyType) {
        if (!(this instanceof Genari.BGTreasureGroup)) {
            return new Genari.BGTreasureGroup(layer, treasureOwner, fixedToCamera, enableBody, physicsBodyType);
        }
        DCTreasureGroup.call(this, layer, fixedToCamera, enableBody, physicsBodyType);
    };
    Genari.BGTreasureGroup.prototype = Object.create(DCTreasureGroup.prototype);  // extend DCTreasureGroup
    Genari.BGTreasureGroup.prototype.constructor = Genari.BGTreasureGroup;       // set constructor property

    /**
     * Randomly populate the board with treasure boxes
     * Each box contains a random answer for the game question (E.g., collect all correct answers)
     * Randomly create treasure boxes
     * @param {number} numCols Number of column
     * @param {number} numRows
     * @param {number} boardX X location of the board on the stage
     * @param {number} boardY Y location of the board
     * @param {number} tileWidth  Width of each tile
     * @param {number} tileHeight
     * @param {String} spriteKey The key of the sprite to be used to visualize the treasure box.
     * @param {number} boxOpacity The opacity of the created treasure box, ranges from 0 to 1.
     * @param {number} treasureOpenFrames
     * @param {number} animationFPS
     * @param {number} [emptyRowsCols]
     * @param {number} [density] Default 0.3 (30%). Set to higher to increase the number of treasureboxes
     * @override
     */
    Genari.BGTreasureGroup.prototype.createTreasureBoxes = function(
        numCols, numRows, boardX, boardY, tileWidth, tileHeight,
        spriteKey, boxOpacity, treasureOpenFrames, animationFPS,
        emptyRowsCols,
        density
    ) {
        DCTreasureGroup.prototype.createTreasureBoxes.call(this,
            numCols, numRows, boardX, boardY, tileWidth, tileHeight,
            spriteKey, boxOpacity, treasureOpenFrames, animationFPS,
            emptyRowsCols,
            density);
    };

    /**
     * Create a treasure box in the location
     * @param {number} col
     * @param {number} row
     * @override
     */
    Genari.BGTreasureGroup.prototype.createTreasureBox = function(col, row) {
        DCTreasureGroup.prototype.createTreasureBox.call(this, col, row);
    };

    /**
     * Return a treasurem box if there is a treasure box in the board cell
     * @param row starts from 1
     * @param col starts from 1
     * @returns {Phaser.Sprite} a treasure box in the location
     * @override
     */
    Genari.BGTreasureGroup.prototype.getTreasureBox = function(col, row) {
        return DCTreasureGroup.prototype.getTreasureBox.call(this, col, row);
    };

    /**
     * Remove any treasure box at a location
     *
     * @param {number} [col] column Starts from 1
     * @param {number} [row] row Starts from 1
     * @override
     */
    Genari.BGTreasureGroup.prototype.removeTreasureBox = function(col, row) {
        DCTreasureGroup.prototype.removeTreasureBox.call(this, col, row);
    };

    /**
     * Check if there is a treasure box at the location
     * @param {number} [col] column Starts from 1
     * @param {number} [row] row Starts from 1
     * @param {Genari.BoardPlayer} [player] BoardPlayer
     * @param {Function} [callBack] callBack(box) this is called if a treasure box if found and after the opening animation is completed
     * @return {boolean} True if treasure found
     * @override
     */
    Genari.BGTreasureGroup.prototype.checkTreasureBox = function(col, row, player, callBack) {
        return DCTreasureGroup.prototype.checkTreasureBox.call(this, col, row, player, callBack);
    };

    /**
     * @returns {Object} Genari.BoardPlayer
     * @override
     */
    Genari.BGTreasureGroup.prototype.getTreasureOwner = function(){
        return DCTreasureGroup.prototype.getTreasureOwner.call(this);
    };

    /**
     * @param treasureOwner
     * @override
     */
    Genari.BGTreasureGroup.prototype.setTreasureOwner = function(treasureOwner){
        DCTreasureGroup.prototype.setTreasureOwner.call(this, treasureOwner);
    };

    /************************************************************************************
     * Question Dialog Box
     *
     * @param {string} correctAnswerSoundKey
     * @param {string} incorrectAnswerSoundKey
     * @param {string} yesButtonImageKey
     * @param {string} noButtonImageKey
     * @param {Object} [questionFontStyle] font style for the question
     * @param {Object} [answerFontStyle] font style for answers
     * @param {string} [questionYOffset] Y offset of the Question Default -110
     * @constructor
     * @extends {DCGameObject}
     ***********************************************************************************/
    Genari.QuestionDialogBox = function(correctAnswerSoundKey, incorrectAnswerSoundKey, yesButtonImageKey, noButtonImageKey, questionFontStyle, answerFontStyle, questionYOffset) {
        if (!(this instanceof Genari.QuestionDialogBox)) {
            return new Genari.QuestionDialogBox(correctAnswerSoundKey, incorrectAnswerSoundKey, yesButtonImageKey, noButtonImageKey, questionFontStyle, answerFontStyle, questionYOffset);
        }
        DCGameObject.call(this);

        this.correctAnswerSoundKey = correctAnswerSoundKey;
        this.incorrectAnswerSoundKey = incorrectAnswerSoundKey;
        this.yesButtonImageKey = yesButtonImageKey;
        this.noButtonImageKey = noButtonImageKey;

        this.questionFontStyle = questionFontStyle || {
                "font":"24px Arial",
                "fontWeight":"bold",
                "align":"center",
                "fill":'#EFEFEF',
                "stroke":'#000000',
                "wordWrap":true,
                "wordWrapWidth":Genari.dcGame.gameDialogBox["width"]
            };
        this.answerFontStyle = answerFontStyle || {
                "font":"24px Arial",
                "fontWeight":"normal",
                "align":"center",
                "fill":'#EFEFEF',
                "stroke":'#000000',
                "wordWrap":true,
                "wordWrapWidth":Genari.dcGame.gameDialogBox["width"]
            };
        this.questionYOffset = questionYOffset || -110;
    };
    Genari.QuestionDialogBox.prototype = Object.create(DCGameObject.prototype);  // extend DCGameObject
    Genari.QuestionDialogBox.prototype.constructor = Genari.QuestionDialogBox;       // set constructor property

    /**
     * This is the function to open the treasure box
     * @param answer
     * @param {function} dialogBoxBtnClickCallback(playerGetBonusTurn)
     */
    Genari.QuestionDialogBox.prototype.showQuestionDialogBox = function(answer, dialogBoxBtnClickCallback) {
        var ga = this.dcGame;
        var lineSpacing = -6;
        //var textVerticalGap = 10;

        if (!ga.statePlay.isPlaying) return; // game level is not playing yet

        // if you need to recreate the dialog box to appear on the top, uncomment this
        // game.createDialogBox();

        // set the content of the dialog box
        ga.setGameDialogBoxContentAndShow(
            Genari.getQuestion(),                   // question as title
            answer["word"],                         // answer
            -1, 0,                                  // set score <0 to hide
            null,
            // title style for question
            this.questionFontStyle,
            // msg style
            this.answerFontStyle,
            null, null, null,
            this.questionYOffset
        );

        var questionText = ga.gameDialogBox["children"][0];
        //questionText["y"] = game.gameDialogBox["y"] * 0.3;
        questionText["lineSpacing"] = lineSpacing;

        var answerText = ga.gameDialogBox["children"][1];
        answerText["lineSpacing"] = lineSpacing;

        // Add buttons
        var buttonX = (ga.gameDialogBox["width"] / 2);
        var buttonY = (ga.gameDialogBox["height"] * 0.78);

        var btn1 = ga.addButtonToDialogBox(
            buttonX, buttonY, this.yesButtonImageKey, -80,
            function() {
                this.checkTreasureAnswer(true, answer, dialogBoxBtnClickCallback);
            }.bind(this),
            this
        );

        ga.addButtonToDialogBox(
            buttonX, buttonY, this.noButtonImageKey, 80,
            function() {
                this.checkTreasureAnswer(false, answer, dialogBoxBtnClickCallback);
            }.bind(this),
            this
        );

        //If answer image exists, show answer-image in the dialog box.
        var ansImageKey = ga.blueBackgroundImageKey;
        var showImage = false;
        if (Genari.checkAnswerImageExist(answer)){
            ansImageKey = answer["imageKey"];
            showImage = true;
        }
        showImage = true;  // DEVELOPER_CODE  For testing purpose for developers

        if (showImage) {
            // Adjust text location
            answerText["y"] = questionText["y"] + questionText["height"];

            // Place image under the answer text
            var answerImage = Genari.phaserAddSprite(
                0, answerText["y"] + answerText["height"], ansImageKey
            );

            // TODO: learning point: using API to rescale and center the image
            var imgHeight = btn1["y"] - (answerText["y"]+answerText["height"] + 5);
            Genari.rescaleAndCenter(answerImage, ga.gameDialogBox["width"], imgHeight);

            ga.gameDialogBox["addChild"](answerImage);
        }

        // If answer sound exists, play answer sound.
        var ansSoundKey = this.correctAnswerSoundKey;
        if (Genari.checkAnswerSoundExist(answer)){
            ansSoundKey = answer["soundKey"];
        }
        ga.audioPlay(ansSoundKey);
    };

    /**
     * Called when a button in the treasure box diaglog box is clicked
     * Check answer
     * @param {boolean} choice Choice made by the human player: true or false
     * @param {Object} [answer] Answer
     * @param {Function} [callback] callback(playerBonusTurn)
     */
    Genari.QuestionDialogBox.prototype.checkTreasureAnswer = function(choice, answer, callback){
        var ga = this.dcGame;

        // Got right answer?
        var correctAsTrue = (choice === true && answer["score"] > 0);
        var incorrectAsFalse = (choice === false && answer["score"] < 0);
        if (correctAsTrue || incorrectAsFalse) {
            // Play sound
            ga.audioPlay(this.correctAnswerSoundKey);

            // Collect correct answer texts
            if (answer["score"] > 0) {
                ga.correctWordsCollected.push(answer["word"]);
            } else if (answer["score"] < 0) {
                ga.incorrectWordsDestroyed.push(answer["word"]);
            }
        } else {
            ga.audioPlay(this.incorrectAnswerSoundKey);
        }

        // After some delay call the callback function to chain actions
        // callback is used to perform an action
        Genari.delayedCall( //game.phaserGame["time"]["events"]["add"](
            ga.mouseClickDuration,
            // Resume and player gets another turn, but if no more moves, perform computer move
            function() {
                if(callback) {
                    callback(correctAsTrue || incorrectAsFalse);
                }
                ga.removeGameDialogBox();
            }.bind(this)
        );
    };

    if(myClassLoader) myClassLoader();   // DEVELOPER_CODE REMOVE_FOR_THEME
};  // DEVELOPER_CODE REMOVE_FOR_THEME
