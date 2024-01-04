// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";

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
