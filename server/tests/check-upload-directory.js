// Test script to verify upload directory exists and is writable
const fs = require('fs');
const path = require('path');

console.log('=== Upload Directory Test ===\n');

// Path to public directory (from server/tests to project root)
const publicDir = path.join(__dirname, '../../public');

console.log(`Checking directory: ${publicDir}\n`);

// Test 1: Check if directory exists
if (fs.existsSync(publicDir)) {
    console.log('✅ Public directory exists');
} else {
    console.log('❌ Public directory does NOT exist');
    console.log('Creating directory...');
    try {
        fs.mkdirSync(publicDir, { recursive: true });
        console.log('✅ Directory created successfully');
    } catch (error) {
        console.log('❌ Failed to create directory:', error.message);
        process.exit(1);
    }
}

// Test 2: Check if directory is writable
const testFile = path.join(publicDir, 'test-upload-' + Date.now() + '.txt');
try {
    fs.writeFileSync(testFile, 'Test upload file');
    console.log('✅ Directory is writable');

    // Clean up test file
    fs.unlinkSync(testFile);
    console.log('✅ Test file cleaned up successfully');
} catch (error) {
    console.log('❌ Directory is NOT writable:', error.message);
    process.exit(1);
}

// Test 3: List some existing files
const files = fs.readdirSync(publicDir);
console.log(`\n✅ Found ${files.length} files in public directory`);
console.log('Sample files (first 10):');
files.slice(0, 10).forEach(file => {
    console.log(`  - ${file}`);
});

console.log('\n=== All tests passed! ===');
console.log('The upload directory is ready for file uploads.\n');
