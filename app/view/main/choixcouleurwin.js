Ext.define('SensusKarst.view.main.choixcouleurwin', {
    extend: 'Ext.window.Window',
    xtype: 'choixcouleurwin',
    id : 'choixcouleurwin',
    controller : 'choixcouleurcontrole',
    
    title: 'Choisir la couleur de la série',
    modal: true,
    resizable : false,
    layout: 'vbox',
    closeAction : 'destroy',
    items:[
    	{
		 	margin : '10 0 0 10',
		    html : 'Couleur Sélectionnée :'
		        		
		},
    	{
		 	margin : '5 0 30 10',
		    height: 20,
		    width : 550,
		        		bind :{
			        		border: 3,
							style: {
							    borderColor: '#{couleurserie}',
							    borderStyle: 'solid'
							},	
			        		bodyStyle:{"background-color":"#{couleurserie}"},
		        		},
		        		
		},	
    
    	{
    	 xtype: 'colorpicker',
    	 colors : ["0000FF", "FF0000", "00FF00", "000000", "00FFFF", "FF00FF", "008000", "FFA500", "D1D1D1", "800000","4B0082","FFC0CB","ADD8E6","7A9BFF","FF667B",
					"A4E400","9E85C7","F5E800","FF8837","9CF1CF"
    	 		 ],
    	 margin : '5 60 0 60',
    	 width : 130,
    	 height: 100,
	     listeners: {
		        select: 'onselect'
		    }
    	 
    	},
    	{
    	xtype: 'colorselector',
    	bind : {
	    	 value : '{couleurserie}',
	    	 },	 
    	}
       ],
      buttons: [
									        {
									            text: 'Valider couleur',
									            handler: 'onmodif'
									        },
									        {
									            text: 'Annuler',
									            handler: 'onannule'
								            }] 

});