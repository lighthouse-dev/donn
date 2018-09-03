import { Category } from '../model/category';

// Public Cost
const PUBLIC_CATEGORY_FOOD              = 10;
const PUBLIC_CATEGORY_DAILY_NECESSITIES = 11;
const PUBLIC_CATEGORY_RELATIINSHIP      = 12;
const PUBLIC_CATEGORY_HOBBY             = 13;
const PUBLIC_CATEGORY_HOUSE             = 14;
const PUBLIC_CATEGORY_ETC               = 19;

// Private Cost
const PRIVATE_CATEGORY_FOOD         = 20;
const PRIVATE_CATEGORY_RELATIINSHIP = 21;
const PRIVATE_CATEGORY_BEAUTY       = 22;
const PRIVATE_CATEGORY_ETC          = 29;

export const PUBLIC_CATEGORY_LIST = {
  10: '食費',
  11: '日用品',
  12: '交際',
  13: '旅行・本・趣味',
  14: 'お住まい・水道・光熱・通信',
  19: 'その他'
};

export const PRIVATE_CATEGORY_LIST = {
  20: '食費',
  21: '交際',
  22: '服・美容',
  29: 'その他'
};

export const publicCategory: Category[] = [
  { value: PUBLIC_CATEGORY_FOOD, viewValue: '食費' },
  { value: PUBLIC_CATEGORY_DAILY_NECESSITIES, viewValue: '日用品' },
  { value: PUBLIC_CATEGORY_RELATIINSHIP, viewValue: '交際' },
  { value: PUBLIC_CATEGORY_HOBBY, viewValue: '旅行・本・趣味' },
  { value: PUBLIC_CATEGORY_HOUSE, viewValue: 'お住まい・水道・光熱・通信' },
  { value: PUBLIC_CATEGORY_ETC, viewValue: 'その他' },
];

export const privateCategory: Category[] = [
  { value: PRIVATE_CATEGORY_FOOD, viewValue: '食費' },
  { value: PRIVATE_CATEGORY_RELATIINSHIP, viewValue: '交際' },
  { value: PRIVATE_CATEGORY_BEAUTY, viewValue: '服・美容' },
  { value: PRIVATE_CATEGORY_ETC, viewValue: 'その他' },
];
