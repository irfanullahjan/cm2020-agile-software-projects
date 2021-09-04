import {Offer, Type} from '../models';

export const properties = {
  titles: ['Downtown', 'Urgent!', 'Best offer'],
  prices: [500000, 700000, 900000],
  offers: ['sale', 'rent'] as Offer[],
  types: ['house', 'apartment', 'commercial', 'land'] as Type[],
  areas: [500, 1000, 2000],
};
