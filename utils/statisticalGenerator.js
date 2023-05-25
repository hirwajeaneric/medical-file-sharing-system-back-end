// Function to generate Statistics
function statisticalGenerator(tests) {
    let testStatistics = {
      total: 0,
      positive: 0,
      rare: 0,
      extreme: 0,
      testedDiseases: [],
      rareCases: [],
      extremeCases: []
    };
  
    let testFrequency = {};
    let positiveFrequency = {};
  
    tests.forEach(test => {
      const { requiredTest, results } = test;
  
      // Count total unique requiredTests
      if (!testFrequency[requiredTest]) {
        testStatistics.total++;
        testFrequency[requiredTest] = 1;
        testStatistics.testedDiseases.push({ test: requiredTest, frequency: 1 });
      } else {
        testFrequency[requiredTest]++;
        const index = testStatistics.testedDiseases.findIndex(item => item.test === requiredTest);
        testStatistics.testedDiseases[index].frequency++;
      }
  
      // Count positive tests
      if (results === 'Positive') {
        testStatistics.positive++;
  
        // Track positive frequency for each requiredTest
        if (!positiveFrequency[requiredTest]) {
          positiveFrequency[requiredTest] = 1;
        } else {
          positiveFrequency[requiredTest]++;
        }
      }
    });
  
    // Find rare and extreme cases
    Object.entries(positiveFrequency).forEach(([requiredTest, frequency]) => {
      if (frequency < 3) {
        testStatistics.rare++;
        testStatistics.rareCases.push(requiredTest);
      } else if (frequency >= 3) {
        testStatistics.extreme++;
        testStatistics.extremeCases.push(requiredTest);
      }
    });
  
    // Sort testedDiseases by frequency in descending order
    testStatistics.testedDiseases.sort((a, b) => b.frequency - a.frequency);
  
    return testStatistics;
}

module.exports = statisticalGenerator;