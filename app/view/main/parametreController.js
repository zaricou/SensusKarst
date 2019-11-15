Ext.define('SensusKarst.view.main.parametreController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.parametrecontroller',

    oncom: function (sender, record) {
        Ext.getCmp('list').getController('graphcontrole').onport();
    },
    
    oninterval: function (sender, record) {
    	var thiss = this;
    	thiss.formmodif = Ext.create('Ext.form.Panel', {
									          bodyPadding: 10,
  											  fieldDefaults: {
											        labelWidth: 140,
											    },
											 // width: 500,
										            items: [
										              {
												            xtype : 'fieldcontainer',
												            fieldLabel: 'Intervalle par défaut',
												            layout: 'hbox',
												            defaults: {
												                hideLabel: true,
												                margin: '0 5 0 0'
												            },
												            items: [
												             	{
												                xtype: 'numberfield',
               													minValue: 1,
												                width: 90,
												                name : 'interval',
												                value : thiss.getViewModel().get('pinterval'),
												                allowBlank: false
												           		},
												            	{
												                width: 95,
												                xtype: 'combo',
												                queryMode: 'local',
												                value : thiss.getViewModel().get('punite'),
												                triggerAction: 'all',
												                forceSelection: true,
												                editable: false,
												                fieldLabel: 'unite',
												                name: 'unite',
												                displayField: 'name',
												                valueField: 'name',
												                store: {
												                    fields: ['name', 'value'],
												                    data: [
												                        {name : 'Secondes',   value: 'seconde'},
												                        {name : 'Minutes',  value: 'minute'},
												                        {name : 'Heures', value: 'heure'}
												                    ]}
												            	 }
												                ]
												    },
												    
										           ],
									        buttons: [
									        {
									            text: 'Modifier',
									            disabled: true,
                                				formBind: true,
									            handler: function(){
									            	    const Store = require('electron-store');
														const store = new Store();
									            		var config = thiss.formmodif.getForm().getValues();
									            		val.intervalp = config.interval;
									            		val.unite = config.unite;
									            		thiss.getViewModel().set('pinterval', val.intervalp);
														thiss.getViewModel().set('punite', val.unite);
									            		store.set("parametre.interval",val.intervalp);
									            		store.set("parametre.unite",val.unite);
									            		thiss.formmodif.destroy(); 
								            		    thiss.winmodif.destroy();
									            }
									        },
									        {
									            text: 'Annuler',
									            handler: function(){
									            	thiss.formmodif.destroy(); 
								            		thiss.winmodif.destroy(); 
									            }
									        }]
									        
									    });
		thiss.winmodif = Ext.create('Ext.window.Window', {
									        title: 'Définition intervalle par défaut',
									        closable : false,
									        layout: 'fit',
									        alwaysOnTop : -1000,
									        modal: true,
									        items: thiss.formmodif,
									      }).show();
    	
        
			
    },
    
   onmoyennage: function (sender, record) {
    	var thiss = this;
    	thiss.formmodif = Ext.create('Ext.form.Panel', {
									          bodyPadding: 10,
  											  fieldDefaults: {
											        labelWidth: 195,
											    },
										            items: [
										              {
												               // width: 95,
												                xtype: 'combo',
												                queryMode: 'local',
												                value : thiss.getViewModel().get('pmoyenne'),
												                triggerAction: 'all',
												                forceSelection: true,
												                editable: false,
												                fieldLabel: 'Moyennage (x1, x2 ou x4)',
												                name: 'moyenne',
												                displayField: 'name',
												                valueField: 'value',
												                store: {
												                    fields: ['name', 'value'],
												                    data: [
												                        {name : 'x1', value: '1'},
												                        {name : 'x2', value: '2'},
												                        {name : 'x4', value: '4'}
												                    ]}
												       }
										           ],
									        buttons: [
									        {
									            text: 'Modifier',
									            disabled: true,
                                				formBind: true,
									            handler: function(){
									            	    const Store = require('electron-store');
														const store = new Store();
									            		var config = thiss.formmodif.getForm().getValues();
									            		val.moyenne = config.moyenne;
									            		thiss.getViewModel().set('pmoyenne', val.moyenne);
									            		store.set("parametre.moyenne",val.moyenne);
									            		thiss.formmodif.destroy(); 
								            		    thiss.winmodif.destroy();
									            }
									        },
									        {
									            text: 'Annuler',
									            handler: function(){
									            	thiss.formmodif.destroy(); 
								            		thiss.winmodif.destroy(); 
									            }
									        }]
									        
									    });
		thiss.winmodif = Ext.create('Ext.window.Window', {
									        title: 'Définition moyennage mesure sensus',
									        closable : false,
									        layout: 'fit',
									        alwaysOnTop : -1000,
									        modal: true,
									        items: thiss.formmodif,
									      }).show();
    },
    
    ondeclench: function (sender, record) {
    	var thiss = this;
    	thiss.formmodif = Ext.create('Ext.form.Panel', {
									          bodyPadding: 10,
  											  fieldDefaults: {
											        labelWidth: 195,
											    },
										            items: [
										              {
												            fieldLabel: 'Pression déclenchement marche',
												            xtype: 'numberfield',
												            name : 'declench',
               												minValue: 1,
               												maxValue: 65535,
												           // width: 290,
												            value : thiss.getViewModel().get('pdeclench'),
												            allowBlank: false
												    },
										           ],
									        buttons: [
									        {
									            text: 'Modifier',
									            disabled: true,
                                				formBind: true,
									            handler: function(){
									            	    const Store = require('electron-store');
														const store = new Store();
									            		var config = thiss.formmodif.getForm().getValues();
									            		val.declench = config.declench;
									            		thiss.getViewModel().set('pdeclench', val.declench);
									            		store.set("parametre.declench",val.declench);
									            		thiss.formmodif.destroy(); 
								            		    thiss.winmodif.destroy();
									            }
									        },
									        {
									            text: 'Annuler',
									            handler: function(){
									            	thiss.formmodif.destroy(); 
								            		thiss.winmodif.destroy(); 
									            }
									        }]
									        
									    });
		thiss.winmodif = Ext.create('Ext.window.Window', {
									        title: 'Définition Pression déclenchement en marche',
									        closable : false,
									        layout: 'fit',
									        alwaysOnTop : -1000,
									        modal: true,
									        items: thiss.formmodif,
									      }).show();
    },
    
    ondeclench0: function (sender, record) {
    	var thiss = this;
    	thiss.formmodif = Ext.create('Ext.form.Panel', {
									          bodyPadding: 10,
  											  fieldDefaults: {
											        labelWidth: 195,
											    },
										            items: [
										              {
												            fieldLabel: 'Pression déclenchement veille',
												            xtype: 'numberfield',
												            name : 'declench0',
               													minValue: 1,
               													maxValue: 65535,
												           //     width: 90,
												                value : thiss.getViewModel().get('pdeclench0'),
												                allowBlank: false,
												    },
										           ],
									        buttons: [
									        {
									            text: 'Modifier',
									            disabled: true,
                                				formBind: true,
									            handler: function(){
									            	    const Store = require('electron-store');
														const store = new Store();
									            		var config = thiss.formmodif.getForm().getValues();
									            		val.declench0 = config.declench0;
									            		thiss.getViewModel().set('pdeclench0', val.declench0);
									            		store.set("parametre.declench0",val.declench0);
									            		thiss.formmodif.destroy(); 
								            		    thiss.winmodif.destroy();
									            }
									        },
									        {
									            text: 'Annuler',
									            handler: function(){
									            	thiss.formmodif.destroy(); 
								            		thiss.winmodif.destroy(); 
									            }
									        }]
									        
									    });
		thiss.winmodif = Ext.create('Ext.window.Window', {
									        title: 'Définition Pression déclenchement veille',
									        closable : false,
									        layout: 'fit',
									        alwaysOnTop : -1000,
									        modal: true,
									        items: thiss.formmodif,
									      }).show();
    },
    
    oninterval0: function (sender, record) {
    	var thiss = this;
    	thiss.formmodif = Ext.create('Ext.form.Panel', {
									          bodyPadding: 10,
  											  fieldDefaults: {
											        labelWidth: 195,
											    },
										            items: [
										              {
												            fieldLabel: 'Intervalle mesure en veille',
												            xtype: 'numberfield',
												            name : 'interval0',
               													minValue: 1,
               													maxValue: 65535,
												           //     width: 90,
												                value : thiss.getViewModel().get('pinterval0'),
												                allowBlank: false
												    },
										           ],
									        buttons: [
									        {
									            text: 'Modifier',
									            disabled: true,
                                				formBind: true,
									            handler: function(){
									            	    const Store = require('electron-store');
														const store = new Store();
									            		var config = thiss.formmodif.getForm().getValues();
									            		val.interval0 = config.interval0;
									            		thiss.getViewModel().set('pinterval0', val.interval0);
									            		store.set("parametre.interval0",val.interval0);
									            		thiss.formmodif.destroy(); 
								            		    thiss.winmodif.destroy();
									            }
									        },
									        {
									            text: 'Annuler',
									            handler: function(){
									            	thiss.formmodif.destroy(); 
								            		thiss.winmodif.destroy(); 
									            }
									        }]
									        
									    });
		thiss.winmodif = Ext.create('Ext.window.Window', {
									        title: 'Définition Intervalle mesure en veille',
									        closable : false,
									        layout: 'fit',
									        alwaysOnTop : -1000,
									        modal: true,
									        items: thiss.formmodif,
									      }).show();
    },
    
   ondatemofif : function () {
   		var thiss = this;
    	thiss.formmodif = Ext.create('Ext.form.Panel', {
									          bodyPadding: 10,
  											  fieldDefaults: {
											        labelWidth: 195,
											    },
										            items: [
										              {
											            xtype: 'combobox',
											            fieldLabel: 'Zone horaire ',
											            allowBlank:false,
											            name: 'zone',
											            store: {
											            	type: 'array',
											                fields: [ 'format','zone' ],
											                data: [
											                	['Heure Local (ordi)','local'],
											                    ['Temps universel (UTC)','0'],
											                    ['UTC +01 Heure d\'hiver','1'],
											                    ['UTC +02 Heure d\'été','2'],
											                    ['UTC +03:00','3'],
											                    ['UTC +04:00','4'],
											                    ['UTC +05:00','5'],
											                    ['UTC +06:00','6'],
											                    ['UTC +07:00','7'],
											                    ['UTC +08:00','8'],
											                    ['UTC +09:00','9'],
											                    ['UTC +10:00','10'],
											                    ['UTC +11:00','11'],
											                    ['UTC +12:00','12'],
											                    ['UTC -12:00','-12'],
											                    ['UTC -11:00','-11'],
											                    ['UTC -10:00','-10'],
											                    ['UTC -09:00','-9'],
											                    ['UTC -08:00','-8'],
											                    ['UTC -07:00','-7'],
											                    ['UTC -06:00','-6'],
											                    ['UTC -05:00','-5'],
											                    ['UTC -04:00','-4'],
											                    ['UTC -03:00','-3'],
											                    ['UTC -02:00','-2'],
											                    ['UTC -01:00','-1']
											                    
											                ]
											            },
											            valueField: 'zone',
											            value: thiss.getViewModel().get('fhaffich'),
											            forceSelection : true,
														allowBlank: false,
											            displayField: 'format',
											            typeAhead: true,
											        },
										           ],
									        buttons: [
									        {
									            text: 'Modifier',
									            disabled: true,
                                				formBind: true,
									            handler: function(){
									            	    const Store = require('electron-store');
														const store = new Store();
									            		var config = thiss.formmodif.getForm().getValues();
									            		val.fhaffich = config.zone;
														thiss.getViewModel().set('fhaffich', val.fhaffich);
									            		store.set("fhaffich",val.fhaffich);
									            		Ext.getCmp('graph2').getController('graphcontrole').modifzonedate(val.fhaffich);
									            		thiss.formmodif.destroy(); 
								            		    thiss.winmodif.destroy();
									            }
									        },
									        {
									            text: 'Annuler',
									            handler: function(){
									            	thiss.formmodif.destroy(); 
								            		thiss.winmodif.destroy(); 
									            }
									        }]
									        
									    });
		thiss.winmodif = Ext.create('Ext.window.Window', {
									        title: 'Définition Intervalle mesure en veille',
									        closable : false,
									        layout: 'fit',
									        alwaysOnTop : -1000,
									        modal: true,
									        items: thiss.formmodif,
									      }).show();
   		
   		
   		
   	
   },
   

    afterRender: function () {
   		
		this.getViewModel().set('port', val.port);
		this.getViewModel().set('pinterval', val.intervalp);
		this.getViewModel().set('punite', val.unite);
		this.getViewModel().set('pinterval0', val.interval0);
		this.getViewModel().set('pdeclench', val.declench);
		this.getViewModel().set('pdeclench0', val.declench0);
		this.getViewModel().set('pmoyenne', val.moyenne);
		this.getViewModel().set('fhaffich', val.fhaffich);
		
    },
    
    onreinitiallisation : function () {
    	
    },
    
    onquit : function (butt) {
    		const remote = require('electron').remote;
			var w = remote.getCurrentWindow();
			if (butt.text == 'Quitter SensusKarst'){
				var message = "Confirmer la fermeture de SensusKarst ?";
				var choix = 1;
			}
			else if (butt.text == 'Réinitiallisation Paramètres'){
				var message = "Confirmer la réinitiallisation des paramètres";
				var choix = 2;
			}
			else if (butt.text == 'Relancer SensusKarst'){
				var message = "Confirmer le redémarrage de Sensuskarst ?";
				var choix = 3;
			}			
			Ext.Msg.confirm("Confirmation",message, function(btnText){
		                if(btnText === "yes"){
		                   if (choix == 1){w.close();}
		                   else if (choix == 2) {
		                   		const Store = require('electron-store');
								const store = new Store();
								store.delete("parametre");
		                   		w.reload();
		                   		}
		                   else if (choix == 3) {w.reload();}		
		                }
		            }, this);
    },
	onsauv : function (butt) {
		const remote = require('electron').remote; 
		const app = remote.app;
		var AdmZip = require('adm-zip');
		var zip = new AdmZip();
		zip.addLocalFile(app.getPath('userData')+"/config.json");
		zip.addLocalFolder(app.getPath('userData')+"/data/", "data/")
		remote.dialog.showSaveDialog(remote.getCurrentWindow(), {
							        		    title: 'Sauvegarder paramètres SensusKarst',
							        		    defaultPath : "SensusKarst_sauvegarde.xsk",
							        		    filters: [
							        		            {name: 'Sauvegarde SensusKarst', extensions: ['xsk']},
							        		        ]
							        		    },
							        		    (file) => {
							        		    	 if (typeof file != 'undefined'){
							        		    		 zip.writeZip(file);
							        		    	 	}
							        		    });
	},
	
	onrestore : function (butt) {
		const remote = require('electron').remote; 
		const app = remote.app;
		
		remote.dialog.showOpenDialog(remote.getCurrentWindow(), {
							title: 'Restaurer une sauvegarde SensusKarst',
							properties : ['openFile'],
							filters: [{name: 'Sauvegarde SensusKarst', extensions: ['xsk']}]
							},(file) => {
										if (typeof file != 'undefined' ){
											Ext.MessageBox.confirm('Confirmation', 'Confirmer la restauration des paramètres et fichier Sensus brut ?<br>Les anciennes données seront effacées', 
																	function(btn){
																		if (btn == 'yes'){
																			var AdmZip = require('adm-zip');
																			var zip = new AdmZip(file[0]);
																			zip.extractAllTo(app.getPath('userData'), true)	
																		}
																	}, 
																	this);
											
										}
									});
		

	},
	
	
	onsupformat : function (butt) {
		var me = this
		const remote = require('electron').remote; 
		const app = remote.app;
		const Store = require('electron-store');
		const store = new Store();
		const fs = require('fs')
		var format = store.get("format");
							var result = [];
							var obj = [];
								for(var i in format){
									obj = [i];
									result.push(obj);
								}
   							me.formtitre = Ext.create('Ext.form.Panel', {
									          bodyPadding: 10,
  											  layout: 'form',
											  width: 400,
										            items: [
										              {
														xtype: 'combobox',
														fieldLabel: 'Format',
														name: 'format',
														forceSelection : true,
														labelWidth : 130,
														store: {
														            	type: 'array',
														                fields: [ 'format' ],
														                data:  result
														                
														            },
														displayField: 'format',
														typeAhead: true,
													 },
										           ],
									        buttons: [
									        {
									            text: 'Supprimer format',
									            handler: function(){
									              var cformat = me.formtitre.getForm().getValues().format;
									              if (cformat == ""){
									              }
									              else{
									              Ext.MessageBox.confirm('Confirmation', 'Supprimer le format : '+cformat, 
																	function(btn){
																		if (btn == 'yes'){
																			store.delete("format."+cformat)
																		}
																	}, 
																	this);
									            		
									            	me.formtitre.destroy(); 
								            		me.wintitre.destroy(); 
									              }
									            }
									        },
									        {
									            text: 'Annuler',
									            handler: function(){
									            	me.formtitre.destroy(); 
								            		me.wintitre.destroy(); 
									            }
									        }]
									        
									    });
							 me.wintitre = Ext.create('Ext.window.Window', {
									        title: 'Supprimer un format prédéfini',
									        closable : false,
									        layout: 'fit',
									        modal: true,
									        items: me.formtitre,
									      }).show();
		
		
		
	},
	
	
	onexportformat : function (butt) {
		var me = this
		const remote = require('electron').remote; 
		const app = remote.app;
		const Store = require('electron-store');
		const store = new Store();
		const fs = require('fs')
		var format = store.get("format");
							var result = [];
							var obj = [];
								for(var i in format){
									obj = [i];
									result.push(obj);
								}
   							me.formtitre = Ext.create('Ext.form.Panel', {
									          bodyPadding: 10,
  											  layout: 'form',
											  width: 400,
										            items: [
										              {
														xtype: 'combobox',
														fieldLabel: 'Format',
														name: 'format',
														forceSelection : true,
														labelWidth : 130,
														store: {
														            	type: 'array',
														                fields: [ 'format' ],
														                data:  result
														                
														            },
														displayField: 'format',
														typeAhead: true,
													 },
										           ],
									        buttons: [
									        {
									            text: 'Exporter',
									            handler: function(){
									              var cformat = me.formtitre.getForm().getValues().format;
									              var choix = store.get("format."+cformat);
									              var jformat = JSON.stringify(choix);
									              remote.dialog.showSaveDialog(remote.getCurrentWindow(), {
											        		    title: 'Exportation Format SensusKarst',
											        		    defaultPath : cformat+".fsk",
											        		    filters: [
											        		            {name: 'Format SensusKarst', extensions: ['fsk']},
											        		        ]
											        		    },
											        		    (file) => {
											        		    	 if (typeof file != 'undefined'){
											        		    	 	fs.writeFile(file, jformat,'utf8', function(err){
																		    if(err!=null){alert(err);}
																		});
											        		    	 	
											        		    		 
											        		    	 }
											        		    });
									            		
									            	me.formtitre.destroy(); 
								            		me.wintitre.destroy(); 
									              
									            }
									        },
									        {
									            text: 'Annuler',
									            handler: function(){
									            	me.formtitre.destroy(); 
								            		me.wintitre.destroy(); 
									            }
									        }]
									        
									    });
							 me.wintitre = Ext.create('Ext.window.Window', {
									        title: 'Choisir un format prédéfini à exporter',
									        closable : false,
									        layout: 'fit',
									        modal: true,
									        items: me.formtitre,
									      }).show();
		
		
		
	},
	
	
	onimportformat : function (butt) {
		const remote = require('electron').remote; 
		const app = remote.app;
		
		remote.dialog.showOpenDialog(remote.getCurrentWindow(), {
							title: 'Importation Format SensusKarst',
							properties : ['openFile'],
							filters: [{name: 'Format SensusKarst', extensions: ['fsk']}]
							},(file) => {
										if (typeof file != 'undefined' ){
											var chemin = file[0].split('.');
											var nom1 = chemin[0].split('\\');
											var nom = nom1[nom1.length-1];
											Ext.MessageBox.confirm('Confirmation', 'Confirmer l\'importation du format : '+nom, 
																	function(btn){
																		if (btn == 'yes'){
																			const Store = require('electron-store');
																			const store = new Store();
																			const fs = require('fs')
																			fs.readFile(file[0],'utf8', function(err, contents) {
																			   if (store.has("format."+nom)){
																        	 	 	 Ext.Msg.confirm('Problème !', 'Un format avec ce nom existe déjà<br>Souhaitez-vous le remplacer ?', function(btnText, sInput){
																		                if(btnText === 'yes'){
																		                	 store.set("format."+nom,JSON.parse(contents));
																		                	}
																		            	}, this);
																        	 	 	 
																        	 	 }
																        	 	 else {
																				 	store.set("format."+nom,JSON.parse(contents));
																        	 	 }
																			})
																		}
																	}, 
																	this);
											
										}
									});
		

	},
	
	

});