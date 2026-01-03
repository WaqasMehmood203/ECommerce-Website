const axios = require('axios');

async function testFrontend() {
    console.log('🧪 Testing Frontend Application...\n');
    console.log('═══════════════════════════════════════\n');

    try {
        // Test if frontend is accessible
        console.log('📡 Testing: Frontend Homepage');
        console.log('   URL: http://localhost:3000');

        const response = await axios.get('http://localhost:3000', {
            timeout: 10000,
            headers: {
                'User-Agent': 'Mozilla/5.0'
            }
        });

        console.log(`   ✅ Status: ${response.status}`);
        console.log(`   📄 Content-Type: ${response.headers['content-type']}`);
        console.log(`   📏 Content Length: ${response.data.length} bytes`);

        // Check if it's HTML
        if (response.data.includes('<!DOCTYPE html>') || response.data.includes('<html')) {
            console.log('   ✅ Valid HTML page received');
        }

        // Check for Next.js indicators
        if (response.data.includes('__NEXT_DATA__')) {
            console.log('   ✅ Next.js application detected');
        }

        // Check for app-specific content
        if (response.data.toLowerCase().includes('UNICART')) {
            console.log('   ✅ UNICART branding found');
        }

        if (response.data.toLowerCase().includes('product')) {
            console.log('   ✅ Product-related content found');
        }

        console.log('\n   🔍 Checking for API calls in page...');
        if (response.data.includes('localhost:3001') || response.data.includes('/api/')) {
            console.log('   ✅ API endpoint references found');
        }

    } catch (error) {
        console.log(`   ❌ FAILED: ${error.message}`);
        if (error.response) {
            console.log(`   Status: ${error.response.status}`);
        }
    }

    console.log('\n═══════════════════════════════════════');

    // Test API endpoint from frontend perspective
    console.log('\n📡 Testing: Frontend API Proxy');
    try {
        const apiResponse = await axios.get('http://localhost:3000/api/products', {
            timeout: 5000
        });
        console.log(`   ✅ Frontend can access: /api/products`);
        console.log(`   📊 Status: ${apiResponse.status}`);
    } catch (error) {
        console.log(`   ℹ️  Frontend API proxy: ${error.message}`);
        console.log('   (This is normal if using external API)');
    }

    console.log('\n✅ Frontend Test Complete!\n');
}

testFrontend().catch(console.error);
