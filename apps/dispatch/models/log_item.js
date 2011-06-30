// ==========================================================================
// Project:   Dispatch.LogItem
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals Dispatch */

/** @class

  (Document your Model here)

  @extends SC.Record
  @version 0.1
*/
Dispatch.LogItem = SC.Record.extend(
/** @scope Dispatch.LogItem.prototype */ {

  // TODO: Add your own code here.
    changedKey: SC.Record.attr(String),
    previousValue: SC.Record.attr(String),
    newValue: SC.Record.attr(String)
}) ;
