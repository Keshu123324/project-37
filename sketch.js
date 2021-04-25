//Create variables here
var dog, happydog, database, foods, foodStock;
var dog1img,dog2img;
var milkObject;
var feedDog, addFood;
var fedTime, lastFeed;
var bedroomI, gardenI,washroomI,livingroomI;
var gameState = "Hungry";
function preload()
{
  //load images here
	dog1img=loadImage("images/Dog.png");
  dog2img=loadImage("images/happy dog.png");
  bedroomI=loadImage("images/Bed Room.png");
  gardenI=loadImage("images/Garden.png");
  washroomI=loadImage("images/Wash Room.png");
  livingroomI=loadImage("images/Living Room.png");

}

function setup() {
	createCanvas(1000, 500);
  database = firebase.database();

  milkObject = new milk();

  
  fedTime = database.ref('feedTime');
  fedTime.on("value", function(data){
  lastFeed = data.val();
  });

  dog=createSprite(750,350,50,50);
  dog.addImage(dog1img);
  dog.scale=0.2;


  foodStock = database.ref('Food');
  foodStock.on("value", readStock);

  feedDog = createButton("Feed the Dog");
  feedDog.position(800,80);
  feedDog.mousePressed(feedTheDog);


  addFood = createButton("Add Food");
  addFood.position(900,80);
  addFood.mousePressed(addFoods);

  //read the game state from database
  gameStateRef=database.ref('gameState');
  gameStateRef.on("value",function(data){
    gameState=data.val();
  });

  

}


function draw() {  
 background("skyblue")


currentTime=hour();
if(currentTime==(lastFeed+1)){
  update("Playing");
  milkObject.garden();
}else if(currentTime==lastFeed+2){
 update("Sleeping");
 milkObject.bedroom();
}else if(currentTime>(lastFeed+2)&&currentTime<=(lastFeed+4)){
 update("Bathing")
 milkObject.washroom();
}else{
  update("Hungry");
  milkObject.display();
}

if(gameState!="Hungry"){
  feedDog.hide();
  addFood.hide();
  dog.remove();
}else{
  feedDog.show();
  addFood.show();
//  dog.addImage(dog1img);

}

  drawSprites();
}

//funtion to read food stock
function readStock(data){
  foods = data.val();
  milkObject.updateFoodStock(foods);
}

//function to add food in stock
function addFoods(){

  foods++;
 
database.ref('/').update({
  Food: foods
})

}

//
function feedTheDog(){
  dog.addImage(dog2img);

  milkObject.updateFoodStock(milkObject.getFoodStock()-1);

database.ref('/').update({
  Food:milkObject.getFoodStock(),
  feedTime: hour(),
  gameState: "Hungry"
})



}
//update gameState
function update(state){
  database.ref('/').update({
  gameState:state
  });
}


