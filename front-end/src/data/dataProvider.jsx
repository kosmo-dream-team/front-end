import fakeRestDataProvider from 'ra-data-fakerest';
import { fakeData } from './fakeData';

export const dataProvider = fakeRestDataProvider(fakeData);
console.log(fakeData.applications);
