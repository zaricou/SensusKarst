Ext.define('SensusKarst.view.main.recuplistGrid', {
    extend: 'Ext.grid.Panel',
    xtype: 'recuplistGrid',
   // controller: '',
    requires: [
        'SensusKarst.store.recuplist',
    ],

    layout: 'fit',
    width: 780,
    maxHeight: 500,
    border : 5,



    columns: [
    {
        text: 'Titre',
        dataIndex: 'titre',
        flex: 1    
    },{
        text: 'Du',
        dataIndex: 'datedeb',
         xtype:'datecolumn',
        format:'d/m/Y H:i',

        flex: 1
    },{
        text: 'Au',
        dataIndex: 'datefin',
         xtype:'datecolumn',
        format:'d/m/Y H:i',

        flex: 1
    },{
        text: 'Nbre mesures',
        dataIndex: 'nbremesure',
		width: 130,
    },{
        text: 'Intervalle',
        dataIndex: 'intervalle',
		width: 90,
    },{
        text: 'Ecart',
        dataIndex: 'ecart',
		width: 120,
    },{
    	xtype: 'actioncolumn',
    	width: 30,
    	sortable: false,
    	items: [{
    		iconCls: 'x-fa fa-line-chart',
    		tooltip: 'Ouvrir Graphique',
    		handler: function(grid, rowIndex, colIndex, item, e, record) {
    			if(record.get('nbremesure')>1){
    				Ext.getCmp('main').setActiveTab(0);
	                Ext.getCmp('graph2').getController().ouvrebrut(record.get('nomfichier'),record.get('serie'));
	                
	    			}
                }
    		}
    	],
    }],	

    
    store: {
        type: 'recuplist'
    },

});