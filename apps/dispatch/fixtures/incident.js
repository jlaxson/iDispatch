// ==========================================================================
// Project:   Dispatch.Incident Fixtures
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals Dispatch */

sc_require('models/incident');

Dispatch.Incident.FIXTURES = [
  { guid: 1,
    description: "1234",
    assignments: [1],
    disposition: 'New'}

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
