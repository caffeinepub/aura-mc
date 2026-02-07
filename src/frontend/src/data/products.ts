export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  subcategory: string;
}

export interface Category {
  id: string;
  name: string;
  subcategories: Subcategory[];
}

export interface Subcategory {
  id: string;
  name: string;
  products: Product[];
}

export const categories: Category[] = [
  {
    id: 'lifesteal',
    name: 'Lifesteal',
    subcategories: [
      {
        id: 'ranks',
        name: 'Ranks',
        products: [
          { id: 'lifesteal-hero', name: 'Hero Rank', price: 299, category: 'lifesteal', subcategory: 'ranks' },
          { id: 'lifesteal-knight', name: 'Knight Rank', price: 389, category: 'lifesteal', subcategory: 'ranks' },
          { id: 'lifesteal-vip', name: 'VIP Rank', price: 450, category: 'lifesteal', subcategory: 'ranks' },
          { id: 'lifesteal-wizard', name: 'Wizard Rank', price: 600, category: 'lifesteal', subcategory: 'ranks' },
          { id: 'lifesteal-aura', name: 'Aura Rank', price: 840, category: 'lifesteal', subcategory: 'ranks' },
        ],
      },
      {
        id: 'coins',
        name: 'Coins',
        products: [
          { id: 'lifesteal-250coins', name: '250 Coin Pocket', price: 100, category: 'lifesteal', subcategory: 'coins' },
          { id: 'lifesteal-750coins', name: '750 Coin Box', price: 300, category: 'lifesteal', subcategory: 'coins' },
          { id: 'lifesteal-1500coins', name: '1500 Coin Bag', price: 600, category: 'lifesteal', subcategory: 'coins' },
          { id: 'lifesteal-3500coins', name: '3500 Coin Bank', price: 1200, category: 'lifesteal', subcategory: 'coins' },
        ],
      },
    ],
  },
  {
    id: 'tokensmp',
    name: 'Token SMP',
    subcategories: [
      {
        id: 'money',
        name: 'Money',
        products: [
          { id: 'tokensmp-10m', name: '10M Money Pocket', price: 100, category: 'tokensmp', subcategory: 'money' },
          { id: 'tokensmp-25m', name: '25M Money Bag', price: 200, category: 'tokensmp', subcategory: 'money' },
          { id: 'tokensmp-100m', name: '100M Money Bank', price: 600, category: 'tokensmp', subcategory: 'money' },
        ],
      },
      {
        id: 'ranks',
        name: 'Ranks',
        products: [
          { id: 'tokensmp-guard', name: 'Guard Rank', price: 99, category: 'tokensmp', subcategory: 'ranks' },
          { id: 'tokensmp-soldier', name: 'Soldier Rank', price: 198, category: 'tokensmp', subcategory: 'ranks' },
          { id: 'tokensmp-boss', name: 'Boss Rank', price: 350, category: 'tokensmp', subcategory: 'ranks' },
          { id: 'tokensmp-legend', name: 'Legend Rank', price: 489, category: 'tokensmp', subcategory: 'ranks' },
          { id: 'tokensmp-soul', name: 'Soul Rank', price: 509, category: 'tokensmp', subcategory: 'ranks' },
        ],
      },
      {
        id: 'coins',
        name: 'Coins',
        products: [
          { id: 'tokensmp-750coins', name: '750 Coins Box', price: 300, category: 'tokensmp', subcategory: 'coins' },
          { id: 'tokensmp-1500coins', name: '1500 Coins Bag', price: 725, category: 'tokensmp', subcategory: 'coins' },
          { id: 'tokensmp-3250coins', name: '3250 Coins Bank', price: 1190, category: 'tokensmp', subcategory: 'coins' },
        ],
      },
    ],
  },
  {
    id: 'aurasmp',
    name: 'Aura SMP',
    subcategories: [
      {
        id: 'ranks',
        name: 'Ranks',
        products: [
          { id: 'aurasmp-destroyer', name: 'Destroyer Rank', price: 85, category: 'aurasmp', subcategory: 'ranks' },
          { id: 'aurasmp-gareeb', name: 'Gareeb Rank', price: 125, category: 'aurasmp', subcategory: 'ranks' },
          { id: 'aurasmp-master', name: 'Master Rank', price: 250, category: 'aurasmp', subcategory: 'ranks' },
          { id: 'aurasmp-aura', name: 'Aura Rank', price: 450, category: 'aurasmp', subcategory: 'ranks' },
          { id: 'aurasmp-auraplus', name: 'Aura+ Rank', price: 625, category: 'aurasmp', subcategory: 'ranks' },
        ],
      },
      {
        id: 'coins',
        name: 'Coins',
        products: [
          { id: 'aurasmp-500coins', name: '500 Coins Pocket', price: 100, category: 'aurasmp', subcategory: 'coins' },
          { id: 'aurasmp-1000coins', name: '1000 Coins Bag', price: 185, category: 'aurasmp', subcategory: 'coins' },
          { id: 'aurasmp-2000coins', name: '2000 Coins Bank', price: 350, category: 'aurasmp', subcategory: 'coins' },
        ],
      },
    ],
  },
  {
    id: 'boxpvp',
    name: 'BoxPVP',
    subcategories: [
      {
        id: 'ranks',
        name: 'Ranks',
        products: [
          { id: 'boxpvp-newbie', name: 'Newbie Rank', price: 100, category: 'boxpvp', subcategory: 'ranks' },
          { id: 'boxpvp-king', name: 'King Rank', price: 200, category: 'boxpvp', subcategory: 'ranks' },
          { id: 'boxpvp-pro', name: 'Pro Rank', price: 350, category: 'boxpvp', subcategory: 'ranks' },
          { id: 'boxpvp-ultimate', name: 'Ultimate Rank', price: 600, category: 'boxpvp', subcategory: 'ranks' },
        ],
      },
      {
        id: 'coins',
        name: 'Coins',
        products: [
          { id: 'boxpvp-1000coins', name: '1000 Coins Bag', price: 250, category: 'boxpvp', subcategory: 'coins' },
          { id: 'boxpvp-2000coins', name: '2000 Coins Box', price: 400, category: 'boxpvp', subcategory: 'coins' },
          { id: 'boxpvp-4000coins', name: '4000 Coins Bank', price: 700, category: 'boxpvp', subcategory: 'coins' },
        ],
      },
    ],
  },
];

export function getCategoryById(id: string): Category | undefined {
  return categories.find((cat) => cat.id === id);
}

export function getProductById(id: string): Product | undefined {
  for (const category of categories) {
    for (const subcategory of category.subcategories) {
      const product = subcategory.products.find((p) => p.id === id);
      if (product) return product;
    }
  }
  return undefined;
}
