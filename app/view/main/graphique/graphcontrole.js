Ext.define('SensusKarst.view.main.graphcontrole', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.graphcontrole',
    
//    requires: ['SensusKarst.view.main.choixcouleurwin'],
   
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
 
 quitter: function (butt) {
	 const remote = require('electron').remote;
	 var w = remote.getCurrentWindow();	
	 Ext.Msg.confirm("Confirmation","Confirmer la fermeture de SensusKarst ?", function(btnText){
                if(btnText === "yes"){
                   w.close();
                }
            }, this);
 },
 
  fermer: function(){
  if(chartd.series.length>0){ 	
 	Ext.Msg.confirm("Confirmation","Confirmer la fermeture du Graphique !", function(btnText){
           if(btnText === "yes"){ 
				for(var i = chartd.series.length - 1; i > -1; i--) {
				    if(chartd.series[i].name.toLowerCase() != 'navigator') {
				       chartd.series[i].remove(false);
				    }
				}
				for(var i = chartd.axes.length - 1; i >-1; i--) {
				    if(chartd.axes[i].coll == 'yAxis' && chartd.axes[i].userOptions.id!= "navigator-y-axis") {
				        chartd.axes[i].remove(false);
				    } 
				}
				chartd.redraw(false)
 			  }
            }, this);	          	
  }
 },
 
    
 listfichierbrut: function () {
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
	 this.winlistebrut.items.items[0].store.loadData(tab);
	 this.winlistebrut.show();
	 	});
  
 },
 
 gestionppb: function (file){
 	var fs = require('fs');
    fs.readFile(file,'utf8', function(err, contents) {
		var fich=contents.split('\n');
		var appareil = Number(fich[0].substring(35,40));
		
		var date1 = Ext.Date.parse(fich[3].substring(6,23), 'y/m/d-H:i:s');
        var ecart =  date1.getTimezoneOffset()/60;
             var zone = '';
             var formatzone = '';
             if (ecart == -2){zone = ' +02:00';formatzone = ' P';}
             else if (ecart == -1){zone = ' +01:00';formatzone = ' P';}
             else if (ecart == 0){zone = ' +00:00';formatzone = ' P';}
		var data1=[],data2=[],data3=[],datatur=[],datatemp=[],datacondu=[];
		for(var i= 3; i < fich.length; i++){
			var date = Number(Ext.Date.parse(fich[i].substring(6,23)+zone, 'y/m/d-H:i:s'+formatzone));
			var t1 = Number(fich[i].substring(24,33));
			var t2 =  Number(fich[i].substring(34,43));
			var t3 =  Number(fich[i].substring(44,53));
			var tur =  Number(fich[i].substring(54,63));
			var temp =  Number(fich[i].substring(64,73));
			var condu =  Number(fich[i].substring(74,83));
			if (date != 0){
			data1.push([date,t1]);
			data2.push([date,t2]);
			data3.push([date,t3]);
			datatur.push([date,tur]);
			datatemp.push([date,temp]);
			if (condu != 0){datacondu.push([date,condu]);}
			}
		}
		var commen = "Fluorimètre GGUN n°"+appareil;
		var type = "Fichier Fluo GGUN";
		var fonccontroller = Ext.getCmp('ouvrefichier').getController('ouvrefichiercontrole');
		if(datacondu.length>1){fonccontroller.confvalid(type,datacondu,"Conductivité (µS/cm))","Conductivité-GGUN"+appareil,commen);}
		fonccontroller.confvalid(type,datatemp,"Température (°C)","Température-GGUN"+appareil,commen);
		fonccontroller.confvalid(type,datatur,"Turbidité (ntu)","Turbidité-GGUN"+appareil,commen);
		fonccontroller.confvalid(type,data3,"Concentration (ppb)","Traceur3-GGUN"+appareil,commen);
		fonccontroller.confvalid(type,data2,"Concentration (ppb)","Traceur2-GGUN"+appareil,commen);
		fonccontroller.confvalid(type,data1,"Concentration (ppb)","Traceur1-GGUN"+appareil,commen);
	  });
 },
 
 exporter: function (butt) {
  if(chartd.series.length>0){	
 	if (butt.text == 'Imprimer Graphique'){
			  var exporte = 0;
			  chartd.print();
	}
	else if (butt.text == 'Graphique jpg'){
			  var exporte = 1; 
			  var type1="image/jpg";
	}
	else if (butt.text == 'Graphique png'){
			  var exporte = 1; 
			  var type1="image/png";
	}
	else if (butt.text == 'Graphique svg'){
			  var exporte = 1; 
			  var type1="image/svg+xml";
	}	
	else if (butt.text == 'Graphique pdf'){
			  var exporte = 2; 
			  const remote = require('electron').remote;
			  remote.dialog.showSaveDialog(remote.getCurrentWindow(), {
							        		    title: 'Enregistrez la serie',
							        		    defaultPath : chartd.title.textStr,
							        		    filters: [
							        		            {name: 'Fichiers pdf', extensions: ['pdf']},
							        		        ]
							        		    },
							        		    (file) => {
							        		    	 if (typeof file != 'undefined'){
							        		    		 	  var fs = require('fs'), PDFDocument = require('pdfkit'), SVGtoPDF = require('svg-to-pdfkit');
															  var svg = chartd.getSVG( {navigator: {enabled: false}, scrollbar: { enabled: false}});
															  var hauteur = chartd.chartHeight , largueur = chartd.chartWidth;
															  var doc = new PDFDocument({compress: false, size: [largueur,hauteur]});
															  var stream = fs.createWriteStream(file);
															  SVGtoPDF(doc, svg, 0, 0,{assumePt:true});
															  doc.pipe(stream);
															  doc.end();
							        		    	 	}
							        		    });	  
	}
 	else if (butt.text == 'Données Excel'){
			  var exporte = 3; 
			  chartd.downloadXLS();
	}
	else if (butt.text == 'Données csv'){
			 var exporte = 3; 
			 chartd.downloadCSV();
	}
	if (exporte==1){
		chartd.exportChartLocal({
									 type: type1,
       								 filename: chartd.title.textStr,
								 });					        		    
		}
  }	
 },
 
 ouvrefichierserie: function(file){
 	var me = this;
 									  var exten = file.split('.');
									  var nomfich1 = exten[0].split('\\');
									  var nomfich = nomfich1[nomfich1.length-1];
									  if (exten[1]=='ppb'){
									  	 me.gestionppb(file);
									    }
									  else {
									  var XLSX = require('xlsx');
									  var workbook = XLSX.readFile(file, {type: "array",raw:true});
									  var i = 0;
									  workbook.SheetNames.forEach(function (sheetName) {
									  	    var colonne1 = workbook.Sheets[sheetName]['!ref'];
									  	    var colonne = colonne1.substring(3,4);
									  	    var j= 0;var k= 0;var head =[];var listlettre = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
									  	    var colstore = []; var colgrid = [{xtype: 'rownumberer',width: 40}];
									  	    var tooltipcell = function (value, metaData) {
									            metaData.tdAttr = Ext.String.format('data-qtip="{0}"', value);
									            return value;
									        };
									  	    while(k==0){
									  	    	var lettre = listlettre.substring(j,j+1);
									  	    	head.push(lettre);
									  	    	colstore.push({name: lettre , type: 'string'});
									  	    	colgrid.push({text: lettre ,dataIndex: lettre,sortable: false,renderer: tooltipcell,flex: 1 });
									  	    	if (lettre==colonne){k=1;}
									  	    	j+=1;
									  	    }
									  	    var largewin = Ext.getBody().getWidth()-30;
									  	    var largueur = j*150+40;
									  	    if (largueur>=largewin){largueur=largewin;}
											var donnees = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName],{header:head});
											var winouvre = me.winouvrefichier;
											var gridouvre = winouvre.getComponent('grid');
											var formouvre = winouvre.getComponent('form');
											formouvre.reset();
											var nbreserie = winouvre.getController().nbreserie;
											while (nbreserie>1){
						   							formouvre.getComponent('serie'+nbreserie).destroy();
						   							nbreserie=nbreserie-1;
						    					}	
						    				winouvre.getController().nbreserie=1;
											Ext.define('model', {extend: 'Ext.data.Model',fields: colstore});
											gridouvre.store.setModel(model);
											gridouvre.store.loadData(donnees);
											gridouvre.reconfigure(gridouvre.store,colgrid);
											winouvre.setTitle("Ouvrir Fichier: "+file); 
											gridouvre.setWidth (largueur);
											formouvre.setWidth (largueur);
											winouvre.center();
											winouvre.show();
											winouvre.getController().typefichier(nomfich);
											
											
									  });
									}
 },
 	
 ouvrefichier: function (a) {
 	var obj = {};
 	if(a.text=="Série SensusKarst"){
 		obj= {name: 'Fichiers SensusKarst', extensions: ['ssk']}
 	}
 	
 	var me = this;
 	const remote = require('electron').remote;
 	remote.dialog.showOpenDialog(remote.getCurrentWindow(), {
				title: 'Ouvrir la serie',
				properties : ['openFile'],
				filters: [obj]
				},(file) => {
							  if (typeof file != 'undefined'){
							  for(var i= 0; i < file.length; i++)
									{
									  me.ouvrefichierserie(file[i]);
									}	
							}
	 });
 	
	 
 },
 
 confouvrir: function(){
  if(chartd.series.length>0){ 	
 	Ext.Msg.confirm("Confirmation","La graphique actuel va être fermé !", function(btnText){
           if(btnText === "yes"){ 
				for(var i = chartd.series.length - 1; i > -1; i--) {
				    if(chartd.series[i].name.toLowerCase() != 'navigator') {
				       chartd.series[i].remove(false);
				    }
				}
				for(var i = chartd.axes.length - 1; i >-1; i--) {
				    if(chartd.axes[i].coll == 'yAxis' && chartd.axes[i].userOptions.id!= "navigator-y-axis") {
				        chartd.axes[i].remove(false);
				    } 
				}
				chartd.redraw(false)
           		this.ouvrir();
 			  }
            }, this);	          	
  }
  else{this.ouvrir();}
 },
 
 
 ouvrirgraphique : function (file){
 											const fs = require('fs');			 
											fs.readFile(file,'utf8', function(err, contents) {
															var fich=contents.split('\n');
															chartd.setTitle({ text: fich[0]});
															var seriex =[];
															var seriey =[];
															var j = 1;
															var nom;
															var inform;
															var nomaxe;
															var couleur;
															for(var i= 1; i < fich.length; i++){
																switch (j) {
																	  case 1:
																	    nom = fich[i];
																	    j++;
																	    break;
																	  case 2:
																	    inform= fich[i];
																	    j++;
																	    break;
																	  case 3:
																	  	nomaxe= fich[i];
																	    j++;
																	    break;
																	  case 4:
																	    couleur= fich[i];
																	    j++;
																	    break;
																	  case 5:
																	    seriex= JSON.parse(fich[i]);
																	    j++;
																	    break;
																	  case 6:
																	    seriey= JSON.parse(fich[i]);
																	    j=1;
																	    var seriep = [];
															        	for (k=0; k < seriex.length; k += 1) {
																			   seriep.push([seriex[k],seriey[k]]);
																		   }
																		if (!chartd.get(nomaxe)){
																			 chartd.addAxis({
																		        id: nomaxe,
																		        title: {text: nomaxe},
																		        scrollbar: {
																		             enabled: true,
																		             showFull: false
																		         },
																		    });  
																		 }
																		 var typ = 'line',group=false;
																		 if (nomaxe == "Précipitation (mm)"){typ = 'column';group=true;}
																		 chartd.addSeries({
																		        name: nom,
																		        data: seriep,
																		        yAxis: nomaxe,
																		        info: inform,
																		        color: couleur,
																		        type: typ,
																		        //dataGrouping: {enabled:group},
																		        boostThreshold : 20000,
																		       
																		    });   
																	    break;   
																	}
																
															}
														 });	
 	
 },
 
 ouvrir: function (){
 	var me = this;
			 	const remote = require('electron').remote;
				remote.dialog.showOpenDialog(remote.getCurrentWindow(), {
							title: 'Ouvrir un graphique',
							//defaultPath : 'D:\\testsensus',
							properties : ['openFile'],
							filters: [{name: 'Graphique SensusKarst', extensions: ['gsk']}]
							},(file) => {
										if (typeof file != 'undefined' ){
											me.ouvrirgraphique(file[0]);	 
										}
									});
					
  },
 
 enregistrer: function (){
  if(chartd.series.length>0){
 	const remote = require('electron').remote;
	remote.dialog.showSaveDialog(remote.getCurrentWindow(), {
		title: 'Enregistrez le graphique',
					defaultPath : chartd.title.textStr,
					filters: [{name: 'Graphique SensusKarst', extensions: ['gsk']}]
							        		    },
					(file) => {
							if (typeof file != 'undefined' ){
								var fichier = "";
								fichier += chartd.title.textStr+"\n";
							    for (i=0; i < chartd.series.length; i += 1) {
													 if (chartd.series[i].name.indexOf("Navigator")){
														fichier += chartd.series[i].name+"\n";
														fichier += chartd.series[i].userOptions.info.replace(/\n/g, " ")+"\n";
														fichier += chartd.series[i].userOptions.yAxis+"\n";
														fichier += chartd.series[i].color+"\n";
														fichier += JSON.stringify(chartd.series[i].xData)+"\n";
														fichier += JSON.stringify(chartd.series[i].yData)+"\n";
														
													 }
												 }
								const fs = require('fs');			 
								fs.writeFile(file, fichier,'utf8', function(err){
									    if(err!=null){alert(err);}
									});			 
									
							}
						});
 	 
  }
 },
 
 ajoutserie: function (mesures,nomaxe,nom,inform) {
	 if (!chartd.get(nomaxe)){
		 chartd.addAxis({
	        id: nomaxe,
	        title: {text: nomaxe},
	        scrollbar: {
	             enabled: true,
	             showFull: false
	         },
	    });
	 }
	 var typ = 'line',group=false;
	 if (nomaxe == "Précipitation (mm)"){typ = 'column';group=true;}
	 chartd.addSeries({
	        name: nom,
	        data: mesures,
	        yAxis: nomaxe,
	        info: inform,
	        type: typ,
			//dataGrouping: {enabled:group},
			boostThreshold : 20000,
	    });
 },
 
 ouvrebrut: function (serie,nom) {
	 //this.winlistebrut.hide();
	 var thiss = this;
	 var XLSX = require('xlsx');
	 const remote = require('electron').remote; 
	 const app = remote.app;
	 var nomfich = serie+'.csv';
	 var workbook = XLSX.readFile( app.getPath('userData')+"/data/"+nomfich, {type: 'array',raw:false});
	 var result = [];
	 var i = 0;
	 workbook.SheetNames.forEach(function (sheetName) {
	     var roa = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName],{header:["date", "pression","temperature"]});
	     if (roa.length && i==0) {i=1; result = roa;}
	 });

	 dp = [];
	 dt = [];
	 for(var i=1;i<result.length;i++){
	 	dp.push([result[i]["date"]*1000, result[i]["pression"]]);
	 	dt.push([result[i]["date"]*1000, result[i]["temperature"]]);
	 }
	 	if (result[0]["temperature"]== null){var infos = ''; }
	 	else{var infos =result[0]["temperature"];}
	 	this.ajoutserie(dp,'Pression (mbar)',result[0]["pression"]+'-pression',infos);
	 	this.ajoutserie(dt,'Température (°C)',result[0]["pression"]+'-temperature',infos);
	 
 },
 
 
 
 menuserie : function (serie,x,y) {
	 var thiss=this;
	 if (typeof this.menu1 != 'undefined') {this.menu1.destroy();}
	 if (serie.userOptions.yAxis == 'Pression (mbar)' ){
					var obj={
				        text: 'Calculer hauteurs d\'eau',
				        handler: function () {
				        		thiss.calculhauteur(serie);
				        	}
				    	};
	}
	else{
		var obj = null;
	}
	 this.menu1 = Ext.create('Ext.menu.Menu', {
				    width: 150,
				    plain: true,
				    items: [
				    	obj
				    	,
				    	{
				        text: 'Modifier Nom',
				        handler: function () {
				        				thiss.formtitre = Ext.create('Ext.form.Panel', {
									          bodyPadding: 10,
  											  layout: 'form',
											  width: 400,
										            items: [
										              {xtype: 'textfield',
												        name: 'titre',
												        fieldLabel: 'Titre',
												        value: serie.name
										              },	
										              {xtype: 'textareafield',
												        name: 'infos',
												        fieldLabel: 'Infos',
												        value: serie.userOptions.info  
										              },
										           ],
									        buttons: [
									        {
									            text: 'Modifier',
									            handler: function(){
									            		var config = thiss.formtitre.getForm().getValues();
									            		serie.name = config.titre;
									            		serie.userOptions.name = config.titre;
									            		serie.userOptions.info = config.infos;
									            		serie.update({name:config.titre}, false);
									            		thiss.formtitre.destroy(); 
														thiss.wintitre.destroy();
														chartd.legend.update({enabled: true,
																	          borderColor: 'black',
																	          borderWidth: 1,
																	          margin:20});
									            }
									        },
									        {
									            text: 'Annuler',
									            handler: function(){
									            	thiss.formtitre.destroy(); 
								            		thiss.wintitre.destroy(); 
									            }
									        }]
									        
									    });
									 thiss.wintitre = Ext.create('Ext.window.Window', {
									        title: 'Modifier nom',
									        closable : false,
									        layout: 'fit',
									        modal: true,
									        items: thiss.formtitre,
									      }).show();
								  }
				    	}
				    	,
				    	{
				        text: 'Modifier Couleur',
				        handler: function () {
				        				thiss.getViewModel().set('couleurserie',serie.color.substr(1));
				        				thiss.getViewModel().set('seriechangcouleur',serie);
				        				thiss.wincolor = Ext.create('SensusKarst.view.main.choixcouleurwin', {}).show();				        	
								        	}
				    	}
				    	,
				    	{
							text : 'Modifier Axe',
							handler : function () {
									 var idaxe = serie.yAxis.userOptions.id;
									 Ext.MessageBox.show({
								         title: 'Axe de '+serie.name,
								         msg: 'Modifier l\'axe : ',
								         width:400,
								         buttons: Ext.MessageBox.OKCANCEL,
								         prompt : true,
								         value:idaxe ,
								         closable: false,
								         fn: function(btn,txtinfo) {
								         	if(btn=='ok'){
								        	 if(txtinfo || txtinfo!=' '|| txtinfo!='  '){
								        	  	if (!chartd.get(txtinfo)){
														 chartd.addAxis({
													        id: txtinfo,
													        title: {text: txtinfo},
													        scrollbar: {
													             enabled: true,
													             showFull: false
													         },
													    });
												 	}
												serie.update({yAxis: txtinfo}); 
												if(chartd.get(idaxe).series.length==0){chartd.get(idaxe).remove();} 	
								         	}
								         	
								           }
								         }
								     });
							}
							
						},
				    	{
							text : 'Tronquer Séries',
							handler : function () {thiss.tronque(serie)}
							
						},
				    	{
				        text: 'Informations sur la série',
				        handler: function () {
				        	var nbrepoints = serie.xData.length;
				        	var duree = (serie.xData[nbrepoints-1]-serie.xData[0])/1000;
				        	var xmini = Ext.Date.format(Ext.Date.parse(serie.xData[0]/1000, 'U'),'d/m/Y H:i:s');
				        	var xmaxi = Ext.Date.format(Ext.Date.parse(serie.xData[nbrepoints-1]/1000, 'U'),'d/m/Y H:i:s');
				        	var intervalle =(serie.xData[1]-serie.xData[0])/(1000);
				        	var infotext = "Nom: "+serie.name+"<br><br>"+"Axe: "+serie.yAxis.axisTitle.textStr+"<br><br>";
				        	if (serie.userOptions.info != ''){infotext += "Infos: "+serie.userOptions.info+"<br><br>"}
				        	infotext += "Durée: "+thiss.convseconde(duree)+"<br><br>";
				        	infotext += "Du "+xmini+" Au "+xmaxi+"<br><br>";
				        	infotext += "Nombre de Points: "+nbrepoints+"  (intervalle: "+thiss.convseconde(intervalle)+")<br><br>";
				        	infotext += "Valeur minimale: "+serie.dataMin+"<br>";
				        	infotext += "Valeur maximale: "+serie.dataMax+"";
				        	thiss.wininfos = Ext.create('Ext.window.Window', {
				        	        title: 'Informations sur la série',
				        	        layout:'fit',
				        	        bodyPadding: 20,
				        	        html: infotext ,
				        	        closable: false,
				        	        modal: true,
				        	        fbar: [{ 
				        	        		type: 'button',
				        	        		text: 'OK',
				        	        		
				        	        		handler: function(){
							            		thiss.wininfos.destroy(); 
								              }
				        	        	}],
				        	      }).show();
				        	}
				    	  }
				    	  ,
				    	{
					      text: 'Enregistrer la série',
					      handler: function () {
					        	var date = Ext.Date.format(Ext.Date.parse(serie.xData[0]/1000, 'U'),'Y-m-d');
					        	var info = serie.userOptions.info;
					        	var nom = serie.name;
					        	var typeaxe = serie.yAxis.axisTitle.textStr;
					        	var nomfich = date+'-'+nom;
					        	var Heading = [["sensuskarst",nom],["infos",info],["Date",typeaxe ]];
							    seriep = [];
							        	for (i=0; i < serie.xData.length; i += 1) {
											   p= {};				   
											   p['date']=serie.xData[i]/1000;
											   p['valeur']=serie.yData[i];
											   seriep.push(p);
										   }
							        	var XLSX = require('xlsx')
							        	var ws = XLSX.utils.aoa_to_sheet(Heading);
							        		XLSX.utils.sheet_add_json(ws, seriep, {
							        		  header:['date', 'valeur'],
							        		  skipHeader:true,
							        		  origin:'A4'
							        		 });
		
							        		var wb = XLSX.utils.book_new();
							        		XLSX.utils.book_append_sheet(wb, ws);
							        		const remote = require('electron').remote;
							        		remote.dialog.showSaveDialog(remote.getCurrentWindow(), {
							        		    title: 'Enregistrez la serie',
							        		    defaultPath : nomfich,
							        		    filters: [
							        		            {name: 'Fichiers csv SensusKarst', extensions: ['ssk']},
							        		        ]
							        		    },
							        		    (file) => {
							        		    	 if (typeof file != 'undefined'){
							        		    		 var envoip = XLSX.writeFile(wb, file ,{bookType:"csv",compression:false});
							        		    	 	}
							        		    });
					        	}
					    }
				    	,
				    	
				    	  {
				        text: 'Fermer la série',
				        handler: function () {
				        	Ext.Msg.confirm("Fermer la série", "Confirmer la fermeture de la série "+serie.name, function(btnText, sInput){
				                if(btnText === 'yes'){
				                	if(serie.yAxis.series.length==1){serie.yAxis.remove();}
				                	else{serie.remove();}
				                	serie=null;
				                	}
				            	}, this); 
				        	}
				    	}
				    	  
				    ]
				});
	 
	 this.menu1.showAt(x,y-160);
 },
 
 changecouleur : function (serie,couleur) {
 	serie.update({color:"#"+couleur}, false);
		chartd.legend.update({enabled: true,
								borderColor: 'black',
								borderWidth: 1,
								margin:20});
 },	

 modiftitre : function (titre) {
	 Ext.MessageBox.show({
         title: 'Titre du Graphique',
         msg: 'Renommer le graphique : ',
         width:400,
         buttons: Ext.MessageBox.OK,
         prompt : true,
         value: titre,
         closable: false,
         fn: function(btn,txtinfo) {
        	 if(!txtinfo || txtinfo==' '|| txtinfo=='  '){txtinfo = '......';}
        	 chartd.setTitle({ text: txtinfo});
         }
     });
 },
 

 
 
 calculhauteur: function (serie){
 	var me = this;
 	me.clique = 'hauteur';
 					var curseur=1;
					 if (chartd.tooltip.options.enabled==false){
						 curseur=0;
						 me.oncurseur(0,true);
					 }
					 var arr = [];
					 var obj = [];
					 for (i=0; i < chartd.series.length; i += 1) {
						 if (chartd.series[i].name.indexOf("Navigator")){
						 	if (chartd.series[i].name!=serie.name && chartd.series[i].userOptions.yAxis == 'Pression (mbar)' ){
								obj=[chartd.series[i].name];
							    arr.push(obj);
						 	   }
						 }
					 }
 	 				me.formhauteur = Ext.create('Ext.form.Panel', {
					        bodyPadding: 12,
					        width : 550,
					        items:[
					        	  {
									xtype: 'combobox',
									fieldLabel: 'Unité hauteur d\'eau',
									name: 'unite',
									value :'cm',
									forceSelection : true,
									labelWidth : 130,
									store: {
									            	type: 'array',
									                fields: [ 'format' ],
									                data: [
									                	['cm'],
									                    ['m'],
									                ]
									            },
									displayField: 'format',
									typeAhead: true,
								 },
					             {
						           xtype: 'combobox',
								   fieldLabel: 'Série de référence',
								   name: 'serieref',
								   labelWidth : 130,
								   width : '100%',
								   store: {
									            	type: 'array',
									                fields: [ 'format' ],
									                data: arr
									            },
								    displayField: 'format',
									typeAhead: true,
						        },
					        	{
						            xtype: 'fieldset',
						            border: false,
						            padding : 0,
						            margin: 0,
						            fieldDefaults: {
						                labelWidth: 170,
						                format :'d/m/Y H:i',
						                submitFormat : 'time', 
						                altFormats: 'd/m/y',
						            	},
				
						            items: [
						              {
								        xtype: 'numberfield',
								        margin : '20 0 0 0',
								        anchor: '100%',
								        name: 'profdepart',
								        fieldLabel: 'Profondeur au départ (cm)',
								        minValue: 0,
								        listeners: {
										        change:function (){ me.formhauteur.queryById('from').setDisabled(false);}
										    }
								      },
						              { xtype: 'fieldcontainer',
						                itemId :'from',
						                disabled  : true,
						            	layout: 'hbox',  
						            	items: [
						            	     
							            	{
							            	xtype: 'datefield',	
							                fieldLabel: 'stable jusqu\'au',
							                name: 'from_date',
							            	},
							            	{
							            	xtype: 'button',
											text:'click sur graph',
											handler: function(){
													avap= 1;
													me.winhauteur.hide();
												}
							            	}
						            	]
						              },
						              {
								        xtype: 'numberfield',
								        margin : '20 0 0 0',
								        anchor: '100%',
								        name: 'proffin',
								        fieldLabel: 'Profondeur à la fin (cm)',
								        minValue: 0,
								        listeners: {
										        change:function (){ me.formhauteur.queryById('to').setDisabled(false);}
										    }
								      },
						              { xtype: 'fieldcontainer',
						                itemId :'to',
						                disabled  : true,
						            	layout: 'hbox',  
							            items: [	
							            	{
							            	xtype: 'datefield',	
							                fieldLabel: 'stable depuis',
							                name: 'to_date',
							            	},
							            	{
							            	xtype: 'button',
											text:'click sur graph',
											handler: function(){
													avap= 2;
													me.winhauteur.hide();
												}
							            	}
						            	]
						              },
						           ]
						        
						        },
						         {
								 xtype: 'textfield',
								 margin : '20 0 5 0',
								 labelWidth : 120,
								 fieldLabel: 'Titre de la série',													               
								 name : 'titre',
								 value : serie.name
								 },
								 {
								 xtype: 'textarea',
								 labelWidth : 120,
								 fieldLabel: 'Infos',
								 name : 'info',
								 height : 80,
								 value : serie.userOptions.info
								 },
					        	
					        ],
					        buttons: [
					        {
					            text: 'Calculer',
					            handler: function(){
					            	var config = me.formhauteur.getForm().getValues();
					            	var serieref;
					            	var typecalcul = '';
					            	if (config.profdepart == "" && config.proffin == ""){
									 	Ext.MessageBox.alert('Problème !', 'Il manque des infomations<br>pour calculer les hauteurs d\'eau', this.showResult, this);
									 }
									 else if (config.titre == ''  || config.titre == serie.name ){
									 	Ext.MessageBox.alert('Problème !', 'Problème de titre !', this.showResult, this);
									 }
									else{ 
					            	if (config.serieref != ""){
						            	for (i=0; i < chartd.series.length; i += 1) {
											 	if (chartd.series[i].name==config.serieref){
													serieref=chartd.series[i];
											 	   }
											 }
										var seriex = [];
										var seriey = [];
										if (serieref.xData[0]<serie.xData[0] && serieref.xData[serieref.xData.length-1]>serie.xData[serie.xData.length-1]){	 
							            		
							            		var j = 0;
							            		for (var i = 0; i < serie.xData.length; i++) {
							            			while (serieref.xData[j]<serie.xData[i]){
							            				j += 1;
							            			}
							            			var y = serieref.yData[j-1]+(serie.xData[i]-serieref.xData[j-1])*(serieref.yData[j]-serieref.yData[j-1])/(serieref.xData[j]-serieref.xData[j-1]);
							            			if(isNaN(y) == false){
								            			seriex.push(serie.xData[i]);
								            			seriey.push(serie.yData[i]-y);
							            			}
							            		}
							            		typecalcul = 'ref';
										}
										else{typecalcul = 'ref false';}
					            		
									 }
									 else {
									 	var seriex = serie.xData;
									 	var seriey = serie.yData;
									 	typecalcul = 'sans ref';
									 }	
									 
									 if (seriex.length>1){
									 	// calcul moyenne
									 	var somme1 = 0;
									 	var moyenne1 = 'a';
									 	var count1 = 0;
									 	var somme2 = 0;
									 	var moyenne2 = 'a';
									 	var count2 = 0;
									 	var max1 = 0;
									 	var min1 = 10000000000;
									 	var ecart1 = 0;
									 	var max2 = 0;
									 	var min2 = 10000000000;
									 	var ecart2 = 0;
									 	var ecart = 0;
									 	if (config.profdepart != ""){
									 		var limite = seriex[0];
									 		if (config.from_date != ""){
									 			limite = config.from_date-60;
									 			while (seriex[count1]<limite){
									 				somme1 += seriey[count1];
									 				if (seriey[count1]>max1){max1 = seriey[count1];}
									 				if (seriey[count1]<min1){min1 = seriey[count1];}
									 				count1 += 1;
									 			}
									 			moyenne1 = somme1/count1;
									 			ecart1 = max1-min1;
									 			
									 		}
									 		else{
									 			moyenne1 = seriey[0];
									 		}
									 	}
									 	if (config.proffin != ""){
									 		var finx = seriex.length-1;
									 		var limite = seriex[finx];
									 		if (config.to_date != ""){
									 			limite = config.to_date-60;
									 			while (seriex[finx-count2]>limite){
									 				somme2 += seriey[finx-count2];
									 				if (seriey[finx-count2]>max2){max2 = seriey[finx-count2];}
									 				if (seriey[finx-count2]<min2){min2 = seriey[finx-count2];}
									 				count2 += 1;
									 			}
									 			moyenne2 = somme2/count2;
									 			ecart2 = max2-min2;
									 		}
									 		else{
									 			moyenne2 = seriey[finx];
									 		}
									 	}
									 	var zero1;
									 	var zero2;
									 	var zero;
									 	if (moyenne1 !='a'){
									 		zero1 = moyenne1-config.profdepart/1.0197;
									 		zero = zero1;
									 		if (moyenne2 !='a'){
									 			zero2 = moyenne2-config.proffin/1.0197;
									 			zero = (zero1 + zero2)/2;
									 		}
									 	}
									 	else{
									 		zero = moyenne2-config.proffin/1.0197;
									 	}
									 	if (ecart1 != 0 && ecart2 != 0){
									 		 ecart = Math.max(ecart1,ecart2); 
									 	}
									 	else if (moyenne1 =='a'){
									 		 if (ecart2 !=0){ecart=ecart2;}
									 	}
									 	else if (moyenne2 =='a'){
									 		 if (ecart1 !=0){ecart=ecart1;}
									 	}
									 	if (ecart == 0){
											 	if (moyenne1 !='a' && moyenne2 !='a'){
											 		ecart = Math.abs(moyenne1-moyenne2);
											 	}
									 	}
									 	// calcule hauteur
									 	var tabdata=[];
									 	if (config.unite == 'm'){var unite = 'Hauteur d\'eau (m)'; var coef = 0.01;}
									 	else{var unite = 'Hauteur d\'eau (cm)'; var coef = 1;}
									 	for (var i = 0; i < seriex.length; i++) {
									 		tabdata.push([seriex[i],Math.round((seriey[i]-zero)*1.0197)*coef]);
									 	}
									 	var max =  Math.round((Math.max.apply(null, seriey)-zero)*1.0197)*coef+' '+config.unite;
									 	var min =  Math.round((Math.min.apply(null, seriey)-zero)*1.0197)*coef+' '+config.unite;
									 	var text = "titre : "+config.titre+"<br>";
									    text += "Infos : "+config.info+"<br><br>";
									 	text += "Hauteur max : "+max+"<br>";
									 	text += "Hauteur min : "+min+"<br><br>";
									 	if (typecalcul == 'ref'){text += "L'incertitude sur les mesures est de ±6 cm<br>avec une série de référence correcte<br>";}
									 	else{text += "Attention : Sans série de référence,<br> L'incertitude sur les mesures est de ±30 cm<br>";}
									 	if (ecart != 0) {text += "Ecart des données de moyenne : "+Math.round(ecart);}
									 	Ext.Msg.confirm("Valider le calcul de la série",text , function(btnText, sInput){
							                if(btnText === 'yes'){
							                	me.ajoutserie(tabdata,unite,config.titre,config.info);
								            	me.formhauteur.destroy(); 
							            		me.winhauteur.destroy(); 
							                	}
							            	}, this); 
									 	
									 }
									 else {
									 	if (typecalcul == 'ref false'){
									 			Ext.MessageBox.alert('Problème !', 'La série de référence ne recouvre pas<br>l\'ensemble de la série', this.showResult, this);
									 	}
									 	else{
									 		Ext.MessageBox.alert('Problème !', 'Erreur de calcul', this.showResult, this);
									 	}
									 }
									 	
									 	
									}	
					            	
					            }
					        },
					        {
					            text: 'Annuler',
					            handler: function(){
					            	if(curseur==0){me.oncurseur();}
					            	me.formhauteur.destroy(); 
				            		me.winhauteur.destroy(); 
					            }
					        }]
					        
					    });
					 me.winhauteur = Ext.create('Ext.window.Window', {
					        title: 'Calculer les hauteurs d\'eau pour la série '+serie.name,
					        closable : false,
					        layout: 'fit',
					        modal: true,
					        items: me.formhauteur,
					      }).show();
 	
 },
 
 
 
 
 tronque:  function (serie) {
	 var thiss=this;
	 thiss.clique = 'tronque';
					 var curseur=1;
					 if (chartd.tooltip.options.enabled==false){
						 curseur=0;
						 thiss.oncurseur(0,true);
					 }
					 var arr = [];
					 var obj = {};
					 for (i=0; i < chartd.series.length; i += 1) {
						 if (chartd.series[i].name.indexOf("Navigator")){
						 	 if (chartd.series[i]==serie){obj={boxLabel: chartd.series[i].name, name: 'serie-'+i,checked: true};}
							 else{obj={boxLabel: chartd.series[i].name, name: 'serie-'+i};}
							    arr.push(obj);
						 }
					 }
					 
					 thiss.formtronque = Ext.create('Ext.form.Panel', {
					        layout: 'hbox',
					        bodyPadding: 2,
					        items:[
					        	{
						            xtype: 'fieldset',
						            title: 'Supprimer les données : ',
						            padding : 3,
						            margin: 5,
						            fieldDefaults: {
						                labelAlign: 'right',
						                labelWidth: 40,
						                format :'d/m/Y H:i',
						                submitFormat : 'time', 
						                altFormats: 'd/m/y',
						            	},
				
						            items: [
						              { xtype: 'fieldcontainer',
						            	layout: 'hbox',  
						            	items: [
							            	{
							            	xtype: 'datefield',	
							                // anchor: '100%',
							                fieldLabel: 'Avant',
							                name: 'from_date',
							            	},
							            	{
							            	xtype: 'button',
											text:'click sur graph',
											handler: function(){
													avap= 1;
													thiss.wintronque.hide();
												}
							            	}
						            	]
						              },	
						              { xtype: 'fieldcontainer',
						            	layout: 'hbox',  
							            items: [	
							            	{
							            	xtype: 'datefield',		
							                // anchor: '100%',
							                fieldLabel: 'Après',
							                name: 'to_date',
							            	},
							            	{
							            	xtype: 'button',
											text:'click sur graph',
											handler: function(){
													avap= 2;
													thiss.wintronque.hide();
												}
							            	}
						            	]
						              },
						           ]
						        
						        },
					        	{
						            xtype: 'fieldset',
						            title: 'Choisir les séries',
						            padding : 3,
						            margin: 5,
						            items: {
						            	xtype: 'checkboxgroup',
						            	columns: 1,
						            	items:arr,
						            }
						        },
					        ],
					        buttons: [
					        {
					            text: 'Tronquer',
					            handler: function(){
					            	var debut;
					            	var fin;
					            	var serietronq = [];
					            	Ext.iterate(thiss.formtronque.getForm().getValues(), function(key, value) {
					            		if (key=='from_date'){debut=Number(value);}
					            		else if (key=='to_date'){fin=Number(value);}
					            		else {serietronq.push(Number(key.substring(6)));}
					            	}, this);
					            	
							         if(debut!='' && fin!='' && serietronq.length > 0){
							        		if(debut > fin){
							        			Ext.MessageBox.alert('Problème !', 'la date de début est postérieur à la date de fin', this.showResult, this);
							        		}
							        		else {
							         	
					            					Ext.Msg.confirm("Confirmation",
							            					"Etes-vous sûr de vouloir tronquer les séries ?",
							            					function(id) {
							            						if (id === 'yes') {
												            		for (i=0; i < serietronq.length; i += 1) {
													            		var k = serietronq[i];
													            		var nouvdata = [];
													            		for (j=0; j <chartd.series[k].xData.length; j += 1) {
													            			if(chartd.series[k].xData[j]>=debut & chartd.series[k].xData[j]<=fin){
													            				nouvdata.push([chartd.series[k].xData[j],chartd.series[k].yData[j]]);
													            			}
													            		}
													            		chartd.series[k].setData(nouvdata);
													            	}
												            		if(curseur==0){thiss.oncurseur();}
												            		thiss.formtronque.destroy(); 
												            		thiss.wintronque.destroy(); 
							            						}
							            					});
							        		}				
							         }
					            	
					            }
					        },
					        {
					            text: 'Annuler',
					            handler: function(){
					            	if(curseur==0){thiss.oncurseur();}
					            	thiss.formtronque.destroy(); 
				            		thiss.wintronque.destroy(); 
					            }
					        }]
					        
					    });
					 thiss.wintronque = Ext.create('Ext.window.Window', {
					        title: 'Tronquer des séries',
					        closable : false,
					        layout: 'fit',
					        modal: true,
					        items: thiss.formtronque,
					      }).show();
	 
	 
 },
 
 onnozoom : function () {
		chartd.update({
	        chart: {
	        	zoomType:'none' ,
	        }
	        
	  });  
	  Ext.getCmp('p4').setChecked (true);
		  
	},
    
 onzoom:    function (butt,check) {
	  
	  
	  if (check){
		  test = 'none';
		  if (butt.text == 'zoom 2 axes'){
			  test = 'xy';
		  }
		  else if (butt.text == 'zoom axe X'){
			  test = 'x';  
		  }
		  else if (butt.text == 'zoom axe Y'){
			  test = 'y';
		  }
		chartd.update({
	        chart: {
	        	zoomType:test ,
	        },
	  });  
		  
	  }
    },
    
 zoommoins: function () {
	 for (i=0; i < chartd.yAxis.length-1; i += 1) {
		 var extreme = chartd.yAxis[i].getExtremes();
		 var ecart = extreme.max-extreme.min
		 var maxy = extreme.max+ecart*0.1;
		 var miny = extreme.min-ecart*0.1;
		 chartd.yAxis[i].setExtremes( miny,maxy,true,false);
	 }
	 
	 var extreme = chartd.xAxis[0].getExtremes();
	 var ecart = extreme.max-extreme.min
	 var maxy = extreme.max+ecart*0.1;
	 var miny = extreme.min-ecart*0.1;
	 chartd.xAxis[0].setExtremes( miny,maxy,true,false);
	 
 	},
 zoomplus: function () {
 		 for (i=0; i < chartd.yAxis.length-1; i += 1) {
 			 var extreme = chartd.yAxis[i].getExtremes();
 			 var ecart = extreme.max-extreme.min
 			 var maxy = extreme.max-ecart*0.1;
 			 var miny = extreme.min+ecart*0.1;
 			 chartd.yAxis[i].setExtremes( miny,maxy,true,false);
 		 }
 		 
 		 var extreme = chartd.xAxis[0].getExtremes();
 		 var ecart = extreme.max-extreme.min
 		 var maxy = extreme.max-ecart*0.1;
 		 var miny = extreme.min+ecart*0.1;
 		 chartd.xAxis[0].setExtremes( miny,maxy,true,false);
 		 
 	 	},
 zoomreset: function () {
 		 chartd.zoomOut();
 	 	},	
    
 oncurseur:    function (butt,check) {
	  
	  if (check){	
		  chartd.tooltip.update({enabled: true});
		  
	  }
	  else{
			chartd.tooltip.update({enabled: false});  
		  }
			

    },
  
 modifaxe: function (butt,check) { 
	 
	 var arr = [];
	 var obj = {};
	 var ij = 0;
	 for (i=0; i < chartd.yAxis.length; i += 1) {
		if(chartd.yAxis[i].axisTitle!=undefined){
		 if (ij==0){j='a';} else if(ij==1){j='b';}else if(ij==2){j='c';}else if(ij==3){j='d';}else if(ij==4){j='e';}else if(ij==5){j='f';}else {j='g';}
		 ij += 1
		 var extreme = chartd.yAxis[i].getExtremes();
		 var maxy = extreme.max
		 var miny = extreme.min;
		 var nom1 = chartd.yAxis[i].axisTitle.textStr;
		 var inverse = chartd.yAxis[i].reversed;
		 var oppose = chartd.yAxis[i].opposite;
		 obj={
		            xtype: 'fieldset',
		            title: 'Axe '+nom1,
		            defaultType: 'numberfield',
		            padding : 3,
		            margin: 5,		            
		            fieldDefaults: {
		                labelAlign: 'right',
		                width : 210,
		                labelWidth: 80,
		            },

		            items: [
		            		{  
		                	fieldLabel: 'de',
		                    step: 0.1,
		                    decimalPrecision: 5,
		                	name: j+'min',
		                	value:  miny 
		                	},
		                	{  
		                    fieldLabel: 'à ',
		                    step: 0.1,
		                    decimalPrecision: 5,
		                    name: j+'max',
		                    value:  maxy 
		                    },
		                    {  
			                fieldLabel: 'Intervalle',
			                step: 0.1,
			                decimalPrecision: 5,
			                minValue: 0,
			                name: j+'int',
			                },
			                {
			                xtype: 'checkbox',	
				            fieldLabel: 'Inversé',
				            name: j+'rev',
				            checked : inverse,
				            },
			                {
			                xtype: 'checkbox',	
				            fieldLabel: 'A droite',
				            name: j+'opp',
				            checked : oppose,
				            }
		            ]
		        };
		 arr.push(obj);	
		}
	 }
	 
	 
	 var extreme = chartd.xAxis[0].getExtremes();
	 var maxx = extreme.max;
	 var minx = extreme.min;
	 maxx = Ext.Date.parse(maxx, "time");
	 minx = Ext.Date.parse(minx, "time");
	 obj={
	            xtype: 'fieldset',
	            title: 'Axe des temps',
	            padding : 3,
	            margin: 5,
	            defaultType: 'datefield',
	            fieldDefaults: {
	                labelAlign: 'right',
	                labelWidth: 20,
	                format :'d/m/Y H:i',
	                submitFormat : 'time', 
	                altFormats: 'd/m/y',
	            },

	            items: [{
	                anchor: '100%',
	                fieldLabel: 'de',
	                name: 'from_date',
	                listeners : {
	                    afterRender : function(datefield) {
	                        datefield.setValue(minx);
	                                }
	                        }
	            }, {
	                anchor: '100%',
	                fieldLabel: 'à',
	                name: 'to_date',
	                listeners : {
	                    afterRender : function(datefield) {
	                        datefield.setValue(maxx);
	                                }
	                        }
	            }]
	        };
	 arr.push(obj);	
	 
    var form12 = Ext.create('Ext.form.Panel', {
        layout: 'hbox',
        bodyPadding: 2,
        items: arr,
        buttons: [{
            text: 'Appliquer',
            handler: function(){
            	var ij = 0;
            	for (i=0; i < chartd.yAxis.length; i += 1) {
            		if(chartd.yAxis[i].axisTitle!=undefined){
            		if (ij==0){var maxy = form12.getValues().amax;var miny = form12.getValues().amin;var inty = form12.getValues().aint;var revy = form12.getValues().arev;var oppy = form12.getValues().aopp;}
        			else if(ij==1){var maxy = form12.getValues().bmax;var miny = form12.getValues().bmin;var inty = form12.getValues().bint;var revy = form12.getValues().brev;var oppy = form12.getValues().bopp;}
        			else if(ij==2){var maxy = form12.getValues().cmax;var miny = form12.getValues().cmin;var inty = form12.getValues().cint;var revy = form12.getValues().crev;var oppy = form12.getValues().copp;}
        			else if(ij==3){var maxy = form12.getValues().dmax;var miny = form12.getValues().dmin;var inty = form12.getValues().dint;var revy = form12.getValues().drev;var oppy = form12.getValues().dopp;}
        			else if(ij==4){var maxy = form12.getValues().emax;var miny = form12.getValues().emin;var inty = form12.getValues().eint;var revy = form12.getValues().erev;var oppy = form12.getValues().eopp;}
        			else if(ij==5){var maxy = form12.getValues().fmax;var miny = form12.getValues().fmin;var inty = form12.getValues().fint;var revy = form12.getValues().frev;var oppy = form12.getValues().fopp;}
        			else {var maxy = form12.getValues().gmax;var miny = form12.getValues().gmin;var inty = form12.getValues().gint;var revy = form12.getValues().grev;var oppy = form12.getValues().gopp;}
            		ij += 1;
        			 miny = Number(miny.replace(",", "."));
        			 maxy = Number(maxy.replace(",", "."));
        			 inty = Number(inty.replace(",", "."));
        			 chartd.yAxis[i].setExtremes( miny,maxy,true,false);
        			 if (inty!=''){chartd.yAxis[i].update({tickInterval:inty});}
        			 else {chartd.yAxis[i].update({tickInterval:undefined,tickPixelInterval: 40,})}
        			 chartd.yAxis[i].update({reversed:revy,opposite:oppy})
            		}
        		 }
        		 
        		 var minx1 = form12.getValues().from_date;
        		 var maxx1 = form12.getValues().to_date;
        		 minx1 = Number(minx1);
    			 maxx1 = Number(maxx1);
        		 chartd.xAxis[0].setExtremes(minx1,maxx1,true,false);
            }
        },
        {
            text: 'OK',
            handler: function(){
            	var ij = 0;
            	for (i=0; i < chartd.yAxis.length; i += 1) {
            		if(chartd.yAxis[i].axisTitle!=undefined){
            		if (ij==0){var maxy = form12.getValues().amax;var miny = form12.getValues().amin;var inty = form12.getValues().aint;var revy = form12.getValues().arev;var oppy = form12.getValues().aopp;}
        			else if(ij==1){var maxy = form12.getValues().bmax;var miny = form12.getValues().bmin;var inty = form12.getValues().bint;var revy = form12.getValues().brev;var oppy = form12.getValues().bopp;}
        			else if(ij==2){var maxy = form12.getValues().cmax;var miny = form12.getValues().cmin;var inty = form12.getValues().cint;var revy = form12.getValues().crev;var oppy = form12.getValues().copp;}
        			else if(ij==3){var maxy = form12.getValues().dmax;var miny = form12.getValues().dmin;var inty = form12.getValues().dint;var revy = form12.getValues().drev;var oppy = form12.getValues().dopp;}
        			else if(ij==4){var maxy = form12.getValues().emax;var miny = form12.getValues().emin;var inty = form12.getValues().eint;var revy = form12.getValues().erev;var oppy = form12.getValues().eopp;}
        			else if(ij==5){var maxy = form12.getValues().fmax;var miny = form12.getValues().fmin;var inty = form12.getValues().fint;var revy = form12.getValues().frev;var oppy = form12.getValues().fopp;}
        			else {var maxy = form12.getValues().gmax;var miny = form12.getValues().gmin;var inty = form12.getValues().gint;var revy = form12.getValues().grev;var oppy = form12.getValues().gopp;}
            		ij += 1;
        			 miny = Number(miny.replace(",", "."));
        			 maxy = Number(maxy.replace(",", "."));
        			 inty = Number(inty.replace(",", "."));
        			 chartd.yAxis[i].setExtremes( miny,maxy,true,false);
        			 if (inty!=''){chartd.yAxis[i].update({tickInterval:inty});}
        			 else {chartd.yAxis[i].update({tickInterval:undefined,tickPixelInterval: 40,})}
        			 chartd.yAxis[i].update({reversed:revy,opposite:oppy})
            		}
        		 }
        		 
        		 var minx1 = form12.getValues().from_date;
        		 var maxx1 = form12.getValues().to_date;
        		 minx1 = Number(minx1);
    			 maxx1 = Number(maxx1);
        		 chartd.xAxis[0].setExtremes(minx1,maxx1,true,false);
            	form12.destroy(); 
            	win12.destroy(); 
            	form12 = null;
            	win12 = null;
            }
        },
        {
            text: 'Annuler',
            handler: function(){
            	form12.destroy(); 
            	win12.destroy(); 
            	form12 = null;
            	win12 = null;
            }
        }]
        
    });
    var win12 = Ext.create('Ext.window.Window', {
        title: 'Echelles des Axes',
        layout: 'fit',
        modal: true,
        items: form12,
      }).show();
    
  },
  
  modifzonedate: function (zone) {
  	if (zone== 'local'){
  		var Highcharts = require('highcharts/highstock');
  		Highcharts.setOptions({
				
				time: {
			        useUTC: false
			    },
  		})
  		chartd.update({
					  time: {
						useUTC: false,
					  }
					});
  	}
  	else{
  		chartd.update({
					  time: {
					  	useUTC: true,
					    timezoneOffset:-zone*60
					  }
					});
  	}
  	
  	var titreaxe = this.nomzonehoraire(zone);
  	
  	chartd.xAxis[0].setTitle({text: 'Date [ '+titreaxe+' ]'});
  	
  },
  
  nomzonehoraire : function (zone) {
  	var retval = 'Heure Local (ordi)';
	switch (zone) {
	    case '0':
	        retval = 'Temps universel (UTC)';
	        break;
	    case '1':
	        retval = 'UTC +01 Heure d\'hiver';
	        break;
	    case '2':
	        retval = 'UTC +02 Heure d\'été';
	        break;
	    case '-12':
	        retval = 'UTC -12:00';
	        break;    
	    case '-11':
	        retval = 'UTC -11:00';
	        break;
	    case '-10':
	        retval = 'UTC -10:00';
	        break;
	    case '-9':
	        retval = 'UTC -09:00';
	        break;
	    case '-8':
	        retval = 'UTC -08:00';
	        break;
	    case '-7':
	        retval = 'UTC -07:00';
	        break ;
	    case '-6':
	        retval = 'UTC -06:00';
	        break;
	    case '-5':
	        retval = 'UTC -05:00';
	        break;
	    case '-4':
	        retval = 'UTC -04:00';
	        break;
	    case '-3':
	        retval = 'UTC -03:00';
	        break;
	    case '-2':
	        retval = 'UTC -02:00';
	        break;
	    case '-1':
	        retval = 'UTC -01:00';
	        break ; 
	    case '3':
	        retval = 'UTC +03:00';
	        break ;
	    case '4':
	        retval = 'UTC +04:00';
	        break;
	    case '5':
	        retval = 'UTC +05:00';
	        break;
	    case '6':
	        retval = 'UTC +06:00';
	        break;
	    case '7':
	        retval = 'UTC +07:00';
	        break;
	    case '8':
	        retval = 'UTC +08:00';
	        break;
	    case '9':
	        retval = 'UTC +09:00';
	        break;
	    case '10':
	        retval = 'UTC +10:00';
	        break ;  
	    case '11':
	        retval = 'UTC +11:00';
	        break;
	    case '12':
	        retval = 'UTC +12:00';
	        break ;    
	}
	return retval;
  	
  },
  
 afterRender: function () {
  this.modifzonedate(val.fhaffich);
 },
 
 
 beforeRender: function () {
var thiss=this;		

this.winlistebrut = Ext.create('SensusKarst.view.main.ListebrutWin');
this.winouvrefichier = Ext.create('SensusKarst.view.main.graphique.ouvrefichierwin');


var Highcharts = require('highcharts/highstock');
require('highcharts/modules/exporting')(Highcharts);
require('highcharts/modules/offline-exporting')(Highcharts);
require('highcharts/modules/export-data')(Highcharts);
HighchartsCustomEvents = require('highcharts-custom-events')(Highcharts);
require('highcharts/modules/boost')(Highcharts);
require('highcharts/modules/no-data-to-display')(Highcharts);
require('highcharts/modules/broken-axis')(Highcharts);

//require('highcharts/indicators/indicators-all')(Highcharts)
//require('highcharts/modules/drag-panes')(Highcharts)
//require('highcharts/modules/annotations-advanced')(Highcharts)
//require('highcharts/modules/price-indicator')(Highcharts)
//require('highcharts/modules/full-screen')(Highcharts)
//require('highcharts/modules/stock-tools')(Highcharts)


Highcharts.setOptions({
	
	time: {
        useUTC: false
    },
    lang: {
		months: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'],
		weekdays: ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'],
		shortMonths: ['Jan', 'Fev', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Août', 'Sept', 'Oct', 'Nov', 'Déc'],
		decimalPoint: ',',
		thousandsSep: '',
		noData: 'Pas de série de mesures chargée',
   },
   colors: ["#0000FF", "#FF0000", "#00FF00", "#000000", "#00FFFF", "#FF00FF", "#008000", "#FFA500", "#D1D1D1", "#800000","#4B0082","#FFC0CB","#ADD8E6","#808000","#7A9BFF","#FF667B",
			"#A4E400","#9E85C7","#F5E800","#FF8837","#9CF1CF"],
   yAxis : {
		tickPixelInterval: 40,
        opposite: false,
        tickWidth: 1,
        lineWidth: 1,
        gridLineWidth: 2,
        lineColor: 'black',
        tickColor: 'black',
         
		 labels: {
		                style: {
		                    color: 'black'
		                },
		                events: {
		                    dblclick: function () {
		                    	thiss.modifaxe();
		                    }
		                }
		            },
		            
		 title: {
			      style: {
			           color: 'black'
			        },
			      events: {
			        dblclick: function () {
			        thiss.modifaxe();
			               }
			           }
			  },	
	}, 
    
});

avap= 0;
chartd = new Highcharts.StockChart({
	
    
    chart: {
        renderTo: 'graphd',
        height: Ext.getBody().getHeight()-100,
        width: Ext.getBody().getWidth()-30,
        type: 'line',// spline',
        animation:false,
        zoomType: 'none',
        panning: true,
        panKey: 'ctrl',
        events: {
       	 click: function (e) {
           	 if (avap == 1){
          		 avap= 0;
          		 var x = Ext.Date.parse(e.xAxis[0].value, "time");
          		 if (thiss.clique == 'hauteur'){	 
	          		thiss.formhauteur.getForm().setValues({from_date: x});
	          	    thiss.winhauteur.show();
	          	}
	          	else{
	          		thiss.formtronque.getForm().setValues({from_date: x});
	          	    thiss.wintronque.show();
	          	}
          	 }
          	 else if (avap == 2){
          		 avap= 0;
          		 var x = Ext.Date.parse(e.xAxis[0].value, "time");
	          	if (thiss.clique == 'hauteur'){	 
	          		thiss.formhauteur.getForm().setValues({to_date: x});
	          	    thiss.winhauteur.show();
	          	}
	          	else{
	          		thiss.formtronque.getForm().setValues({to_date: x});
	          	    thiss.wintronque.show();
	          	}
          	 }
            }
        },
        resetZoomButton: {
            theme: {
                display: 'none'
            }
        },
    },

    credits: {
        enabled: false
    },
    
    title: {
					 text: 'Graphique',
					 events: {
			                click: function () {
			                	thiss.modiftitre(chartd.title.textStr);
			                }
			            }
					 
		  },
	  boost:{
		  useGPUTranslations:true,
	  },
		  
      tooltip: {
    	  enabled: false,
    	  animation:false,
          backgroundColor: 'lightgrey',
          borderColor: 'black',
          borderWidth: 0,
         // valueDecimals: 2,
          headerFormat: '<strong>{point.x:%A %d %B %Y  %H:%M:%S}</strong><br>',
          positioner: function () {return { x: 150, y: 5 };},
        shadow: false,
        split : false,
        shared: true,
      },
      
      legend: {
    	  enabled: true,
          borderColor: 'black',
          borderWidth: 1,
          margin:20,
    	  itemEvents: {
              contextmenu: function (e){ 
            	  thiss.menuserie(this,e.x,e.y);
            	  
              }
          }
      },
      
      
      rangeSelector: {
          enabled: false
      },
      
      plotOptions: { 
    	  series: {
              states: {
                  inactive: {
                      opacity: 1
                  },
                  hover: {
                  	  lineWidth: 1,
                      halo: {
                          size: 0,
                      },
                      marker:{
                    	  symbol: "circle",  
                      },

                  },
              },
              //boostThreshold : 50000,
              dataGrouping: {enabled:false},
              lineWidth:1,
              showInNavigator:true,
              getExtremesFromAll: true, 
              gapSize: 3,
              gapUnit : 'relative',
     	         }
     	
      
      },
      
	navigator: {
				height: 35,
		        margin: 5,
				xAxis: {
					 		ordinal: false,
			                gridLineWidth: 1,
			                dateTimeLabelFormats: {
									                minute: '%H:%M<br/>%e %b',
									                hour: '%H:%M<br/>%e %b',
									                day: '%e %b<br/>%Y',
									                week: '%e %b<br/>%Y',
									                month: '%b %Y',
									                year: '%Y'
									            }
		        }

	
	},
	
	navigation: {
        buttonOptions: {
            enabled: false
        }
    },
    exporting: {
    	fallbackToExportServer:false,
    	csv: {
            dateFormat: '%d/%m/%Y %H:%M:%S'
        },
        chartOptions: {
          navigator: {
            enabled: false
          },
          scrollbar: {
            enabled: false
          }
        }
    },
	
	xAxis: {
		tickPixelInterval: 65, 
 		// crosshair: false,
 		tickWidth: 1,
 		lineWidth: 1,
 		gridLineWidth: 2,
 		lineColor: 'black',
 		tickColor: 'black',
 		ordinal: false,
 		dateTimeLabelFormats: {
            minute: '%H:%M<br/>%e %b',
            hour: '%H:%M<br/>%e %b',
            day: '%e %b<br/>%Y',
            week: '%e %b<br/>%Y',
            month: '%b %Y',
            year: '%Y'
        },
		title: {
	        text: 'Date',
	        events: {
                dblclick: function () {
                	thiss.modifaxe();
                }
            }
	    },
	    labels: {
	    	style:{
	    	color: 'black',
	    	fontSize: '9px',
	    	},
            events: {
                dblclick: function () {
                	thiss.modifaxe();
                }
            }
        },
		
	},
  		});

Ext.on('resize', function() { 
	chartd.setSize(
			Ext.getBody().getWidth()-30,
			Ext.getBody().getHeight()-100, 
		    false
		    );    
	});

 },
 




});