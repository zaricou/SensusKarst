Ext.define('SensusKarst.view.main.ListebrutControl', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.listebrutcontrol',
    
    init: function (view) {
        this.groupingFeature = view.view.findFeature('grouping');
    },

    onClearGroupingClick: function (btn) {
        this.groupingFeature.disable();
        btn.disable();
        this.lookup('grouper').enable();
    },
    
    onGroupingClick: function (btn) {
        this.groupingFeature.enable();
        this.groupingFeature.collapseAll();
        btn.disable();
        this.lookup('degrouper').enable();
    },

    onCollapseAll: function () {
        this.groupingFeature.collapseAll();
    },

    onExpandAll: function () {
        this.groupingFeature.expandAll();
    },

    onfiltre: function (sender,value) {
    	if (sender.text == 'Afficher tous Nbre mesures'){
    		sender.setText('Afficher Nbre mesures > 2');
    		this.view.columns[4].filter.deactivate();
    	}
    	else{
    		sender.setText('Afficher tous Nbre mesures');
    		this.view.columns[4].filter.setValue({ gt : 2});}
        
    },
    
    onquit: function (a,b) {
    	console.log(a)
    	console.log(b)
    	console.log(this)
        this.view.close();
    },
    
});