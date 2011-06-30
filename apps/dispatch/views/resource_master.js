// ==========================================================================
// Project:   Dispatch.ResourceMasterView
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals Dispatch */

/** @class

  (Document Your View Here)

  @extends SC.View
*/
Dispatch.ResourceMasterView = SC.WorkspaceView.extend(
/** @scope Dispatch.ResourceMasterView.prototype */ {
  init: function() {
    sc_super();
    
    SC.routes.add("resource/:resource", this, "activateRoute");
  },
  
  activateRoute: function(id) {
    //return;
    var res = Dispatch.store.find(Dispatch.Resource, id.resource);
    //console.log(res.toString());
    if (!SC.none(res) && (res.get('status') & SC.Record.READY)) {
      //console.log("is ready");
      this.showResource(res);
    } else if (!SC.none(res)) {
      this._routeResource = res;
      res.addObserver("status", this, this.statusObserver);
    }
  },
  
  statusObserver: function() {
      if (SC.none(this._routeResource)) return;
      
      var res = this._routeResource;
      var stat = res.get('status');
      if (stat & SC.Record.READY) {
        this._routeResource = null;
        this.showResource(res);
        res.removeObserver("status", this, this.statusObserver);
      }
  },
  
  showResource: function(res) {
    Dispatch.resourceArrayController.selectObject(res);
    this.showResourceDetail(null);
    Dispatch.mainPage.mainPane.masterDetail.masterView.set('nowShowing', 'resources');
  },
  
  showResourceDetail: function(sender) {
    Dispatch.save();
    
    Dispatch.mainPage.mainPane.masterDetail.detailView.set('nowShowing', 'resourceDetail');
    Dispatch.incidentArrayController.set('selection', null);
    
    Dispatch.assignmentArrayController.setContentPath("Dispatch.resourceController.assignments");
    
    var resp;
    if (resp = this.getPath('pane.rootResponder'))
      resp.sendAction("hideMasterPicker", this);
      
    if (sender && sender.get('selection').length() > 0)
      SC.routes.set('location', "resource/%@".fmt(sender.get('selection').firstObject().get('id')));
  },
  
  newResourceAction: function(sender) {
    this.showResourceDetail();
    
    var inc = Dispatch.store.createRecord(Dispatch.Resource, {});
    Dispatch.resourceArrayController.selectObject(inc);
  },
  
  filter: "All",
  updateFilter: function(sender) {
    var val = this.get('filter');
    var query = Dispatch.RESOURCES_ALL;
    if (val === 'Active')
      query = Dispatch.RESOURCES_ACTIVE;
    Dispatch.resourceArrayController.set('content', Dispatch.store.find(query));
    return YES;
  }.observes("filter"),
  
  tabBarItem: Iweb.ITabBarItem.create({
		title: "Resources",
		image: 'icons user-tb-30'
	}),
	
	//childViews: "toolbarView tableView".w(),
	autoResizeToolbars: YES,
	
	topToolbar: SC.ToolbarView.design({
	  anchorLocation: SC.ANCHOR_TOP,
	  childViews: "centerView newButton".w(),
	  centerView: SC.SegmentedView.design({
	    anchorLocation: SC.ANCHOR_CENTER,
	    controlSize: SC.LARGE_CONTROL_SIZE,
	    layout: {centerY: 0, height: 30},
	    items: "All Active".w(),
	    value: "All",
	    valueBinding: ".parentView.parentView.filter",
	  }),
	  newButton: SC.ButtonView.design({
	    title: "New",
	    layout: {right: 10, height: 30, width: 60, centerY: 0},
	    action: "newResourceAction",
	    controlSize: SC.HUGE_CONTROL_SIZE,
	  })
  }),
	
	contentView: SC.ScrollView.design({
	  backgroundColor: '#D0DAE3',
	  contentView: SC.SourceListView.design({
  	  contentBinding: 'Dispatch.resourceArrayController.arrangedObjects',
  	  selectionBinding: 'Dispatch.resourceArrayController.selection',
  	  classNames: ["row-height-44"],
  	  contentValueKey: 'name',
  	  rowHeight: 44,
  	  action: 'showResourceDetail',
  	  actOnSelect: YES,
  	  allowsEmptySelection: NO,
  	  
  	  exampleView: Dispatch.DetailListItemView.design(),
  	  
  	  contentTitleKey: 'name',
  	  contentStatusKey: 'currentStatus',
  	  contentSummaryKey: 'summaryForListView',
  	})
  })
});
