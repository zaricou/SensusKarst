Ext.define('SensusKarst.view.main.graphique.aideformatwin', {
    extend: 'Ext.window.Window',
    xtype: 'aideformatwin',
    
    title: 'Aide pour les formats de date et heure',
    //modal: true,
    resizable : false,
    layout: 'fit',
    alwaysOnTop : true,
    bodyPadding: 10,
    closeAction : 'hide',
    html : 'd : Jour du mois avec zéro à gauche (01 à 31)<br>' +
    		'j : Jour du mois sans zéro à gauche (1 à 31)<br>' +
    		'm : Mois avec zéro à gauche (01 à 12)<br>' +
    		'n : Mois sans zéro à gauche (1 à 12)<br>' +
    		'Y : Année sur 4 chiffre (1999 ou 2003)<br>' +
    		'y : Année sur 2 chiffre (99 ou 03)<br>' +
    		'H : Heure avec zéro à gauche (00 à 23)<br>' +
    		'G : Heure sans zéro à gauche (0 à 23)<br>' +
    		'i : Minutes (00 à 59)<br>' +
    		's : Secondes (00 à 59)<br>' +
    		'timestamp : timestamp UNIX (1350024866)<br>' +
    		'date excel : date fichiers Excel (43034)<br>' +
    		'time : temps Javascript en milliseconde (1350024476440)<br><br>' +
    		'qs : un nombre de secondes<br>' +
    		'qm : un nombre de minutes<br>' +
    		'qh : un nombre d\'heures<br>' +
    		'qj : un nombre de jour (Excel) '

});