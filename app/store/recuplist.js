

Ext.define('SensusKarst.model.recuplist', {
    extend: 'Ext.data.Model',
    
    fields: [
    	{name: 'nomfichier', type: 'string'},
        {name: 'titre', type: 'string'},
        {name: 'serie', type: 'string'},
        {name: 'datedeb', type: 'date',dateFormat : 'U'},
        {name: 'datefin', type: 'date',dateFormat : 'U'},
        {name: 'nbremesure', type: 'int'},
        {name: 'interv', type: 'int'},
        {name: 'ecart', type: 'string'},
        {name: 'intervalle', type: 'string',
            calculate: function (data) {
            	var interval = data.interv;
            	var retour = interval+" s";
            	if (interval>=3600){retour = (Math.round(interval*10/3600))/10+ " h";}
            	else if (interval>=60){retour = (Math.round(interval*10/60))/10+ " mn";}
            	return retour
            } 
        },
 
    ]
});



Ext.define('SensusKarst.store.recuplist', {
    extend: 'Ext.data.Store',

    alias: 'store.recuplist',
    model: 'SensusKarst.model.recuplist', 
    
    sorters: [{
				    property : 'datedeb',
				    direction: 'DESC'
				}],

    proxy: {
        type: 'memory',
        reader: {
            type: 'json',
        }
    },


});