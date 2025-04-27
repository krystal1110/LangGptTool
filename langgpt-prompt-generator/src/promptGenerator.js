const fs = require('fs-extra');
const path = require('path');

// 英文类型映射到文件名
const typeMapping = {
  // 中文类型
  '代码生成器': 'codeGenerator',
  '代码解释器': 'codeExplainer',
  '代码审查员': 'codeReviewer',
  'Bug修复': 'bugFixer',
  '重构助手': 'refactoringHelper',
  '自定义': 'custom',
  
  // 英文类型 (保留兼容性)
  'Code Generator': 'codeGenerator',
  'Code Explainer': 'codeExplainer',
  'Code Reviewer': 'codeReviewer',
  'Bug Fixer': 'bugFixer',
  'Refactoring Helper': 'refactoringHelper',
  'Custom': 'custom'
};

// Load templates
const templates = {
  '代码生成器': require('../templates/codeGenerator'),
  '代码解释器': require('../templates/codeExplainer'),
  '代码审查员': require('../templates/codeReviewer'),
  'Bug修复': require('../templates/bugFixer'),
  '重构助手': require('../templates/refactoringHelper'),
  '自定义': require('../templates/custom'),
  
  // 英文类型 (保留兼容性)
  'Code Generator': require('../templates/codeGenerator'),
  'Code Explainer': require('../templates/codeExplainer'),
  'Code Reviewer': require('../templates/codeReviewer'),
  'Bug Fixer': require('../templates/bugFixer'),
  'Refactoring Helper': require('../templates/refactoringHelper'),
  'Custom': require('../templates/custom')
};

function generateConstraintsSection(constraints) {
  if (!constraints || constraints.trim() === '') {
    return '';
  }
  
  const constraintsList = constraints.split(',').map(c => c.trim());
  return `
## Constraints
${constraintsList.map(c => `- ${c}`).join('\n')}
`;
}

function generate(options) {
  const { promptType, language, description, constraints } = options;
  const template = templates[promptType];
  
  if (!template) {
    throw new Error(`未找到类型为 ${promptType} 的模板。`);
  }
  
  // Replace all template variables
  let prompt = template.base
    .replace(/\{\{LANGUAGE\}\}/g, language)
    .replace(/\{\{DESCRIPTION\}\}/g, description);
    
  // Handle constraints section
  if (constraints) {
    const constraintsSection = generateConstraintsSection(constraints);
    prompt = prompt.replace(/\{\{CONSTRAINTS\}\}/g, constraintsSection);
  } else {
    prompt = prompt.replace(/\{\{CONSTRAINTS\}\}/g, '');
  }
  
  return prompt;
}

module.exports = {
  generate
}; 