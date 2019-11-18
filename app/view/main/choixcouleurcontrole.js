Ext.define('SensusKarst.view.main.choixcouleurcontrole', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.choixcouleurcontrole',
    
    
    onmodif : function(){
		var couleur = this.getViewModel().get('couleurserie');
		var serie = this.getViewModel().get('seriechangcouleur');
		Ext.getCmp('graph2').getController('graphcontrole').changecouleur(serie,couleur);
		this.view.destroy();		
    },
    
    onannule : function(){
    	
		this.view.destroy(); 
    	
    },
    
    onselect: function(picker, color) {
		           this.getViewModel().set('couleurserie',color);
	},
    
});    