// ==========================================================================
// Project:   Dispatch.TextPromptPane
// Copyright: ©2010 My Company, Inc.
// ==========================================================================
/*globals Dispatch */

/** @class

  (Document Your View Here)

  @extends SC.View
*/
Dispatch.TextPromptPane = SC.PanelPane.extend(
/** @scope Dispatch.TextPromptPane.prototype */ {

  value: null,

  layout: {height: 150, width: 500, centerX: 0, centerY: 0},
  contentView: SC.View.design({
    childViews: "titleLabel categoryText saveButton".w(),
    titleLabel: SC.LabelView.design({
      controlSize: SC.LARGE_CONTROL_SIZE,
      valueBinding: '.pane.title',
      layout: {top: 10, left: 10, height: 40, right: 10}
    }),
    categoryText: SC.TextFieldView.design({
      controlSize: SC.LARGE_CONTROL_SIZE,
      valueBinding: '.pane.value',
      layout: {top: 50, left: 10, right: 10, height: 30}
    }),
    saveButton: SC.ButtonView.design({
      title: 'Save',
      layout: {right: 10, bottom: 10, height: 40, width: 100},
      action: function() {
        this.get('pane').remove();
      }
    }),
  }),

});
