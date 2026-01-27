// ===== CONFIGURACIÓN BÁSICA DE THREE.JS (opcional) =====
// Este archivo es para si quieres añadir más funcionalidades 3D con Three.js

function initThreeJSConfig() {
    // Verificar si Three.js está disponible
    if (typeof THREE === 'undefined') {
        console.warn('Three.js no está cargado');
        return;
    }
    
    console.log('Three.js está disponible y listo para usar');
    
    // Puedes añadir aquí configuraciones globales de Three.js
    // como configuración de renderer, escenas globales, etc.
    
    // Ejemplo básico de una escena Three.js
    function createBasicScene() {
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        
        renderer.setSize(300, 200);
        renderer.setClearColor(0x000000, 0); // Fondo transparente
        
        // Agregar al elemento AR si existe
        const arContainer = document.getElementById('arCanvas');
        if (arContainer) {
            arContainer.appendChild(renderer.domElement);
        }
        
        // Cubo de ejemplo
        const geometry = new THREE.BoxGeometry();
        const material = new THREE.MeshBasicMaterial({ color: 0x8A2BE2 });
        const cube = new THREE.Mesh(geometry, material);
        scene.add(cube);
        
        camera.position.z = 5;
        
        // Función de animación
        function animate() {
            requestAnimationFrame(animate);
            cube.rotation.x += 0.01;
            cube.rotation.y += 0.01;
            renderer.render(scene, camera);
        }
        
        animate();
        
        return { scene, camera, renderer };
    }
    
    // Solo crear escena si hay un contenedor AR
    if (document.getElementById('arCanvas')) {
        // createBasicScene();
    }
}

// Inicializar cuando Three.js esté cargado
if (typeof THREE !== 'undefined') {
    initThreeJSConfig();
} else {
    // Esperar a que se cargue
    const checkThreeJS = setInterval(() => {
        if (typeof THREE !== 'undefined') {
            initThreeJSConfig();
            clearInterval(checkThreeJS);
        }
    }, 100);
}