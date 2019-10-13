Ext.define('SensusKarst.view.main.graphique.ouvrefichiercontrole', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.ouvrefichiercontrole',
    
    init: function (view) {
       this.nbreserie = 1;
       this.lettre = [];
    },
    
     convseconde : function (time) {
		var reste=Math.round(time);
		var result='';
		var nbJours=Math.floor(reste/(3600*24));
		reste -= nbJours*24*3600;
		var nbHours=Math.floor(reste/3600);
		reste -= nbHours*3600;
		var nbMinutes=Math.floor(reste/60);
		reste -= nbMinutes*60;
		var nbSeconds=reste;
		if (nbJours>0)
			result=result+nbJours+' j ';
		if (nbHours>0)
			result=result+nbHours+' h ';
		if (nbMinutes>0)
			result=result+nbMinutes+' min ';
		if (nbSeconds>0)
			result=result+nbSeconds+' s ';
		return result;
 	},
    
    typefichier : function (nomfich) {
        
        var store = this.view.getComponent('grid').getStore();
        var type = "";
        if (store.getAt(1-1).get('A')=="sensuskarst"){
            type = "Série SensuKarst";
                        this.view.getComponent('form').getForm().setValues({
                                                            xtime: "A",
                                                            ytime : 4,
                                                            format : "timestamp",
                                                            fixeformat:"",
                                                            fixextime:"",
                                                            fixeytime:"",
                                                            format5:"",
                                                            colonne: "B",
                                                            titre:store.getAt(1-1).get('B'),
                                                            commen:store.getAt(2-1).get('B'),
                                                            axe:store.getAt(3-1).get('B')
                                                            })
           this.valide(type,"");
        }
        else if (store.getAt(1-1).get('B').substr(0,3)=="SU-"){
            type = "Export Sensus Manager";
            this.view.getComponent('form').getForm().setValues({
                                                            xtime: "D",
                                                            ytime : 1,
                                                            format : "complexe",
                                                            fixeformat:"",
                                                            fixextime:"",
                                                            fixeytime:"",
                                                            format5:"Y,n,j,G,i,s,qs",
                                                            colonne:"K",
                                                            titre:nomfich+" - Pression",
                                                            commen:"Pression - Sensus "+store.getAt(1-1).get('B'),
                                                            axe:"Pression (mbar)"
                                                            })
            this.valide(type,"");   
            this.view.getComponent('form').getForm().setValues({
                                                            xtime: "D",
                                                            ytime : 1,
                                                            format : "complexe",
                                                            fixeformat:"",
                                                            fixextime:"",
                                                            fixeytime:"",
                                                            format5:"Y,n,j,G,i,s,qs",
                                                            colonne:"complexe",
                                                            titre:nomfich+" - Température",
                                                            commen:"Température - Sensus"+store.getAt(1-1).get('B'),
                                                            axe:"Température (°C)"
                                                            })
            this.valide(type,"");
        }
        
        else if (store.getAt(2-1).get('B')=="EXP-HYDRO"){
            type = "Export Banque Hydro DREAL";
            this.view.getComponent('form').getForm().setValues({
                                                            xtime: "D",
                                                            ytime : 5,
                                                            format : "complexe",
                                                            fixeformat:"",
                                                            fixextime:"",
                                                            fixeytime:"",
                                                            format5:"Ymd,H:i",
                                                            colonne:"F",
                                                            titre:store.getAt(3-1).get('C'),
                                                            commen:store.getAt(2-1).get('C')+" "+store.getAt(3-1).get('H')+" - Station : "+store.getAt(3-1).get('B')+" ("+store.getAt(3-1).get('C')+")",
                                                            axe:"Débit ("+store.getAt(4-1).get('L')+")"
                                                            })
            this.valide(type,""); 
        }
        
        else if (store.getAt(1-1).get('C')=="PMAC ID:" && store.getAt(4-1).get('A')<2){
            type = "Export Metrolog";
            this.view.getComponent('form').getForm().setValues({
                                                            xtime: "A",
                                                            ytime : 4,
                                                            format : "complexe",
                                                            fixeformat:"date excel",
                                                            fixextime:"A",
                                                            fixeytime:3,
                                                            format5:"qj",
                                                            colonne:"B",
                                                            titre:nomfich,
                                                            commen:store.getAt(1-1).get('B'),
                                                            axe:"Hauteur d'eau ("+store.getAt(2-1).get('B')+")"
                                                            })
            this.valide(type,""); 
        }

    },
    
    fonctioncomplexe : function(type,val){
        if (type == "Export Sensus Manager"){
            var store = this.view.getComponent('grid').getStore();
            var valeur = (Number(store.getAt(val).get("L"))+(Number(store.getAt(val).get("M"))/100))-273.15;
            valeur = valeur.toFixed(2).toString();
            return (valeur);
        }
        
    },
    
    
   complexe : function () {
                        var me = this;
                        var form = me.view.getComponent('form');
                        var valeurs = form.getForm().getValues();
                        me.formcomplexe = Ext.create('Ext.form.Panel', {
                            layout: 'vbox',
                            bodyPadding: 2,
                                items: [{
                                        xtype: 'fieldset',
                                        title: 'Données temporelles',
                                        defaultType: 'textfield', 
                                        items:[
                                                {
                                                allowBlank:false, 
                                                fieldLabel: '1ere cellule',
                                                xtype : 'fieldcontainer',
                                                layout: 'hbox',
                                                defaults: {
                                                            hideLabel: true,
                                                            margin: '0 20 0 0'
                                                        },
                                                        items: [{
                                                                    flex : 1,
                                                                    xtype: 'combobox',
                                                                    store : {type : 'storelettre'},
                                                                    displayField: 'lettre',
                                                                    width : 100,
                                                                    typeAhead: true,
                                                                    forceSelection : true,
                                                                    name : 'xtime',
                                                                    value : valeurs.xtime,
                                                                    allowBlank: false
                                                                }, {
                                                                    flex : 1,
                                                                    xtype: 'combobox',
                                                                    store : {type : 'storechiffre'},
                                                                    width : 100,
                                                                    displayField: 'chiffre',
                                                                    typeAhead: true,
                                                                    forceSelection : true,
                                                                    name : 'ytime',
                                                                    value : valeurs.ytime,
                                                                    allowBlank: false
                                                                }
                                                                ]
                 
                                                    }, {
                                                fieldLabel: 'Format cellules',
                                                xtype : 'fieldcontainer',
                                                layout: 'hbox',
                                                defaults: {
                                                            hideLabel: true,
                                                            margin: '0 20 0 0'
                                                        },
                                                        items: [{
                                                                    flex : 1,
                                                                    xtype: 'textfield',
                                                                    width : 80,
                                                                    allowBlank: false,
                                                                    name : 'format',
                                                                }, 
                                                                {
                                                                    flex : 1,
                                                                    xtype: 'textfield',
                                                                    width : 80,
                                                                    name : 'format',
                                                                },
                                                                {
                                                                    flex : 1,
                                                                    xtype: 'textfield',
                                                                    width : 80,                                                                
                                                                    name : 'format',
                                                                },
                                                                {
                                                                    flex : 1,
                                                                    xtype: 'textfield',
                                                                    width : 80,
                                                                    name : 'format',
                                                                },
                                                                {
                                                                    flex : 1,
                                                                    xtype: 'textfield',
                                                                    width : 80,
                                                                    name : 'format',
                                                                },
                                                                 {
                                                                    flex : 1,
                                                                    xtype: 'textfield',
                                                                    width : 80,
                                                                    name : 'format',
                                                                },
                                                                 {
                                                                    flex : 1,
                                                                    xtype: 'textfield',
                                                                    width : 80,
                                                                    name : 'format',
                                                                },
                                                                
                                                                ]
                                            },
                                            ],
                                }
                                ,
                                {
                                        xtype: 'fieldset',
                                        title: 'Cellule fixe date départ',
                                        defaultType: 'textfield', 
                                        items:[
                                            
                                                {
                                                    allowBlank:false, fieldLabel: 'Cellule',
                                                    xtype : 'fieldcontainer',
                                                    layout: 'hbox',
                                                    defaults: {
                                                                hideLabel: true,
                                                                margin: '0 20 0 0'
                                                            },
                                                            items: [{
                                                                        flex : 1,
                                                                        xtype: 'combobox',
                                                                        store : {type : 'storelettre'},
                                                                        displayField: 'lettre',
                                                                         width : 100,
                                                                        typeAhead: true,
                                                                        forceSelection : true,
                                                                        name : 'fixextime',
                                                                    }, {
                                                                        flex : 1,
                                                                        xtype: 'combobox',
                                                                         width : 100,
                                                                        store : {type : 'storechiffre'},
                                                                        displayField: 'chiffre',
                                                                        typeAhead: true,
                                                                        forceSelection : true,
                                                                        name : 'fixeytime',
                                                                    }
                                                        ]
                                     
                                                    }, {
                                                xtype: 'combobox',
                                                fieldLabel: 'Format',
                                                name: 'fixeformat',
                                                width : 290,
                                                store: {
                                                    type: 'array',
                                                    fields: [ 'format' ],
                                                    data: [
                                                        ['d/m/Y'],
                                                        ['Y-m-d'],
                                                        ['d/m/Y H:i:s'],
                                                        ['Y-m-d H:i:s'],
                                                        ['YmdHis'],
                                                        ['timestamp'],
                                                        ['date excel'],
                                                    ]
                                                },
                                                displayField: 'format',
                                                typeAhead: true,
                                            },
                                        
                                        
                                        ]
                                }       
                                
                                ],    
                            buttons: [
                            {
                                text : 'Aide format',
                                handler : function(){
                                    if(typeof(me.aide)=='undefined'){me.aide = Ext.create('SensusKarst.view.main.graphique.aideformatwin').show();}
                                    else {me.aide.show();}
                                }
                            },
                            { xtype: 'tbfill' },
                            {
                                text: 'Valider',
                                disabled: true,
                                formBind: true,
                                handler: function(){
                                    var valeurscomp = me.formcomplexe.getForm().getValues();
                                    for (var i = 0; i < 7; i++) {
                                        if (i == 0){var complexe = valeurscomp.format[i];}
                                        else if(valeurscomp.format[i]!=""){
                                            complexe = complexe +","+valeurscomp.format[i]
                                        }
                                    }
                                    form.getForm().setValues({
                                    xtime : valeurscomp.xtime,
                                    ytime : valeurscomp.ytime,
                                    format : "complexe",
                                    format5 : complexe,
                                    fixextime : valeurscomp.fixextime,
                                    fixeytime : valeurscomp.fixeytime,
                                    fixeformat : valeurscomp.fixeformat,
                                    });
                                    me.formcomplexe.destroy(); 
                                    me.wincomplexe.destroy(); 
                                    
                                    
                                }
                            },
                            {
                                text: 'Annuler',
                                handler: function(){
                                    me.formcomplexe.destroy(); 
                                    me.wincomplexe.destroy();
                                     
                                }
                            }]
                            
                        });
                     me.wincomplexe = Ext.create('Ext.window.Window', {
                            title: 'Format données temporelles complexe',
                            closable : false,
                            alwaysOnTop : true,
                            resizable : false,
                            layout: 'fit',
                            items: me.formcomplexe,
                          }).show();
    
       
    },

   valide: function (type1,calc) {
   							var me = this;
                            var store = this.view.getComponent('grid').getStore();
                            var parametres = this.view.getComponent('form').getForm().getValues();
                            var nbreserie = this.nbreserie;
                            var datecomplexe = 0;
                            var datedepart = 0 ;
                            var datenbrecolonne = 0 ;
                            var dateajoutcolonne = 0; 
                            var dateformat = '';
                            // gestion format complexe
                            if (parametres.format == 'complexe'){
                                datecomplexe = 1;
                                var datesuiteformat = parametres.format5.split(',');
                                for (var i=0; i < datesuiteformat.length; i++) {
                                    if (datesuiteformat[i].substr(0, 1)=='q'){
                                        switch (datesuiteformat[i]){
                                            case 'qs' :
                                             dateajoutcolonne = 1;
                                             break;
                                            case 'qm' :
                                             dateajoutcolonne = 60;
                                              break;
                                            case 'qh' :
                                             dateajoutcolonne = 60*60;
                                              break;
                                            case 'qj' :
                                             dateajoutcolonne = 60*60*24; 
                                             break;
                                        }
                                    }
                                    else{ 
                                        datenbrecolonne++;
                                        dateformat = dateformat + datesuiteformat[i];
                                    }
                                
                                  }
                                    // date départ fixe
                                    if (parametres.fixextime != ''){
                                    	var fixecellule = store.getAt(parametres.fixeytime-1).get(parametres.fixextime);
                                        if(parametres.fixeformat == 'date excel') {
		                                	fixecellule = (fixecellule - 25569) * 86400
		                                	datedepart = Ext.Date.parse(fixecellule, 'timestamp');
                                    		datedepart = Ext.Date.utcToLocal(datedepart);
                                        }    
                                        else {
                                        	datedepart = Ext.Date.parse(fixecellule, parametres.fixeformat);
                                        }
                                                                                
                                        datedepart = datedepart.getTime();
                                    }
                        
                            
                            }
                            var tabdata=[];
                            for (var serie = 0; serie < nbreserie; serie++) {
                                            tabdata[serie]= [];
                                    }
                            for (var i = parametres.ytime-1 ; i < store.getCount(); i++) {
                                var datenull = 0;
                                // calcul de la date
                                var date = null;
                                if (datecomplexe == 1){
                                    var datep = 0;
                                    var listlettre = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
                                    var j = 0;
                                    var lettre = 'A';
                                    if (datenbrecolonne != 0){
                                        
                                        while (lettre!=parametres.xtime){
                                            j++;
                                            lettre = listlettre.substring(j,j+1);
                                            
                                            
                                        }
                                        var date1 = '';
                                        for (var k = 0; k < datenbrecolonne; k++) {
                                             if (type1 == "Export Sensus Manager" && (k==4 || k==5) && Number(store.getAt(i).get(lettre))<10){
                                                date1 = date1+"0"+store.getAt(i).get(lettre);
                                             }
                                             else {date1 = date1+store.getAt(i).get(lettre);}
                                             j++;
                                             lettre = listlettre.substring(j,j+1);
                                        }
                                        
                                        datep = Ext.Date.parse(date1, dateformat);
                                        if (!!datep){
                                            datep =datep.getTime();
                                        }
                                        else{
                                            datenull = 1;
                                        }
                                        
              
                                        
                                        }
                                    var date2 = 0;
                                    if (dateajoutcolonne!=0){
                                        var dateseconde = store.getAt(i).get(lettre)*dateajoutcolonne
                                        if (dateseconde===''){datenull = 1;}
                                        date2 = Math.round(dateseconde)*1000;
                                    }                                       
                                    date = datedepart + datep + date2;
                                    date = Ext.Date.parse(date, 'time');
                                    if (!date){datenull = 1;}
                                }
                                else if(parametres.format == 'date excel') {
                                	var cellule = store.getAt(i).get(parametres.xtime);
                                	cellule = (cellule - 25569) * 86400
                                    date = Ext.Date.parse(cellule, 'timestamp');
                                    date = Ext.Date.utcToLocal(date)
                                    if (!date){datenull = 1;}
                                }
                                else {
                                    var cellule = store.getAt(i).get(parametres.xtime);
                                    date = Ext.Date.parse(cellule, parametres.format);
                                    if (!date){datenull = 1;}
                                }
                                if (datenull == 0){
                                    date = Number(date);
                                    for (var serie = 0; serie < nbreserie; serie++) {
                                            if (parametres.colonne=="complexe"){ 
                                                var cellule = this.fonctioncomplexe(type1,i);
                                                
                                            }
                                            else {
                                                var cellule = store.getAt(i).get(parametres.colonne[serie]);
                                            }
                                        
                                        if (cellule!=''){
                                            cellule = Number(cellule.replace(",","."));
                                            if(isNaN(cellule) == false){
                                                tabdata[serie].push([date,cellule]);
                                            }
                                        }
                                    }
                                }
                            }
                            
                            
                            
                            if (nbreserie == 1){
                            	me.confvalid(type1,tabdata[0],parametres.axe,parametres.titre,parametres.commen);
                            }
                            else {
                            for (var serie = 0; serie < nbreserie; serie++) {
                            	me.confvalid(type1,tabdata[serie],parametres.axe[serie],parametres.titre[serie],parametres.commen[serie]);
                                    }
                            }

       
    },
    
    confvalid: function (type1,data,axe,titre,commen) {
    			var me = this;
				        	var nbrepoints = data.length;
				        	if (nbrepoints<2){
				        		var wininfos = Ext.create('Ext.window.Window', {
				        	        title: 'Erreur !',
				        	        layout:'fit',
				        	        bodyPadding: 20,
				        	        html: 'La Série : '+titre+'<br>ne contient pas de mesures.' ,
				        	        closable: false,
				        	        modal: true,
				        	        fbar: [{ 
				        	        		type: 'button',
				        	        		text: 'Ok',
				        	        		
				        	        		handler: function(){
							            		wininfos.destroy();
								              }
				        	        		}
				        	        	
				        	        	],
				        	      }).show();
				        	}
				        	else{
					        	var duree = (data[nbrepoints-1][0]-data[0][0])/1000;
					        	var xmini = Ext.Date.format(Ext.Date.parse(data[0][0]/1000, 'U'),'d/m/Y H:i:s');
					        	var xmaxi = Ext.Date.format(Ext.Date.parse(data[nbrepoints-1][0]/1000, 'U'),'d/m/Y H:i:s');
					        	var intervalle =(data[1][0]-data[0][0])/1000;
					        	var infotext = "";
					        	if (typeof (type1)== "string" ){infotext += "Type: "+type1+"<br><br>"}
					        	infotext += "Axe: "+axe+"<br><br>";
					        	if (commen != ''){infotext += "Infos: "+commen+"<br><br>"}
					        	infotext += "Durée: "+me.convseconde(duree)+"<br><br>";
					        	infotext += "Du "+xmini+" Au "+xmaxi+"<br><br>";
					        	infotext += "Nombre de Points: "+nbrepoints+"  (intervalle: "+me.convseconde(intervalle)+")<br><br>";
					        	var maxmin = [];
					        	for (var i = 0; i < nbrepoints; i++) {maxmin.push(data[i][1])}
					        	infotext += "Valeur minimale: "+Math.min(...maxmin)+"<br>";
					        	infotext += "Valeur maximale: "+Math.max(...maxmin)+"";
					        	var wininfos = Ext.create('Ext.window.Window', {
					        	        title: 'Série : '+titre,
					        	        layout:'fit',
					        	        bodyPadding: 20,
					        	        html: infotext ,
					        	        closable: false,
					        	        modal: true,
					        	        fbar: [{ 
					        	        		type: 'button',
					        	        		text: 'Ouvrir',
					        	        		
					        	        		handler: function(){
								            		wininfos.destroy(); 
								            		Ext.getCmp('graph2').getController('graphcontrole').ajoutserie(data,axe,titre,commen);
								            		me.view.hide();
									              }
					        	        		},
					        	        		{ 
					        	        		type: 'button',
					        	        		text: 'Annuler',
					        	        		
					        	        		handler: function(){
								            		wininfos.destroy();
									              }
					        	        		}
					        	        	
					        	        	],
					        	      }).show();
				        		}   
				        	      
	 },
    
    aideformat: function () {
        if(typeof(this.aide)=='undefined'){this.aide = Ext.create('SensusKarst.view.main.graphique.aideformatwin').show();}
        else {this.aide.show();}
        
    },
    
    suppserie : function () {
                        if (this.nbreserie>1){
                            var form = this.view.getComponent('form');
                            form.getComponent('serie'+this.nbreserie).destroy();
                            this.nbreserie=this.nbreserie-1;
                        }
       
    },
    
    addserie : function () {
                            var form = this.view.getComponent('form');
                            var valeurs = form.getForm().getValues();
                            if (this.nbreserie==1){
                                    var titre = valeurs.titre;
                                    var comm = valeurs.commen;
                            }
                            else{
                                    var titre = valeurs.titre[0];
                                    var comm = valeurs.commen[0];
                            }
                            this.nbreserie += 1 ;
                            form.add(Ext.create("Ext.form.FieldSet", {
                                                                        itemId : "serie"+this.nbreserie,
                                                                        title: 'Série de données',
                                                                        defaultType: 'textfield',
                                                                         fieldDefaults: {
                                                                            labelWidth: 20,
                                                                            width : 180,
                                                                        },
                                                                        items: [{
                                                                           fieldLabel: 'Colonne',
                                                                            xtype: 'combobox',
                                                                            store : {type : 'storelettre'},
                                                                            displayField: 'lettre',
                                                                            typeAhead: true,
                                                                            forceSelection : true,
                                                                            labelWidth: 65,
                                                                            allowBlank:false,
                                                                            name: 'colonne'
                                                                        }, {
                                                                            xtype: 'combobox',
                                                                            fieldLabel: 'Axe',
                                                                            allowBlank:false,
                                                                            name: 'axe',
                                                                            store: {
                                                                                type: 'listeaxe'
                                                                            },
                                                                            valueField: 'nomaxe',
                                            
                                                                            displayField: 'nomaxe',
                                                                            typeAhead: true,
                                                                            forceSelection : true,
                                                                            emptyText: 'Type axe...'
                                                                        }, {
                                                                            fieldLabel: 'Titre',
                                                                            allowBlank:false,
                                                                            value: titre,
                                                                            name: 'titre'
                                                                        },
                                                                        {
                                                                        xtype: 'textarea',
                                                                        hideLabel: true,
                                                                        emptyText: 'Commentaires...',
                                                                        value: comm,
                                                                        name: 'commen',
                                                                        height:100,
                                                                       
                                                                         }
                                                                        ]
                                                                    }
                     ));
    },
    
});