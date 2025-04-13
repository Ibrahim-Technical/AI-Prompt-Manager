// 🚀 export.js - Prompt Exporter for AI Prompt Manager 2030

/**
 * Export prompts from localStorage to various formats
 * @param {'json'|'txt'|'csv'} format
 */
function exportPrompts(format = 'json') {
  const prompts = JSON.parse(localStorage.getItem('prompts')) || [];
  if (!prompts.length) {
    alert('❌ No prompts to export.');
    return;
  }

  let content = '';
  let mimeType = '';
  let fileExtension = '';

  switch (format) {
    case 'json':
      content = JSON.stringify(prompts, null, 2);
      mimeType = 'application/json';
      fileExtension = 'json';
      break;

    case 'txt':
      content = prompts.map(p => `Title: ${p.title}\nCategory: ${p.category}\nPrompt:\n${p.prompt}\n---`).join('\n\n');
      mimeType = 'text/plain';
      fileExtension = 'txt';
      break;

    case 'csv':
      content = 'Title,Category,Prompt\n';
      content += prompts.map(p => `"${p.title.replace(/"/g, '""')}","${p.category.replace(/"/g, '""')}","${p.prompt.replace(/"/g, '""')}"`).join('\n');
      mimeType = 'text/csv';
      fileExtension = 'csv';
      break;

    default:
      alert('❌ Unsupported format.');
      return;
  }

  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `ai-prompts-${new Date().toISOString().slice(0,10)}.${fileExtension}`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);

  alert(`✅ Exported as .${fileExtension}`);
}

// 🔗 Example usage:
// exportPrompts('json');
// exportPrompts('txt');
// exportPrompts('csv');
