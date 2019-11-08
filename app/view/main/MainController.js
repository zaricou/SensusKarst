
Ext.define('SensusKarst.view.main.MainController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.main',

   beforeRender: function () {
   		const Store = require('electron-store');
		const store = new Store();
   		if (store.has("parametre")){
			val.port = store.get("parametre.port");
			val.intervalp = store.get("parametre.interval");
			val.unite = store.get("parametre.unite");
			val.interval0 = store.get("parametre.interval0");
			val.declench = store.get("parametre.declench");
			val.declench0 = store.get("parametre.declench0");
			val.moyenne = store.get("parametre.moyenne");
			
		}
		else{
			store.set("parametre.port",val.port);
			store.set("parametre.interval",val.intervalp);
			store.set("parametre.unite",val.unite);
			store.set("parametre.interval0",val.interval0);
			store.set("parametre.declench",val.declench);
			store.set("parametre.declench0",val.declench0);
			store.set("parametre.moyenne",val.moyenne);
			store.set("parametre.moyenne",val.moyenne);
		}
		
	   if (store.has("fhaffich")){
	   	  val.fhaffich = store.get("fhaffich")
	   }
	   else{
	   	  store.set("fhaffich",val.fhaffich);
	   }
	   var heuredh  = ~~(new Date().getTimezoneOffset()/60);
		var minutedh = new Date().getTimezoneOffset()%60;
		if (heuredh == 0){var dh = 'UTC'}
		else if (heuredh == -1){var dh = 'UTC +01:00 (heure d\'hiver)'}
		else if (heuredh == -2){var dh = 'UTC +02:00 (heure d\'été)'}
		else {
			var signe = '';
			if (heuredh>0){signe = '-'}
			else {signe = '+'}
			if (heuredh<0){heuredh=-heuredh}
			if (heuredh<10 && heuredh>-10 ){heuredh = '0'+heuredh}
			if (minutedh==0){minutedh = '00'}
			else if (minutedh<0){minutedh=-minutedh}
			var dh = 'UTC '+signe+heuredh+':'+minutedh;
			
		}
		this.getViewModel().set('heurelocal', dh);
    },
    
    afterRender: function () {
    	var me = this;
    	
 		 const { ipcRenderer } = require('electron');
	     var fichier = ipcRenderer.sendSync('get-file');
	     if( fichier != null ){
		 var extension = fichier.split('.').reverse();
	     }
	     else {var extension = '';}
 		 if (extension[0]=='gsk'){
 		 	Ext.getCmp('main').setActiveTab(0);
 		 	Ext.getCmp('graph2').getController('graphcontrole').ouvrirgraphique(fichier);
 		 }
 		 else if (extension[0]=='ssk'){
 		 	Ext.getCmp('main').setActiveTab(0);
 		 	Ext.getCmp('graph2').getController('graphcontrole').ouvrefichierserie(fichier);
 		 }
		 
 		else{ 
    	me.spash = Ext.create('Ext.window.Window', {    	
			    height: 650,
			    width: 975,
			    header: false,
		        border: false,        
		        draggable: false,
			    resizable : false,
			    closable : false,
			    modal : true,
			    bodyStyle: 'background:url("pontet.jpg") no-repeat;',
			    //layout: 'fit',
			    items:[
							
								
							{ 
								bind: {
								html : '<br><h1 align="center" style="font-size: 50px;">SensusKarst</h1><p align="center" style="font-size: 22px;">Version {version}</p>' +
										'<br><p align="center">• Gestion et Communication avec les sondes de pression Sensus Ultra</p>' +
										'<p align="center">• Graphique et traitement de séries de mesures temporelles </p>'
								}
								,height:310
								,bodyStyle : 'align: center;color:white;font-size: 18px;font-weight: bold;background-color:transparent;'
								
							},	
							{
							    layout: {
								        type: 'hbox',
								        pack: 'center',
								        align: 'center'
								    },
								 bodyStyle : 'align: center; background-color:transparent;',   
							    items: [
						                             {
												   		xtype: 'button',
												   		icon : 'icon/icon-chart32.png',
												   		width : 100,
												   		margin :'10 70',
												   		flex : 1,
												   		iconAlign: 'top',
													    text:'Graphique',
													   	scale :'large',
													   	 handler: function(){Ext.getCmp('main').setActiveTab(0);me.spash.close();} 
												   	},
												   	{
												   		xtype: 'button',
													   	  text:'Gestion des sondes Sensus Ultra',
													   	  width : 100,
													   	  margin :'10 70',
													   	  scale :'large',
													   	  flex : 1,
													   	 iconAlign: 'top',
													   	 icon : 'icon/sensus32.png',
													   	  handler: function(){Ext.getCmp('main').setActiveTab(1);me.spash.close();} 
												   	},
										]
							},
							{
												   		xtype: 'button',
													   	  text:'Paramètres de SensusKarst',
													   	  margin :'20 380',
													   	  scale :'medium',
													   	  flex : 1,
													   	 iconAlign: 'top',
													   	 icon : 'icon/processus16.png',
													   	  handler: function(){Ext.getCmp('main').setActiveTab(2);me.spash.close();} 
							},
							{ 
								html : '<br><p align="center"><br>Licence : GPL v3<br>Auteur : Eric Georges<br>http://gipek.fr </p>'
								,bodyStyle : 'color:black;font-size: 14px;font-weight: bold;background-color:transparent;'
								
							},	
						
					   ]
			    
			    
			}).show();
			
 		  }
    }

});
