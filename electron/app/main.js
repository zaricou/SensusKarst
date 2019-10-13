const {app, BrowserWindow} = require('electron');


if (handleSquirrelEvent(app)) {
    // squirrel event handled and app will exit in 1000ms, so don't do anything else
    return;
}



function createWindow () {
			const electron = require('electron');
			const squirrelUrl = "http://sensuskarst.spiteurs-fous.fr/update/";
			
			const startAutoUpdater = (squirrelUrl) => {
			  // The Squirrel application will watch the provided URL
			  electron.autoUpdater.setFeedURL(`${squirrelUrl}/win64/`);
			
			  // Display a success message on successful update
			  electron.autoUpdater.addListener("update-downloaded", (event, releaseNotes, releaseName) => {
			    electron.dialog.showMessageBox({"message": `Une nouvelle version de SensusKarst a été télécharger (v${releaseName}). Mise à jour lors du prochain démarrage`});
			  });
			
			  // Display an error message on update error
			  electron.autoUpdater.addListener("error", (error) => {
			   // electron.dialog.showMessageBox({"message": "Erreur de Mise à jour : " + error});
			  });
			
			  // tell squirrel to check for updates
			  electron.autoUpdater.checkForUpdates();
			}
				
			if (process.env.NODE_ENV != "dev") startAutoUpdater(squirrelUrl)
			
			
			  // Create the browser window.
			  mainWindow = new BrowserWindow({
				  width: 800,
				  height: 600, 
				  show: false,
				 // frame: false,
			      webPreferences: {
			          nodeIntegration: true,
			          allowEval: false,
			      }
			  });
			 
			  mainWindow.maximize()
			
			  // and load the index.html of the app.
			  mainWindow.loadURL(`file://${__dirname}/index.html`)
			  mainWindow.once('ready-to-show', () => {
			  mainWindow.show()
			  
			})
			  // Open the DevTools.
			  // mainWindow.webContents.openDevTools()
			
			  // Emitted when the window is closed.
			  mainWindow.on('closed', function () {
			    // Dereference the window object, usually you would store windows
			    // in an array if your app supports multi windows, this is the time
			    // when you should delete the corresponding element.
			    mainWindow = null
			  })
}


app.on('ready', createWindow);

process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true';
// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  
  if (mainWindow === null) {
    createWindow();
  }
})

function handleSquirrelEvent(application) {
    if (process.argv.length === 1) {
        return false;
    }

    const ChildProcess = require('child_process');
    const path = require('path');

    const appFolder = path.resolve(process.execPath, '..');
    const rootAtomFolder = path.resolve(appFolder, '..');
    const updateDotExe = path.resolve(path.join(rootAtomFolder, 'Update.exe'));
    const exeName = path.basename(process.execPath);

    const spawn = function(command, args) {
        let spawnedProcess, error;

        try {
            spawnedProcess = ChildProcess.spawn(command, args, {
                detached: true
            });
        } catch (error) {}

        return spawnedProcess;
    };

    const spawnUpdate = function(args) {
        return spawn(updateDotExe, args);
    };

    const squirrelEvent = process.argv[1];
    switch (squirrelEvent) {
        case '--squirrel-install':
        case '--squirrel-updated':
            // Optionally do things such as:
            // - Add your .exe to the PATH
            // - Write to the registry for things like file associations and
            //   explorer context menus

            // Install desktop and start menu shortcuts
            spawnUpdate(['--createShortcut', exeName]);

            setTimeout(application.quit, 1000);
            return true;

        case '--squirrel-uninstall':
            // Undo anything you did in the --squirrel-install and
            // --squirrel-updated handlers

            // Remove desktop and start menu shortcuts
            spawnUpdate(['--removeShortcut', exeName]);

            setTimeout(application.quit, 1000);
            return true;

        case '--squirrel-obsolete':
            // This is called on the outgoing version of your app before
            // we update to the new version - it's the opposite of
            // --squirrel-updated

            application.quit();
            return true;
    }
};
