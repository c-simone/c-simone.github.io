// Grid Animation System with Mouse Proximity Effect

function initGridAnimation() {
    const gridContainer = document.getElementById('grid-container');
    if (!gridContainer) return;
    
    const gridSize = 50;
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    const columns = Math.ceil(windowWidth / gridSize);
    const rows = Math.ceil(windowHeight / gridSize);
    
    // Create invisible grid tiles for mouse proximity effect
    function createGridTiles() {
        // Clear existing tiles
        const existingTiles = gridContainer.querySelectorAll('.grid-tile');
        existingTiles.forEach(tile => tile.remove());
        
        for (let row = 0; row < rows + 1; row++) {
            for (let col = 0; col < columns + 1; col++) {
                const tile = document.createElement('div');
                tile.className = 'grid-tile';
                tile.style.left = `${col * gridSize}px`;
                tile.style.top = `${row * gridSize}px`;
                tile.dataset.row = row;
                tile.dataset.col = col;
                gridContainer.appendChild(tile);
            }
        }
    }
    
    // Mouse proximity effect
    let mouseX = 0;
    let mouseY = 0;
    let isMouseMoving = false;
    let mouseTimeout;
    let animationFrame;
    
    function updateTileProximity() {
        const tiles = gridContainer.querySelectorAll('.grid-tile');
        
        tiles.forEach(tile => {
            const rect = tile.getBoundingClientRect();
            const tileCenterX = rect.left + rect.width / 2;
            const tileCenterY = rect.top + rect.height / 2;
            
            const distance = Math.sqrt(
                Math.pow(mouseX - tileCenterX, 2) + 
                Math.pow(mouseY - tileCenterY, 2)
            );
            
            // Remove existing proximity classes
            tile.classList.remove('hover-near', 'hover-close');
            
            if (isMouseMoving) {
                if (distance < 60) {
                    tile.classList.add('hover-close');
                } else if (distance < 120) {
                    tile.classList.add('hover-near');
                }
            }
        });
    }
    
    // Track mouse movement with performance optimization
    document.addEventListener('mousemove', function(e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
        isMouseMoving = true;
        
        clearTimeout(mouseTimeout);
        
        // Use requestAnimationFrame for smooth performance
        if (animationFrame) {
            cancelAnimationFrame(animationFrame);
        }
        
        animationFrame = requestAnimationFrame(updateTileProximity);
        
        // Reset hover effect after mouse stops moving
        mouseTimeout = setTimeout(() => {
            isMouseMoving = false;
            const tiles = gridContainer.querySelectorAll('.grid-tile');
            tiles.forEach(tile => {
                tile.classList.remove('hover-near', 'hover-close');
            });
        }, 500);
    });
    
    // Initialize grid tiles
    createGridTiles();

    // Handle window resize
    window.addEventListener('resize', function () {
        // Clear existing elements
        const tiles = gridContainer.querySelectorAll('.grid-tile');
        tiles.forEach(tile => tile.remove());
        
        // Restart animation with new dimensions
        setTimeout(initGridAnimation, 100);
    });
    
    // Clean up on page unload
    window.addEventListener('beforeunload', function() {
        // No intervals to clear
    });
}
