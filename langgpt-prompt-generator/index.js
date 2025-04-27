#!/usr/bin/env node

const { Command } = require('commander');
const inquirer = require('inquirer');
const chalk = require('chalk');
const fs = require('fs-extra');
const path = require('path');
const promptGenerator = require('./src/promptGenerator');
const server = require('./src/server');

const program = new Command();

program
  .version('1.0.0')
  .description('基于LangGPT框架的结构化编程提示词生成工具');

program
  .command('generate')
  .description('根据用户输入生成结构化提示词')
  .action(async () => {
    try {
      const answers = await inquirer.prompt([
        {
          type: 'list',
          name: 'promptType',
          message: '您想生成什么类型的编程提示词？',
          choices: ['代码生成器', '代码解释器', '代码审查员', 'Bug修复', '重构助手', '自定义']
        },
        {
          type: 'input',
          name: 'language',
          message: '编程语言是？',
          default: 'JavaScript'
        },
        {
          type: 'input',
          name: 'description',
          message: '描述您想要完成的任务：'
        },
        {
          type: 'confirm',
          name: 'addConstraints',
          message: '是否要添加特定约束条件？',
          default: false
        },
        {
          type: 'input',
          name: 'constraints',
          message: '输入约束条件（用逗号分隔）：',
          when: (answers) => answers.addConstraints
        },
        {
          type: 'confirm',
          name: 'savePrompt',
          message: '是否将此提示词保存到文件？',
          default: false
        },
        {
          type: 'input',
          name: 'filename',
          message: '输入文件名：',
          default: 'generated-prompt.txt',
          when: (answers) => answers.savePrompt
        }
      ]);

      const prompt = promptGenerator.generate(answers);
      console.log(chalk.green('\n生成的提示词：'));
      console.log(chalk.yellow(prompt));

      if (answers.savePrompt) {
        fs.writeFileSync(answers.filename, prompt);
        console.log(chalk.green(`\n提示词已保存到 ${answers.filename}`));
      }
    } catch (error) {
      console.error(chalk.red('生成提示词时出错：'), error);
    }
  });

program
  .command('serve')
  .description('启动提示词生成器服务器')
  .option('-p, --port <port>', '服务器运行的端口', '3000')
  .action((options) => {
    server.start(options.port);
  });

program.parse(process.argv);

// If no arguments provided, show help
if (!process.argv.slice(2).length) {
  program.outputHelp();
} 