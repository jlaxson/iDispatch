// ==========================================================================
// Project:   Inventory.Resource Fixtures
// Copyright: ©2011 My Company, Inc.
// ==========================================================================
/*globals Inventory */

sc_require('models/resource');

Inventory.Resource.FIXTURES = [

  // TODO: Add your data fixtures here.
  // All fixture records must have a unique primary key (default 'guid').  See 
  // the example below.

  { id: 1,
    name: "GMRS",
    assetTag: 1234,
    assignedTo: 1,
    assignedEvent: 1,
    components: []},
    
  { id: 2,
    name: "Verizon Phone",
    phoneNumber: "1234567890",
    assignedTo: 1,
    assignedEvent: 1,
    components: [
      {name: 'Power Brick', resource: 2, checkedOut: YES},
      {name: 'USB Cable', resource: 2, checkedOut: NO},
      {name: 'Phone', resource: 2, checkedOut: YES},
      ], }

  // { guid: 1,
  //   firstName: "Michael",
  //   lastName: "Scott" },
  //
  // { guid: 2,
  //   firstName: "Dwight",
  //   lastName: "Schrute" },
  //
  // { guid: 3,
  //   firstName: "Jim",
  //   lastName: "Halpert" },
  //
  // { guid: 4,
  //   firstName: "Pam",
  //   lastName: "Beesly" },
  //
  // { guid: 5,
  //   firstName: "Ryan",
  //   lastName: "Howard" }

];
