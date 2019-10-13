

Ext.define('SensusKarst.model.listmarche', {
    extend: 'Ext.data.Model',
    
    fields: [
        {name: 'info', type: 'string'},
        {name: 'titre', type: 'string'},
        {name: 'serie', type: 'string'},
        {name: 'serie1', type: 'string',
            calculate: function (data) {
            	var retour = "U"+data.serie;
            	return retour
            } 
        },
        {name: 'datedeb',type: 'date',dateFormat : 'd/m/Y H:i:s'},
        {name: 'datefin',type: 'string'},
        {name: 'prof', type: 'string'},
        {name: 'prof1', type: 'string'},
        {name: 'inter', type: 'int'},
 		{name: 'intervalle', type: 'string',
            calculate: function (data) {
            	var interval = data.inter;
            	var retour = interval+" s";
            	if (interval>=3600){retour = interval/3600+ " h";}
            	else if (interval>=60){retour = interval/60+ " mn";}
            	return retour
            } 
        },
    ]
});



Ext.define('SensusKarst.store.listmarche', {
    extend: 'Ext.data.Store',

    alias: 'store.listmarche',
    model: 'SensusKarst.model.listmarche',
    
    sorters: ['datedeb','serie'],
    		 

    proxy: {
        type: 'memory',
        reader: {
            type: 'json',
        }
    },


});