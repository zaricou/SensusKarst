Ext.define('SensusKarst.view.main.recuplistWin', {
    extend: 'Ext.window.Window',
    xtype: 'recuplistWin',
    
    bind :{
    	title: '{nbrserie} Séries brut ont été récupérées de la sonde {serie}',
    },
    modal: true,
    closeAction : 'hide',
    items:[
    	{
    	xtype: 'recuplistGrid'
    	}
    ],
    bbar: [
   		{ xtype: 'tbfill' },
    	{
	        text: 'Fermer',
	        handler: function(){
	        	this.up('window').close();
	        }
    	},
    ]

});