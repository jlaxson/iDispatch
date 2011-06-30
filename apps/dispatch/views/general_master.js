// ==========================================================================
// Project:   Dispatch.GeneralMasterView
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals Dispatch */

/** @class

  (Document Your View Here)

  @extends SC.View
*/
Dispatch.GeneralMasterView = SC.WorkspaceView.extend(
/** @scope Dispatch.GeneralMasterView.prototype */ {

  contentView: SC.ScrollView.design({
    backgroundColor: '#D0DAE3',
    contentView: SC.SourceListView.design({
      contentValueKey: 'title',
      contentBinding: 'Dispatch.generalMasterViewController.arrangedObjects',
      selectionBinding: 'Dispatch.generalMasterViewController.selection'
    })
  })

});

Dispatch.generalMasterViewController = SC.TreeController.create({
  treeItemIsGrouped: YES,
});

Dispatch.GeneralMasterView.tree = SC.Object.create({
  treeItemIsExpanded: YES,
  treeItemChildren: [
    SC.Object.create({ 
      title: 'Summary',
      group: true,
      treeItemIsExpanded: YES,
      treeItemChildren: [
        SC.Object.create({title: 'All'}), 
        SC.Object.create({title: 'Incidents'}), 
        SC.Object.create({title: 'Resources'})
      ]
    }),
    SC.Object.create({ 
      title: 'Configuration',
      group: true,
      treeItemIsExpanded: YES,
      treeItemChildren: [
        SC.Object.create({title: 'Station'}), 
        SC.Object.create({title: 'Event'}), 
        SC.Object.create({title: 'APRS'}), 
        SC.Object.create({title: 'Database'})
      ]
    }),
  ],
});