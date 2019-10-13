Ext.define('SensusKarst.store.ouvrefichier', {
    extend: 'Ext.data.Store',

    alias: 'store.ouvrefichier',
    proxy: {
        type: 'memory',
        reader: {
            type: 'json',
        }
    }
});