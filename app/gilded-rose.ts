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

  isBackstagePasses = (name) => name.includes("Backstage passes");

  decreaseSellInDay(item) {
    item.sellIn--;
  }

  decreaseQuality(item) {
    const isConjured = item.name.includes("Conjured");
    if (item.quality > 0) {
      if (item.sellIn < 0) {
        item.quality -= isConjured ? 4 : 2;
      } else {
        item.quality -= isConjured ? 2 : 1;
      }
    }
  }

  increaseQuality(item) {
    if (item.quality < 50) {
      item.quality++;
      if (this.isBackstagePasses(item.name)) {
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
        this.items[i].name === "Aged Brie" ||
        this.isBackstagePasses(this.items[i].name)
      ) {
        this.increaseQuality(this.items[i]);
      } else {
        this.decreaseQuality(this.items[i]);
      }
    }

    return this.items;
  }
}
