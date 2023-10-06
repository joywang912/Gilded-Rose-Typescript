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
    const decreaseTimes = isConjured ? 2 : 1;
    const numberToDecrease = item.sellIn < 0 ? 2 : 1;
    const newItemQuality = item.quality - numberToDecrease * decreaseTimes;
    item.quality = newItemQuality >= 0 ? newItemQuality : 0;
  }

  increaseQuality(item) {
    let newItemQuality = item.quality + 1;
    if (this.isBackstagePasses(item.name)) {
      if (item.sellIn < 0) {
        newItemQuality = 0;
      } else {
        if (item.sellIn < 11 && newItemQuality < 50) {
          newItemQuality++;
        }
        if (item.sellIn < 6 && newItemQuality < 50) {
          newItemQuality++;
        }
      }
    }

    if (item.name === "Aged Brie" && item.sellIn < 0) {
      newItemQuality++;
    }
    item.quality = newItemQuality <= 50 ? newItemQuality : 50;
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
