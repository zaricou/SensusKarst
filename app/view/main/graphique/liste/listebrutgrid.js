Ext.define('SensusKarst.view.main.ListebrutGrid', {
    extend: 'Ext.grid.Panel',
    xtype: 'ListebrutGrid',
    controller: 'listebrutcontrol',
    requires: [
        'Ext.grid.feature.Grouping',
        'SensusKarst.store.listbrut',
        'Ext.grid.filters.Filters',
    ],

    layout: 'fit',
    width: 780,
    height: 700,
    border : 5,
    plugins: 'gridfilters',

    tools: [{
        type: 'plus',
        handler: 'onExpandAll',
        tooltip: 'Développer tous les groupes',
        bind: {
            hidden: '{!groupBy}'
        }
    }, {
        type: 'minus',
        handler: 'onCollapseAll',
        tooltip: 'Réduire tous les groupes',
        bind: {
            hidden: '{!groupBy}'
        }
    }],

    columns: [{
        text: 'Sonde',
        dataIndex: 'serie',
        width: 80,
        
    },{
        text: 'Titre',
        dataIndex: 'info',
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
		filter: 'number' ,
    },{
        text: 'Intervalle',
        dataIndex: 'intervalle',
		width: 90,
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

    features: [{
        ftype: 'grouping',
        startCollapsed: true,
       groupHeaderTpl: '{name} ({rows.length} Série{[values.rows.length > 1 ? "s" : ""]})'
    }],
    
    store: {
        type: 'listbrut'
    },



    fbar: [
    	{
	        text: 'Afficher Nbre mesures > 2',
	        handler: 'onfiltre',
    	},
    	{ xtype: 'tbspacer', width: 300 }, 
    	{
	        text: 'Dégrouper',
	        reference:'degrouper',
	        handler: 'onClearGroupingClick',
    	},
    	{
	        text: 'Grouper',
	        reference:'grouper',
	        handler: 'onGroupingClick',
	        disabled :true,
    	}
    ]
});