// ==========================================================================
// Project:   Dispatch.Resource
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals Dispatch */

/** @class

  (Document your Model here)

  @extends SC.Record
  @version 0.1
*/
Dispatch.Resource = SC.Record.extend(
/** @scope Dispatch.Resource.prototype */ {
  primaryKey: '_id',

  // TODO: Add your own code here.
  name: SC.Record.attr(String),
  mobility: SC.Record.attr(String),
  imageName: SC.Record.attr(String),
  category: SC.Record.attr(String),
  currentStatus: SC.Record.attr(String),
  aprsCall: SC.Record.attr(String),
  lastModified: SC.Record.attr(Date),
  needsTreatmentCount: SC.Record.attr(Boolean),
  treatmentCount: SC.Record.attr(String),
  treatmentUpdated: SC.Record.attr(SC.DateTime),
  assignedNet: SC.Record.attr(String),
  location: SC.Record.toOne("Dispatch.Location", {nested: true}),
  event: SC.Record.toOne("Dispatch.Event"),
  assignments: SC.Record.toMany("Dispatch.Assignment", {
    inverse: 'resource',
    //isMaster: NO,
  }),
  
  timeSinceTreatmentCountUpdate: function() {
    var updated = this.get('treatmentUpdated');
    if (SC.none(updated)) {
      return "never";
    }
    
    var howLong = updated.formatDuration();
    return "%@ (%@ ago)".fmt(updated.toFormattedString("%H:%M"), howLong);
  }.property('treatmentCount', 'treatmentUpdated').cacheable(),
  
  treatmentCount: function(key, val) {
    if (val !== undefined) {
      this.writeAttribute('treatmentCount', val);
      this.set('treatmentUpdated', SC.DateTime.create());
    }
    return this.readAttribute('treatmentCount');
  }.property(),
  
  summaryForListView: function() {
    var assignments = this.get('assignments').filter(function(item) {
      return !SC.none(item) && item.get('disposition') !== 'Closed';
    });
    
    var count = assignments.get('length');
    
    if (count == 0) {
      return "No assignments";
    } else if (count >= 2) {
      return "%@ incidents assigned".fmt(count);
    } else {
      var ass = assignments.firstObject();
      var when = ass.get('timestamp');
      if (!SC.none(when)) when = "for " + when.formatDuration();
      else when = '';
      
      return "%@ to %@ %@".fmt(ass.get('disposition'), ass.getPath("incident.description"), when);
    }
    
    return "";
  }.property("assignments.[]").cacheable(),
  
  assignmentChanged: function(assignment) {
    this.notifyPropertyChange('summaryForListView');
  },

}) ;

Dispatch.MOBILE = "mobile";
Dispatch.FIXED = "fixed";