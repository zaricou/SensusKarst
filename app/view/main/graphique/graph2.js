Ext.define('SensusKarst.view.main.graph2', {
			extend : 'Ext.Panel',
			xtype : 'graph2',
			id : 'graph2',
			controller : 'graphcontrole',

			requires : [
			 'SensusKarst.view.main.ListebrutWin',
			 'SensusKarst.view.main.graphique.ouvrefichierwin',
			 'SensusKarst.store.ouvrefichier',
			],

			layout : 'fit',
			
			 bodyStyle: {
			    	background: 'black',
				},

			tbar : {

				items : [ 	{
							text : 'Fichier',
							menu : {
								items : [
									{	
									text : 'Ouvrir Graphique',
									handler : 'confouvrir'
								}, {
									text : 'Enregistrer Graphique',
									handler : 'enregistrer'
								}, {
									text : 'Fermer Graphique',
									handler : 'quitter'
								},{
									text : 'Quitter',
									handler : 'quitter'
								},
								]
								}
							},
							{
							text : 'Ouvrir Série ',
							menu : {
								items : [
									{	
									text : 'Série SensusKarst',
									handler : 'ouvrefichier'
								}, {
									text : 'Série Sensus Brut',
									handler : 'listfichierbrut'
								}, {
									text : 'Importer Série',
									handler : 'ouvrefichier'
								}]
								}
							},
							{
							text : 'Exporter',
								menu : {
								items : [
								{	
									text : 'Imprimer Graphique',
									handler : 'exporter'
								}, {
									text : 'Graphique pdf',
									handler : 'exporter'	
								},{	
									text : 'Graphique jpg',
									handler : 'exporter'
								}, {
									text : 'Graphique png',
									handler : 'exporter'	
								}, {
									text : 'Graphique svg',
									handler : 'exporter'
								}, {
									text : 'Données Excel',
									handler : 'exporter'	
								}, {
									text : 'Données csv',
									handler : 'exporter'
								}]
								}
							},
							{ xtype: 'tbfill' }
							,
							{
							text : 'Zoom selection',
							menu : {
								items : [
										{
									text : 'zoom 2 axes',
									checked : false,
									group : 'zoom',
									checkHandler : 'onzoom'
								}, {
									text : 'zoom axe X',
									checked : false,
									group : 'zoom',
									checkHandler : 'onzoom'
								}, {
									text : 'zoom axe Y',
									checked : false,
									group : 'zoom',
									checkHandler : 'onzoom'
								}, {
									text : 'zoom desactivé',
									checked : true,
									id : 'p4',
									group : 'zoom',
									checkHandler : 'onzoom'
								}]
							}

						}, 
						 {
							text : 'Desactive Zoom',
							handler : 'onnozoom'
						},	
						{
							text : 'Zoom-',
							handler : 'zoommoins'
							,
						}, {
							text : 'Zoom+',
							handler : 'zoomplus'
							,
						}, {
							text : 'Echelle Auto',
							handler : 'zoomreset'
							,
						},{
							text : 'Modifier Echelles',
							handler : 'modifaxe'
							,	
						}, {
							text : 'Valeurs Curseur',
							toggleHandler : 'oncurseur',
							enableToggle : true
						}
				]

			},

			items : {
				contentEl : 'graphd'
			}
		});