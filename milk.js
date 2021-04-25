class milk{
    constructor(){

        this.foodStock = 0;
        this.lastFeed;
        this.image = loadImage("images/Milk.png")

    }

    updateFoodStock(foodStock){
        this.foodStock = foodStock;

    }

    getFeedTime(lastFeed){
        this.lastFeed = lastFeed;

    }

    getFoodStock(){
        return this.foodStock;
    }

    deductFood(){
        if(this.foodStock>0){
            this.foodStock = this.foodStock-1;
        }
    }


    bedroom(){
       background(bedroomI,1000,500);
    }

    garden(){
        background(gardenI,1000,500);
        
    }

    washroom(){
        background(washroomI,1000,500);
    }


    display(){

        if(lastFeed>=12){
            text("Last Feed:"+lastFeed%12+ "PM",700,40);
          
          }else if(lastFeed==0){
            text("Last Feed: 12 AM",700,40);
          
          }else{
            text("Last Feed:"+lastFeed+ "AM",700,40);
          
          }

        var x= 100,y=110;

      imageMode(CENTER);
     // image(this.image,x,y,60,60);

      if(this.foodStock!=0){
        for(var i = 0;i<this.foodStock;i++){
            if(i%10==0){
                x= 100;
                y=y+50;
            }
        image(this.image,x,y,50,50);
        x= x+30;

        }
      }
    }
}