"use strict";

var app = new PIXI.Application({
    view: document.getElementById("pixiCanvas")
});

var manifest = [{
    "key": "scruffy",
    "url": "dist/img/scruffymorty.png"
}, {
    "key": "morty",
    "url": "dist/img/originalmorty.png"
}, {
    "key": "red",
    "url": "dist/img/redshirtmorty.png"
}, {
    "key": "explosion",
    "url": "dist/img/explosion.json"
}];

var explosionTextures = [];

var score = 0;

function loadAssets() {
    app.loader.add(manifest);
    app.loader.load(onAssetsLoaded);
}

function onAssetsLoaded(loader, resources) {

    for (var tex in resources.explosion.textures) {
        explosionTextures.push(resources.explosion.textures[tex]);
    }

    generateRedMorty();
    generateScruffyMorty();
    generateOriginalMorty();

    app.ticker.add(function (e) {
        return update(e);
    });
}

function generateScruffyMorty() {
    for (var i = 0; i < 10; i++) {
        var scruffyMorty = new PIXI.Sprite(app.loader.resources.scruffy.texture);
        var spacing = 100;
        scruffyMorty.x = spacing * i;
        scruffyMorty.y = randomInt(1, app.renderer.height - scruffyMorty.height);;
        scruffyMorty.interactive = true;
        scruffyMorty.on("pointerdown", wrongChoice);
        app.stage.addChild(scruffyMorty);
    }
}

function generateRedMorty() {
    for (var i = 0; i < 30; i++) {
        var redMorty = new PIXI.Sprite(app.loader.resources.red.texture);
        var spacing = 50;
        var xOffset = 10;
        redMorty.x = spacing * i + xOffset;
        redMorty.y = randomInt(0, app.renderer.height - redMorty.height);
        redMorty.interactive = true;
        redMorty.on("pointerdown", wrongChoice);
        app.stage.addChild(redMorty);
    }
}

function generateOriginalMorty() {
    var origMorty = new PIXI.Sprite(app.loader.resources.morty.texture);
    origMorty.x = Math.random() * 600;
    origMorty.y = Math.random() * 400;
    origMorty.interactive = true;
    origMorty.on("pointerdown", winner);
    app.stage.addChild(origMorty);
}

function wrongChoice(e) {
    alert("try again!");
    createExplosion(e.data.global.x, e.data.global.y);
    this.exploded = true;
    this.visible = false;
}

function winner(e) {

    alert("you won!");
    score++;
    document.querySelector(".score").innerHTML = score;
    setTimeout(startLevel, 500);
}

function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function startLevel() {
    app.stage.removeChildren();
    app.loader.load(onAssetsLoaded);
}
// function checkedForWin(){
//     for (let i = 0; i < activePenguins.length; i++){
//         if (!activePenguins[i].exploded){
//             return
//         }
//     }

//     alert("you won!")
// }


function createExplosion(x, y) {
    var boom = new PIXI.extras.AnimatedSprite(explosionTextures);
    boom.x = x;
    boom.y = y;
    boom.animationSpeed = 0.3;
    boom.anchor.set(0.5, 0.5);
    boom.play();
    boom.loop = false;
    // boom.onComplete = checkedForWin
    app.stage.addChild(boom);
}

function update(e) {}

window.onload = function () {

    loadAssets();
};
//# sourceMappingURL=main.js.map
