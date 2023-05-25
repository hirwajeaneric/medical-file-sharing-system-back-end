function generateNotificationMessage(testStatistics) {
    // Calculate the percentage thresholds
    var warningThreshold = testStatistics.total * 0.4;
    var emergencyThreshold = testStatistics.total * 0.6;
    var criticalThreshold = testStatistics.total * 0.8;
  
    // Check if any test frequency exceeds the thresholds
    var notificationSeverity = '';
    var notificationMessage = '';
  
    testStatistics.testedDiseases.forEach(function(testedDisease) {
      if (testedDisease.frequency >= criticalThreshold) {
        notificationSeverity = 'Critical';
        notificationMessage =  `The system has detected a Critical increase of cases of ${testedDisease.test}. The system detects now the presence of 80% positive cases of ${testedDisease.test} today. `;
      } else if (testedDisease.frequency >= emergencyThreshold) {
        notificationSeverity = 'Emergency';
        notificationMessage = `The system has detected an Emergency increase of cases of ${testedDisease.test}. The system detects now the presence of 60% positive cases of ${testedDisease.test} today. `;
      } else if (testedDisease.frequency >= warningThreshold) {
        notificationSeverity = 'Warning';
        notificationMessage = `Warning. The system has detected an Extreme number of cases of ${testedDisease.test}. The system detects now the presence of 40% positive cases of ${testedDisease.test} today. `;
      }
    });
  
    // Create the notification object
    var notification = {
      severity: notificationSeverity,
      message: notificationMessage
    };
  
    return notification;
}
  
module.exports = generateNotificationMessage;

// Used prompt
// Using Javascript as the programming language. Given an object of test statistics in hospitals as presented in the object testStatistics bellow, you are required to create an algorithm that will be returning an object containing a message that is designed to be an notification: 
//     testStatistics = {
//         total: 5,
//         positive: 4,
//         rare: 1,
//         extreme: 1,
//         testedDiseases: [{
//             test: 'malaria', frequency: 2,
//             test: 'covid19', frequency: 1,
//             test: 'flu', frequency: 1,
//         }],
//         rareCases: ['covid19','flu'],
//         extremeCases: ['malaria']
//     }
//     The notification message will be structured as follow:
//     notification: {
//         time: Date.now(),
//         severity: It can be either be: 'Warning','Emergency','Critical',
//         message: '',
//     }

//     The conditions to which the notification messages will be generated are as follow:
//     if in the testedDiseases array, the frequency of a certain test is 40% or 2/5 of all tests it should generate a warning message.
//     if in the testedDiseases array, the frequency of a certain test is 60% or 3/5 of all tests it should generate a emergency message.
//     if in the testedDiseases array, the frequency of a certain test is 80% or 4/5 of all tests it should generate a warning message.