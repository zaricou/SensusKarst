/**
 * This class is the controller for the main view for the application. It is specified as
 * the "controller" of the Main view class.
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */
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
		}
   	
    },
    
    afterRender: function () {
    	var me = this;
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
											    text:'Ouvrir un Graphique',
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

});
