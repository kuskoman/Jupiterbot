import { Message } from "discord.js";

export class CommandHandler {
  protected commands: Command[] = [];
  protected aliasesMap = new Map<string, Command[]>();

  public registerCommand(command: Command) {
    this.checkIfAlreadyExists(command);
    this.commands.push(command);

    command.aliases.forEach((alias) => {
      const existingCommands = this.aliasesMap.get(alias);
      if (existingCommands) {
        existingCommands.push(command);
      }
    });
  }

  private checkIfAlreadyExists(command: Command) {
    const alreadyExists = this.commands.some(
      (existingCommand) => command === existingCommand
    );

    if (alreadyExists) {
      throw new Error("Command was already loaded");
    }
  }
}

export interface Command {
  aliases: string[];
  execute: (input: CommandExecuteParams) => unknown;
}

export interface CommandExecuteParams {
  msg: Message;
  command: string;
  args: string;
}
