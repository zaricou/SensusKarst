Ext.define('SensusKarst.view.main.ListController', {
	extend : 'Ext.app.ViewController',
	
	alias : 'controller.list',

	donnenull : function() {
		this.getViewModel().set('modele', null);
		this.getViewModel().set('serie', null);
		this.getViewModel().set('interval', null);
		this.getViewModel().set('declench', null);
		this.getViewModel().set('moyenne', null);
		this.getViewModel().set('data', null);
		this.getViewModel().set('endcount', null);
		this.getViewModel().set('tempssensus',null);
		this.getViewModel().set('nbrserie',null);
		this.getViewModel().set('bootcount',null);
		this.getViewModel().set('boottime',null);
		this.getViewModel().set('datesensus',null);
		this.getViewModel().set('infosonde',null);
	},

	comsensus : function(message, act, ordre) {
		if(this.getViewModel().get('portcom')==null) {
			Ext.Msg.alert('Problème de communication','Aucun Port série de défini... ',{alwaysOnTop :true});
			}
		else{
		var thiss = this;
		thiss.donnenull();

		var action = act;
		var tempbase = 0;
		var tempssensus = 0;
		var compt = '';

		var portcom = thiss.getViewModel().get('portcom');

		function erreurcom() {
			port.close();
			thiss.getViewModel().set('couleuretat','Silver');
 			thiss.getViewModel().set('couleur','black');
 			thiss.getViewModel().set('texteetat','Pas de Sonde Sensus<br><br>Analysée');
 			thiss.getViewModel().set('datesensus','');
 			thiss.getViewModel().set('infosonde','');
 			thiss.getViewModel().set('mode',true);
			Ext.Msg.alert('Problème de communication','Vérifiez le port série sélectionné et la connection de la Sensus Ultra ',{alwaysOnTop :true});
		}

		function erreursensus() {
			port.close();
			thiss.getViewModel().set('couleuretat','Silver');
 			thiss.getViewModel().set('couleur','black');
 			thiss.getViewModel().set('texteetat','Pas de Sonde Sensus<br><br>Analysée');
 			thiss.getViewModel().set('datesensus','');
 			thiss.getViewModel().set('infosonde','');
			Ext.Msg.alert('Problème de communication','Erreur de lecture de la Sensus Ultra, réessayez... ',{alwaysOnTop :true});
		}

		var messagecom = Ext.MessageBox.show({
					msg : message,
					progressText : 'Lecture...',
					buttons : Ext.Msg.CANCEL,
					width : 300,
					wait : true,
					fn : function(buttonValue) {
						if (buttonValue == 'cancel') {
							clearTimeout(t);
							clearTimeout(t1);
							clearTimeout(t2);
							clearInterval(t4);
							port.close();
						}

					}
					,
				});

		var t = setTimeout(erreurcom, 2000);
		var t1;
		var t2;
		var t4;

		const SerialPort = require('serialport')
		const ByteLength = require('@serialport/parser-byte-length')
		const Ready = require('@serialport/parser-ready')
		const CRC = require('crc-full').CRC;
		var crc = new CRC("CRC16", 16, 0x1021, 0xFFFF, 0x0000, false, false);
		const port = new SerialPort(portcom, {
					baudRate : 115200,
					dataBits : 8,
					stopBits : 1,
					rtscts : false
					,
				})
		var a = 0;

		function recupvaleur() {
			console.log('recupvaleur');
			t2 = setTimeout(erreursensus, 2000);
			var parser3 = port.pipe(new ByteLength({
						length : 8
					}))
			parser3.on('data', function(data) {
						parser3.destroy();
						port.close();
						var data1 = data.slice(0, 0x0006);
						var d1 = data.readUInt16LE(0x0006)
						var d2 = crc.compute(data1)
						if (d1 == d2) {
							thiss.formvaleur = Ext.create('Ext.form.Panel', {
													          bodyPadding: 30,
													          defaultType: 'textfield',
				  											  fieldDefaults: {
															        labelWidth: 90,
															    },
														            items: [
																		    {
																		    	fieldLabel: 'Tension ',
																		        value : data.readUInt16LE(0) / 1000 + ' V',
																		    },
																		    {
																		    	fieldLabel: 'Température ',
																		    	value : (data.readUInt16LE(2) - 27315) / 100 + ' °C',
																		    },
																		    {
																		    	fieldLabel: 'Pression  ',
																		        value : data.readUInt16LE(4) + ' mbar',
																		    },
														           ],
													        buttons: [
													        {
													            text: 'OK',
													            handler: function(){
													            	thiss.formvaleur.destroy(); 
												            		thiss.winvaleur.destroy(); 
													            }
													        }]
													        
													    });
						thiss.winvaleur = Ext.create('Ext.window.Window', {
													        title: 'Mesures Temps Réel de la sonde U-'+val.serie,
													        closable : false,
													        layout: 'fit',
													        alwaysOnTop : -1000,
													        modal: true,
													        items: thiss.formvaleur,
													      }).show();
							
							clearTimeout(t2);
							messagecom.hide();
						} else {
							clearTimeout(t2);
							erreursensus();

						}

					})

		}

		function recupdata(seul) {
			const Store = require('electron-store');
			const store = new Store();
			var stop = 0;
			var der = 0;
			if (store.has(val.serie+ ".derniere")){
				der = store.get(val.serie+ ".derniere");
			}
			if (seul == 1 && store.has("marche."+val.serie) ){
				der = store.get("marche."+val.serie+".sensustime")-5;
			}
			var serie = 0;
			var recupdata1 = '';
			var recupdata = [];
			var prem = 0;
			var testfin = 0;
			console.log('recupdata');
			var page = 0;
			var pagev = 0;
			function verifcom() {
				if (page == pagev) {
					clearInterval(t4);
					erreursensus();
				} else {
					pagev = page;
				}
			}
			t4 = setInterval(verifcom, 2000);
			port.on('readable', function() {
						var lecture = port.read(517);
						if (lecture != null) {
							console.log('page');
							port.pause();
							page = lecture.readUInt16LE(0x0000);
							var donnees = lecture.slice(0x0002, 0x0202);
							var d1 = lecture.readUInt16LE(0x0202);
							var d2 = crc.compute(donnees);
							if ((d2 == 27029 || page > 4063 || stop == 1) && page>0 ) {
								console.log('fin');
								port.close();
								clearInterval(t4);
								messagecom.hide();
								thiss.traitementdata(recupdata, tempbase,tempssensus,der,seul);
							} else {
								if (d1 == d2) {
									var cod = 'A5';
									recupdata.push(donnees);
									var i = 0;
									do {
										if (donnees.readUInt32LE(i) == 0x00000000) {
											serie += 1;
											if(i == 508){var sensustime = prem;}
											else{var sensustime = donnees.readUInt32LE(i+4);}
											var orditime = tempbase+sensustime;
											var orditime2 = Ext.Date.parse(orditime, 'U')
											var orditime3 = Ext.Date.format(orditime2,'d/m/Y H:i:s');
											compt = compt + '\n\ndate : '+ orditime3;
											if (sensustime<=der){stop = 1;}
										}
										
										i += 1;
										
									} while (i < 509);//509-505									
									prem = donnees.readUInt32LE(0);

								} else {
									var cod = '00';
									clearInterval(t4);
									erreursensus();
								}

								var cont = lecture.readUInt8(516);
								if (cont == 0xA5) {
									port.write(cod, 'hex', function(erreur) {
												if (erreur) {
													erreursensus();
												} else {
													port.resume();
												}

											})

								} else {
									erreursensus();

								}
							}

						}

					})

		}

		function modifsensus(valeur) {
			console.log('modifsensus');
			switch (valeur) {
				case ('10') :
					if (message == 'Démarrage mesures Sensus Ultra') {
						var modif = val.interval;
					} else {
						var modif = val.interval0;
					}
					break;
				case ('11') :
					if (message == 'Démarrage mesures Sensus Ultra') {
						var modif = val.declench;
					} else {
						var modif = val.declench0;
					}
					break;
				case ('13') :
					var modif = val.moyenne;
					break;
			}

			var buf = Buffer.allocUnsafe(2);
			buf.writeUInt16LE(modif, 0);
			port.write(buf, function(err) {
						if (err) {
							erreursensus();
						} else {
							port.close();
							ordre += 1;
							function pausefin() {
								switch (message) {
									case ('Démarrage mesures Sensus Ultra') :
										thiss.onmarche(ordre);
										break;
									case ('Arrêt mesures Sensus Ultra') :
										thiss.onarret(ordre);
										break;
									case ('Initialisation Sensus Ultra') :
										thiss.oninit(ordre);
										break;

								}

							}
							var t6 = setTimeout(pausefin, 500);
						}

					})

		}

		function envoicode() {
			console.log('envoicode');
			t1 = setTimeout(erreursensus, 2000);
			var parser1 = port.pipe(new Ready({
						delimiter : Buffer.from([0xA5])
					}));
			parser1.on('ready', function() {
						port.write(action, 'hex', function(erreur) {
									parser1.destroy();
									var parser2 = port.pipe(new Ready({
												delimiter : Buffer.from([0xA5])
											}));
									parser2.on('ready', function() {
												parser2.destroy();
												port.write('B4', 'hex',
														function(erreur) {
															clearTimeout(t1);
															switch (action) {
																case ('40') :
																	recupvaleur();
																	break;
																case ('21') :
																	var seul = 0;
																    if (message == 'Récupération de la série de mesures Sensus'){var seul=1;}
																	recupdata(seul);
																	break;
																case ('10') :
																	modifsensus('10');
																	break;
																case ('11') :
																	modifsensus('11');
																	break;
																case ('13') :
																	modifsensus('13');
																	break;
															}

														})
											})
								})
					})
		}

		function recupinfo() {
			console.log('recupinfo');
			var parser = port.pipe(new ByteLength({
						length : 26
					}))
			parser.on('data', function(data) {
				var data1 = data.slice(0, 0x0018);
				if (crc.compute(data1) == data.readUInt16LE(0x0018)) {
					tempssensus = data.readUInt32LE(4);
					var tempsordi = Math.trunc(new Date() / 1000);
					tempbase = tempsordi - tempssensus;
					var dateservice = Ext.Date.parse(tempbase, 'U');
					dateservice = Ext.Date.format(dateservice,' F Y');
					var annee = parseInt(tempssensus/31536000);					
					var mois = parseInt((tempssensus%31536000)/2628000);
					var dureesensus;
					if (annee>0){dureesensus = annee+" ans "}
					if (mois>0){dureesensus = dureesensus+mois+" mois"}
					var serie = data.readUInt16LE(2);
					var changserie = 0;
					if(val.verifserie==1 && serie!=val.serieold){
						changserie = 1;
					}
					val.serie = serie;
					var interval = data.readUInt16LE(0x0010);
					var moyenne = data.readUInt16LE(0x0016);
					var declench = data.readUInt16LE(0x0012)
					thiss.getViewModel().set('serie','U-'+serie);
					thiss.getViewModel().set('interval', interval + ' s');
					thiss.getViewModel().set('declench',declench + ' mbar');
					thiss.getViewModel().set('moyenne', 'x'+ moyenne);
					thiss.getViewModel().set('endcount', data.readUInt16LE(0x0014));
					
					thiss.getViewModel().set('modele',data.readUInt8(1) + "."	+ data.readUInt8(0));
					thiss.getViewModel().set('tempssensus',tempssensus+' s');
					thiss.getViewModel().set('nbrserie',data.readUInt16LE(0x000E));
					thiss.getViewModel().set('bootcount',data.readUInt16LE(8));
					thiss.getViewModel().set('boottime',data.readUInt32LE(0x000A)+' s');
					
					thiss.getViewModel().set('datesensus',"Mise en service depuis "+dateservice+" ("+dureesensus+")" );
					
					const Store = require('electron-store');
					const store = new Store();
					var formatintervalle1 ='';
					var programmer=0;
						if (store.has("marche."+serie)){
							formatintervalle1 = "<br>La sonde a été programmée pour des mesures<br>Lieu : "+store.get("marche."+serie+".titre");
							programmer=1;
						}
					var analyse ='';
					if (interval == val.interval0 && moyenne == val.moyenne && declench == val.declench0) {
						analyse = 'veille';
						thiss.getViewModel().set('couleuretat','#ffcccc');
						thiss.getViewModel().set('couleur','red');
 						thiss.getViewModel().set('texteetat','Sonde Sensus U-'+serie+'<br><br>En Veille<br>');
						thiss.getViewModel().set('infosonde',formatintervalle1);
 						thiss.getViewModel().set('mode',false);
 						val.serieold = serie;
					}
					else if (moyenne == val.moyenne && declench == val.declench) {
						analyse = 'marche';
						thiss.getViewModel().set('couleuretat','#a0ffa0');
						thiss.getViewModel().set('couleur','green');
 						thiss.getViewModel().set('texteetat','Sonde Sensus U-'+serie+'<br><br>En Mode Mesure<br>');
 						var formatintervalle = "Réalise une mesure toutes les " +Ext.getCmp('graph2').getController('graphcontrole').convseconde(interval);
 						thiss.getViewModel().set('infosonde',formatintervalle+formatintervalle1);
 						thiss.getViewModel().set('mode',true);
					
					}
					else{
						analyse = 'nonini';
						thiss.getViewModel().set('couleuretat','Silver');
						thiss.getViewModel().set('couleur','black');
 						thiss.getViewModel().set('texteetat','Sonde Sensus U-'+serie+'<br>Non Initialisée<br>');
 						thiss.getViewModel().set('infosonde',formatintervalle1);
 						thiss.getViewModel().set('mode',true);
					}

					if (moyenne != val.moyenne && ordre == 1) {
						action = '13';
						ordre = 10;
					}

					parser.destroy();
					clearTimeout(t);
					console.log("action : "+action);
				    if (action == 'marche') {
						if (interval == val.interval && moyenne == val.moyenne && declench == val.declench) {
							thiss.formdemar.destroy(); 
							thiss.windemar.destroy();
							messagecom.hide();
							port.close();
							if (interval > 3599) {
								var unit1 = interval / 3600 + ' h<br><br>';
							} else if (interval > 59) {
								var unit1 = interval / 60 + ' mn<br><br>';
							} else {
								var unit1 = interval + ' s<br><br>';
							}
							var text1 = 'La Sonde réalise une mesure tous les '	+ unit1;
							var datedebut = tempsordi + 12;
							datedebut = Ext.Date.parse(datedebut, 'U')
							datedebut = Ext.Date.format(datedebut,'d/m/Y H:i:s');
							if (interval * 520000<157680000){
								var datefin = tempsordi + (interval * 520000);
								var datefin1 = Ext.Date.parse(datefin, 'U')
								var datefin2 ="jusqu'au "+Ext.Date.format(datefin1,'d/m/Y');
							}
							else {var datefin2 = "pendant plus de 5 ans" }
							text1 = text1+ 'Elle doit pouvoir enregistrer '+ datefin2;
							text1 = text1+ '<br><br>Attention: Si vous analysez de nouveau la sonde U-'+serie+'<br>elle sera remise en Mode Veille'; 
							
							const Store = require('electron-store');
							const store = new Store();
							store.set("marche."+serie+".sensustime" , tempssensus+12);
							store.set("marche."+serie+".ecart" , tempbase);
							store.set("marche."+serie+".interval" , interval);
							store.set("marche."+serie+".datedebut" , datedebut);
							store.set("marche."+serie+".datefin" , datefin2);
							store.set("marche."+serie+".titre" , val.titre);
							store.set("marche."+serie+".info" , val.infos);
							store.set("marche."+serie+".prof" , val.profdeb);
							store.set("marche."+serie+".prof1" , val.proffin);
							formatintervalle = formatintervalle+"<br>La sonde a été programmée pour des mesures<br>Lieu : "+val.titre;
							thiss.getViewModel().set('infosonde',formatintervalle);
							Ext.Msg.alert('Sensus Ultra U-' + serie	+ ' en mode mesures', text1);
						    thiss.loadmarche();
						    val.attention = serie;
						} else {
							erreursensus();
						}
					} 
					
					else if (action == 'arret') {
						if (interval == val.interval0 && moyenne == val.moyenne	&& declench == val.declench0) {
							messagecom.hide();
							port.close();
							thiss.getViewModel().set('mode',false);
							val.serieold = serie;
							if (val.analyse == 2){
								Ext.Msg.alert('Sensus en Mode Mesure','La sonde Sensus U-'+val.serie+' était en Mode Mesure<br><br>Elle a été mise en Mode Veille',function(btn, text) {thiss.choixaction(programmer);});
							}
							else if (val.analyse == 3){
								Ext.Msg.alert('Sensus non Initialisée','La sonde Sensus U-'+val.serie+' n\'était pas initialisée avec les paramètres définis<br><br>Ses paramètres ont été mis à jour en Mode Veille',function(btn, text) {thiss.choixaction(programmer);});
							}
							else{
								Ext.Msg.alert('Sensus Ultra U-' + serie,'La Sonde est en Mode Veille');
							}
						} else {
							erreursensus();
						}
					} 
					else if (action == 'etat') {
						messagecom.hide();
						port.close();
						if (val.analyse == 1){
							if (programmer == 1 && analyse == 'veille'){
								thiss.choixaction(programmer);
							}
							else{
							thiss.verifetat(analyse);
							}
						}
					    
					}
					else if (changserie == 1){
						messagecom.hide();
						port.close();
						thiss.getViewModel().set('mode',true);
						Ext.Msg.alert('Erreur','La Sonde est différente, elle va être analysée');
						if (val.analyse == 1){
							thiss.verifetat(analyse);
						}
					}
					else if (action == 'antemarche') {
						messagecom.hide();
						port.close();
						thiss.onmarche("lance");
					}
					else {
						envoicode();
					}
				   
				} else {
					clearTimeout(t);
					erreursensus();
				}
			});
		}

		recupinfo();
	  }
	},
	
	onaction :function(sender, record) {
		val.verifserie = 1;
		switch (sender.text) {
			case ('Mesure temps réel de la sonde'):
				this.oninfo();
				break;
			case ('Lecture des nouvelles séries de la sonde'):
				this.ondata();
				break;
			case ('Démarrer les mesures de la sonde'):
				this.onmarche();
				break;	
		}
	},
	
	verifetat : function(analyse) {
		var me = this
		if (analyse=='marche'){
			val.analyse = 2;
			me.timer = Ext.defer(function(){
	            me.timer = null;
	            me.onarret();
	        }, 50);
		}
		else if (analyse=='nonini'){
			val.analyse = 3;
			me.timer = Ext.defer(function(){
	            me.timer = null;
	            me.onarret();
	        }, 50);
		}
		else {
			val.analyse = 0;
		}
		
	},
	
	choixaction : function(programmer) {
		var me = this;
		if (programmer==1){
			const Store = require('electron-store');
			const store = new Store();
			titre = store.get("marche."+val.serie+".titre");
			Ext.MessageBox.confirm('Action', 'La sonde U-'+val.serie+' a été programmée pour des mesures - lieu  : '+titre+'<br><br>Souhaitez-vous lire les nouvelles séries de mesures ? ', 
						function(btn){
							if (btn == 'yes'){
								me.ondata();
							}
						}, 
						this);
		}
	},
	
	onanalyse : function(sender, record) {
		var me = this;
		if (val.attention != 0){
			        Ext.MessageBox.show({
			            title: 'Attention',
			            msg: "Si c'est la sonde U-"+val.attention+" qui est réanalysée<br>Elle sera remise en Mode Veille",
			            buttons: Ext.MessageBox.YESNO,
			            buttonText:{ 
			                yes: "Analyser", 
			                no: "Annuler" 
			            },
			            scope: me,
			            fn: function(btnText, sInput) {
			            	val.attention = 0;
							if (btnText === 'yes') {
								val.analyse = 1;
								me.onetat();
							}
						},
			        });
		}
		else {
			val.analyse = 1;
			this.onetat();
		}
	},

	onetat : function(sender, record) {
		val.verifserie= 0;
		var message = 'Lecture des paramètres Sensus Ultra';
		var action = 'etat';
		this.comsensus(message, action)
	},
	
	oninfo : function(sender, record) {

		var message = 'Lecture des mesures temps réel Sensus Ultra';
		var action = '40';
		this.comsensus(message, action)
	},

	ondata : function(sender, record) {
		var message = 'Récupération des séries de mesures Sensus';
		var action = '21';
		this.comsensus(message, action)
	},
	
	ondataseul : function(sender, record) {
		var message = 'Récupération de la série de mesures Sensus';
		var action = '21';
		this.comsensus(message, action)
	},

	onarret : function(sender, record) {
		var message = 'Arrêt mesures Sensus Ultra';
		switch (sender) {
			case (2) :
				var ordre = 2;
				var action = '10';
				this.comsensus(message, action, ordre)
				break;
			case (11) :
				var ordre = 1;
				var action = '11';
				this.comsensus(message, action, ordre)
				break;
			case (3) :
				var action = 'arret';
				this.comsensus(message, action)
				break;
			default :
				var ordre = 1;
				var action = '11';
				this.comsensus(message, action, ordre);

		}
	},

	onmarche : function(sender, record) {
		var thiss = this;
		var message = 'Démarrage mesures Sensus Ultra';
		switch (sender) {
			case (2) :
				var ordre = 2;
				var action = '10';
				this.comsensus(message, action, ordre)
				break;
			case (11) :
				var ordre = 1;
				var action = '11';
				this.comsensus(message, action, ordre)
				break;
			case (3) :
				var action = 'marche';
				this.comsensus(message, action)
				break;
			case ("lance") :
									thiss.formdemar = Ext.create('Ext.form.Panel', {
									          bodyPadding: 10,
  											  fieldDefaults: {
											        labelAlign: 'right',
											        labelWidth: 190,
											        msgTarget: 'side'
											    },
											  width: 500,
										            items: [
										              {
												            xtype : 'fieldcontainer',
												            fieldLabel: 'Intervalle entre deux mesures',
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
												                fieldLabel: 'interval',
												                value: val.intervalp,
												                allowBlank: false
												           		},
												            	{
												                width: 95,
												                xtype: 'combo',
												                queryMode: 'local',
												                value: val.unite,
												                triggerAction: 'all',
												                forceSelection: true,
												                editable: false,
												                fieldLabel: 'unite',
												                name: 'unite',
												                displayField: 'name',
												                valueField: 'value',
												                store: {
												                    fields: ['name', 'value'],
												                    data: [
												                        {name : 'Secondes',   value: 'Secondes'},
												                        {name : 'Minutes',  value: 'Minutes'},
												                        {name : 'Heures', value: 'Heures'}
												                    ]}
												            	    }
												                ]
												         
												    },
												     {xtype: 'textfield',
												        name: 'titre',
												        width: 350,
												        allowBlank: false,
												        fieldLabel: 'Lieu (court)',
										              },
										              {xtype: 'textareafield',
												        name: 'infos',
												        width: 470,
												        fieldLabel: 'Information lieu de mesure ',
										              },	
										              {xtype: 'textfield',
												        name: 'profdeb',
												        width: 250,
												        fieldLabel: 'Profondeur installation (cm)',
										              },
										              {xtype: 'textfield',
												        name: 'proffin',
												        width: 250,
												        fieldLabel: 'Profondeur récupération (cm)',
										              },
										           ],
									        buttons: [
									        {
									            text: 'Démarrer',
									            disabled: true,
                                				formBind: true,
									            handler: function(){
									            		var config = thiss.formdemar.getForm().getValues();
									            		var intervalle = config.interval;
									            		if(config.unite == 'Minutes' ){intervalle = config.interval*60;}
									            		else if(config.unite == 'Heures' ){intervalle = config.interval*3600;}
									            		val.interval = intervalle;
									            		val.titre = config.titre;
									            		val.infos = config.infos.replace(/\n/g, " ");
									            		val.profdeb = config.profdeb;
									            		val.proffin = config.proffin;
														var ordre = 1;
														var action = '11';
														thiss.comsensus(message, action, ordre);
														 
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
									        title: 'Démarrage mesures Sensus Ultra U-'+val.serie,
									        closable : false,
									        layout: 'fit',
									        alwaysOnTop : -1000,
									        modal: true,
									        items: thiss.formdemar,
									      }).show();
									  break;    
				default :
					var action = 'antemarche';	
					this.comsensus(message, action)
					break;					      
		}
	},

	onport : function(sender, record) {
		var thiss = this;
		const Store = require('electron-store');
		const store = new Store();
		var SerialPort = require('serialport');
		var list1 = [];
		var i = 0;
		SerialPort.list(function(err, ports) {

					ports.forEach(function(port) {
								var itemwin = {};
								itemwin.xtype = 'button';
								itemwin.text = port.comName
										+ '<br>Fabriquant: '
										+ port.manufacturer + '<br>Id: '
										+ port.pnpId;
								itemwin.margin = 10;
								itemwin.handler = function() {
									winport.destroy();
									val.port = port.comName;
									thiss.getViewModel().set('portcom',port.comName);
									Ext.getCmp('parametre').getController('parametrecontroller').getViewModel().set('port',port.comName);
									store.set("parametre.port",port.comName);
								};
								list1.push(itemwin);
								i = 1;
							});
					if (i == 0) {
						list1 = [{
									xtype : 'button',
									text : 'Pas de port COM détecté',
									padding : 10,
									handler : function() {
										winport.destroy();
										val.port = null;
										thiss.getViewModel().set('portcom',null);
										Ext.getCmp('parametre').getController('parametrecontroller').getViewModel().set('com',null);
										store.set("parametre.port","");
									}
								}];

					}
					var winport = Ext.create('Ext.window.Window', {
								title : 'Choix Port COM',
								closable : false,
								modal : true,
								items : [{
											xtype : 'form',
											margin : 10,
											items : list1
											,
										}]
							})
					winport.show();
				});

	},

	traitementdata : function(recupdata, tempbase, tempssensus ,der,seul) {
		var XLSX = require('xlsx'), request = require('request');
		const remote = require('electron').remote; 
		const app = remote.app; 
		const Store = require('electron-store');
		const store = new Store();
	  if(recupdata.length>0){
		var data1 = [];
		for (var i = recupdata.length - 1; i >= 0; i--) {
			data1.push(recupdata[i]);
		}
		var data = Buffer.concat(data1);
		i = 0;
		var serie = val.serie;
		var timemem = 0;
		if (store.has("marche."+serie)){
			timemem = store.get("marche."+serie+".sensustime");
		}
		var der2=90000000000;
		if (seul == 1){der2=timemem+5;}
		var nbserie = 0;
		var derniertime= 0;
		var recup = [];
		do {
			if (data.readUInt32LE(i) == 0x00000000) {
				i = i + 4;
				var timesensus = data.readUInt32LE(i);
			  if (timesensus>der &&  timesensus<der2){	
				nbserie += 1;
				var tempsdepart = tempbase + timesensus;				
				i = i + 4;
				var intervalle = data.readUInt16LE(i);
				var correction = 1;
				var ecartsec = 0;
				var ecartjour = '';
				var tempsfin = 0;
				i = i + 8;
				j = 0;
				seriep = [];
				t = {};
				obj = {};
				var titre = "";
				var titre1 = "";
				derniertime= timesensus;
				t['temps'] = timesensus;
				if (timesensus>timemem-5 &&  timesensus<timemem+5){
					var prof = "";
				    titre = store.get("marche."+serie+".titre");				    
					if (store.get("marche."+serie+".prof")!=""){prof = prof+" (profondeur départ : "+store.get("marche."+serie+".prof")+"cm)";}
					if (store.get("marche."+serie+".prof1")!=""){prof = prof+" (profondeur fin : "+store.get("marche."+serie+".prof1")+"cm)";}
					prof = prof+" (Sensus U-"+serie+")";
					t['pression'] = titre;
					titre1 = titre;
					titre = "-"+titre;
					t['temperature'] = store.get("marche."+serie+".info")+prof;
					ecartsec = (tempbase-store.get("marche."+serie+".ecart"))/(tempssensus-timesensus);
					tempsdepart = store.get("marche."+serie+".ecart") + timesensus;
					correction = 1 + ecartsec;
					var ecartjour1 = (ecartsec*86400).toFixed(2);
					ecartjour = ecartjour1+' s/jour';
				}
				else {
					t['pression'] = 'U'+ serie;
					t['temperature'] = "";
				}
				seriep.push(t);
				while (data.readUInt32LE(i) != 0xFFFFFFFF) {
					p = {};
					tempsfin = Math.round(tempsdepart + j * intervalle * correction);
					p['temps'] = tempsfin;
					p['pression'] = 0;
					p['temperature'] = ((data.readUInt16LE(i) / 100) - 273.15)
							.toFixed(2);
					i = i + 2;
					p['pression'] = data.readUInt16LE(i);
					seriep.push(p);

					i = i + 2;
					j = j + 1;

				}
				intervalle = Math.round(intervalle * correction);
				var code = serie + '-' + tempsdepart + '-' + j + '-' + intervalle+titre;
				var datefin2 = Ext.Date.parse(tempsfin, 'U')
				var tempssensus2 = Ext.Date.parse(tempsdepart, 'U'); 
				
				obj["nomfichier"]= code;
				obj["titre"]= titre1;
				obj["serie"]= serie;
				obj["datedeb"]= tempssensus2;
				obj["datefin"]= datefin2;
				obj["nbremesure"]= j;
				obj["interv"]= intervalle;
				obj["ecart"]= ecartjour;
				recup.push(obj);
				

				var wsp = XLSX.utils.json_to_sheet(seriep, {
							skipHeader : true
						});
				var wbp = XLSX.utils.book_new();
				XLSX.utils.book_append_sheet(wbp, wsp, "sensus");
				var envoip = XLSX.writeFile(wbp, app.getPath('userData')+"/data/" + code + '.csv');
			  }	
			}
			i += 1;
		} while (i < data.length - 4);
		if (timemem!=0){
			store.delete("marche."+serie)
			this.getViewModel().set('infosonde','');
			this.loadmarche();
		}
		if (nbserie>0){
			store.set(serie + ".derniere", derniertime);
			
			this.getViewModel().set('nbrserie',nbserie);
			this.winrecuplist.items.items[0].store.loadData(recup);
			this.winrecuplist.show()
			this.ouvrebrut();
		}
		else {
			if (seul==1){var messa = "ne contient pas une nouvelle série programmée";}
			else{var messa = "ne contient pas de nouvelles données";}
			Ext.Msg.alert('Sensus Ultra U-' + serie,'La Sensus Ultra U-' + serie +'<br>'+messa);
		}
	  }
	  else{							
	    Ext.Msg.alert('Sensus Ultra U-' + serie,'La Sensus Ultra U-' + serie +'<br>ne contient pas de données');
	  }
	},

 ouvrebrut : function() {
            		 const remote = require('electron').remote; 
					 const app = remote.app;
					 const testFolder = app.getPath('userData')+"/data/";
					 const fs = require('fs');
					 var tab = [];
					 fs.readdir(testFolder, (err, files) => {
					   files.forEach(file => {
						  obj = {};
						   var extract = file.split('.');
						   var extract1 = extract[0].split('-');
						   obj["nomfichier"]= extract[0];
						   obj["info"]= "";
						   if(extract1[4]){obj["info"]= extract1[4];}
						   tab.push(obj);
					   }); 
					 Ext.getCmp('sensusbrut').store.loadData(tab);
					 	});
    },	
 loadmarche : function() {
            		const Store = require('electron-store');
					const store = new Store();
					var marche = store.get("marche");
					var result = [];
						
						for(var i in marche){
							obj = {};
							obj["serie"]= i;
							obj["titre"]= marche[i].titre;
							obj["datedeb"]= marche[i].datedebut;
							obj["datefin"]= marche[i].datefin;
							obj["prof"]= marche[i].prof;
							obj["prof1"]= marche[i].prof1;
							obj["inter"]= marche[i].interval;
							obj["info"]= marche[i].info;
						    result.push(obj);
						}
					Ext.getCmp('sensusmarche').store.loadData(result);
					 	
    },
 onquit : function (butt) {
     const remote = require('electron').remote;
	 var w = remote.getCurrentWindow();
	
	 Ext.Msg.confirm("Confirmation","Confirmer la fermeture de SensusKarst ?", function(btnText){
                if(btnText === "yes"){
                   w.close();
                }
            }, this);
    },     
    
 ontest: function () {
 },
 
    
 afterRender: function () {
 	this.getViewModel().set('portcom',val.port);
 	this.getViewModel().set('couleuretat','Silver');
 	this.getViewModel().set('couleur','black');
 	this.getViewModel().set('texteetat','Pas de Sonde Sensus<br><br>Analysée');
 	this.getViewModel().set('datesensus','');
 	this.getViewModel().set('infosonde','');
 	this.getViewModel().set('mode',true);
 	
 	this.winrecuplist = Ext.create('SensusKarst.view.main.recuplistWin');
 }
 
});


