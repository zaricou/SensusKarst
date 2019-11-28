Ext.define('SensusKarst.view.main.aidefonctionwin', {
    extend: 'Ext.window.Window',
    xtype: 'aidefonctionwin',
    
    title: 'Opérateur et Fonction (javascript) ',
    //modal: true,
    resizable : false,
    layout: 'fit',
    alwaysOnTop : true,
    bodyPadding: 10,
    closeAction : 'hide',
    html : '<table style="height: 309px; width: 780px;" border="0"><tbody><tr><td >+</td><td >addition</td><td >&nbsp; &nbsp; &nbsp; &nbsp;</td><td >-</td><td >soustraction</td></tr><tr><td >*</td><td >multiplication</td><td >&nbsp;</td><td >/</td><td >division</td></tr><tr><td >a**b</td><td >a puissance b</td><td >&nbsp;</td><td ><span>%</span></td><td >reste de division</td></tr><tr><td >Math.sqrt(x)</td><td >racine carr&eacute;e de x&nbsp;</td><td >&nbsp;</td><td ><table border="0"><tbody><tr><td >Math.pow(x,y)</td></tr></tbody></table></td><td >x puissance y&nbsp;</td></tr><tr><td >Math.log(x)&nbsp;</td><td ><span>logarithme naturel de x</span></td><td >&nbsp;</td><td >Math.log10()&nbsp;</td><td ><span>logarithme base 10 de x</span>&nbsp;</td></tr><tr><td >Math.exp(x)&nbsp;</td><td >exponentielle de x&nbsp;</td><td >&nbsp;</td><td ><p>Math.cos(x)&nbsp;&nbsp;</p></td><td ><span>cosinus de x (radian)</span>&nbsp;</td></tr><tr><td >Math.sin(x)&nbsp;</td><td >sinus de x (radian)&nbsp;</td><td >&nbsp;</td><td >Math.tan(x)<span>&nbsp;</span>&nbsp;</td><td ><span>tangente de x (radian)</span><span>&nbsp;</span>&nbsp;</td></tr><tr><td >Math.acos(x)&nbsp;</td><td ><span>arc cosinus de x (radian)&nbsp;</span>&nbsp;</td><td >&nbsp;</td><td >Math.sin(x)&nbsp;</td><td ><span>arc sinus de x (radian)&nbsp;</span>&nbsp;</td></tr><tr><td >Math.atan(x)&nbsp;</td><td ><span>arc tangente de x (radian)&nbsp;</span>&nbsp;</td><td >&nbsp;</td><td >Math.abs(x)&nbsp;</td><td >Valeur absolue de x&nbsp;</td></tr></tbody></table>'

});