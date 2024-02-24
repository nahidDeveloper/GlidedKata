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
      if (this.items[i].name != 'Aged Brie' && this.items[i].name != 'Backstage passes to a TAFKAL80ETC concert') {//Aged brie and backpass concert does not decrease
          this.qualityDegrader(this.items[i])   
      } else {// This will run if its Aged Brie or Backstage
        if (this.items[i].quality < this.MAX_VALUE) {//No item can be greater than 50
          this.items[i].quality = this.items[i].quality + 1
          if (this.items[i].name == 'Backstage passes to a TAFKAL80ETC concert') {
            if(this.items[i].sellIn<11 &&this.items[i].quality < this.MAX_VALUE){
              this.items[i].quality = this.items[i].quality + 1
            }
            if(this.items[i].sellIn<6 &&this.items[i].quality < this.MAX_VALUE){
              this.items[i].quality = this.items[i].quality + 1
            }
            
          }
          
        }
      }
        //Decrease all items sellin Value
        this.items[i].sellIn = this.items[i].sellIn - 1;
      
      if (this.items[i].sellIn < 0) {
        if (this.items[i].name != 'Aged Brie') {
          if (this.items[i].name != 'Backstage passes to a TAFKAL80ETC concert') {
              this.qualityDegrader(this.items[i])
            
          } else {
            this.items[i].quality = this.items[i].quality - this.items[i].quality //Set backstage concert to 0
          }
        } else { //Increase Aged Brie item to by one if not by 50
          if (this.items[i].quality < this.MAX_VALUE) {
            this.items[i].quality = this.items[i].quality + 1
          }
        }
      }
    }

    return this.items;
  }
}
