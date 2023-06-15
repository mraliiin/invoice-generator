(function() {
    'use strict';

    angular.module('InvoiceGenerator')
        .controller('InvoiceController', ['$scope', '$http', 'DEFAULT_INVOICE', 'LocalStorage', 'Currency', 'Management',
            function($scope, $http, DEFAULT_INVOICE, LocalStorage, Currency, Management) {

                // Set defaults
                $scope.currencySymbol = '$';
                $scope.logoRemoved = false;
                $scope.printMode = false;

                // METHODS
                $scope.addItem = addItem;
                $scope.removeItem = removeItem;
                $scope.invoiceSubTotal = invoiceSubTotal;
                $scope.calculateTax = calculateTax;
                $scope.calculateGrandTotal = calculateGrandTotal;
                $scope.clearLocalStorage = clearLocalStorage;

                (function init() {
                    $scope.invoice = angular.copy(DEFAULT_INVOICE);

                    $scope.availableCurrencies = Currency.all();
                    $scope.availableClients = Management.clients();
                    $scope.availableCompanies = Management.companies();

                })();

                // Adds an item to the invoice's items
                function addItem() {
                    $scope.invoice.items.push({
                        qty: 0,
                        cost: 0,
                        description: ""
                    });
                };

                // Remotes an item from the invoice
                function removeItem(item) {
                    $scope.invoice.items.splice($scope.invoice.items.indexOf(item), 1);
                };

                // Calculates the sub total of the invoice
                function invoiceSubTotal() {
                    var total = 0.00;
                    angular.forEach($scope.invoice.items, function(item, key) {
                        total += (item.qty * item.cost);
                    });
                    return total;
                };

                // Calculates the tax of the invoice
                function calculateTax() {
                    return (($scope.invoice.tax * $scope.invoiceSubTotal()) / 100);
                };

                // Calculates the grand total of the invoice
                function calculateGrandTotal() {
                    saveInvoice();
                    return $scope.invoiceSubTotal();
                };

                // Clears the local storage
                function clearLocalStorage() {
                    var confirmClear = confirm('Are you sure you would like to clear the invoice?');
                    if (confirmClear) {
                        LocalStorage.clearInvoice();
                        setInvoice(DEFAULT_INVOICE);
                    }
                };

                // Sets the current invoice to the given one
                var setInvoice = function(invoice) {
                    $scope.invoice = invoice;
                    saveInvoice();
                };

                // Reads a url
                function readUrl(input) {
                    if (input.files && input.files[0]) {
                        var reader = new FileReader();
                        reader.onload = function(e) {
                            document.getElementById('company_logo').setAttribute('src', e.target.result);
                            LocalStorage.setLogo(e.target.result);
                        };

                        reader.readAsDataURL(input.files[0]);
                    }
                };

                // Saves the invoice in local storage
                var saveInvoice = function() {
                    //LocalStorage.setInvoice();
                };

                // Runs on document.ready
                angular.element(document).ready(function() {
                    // Set focus
                    document.getElementById('invoice-number').focus();
                });
            }
        ])
})();
