// ==========================================================================
// Project:   Dispatch.incidentController
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals Dispatch */

/** @class

  (Document Your Controller Here)

  @extends SC.Object
*/
Dispatch.incidentArrayController = SC.ArrayController.create({
  
});

Dispatch.IncidentController = SC.ObjectController.extend(
/** @scope Dispatch.incidentController.prototype */ {

  detailViewForType: function() {
    var mapping = {medical:'Dispatch.IncidentDetailView.MedicalView', 
                   comms:'Dispatch.IncidentDetailView.CommsView', 
                   logistics:'Dispatch.IncidentDetailView.LogisticsView',
                   note:'Dispatch.IncidentDetailView.NoteView'};
    return mapping[this.get('type')];
  }.property('type').cacheable(),
  
  statusesForType: function() {
     var mapping = {medical:['New', 'Pending', 'Enroute', 'On Scene', 'EMS Summoned', 'Transport', 'Closed'], 
                     comms:['New', 'Pending', 'Awaiting Response', 'Closed'], 
                     logistics:['New', 'Pending', 'Enroute', 'Closed'],
                     note:['New', 'Pending', 'Open', 'Closed']};
    var ret = mapping[this.get('type')];
    if (SC.none(ret)) {
      ret = ['New', 'Pending', 'Closed'];
    }
    return ret;
  }.property('type').cacheable(),

  closeIncident: function() {
    this.get('assignments').forEach(function(ass) {
      ass.set('disposition', 'Closed');
    })
    this.set('disposition', 'Closed');
    this.set('content', null);
    
    Dispatch.save();
  },
  
  needsSave: function() {
    if (!this.get('hasContent')) return false;
    
    var status = this.get('status');
    return !!(status & SC.Record.DIRTY);
  }.property('hasContent', 'status').cacheable(),
  needsSaveBindingDefault: SC.Binding.bool(),
  
  canEdit: function() {
    if (!this.get('hasContent')) return false;
    
    var status = this.get('status');
    return !!(status & SC.Record.READY);
  }.property('hasContent', 'status').cacheable(),
  
  markerPosition: function() {
    //var loc = this.get('location');
    //return GMap.LatLng(0, 0);
    
    //return GMap.LatLng(loc.get('latitude'), loc.get('longitude'));
    return this.get('location');
  }.property()
}) ;

Dispatch.incidentController = Dispatch.IncidentController.create({
  contentBinding: SC.Binding.single('Dispatch.incidentArrayController.selection'),
});