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

  constructor(items = [] as Array<Item>) {
    this.items = items;
  }

  decreaseSellInDay(item) {
    item.sellIn--;
  }

  decreaseQuality(item) {
    if (item.quality > 0) {
      if (item.sellIn < 0) {
        item.quality -= 2;
      } else {
        item.quality--;
      }
    }
  }

  increaseQuality(item) {
    if (item.quality < 50) {
      item.quality++;
      if (item.name === "Backstage passes to a TAFKAL80ETC concert") {
        if (item.sellIn < 0) {
          item.quality = 0;
          return;
        }
        if (item.sellIn < 11 && item.quality < 50) {
          item.quality++;
        }
        if (item.sellIn < 6 && item.quality < 50) {
          item.quality++;
        }
      }

      if (item.name === "Aged Brie" && item.sellIn < 0) {
        item.quality++;
      }
    }
  }

  updateQuality() {
    for (let i = 0; i < this.items.length; i++) {
      if (this.items[i].name === "Sulfuras, Hand of Ragnaros") {
        continue;
      }
      this.decreaseSellInDay(this.items[i]);
      if (
        ["Aged Brie", "Backstage passes to a TAFKAL80ETC concert"].includes(
          this.items[i].name
        )
      ) {
        this.increaseQuality(this.items[i]);
      } else {
        this.decreaseQuality(this.items[i]);
      }
    }

    return this.items;
  }
}
