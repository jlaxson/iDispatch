// ==========================================================================
// Project:   Dispatch.Assignment
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals Dispatch */

/** @class

  (Document your Model here)

  @extends SC.Record
  @version 0.1
*/
Dispatch.Assignment = SC.Record.extend(
/** @scope Dispatch.Assignment.prototype */ {
  primaryKey: '_id',

  event: SC.Record.toOne("Dispatch.Event"),
  incident: SC.Record.toOne("Dispatch.Incident", {
    inverse: 'assignments',// isMaster: NO,
  }),
  resource: SC.Record.toOne("Dispatch.Resource", {
    inverse: 'assignments',// isMaster: NO,
  }),
  
  disposition: SC.Record.attr(String, {
    defaultValue: 'New',
  }),
  timestamp: SC.Record.attr(SC.DateTime, {
    defaultValue: function() { return SC.DateTime.create() }
  }),

  // TODO: Add your own code here.
  summaryText: function() {
    var ts = this.get('timestamp');
    var disp = this.get('disposition');
    if (SC.none(ts)) {
      return disp;
    }
    
    return "%@ for %@".fmt(disp, ts.formatDuration());
  }.property('timestamp', 'disposition'),
  
  recordDidChange: function(key) {
    sc_super();
    
    if (key === 'disposition') {
      this.set('timestamp', SC.DateTime.create());
    }
  },
  
  propogateDisposition: function() {
  
    var res = this.get('resource');
    var inc = this.get('incident');
    
    if (!SC.none(res))
      res.assignmentChanged(this);
    if (!SC.none(inc))
      inc.assignmentChanged(this);
      
  }.observes("disposition"),
  
}) ;
