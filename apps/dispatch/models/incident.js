// ==========================================================================
// Project:   Dispatch.Incident
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals Dispatch */

/** @class

  (Document your Model here)

  @extends SC.Record
  @version 0.1
*/
Dispatch.Incident = SC.Record.extend(
/** @scope Dispatch.Incident.prototype */ {
  primaryKey: '_id',

  // TODO: Add your own code here.
  type: SC.Record.attr(String, { defaultValue: 'note'}),
  icon: SC.Record.attr(String),
  currentStatus: SC.Record.attr(String), // for ui filtering - pending, active, completed
  disposition: SC.Record.attr(String, { defaultValue: 'New'}),
  priority: SC.Record.attr(String, { defaultValue: 'Normal'}),
  description: SC.Record.attr(String),
  details: SC.Record.attr(String),
  alarm: SC.Record.attr(Date),
  location: SC.Record.toOne("Dispatch.Location", {nested: true}),
  
  assignments: SC.Record.toMany("Dispatch.Assignment", {
    inverse: 'incident',
    //isMaster: NO,
  }),
  
  iconForListView: function() {
    switch(this.get('type')) {
      case 'medical':
        return 'icons cross-24';
      case 'comms':
        return 'glyphish icon-75-phone';
      case 'note':
        return 'glyphish icon-179-notepad';
      case 'logistics':
        return 'glyphish icon-125-food';
    }
    return '';
  }.property('type').cacheable(),
  
  summaryForListView: function() {
    var assignments = this.get('assignments').filter(function(item) {
      return !SC.none(item) && item.get('disposition') !== 'Closed';
    });
    
    var count = assignments.get('length');
    
    if (count == 0) {
      return "No assignments";
    } else if (count >= 2) {
      return "%@ resources assigned".fmt(count);
    } else {
      var ass = assignments.firstObject();
      var when = ass.get('timestamp');
      if (!SC.none(when)) when = "for " + when.formatDuration();
      else when = '';
      
      return "%@ is %@ %@".fmt(ass.getPath("resource.name"), ass.get('disposition'), when);
    }
    
    return "";
  }.property('assignments.[]').cacheable(),

  assignmentChanged: function(assignment) {
    this.notifyPropertyChange('summaryForListView');
  },
  
}) ;
