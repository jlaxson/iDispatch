// ==========================================================================
// Project:   Dispatch.IncidentMasterView
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals Dispatch */

/** @class

  (Document Your View Here)

  @extends SC.View
*/
sc_require('views/detail_list_item');

Dispatch.IncidentMasterView = SC.WorkspaceView.extend(
/** @scope Dispatch.IncidentMasterView.prototype */ {
  init: function() {
    sc_super();
    
    SC.routes.add("incident/:incident", this, "activateRoute");
  },
  
  _routeIncident: null,
  activateRoute: function(id) {
    //return;
    var inc = Dispatch.store.find(Dispatch.Incident, id.incident);
    console.log(inc.toString());
    if (!SC.none(inc) && (inc.get('status') & SC.Record.READY)) {
      console.log("is ready");
      this.showIncident(inc);
    } else if (!SC.none(inc)) {
      this._routeIncident = inc;
      inc.addObserver("status", this, this.incidentStatusObserver);
    }
  },
  
  incidentStatusObserver: function() {
      if (SC.none(this._routeIncident)) return;
      
      var inc = this._routeIncident;
      var stat = inc.get('status');
      if (stat & SC.Record.READY) {
        this._routeIncident = null;
        this.showIncident(inc);
        inc.removeObserver("status", this, this.incidentStatusObserver);
      }
  },
  
  showIncident: function(inc) {
    Dispatch.incidentArrayController.selectObject(inc);
    this.showIncidentDetail(null);
    Dispatch.mainPage.mainPane.masterDetail.masterView.set('nowShowing', 'incidents');
  },
  
  showIncidentDetail: function(sender) {
    Dispatch.save();
    
    Dispatch.mainPage.mainPane.masterDetail.detailView.set('nowShowing', 'incidentDetail');
    Dispatch.resourceArrayController.set('selection', null);
    
    //Dispatch.assignmentArrayController.set('content', Dispatch.incidentController.get('assignments'));
    var resp;
    if (resp = this.getPath('pane.rootResponder'))
      resp.sendAction("hideMasterPicker", this);
    
    Dispatch.assignmentArrayController.setContentPath("Dispatch.incidentController.assignments");
    
    //console.log(sender);
    if (!SC.none(sender) && !SC.none(sender.get('selection').firstObject()))
      SC.routes.set('location', "incident/%@".fmt(sender.get('selection').firstObject().get('id')));
  },
  
  newIncidentAction: function(sender) {
    this.showIncidentDetail();
    var inc = Dispatch.store.createRecord(Dispatch.Incident, {});
    Dispatch.incidentArrayController.selectObject(inc);
  },
  
  filter: "All",
  updateFilter: function(sender) {
    var val = this.get('filter');
    var query = Dispatch.INCIDENTS_ALL;
    if (val === 'Active')
      query = Dispatch.INCIDENTS_ACTIVE;
    console.log(val);
    Dispatch.incidentArrayController.set('content', Dispatch.store.find(query));
    return YES;
  }.observes("filter"),
  
  tabBarItem: Iweb.ITabBarItem.create({
		title: "Incidents",
		image: 'icons medical-bag-tb-30'
	}),
	topToolbar: SC.ToolbarView.design({
	  childViews: "filterButton newButton".w(),
	  newButton: SC.ButtonView.design({
	    title: "New",
	    layout: {right: 10, height: 30, width: 60, centerY: 0},
	    action: "newIncidentAction",
	    controlSize: SC.HUGE_CONTROL_SIZE,
	  }),
	  filterButton: SC.SegmentedView.design({
	    anchorLocation: SC.ANCHOR_CENTER,
	    controlSize: SC.LARGE_CONTROL_SIZE,
	    layout: {centerY: 0, height: 30},
	    items: ['All', 'Active'],
	    value: "All",
	    valueBinding: ".parentView.parentView.filter",
	  }),
	}),
    // TODO: Add your own code here.
  contentView: SC.ScrollView.design({
    backgroundColor: '#D0DAE3',
    contentView: SC.SourceListView.design({
  	  contentBinding: 'Dispatch.incidentArrayController.arrangedObjects',
  	  selectionBinding: 'Dispatch.incidentArrayController.selection',
  	  classNames: ['row-height-44'],
  	  contentValueKey: 'description',
  	  rowHeight: 44,
  	  action: 'showIncidentDetail',
  	  actOnSelect: YES,
  	  exampleView: Dispatch.DetailListItemView.design(),
  	  allowsEmptySelection: NO,
      allowsMultipleSelection: NO,
  	  
  	  contentTitleKey: 'description',
  	  contentIconKey: 'iconForListView',
  	  contentSummaryKey: 'summaryForListView',
  	  contentStatusKey: 'disposition',
	  
  	  init: function() {
  	    sc_super();
	    
  	    this._timer = SC.Timer.schedule({
  	      interval: 60 * 1000,
  	      repeats: YES,
  	      target: this,
  	      action: 'doReloadAction',
  	    });
  	  },
	  
  	  doReloadAction: function() {
  	    this.reload();
  	  }
  	})
  })
});
