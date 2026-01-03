const axios = require('axios');

const BASE_URL = 'http://localhost:3001/api';

async function testBackendAPI() {
    console.log('🧪 Testing Backend API Endpoints...\n');
    console.log('═══════════════════════════════════════\n');

    const tests = [
        {
            name: 'Health Check',
            url: 'http://localhost:3001/health',
            method: 'GET'
        },
        {
            name: 'Get All Products',
            url: `${BASE_URL}/products`,
            method: 'GET'
        },
        {
            name: 'Get All Categories',
            url: `${BASE_URL}/categories`,
            method: 'GET'
        },
        {
            name: 'Get All Merchants',
            url: `${BASE_URL}/merchants`,
            method: 'GET'
        }
    ];

    for (const test of tests) {
        try {
            console.log(`📡 Testing: ${test.name}`);
            console.log(`   URL: ${test.url}`);

            const response = await axios({
                method: test.method,
                url: test.url,
                timeout: 5000
            });

            console.log(`   ✅ Status: ${response.status}`);

            if (Array.isArray(response.data)) {
                console.log(`   📊 Records: ${response.data.length}`);
                if (response.data.length > 0) {
                    console.log(`   📝 Sample: ${JSON.stringify(response.data[0]).substring(0, 100)}...`);
                }
            } else if (typeof response.data === 'object') {
                console.log(`   📝 Response: ${JSON.stringify(response.data).substring(0, 150)}...`);
            }

            console.log('');

        } catch (error) {
            console.log(`   ❌ FAILED: ${error.message}`);
            if (error.response) {
                console.log(`   Status: ${error.response.status}`);
                console.log(`   Error: ${JSON.stringify(error.response.data)}`);
            }
            console.log('');
        }
    }

    console.log('═══════════════════════════════════════');
    console.log('✅ Backend API Test Complete!\n');
}

testBackendAPI().catch(console.error);
