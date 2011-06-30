// ==========================================================================
// Project:   Dispatch.IncidentAssignmentView
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals Dispatch */

/** @class

  (Document Your View Here)

  @extends SC.View
*/
Dispatch.incidentAssignmentResourceArrayController = SC.ArrayController.create({
  
});

Dispatch.incidentAssignmentResourceController = Dispatch.ResourceController.create({
  contentBinding: SC.Binding.single('Dispatch.incidentAssignmentResourceArrayController.selection')
});

Dispatch.incidentAssignmentIncidentController = Dispatch.IncidentController.create({
  
});

Dispatch.IncidentAssignmentView = SC.NavigationView.extend(
/** @scope Dispatch.IncidentAssignmentView.prototype */ {
  _store: null,

  init: function() {
    sc_super();
    Dispatch.incidentAssignmentView = this;
    
    this._store = Dispatch.store.chain();
    
    
    //Dispatch.incidentAssignmentIncidentArrayController.set('content', this._store.find("Dispatch.Incident"));
    
    if (this.get('incident')) {
      var incident = this.get('incident');
      Dispatch.incidentAssignmentIncidentController.set('content', this._store.find(incident));
    } else {
      // query for incidents
    }
    
    if (this.get('resource')) {
      var resource = this.get('resource');
      Dispatch.incidentAssignmentResourceController.set('content', this._store.find(resource));
    } else {
      Dispatch.incidentAssignmentResourceArrayController.set('content', this._store.find("Dispatch.Resource"));
      Dispatch.incidentAssignmentResourceArrayController.set('selection', null);
    }
  },
  
  storeCleanupObserver: function() {
    var vis = this.get('isVisibleInWindow');
    if (!vis && this._store) {
      this._store.discardChanges();
      this._store.destroy();
      this._store = null;
    }
  }.observes("isVisibleInWindow"),
  
  assignStatus: null,
  assignIncidentAction: function() {
    // do stuff
    var incident = Dispatch.incidentAssignmentIncidentController.get('content');
    var resource = Dispatch.incidentAssignmentResourceController.get('content');
    
    console.log("assigning incident " + incident.toString());
    console.log("assigning resource " + resource.toString());
    
    var query = SC.Query.local(Dispatch.Assignment, "incident = {inc} AND resource = {res}", {inc: incident, res: resource});
    //console.log(query);
    //console.log(query.toString());
    var list = this._store.find(query);
    //console.log(list.toString());
    var assign = list.firstObject();
    console.log(assign ? assign.toString() : assign);
    if (SC.none(assign)) {
      console.log("creating new assignment");
      assign = this._store.createRecord(Dispatch.Assignment, {
        _id: Dispatch.store.get('dataSource').getUuid()
      });
    }
    
    assign.set('timestamp', SC.DateTime.create());
    assign.set('incident', incident);
    assign.set('resource', resource);
    assign.set('disposition', this.get('assignStatus'));
    
    this._store.commitChanges();
    this._store.destroy();
    this._store = null;
    Dispatch.store.commitRecords();
    Dispatch.incidentAssignmentView = null;
    
    this.get('pane').remove();
  },

  navigationContentView: SC.ScrollView.design({
    contentView: SC.ListView.design({
      contentBinding: 'Dispatch.incidentAssignmentResourceArrayController.arrangedObjects',
      selectionBinding: 'Dispatch.incidentAssignmentResourceArrayController.selection',
      contentValueKey: 'name',
      rowHeight: 44,
      action: "resourceSelected",
      actOnSelect: YES,
      backgroundColor: "white",
      topToolbar: SC.ToolbarView.design(),
      isSelectable: YES,
    }),
  }),
	
	confirmStationView: SC.ScrollView.design({
	  layout: {left: 0, right: 0, top: 0, bottom: 0},
	  backgroundColor: "white",
	  
	  contentView: SC.View.design(SC.FlowedLayout, {
  	  flowPadding: {left: 5, right: 5, top: 5, bottom: 5},
  	  //layout: {minHeight: 400},
  	  canWrap: NO,
  	  layoutDirection: SC.LAYOUT_VERTICAL,
  	  backgroundColor: "white",
  	  topToolbar: SC.ToolbarView.design(),
	  
  	  childViews: "titleLabel assignmentStatusLabel assignmentStatus incidentStatusLabel incidentStatus assignButton".w(),
  	  titleLabel: SC.LabelView.design({
  	    controlSize: SC.LARGE_CONTROL_SIZE,
  	    valueBinding: "Dispatch.incidentAssignmentResourceController.name",
  	    layout: {width: 200, height: 24}
  	  }),
	  
  	  assignButton: SC.ButtonView.design({
  	    layout: {left: 10, bottom: 10, width:230, height: 30},
  	    controlSize: SC.HUGE_CONTROL_SIZE,
  	    title: "Assign",
  	    action: "assignIncidentAction",
  	    //useAbsolutePosition: YES,
  	    //useAbsoluteLayout: YES,
  	  }),
	  
  	  assignmentStatusLabel: SC.LabelView.design({
  	    controlSize: SC.LARGE_CONTROL_SIZE,
  	    value: "Assignment Status:",
  	    layout: {width: 200, height: 24}
  	  }),
  	  assignmentStatus: SC.RadioView.design({
  	    items: ['New', 'Pending', 'Enroute', 'Active', 'Closed'],
  	    value: 'New',
  	    valueBinding: 'Dispatch.incidentAssignmentView.assignStatus',
  	    //layoutDirection: SC.LAYOUT_VERTICAL,
  	    layout: {width: 200, height: 120}
  	  }),
	  
  	  incidentStatusLabel: SC.LabelView.design({
  	    controlSize: SC.LARGE_CONTROL_SIZE,
  	    value: "New Incident Status:",
  	    layout: {width: 200, height: 24}
  	  }),
  	  incidentStatus: SC.RadioView.design({
  	    itemsBinding: "Dispatch.incidentAssignmentIncidentController.statusesForType",
  	    valueBinding: 'Dispatch.incidentAssignmentIncidentController.disposition',
  	    //layoutDirection: SC.LAYOUT_VERTICAL,
  	    layout: {width: 200, height: 100}
  	  }),
	  
  	}),
  }),
	
	resourceSelected: function(sender) {
    this.invokeLater(function() {
      if (Dispatch.incidentAssignmentResourceController.get('content') != null)
        this.push(this.confirmStationView.create());
    });
  }

});
