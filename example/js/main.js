var game;
var bs;

function loadDependenciesFull() {
    $LAB.setGlobalDefaults({AlwaysPreserveOrder:true,Debug:true});
    $LAB.script("../src/main/js/Bootstrap.js").wait(function(){
        bs = new Bootstrap("bs");
        bs.start(loadCustomClasses,"../src/main/js/",bs.FULL);
    });
}

function loadDependenciesDebug() {
    $LAB.setGlobalDefaults({AlwaysPreserveOrder:true,Debug:true});
    $LAB.script("../src/main/js/blitgin.js").wait(function(){
        bs = new Bootstrap("bs");
        bs.start(loadCustomClasses);
    });
}

function loadDependenciesMin() {
    $LAB.setGlobalDefaults({AlwaysPreserveOrder:true,Debug:true});
    $LAB.script("../src/main/js/min-blitgin.js").wait(function(){
        bs = new Bootstrap("bs");
        bs.start(loadCustomClasses);
    });
}


function loadCustomClasses() {
    $LAB
    .script("js/CustomAction.js").wait()
    .script("js/CustomComposite.js").wait()
    .script("js/CustomComplexAction.js").wait()
    .script("js/CustomPlayer.js").wait()
    .script("js/CustomEnemy.js").wait()
    .script("js/CustomMapObject.js").wait()
    .script("js/CustomMap.js").wait(function(){
    	createGame();
    });
}

function createGame() {
    game = new Game();
    game.maps = [CustomMap];
    game.players = [CustomPlayer];
    game.activeMap = 0;
    game.activePlayer = 0;
    game.leftKeys = [game.keyboard.LEFT];
    game.rightKeys = [game.keyboard.RIGHT];
    game.jumpKeys = [game.keyboard.SPACE];
    game.customKeys = [ 76, 66 ];
    game.preinitialize(this,1024,432);
    game.subscribe(this);
}

function notify(args) {
	//console.log("notified " + args)
}

function unsubscribeMain() {
    game.unsubscribe(this);
}

function startGame() {
    game.start();
}