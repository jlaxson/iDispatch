// ==========================================================================
// Project:   Dispatch.AssignmentListItemView
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals Dispatch */

/** @class

  (Document Your View Here)

  @extends SC.View
*/
Dispatch.AssignmentListItemView = SC.View.extend(SC.Control, SC.ContentDisplay,
/** @scope Dispatch.AssignmentListItemView.prototype */ {
  
  classNames: ['d-assignment-list-item-view'],
  contentDisplayProperties: 'disposition name'.w(),
  
  content: null,
  contentTitleKey: null,
  contentSummaryKey: null,
  contentLocationKey: null,
  contentStatusKey: null,
  
  contentKey: function(key) {
    var del = this.displayDelegate;
    var content = this.get('content');
    
    var k;
    if (k = this.getDelegateProperty(key, del))
      return content.getPath(k);
    else if (k = this.get(key))
      return content.getPath(k);
    
    return '';
  },
  
  render: function(context, firstTime) {
    
    sc_super();
    
    console.log("render: " + firstTime);
    
    if (firstTime) {
      context = context.begin("div").addClass("icon").addClass(this.contentKey('contentIconKey')).end();
      context = context.begin("label").push(this.contentKey('contentTitleKey')).end();
      context = context.begin("span").addClass("summary").push(this.contentKey('contentSummaryKey')).end();
      context = context.begin("span").addClass("location").push(this.contentKey('contentLocationKey')).end();
      //context = context.begin("span").addClass("summary").push(this.contentKey('contentSummaryKey')).end();
    } else {
      //console.log(this.$('div.icon'));
      this.$('div.icon').setClass(['icon', this.contentKey('contentIconKey')]);
      this.$('>label').text(this.contentKey('contentTitleKey'));
      this.$('span.summary').text(this.contentKey('contentSummaryKey'));
      this.$('span.location').text(this.contentKey('contentLocationKey'));
    }
    
    //this.get('status').render(context, firstTime);
    
    //this.renderChildViews(context, firstTime);
    
    //sc_super();
    
    //return null;
  },

  childViews: "status".w(),

  status: SC.SegmentedView.design({
    controlSize: SC.LARGE_CONTROL_SIZE,
    layout: {width: 300, right: 10, height: 30, centerY: 0},
    horizontalAlign: SC.ALIGN_RIGHT,
    items: [
      'New', 'Pending', 'Enroute', 'Active', 'Closed'
    ],
    valueBinding: ".parentView.content.disposition",
    isEnabledBinding: ".parentView.content.isEditable",
  }),

});
