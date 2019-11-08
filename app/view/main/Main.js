
Ext.define('SensusKarst.view.main.Main', {
    extend: 'Ext.tab.Panel',
    xtype: 'app-main',
	id : 'main',
    requires: [
        'Ext.plugin.Viewport',
        'Ext.window.MessageBox',
    ],

    controller: 'main',
    viewModel: 'main',

    ui: 'navigation',

    tabBarHeaderPosition: 1,
    titleRotation: 0,
    tabRotation: 0,

    header: {
        layout: {
            align: 'stretchmax'
        },
        title: {
            bind: {
                text: '{name}'
            },
            flex: 0
        },
    },

    tabBar: {
        flex: 1,
        layout: {
            align: 'stretch',
            overflowHandler: 'none'
        }
    },
    
    headerPosition: 'top',
    
    activeTab :0,

    defaults: {
        tabConfig: {
        	
        	 iconAlign: 'top',
             textAlign: 'center',
             width: 200,

        }
    },

    items: [
    	
    	 {
    	   title: 'Graphique',
    	   bodyStyle: {
			    	background: 'black',
				},
    	   icon : 'icon/icon-chart32.png',
    	   items: [{
    	       xtype: 'graph2'
    	      }]
    	}, 
    	{
        title: 'Communication<br>Sensus Ultra',
        bodyStyle: {
			    	background: 'black',
				},
        icon : 'icon/sensus32.png',
        items: [{
            xtype: 'mainlist',
    
        }]
    }, 
   
    {
        title: 'Paramètres',
        bodyStyle: {
			    	background: 'black',
				},
        icon : 'icon/processus32.png',
        items: [{
            xtype: 'parametre',
    
        }]

    }
]
});
