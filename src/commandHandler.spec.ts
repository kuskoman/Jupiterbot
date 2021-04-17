import { Command, CommandHandler } from "./commandHandler";

describe("commandHandler", () => {
  it("should throw an error when a command is added more than once", () => {
    const commandHandler = new CommandHandler();

    commandHandler.registerCommand(exampleCommand);

    expect(() => commandHandler.registerCommand(exampleCommand)).toThrow(
      "Command was already loaded"
    );
  });
});

const exampleCommand: Command = {
  execute: () => {},
  aliases: ["testalias"],
};
