import { Category } from '../model/category';

export enum dbList {
  public = 'public_spend/',
  private = 'private_spend/',
  fixed = 'fixed_spend/',
}

export enum common {
  pathDevider = '/',
}

// Public Cost
const PUBLIC_CATEGORY_FOOD = 10;
const PUBLIC_CATEGORY_DAILY_NECESSITIES = 11;
const PUBLIC_CATEGORY_RELATIINSHIP = 12;
const PUBLIC_CATEGORY_TRAVEL = 13;
const PUBLIC_CATEGORY_HOUSE = 14;
const PUBLIC_CATEGORY_DINE_OUT = 15;
const PUBLIC_CATEGORY_HOBBY = 16;
const PUBLIC_CATEGORY_CHILD_SUPPORT_EXPENSE = 17;
const PUBLIC_CATEGORY_ETC = 19;

// Private Cost
const PRIVATE_CATEGORY_FOOD = 20;
const PRIVATE_CATEGORY_RELATIINSHIP = 21;
const PRIVATE_CATEGORY_BEAUTY = 22;
const PRIVATE_CATEGORY_ETC = 29;

export const PUBLIC_CATEGORY_LIST = {
  [PUBLIC_CATEGORY_FOOD]: '食費',
  [PUBLIC_CATEGORY_DAILY_NECESSITIES]: '日用品',
  [PUBLIC_CATEGORY_CHILD_SUPPORT_EXPENSE]: '養育費',
  [PUBLIC_CATEGORY_RELATIINSHIP]: '交際',
  [PUBLIC_CATEGORY_TRAVEL]: '旅行',
  [PUBLIC_CATEGORY_HOUSE]: '住まい',
  [PUBLIC_CATEGORY_DINE_OUT]: '外食',
  [PUBLIC_CATEGORY_HOBBY]: '本・趣味',
  [PUBLIC_CATEGORY_ETC]: 'その他',
};

export const PRIVATE_CATEGORY_LIST = {
  [PRIVATE_CATEGORY_FOOD]: '食費',
  [PRIVATE_CATEGORY_RELATIINSHIP]: '交際',
  [PRIVATE_CATEGORY_BEAUTY]: '服・美容',
  [PRIVATE_CATEGORY_ETC]: 'その他',
};

export const publicCategory: Category[] = [
  {
    value: PUBLIC_CATEGORY_FOOD,
    viewValue: PUBLIC_CATEGORY_LIST[PUBLIC_CATEGORY_FOOD],
  },
  {
    value: PUBLIC_CATEGORY_DAILY_NECESSITIES,
    viewValue: PUBLIC_CATEGORY_LIST[PUBLIC_CATEGORY_DAILY_NECESSITIES],
  },
  {
    value: PUBLIC_CATEGORY_CHILD_SUPPORT_EXPENSE,
    viewValue: PUBLIC_CATEGORY_LIST[PUBLIC_CATEGORY_CHILD_SUPPORT_EXPENSE],
  },
  {
    value: PUBLIC_CATEGORY_DINE_OUT,
    viewValue: PUBLIC_CATEGORY_LIST[PUBLIC_CATEGORY_DINE_OUT],
  },
  {
    value: PUBLIC_CATEGORY_RELATIINSHIP,
    viewValue: PUBLIC_CATEGORY_LIST[PUBLIC_CATEGORY_RELATIINSHIP],
  },
  {
    value: PUBLIC_CATEGORY_HOBBY,
    viewValue: PUBLIC_CATEGORY_LIST[PUBLIC_CATEGORY_HOBBY],
  },
  {
    value: PUBLIC_CATEGORY_HOUSE,
    viewValue: PUBLIC_CATEGORY_LIST[PUBLIC_CATEGORY_HOUSE],
  },
  {
    value: PUBLIC_CATEGORY_TRAVEL,
    viewValue: PUBLIC_CATEGORY_LIST[PUBLIC_CATEGORY_TRAVEL],
  },
  {
    value: PUBLIC_CATEGORY_ETC,
    viewValue: PUBLIC_CATEGORY_LIST[PUBLIC_CATEGORY_ETC],
  },
];

export const privateCategory: Category[] = [
  {
    value: PRIVATE_CATEGORY_FOOD,
    viewValue: PRIVATE_CATEGORY_LIST[PRIVATE_CATEGORY_FOOD],
  },
  {
    value: PRIVATE_CATEGORY_RELATIINSHIP,
    viewValue: PRIVATE_CATEGORY_LIST[PRIVATE_CATEGORY_RELATIINSHIP],
  },
  {
    value: PRIVATE_CATEGORY_BEAUTY,
    viewValue: PRIVATE_CATEGORY_LIST[PRIVATE_CATEGORY_BEAUTY],
  },
  {
    value: PRIVATE_CATEGORY_ETC,
    viewValue: PRIVATE_CATEGORY_LIST[PRIVATE_CATEGORY_ETC],
  },
];

export const privateAutoCompleteMemo = [
  {
    letter: '食費',
    names: ['ランチ 🍙', 'コンビニ 🏪', '朝ごはん 🍰', 'コーヒー ☕️'],
  },
  { letter: '交際', names: ['飲み会 🍻'] },
  { letter: '服・美容', names: ['美容室 💈', '服 👕'] },
];

export const publicAutoCompleteMemo = [
  { letter: '食費', names: ['スーパー 🛒', 'コンビニ 🏪'] },
  { letter: '交際', names: ['飲み会 🍻'] },
  { letter: 'その他', names: ['病院 🏥'] },
];
