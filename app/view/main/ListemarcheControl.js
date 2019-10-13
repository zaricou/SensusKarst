Ext.define('SensusKarst.view.main.ListemarcheControl', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.ListemarcheControl',
    
    supprime: function(grid, rowIndex, colIndex, item, e, record) {
    			var thiss = this;
    			var serie = record.data.serie;
    			Ext.Msg.confirm("Confirmation","Confirmer la suppression de l'enregistrement ?", function(btnText){
                if(btnText === "yes"){
                    const Store = require('electron-store');
					const store = new Store();
					store.delete("marche."+serie);
					Ext.getCmp('list').getController('ListController').loadmarche();
                }
            }, this);
    },
    
    modif: function(grid, rowIndex, colIndex, item, e, record) {
    			var thiss = this;
    			var donnee = record.data;
    			console.log(donnee)
    			thiss.formdemar = Ext.create('Ext.form.Panel', {
									          bodyPadding: 10,
  											  fieldDefaults: {
											        labelAlign: 'right',
											        labelWidth: 190,
											        msgTarget: 'side'
											    },
											  width: 500,
										            items: [
										            {xtype: 'textfield',
												        name: 'serie',
												        width: 350,
												        fieldLabel: 'Numero de la sonde sensus',
												        readOnly: true,
												        value : donnee.serie
										              },
												    {xtype: 'textfield',
												        name: 'intervalle',
												        width: 350,
												        fieldLabel: 'Intervalle entre deux mesures',
												        readOnly: true,
												        value : donnee.intervalle
										              },
										              {
													      xtype: 'datefield',
													        fieldLabel: 'Date du début de mesure',
													        readOnly: true,
													        value: donnee.datedeb,
													        format:'d/m/Y H:i:s',
															width: 350,
													    },
													  {
													      xtype: 'textfield',
													        fieldLabel: 'Peut enregistrer',
													        readOnly: true,
													        value: donnee.datefin,
															width: 350,
													    },  
												     {xtype: 'textfield',
												        name: 'titre',
												        width: 350,
												        allowBlank: false,
												        fieldLabel: 'Lieu (court)',
												        value : donnee.titre
										              },
										              {xtype: 'textareafield',
												        name: 'infos',
												        width: 470,
												        fieldLabel: 'Information lieu de mesure ',
												        value : donnee.info
										              },	
										              {xtype: 'textfield',
												        name: 'profdeb',
												        width: 250,
												        fieldLabel: 'Profondeur installation (cm)',
												        value : donnee.prof
										              },
										              {xtype: 'textfield',
												        name: 'proffin',
												        width: 250,
												        fieldLabel: 'Profondeur récupération (cm)',
												        value : donnee.prof1
										              },
										           ],
									        buttons: [
									        {
									            text: 'Modifier',
									            disabled: true,
                                				formBind: true,
									            handler: function(){
									            		var config = thiss.formdemar.getForm().getValues();
									            		const Store = require('electron-store');
														const store = new Store();
														store.set("marche."+config.serie+".titre" ,config.titre);
														store.set("marche."+config.serie+".info" , config.infos.replace(/\n/g, " "));
														store.set("marche."+config.serie+".prof" , config.profdeb);
														store.set("marche."+config.serie+".prof1" , config.proffin);
														thiss.formdemar.destroy(); 
								            		    thiss.windemar.destroy(); 
								            		    Ext.getCmp('list').getController('ListController').loadmarche();
									            }
									        },
									        {
									            text: 'Annuler',
									            handler: function(){
									            	thiss.formdemar.destroy(); 
								            		thiss.windemar.destroy(); 
									            }
									        }]
									        
									    });
						thiss.windemar = Ext.create('Ext.window.Window', {
									        title: 'Mesures Sensus Ultra en cours',
									        closable : false,
									        layout: 'fit',
									        modal: true,
									        items: thiss.formdemar,
									      }).show();
                },
    
    
});