(function() {
    'use strict';

    angular.module('InvoiceGenerator')
        .service('LocalStorage', [function() {
            return {
                hasInvoice: hasInvoice,
                getInvoice: getInvoice,
                setInvoice: setInvoice,
                clearInvoice: clearInvoice
            };

            function hasInvoice() {
                return !(localStorage['invoice'] == '' || localStorage['invoice'] == null);
            }

            function getInvoice() {
                if (hasInvoice()) {
                    return JSON.parse(localStorage['invoice']);
                } else {
                    return false;
                }
            }

            function setInvoice(invoice) {
                localStorage['invoice'] = JSON.stringify(invoice);
            }

            function clearInvoice() {
                localStorage['invoice'] = '';
            }

        }])

        .service('Currency', [function() {
            function all() {
                return [{
                        name: 'Euro (€)',
                        symbol: '€'
                    },
                    {
                        name: 'US Dollar ($)',
                        symbol: '$'
                    }
                ]
            }

            return {
                all: all
            };

        }])

        .service('Management', [function() {
            function clients() {
                return [{
                        name: 'Client 1',
                        address1: 'address 1',
                        address2: 'City',
                        postal: 'zip code'
                    },
                    {
                        name: 'Client 2',
                        address1: 'address 2',
                        address2: 'City',
                        postal: 'zip code'
                    },
                ]
            };

            function companies() {
                return [{
                    name: 'MY SRL',
                    address1: 'address 1',
                    address2: 'My City',
                    postal: 'US'
                }, ]
            };

            return {
                clients: clients,
                companies: companies,
            };
        }])
})();
