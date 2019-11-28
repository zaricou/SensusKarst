/**
 * The main application class. An instance of this class is created by app.js when it
 * calls Ext.application(). This is the ideal place to handle application launch and
 * initialization details.
 */

//sencha app build -des electron/app
//sencha -sdk /path/to/ExtSDK generate app -classic StarterApp ./starterapp
//sencha app watch
//electron / npm start


Ext.define('SensusKarst.Application', {
    extend: 'Ext.app.Application',

    name: 'SensusKarst',

    quickTips: false,
    platformConfig: {
        desktop: {
            quickTips: true
        }
    },

    stores: [
        // TODO: add global / shared stores here
    ],

    launch: function () {
    	 Ext.util.Format.decimalSeparator = '.';
    },

    onAppUpdate: function () {
        Ext.Msg.confirm('Application Update', 'This application has an update, reload?',
            function (choice) {
                if (choice === 'yes') {
                    window.location.reload();
                }
            }
        );
    }
});
