const app = new PIXI.Application({
            view: document.getElementById("pixiCanvas")
});

let manifest = [
    {
        "key": "scruffy",
        "url": "dist/img/scruffymorty.png"
    },
    {
        "key": "morty",
        "url": "dist/img/originalmorty.png"
    },
    {
        "key": "red",
        "url": "dist/img/redshirtmorty.png"
    },
    {
        "key": "explosion",
        "url": "dist/img/explosion.json"
    },
]


let explosionTextures = [];

let score = 0


function loadAssets(){
    app.loader.add(manifest)
    app.loader.load(onAssetsLoaded)
}

function onAssetsLoaded(loader, resources){
    
    for (let tex in resources.explosion.textures) {
        explosionTextures.push(resources.explosion.textures[tex]);
    }

    generateRedMorty()
    generateScruffyMorty()
    generateOriginalMorty()

    app.ticker.add((e) => update(e))
}

function generateScruffyMorty(){
    for (let i = 0; i < 10; i++){
        let scruffyMorty = new PIXI.Sprite(app.loader.resources.scruffy.texture)
        let spacing = 100
        scruffyMorty.x = spacing * i;
        scruffyMorty.y = randomInt(1, app.renderer.height - scruffyMorty.height);;
        scruffyMorty.interactive = true
        scruffyMorty.on("pointerdown", wrongChoice)
        app.stage.addChild(scruffyMorty)
    }
}


function generateRedMorty(){
    for (let i = 0; i < 30; i++){
        let redMorty = new PIXI.Sprite(app.loader.resources.red.texture)
        let spacing = 50
        let xOffset = 10
        redMorty.x = spacing * i + xOffset;
        redMorty.y = randomInt(0, app.renderer.height - redMorty.height);
        redMorty.interactive = true
        redMorty.on("pointerdown", wrongChoice)
        app.stage.addChild(redMorty)
    }
}

function generateOriginalMorty(){
        let origMorty = new PIXI.Sprite(app.loader.resources.morty.texture)
        origMorty.x = Math.random() * 600
        origMorty.y = Math.random() * 400
        origMorty.interactive = true
        origMorty.on("pointerdown", winner)
        app.stage.addChild(origMorty)
}


function wrongChoice(e){
    alert("try again!")
    createExplosion(e.data.global.x, e.data.global.y)
    this.exploded = true
    this.visible = false
}

function winner(e){
    
    alert("you won!")
    score++
    document.querySelector(`.score`).innerHTML = score
    setTimeout(startLevel, 500);
}

function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function startLevel(){
    app.stage.removeChildren()
    app.loader.load(onAssetsLoaded)
}
// function checkedForWin(){
//     for (let i = 0; i < activePenguins.length; i++){
//         if (!activePenguins[i].exploded){
//             return
//         }
//     }

//     alert("you won!")
// }


function createExplosion(x ,y){
    let boom  = new PIXI.extras.AnimatedSprite(explosionTextures)
    boom.x = x
    boom.y = y
    boom.animationSpeed = 0.3
    boom.anchor.set(0.5, 0.5)
    boom.play()
    boom.loop = false
    // boom.onComplete = checkedForWin
    app.stage.addChild(boom)
}

function update(e){

}


window.onload = function(){
    
    loadAssets()
}