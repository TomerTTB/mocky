// Add new endpoint functionality
import { METHODS_WITH_BODY, showAddStatus, handleFileUpload } from './utils.js';

export function initializeAddEndpoint(socket) {
    // Add new endpoint functionality
    document.getElementById('addEndpointBtn').addEventListener('click', () => {
        const name = document.getElementById('newEndpointName').value.trim();
        const method = document.getElementById('newMethod').value;
        const statusCode = parseInt(document.getElementById('newStatusCode').value);
        const delay = parseInt(document.getElementById('newDelay').value);
        const responseBody = document.getElementById('newResponseBody').value.trim();
        const expectedFields = document.getElementById('newExpectedFields').value.trim();
        
        if (!name) {
            showAddStatus('Please enter an endpoint name', 'danger');
            return;
        }
        
        if (!responseBody) {
            showAddStatus('Please enter a response body', 'danger');
            return;
        }
        
        try {
            const body = JSON.parse(responseBody);
            const config = { 
                method: method,
                statusCode, 
                delay, 
                body 
            };
            
            // Add expectedFields for body methods
            if (METHODS_WITH_BODY.includes(method) && expectedFields) {
                try {
                    config.expectedFields = JSON.parse(expectedFields);
                } catch (error) {
                    showAddStatus('Invalid JSON in expected fields', 'danger');
                    return;
                }
            }
            
            socket.emit('addEndpoint', { endpoint: name, config });
            showAddStatus('Adding endpoint...', 'warning');
            
            // Clear form
            clearAddForm();
            
        } catch (error) {
            showAddStatus('Invalid JSON in response body', 'danger');
        }
    });

    // Handle file upload for new endpoints
    document.getElementById('newUploadBtn').addEventListener('click', () => {
        const fileInput = document.getElementById('newResponseFile');
        const targetTextarea = document.getElementById('newResponseBody');
        handleFileUpload(fileInput, targetTextarea, showAddStatus);
    });

    // Handle method dropdown change for new endpoint form
    document.getElementById('newMethod').addEventListener('change', (e) => {
        const expectedFieldsInput = document.getElementById('newExpectedFields');
        
        if (METHODS_WITH_BODY.includes(e.target.value)) {
            expectedFieldsInput.disabled = false;
            expectedFieldsInput.placeholder = '["name", "email", "phone"]';
        } else {
            expectedFieldsInput.disabled = true;
            expectedFieldsInput.value = '';
            expectedFieldsInput.placeholder = 'Only available for body methods (POST, PUT, PATCH)';
        }
    });
}

function clearAddForm() {
    document.getElementById('newEndpointName').value = '';
    document.getElementById('newMethod').value = 'GET';
    document.getElementById('newResponseBody').value = '';
    document.getElementById('newResponseFile').value = '';
    document.getElementById('newExpectedFields').value = '';
    document.getElementById('newExpectedFields').disabled = true;
}