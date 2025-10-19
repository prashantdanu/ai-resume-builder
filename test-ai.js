const OpenAI = require('openai');

// Test OpenAI API key
async function testOpenAI() {
  try {
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY || 'your_openai_api_key_sk-svcacct-XIa6Pk1zVFFObVG1u6onUQAy1Y1kZr6G_i-hm9FtD0czjO3ggHRl9o7N1zTWEXgVvKIjV1ybN1T3BlbkFJSTLiH6D5kjhTbjSVSsr3opYCmHci14H1gUvLSbvNols7rgFDOXtgGuYeM4dn6y_h10WTXTay4Ahere'
    });

    console.log('Testing OpenAI API key...');
    
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: "Say 'Hello, AI is working!' if you can read this."
        }
      ],
      max_tokens: 50,
      temperature: 0.7
    });

    console.log('✅ OpenAI API is working!');
    console.log('Response:', completion.choices[0].message.content);
    
  } catch (error) {
    console.log('❌ OpenAI API Error:');
    console.log('Error message:', error.message);
    console.log('Error code:', error.code);
    console.log('Error type:', error.type);
  }
}

testOpenAI();
