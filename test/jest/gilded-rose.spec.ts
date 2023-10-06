import { Item, GildedRose } from "@/gilded-rose";

describe("Gilded Rose", () => {
  it("should foo", () => {
    const gildedRose = new GildedRose([new Item("foo", 0, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).toBe("foo");
  });

  describe("Normal Product", () => {
    it("should lose 1 quality per day", () => {
      const gildedRose = new GildedRose([new Item("normal Item", 10, 20)]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toEqual(19);
    });

    it("quality should never be negative", () => {
      const gildedRose = new GildedRose([
        new Item("normal Item with 0 quality", 10, 0),
      ]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toEqual(0);
    });

    it("should lose 2 qualities per day after SellIn Date", () => {
      const gildedRose = new GildedRose([
        new Item("normal Item with 0 SellIn day", 0, 20),
      ]);
      const items = gildedRose.updateQuality();
      expect(items[0].sellIn).toEqual(-1);
      expect(items[0].quality).toEqual(18);
    });
  });

  describe("Aged Brie", () => {
    const gildedRose = new GildedRose([
      new Item("Aged Brie", 10, 10),
      new Item("Aged Brie", 10, 50),
      new Item("Aged Brie", 0, 10),
    ]);
    const items = gildedRose.updateQuality();

    it("Aged Brie increase 1 qualities per day", () => {
      expect(items[0].sellIn).toEqual(9);
      expect(items[0].quality).toEqual(11);
    });

    it("Quality of an item is never more than 50", () => {
      expect(items[1].sellIn).toEqual(9);
      expect(items[1].quality).toEqual(50);
    });

    it("should increase 2 qualities per day after SellIn date", () => {
      expect(items[2].sellIn).toEqual(-1);
      expect(items[2].quality).toEqual(12);
    });
  });

  describe("Backstage passes", () => {
    const gildedRose = new GildedRose([
      new Item("Backstage passes to a TAFKAL80ETC concert", 10, 10),
      new Item("Backstage passes to a TAFKAL80ETC concert", 5, 20),
      new Item("Backstage passes to a TAFKAL80ETC concert", 0, 20),
      new Item("Backstage passes to a TAFKAL80ETC concert", 20, 10),
    ]);
    const items = gildedRose.updateQuality();

    it("Backstage passes add 2 qualities if 10 or less SellIn days", () => {
      expect(items[0].sellIn).toEqual(9);
      expect(items[0].quality).toEqual(12);
    });

    it("Backstage passes add 3 qualities if 5 or less SellIn days", () => {
      expect(items[1].sellIn).toEqual(4);
      expect(items[1].quality).toEqual(23);
    });

    it("Backstage passes Quality drops to 0 after SellIn date", () => {
      expect(items[2].sellIn).toEqual(-1);
      expect(items[2].quality).toEqual(0);
    });

    it("Backstage passes add 1 qualities if more than 10 SellIn days", () => {
      expect(items[3].sellIn).toEqual(19);
      expect(items[3].quality).toEqual(11);
    });
  });

  describe("Sulfuras", () => {
    it("never decreases in Quality and SellIn date", () => {
      const gildedRose = new GildedRose([
        new Item("Sulfuras, Hand of Ragnaros", 0, 80),
      ]);
      const items = gildedRose.updateQuality();
      expect(items[0].sellIn).toEqual(0);
      expect(items[0].quality).toEqual(80);
    });
  });

  describe("Conjured items", () => {
    it("degrade in Quality twice as fast as normal items", () => {
      const gildedRose = new GildedRose([
        new Item("Conjured Mana Cake", 10, 40),
      ]);
      const items = gildedRose.updateQuality();
      expect(items[0].sellIn).toEqual(9);
      expect(items[0].quality).toEqual(38);
    });
  });
});
