// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
import {
  getStatelessWidget,
  getConsumerWidget,
  getRiverpodModel,
} from "./template";

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log('Congratulations, your extension "flutterext" is now active!');

  // rigester a new context menu call "templates"
  vscode.commands.registerCommand("flutterext.templates", () => {
    vscode.window.showInformationMessage("Hello World from flutterext!");
  });

  vscode.commands.registerCommand("extension.createView", async (folder) => {
    const viewName = await vscode.window.showInputBox({
      prompt: "View Name",
    });

    const optionalFilesToCreate = [
      "_view",
      "_provider",
      "_widgets",
      "_toolbar",
      "_data",
    ];
    const optionalFiles = await vscode.window.showQuickPick(
      optionalFilesToCreate,
      {
        canPickMany: true,
        placeHolder: "Pick your fruits",
      }
    );

    if (optionalFiles) {
      vscode.window.showInformationMessage(
        `also creating: ${optionalFiles.join(", ")}`
      );
    }

    if (viewName) {
      vscode.window.showInformationMessage(`creating view: ${viewName}`);
      // Use the user input for your logic here

      // get the current folder path
      const folderPath = folder.fsPath;
      console.log(`folderPath: ${folderPath}`);

      // create a new folder with viewName inside the current folder
      const newFolderPath = `${folderPath}/${viewName}`;
      console.log(`newFolderPath: ${newFolderPath}`);
      vscode.workspace.fs.createDirectory(vscode.Uri.parse(newFolderPath));

      var optionalFilesExport = "";

      // create folders for selected optionalFiles
      if (optionalFiles) {
        optionalFiles.forEach((element) => {
          const newFolderPath = `${folderPath}/${viewName}/${element}.dart`;
          console.log(`newFolderPath: ${newFolderPath}`);

          vscode.workspace.fs.writeFile(
            vscode.Uri.parse(newFolderPath),
            new Uint8Array()
          );

          // updating optionalFilesExport with the new folder path
          optionalFilesExport += `export '${element}.dart';\n`;
        });
      }

      var imports = "";

      // check if _provider & _view is selected
      if (
        optionalFiles?.includes("_provider") &&
        optionalFiles?.includes("_view")
      ) {
        const viewFile = `${folderPath}/${viewName}/_view.dart`;

        // imports for consumer widget
        imports +=
          "import 'package:flutter_riverpod/flutter_riverpod.dart';\nimport 'package:flutter/material.dart';";

        // if provider is selected then getting consumer wiget via the template
        vscode.workspace.fs.writeFile(
          vscode.Uri.parse(viewFile),
          new TextEncoder().encode(getConsumerWidget(viewName))
        );

        const providerFile = `${folderPath}/${viewName}/_provider.dart`;

        // imports for riverpod model
        imports +=
          "import 'package:applogger/applogger.dart';\nimport 'package:riverpod_annotation/riverpod_annotation.dart';";

        // if provider is selected then getting riverpod model via the template
        vscode.workspace.fs.writeFile(
          vscode.Uri.parse(providerFile),
          new TextEncoder().encode(getRiverpodModel(viewName))
        );
      } else if (optionalFiles?.includes("_view")) {
        const viewFile = `${folderPath}/${viewName}/_view.dart`;

        // imports for stateless widget
        imports += "import 'package:flutter/material.dart';";

        // if only _view is selected then getting stateless wiget via the template
        vscode.workspace.fs.writeFile(
          vscode.Uri.parse(viewFile),
          new TextEncoder().encode(getStatelessWidget(viewName))
        );
      }

      try {
        // create a new file with viewName.dart inside the new folder
        const newFilePath = `${newFolderPath}/${viewName}.dart`;
        console.log(`newFilePath: ${newFilePath}`);
        vscode.workspace.fs.writeFile(
          vscode.Uri.parse(newFilePath),
          new TextEncoder().encode(imports + "\n\n" + optionalFilesExport)
        );
      } catch (error) {
        console.log(error);
      }
    } else {
      console.warn("viewName is empty");
    }
  });

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The commandId parameter must match the command field in package.json
  let disposable = vscode.commands.registerCommand(
    "flutterext.helloWorld",
    () => {
      // The code you place here will be executed every time your command is executed
      // Display a message box to the user
      vscode.window.showInformationMessage("Hello World from flutterext!");
    }
  );

  context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}
