import List from './components/list.js';
import Footer from './components/footer';
import { modalInit } from './modal/modal';
const listInstance = new List();
const footer = new Footer();

modalInit();
listInstance.render();
footer.render();
