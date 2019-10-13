Ext.define('SensusKarst.view.main.graphique.ouvrefichierwin', {
    extend: 'Ext.window.Window',
    xtype: 'ouvrefichierwin',
    id : 'ouvrefichier',
    controller : 'ouvrefichiercontrole',
    
    title: 'ouvrir fichier',
    modal: true,
    resizable : false,
    layout: 'vbox',
    closeAction : 'hide',
    items:[
    	{
    	itemId : 'grid',	
    	xtype: 'ouvrefichiergrid'
    	},
    	{
    	itemId : 'form',	
    	xtype: 'ouvrefichierform'
    	}
    	
    ]

});