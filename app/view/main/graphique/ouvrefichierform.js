Ext.define('SensusKarst.view.main.graphique.ouvrefichierform', {
    extend: 'Ext.form.Panel',
    xtype: 'ouvrefichierform',
   // controller : 'ouvrefichiercontrole',
    
   requires:['SensusKarst.store.listeaxe','SensusKarst.store.storelettre','SensusKarst.store.storechiffre'],

    frame: true,
    bodyPadding: 5,
    scrollable:true,
    minWidth : 850,
	layout: 'hbox',
	
    items: [{
        xtype: 'fieldset',
        title: 'Données temporelles',
        defaultType: 'textfield', 
        fieldDefaults: {labelAlign: 'top', width : 140,},
        
        items: [
            {
            	allowBlank:false, fieldLabel: '1ere cellule temporelle',
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
					                typeAhead: true,
            						forceSelection : true,
					                name : 'xtime',
					                allowBlank: false
					            }, {
					                flex : 1,
					                xtype: 'combobox',
					                store : {type : 'storechiffre'},
					                displayField: 'chiffre',
					                typeAhead: true,
            						forceSelection : true,
					                name : 'ytime',
					                allowBlank: false
					            }
		            ]
 
            	}, {
            xtype: 'combobox',
            fieldLabel: 'Format',
            allowBlank:false,
            name: 'format',
            store: {
            	type: 'array',
                fields: [ 'format' ],
                data: [
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
        {
         xtype: 'button',
         text : 'Format complexe',
         margin : '20 30 40 5',
		 handler : 'complexe',
        },
        {
		 xtype: 'textfield',
		 hidden : true,
		 name : 'format5',
		},
		{
		 xtype: 'textfield',
		 hidden : true,
		 name : 'fixextime',
		},
		{
		 xtype: 'textfield',
		 hidden : true,
		 name : 'fixeytime',
		},
		{
		 xtype: 'textfield',
		 hidden : true,
		 name : 'fixeformat',
		},
        ]
    }, {
        xtype: 'fieldset',
        itemId : 'serie1',
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
            emptyText: 'Type axe...'
        }, {
            fieldLabel: 'Titre',
            allowBlank:false,
            name: 'titre'
        },
        {
        xtype: 'textarea',
        hideLabel: true,
        emptyText: 'Commentaires...',
        name: 'commen',
        height:100,
       
    }
        ]
    }
    ],

    buttons: [
    	{
			text : 'Aide format',
			handler : 'aideformat',
		},
		{ xtype: 'tbspacer', width: 50 },
    	{
			text : 'Ajouter série',
			handler : 'addserie',
		},
		{
			text : 'Supprimer série',
			handler : 'suppserie',
		},
		{ xtype: 'tbfill' },
    	{
        text: 'Valider',
        disabled: true,
        formBind: true,
         handler: 'valide'		            
   		 }
    ],

});