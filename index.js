#!/usr/bin/env node

require('colors');
const fs = require('fs');
const path = require('path');
const inquirer = require('inquirer');
const ejs = require('ejs');
const mkdirp = require('mkdirp');
const shelljs = require('shelljs');

//欢迎语
console.log("\n" + "Hello World, I'm flash-cli".magenta + "\n");
console.log("It's just a test".red + "\n");

//常量
const ENCODE = 'utf-8';
const BUILD_PATH = './build';
const BUILD_FILE_TYPE = '.html';

//用户交互问题列表
const question = [
	{
		type: 'input',
		name: 'name',
		message: '请输入你的姓名'
	},
	{
	    type: 'list',
	    name: 'sex',
	    message: '你的性别',
	    choices: [{

	        name: '男',
	        value: 'male'

	    }, {

	        name: '女',
	        value: 'female'

        }, {

	        name: '其他',
	        value: 'other'

	    }]
	},
	{
		type: 'checkbox',
		name: 'labels',
		message: '给自己贴几个标签吧',
		choices: [{
			name: 'html5',
			value: 'html5'
		},{
			name: 'css3',
			value: 'css3'
		},{
			name: 'nodejs',
			value: 'nodejs'
		},{
			name: '前端开发',
			value: 'fe前端开发'
		},{
			name: '移动端开发',
			value: 'mobile移动端开发'
		}]
	},
	{
		type: 'input',
		name: 'fileName',
		default: 'index',
		message: '请输入你要生成文件的名字'
	}
];

//交互
inquirer.prompt(question).then(answer => {

	const fileName = `${answer.fileName}${BUILD_FILE_TYPE}`;
	
	createFile(answer, fileName);

	openFile(`${BUILD_PATH}/${fileName}`);

});

//创建文件
let createFile = (data, fileName) => {

	let tpl = fs.readFileSync(__dirname + '/tpl.html', ENCODE);

	mkdirp.sync(BUILD_PATH);

	fs.writeFileSync(`${BUILD_PATH}/${fileName}`, ejs.render(tpl, data), ENCODE);

};


//打开所创建的文件
let openFile = buildFilePath => {

	//mac 
	if(process.platform == 'darwin'){
		shelljs.exec(`open ${buildFilePath}`);
	} else if(process.platform == 'win32') { //windows
		shelljs.exec(`start ${buildFilePath}`);
	} else {
		console.log('This platform is ' + process.platform);
	}

	endTip(buildFilePath);
};

//结束语
const endTip = buildFilePath => {
	console.log("\n" + "build file: " + (path.resolve(buildFilePath)).magenta + "\n");
};



