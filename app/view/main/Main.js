
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
       // iconCls: 'fa-th-list'
    },

    tabBar: {
        flex: 1,
        layout: {
            align: 'stretch',
            overflowHandler: 'none'
        }
    },
    
    headerPosition: 'top',


//    responsiveConfig: {
//        tall: {
//            headerPosition: 'top'
//        },
//        wide: {
//            headerPosition: 'left'
//        }
//    },

    defaults: {
        bodyPadding: 10,
        tabConfig: {
        	
        	 iconAlign: 'top',
             textAlign: 'center',
             width: 200,

        }
    },

    items: [
    	
    	 {
    	   title: 'Graphique',
    	   icon : 'icon/icon-chart32.png',
    	   items: [{
    	       xtype: 'graph2'
    	      }]
    	}, 
    	{
        title: 'Communication<br>Sensus Ultra',
        //iconCls: 'x-fa fa-forumbee',
        icon : 'icon/sensus32.png',
        items: [{
            xtype: 'mainlist',
    
        }]
    }, 
   
    {
        title: 'Paramètres',
        icon : 'icon/processus32.png',
        items: [{
            xtype: 'parametre',
    
        }]

    }
]
});
