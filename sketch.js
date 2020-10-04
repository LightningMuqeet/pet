var dog, dogSprite, happyDog, foodS, foodStock;
var database;
var score = 0;

function preload()
{
  dog = loadImage("Dog.png");
  happyDog = loadImage("happydog.png");
}

function setup() {
	createCanvas(500, 500);
  
    dogSprite = createSprite(250, 300, 30, 30);
    dogSprite.addImage(dog);
    dogSprite.scale = 0.2;
  
    database=firebase.database();
    foodStock=database.ref('food');
    foodStock.on("value", readStock);
}

function readStock(data)
{
  foodS=data.val();
}

function writeStock(x)
{
  if(x<=0){
    x=0;
  }
  else{
    x=x-1;
  } 
  
  database.ref('/').update({
    food : x
  })
}



function draw() {  

  background(46, 139, 87);

  console.log(foodS);
  
  if(keyWentDown(UP_ARROW))
{
  writeStock(foodS);
  dogSprite.addImage(happyDog);

}


textSize(17);
fill("black");
text("Food Remaining : "+foodS, 100, 150);

  drawSprites();

  textSize(17);
  fill("black");
  text("Note : Press UP_ARROW Key To Feed drago Milk!", 52,70);

}
