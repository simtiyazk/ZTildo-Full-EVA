(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
// Set up your stage server hostname here
var StageHostname = exports.StageHostname = 'review.cdm210.com';
// Set up your stage directory
var StageFolder = exports.StageFolder = '';

},{}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
   value: true
});

var _constants = require('./constants');

exports.default = function () {
   var touchclick = 'ontouchend' in document.documentElement ? 'touchend' : window.navigator.pointerEnabled ? 'pointerup' : 'click';
   var isVeeva = navigator.userAgent.match(/iP(hone|ad)/i) != null;
   window.isVeeva = isVeeva;
   var hostname = window.location.hostname;
   console.log('veeva presentation:', isVeeva);

   if (!isVeeva) {
      $('html').addClass('localhost');
      $('.goToSlide').on(touchclick, function (e) {
         e.preventDefault();
         var slide = $(e.target).data('slide');
         var href = '/';
         if (hostname === 'localhost') {
            href = '/' + slide + '/' + slide + '.html';
         } else if (hostname === _constants.StageHostname) {
            href = 'http://' + hostname + '/' + _constants.StageFolder + '/' + slide + '/' + slide + '.html';
         }
         window.location.href = href;
      });
   } else {
      $('.goToSlide').on(touchclick, function (e) {
         e.preventDefault();
         var slide = $(e.target).data('slide');
         var presentation = $(e.target).data('presentation');
         window.location.href = 'veeva:gotoSlide(' + slide + '.zip' + (presentation ? ', ' + presentation : '') + ')';
      });
   }
};

},{"./constants":1}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var slidesConfig = exports.slidesConfig = ['ZTlido-Full-EVA_00_00', 'ZTlido-Full-EVA_10_00', 'ZTlido-Full-EVA_11_00', 'ZTlido-Full-EVA_11_50', 'ZTlido-Full-EVA_12_00', 'ZTlido-Full-EVA_12_50', 'ZTlido-Full-EVA_13_00', 'ZTlido-Full-EVA_13_50', 'ZTlido-Full-EVA_14_00', 'ZTlido-Full-EVA_15_00', 'ZTlido-Full-EVA_15_10', 'ZTlido-Full-EVA_15_20', 'ZTlido-Full-EVA_15_30', 'ZTlido-Full-EVA_15_40', 'ZTlido-Full-EVA_15_50'];

var presentationName = exports.presentationName = 'ZTlido-Full-EVA';

},{}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function () {

  //global listeners
  document.addEventListener('touchmove', function (e) {
    e.preventDefault();
  }, false); //prevent webview window from scrolling

  FastClick.attach(document.body); //fastclick for mobile
};

},{}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var isZoomed = false;

var ZoomModel = function () {
	function ZoomModel(args) {
		_classCallCheck(this, ZoomModel);

		if (args !== undefined) {
			isZoomed = args;
		}
	}

	_createClass(ZoomModel, [{
		key: "getZoomed",
		value: function getZoomed() {
			return isZoomed;
		}
	}, {
		key: "setZoomed",
		value: function setZoomed(args) {
			isZoomed = args;
		}
	}]);

	return ZoomModel;
}();

var zoomed = exports.zoomed = new ZoomModel(false);

},{}],6:[function(require,module,exports){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/* eslint-disable */
//
// UMD Wrapper for Veeva CLM
//
// Veeva JavaScript Library version 28.17.10
// http://veeva.com
//
// Copyright Â© 2016 Veeva Systems, Inc. All rights reserved.
//
// The com.veeva.clm namespace should be utilized when calling the JavaScript functions.
//          Example: "com.veeva.clm.getDataForCurrentObject("Account","ID", myAccountID);"
//
//
// JavaScript library will return in the following format:
// {success:true, obj_name:[{"Id":"0001929312"}, {record2}, ...]}
// or
// {success:false, code:####, message:"message_text"}
// #### - denotes the specific error code (1000 is from the underlying API, 2000 is from the JavaScript library)
//          2000 - Callback function is missing
//          2001 - Callback is not a JavaScript function
//          2002 - <parameter_name> is empty
//          2100 - Request (%@) failed: %@
// message_text - begins with the JavaScript library function name and a ":". If the error comes from the underlying API, the full message
// from the API will be appended to the message_text
//
//
// For CLM:
// With the exception of gotoSlide, the JavaScript functions respect My Setup, Restricted Products on Account, Allowed Products on Call and on TSF.
// goToSlide respects all of the above when media is launched from a Call or an Account. goToSlide does not respect Restricted Products
// and Allowed Products when media is launched from the home page.
//
//
// Use the JavaScript functions in a chain, i.e. call the second JavaScript function only in the first function's callback function or
// after the callback of the first function is finished.
// Because the underlying API calls are asynchronous, this may result in unexpected return values if the JavaScript functions are
// not properly chained.
//
//
// Veeva recommends caution when retrieving/saving data using the following field types and to always perform rigorous testing:
//      Long Text Area
//      Rich Text Area
//      Encrypted Text Area

(function (window, factory) {
    var com = factory(window, window.document);
    if ((typeof module === 'undefined' ? 'undefined' : _typeof(module)) === 'object' && module.exports) {
        module.exports = com;
    } else if (typeof define === 'function' && define.amd) {
        define(com);
    } else {
        window.com = com;
    }
})(window, function l(window, document) {
    'use strict';

    if (!document.getElementsByClassName) {
        return;
    }

    var com = window.com;

    var ret = {};
    var request = {};
    var query = '';
    var data = '';
    var approvedDocumentQuery = '';
    var lowerName = '';

    if (com == null) com = {};
    if (com.veeva == undefined) com.veeva = {};
    console.log(com);
    com.veeva.clm = {
        /////////////////////// Addresses ///////////////////////

        // 1
        // Returns an array of record IDs of all addresses (Address_vod__c) for a particular account (Account)
        // account - specifies the record ID of the account of which to get all related addresses
        // callback - call back function which will be used to return the information
        getAddresses_Account: function getAddresses_Account(account, callback) {
            ret = this.checkCallbackFunction(callback);
            if (ret.success == false) return ret;

            // check arguments
            ret = this.checkArgument("account", account);
            if (ret.success == false) {
                com.veeva.clm.wrapResult("getAddresses_Account", callback, ret);
                return;
            }
            window["com_veeva_clm_accountAddresses"] = function (result) {
                com.veeva.clm.wrapResult("getAddresses_Account", callback, result);
            };

            query = "veeva:queryObject(Address_vod__c),fields(ID),where(WHERE Account_vod__c=\"" + account + "\"),com_veeva_clm_accountAddresses(result)";
            if (!com.veeva.clm.testMode) com.veeva.clm.runAPIRequest(query);else com_veeva_clm_accountAddresses(com.veeva.clm.testResult.common);
        },

        // 2
        // Returns the values of the specified fields for specified Address (Address_vod__c) record
        // record - specifies the record ID of the Address to get fields from
        // fields - list of field api names to return a value for, this parameter should be an array
        // callback - call back function which will be used to return the information
        getAddressFields: function getAddressFields(record, fields, callback) {
            ret = this.checkCallbackFunction(callback);
            if (ret.success == false) return ret;

            // check arguments
            ret = this.checkArgument("record", record);
            if (ret.success == false) {
                com.veeva.clm.wrapResult("getAddressFields", callback, ret);
                return;
            }
            if (fields == undefined || fields == null) {
                fields = ["ID"];
            }

            window["com_veeva_clm_addressValues"] = function (result) {
                com.veeva.clm.wrapResult("getAddressFields", callback, result);
            };

            query = "veeva:queryObject(Address_vod__c),fields(" + this.joinFieldArray(fields) + "),where(WHERE IdNumber=\"" + record + "\"),com_veeva_clm_addressValues(result)";
            if (!com.veeva.clm.testMode) com.veeva.clm.runAPIRequest(query);else com_veeva_clm_addressValues(com.veeva.clm.testResult.common);
        },

        /////////////////////// Products ///////////////////////

        // Returns an array of record IDs of all products (Product_vod__c) of a specified type that the User has access to
        // type - specifies the Product Type (Product_Type_vod__c field on Product_vod__c)
        // callback - call back function which will be used to return the information
        getProduct_MySetup: function getProduct_MySetup(type, callback) {
            // check parameter

            ret = this.checkCallbackFunction(callback);
            if (ret.success == false) return ret;

            // check arguments
            ret = this.checkArgument("type", type);
            if (ret.success == false) {
                com.veeva.clm.wrapResult("getProduct_MySetup", callback, ret);
                return;
            }

            window["com_veeva_clm_productMysetup"] = function (result) {
                com.veeva.clm.wrapResult("getProduct_MySetup", callback, result);
            };

            query = "veeva:queryObject(Product_vod__c),fields(ID),where(WHERE Product_Type_vod__c=\"" + type + "\"),com_veeva_clm_productMysetup(result)";
            if (!com.veeva.clm.testMode) com.veeva.clm.runAPIRequest(query);else com_veeva_clm_productMysetup(com.veeva.clm.testResult.common);
        },

        /////////////////////// Record Type Support ///////////////////////

        // Returns an array of record IDs of all RecordType records (RecordType) for a particular object
        // object - specifies the API name of the object of which to get all active RecordTypes
        // callback - call back function which will be used to return the information
        getRecordType_Object: function getRecordType_Object(object, callback) {

            ret = this.checkCallbackFunction(callback);
            if (ret.success == false) return ret;

            // check arguments
            ret = this.checkArgument("object", object);
            if (ret.success == false) {
                com.veeva.clm.wrapResult("getRecordType_Object", callback, ret);
                return;
            }

            window["com_veeva_clm_objectRecordTypes"] = function (result) {
                com.veeva.clm.wrapResult("getRecordType_Object", callback, result);
            };

            query = "veeva:queryObject(RecordType),fields(ID),where(WHERE SobjectType=\"" + object + "\" and IsActive == YES),com_veeva_clm_objectRecordTypes(result)";
            if (!com.veeva.clm.testMode) com.veeva.clm.runAPIRequest(query);else com_veeva_clm_objectRecordTypes(com.veeva.clm.testResult.common);
        },

        /////////////////////// Surveys ///////////////////////

        // 1
        // Returns an array of record IDs of all Survey Questions (Survey_Question_vod__c) for a specific Survey (Survey_vod__c)
        // Results are returned in ascending order based on the Order_vod__c field on Survey Question_vod__c.
        // survey - specifies the record ID of the Survey to get all related Survey Questions from
        // callback - call back function which will be used to return the information
        getSurveyQuestions_Survey: function getSurveyQuestions_Survey(survey, callback) {
            ret = this.checkCallbackFunction(callback);
            if (ret.success == false) return ret;

            // check arguments
            ret = this.checkArgument("survey", survey);
            if (ret.success == false) {
                com.veeva.clm.wrapResult("getSurveyQuestions_Survey", callback, ret);
                return;
            }

            window["com_veeva_clm_surveyQuestions"] = function (result) {
                com.veeva.clm.wrapResult("getSurveyQuestions_Survey", callback, result);
            };

            query = "veeva:queryObject(Survey_Question_vod__c),fields(ID),where(WHERE Survey_vod__c=\"" + survey + "\"),sort(Order_vod__c,asc),com_veeva_clm_surveyQuestions(result)";
            if (!com.veeva.clm.testMode) com.veeva.clm.runAPIRequest(query);else com_veeva_clm_surveyQuestions(com.veeva.clm.testResult.common);
        },

        // 2
        // Returns an array of record IDs of all Questions Responses (Question_Response_vod__c object) for a specific Survey
        // Target (Survey_Target_vod__c). Results are returned in ascending order based on the Order_vod__c field on Question_Response_vod__c.
        // surveytarget - specifies the record ID of the Survey Target to get all related Question Responses from
        // callback - call back function which will be used to return the information
        getQuestionResponse_SurveyTarget: function getQuestionResponse_SurveyTarget(surveytarget, callback) {
            ret = this.checkCallbackFunction(callback);
            if (ret.success == false) return ret;

            // check arguments
            ret = this.checkArgument("surveytarget", surveytarget);
            if (ret.success == false) {
                com.veeva.clm.wrapResult("getQuestionResponse_SurveyTarget", callback, ret);
                return;
            }
            window["com_veeva_clm_targetResponses"] = function (result) {
                com.veeva.clm.wrapResult("getQuestionResponse_SurveyTarget", callback, result);
            };

            query = "veeva:queryObject(Question_Response_vod__c),fields(ID),where(WHERE Survey_Target_vod__c=\"" + surveytarget + "\"),sort(Order_vod__c,asc),com_veeva_clm_targetResponses(result)";
            if (!com.veeva.clm.testMode) com.veeva.clm.runAPIRequest(query);else com_veeva_clm_targetResponses(com.veeva.clm.testResult.common);
        },

        // 3
        // Returns an array of record IDs of all Survey Targets (Survey_Target_vod__c) for a specific account (Account), for a
        // specific Survey (Survey_vod__c)
        // account - specifies the record ID of the Account to get all related Survey Targets from
        // survey - specifies the record ID of the Survey to get all related Survey Targets from.  Can be made optional by putting in "".
        // callback - call back function which will be used to return the information
        getSurveyTarget_Account: function getSurveyTarget_Account(account, survey, callback) {
            ret = this.checkCallbackFunction(callback);
            if (ret.success == false) return ret;

            // check arguments
            ret = this.checkArgument("account", account);
            if (ret.success == false) {
                com.veeva.clm.wrapResult("getSurveyTarget_Account", callback, ret);
                return;
            }

            window["com_veeva_clm_accountSurveyTargets"] = function (result) {
                com.veeva.clm.wrapResult("getSurveyTarget_Account", callback, result);
            };

            query = null;
            if (survey == null || survey == "") {
                query = "veeva:queryObject(Survey_Target_vod__c),fields(ID),where(WHERE Account_vod__c=\"" + account + "\"),com_veeva_clm_accountSurveyTargets(result)";
            } else {
                query = "veeva:queryObject(Survey_Target_vod__c),fields(ID),where(WHERE Account_vod__c=\"" + account + "\" AND Survey_vod__c=\"" + survey + "\"),com_veeva_clm_accountSurveyTargets(result)";
            }
            if (!com.veeva.clm.testMode) com.veeva.clm.runAPIRequest(query);else com_veeva_clm_accountSurveyTargets(com.veeva.clm.testResult.common);
        },

        /////////////////////// Order Management ///////////////////////

        // * Campaign and Contract based Pricing Rules are not supported by the JavaScript Library for CLM Order Management functions"
        // 1
        // Returns an array of record IDs of all products (Product_vod__c) of type Order that have valid list prices
        //          Valid list price = Pricing Rule (Pricing_Rule_vod__c) of record type List Price (List_Price_Rule_vod) where current date is
        //          between Start Date (Start_Date_vod__c) and End Date (End_Date_vod__c)
        // callback - call back function which will be used to return the information
        // account/account group - specifies the record ID of an Account or the matching text for the Account Group. Can be made optional
        // by putting in "". When utilized, returns an array of record IDs of all products (Product_vod__c) of type Order
        // that have valid list price records which specify the Account or Account Group.
        getProduct_OrderActive_Account: function getProduct_OrderActive_Account(accountOrAccountGroup, callback) {
            var orderProducts;
            var ret = this.checkCallbackFunction(callback);
            if (ret.success == false) return ret;

            // c, product
            window["com_veeva_clm_ordersWithListPrice"] = function (result) {
                result = com.veeva.clm.formatResult(result);
                if (result.success) {
                    orderIds = [];
                    if (result.Pricing_Rule_vod__c && result.Pricing_Rule_vod__c.length > 0) {
                        for (i = 0; i < result.Pricing_Rule_vod__c.length; i++) {
                            orderIds.push(result.Pricing_Rule_vod__c[i].Product_vod__c);
                        }
                    }

                    ret.success = true;
                    ret.Product_vod__c = orderIds;
                    com.veeva.clm.wrapResult("getProduct_OrderActive_Account", callback, ret);
                } else {
                    com.veeva.clm.wrapResult("getProduct_OrderActive_Account", callback, result);
                }
            };

            // b, got record type id
            window["com_veeva_clm_listPriceTypeId"] = function (result) {
                result = com.veeva.clm.formatResult(result);
                if (result.success && result.RecordType && result.RecordType.length > 0) {
                    listPriceRecordTypeId = result.RecordType[0].ID;

                    // c, fetch product which has <list price> pricing rules
                    var ids = [];
                    for (i = 0; i < orderProducts.length; i++) {
                        ids.push(orderProducts[i].ID);
                    }

                    dateString = com.veeva.clm.getCurrentDate();

                    query = null;
                    if (accountOrAccountGroup == null || accountOrAccountGroup == "") {
                        query = "veeva:queryObject(Pricing_Rule_vod__c),fields(ID,Product_vod__c),where(WHERE RecordTypeId=\"" + listPriceRecordTypeId + "\" AND Start_Date_vod__c <= \"" + dateString + "\" AND End_Date_vod__c >= \"" + dateString + "\" AND Product_vod__c IN " + com.veeva.clm.joinStringArrayForIn(ids) + "), com_veeva_clm_ordersWithListPrice(result)";
                    } else {
                        query = "veeva:queryObject(Pricing_Rule_vod__c),fields(ID,Product_vod__c),where(WHERE RecordTypeId=\"" + listPriceRecordTypeId + "\" AND (Account_vod__c=\"" + accountOrAccountGroup + "\" OR Account_Group_vod__c = \"" + accountOrAccountGroup + "\") AND Start_Date_vod__c <=\"" + dateString + "\" AND End_Date_vod__c >= \"" + dateString + "\" AND Product_vod__c IN " + com.veeva.clm.joinStringArrayForIn(ids) + "), com_veeva_clm_ordersWithListPrice(result)";
                    }

                    if (!com.veeva.clm.testMode) {
                        com.veeva.clm.runAPIRequest(query);
                    } else {
                        com_veeva_clm_ordersWithListPrice(testResult.listPrices);
                    }
                } else {
                    com.veeva.clm.wrapResult("getProduct_OrderActive_Account", callback, result);
                }
            };

            // a, get order products
            this.getProduct_MySetup("Order", function (result) {
                // got the list order products,
                if (result.success) {

                    orderProducts = result.Product_vod__c;
                    if (orderProducts && orderProducts.length > 0) {
                        // b, find out List Price record type id
                        recordTypeQuery = "veeva:queryObject(RecordType),fields(ID),where(WHERE SobjectType=\"Pricing_Rule_vod__c\" AND Name_vod__c=\"List_Price_Rule_vod\"),com_veeva_clm_listPriceTypeId(result)";
                        if (!com.veeva.clm.testMode) com.veeva.clm.runAPIRequest(recordTypeQuery);else com_veeva_clm_listPriceTypeId(testResult.listPriceRecordType);
                    } else {
                        ret.success = true;
                        ret.Product_vod__c = [];
                        com.veeva.clm.wrapResult("getProduct_OrderActive_Account", callback, ret);
                        return;
                    }
                } else {
                    // ERROR when geting Product of order type.
                    com.veeva.clm.wrapResult("getProduct_OrderActive_Account", callback, result);
                }
            });
        },

        // 2
        // Returns an array of record IDs of all products (Product_vod__c) of type Kit Component (Product_Type_vod__c field) who have
        // parent product (Parent_Product_vod__c) = product
        // product - specifies the record ID of the product of which to get all related Kit Components from
        // callback - call back function which will be used to return the information
        getProduct_KitComponents: function getProduct_KitComponents(product, callback) {
            ret = this.checkCallbackFunction(callback);
            if (ret.success == false) return ret;

            // check arguments
            ret = this.checkArgument("product", product);
            if (ret.success == false) {
                com.veeva.clm.wrapResult("getProduct_KitComponents", callback, ret);
                return;
            }
            window["com_veeva_clm_childKitItems"] = function (result) {
                com.veeva.clm.wrapResult("getProduct_KitComponents", callback, result);
            };

            query = "veeva:queryObject(Product_vod__c),fields(ID),where(WHERE Product_Type_vod__c=\"Kit Item\" AND Parent_Product_vod__c=\"" + product + "\"),com_veeva_clm_childKitItems(result)";
            if (!com.veeva.clm.testMode) com.veeva.clm.runAPIRequest(query);else com_veeva_clm_childKitItems(com.veeva.clm.testResult.common);
        },

        // 3
        // Returns an array of record IDs of Product Groups (Product_Group_vod__c) that the specified product (Product_vod__c) is part of
        // product - specifies the record ID of the product of which to get all related Product Groups from
        // callback - call back function which will be used to return the information
        getProductGroup_Product: function getProductGroup_Product(product, callback) {
            ret = this.checkCallbackFunction(callback);
            if (ret.success == false) return ret;

            // check arguments
            ret = this.checkArgument("product", product);
            if (ret.success == false) {
                com.veeva.clm.wrapResult("getProductGroup_Product", callback, ret);
                return;
            }
            window["com_veeva_clm_productProductGroups"] = function (result) {
                result = com.veeva.clm.formatResult(result);
                var ret = {};
                if (result != null && result.success) {
                    var rows = result.Product_Group_vod__c;
                    var groupIds = [];
                    if (rows && rows.length > 0) {
                        for (i = 0; i < rows.length; i++) {
                            groupIds.push(rows[i].Product_Catalog_vod__c);
                        }
                    }

                    ret.success = true;
                    ret.Product_vod__c = groupIds;

                    com.veeva.clm.wrapResult("getProductGroup_Product", callback, ret);
                } else if (result != null) {
                    com.veeva.clm.wrapResult("getProductGroup_Product", callback, result);
                } else {
                    // is not expected from low-level API
                }
            };

            query = "veeva:queryObject(Product_Group_vod__c),fields(ID,Product_Catalog_vod__c),where(WHERE Product_vod__c=\"" + product + "\"),com_veeva_clm_productProductGroups(result)";
            if (!com.veeva.clm.testMode) com.veeva.clm.runAPIRequest(query);else com_veeva_clm_productProductGroups(com.veeva.clm.testResult.common);
        },

        // 4
        // Returns an array of record IDs of the last 10 Orders (Order_vod__c) for a particular account (Account)
        // The order of last ten orders is based on the field Order_Date_vod__c, descending.
        // account - specifies the record ID of the account of which to get all related orders
        // callback - call back function which will be used to return the information
        getLastTenOrders_Account: function getLastTenOrders_Account(account, callback) {
            ret = this.checkCallbackFunction(callback);
            if (ret.success == false) return ret;

            // check arguments
            ret = this.checkArgument("account", account);
            if (ret.success == false) {
                com.veeva.clm.wrapResult("getLastTenOrders_Account", callback, ret);
                return;
            }

            window["com_veeva_clm_accountLastTenOrders"] = function (result) {
                com.veeva.clm.wrapResult("getLastTenOrders_Account", callback, result);
            };

            query = "veeva:queryObject(Order_vod__c),fields(ID),where(WHERE Account_vod__c=\"" + account + "\"),sort(Order_Date_vod__c,desc),limit(10),com_veeva_clm_accountLastTenOrders(result)";
            if (!com.veeva.clm.testMode) com.veeva.clm.runAPIRequest(query);else com_veeva_clm_accountLastTenOrders(com.veeva.clm.testResult.common);
        },

        // 5
        // Returns an array of record IDs of all Order Lines (Order_Line_vod__c) for a particular order (Order_vod__c)
        // order - specifies the record ID of the order of which to get all related order lines
        // callback - call back function which will be used to return the information
        getOrderLines_Order: function getOrderLines_Order(order, callback) {
            ret = this.checkCallbackFunction(callback);
            if (ret.success == false) return ret;

            // check arguments
            ret = this.checkArgument("order", order);
            if (ret.success == false) {
                com.veeva.clm.wrapResult("getOrderLines_Order", callback, ret);
                return;
            }
            window["com_veeva_clm_orderLines"] = function (result) {
                com.veeva.clm.wrapResult("getOrderLines_Order", callback, result);
            };

            query = "veeva:queryObject(Order_Line_vod__c),fields(ID),where(WHERE Order_vod__c=\"" + order + "\"),com_veeva_clm_orderLines(result)";
            if (!com.veeva.clm.testMode) com.veeva.clm.runAPIRequest(query);else com_veeva_clm_orderLines(com.veeva.clm.testResult.common);
        },

        // 6
        // DEPRECATED - Please use getListPrice_Product_Account
        // Returns an array of record IDs for the currently valid List Price (Pricing_Rule_vod__c) for a specific product (Product_vod__c)
        //          Valid list price = Pricing Rule (Pricing_Rule_vod__c) of record type List Price (List_Price_Rule_vod) where current date is
        //          between Start Date (Start_Date_vod__c) and End Date (End_Date_vod__c)
        // product - specifies the record ID of the product of which to get the List Price for
        // callback - call back function which will be used to return the information
        getListPrice_Product: function getListPrice_Product(product, callback) {
            ret = this.checkCallbackFunction(callback);
            if (ret.success == false) return ret;

            // check arguments
            ret = this.checkArgument("product", product);
            if (ret.success == false) {
                com.veeva.clm.wrapResult("getListPrice_Product", callback, ret);
                return;
            }

            window["com_veeva_clm_productPricingRules"] = function (result) {
                com.veeva.clm.wrapResult("getListPrice_Product", callback, result);
            };

            // 2
            window["com_veeva_clm_listPriceTypeId_getListPrice_Product"] = function (result) {
                result = com.veeva.clm.formatResult(result);
                if (result.success && result.RecordType && result.RecordType.length > 0) {
                    listPriceRecordTypeId = result.RecordType[0].ID;

                    // 2.1, fetch pricing rules for the product

                    dateString = com.veeva.clm.getCurrentDate();
                    query = "veeva:queryObject(Pricing_Rule_vod__c),fields(ID),where(WHERE RecordTypeId=\"" + listPriceRecordTypeId + "\" AND Product_vod__c = \"" + product + "\"" + " AND Start_Date_vod__c <= \"" + dateString + "\" AND End_Date_vod__c >= \"" + dateString + "\"), com_veeva_clm_productPricingRules(result)";
                    if (!com.veeva.clm.testMode) com.veeva.clm.runAPIRequest(query);else com_veeva_clm_productPricingRules(com.veeva.clm.testResult.listPrices);
                } else {
                    com.veeva.clm.wrapResult("getListPrice_Product", callback, result);
                }
            };

            // 1, fetch list price record type first
            recordTypeQuery = "veeva:queryObject(RecordType),fields(ID),where(WHERE SobjectType=\"Pricing_Rule_vod__c\" AND Name_vod__c=\"List_Price_Rule_vod\"),com_veeva_clm_listPriceTypeId_getListPrice_Product(result)";
            if (!com.veeva.clm.testMode) com.veeva.clm.runAPIRequest(recordTypeQuery);else com_veeva_clm_listPriceTypeId_getListPrice_Product(testResult.listPriceRecordType);
        },

        // 7
        // Requires that an Account be specified in order for any result to be returned.
        // Returns the record ID for the currently valid List Price (Pricing_Rule_vod__c) for a specific product (Product_vod__c) and Account combination. Respects the Account and Account Group List Price hierarchy.
        // Valid list price = Pricing Rule (Pricing_Rule_vod__c) of record type List Price (List_Price_Rule_vod) where current date is between Start Date (Start_Date_vod__c) and End Date (End_Date_vod__c)
        // product - specifies the record ID of the product of which to get the Pricing Rule for
        // account - specifies the Account for which to select List Prices for
        // callback - call back function which will be used to return the information
        getListPrice_Product_Account: function getListPrice_Product_Account(product, account, callback) {
            ret = this.checkCallbackFunction(callback);
            if (ret.success == false) return ret;

            // check arguments
            ret = this.checkArgument("product", product);
            if (ret.success == false) {
                com.veeva.clm.wrapResult("getListPrice_Product_Account", callback, ret);
                return;
            }
            ret = this.checkArgument("account", account);
            if (ret.success == false) {
                com.veeva.clm.wrapResult("getListPrice_Product_Account", callback, ret);
                return;
            }

            window["com_veeva_clm_productDefaultPricingRules"] = function (result) {
                com.veeva.clm.wrapResult("getListPrice_Product_Account", callback, result);
            };

            window["com_veeva_clm_get_productDefaultPricingRules"] = function () {

                dateString = com.veeva.clm.getCurrentDate();
                groupQuery = "veeva:queryObject(Pricing_Rule_vod__c),fields(ID),where(WHERE RecordTypeId=\"" + listPriceRecordTypeId + "\" AND Product_vod__c = \"" + product + "\"" + " AND Account_Group_vod__c=\"\" AND Account_vod__c=\"\"" + " AND Start_Date_vod__c <= \"" + dateString + "\" AND End_Date_vod__c >= \"" + dateString + "\"), com_veeva_clm_productDefaultPricingRules(result)";
                if (!com.veeva.clm.testMode) com.veeva.clm.runAPIRequest(groupQuery);else {
                    // TODO
                    com_veeva_clm_productDefaultPricingRules(com.veeva.clm.testResult.listPrices);
                }
            };

            window["com_veeva_clm_productAccountGroupPricingRules"] = function (result) {
                result = com.veeva.clm.formatResult(result);
                if (result.success && result.Pricing_Rule_vod__c.length == 0) {
                    // try account group
                    com_veeva_clm_get_productDefaultPricingRules();
                } else com.veeva.clm.wrapResult("getListPrice_Product_Account", callback, result);
            };

            // 4 pricing rule for account group
            window['com_veeva_clm_accountGroup'] = function (result) {
                result = com.veeva.clm.formatResult(result);
                if (result.success) {
                    accountGroup = result.Account.Account_Group_vod__c;
                    if (accountGroup != undefined && accountGroup != "") {
                        dateString = com.veeva.clm.getCurrentDate();
                        groupQuery = "veeva:queryObject(Pricing_Rule_vod__c),fields(ID),where(WHERE RecordTypeId=\"" + listPriceRecordTypeId + "\" AND Product_vod__c = \"" + product + "\"" + " AND Account_Group_vod__c=\"" + accountGroup + "\"" + " AND Start_Date_vod__c <= \"" + dateString + "\" AND End_Date_vod__c >= \"" + dateString + "\"), com_veeva_clm_productAccountGroupPricingRules(result)";
                        if (!com.veeva.clm.testMode) com.veeva.clm.runAPIRequest(groupQuery);else {
                            // TODO
                            com_veeva_clm_productAccountGroupPricingRules(com.veeva.clm.testResult.listPrices);
                        }
                    } else {
                        com_veeva_clm_get_productDefaultPricingRules();
                    }
                } else {
                    com.veeva.clm.wrapResult("getListPrice_Product_Account", callback, result);
                }
            };

            // 3 account group
            window["com_veeva_clm_productAccountPricingRules"] = function (result) {
                result = com.veeva.clm.formatResult(result);
                if (result.success && result.Pricing_Rule_vod__c.length == 0) {
                    // try account group
                    com.veeva.clm.getDataForObject("Account", account, "Account_Group_vod__c", com_veeva_clm_accountGroup);
                } else com.veeva.clm.wrapResult("getListPrice_Product_Account", callback, result);
            };

            // 2
            window["com_veeva_clm_listPriceTypeId_getListPrice_Product_Account"] = function (result) {
                result = com.veeva.clm.formatResult(result);
                if (result.success && result.RecordType && result.RecordType.length > 0) {
                    listPriceRecordTypeId = result.RecordType[0].ID;

                    dateString = com.veeva.clm.getCurrentDate();
                    query = "veeva:queryObject(Pricing_Rule_vod__c),fields(ID),where(WHERE RecordTypeId=\"" + listPriceRecordTypeId + "\" AND Product_vod__c = \"" + product + "\"" + " AND Account_vod__c=\"" + account + "\"" + " AND Start_Date_vod__c <= \"" + dateString + "\" AND End_Date_vod__c >= \"" + dateString + "\"), com_veeva_clm_productAccountPricingRules(result)";

                    if (!com.veeva.clm.testMode) com.veeva.clm.runAPIRequest(query);else com_veeva_clm_productAccountPricingRules(com.veeva.clm.testResult.listPrices);
                } else {
                    com.veeva.clm.wrapResult("getListPrice_Product_Account", callback, result);
                }
            };

            // 1, fetch list price record type first
            recordTypeQuery = "veeva:queryObject(RecordType),fields(ID),where(WHERE SobjectType=\"Pricing_Rule_vod__c\" AND Name_vod__c=\"List_Price_Rule_vod\"),com_veeva_clm_listPriceTypeId_getListPrice_Product_Account(result)";
            if (!com.veeva.clm.testMode) com.veeva.clm.runAPIRequest(recordTypeQuery);else com_veeva_clm_listPriceTypeId_getListPrice_Product_Account(testResult.listPriceRecordType);
        },

        /////////////////////// Approved Email ///////////////////////

        // Returns the record ID(s) for the Approved Document which matches the values specified and Status_vod = Approved
        // Gets the approved document by querying all products of type Detail Topic or Detail and compares against
        // the query of any approved documents with the passed in vault_id and
        // document_num. If there are multiple documents with these same ids, an error is thrown.
        // vault_id - specifies the Vault ID of the Approved Document to retrieve. (Vault_Instance_ID_vod on Approved_Document_vod)
        // document_num - specifies the document number of the Approved Document to retrieve. (Vault_Document_ID_vod on Approved_Document_vod)
        // callback - call back function which will be used to return the information
        getApprovedDocument: function getApprovedDocument(vault_id, document_num, callback) {
            var topicProducts;
            var detailProducts;
            var detailGroupProducts;
            var productGroups;

            // check callback parameter
            ret = this.checkCallbackFunction(callback);
            if (ret.success == false) return ret;

            // check arguments
            ret = this.checkArgument("vault_id", vault_id);
            if (ret.success == false) {
                com.veeva.clm.wrapResult("getApprovedDocument", callback, ret);
                return;
            }

            ret = this.checkArgument("document_num", document_num);
            if (ret.success == false) {
                com.veeva.clm.wrapResult("getApprovedDocument", callback, ret);
                return;
            }

            // 2b Check results of Approved Document query against My Setup results
            window["com_veeva_clm_DocumentTypeId_getDocument"] = function (result) {
                result = com.veeva.clm.formatResult(result);

                if (result.success && result.Approved_Document_vod__c && result.Approved_Document_vod__c.length == 1) {
                    var productsWithDetailGroups;

                    //If we have access to detail groups, align products with detail groups
                    if (detailGroupProducts != undefined && productGroups != undefined && productGroups.length > 0) {
                        productsWithDetailGroups = [];
                        var groupCount = 0;
                        for (var i = 0; i < detailGroupProducts.length; i++) {
                            for (var j = 0; j < productGroups.length; j++) {
                                //If the detail group product ID matches the product group's Product Catalog ID
                                //AND it is the product we are looking for, add it
                                if (detailGroupProducts[i].ID != undefined && productGroups[j].Product_Catalog_vod__c != undefined && productGroups[j].Product_vod__c != undefined && detailGroupProducts[i].ID == productGroups[j].Product_Catalog_vod__c && result.Approved_Document_vod__c[0].Product_vod__c == productGroups[j].Product_vod__c) {
                                    productsWithDetailGroups[groupCount] = {};
                                    productsWithDetailGroups[groupCount].ID = {};
                                    productsWithDetailGroups[groupCount].Detail_Group_vod__c = {};
                                    productsWithDetailGroups[groupCount].ID = productGroups[j].Product_vod__c;
                                    productsWithDetailGroups[groupCount].Detail_Group_vod__c = detailGroupProducts[i].ID;
                                    groupCount++;
                                    break;
                                }
                            }
                        }
                    }

                    if (topicProducts && topicProducts.length > 0) {
                        //Check against the detail topics for a valid product match
                        for (var j = 0; j < topicProducts.length; j++) {
                            if (result.Approved_Document_vod__c[0].Product_vod__c === topicProducts[j].ID) {
                                //If we have product groups that match our current product, run through them
                                //Otherwise, we just have a product w/o detail groups, so return the document
                                if (productsWithDetailGroups != undefined && productsWithDetailGroups.length > 0) {
                                    for (var i = 0; i < productsWithDetailGroups.length; i++) {
                                        if (result.Approved_Document_vod__c[0].Detail_Group_vod__c != undefined && result.Approved_Document_vod__c[0].Product_vod__c == productsWithDetailGroups[i].ID && result.Approved_Document_vod__c[0].Detail_Group_vod__c == productsWithDetailGroups[i].Detail_Group_vod__c) {
                                            var ret = {};
                                            ret.Approved_Document_vod__c = {};
                                            ret.Approved_Document_vod__c.ID = result.Approved_Document_vod__c[0].ID;
                                            ret.success = true;
                                            com.veeva.clm.wrapResult("getApprovedDocument", callback, ret);
                                            return;
                                        }
                                    }
                                } else {
                                    var ret = {};
                                    ret.Approved_Document_vod__c = {};
                                    ret.Approved_Document_vod__c.ID = result.Approved_Document_vod__c[0].ID;
                                    ret.success = true;
                                    com.veeva.clm.wrapResult("getApprovedDocument", callback, ret);
                                    return;
                                }
                            }
                        }
                    }
                    if (detailProducts && detailProducts.length > 0) {
                        //Check against the details for a valid product match
                        for (var k = 0; k < detailProducts.length; k++) {
                            if (result.Approved_Document_vod__c[0].Product_vod__c === detailProducts[k].ID) {
                                //If we have product groups that match our current product, run through them
                                //Otherwise, we just have a product w/o detail groups, so return the document
                                if (productsWithDetailGroups != undefined && productsWithDetailGroups.length > 0) {
                                    for (var i = 0; i < productsWithDetailGroups.length; i++) {
                                        if (result.Approved_Document_vod__c[0].Detail_Group_vod__c != undefined && result.Approved_Document_vod__c[0].Product_vod__c == productsWithDetailGroups[i].ID && result.Approved_Document_vod__c[0].Detail_Group_vod__c == productsWithDetailGroups[i].Detail_Group_vod__c) {
                                            var ret = {};
                                            ret.Approved_Document_vod__c = {};
                                            ret.Approved_Document_vod__c.ID = result.Approved_Document_vod__c[0].ID;
                                            ret.success = true;
                                            com.veeva.clm.wrapResult("getApprovedDocument", callback, ret);
                                            return;
                                        }
                                    }
                                } else {
                                    var ret = {};
                                    ret.Approved_Document_vod__c = {};
                                    ret.Approved_Document_vod__c.ID = result.Approved_Document_vod__c[0].ID;
                                    ret.success = true;
                                    com.veeva.clm.wrapResult("getApprovedDocument", callback, ret);
                                    return;
                                }
                            }
                        }
                    }
                    //Found no match, return empty object
                    var ret = {};
                    ret.success = true;
                    com.veeva.clm.wrapResult("getApprovedDocument", callback, ret);
                }
                //Query success, but we found more than one doc with the same vault id and doc num, so return empty
                else if (result.success && result.Approved_Document_vod__c && result.Approved_Document_vod__c.length > 1) {
                        var ret = {};
                        ret.success = true;
                        com.veeva.clm.wrapResult("getApprovedDocument", callback, ret);
                    } else {
                        if (result.code == 1021) {
                            if (result.message.indexOf("Detail_Group_vod__c") >= 0) {
                                approvedDocumentQuery = "veeva:queryObject(Approved_Document_vod__c),fields(ID,Product_vod__c),where(WHERE Vault_Instance_ID_vod__c=\"" + vault_id + "\" AND Vault_Document_ID_vod__c=\"" + document_num + "\" AND Status_vod__c=\"Approved_vod\"),com_veeva_clm_DocumentTypeId_getDocument(result)";

                                if (!com.veeva.clm.testMode) com.veeva.clm.runAPIRequest(approvedDocumentQuery);else com_veeva_clm_DocumentTypeId_getDocument(testResult.approvedDocumentWithId2);
                            }
                            return;
                        }

                        //Didn't find anything matching, return empty object with success true (not just an empty query object)
                        var ret = {};
                        ret.success = true;
                        com.veeva.clm.wrapResult("getApprovedDocument", callback, ret);
                    }
            };

            // 2a - If we have detail groups, get the product groups so we can align products to detail groups
            window["com_veeva_clm_getProductGroups"] = function (result) {
                result = com.veeva.clm.formatResult(result);

                if (result.success) {
                    productGroups = result.Product_Group_vod__c;

                    approvedDocumentQuery = "veeva:queryObject(Approved_Document_vod__c),fields(ID,Product_vod__c,Detail_Group_vod__c),where(WHERE Vault_Instance_ID_vod__c=\"" + vault_id + "\" AND Vault_Document_ID_vod__c=\"" + document_num + "\" AND Status_vod__c=\"Approved_vod\"),com_veeva_clm_DocumentTypeId_getDocument(result)";

                    if (!com.veeva.clm.testMode) com.veeva.clm.runAPIRequest(approvedDocumentQuery);else com_veeva_clm_DocumentTypeId_getDocument(testResult.approvedDocumentWithId);
                } else {
                    if (result.code == 1011) {
                        //No access to Product Groups specifically, so just use Products
                        if (result.message.indexOf("Product_Group_vod__c") >= 0) {
                            approvedDocumentQuery = "veeva:queryObject(Approved_Document_vod__c),fields(ID,Product_vod__c),where(WHERE Vault_Instance_ID_vod__c=\"" + vault_id + "\" AND Vault_Document_ID_vod__c=\"" + document_num + "\" AND Status_vod__c=\"Approved_vod\"),com_veeva_clm_DocumentTypeId_getDocument(result)";

                            if (!com.veeva.clm.testMode) com.veeva.clm.runAPIRequest(approvedDocumentQuery);else com_veeva_clm_DocumentTypeId_getDocument(testResult.approvedDocumentWithId2);
                        }
                        return;
                    }
                    com.veeva.clm.wrapResult("getApprovedDocument", callback, result);
                }
            };

            // 1, get detail topic products first
            com.veeva.clm.getProduct_MySetup("Detail Topic", function (result) {
                result = com.veeva.clm.formatResult(result);

                // got a list of detail topic products
                if (result.success) {
                    topicProducts = result.Product_vod__c;

                    com.veeva.clm.getProduct_MySetup("Detail", function (result) {
                        if (result.success) {
                            detailProducts = result.Product_vod__c;

                            com.veeva.clm.getProduct_MySetup("Detail Group", function (result) {
                                if (result.success) {
                                    detailGroupProducts = result.Product_vod__c;

                                    var detailGroupIDs = [];
                                    for (var i = 0; i < detailGroupProducts.length; i++) {
                                        detailGroupIDs[i] = detailGroupProducts[i].ID;
                                    }

                                    var groupArray = com.veeva.clm.joinStringArrayForIn(detailGroupIDs);
                                    if (groupArray == "") {
                                        groupArray = "{}";
                                    }

                                    //Pass in our detail groups and find any products associated with them
                                    query = "veeva:queryObject(Product_Group_vod__c),fields(ID,Product_vod__c,Product_Catalog_vod__c),where(WHERE Product_Catalog_vod__c IN " + groupArray + "),com_veeva_clm_getProductGroups(result)";
                                    if (!com.veeva.clm.testMode) com.veeva.clm.runAPIRequest(query);else com_veeva_clm_getProductGroups(com.veeva.clm.testResult.productGroups);
                                } else {
                                    // ERROR when getting Product of detail group type.
                                    com.veeva.clm.wrapResult("getApprovedDocument", callback, result);
                                    return;
                                }
                            });
                        } else {
                            // ERROR when getting Product of detail type.
                            com.veeva.clm.wrapResult("getApprovedDocument", callback, result);
                            return;
                        }
                    });
                } else {
                    // ERROR when getting Product of detail topic type.
                    com.veeva.clm.wrapResult("getApprovedDocument", callback, result);
                    return;
                }
            });
        },
        // Launches the Send Email user interface with the email template and fragments selected.  An Account must be selected.
        // If CLM_Select_Account_Preview_Mode Veeva Setting is enabled, then Select Account dialogue is opened so the user can select an account.
        // If the Veeva Setting is not enabled and no Account is selected, then no action will be performed.
        // email_template - specifies the record ID of the Email Template to use
        // email_fragments - array or string with comma separated values of record IDs of the Email fragments to use.  Can be made optional by putting in ""
        // callback - call back function which will be used to return the information
        launchApprovedEmail: function launchApprovedEmail(email_template, email_fragments, callback) {
            // check parameter

            ret = this.checkCallbackFunction(callback);
            if (ret.success == false) return ret;

            // check arguments and make them empty if they don't exist
            if (email_template == undefined || email_template == null) {
                email_template = "";
            }

            //Make sure email_fragments exists
            if (email_fragments == undefined || email_fragments == null) {
                email_fragments = "";
            }

            request = null;
            window["com_veeva_clm_launchApprovedEmail"] = function (result) {
                result = com.veeva.clm.formatResult(result);
                if (result.success) {
                    ret = {};
                    ret.success = true;
                    if (result.code != undefined) {
                        ret.code = result.code;
                        ret.message = result.message;
                    }
                    com.veeva.clm.wrapResult("launchApprovedEmail", callback, ret);
                } else {
                    ret = {};
                    ret.success = false;
                    ret.code = result.code;
                    ret.message = "Request: " + request + " failed: " + result.message;
                    com.veeva.clm.wrapResult("launchApprovedEmail", callback, ret);
                }
            };

            request = "veeva:launchApprovedEmail(" + email_template + "," + email_fragments + "),callback(com_veeva_clm_launchApprovedEmail)";

            if (!com.veeva.clm.testMode) com.veeva.clm.runAPIRequest(request);else com_veeva_clm_launchApprovedEmail(com.veeva.clm.testResult.approvedEmailId);
        },

        /////////////////////// Functions to replace exising API calls ///////////////////////

        // 1
        // Returns the value of a field for a specific record related to the current call
        // object -  Limited to the following keywords: Account, TSF, User, Address, Call, Presentation, KeyMessage, and CallObjective.
        // field- field api name to return a value for
        // callback - call back function which will be used to return the information
        getDataForCurrentObject: function getDataForCurrentObject(object, field, callback) {
            ret = this.checkCallbackFunction(callback);
            if (ret.success == false) return ret;

            // check arguments
            ret = this.checkArgument("object", object);
            if (ret.success == false) {
                com.veeva.clm.wrapResult("getDataForCurrentObject", callback, ret);
                return;
            }

            ret = this.checkArgument("field", field);
            if (ret.success == false) {
                com.veeva.clm.wrapResult("getDataForCurrentObject", callback, ret);
                return;
            }

            window["com_veeva_clm_getCurrentObjectField"] = function (result) {
                // TODO result format
                com.veeva.clm.wrapResult("getDataForCurrentObject", callback, result);
            };

            lowerName = object.toLowerCase();

            request = "veeva:getDataForObjectV2(" + object + "),fieldName(" + field + "),com_veeva_clm_getCurrentObjectField(result)";
            if (!com.veeva.clm.testMode) com.veeva.clm.runAPIRequest(request, callback);else com_veeva_clm_getCurrentObjectField(com.veeva.clm.testResult.common);
        },

        // 2
        // Returns the value of a field for a specific record
        // object - specifies the object api name (object keywords used in getDataForCurrentObject are not valid, except for Account and User)
        // record - specifies the record id.
        // field- field api name to return a value for
        // callback - call back function which will be used to return the information
        getDataForObject: function getDataForObject(object, record, field, callback) {
            ret = this.checkCallbackFunction(callback);
            if (ret.success == false) return ret;

            // check arguments
            ret = this.checkArgument("object", object);
            if (ret.success == false) {
                com.veeva.clm.wrapResult("getDataForObject", callback, ret);
                return;
            }

            ret = this.checkArgument("record", record);
            if (ret.success == false) {
                com.veeva.clm.wrapResult("getDataForObject", callback, ret);
                return;
            }

            ret = this.checkArgument("field", field);
            if (ret.success == false) {
                com.veeva.clm.wrapResult("getDataForObject", callback, ret);
                return;
            }

            window["com_veeva_clm_getObjectField"] = function (result) {
                // TODO result format
                com.veeva.clm.wrapResult("getDataForObject", callback, result);
            };

            request = "veeva:getDataForObjectV2(" + object + "),objId(" + record + "),fieldName(" + field + "),com_veeva_clm_getObjectField(result)";
            if (!com.veeva.clm.testMode) com.veeva.clm.runAPIRequest(request, callback);else com_veeva_clm_getObjectField(com.veeva.clm.testResult.common);
        },

        // 3
        // Creates a new record for the specified object
        // object - specifies the object api name
        // values - json object with the fields and values to be written to the new record
        // callback - call back function which will be used to return the information
        // NOTE: This function returns success: true as long as the user has access to the object.
        //       If the user does not have access to one of the fields specified, success: true is still returned, however,
        //       and the fields the user does have access to are still updated.
        createRecord: function createRecord(object, values, callback) {
            ret = this.checkCallbackFunction(callback);
            if (ret.success == false) return ret;

            // check arguments
            ret = this.checkArgument("object", object);
            if (ret.success == false) {
                com.veeva.clm.wrapResult("createRecord", callback, ret);
                return;
            }

            ret = this.checkArgument("values", values);
            if (ret.success == false) {
                com.veeva.clm.wrapResult("createRecord", callback, ret);
                return;
            }

            request = com.veeva.clm.generateSaveRecordRequest(object, values, "com_veeva_clm_createRecord");
            window["com_veeva_clm_createRecord"] = function (result) {
                result = com.veeva.clm.formatResult(result);
                if (result.success) {
                    ret = {};
                    ret.success = true;
                    ret.operation = result.operation;
                    ret[object] = {};
                    ret[object].ID = result.objectId;
                    if (result.code != undefined) {
                        ret.code = result.code;
                        ret.message = result.message;
                    }
                    com.veeva.clm.wrapResult("createRecord", callback, ret);
                } else {
                    ret = {};
                    ret.success = false;
                    ret.code = 2100;
                    ret.message = "Request: " + request + " failed: " + result.message;
                    com.veeva.clm.wrapResult("createRecord", callback, ret);
                }
            };

            // create record
            if (!com.veeva.clm.testMode) com.veeva.clm.runAPIRequest(request);else com_veeva_clm_createRecord(com.veeva.clm.testResult.common);
        },

        // 4
        // Updates a specified record
        // object - specifies the object api name
        // record - specifies the record id to be updated
        // values - json object with the fields and values updated on the record
        // callback - call back function which will be used to return the information
        // NOTE: This function returns success: true as long as the user has access to the object.
        //       If the user does not have access to one of the fields specified, success: true is still returned, however,
        //       and the fields the user does have access to are still updated.
        updateRecord: function updateRecord(object, record, values, callback) {
            ret = this.checkCallbackFunction(callback);
            if (ret.success == false) return ret;

            // check arguments
            ret = this.checkArgument("object", object);
            if (ret.success == false) {
                com.veeva.clm.wrapResult("updateRecord", callback, ret);
                return;
            }

            ret = this.checkArgument("record", record);
            if (ret.success == false) {
                com.veeva.clm.wrapResult("updateRecord", callback, ret);
                return;
            }

            ret = this.checkArgument("values", values);
            if (ret.success == false) {
                com.veeva.clm.wrapResult("updateRecord", callback, ret);
                return;
            }
            // Id is required for updating existing record
            values.IdNumber = record;

            // create record
            request = com.veeva.clm.generateSaveRecordRequest(object, values, "com_veeva_clm_updateRecord");

            window["com_veeva_clm_updateRecord"] = function (result) {
                result = com.veeva.clm.formatResult(result);
                if (result.success) {
                    ret = {};
                    ret.success = true;
                    ret.operation = result.operation;
                    ret[object] = {};
                    ret[object].ID = result.objectId;
                    if (result.code != undefined) {
                        ret.code = result.code;
                        ret.message = result.message;
                    }
                    com.veeva.clm.wrapResult("updateRecord", callback, ret);
                } else {
                    ret = {};
                    ret.success = false;
                    ret.code = 2100;
                    ret.message = "Request: " + request + " failed: " + result.message;
                    com.veeva.clm.wrapResult("updateRecord", callback, ret);
                }
            };

            if (!com.veeva.clm.testMode) com.veeva.clm.runAPIRequest(request);else com_veeva_clm_updateRecord(com.veeva.clm.testResult.common);
        },

        // 5a
        // Navigates to the specified key message (Key_Message_vod__c)
        // key message - external ID field of the key message to jump to. Usually is Media_File_Name_vod__c, but does not have to be.
        // clm presentation - external ID of the CLM Presentation if the key message is in a different CLM Presentation.
        // Usually is Presentation_Id_vod__c, but does not have to be. Can be made optional by putting in "".
        gotoSlide: function gotoSlide(keyMessage, presentation) {

            ret = this.checkArgument("keyMessage", keyMessage);
            if (ret.success == false) {
                return ret;
            }

            request = null;
            if (presentation == undefined || presentation == null || presentation == "") {
                // goto within current presenation
                request = "veeva:gotoSlide(" + keyMessage + ")";
            } else {
                request = "veeva:gotoSlide(" + keyMessage + "," + presentation + ")";
            }

            if (!com.veeva.clm.testMode) com.veeva.clm.runAPIRequest(request);
        },

        // 5b
        // Navigates to the specified key message (Key_Message_vod__c)
        // key message - Vault_External_Id_vod__c field of the key message to jump to
        // clm presentation - Vault_External_Id_vod__c of the CLM Presentation if the key message is in a different CLM Presentation.
        // Can be made optional by putting in "".
        gotoSlideV2: function gotoSlideV2(keyMessage, presentation) {

            ret = this.checkArgument("keyMessage", keyMessage);
            if (ret.success == false) {
                return ret;
            }

            request = null;
            if (presentation == undefined || presentation == null || presentation == "") {
                // goto within current presentation
                request = "veeva:gotoSlideV2(" + keyMessage + ")";
            } else {
                request = "veeva:gotoSlideV2(" + keyMessage + "," + presentation + ")";
            }

            if (!com.veeva.clm.testMode) com.veeva.clm.runAPIRequest(request);
        },

        // 6
        // Navigates to the next slide based on the CLM Presentation Slide display order
        nextSlide: function nextSlide() {
            request = "veeva:nextSlide()";
            com.veeva.clm.runAPIRequest(request);
        },

        // 7
        // Navigates to the previous slide based on the CLM Presentation Slide display order
        prevSlide: function prevSlide() {
            request = "veeva:prevSlide()";
            com.veeva.clm.runAPIRequest(request);
        },

        // 8
        // Returns the value of the field in UTC format.  Only works with field of type Date or Datetime.
        // object - specifies the object api name (object keywords used in getDataForCurrentObject are not valid, except for Account)
        // record - specifies the record id.
        // field- field api name to return a value for
        // callback - call back function which will be used to return the information
        getUTCdatetime: function getUTCdatetime(object, record, field, callback) {
            ret = this.checkCallbackFunction(callback);
            if (ret.success == false) return ret;

            // check arguments
            ret = this.checkArgument("object", object);
            if (ret.success == false) {
                com.veeva.clm.wrapResult("getUTCdatetime", callback, ret);
                return;
            }

            ret = this.checkArgument("record", record);
            if (ret.success == false) {
                com.veeva.clm.wrapResult("getUTCdatetime", callback, ret);
                return;
            }

            ret = this.checkArgument("field", field);
            if (ret.success == false) {
                com.veeva.clm.wrapResult("getUTCdatetime", callback, ret);
                return;
            }

            window["com_veeva_clm_getUTCdatetime"] = function (result) {
                // TODO result format
                com.veeva.clm.wrapResult("getUTCdatetime", callback, result);
            };

            request = "veeva:getDataForObjectV3(" + object + "),objId(" + record + "),fieldName(" + field + "),getUTCdatetime(true),callback(com_veeva_clm_getUTCdatetime)";
            if (!com.veeva.clm.testMode) com.veeva.clm.runAPIRequest(request, callback);else com_veeva_clm_getUTCdatetime(com.veeva.clm.testResult.common);
        },

        // 9,
        // Updates the current record related to the call
        // object - specifies the object api name
        // values - json object with the fields and values updated on the record (ignores id field if specified)
        // callback - call back function which will be used to return the information
        // Uses saveObjectV2 call
        // Note: This function returns success: true as long as the user has access to the object and record specified.
        // If the user does not have access to one of the fields specified, success: true is still returned and the fields the user does have access to are updated.
        // If there are fields which are not accessible, code 0200 is returned and the message specifies the field names.
        // If there is no current record (user is in Media Preview), the function is temporarily saved and executed when an Account is selected.
        // If no Account is selected, the function is discarded on exit of Media Preview.  The callback function will not be executed if there is no current record.
        updateCurrentRecord: function updateCurrentRecord(object, values, callback) {
            ret = this.checkCallbackFunction(callback);
            if (ret.success == false) return ret;

            // check arguments
            ret = this.checkArgument("object", object);
            if (ret.success == false) {
                com.veeva.clm.wrapResult("updateCurrentRecord", callback, ret);
                return;
            }

            ret = this.checkArgument("values", values);
            if (ret.success == false) {
                com.veeva.clm.wrapResult("updateCurrentRecord", callback, ret);
                return;
            }

            // create record
            request = "veeva:saveObjectV2(" + object + "),updateCurrentRecord(),value(" + JSON.stringify(values) + "),callback(com_veeva_clm_updateCurrentRecord)";

            window["com_veeva_clm_updateCurrentRecord"] = function (result) {
                result = com.veeva.clm.formatResult(result);
                if (result.success) {
                    ret = {};
                    ret.success = true;
                    ret[object] = {};
                    ret[object].ID = result.objectId;
                    if (result.code != undefined) {
                        ret.code = result.code;
                        ret.message = result.message;
                    }
                    com.veeva.clm.wrapResult("updateCurrentRecord", callback, ret);
                } else {
                    ret = {};
                    ret.success = false;
                    ret.code = 2100;
                    ret.message = "Request: " + request + " failed: " + result.message;
                    com.veeva.clm.wrapResult("updateCurrentRecord", callback, ret);
                }
            };

            if (!com.veeva.clm.testMode) com.veeva.clm.runAPIRequest(request);else com_veeva_clm_updateCurrentRecord(com.veeva.clm.testResult.common);
        },

        // 10,
        // Formats a string for createRecordsOnExit() and returns it
        formatCreateRecords: function formatCreateRecords(objectArray, valueArray) {
            //check arguments
            ret = this.checkArgument("objectArray", objectArray);
            if (ret.success == false) {
                return ret;
            }

            ret = this.checkArgument("valueArray", valueArray);
            if (ret.success == false) {
                return ret;
            }

            if (!(objectArray instanceof Array)) {
                objectArray = [objectArray];
            }
            if (!(valueArray instanceof Array)) {
                valueArray = [valueArray];
            }

            //If the number of objects doesn't match the number of values, return
            ret = {};
            if (objectArray.length != valueArray.length) {
                ret.success = false;
                ret.code = 2003;
                ret.message = "Parameter arrays must be of equal length";
                return ret;
            }

            //Make the concatenation of all saveObjectV2 requests we need to make
            var fullString = "";
            for (var ndx = 0; ndx < objectArray.length; ndx++) {
                fullString = fullString.concat(com.veeva.clm.generateSaveRecordRequest(objectArray[ndx], valueArray[ndx], "") + ";");
            }

            return fullString;
        },

        // 11,
        // Formats a string for updateRecordsOnExit() and returns it
        formatUpdateRecords: function formatUpdateRecords(objectNameArray, objectIdArray, valueArray) {
            //check arguments
            ret = this.checkArgument("objectNameArray", objectNameArray);
            if (ret.success == false) {
                return ret;
            }

            ret = this.checkArgument("objectIdArray", objectIdArray);
            if (ret.success == false) {
                return ret;
            }

            ret = this.checkArgument("valueArray", valueArray);
            if (ret.success == false) {
                return ret;
            }

            if (!(objectNameArray instanceof Array)) {
                objectNameArray = [objectNameArray];
            }
            if (!(objectIdArray instanceof Array)) {
                objectIdArray = [objectIdArray];
            }
            if (!(valueArray instanceof Array)) {
                valueArray = [valueArray];
            }

            //If the number of objects doesn't match the number of values, return
            ret = {};
            if (objectNameArray.length != valueArray.length || objectNameArray.length != objectIdArray.length) {
                ret.success = false;
                ret.code = 2003;
                ret.message = "Parameter arrays must be of equal length";
                return ret;
            }

            //Make the concatenation of all saveObjectV2 requests we need to make
            var fullString = "";
            for (var ndx = 0; ndx < objectNameArray.length; ndx++) {
                //Set IdNumber in value array
                valueArray[ndx].IdNumber = objectIdArray[ndx];

                //concat string together
                fullString = fullString.concat(com.veeva.clm.generateSaveRecordRequest(objectNameArray[ndx], valueArray[ndx], "") + ";");
            }

            return fullString;
        },

        // 12,
        // Creates a string as if it was a request for updateCurrentRecord and returns it
        formatUpdateCurrentRecords: function formatUpdateCurrentRecords(objectArray, valueArray) {
            //check arguments
            ret = this.checkArgument("objectArray", objectArray);
            if (ret.success == false) {
                com.veeva.clm.wrapResult("formatUpdateCurrentRecord", callback, ret);
                return ret;
            }

            ret = this.checkArgument("valueArray", valueArray);
            if (ret.success == false) {
                com.veeva.clm.wrapResult("formatUpdateCurrentRecord", callback, ret);
                return ret;
            }

            if (!(objectArray instanceof Array)) {
                objectArray = [objectArray];
            }
            if (!(valueArray instanceof Array)) {
                valueArray = [valueArray];
            }

            //If the number of objects doesn't match the number of values, return
            ret = {};
            if (objectArray.length != valueArray.length) {
                ret.success = false;
                ret.code = 2003;
                ret.message = "Parameter arrays must be of equal length";
                return ret;
            }

            //Make the concatenation of all saveObjectV2 requests we need to make
            var fullString = "";
            for (var ndx = 0; ndx < objectArray.length; ndx++) {
                fullString = fullString.concat("veeva:saveObjectV2(" + objectArray[ndx] + "),updateCurrentRecord(),value(" + JSON.stringify(valueArray[ndx]) + "),callback()" + ";");
            }

            return fullString;
        },

        //13,
        // Formats a createRecord or updateRecord request in the proper form
        generateSaveRecordRequest: function generateSaveRecordRequest(object, values, callback) {
            return "veeva:saveObjectV2(" + object + "),value(" + JSON.stringify(values) + "),callback(" + callback + ")";
        },

        //14,
        // Queries for and returns the specified fields for all records which match the where clause.
        // Also returns count of records returned.
        //
        // object - The API Name of the object that you want to query
        // fields - Comma delimited string of field API names
        //
        // Optional fields:
        // where - string for the where clause (See documentation for supported clauses).
        // sort - Array of strings which represents the sort, example: ["Name_vod__c, DESC", "Status_vod__c, ASC"]
        // limit - the maximum number of records to return
        queryRecord: function queryRecord(object, fields, where, sort, limit, callback) {
            ret = this.checkCallbackFunction(callback);
            if (ret.success == false) return ret;

            // check arguments
            ret = this.checkArgument("object", object);
            if (ret.success == false) {
                com.veeva.clm.wrapResult("queryRecord", callback, ret);
                return;
            }

            ret = this.checkArgument("fields", fields);
            if (ret.success == false) {
                com.veeva.clm.wrapResult("queryRecord", callback, ret);
                return;
            }

            //Don't check the Where, limit, or sort clauses because they can be null and thats acceptable.

            window["com_veeva_clm_queryRecordReturn"] = function (result) {
                result = com.veeva.clm.formatResult(result);
                com.veeva.clm.wrapResult("queryRecord", callback, result);
                return;
            };

            request = "veeva:queryObject(" + object + "),fields(" + fields + "),";
            if (where != null && where != undefined) {
                request = request + "where(" + where + "),";
            }
            if (sort != null && sort != undefined) {
                request = request + "sort(" + JSON.stringify(sort) + "),";
            }
            if (limit != null && limit != undefined) {
                request = request + "limit(" + limit + "),";
            }
            request = request + "com_veeva_clm_queryRecordReturn(result)";

            com.veeva.clm.runAPIRequest(request, callback);
        },

        //15,
        // Returns the translated label for each of the specified fields
        //
        // object - API Name of the object
        // fields - Array of Field API Names
        getFieldLabel: function getFieldLabel(object, fields, callback) {
            ret = this.checkCallbackFunction(callback);
            if (ret.success == false) return ret;

            // check arguments
            ret = this.checkArgument("object", object);
            if (ret.success == false) {
                com.veeva.clm.wrapResult("getFieldLabel", callback, ret);
                return;
            }

            ret = this.checkArgument("fields", fields);
            if (ret.success == false) {
                com.veeva.clm.wrapResult("getFieldLabel", callback, ret);
                return;
            }

            window["com_veeva_clm_getFieldLabelReturn"] = function (result) {
                result = com.veeva.clm.formatResult(result);
                com.veeva.clm.wrapResult("getFieldLabel", callback, result);
                return;
            };

            request = "veeva:getFieldLabel(" + object + "),fields(" + JSON.stringify(fields) + "), com_veeva_clm_getFieldLabelReturn(result)";
            com.veeva.clm.runAPIRequest(request, callback);
        },

        //16,
        // Returns each record type api name and record type translated label
        //
        // object - API Name of the object to get all record types for
        getRecordTypeLabels: function getRecordTypeLabels(object, callback) {
            ret = this.checkCallbackFunction(callback);
            if (ret.success == false) return ret;

            // check arguments
            ret = this.checkArgument("object", object);
            if (ret.success == false) {
                com.veeva.clm.wrapResult("getRecordTypeLabels", callback, ret);
                return;
            }

            window["com_veeva_clm_getRecordTypeLabelsReturn"] = function (result) {
                result = com.veeva.clm.formatResult(result);
                com.veeva.clm.wrapResult("getRecordTypeLabels", callback, result);
                return;
            };

            request = "veeva:getRecordTypeLabels(" + object + "),com_veeva_clm_getRecordTypeLabelsReturn(result)";
            com.veeva.clm.runAPIRequest(request, callback);
        },

        //17,
        // Returns the translated label for each of the picklist values of the specified field
        //
        // object - API Name of the object
        // field - API Name of the picklist field
        getPicklistValueLabels: function getPicklistValueLabels(object, field, callback) {
            ret = this.checkCallbackFunction(callback);
            if (ret.success == false) return ret;

            // check arguments
            ret = this.checkArgument("object", object);
            if (ret.success == false) {
                com.veeva.clm.wrapResult("getPicklistValueLabels", callback, ret);
                return;
            }

            ret = this.checkArgument("field", field);
            if (ret.success == false) {
                com.veeva.clm.wrapResult("getPicklistValueLabels", callback, ret);
                return;
            }

            window["com_veeva_clm_getPicklistValueLabelsReturn"] = function (result) {
                result = com.veeva.clm.formatResult(result);
                com.veeva.clm.wrapResult("getPicklistValueLabels", callback, result);
                return;
            };

            request = "veeva:getPicklistValueLabels(" + object + "),field(" + field + "), com_veeva_clm_getPicklistValueLabelsReturn(result)";
            com.veeva.clm.runAPIRequest(request, callback);
        },

        //18,
        // Returns object translated labels array for each object API name
        // objects - array of object API Names to get translated labels for
        getObjectLabels: function getObjectLabels(objects, callback) {
            var ret = this.checkCallbackFunction(callback);
            if (ret.success == false) return ret;

            // check arguments
            ret = this.checkArgument("objects", objects);
            if (ret.success == false) {
                com.veeva.clm.wrapResult("getObjectLabels", callback, ret);
                return;
            }

            window["com_veeva_clm_getObjectLabelsReturn"] = function (result) {
                result = com.veeva.clm.formatResult(result);
                com.veeva.clm.wrapResult("getObjectLabels", callback, result);
                return;
            };

            request = "veeva:getObjectLabels(" + JSON.stringify(objects) + "),com_veeva_clm_getObjectLabelsReturn(result)";
            com.veeva.clm.runAPIRequest(request, callback);
        },

        /////////////////////// CLM Specific ///////////////////////
        //1,
        // Shows slide selector with specified presentation:key messages; callback gets notified if there aren't any valid key messages
        // The selector shows presentations in the same order as requested, but slide are in the order as defined in the presentation,
        // not the order specified in the request.
        launchSelector: function launchSelector(presentationSlides, callback) {
            // check parameter
            var ret = this.checkCallbackFunction(callback);
            if (ret.success == false) return ret;

            // check arguments
            ret = this.checkArgument("presentationSlides", presentationSlides);
            if (ret.success == false) {
                com.veeva.clm.wrapResult("presentationSlides", callback, ret);
                return;
            }

            if (presentationSlides.constructor === Array) {
                // check each element for empty presentation id
                for (var i = 0; i < presentationSlides.length; i++) {
                    var presentationMessages = presentationSlides[i];
                    if (presentationMessages != null && (typeof presentationMessages === 'undefined' ? 'undefined' : _typeof(presentationMessages)) === 'object') {
                        for (var prop in presentationMessages) {
                            if (presentationMessages.hasOwnProperty(prop) && prop == "") {
                                // empty presentastion id
                                ret = {};
                                ret.success = false;
                                ret.code = 2002;
                                ret.message = "presentation id is empty";
                                com.veeva.clm.wrapResult("presentationSlides", callback, ret);
                                return;
                            }
                        }
                    }
                }
            }

            var request = null;
            window["com_veeva_clm_launchApprovedEmail"] = function (result) {
                result = com.veeva.clm.formatResult(result);
                var ret = {};
                if (result.success) {
                    ret.success = true;
                    if (result.code != undefined) {
                        ret.code = result.code;
                        ret.message = result.message;
                    }
                    com.veeva.clm.wrapResult("launchSelector", callback, ret);
                } else {
                    ret.success = false;
                    ret.code = result.code;
                    ret.message = "Request: " + request + " failed: " + result.message;
                    com.veeva.clm.wrapResult("launchSelector", callback, ret);
                }
            };

            request = "veeva:launchSelector(" + JSON.stringify(presentationSlides) + "),callback(com_veeva_clm_launchSelector)";

            if (!com.veeva.clm.testMode) com.veeva.clm.runAPIRequest(request);else com_veeva_clm_launchSelector(com.veeva.clm.testResult.launchSelectorResult);
        },

        /////////////////////// Engage ///////////////////////

        // 1,
        // Creates a new record for Multichannel activity line.  The Engage code will automatically fill in the Multichannel Activity,
        // Asset Version, Asset VExternal ID, Call (if there is one), DateTime, Debug?, Multichannel Content, Multichannel Content Asset,
        // Sent Email (if there is one), View Order (if Event Type = Slide View).  Custom = "True" will always be set and the Name is autonumbered.
        // If not specified with custom values, Detail Group, Detail Group VExternal Id, Key Message, Key Message VExternal ID, Product,
        // Product VExternal ID are also automatically filled in.
        // values - json object with the fields and values updated on the record
        // callback - call back function which will be used to return the information
        createMultichannelActivityLine: function createMultichannelActivityLine(values, callback) {
            ret = this.checkCallbackFunction(callback);
            if (ret.success == false) return ret;

            ret = this.checkArgument("values", values);
            if (ret.success == false) {
                com.veeva.clm.wrapResult("createMultichannelActivityLine", callback, ret);
                return;
            }

            window["com_veeva_clm_createActivityLine"] = function (result) {
                com.veeva.clm.wrapResult("createMultichannelActivityLine", callback, result);
            };

            request = "veeva:createActivityLine(),value(" + JSON.stringify(values) + "),com_veeva_clm_createActivityLine(result)";
            com.veeva.clm.runAPIRequest(request, callback);
        },

        /////////////////////// Supporting Functions ///////////////////////

        // join string array to a in expression
        joinStringArrayForIn: function joinStringArrayForIn(result) {
            var ret = "";
            if (result.length > 0) {
                for (i = 0; i < result.length; i++) {
                    if (i == 0) ret += "{\"" + result[i] + "\"";else {
                        ret += ",\"" + result[i] + "\"";
                    }
                }
                ret += "}";
            }

            return ret;
        },

        joinFieldArray: function joinFieldArray(fields) {
            var ret = "";
            if (fields.length > 0) {
                for (i = 0; i < fields.length; i++) {
                    if (i == 0) ret += fields[i];else {
                        ret += "," + fields[i];
                    }
                }
            }

            return ret;
        },

        isFunction: function isFunction(toCheck) {
            var getType = {};
            return toCheck && getType.toString.call(toCheck) === '[object Function]';
        },

        checkCallbackFunction: function checkCallbackFunction(toCheck) {
            // check arguments
            ret = {};
            if (toCheck == undefined) {
                ret.success = false;
                ret.code = 2000;
                ret.message = "callback is missing";
                return ret;
            }

            if (this.isFunction(toCheck) == false) {
                ret.success = false;
                ret.code = 2001;
                ret.message = "callback is not a JavaScript function";
            } else {
                ret.success = true;
            }

            return ret;
        },

        checkArgument: function checkArgument(name, value) {
            ret = {};
            ret.success = true;
            if (value == undefined || value == null || value == "") {
                ret.success = false;
                ret.code = 2002;
                ret.message = name + " is empty";
            }

            return ret;
        },

        getCurrentDate: function getCurrentDate() {
            var currentDate = new Date();
            dateString = currentDate.getFullYear().toString();
            month = currentDate.getMonth() + 1;
            if (month < 10) {
                dateString += "-0" + month;
            } else {
                dateString += "-" + month;
            }
            date = currentDate.getDate();
            if (date < 10) {
                dateString += "-0" + date;
            } else {
                dateString += "-" + date;
            }

            return dateString;
        },

        formatResult: function formatResult(result) {
            if (com.veeva.clm.isWin8()) {
                if (typeof result == "string") {
                    result = eval("(" + result + ")");
                }
            }
            return result;
        },

        wrapResult: function wrapResult(apiName, userCallback, result) {
            result = com.veeva.clm.formatResult(result);
            if (result.success) userCallback(result);else {
                result.message = apiName + ": " + result.message;
                userCallback(result);
            }
        },

        runAPIRequest: function runAPIRequest(request, callback) {
            if (com.veeva.clm.isEngage()) {
                com.veeva.clm.engageAPIRequest(request, callback);
            } else if (com.veeva.clm.isWin8()) {
                window.external.notify(request);
            } else {
                //Remove the veeva: prefix, encode the remaining request, and add veeva: back.
                //This works with a basic replace because we only run ONE request here.
                request = request.replace(/^veeva:/, '');
                request = encodeURIComponent(request);
                request = "veeva:" + request;
                document.location = request;
            }
        },

        isWin8: function isWin8() {
            if (navigator.platform.toLowerCase().indexOf("win") >= 0) return true;else return false;
        },

        isEngage: function isEngage() {
            if (window.self !== window.top) {
                return true;
            }
            return false;
        },

        engageAPIRequest: function engageAPIRequest(request, callback) {
            if (com.veeva.clm.engageHasListener === false) {
                var receiveMessage = function receiveMessage(event) {
                    var data = JSON.parse(event.data);
                    var callbackId = data.callback;
                    if (callbackId !== undefined && callbackId !== null) {
                        var callbackFunc = com.veeva.clm.engageCallbackList[callbackId];
                        if (callbackFunc !== undefined && callbackFunc !== null) {
                            callbackFunc.call(null, data);
                            // don't want to splice because that would change the length
                            // of the array and could affect the index based access
                            delete com.veeva.clm.engageCallbackList[callbackId];
                        }
                    }
                };

                com.veeva.clm.engageHasListener = true;
                com.veeva.clm.engageCallbackId = 0;


                if (!window.addEventListener) {
                    window.attachEvent("onmessage", receiveMessage);
                } else {
                    window.addEventListener("message", receiveMessage, false);
                }
            }
            setTimeout(function () {
                com.veeva.clm.engageCallbackId += 1;
                var callbackId = com.veeva.clm.engageCallbackId;
                com.veeva.clm.engageCallbackList[callbackId] = callback;
                var tokens = request.split("),");
                if (tokens.length > 1) {
                    // replace the last token (the original callback) with a callback id
                    tokens[tokens.length - 1] = callbackId;
                    request = tokens.join("),");
                }
                window.parent.postMessage(request, "*");
            }, 1);
        },

        listPriceRecordTypeId: null,
        accountId: null,
        addressId: null,
        callId: null,
        tsfId: null,
        userId: null,
        presentationId: null,
        keyMessageId: null,
        engageHasListener: false,
        engageCallbackId: null,
        engageCallbackList: [],
        testMode: false,
        testResult: null

    };

    return com;
});

},{}],7:[function(require,module,exports){
'use strict';

var _helper = require('./helpers/helper');

var _helper2 = _interopRequireDefault(_helper);

var _utils = require('./helpers/utils');

var _utils2 = _interopRequireDefault(_utils);

var _globalSwipeNav = require('./modules/global-swipe-nav');

var _globalSwipeNav2 = _interopRequireDefault(_globalSwipeNav);

var _popup = require('./modules/popup');

var _popup2 = _interopRequireDefault(_popup);

var _tabs = require('./modules/tabs');

var _tabs2 = _interopRequireDefault(_tabs);

var _popupTabs = require('./modules/popup-tabs');

var _popupTabs2 = _interopRequireDefault(_popupTabs);

var _clickstream = require('./modules/clickstream');

var _clickstream2 = _interopRequireDefault(_clickstream);

var _slider = require('./modules/slider');

var _slider2 = _interopRequireDefault(_slider);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//libs: library is wrapped in UMD: https://www.npmjs.com/package/veevalibrary
// import veevaLibrary from './libs/veeva-library';

// Modules
// Helpers
$(function () {
   // Helpers
   (0, _helper2.default)();
   (0, _utils2.default)();
   (0, _tabs2.default)();
   // veevaLibrary();
   (0, _globalSwipeNav2.default)();
   (0, _popup2.default)();
   (0, _popupTabs2.default)();
   (0, _clickstream2.default)();
   (0, _slider2.default)();
});

},{"./helpers/helper":2,"./helpers/utils":4,"./modules/clickstream":8,"./modules/global-swipe-nav":9,"./modules/popup":11,"./modules/popup-tabs":10,"./modules/slider":12,"./modules/tabs":13}],8:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _veevaLibrary = require('../libs/veeva-library');

var _veevaLibrary2 = _interopRequireDefault(_veevaLibrary);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  var selectors = $('.clickstream');

  selectors.on('click', function (e) {
    var data = e.currentTarget.getAttribute('data-clickstream').split('|');

    var myObject = {
      /* eslint-disable camelcase */
      Track_Element_Id_vod__c: data[0],
      /* eslint-disable camelcase */
      Track_Element_Type_vod__c: data[1],
      /* eslint-disable camelcase */
      Track_Element_Description_vod__c: data[2]
    };

    if (window.isVeeva) {
      (0, _veevaLibrary2.default)();
      //Create a new Call Clickstream record in the CRM and assign the contents
      com.veeva.clm.createRecord('Call_Clickstream_vod__c', myObject);
    } else {
      console.log(myObject);
    }
  });
};

},{"../libs/veeva-library":6}],9:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _zoomFlag = require('../helpers/zoom-flag');

var _swipenavConfig = require('../helpers/swipenav-config');

var _constants = require('../helpers/constants');

/*
 * Global Swipe Nav
 */
exports.default = function () {

  var dragging = false,
      mousePosX = 0,
      mousePosXEnd = 0;

  var prefixPresentation = function prefixPresentation(presentation) {
    if (typeof presentation === 'undefined') {
      return _swipenavConfig.presentationName;
    } else {
      return _swipenavConfig.presentationName + '_' + presentation;
    }
  };

  var prefixSlide = function prefixSlide(slide, presentation) {
    presentation = prefixPresentation(presentation);
    if (slide.includes(presentation)) {
      return slide;
    } else {
      return presentation + '_' + slide;
    }
  };

  var goTo = function goTo(slideId, presentation) {
    var activePopUp = $('.popup').hasClass('active');
    var isVeeva = navigator.userAgent.match(/iP(hone|ad)/i) != null;
    var hostname = window.location.hostname;

    if (typeof slideId === 'undefined' || activePopUp) {
      return;
    }

    if (_zoomFlag.zoomed.getZoomed()) {
      return;
    }

    var href = '';
    var slide = prefixSlide(slideId, presentation);

    if (typeof presentation === 'undefined') {
      presentation = _swipenavConfig.presentationName;
    } else {
      presentation = prefixPresentation(presentation);
    }

    // Local and stage navigation
    if (hostname === 'localhost' && !isVeeva) {
      href = '/' + slide + '/' + slide + '.html';
    } else if (hostname === _constants.StageHostname) {
      href = 'http://' + hostname + '/' + _constants.StageFolder + '/' + slide + '/' + slide + '.html';
    } else if (isVeeva) {
      href = 'veeva:gotoSlide(' + slide + '.zip)';
      console.log('veeva:gotoSlide(' + slide + '.zip)');
    }
    window.location = href;
  };

  var assignEvent = function assignEvent(element, event, callback, useCapture) {
    useCapture = typeof useCapture !== 'undefined' ? useCapture : false;

    if (element !== null) {

      if (event === 'tap press') {
        var ev = 'touchend';

        //On touch start we reset values and set the start position
        element.addEventListener('touchstart', function (e) {
          dragging = false;
          mousePosX = e.touches[0].pageX;
          mousePosXEnd = e.touches[0].pageX;
        });

        //When moving we record the last position
        element.addEventListener('touchmove', function (e) {
          mousePosXEnd = e.touches[0].pageX;
        });

        //When the touch finishes, we calculate the distance from the start position
        //if it's bigger than the treshold we set the flag to trigger the swipe
        element.addEventListener('touchend', function (e) {
          //Treshold set to a third of the screen width, if bigger than this we trigger the swipe
          var treshold = $(window).width() / 3;

          //This covers the swipe to the right and to the left
          if (mousePosXEnd - mousePosX > treshold || mousePosXEnd - mousePosX < -treshold) {
            dragging = true;
          } else {
            dragging = false;
          }

          //For testing
          console.log(mousePosX + ' ' + mousePosXEnd + ' ' + dragging);
        });
        element.addEventListener(ev, callback);
        // }
      } else {
        var mc = new Hammer(element);
        mc.get('swipe').set({ direction: Hammer.DIRECTION_ALL });
        mc.on(event, callback);
      }
    }
  };

  var configureListener = function configureListener() {
    if (typeof SlideSwipeConfig !== 'undefined' && typeof SlideSwipeConfig.id !== 'undefined' && SlideSwipeConfig.id && (typeof SlideSwipeConfig.disableSwipe === 'undefined' || !SlideSwipeConfig.disableSwipe) && typeof _swipenavConfig.slidesConfig !== 'undefined' && _swipenavConfig.slidesConfig.length > 0) {
      var slideId = typeof SlideSwipeConfig.swipeId !== 'undefined' && SlideSwipeConfig.swipeId ? SlideSwipeConfig.swipeId : SlideSwipeConfig.id;
      var slideIndex = void 0;
      var curreSlideConfig = void 0;

      if (SlideSwipeConfig.subSwipe) {
        curreSlideConfig = SlideSwipeConfig.subSwipe;
      } else {
        curreSlideConfig = _swipenavConfig.slidesConfig;
      }

      slideIndex = curreSlideConfig.indexOf(slideId);
      assignEvent(document.body, 'swipeleft', function () {
        console.log('swipe left is go');
        if (slideIndex < curreSlideConfig.length - 1) {
          goTo(curreSlideConfig[slideIndex + 1]);
        }
      });

      assignEvent(document.body, 'swiperight', function () {
        console.log('swipe right is go');
        if (slideIndex > 0) {
          goTo(curreSlideConfig[slideIndex - 1]);
        }
      });
    }

    //Check if the slide has vertical navigation
    // Currently disabled to be worked at a later date
    // if (SlideSwipeConfig.vSwipeId) {
    //   let vSlideId = SlideSwipeConfig.vSwipeId,
    //       vSlideIndex,
    //       vSlideConfig;
    //   //Filter wich vertical slide config will be used
    //   switch (vSlideId.split('_')[0]) {
    //     case '10':
    //       vSlideConfig = v10SlideConfig;
    //       break;
    //     case '30':
    //       vSlideConfig = v30SlideConfig;
    //       break;
    //     case '40':
    //       vSlideConfig = v40SlideConfig;
    //       break;
    //     case '60':
    //       vSlideConfig = v60SlideConfig;
    //       break;
    //     case '120':
    //       vSlideConfig = v120SlideConfig;
    //       break;
    //     default:
    //       break;
    //   }

    //   //Asign vertical slide index of slide
    //   vSlideIndex = vSlideConfig.indexOf(vSlideId);

    //   //Assign up and down swipe events from Hammer
    //   assignEvent(document.body, 'swipeup', function() {
    //     console.log('swipe up is go');
    //     if(vSlideIndex < vSlideConfig.length - 1) {
    //       goTo(vSlideConfig[vSlideIndex + 1]);
    //     }

    //   });

    //   assignEvent(document.body, 'swipedown', function() {
    //     console.log('swipe down is go');
    //     if(vSlideIndex > 0) {
    //       goTo(vSlideConfig[vSlideIndex - 1]);
    //     }
    //   });
    // }

    //Assign events for tab pop ups navigation
    //Validate if tab pop up exists on slide
    //Note: this will not create conflict with global
    //vertical navigation because all navigation is
    //disabled when pop ups are active
    if (!$('.patient-profile-popup').hasClass('disabled')) {
      var tabPopUp = $('.tab-popup'),
          tab1 = tabPopUp.find('.tab-1'),
          tab2 = tabPopUp.find('.tab-2');

      assignEvent(document.body, 'swipeup', function () {
        //Validate if pop up is active and if tab1 is active to
        //switch active classes with tab2
        if (tabPopUp.hasClass('active') && tab1.hasClass('active')) {
          console.log('tabpopup swipe up is go');
          tab1.removeClass('active');
          tab2.addClass('active');
        }
      });

      //Validate if pop up is active and if tab2 is active to
      //switch active classes with tab1
      assignEvent(document.body, 'swipedown', function () {
        if (tabPopUp.hasClass('active') && tab2.hasClass('active')) {
          console.log('tabpopup swipe down is go');
          tab2.removeClass('active');
          tab1.addClass('active');
        }
      });
    }
  };

  var initSwipeNav = function initSwipeNav() {
    configureListener();
  };

  initSwipeNav();
};

},{"../helpers/constants":1,"../helpers/swipenav-config":3,"../helpers/zoom-flag":5}],10:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
   value: true
});

/*
* Popup tab logic
*/
exports.default = function () {

   var tabPopup = $('.popup--tabs'),
       tabLinks = tabPopup.find('.tab-link a');

   if (tabPopup.length > 0) {
      tabLinks.on('click', function (e) {
         e.preventDefault();
         var currentActive = tabPopup.find('.active');

         var targetTab = $(e.target).data('target');

         currentActive.removeClass('active');
         $('#' + targetTab).addClass('active');
      });
   }
};

},{}],11:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
   value: true
});

/*
 * Popup logic
 */
exports.default = function () {

   var popupCta = $('.popup-trigger');
   var navBtn = $('.hamburger-menu');
   var megaNav = $('.mega-nav');
   var barGraphanimte = $('.bar-graph-animation');

   if (popupCta.length === 0) {
      return;
   } else {
      popupCta.on('click', function togglePopUp(e) {
         e.preventDefault();
         if ($(this).attr('disabled')) {
            return;
         } else {
            var popUps = $('.popup'),
                activePopUp = popUps.filter('.active'),
                openingPopUp = $(this).data('popup'),
                sdpopup = $('#sd-popup.study-popup'),
                refpopup = $('#ref-popup.popup'),
                contentpopup = $('.popup.content-popup');

            if (activePopUp.length > 0 && activePopUp.find('.tab').filter('.active').data('ref')) {
               openingPopUp = activePopUp.find('.tab').filter('.active').data('ref');
            }

            popUps.addClass('hide');
            popUps.removeClass('active');
            var $openingPopUp = $('#' + openingPopUp);
            $openingPopUp.toggleClass('hide active');
            $(this).toggleClass('active');

            megaNav.removeClass('open');
            navBtn.removeClass('active');

            if ($openingPopUp.hasClass('popup--tabs')) {
               var tabs = $openingPopUp.find('.tab');
               tabs.removeClass('active');
               tabs.first().addClass('active');
            }

            if (sdpopup.hasClass('active')) {
               $('.sd-btn').addClass('actv');
            }

            if (refpopup.hasClass('active')) {
               $('.ref-btn').addClass('actv');
            }

            if (contentpopup.hasClass('active')) {
               barGraphanimte.addClass('barchart-animate');
            }
         }
      });

      var closePopup = function closePopup(target) {
         var closetPopUp = $(target).closest('.popup'),
             currentVideo = closetPopUp.find('video');

         if (currentVideo.length > 0) {
            currentVideo[0].pause();
            currentVideo[0].currentTime = 0;
         }
         closetPopUp.addClass('hide');
         closetPopUp.removeClass('active');
      };

      $('.popup-close').on('click', function closeCurrentPopUp() {
         closePopup(this);
         $('.sd-btn,.ref-btn').removeClass('actv');
      });

      $('.overlay').on('click', function closeCurrentPopUp() {
         closePopup(this);
         $('.sd-btn,.ref-btn').removeClass('actv');
      });
   }
};

},{}],12:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function () {
  // $('.slider').slick({
  //   dots: false,
  //   infinite: true,
  //   speed: 300,
  //   slidesToShow: 1,
  //   centerMode: true
  // });
};

},{}],13:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
   value: true
});

/*
 * Tabs Module
 */
exports.default = function () {

   var tab = $('.item'),
       tabSection = $('.tab-section'),

   // popups = $('.popup-text'),
   // tabSubSection = $('.tab-sub-section'),
   tabFirst = $('#tab-item-0'),
       tabSectionFirst = $('#tab-item-0-section'),
       tabSectionPopupFirst = $('#popup-tab-item-0-section, #slide-popup'),
       openSubSection = $('.open-section-sub'),
       closeSubSection = $('.close-section-sub'),
       popupHeader = $('.popup-header'),
       container = $('.global-content'),
       toggleModules = $('.parent-section, .tabs, .redirect');

   var sectionActive = '';

   // Active first tab and show first tab section
   var init = function init() {
      tabSection.hide();
      tabFirst.addClass('active');
      tabSectionFirst.addClass('active').show();
      tabSectionPopupFirst.show();
      // closeSubSection.hide();
      // popupHeader.hide();
      // tabSubSection.hide();
   };

   // Tab click function
   tab.on('click', function changeActiveTab() {

      sectionActive = $(this).attr('id') + '-section';

      // Remove all active tabs and hide all tabs section
      tab.removeClass('active');
      tabSection.removeClass('active').hide();
      // popups.hide();
      // Active selected tab and show selected tab section
      $(this).addClass('active');
      $('#' + sectionActive).addClass('active').show();

      //Showing popup if exist
      // activeReferences($(`${sectionActive}-popup`));
   });

   // Open subsection
   // openSubSection.on('click', function openSubSectionHandler() {
   //    let subSection = `#${$(this).attr('id').replace('open', 'sub')}`;
   //    container.addClass('bordered');
   //    toggleModules.hide();
   //    popups.hide();
   //    $(`${subSection}, ${subSection}-popup`).show();
   //    closeSubSection.show();
   //    popupHeader.show();
   // });

   // // Close subsection
   // closeSubSection.on('click', function closeSubSectionHandler() {
   //    container.removeClass('bordered');
   //    popups.hide();
   //    $(`#${$(`.item.active`).attr('id')}-section-popup`).show();
   //    toggleModules.show();
   //    tabSubSection.hide();
   //    closeSubSection.hide();
   //    popupHeader.hide();
   // });

   init();
};

},{}]},{},[7])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvc2hhcmVkL3NjcmlwdHMvZXM2L2hlbHBlcnMvY29uc3RhbnRzLmpzIiwic3JjL3NoYXJlZC9zY3JpcHRzL2VzNi9oZWxwZXJzL2hlbHBlci5qcyIsInNyYy9zaGFyZWQvc2NyaXB0cy9lczYvaGVscGVycy9zd2lwZW5hdi1jb25maWcuanMiLCJzcmMvc2hhcmVkL3NjcmlwdHMvZXM2L2hlbHBlcnMvdXRpbHMuanMiLCJzcmMvc2hhcmVkL3NjcmlwdHMvZXM2L2hlbHBlcnMvem9vbS1mbGFnLmpzIiwic3JjL3NoYXJlZC9zY3JpcHRzL2VzNi9saWJzL3ZlZXZhLWxpYnJhcnkuanMiLCJzcmMvc2hhcmVkL3NjcmlwdHMvZXM2L21haW4uanMiLCJzcmMvc2hhcmVkL3NjcmlwdHMvZXM2L21vZHVsZXMvY2xpY2tzdHJlYW0uanMiLCJzcmMvc2hhcmVkL3NjcmlwdHMvZXM2L21vZHVsZXMvZ2xvYmFsLXN3aXBlLW5hdi5qcyIsInNyYy9zaGFyZWQvc2NyaXB0cy9lczYvbW9kdWxlcy9wb3B1cC10YWJzLmpzIiwic3JjL3NoYXJlZC9zY3JpcHRzL2VzNi9tb2R1bGVzL3BvcHVwLmpzIiwic3JjL3NoYXJlZC9zY3JpcHRzL2VzNi9tb2R1bGVzL3NsaWRlci5qcyIsInNyYy9zaGFyZWQvc2NyaXB0cy9lczYvbW9kdWxlcy90YWJzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7QUNBQTtBQUNPLElBQU0sd0NBQWdCLG1CQUF0QjtBQUNQO0FBQ08sSUFBTSxvQ0FBYyxFQUFwQjs7Ozs7Ozs7O0FDSFA7O2tCQUVlLFlBQU07QUFDbEIsT0FBTSxhQUFjLGdCQUFnQixTQUFTLGVBQTFCLEdBQTZDLFVBQTdDLEdBQTJELE9BQU8sU0FBUCxDQUFpQixjQUFsQixHQUFvQyxXQUFwQyxHQUFrRCxPQUEvSDtBQUNBLE9BQU0sVUFBVSxVQUFVLFNBQVYsQ0FBb0IsS0FBcEIsQ0FB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T0FTTSxjQUFjLEVBQUUsZUFBRixDQVRwQjtBQUFBLE9BVU0sWUFBWSxFQUFFLGlCQUFGLENBVmxCO0FBQUEsT0FXTSxnQkFBZ0IsRUFBRSxtQ0FBRixDQVh0Qjs7QUFhQSxPQUFJLGdCQUFnQixFQUFwQjs7QUFHQTtBQUNBLE9BQU0sT0FBTyxTQUFQLElBQU8sR0FBTTtBQUNoQixpQkFBVyxJQUFYO0FBQ0EsZUFBUyxRQUFULENBQWtCLFFBQWxCO0FBQ0Esc0JBQWdCLFFBQWhCLENBQXlCLFFBQXpCLEVBQW1DLElBQW5DO0FBQ0EsMkJBQXFCLElBQXJCO0FBQ0E7QUFDQTtBQUNBO0FBQ0YsSUFSRDs7QUFVQTtBQUNBLE9BQUksRUFBSixDQUFPLE9BQVAsRUFBZ0IsU0FBUyxlQUFULEdBQTJCOztBQUV4QyxzQkFBbUIsRUFBRSxJQUFGLEVBQVEsSUFBUixDQUFhLElBQWIsQ0FBbkI7O0FBRUE7QUFDQSxVQUFJLFdBQUosQ0FBZ0IsUUFBaEI7QUFDQSxpQkFBVyxXQUFYLENBQXVCLFFBQXZCLEVBQWlDLElBQWpDO0FBQ0E7QUFDQTtBQUNBLFFBQUUsSUFBRixFQUFRLFFBQVIsQ0FBaUIsUUFBakI7QUFDQSxjQUFNLGFBQU4sRUFBdUIsUUFBdkIsQ0FBZ0MsUUFBaEMsRUFBMEMsSUFBMUM7O0FBRUE7QUFDQTtBQUNGLElBZEQ7O0FBZ0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBRUYsQyIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsIi8vIFNldCB1cCB5b3VyIHN0YWdlIHNlcnZlciBob3N0bmFtZSBoZXJlXG5leHBvcnQgY29uc3QgU3RhZ2VIb3N0bmFtZSA9ICdyZXZpZXcuY2RtMjEwLmNvbSc7XG4vLyBTZXQgdXAgeW91ciBzdGFnZSBkaXJlY3RvcnlcbmV4cG9ydCBjb25zdCBTdGFnZUZvbGRlciA9ICcnOyIsImltcG9ydCB7IFN0YWdlSG9zdG5hbWUsIFN0YWdlRm9sZGVyIH0gZnJvbSAnLi9jb25zdGFudHMnO1xuXG5leHBvcnQgZGVmYXVsdCAoKSA9PiB7XG4gICBjb25zdCB0b3VjaGNsaWNrID0gKCdvbnRvdWNoZW5kJyBpbiBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQpID8gJ3RvdWNoZW5kJyA6ICh3aW5kb3cubmF2aWdhdG9yLnBvaW50ZXJFbmFibGVkKSA/ICdwb2ludGVydXAnIDogJ2NsaWNrJztcbiAgIGNvbnN0IGlzVmVldmEgPSBuYXZpZ2F0b3IudXNlckFnZW50Lm1hdGNoKC9pUChob25lfGFkKS9pKSAhPSBudWxsO1xuICAgd2luZG93LmlzVmVldmEgPSBpc1ZlZXZhO1xuICAgY29uc3QgaG9zdG5hbWUgPSB3aW5kb3cubG9jYXRpb24uaG9zdG5hbWU7XG4gICBjb25zb2xlLmxvZygndmVldmEgcHJlc2VudGF0aW9uOicsIGlzVmVldmEpO1xuXG4gICBpZiAoIWlzVmVldmEpIHtcbiAgICAgICQoJ2h0bWwnKS5hZGRDbGFzcygnbG9jYWxob3N0Jyk7XG4gICAgICAkKCcuZ29Ub1NsaWRlJykub24odG91Y2hjbGljaywgKGUpID0+IHtcbiAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgIGNvbnN0IHNsaWRlID0gJChlLnRhcmdldCkuZGF0YSgnc2xpZGUnKTtcbiAgICAgICAgIGxldCBocmVmID0gJy8nO1xuICAgICAgICAgaWYgKGhvc3RuYW1lID09PSAnbG9jYWxob3N0Jykge1xuICAgICAgICAgICAgaHJlZiA9IGAvJHtzbGlkZX0vJHtzbGlkZX0uaHRtbGA7XG4gICAgICAgICB9IGVsc2UgaWYgKGhvc3RuYW1lID09PSBTdGFnZUhvc3RuYW1lKSB7XG4gICAgICAgICAgICBocmVmID0gYGh0dHA6Ly8ke2hvc3RuYW1lfS8ke1N0YWdlRm9sZGVyfS8ke3NsaWRlfS8ke3NsaWRlfS5odG1sYDtcbiAgICAgICAgIH1cbiAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gaHJlZjtcbiAgICAgIH0pO1xuICAgfSBlbHNlIHtcbiAgICAgICQoJy5nb1RvU2xpZGUnKS5vbih0b3VjaGNsaWNrLCAoZSkgPT4ge1xuICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgY29uc3Qgc2xpZGUgPSAkKGUudGFyZ2V0KS5kYXRhKCdzbGlkZScpO1xuICAgICAgICAgY29uc3QgcHJlc2VudGF0aW9uID0gJChlLnRhcmdldCkuZGF0YSgncHJlc2VudGF0aW9uJyk7XG4gICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IGB2ZWV2YTpnb3RvU2xpZGUoJHtzbGlkZX0uemlwJHtwcmVzZW50YXRpb24gPyBgLCAke3ByZXNlbnRhdGlvbn1gOiAnJ30pYDtcbiAgICAgIH0pO1xuICAgfVxufTtcbiIsImV4cG9ydCBjb25zdCBzbGlkZXNDb25maWcgPSBbXG4gICAgJ1pUbGlkby1GdWxsLUVWQV8wMF8wMCcsXG4gICAgJ1pUbGlkby1GdWxsLUVWQV8xMF8wMCcsXG4gICAgJ1pUbGlkby1GdWxsLUVWQV8xMV8wMCcsXG4gICAgJ1pUbGlkby1GdWxsLUVWQV8xMV81MCcsXG4gICAgJ1pUbGlkby1GdWxsLUVWQV8xMl8wMCcsXG4gICAgJ1pUbGlkby1GdWxsLUVWQV8xMl81MCcsXG4gICAgJ1pUbGlkby1GdWxsLUVWQV8xM18wMCcsXG4gICAgJ1pUbGlkby1GdWxsLUVWQV8xM181MCcsXG4gICAgJ1pUbGlkby1GdWxsLUVWQV8xNF8wMCcsXG4gICAgJ1pUbGlkby1GdWxsLUVWQV8xNV8wMCcsXG4gICAgJ1pUbGlkby1GdWxsLUVWQV8xNV8xMCcsXG4gICAgJ1pUbGlkby1GdWxsLUVWQV8xNV8yMCcsXG4gICAgJ1pUbGlkby1GdWxsLUVWQV8xNV8zMCcsXG4gICAgJ1pUbGlkby1GdWxsLUVWQV8xNV80MCcsXG4gICAgJ1pUbGlkby1GdWxsLUVWQV8xNV81MCdcbl07XG5cbmV4cG9ydCBjb25zdCBwcmVzZW50YXRpb25OYW1lID0gJ1pUbGlkby1GdWxsLUVWQSc7IiwiZXhwb3J0IGRlZmF1bHQgKCkgPT4ge1xuXG4gIC8vZ2xvYmFsIGxpc3RlbmVyc1xuICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCd0b3VjaG1vdmUnLCBmdW5jdGlvbiAoZSkgeyBlLnByZXZlbnREZWZhdWx0KCk7IH0sIGZhbHNlKTsgLy9wcmV2ZW50IHdlYnZpZXcgd2luZG93IGZyb20gc2Nyb2xsaW5nXG5cbiAgRmFzdENsaWNrLmF0dGFjaChkb2N1bWVudC5ib2R5KTsgLy9mYXN0Y2xpY2sgZm9yIG1vYmlsZVxuXG59O1xuIiwibGV0IGlzWm9vbWVkID0gZmFsc2U7IFxuXG5jbGFzcyBab29tTW9kZWwge1xuXHRjb25zdHJ1Y3RvcihhcmdzKSB7XG5cdFx0aWYgKGFyZ3MgIT09IHVuZGVmaW5lZCl7XG5cdFx0XHRpc1pvb21lZCA9IGFyZ3M7XG5cdFx0fVxuXHR9XG5cblx0Z2V0Wm9vbWVkKCkge1xuXHRcdHJldHVybiBpc1pvb21lZDtcblx0fVxuXG5cdHNldFpvb21lZChhcmdzKSB7XG5cdFx0aXNab29tZWQgPSBhcmdzO1xuXHR9XG59XG5cbmV4cG9ydCBsZXQgem9vbWVkID0gbmV3IFpvb21Nb2RlbChmYWxzZSk7XG5cbiIsIi8qIGVzbGludC1kaXNhYmxlICovXG4vL1xuLy8gVU1EIFdyYXBwZXIgZm9yIFZlZXZhIENMTVxuLy9cbi8vIFZlZXZhIEphdmFTY3JpcHQgTGlicmFyeSB2ZXJzaW9uIDI4LjE3LjEwXG4vLyBodHRwOi8vdmVldmEuY29tXG4vL1xuLy8gQ29weXJpZ2h0IMOCwqkgMjAxNiBWZWV2YSBTeXN0ZW1zLCBJbmMuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4vL1xuLy8gVGhlIGNvbS52ZWV2YS5jbG0gbmFtZXNwYWNlIHNob3VsZCBiZSB1dGlsaXplZCB3aGVuIGNhbGxpbmcgdGhlIEphdmFTY3JpcHQgZnVuY3Rpb25zLlxuLy8gICAgICAgICAgRXhhbXBsZTogXCJjb20udmVldmEuY2xtLmdldERhdGFGb3JDdXJyZW50T2JqZWN0KFwiQWNjb3VudFwiLFwiSURcIiwgbXlBY2NvdW50SUQpO1wiXG4vL1xuLy9cbi8vIEphdmFTY3JpcHQgbGlicmFyeSB3aWxsIHJldHVybiBpbiB0aGUgZm9sbG93aW5nIGZvcm1hdDpcbi8vIHtzdWNjZXNzOnRydWUsIG9ial9uYW1lOlt7XCJJZFwiOlwiMDAwMTkyOTMxMlwifSwge3JlY29yZDJ9LCAuLi5dfVxuLy8gb3Jcbi8vIHtzdWNjZXNzOmZhbHNlLCBjb2RlOiMjIyMsIG1lc3NhZ2U6XCJtZXNzYWdlX3RleHRcIn1cbi8vICMjIyMgLSBkZW5vdGVzIHRoZSBzcGVjaWZpYyBlcnJvciBjb2RlICgxMDAwIGlzIGZyb20gdGhlIHVuZGVybHlpbmcgQVBJLCAyMDAwIGlzIGZyb20gdGhlIEphdmFTY3JpcHQgbGlicmFyeSlcbi8vICAgICAgICAgIDIwMDAgLSBDYWxsYmFjayBmdW5jdGlvbiBpcyBtaXNzaW5nXG4vLyAgICAgICAgICAyMDAxIC0gQ2FsbGJhY2sgaXMgbm90IGEgSmF2YVNjcmlwdCBmdW5jdGlvblxuLy8gICAgICAgICAgMjAwMiAtIDxwYXJhbWV0ZXJfbmFtZT4gaXMgZW1wdHlcbi8vICAgICAgICAgIDIxMDAgLSBSZXF1ZXN0ICglQCkgZmFpbGVkOiAlQFxuLy8gbWVzc2FnZV90ZXh0IC0gYmVnaW5zIHdpdGggdGhlIEphdmFTY3JpcHQgbGlicmFyeSBmdW5jdGlvbiBuYW1lIGFuZCBhIFwiOlwiLiBJZiB0aGUgZXJyb3IgY29tZXMgZnJvbSB0aGUgdW5kZXJseWluZyBBUEksIHRoZSBmdWxsIG1lc3NhZ2Vcbi8vIGZyb20gdGhlIEFQSSB3aWxsIGJlIGFwcGVuZGVkIHRvIHRoZSBtZXNzYWdlX3RleHRcbi8vXG4vL1xuLy8gRm9yIENMTTpcbi8vIFdpdGggdGhlIGV4Y2VwdGlvbiBvZiBnb3RvU2xpZGUsIHRoZSBKYXZhU2NyaXB0IGZ1bmN0aW9ucyByZXNwZWN0IE15IFNldHVwLCBSZXN0cmljdGVkIFByb2R1Y3RzIG9uIEFjY291bnQsIEFsbG93ZWQgUHJvZHVjdHMgb24gQ2FsbCBhbmQgb24gVFNGLlxuLy8gZ29Ub1NsaWRlIHJlc3BlY3RzIGFsbCBvZiB0aGUgYWJvdmUgd2hlbiBtZWRpYSBpcyBsYXVuY2hlZCBmcm9tIGEgQ2FsbCBvciBhbiBBY2NvdW50LiBnb1RvU2xpZGUgZG9lcyBub3QgcmVzcGVjdCBSZXN0cmljdGVkIFByb2R1Y3RzXG4vLyBhbmQgQWxsb3dlZCBQcm9kdWN0cyB3aGVuIG1lZGlhIGlzIGxhdW5jaGVkIGZyb20gdGhlIGhvbWUgcGFnZS5cbi8vXG4vL1xuLy8gVXNlIHRoZSBKYXZhU2NyaXB0IGZ1bmN0aW9ucyBpbiBhIGNoYWluLCBpLmUuIGNhbGwgdGhlIHNlY29uZCBKYXZhU2NyaXB0IGZ1bmN0aW9uIG9ubHkgaW4gdGhlIGZpcnN0IGZ1bmN0aW9uJ3MgY2FsbGJhY2sgZnVuY3Rpb24gb3Jcbi8vIGFmdGVyIHRoZSBjYWxsYmFjayBvZiB0aGUgZmlyc3QgZnVuY3Rpb24gaXMgZmluaXNoZWQuXG4vLyBCZWNhdXNlIHRoZSB1bmRlcmx5aW5nIEFQSSBjYWxscyBhcmUgYXN5bmNocm9ub3VzLCB0aGlzIG1heSByZXN1bHQgaW4gdW5leHBlY3RlZCByZXR1cm4gdmFsdWVzIGlmIHRoZSBKYXZhU2NyaXB0IGZ1bmN0aW9ucyBhcmVcbi8vIG5vdCBwcm9wZXJseSBjaGFpbmVkLlxuLy9cbi8vXG4vLyBWZWV2YSByZWNvbW1lbmRzIGNhdXRpb24gd2hlbiByZXRyaWV2aW5nL3NhdmluZyBkYXRhIHVzaW5nIHRoZSBmb2xsb3dpbmcgZmllbGQgdHlwZXMgYW5kIHRvIGFsd2F5cyBwZXJmb3JtIHJpZ29yb3VzIHRlc3Rpbmc6XG4vLyAgICAgIExvbmcgVGV4dCBBcmVhXG4vLyAgICAgIFJpY2ggVGV4dCBBcmVhXG4vLyAgICAgIEVuY3J5cHRlZCBUZXh0IEFyZWFcblxuKGZ1bmN0aW9uICh3aW5kb3csIGZhY3RvcnkpIHtcbiAgdmFyIGNvbSA9IGZhY3Rvcnkod2luZG93LCB3aW5kb3cuZG9jdW1lbnQpXG4gIGlmICh0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0JyAmJiBtb2R1bGUuZXhwb3J0cykge1xuICAgIG1vZHVsZS5leHBvcnRzID0gY29tXG4gIH0gZWxzZSBpZiAodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKSB7XG4gICAgZGVmaW5lKGNvbSlcbiAgfSBlbHNlIHtcbiAgICB3aW5kb3cuY29tID0gY29tXG4gIH1cbn0od2luZG93LCBmdW5jdGlvbiBsICh3aW5kb3csIGRvY3VtZW50KSB7XG4gICd1c2Ugc3RyaWN0J1xuXG4gIGlmICghZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSkge1xuICAgIHJldHVyblxuICB9XG5cbiAgdmFyIGNvbSA9IHdpbmRvdy5jb21cblxuICB2YXIgcmV0ID0ge307XG4gIHZhciByZXF1ZXN0ID0ge307XG4gIHZhciBxdWVyeSA9ICcnO1xuICB2YXIgZGF0YSA9ICcnO1xuICB2YXIgYXBwcm92ZWREb2N1bWVudFF1ZXJ5ID0gJyc7XG4gIHZhciBsb3dlck5hbWUgPSAnJztcblxuICBpZihjb20gPT0gbnVsbCkgY29tID0ge307XG4gIGlmKGNvbS52ZWV2YSA9PSB1bmRlZmluZWQpY29tLnZlZXZhID0ge307XG4gIGNvbnNvbGUubG9nKGNvbSlcbiAgY29tLnZlZXZhLmNsbSA9IHtcbiAgICAgIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vIEFkZHJlc3NlcyAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXG4gICAgICAvLyAxXG4gICAgICAvLyBSZXR1cm5zIGFuIGFycmF5IG9mIHJlY29yZCBJRHMgb2YgYWxsIGFkZHJlc3NlcyAoQWRkcmVzc192b2RfX2MpIGZvciBhIHBhcnRpY3VsYXIgYWNjb3VudCAoQWNjb3VudClcbiAgICAgIC8vIGFjY291bnQgLSBzcGVjaWZpZXMgdGhlIHJlY29yZCBJRCBvZiB0aGUgYWNjb3VudCBvZiB3aGljaCB0byBnZXQgYWxsIHJlbGF0ZWQgYWRkcmVzc2VzXG4gICAgICAvLyBjYWxsYmFjayAtIGNhbGwgYmFjayBmdW5jdGlvbiB3aGljaCB3aWxsIGJlIHVzZWQgdG8gcmV0dXJuIHRoZSBpbmZvcm1hdGlvblxuICAgICAgZ2V0QWRkcmVzc2VzX0FjY291bnQ6IGZ1bmN0aW9uKGFjY291bnQsIGNhbGxiYWNrKSB7XG4gICAgICAgICAgcmV0ID0gdGhpcy5jaGVja0NhbGxiYWNrRnVuY3Rpb24oY2FsbGJhY2spO1xuICAgICAgICAgIGlmKHJldC5zdWNjZXNzID09IGZhbHNlKVxuICAgICAgICAgICAgICByZXR1cm4gcmV0O1xuXG4gICAgICAgICAgLy8gY2hlY2sgYXJndW1lbnRzXG4gICAgICAgICAgcmV0ID0gdGhpcy5jaGVja0FyZ3VtZW50KFwiYWNjb3VudFwiLCBhY2NvdW50KTtcbiAgICAgICAgICBpZihyZXQuc3VjY2VzcyA9PSBmYWxzZSkge1xuICAgICAgICAgICAgICBjb20udmVldmEuY2xtLndyYXBSZXN1bHQoXCJnZXRBZGRyZXNzZXNfQWNjb3VudFwiLCBjYWxsYmFjaywgcmV0KTtcbiAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cbiAgICAgICAgICB3aW5kb3dbXCJjb21fdmVldmFfY2xtX2FjY291bnRBZGRyZXNzZXNcIl0gPSBmdW5jdGlvbihyZXN1bHQpIHtcbiAgICAgICAgICAgICAgY29tLnZlZXZhLmNsbS53cmFwUmVzdWx0KFwiZ2V0QWRkcmVzc2VzX0FjY291bnRcIiwgY2FsbGJhY2ssIHJlc3VsdCk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcXVlcnkgPSBcInZlZXZhOnF1ZXJ5T2JqZWN0KEFkZHJlc3Nfdm9kX19jKSxmaWVsZHMoSUQpLHdoZXJlKFdIRVJFIEFjY291bnRfdm9kX19jPVxcXCJcIiArIGFjY291bnQgKyBcIlxcXCIpLGNvbV92ZWV2YV9jbG1fYWNjb3VudEFkZHJlc3NlcyhyZXN1bHQpXCI7XG4gICAgICAgICAgaWYoIWNvbS52ZWV2YS5jbG0udGVzdE1vZGUpXG4gICAgICAgICAgICAgIGNvbS52ZWV2YS5jbG0ucnVuQVBJUmVxdWVzdChxdWVyeSk7XG4gICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICBjb21fdmVldmFfY2xtX2FjY291bnRBZGRyZXNzZXMoY29tLnZlZXZhLmNsbS50ZXN0UmVzdWx0LmNvbW1vbik7XG4gICAgICB9LFxuXG4gICAgICAvLyAyXG4gICAgICAvLyBSZXR1cm5zIHRoZSB2YWx1ZXMgb2YgdGhlIHNwZWNpZmllZCBmaWVsZHMgZm9yIHNwZWNpZmllZCBBZGRyZXNzIChBZGRyZXNzX3ZvZF9fYykgcmVjb3JkXG4gICAgICAvLyByZWNvcmQgLSBzcGVjaWZpZXMgdGhlIHJlY29yZCBJRCBvZiB0aGUgQWRkcmVzcyB0byBnZXQgZmllbGRzIGZyb21cbiAgICAgIC8vIGZpZWxkcyAtIGxpc3Qgb2YgZmllbGQgYXBpIG5hbWVzIHRvIHJldHVybiBhIHZhbHVlIGZvciwgdGhpcyBwYXJhbWV0ZXIgc2hvdWxkIGJlIGFuIGFycmF5XG4gICAgICAvLyBjYWxsYmFjayAtIGNhbGwgYmFjayBmdW5jdGlvbiB3aGljaCB3aWxsIGJlIHVzZWQgdG8gcmV0dXJuIHRoZSBpbmZvcm1hdGlvblxuICAgICAgZ2V0QWRkcmVzc0ZpZWxkczogZnVuY3Rpb24ocmVjb3JkLCBmaWVsZHMsIGNhbGxiYWNrKSB7XG4gICAgICAgICAgcmV0ID0gdGhpcy5jaGVja0NhbGxiYWNrRnVuY3Rpb24oY2FsbGJhY2spO1xuICAgICAgICAgIGlmKHJldC5zdWNjZXNzID09IGZhbHNlKVxuICAgICAgICAgICAgICByZXR1cm4gcmV0O1xuXG4gICAgICAgICAgLy8gY2hlY2sgYXJndW1lbnRzXG4gICAgICAgICAgcmV0ID0gdGhpcy5jaGVja0FyZ3VtZW50KFwicmVjb3JkXCIsIHJlY29yZCk7XG4gICAgICAgICAgaWYocmV0LnN1Y2Nlc3MgPT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgY29tLnZlZXZhLmNsbS53cmFwUmVzdWx0KFwiZ2V0QWRkcmVzc0ZpZWxkc1wiLCBjYWxsYmFjaywgcmV0KTtcbiAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZihmaWVsZHMgPT0gdW5kZWZpbmVkIHx8IGZpZWxkcyA9PSBudWxsKSB7XG4gICAgICAgICAgICAgIGZpZWxkcyA9IFtcIklEXCJdO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHdpbmRvd1tcImNvbV92ZWV2YV9jbG1fYWRkcmVzc1ZhbHVlc1wiXSA9IGZ1bmN0aW9uKHJlc3VsdCkge1xuICAgICAgICAgICAgICBjb20udmVldmEuY2xtLndyYXBSZXN1bHQoXCJnZXRBZGRyZXNzRmllbGRzXCIsIGNhbGxiYWNrLCByZXN1bHQpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHF1ZXJ5ID0gXCJ2ZWV2YTpxdWVyeU9iamVjdChBZGRyZXNzX3ZvZF9fYyksZmllbGRzKFwiICsgdGhpcy5qb2luRmllbGRBcnJheShmaWVsZHMpICsgXCIpLHdoZXJlKFdIRVJFIElkTnVtYmVyPVxcXCJcIiArIHJlY29yZCArIFwiXFxcIiksY29tX3ZlZXZhX2NsbV9hZGRyZXNzVmFsdWVzKHJlc3VsdClcIjtcbiAgICAgICAgICBpZighY29tLnZlZXZhLmNsbS50ZXN0TW9kZSlcbiAgICAgICAgICAgICAgY29tLnZlZXZhLmNsbS5ydW5BUElSZXF1ZXN0KHF1ZXJ5KTtcbiAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgIGNvbV92ZWV2YV9jbG1fYWRkcmVzc1ZhbHVlcyhjb20udmVldmEuY2xtLnRlc3RSZXN1bHQuY29tbW9uKTtcbiAgICAgIH0sXG5cblxuICAgICAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8gUHJvZHVjdHMgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblxuICAgICAgLy8gUmV0dXJucyBhbiBhcnJheSBvZiByZWNvcmQgSURzIG9mIGFsbCBwcm9kdWN0cyAoUHJvZHVjdF92b2RfX2MpIG9mIGEgc3BlY2lmaWVkIHR5cGUgdGhhdCB0aGUgVXNlciBoYXMgYWNjZXNzIHRvXG4gICAgICAvLyB0eXBlIC0gc3BlY2lmaWVzIHRoZSBQcm9kdWN0IFR5cGUgKFByb2R1Y3RfVHlwZV92b2RfX2MgZmllbGQgb24gUHJvZHVjdF92b2RfX2MpXG4gICAgICAvLyBjYWxsYmFjayAtIGNhbGwgYmFjayBmdW5jdGlvbiB3aGljaCB3aWxsIGJlIHVzZWQgdG8gcmV0dXJuIHRoZSBpbmZvcm1hdGlvblxuICAgICAgZ2V0UHJvZHVjdF9NeVNldHVwOiBmdW5jdGlvbih0eXBlLCBjYWxsYmFjaykge1xuICAgICAgICAgIC8vIGNoZWNrIHBhcmFtZXRlclxuXG4gICAgICAgICAgcmV0ID0gdGhpcy5jaGVja0NhbGxiYWNrRnVuY3Rpb24oY2FsbGJhY2spO1xuICAgICAgICAgIGlmKHJldC5zdWNjZXNzID09IGZhbHNlKVxuICAgICAgICAgICAgICByZXR1cm4gcmV0O1xuXG4gICAgICAgICAgLy8gY2hlY2sgYXJndW1lbnRzXG4gICAgICAgICAgcmV0ID0gdGhpcy5jaGVja0FyZ3VtZW50KFwidHlwZVwiLCB0eXBlKTtcbiAgICAgICAgICBpZihyZXQuc3VjY2VzcyA9PSBmYWxzZSkge1xuICAgICAgICAgICAgICBjb20udmVldmEuY2xtLndyYXBSZXN1bHQoXCJnZXRQcm9kdWN0X015U2V0dXBcIiwgY2FsbGJhY2ssIHJldCk7XG4gICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG5cblxuICAgICAgICAgIHdpbmRvd1tcImNvbV92ZWV2YV9jbG1fcHJvZHVjdE15c2V0dXBcIl0gPSBmdW5jdGlvbihyZXN1bHQpIHtcbiAgICAgICAgICAgICAgY29tLnZlZXZhLmNsbS53cmFwUmVzdWx0KFwiZ2V0UHJvZHVjdF9NeVNldHVwXCIsIGNhbGxiYWNrLCByZXN1bHQpO1xuICAgICAgICAgIH07XG5cblxuICAgICAgICAgIHF1ZXJ5ID0gXCJ2ZWV2YTpxdWVyeU9iamVjdChQcm9kdWN0X3ZvZF9fYyksZmllbGRzKElEKSx3aGVyZShXSEVSRSBQcm9kdWN0X1R5cGVfdm9kX19jPVxcXCJcIiArIHR5cGUgKyBcIlxcXCIpLGNvbV92ZWV2YV9jbG1fcHJvZHVjdE15c2V0dXAocmVzdWx0KVwiO1xuICAgICAgICAgIGlmKCFjb20udmVldmEuY2xtLnRlc3RNb2RlKVxuICAgICAgICAgICAgICBjb20udmVldmEuY2xtLnJ1bkFQSVJlcXVlc3QocXVlcnkpO1xuICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgY29tX3ZlZXZhX2NsbV9wcm9kdWN0TXlzZXR1cChjb20udmVldmEuY2xtLnRlc3RSZXN1bHQuY29tbW9uKTtcblxuICAgICAgfSxcblxuICAgICAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8gUmVjb3JkIFR5cGUgU3VwcG9ydCAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXG4gICAgICAvLyBSZXR1cm5zIGFuIGFycmF5IG9mIHJlY29yZCBJRHMgb2YgYWxsIFJlY29yZFR5cGUgcmVjb3JkcyAoUmVjb3JkVHlwZSkgZm9yIGEgcGFydGljdWxhciBvYmplY3RcbiAgICAgIC8vIG9iamVjdCAtIHNwZWNpZmllcyB0aGUgQVBJIG5hbWUgb2YgdGhlIG9iamVjdCBvZiB3aGljaCB0byBnZXQgYWxsIGFjdGl2ZSBSZWNvcmRUeXBlc1xuICAgICAgLy8gY2FsbGJhY2sgLSBjYWxsIGJhY2sgZnVuY3Rpb24gd2hpY2ggd2lsbCBiZSB1c2VkIHRvIHJldHVybiB0aGUgaW5mb3JtYXRpb25cbiAgICAgIGdldFJlY29yZFR5cGVfT2JqZWN0OiBmdW5jdGlvbihvYmplY3QsIGNhbGxiYWNrKSB7XG5cbiAgICAgICAgICByZXQgPSB0aGlzLmNoZWNrQ2FsbGJhY2tGdW5jdGlvbihjYWxsYmFjayk7XG4gICAgICAgICAgaWYocmV0LnN1Y2Nlc3MgPT0gZmFsc2UpXG4gICAgICAgICAgICAgIHJldHVybiByZXQ7XG5cbiAgICAgICAgICAvLyBjaGVjayBhcmd1bWVudHNcbiAgICAgICAgICByZXQgPSB0aGlzLmNoZWNrQXJndW1lbnQoXCJvYmplY3RcIiwgb2JqZWN0KTtcbiAgICAgICAgICBpZihyZXQuc3VjY2VzcyA9PSBmYWxzZSkge1xuICAgICAgICAgICAgICBjb20udmVldmEuY2xtLndyYXBSZXN1bHQoXCJnZXRSZWNvcmRUeXBlX09iamVjdFwiLCBjYWxsYmFjaywgcmV0KTtcbiAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHdpbmRvd1tcImNvbV92ZWV2YV9jbG1fb2JqZWN0UmVjb3JkVHlwZXNcIl0gPSBmdW5jdGlvbihyZXN1bHQpIHtcbiAgICAgICAgICAgICAgY29tLnZlZXZhLmNsbS53cmFwUmVzdWx0KFwiZ2V0UmVjb3JkVHlwZV9PYmplY3RcIiwgY2FsbGJhY2ssIHJlc3VsdCk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcXVlcnkgPSBcInZlZXZhOnF1ZXJ5T2JqZWN0KFJlY29yZFR5cGUpLGZpZWxkcyhJRCksd2hlcmUoV0hFUkUgU29iamVjdFR5cGU9XFxcIlwiICsgb2JqZWN0ICsgXCJcXFwiIGFuZCBJc0FjdGl2ZSA9PSBZRVMpLGNvbV92ZWV2YV9jbG1fb2JqZWN0UmVjb3JkVHlwZXMocmVzdWx0KVwiO1xuICAgICAgICAgIGlmKCFjb20udmVldmEuY2xtLnRlc3RNb2RlKVxuICAgICAgICAgICAgICBjb20udmVldmEuY2xtLnJ1bkFQSVJlcXVlc3QocXVlcnkpO1xuICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgY29tX3ZlZXZhX2NsbV9vYmplY3RSZWNvcmRUeXBlcyhjb20udmVldmEuY2xtLnRlc3RSZXN1bHQuY29tbW9uKTtcbiAgICAgIH0sXG5cbiAgICAgIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vIFN1cnZleXMgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblxuICAgICAgLy8gMVxuICAgICAgLy8gUmV0dXJucyBhbiBhcnJheSBvZiByZWNvcmQgSURzIG9mIGFsbCBTdXJ2ZXkgUXVlc3Rpb25zIChTdXJ2ZXlfUXVlc3Rpb25fdm9kX19jKSBmb3IgYSBzcGVjaWZpYyBTdXJ2ZXkgKFN1cnZleV92b2RfX2MpXG4gICAgICAvLyBSZXN1bHRzIGFyZSByZXR1cm5lZCBpbiBhc2NlbmRpbmcgb3JkZXIgYmFzZWQgb24gdGhlIE9yZGVyX3ZvZF9fYyBmaWVsZCBvbiBTdXJ2ZXkgUXVlc3Rpb25fdm9kX19jLlxuICAgICAgLy8gc3VydmV5IC0gc3BlY2lmaWVzIHRoZSByZWNvcmQgSUQgb2YgdGhlIFN1cnZleSB0byBnZXQgYWxsIHJlbGF0ZWQgU3VydmV5IFF1ZXN0aW9ucyBmcm9tXG4gICAgICAvLyBjYWxsYmFjayAtIGNhbGwgYmFjayBmdW5jdGlvbiB3aGljaCB3aWxsIGJlIHVzZWQgdG8gcmV0dXJuIHRoZSBpbmZvcm1hdGlvblxuICAgICAgZ2V0U3VydmV5UXVlc3Rpb25zX1N1cnZleTogZnVuY3Rpb24oc3VydmV5LCBjYWxsYmFjaykge1xuICAgICAgICAgIHJldCA9IHRoaXMuY2hlY2tDYWxsYmFja0Z1bmN0aW9uKGNhbGxiYWNrKTtcbiAgICAgICAgICBpZihyZXQuc3VjY2VzcyA9PSBmYWxzZSlcbiAgICAgICAgICAgICAgcmV0dXJuIHJldDtcblxuICAgICAgICAgIC8vIGNoZWNrIGFyZ3VtZW50c1xuICAgICAgICAgIHJldCA9IHRoaXMuY2hlY2tBcmd1bWVudChcInN1cnZleVwiLCBzdXJ2ZXkpO1xuICAgICAgICAgIGlmKHJldC5zdWNjZXNzID09IGZhbHNlKSB7XG4gICAgICAgICAgICAgIGNvbS52ZWV2YS5jbG0ud3JhcFJlc3VsdChcImdldFN1cnZleVF1ZXN0aW9uc19TdXJ2ZXlcIiwgY2FsbGJhY2ssIHJldCk7XG4gICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICB3aW5kb3dbXCJjb21fdmVldmFfY2xtX3N1cnZleVF1ZXN0aW9uc1wiXSA9IGZ1bmN0aW9uKHJlc3VsdCkge1xuICAgICAgICAgICAgICBjb20udmVldmEuY2xtLndyYXBSZXN1bHQoXCJnZXRTdXJ2ZXlRdWVzdGlvbnNfU3VydmV5XCIsIGNhbGxiYWNrLCByZXN1bHQpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHF1ZXJ5ID0gXCJ2ZWV2YTpxdWVyeU9iamVjdChTdXJ2ZXlfUXVlc3Rpb25fdm9kX19jKSxmaWVsZHMoSUQpLHdoZXJlKFdIRVJFIFN1cnZleV92b2RfX2M9XFxcIlwiICsgc3VydmV5ICsgXCJcXFwiKSxzb3J0KE9yZGVyX3ZvZF9fYyxhc2MpLGNvbV92ZWV2YV9jbG1fc3VydmV5UXVlc3Rpb25zKHJlc3VsdClcIjtcbiAgICAgICAgICBpZighY29tLnZlZXZhLmNsbS50ZXN0TW9kZSlcbiAgICAgICAgICAgICAgY29tLnZlZXZhLmNsbS5ydW5BUElSZXF1ZXN0KHF1ZXJ5KTtcbiAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgIGNvbV92ZWV2YV9jbG1fc3VydmV5UXVlc3Rpb25zKGNvbS52ZWV2YS5jbG0udGVzdFJlc3VsdC5jb21tb24pO1xuXG4gICAgICB9LFxuXG4gICAgICAvLyAyXG4gICAgICAvLyBSZXR1cm5zIGFuIGFycmF5IG9mIHJlY29yZCBJRHMgb2YgYWxsIFF1ZXN0aW9ucyBSZXNwb25zZXMgKFF1ZXN0aW9uX1Jlc3BvbnNlX3ZvZF9fYyBvYmplY3QpIGZvciBhIHNwZWNpZmljIFN1cnZleVxuICAgICAgLy8gVGFyZ2V0IChTdXJ2ZXlfVGFyZ2V0X3ZvZF9fYykuIFJlc3VsdHMgYXJlIHJldHVybmVkIGluIGFzY2VuZGluZyBvcmRlciBiYXNlZCBvbiB0aGUgT3JkZXJfdm9kX19jIGZpZWxkIG9uIFF1ZXN0aW9uX1Jlc3BvbnNlX3ZvZF9fYy5cbiAgICAgIC8vIHN1cnZleXRhcmdldCAtIHNwZWNpZmllcyB0aGUgcmVjb3JkIElEIG9mIHRoZSBTdXJ2ZXkgVGFyZ2V0IHRvIGdldCBhbGwgcmVsYXRlZCBRdWVzdGlvbiBSZXNwb25zZXMgZnJvbVxuICAgICAgLy8gY2FsbGJhY2sgLSBjYWxsIGJhY2sgZnVuY3Rpb24gd2hpY2ggd2lsbCBiZSB1c2VkIHRvIHJldHVybiB0aGUgaW5mb3JtYXRpb25cbiAgICAgIGdldFF1ZXN0aW9uUmVzcG9uc2VfU3VydmV5VGFyZ2V0OiBmdW5jdGlvbihzdXJ2ZXl0YXJnZXQsIGNhbGxiYWNrKSB7XG4gICAgICAgICAgcmV0ID0gdGhpcy5jaGVja0NhbGxiYWNrRnVuY3Rpb24oY2FsbGJhY2spO1xuICAgICAgICAgIGlmKHJldC5zdWNjZXNzID09IGZhbHNlKVxuICAgICAgICAgICAgICByZXR1cm4gcmV0O1xuXG4gICAgICAgICAgLy8gY2hlY2sgYXJndW1lbnRzXG4gICAgICAgICAgcmV0ID0gdGhpcy5jaGVja0FyZ3VtZW50KFwic3VydmV5dGFyZ2V0XCIsIHN1cnZleXRhcmdldCk7XG4gICAgICAgICAgaWYocmV0LnN1Y2Nlc3MgPT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgY29tLnZlZXZhLmNsbS53cmFwUmVzdWx0KFwiZ2V0UXVlc3Rpb25SZXNwb25zZV9TdXJ2ZXlUYXJnZXRcIiwgY2FsbGJhY2ssIHJldCk7XG4gICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG4gICAgICAgICAgd2luZG93W1wiY29tX3ZlZXZhX2NsbV90YXJnZXRSZXNwb25zZXNcIl0gPSBmdW5jdGlvbihyZXN1bHQpIHtcbiAgICAgICAgICAgICAgY29tLnZlZXZhLmNsbS53cmFwUmVzdWx0KFwiZ2V0UXVlc3Rpb25SZXNwb25zZV9TdXJ2ZXlUYXJnZXRcIiwgY2FsbGJhY2ssIHJlc3VsdCk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcXVlcnkgPSBcInZlZXZhOnF1ZXJ5T2JqZWN0KFF1ZXN0aW9uX1Jlc3BvbnNlX3ZvZF9fYyksZmllbGRzKElEKSx3aGVyZShXSEVSRSBTdXJ2ZXlfVGFyZ2V0X3ZvZF9fYz1cXFwiXCIgKyBzdXJ2ZXl0YXJnZXQgKyBcIlxcXCIpLHNvcnQoT3JkZXJfdm9kX19jLGFzYyksY29tX3ZlZXZhX2NsbV90YXJnZXRSZXNwb25zZXMocmVzdWx0KVwiO1xuICAgICAgICAgIGlmKCFjb20udmVldmEuY2xtLnRlc3RNb2RlKVxuICAgICAgICAgICAgICBjb20udmVldmEuY2xtLnJ1bkFQSVJlcXVlc3QocXVlcnkpO1xuICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgY29tX3ZlZXZhX2NsbV90YXJnZXRSZXNwb25zZXMoY29tLnZlZXZhLmNsbS50ZXN0UmVzdWx0LmNvbW1vbik7XG4gICAgICB9LFxuXG4gICAgICAvLyAzXG4gICAgICAvLyBSZXR1cm5zIGFuIGFycmF5IG9mIHJlY29yZCBJRHMgb2YgYWxsIFN1cnZleSBUYXJnZXRzIChTdXJ2ZXlfVGFyZ2V0X3ZvZF9fYykgZm9yIGEgc3BlY2lmaWMgYWNjb3VudCAoQWNjb3VudCksIGZvciBhXG4gICAgICAvLyBzcGVjaWZpYyBTdXJ2ZXkgKFN1cnZleV92b2RfX2MpXG4gICAgICAvLyBhY2NvdW50IC0gc3BlY2lmaWVzIHRoZSByZWNvcmQgSUQgb2YgdGhlIEFjY291bnQgdG8gZ2V0IGFsbCByZWxhdGVkIFN1cnZleSBUYXJnZXRzIGZyb21cbiAgICAgIC8vIHN1cnZleSAtIHNwZWNpZmllcyB0aGUgcmVjb3JkIElEIG9mIHRoZSBTdXJ2ZXkgdG8gZ2V0IGFsbCByZWxhdGVkIFN1cnZleSBUYXJnZXRzIGZyb20uICBDYW4gYmUgbWFkZSBvcHRpb25hbCBieSBwdXR0aW5nIGluIFwiXCIuXG4gICAgICAvLyBjYWxsYmFjayAtIGNhbGwgYmFjayBmdW5jdGlvbiB3aGljaCB3aWxsIGJlIHVzZWQgdG8gcmV0dXJuIHRoZSBpbmZvcm1hdGlvblxuICAgICAgZ2V0U3VydmV5VGFyZ2V0X0FjY291bnQ6IGZ1bmN0aW9uKGFjY291bnQsIHN1cnZleSwgY2FsbGJhY2spIHtcbiAgICAgICAgICByZXQgPSB0aGlzLmNoZWNrQ2FsbGJhY2tGdW5jdGlvbihjYWxsYmFjayk7XG4gICAgICAgICAgaWYocmV0LnN1Y2Nlc3MgPT0gZmFsc2UpXG4gICAgICAgICAgICAgIHJldHVybiByZXQ7XG5cbiAgICAgICAgICAvLyBjaGVjayBhcmd1bWVudHNcbiAgICAgICAgICByZXQgPSB0aGlzLmNoZWNrQXJndW1lbnQoXCJhY2NvdW50XCIsIGFjY291bnQpO1xuICAgICAgICAgIGlmKHJldC5zdWNjZXNzID09IGZhbHNlKSB7XG4gICAgICAgICAgICAgIGNvbS52ZWV2YS5jbG0ud3JhcFJlc3VsdChcImdldFN1cnZleVRhcmdldF9BY2NvdW50XCIsIGNhbGxiYWNrLCByZXQpO1xuICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgd2luZG93W1wiY29tX3ZlZXZhX2NsbV9hY2NvdW50U3VydmV5VGFyZ2V0c1wiXSA9IGZ1bmN0aW9uKHJlc3VsdCkge1xuICAgICAgICAgICAgICBjb20udmVldmEuY2xtLndyYXBSZXN1bHQoXCJnZXRTdXJ2ZXlUYXJnZXRfQWNjb3VudFwiLCBjYWxsYmFjaywgcmVzdWx0KTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBxdWVyeSA9IG51bGw7XG4gICAgICAgICAgaWYoc3VydmV5ID09IG51bGwgfHwgc3VydmV5ID09IFwiXCIpIHtcbiAgICAgICAgICAgICAgcXVlcnkgPSBcInZlZXZhOnF1ZXJ5T2JqZWN0KFN1cnZleV9UYXJnZXRfdm9kX19jKSxmaWVsZHMoSUQpLHdoZXJlKFdIRVJFIEFjY291bnRfdm9kX19jPVxcXCJcIiArIGFjY291bnQgKyBcIlxcXCIpLGNvbV92ZWV2YV9jbG1fYWNjb3VudFN1cnZleVRhcmdldHMocmVzdWx0KVwiO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHF1ZXJ5ID0gXCJ2ZWV2YTpxdWVyeU9iamVjdChTdXJ2ZXlfVGFyZ2V0X3ZvZF9fYyksZmllbGRzKElEKSx3aGVyZShXSEVSRSBBY2NvdW50X3ZvZF9fYz1cXFwiXCIgKyBhY2NvdW50ICsgXCJcXFwiIEFORCBTdXJ2ZXlfdm9kX19jPVxcXCJcIiArIHN1cnZleSArIFwiXFxcIiksY29tX3ZlZXZhX2NsbV9hY2NvdW50U3VydmV5VGFyZ2V0cyhyZXN1bHQpXCI7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmKCFjb20udmVldmEuY2xtLnRlc3RNb2RlKVxuICAgICAgICAgICAgICBjb20udmVldmEuY2xtLnJ1bkFQSVJlcXVlc3QocXVlcnkpO1xuICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgY29tX3ZlZXZhX2NsbV9hY2NvdW50U3VydmV5VGFyZ2V0cyhjb20udmVldmEuY2xtLnRlc3RSZXN1bHQuY29tbW9uKTtcbiAgICAgIH0sXG5cblxuICAgICAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8gT3JkZXIgTWFuYWdlbWVudCAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXG4gICAgICAvLyAqIENhbXBhaWduIGFuZCBDb250cmFjdCBiYXNlZCBQcmljaW5nIFJ1bGVzIGFyZSBub3Qgc3VwcG9ydGVkIGJ5IHRoZSBKYXZhU2NyaXB0IExpYnJhcnkgZm9yIENMTSBPcmRlciBNYW5hZ2VtZW50IGZ1bmN0aW9uc1wiXG4gICAgICAvLyAxXG4gICAgICAvLyBSZXR1cm5zIGFuIGFycmF5IG9mIHJlY29yZCBJRHMgb2YgYWxsIHByb2R1Y3RzIChQcm9kdWN0X3ZvZF9fYykgb2YgdHlwZSBPcmRlciB0aGF0IGhhdmUgdmFsaWQgbGlzdCBwcmljZXNcbiAgICAgIC8vICAgICAgICAgIFZhbGlkIGxpc3QgcHJpY2UgPSBQcmljaW5nIFJ1bGUgKFByaWNpbmdfUnVsZV92b2RfX2MpIG9mIHJlY29yZCB0eXBlIExpc3QgUHJpY2UgKExpc3RfUHJpY2VfUnVsZV92b2QpIHdoZXJlIGN1cnJlbnQgZGF0ZSBpc1xuICAgICAgLy8gICAgICAgICAgYmV0d2VlbiBTdGFydCBEYXRlIChTdGFydF9EYXRlX3ZvZF9fYykgYW5kIEVuZCBEYXRlIChFbmRfRGF0ZV92b2RfX2MpXG4gICAgICAvLyBjYWxsYmFjayAtIGNhbGwgYmFjayBmdW5jdGlvbiB3aGljaCB3aWxsIGJlIHVzZWQgdG8gcmV0dXJuIHRoZSBpbmZvcm1hdGlvblxuICAgICAgLy8gYWNjb3VudC9hY2NvdW50IGdyb3VwIC0gc3BlY2lmaWVzIHRoZSByZWNvcmQgSUQgb2YgYW4gQWNjb3VudCBvciB0aGUgbWF0Y2hpbmcgdGV4dCBmb3IgdGhlIEFjY291bnQgR3JvdXAuIENhbiBiZSBtYWRlIG9wdGlvbmFsXG4gICAgICAvLyBieSBwdXR0aW5nIGluIFwiXCIuIFdoZW4gdXRpbGl6ZWQsIHJldHVybnMgYW4gYXJyYXkgb2YgcmVjb3JkIElEcyBvZiBhbGwgcHJvZHVjdHMgKFByb2R1Y3Rfdm9kX19jKSBvZiB0eXBlIE9yZGVyXG4gICAgICAvLyB0aGF0IGhhdmUgdmFsaWQgbGlzdCBwcmljZSByZWNvcmRzIHdoaWNoIHNwZWNpZnkgdGhlIEFjY291bnQgb3IgQWNjb3VudCBHcm91cC5cbiAgICAgIGdldFByb2R1Y3RfT3JkZXJBY3RpdmVfQWNjb3VudDogZnVuY3Rpb24oYWNjb3VudE9yQWNjb3VudEdyb3VwLCBjYWxsYmFjaykge1xuICAgICAgICAgIHZhciBvcmRlclByb2R1Y3RzO1xuICAgICAgICAgIHZhciByZXQgPSB0aGlzLmNoZWNrQ2FsbGJhY2tGdW5jdGlvbihjYWxsYmFjayk7XG4gICAgICAgICAgaWYocmV0LnN1Y2Nlc3MgPT0gZmFsc2UpXG4gICAgICAgICAgICAgIHJldHVybiByZXQ7XG5cbiAgICAgICAgICAvLyBjLCBwcm9kdWN0XG4gICAgICAgICAgd2luZG93W1wiY29tX3ZlZXZhX2NsbV9vcmRlcnNXaXRoTGlzdFByaWNlXCJdID0gZnVuY3Rpb24ocmVzdWx0KSB7XG4gICAgICAgICAgICAgIHJlc3VsdCA9IGNvbS52ZWV2YS5jbG0uZm9ybWF0UmVzdWx0KHJlc3VsdCk7XG4gICAgICAgICAgICAgIGlmKHJlc3VsdC5zdWNjZXNzKSB7XG4gICAgICAgICAgICAgICAgICBvcmRlcklkcyA9IFtdO1xuICAgICAgICAgICAgICAgICAgaWYocmVzdWx0LlByaWNpbmdfUnVsZV92b2RfX2MgJiYgcmVzdWx0LlByaWNpbmdfUnVsZV92b2RfX2MubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICAgIGZvcihpID0gMDsgaSA8IHJlc3VsdC5QcmljaW5nX1J1bGVfdm9kX19jLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIG9yZGVySWRzLnB1c2gocmVzdWx0LlByaWNpbmdfUnVsZV92b2RfX2NbaV0uUHJvZHVjdF92b2RfX2MpO1xuICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgcmV0LnN1Y2Nlc3MgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgcmV0LlByb2R1Y3Rfdm9kX19jID0gb3JkZXJJZHM7XG4gICAgICAgICAgICAgICAgICBjb20udmVldmEuY2xtLndyYXBSZXN1bHQoXCJnZXRQcm9kdWN0X09yZGVyQWN0aXZlX0FjY291bnRcIiwgY2FsbGJhY2ssIHJldCk7XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICBjb20udmVldmEuY2xtLndyYXBSZXN1bHQoXCJnZXRQcm9kdWN0X09yZGVyQWN0aXZlX0FjY291bnRcIiwgY2FsbGJhY2ssIHJlc3VsdCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICB9O1xuXG4gICAgICAgICAgLy8gYiwgZ290IHJlY29yZCB0eXBlIGlkXG4gICAgICAgICAgd2luZG93W1wiY29tX3ZlZXZhX2NsbV9saXN0UHJpY2VUeXBlSWRcIl0gPSBmdW5jdGlvbihyZXN1bHQpIHtcbiAgICAgICAgICAgICAgcmVzdWx0ID0gY29tLnZlZXZhLmNsbS5mb3JtYXRSZXN1bHQocmVzdWx0KTtcbiAgICAgICAgICAgICAgaWYocmVzdWx0LnN1Y2Nlc3MgJiYgcmVzdWx0LlJlY29yZFR5cGUgJiYgcmVzdWx0LlJlY29yZFR5cGUubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgbGlzdFByaWNlUmVjb3JkVHlwZUlkID0gcmVzdWx0LlJlY29yZFR5cGVbMF0uSUQ7XG5cbiAgICAgICAgICAgICAgICAgIC8vIGMsIGZldGNoIHByb2R1Y3Qgd2hpY2ggaGFzIDxsaXN0IHByaWNlPiBwcmljaW5nIHJ1bGVzXG4gICAgICAgICAgICAgICAgICB2YXIgaWRzID0gW107XG4gICAgICAgICAgICAgICAgICBmb3IoaSA9IDA7IGkgPCBvcmRlclByb2R1Y3RzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgaWRzLnB1c2gob3JkZXJQcm9kdWN0c1tpXS5JRCk7XG4gICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgIGRhdGVTdHJpbmcgPSBjb20udmVldmEuY2xtLmdldEN1cnJlbnREYXRlKCk7XG5cbiAgICAgICAgICAgICAgICAgIHF1ZXJ5ID0gbnVsbDtcbiAgICAgICAgICAgICAgICAgIGlmKGFjY291bnRPckFjY291bnRHcm91cCA9PSBudWxsIHx8IGFjY291bnRPckFjY291bnRHcm91cCA9PSBcIlwiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgcXVlcnkgPSBcInZlZXZhOnF1ZXJ5T2JqZWN0KFByaWNpbmdfUnVsZV92b2RfX2MpLGZpZWxkcyhJRCxQcm9kdWN0X3ZvZF9fYyksd2hlcmUoV0hFUkUgUmVjb3JkVHlwZUlkPVxcXCJcIiArIGxpc3RQcmljZVJlY29yZFR5cGVJZCArIFwiXFxcIiBBTkQgU3RhcnRfRGF0ZV92b2RfX2MgPD0gXFxcIlwiICsgZGF0ZVN0cmluZ1xuICAgICAgICAgICAgICAgICAgICAgICsgXCJcXFwiIEFORCBFbmRfRGF0ZV92b2RfX2MgPj0gXFxcIlwiICsgZGF0ZVN0cmluZyArIFwiXFxcIiBBTkQgUHJvZHVjdF92b2RfX2MgSU4gXCIgKyBjb20udmVldmEuY2xtLmpvaW5TdHJpbmdBcnJheUZvckluKGlkcykgKyBcIiksIGNvbV92ZWV2YV9jbG1fb3JkZXJzV2l0aExpc3RQcmljZShyZXN1bHQpXCI7XG4gICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgIHF1ZXJ5ID0gXCJ2ZWV2YTpxdWVyeU9iamVjdChQcmljaW5nX1J1bGVfdm9kX19jKSxmaWVsZHMoSUQsUHJvZHVjdF92b2RfX2MpLHdoZXJlKFdIRVJFIFJlY29yZFR5cGVJZD1cXFwiXCIgKyBsaXN0UHJpY2VSZWNvcmRUeXBlSWQgKyBcIlxcXCIgQU5EIChBY2NvdW50X3ZvZF9fYz1cXFwiXCIgKyBhY2NvdW50T3JBY2NvdW50R3JvdXBcbiAgICAgICAgICAgICAgICAgICAgICArIFwiXFxcIiBPUiBBY2NvdW50X0dyb3VwX3ZvZF9fYyA9IFxcXCJcIiArIGFjY291bnRPckFjY291bnRHcm91cCArIFwiXFxcIikgQU5EIFN0YXJ0X0RhdGVfdm9kX19jIDw9XFxcIlwiICsgZGF0ZVN0cmluZyArIFwiXFxcIiBBTkQgRW5kX0RhdGVfdm9kX19jID49IFxcXCJcIiArIGRhdGVTdHJpbmdcbiAgICAgICAgICAgICAgICAgICAgICArIFwiXFxcIiBBTkQgUHJvZHVjdF92b2RfX2MgSU4gXCIgKyBjb20udmVldmEuY2xtLmpvaW5TdHJpbmdBcnJheUZvckluKGlkcykgKyBcIiksIGNvbV92ZWV2YV9jbG1fb3JkZXJzV2l0aExpc3RQcmljZShyZXN1bHQpXCI7XG4gICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgIGlmKCFjb20udmVldmEuY2xtLnRlc3RNb2RlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgY29tLnZlZXZhLmNsbS5ydW5BUElSZXF1ZXN0KHF1ZXJ5KTtcbiAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgY29tX3ZlZXZhX2NsbV9vcmRlcnNXaXRoTGlzdFByaWNlKHRlc3RSZXN1bHQubGlzdFByaWNlcylcbiAgICAgICAgICAgICAgICAgIH1cblxuXG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICBjb20udmVldmEuY2xtLndyYXBSZXN1bHQoXCJnZXRQcm9kdWN0X09yZGVyQWN0aXZlX0FjY291bnRcIiwgY2FsbGJhY2ssIHJlc3VsdCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICB9O1xuXG4gICAgICAgICAgLy8gYSwgZ2V0IG9yZGVyIHByb2R1Y3RzXG4gICAgICAgICAgdGhpcy5nZXRQcm9kdWN0X015U2V0dXAoXCJPcmRlclwiLCBmdW5jdGlvbihyZXN1bHQpIHtcbiAgICAgICAgICAgICAgLy8gZ290IHRoZSBsaXN0IG9yZGVyIHByb2R1Y3RzLFxuICAgICAgICAgICAgICBpZihyZXN1bHQuc3VjY2Vzcykge1xuXG4gICAgICAgICAgICAgICAgICBvcmRlclByb2R1Y3RzID0gcmVzdWx0LlByb2R1Y3Rfdm9kX19jO1xuICAgICAgICAgICAgICAgICAgaWYob3JkZXJQcm9kdWN0cyAmJiBvcmRlclByb2R1Y3RzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAvLyBiLCBmaW5kIG91dCBMaXN0IFByaWNlIHJlY29yZCB0eXBlIGlkXG4gICAgICAgICAgICAgICAgICAgICAgcmVjb3JkVHlwZVF1ZXJ5ID0gXCJ2ZWV2YTpxdWVyeU9iamVjdChSZWNvcmRUeXBlKSxmaWVsZHMoSUQpLHdoZXJlKFdIRVJFIFNvYmplY3RUeXBlPVxcXCJQcmljaW5nX1J1bGVfdm9kX19jXFxcIiBBTkQgTmFtZV92b2RfX2M9XFxcIkxpc3RfUHJpY2VfUnVsZV92b2RcXFwiKSxjb21fdmVldmFfY2xtX2xpc3RQcmljZVR5cGVJZChyZXN1bHQpXCI7XG4gICAgICAgICAgICAgICAgICAgICAgaWYoIWNvbS52ZWV2YS5jbG0udGVzdE1vZGUpXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGNvbS52ZWV2YS5jbG0ucnVuQVBJUmVxdWVzdChyZWNvcmRUeXBlUXVlcnkpO1xuICAgICAgICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgICAgICAgY29tX3ZlZXZhX2NsbV9saXN0UHJpY2VUeXBlSWQodGVzdFJlc3VsdC5saXN0UHJpY2VSZWNvcmRUeXBlKTtcbiAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgcmV0LnN1Y2Nlc3MgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgIHJldC5Qcm9kdWN0X3ZvZF9fYyA9IFtdO1xuICAgICAgICAgICAgICAgICAgICAgIGNvbS52ZWV2YS5jbG0ud3JhcFJlc3VsdChcImdldFByb2R1Y3RfT3JkZXJBY3RpdmVfQWNjb3VudFwiLCBjYWxsYmFjaywgcmV0KTtcbiAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAvLyBFUlJPUiB3aGVuIGdldGluZyBQcm9kdWN0IG9mIG9yZGVyIHR5cGUuXG4gICAgICAgICAgICAgICAgICBjb20udmVldmEuY2xtLndyYXBSZXN1bHQoXCJnZXRQcm9kdWN0X09yZGVyQWN0aXZlX0FjY291bnRcIiwgY2FsbGJhY2ssIHJlc3VsdCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcblxuICAgICAgfSxcblxuICAgICAgLy8gMlxuICAgICAgLy8gUmV0dXJucyBhbiBhcnJheSBvZiByZWNvcmQgSURzIG9mIGFsbCBwcm9kdWN0cyAoUHJvZHVjdF92b2RfX2MpIG9mIHR5cGUgS2l0IENvbXBvbmVudCAoUHJvZHVjdF9UeXBlX3ZvZF9fYyBmaWVsZCkgd2hvIGhhdmVcbiAgICAgIC8vIHBhcmVudCBwcm9kdWN0IChQYXJlbnRfUHJvZHVjdF92b2RfX2MpID0gcHJvZHVjdFxuICAgICAgLy8gcHJvZHVjdCAtIHNwZWNpZmllcyB0aGUgcmVjb3JkIElEIG9mIHRoZSBwcm9kdWN0IG9mIHdoaWNoIHRvIGdldCBhbGwgcmVsYXRlZCBLaXQgQ29tcG9uZW50cyBmcm9tXG4gICAgICAvLyBjYWxsYmFjayAtIGNhbGwgYmFjayBmdW5jdGlvbiB3aGljaCB3aWxsIGJlIHVzZWQgdG8gcmV0dXJuIHRoZSBpbmZvcm1hdGlvblxuICAgICAgZ2V0UHJvZHVjdF9LaXRDb21wb25lbnRzOiBmdW5jdGlvbihwcm9kdWN0LCBjYWxsYmFjaykge1xuICAgICAgICAgIHJldCA9IHRoaXMuY2hlY2tDYWxsYmFja0Z1bmN0aW9uKGNhbGxiYWNrKTtcbiAgICAgICAgICBpZihyZXQuc3VjY2VzcyA9PSBmYWxzZSlcbiAgICAgICAgICAgICAgcmV0dXJuIHJldDtcblxuICAgICAgICAgIC8vIGNoZWNrIGFyZ3VtZW50c1xuICAgICAgICAgIHJldCA9IHRoaXMuY2hlY2tBcmd1bWVudChcInByb2R1Y3RcIiwgcHJvZHVjdCk7XG4gICAgICAgICAgaWYocmV0LnN1Y2Nlc3MgPT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgY29tLnZlZXZhLmNsbS53cmFwUmVzdWx0KFwiZ2V0UHJvZHVjdF9LaXRDb21wb25lbnRzXCIsIGNhbGxiYWNrLCByZXQpO1xuICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuICAgICAgICAgIHdpbmRvd1tcImNvbV92ZWV2YV9jbG1fY2hpbGRLaXRJdGVtc1wiXSA9IGZ1bmN0aW9uKHJlc3VsdCkge1xuICAgICAgICAgICAgICBjb20udmVldmEuY2xtLndyYXBSZXN1bHQoXCJnZXRQcm9kdWN0X0tpdENvbXBvbmVudHNcIiwgY2FsbGJhY2ssIHJlc3VsdCk7XG4gICAgICAgICAgfTtcblxuXG4gICAgICAgICAgcXVlcnkgPSBcInZlZXZhOnF1ZXJ5T2JqZWN0KFByb2R1Y3Rfdm9kX19jKSxmaWVsZHMoSUQpLHdoZXJlKFdIRVJFIFByb2R1Y3RfVHlwZV92b2RfX2M9XFxcIktpdCBJdGVtXFxcIiBBTkQgUGFyZW50X1Byb2R1Y3Rfdm9kX19jPVxcXCJcIiArIHByb2R1Y3QgKyBcIlxcXCIpLGNvbV92ZWV2YV9jbG1fY2hpbGRLaXRJdGVtcyhyZXN1bHQpXCI7XG4gICAgICAgICAgaWYoIWNvbS52ZWV2YS5jbG0udGVzdE1vZGUpXG4gICAgICAgICAgICAgIGNvbS52ZWV2YS5jbG0ucnVuQVBJUmVxdWVzdChxdWVyeSk7XG4gICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICBjb21fdmVldmFfY2xtX2NoaWxkS2l0SXRlbXMoY29tLnZlZXZhLmNsbS50ZXN0UmVzdWx0LmNvbW1vbik7XG4gICAgICB9LFxuXG4gICAgICAvLyAzXG4gICAgICAvLyBSZXR1cm5zIGFuIGFycmF5IG9mIHJlY29yZCBJRHMgb2YgUHJvZHVjdCBHcm91cHMgKFByb2R1Y3RfR3JvdXBfdm9kX19jKSB0aGF0IHRoZSBzcGVjaWZpZWQgcHJvZHVjdCAoUHJvZHVjdF92b2RfX2MpIGlzIHBhcnQgb2ZcbiAgICAgIC8vIHByb2R1Y3QgLSBzcGVjaWZpZXMgdGhlIHJlY29yZCBJRCBvZiB0aGUgcHJvZHVjdCBvZiB3aGljaCB0byBnZXQgYWxsIHJlbGF0ZWQgUHJvZHVjdCBHcm91cHMgZnJvbVxuICAgICAgLy8gY2FsbGJhY2sgLSBjYWxsIGJhY2sgZnVuY3Rpb24gd2hpY2ggd2lsbCBiZSB1c2VkIHRvIHJldHVybiB0aGUgaW5mb3JtYXRpb25cbiAgICAgIGdldFByb2R1Y3RHcm91cF9Qcm9kdWN0OiBmdW5jdGlvbihwcm9kdWN0LCBjYWxsYmFjaykge1xuICAgICAgICAgIHJldCA9IHRoaXMuY2hlY2tDYWxsYmFja0Z1bmN0aW9uKGNhbGxiYWNrKTtcbiAgICAgICAgICBpZihyZXQuc3VjY2VzcyA9PSBmYWxzZSlcbiAgICAgICAgICAgICAgcmV0dXJuIHJldDtcblxuICAgICAgICAgIC8vIGNoZWNrIGFyZ3VtZW50c1xuICAgICAgICAgIHJldCA9IHRoaXMuY2hlY2tBcmd1bWVudChcInByb2R1Y3RcIiwgcHJvZHVjdCk7XG4gICAgICAgICAgaWYocmV0LnN1Y2Nlc3MgPT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgY29tLnZlZXZhLmNsbS53cmFwUmVzdWx0KFwiZ2V0UHJvZHVjdEdyb3VwX1Byb2R1Y3RcIiwgY2FsbGJhY2ssIHJldCk7XG4gICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG4gICAgICAgICAgd2luZG93W1wiY29tX3ZlZXZhX2NsbV9wcm9kdWN0UHJvZHVjdEdyb3Vwc1wiXSA9IGZ1bmN0aW9uKHJlc3VsdCkge1xuICAgICAgICAgICAgICByZXN1bHQgPSBjb20udmVldmEuY2xtLmZvcm1hdFJlc3VsdChyZXN1bHQpO1xuICAgICAgICAgICAgICB2YXIgcmV0ID0ge307XG4gICAgICAgICAgICAgIGlmKHJlc3VsdCAhPSBudWxsICYmIHJlc3VsdC5zdWNjZXNzKSB7XG4gICAgICAgICAgICAgICAgICB2YXIgcm93cyA9IHJlc3VsdC5Qcm9kdWN0X0dyb3VwX3ZvZF9fYztcbiAgICAgICAgICAgICAgICAgIHZhciBncm91cElkcyA9IFtdO1xuICAgICAgICAgICAgICAgICAgaWYocm93cyAmJiByb3dzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICBmb3IoaSA9IDA7IGkgPCByb3dzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGdyb3VwSWRzLnB1c2gocm93c1tpXS5Qcm9kdWN0X0NhdGFsb2dfdm9kX19jKTtcbiAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgIHJldC5zdWNjZXNzID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgIHJldC5Qcm9kdWN0X3ZvZF9fYyA9IGdyb3VwSWRzO1xuXG4gICAgICAgICAgICAgICAgICBjb20udmVldmEuY2xtLndyYXBSZXN1bHQoXCJnZXRQcm9kdWN0R3JvdXBfUHJvZHVjdFwiLCBjYWxsYmFjaywgcmV0KTtcbiAgICAgICAgICAgICAgfSBlbHNlIGlmKHJlc3VsdCAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICBjb20udmVldmEuY2xtLndyYXBSZXN1bHQoXCJnZXRQcm9kdWN0R3JvdXBfUHJvZHVjdFwiLCBjYWxsYmFjaywgcmVzdWx0KTtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgIC8vIGlzIG5vdCBleHBlY3RlZCBmcm9tIGxvdy1sZXZlbCBBUElcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgIH07XG5cblxuICAgICAgICAgIHF1ZXJ5ID0gXCJ2ZWV2YTpxdWVyeU9iamVjdChQcm9kdWN0X0dyb3VwX3ZvZF9fYyksZmllbGRzKElELFByb2R1Y3RfQ2F0YWxvZ192b2RfX2MpLHdoZXJlKFdIRVJFIFByb2R1Y3Rfdm9kX19jPVxcXCJcIiArIHByb2R1Y3QgKyBcIlxcXCIpLGNvbV92ZWV2YV9jbG1fcHJvZHVjdFByb2R1Y3RHcm91cHMocmVzdWx0KVwiO1xuICAgICAgICAgIGlmKCFjb20udmVldmEuY2xtLnRlc3RNb2RlKVxuICAgICAgICAgICAgICBjb20udmVldmEuY2xtLnJ1bkFQSVJlcXVlc3QocXVlcnkpO1xuICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgY29tX3ZlZXZhX2NsbV9wcm9kdWN0UHJvZHVjdEdyb3Vwcyhjb20udmVldmEuY2xtLnRlc3RSZXN1bHQuY29tbW9uKTtcbiAgICAgIH0sXG5cblxuICAgICAgLy8gNFxuICAgICAgLy8gUmV0dXJucyBhbiBhcnJheSBvZiByZWNvcmQgSURzIG9mIHRoZSBsYXN0IDEwIE9yZGVycyAoT3JkZXJfdm9kX19jKSBmb3IgYSBwYXJ0aWN1bGFyIGFjY291bnQgKEFjY291bnQpXG4gICAgICAvLyBUaGUgb3JkZXIgb2YgbGFzdCB0ZW4gb3JkZXJzIGlzIGJhc2VkIG9uIHRoZSBmaWVsZCBPcmRlcl9EYXRlX3ZvZF9fYywgZGVzY2VuZGluZy5cbiAgICAgIC8vIGFjY291bnQgLSBzcGVjaWZpZXMgdGhlIHJlY29yZCBJRCBvZiB0aGUgYWNjb3VudCBvZiB3aGljaCB0byBnZXQgYWxsIHJlbGF0ZWQgb3JkZXJzXG4gICAgICAvLyBjYWxsYmFjayAtIGNhbGwgYmFjayBmdW5jdGlvbiB3aGljaCB3aWxsIGJlIHVzZWQgdG8gcmV0dXJuIHRoZSBpbmZvcm1hdGlvblxuICAgICAgZ2V0TGFzdFRlbk9yZGVyc19BY2NvdW50OiBmdW5jdGlvbihhY2NvdW50LCBjYWxsYmFjaykge1xuICAgICAgICAgIHJldCA9IHRoaXMuY2hlY2tDYWxsYmFja0Z1bmN0aW9uKGNhbGxiYWNrKTtcbiAgICAgICAgICBpZihyZXQuc3VjY2VzcyA9PSBmYWxzZSlcbiAgICAgICAgICAgICAgcmV0dXJuIHJldDtcblxuICAgICAgICAgIC8vIGNoZWNrIGFyZ3VtZW50c1xuICAgICAgICAgIHJldCA9IHRoaXMuY2hlY2tBcmd1bWVudChcImFjY291bnRcIiwgYWNjb3VudCk7XG4gICAgICAgICAgaWYocmV0LnN1Y2Nlc3MgPT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgY29tLnZlZXZhLmNsbS53cmFwUmVzdWx0KFwiZ2V0TGFzdFRlbk9yZGVyc19BY2NvdW50XCIsIGNhbGxiYWNrLCByZXQpO1xuICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgd2luZG93W1wiY29tX3ZlZXZhX2NsbV9hY2NvdW50TGFzdFRlbk9yZGVyc1wiXSA9IGZ1bmN0aW9uKHJlc3VsdCkge1xuICAgICAgICAgICAgICBjb20udmVldmEuY2xtLndyYXBSZXN1bHQoXCJnZXRMYXN0VGVuT3JkZXJzX0FjY291bnRcIiwgY2FsbGJhY2ssIHJlc3VsdCk7XG4gICAgICAgICAgfTtcblxuXG4gICAgICAgICAgcXVlcnkgPSBcInZlZXZhOnF1ZXJ5T2JqZWN0KE9yZGVyX3ZvZF9fYyksZmllbGRzKElEKSx3aGVyZShXSEVSRSBBY2NvdW50X3ZvZF9fYz1cXFwiXCIgKyBhY2NvdW50ICsgXCJcXFwiKSxzb3J0KE9yZGVyX0RhdGVfdm9kX19jLGRlc2MpLGxpbWl0KDEwKSxjb21fdmVldmFfY2xtX2FjY291bnRMYXN0VGVuT3JkZXJzKHJlc3VsdClcIjtcbiAgICAgICAgICBpZighY29tLnZlZXZhLmNsbS50ZXN0TW9kZSlcbiAgICAgICAgICAgICAgY29tLnZlZXZhLmNsbS5ydW5BUElSZXF1ZXN0KHF1ZXJ5KTtcbiAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgIGNvbV92ZWV2YV9jbG1fYWNjb3VudExhc3RUZW5PcmRlcnMoY29tLnZlZXZhLmNsbS50ZXN0UmVzdWx0LmNvbW1vbik7XG4gICAgICB9LFxuXG4gICAgICAvLyA1XG4gICAgICAvLyBSZXR1cm5zIGFuIGFycmF5IG9mIHJlY29yZCBJRHMgb2YgYWxsIE9yZGVyIExpbmVzIChPcmRlcl9MaW5lX3ZvZF9fYykgZm9yIGEgcGFydGljdWxhciBvcmRlciAoT3JkZXJfdm9kX19jKVxuICAgICAgLy8gb3JkZXIgLSBzcGVjaWZpZXMgdGhlIHJlY29yZCBJRCBvZiB0aGUgb3JkZXIgb2Ygd2hpY2ggdG8gZ2V0IGFsbCByZWxhdGVkIG9yZGVyIGxpbmVzXG4gICAgICAvLyBjYWxsYmFjayAtIGNhbGwgYmFjayBmdW5jdGlvbiB3aGljaCB3aWxsIGJlIHVzZWQgdG8gcmV0dXJuIHRoZSBpbmZvcm1hdGlvblxuICAgICAgZ2V0T3JkZXJMaW5lc19PcmRlcjogZnVuY3Rpb24ob3JkZXIsIGNhbGxiYWNrKSB7XG4gICAgICAgICAgcmV0ID0gdGhpcy5jaGVja0NhbGxiYWNrRnVuY3Rpb24oY2FsbGJhY2spO1xuICAgICAgICAgIGlmKHJldC5zdWNjZXNzID09IGZhbHNlKVxuICAgICAgICAgICAgICByZXR1cm4gcmV0O1xuXG4gICAgICAgICAgLy8gY2hlY2sgYXJndW1lbnRzXG4gICAgICAgICAgcmV0ID0gdGhpcy5jaGVja0FyZ3VtZW50KFwib3JkZXJcIiwgb3JkZXIpO1xuICAgICAgICAgIGlmKHJldC5zdWNjZXNzID09IGZhbHNlKSB7XG4gICAgICAgICAgICAgIGNvbS52ZWV2YS5jbG0ud3JhcFJlc3VsdChcImdldE9yZGVyTGluZXNfT3JkZXJcIiwgY2FsbGJhY2ssIHJldCk7XG4gICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG4gICAgICAgICAgd2luZG93W1wiY29tX3ZlZXZhX2NsbV9vcmRlckxpbmVzXCJdID0gZnVuY3Rpb24ocmVzdWx0KSB7XG4gICAgICAgICAgICAgIGNvbS52ZWV2YS5jbG0ud3JhcFJlc3VsdChcImdldE9yZGVyTGluZXNfT3JkZXJcIiwgY2FsbGJhY2ssIHJlc3VsdCk7XG4gICAgICAgICAgfTtcblxuXG4gICAgICAgICAgcXVlcnkgPSBcInZlZXZhOnF1ZXJ5T2JqZWN0KE9yZGVyX0xpbmVfdm9kX19jKSxmaWVsZHMoSUQpLHdoZXJlKFdIRVJFIE9yZGVyX3ZvZF9fYz1cXFwiXCIgKyBvcmRlciArIFwiXFxcIiksY29tX3ZlZXZhX2NsbV9vcmRlckxpbmVzKHJlc3VsdClcIjtcbiAgICAgICAgICBpZighY29tLnZlZXZhLmNsbS50ZXN0TW9kZSlcbiAgICAgICAgICAgICAgY29tLnZlZXZhLmNsbS5ydW5BUElSZXF1ZXN0KHF1ZXJ5KTtcbiAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgIGNvbV92ZWV2YV9jbG1fb3JkZXJMaW5lcyhjb20udmVldmEuY2xtLnRlc3RSZXN1bHQuY29tbW9uKTtcbiAgICAgIH0sXG5cbiAgICAgIC8vIDZcbiAgICAgIC8vIERFUFJFQ0FURUQgLSBQbGVhc2UgdXNlIGdldExpc3RQcmljZV9Qcm9kdWN0X0FjY291bnRcbiAgICAgIC8vIFJldHVybnMgYW4gYXJyYXkgb2YgcmVjb3JkIElEcyBmb3IgdGhlIGN1cnJlbnRseSB2YWxpZCBMaXN0IFByaWNlIChQcmljaW5nX1J1bGVfdm9kX19jKSBmb3IgYSBzcGVjaWZpYyBwcm9kdWN0IChQcm9kdWN0X3ZvZF9fYylcbiAgICAgIC8vICAgICAgICAgIFZhbGlkIGxpc3QgcHJpY2UgPSBQcmljaW5nIFJ1bGUgKFByaWNpbmdfUnVsZV92b2RfX2MpIG9mIHJlY29yZCB0eXBlIExpc3QgUHJpY2UgKExpc3RfUHJpY2VfUnVsZV92b2QpIHdoZXJlIGN1cnJlbnQgZGF0ZSBpc1xuICAgICAgLy8gICAgICAgICAgYmV0d2VlbiBTdGFydCBEYXRlIChTdGFydF9EYXRlX3ZvZF9fYykgYW5kIEVuZCBEYXRlIChFbmRfRGF0ZV92b2RfX2MpXG4gICAgICAvLyBwcm9kdWN0IC0gc3BlY2lmaWVzIHRoZSByZWNvcmQgSUQgb2YgdGhlIHByb2R1Y3Qgb2Ygd2hpY2ggdG8gZ2V0IHRoZSBMaXN0IFByaWNlIGZvclxuICAgICAgLy8gY2FsbGJhY2sgLSBjYWxsIGJhY2sgZnVuY3Rpb24gd2hpY2ggd2lsbCBiZSB1c2VkIHRvIHJldHVybiB0aGUgaW5mb3JtYXRpb25cbiAgICAgIGdldExpc3RQcmljZV9Qcm9kdWN0OiBmdW5jdGlvbihwcm9kdWN0LCBjYWxsYmFjaykge1xuICAgICAgICAgIHJldCA9IHRoaXMuY2hlY2tDYWxsYmFja0Z1bmN0aW9uKGNhbGxiYWNrKTtcbiAgICAgICAgICBpZihyZXQuc3VjY2VzcyA9PSBmYWxzZSlcbiAgICAgICAgICAgICAgcmV0dXJuIHJldDtcblxuICAgICAgICAgIC8vIGNoZWNrIGFyZ3VtZW50c1xuICAgICAgICAgIHJldCA9IHRoaXMuY2hlY2tBcmd1bWVudChcInByb2R1Y3RcIiwgcHJvZHVjdCk7XG4gICAgICAgICAgaWYocmV0LnN1Y2Nlc3MgPT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgY29tLnZlZXZhLmNsbS53cmFwUmVzdWx0KFwiZ2V0TGlzdFByaWNlX1Byb2R1Y3RcIiwgY2FsbGJhY2ssIHJldCk7XG4gICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG5cblxuICAgICAgICAgIHdpbmRvd1tcImNvbV92ZWV2YV9jbG1fcHJvZHVjdFByaWNpbmdSdWxlc1wiXSA9IGZ1bmN0aW9uKHJlc3VsdCkge1xuICAgICAgICAgICAgICBjb20udmVldmEuY2xtLndyYXBSZXN1bHQoXCJnZXRMaXN0UHJpY2VfUHJvZHVjdFwiLCBjYWxsYmFjaywgcmVzdWx0KTtcbiAgICAgICAgICB9O1xuXG4gICAgICAgICAgLy8gMlxuICAgICAgICAgIHdpbmRvd1tcImNvbV92ZWV2YV9jbG1fbGlzdFByaWNlVHlwZUlkX2dldExpc3RQcmljZV9Qcm9kdWN0XCJdID0gZnVuY3Rpb24ocmVzdWx0KSB7XG4gICAgICAgICAgICAgIHJlc3VsdCA9IGNvbS52ZWV2YS5jbG0uZm9ybWF0UmVzdWx0KHJlc3VsdCk7XG4gICAgICAgICAgICAgIGlmKHJlc3VsdC5zdWNjZXNzICYmIHJlc3VsdC5SZWNvcmRUeXBlICYmIHJlc3VsdC5SZWNvcmRUeXBlLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgIGxpc3RQcmljZVJlY29yZFR5cGVJZCA9IHJlc3VsdC5SZWNvcmRUeXBlWzBdLklEO1xuXG4gICAgICAgICAgICAgICAgICAvLyAyLjEsIGZldGNoIHByaWNpbmcgcnVsZXMgZm9yIHRoZSBwcm9kdWN0XG5cbiAgICAgICAgICAgICAgICAgIGRhdGVTdHJpbmcgPSBjb20udmVldmEuY2xtLmdldEN1cnJlbnREYXRlKCk7XG4gICAgICAgICAgICAgICAgICBxdWVyeSA9IFwidmVldmE6cXVlcnlPYmplY3QoUHJpY2luZ19SdWxlX3ZvZF9fYyksZmllbGRzKElEKSx3aGVyZShXSEVSRSBSZWNvcmRUeXBlSWQ9XFxcIlwiICsgbGlzdFByaWNlUmVjb3JkVHlwZUlkICsgXCJcXFwiIEFORCBQcm9kdWN0X3ZvZF9fYyA9IFxcXCJcIiArIHByb2R1Y3QgKyBcIlxcXCJcIlxuICAgICAgICAgICAgICAgICAgKyBcIiBBTkQgU3RhcnRfRGF0ZV92b2RfX2MgPD0gXFxcIlwiICsgZGF0ZVN0cmluZyArIFwiXFxcIiBBTkQgRW5kX0RhdGVfdm9kX19jID49IFxcXCJcIiArIGRhdGVTdHJpbmcgKyBcIlxcXCIpLCBjb21fdmVldmFfY2xtX3Byb2R1Y3RQcmljaW5nUnVsZXMocmVzdWx0KVwiO1xuICAgICAgICAgICAgICAgICAgaWYoIWNvbS52ZWV2YS5jbG0udGVzdE1vZGUpXG4gICAgICAgICAgICAgICAgICAgICAgY29tLnZlZXZhLmNsbS5ydW5BUElSZXF1ZXN0KHF1ZXJ5KTtcbiAgICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgICBjb21fdmVldmFfY2xtX3Byb2R1Y3RQcmljaW5nUnVsZXMoY29tLnZlZXZhLmNsbS50ZXN0UmVzdWx0Lmxpc3RQcmljZXMpO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgY29tLnZlZXZhLmNsbS53cmFwUmVzdWx0KFwiZ2V0TGlzdFByaWNlX1Byb2R1Y3RcIiwgY2FsbGJhY2ssIHJlc3VsdCk7XG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgIH07XG5cbiAgICAgICAgICAvLyAxLCBmZXRjaCBsaXN0IHByaWNlIHJlY29yZCB0eXBlIGZpcnN0XG4gICAgICAgICAgcmVjb3JkVHlwZVF1ZXJ5ID0gXCJ2ZWV2YTpxdWVyeU9iamVjdChSZWNvcmRUeXBlKSxmaWVsZHMoSUQpLHdoZXJlKFdIRVJFIFNvYmplY3RUeXBlPVxcXCJQcmljaW5nX1J1bGVfdm9kX19jXFxcIiBBTkQgTmFtZV92b2RfX2M9XFxcIkxpc3RfUHJpY2VfUnVsZV92b2RcXFwiKSxjb21fdmVldmFfY2xtX2xpc3RQcmljZVR5cGVJZF9nZXRMaXN0UHJpY2VfUHJvZHVjdChyZXN1bHQpXCI7XG4gICAgICAgICAgaWYoIWNvbS52ZWV2YS5jbG0udGVzdE1vZGUpXG4gICAgICAgICAgICAgIGNvbS52ZWV2YS5jbG0ucnVuQVBJUmVxdWVzdChyZWNvcmRUeXBlUXVlcnkpO1xuICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgY29tX3ZlZXZhX2NsbV9saXN0UHJpY2VUeXBlSWRfZ2V0TGlzdFByaWNlX1Byb2R1Y3QodGVzdFJlc3VsdC5saXN0UHJpY2VSZWNvcmRUeXBlKTtcblxuICAgICAgfSxcblxuICAgICAgLy8gN1xuICAgICAgLy8gUmVxdWlyZXMgdGhhdCBhbiBBY2NvdW50IGJlIHNwZWNpZmllZCBpbiBvcmRlciBmb3IgYW55IHJlc3VsdCB0byBiZSByZXR1cm5lZC5cbiAgICAgIC8vIFJldHVybnMgdGhlIHJlY29yZCBJRCBmb3IgdGhlIGN1cnJlbnRseSB2YWxpZCBMaXN0IFByaWNlIChQcmljaW5nX1J1bGVfdm9kX19jKSBmb3IgYSBzcGVjaWZpYyBwcm9kdWN0IChQcm9kdWN0X3ZvZF9fYykgYW5kIEFjY291bnQgY29tYmluYXRpb24uIFJlc3BlY3RzIHRoZSBBY2NvdW50IGFuZCBBY2NvdW50IEdyb3VwIExpc3QgUHJpY2UgaGllcmFyY2h5LlxuICAgICAgLy8gVmFsaWQgbGlzdCBwcmljZSA9IFByaWNpbmcgUnVsZSAoUHJpY2luZ19SdWxlX3ZvZF9fYykgb2YgcmVjb3JkIHR5cGUgTGlzdCBQcmljZSAoTGlzdF9QcmljZV9SdWxlX3ZvZCkgd2hlcmUgY3VycmVudCBkYXRlIGlzIGJldHdlZW4gU3RhcnQgRGF0ZSAoU3RhcnRfRGF0ZV92b2RfX2MpIGFuZCBFbmQgRGF0ZSAoRW5kX0RhdGVfdm9kX19jKVxuICAgICAgLy8gcHJvZHVjdCAtIHNwZWNpZmllcyB0aGUgcmVjb3JkIElEIG9mIHRoZSBwcm9kdWN0IG9mIHdoaWNoIHRvIGdldCB0aGUgUHJpY2luZyBSdWxlIGZvclxuICAgICAgLy8gYWNjb3VudCAtIHNwZWNpZmllcyB0aGUgQWNjb3VudCBmb3Igd2hpY2ggdG8gc2VsZWN0IExpc3QgUHJpY2VzIGZvclxuICAgICAgLy8gY2FsbGJhY2sgLSBjYWxsIGJhY2sgZnVuY3Rpb24gd2hpY2ggd2lsbCBiZSB1c2VkIHRvIHJldHVybiB0aGUgaW5mb3JtYXRpb25cbiAgICAgIGdldExpc3RQcmljZV9Qcm9kdWN0X0FjY291bnQ6IGZ1bmN0aW9uKHByb2R1Y3QsIGFjY291bnQsIGNhbGxiYWNrKSB7XG4gICAgICAgICAgcmV0ID0gdGhpcy5jaGVja0NhbGxiYWNrRnVuY3Rpb24oY2FsbGJhY2spO1xuICAgICAgICAgIGlmKHJldC5zdWNjZXNzID09IGZhbHNlKVxuICAgICAgICAgICAgICByZXR1cm4gcmV0O1xuXG4gICAgICAgICAgLy8gY2hlY2sgYXJndW1lbnRzXG4gICAgICAgICAgcmV0ID0gdGhpcy5jaGVja0FyZ3VtZW50KFwicHJvZHVjdFwiLCBwcm9kdWN0KTtcbiAgICAgICAgICBpZihyZXQuc3VjY2VzcyA9PSBmYWxzZSkge1xuICAgICAgICAgICAgICBjb20udmVldmEuY2xtLndyYXBSZXN1bHQoXCJnZXRMaXN0UHJpY2VfUHJvZHVjdF9BY2NvdW50XCIsIGNhbGxiYWNrLCByZXQpO1xuICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldCA9IHRoaXMuY2hlY2tBcmd1bWVudChcImFjY291bnRcIiwgYWNjb3VudCk7XG4gICAgICAgICAgaWYocmV0LnN1Y2Nlc3MgPT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgY29tLnZlZXZhLmNsbS53cmFwUmVzdWx0KFwiZ2V0TGlzdFByaWNlX1Byb2R1Y3RfQWNjb3VudFwiLCBjYWxsYmFjaywgcmV0KTtcbiAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHdpbmRvd1tcImNvbV92ZWV2YV9jbG1fcHJvZHVjdERlZmF1bHRQcmljaW5nUnVsZXNcIl0gPSBmdW5jdGlvbihyZXN1bHQpIHtcbiAgICAgICAgICAgICAgY29tLnZlZXZhLmNsbS53cmFwUmVzdWx0KFwiZ2V0TGlzdFByaWNlX1Byb2R1Y3RfQWNjb3VudFwiLCBjYWxsYmFjaywgcmVzdWx0KTtcbiAgICAgICAgICB9O1xuXG4gICAgICAgICAgd2luZG93W1wiY29tX3ZlZXZhX2NsbV9nZXRfcHJvZHVjdERlZmF1bHRQcmljaW5nUnVsZXNcIl0gPSBmdW5jdGlvbigpIHtcblxuICAgICAgICAgICAgICBkYXRlU3RyaW5nID0gY29tLnZlZXZhLmNsbS5nZXRDdXJyZW50RGF0ZSgpO1xuICAgICAgICAgICAgICBncm91cFF1ZXJ5ID0gXCJ2ZWV2YTpxdWVyeU9iamVjdChQcmljaW5nX1J1bGVfdm9kX19jKSxmaWVsZHMoSUQpLHdoZXJlKFdIRVJFIFJlY29yZFR5cGVJZD1cXFwiXCIgKyBsaXN0UHJpY2VSZWNvcmRUeXBlSWQgKyBcIlxcXCIgQU5EIFByb2R1Y3Rfdm9kX19jID0gXFxcIlwiICsgcHJvZHVjdCArIFwiXFxcIlwiXG4gICAgICAgICAgICAgICsgXCIgQU5EIEFjY291bnRfR3JvdXBfdm9kX19jPVxcXCJcXFwiIEFORCBBY2NvdW50X3ZvZF9fYz1cXFwiXFxcIlwiXG4gICAgICAgICAgICAgICsgXCIgQU5EIFN0YXJ0X0RhdGVfdm9kX19jIDw9IFxcXCJcIiArIGRhdGVTdHJpbmcgKyBcIlxcXCIgQU5EIEVuZF9EYXRlX3ZvZF9fYyA+PSBcXFwiXCIgKyBkYXRlU3RyaW5nICsgXCJcXFwiKSwgY29tX3ZlZXZhX2NsbV9wcm9kdWN0RGVmYXVsdFByaWNpbmdSdWxlcyhyZXN1bHQpXCI7XG4gICAgICAgICAgICAgIGlmKCFjb20udmVldmEuY2xtLnRlc3RNb2RlKVxuICAgICAgICAgICAgICAgICAgY29tLnZlZXZhLmNsbS5ydW5BUElSZXF1ZXN0KGdyb3VwUXVlcnkpO1xuICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgIC8vIFRPRE9cbiAgICAgICAgICAgICAgICAgIGNvbV92ZWV2YV9jbG1fcHJvZHVjdERlZmF1bHRQcmljaW5nUnVsZXMoY29tLnZlZXZhLmNsbS50ZXN0UmVzdWx0Lmxpc3RQcmljZXMpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgfTtcblxuICAgICAgICAgIHdpbmRvd1tcImNvbV92ZWV2YV9jbG1fcHJvZHVjdEFjY291bnRHcm91cFByaWNpbmdSdWxlc1wiXSA9IGZ1bmN0aW9uKHJlc3VsdCkge1xuICAgICAgICAgICAgICByZXN1bHQgPSBjb20udmVldmEuY2xtLmZvcm1hdFJlc3VsdChyZXN1bHQpO1xuICAgICAgICAgICAgICBpZihyZXN1bHQuc3VjY2VzcyAmJiByZXN1bHQuUHJpY2luZ19SdWxlX3ZvZF9fYy5sZW5ndGggPT0gMCkge1xuICAgICAgICAgICAgICAgICAgLy8gdHJ5IGFjY291bnQgZ3JvdXBcbiAgICAgICAgICAgICAgICAgIGNvbV92ZWV2YV9jbG1fZ2V0X3Byb2R1Y3REZWZhdWx0UHJpY2luZ1J1bGVzKCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgY29tLnZlZXZhLmNsbS53cmFwUmVzdWx0KFwiZ2V0TGlzdFByaWNlX1Byb2R1Y3RfQWNjb3VudFwiLCBjYWxsYmFjaywgcmVzdWx0KTtcbiAgICAgICAgICB9O1xuXG4gICAgICAgICAgLy8gNCBwcmljaW5nIHJ1bGUgZm9yIGFjY291bnQgZ3JvdXBcbiAgICAgICAgICB3aW5kb3dbJ2NvbV92ZWV2YV9jbG1fYWNjb3VudEdyb3VwJ10gPSBmdW5jdGlvbihyZXN1bHQpIHtcbiAgICAgICAgICAgICAgcmVzdWx0ID0gY29tLnZlZXZhLmNsbS5mb3JtYXRSZXN1bHQocmVzdWx0KTtcbiAgICAgICAgICAgICAgaWYocmVzdWx0LnN1Y2Nlc3MpIHtcbiAgICAgICAgICAgICAgICAgIGFjY291bnRHcm91cCA9IHJlc3VsdC5BY2NvdW50LkFjY291bnRfR3JvdXBfdm9kX19jO1xuICAgICAgICAgICAgICAgICAgaWYoYWNjb3VudEdyb3VwICE9IHVuZGVmaW5lZCAmJiBhY2NvdW50R3JvdXAgIT0gXCJcIikge1xuICAgICAgICAgICAgICAgICAgICAgIGRhdGVTdHJpbmcgPSBjb20udmVldmEuY2xtLmdldEN1cnJlbnREYXRlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgZ3JvdXBRdWVyeSA9IFwidmVldmE6cXVlcnlPYmplY3QoUHJpY2luZ19SdWxlX3ZvZF9fYyksZmllbGRzKElEKSx3aGVyZShXSEVSRSBSZWNvcmRUeXBlSWQ9XFxcIlwiICsgbGlzdFByaWNlUmVjb3JkVHlwZUlkICsgXCJcXFwiIEFORCBQcm9kdWN0X3ZvZF9fYyA9IFxcXCJcIiArIHByb2R1Y3QgKyBcIlxcXCJcIlxuICAgICAgICAgICAgICAgICAgICAgICsgXCIgQU5EIEFjY291bnRfR3JvdXBfdm9kX19jPVxcXCJcIiArIGFjY291bnRHcm91cCArIFwiXFxcIlwiXG4gICAgICAgICAgICAgICAgICAgICAgKyBcIiBBTkQgU3RhcnRfRGF0ZV92b2RfX2MgPD0gXFxcIlwiICsgZGF0ZVN0cmluZyArIFwiXFxcIiBBTkQgRW5kX0RhdGVfdm9kX19jID49IFxcXCJcIiArIGRhdGVTdHJpbmcgKyBcIlxcXCIpLCBjb21fdmVldmFfY2xtX3Byb2R1Y3RBY2NvdW50R3JvdXBQcmljaW5nUnVsZXMocmVzdWx0KVwiO1xuICAgICAgICAgICAgICAgICAgICAgIGlmKCFjb20udmVldmEuY2xtLnRlc3RNb2RlKVxuICAgICAgICAgICAgICAgICAgICAgICAgICBjb20udmVldmEuY2xtLnJ1bkFQSVJlcXVlc3QoZ3JvdXBRdWVyeSk7XG4gICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFRPRE9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgY29tX3ZlZXZhX2NsbV9wcm9kdWN0QWNjb3VudEdyb3VwUHJpY2luZ1J1bGVzKGNvbS52ZWV2YS5jbG0udGVzdFJlc3VsdC5saXN0UHJpY2VzKTtcbiAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgIGNvbV92ZWV2YV9jbG1fZ2V0X3Byb2R1Y3REZWZhdWx0UHJpY2luZ1J1bGVzKCk7XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICBjb20udmVldmEuY2xtLndyYXBSZXN1bHQoXCJnZXRMaXN0UHJpY2VfUHJvZHVjdF9BY2NvdW50XCIsIGNhbGxiYWNrLCByZXN1bHQpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgfTtcblxuICAgICAgICAgIC8vIDMgYWNjb3VudCBncm91cFxuICAgICAgICAgIHdpbmRvd1tcImNvbV92ZWV2YV9jbG1fcHJvZHVjdEFjY291bnRQcmljaW5nUnVsZXNcIl0gPSBmdW5jdGlvbihyZXN1bHQpIHtcbiAgICAgICAgICAgICAgcmVzdWx0ID0gY29tLnZlZXZhLmNsbS5mb3JtYXRSZXN1bHQocmVzdWx0KTtcbiAgICAgICAgICAgICAgaWYocmVzdWx0LnN1Y2Nlc3MgJiYgcmVzdWx0LlByaWNpbmdfUnVsZV92b2RfX2MubGVuZ3RoID09IDApIHtcbiAgICAgICAgICAgICAgICAgIC8vIHRyeSBhY2NvdW50IGdyb3VwXG4gICAgICAgICAgICAgICAgICBjb20udmVldmEuY2xtLmdldERhdGFGb3JPYmplY3QoXCJBY2NvdW50XCIsIGFjY291bnQsIFwiQWNjb3VudF9Hcm91cF92b2RfX2NcIiwgY29tX3ZlZXZhX2NsbV9hY2NvdW50R3JvdXApO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgIGNvbS52ZWV2YS5jbG0ud3JhcFJlc3VsdChcImdldExpc3RQcmljZV9Qcm9kdWN0X0FjY291bnRcIiwgY2FsbGJhY2ssIHJlc3VsdCk7XG4gICAgICAgICAgfTtcblxuICAgICAgICAgIC8vIDJcbiAgICAgICAgICB3aW5kb3dbXCJjb21fdmVldmFfY2xtX2xpc3RQcmljZVR5cGVJZF9nZXRMaXN0UHJpY2VfUHJvZHVjdF9BY2NvdW50XCJdID0gZnVuY3Rpb24ocmVzdWx0KSB7XG4gICAgICAgICAgICAgIHJlc3VsdCA9IGNvbS52ZWV2YS5jbG0uZm9ybWF0UmVzdWx0KHJlc3VsdCk7XG4gICAgICAgICAgICAgIGlmKHJlc3VsdC5zdWNjZXNzICYmIHJlc3VsdC5SZWNvcmRUeXBlICYmIHJlc3VsdC5SZWNvcmRUeXBlLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgIGxpc3RQcmljZVJlY29yZFR5cGVJZCA9IHJlc3VsdC5SZWNvcmRUeXBlWzBdLklEO1xuXG4gICAgICAgICAgICAgICAgICBkYXRlU3RyaW5nID0gY29tLnZlZXZhLmNsbS5nZXRDdXJyZW50RGF0ZSgpO1xuICAgICAgICAgICAgICAgICAgcXVlcnkgPSBcInZlZXZhOnF1ZXJ5T2JqZWN0KFByaWNpbmdfUnVsZV92b2RfX2MpLGZpZWxkcyhJRCksd2hlcmUoV0hFUkUgUmVjb3JkVHlwZUlkPVxcXCJcIiArIGxpc3RQcmljZVJlY29yZFR5cGVJZCArIFwiXFxcIiBBTkQgUHJvZHVjdF92b2RfX2MgPSBcXFwiXCIgKyBwcm9kdWN0ICsgXCJcXFwiXCJcbiAgICAgICAgICAgICAgICAgICsgXCIgQU5EIEFjY291bnRfdm9kX19jPVxcXCJcIiArIGFjY291bnQgKyBcIlxcXCJcIlxuICAgICAgICAgICAgICAgICAgKyBcIiBBTkQgU3RhcnRfRGF0ZV92b2RfX2MgPD0gXFxcIlwiICsgZGF0ZVN0cmluZyArIFwiXFxcIiBBTkQgRW5kX0RhdGVfdm9kX19jID49IFxcXCJcIiArIGRhdGVTdHJpbmcgKyBcIlxcXCIpLCBjb21fdmVldmFfY2xtX3Byb2R1Y3RBY2NvdW50UHJpY2luZ1J1bGVzKHJlc3VsdClcIjtcblxuICAgICAgICAgICAgICAgICAgaWYoIWNvbS52ZWV2YS5jbG0udGVzdE1vZGUpXG4gICAgICAgICAgICAgICAgICAgICAgY29tLnZlZXZhLmNsbS5ydW5BUElSZXF1ZXN0KHF1ZXJ5KTtcbiAgICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgICBjb21fdmVldmFfY2xtX3Byb2R1Y3RBY2NvdW50UHJpY2luZ1J1bGVzKGNvbS52ZWV2YS5jbG0udGVzdFJlc3VsdC5saXN0UHJpY2VzKTtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgIGNvbS52ZWV2YS5jbG0ud3JhcFJlc3VsdChcImdldExpc3RQcmljZV9Qcm9kdWN0X0FjY291bnRcIiwgY2FsbGJhY2ssIHJlc3VsdCk7XG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgIH07XG5cbiAgICAgICAgICAvLyAxLCBmZXRjaCBsaXN0IHByaWNlIHJlY29yZCB0eXBlIGZpcnN0XG4gICAgICAgICAgcmVjb3JkVHlwZVF1ZXJ5ID0gXCJ2ZWV2YTpxdWVyeU9iamVjdChSZWNvcmRUeXBlKSxmaWVsZHMoSUQpLHdoZXJlKFdIRVJFIFNvYmplY3RUeXBlPVxcXCJQcmljaW5nX1J1bGVfdm9kX19jXFxcIiBBTkQgTmFtZV92b2RfX2M9XFxcIkxpc3RfUHJpY2VfUnVsZV92b2RcXFwiKSxjb21fdmVldmFfY2xtX2xpc3RQcmljZVR5cGVJZF9nZXRMaXN0UHJpY2VfUHJvZHVjdF9BY2NvdW50KHJlc3VsdClcIjtcbiAgICAgICAgICBpZighY29tLnZlZXZhLmNsbS50ZXN0TW9kZSlcbiAgICAgICAgICAgICAgY29tLnZlZXZhLmNsbS5ydW5BUElSZXF1ZXN0KHJlY29yZFR5cGVRdWVyeSk7XG4gICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICBjb21fdmVldmFfY2xtX2xpc3RQcmljZVR5cGVJZF9nZXRMaXN0UHJpY2VfUHJvZHVjdF9BY2NvdW50KHRlc3RSZXN1bHQubGlzdFByaWNlUmVjb3JkVHlwZSk7XG5cbiAgICAgIH0sXG5cbiAgICAgIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vIEFwcHJvdmVkIEVtYWlsIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cbiAgICAgIC8vIFJldHVybnMgdGhlIHJlY29yZCBJRChzKSBmb3IgdGhlIEFwcHJvdmVkIERvY3VtZW50IHdoaWNoIG1hdGNoZXMgdGhlIHZhbHVlcyBzcGVjaWZpZWQgYW5kIFN0YXR1c192b2QgPSBBcHByb3ZlZFxuICAgICAgLy8gR2V0cyB0aGUgYXBwcm92ZWQgZG9jdW1lbnQgYnkgcXVlcnlpbmcgYWxsIHByb2R1Y3RzIG9mIHR5cGUgRGV0YWlsIFRvcGljIG9yIERldGFpbCBhbmQgY29tcGFyZXMgYWdhaW5zdFxuICAgICAgLy8gdGhlIHF1ZXJ5IG9mIGFueSBhcHByb3ZlZCBkb2N1bWVudHMgd2l0aCB0aGUgcGFzc2VkIGluIHZhdWx0X2lkIGFuZFxuICAgICAgLy8gZG9jdW1lbnRfbnVtLiBJZiB0aGVyZSBhcmUgbXVsdGlwbGUgZG9jdW1lbnRzIHdpdGggdGhlc2Ugc2FtZSBpZHMsIGFuIGVycm9yIGlzIHRocm93bi5cbiAgICAgIC8vIHZhdWx0X2lkIC0gc3BlY2lmaWVzIHRoZSBWYXVsdCBJRCBvZiB0aGUgQXBwcm92ZWQgRG9jdW1lbnQgdG8gcmV0cmlldmUuIChWYXVsdF9JbnN0YW5jZV9JRF92b2Qgb24gQXBwcm92ZWRfRG9jdW1lbnRfdm9kKVxuICAgICAgLy8gZG9jdW1lbnRfbnVtIC0gc3BlY2lmaWVzIHRoZSBkb2N1bWVudCBudW1iZXIgb2YgdGhlIEFwcHJvdmVkIERvY3VtZW50IHRvIHJldHJpZXZlLiAoVmF1bHRfRG9jdW1lbnRfSURfdm9kIG9uIEFwcHJvdmVkX0RvY3VtZW50X3ZvZClcbiAgICAgIC8vIGNhbGxiYWNrIC0gY2FsbCBiYWNrIGZ1bmN0aW9uIHdoaWNoIHdpbGwgYmUgdXNlZCB0byByZXR1cm4gdGhlIGluZm9ybWF0aW9uXG4gICAgICBnZXRBcHByb3ZlZERvY3VtZW50OiBmdW5jdGlvbih2YXVsdF9pZCwgZG9jdW1lbnRfbnVtLCBjYWxsYmFjaykge1xuICAgICAgICAgIHZhciB0b3BpY1Byb2R1Y3RzO1xuICAgICAgICAgIHZhciBkZXRhaWxQcm9kdWN0cztcbiAgICAgICAgICB2YXIgZGV0YWlsR3JvdXBQcm9kdWN0cztcbiAgICAgICAgICB2YXIgcHJvZHVjdEdyb3VwcztcblxuICAgICAgICAgIC8vIGNoZWNrIGNhbGxiYWNrIHBhcmFtZXRlclxuICAgICAgICAgIHJldCA9IHRoaXMuY2hlY2tDYWxsYmFja0Z1bmN0aW9uKGNhbGxiYWNrKTtcbiAgICAgICAgICBpZihyZXQuc3VjY2VzcyA9PSBmYWxzZSlcbiAgICAgICAgICAgICAgcmV0dXJuIHJldDtcblxuICAgICAgICAgIC8vIGNoZWNrIGFyZ3VtZW50c1xuICAgICAgICAgIHJldCA9IHRoaXMuY2hlY2tBcmd1bWVudChcInZhdWx0X2lkXCIsIHZhdWx0X2lkKTtcbiAgICAgICAgICBpZihyZXQuc3VjY2VzcyA9PSBmYWxzZSkge1xuICAgICAgICAgICAgICBjb20udmVldmEuY2xtLndyYXBSZXN1bHQoXCJnZXRBcHByb3ZlZERvY3VtZW50XCIsIGNhbGxiYWNrLCByZXQpO1xuICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcmV0ID0gdGhpcy5jaGVja0FyZ3VtZW50KFwiZG9jdW1lbnRfbnVtXCIsIGRvY3VtZW50X251bSk7XG4gICAgICAgICAgaWYocmV0LnN1Y2Nlc3MgPT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgY29tLnZlZXZhLmNsbS53cmFwUmVzdWx0KFwiZ2V0QXBwcm92ZWREb2N1bWVudFwiLCBjYWxsYmFjaywgcmV0KTtcbiAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIC8vIDJiIENoZWNrIHJlc3VsdHMgb2YgQXBwcm92ZWQgRG9jdW1lbnQgcXVlcnkgYWdhaW5zdCBNeSBTZXR1cCByZXN1bHRzXG4gICAgICAgICAgd2luZG93W1wiY29tX3ZlZXZhX2NsbV9Eb2N1bWVudFR5cGVJZF9nZXREb2N1bWVudFwiXSA9IGZ1bmN0aW9uKHJlc3VsdCkge1xuICAgICAgICAgICAgICByZXN1bHQgPSBjb20udmVldmEuY2xtLmZvcm1hdFJlc3VsdChyZXN1bHQpO1xuXG4gICAgICAgICAgICAgIGlmKHJlc3VsdC5zdWNjZXNzICYmIHJlc3VsdC5BcHByb3ZlZF9Eb2N1bWVudF92b2RfX2MgJiYgcmVzdWx0LkFwcHJvdmVkX0RvY3VtZW50X3ZvZF9fYy5sZW5ndGggPT0gMSkge1xuICAgICAgICAgICAgICAgICAgdmFyIHByb2R1Y3RzV2l0aERldGFpbEdyb3VwcztcblxuICAgICAgICAgICAgICAgICAgLy9JZiB3ZSBoYXZlIGFjY2VzcyB0byBkZXRhaWwgZ3JvdXBzLCBhbGlnbiBwcm9kdWN0cyB3aXRoIGRldGFpbCBncm91cHNcbiAgICAgICAgICAgICAgICAgIGlmKGRldGFpbEdyb3VwUHJvZHVjdHMgIT0gdW5kZWZpbmVkICYmIHByb2R1Y3RHcm91cHMgIT0gdW5kZWZpbmVkICYmIHByb2R1Y3RHcm91cHMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICAgIHByb2R1Y3RzV2l0aERldGFpbEdyb3VwcyA9IFtdO1xuICAgICAgICAgICAgICAgICAgICAgIHZhciBncm91cENvdW50ID0gMDtcbiAgICAgICAgICAgICAgICAgICAgICBmb3IodmFyIGkgPSAwOyBpIDwgZGV0YWlsR3JvdXBQcm9kdWN0cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IodmFyIGogPSAwOyBqIDwgcHJvZHVjdEdyb3Vwcy5sZW5ndGg7IGorKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9JZiB0aGUgZGV0YWlsIGdyb3VwIHByb2R1Y3QgSUQgbWF0Y2hlcyB0aGUgcHJvZHVjdCBncm91cCdzIFByb2R1Y3QgQ2F0YWxvZyBJRFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9BTkQgaXQgaXMgdGhlIHByb2R1Y3Qgd2UgYXJlIGxvb2tpbmcgZm9yLCBhZGQgaXRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKGRldGFpbEdyb3VwUHJvZHVjdHNbaV0uSUQgIT0gdW5kZWZpbmVkXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJiYgcHJvZHVjdEdyb3Vwc1tqXS5Qcm9kdWN0X0NhdGFsb2dfdm9kX19jICE9IHVuZGVmaW5lZFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICYmIHByb2R1Y3RHcm91cHNbal0uUHJvZHVjdF92b2RfX2MgIT0gdW5kZWZpbmVkXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJiYgZGV0YWlsR3JvdXBQcm9kdWN0c1tpXS5JRCA9PSBwcm9kdWN0R3JvdXBzW2pdLlByb2R1Y3RfQ2F0YWxvZ192b2RfX2NcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAmJiByZXN1bHQuQXBwcm92ZWRfRG9jdW1lbnRfdm9kX19jWzBdLlByb2R1Y3Rfdm9kX19jID09IHByb2R1Y3RHcm91cHNbal0uUHJvZHVjdF92b2RfX2MpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9kdWN0c1dpdGhEZXRhaWxHcm91cHNbZ3JvdXBDb3VudF0gPSB7fTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9kdWN0c1dpdGhEZXRhaWxHcm91cHNbZ3JvdXBDb3VudF0uSUQgPSB7fTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9kdWN0c1dpdGhEZXRhaWxHcm91cHNbZ3JvdXBDb3VudF0uRGV0YWlsX0dyb3VwX3ZvZF9fYyA9IHt9O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb2R1Y3RzV2l0aERldGFpbEdyb3Vwc1tncm91cENvdW50XS5JRCA9IHByb2R1Y3RHcm91cHNbal0uUHJvZHVjdF92b2RfX2M7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvZHVjdHNXaXRoRGV0YWlsR3JvdXBzW2dyb3VwQ291bnRdLkRldGFpbF9Hcm91cF92b2RfX2MgPSBkZXRhaWxHcm91cFByb2R1Y3RzW2ldLklEO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdyb3VwQ291bnQrKztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgaWYodG9waWNQcm9kdWN0cyAmJiB0b3BpY1Byb2R1Y3RzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAvL0NoZWNrIGFnYWluc3QgdGhlIGRldGFpbCB0b3BpY3MgZm9yIGEgdmFsaWQgcHJvZHVjdCBtYXRjaFxuICAgICAgICAgICAgICAgICAgICAgIGZvcih2YXIgaiA9IDA7IGogPCB0b3BpY1Byb2R1Y3RzLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGlmKHJlc3VsdC5BcHByb3ZlZF9Eb2N1bWVudF92b2RfX2NbMF0uUHJvZHVjdF92b2RfX2MgPT09IHRvcGljUHJvZHVjdHNbal0uSUQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vSWYgd2UgaGF2ZSBwcm9kdWN0IGdyb3VwcyB0aGF0IG1hdGNoIG91ciBjdXJyZW50IHByb2R1Y3QsIHJ1biB0aHJvdWdoIHRoZW1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vT3RoZXJ3aXNlLCB3ZSBqdXN0IGhhdmUgYSBwcm9kdWN0IHcvbyBkZXRhaWwgZ3JvdXBzLCBzbyByZXR1cm4gdGhlIGRvY3VtZW50XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihwcm9kdWN0c1dpdGhEZXRhaWxHcm91cHMgIT0gdW5kZWZpbmVkICYmIHByb2R1Y3RzV2l0aERldGFpbEdyb3Vwcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yKHZhciBpID0gMDsgaSA8IHByb2R1Y3RzV2l0aERldGFpbEdyb3Vwcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihyZXN1bHQuQXBwcm92ZWRfRG9jdW1lbnRfdm9kX19jWzBdLkRldGFpbF9Hcm91cF92b2RfX2MgIT0gdW5kZWZpbmVkXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAmJiByZXN1bHQuQXBwcm92ZWRfRG9jdW1lbnRfdm9kX19jWzBdLlByb2R1Y3Rfdm9kX19jID09IHByb2R1Y3RzV2l0aERldGFpbEdyb3Vwc1tpXS5JRFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJiYgcmVzdWx0LkFwcHJvdmVkX0RvY3VtZW50X3ZvZF9fY1swXS5EZXRhaWxfR3JvdXBfdm9kX19jID09IHByb2R1Y3RzV2l0aERldGFpbEdyb3Vwc1tpXS5EZXRhaWxfR3JvdXBfdm9kX19jKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgcmV0ID0ge307XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXQuQXBwcm92ZWRfRG9jdW1lbnRfdm9kX19jID0ge307XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXQuQXBwcm92ZWRfRG9jdW1lbnRfdm9kX19jLklEID0gcmVzdWx0LkFwcHJvdmVkX0RvY3VtZW50X3ZvZF9fY1swXS5JRDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldC5zdWNjZXNzID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbS52ZWV2YS5jbG0ud3JhcFJlc3VsdChcImdldEFwcHJvdmVkRG9jdW1lbnRcIiwgY2FsbGJhY2ssIHJldCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgcmV0ID0ge307XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0LkFwcHJvdmVkX0RvY3VtZW50X3ZvZF9fYyA9IHt9O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldC5BcHByb3ZlZF9Eb2N1bWVudF92b2RfX2MuSUQgPSByZXN1bHQuQXBwcm92ZWRfRG9jdW1lbnRfdm9kX19jWzBdLklEO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldC5zdWNjZXNzID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb20udmVldmEuY2xtLndyYXBSZXN1bHQoXCJnZXRBcHByb3ZlZERvY3VtZW50XCIsIGNhbGxiYWNrLCByZXQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIGlmKGRldGFpbFByb2R1Y3RzICYmIGRldGFpbFByb2R1Y3RzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAvL0NoZWNrIGFnYWluc3QgdGhlIGRldGFpbHMgZm9yIGEgdmFsaWQgcHJvZHVjdCBtYXRjaFxuICAgICAgICAgICAgICAgICAgICAgIGZvcih2YXIgayA9IDA7IGsgPCBkZXRhaWxQcm9kdWN0cy5sZW5ndGg7IGsrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICBpZihyZXN1bHQuQXBwcm92ZWRfRG9jdW1lbnRfdm9kX19jWzBdLlByb2R1Y3Rfdm9kX19jID09PSBkZXRhaWxQcm9kdWN0c1trXS5JRCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9JZiB3ZSBoYXZlIHByb2R1Y3QgZ3JvdXBzIHRoYXQgbWF0Y2ggb3VyIGN1cnJlbnQgcHJvZHVjdCwgcnVuIHRocm91Z2ggdGhlbVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9PdGhlcndpc2UsIHdlIGp1c3QgaGF2ZSBhIHByb2R1Y3Qgdy9vIGRldGFpbCBncm91cHMsIHNvIHJldHVybiB0aGUgZG9jdW1lbnRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKHByb2R1Y3RzV2l0aERldGFpbEdyb3VwcyAhPSB1bmRlZmluZWQgJiYgcHJvZHVjdHNXaXRoRGV0YWlsR3JvdXBzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IodmFyIGkgPSAwOyBpIDwgcHJvZHVjdHNXaXRoRGV0YWlsR3JvdXBzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKHJlc3VsdC5BcHByb3ZlZF9Eb2N1bWVudF92b2RfX2NbMF0uRGV0YWlsX0dyb3VwX3ZvZF9fYyAhPSB1bmRlZmluZWRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICYmIHJlc3VsdC5BcHByb3ZlZF9Eb2N1bWVudF92b2RfX2NbMF0uUHJvZHVjdF92b2RfX2MgPT0gcHJvZHVjdHNXaXRoRGV0YWlsR3JvdXBzW2ldLklEXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAmJiByZXN1bHQuQXBwcm92ZWRfRG9jdW1lbnRfdm9kX19jWzBdLkRldGFpbF9Hcm91cF92b2RfX2MgPT0gcHJvZHVjdHNXaXRoRGV0YWlsR3JvdXBzW2ldLkRldGFpbF9Hcm91cF92b2RfX2MpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciByZXQgPSB7fTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldC5BcHByb3ZlZF9Eb2N1bWVudF92b2RfX2MgPSB7fTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldC5BcHByb3ZlZF9Eb2N1bWVudF92b2RfX2MuSUQgPSByZXN1bHQuQXBwcm92ZWRfRG9jdW1lbnRfdm9kX19jWzBdLklEO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0LnN1Y2Nlc3MgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29tLnZlZXZhLmNsbS53cmFwUmVzdWx0KFwiZ2V0QXBwcm92ZWREb2N1bWVudFwiLCBjYWxsYmFjaywgcmV0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciByZXQgPSB7fTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXQuQXBwcm92ZWRfRG9jdW1lbnRfdm9kX19jID0ge307XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0LkFwcHJvdmVkX0RvY3VtZW50X3ZvZF9fYy5JRCA9IHJlc3VsdC5BcHByb3ZlZF9Eb2N1bWVudF92b2RfX2NbMF0uSUQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0LnN1Y2Nlc3MgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbS52ZWV2YS5jbG0ud3JhcFJlc3VsdChcImdldEFwcHJvdmVkRG9jdW1lbnRcIiwgY2FsbGJhY2ssIHJldCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgLy9Gb3VuZCBubyBtYXRjaCwgcmV0dXJuIGVtcHR5IG9iamVjdFxuICAgICAgICAgICAgICAgICAgdmFyIHJldCA9IHt9O1xuICAgICAgICAgICAgICAgICAgcmV0LnN1Y2Nlc3MgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgY29tLnZlZXZhLmNsbS53cmFwUmVzdWx0KFwiZ2V0QXBwcm92ZWREb2N1bWVudFwiLCBjYWxsYmFjaywgcmV0KTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAvL1F1ZXJ5IHN1Y2Nlc3MsIGJ1dCB3ZSBmb3VuZCBtb3JlIHRoYW4gb25lIGRvYyB3aXRoIHRoZSBzYW1lIHZhdWx0IGlkIGFuZCBkb2MgbnVtLCBzbyByZXR1cm4gZW1wdHlcbiAgICAgICAgICAgICAgZWxzZSBpZihyZXN1bHQuc3VjY2VzcyAmJiByZXN1bHQuQXBwcm92ZWRfRG9jdW1lbnRfdm9kX19jICYmIHJlc3VsdC5BcHByb3ZlZF9Eb2N1bWVudF92b2RfX2MubGVuZ3RoID4gMSkge1xuICAgICAgICAgICAgICAgICAgdmFyIHJldCA9IHt9O1xuICAgICAgICAgICAgICAgICAgcmV0LnN1Y2Nlc3MgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgY29tLnZlZXZhLmNsbS53cmFwUmVzdWx0KFwiZ2V0QXBwcm92ZWREb2N1bWVudFwiLCBjYWxsYmFjaywgcmV0KTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgIGlmKHJlc3VsdC5jb2RlID09IDEwMjEpIHtcbiAgICAgICAgICAgICAgICAgICAgICBpZihyZXN1bHQubWVzc2FnZS5pbmRleE9mKFwiRGV0YWlsX0dyb3VwX3ZvZF9fY1wiKSA+PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGFwcHJvdmVkRG9jdW1lbnRRdWVyeSA9IFwidmVldmE6cXVlcnlPYmplY3QoQXBwcm92ZWRfRG9jdW1lbnRfdm9kX19jKSxmaWVsZHMoSUQsUHJvZHVjdF92b2RfX2MpLHdoZXJlKFdIRVJFIFZhdWx0X0luc3RhbmNlX0lEX3ZvZF9fYz1cXFwiXCIgKyB2YXVsdF9pZFxuICAgICAgICAgICAgICAgICAgICAgICAgICArIFwiXFxcIiBBTkQgVmF1bHRfRG9jdW1lbnRfSURfdm9kX19jPVxcXCJcIiArIGRvY3VtZW50X251bSArIFwiXFxcIiBBTkQgU3RhdHVzX3ZvZF9fYz1cXFwiQXBwcm92ZWRfdm9kXFxcIiksY29tX3ZlZXZhX2NsbV9Eb2N1bWVudFR5cGVJZF9nZXREb2N1bWVudChyZXN1bHQpXCI7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoIWNvbS52ZWV2YS5jbG0udGVzdE1vZGUpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb20udmVldmEuY2xtLnJ1bkFQSVJlcXVlc3QoYXBwcm92ZWREb2N1bWVudFF1ZXJ5KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29tX3ZlZXZhX2NsbV9Eb2N1bWVudFR5cGVJZF9nZXREb2N1bWVudCh0ZXN0UmVzdWx0LmFwcHJvdmVkRG9jdW1lbnRXaXRoSWQyKTtcbiAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAvL0RpZG4ndCBmaW5kIGFueXRoaW5nIG1hdGNoaW5nLCByZXR1cm4gZW1wdHkgb2JqZWN0IHdpdGggc3VjY2VzcyB0cnVlIChub3QganVzdCBhbiBlbXB0eSBxdWVyeSBvYmplY3QpXG4gICAgICAgICAgICAgICAgICB2YXIgcmV0ID0ge307XG4gICAgICAgICAgICAgICAgICByZXQuc3VjY2VzcyA9IHRydWU7XG4gICAgICAgICAgICAgICAgICBjb20udmVldmEuY2xtLndyYXBSZXN1bHQoXCJnZXRBcHByb3ZlZERvY3VtZW50XCIsIGNhbGxiYWNrLCByZXQpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgfTtcblxuICAgICAgICAgIC8vIDJhIC0gSWYgd2UgaGF2ZSBkZXRhaWwgZ3JvdXBzLCBnZXQgdGhlIHByb2R1Y3QgZ3JvdXBzIHNvIHdlIGNhbiBhbGlnbiBwcm9kdWN0cyB0byBkZXRhaWwgZ3JvdXBzXG4gICAgICAgICAgd2luZG93W1wiY29tX3ZlZXZhX2NsbV9nZXRQcm9kdWN0R3JvdXBzXCJdID0gZnVuY3Rpb24ocmVzdWx0KSB7XG4gICAgICAgICAgICAgIHJlc3VsdCA9IGNvbS52ZWV2YS5jbG0uZm9ybWF0UmVzdWx0KHJlc3VsdCk7XG5cbiAgICAgICAgICAgICAgaWYocmVzdWx0LnN1Y2Nlc3MpIHtcbiAgICAgICAgICAgICAgICAgIHByb2R1Y3RHcm91cHMgPSByZXN1bHQuUHJvZHVjdF9Hcm91cF92b2RfX2M7XG5cbiAgICAgICAgICAgICAgICAgIGFwcHJvdmVkRG9jdW1lbnRRdWVyeSA9IFwidmVldmE6cXVlcnlPYmplY3QoQXBwcm92ZWRfRG9jdW1lbnRfdm9kX19jKSxmaWVsZHMoSUQsUHJvZHVjdF92b2RfX2MsRGV0YWlsX0dyb3VwX3ZvZF9fYyksd2hlcmUoV0hFUkUgVmF1bHRfSW5zdGFuY2VfSURfdm9kX19jPVxcXCJcIiArIHZhdWx0X2lkICsgXCJcXFwiIEFORCBWYXVsdF9Eb2N1bWVudF9JRF92b2RfX2M9XFxcIlwiICsgZG9jdW1lbnRfbnVtICsgXCJcXFwiIEFORCBTdGF0dXNfdm9kX19jPVxcXCJBcHByb3ZlZF92b2RcXFwiKSxjb21fdmVldmFfY2xtX0RvY3VtZW50VHlwZUlkX2dldERvY3VtZW50KHJlc3VsdClcIjtcblxuICAgICAgICAgICAgICAgICAgaWYoIWNvbS52ZWV2YS5jbG0udGVzdE1vZGUpXG4gICAgICAgICAgICAgICAgICAgICAgY29tLnZlZXZhLmNsbS5ydW5BUElSZXF1ZXN0KGFwcHJvdmVkRG9jdW1lbnRRdWVyeSk7XG4gICAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgICAgY29tX3ZlZXZhX2NsbV9Eb2N1bWVudFR5cGVJZF9nZXREb2N1bWVudCh0ZXN0UmVzdWx0LmFwcHJvdmVkRG9jdW1lbnRXaXRoSWQpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgaWYocmVzdWx0LmNvZGUgPT0gMTAxMSkge1xuICAgICAgICAgICAgICAgICAgICAgIC8vTm8gYWNjZXNzIHRvIFByb2R1Y3QgR3JvdXBzIHNwZWNpZmljYWxseSwgc28ganVzdCB1c2UgUHJvZHVjdHNcbiAgICAgICAgICAgICAgICAgICAgICBpZihyZXN1bHQubWVzc2FnZS5pbmRleE9mKFwiUHJvZHVjdF9Hcm91cF92b2RfX2NcIikgPj0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICBhcHByb3ZlZERvY3VtZW50UXVlcnkgPSBcInZlZXZhOnF1ZXJ5T2JqZWN0KEFwcHJvdmVkX0RvY3VtZW50X3ZvZF9fYyksZmllbGRzKElELFByb2R1Y3Rfdm9kX19jKSx3aGVyZShXSEVSRSBWYXVsdF9JbnN0YW5jZV9JRF92b2RfX2M9XFxcIlwiICsgdmF1bHRfaWQgKyBcIlxcXCIgQU5EIFZhdWx0X0RvY3VtZW50X0lEX3ZvZF9fYz1cXFwiXCIgKyBkb2N1bWVudF9udW0gKyBcIlxcXCIgQU5EIFN0YXR1c192b2RfX2M9XFxcIkFwcHJvdmVkX3ZvZFxcXCIpLGNvbV92ZWV2YV9jbG1fRG9jdW1lbnRUeXBlSWRfZ2V0RG9jdW1lbnQocmVzdWx0KVwiO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGlmKCFjb20udmVldmEuY2xtLnRlc3RNb2RlKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29tLnZlZXZhLmNsbS5ydW5BUElSZXF1ZXN0KGFwcHJvdmVkRG9jdW1lbnRRdWVyeSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbV92ZWV2YV9jbG1fRG9jdW1lbnRUeXBlSWRfZ2V0RG9jdW1lbnQodGVzdFJlc3VsdC5hcHByb3ZlZERvY3VtZW50V2l0aElkMik7XG4gICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIGNvbS52ZWV2YS5jbG0ud3JhcFJlc3VsdChcImdldEFwcHJvdmVkRG9jdW1lbnRcIiwgY2FsbGJhY2ssIHJlc3VsdCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICB9O1xuXG4gICAgICAgICAgLy8gMSwgZ2V0IGRldGFpbCB0b3BpYyBwcm9kdWN0cyBmaXJzdFxuICAgICAgICAgIGNvbS52ZWV2YS5jbG0uZ2V0UHJvZHVjdF9NeVNldHVwKFwiRGV0YWlsIFRvcGljXCIsIGZ1bmN0aW9uKHJlc3VsdCkge1xuICAgICAgICAgICAgICByZXN1bHQgPSBjb20udmVldmEuY2xtLmZvcm1hdFJlc3VsdChyZXN1bHQpO1xuXG4gICAgICAgICAgICAgIC8vIGdvdCBhIGxpc3Qgb2YgZGV0YWlsIHRvcGljIHByb2R1Y3RzXG4gICAgICAgICAgICAgIGlmKHJlc3VsdC5zdWNjZXNzKSB7XG4gICAgICAgICAgICAgICAgICB0b3BpY1Byb2R1Y3RzID0gcmVzdWx0LlByb2R1Y3Rfdm9kX19jO1xuXG4gICAgICAgICAgICAgICAgICBjb20udmVldmEuY2xtLmdldFByb2R1Y3RfTXlTZXR1cChcIkRldGFpbFwiLCBmdW5jdGlvbihyZXN1bHQpIHtcbiAgICAgICAgICAgICAgICAgICAgICBpZihyZXN1bHQuc3VjY2Vzcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICBkZXRhaWxQcm9kdWN0cyA9IHJlc3VsdC5Qcm9kdWN0X3ZvZF9fYztcblxuICAgICAgICAgICAgICAgICAgICAgICAgICBjb20udmVldmEuY2xtLmdldFByb2R1Y3RfTXlTZXR1cChcIkRldGFpbCBHcm91cFwiLCBmdW5jdGlvbihyZXN1bHQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKHJlc3VsdC5zdWNjZXNzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGV0YWlsR3JvdXBQcm9kdWN0cyA9IHJlc3VsdC5Qcm9kdWN0X3ZvZF9fYztcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBkZXRhaWxHcm91cElEcyA9IFtdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvcih2YXIgaSA9IDA7IGkgPCBkZXRhaWxHcm91cFByb2R1Y3RzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRldGFpbEdyb3VwSURzW2ldID0gZGV0YWlsR3JvdXBQcm9kdWN0c1tpXS5JRDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgZ3JvdXBBcnJheSA9IGNvbS52ZWV2YS5jbG0uam9pblN0cmluZ0FycmF5Rm9ySW4oZGV0YWlsR3JvdXBJRHMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKGdyb3VwQXJyYXkgPT0gXCJcIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBncm91cEFycmF5ID0gXCJ7fVwiO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vUGFzcyBpbiBvdXIgZGV0YWlsIGdyb3VwcyBhbmQgZmluZCBhbnkgcHJvZHVjdHMgYXNzb2NpYXRlZCB3aXRoIHRoZW1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBxdWVyeSA9IFwidmVldmE6cXVlcnlPYmplY3QoUHJvZHVjdF9Hcm91cF92b2RfX2MpLGZpZWxkcyhJRCxQcm9kdWN0X3ZvZF9fYyxQcm9kdWN0X0NhdGFsb2dfdm9kX19jKSx3aGVyZShXSEVSRSBQcm9kdWN0X0NhdGFsb2dfdm9kX19jIElOIFwiICsgZ3JvdXBBcnJheSArIFwiKSxjb21fdmVldmFfY2xtX2dldFByb2R1Y3RHcm91cHMocmVzdWx0KVwiO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKCFjb20udmVldmEuY2xtLnRlc3RNb2RlKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb20udmVldmEuY2xtLnJ1bkFQSVJlcXVlc3QocXVlcnkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29tX3ZlZXZhX2NsbV9nZXRQcm9kdWN0R3JvdXBzKGNvbS52ZWV2YS5jbG0udGVzdFJlc3VsdC5wcm9kdWN0R3JvdXBzKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gRVJST1Igd2hlbiBnZXR0aW5nIFByb2R1Y3Qgb2YgZGV0YWlsIGdyb3VwIHR5cGUuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29tLnZlZXZhLmNsbS53cmFwUmVzdWx0KFwiZ2V0QXBwcm92ZWREb2N1bWVudFwiLCBjYWxsYmFjaywgcmVzdWx0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gRVJST1Igd2hlbiBnZXR0aW5nIFByb2R1Y3Qgb2YgZGV0YWlsIHR5cGUuXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGNvbS52ZWV2YS5jbG0ud3JhcFJlc3VsdChcImdldEFwcHJvdmVkRG9jdW1lbnRcIiwgY2FsbGJhY2ssIHJlc3VsdCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgIC8vIEVSUk9SIHdoZW4gZ2V0dGluZyBQcm9kdWN0IG9mIGRldGFpbCB0b3BpYyB0eXBlLlxuICAgICAgICAgICAgICAgICAgY29tLnZlZXZhLmNsbS53cmFwUmVzdWx0KFwiZ2V0QXBwcm92ZWREb2N1bWVudFwiLCBjYWxsYmFjaywgcmVzdWx0KTtcbiAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgfSxcbiAgICAgIC8vIExhdW5jaGVzIHRoZSBTZW5kIEVtYWlsIHVzZXIgaW50ZXJmYWNlIHdpdGggdGhlIGVtYWlsIHRlbXBsYXRlIGFuZCBmcmFnbWVudHMgc2VsZWN0ZWQuICBBbiBBY2NvdW50IG11c3QgYmUgc2VsZWN0ZWQuXG4gICAgICAvLyBJZiBDTE1fU2VsZWN0X0FjY291bnRfUHJldmlld19Nb2RlIFZlZXZhIFNldHRpbmcgaXMgZW5hYmxlZCwgdGhlbiBTZWxlY3QgQWNjb3VudCBkaWFsb2d1ZSBpcyBvcGVuZWQgc28gdGhlIHVzZXIgY2FuIHNlbGVjdCBhbiBhY2NvdW50LlxuICAgICAgLy8gSWYgdGhlIFZlZXZhIFNldHRpbmcgaXMgbm90IGVuYWJsZWQgYW5kIG5vIEFjY291bnQgaXMgc2VsZWN0ZWQsIHRoZW4gbm8gYWN0aW9uIHdpbGwgYmUgcGVyZm9ybWVkLlxuICAgICAgLy8gZW1haWxfdGVtcGxhdGUgLSBzcGVjaWZpZXMgdGhlIHJlY29yZCBJRCBvZiB0aGUgRW1haWwgVGVtcGxhdGUgdG8gdXNlXG4gICAgICAvLyBlbWFpbF9mcmFnbWVudHMgLSBhcnJheSBvciBzdHJpbmcgd2l0aCBjb21tYSBzZXBhcmF0ZWQgdmFsdWVzIG9mIHJlY29yZCBJRHMgb2YgdGhlIEVtYWlsIGZyYWdtZW50cyB0byB1c2UuICBDYW4gYmUgbWFkZSBvcHRpb25hbCBieSBwdXR0aW5nIGluIFwiXCJcbiAgICAgIC8vIGNhbGxiYWNrIC0gY2FsbCBiYWNrIGZ1bmN0aW9uIHdoaWNoIHdpbGwgYmUgdXNlZCB0byByZXR1cm4gdGhlIGluZm9ybWF0aW9uXG4gICAgICBsYXVuY2hBcHByb3ZlZEVtYWlsOiBmdW5jdGlvbihlbWFpbF90ZW1wbGF0ZSwgZW1haWxfZnJhZ21lbnRzLCBjYWxsYmFjaykge1xuICAgICAgICAgIC8vIGNoZWNrIHBhcmFtZXRlclxuXG4gICAgICAgICAgcmV0ID0gdGhpcy5jaGVja0NhbGxiYWNrRnVuY3Rpb24oY2FsbGJhY2spO1xuICAgICAgICAgIGlmKHJldC5zdWNjZXNzID09IGZhbHNlKVxuICAgICAgICAgICAgICByZXR1cm4gcmV0O1xuXG4gICAgICAgICAgLy8gY2hlY2sgYXJndW1lbnRzIGFuZCBtYWtlIHRoZW0gZW1wdHkgaWYgdGhleSBkb24ndCBleGlzdFxuICAgICAgICAgIGlmKGVtYWlsX3RlbXBsYXRlID09IHVuZGVmaW5lZCB8fCBlbWFpbF90ZW1wbGF0ZSA9PSBudWxsKSB7XG4gICAgICAgICAgICAgIGVtYWlsX3RlbXBsYXRlID0gXCJcIjtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICAvL01ha2Ugc3VyZSBlbWFpbF9mcmFnbWVudHMgZXhpc3RzXG4gICAgICAgICAgaWYoZW1haWxfZnJhZ21lbnRzID09IHVuZGVmaW5lZCB8fCBlbWFpbF9mcmFnbWVudHMgPT0gbnVsbCkge1xuICAgICAgICAgICAgICBlbWFpbF9mcmFnbWVudHMgPSBcIlwiO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHJlcXVlc3QgPSBudWxsO1xuICAgICAgICAgIHdpbmRvd1tcImNvbV92ZWV2YV9jbG1fbGF1bmNoQXBwcm92ZWRFbWFpbFwiXSA9IGZ1bmN0aW9uKHJlc3VsdCkge1xuICAgICAgICAgICAgICByZXN1bHQgPSBjb20udmVldmEuY2xtLmZvcm1hdFJlc3VsdChyZXN1bHQpO1xuICAgICAgICAgICAgICBpZihyZXN1bHQuc3VjY2Vzcykge1xuICAgICAgICAgICAgICAgICAgcmV0ID0ge307XG4gICAgICAgICAgICAgICAgICByZXQuc3VjY2VzcyA9IHRydWU7XG4gICAgICAgICAgICAgICAgICBpZihyZXN1bHQuY29kZSAhPSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICByZXQuY29kZSA9IHJlc3VsdC5jb2RlO1xuICAgICAgICAgICAgICAgICAgICAgIHJldC5tZXNzYWdlID0gcmVzdWx0Lm1lc3NhZ2U7XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICBjb20udmVldmEuY2xtLndyYXBSZXN1bHQoXCJsYXVuY2hBcHByb3ZlZEVtYWlsXCIsIGNhbGxiYWNrLCByZXQpO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgcmV0ID0ge307XG4gICAgICAgICAgICAgICAgICByZXQuc3VjY2VzcyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgcmV0LmNvZGUgPSByZXN1bHQuY29kZTtcbiAgICAgICAgICAgICAgICAgIHJldC5tZXNzYWdlID0gXCJSZXF1ZXN0OiBcIiArIHJlcXVlc3QgKyBcIiBmYWlsZWQ6IFwiICsgcmVzdWx0Lm1lc3NhZ2U7XG4gICAgICAgICAgICAgICAgICBjb20udmVldmEuY2xtLndyYXBSZXN1bHQoXCJsYXVuY2hBcHByb3ZlZEVtYWlsXCIsIGNhbGxiYWNrLCByZXQpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgfTtcblxuICAgICAgICAgIHJlcXVlc3QgPSBcInZlZXZhOmxhdW5jaEFwcHJvdmVkRW1haWwoXCIgKyBlbWFpbF90ZW1wbGF0ZSArIFwiLFwiICsgZW1haWxfZnJhZ21lbnRzICsgXCIpLGNhbGxiYWNrKGNvbV92ZWV2YV9jbG1fbGF1bmNoQXBwcm92ZWRFbWFpbClcIjtcblxuICAgICAgICAgIGlmKCFjb20udmVldmEuY2xtLnRlc3RNb2RlKVxuICAgICAgICAgICAgICBjb20udmVldmEuY2xtLnJ1bkFQSVJlcXVlc3QocmVxdWVzdCk7XG4gICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICBjb21fdmVldmFfY2xtX2xhdW5jaEFwcHJvdmVkRW1haWwoY29tLnZlZXZhLmNsbS50ZXN0UmVzdWx0LmFwcHJvdmVkRW1haWxJZCk7XG5cbiAgICAgIH0sXG5cbiAgICAgIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vIEZ1bmN0aW9ucyB0byByZXBsYWNlIGV4aXNpbmcgQVBJIGNhbGxzIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cbiAgICAgIC8vIDFcbiAgICAgIC8vIFJldHVybnMgdGhlIHZhbHVlIG9mIGEgZmllbGQgZm9yIGEgc3BlY2lmaWMgcmVjb3JkIHJlbGF0ZWQgdG8gdGhlIGN1cnJlbnQgY2FsbFxuICAgICAgLy8gb2JqZWN0IC0gIExpbWl0ZWQgdG8gdGhlIGZvbGxvd2luZyBrZXl3b3JkczogQWNjb3VudCwgVFNGLCBVc2VyLCBBZGRyZXNzLCBDYWxsLCBQcmVzZW50YXRpb24sIEtleU1lc3NhZ2UsIGFuZCBDYWxsT2JqZWN0aXZlLlxuICAgICAgLy8gZmllbGQtIGZpZWxkIGFwaSBuYW1lIHRvIHJldHVybiBhIHZhbHVlIGZvclxuICAgICAgLy8gY2FsbGJhY2sgLSBjYWxsIGJhY2sgZnVuY3Rpb24gd2hpY2ggd2lsbCBiZSB1c2VkIHRvIHJldHVybiB0aGUgaW5mb3JtYXRpb25cbiAgICAgIGdldERhdGFGb3JDdXJyZW50T2JqZWN0OiBmdW5jdGlvbihvYmplY3QsIGZpZWxkLCBjYWxsYmFjaykge1xuICAgICAgICAgIHJldCA9IHRoaXMuY2hlY2tDYWxsYmFja0Z1bmN0aW9uKGNhbGxiYWNrKTtcbiAgICAgICAgICBpZihyZXQuc3VjY2VzcyA9PSBmYWxzZSlcbiAgICAgICAgICAgICAgcmV0dXJuIHJldDtcblxuICAgICAgICAgIC8vIGNoZWNrIGFyZ3VtZW50c1xuICAgICAgICAgIHJldCA9IHRoaXMuY2hlY2tBcmd1bWVudChcIm9iamVjdFwiLCBvYmplY3QpO1xuICAgICAgICAgIGlmKHJldC5zdWNjZXNzID09IGZhbHNlKSB7XG4gICAgICAgICAgICAgIGNvbS52ZWV2YS5jbG0ud3JhcFJlc3VsdChcImdldERhdGFGb3JDdXJyZW50T2JqZWN0XCIsIGNhbGxiYWNrLCByZXQpO1xuICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuXG5cbiAgICAgICAgICByZXQgPSB0aGlzLmNoZWNrQXJndW1lbnQoXCJmaWVsZFwiLCBmaWVsZCk7XG4gICAgICAgICAgaWYocmV0LnN1Y2Nlc3MgPT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgY29tLnZlZXZhLmNsbS53cmFwUmVzdWx0KFwiZ2V0RGF0YUZvckN1cnJlbnRPYmplY3RcIiwgY2FsbGJhY2ssIHJldCk7XG4gICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICB3aW5kb3dbXCJjb21fdmVldmFfY2xtX2dldEN1cnJlbnRPYmplY3RGaWVsZFwiXSA9IGZ1bmN0aW9uKHJlc3VsdCkge1xuICAgICAgICAgICAgICAvLyBUT0RPIHJlc3VsdCBmb3JtYXRcbiAgICAgICAgICAgICAgY29tLnZlZXZhLmNsbS53cmFwUmVzdWx0KFwiZ2V0RGF0YUZvckN1cnJlbnRPYmplY3RcIiwgY2FsbGJhY2ssIHJlc3VsdCk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgbG93ZXJOYW1lID0gb2JqZWN0LnRvTG93ZXJDYXNlKCk7XG5cbiAgICAgICAgICByZXF1ZXN0ID0gXCJ2ZWV2YTpnZXREYXRhRm9yT2JqZWN0VjIoXCIgKyBvYmplY3QgKyBcIiksZmllbGROYW1lKFwiICsgZmllbGQgKyBcIiksY29tX3ZlZXZhX2NsbV9nZXRDdXJyZW50T2JqZWN0RmllbGQocmVzdWx0KVwiO1xuICAgICAgICAgIGlmKCFjb20udmVldmEuY2xtLnRlc3RNb2RlKVxuICAgICAgICAgICAgICBjb20udmVldmEuY2xtLnJ1bkFQSVJlcXVlc3QocmVxdWVzdCwgY2FsbGJhY2spO1xuICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgY29tX3ZlZXZhX2NsbV9nZXRDdXJyZW50T2JqZWN0RmllbGQoY29tLnZlZXZhLmNsbS50ZXN0UmVzdWx0LmNvbW1vbik7XG4gICAgICB9LFxuXG4gICAgICAvLyAyXG4gICAgICAvLyBSZXR1cm5zIHRoZSB2YWx1ZSBvZiBhIGZpZWxkIGZvciBhIHNwZWNpZmljIHJlY29yZFxuICAgICAgLy8gb2JqZWN0IC0gc3BlY2lmaWVzIHRoZSBvYmplY3QgYXBpIG5hbWUgKG9iamVjdCBrZXl3b3JkcyB1c2VkIGluIGdldERhdGFGb3JDdXJyZW50T2JqZWN0IGFyZSBub3QgdmFsaWQsIGV4Y2VwdCBmb3IgQWNjb3VudCBhbmQgVXNlcilcbiAgICAgIC8vIHJlY29yZCAtIHNwZWNpZmllcyB0aGUgcmVjb3JkIGlkLlxuICAgICAgLy8gZmllbGQtIGZpZWxkIGFwaSBuYW1lIHRvIHJldHVybiBhIHZhbHVlIGZvclxuICAgICAgLy8gY2FsbGJhY2sgLSBjYWxsIGJhY2sgZnVuY3Rpb24gd2hpY2ggd2lsbCBiZSB1c2VkIHRvIHJldHVybiB0aGUgaW5mb3JtYXRpb25cbiAgICAgIGdldERhdGFGb3JPYmplY3Q6IGZ1bmN0aW9uKG9iamVjdCwgcmVjb3JkLCBmaWVsZCwgY2FsbGJhY2spIHtcbiAgICAgICAgICByZXQgPSB0aGlzLmNoZWNrQ2FsbGJhY2tGdW5jdGlvbihjYWxsYmFjayk7XG4gICAgICAgICAgaWYocmV0LnN1Y2Nlc3MgPT0gZmFsc2UpXG4gICAgICAgICAgICAgIHJldHVybiByZXQ7XG5cbiAgICAgICAgICAvLyBjaGVjayBhcmd1bWVudHNcbiAgICAgICAgICByZXQgPSB0aGlzLmNoZWNrQXJndW1lbnQoXCJvYmplY3RcIiwgb2JqZWN0KTtcbiAgICAgICAgICBpZihyZXQuc3VjY2VzcyA9PSBmYWxzZSkge1xuICAgICAgICAgICAgICBjb20udmVldmEuY2xtLndyYXBSZXN1bHQoXCJnZXREYXRhRm9yT2JqZWN0XCIsIGNhbGxiYWNrLCByZXQpO1xuICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuXG5cbiAgICAgICAgICByZXQgPSB0aGlzLmNoZWNrQXJndW1lbnQoXCJyZWNvcmRcIiwgcmVjb3JkKTtcbiAgICAgICAgICBpZihyZXQuc3VjY2VzcyA9PSBmYWxzZSkge1xuICAgICAgICAgICAgICBjb20udmVldmEuY2xtLndyYXBSZXN1bHQoXCJnZXREYXRhRm9yT2JqZWN0XCIsIGNhbGxiYWNrLCByZXQpO1xuICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcmV0ID0gdGhpcy5jaGVja0FyZ3VtZW50KFwiZmllbGRcIiwgZmllbGQpO1xuICAgICAgICAgIGlmKHJldC5zdWNjZXNzID09IGZhbHNlKSB7XG4gICAgICAgICAgICAgIGNvbS52ZWV2YS5jbG0ud3JhcFJlc3VsdChcImdldERhdGFGb3JPYmplY3RcIiwgY2FsbGJhY2ssIHJldCk7XG4gICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICB3aW5kb3dbXCJjb21fdmVldmFfY2xtX2dldE9iamVjdEZpZWxkXCJdID0gZnVuY3Rpb24ocmVzdWx0KSB7XG4gICAgICAgICAgICAgIC8vIFRPRE8gcmVzdWx0IGZvcm1hdFxuICAgICAgICAgICAgICBjb20udmVldmEuY2xtLndyYXBSZXN1bHQoXCJnZXREYXRhRm9yT2JqZWN0XCIsIGNhbGxiYWNrLCByZXN1bHQpO1xuICAgICAgICAgIH1cblxuXG4gICAgICAgICAgcmVxdWVzdCA9IFwidmVldmE6Z2V0RGF0YUZvck9iamVjdFYyKFwiICsgb2JqZWN0ICsgXCIpLG9iaklkKFwiICsgcmVjb3JkICsgXCIpLGZpZWxkTmFtZShcIiArIGZpZWxkICsgXCIpLGNvbV92ZWV2YV9jbG1fZ2V0T2JqZWN0RmllbGQocmVzdWx0KVwiO1xuICAgICAgICAgIGlmKCFjb20udmVldmEuY2xtLnRlc3RNb2RlKVxuICAgICAgICAgICAgICBjb20udmVldmEuY2xtLnJ1bkFQSVJlcXVlc3QocmVxdWVzdCwgY2FsbGJhY2spO1xuICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgY29tX3ZlZXZhX2NsbV9nZXRPYmplY3RGaWVsZChjb20udmVldmEuY2xtLnRlc3RSZXN1bHQuY29tbW9uKTtcblxuICAgICAgfSxcblxuXG4gICAgICAvLyAzXG4gICAgICAvLyBDcmVhdGVzIGEgbmV3IHJlY29yZCBmb3IgdGhlIHNwZWNpZmllZCBvYmplY3RcbiAgICAgIC8vIG9iamVjdCAtIHNwZWNpZmllcyB0aGUgb2JqZWN0IGFwaSBuYW1lXG4gICAgICAvLyB2YWx1ZXMgLSBqc29uIG9iamVjdCB3aXRoIHRoZSBmaWVsZHMgYW5kIHZhbHVlcyB0byBiZSB3cml0dGVuIHRvIHRoZSBuZXcgcmVjb3JkXG4gICAgICAvLyBjYWxsYmFjayAtIGNhbGwgYmFjayBmdW5jdGlvbiB3aGljaCB3aWxsIGJlIHVzZWQgdG8gcmV0dXJuIHRoZSBpbmZvcm1hdGlvblxuICAgICAgLy8gTk9URTogVGhpcyBmdW5jdGlvbiByZXR1cm5zIHN1Y2Nlc3M6IHRydWUgYXMgbG9uZyBhcyB0aGUgdXNlciBoYXMgYWNjZXNzIHRvIHRoZSBvYmplY3QuXG4gICAgICAvLyAgICAgICBJZiB0aGUgdXNlciBkb2VzIG5vdCBoYXZlIGFjY2VzcyB0byBvbmUgb2YgdGhlIGZpZWxkcyBzcGVjaWZpZWQsIHN1Y2Nlc3M6IHRydWUgaXMgc3RpbGwgcmV0dXJuZWQsIGhvd2V2ZXIsXG4gICAgICAvLyAgICAgICBhbmQgdGhlIGZpZWxkcyB0aGUgdXNlciBkb2VzIGhhdmUgYWNjZXNzIHRvIGFyZSBzdGlsbCB1cGRhdGVkLlxuICAgICAgY3JlYXRlUmVjb3JkOiBmdW5jdGlvbihvYmplY3QsIHZhbHVlcywgY2FsbGJhY2spIHtcbiAgICAgICAgICByZXQgPSB0aGlzLmNoZWNrQ2FsbGJhY2tGdW5jdGlvbihjYWxsYmFjayk7XG4gICAgICAgICAgaWYocmV0LnN1Y2Nlc3MgPT0gZmFsc2UpXG4gICAgICAgICAgICAgIHJldHVybiByZXQ7XG5cbiAgICAgICAgICAvLyBjaGVjayBhcmd1bWVudHNcbiAgICAgICAgICByZXQgPSB0aGlzLmNoZWNrQXJndW1lbnQoXCJvYmplY3RcIiwgb2JqZWN0KTtcbiAgICAgICAgICBpZihyZXQuc3VjY2VzcyA9PSBmYWxzZSkge1xuICAgICAgICAgICAgICBjb20udmVldmEuY2xtLndyYXBSZXN1bHQoXCJjcmVhdGVSZWNvcmRcIiwgY2FsbGJhY2ssIHJldCk7XG4gICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG5cblxuICAgICAgICAgIHJldCA9IHRoaXMuY2hlY2tBcmd1bWVudChcInZhbHVlc1wiLCB2YWx1ZXMpO1xuICAgICAgICAgIGlmKHJldC5zdWNjZXNzID09IGZhbHNlKSB7XG4gICAgICAgICAgICAgIGNvbS52ZWV2YS5jbG0ud3JhcFJlc3VsdChcImNyZWF0ZVJlY29yZFwiLCBjYWxsYmFjaywgcmV0KTtcbiAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHJlcXVlc3QgPSBjb20udmVldmEuY2xtLmdlbmVyYXRlU2F2ZVJlY29yZFJlcXVlc3Qob2JqZWN0LCB2YWx1ZXMsIFwiY29tX3ZlZXZhX2NsbV9jcmVhdGVSZWNvcmRcIik7XG4gICAgICAgICAgd2luZG93W1wiY29tX3ZlZXZhX2NsbV9jcmVhdGVSZWNvcmRcIl0gPSBmdW5jdGlvbihyZXN1bHQpIHtcbiAgICAgICAgICAgICAgcmVzdWx0ID0gY29tLnZlZXZhLmNsbS5mb3JtYXRSZXN1bHQocmVzdWx0KTtcbiAgICAgICAgICAgICAgaWYocmVzdWx0LnN1Y2Nlc3MpIHtcbiAgICAgICAgICAgICAgICAgIHJldCA9IHt9O1xuICAgICAgICAgICAgICAgICAgcmV0LnN1Y2Nlc3MgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgcmV0Lm9wZXJhdGlvbiA9IHJlc3VsdC5vcGVyYXRpb247XG4gICAgICAgICAgICAgICAgICByZXRbb2JqZWN0XSA9IHt9O1xuICAgICAgICAgICAgICAgICAgcmV0W29iamVjdF0uSUQgPSByZXN1bHQub2JqZWN0SWQ7XG4gICAgICAgICAgICAgICAgICBpZihyZXN1bHQuY29kZSAhPSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICByZXQuY29kZSA9IHJlc3VsdC5jb2RlO1xuICAgICAgICAgICAgICAgICAgICAgIHJldC5tZXNzYWdlID0gcmVzdWx0Lm1lc3NhZ2U7XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICBjb20udmVldmEuY2xtLndyYXBSZXN1bHQoXCJjcmVhdGVSZWNvcmRcIiwgY2FsbGJhY2ssIHJldCk7XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICByZXQgPSB7fTtcbiAgICAgICAgICAgICAgICAgIHJldC5zdWNjZXNzID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICByZXQuY29kZSA9IDIxMDA7XG4gICAgICAgICAgICAgICAgICByZXQubWVzc2FnZSA9IFwiUmVxdWVzdDogXCIgKyByZXF1ZXN0ICsgXCIgZmFpbGVkOiBcIiArIHJlc3VsdC5tZXNzYWdlO1xuICAgICAgICAgICAgICAgICAgY29tLnZlZXZhLmNsbS53cmFwUmVzdWx0KFwiY3JlYXRlUmVjb3JkXCIsIGNhbGxiYWNrLCByZXQpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgfTtcblxuICAgICAgICAgIC8vIGNyZWF0ZSByZWNvcmRcbiAgICAgICAgICBpZighY29tLnZlZXZhLmNsbS50ZXN0TW9kZSlcbiAgICAgICAgICAgICAgY29tLnZlZXZhLmNsbS5ydW5BUElSZXF1ZXN0KHJlcXVlc3QpO1xuICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgY29tX3ZlZXZhX2NsbV9jcmVhdGVSZWNvcmQoY29tLnZlZXZhLmNsbS50ZXN0UmVzdWx0LmNvbW1vbik7XG4gICAgICB9LFxuXG4gICAgICAvLyA0XG4gICAgICAvLyBVcGRhdGVzIGEgc3BlY2lmaWVkIHJlY29yZFxuICAgICAgLy8gb2JqZWN0IC0gc3BlY2lmaWVzIHRoZSBvYmplY3QgYXBpIG5hbWVcbiAgICAgIC8vIHJlY29yZCAtIHNwZWNpZmllcyB0aGUgcmVjb3JkIGlkIHRvIGJlIHVwZGF0ZWRcbiAgICAgIC8vIHZhbHVlcyAtIGpzb24gb2JqZWN0IHdpdGggdGhlIGZpZWxkcyBhbmQgdmFsdWVzIHVwZGF0ZWQgb24gdGhlIHJlY29yZFxuICAgICAgLy8gY2FsbGJhY2sgLSBjYWxsIGJhY2sgZnVuY3Rpb24gd2hpY2ggd2lsbCBiZSB1c2VkIHRvIHJldHVybiB0aGUgaW5mb3JtYXRpb25cbiAgICAgIC8vIE5PVEU6IFRoaXMgZnVuY3Rpb24gcmV0dXJucyBzdWNjZXNzOiB0cnVlIGFzIGxvbmcgYXMgdGhlIHVzZXIgaGFzIGFjY2VzcyB0byB0aGUgb2JqZWN0LlxuICAgICAgLy8gICAgICAgSWYgdGhlIHVzZXIgZG9lcyBub3QgaGF2ZSBhY2Nlc3MgdG8gb25lIG9mIHRoZSBmaWVsZHMgc3BlY2lmaWVkLCBzdWNjZXNzOiB0cnVlIGlzIHN0aWxsIHJldHVybmVkLCBob3dldmVyLFxuICAgICAgLy8gICAgICAgYW5kIHRoZSBmaWVsZHMgdGhlIHVzZXIgZG9lcyBoYXZlIGFjY2VzcyB0byBhcmUgc3RpbGwgdXBkYXRlZC5cbiAgICAgIHVwZGF0ZVJlY29yZDogZnVuY3Rpb24ob2JqZWN0LCByZWNvcmQsIHZhbHVlcywgY2FsbGJhY2spIHtcbiAgICAgICAgICByZXQgPSB0aGlzLmNoZWNrQ2FsbGJhY2tGdW5jdGlvbihjYWxsYmFjayk7XG4gICAgICAgICAgaWYocmV0LnN1Y2Nlc3MgPT0gZmFsc2UpXG4gICAgICAgICAgICAgIHJldHVybiByZXQ7XG5cbiAgICAgICAgICAvLyBjaGVjayBhcmd1bWVudHNcbiAgICAgICAgICByZXQgPSB0aGlzLmNoZWNrQXJndW1lbnQoXCJvYmplY3RcIiwgb2JqZWN0KTtcbiAgICAgICAgICBpZihyZXQuc3VjY2VzcyA9PSBmYWxzZSkge1xuICAgICAgICAgICAgICBjb20udmVldmEuY2xtLndyYXBSZXN1bHQoXCJ1cGRhdGVSZWNvcmRcIiwgY2FsbGJhY2ssIHJldCk7XG4gICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICByZXQgPSB0aGlzLmNoZWNrQXJndW1lbnQoXCJyZWNvcmRcIiwgcmVjb3JkKTtcbiAgICAgICAgICBpZihyZXQuc3VjY2VzcyA9PSBmYWxzZSkge1xuICAgICAgICAgICAgICBjb20udmVldmEuY2xtLndyYXBSZXN1bHQoXCJ1cGRhdGVSZWNvcmRcIiwgY2FsbGJhY2ssIHJldCk7XG4gICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICByZXQgPSB0aGlzLmNoZWNrQXJndW1lbnQoXCJ2YWx1ZXNcIiwgdmFsdWVzKTtcbiAgICAgICAgICBpZihyZXQuc3VjY2VzcyA9PSBmYWxzZSkge1xuICAgICAgICAgICAgICBjb20udmVldmEuY2xtLndyYXBSZXN1bHQoXCJ1cGRhdGVSZWNvcmRcIiwgY2FsbGJhY2ssIHJldCk7XG4gICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG4gICAgICAgICAgLy8gSWQgaXMgcmVxdWlyZWQgZm9yIHVwZGF0aW5nIGV4aXN0aW5nIHJlY29yZFxuICAgICAgICAgIHZhbHVlcy5JZE51bWJlciA9IHJlY29yZDtcblxuICAgICAgICAgIC8vIGNyZWF0ZSByZWNvcmRcbiAgICAgICAgICByZXF1ZXN0ID0gY29tLnZlZXZhLmNsbS5nZW5lcmF0ZVNhdmVSZWNvcmRSZXF1ZXN0KG9iamVjdCwgdmFsdWVzLCBcImNvbV92ZWV2YV9jbG1fdXBkYXRlUmVjb3JkXCIpO1xuXG4gICAgICAgICAgd2luZG93W1wiY29tX3ZlZXZhX2NsbV91cGRhdGVSZWNvcmRcIl0gPSBmdW5jdGlvbihyZXN1bHQpIHtcbiAgICAgICAgICAgICAgcmVzdWx0ID0gY29tLnZlZXZhLmNsbS5mb3JtYXRSZXN1bHQocmVzdWx0KTtcbiAgICAgICAgICAgICAgaWYocmVzdWx0LnN1Y2Nlc3MpIHtcbiAgICAgICAgICAgICAgICAgIHJldCA9IHt9O1xuICAgICAgICAgICAgICAgICAgcmV0LnN1Y2Nlc3MgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgcmV0Lm9wZXJhdGlvbiA9IHJlc3VsdC5vcGVyYXRpb247XG4gICAgICAgICAgICAgICAgICByZXRbb2JqZWN0XSA9IHt9O1xuICAgICAgICAgICAgICAgICAgcmV0W29iamVjdF0uSUQgPSByZXN1bHQub2JqZWN0SWQ7XG4gICAgICAgICAgICAgICAgICBpZihyZXN1bHQuY29kZSAhPSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICByZXQuY29kZSA9IHJlc3VsdC5jb2RlO1xuICAgICAgICAgICAgICAgICAgICAgIHJldC5tZXNzYWdlID0gcmVzdWx0Lm1lc3NhZ2U7XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICBjb20udmVldmEuY2xtLndyYXBSZXN1bHQoXCJ1cGRhdGVSZWNvcmRcIiwgY2FsbGJhY2ssIHJldCk7XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICByZXQgPSB7fTtcbiAgICAgICAgICAgICAgICAgIHJldC5zdWNjZXNzID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICByZXQuY29kZSA9IDIxMDA7XG4gICAgICAgICAgICAgICAgICByZXQubWVzc2FnZSA9IFwiUmVxdWVzdDogXCIgKyByZXF1ZXN0ICsgXCIgZmFpbGVkOiBcIiArIHJlc3VsdC5tZXNzYWdlO1xuICAgICAgICAgICAgICAgICAgY29tLnZlZXZhLmNsbS53cmFwUmVzdWx0KFwidXBkYXRlUmVjb3JkXCIsIGNhbGxiYWNrLCByZXQpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgfTtcblxuICAgICAgICAgIGlmKCFjb20udmVldmEuY2xtLnRlc3RNb2RlKVxuICAgICAgICAgICAgICBjb20udmVldmEuY2xtLnJ1bkFQSVJlcXVlc3QocmVxdWVzdCk7XG4gICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICBjb21fdmVldmFfY2xtX3VwZGF0ZVJlY29yZChjb20udmVldmEuY2xtLnRlc3RSZXN1bHQuY29tbW9uKTtcbiAgICAgIH0sXG5cbiAgICAgIC8vIDVhXG4gICAgICAvLyBOYXZpZ2F0ZXMgdG8gdGhlIHNwZWNpZmllZCBrZXkgbWVzc2FnZSAoS2V5X01lc3NhZ2Vfdm9kX19jKVxuICAgICAgLy8ga2V5IG1lc3NhZ2UgLSBleHRlcm5hbCBJRCBmaWVsZCBvZiB0aGUga2V5IG1lc3NhZ2UgdG8ganVtcCB0by4gVXN1YWxseSBpcyBNZWRpYV9GaWxlX05hbWVfdm9kX19jLCBidXQgZG9lcyBub3QgaGF2ZSB0byBiZS5cbiAgICAgIC8vIGNsbSBwcmVzZW50YXRpb24gLSBleHRlcm5hbCBJRCBvZiB0aGUgQ0xNIFByZXNlbnRhdGlvbiBpZiB0aGUga2V5IG1lc3NhZ2UgaXMgaW4gYSBkaWZmZXJlbnQgQ0xNIFByZXNlbnRhdGlvbi5cbiAgICAgIC8vIFVzdWFsbHkgaXMgUHJlc2VudGF0aW9uX0lkX3ZvZF9fYywgYnV0IGRvZXMgbm90IGhhdmUgdG8gYmUuIENhbiBiZSBtYWRlIG9wdGlvbmFsIGJ5IHB1dHRpbmcgaW4gXCJcIi5cbiAgICAgIGdvdG9TbGlkZTogZnVuY3Rpb24oa2V5TWVzc2FnZSwgcHJlc2VudGF0aW9uKSB7XG5cbiAgICAgICAgICByZXQgPSB0aGlzLmNoZWNrQXJndW1lbnQoXCJrZXlNZXNzYWdlXCIsIGtleU1lc3NhZ2UpO1xuICAgICAgICAgIGlmKHJldC5zdWNjZXNzID09IGZhbHNlKSB7XG4gICAgICAgICAgICAgIHJldHVybiByZXQ7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcmVxdWVzdCA9IG51bGw7XG4gICAgICAgICAgaWYocHJlc2VudGF0aW9uID09IHVuZGVmaW5lZCB8fCBwcmVzZW50YXRpb24gPT0gbnVsbCB8fCBwcmVzZW50YXRpb24gPT0gXCJcIikge1xuICAgICAgICAgICAgICAvLyBnb3RvIHdpdGhpbiBjdXJyZW50IHByZXNlbmF0aW9uXG4gICAgICAgICAgICAgIHJlcXVlc3QgPSBcInZlZXZhOmdvdG9TbGlkZShcIiArIGtleU1lc3NhZ2UgKyBcIilcIjtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICByZXF1ZXN0ID0gXCJ2ZWV2YTpnb3RvU2xpZGUoXCIgKyBrZXlNZXNzYWdlICsgXCIsXCIgKyBwcmVzZW50YXRpb24gKyBcIilcIjtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZighY29tLnZlZXZhLmNsbS50ZXN0TW9kZSlcbiAgICAgICAgICAgICAgY29tLnZlZXZhLmNsbS5ydW5BUElSZXF1ZXN0KHJlcXVlc3QpO1xuXG4gICAgICB9LFxuXG4gICAgICAvLyA1YlxuICAgICAgLy8gTmF2aWdhdGVzIHRvIHRoZSBzcGVjaWZpZWQga2V5IG1lc3NhZ2UgKEtleV9NZXNzYWdlX3ZvZF9fYylcbiAgICAgIC8vIGtleSBtZXNzYWdlIC0gVmF1bHRfRXh0ZXJuYWxfSWRfdm9kX19jIGZpZWxkIG9mIHRoZSBrZXkgbWVzc2FnZSB0byBqdW1wIHRvXG4gICAgICAvLyBjbG0gcHJlc2VudGF0aW9uIC0gVmF1bHRfRXh0ZXJuYWxfSWRfdm9kX19jIG9mIHRoZSBDTE0gUHJlc2VudGF0aW9uIGlmIHRoZSBrZXkgbWVzc2FnZSBpcyBpbiBhIGRpZmZlcmVudCBDTE0gUHJlc2VudGF0aW9uLlxuICAgICAgLy8gQ2FuIGJlIG1hZGUgb3B0aW9uYWwgYnkgcHV0dGluZyBpbiBcIlwiLlxuICAgICAgZ290b1NsaWRlVjI6IGZ1bmN0aW9uKGtleU1lc3NhZ2UsIHByZXNlbnRhdGlvbikge1xuXG4gICAgICAgICAgcmV0ID0gdGhpcy5jaGVja0FyZ3VtZW50KFwia2V5TWVzc2FnZVwiLCBrZXlNZXNzYWdlKTtcbiAgICAgICAgICBpZihyZXQuc3VjY2VzcyA9PSBmYWxzZSkge1xuICAgICAgICAgICAgICByZXR1cm4gcmV0O1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHJlcXVlc3QgPSBudWxsO1xuICAgICAgICAgIGlmKHByZXNlbnRhdGlvbiA9PSB1bmRlZmluZWQgfHwgcHJlc2VudGF0aW9uID09IG51bGwgfHwgcHJlc2VudGF0aW9uID09IFwiXCIpIHtcbiAgICAgICAgICAgICAgLy8gZ290byB3aXRoaW4gY3VycmVudCBwcmVzZW50YXRpb25cbiAgICAgICAgICAgICAgcmVxdWVzdCA9IFwidmVldmE6Z290b1NsaWRlVjIoXCIgKyBrZXlNZXNzYWdlICsgXCIpXCI7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgcmVxdWVzdCA9IFwidmVldmE6Z290b1NsaWRlVjIoXCIgKyBrZXlNZXNzYWdlICsgXCIsXCIgKyBwcmVzZW50YXRpb24gKyBcIilcIjtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZighY29tLnZlZXZhLmNsbS50ZXN0TW9kZSlcbiAgICAgICAgICAgICAgY29tLnZlZXZhLmNsbS5ydW5BUElSZXF1ZXN0KHJlcXVlc3QpO1xuXG4gICAgICB9LFxuXG4gICAgICAvLyA2XG4gICAgICAvLyBOYXZpZ2F0ZXMgdG8gdGhlIG5leHQgc2xpZGUgYmFzZWQgb24gdGhlIENMTSBQcmVzZW50YXRpb24gU2xpZGUgZGlzcGxheSBvcmRlclxuICAgICAgbmV4dFNsaWRlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICByZXF1ZXN0ID0gXCJ2ZWV2YTpuZXh0U2xpZGUoKVwiO1xuICAgICAgICAgIGNvbS52ZWV2YS5jbG0ucnVuQVBJUmVxdWVzdChyZXF1ZXN0KTtcbiAgICAgIH0sXG5cbiAgICAgIC8vIDdcbiAgICAgIC8vIE5hdmlnYXRlcyB0byB0aGUgcHJldmlvdXMgc2xpZGUgYmFzZWQgb24gdGhlIENMTSBQcmVzZW50YXRpb24gU2xpZGUgZGlzcGxheSBvcmRlclxuICAgICAgcHJldlNsaWRlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICByZXF1ZXN0ID0gXCJ2ZWV2YTpwcmV2U2xpZGUoKVwiO1xuICAgICAgICAgIGNvbS52ZWV2YS5jbG0ucnVuQVBJUmVxdWVzdChyZXF1ZXN0KTtcbiAgICAgIH0sXG5cbiAgICAgIC8vIDhcbiAgICAgIC8vIFJldHVybnMgdGhlIHZhbHVlIG9mIHRoZSBmaWVsZCBpbiBVVEMgZm9ybWF0LiAgT25seSB3b3JrcyB3aXRoIGZpZWxkIG9mIHR5cGUgRGF0ZSBvciBEYXRldGltZS5cbiAgICAgIC8vIG9iamVjdCAtIHNwZWNpZmllcyB0aGUgb2JqZWN0IGFwaSBuYW1lIChvYmplY3Qga2V5d29yZHMgdXNlZCBpbiBnZXREYXRhRm9yQ3VycmVudE9iamVjdCBhcmUgbm90IHZhbGlkLCBleGNlcHQgZm9yIEFjY291bnQpXG4gICAgICAvLyByZWNvcmQgLSBzcGVjaWZpZXMgdGhlIHJlY29yZCBpZC5cbiAgICAgIC8vIGZpZWxkLSBmaWVsZCBhcGkgbmFtZSB0byByZXR1cm4gYSB2YWx1ZSBmb3JcbiAgICAgIC8vIGNhbGxiYWNrIC0gY2FsbCBiYWNrIGZ1bmN0aW9uIHdoaWNoIHdpbGwgYmUgdXNlZCB0byByZXR1cm4gdGhlIGluZm9ybWF0aW9uXG4gICAgICBnZXRVVENkYXRldGltZTogZnVuY3Rpb24ob2JqZWN0LCByZWNvcmQsIGZpZWxkLCBjYWxsYmFjaykge1xuICAgICAgICAgIHJldCA9IHRoaXMuY2hlY2tDYWxsYmFja0Z1bmN0aW9uKGNhbGxiYWNrKTtcbiAgICAgICAgICBpZihyZXQuc3VjY2VzcyA9PSBmYWxzZSlcbiAgICAgICAgICAgICAgcmV0dXJuIHJldDtcblxuICAgICAgICAgIC8vIGNoZWNrIGFyZ3VtZW50c1xuICAgICAgICAgIHJldCA9IHRoaXMuY2hlY2tBcmd1bWVudChcIm9iamVjdFwiLCBvYmplY3QpO1xuICAgICAgICAgIGlmKHJldC5zdWNjZXNzID09IGZhbHNlKSB7XG4gICAgICAgICAgICAgIGNvbS52ZWV2YS5jbG0ud3JhcFJlc3VsdChcImdldFVUQ2RhdGV0aW1lXCIsIGNhbGxiYWNrLCByZXQpO1xuICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuXG5cbiAgICAgICAgICByZXQgPSB0aGlzLmNoZWNrQXJndW1lbnQoXCJyZWNvcmRcIiwgcmVjb3JkKTtcbiAgICAgICAgICBpZihyZXQuc3VjY2VzcyA9PSBmYWxzZSkge1xuICAgICAgICAgICAgICBjb20udmVldmEuY2xtLndyYXBSZXN1bHQoXCJnZXRVVENkYXRldGltZVwiLCBjYWxsYmFjaywgcmV0KTtcbiAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHJldCA9IHRoaXMuY2hlY2tBcmd1bWVudChcImZpZWxkXCIsIGZpZWxkKTtcbiAgICAgICAgICBpZihyZXQuc3VjY2VzcyA9PSBmYWxzZSkge1xuICAgICAgICAgICAgICBjb20udmVldmEuY2xtLndyYXBSZXN1bHQoXCJnZXRVVENkYXRldGltZVwiLCBjYWxsYmFjaywgcmV0KTtcbiAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHdpbmRvd1tcImNvbV92ZWV2YV9jbG1fZ2V0VVRDZGF0ZXRpbWVcIl0gPSBmdW5jdGlvbihyZXN1bHQpIHtcbiAgICAgICAgICAgICAgLy8gVE9ETyByZXN1bHQgZm9ybWF0XG4gICAgICAgICAgICAgIGNvbS52ZWV2YS5jbG0ud3JhcFJlc3VsdChcImdldFVUQ2RhdGV0aW1lXCIsIGNhbGxiYWNrLCByZXN1bHQpO1xuICAgICAgICAgIH1cblxuXG4gICAgICAgICAgcmVxdWVzdCA9IFwidmVldmE6Z2V0RGF0YUZvck9iamVjdFYzKFwiICsgb2JqZWN0ICsgXCIpLG9iaklkKFwiICsgcmVjb3JkICsgXCIpLGZpZWxkTmFtZShcIiArIGZpZWxkICsgXCIpLGdldFVUQ2RhdGV0aW1lKHRydWUpLGNhbGxiYWNrKGNvbV92ZWV2YV9jbG1fZ2V0VVRDZGF0ZXRpbWUpXCI7XG4gICAgICAgICAgaWYoIWNvbS52ZWV2YS5jbG0udGVzdE1vZGUpXG4gICAgICAgICAgICAgIGNvbS52ZWV2YS5jbG0ucnVuQVBJUmVxdWVzdChyZXF1ZXN0LCBjYWxsYmFjayk7XG4gICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICBjb21fdmVldmFfY2xtX2dldFVUQ2RhdGV0aW1lKGNvbS52ZWV2YS5jbG0udGVzdFJlc3VsdC5jb21tb24pO1xuXG4gICAgICB9LFxuXG4gICAgICAvLyA5LFxuICAgICAgLy8gVXBkYXRlcyB0aGUgY3VycmVudCByZWNvcmQgcmVsYXRlZCB0byB0aGUgY2FsbFxuICAgICAgLy8gb2JqZWN0IC0gc3BlY2lmaWVzIHRoZSBvYmplY3QgYXBpIG5hbWVcbiAgICAgIC8vIHZhbHVlcyAtIGpzb24gb2JqZWN0IHdpdGggdGhlIGZpZWxkcyBhbmQgdmFsdWVzIHVwZGF0ZWQgb24gdGhlIHJlY29yZCAoaWdub3JlcyBpZCBmaWVsZCBpZiBzcGVjaWZpZWQpXG4gICAgICAvLyBjYWxsYmFjayAtIGNhbGwgYmFjayBmdW5jdGlvbiB3aGljaCB3aWxsIGJlIHVzZWQgdG8gcmV0dXJuIHRoZSBpbmZvcm1hdGlvblxuICAgICAgLy8gVXNlcyBzYXZlT2JqZWN0VjIgY2FsbFxuICAgICAgLy8gTm90ZTogVGhpcyBmdW5jdGlvbiByZXR1cm5zIHN1Y2Nlc3M6IHRydWUgYXMgbG9uZyBhcyB0aGUgdXNlciBoYXMgYWNjZXNzIHRvIHRoZSBvYmplY3QgYW5kIHJlY29yZCBzcGVjaWZpZWQuXG4gICAgICAvLyBJZiB0aGUgdXNlciBkb2VzIG5vdCBoYXZlIGFjY2VzcyB0byBvbmUgb2YgdGhlIGZpZWxkcyBzcGVjaWZpZWQsIHN1Y2Nlc3M6IHRydWUgaXMgc3RpbGwgcmV0dXJuZWQgYW5kIHRoZSBmaWVsZHMgdGhlIHVzZXIgZG9lcyBoYXZlIGFjY2VzcyB0byBhcmUgdXBkYXRlZC5cbiAgICAgIC8vIElmIHRoZXJlIGFyZSBmaWVsZHMgd2hpY2ggYXJlIG5vdCBhY2Nlc3NpYmxlLCBjb2RlIDAyMDAgaXMgcmV0dXJuZWQgYW5kIHRoZSBtZXNzYWdlIHNwZWNpZmllcyB0aGUgZmllbGQgbmFtZXMuXG4gICAgICAvLyBJZiB0aGVyZSBpcyBubyBjdXJyZW50IHJlY29yZCAodXNlciBpcyBpbiBNZWRpYSBQcmV2aWV3KSwgdGhlIGZ1bmN0aW9uIGlzIHRlbXBvcmFyaWx5IHNhdmVkIGFuZCBleGVjdXRlZCB3aGVuIGFuIEFjY291bnQgaXMgc2VsZWN0ZWQuXG4gICAgICAvLyBJZiBubyBBY2NvdW50IGlzIHNlbGVjdGVkLCB0aGUgZnVuY3Rpb24gaXMgZGlzY2FyZGVkIG9uIGV4aXQgb2YgTWVkaWEgUHJldmlldy4gIFRoZSBjYWxsYmFjayBmdW5jdGlvbiB3aWxsIG5vdCBiZSBleGVjdXRlZCBpZiB0aGVyZSBpcyBubyBjdXJyZW50IHJlY29yZC5cbiAgICAgIHVwZGF0ZUN1cnJlbnRSZWNvcmQ6IGZ1bmN0aW9uKG9iamVjdCwgdmFsdWVzLCBjYWxsYmFjaykge1xuICAgICAgICAgIHJldCA9IHRoaXMuY2hlY2tDYWxsYmFja0Z1bmN0aW9uKGNhbGxiYWNrKTtcbiAgICAgICAgICBpZihyZXQuc3VjY2VzcyA9PSBmYWxzZSlcbiAgICAgICAgICAgICAgcmV0dXJuIHJldDtcblxuICAgICAgICAgIC8vIGNoZWNrIGFyZ3VtZW50c1xuICAgICAgICAgIHJldCA9IHRoaXMuY2hlY2tBcmd1bWVudChcIm9iamVjdFwiLCBvYmplY3QpO1xuICAgICAgICAgIGlmKHJldC5zdWNjZXNzID09IGZhbHNlKSB7XG4gICAgICAgICAgICAgIGNvbS52ZWV2YS5jbG0ud3JhcFJlc3VsdChcInVwZGF0ZUN1cnJlbnRSZWNvcmRcIiwgY2FsbGJhY2ssIHJldCk7XG4gICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICByZXQgPSB0aGlzLmNoZWNrQXJndW1lbnQoXCJ2YWx1ZXNcIiwgdmFsdWVzKTtcbiAgICAgICAgICBpZihyZXQuc3VjY2VzcyA9PSBmYWxzZSkge1xuICAgICAgICAgICAgICBjb20udmVldmEuY2xtLndyYXBSZXN1bHQoXCJ1cGRhdGVDdXJyZW50UmVjb3JkXCIsIGNhbGxiYWNrLCByZXQpO1xuICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLy8gY3JlYXRlIHJlY29yZFxuICAgICAgICAgIHJlcXVlc3QgPSBcInZlZXZhOnNhdmVPYmplY3RWMihcIiArIG9iamVjdCArIFwiKSx1cGRhdGVDdXJyZW50UmVjb3JkKCksdmFsdWUoXCIgKyBKU09OLnN0cmluZ2lmeSh2YWx1ZXMpICsgXCIpLGNhbGxiYWNrKGNvbV92ZWV2YV9jbG1fdXBkYXRlQ3VycmVudFJlY29yZClcIjtcblxuICAgICAgICAgIHdpbmRvd1tcImNvbV92ZWV2YV9jbG1fdXBkYXRlQ3VycmVudFJlY29yZFwiXSA9IGZ1bmN0aW9uKHJlc3VsdCkge1xuICAgICAgICAgICAgICByZXN1bHQgPSBjb20udmVldmEuY2xtLmZvcm1hdFJlc3VsdChyZXN1bHQpO1xuICAgICAgICAgICAgICBpZihyZXN1bHQuc3VjY2Vzcykge1xuICAgICAgICAgICAgICAgICAgcmV0ID0ge307XG4gICAgICAgICAgICAgICAgICByZXQuc3VjY2VzcyA9IHRydWU7XG4gICAgICAgICAgICAgICAgICByZXRbb2JqZWN0XSA9IHt9O1xuICAgICAgICAgICAgICAgICAgcmV0W29iamVjdF0uSUQgPSByZXN1bHQub2JqZWN0SWQ7XG4gICAgICAgICAgICAgICAgICBpZihyZXN1bHQuY29kZSAhPSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICByZXQuY29kZSA9IHJlc3VsdC5jb2RlO1xuICAgICAgICAgICAgICAgICAgICAgIHJldC5tZXNzYWdlID0gcmVzdWx0Lm1lc3NhZ2U7XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICBjb20udmVldmEuY2xtLndyYXBSZXN1bHQoXCJ1cGRhdGVDdXJyZW50UmVjb3JkXCIsIGNhbGxiYWNrLCByZXQpO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgcmV0ID0ge307XG4gICAgICAgICAgICAgICAgICByZXQuc3VjY2VzcyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgcmV0LmNvZGUgPSAyMTAwO1xuICAgICAgICAgICAgICAgICAgcmV0Lm1lc3NhZ2UgPSBcIlJlcXVlc3Q6IFwiICsgcmVxdWVzdCArIFwiIGZhaWxlZDogXCIgKyByZXN1bHQubWVzc2FnZTtcbiAgICAgICAgICAgICAgICAgIGNvbS52ZWV2YS5jbG0ud3JhcFJlc3VsdChcInVwZGF0ZUN1cnJlbnRSZWNvcmRcIiwgY2FsbGJhY2ssIHJldCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICB9O1xuXG4gICAgICAgICAgaWYoIWNvbS52ZWV2YS5jbG0udGVzdE1vZGUpXG4gICAgICAgICAgICAgIGNvbS52ZWV2YS5jbG0ucnVuQVBJUmVxdWVzdChyZXF1ZXN0KTtcbiAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgIGNvbV92ZWV2YV9jbG1fdXBkYXRlQ3VycmVudFJlY29yZChjb20udmVldmEuY2xtLnRlc3RSZXN1bHQuY29tbW9uKTtcbiAgICAgIH0sXG5cbiAgICAgIC8vIDEwLFxuICAgICAgLy8gRm9ybWF0cyBhIHN0cmluZyBmb3IgY3JlYXRlUmVjb3Jkc09uRXhpdCgpIGFuZCByZXR1cm5zIGl0XG4gICAgICBmb3JtYXRDcmVhdGVSZWNvcmRzOmZ1bmN0aW9uKG9iamVjdEFycmF5LCB2YWx1ZUFycmF5KSB7XG4gICAgICAgICAgLy9jaGVjayBhcmd1bWVudHNcbiAgICAgICAgICByZXQgPSB0aGlzLmNoZWNrQXJndW1lbnQoXCJvYmplY3RBcnJheVwiLCBvYmplY3RBcnJheSk7XG4gICAgICAgICAgaWYocmV0LnN1Y2Nlc3MgPT0gZmFsc2Upe1xuICAgICAgICAgICAgICByZXR1cm4gcmV0O1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHJldCA9IHRoaXMuY2hlY2tBcmd1bWVudChcInZhbHVlQXJyYXlcIiwgdmFsdWVBcnJheSk7XG4gICAgICAgICAgaWYocmV0LnN1Y2Nlc3MgPT0gZmFsc2Upe1xuICAgICAgICAgICAgICByZXR1cm4gcmV0O1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmICghKG9iamVjdEFycmF5IGluc3RhbmNlb2YgQXJyYXkpKSB7XG4gICAgICAgICAgICAgIG9iamVjdEFycmF5ID0gW29iamVjdEFycmF5XTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKCEodmFsdWVBcnJheSBpbnN0YW5jZW9mIEFycmF5KSkge1xuICAgICAgICAgICAgICB2YWx1ZUFycmF5ID0gW3ZhbHVlQXJyYXldO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIC8vSWYgdGhlIG51bWJlciBvZiBvYmplY3RzIGRvZXNuJ3QgbWF0Y2ggdGhlIG51bWJlciBvZiB2YWx1ZXMsIHJldHVyblxuICAgICAgICAgIHJldCA9IHt9O1xuICAgICAgICAgIGlmIChvYmplY3RBcnJheS5sZW5ndGggIT0gdmFsdWVBcnJheS5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgcmV0LnN1Y2Nlc3MgPSBmYWxzZTtcbiAgICAgICAgICAgICAgcmV0LmNvZGUgPSAyMDAzO1xuICAgICAgICAgICAgICByZXQubWVzc2FnZSA9IFwiUGFyYW1ldGVyIGFycmF5cyBtdXN0IGJlIG9mIGVxdWFsIGxlbmd0aFwiO1xuICAgICAgICAgICAgICByZXR1cm4gcmV0O1xuICAgICAgICAgIH1cblxuICAgICAgICAgIC8vTWFrZSB0aGUgY29uY2F0ZW5hdGlvbiBvZiBhbGwgc2F2ZU9iamVjdFYyIHJlcXVlc3RzIHdlIG5lZWQgdG8gbWFrZVxuICAgICAgICAgIHZhciBmdWxsU3RyaW5nID0gXCJcIjtcbiAgICAgICAgICBmb3IgKHZhciBuZHggPSAwOyBuZHggPCBvYmplY3RBcnJheS5sZW5ndGg7IG5keCsrKSB7XG4gICAgICAgICAgICAgIGZ1bGxTdHJpbmcgPSBmdWxsU3RyaW5nLmNvbmNhdChjb20udmVldmEuY2xtLmdlbmVyYXRlU2F2ZVJlY29yZFJlcXVlc3Qob2JqZWN0QXJyYXlbbmR4XSwgdmFsdWVBcnJheVtuZHhdLCBcIlwiKSArIFwiO1wiKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICByZXR1cm4gZnVsbFN0cmluZztcbiAgICAgIH0sXG5cbiAgICAgIC8vIDExLFxuICAgICAgLy8gRm9ybWF0cyBhIHN0cmluZyBmb3IgdXBkYXRlUmVjb3Jkc09uRXhpdCgpIGFuZCByZXR1cm5zIGl0XG4gICAgICBmb3JtYXRVcGRhdGVSZWNvcmRzOmZ1bmN0aW9uKG9iamVjdE5hbWVBcnJheSwgb2JqZWN0SWRBcnJheSwgdmFsdWVBcnJheSkge1xuICAgICAgICAgIC8vY2hlY2sgYXJndW1lbnRzXG4gICAgICAgICAgcmV0ID0gdGhpcy5jaGVja0FyZ3VtZW50KFwib2JqZWN0TmFtZUFycmF5XCIsIG9iamVjdE5hbWVBcnJheSk7XG4gICAgICAgICAgaWYocmV0LnN1Y2Nlc3MgPT0gZmFsc2Upe1xuICAgICAgICAgICAgICByZXR1cm4gcmV0O1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHJldCA9IHRoaXMuY2hlY2tBcmd1bWVudChcIm9iamVjdElkQXJyYXlcIiwgb2JqZWN0SWRBcnJheSk7XG4gICAgICAgICAgaWYocmV0LnN1Y2Nlc3MgPT0gZmFsc2Upe1xuICAgICAgICAgICAgICByZXR1cm4gcmV0O1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHJldCA9IHRoaXMuY2hlY2tBcmd1bWVudChcInZhbHVlQXJyYXlcIiwgdmFsdWVBcnJheSk7XG4gICAgICAgICAgaWYocmV0LnN1Y2Nlc3MgPT0gZmFsc2Upe1xuICAgICAgICAgICAgICByZXR1cm4gcmV0O1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmICghKG9iamVjdE5hbWVBcnJheSBpbnN0YW5jZW9mIEFycmF5KSkge1xuICAgICAgICAgICAgICBvYmplY3ROYW1lQXJyYXkgPSBbb2JqZWN0TmFtZUFycmF5XTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKCEob2JqZWN0SWRBcnJheSBpbnN0YW5jZW9mIEFycmF5KSkge1xuICAgICAgICAgICAgICBvYmplY3RJZEFycmF5ID0gW29iamVjdElkQXJyYXldO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoISh2YWx1ZUFycmF5IGluc3RhbmNlb2YgQXJyYXkpKSB7XG4gICAgICAgICAgICAgIHZhbHVlQXJyYXkgPSBbdmFsdWVBcnJheV07XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLy9JZiB0aGUgbnVtYmVyIG9mIG9iamVjdHMgZG9lc24ndCBtYXRjaCB0aGUgbnVtYmVyIG9mIHZhbHVlcywgcmV0dXJuXG4gICAgICAgICAgcmV0ID0ge307XG4gICAgICAgICAgaWYgKG9iamVjdE5hbWVBcnJheS5sZW5ndGggIT0gdmFsdWVBcnJheS5sZW5ndGggfHwgb2JqZWN0TmFtZUFycmF5Lmxlbmd0aCAhPSBvYmplY3RJZEFycmF5Lmxlbmd0aCkge1xuICAgICAgICAgICAgICByZXQuc3VjY2VzcyA9IGZhbHNlO1xuICAgICAgICAgICAgICByZXQuY29kZSA9IDIwMDM7XG4gICAgICAgICAgICAgIHJldC5tZXNzYWdlID0gXCJQYXJhbWV0ZXIgYXJyYXlzIG11c3QgYmUgb2YgZXF1YWwgbGVuZ3RoXCI7XG4gICAgICAgICAgICAgIHJldHVybiByZXQ7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLy9NYWtlIHRoZSBjb25jYXRlbmF0aW9uIG9mIGFsbCBzYXZlT2JqZWN0VjIgcmVxdWVzdHMgd2UgbmVlZCB0byBtYWtlXG4gICAgICAgICAgdmFyIGZ1bGxTdHJpbmcgPSBcIlwiO1xuICAgICAgICAgIGZvciAodmFyIG5keCA9IDA7IG5keCA8IG9iamVjdE5hbWVBcnJheS5sZW5ndGg7IG5keCsrKSB7XG4gICAgICAgICAgICAgIC8vU2V0IElkTnVtYmVyIGluIHZhbHVlIGFycmF5XG4gICAgICAgICAgICAgIHZhbHVlQXJyYXlbbmR4XS5JZE51bWJlciA9IG9iamVjdElkQXJyYXlbbmR4XTtcblxuICAgICAgICAgICAgICAvL2NvbmNhdCBzdHJpbmcgdG9nZXRoZXJcbiAgICAgICAgICAgICAgZnVsbFN0cmluZyA9IGZ1bGxTdHJpbmcuY29uY2F0KGNvbS52ZWV2YS5jbG0uZ2VuZXJhdGVTYXZlUmVjb3JkUmVxdWVzdChvYmplY3ROYW1lQXJyYXlbbmR4XSwgdmFsdWVBcnJheVtuZHhdLCBcIlwiKSArIFwiO1wiKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICByZXR1cm4gZnVsbFN0cmluZztcbiAgICAgIH0sXG5cbiAgICAgIC8vIDEyLFxuICAgICAgLy8gQ3JlYXRlcyBhIHN0cmluZyBhcyBpZiBpdCB3YXMgYSByZXF1ZXN0IGZvciB1cGRhdGVDdXJyZW50UmVjb3JkIGFuZCByZXR1cm5zIGl0XG4gICAgICBmb3JtYXRVcGRhdGVDdXJyZW50UmVjb3JkczpmdW5jdGlvbihvYmplY3RBcnJheSwgdmFsdWVBcnJheSkge1xuICAgICAgICAgIC8vY2hlY2sgYXJndW1lbnRzXG4gICAgICAgICAgcmV0ID0gdGhpcy5jaGVja0FyZ3VtZW50KFwib2JqZWN0QXJyYXlcIiwgb2JqZWN0QXJyYXkpO1xuICAgICAgICAgIGlmKHJldC5zdWNjZXNzID09IGZhbHNlKXtcbiAgICAgICAgICAgICAgY29tLnZlZXZhLmNsbS53cmFwUmVzdWx0KFwiZm9ybWF0VXBkYXRlQ3VycmVudFJlY29yZFwiLCBjYWxsYmFjaywgcmV0KTtcbiAgICAgICAgICAgICAgcmV0dXJuIHJldDtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICByZXQgPSB0aGlzLmNoZWNrQXJndW1lbnQoXCJ2YWx1ZUFycmF5XCIsIHZhbHVlQXJyYXkpO1xuICAgICAgICAgIGlmKHJldC5zdWNjZXNzID09IGZhbHNlKXtcbiAgICAgICAgICAgICAgY29tLnZlZXZhLmNsbS53cmFwUmVzdWx0KFwiZm9ybWF0VXBkYXRlQ3VycmVudFJlY29yZFwiLCBjYWxsYmFjaywgcmV0KTtcbiAgICAgICAgICAgICAgcmV0dXJuIHJldDtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAoIShvYmplY3RBcnJheSBpbnN0YW5jZW9mIEFycmF5KSkge1xuICAgICAgICAgICAgICBvYmplY3RBcnJheSA9IFtvYmplY3RBcnJheV07XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmICghKHZhbHVlQXJyYXkgaW5zdGFuY2VvZiBBcnJheSkpIHtcbiAgICAgICAgICAgICAgdmFsdWVBcnJheSA9IFt2YWx1ZUFycmF5XTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICAvL0lmIHRoZSBudW1iZXIgb2Ygb2JqZWN0cyBkb2Vzbid0IG1hdGNoIHRoZSBudW1iZXIgb2YgdmFsdWVzLCByZXR1cm5cbiAgICAgICAgICByZXQgPSB7fTtcbiAgICAgICAgICBpZiAob2JqZWN0QXJyYXkubGVuZ3RoICE9IHZhbHVlQXJyYXkubGVuZ3RoKSB7XG4gICAgICAgICAgICAgIHJldC5zdWNjZXNzID0gZmFsc2U7XG4gICAgICAgICAgICAgIHJldC5jb2RlID0gMjAwMztcbiAgICAgICAgICAgICAgcmV0Lm1lc3NhZ2UgPSBcIlBhcmFtZXRlciBhcnJheXMgbXVzdCBiZSBvZiBlcXVhbCBsZW5ndGhcIjtcbiAgICAgICAgICAgICAgcmV0dXJuIHJldDtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICAvL01ha2UgdGhlIGNvbmNhdGVuYXRpb24gb2YgYWxsIHNhdmVPYmplY3RWMiByZXF1ZXN0cyB3ZSBuZWVkIHRvIG1ha2VcbiAgICAgICAgICB2YXIgZnVsbFN0cmluZyA9IFwiXCI7XG4gICAgICAgICAgZm9yICh2YXIgbmR4ID0gMDsgbmR4IDwgb2JqZWN0QXJyYXkubGVuZ3RoOyBuZHgrKykge1xuICAgICAgICAgICAgICBmdWxsU3RyaW5nID0gZnVsbFN0cmluZy5jb25jYXQoXCJ2ZWV2YTpzYXZlT2JqZWN0VjIoXCIgKyBvYmplY3RBcnJheVtuZHhdICsgXCIpLHVwZGF0ZUN1cnJlbnRSZWNvcmQoKSx2YWx1ZShcIiArIEpTT04uc3RyaW5naWZ5KHZhbHVlQXJyYXlbbmR4XSkgKyBcIiksY2FsbGJhY2soKVwiICsgXCI7XCIpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHJldHVybiBmdWxsU3RyaW5nO1xuICAgICAgfSxcblxuICAgICAgLy8xMyxcbiAgICAgIC8vIEZvcm1hdHMgYSBjcmVhdGVSZWNvcmQgb3IgdXBkYXRlUmVjb3JkIHJlcXVlc3QgaW4gdGhlIHByb3BlciBmb3JtXG4gICAgICBnZW5lcmF0ZVNhdmVSZWNvcmRSZXF1ZXN0OmZ1bmN0aW9uKG9iamVjdCwgdmFsdWVzLCBjYWxsYmFjayl7XG4gICAgICAgICAgcmV0dXJuIFwidmVldmE6c2F2ZU9iamVjdFYyKFwiICsgb2JqZWN0ICsgXCIpLHZhbHVlKFwiICsgSlNPTi5zdHJpbmdpZnkodmFsdWVzKSArIFwiKSxjYWxsYmFjayhcIiArIGNhbGxiYWNrICsgXCIpXCI7XG4gICAgICB9LFxuXG4gICAgICAvLzE0LFxuICAgICAgLy8gUXVlcmllcyBmb3IgYW5kIHJldHVybnMgdGhlIHNwZWNpZmllZCBmaWVsZHMgZm9yIGFsbCByZWNvcmRzIHdoaWNoIG1hdGNoIHRoZSB3aGVyZSBjbGF1c2UuXG4gICAgICAvLyBBbHNvIHJldHVybnMgY291bnQgb2YgcmVjb3JkcyByZXR1cm5lZC5cbiAgICAgIC8vXG4gICAgICAvLyBvYmplY3QgLSBUaGUgQVBJIE5hbWUgb2YgdGhlIG9iamVjdCB0aGF0IHlvdSB3YW50IHRvIHF1ZXJ5XG4gICAgICAvLyBmaWVsZHMgLSBDb21tYSBkZWxpbWl0ZWQgc3RyaW5nIG9mIGZpZWxkIEFQSSBuYW1lc1xuICAgICAgLy9cbiAgICAgIC8vIE9wdGlvbmFsIGZpZWxkczpcbiAgICAgIC8vIHdoZXJlIC0gc3RyaW5nIGZvciB0aGUgd2hlcmUgY2xhdXNlIChTZWUgZG9jdW1lbnRhdGlvbiBmb3Igc3VwcG9ydGVkIGNsYXVzZXMpLlxuICAgICAgLy8gc29ydCAtIEFycmF5IG9mIHN0cmluZ3Mgd2hpY2ggcmVwcmVzZW50cyB0aGUgc29ydCwgZXhhbXBsZTogW1wiTmFtZV92b2RfX2MsIERFU0NcIiwgXCJTdGF0dXNfdm9kX19jLCBBU0NcIl1cbiAgICAgIC8vIGxpbWl0IC0gdGhlIG1heGltdW0gbnVtYmVyIG9mIHJlY29yZHMgdG8gcmV0dXJuXG4gICAgICBxdWVyeVJlY29yZDpmdW5jdGlvbihvYmplY3QsIGZpZWxkcywgd2hlcmUsIHNvcnQsIGxpbWl0LCBjYWxsYmFjayl7XG4gICAgICAgICAgcmV0ID0gdGhpcy5jaGVja0NhbGxiYWNrRnVuY3Rpb24oY2FsbGJhY2spO1xuICAgICAgICAgIGlmKHJldC5zdWNjZXNzID09IGZhbHNlKVxuICAgICAgICAgICAgICByZXR1cm4gcmV0O1xuXG4gICAgICAgICAgLy8gY2hlY2sgYXJndW1lbnRzXG4gICAgICAgICAgcmV0ID0gdGhpcy5jaGVja0FyZ3VtZW50KFwib2JqZWN0XCIsIG9iamVjdCk7XG4gICAgICAgICAgaWYocmV0LnN1Y2Nlc3MgPT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgY29tLnZlZXZhLmNsbS53cmFwUmVzdWx0KFwicXVlcnlSZWNvcmRcIiwgY2FsbGJhY2ssIHJldCk7XG4gICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICByZXQgPSB0aGlzLmNoZWNrQXJndW1lbnQoXCJmaWVsZHNcIiwgZmllbGRzKTtcbiAgICAgICAgICBpZihyZXQuc3VjY2VzcyA9PSBmYWxzZSkge1xuICAgICAgICAgICAgICBjb20udmVldmEuY2xtLndyYXBSZXN1bHQoXCJxdWVyeVJlY29yZFwiLCBjYWxsYmFjaywgcmV0KTtcbiAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIC8vRG9uJ3QgY2hlY2sgdGhlIFdoZXJlLCBsaW1pdCwgb3Igc29ydCBjbGF1c2VzIGJlY2F1c2UgdGhleSBjYW4gYmUgbnVsbCBhbmQgdGhhdHMgYWNjZXB0YWJsZS5cblxuICAgICAgICAgIHdpbmRvd1tcImNvbV92ZWV2YV9jbG1fcXVlcnlSZWNvcmRSZXR1cm5cIl0gPSBmdW5jdGlvbihyZXN1bHQpIHtcbiAgICAgICAgICAgICAgcmVzdWx0ID0gY29tLnZlZXZhLmNsbS5mb3JtYXRSZXN1bHQocmVzdWx0KTtcbiAgICAgICAgICAgICAgY29tLnZlZXZhLmNsbS53cmFwUmVzdWx0KFwicXVlcnlSZWNvcmRcIiwgY2FsbGJhY2ssIHJlc3VsdCk7XG4gICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICByZXF1ZXN0ID0gXCJ2ZWV2YTpxdWVyeU9iamVjdChcIiArIG9iamVjdCArIFwiKSxmaWVsZHMoXCIgKyBmaWVsZHMgKyBcIiksXCI7XG4gICAgICAgICAgaWYgKHdoZXJlICE9IG51bGwgJiYgd2hlcmUgIT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgIHJlcXVlc3QgPSByZXF1ZXN0ICsgXCJ3aGVyZShcIiArIHdoZXJlICsgXCIpLFwiO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoc29ydCAhPSBudWxsICYmIHNvcnQgIT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgIHJlcXVlc3QgPSByZXF1ZXN0ICsgXCJzb3J0KFwiICsgSlNPTi5zdHJpbmdpZnkoc29ydCkgKyBcIiksXCI7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChsaW1pdCAhPSBudWxsICYmIGxpbWl0ICE9IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICByZXF1ZXN0ID0gcmVxdWVzdCArIFwibGltaXQoXCIgKyBsaW1pdCArIFwiKSxcIjtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmVxdWVzdCA9IHJlcXVlc3QgKyBcImNvbV92ZWV2YV9jbG1fcXVlcnlSZWNvcmRSZXR1cm4ocmVzdWx0KVwiO1xuXG4gICAgICAgICAgY29tLnZlZXZhLmNsbS5ydW5BUElSZXF1ZXN0KHJlcXVlc3QsIGNhbGxiYWNrKTtcbiAgICAgIH0sXG5cbiAgICAgIC8vMTUsXG4gICAgICAvLyBSZXR1cm5zIHRoZSB0cmFuc2xhdGVkIGxhYmVsIGZvciBlYWNoIG9mIHRoZSBzcGVjaWZpZWQgZmllbGRzXG4gICAgICAvL1xuICAgICAgLy8gb2JqZWN0IC0gQVBJIE5hbWUgb2YgdGhlIG9iamVjdFxuICAgICAgLy8gZmllbGRzIC0gQXJyYXkgb2YgRmllbGQgQVBJIE5hbWVzXG4gICAgICBnZXRGaWVsZExhYmVsOmZ1bmN0aW9uKG9iamVjdCwgZmllbGRzLCBjYWxsYmFjayl7XG4gICAgICAgICAgcmV0ID0gdGhpcy5jaGVja0NhbGxiYWNrRnVuY3Rpb24oY2FsbGJhY2spO1xuICAgICAgICAgIGlmKHJldC5zdWNjZXNzID09IGZhbHNlKVxuICAgICAgICAgICAgICByZXR1cm4gcmV0O1xuXG4gICAgICAgICAgLy8gY2hlY2sgYXJndW1lbnRzXG4gICAgICAgICAgcmV0ID0gdGhpcy5jaGVja0FyZ3VtZW50KFwib2JqZWN0XCIsIG9iamVjdCk7XG4gICAgICAgICAgaWYocmV0LnN1Y2Nlc3MgPT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgY29tLnZlZXZhLmNsbS53cmFwUmVzdWx0KFwiZ2V0RmllbGRMYWJlbFwiLCBjYWxsYmFjaywgcmV0KTtcbiAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHJldCA9IHRoaXMuY2hlY2tBcmd1bWVudChcImZpZWxkc1wiLCBmaWVsZHMpO1xuICAgICAgICAgIGlmKHJldC5zdWNjZXNzID09IGZhbHNlKSB7XG4gICAgICAgICAgICAgIGNvbS52ZWV2YS5jbG0ud3JhcFJlc3VsdChcImdldEZpZWxkTGFiZWxcIiwgY2FsbGJhY2ssIHJldCk7XG4gICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICB3aW5kb3dbXCJjb21fdmVldmFfY2xtX2dldEZpZWxkTGFiZWxSZXR1cm5cIl0gPSBmdW5jdGlvbihyZXN1bHQpIHtcbiAgICAgICAgICAgICAgcmVzdWx0ID0gY29tLnZlZXZhLmNsbS5mb3JtYXRSZXN1bHQocmVzdWx0KTtcbiAgICAgICAgICAgICAgY29tLnZlZXZhLmNsbS53cmFwUmVzdWx0KFwiZ2V0RmllbGRMYWJlbFwiLCBjYWxsYmFjaywgcmVzdWx0KTtcbiAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHJlcXVlc3QgPSBcInZlZXZhOmdldEZpZWxkTGFiZWwoXCIgKyBvYmplY3QgKyBcIiksZmllbGRzKFwiICsgSlNPTi5zdHJpbmdpZnkoZmllbGRzKSArIFwiKSwgY29tX3ZlZXZhX2NsbV9nZXRGaWVsZExhYmVsUmV0dXJuKHJlc3VsdClcIjtcbiAgICAgICAgICBjb20udmVldmEuY2xtLnJ1bkFQSVJlcXVlc3QocmVxdWVzdCwgY2FsbGJhY2spO1xuICAgICAgfSxcblxuICAgICAgLy8xNixcbiAgICAgIC8vIFJldHVybnMgZWFjaCByZWNvcmQgdHlwZSBhcGkgbmFtZSBhbmQgcmVjb3JkIHR5cGUgdHJhbnNsYXRlZCBsYWJlbFxuICAgICAgLy9cbiAgICAgIC8vIG9iamVjdCAtIEFQSSBOYW1lIG9mIHRoZSBvYmplY3QgdG8gZ2V0IGFsbCByZWNvcmQgdHlwZXMgZm9yXG4gICAgICBnZXRSZWNvcmRUeXBlTGFiZWxzOmZ1bmN0aW9uKG9iamVjdCwgY2FsbGJhY2spe1xuICAgICAgICAgIHJldCA9IHRoaXMuY2hlY2tDYWxsYmFja0Z1bmN0aW9uKGNhbGxiYWNrKTtcbiAgICAgICAgICBpZihyZXQuc3VjY2VzcyA9PSBmYWxzZSlcbiAgICAgICAgICAgICAgcmV0dXJuIHJldDtcblxuICAgICAgICAgIC8vIGNoZWNrIGFyZ3VtZW50c1xuICAgICAgICAgIHJldCA9IHRoaXMuY2hlY2tBcmd1bWVudChcIm9iamVjdFwiLCBvYmplY3QpO1xuICAgICAgICAgIGlmKHJldC5zdWNjZXNzID09IGZhbHNlKSB7XG4gICAgICAgICAgICAgIGNvbS52ZWV2YS5jbG0ud3JhcFJlc3VsdChcImdldFJlY29yZFR5cGVMYWJlbHNcIiwgY2FsbGJhY2ssIHJldCk7XG4gICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICB3aW5kb3dbXCJjb21fdmVldmFfY2xtX2dldFJlY29yZFR5cGVMYWJlbHNSZXR1cm5cIl0gPSBmdW5jdGlvbihyZXN1bHQpIHtcbiAgICAgICAgICAgICAgcmVzdWx0ID0gY29tLnZlZXZhLmNsbS5mb3JtYXRSZXN1bHQocmVzdWx0KTtcbiAgICAgICAgICAgICAgY29tLnZlZXZhLmNsbS53cmFwUmVzdWx0KFwiZ2V0UmVjb3JkVHlwZUxhYmVsc1wiLCBjYWxsYmFjaywgcmVzdWx0KTtcbiAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHJlcXVlc3QgPSBcInZlZXZhOmdldFJlY29yZFR5cGVMYWJlbHMoXCIgKyBvYmplY3QgKyBcIiksY29tX3ZlZXZhX2NsbV9nZXRSZWNvcmRUeXBlTGFiZWxzUmV0dXJuKHJlc3VsdClcIjtcbiAgICAgICAgICBjb20udmVldmEuY2xtLnJ1bkFQSVJlcXVlc3QocmVxdWVzdCwgY2FsbGJhY2spO1xuICAgICAgfSxcblxuICAgICAgLy8xNyxcbiAgICAgIC8vIFJldHVybnMgdGhlIHRyYW5zbGF0ZWQgbGFiZWwgZm9yIGVhY2ggb2YgdGhlIHBpY2tsaXN0IHZhbHVlcyBvZiB0aGUgc3BlY2lmaWVkIGZpZWxkXG4gICAgICAvL1xuICAgICAgLy8gb2JqZWN0IC0gQVBJIE5hbWUgb2YgdGhlIG9iamVjdFxuICAgICAgLy8gZmllbGQgLSBBUEkgTmFtZSBvZiB0aGUgcGlja2xpc3QgZmllbGRcbiAgICAgIGdldFBpY2tsaXN0VmFsdWVMYWJlbHM6ZnVuY3Rpb24ob2JqZWN0LCBmaWVsZCwgY2FsbGJhY2spe1xuICAgICAgICAgIHJldCA9IHRoaXMuY2hlY2tDYWxsYmFja0Z1bmN0aW9uKGNhbGxiYWNrKTtcbiAgICAgICAgICBpZihyZXQuc3VjY2VzcyA9PSBmYWxzZSlcbiAgICAgICAgICAgICAgcmV0dXJuIHJldDtcblxuICAgICAgICAgIC8vIGNoZWNrIGFyZ3VtZW50c1xuICAgICAgICAgIHJldCA9IHRoaXMuY2hlY2tBcmd1bWVudChcIm9iamVjdFwiLCBvYmplY3QpO1xuICAgICAgICAgIGlmKHJldC5zdWNjZXNzID09IGZhbHNlKSB7XG4gICAgICAgICAgICAgIGNvbS52ZWV2YS5jbG0ud3JhcFJlc3VsdChcImdldFBpY2tsaXN0VmFsdWVMYWJlbHNcIiwgY2FsbGJhY2ssIHJldCk7XG4gICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICByZXQgPSB0aGlzLmNoZWNrQXJndW1lbnQoXCJmaWVsZFwiLCBmaWVsZCk7XG4gICAgICAgICAgaWYocmV0LnN1Y2Nlc3MgPT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgY29tLnZlZXZhLmNsbS53cmFwUmVzdWx0KFwiZ2V0UGlja2xpc3RWYWx1ZUxhYmVsc1wiLCBjYWxsYmFjaywgcmV0KTtcbiAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHdpbmRvd1tcImNvbV92ZWV2YV9jbG1fZ2V0UGlja2xpc3RWYWx1ZUxhYmVsc1JldHVyblwiXSA9IGZ1bmN0aW9uKHJlc3VsdCkge1xuICAgICAgICAgICAgICByZXN1bHQgPSBjb20udmVldmEuY2xtLmZvcm1hdFJlc3VsdChyZXN1bHQpO1xuICAgICAgICAgICAgICBjb20udmVldmEuY2xtLndyYXBSZXN1bHQoXCJnZXRQaWNrbGlzdFZhbHVlTGFiZWxzXCIsIGNhbGxiYWNrLCByZXN1bHQpO1xuICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcmVxdWVzdCA9IFwidmVldmE6Z2V0UGlja2xpc3RWYWx1ZUxhYmVscyhcIiArIG9iamVjdCArIFwiKSxmaWVsZChcIiArIGZpZWxkICsgXCIpLCBjb21fdmVldmFfY2xtX2dldFBpY2tsaXN0VmFsdWVMYWJlbHNSZXR1cm4ocmVzdWx0KVwiO1xuICAgICAgICAgIGNvbS52ZWV2YS5jbG0ucnVuQVBJUmVxdWVzdChyZXF1ZXN0LCBjYWxsYmFjayk7XG4gICAgICB9LFxuXG4gICAgICAvLzE4LFxuICAgICAgLy8gUmV0dXJucyBvYmplY3QgdHJhbnNsYXRlZCBsYWJlbHMgYXJyYXkgZm9yIGVhY2ggb2JqZWN0IEFQSSBuYW1lXG4gICAgICAvLyBvYmplY3RzIC0gYXJyYXkgb2Ygb2JqZWN0IEFQSSBOYW1lcyB0byBnZXQgdHJhbnNsYXRlZCBsYWJlbHMgZm9yXG4gICAgICBnZXRPYmplY3RMYWJlbHM6ZnVuY3Rpb24ob2JqZWN0cywgY2FsbGJhY2spe1xuICAgICAgICAgIHZhciByZXQgPSB0aGlzLmNoZWNrQ2FsbGJhY2tGdW5jdGlvbihjYWxsYmFjayk7XG4gICAgICAgICAgaWYocmV0LnN1Y2Nlc3MgPT0gZmFsc2UpXG4gICAgICAgICAgICAgIHJldHVybiByZXQ7XG5cbiAgICAgICAgICAvLyBjaGVjayBhcmd1bWVudHNcbiAgICAgICAgICByZXQgPSB0aGlzLmNoZWNrQXJndW1lbnQoXCJvYmplY3RzXCIsIG9iamVjdHMpO1xuICAgICAgICAgIGlmKHJldC5zdWNjZXNzID09IGZhbHNlKSB7XG4gICAgICAgICAgICAgIGNvbS52ZWV2YS5jbG0ud3JhcFJlc3VsdChcImdldE9iamVjdExhYmVsc1wiLCBjYWxsYmFjaywgcmV0KTtcbiAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHdpbmRvd1tcImNvbV92ZWV2YV9jbG1fZ2V0T2JqZWN0TGFiZWxzUmV0dXJuXCJdID0gZnVuY3Rpb24ocmVzdWx0KSB7XG4gICAgICAgICAgICAgIHJlc3VsdCA9IGNvbS52ZWV2YS5jbG0uZm9ybWF0UmVzdWx0KHJlc3VsdCk7XG4gICAgICAgICAgICAgIGNvbS52ZWV2YS5jbG0ud3JhcFJlc3VsdChcImdldE9iamVjdExhYmVsc1wiLCBjYWxsYmFjaywgcmVzdWx0KTtcbiAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHJlcXVlc3QgPSBcInZlZXZhOmdldE9iamVjdExhYmVscyhcIiArIEpTT04uc3RyaW5naWZ5KG9iamVjdHMpICsgXCIpLGNvbV92ZWV2YV9jbG1fZ2V0T2JqZWN0TGFiZWxzUmV0dXJuKHJlc3VsdClcIjtcbiAgICAgICAgICBjb20udmVldmEuY2xtLnJ1bkFQSVJlcXVlc3QocmVxdWVzdCwgY2FsbGJhY2spO1xuICAgICAgfSxcblxuICAgICAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8gQ0xNIFNwZWNpZmljIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4gICAgICAvLzEsXG4gICAgICAvLyBTaG93cyBzbGlkZSBzZWxlY3RvciB3aXRoIHNwZWNpZmllZCBwcmVzZW50YXRpb246a2V5IG1lc3NhZ2VzOyBjYWxsYmFjayBnZXRzIG5vdGlmaWVkIGlmIHRoZXJlIGFyZW4ndCBhbnkgdmFsaWQga2V5IG1lc3NhZ2VzXG4gICAgICAvLyBUaGUgc2VsZWN0b3Igc2hvd3MgcHJlc2VudGF0aW9ucyBpbiB0aGUgc2FtZSBvcmRlciBhcyByZXF1ZXN0ZWQsIGJ1dCBzbGlkZSBhcmUgaW4gdGhlIG9yZGVyIGFzIGRlZmluZWQgaW4gdGhlIHByZXNlbnRhdGlvbixcbiAgICAgIC8vIG5vdCB0aGUgb3JkZXIgc3BlY2lmaWVkIGluIHRoZSByZXF1ZXN0LlxuICAgICAgbGF1bmNoU2VsZWN0b3I6IGZ1bmN0aW9uKHByZXNlbnRhdGlvblNsaWRlcywgY2FsbGJhY2spIHtcbiAgICAgICAgICAvLyBjaGVjayBwYXJhbWV0ZXJcbiAgICAgICAgICB2YXIgcmV0ID0gdGhpcy5jaGVja0NhbGxiYWNrRnVuY3Rpb24oY2FsbGJhY2spO1xuICAgICAgICAgIGlmKHJldC5zdWNjZXNzID09IGZhbHNlKVxuICAgICAgICAgICAgICByZXR1cm4gcmV0O1xuXG4gICAgICAgICAgLy8gY2hlY2sgYXJndW1lbnRzXG4gICAgICAgICAgcmV0ID0gdGhpcy5jaGVja0FyZ3VtZW50KFwicHJlc2VudGF0aW9uU2xpZGVzXCIsIHByZXNlbnRhdGlvblNsaWRlcyk7XG4gICAgICAgICAgaWYocmV0LnN1Y2Nlc3MgPT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgY29tLnZlZXZhLmNsbS53cmFwUmVzdWx0KFwicHJlc2VudGF0aW9uU2xpZGVzXCIsIGNhbGxiYWNrLCByZXQpO1xuICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYocHJlc2VudGF0aW9uU2xpZGVzLmNvbnN0cnVjdG9yID09PSBBcnJheSl7XG4gICAgICAgICAgICAgIC8vIGNoZWNrIGVhY2ggZWxlbWVudCBmb3IgZW1wdHkgcHJlc2VudGF0aW9uIGlkXG4gICAgICAgICAgICAgIGZvcih2YXIgaT0wOyBpIDwgcHJlc2VudGF0aW9uU2xpZGVzLmxlbmd0aDsgaSsrKXtcbiAgICAgICAgICAgICAgICAgIHZhciBwcmVzZW50YXRpb25NZXNzYWdlcyA9IHByZXNlbnRhdGlvblNsaWRlc1tpXVxuICAgICAgICAgICAgICAgICAgaWYocHJlc2VudGF0aW9uTWVzc2FnZXMgIT0gbnVsbCAmJiB0eXBlb2YocHJlc2VudGF0aW9uTWVzc2FnZXMpID09PSAnb2JqZWN0Jyl7XG4gICAgICAgICAgICAgICAgICAgICAgZm9yKHZhciBwcm9wIGluIHByZXNlbnRhdGlvbk1lc3NhZ2VzKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgaWYocHJlc2VudGF0aW9uTWVzc2FnZXMuaGFzT3duUHJvcGVydHkocHJvcCkgJiYgcHJvcCA9PSBcIlwiKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGVtcHR5IHByZXNlbnRhc3Rpb24gaWRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldCA9IHt9O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0LnN1Y2Nlc3MgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldC5jb2RlID0gMjAwMjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldC5tZXNzYWdlID0gXCJwcmVzZW50YXRpb24gaWQgaXMgZW1wdHlcIjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbS52ZWV2YS5jbG0ud3JhcFJlc3VsdChcInByZXNlbnRhdGlvblNsaWRlc1wiLCBjYWxsYmFjaywgcmV0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgdmFyIHJlcXVlc3QgPSBudWxsO1xuICAgICAgICAgIHdpbmRvd1tcImNvbV92ZWV2YV9jbG1fbGF1bmNoQXBwcm92ZWRFbWFpbFwiXSA9IGZ1bmN0aW9uKHJlc3VsdCkge1xuICAgICAgICAgICAgICByZXN1bHQgPSBjb20udmVldmEuY2xtLmZvcm1hdFJlc3VsdChyZXN1bHQpO1xuICAgICAgICAgICAgICB2YXIgcmV0ID0ge307XG4gICAgICAgICAgICAgIGlmKHJlc3VsdC5zdWNjZXNzKSB7XG4gICAgICAgICAgICAgICAgICByZXQuc3VjY2VzcyA9IHRydWU7XG4gICAgICAgICAgICAgICAgICBpZihyZXN1bHQuY29kZSAhPSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICByZXQuY29kZSA9IHJlc3VsdC5jb2RlO1xuICAgICAgICAgICAgICAgICAgICAgIHJldC5tZXNzYWdlID0gcmVzdWx0Lm1lc3NhZ2U7XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICBjb20udmVldmEuY2xtLndyYXBSZXN1bHQoXCJsYXVuY2hTZWxlY3RvclwiLCBjYWxsYmFjaywgcmV0KTtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgIHJldC5zdWNjZXNzID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICByZXQuY29kZSA9IHJlc3VsdC5jb2RlO1xuICAgICAgICAgICAgICAgICAgcmV0Lm1lc3NhZ2UgPSBcIlJlcXVlc3Q6IFwiICsgcmVxdWVzdCArIFwiIGZhaWxlZDogXCIgKyByZXN1bHQubWVzc2FnZTtcbiAgICAgICAgICAgICAgICAgIGNvbS52ZWV2YS5jbG0ud3JhcFJlc3VsdChcImxhdW5jaFNlbGVjdG9yXCIsIGNhbGxiYWNrLCByZXQpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgfTtcblxuICAgICAgICAgIHJlcXVlc3QgPSBcInZlZXZhOmxhdW5jaFNlbGVjdG9yKFwiICsgSlNPTi5zdHJpbmdpZnkocHJlc2VudGF0aW9uU2xpZGVzKSArIFwiKSxjYWxsYmFjayhjb21fdmVldmFfY2xtX2xhdW5jaFNlbGVjdG9yKVwiO1xuXG4gICAgICAgICAgaWYoIWNvbS52ZWV2YS5jbG0udGVzdE1vZGUpXG4gICAgICAgICAgICAgIGNvbS52ZWV2YS5jbG0ucnVuQVBJUmVxdWVzdChyZXF1ZXN0KTtcbiAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgIGNvbV92ZWV2YV9jbG1fbGF1bmNoU2VsZWN0b3IoY29tLnZlZXZhLmNsbS50ZXN0UmVzdWx0LmxhdW5jaFNlbGVjdG9yUmVzdWx0KTtcblxuICAgICAgfSxcblxuICAgICAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8gRW5nYWdlIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cbiAgICAgIC8vIDEsXG4gICAgICAvLyBDcmVhdGVzIGEgbmV3IHJlY29yZCBmb3IgTXVsdGljaGFubmVsIGFjdGl2aXR5IGxpbmUuICBUaGUgRW5nYWdlIGNvZGUgd2lsbCBhdXRvbWF0aWNhbGx5IGZpbGwgaW4gdGhlIE11bHRpY2hhbm5lbCBBY3Rpdml0eSxcbiAgICAgIC8vIEFzc2V0IFZlcnNpb24sIEFzc2V0IFZFeHRlcm5hbCBJRCwgQ2FsbCAoaWYgdGhlcmUgaXMgb25lKSwgRGF0ZVRpbWUsIERlYnVnPywgTXVsdGljaGFubmVsIENvbnRlbnQsIE11bHRpY2hhbm5lbCBDb250ZW50IEFzc2V0LFxuICAgICAgLy8gU2VudCBFbWFpbCAoaWYgdGhlcmUgaXMgb25lKSwgVmlldyBPcmRlciAoaWYgRXZlbnQgVHlwZSA9IFNsaWRlIFZpZXcpLiAgQ3VzdG9tID0gXCJUcnVlXCIgd2lsbCBhbHdheXMgYmUgc2V0IGFuZCB0aGUgTmFtZSBpcyBhdXRvbnVtYmVyZWQuXG4gICAgICAvLyBJZiBub3Qgc3BlY2lmaWVkIHdpdGggY3VzdG9tIHZhbHVlcywgRGV0YWlsIEdyb3VwLCBEZXRhaWwgR3JvdXAgVkV4dGVybmFsIElkLCBLZXkgTWVzc2FnZSwgS2V5IE1lc3NhZ2UgVkV4dGVybmFsIElELCBQcm9kdWN0LFxuICAgICAgLy8gUHJvZHVjdCBWRXh0ZXJuYWwgSUQgYXJlIGFsc28gYXV0b21hdGljYWxseSBmaWxsZWQgaW4uXG4gICAgICAvLyB2YWx1ZXMgLSBqc29uIG9iamVjdCB3aXRoIHRoZSBmaWVsZHMgYW5kIHZhbHVlcyB1cGRhdGVkIG9uIHRoZSByZWNvcmRcbiAgICAgIC8vIGNhbGxiYWNrIC0gY2FsbCBiYWNrIGZ1bmN0aW9uIHdoaWNoIHdpbGwgYmUgdXNlZCB0byByZXR1cm4gdGhlIGluZm9ybWF0aW9uXG4gICAgICBjcmVhdGVNdWx0aWNoYW5uZWxBY3Rpdml0eUxpbmU6IGZ1bmN0aW9uKHZhbHVlcywgY2FsbGJhY2spIHtcbiAgICAgICAgICByZXQgPSB0aGlzLmNoZWNrQ2FsbGJhY2tGdW5jdGlvbihjYWxsYmFjayk7XG4gICAgICAgICAgaWYocmV0LnN1Y2Nlc3MgPT0gZmFsc2UpXG4gICAgICAgICAgICAgIHJldHVybiByZXQ7XG5cbiAgICAgICAgICByZXQgPSB0aGlzLmNoZWNrQXJndW1lbnQoXCJ2YWx1ZXNcIiwgdmFsdWVzKTtcbiAgICAgICAgICBpZihyZXQuc3VjY2VzcyA9PSBmYWxzZSkge1xuICAgICAgICAgICAgICBjb20udmVldmEuY2xtLndyYXBSZXN1bHQoXCJjcmVhdGVNdWx0aWNoYW5uZWxBY3Rpdml0eUxpbmVcIiwgY2FsbGJhY2ssIHJldCk7XG4gICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICB3aW5kb3dbXCJjb21fdmVldmFfY2xtX2NyZWF0ZUFjdGl2aXR5TGluZVwiXSA9IGZ1bmN0aW9uKHJlc3VsdCkge1xuICAgICAgICAgICAgICBjb20udmVldmEuY2xtLndyYXBSZXN1bHQoXCJjcmVhdGVNdWx0aWNoYW5uZWxBY3Rpdml0eUxpbmVcIiwgY2FsbGJhY2ssIHJlc3VsdCk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcmVxdWVzdCA9IFwidmVldmE6Y3JlYXRlQWN0aXZpdHlMaW5lKCksdmFsdWUoXCIgKyBKU09OLnN0cmluZ2lmeSh2YWx1ZXMpICsgXCIpLGNvbV92ZWV2YV9jbG1fY3JlYXRlQWN0aXZpdHlMaW5lKHJlc3VsdClcIjtcbiAgICAgICAgICBjb20udmVldmEuY2xtLnJ1bkFQSVJlcXVlc3QocmVxdWVzdCwgY2FsbGJhY2spO1xuICAgICAgfSxcblxuICAgICAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8gU3VwcG9ydGluZyBGdW5jdGlvbnMgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblxuICAgICAgLy8gam9pbiBzdHJpbmcgYXJyYXkgdG8gYSBpbiBleHByZXNzaW9uXG4gICAgICBqb2luU3RyaW5nQXJyYXlGb3JJbjogZnVuY3Rpb24ocmVzdWx0KSB7XG4gICAgICAgICAgdmFyIHJldCA9IFwiXCI7XG4gICAgICAgICAgaWYocmVzdWx0Lmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgZm9yKGkgPSAwOyBpIDwgcmVzdWx0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICBpZihpID09IDApXG4gICAgICAgICAgICAgICAgICAgICAgcmV0ICs9IFwie1xcXCJcIiArIHJlc3VsdFtpXSArIFwiXFxcIlwiO1xuICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgcmV0ICs9IFwiLFxcXCJcIiArIHJlc3VsdFtpXSArIFwiXFxcIlwiO1xuICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgcmV0ICs9IFwifVwiO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHJldHVybiByZXQ7XG4gICAgICB9LFxuXG4gICAgICBqb2luRmllbGRBcnJheTogZnVuY3Rpb24oZmllbGRzKSB7XG4gICAgICAgICAgdmFyIHJldCA9IFwiXCI7XG4gICAgICAgICAgaWYoZmllbGRzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgZm9yKGkgPSAwOyBpIDwgZmllbGRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICBpZihpID09IDApXG4gICAgICAgICAgICAgICAgICAgICAgcmV0ICs9IGZpZWxkc1tpXTtcbiAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgIHJldCArPSBcIixcIiArIGZpZWxkc1tpXTtcbiAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcmV0dXJuIHJldDtcbiAgICAgIH0sXG5cbiAgICAgIGlzRnVuY3Rpb246IGZ1bmN0aW9uKHRvQ2hlY2spIHtcbiAgICAgICAgICB2YXIgZ2V0VHlwZSA9IHt9O1xuICAgICAgICAgIHJldHVybiB0b0NoZWNrICYmIGdldFR5cGUudG9TdHJpbmcuY2FsbCh0b0NoZWNrKSA9PT0gJ1tvYmplY3QgRnVuY3Rpb25dJztcbiAgICAgIH0sXG5cbiAgICAgIGNoZWNrQ2FsbGJhY2tGdW5jdGlvbjogZnVuY3Rpb24odG9DaGVjaykge1xuICAgICAgICAgIC8vIGNoZWNrIGFyZ3VtZW50c1xuICAgICAgICAgIHJldCA9IHt9O1xuICAgICAgICAgIGlmKHRvQ2hlY2sgPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgIHJldC5zdWNjZXNzID0gZmFsc2U7XG4gICAgICAgICAgICAgIHJldC5jb2RlID0gMjAwMFxuICAgICAgICAgICAgICByZXQubWVzc2FnZSA9IFwiY2FsbGJhY2sgaXMgbWlzc2luZ1wiO1xuICAgICAgICAgICAgICByZXR1cm4gcmV0O1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmKHRoaXMuaXNGdW5jdGlvbih0b0NoZWNrKSA9PSBmYWxzZSkge1xuICAgICAgICAgICAgICByZXQuc3VjY2VzcyA9IGZhbHNlO1xuICAgICAgICAgICAgICByZXQuY29kZSA9IDIwMDE7XG4gICAgICAgICAgICAgIHJldC5tZXNzYWdlID0gXCJjYWxsYmFjayBpcyBub3QgYSBKYXZhU2NyaXB0IGZ1bmN0aW9uXCI7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgcmV0LnN1Y2Nlc3MgPSB0cnVlO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHJldHVybiByZXQ7XG4gICAgICB9LFxuXG4gICAgICBjaGVja0FyZ3VtZW50OiBmdW5jdGlvbihuYW1lLCB2YWx1ZSkge1xuICAgICAgICAgIHJldCA9IHt9O1xuICAgICAgICAgIHJldC5zdWNjZXNzID0gdHJ1ZTtcbiAgICAgICAgICBpZih2YWx1ZSA9PSB1bmRlZmluZWQgfHwgdmFsdWUgPT0gbnVsbCB8fCB2YWx1ZSA9PSBcIlwiKSB7XG4gICAgICAgICAgICAgIHJldC5zdWNjZXNzID0gZmFsc2U7XG4gICAgICAgICAgICAgIHJldC5jb2RlID0gMjAwMjtcbiAgICAgICAgICAgICAgcmV0Lm1lc3NhZ2UgPSBuYW1lICsgXCIgaXMgZW1wdHlcIjtcbiAgICAgICAgICB9XG5cblxuICAgICAgICAgIHJldHVybiByZXQ7XG4gICAgICB9LFxuXG4gICAgICBnZXRDdXJyZW50RGF0ZTogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgdmFyIGN1cnJlbnREYXRlID0gbmV3IERhdGUoKTtcbiAgICAgICAgICBkYXRlU3RyaW5nID0gY3VycmVudERhdGUuZ2V0RnVsbFllYXIoKS50b1N0cmluZygpO1xuICAgICAgICAgIG1vbnRoID0gY3VycmVudERhdGUuZ2V0TW9udGgoKSArIDE7XG4gICAgICAgICAgaWYobW9udGggPCAxMCkge1xuICAgICAgICAgICAgICBkYXRlU3RyaW5nICs9IFwiLTBcIiArIG1vbnRoO1xuICAgICAgICAgIH1cbiAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgZGF0ZVN0cmluZyArPSBcIi1cIiArIG1vbnRoO1xuICAgICAgICAgIH1cbiAgICAgICAgICBkYXRlID0gY3VycmVudERhdGUuZ2V0RGF0ZSgpO1xuICAgICAgICAgIGlmKGRhdGUgPCAxMCkge1xuICAgICAgICAgICAgICBkYXRlU3RyaW5nICs9IFwiLTBcIiArIGRhdGU7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgZGF0ZVN0cmluZyArPSBcIi1cIiArIGRhdGU7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcmV0dXJuIGRhdGVTdHJpbmc7XG4gICAgICB9LFxuXG4gICAgICBmb3JtYXRSZXN1bHQ6IGZ1bmN0aW9uKHJlc3VsdCkge1xuICAgICAgICAgIGlmKGNvbS52ZWV2YS5jbG0uaXNXaW44KCkpIHtcbiAgICAgICAgICAgICAgaWYodHlwZW9mIHJlc3VsdCA9PSBcInN0cmluZ1wiKSB7XG4gICAgICAgICAgICAgICAgICByZXN1bHQgPSBldmFsKFwiKFwiICsgcmVzdWx0ICsgXCIpXCIpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICB9LFxuXG4gICAgICB3cmFwUmVzdWx0OiBmdW5jdGlvbihhcGlOYW1lLCB1c2VyQ2FsbGJhY2ssIHJlc3VsdCkge1xuICAgICAgICAgIHJlc3VsdCA9IGNvbS52ZWV2YS5jbG0uZm9ybWF0UmVzdWx0KHJlc3VsdCk7XG4gICAgICAgICAgaWYocmVzdWx0LnN1Y2Nlc3MpXG4gICAgICAgICAgICAgIHVzZXJDYWxsYmFjayhyZXN1bHQpO1xuICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICByZXN1bHQubWVzc2FnZSA9IGFwaU5hbWUgKyBcIjogXCIgKyByZXN1bHQubWVzc2FnZTtcbiAgICAgICAgICAgICAgdXNlckNhbGxiYWNrKHJlc3VsdCk7XG4gICAgICAgICAgfVxuICAgICAgfSxcblxuICAgICAgcnVuQVBJUmVxdWVzdDogZnVuY3Rpb24ocmVxdWVzdCwgY2FsbGJhY2spIHtcbiAgICAgICAgICBpZihjb20udmVldmEuY2xtLmlzRW5nYWdlKCkpIHtcbiAgICAgICAgICAgICAgY29tLnZlZXZhLmNsbS5lbmdhZ2VBUElSZXF1ZXN0KHJlcXVlc3QsIGNhbGxiYWNrKTtcbiAgICAgICAgICB9IGVsc2UgaWYoY29tLnZlZXZhLmNsbS5pc1dpbjgoKSkge1xuICAgICAgICAgICAgICB3aW5kb3cuZXh0ZXJuYWwubm90aWZ5KHJlcXVlc3QpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgLy9SZW1vdmUgdGhlIHZlZXZhOiBwcmVmaXgsIGVuY29kZSB0aGUgcmVtYWluaW5nIHJlcXVlc3QsIGFuZCBhZGQgdmVldmE6IGJhY2suXG4gICAgICAgICAgICAgIC8vVGhpcyB3b3JrcyB3aXRoIGEgYmFzaWMgcmVwbGFjZSBiZWNhdXNlIHdlIG9ubHkgcnVuIE9ORSByZXF1ZXN0IGhlcmUuXG4gICAgICAgICAgICAgIHJlcXVlc3QgPSByZXF1ZXN0LnJlcGxhY2UoL152ZWV2YTovLCAnJyk7XG4gICAgICAgICAgICAgIHJlcXVlc3QgPSBlbmNvZGVVUklDb21wb25lbnQocmVxdWVzdCk7XG4gICAgICAgICAgICAgIHJlcXVlc3QgPSBcInZlZXZhOlwiICsgcmVxdWVzdDtcbiAgICAgICAgICAgICAgZG9jdW1lbnQubG9jYXRpb24gPSByZXF1ZXN0O1xuICAgICAgICAgIH1cbiAgICAgIH0sXG5cbiAgICAgIGlzV2luODogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgaWYobmF2aWdhdG9yLnBsYXRmb3JtLnRvTG93ZXJDYXNlKCkuaW5kZXhPZihcIndpblwiKSA+PSAwKVxuICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH0sXG5cblxuICAgICAgaXNFbmdhZ2U6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIGlmKHdpbmRvdy5zZWxmICE9PSB3aW5kb3cudG9wKSB7XG4gICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9LFxuXG4gICAgICBlbmdhZ2VBUElSZXF1ZXN0OiBmdW5jdGlvbihyZXF1ZXN0LCBjYWxsYmFjaykge1xuICAgICAgICAgIGlmKGNvbS52ZWV2YS5jbG0uZW5nYWdlSGFzTGlzdGVuZXIgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgIGNvbS52ZWV2YS5jbG0uZW5nYWdlSGFzTGlzdGVuZXIgPSB0cnVlO1xuICAgICAgICAgICAgICBjb20udmVldmEuY2xtLmVuZ2FnZUNhbGxiYWNrSWQgPSAwO1xuICAgICAgICAgICAgICBmdW5jdGlvbiByZWNlaXZlTWVzc2FnZShldmVudCkge1xuICAgICAgICAgICAgICAgICAgdmFyIGRhdGEgPSBKU09OLnBhcnNlKGV2ZW50LmRhdGEpO1xuICAgICAgICAgICAgICAgICAgdmFyIGNhbGxiYWNrSWQgPSBkYXRhLmNhbGxiYWNrO1xuICAgICAgICAgICAgICAgICAgaWYoY2FsbGJhY2tJZCAhPT0gdW5kZWZpbmVkICYmIGNhbGxiYWNrSWQgIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgICB2YXIgY2FsbGJhY2tGdW5jID0gY29tLnZlZXZhLmNsbS5lbmdhZ2VDYWxsYmFja0xpc3RbY2FsbGJhY2tJZF07XG4gICAgICAgICAgICAgICAgICAgICAgaWYoY2FsbGJhY2tGdW5jICE9PSB1bmRlZmluZWQgJiYgY2FsbGJhY2tGdW5jICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrRnVuYy5jYWxsKG51bGwsIGRhdGEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBkb24ndCB3YW50IHRvIHNwbGljZSBiZWNhdXNlIHRoYXQgd291bGQgY2hhbmdlIHRoZSBsZW5ndGhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gb2YgdGhlIGFycmF5IGFuZCBjb3VsZCBhZmZlY3QgdGhlIGluZGV4IGJhc2VkIGFjY2Vzc1xuICAgICAgICAgICAgICAgICAgICAgICAgICBkZWxldGUgY29tLnZlZXZhLmNsbS5lbmdhZ2VDYWxsYmFja0xpc3RbY2FsbGJhY2tJZF07XG4gICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgaWYoIXdpbmRvdy5hZGRFdmVudExpc3RlbmVyKSB7XG4gICAgICAgICAgICAgICAgICB3aW5kb3cuYXR0YWNoRXZlbnQoXCJvbm1lc3NhZ2VcIiwgcmVjZWl2ZU1lc3NhZ2UpO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJtZXNzYWdlXCIsIHJlY2VpdmVNZXNzYWdlLCBmYWxzZSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgY29tLnZlZXZhLmNsbS5lbmdhZ2VDYWxsYmFja0lkICs9IDE7XG4gICAgICAgICAgICAgIHZhciBjYWxsYmFja0lkID0gY29tLnZlZXZhLmNsbS5lbmdhZ2VDYWxsYmFja0lkO1xuICAgICAgICAgICAgICBjb20udmVldmEuY2xtLmVuZ2FnZUNhbGxiYWNrTGlzdFtjYWxsYmFja0lkXSA9IGNhbGxiYWNrO1xuICAgICAgICAgICAgICB2YXIgdG9rZW5zID0gcmVxdWVzdC5zcGxpdChcIiksXCIpO1xuICAgICAgICAgICAgICBpZih0b2tlbnMubGVuZ3RoID4gMSkge1xuICAgICAgICAgICAgICAgICAgLy8gcmVwbGFjZSB0aGUgbGFzdCB0b2tlbiAodGhlIG9yaWdpbmFsIGNhbGxiYWNrKSB3aXRoIGEgY2FsbGJhY2sgaWRcbiAgICAgICAgICAgICAgICAgIHRva2Vuc1t0b2tlbnMubGVuZ3RoIC0gMSBdID0gY2FsbGJhY2tJZDtcbiAgICAgICAgICAgICAgICAgIHJlcXVlc3QgPSB0b2tlbnMuam9pbihcIiksXCIpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHdpbmRvdy5wYXJlbnQucG9zdE1lc3NhZ2UocmVxdWVzdCwgXCIqXCIpO1xuXG4gICAgICAgICAgfSwgMSk7XG4gICAgICB9LFxuXG4gICAgICBsaXN0UHJpY2VSZWNvcmRUeXBlSWQ6IG51bGwsXG4gICAgICBhY2NvdW50SWQ6IG51bGwsXG4gICAgICBhZGRyZXNzSWQ6IG51bGwsXG4gICAgICBjYWxsSWQ6IG51bGwsXG4gICAgICB0c2ZJZDogbnVsbCxcbiAgICAgIHVzZXJJZDogbnVsbCxcbiAgICAgIHByZXNlbnRhdGlvbklkOiBudWxsLFxuICAgICAga2V5TWVzc2FnZUlkOiBudWxsLFxuICAgICAgZW5nYWdlSGFzTGlzdGVuZXI6IGZhbHNlLFxuICAgICAgZW5nYWdlQ2FsbGJhY2tJZDogbnVsbCxcbiAgICAgIGVuZ2FnZUNhbGxiYWNrTGlzdDogW10sXG4gICAgICB0ZXN0TW9kZTogZmFsc2UsXG4gICAgICB0ZXN0UmVzdWx0OiBudWxsXG5cbiAgfTtcblxuICByZXR1cm4gY29tXG59KSlcbiIsIi8vIEhlbHBlcnNcbmltcG9ydCBoZWxwZXIgZnJvbSAnLi9oZWxwZXJzL2hlbHBlcic7XG5pbXBvcnQgdXRpbHMgZnJvbSAnLi9oZWxwZXJzL3V0aWxzJztcblxuLy9saWJzOiBsaWJyYXJ5IGlzIHdyYXBwZWQgaW4gVU1EOiBodHRwczovL3d3dy5ucG1qcy5jb20vcGFja2FnZS92ZWV2YWxpYnJhcnlcbi8vIGltcG9ydCB2ZWV2YUxpYnJhcnkgZnJvbSAnLi9saWJzL3ZlZXZhLWxpYnJhcnknO1xuXG4vLyBNb2R1bGVzXG5pbXBvcnQgZ2xvYmFsU3dpcGVOYXYgZnJvbSAnLi9tb2R1bGVzL2dsb2JhbC1zd2lwZS1uYXYnO1xuaW1wb3J0IHBvcHVwIGZyb20gJy4vbW9kdWxlcy9wb3B1cCc7XG5pbXBvcnQgdGFicyBmcm9tICcuL21vZHVsZXMvdGFicyc7XG5pbXBvcnQgcG9wdXBUYWJzIGZyb20gJy4vbW9kdWxlcy9wb3B1cC10YWJzJztcbmltcG9ydCBjbGlja3N0cmVhbSBmcm9tICcuL21vZHVsZXMvY2xpY2tzdHJlYW0nO1xuaW1wb3J0IHNsaWRlciBmcm9tICcuL21vZHVsZXMvc2xpZGVyJztcblxuJCgoKSA9PiB7XG4gICAvLyBIZWxwZXJzXG4gICBoZWxwZXIoKTtcbiAgIHV0aWxzKCk7XG4gICB0YWJzKCk7XG4gICAvLyB2ZWV2YUxpYnJhcnkoKTtcbiAgIGdsb2JhbFN3aXBlTmF2KCk7XG4gICBwb3B1cCgpO1xuICAgcG9wdXBUYWJzKCk7XG4gICBjbGlja3N0cmVhbSgpO1xuICAgc2xpZGVyKCk7XG59KTtcbiIsImltcG9ydCB2ZWV2YUxpYnJhcnkgZnJvbSAnLi4vbGlicy92ZWV2YS1saWJyYXJ5JztcblxuZXhwb3J0IGRlZmF1bHQgKCkgPT4ge1xuICBjb25zdCBzZWxlY3RvcnMgPSAkKCcuY2xpY2tzdHJlYW0nKTtcblxuICBzZWxlY3RvcnMub24oJ2NsaWNrJywgZSA9PiB7XG4gICAgY29uc3QgZGF0YSA9IGUuY3VycmVudFRhcmdldC5nZXRBdHRyaWJ1dGUoJ2RhdGEtY2xpY2tzdHJlYW0nKS5zcGxpdCgnfCcpO1xuXG4gICAgY29uc3QgbXlPYmplY3QgPSB7XG4gICAgICAvKiBlc2xpbnQtZGlzYWJsZSBjYW1lbGNhc2UgKi9cbiAgICAgIFRyYWNrX0VsZW1lbnRfSWRfdm9kX19jOiBkYXRhWzBdLFxuICAgICAgLyogZXNsaW50LWRpc2FibGUgY2FtZWxjYXNlICovXG4gICAgICBUcmFja19FbGVtZW50X1R5cGVfdm9kX19jOiBkYXRhWzFdLFxuICAgICAgLyogZXNsaW50LWRpc2FibGUgY2FtZWxjYXNlICovXG4gICAgICBUcmFja19FbGVtZW50X0Rlc2NyaXB0aW9uX3ZvZF9fYzogZGF0YVsyXVxuICAgIH07XG5cbiAgICBpZih3aW5kb3cuaXNWZWV2YSkge1xuICAgICAgdmVldmFMaWJyYXJ5KCk7XG4gICAgICAvL0NyZWF0ZSBhIG5ldyBDYWxsIENsaWNrc3RyZWFtIHJlY29yZCBpbiB0aGUgQ1JNIGFuZCBhc3NpZ24gdGhlIGNvbnRlbnRzXG4gICAgICBjb20udmVldmEuY2xtLmNyZWF0ZVJlY29yZCgnQ2FsbF9DbGlja3N0cmVhbV92b2RfX2MnLCBteU9iamVjdCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnNvbGUubG9nKG15T2JqZWN0KTtcbiAgICB9XG4gIH0pO1xufTsiLCJpbXBvcnQgeyB6b29tZWQgfSBmcm9tICcuLi9oZWxwZXJzL3pvb20tZmxhZyc7XG5pbXBvcnQgeyBzbGlkZXNDb25maWcsIHByZXNlbnRhdGlvbk5hbWUgfSBmcm9tICcuLi9oZWxwZXJzL3N3aXBlbmF2LWNvbmZpZyc7XG5pbXBvcnQgeyBTdGFnZUhvc3RuYW1lLCBTdGFnZUZvbGRlciB9IGZyb20gJy4uL2hlbHBlcnMvY29uc3RhbnRzJztcbi8qXG4gKiBHbG9iYWwgU3dpcGUgTmF2XG4gKi9cbmV4cG9ydCBkZWZhdWx0ICgpID0+IHtcblxuICB2YXIgZHJhZ2dpbmcgPSBmYWxzZSxcbiAgICAgIG1vdXNlUG9zWCA9IDAsXG4gICAgICBtb3VzZVBvc1hFbmQgPSAwO1xuXG4gIGNvbnN0IHByZWZpeFByZXNlbnRhdGlvbiA9IChwcmVzZW50YXRpb24pID0+IHtcbiAgICBpZiAodHlwZW9mIHByZXNlbnRhdGlvbiA9PT0gJ3VuZGVmaW5lZCcpe1xuICAgICAgcmV0dXJuIHByZXNlbnRhdGlvbk5hbWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBwcmVzZW50YXRpb25OYW1lICsgJ18nICsgcHJlc2VudGF0aW9uO1xuICAgIH1cbiAgfTtcblxuICBjb25zdCBwcmVmaXhTbGlkZSA9IChzbGlkZSwgcHJlc2VudGF0aW9uKSA9PiB7XG4gICAgcHJlc2VudGF0aW9uID0gcHJlZml4UHJlc2VudGF0aW9uKHByZXNlbnRhdGlvbik7XG4gICAgaWYgKHNsaWRlLmluY2x1ZGVzKHByZXNlbnRhdGlvbikpIHtcbiAgICAgIHJldHVybiBzbGlkZTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHByZXNlbnRhdGlvbiArICdfJyArIHNsaWRlO1xuICAgIH1cbiAgfTtcblxuICBjb25zdCBnb1RvID0gKHNsaWRlSWQsIHByZXNlbnRhdGlvbikgPT4ge1xuICAgIHZhciBhY3RpdmVQb3BVcCA9ICQoJy5wb3B1cCcpLmhhc0NsYXNzKCdhY3RpdmUnKTtcbiAgICBjb25zdCBpc1ZlZXZhID0gbmF2aWdhdG9yLnVzZXJBZ2VudC5tYXRjaCgvaVAoaG9uZXxhZCkvaSkgIT0gbnVsbDtcbiAgICBjb25zdCBob3N0bmFtZSA9IHdpbmRvdy5sb2NhdGlvbi5ob3N0bmFtZTtcblxuXG4gICAgaWYgKHR5cGVvZiBzbGlkZUlkID09PSAndW5kZWZpbmVkJyB8fCBhY3RpdmVQb3BVcCl7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKHpvb21lZC5nZXRab29tZWQoKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHZhciBocmVmID0gJyc7XG4gICAgdmFyIHNsaWRlID0gcHJlZml4U2xpZGUoc2xpZGVJZCwgcHJlc2VudGF0aW9uKTtcblxuICAgIGlmICh0eXBlb2YgcHJlc2VudGF0aW9uID09PSAndW5kZWZpbmVkJykge1xuICAgICAgcHJlc2VudGF0aW9uID0gcHJlc2VudGF0aW9uTmFtZTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICBwcmVzZW50YXRpb24gPSBwcmVmaXhQcmVzZW50YXRpb24ocHJlc2VudGF0aW9uKTtcbiAgICB9XG5cbiAgICAvLyBMb2NhbCBhbmQgc3RhZ2UgbmF2aWdhdGlvblxuICAgIGlmIChob3N0bmFtZSA9PT0gJ2xvY2FsaG9zdCcgJiYgIWlzVmVldmEgKSB7XG4gICAgICBocmVmID0gYC8ke3NsaWRlfS8ke3NsaWRlfS5odG1sYDtcbiAgICB9IGVsc2UgaWYgKGhvc3RuYW1lID09PSBTdGFnZUhvc3RuYW1lKSB7XG4gICAgICBocmVmID0gYGh0dHA6Ly8ke2hvc3RuYW1lfS8ke1N0YWdlRm9sZGVyfS8ke3NsaWRlfS8ke3NsaWRlfS5odG1sYDtcbiAgICB9IGVsc2UgaWYgKGlzVmVldmEpIHtcbiAgICAgIGhyZWYgPSAndmVldmE6Z290b1NsaWRlKCcgKyBzbGlkZSArICcuemlwKSc7XG4gICAgICBjb25zb2xlLmxvZygndmVldmE6Z290b1NsaWRlKCcgKyBzbGlkZSArICcuemlwKScpO1xuICAgIH1cbiAgICB3aW5kb3cubG9jYXRpb24gPSBocmVmO1xuICB9O1xuXG4gIGNvbnN0IGFzc2lnbkV2ZW50ID0gKGVsZW1lbnQsIGV2ZW50LCBjYWxsYmFjaywgdXNlQ2FwdHVyZSkgPT4ge1xuICAgIHVzZUNhcHR1cmUgPSB0eXBlb2YgdXNlQ2FwdHVyZSAhPT0gJ3VuZGVmaW5lZCcgPyB1c2VDYXB0dXJlIDogZmFsc2U7XG5cbiAgICBpZiAoZWxlbWVudCAhPT0gbnVsbCkge1xuXG4gICAgICBpZiAoZXZlbnQgPT09ICd0YXAgcHJlc3MnKSB7XG4gICAgICAgIHZhciBldiA9ICd0b3VjaGVuZCc7XG5cbiAgICAgICAgLy9PbiB0b3VjaCBzdGFydCB3ZSByZXNldCB2YWx1ZXMgYW5kIHNldCB0aGUgc3RhcnQgcG9zaXRpb25cbiAgICAgICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCd0b3VjaHN0YXJ0JywgZnVuY3Rpb24oZSl7XG4gICAgICAgICAgZHJhZ2dpbmcgPSBmYWxzZTtcbiAgICAgICAgICBtb3VzZVBvc1ggPSBlLnRvdWNoZXNbMF0ucGFnZVg7XG4gICAgICAgICAgbW91c2VQb3NYRW5kID0gZS50b3VjaGVzWzBdLnBhZ2VYO1xuICAgICAgICB9KTtcblxuICAgICAgICAvL1doZW4gbW92aW5nIHdlIHJlY29yZCB0aGUgbGFzdCBwb3NpdGlvblxuICAgICAgICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNobW92ZScsIGZ1bmN0aW9uKGUpe1xuICAgICAgICAgIG1vdXNlUG9zWEVuZCA9IGUudG91Y2hlc1swXS5wYWdlWDtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy9XaGVuIHRoZSB0b3VjaCBmaW5pc2hlcywgd2UgY2FsY3VsYXRlIHRoZSBkaXN0YW5jZSBmcm9tIHRoZSBzdGFydCBwb3NpdGlvblxuICAgICAgICAvL2lmIGl0J3MgYmlnZ2VyIHRoYW4gdGhlIHRyZXNob2xkIHdlIHNldCB0aGUgZmxhZyB0byB0cmlnZ2VyIHRoZSBzd2lwZVxuICAgICAgICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoZW5kJywgZnVuY3Rpb24oZSl7XG4gICAgICAgICAgLy9UcmVzaG9sZCBzZXQgdG8gYSB0aGlyZCBvZiB0aGUgc2NyZWVuIHdpZHRoLCBpZiBiaWdnZXIgdGhhbiB0aGlzIHdlIHRyaWdnZXIgdGhlIHN3aXBlXG4gICAgICAgICAgdmFyIHRyZXNob2xkID0gJCh3aW5kb3cpLndpZHRoKCkvMztcblxuICAgICAgICAgIC8vVGhpcyBjb3ZlcnMgdGhlIHN3aXBlIHRvIHRoZSByaWdodCBhbmQgdG8gdGhlIGxlZnRcbiAgICAgICAgICBpZihtb3VzZVBvc1hFbmQgLSBtb3VzZVBvc1ggPiB0cmVzaG9sZCB8fCBtb3VzZVBvc1hFbmQgLSBtb3VzZVBvc1ggPCAtdHJlc2hvbGQpe1xuICAgICAgICAgICAgZHJhZ2dpbmcgPSB0cnVlO1xuICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgZHJhZ2dpbmcgPSBmYWxzZTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICAvL0ZvciB0ZXN0aW5nXG4gICAgICAgICAgY29uc29sZS5sb2cobW91c2VQb3NYICsgJyAnICsgbW91c2VQb3NYRW5kICsgJyAnICsgZHJhZ2dpbmcpO1xuICAgICAgICB9KTtcbiAgICAgICAgICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoZXYsIGNhbGxiYWNrKTtcbiAgICAgICAgLy8gfVxuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIHZhciBtYyA9IG5ldyBIYW1tZXIoZWxlbWVudCk7XG4gICAgICAgIG1jLmdldCgnc3dpcGUnKS5zZXQoe2RpcmVjdGlvbjogSGFtbWVyLkRJUkVDVElPTl9BTEx9KTtcbiAgICAgICAgbWMub24oZXZlbnQsIGNhbGxiYWNrKTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgY29uc3QgY29uZmlndXJlTGlzdGVuZXIgPSAoKSA9PiB7XG4gICAgaWYgKHR5cGVvZiBTbGlkZVN3aXBlQ29uZmlnICE9PSAndW5kZWZpbmVkJyAmJiB0eXBlb2YgU2xpZGVTd2lwZUNvbmZpZy5pZCAhPT0gJ3VuZGVmaW5lZCcgJiYgU2xpZGVTd2lwZUNvbmZpZy5pZCAmJiAodHlwZW9mIFNsaWRlU3dpcGVDb25maWcuZGlzYWJsZVN3aXBlID09PSAndW5kZWZpbmVkJyB8fCAhU2xpZGVTd2lwZUNvbmZpZy5kaXNhYmxlU3dpcGUpICYmIHR5cGVvZiBzbGlkZXNDb25maWcgIT09ICd1bmRlZmluZWQnICYmIHNsaWRlc0NvbmZpZy5sZW5ndGggPiAwKSB7XG4gICAgICBsZXQgc2xpZGVJZCA9IHR5cGVvZiBTbGlkZVN3aXBlQ29uZmlnLnN3aXBlSWQgIT09ICd1bmRlZmluZWQnICYmIFNsaWRlU3dpcGVDb25maWcuc3dpcGVJZCA/IFNsaWRlU3dpcGVDb25maWcuc3dpcGVJZCA6IFNsaWRlU3dpcGVDb25maWcuaWQ7XG4gICAgICBsZXQgc2xpZGVJbmRleDtcbiAgICAgIGxldCBjdXJyZVNsaWRlQ29uZmlnO1xuXG4gICAgICBpZiAoU2xpZGVTd2lwZUNvbmZpZy5zdWJTd2lwZSkge1xuICAgICAgICBjdXJyZVNsaWRlQ29uZmlnID0gU2xpZGVTd2lwZUNvbmZpZy5zdWJTd2lwZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGN1cnJlU2xpZGVDb25maWcgPSBzbGlkZXNDb25maWc7XG4gICAgICB9XG5cbiAgICAgIHNsaWRlSW5kZXggPSBjdXJyZVNsaWRlQ29uZmlnLmluZGV4T2Yoc2xpZGVJZCk7XG4gICAgICBhc3NpZ25FdmVudChkb2N1bWVudC5ib2R5LCAnc3dpcGVsZWZ0JywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdzd2lwZSBsZWZ0IGlzIGdvJyk7XG4gICAgICAgIGlmKHNsaWRlSW5kZXggPCBjdXJyZVNsaWRlQ29uZmlnLmxlbmd0aCAtIDEpIHtcbiAgICAgICAgICBnb1RvKGN1cnJlU2xpZGVDb25maWdbc2xpZGVJbmRleCArIDFdKTtcbiAgICAgICAgfVxuXG4gICAgICB9KTtcblxuICAgICAgYXNzaWduRXZlbnQoZG9jdW1lbnQuYm9keSwgJ3N3aXBlcmlnaHQnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ3N3aXBlIHJpZ2h0IGlzIGdvJyk7XG4gICAgICAgIGlmKHNsaWRlSW5kZXggPiAwKSB7XG4gICAgICAgICAgZ29UbyhjdXJyZVNsaWRlQ29uZmlnW3NsaWRlSW5kZXggLSAxXSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cblxuICAgIC8vQ2hlY2sgaWYgdGhlIHNsaWRlIGhhcyB2ZXJ0aWNhbCBuYXZpZ2F0aW9uXG4gICAgLy8gQ3VycmVudGx5IGRpc2FibGVkIHRvIGJlIHdvcmtlZCBhdCBhIGxhdGVyIGRhdGVcbiAgICAvLyBpZiAoU2xpZGVTd2lwZUNvbmZpZy52U3dpcGVJZCkge1xuICAgIC8vICAgbGV0IHZTbGlkZUlkID0gU2xpZGVTd2lwZUNvbmZpZy52U3dpcGVJZCxcbiAgICAvLyAgICAgICB2U2xpZGVJbmRleCxcbiAgICAvLyAgICAgICB2U2xpZGVDb25maWc7XG4gICAgLy8gICAvL0ZpbHRlciB3aWNoIHZlcnRpY2FsIHNsaWRlIGNvbmZpZyB3aWxsIGJlIHVzZWRcbiAgICAvLyAgIHN3aXRjaCAodlNsaWRlSWQuc3BsaXQoJ18nKVswXSkge1xuICAgIC8vICAgICBjYXNlICcxMCc6XG4gICAgLy8gICAgICAgdlNsaWRlQ29uZmlnID0gdjEwU2xpZGVDb25maWc7XG4gICAgLy8gICAgICAgYnJlYWs7XG4gICAgLy8gICAgIGNhc2UgJzMwJzpcbiAgICAvLyAgICAgICB2U2xpZGVDb25maWcgPSB2MzBTbGlkZUNvbmZpZztcbiAgICAvLyAgICAgICBicmVhaztcbiAgICAvLyAgICAgY2FzZSAnNDAnOlxuICAgIC8vICAgICAgIHZTbGlkZUNvbmZpZyA9IHY0MFNsaWRlQ29uZmlnO1xuICAgIC8vICAgICAgIGJyZWFrO1xuICAgIC8vICAgICBjYXNlICc2MCc6XG4gICAgLy8gICAgICAgdlNsaWRlQ29uZmlnID0gdjYwU2xpZGVDb25maWc7XG4gICAgLy8gICAgICAgYnJlYWs7XG4gICAgLy8gICAgIGNhc2UgJzEyMCc6XG4gICAgLy8gICAgICAgdlNsaWRlQ29uZmlnID0gdjEyMFNsaWRlQ29uZmlnO1xuICAgIC8vICAgICAgIGJyZWFrO1xuICAgIC8vICAgICBkZWZhdWx0OlxuICAgIC8vICAgICAgIGJyZWFrO1xuICAgIC8vICAgfVxuXG4gICAgLy8gICAvL0FzaWduIHZlcnRpY2FsIHNsaWRlIGluZGV4IG9mIHNsaWRlXG4gICAgLy8gICB2U2xpZGVJbmRleCA9IHZTbGlkZUNvbmZpZy5pbmRleE9mKHZTbGlkZUlkKTtcblxuICAgIC8vICAgLy9Bc3NpZ24gdXAgYW5kIGRvd24gc3dpcGUgZXZlbnRzIGZyb20gSGFtbWVyXG4gICAgLy8gICBhc3NpZ25FdmVudChkb2N1bWVudC5ib2R5LCAnc3dpcGV1cCcsIGZ1bmN0aW9uKCkge1xuICAgIC8vICAgICBjb25zb2xlLmxvZygnc3dpcGUgdXAgaXMgZ28nKTtcbiAgICAvLyAgICAgaWYodlNsaWRlSW5kZXggPCB2U2xpZGVDb25maWcubGVuZ3RoIC0gMSkge1xuICAgIC8vICAgICAgIGdvVG8odlNsaWRlQ29uZmlnW3ZTbGlkZUluZGV4ICsgMV0pO1xuICAgIC8vICAgICB9XG5cbiAgICAvLyAgIH0pO1xuXG4gICAgLy8gICBhc3NpZ25FdmVudChkb2N1bWVudC5ib2R5LCAnc3dpcGVkb3duJywgZnVuY3Rpb24oKSB7XG4gICAgLy8gICAgIGNvbnNvbGUubG9nKCdzd2lwZSBkb3duIGlzIGdvJyk7XG4gICAgLy8gICAgIGlmKHZTbGlkZUluZGV4ID4gMCkge1xuICAgIC8vICAgICAgIGdvVG8odlNsaWRlQ29uZmlnW3ZTbGlkZUluZGV4IC0gMV0pO1xuICAgIC8vICAgICB9XG4gICAgLy8gICB9KTtcbiAgICAvLyB9XG5cbiAgICAvL0Fzc2lnbiBldmVudHMgZm9yIHRhYiBwb3AgdXBzIG5hdmlnYXRpb25cbiAgICAvL1ZhbGlkYXRlIGlmIHRhYiBwb3AgdXAgZXhpc3RzIG9uIHNsaWRlXG4gICAgLy9Ob3RlOiB0aGlzIHdpbGwgbm90IGNyZWF0ZSBjb25mbGljdCB3aXRoIGdsb2JhbFxuICAgIC8vdmVydGljYWwgbmF2aWdhdGlvbiBiZWNhdXNlIGFsbCBuYXZpZ2F0aW9uIGlzXG4gICAgLy9kaXNhYmxlZCB3aGVuIHBvcCB1cHMgYXJlIGFjdGl2ZVxuICAgIGlmKCEkKCcucGF0aWVudC1wcm9maWxlLXBvcHVwJykuaGFzQ2xhc3MoJ2Rpc2FibGVkJykpIHtcbiAgICAgIGxldCB0YWJQb3BVcCA9ICQoJy50YWItcG9wdXAnKSxcbiAgICAgICAgICB0YWIxID0gdGFiUG9wVXAuZmluZCgnLnRhYi0xJyksXG4gICAgICAgICAgdGFiMiA9IHRhYlBvcFVwLmZpbmQoJy50YWItMicpO1xuXG4gICAgICBhc3NpZ25FdmVudChkb2N1bWVudC5ib2R5LCAnc3dpcGV1cCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICAvL1ZhbGlkYXRlIGlmIHBvcCB1cCBpcyBhY3RpdmUgYW5kIGlmIHRhYjEgaXMgYWN0aXZlIHRvXG4gICAgICAgIC8vc3dpdGNoIGFjdGl2ZSBjbGFzc2VzIHdpdGggdGFiMlxuICAgICAgICBpZih0YWJQb3BVcC5oYXNDbGFzcygnYWN0aXZlJykgJiYgdGFiMS5oYXNDbGFzcygnYWN0aXZlJykpIHtcbiAgICAgICAgICBjb25zb2xlLmxvZygndGFicG9wdXAgc3dpcGUgdXAgaXMgZ28nKTtcbiAgICAgICAgICB0YWIxLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcbiAgICAgICAgICB0YWIyLmFkZENsYXNzKCdhY3RpdmUnKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICAgIC8vVmFsaWRhdGUgaWYgcG9wIHVwIGlzIGFjdGl2ZSBhbmQgaWYgdGFiMiBpcyBhY3RpdmUgdG9cbiAgICAgIC8vc3dpdGNoIGFjdGl2ZSBjbGFzc2VzIHdpdGggdGFiMVxuICAgICAgYXNzaWduRXZlbnQoZG9jdW1lbnQuYm9keSwgJ3N3aXBlZG93bicsIGZ1bmN0aW9uKCkge1xuICAgICAgICBpZih0YWJQb3BVcC5oYXNDbGFzcygnYWN0aXZlJykgJiYgdGFiMi5oYXNDbGFzcygnYWN0aXZlJykpIHtcbiAgICAgICAgICBjb25zb2xlLmxvZygndGFicG9wdXAgc3dpcGUgZG93biBpcyBnbycpO1xuICAgICAgICAgIHRhYjIucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xuICAgICAgICAgIHRhYjEuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gIH07XG5cbiAgY29uc3QgaW5pdFN3aXBlTmF2ID0gKCkgPT4ge1xuICAgIGNvbmZpZ3VyZUxpc3RlbmVyKCk7XG4gIH07XG5cbiAgaW5pdFN3aXBlTmF2KCk7XG5cbn07XG4iLCIgICAvKlxuICogUG9wdXAgdGFiIGxvZ2ljXG4gKi9cbmV4cG9ydCBkZWZhdWx0ICgpID0+IHtcblxuICAgY29uc3QgdGFiUG9wdXAgPSAkKCcucG9wdXAtLXRhYnMnKSxcbiAgICAgICAgIHRhYkxpbmtzID0gdGFiUG9wdXAuZmluZCgnLnRhYi1saW5rIGEnKTtcblxuICAgaWYgKHRhYlBvcHVwLmxlbmd0aCA+IDApe1xuICAgICAgdGFiTGlua3Mub24oJ2NsaWNrJywgKGUpID0+IHtcbiAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgIGNvbnN0IGN1cnJlbnRBY3RpdmUgPSB0YWJQb3B1cC5maW5kKCcuYWN0aXZlJyk7XG5cbiAgICAgICAgIGxldCB0YXJnZXRUYWIgPSAkKGUudGFyZ2V0KS5kYXRhKCd0YXJnZXQnKTsgIFxuXG4gICAgICAgICBjdXJyZW50QWN0aXZlLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcbiAgICAgICAgICQoJyMnK3RhcmdldFRhYikuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xuICAgICAgfSk7XG4gICB9XG59OyBcbiIsIi8qXG4gKiBQb3B1cCBsb2dpY1xuICovXG5leHBvcnQgZGVmYXVsdCAoKSA9PiB7XG5cbiAgIGNvbnN0IHBvcHVwQ3RhID0gJCgnLnBvcHVwLXRyaWdnZXInKTtcbiAgIGNvbnN0IG5hdkJ0biA9ICQoJy5oYW1idXJnZXItbWVudScpO1xuICAgY29uc3QgbWVnYU5hdiA9ICQoJy5tZWdhLW5hdicpO1xuICAgY29uc3QgYmFyR3JhcGhhbmltdGUgPSAkKCcuYmFyLWdyYXBoLWFuaW1hdGlvbicpO1xuXG4gICBpZiAocG9wdXBDdGEubGVuZ3RoID09PSAwKXtcbiAgICAgIHJldHVybjtcbiAgIH0gZWxzZSB7XG4gICAgICBwb3B1cEN0YS5vbignY2xpY2snLCBmdW5jdGlvbiB0b2dnbGVQb3BVcCAoZSl7XG4gICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICBpZiAoJCh0aGlzKS5hdHRyKCdkaXNhYmxlZCcpKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbGV0IHBvcFVwcyA9ICQoJy5wb3B1cCcpLFxuICAgICAgICAgICAgICAgIGFjdGl2ZVBvcFVwID0gcG9wVXBzLmZpbHRlcignLmFjdGl2ZScpLFxuICAgICAgICAgICAgICAgIG9wZW5pbmdQb3BVcCA9ICQodGhpcykuZGF0YSgncG9wdXAnKSxcbiAgICAgICAgICAgICAgICBzZHBvcHVwID0gJCgnI3NkLXBvcHVwLnN0dWR5LXBvcHVwJyksXG4gICAgICAgICAgICAgICAgcmVmcG9wdXAgPSAkKCcjcmVmLXBvcHVwLnBvcHVwJyksXG4gICAgICAgICAgICAgICAgY29udGVudHBvcHVwID0gJCgnLnBvcHVwLmNvbnRlbnQtcG9wdXAnKTtcbiAgICAgICAgICAgICAgICBcblxuICAgICAgICAgICAgaWYoYWN0aXZlUG9wVXAubGVuZ3RoID4gMCAmJiBhY3RpdmVQb3BVcC5maW5kKCcudGFiJykuZmlsdGVyKCcuYWN0aXZlJykuZGF0YSgncmVmJykpIHtcbiAgICAgICAgICAgICAgIG9wZW5pbmdQb3BVcCA9IGFjdGl2ZVBvcFVwLmZpbmQoJy50YWInKS5maWx0ZXIoJy5hY3RpdmUnKS5kYXRhKCdyZWYnKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcG9wVXBzLmFkZENsYXNzKCdoaWRlJyk7XG4gICAgICAgICAgICBwb3BVcHMucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xuICAgICAgICAgICAgbGV0ICRvcGVuaW5nUG9wVXAgPSAkKGAjJHtvcGVuaW5nUG9wVXB9YCk7XG4gICAgICAgICAgICAkb3BlbmluZ1BvcFVwLnRvZ2dsZUNsYXNzKCdoaWRlIGFjdGl2ZScpO1xuICAgICAgICAgICAgJCh0aGlzKS50b2dnbGVDbGFzcygnYWN0aXZlJyk7XG5cbiAgICAgICAgICAgIG1lZ2FOYXYucmVtb3ZlQ2xhc3MoJ29wZW4nKTtcbiAgICAgICAgICAgIG5hdkJ0bi5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XG5cbiAgICAgICAgICAgIGlmKCRvcGVuaW5nUG9wVXAuaGFzQ2xhc3MoJ3BvcHVwLS10YWJzJykpIHtcbiAgICAgICAgICAgICAgbGV0IHRhYnMgPSAkb3BlbmluZ1BvcFVwLmZpbmQoJy50YWInKTtcbiAgICAgICAgICAgICAgdGFicy5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XG4gICAgICAgICAgICAgIHRhYnMuZmlyc3QoKS5hZGRDbGFzcygnYWN0aXZlJyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmKHNkcG9wdXAuaGFzQ2xhc3MoJ2FjdGl2ZScpKSB7XG4gICAgICAgICAgICAgICAkKCcuc2QtYnRuJykuYWRkQ2xhc3MoJ2FjdHYnKTtcbiAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgXG4gICAgICAgICAgICBpZihyZWZwb3B1cC5oYXNDbGFzcygnYWN0aXZlJykpIHtcbiAgICAgICAgICAgICAgICQoJy5yZWYtYnRuJykuYWRkQ2xhc3MoJ2FjdHYnKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYoY29udGVudHBvcHVwLmhhc0NsYXNzKCdhY3RpdmUnKSkge1xuICAgICAgICAgICAgICAgYmFyR3JhcGhhbmltdGUuYWRkQ2xhc3MoJ2JhcmNoYXJ0LWFuaW1hdGUnKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICAgIGNvbnN0IGNsb3NlUG9wdXAgPSAodGFyZ2V0KSA9PiB7XG4gICAgICAgICBsZXQgY2xvc2V0UG9wVXAgPSAkKHRhcmdldCkuY2xvc2VzdCgnLnBvcHVwJyksXG4gICAgICAgICAgICAgY3VycmVudFZpZGVvID0gY2xvc2V0UG9wVXAuZmluZCgndmlkZW8nKTtcblxuICAgICAgICAgaWYoY3VycmVudFZpZGVvLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIGN1cnJlbnRWaWRlb1swXS5wYXVzZSgpO1xuICAgICAgICAgICAgY3VycmVudFZpZGVvWzBdLmN1cnJlbnRUaW1lID0gMDtcbiAgICAgICAgIH1cbiAgICAgICAgIGNsb3NldFBvcFVwLmFkZENsYXNzKCdoaWRlJyk7XG4gICAgICAgICBjbG9zZXRQb3BVcC5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XG4gICAgICB9O1xuXG4gICAgICAkKCcucG9wdXAtY2xvc2UnKS5vbignY2xpY2snLCBmdW5jdGlvbiBjbG9zZUN1cnJlbnRQb3BVcCgpe1xuICAgICAgICAgY2xvc2VQb3B1cCh0aGlzKTtcbiAgICAgICAgICQoJy5zZC1idG4sLnJlZi1idG4nKS5yZW1vdmVDbGFzcygnYWN0dicpO1xuICAgICAgfSk7XG5cbiAgICAgICQoJy5vdmVybGF5Jykub24oJ2NsaWNrJywgZnVuY3Rpb24gY2xvc2VDdXJyZW50UG9wVXAoKXtcbiAgICAgICAgIGNsb3NlUG9wdXAodGhpcyk7XG4gICAgICAgICAkKCcuc2QtYnRuLC5yZWYtYnRuJykucmVtb3ZlQ2xhc3MoJ2FjdHYnKTtcbiAgICAgIH0pO1xuICAgfVxufTtcbiIsIlxuZXhwb3J0IGRlZmF1bHQgKCkgPT4ge1xuICAvLyAkKCcuc2xpZGVyJykuc2xpY2soe1xuICAvLyAgIGRvdHM6IGZhbHNlLFxuICAvLyAgIGluZmluaXRlOiB0cnVlLFxuICAvLyAgIHNwZWVkOiAzMDAsXG4gIC8vICAgc2xpZGVzVG9TaG93OiAxLFxuICAvLyAgIGNlbnRlck1vZGU6IHRydWVcbiAgLy8gfSk7XG59O1xuIiwiLypcbiAqIFRhYnMgTW9kdWxlXG4gKi9cbmV4cG9ydCBkZWZhdWx0ICgpID0+IHtcblxuICAgY29uc3QgdGFiID0gJCgnLml0ZW0nKSxcbiAgICAgICAgIHRhYlNlY3Rpb24gPSAkKCcudGFiLXNlY3Rpb24nKSxcbiAgICAgICAgIC8vIHBvcHVwcyA9ICQoJy5wb3B1cC10ZXh0JyksXG4gICAgICAgICAvLyB0YWJTdWJTZWN0aW9uID0gJCgnLnRhYi1zdWItc2VjdGlvbicpLFxuICAgICAgICAgdGFiRmlyc3QgPSAkKCcjdGFiLWl0ZW0tMCcpLFxuICAgICAgICAgdGFiU2VjdGlvbkZpcnN0ID0gJCgnI3RhYi1pdGVtLTAtc2VjdGlvbicpLFxuICAgICAgICAgdGFiU2VjdGlvblBvcHVwRmlyc3QgPSAkKCcjcG9wdXAtdGFiLWl0ZW0tMC1zZWN0aW9uLCAjc2xpZGUtcG9wdXAnKSxcbiAgICAgICAgIG9wZW5TdWJTZWN0aW9uID0gJCgnLm9wZW4tc2VjdGlvbi1zdWInKSxcbiAgICAgICAgIGNsb3NlU3ViU2VjdGlvbiA9ICQoJy5jbG9zZS1zZWN0aW9uLXN1YicpLFxuICAgICAgICAgcG9wdXBIZWFkZXIgPSAkKCcucG9wdXAtaGVhZGVyJyksXG4gICAgICAgICBjb250YWluZXIgPSAkKCcuZ2xvYmFsLWNvbnRlbnQnKSxcbiAgICAgICAgIHRvZ2dsZU1vZHVsZXMgPSAkKCcucGFyZW50LXNlY3Rpb24sIC50YWJzLCAucmVkaXJlY3QnKTtcblxuICAgbGV0IHNlY3Rpb25BY3RpdmUgPSAnJztcblxuXG4gICAvLyBBY3RpdmUgZmlyc3QgdGFiIGFuZCBzaG93IGZpcnN0IHRhYiBzZWN0aW9uXG4gICBjb25zdCBpbml0ID0gKCkgPT4ge1xuICAgICAgdGFiU2VjdGlvbi5oaWRlKCk7XG4gICAgICB0YWJGaXJzdC5hZGRDbGFzcygnYWN0aXZlJyk7XG4gICAgICB0YWJTZWN0aW9uRmlyc3QuYWRkQ2xhc3MoJ2FjdGl2ZScpLnNob3coKTtcbiAgICAgIHRhYlNlY3Rpb25Qb3B1cEZpcnN0LnNob3coKTtcbiAgICAgIC8vIGNsb3NlU3ViU2VjdGlvbi5oaWRlKCk7XG4gICAgICAvLyBwb3B1cEhlYWRlci5oaWRlKCk7XG4gICAgICAvLyB0YWJTdWJTZWN0aW9uLmhpZGUoKTtcbiAgIH07XG5cbiAgIC8vIFRhYiBjbGljayBmdW5jdGlvblxuICAgdGFiLm9uKCdjbGljaycsIGZ1bmN0aW9uIGNoYW5nZUFjdGl2ZVRhYigpIHtcblxuICAgICAgc2VjdGlvbkFjdGl2ZSA9IGAkeyQodGhpcykuYXR0cignaWQnKX0tc2VjdGlvbmA7XG5cbiAgICAgIC8vIFJlbW92ZSBhbGwgYWN0aXZlIHRhYnMgYW5kIGhpZGUgYWxsIHRhYnMgc2VjdGlvblxuICAgICAgdGFiLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcbiAgICAgIHRhYlNlY3Rpb24ucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpLmhpZGUoKTtcbiAgICAgIC8vIHBvcHVwcy5oaWRlKCk7XG4gICAgICAvLyBBY3RpdmUgc2VsZWN0ZWQgdGFiIGFuZCBzaG93IHNlbGVjdGVkIHRhYiBzZWN0aW9uXG4gICAgICAkKHRoaXMpLmFkZENsYXNzKCdhY3RpdmUnKTtcbiAgICAgICQoYCMke3NlY3Rpb25BY3RpdmV9YCkuYWRkQ2xhc3MoJ2FjdGl2ZScpLnNob3coKTtcblxuICAgICAgLy9TaG93aW5nIHBvcHVwIGlmIGV4aXN0XG4gICAgICAvLyBhY3RpdmVSZWZlcmVuY2VzKCQoYCR7c2VjdGlvbkFjdGl2ZX0tcG9wdXBgKSk7XG4gICB9KTtcblxuICAgLy8gT3BlbiBzdWJzZWN0aW9uXG4gICAvLyBvcGVuU3ViU2VjdGlvbi5vbignY2xpY2snLCBmdW5jdGlvbiBvcGVuU3ViU2VjdGlvbkhhbmRsZXIoKSB7XG4gICAvLyAgICBsZXQgc3ViU2VjdGlvbiA9IGAjJHskKHRoaXMpLmF0dHIoJ2lkJykucmVwbGFjZSgnb3BlbicsICdzdWInKX1gO1xuICAgLy8gICAgY29udGFpbmVyLmFkZENsYXNzKCdib3JkZXJlZCcpO1xuICAgLy8gICAgdG9nZ2xlTW9kdWxlcy5oaWRlKCk7XG4gICAvLyAgICBwb3B1cHMuaGlkZSgpO1xuICAgLy8gICAgJChgJHtzdWJTZWN0aW9ufSwgJHtzdWJTZWN0aW9ufS1wb3B1cGApLnNob3coKTtcbiAgIC8vICAgIGNsb3NlU3ViU2VjdGlvbi5zaG93KCk7XG4gICAvLyAgICBwb3B1cEhlYWRlci5zaG93KCk7XG4gICAvLyB9KTtcblxuICAgLy8gLy8gQ2xvc2Ugc3Vic2VjdGlvblxuICAgLy8gY2xvc2VTdWJTZWN0aW9uLm9uKCdjbGljaycsIGZ1bmN0aW9uIGNsb3NlU3ViU2VjdGlvbkhhbmRsZXIoKSB7XG4gICAvLyAgICBjb250YWluZXIucmVtb3ZlQ2xhc3MoJ2JvcmRlcmVkJyk7XG4gICAvLyAgICBwb3B1cHMuaGlkZSgpO1xuICAgLy8gICAgJChgIyR7JChgLml0ZW0uYWN0aXZlYCkuYXR0cignaWQnKX0tc2VjdGlvbi1wb3B1cGApLnNob3coKTtcbiAgIC8vICAgIHRvZ2dsZU1vZHVsZXMuc2hvdygpO1xuICAgLy8gICAgdGFiU3ViU2VjdGlvbi5oaWRlKCk7XG4gICAvLyAgICBjbG9zZVN1YlNlY3Rpb24uaGlkZSgpO1xuICAgLy8gICAgcG9wdXBIZWFkZXIuaGlkZSgpO1xuICAgLy8gfSk7XG5cbiAgIGluaXQoKTtcblxufTtcbiJdfQ==
