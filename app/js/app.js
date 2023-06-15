(function() {
    'use strict';

    angular.module('InvoiceGenerator', [])
        .constant('DEFAULT_INVOICE', {
            tax: 0.00,
            invoice_number: '43',
            items: [{
                qty: 10,
                title: 'Service 1',
                description: 'Dev services',
                cost: 5
            }]
        });
})();
