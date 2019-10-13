Ext.define('SensusKarst.view.main.graphique.ouvrefichiergrid', {
    extend: 'Ext.grid.Panel',
    xtype: 'ouvrefichiergrid',
    //controller : 'ouvrefichiercontrole',

  

   width: 100,
   height: 300,
    layout: 'fit',
    columnLines: true,
    trackOver: false,
    selModel: 'cellmodel',
	columns: [],
	viewConfig : {
     			enableTextSelection: true,
     			getRowClass: function () {
									        return this.enableTextSelection ? 'x-selectable' : '';
									    }
			},
	store: {
        type: 'ouvrefichier'
    },

});