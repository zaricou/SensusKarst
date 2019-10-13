Ext.define('SensusKarst.store.listeaxe', {
    extend: 'Ext.data.Store',

    alias: 'store.listeaxe',
    
    fields: ['nomaxe'],
    proxy: {
        type: 'ajax', 
        url: 'config/axe.json',
        reader: {
            type: 'json',
            rootProperty: 'items',
        }
    },
});