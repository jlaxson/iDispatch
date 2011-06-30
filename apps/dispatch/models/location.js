// ==========================================================================
// Project:   Dispatch.Location
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals Dispatch */

/** @class

  (Document your Model here)

  @extends SC.Record
  @version 0.1
*/
Dispatch.Location = SC.Record.extend(
/** @scope Dispatch.Location.prototype */ {

  // TODO: Add your own code here.
  summary: function() {
    return this.get('description');
  }.property('description').cacheable(),

}) ;
