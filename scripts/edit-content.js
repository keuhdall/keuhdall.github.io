#!/usr/bin/env node

/**
 * Content Editor Script
 * 
 * This script helps you quickly edit content files for the terminal portfolio.
 * Usage: node scripts/edit-content.js [command]
 * 
 * Examples:
 *   node scripts/edit-content.js about
 *   node scripts/edit-content.js contact
 *   node scripts/edit-content.js skills
 */

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const contentDir = path.join(__dirname, '../src/content');
const commands = ['welcome', 'help', 'about', 'skills', 'projects', 'experience', 'contact', 'resume'];

function listAvailableCommands() {
  console.log('\n📁 Available content files:');
  commands.forEach(cmd => {
    const filePath = path.join(contentDir, `${cmd}.txt`);
    if (fs.existsSync(filePath)) {
      const stats = fs.statSync(filePath);
      console.log(`  • ${cmd}.txt (${stats.size} bytes, modified: ${stats.mtime.toLocaleDateString()})`);
    }
  });
}

function showFileContent(command) {
  const filePath = path.join(contentDir, `${command}.txt`);
  if (!fs.existsSync(filePath)) {
    console.log(`❌ File ${command}.txt not found!`);
    return;
  }
  
  const content = fs.readFileSync(filePath, 'utf8');
  console.log(`\n📄 Content of ${command}.txt:`);
  console.log('─'.repeat(50));
  console.log(content);
  console.log('─'.repeat(50));
}

function main() {
  const command = process.argv[2];
  
  if (!command) {
    console.log('🔧 Terminal Portfolio Content Editor');
    console.log('Usage: node scripts/edit-content.js [command]');
    listAvailableCommands();
    console.log('\n💡 Tip: Edit the .txt files directly in src/content/ folder');
    return;
  }
  
  if (!commands.includes(command)) {
    console.log(`❌ Unknown command: ${command}`);
    console.log('Available commands:', commands.join(', '));
    return;
  }
  
  showFileContent(command);
  console.log(`\n✏️  To edit: open src/content/${command}.txt in your editor`);
}

main();
