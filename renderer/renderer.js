// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

const ipc = require('electron').ipcRenderer


// Register user click on csvSelectBtn and send event to receiveCSV.js, which opens the system dialog and scans for CSV files and folders.
const csvBtn = document.getElementById("csvSelectBtn")

csvBtn.addEventListener("click", (event) => {
      ipc.send("getCSVviaOpen")
      console.log("Request for Open Dialog location of the CSV files!")
})


// Receive displayDirectory from receiveCSV.js containing the working directory file path selected by the user, where the CSV files are located; Here we write that path to the <span> with id dataDirectoryDisplay
ipc.on("displayWorkingDirectory", (path) => {
      let workingDirectoryDisplay = document.getElementById("workingDirectoryDisplay")
      workingDirectoryDisplay.innerHTML = "<b>Current working directory:</b> '" + path + "'"
      console.log("displayWorkingDirectory IPC received path " + path)
})


// Receive the CSV data from receiveCSV's channel csvData
ipc.on("csvData", function (data) {
      console.log("Renderer received csv data from receiveCSV's readCSVFile()")
      console.log(data)
})