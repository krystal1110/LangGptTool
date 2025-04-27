const fetch = require('node-fetch');

// Example of using the LangGPT Prompt Generator API
async function generatePrompt() {
  try {
    const response = await fetch('http://localhost:3000/generate-prompt', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        promptType: 'Code Generator',
        language: 'JavaScript',
        description: 'Create a utility function that can deeply merge two objects, handling arrays and nested objects properly.',
        constraints: 'Must handle circular references, Should preserve the original objects, Support for ES6 features'
      })
    });

    const data = await response.json();
    console.log('Generated Prompt:');
    console.log(data.prompt);
  } catch (error) {
    console.error('Error generating prompt:', error);
  }
}

// Example of generating prompts for different tasks
async function generateMultiplePrompts() {
  const tasks = [
    {
      promptType: 'Bug Fixer',
      language: 'JavaScript',
      description: 'Fix this function that sometimes produces NaN when adding decimal numbers: function add(a, b) { return a + b; }',
      constraints: 'Use native JavaScript, no external libraries'
    },
    {
      promptType: 'Code Reviewer',
      language: 'Python',
      description: 'Review this function that reads a large file line by line: \n\ndef process_large_file(file_path):\n    with open(file_path, "r") as file:\n        lines = file.readlines()\n        for line in lines:\n            process_line(line)\n',
      constraints: 'Focus on performance issues, Consider memory usage'
    }
  ];

  for (const task of tasks) {
    try {
      const response = await fetch('http://localhost:3000/generate-prompt', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(task)
      });

      const data = await response.json();
      console.log(`\n\n--- Generated ${task.promptType} Prompt for ${task.language} ---\n`);
      console.log(data.prompt);
    } catch (error) {
      console.error(`Error generating ${task.promptType} prompt:`, error);
    }
  }
}

// Run examples
// First start the server with: langgpt-prompt-generator serve
// Then run this file: node example.js
generatePrompt()
  .then(() => generateMultiplePrompts())
  .catch(console.error); 