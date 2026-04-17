const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

// The request is to change the color combination of the UI and dashboard
// Let's swap the primary Green theme with a Deep Teal and Earthy Orange/Amber theme

// Replace global background wrapper
code = code.replace(/bg-\[#E8F3E8\]/g, 'bg-stone-200');

// Replace general green utility classes with teal (we execute safely in order of specificity)
code = code.replace(/border-green-100/g, 'border-teal-100');
code = code.replace(/border-green-200/g, 'border-teal-200');
code = code.replace(/border-green-300/g, 'border-teal-300');
code = code.replace(/border-green-400/g, 'border-teal-400');
code = code.replace(/border-green-500/g, 'border-teal-500');
code = code.replace(/border-green-800/g, 'border-teal-800');
code = code.replace(/border-green-/g, 'border-teal-');

code = code.replace(/bg-green-50/g, 'bg-teal-50');
code = code.replace(/bg-green-100/g, 'bg-teal-100');
code = code.replace(/bg-green-200/g, 'bg-teal-200');
code = code.replace(/bg-green-300/g, 'bg-teal-300');
code = code.replace(/bg-green-400/g, 'bg-teal-400');
code = code.replace(/bg-green-500/g, 'bg-teal-500');
code = code.replace(/bg-green-600/g, 'bg-teal-600');
code = code.replace(/bg-green-700/g, 'bg-teal-700');
code = code.replace(/bg-green-800/g, 'bg-teal-800');
code = code.replace(/bg-green-900/g, 'bg-teal-900');

code = code.replace(/text-green-50/g, 'text-teal-50');
code = code.replace(/text-green-100/g, 'text-teal-100');
code = code.replace(/text-green-200/g, 'text-teal-200');
code = code.replace(/text-green-300/g, 'text-teal-300');
code = code.replace(/text-green-400/g, 'text-teal-400');
code = code.replace(/text-green-500/g, 'text-teal-500');
code = code.replace(/text-green-600/g, 'text-teal-600');
code = code.replace(/text-green-700/g, 'text-teal-700');
code = code.replace(/text-green-800/g, 'text-teal-800');
code = code.replace(/text-green-900/g, 'text-teal-900');

fs.writeFileSync('src/App.tsx', code);
console.log("Colors swapped to Teal.");
