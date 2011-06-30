// ==========================================================================
// Project:   Inventory.Person Fixtures
// Copyright: ©2011 My Company, Inc.
// ==========================================================================
/*globals Inventory */

sc_require('models/person');

Inventory.Person.FIXTURES = [

  // TODO: Add your data fixtures here.
  // All fixture records must have a unique primary key (default 'guid').  See 
  // the example below.
  
  { id: 1,
    name: 'John',
    events: [1],
    resources: [1, 2]}

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
