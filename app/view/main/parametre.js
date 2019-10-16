Ext.define('SensusKarst.view.main.parametre', {
    extend: 'Ext.panel.Panel',
    xtype: 'parametre',
	id : 'parametre',
    requires: [
    	'Ext.layout.container.Border'
    ],
    
    controller: 'parametrecontroller',
    bodyStyle : 'background-image:url("crue.jpg");background-size:cover;background-repeat: no-repeat;background-position:center',
    layout: 'column',
    height : (Ext.getBody().getHeight()-50),
    items :[
    	 {
            title: 'Paramètres Sensus',
			border : 5,
			margin : '20 20 20 20',
			//frame: true,
            columnWidth: 0.5,
            bodyPadding: 10,
            
            items:[
            			
								        {
								        xtype: 'fieldcontainer',
								        fieldLabel: 'Port Série',
								        margin: '20 0 0 0',
								        labelWidth : 130,
								        bodyPadding: 10,
								        layout: 'hbox',
								        defaults: {
								            hideLabel: true
								        },
								        items: [{
								            xtype: 'textfield',
								            name: 'com',
								            bind: '{port}',
								            readOnly : true,
								            margin: '0 20 20 0',
								        }, {
								            xtype     : 'button',
								            text      : 'Modifier',
								            handler: 'oncom'
								        }]
								    	},
								    	{
								        xtype: 'fieldcontainer',
								        fieldLabel: 'Intervalle par défaut',
								        labelWidth : 150,
								        layout: 'hbox',
								        defaults: {
								            hideLabel: true
								        },
								        items: [
								        	{
											xtype: 'numberfield',
					               			minValue: 1,
											width: 50,
											name : 'interval',
											bind: '{pinterval}',
											fieldLabel: 'interval',
											readOnly : true,
											margin: '0 5 20 0',
											},
											{
											width: 95,
											xtype: 'textfield',
											readOnly : true,
											name: 'unite',
											bind: '{punite}',
											 margin: '0 20 20 0',
											},
								        	{
								            xtype     : 'button',
								            text      : 'Modifier',
								            handler: 'oninterval'
								        }]
								    	},
			    					
            			{
					        xtype: 'fieldset',
					        title: 'Paramètres avancés',
					        margin : '30 0 0 0',
					        bodyPadding: 10,
					        anchor: '100%',
					        defaults: {
								            labelWidth : 195,
								        },
					
					        items: [
								        {
								        xtype: 'fieldcontainer',
								        fieldLabel: 'Moyennage (x1, x2 ou x4)',
								        margin: '15 0 0 0',
								        layout: 'hbox',
								        defaults: {
								            hideLabel: true
								        },
								        items: [{
								            xtype: 'textfield',
								            name: 'moyennage',
								            width : 100,
								            bind: 'x{pmoyenne}',
								            readOnly : true,
								            margin: '0 20 20 0',
								        }, {
								            xtype     : 'button',
								            text      : 'Modifier',
								            handler: 'onmoyennage'
								        }]
								    	},
								    	 {
								        xtype: 'fieldcontainer',
								        fieldLabel: 'Pression déclenchement marche',
								        //margin: '20 0 0 0',
								        layout: 'hbox',
								        defaults: {
								            hideLabel: true
								        },
								        items: [{
								            xtype: 'textfield',
								            name: 'com',
								            width : 100,
								            bind: '{pdeclench} mbar',
								            readOnly : true,
								            margin: '0 20 20 0',
								        }, {
								            xtype     : 'button',
								            text      : 'Modifier',
								            handler: 'ondeclench'
								        }]
								    	},
								    	 {
								        xtype: 'fieldcontainer',
								        fieldLabel: 'Pression déclenchement veille',
								        //margin: '20 0 0 0',
								        layout: 'hbox',
								        defaults: {
								            hideLabel: true
								        },
								        items: [{
								            xtype: 'textfield',
								            name: 'com',
								            width : 100,
								            bind: '{pdeclench0} mbar',
								            readOnly : true,
								            margin: '0 20 20 0',
								        }, {
								            xtype     : 'button',
								            text      : 'Modifier',
								            handler: 'ondeclench0'
								        }]
								    	},
								    	 {
								        xtype: 'fieldcontainer',
								        fieldLabel: 'Intervalle mesure en veille',
								        //margin: '20 0 0 0',
								        layout: 'hbox',
								        defaults: {
								            hideLabel: true
								        },
								        items: [{
								            xtype: 'textfield',
								            width : 100,
								            bind: '{pinterval0} s',
								            readOnly : true,
								            margin: '0 20 20 0',
								        }, {
								            xtype     : 'button',
								            text      : 'Modifier',
								            handler: 'oninterval0'
								        }]
								    	},
								    	
			    					]
            			},
            			
            			
            		]
        },
 		{
               columnWidth: 0.5,
               layout: {
			        type: 'vbox',
			        pack: 'top',
			        align: 'stretch'
			    },
			    margin : '10 20 20 0',
			    bodyStyle : 'background-color:transparent;',
			    bodyPadding: 10,
 				items: [
 					{
            			 title: 'Informations SensusKarst',
            			 maxHeight: 300,
            			 border : 5,
            			 bodyPadding: 10,
            			 bind: {
            			 html : '<p>SensusKarst est une application libre développée dans le cadre du GIPEK</p><p>http://gipek.fr</p><p>License : GPL v3</p><p>Version SensusKarst :  V{version}</p>'
            			 }
            		},
            		{html :"<br>",bodyStyle : 'background-color:transparent;',},
            		{
					        title: 'Gestion Sauvegarde',
					        layout : 'vbox',
					        vertical: true,
					        maxHeight: 230,
					        border : 5,
            			 	bodyPadding: 10,
					        defaultType: 'button',
					        defaults: {
							            	margin : '10 25',
							                anchor: '100%',
							            },
					        items: [
					       			{
								        text: 'Sauvegarder les paramètres et fichiers sensus brut SensusKarst',
								        handler: 'onsauv'
								    },
								    {
								        text: 'Restaurer des paramètres et fichiers sensus brut SensusKarst',
								        handler: 'onrestore'
								    },								    
					        ]
					    }
 				]
 				
        }
		],	    

    tbar: [
	    { xtype: 'tbfill' },
	    {
	        text: 'Réinitiallisation Paramètres',
	        handler: 'onquit'
	    },
   		 { xtype: 'tbspacer', width: 50 },
        {
        text: 'Quitter',
        handler: 'onquit'
    },

    ],


});
