Ext.define('SensusKarst.view.main.ListemarcheGrid', {
    extend: 'Ext.grid.Panel',
    xtype: 'ListemarcheGrid',
    controller: 'ListemarcheControl',
    requires: [
        'SensusKarst.store.listmarche',
    ],

    layout: 'fit',
    //width: 800,
    //height: 700,
    border : 5,
    tools: [
    	
    	],

    columns: [{
        text: 'Sonde',
        dataIndex: 'serie1',
        width: 80,
    	},
    	{
        text: 'Titre',
        dataIndex: 'titre',
        width: 120,    
        },
    	{
        text: 'Depuis',
        dataIndex: 'datedeb',
        xtype:'datecolumn',
        format:'d/m/Y H:i',
		width: 130,
    },
        {
         text: 'Intervalle',
        dataIndex: 'intervalle',
		width: 90,
    },{
        text: 'Informations',
        dataIndex: 'info',
		flex:1,
    },{
    	xtype: 'actioncolumn',
    	width: 30,
    	sortable: false,
    	items: [{
    		iconCls: 'x-fa fa-edit',
    		tooltip: 'Editer les infos',
    		handler: 'modif'
    		}
    	],
    },{
    	xtype: 'actioncolumn',
    	width: 30,
    	sortable: false,
    	items: [{
    		iconCls: 'x-fa fa-eraser',
    		tooltip: 'Supprimer l\'enregistrement',
    		handler: 'supprime'
    		}
    	],
    }
    ],	

    
    store: {
        type: 'listmarche'
   		 },



    fbar: [
    ]
});