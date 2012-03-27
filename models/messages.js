/**
 * Global menu messages controller
 */
App.Models.Messages = function() {
    function getLatestMessage() {
        return 'This is a test';
    }

    return {
        getLatestMessage: getLatestMessage
    }
};