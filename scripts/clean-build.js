import { execSync } from 'child_process';
import { existsSync, rmSync } from 'fs';
import path from 'path';

const dirsToClean = [
  'dist',
  'node_modules/.vite',
  'node_modules/.cache'
];

const filesToClean = [
  'vite.config.d.ts',
  'tailwind.config.d.ts',
  'postcss.config.d.ts'
];

console.log('🧹 Cleaning build artifacts...');

// Clean directories
dirsToClean.forEach(dir => {
  if (existsSync(dir)) {
    console.log(`Removing ${dir}...`);
    rmSync(dir, { recursive: true, force: true });
  }
});

// Clean .d.ts files
filesToClean.forEach(file => {
  if (existsSync(file)) {
    console.log(`Removing ${file}...`);
    rmSync(file, { force: true });
  }
});

console.log('✅ Cleanup completed!');

try {
  console.log('🔧 Running type check...');
  execSync('npx tsc -b --noEmit', { stdio: 'inherit' });
  
  console.log('🏗️ Building project...');
  execSync('npx vite build', { stdio: 'inherit' });
  
  console.log('✅ Build completed successfully!');
} catch (error) {
  console.error('❌ Build failed:', error.message);
  process.exit(1);
}
