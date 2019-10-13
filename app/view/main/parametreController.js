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

    afterRender: function () {
   		
		this.getViewModel().set('port', val.port);
		this.getViewModel().set('pinterval', val.intervalp);
		this.getViewModel().set('punite', val.unite);
		this.getViewModel().set('pinterval0', val.interval0);
		this.getViewModel().set('pdeclench', val.declench);
		this.getViewModel().set('pdeclench0', val.declench0);
		this.getViewModel().set('pmoyenne', val.moyenne);
    },
    
    onreinitiallisation : function () {
    	
    },
    
    onquit : function (butt) {
    		const remote = require('electron').remote;
			var w = remote.getCurrentWindow();
			if (butt.text == 'Quitter'){
				var message = "Confirmer la fermeture de SensusKarst ?";
				var choix = 1;
			}
			else if (butt.text == 'Réinitiallisation Paramètres'){
				var message = "Confirmer la réinitiallisation des paramètres";
				var choix = 2;
			}
			 Ext.Msg.confirm("Confirmation",message, function(btnText){
		                if(btnText === "yes"){
		                   if (choix == 1){w.close();}
		                   else {
		                   		const Store = require('electron-store');
								const store = new Store();
								store.delete("parametre");
		                   		w.reload();
		                   		}
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
	

});