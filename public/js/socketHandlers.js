// Socket.IO event handlers
import { showAddStatus } from './utils.js';
import { renderEndpoints } from './endpointCard.js';

export function initializeSocketHandlers(socket, endpointElements, statusElements) {
    // Handle configuration updates
    socket.on('configUpdate', (configs) => {
        renderEndpoints(configs, endpointElements, statusElements, socket);
    });

    // Handle update success
    socket.on('updateSuccess', ({ endpoint, timestamp }) => {
        const elements = endpointElements[endpoint];
        if (elements) {
            elements.updateBtn.disabled = false;
            elements.updateStatus.textContent = `Updated successfully at ${timestamp}`;
            elements.updateStatus.classList.remove('text-warning');
            elements.updateStatus.classList.add('text-success', 'show');
            
            // Reset the status message after animation
            setTimeout(() => {
                elements.updateStatus.classList.remove('show');
            }, 5000);
        }
    });

    // Handle add success
    socket.on('addSuccess', ({ endpoint, timestamp }) => {
        showAddStatus(`Endpoint "/${endpoint}" added successfully at ${timestamp}`, 'success');
    });

    // Handle add error
    socket.on('addError', ({ endpoint, message }) => {
        showAddStatus(`Error adding endpoint "/${endpoint}": ${message}`, 'danger');
    });

    // Handle remove success
    socket.on('removeSuccess', ({ endpoint, timestamp }) => {
        // The endpoint will be automatically removed from the UI via configUpdate
        console.log(`Endpoint "/${endpoint}" removed successfully at ${timestamp}`);
    });

    // Handle remove error
    socket.on('removeError', ({ endpoint, message }) => {
        alert(`Error removing endpoint "/${endpoint}": ${message}`);
    });

    // Handle rename success
    socket.on('renameSuccess', ({ oldName, newName, timestamp }) => {
        // The endpoint will be automatically updated via configUpdate
        console.log(`Endpoint "/${oldName}" renamed to "/${newName}" successfully at ${timestamp}`);
    });

    // Handle rename error
    socket.on('renameError', ({ oldName, newName, message }) => {
        alert(`Error renaming endpoint "/${oldName}" to "/${newName}": ${message}`);
        
        // Reset the name input to the original value
        const elements = endpointElements[oldName];
        if (elements) {
            elements.endpointNameInput.value = oldName;
            elements.updateStatus.textContent = `Rename failed: ${message}`;
            elements.updateStatus.classList.remove('text-warning');
            elements.updateStatus.classList.add('text-danger', 'show');
            
            setTimeout(() => {
                elements.updateStatus.classList.remove('show');
            }, 5000);
        }
    });
}