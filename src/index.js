import {RenderdsCards} from './components/cards.js';
import { cartList } from './components/cartList.js';
import {initLocalStorage} from './storage/storage.js';

cartList();
initLocalStorage();
RenderdsCards();