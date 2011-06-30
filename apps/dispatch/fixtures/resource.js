// ==========================================================================
// Project:   Dispatch.Resource Fixtures
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals Dispatch */

sc_require('models/resource');

Dispatch.Resource.FIXTURES = [

  {guid: 1,
    name: "MAT Alpha",
    mobility: "mobile",
    category: 'Mobile Aid Team',
    currentStatus: 'Active'},
    
  {guid: 2,
    name: "Aid 1",
    mobility: "fixed",
    category: 'Fixed Aid Station',
    currentStatus: 'Active',
    position: {description: 'Alcatraz'}}

  // TODO: Add your data fixtures here.
  // All fixture records must have a unique primary key (default 'guid').  See 
  // the example below.

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
