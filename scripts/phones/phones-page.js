'use strict'

import PhoneCatalog from './components/phone-catalog.js';
import PhoneViewer from './components/phone-viewer.js';
import PhonesFilter from './components/phones-filter.js';
import ShoppingCart from './components/shopping-cart.js';
import PhoneService from './services/phone-service.js';

export default class PhonesPage {
    constructor({element}) {
        this._element = element;
        this._render();
        this._initCatalog();
        this._initViewer();
        this._initFilters();
        this._initShoppingCart();
    }

    _initCatalog() {
        this._catalog = new PhoneCatalog({
            element: this._element.querySelector('[data-component="phone-catalog"]')
        });

        PhoneService.getAll()
            .then((phones) => {
                this._catalog.showPhones(phones);
            });

        this._catalog.on('phoneSelected', (event) => {
            let phoneId = event.detail;

            PhoneService.get(phoneId)
                .then((phone) => {
                    this._catalog.hide();
                    this._viewer.showPhone(phone);
                });
        });

        this._catalog.on('addToCart', (event) => {
            let phoneId = event.detail;
            this._shoppingCart.addItem(phoneId);
        });
    }

    _initViewer() {
        this._viewer = new PhoneViewer({
            element: this._element.querySelector('[data-component="phone-viewer"]'),
        });

        this._viewer.on('back', () => {
            this._catalog.show();
            this._viewer.hide();
        });

        this._viewer.on('add', (event) => {
            let phoneId = event.detail;
            this._shoppingCart.addItem(phoneId);
        });
    }

    _initFilters() {
        this._filter = new PhonesFilter({
            element: this._element.querySelector('[data-component="phones-filter"]'),
        });

        // async/await example
        this._filter.on('sort', async (event) => {
            let phones = await PhoneService.getAll({orderField: event.detail})
                .catch((e) => console.log(e))

            this._catalog.showPhones(phones);
        });

        this._filter.on('search', (event) => {
            PhoneService.getAll({query: event.detail})
                .then((phones) => {
                    this._catalog.showPhones(phones);
                });
        });
    }

    _initShoppingCart() {
        this._shoppingCart = new ShoppingCart({
            element: this._element.querySelector('[data-component="shopping-cart"]')
        });
    }

    _render() {
        this._element.innerHTML = `
            <div class="container-fluid">
                <div class="row">
                    <!--Sidebar-->
                    <div class="col-md-2">
                    <section>
                        <div data-component="phones-filter"></div>
                    </section>
                
                    <section>
                        <div data-component="shopping-cart"></div>
                    </section>
                </div>
                
                <!--Main content-->
                <div class="col-md-10">
                    <div data-component="phone-catalog"></div>
                        <div data-component="phone-viewer" class="js-hidden"></div>
                    </div>
                </div>
            </div>
        `;
    }
}
