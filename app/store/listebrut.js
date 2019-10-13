

Ext.define('SensusKarst.model.listbrut', {
    extend: 'Ext.data.Model',
    
    fields: [
        {name: 'nomfichier', type: 'string'},
        {name: 'info', type: 'string'},
        {name: 'serie', type: 'string',
            calculate: function (data) {
            	var extract = data.nomfichier.split('-');
            	return 'U'+extract[0];
            } 
        },
        {name: 'datedeb', type: 'date',dateFormat : 'U',
            calculate: function (data) {
            	var extract = data.nomfichier.split('-');
            	
            	return Ext.Date.parse(extract[1], 'U');
            } 
        },
        {name: 'datefin', type: 'date',dateFormat : 'U',
            calculate: function (data) {
            	var extract = data.nomfichier.split('-');
            	var retour = Number(extract[1])+((Number(extract[2])-1)*Number(extract[3]));
            	return Ext.Date.parse(retour, 'U');
            } 
        },
        {name: 'nbremesure', type: 'int',
            calculate: function (data) {
            	var extract = data.nomfichier.split('-');
            	return extract[2];
            } 
        },
        {name: 'intervalle', type: 'string',
            calculate: function (data) {
            	var extract = data.nomfichier.split('-');
            	var interval = Number(extract[3]);
            	var retour = interval+" s";
            	if (interval>=3600){retour = (Math.round(interval*10/3600))/10+ " h";}
            	else if (interval>=60){retour = (Math.round(interval*10/60))/10+ " mn";}
            	return retour
            } 
        },
 
    ]
});



Ext.define('SensusKarst.store.listbrut', {
    extend: 'Ext.data.Store',

    alias: 'store.listbrut',
    model: 'SensusKarst.model.listbrut',
    
    groupField: 'serie',
    sorters: [{
				    property : 'datedeb',
				    direction: 'DESC'
				}, {
				    property : 'serie',
				    direction: 'ASC'
			 }],
    		 

    proxy: {
        type: 'memory',
        reader: {
            type: 'json',
        }
    },


});