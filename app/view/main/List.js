Ext.define('SensusKarst.view.main.List', {
    extend: 'Ext.panel.Panel',
    xtype: 'mainlist',
	id : 'list',
    requires: [
    	'Ext.layout.container.Border'
    ],
    
    controller: 'list',
   // title: 'Personnel',
    
    layout: 'column',
    items :[
    	 {
            height : (Ext.getBody().getHeight()-120),
            title: 'Controle de sonde Sensus',
			border : 5,
			margin : '10 0 0 0',
			frame: true,
            columnWidth: 1,
            layout: {
					        type: 'accordion',
					        animate: true,
					        multi : true,
					        
					    },
					    
			defaults: {
					  bodyPadding: 10,
					},
		    items: [{
		        title: 'Etat Sonde Sensus',
		        layout : {
				    type  : 'vbox',
				    pack  : 'start',
				    align : 'stretch'
				},
		        items: [
		        
		        	{
		        		margin : '10 0 30 0',
		        		minHeight: 120,
		        		bind :{
		        		border: 3,
						style: {
						    borderColor: '{couleur}',
						    borderStyle: 'solid'
						},	
		        		bodyStyle:{"background-color":"{couleuretat}","color":"{couleur}"},
		        		html : '<p style="text-align:center; font-size:20px;">{texteetat}</p><p style="text-align:center">{infosonde}<p style="text-align:center">{datesensus}</p>'
		        		},
		        	},
		        	{
					    margin : '0 0 10 0',
					    xtype : 'button' ,
					    scale: 'large',
		        		text: 'Analyser une Sensus',
					    handler: 'onanalyse',
					},
					{
					    margin : '0 0 3 0',
					    xtype : 'button' ,
		        		text: 'Mesure temps réel de la sonde',
					    handler: 'onaction',
					    bind: {disabled: '{mode}'}
					},
		        	{
					    margin : '0 0 3 0',
					    xtype : 'button' ,
		        		text: 'Lecture des nouvelles séries de la sonde',
					    handler: 'onaction',
					    bind: {disabled: '{mode}'}
					},
					{
					    margin : '0 0 3 0',
					    xtype : 'button' ,
		        		text: 'Démarrer les mesures de la sonde',
					    handler: 'onaction',
					    bind: {disabled: '{mode}'}
					},
		        ]
		    },{
		        title: 'Informations avancées sur la sonde',
		        collapsed : true,
		        layout: 'hbox',
		        maxHeight: 180,
		        bodyPadding: 0,
		        margin :'8 0',
		        items: [
		        			{
				            xtype: 'fieldset',
				            flex: 1,
				            minWidth : 210,
				            border: false,
				            layout: 'anchor',
				            defaultType: 'textfield',
				            defaults: {
				            	readOnly:true ,
				                anchor: '100%',
				            },
				            items: [
				            						    {
													        fieldLabel: 'N° de série ',
													        name: 'serie',
													        margin :'8 0 5 0',
													        bind: '{serie}',
													    },
													    {
													    	fieldLabel: 'Intervale ',
													        name: 'interval',
													        bind: '{interval}',
													    },
													    {
													    	fieldLabel: 'Déclenchement',
													        name: 'declench',
													        bind: '{declench}',
													    },
													    {
													    	fieldLabel: 'Moyennage',
													        name: 'moyenne',
													        bind: '{moyenne}',
													    },
													    {
													    	fieldLabel: 'Endcount',
													        name: 'endcount',
													        bind: '{endcount}',
													    },
				            ]
				        }, {
				            xtype: 'fieldset',
				            flex: 1,
				            minWidth : 210,
				            border: false,
				            layout: 'anchor',
				            defaultType: 'textfield',
				            defaults: {
				            	readOnly:true ,
				                anchor: '100%',
				            },
				            items: [
				            							{
				            								fieldLabel: 'Firmware',
													        name: 'modele',
													        margin :'8 0 5 0',
													        bind: '{modele}',
													    },
													    {
													    	fieldLabel: 'Horloge Sensus',
													        name: 'tempssensus',
													        bind: '{tempssensus}',
													    },
													    {
													    	fieldLabel: 'Nombre Séries',
													        name: 'nbrserie',
													        bind: '{nbrserie}',
													    },
													    {
													    	fieldLabel: 'Nombre Reboot',
													        name: 'bootcount',
													        bind: '{bootcount}',
													    },
													    {
													    	fieldLabel: 'Horloge Reboot',
													        name: 'boottime',
													        bind: '{boottime}',
													    },
				            ]
				        },
		        
		        
		        
		        

					    
					    ],
		    },{
		        title: 'Gestion sonde Avancées',
		        layout : 'vbox',
		        vertical: true,
		        maxHeight: 230,
		        collapsed : true,
		        defaultType: 'button',
		        defaults: {
				            	margin : '3 5',
				                anchor: '100%',
				            },
		        items: [
		       			{
					        text: 'Etat de la sonde',
					        handler: 'onetat'
					    },
					    {
					        text: 'Mesure temps réel de la sonde',
					        handler: 'oninfo'
					    },
					    {
					        text: 'Démarrer les mesures de la sonde ',
					        handler: 'onmarche'
					    },
					    {
					        text: 'Arrêter les mesures de la sonde ',
					        handler: 'onarret'
					    },
					    
					    {
					        text: 'Lecture des nouvelles séries de la sonde ',
					        handler: 'ondata'
					    },
					     {
					        text: 'Lecture de la série programmée de la sonde ',
					        handler: 'ondataseul'
					    },
		        ]
		    }],
		    fbar: [
		    { xtype: 'box',bind: 'Port série : {portcom}'},
		    { xtype: 'tbspacer', width: 20 }, 
		    {text: 'Modifier ',
			 handler: 'onport'
			   }, 
		    ]
        },
        
        {
               layout: {
			        type: 'vbox',
			        pack: 'center',
			        align: 'stretch'
			    },
			    height : (Ext.getBody().getHeight()-100),
			    bodyPadding: 10,
			
			    defaults: {
			        frame: true,
			    },
            width: 800,
            items : [
            	  {
			            title: 'Liste des Sensus en cours de mesure',
			            id:'sensusmarche',
			           border : 2,
			           flex : 6,
			           margin : '0 0 10 0',
			            xtype: 'ListemarcheGrid',
			            listeners: {
			        			afterrender: 'loadmarche'
			    				}
			      },
            	 {
			            title: 'Liste des séries brut Sensus récupérées',
			            id:'sensusbrut',
			           border : 2,
			           flex : 9,
			            xtype: 'ListebrutGrid',
			            listeners: {
			        			afterrender: 'ouvrebrut'
			    				}
			      }
            ]
        }

		],	    

    tbar: [
    	{ xtype: 'tbfill' },
        {
        text: 'Quitter',
        handler: 'onquit'
    	},
    ],



    listeners: {		    
								
    }
});
