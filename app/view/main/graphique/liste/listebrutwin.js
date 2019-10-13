Ext.define('SensusKarst.view.main.ListebrutWin', {
    extend: 'Ext.window.Window',
    xtype: 'ListebrutWin',
    //controller: 'listebrutcontrol',
    
    title: 'Liste des séries brut Sensus enregistrées',
    modal: true,
    closeAction : 'hide',
    items:[
    	{
    	xtype: 'ListebrutGrid'
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