// Endpoint card creation and management
import { METHODS_WITH_BODY, handleFileUpload, copyToClipboard } from './utils.js';

export function createEndpointCard(endpoint, config, socket, endpointElements, statusElements) {
    const template = document.getElementById('endpoint-template');
    const card = template.content.cloneNode(true);
    
    // Get all the elements from the card
    const elements = getCardElements(card);
    
    // Set initial values
    const method = config.method || 'GET';
    setupInitialValues(elements, endpoint, config, method);
    
    // Setup event listeners
    setupEventListeners(elements, endpoint, method, socket, endpointElements);
    
    // Store elements for later updates
    endpointElements[endpoint] = elements;
    statusElements[endpoint] = elements.updateStatus;
    
    return card;
}

function getCardElements(card) {
    return {
        card: card.querySelector('.col-12'),
        endpointUrlDisplay: card.querySelector('.endpoint-url-display'),
        endpointNameInput: card.querySelector('.endpoint-name'),
        endpointMethodSelect: card.querySelector('.endpoint-method'),
        endpointUrl: card.querySelector('.endpoint-url'),
        copyUrlBtn: card.querySelector('.copy-url-btn'),
        statusInput: card.querySelector('.status-code'),
        delayInput: card.querySelector('.delay'),
        bodyInput: card.querySelector('.response-body'),
        expectedFieldsInput: card.querySelector('.expected-fields'),
        expectedFieldsSection: card.querySelector('.expected-fields-section'),
        testRequestBodyInput: card.querySelector('.test-request-body'),
        testRequestBodySection: card.querySelector('.test-request-body-section'),
        responseFileInput: card.querySelector('.response-file'),
        uploadBtn: card.querySelector('.upload-btn'),
        updateBtn: card.querySelector('.update-btn'),
        testBtn: card.querySelector('.test-btn'),
        testResponse: card.querySelector('.test-response'),
        updateStatus: card.querySelector('.update-status'),
        removeBtn: card.querySelector('.remove-btn')
    };
}

function setupInitialValues(elements, endpoint, config, method) {
    elements.endpointNameInput.value = endpoint;
    elements.endpointNameInput.dataset.originalEndpoint = endpoint;
    elements.endpointMethodSelect.value = method;
    elements.statusInput.value = config.statusCode;
    elements.delayInput.value = config.delay;
    elements.bodyInput.value = JSON.stringify(config.body, null, 2);
    
    // Handle expectedFields and test request body for methods that support request bodies
    if (METHODS_WITH_BODY.includes(method)) {
        elements.expectedFieldsSection.style.display = 'block';
        elements.testRequestBodySection.style.display = 'block';
        if (config.expectedFields) {
            elements.expectedFieldsInput.value = JSON.stringify(config.expectedFields, null, 2);
            // Pre-populate test request body with sample data based on expected fields
            const sampleBody = {};
            config.expectedFields.forEach(field => {
                sampleBody[field] = `sample_${field}`;
            });
            elements.testRequestBodyInput.value = JSON.stringify(sampleBody, null, 2);
        } else {
            elements.testRequestBodyInput.value = JSON.stringify({"sample": "data"}, null, 2);
        }
    }

    // Update the URL in the template
    elements.endpointUrl.textContent = `http://localhost:3003/${endpoint}`;

    // Update endpoint stats
    updateEndpointStats(elements.card, method, config);
}

function updateEndpointStats(card, method, config) {
    // In the new template structure, we don't have separate stat display elements
    // The values are shown directly in the form inputs, so this function is no longer needed
    // but we'll keep it for compatibility
}

function setupEventListeners(elements, endpoint, method, socket, endpointElements) {
    // Handle method dropdown change
    elements.endpointMethodSelect.addEventListener('change', (e) => {
        const method = e.target.value;
        
        if (METHODS_WITH_BODY.includes(method)) {
            elements.expectedFieldsSection.style.display = 'block';
            elements.testRequestBodySection.style.display = 'block';
            // Pre-populate test request body with sample data
            elements.testRequestBodyInput.value = JSON.stringify({"sample": "data"}, null, 2);
        } else {
            elements.expectedFieldsSection.style.display = 'none';
            elements.testRequestBodySection.style.display = 'none';
            elements.expectedFieldsInput.value = '';
            elements.testRequestBodyInput.value = '';
        }
    });

    // Handle file upload for existing endpoints
    elements.uploadBtn.addEventListener('click', () => {
        handleFileUpload(
            elements.responseFileInput, 
            elements.bodyInput, 
            (message, type) => {
                elements.updateStatus.textContent = message;
                elements.updateStatus.classList.remove('text-danger', 'text-success');
                elements.updateStatus.classList.add(type === 'success' ? 'text-success' : 'text-danger', 'show');
                
                setTimeout(() => {
                    elements.updateStatus.classList.remove('show');
                }, 3000);
            }
        );
    });

    // Handle copy URL button
    elements.copyUrlBtn.addEventListener('click', async () => {
        const currentEndpointName = elements.endpointNameInput.value.trim() || endpoint;
        const urlToCopy = `http://localhost:3003/${currentEndpointName}`;
        await copyToClipboard(urlToCopy, elements.copyUrlBtn);
    });

    // Handle endpoint name changes in real-time
    elements.endpointNameInput.addEventListener('input', () => {
        const newName = elements.endpointNameInput.value.trim();
        if (newName) {
            const fullUrl = `http://localhost:3003/${newName}`;
            elements.endpointUrl.textContent = fullUrl;
            elements.endpointUrlDisplay.textContent = fullUrl;
        } else {
            elements.endpointUrl.textContent = `http://localhost:3003/...`;
            elements.endpointUrlDisplay.textContent = `http://localhost:3003/...`;
        }
    });

    // Update configuration
    elements.updateBtn.addEventListener('click', () => {
        handleUpdateEndpoint(elements, endpoint, socket);
    });

    // Test endpoint
    elements.testBtn.addEventListener('click', async () => {
        await handleTestEndpoint(elements, endpoint);
    });

    // Remove endpoint
    elements.removeBtn.addEventListener('click', () => {
        const currentEndpointName = elements.endpointNameInput.value.trim() || endpoint;
        if (confirm(`Are you sure you want to remove the endpoint "/${currentEndpointName}"?`)) {
            socket.emit('removeEndpoint', endpoint);
        }
    });
}

function handleUpdateEndpoint(elements, endpoint, socket) {
    try {
        const newName = elements.endpointNameInput.value.trim();
        const oldName = elements.endpointNameInput.dataset.originalEndpoint;
        
        if (!newName) {
            alert('Please enter a valid endpoint name');
            elements.endpointNameInput.value = oldName;
            elements.endpointUrl.textContent = `http://localhost:3003/${oldName}`;
            return;
        }
        
        if (newName.includes('/') || newName.includes('\\') || newName.includes(' ')) {
            alert('Endpoint name cannot contain spaces, slashes, or backslashes');
            elements.endpointNameInput.value = oldName;
            elements.endpointUrl.textContent = `http://localhost:3003/${oldName}`;
            return;
        }
        
        // Check if this is a rename operation
        if (newName !== oldName) {
            // This is a rename operation
            socket.emit('renameEndpoint', { oldName: oldName, newName: newName });
            
            // Show renaming status
            elements.updateStatus.textContent = 'Renaming endpoint...';
            elements.updateStatus.classList.remove('text-success');
            elements.updateStatus.classList.add('text-warning', 'show');
            
            // Update the original endpoint reference
            elements.endpointNameInput.dataset.originalEndpoint = newName;
        }
        
        // Always send the updated configuration (for both rename and regular updates)
        const method = elements.endpointMethodSelect.value;
        const newConfig = {
            [newName]: {
                method: method,
                statusCode: parseInt(elements.statusInput.value),
                delay: parseInt(elements.delayInput.value),
                body: JSON.parse(elements.bodyInput.value)
            }
        };
        
        // Add expectedFields for body methods
        if (METHODS_WITH_BODY.includes(method) && elements.expectedFieldsInput.value.trim()) {
            try {
                newConfig[newName].expectedFields = JSON.parse(elements.expectedFieldsInput.value.trim());
            } catch (error) {
                alert('Invalid JSON in expected fields');
                return;
            }
        }
        
        socket.emit('updateConfig', newConfig);
        elements.updateBtn.disabled = true;
        elements.updateStatus.textContent = 'Updating...';
        elements.updateStatus.classList.remove('text-success');
        elements.updateStatus.classList.add('text-warning', 'show');
        
    } catch (error) {
        alert('Invalid JSON in response body');
    }
}

async function handleTestEndpoint(elements, endpoint) {
    try {
        elements.testBtn.disabled = true;
        const currentEndpointName = elements.endpointNameInput.value.trim() || endpoint;
        const method = elements.endpointMethodSelect.value;
        const start = Date.now();
        
        let fetchOptions = {
            method: method
        };
        
        // For methods that support request bodies, use the custom request body from textarea
        if (METHODS_WITH_BODY.includes(method)) {
            fetchOptions.headers = {
                'Content-Type': 'application/json'
            };
            
            const requestBodyText = elements.testRequestBodyInput.value.trim();
            if (requestBodyText) {
                try {
                    // Validate that the request body is valid JSON
                    JSON.parse(requestBodyText);
                    fetchOptions.body = requestBodyText;
                } catch (error) {
                    elements.testResponse.textContent = `Error: Invalid JSON in request body - ${error.message}`;
                    return;
                }
            } else {
                // Use empty object if no request body provided
                fetchOptions.body = JSON.stringify({});
            }
        }
        
        const response = await fetch(`http://localhost:3003/${currentEndpointName}`, fetchOptions);
        const duration = Date.now() - start;
        
        let responseText = `Status: ${response.status}\nDuration: ${duration}ms\n`;
        
        if (METHODS_WITH_BODY.includes(method)) {
            responseText += `Request Body: ${fetchOptions.body}\n`;
        }
        
        // Handle different response types
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
            try {
                const data = await response.json();
                responseText += `Response: ${JSON.stringify(data, null, 2)}`;
                
                // Highlight validation errors if status is 400
                if (response.status === 400 && data.error) {
                    elements.testResponse.style.color = '#dc3545'; // Bootstrap danger color
                    if (data.details && Array.isArray(data.details)) {
                        responseText += `\n\nValidation Errors:`;
                        data.details.forEach(detail => {
                            responseText += `\n- ${detail.field}: ${detail.message}`;
                        });
                    }
                } else {
                    elements.testResponse.style.color = ''; // Reset color
                }
            } catch (jsonError) {
                const text = await response.text();
                responseText += `Response: ${text}`;
                elements.testResponse.style.color = ''; // Reset color
            }
        } else {
            const text = await response.text();
            responseText += `Response: ${text}`;
            elements.testResponse.style.color = ''; // Reset color
        }
        
        elements.testResponse.textContent = responseText;
    } catch (error) {
        elements.testResponse.textContent = `Error: ${error.message}`;
        elements.testResponse.style.color = '#dc3545'; // Bootstrap danger color
    } finally {
        elements.testBtn.disabled = false;
    }
}

// Render all endpoints
export function renderEndpoints(configs, endpointElements, statusElements, socket) {
    const container = document.getElementById('endpoints');
    const currentEndpoints = new Set(Object.keys(endpointElements));
    const newOrderEndpoints = [];

    // Sort endpoints alphabetically by name
    const sortedEndpoints = Object.entries(configs).sort(([nameA], [nameB]) => nameA.localeCompare(nameB));

    // Update existing cards or create new ones
    sortedEndpoints.forEach(([endpoint, config]) => {
        if (endpointElements[endpoint]) {
            // Update existing card
            updateExistingCard(endpointElements[endpoint], endpoint, config);
            currentEndpoints.delete(endpoint);
        } else {
            // Create new card
            const card = createEndpointCard(endpoint, config, socket, endpointElements, statusElements);
            container.appendChild(card);
        }
        newOrderEndpoints.push(endpoint);
    });

    // Remove cards that no longer exist
    currentEndpoints.forEach(endpoint => {
        if (endpointElements[endpoint] && endpointElements[endpoint].card) {
            endpointElements[endpoint].card.remove();
            delete endpointElements[endpoint];
            delete statusElements[endpoint];
        }
    });

    // Reorder cards based on the new configuration order
    const fragment = document.createDocumentFragment();
    newOrderEndpoints.forEach(endpoint => {
        if (endpointElements[endpoint] && endpointElements[endpoint].card) {
            fragment.appendChild(endpointElements[endpoint].card);
        }
    });
    container.innerHTML = ''; // Clear container before re-appending
    container.appendChild(fragment);
}

function updateExistingCard(elements, endpoint, config) {
    const method = config.method || 'GET';
    
    elements.statusInput.value = config.statusCode;
    elements.delayInput.value = config.delay;
    elements.bodyInput.value = JSON.stringify(config.body, null, 2);
    elements.endpointUrl.textContent = `http://localhost:3003/${endpoint}`;
    elements.endpointNameInput.value = endpoint;
    elements.endpointNameInput.dataset.originalEndpoint = endpoint;
    elements.endpointMethodSelect.value = method;
    
    // Handle expectedFields and test request body
    if (METHODS_WITH_BODY.includes(method)) {
        elements.expectedFieldsSection.style.display = 'block';
        elements.testRequestBodySection.style.display = 'block';
        if (config.expectedFields) {
            elements.expectedFieldsInput.value = JSON.stringify(config.expectedFields, null, 2);
            // Update test request body with sample data based on expected fields
            const sampleBody = {};
            config.expectedFields.forEach(field => {
                sampleBody[field] = `sample_${field}`;
            });
            elements.testRequestBodyInput.value = JSON.stringify(sampleBody, null, 2);
        } else {
            elements.expectedFieldsInput.value = '';
            elements.testRequestBodyInput.value = JSON.stringify({"sample": "data"}, null, 2);
        }
    } else {
        elements.expectedFieldsSection.style.display = 'none';
        elements.testRequestBodySection.style.display = 'none';
        elements.expectedFieldsInput.value = '';
        elements.testRequestBodyInput.value = '';
    }

    // Update displayed stats
    updateEndpointStats(elements.card, method, config);
}