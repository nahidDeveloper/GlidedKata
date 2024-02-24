export class Item {
  name: string;
  sellIn: number;
  quality: number;

  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

export class GildedRose {
  items: Array<Item>;
  MAX_VALUE = 50;
  

  constructor(items = [] as Array<Item>) {
    this.items = items;
  }

  checkIfRegularItems(items:Item):boolean{
    if(items.name != 'Aged Brie' && items.name != 'Backstage passes to a TAFKAL80ETC concert'){
      return true
    }
    return false;

  }
  //Handling the increase of concert Values
  handleBackStageValue(backStage:Item){
    if(backStage.name == 'Backstage passes to a TAFKAL80ETC concert'){//Addtional check for security
      if(backStage.sellIn<11 &&this.belowMaxValue(backStage.quality)){
        backStage.quality = backStage.quality + 1
      }
      if(backStage.sellIn<6 &&this.belowMaxValue(backStage.quality)){
        backStage.quality = backStage.quality + 1
      }
    }
  }
  //Method to check if items value is below the max Value
  belowMaxValue(itemQuality:number): boolean{
    if(itemQuality<this.MAX_VALUE){
      return true;
    }
    return false;

  }

  qualityDegrader(item:Item){
    if(item.quality>0){
          item.quality = item.quality - 1
        //Decrease twice as fast if it is Item Conjured
        if(item.name =="Conjured" && item.quality != 0){
          item.quality = item.quality - 1
        }
  }
  }

  updateQuality() {
    for (let i = 0; i < this.items.length; i++) {
      //If item is Sulfuras we can continue as there are no changes to this item
      if(this.items[i].name === 'Sulfuras, Hand of Ragnaros'){
        continue;
      }
      if (this.checkIfRegularItems(this.items[i])) {//Aged brie and backpass concert does not decrease
          this.qualityDegrader(this.items[i])   
      } else {// This will run if its Aged Brie or Backstage
        if (this.belowMaxValue(this.items[i].quality)) {//No item can be greater than 50
          this.items[i].quality = this.items[i].quality + 1
          if (this.items[i].name == 'Backstage passes to a TAFKAL80ETC concert') {
            this.handleBackStageValue(this.items[i]);
          }
          
        }
      }
        //Decrease all items sellin Value
        this.items[i].sellIn = this.items[i].sellIn - 1;
      
      if (this.items[i].sellIn < 0) {
        if(this.checkIfRegularItems(this.items[i])){//If regular items standard way of decreasing Value
          this.qualityDegrader(this.items[i])
        }else if(this.items[i].name == 'Backstage passes to a TAFKAL80ETC concert'){//if concert set to 0
          this.items[i].quality=0;
        }else{ //If Aged Brie increase value if not over max
          if (this.belowMaxValue(this.items[i].quality)) {
            this.items[i].quality = this.items[i].quality + 1
          }
        }
        
      }
    }

    return this.items;
  }
}
