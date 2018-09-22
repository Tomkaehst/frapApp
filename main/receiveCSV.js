// This file receives renderers IPC "getCSVviaOpen"
// The OpenDialog is called and the CSV files containing the FRAP data curves are loaded

const ipc = require('electron').ipcMain
const dialog = require('electron').dialog
const fs = require("fs")
const path = require("path")
const csv = require("fast-csv")

ipc.on('getCSVviaOpen', (event) => {
      console.log("Message received from 'getCSVviaOpen'")

      dialog.showOpenDialog({
            title: "Select your FRAP curves...",
            defaultPath: '/Users/<username>/Documents/',
            buttonLabel: "Choose this directory...",
            properties: ['openDirectory']
      }, function (directory) {
            if (directory) {
                  console.log("Directory selected: " + directory);
                  console.log("Now calling locateCSVFiles()...");

                  // Send the "working directory" to the index.html via the renderer process
                  event.sender.send("displayWorkingDirectory", directory)

                  // Calling locateCSVFiles() to detect CSVs; this also calls getGroups, which scans the directory for grouping folder for ordered experiment, e.g. treated vs. untreated
                  //var fileList = locateCSVFiles(directory);
                  //console.log("locateCSVFiles returned the files: " + fileList);


            }
      })
})


// This function identifies CSV files in the directory and subdirectory from the users selection from the cick event on the csvSelectBtn
function locateCSVFiles(directory) {
      console.log("locateCSVFiles() received: " + directory)

      // fs.readdirSync returns an array containing all files and directories in alphabetic order
      var filesInDirectory = fs.readdirSync(String(directory));
      readCSVFile(directory, filesInDirectory);


      return (filesInDirectory)
}

function readCSVFile(directory, filesList) {
      // Currently, only tau10.csv is selected; I need to figure out a routine how to isolate csv files and sequentially read them; probably conversion to a JSON would be useful at this point
      var filepath = path.join(String(directory), filesList[3])
      console.log("readCSVFile received: " + filepath)

      var stream = fs.createReadStream(filepath);

      var csvStream = csv()
            .on("data", function (data) {
                  //console.log(data)
            })
            .on("end", function () {
                  console.log("done")
            });

      stream.pipe(csvStream);

}

//function getGroups(path) {}