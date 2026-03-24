/* =========================================
   UNIROTAS PREMIUM - CORE JAVASCRIPT
========================================= */

// --- AUTH GUARD (PREMIUM SECURITY) ---
if (!localStorage.getItem('uniRotas_isLoggedIn') && !window.location.pathname.includes('login.html')) {
    window.location.href = 'login.html';
}

// --- CONFIGURAÇÕES E ESTILOS GLOBAIS ---
const DB_NAME = 'UniRotasDB';
const DB_VERSION = 4;

// Estilo Escuro Padrão (Premium)
const mapDarkStyle = [
    { "elementType": "geometry", "stylers": [{ "color": "#121926" }] },
    { "elementType": "labels.text.fill", "stylers": [{ "color": "#746855" }] },
    { "elementType": "labels.text.stroke", "stylers": [{ "color": "#242f3e" }] },
    { "featureType": "administrative.locality", "elementType": "labels.text.fill", "stylers": [{ "color": "#d59563" }] },
    { "featureType": "poi", "elementType": "labels.text.fill", "stylers": [{ "color": "#d59563" }] },
    { "featureType": "poi.park", "elementType": "geometry", "stylers": [{ "color": "#263c3f" }] },
    { "featureType": "road", "elementType": "geometry", "stylers": [{ "color": "#304050" }] },
    { "featureType": "road", "elementType": "geometry.stroke", "stylers": [{ "color": "#212a37" }] },
    { "featureType": "road.highway", "elementType": "geometry", "stylers": [{ "color": "#2c3e50" }] },
    { "featureType": "road.highway", "elementType": "geometry.stroke", "stylers": [{ "color": "#1f2835" }] },
    { "featureType": "road.local", "elementType": "labels.text.fill", "stylers": [{ "color": "#9ca5b3" }] },
    { "featureType": "transit.line", "elementType": "geometry", "stylers": [{ "color": "#2f3948" }] },
    { "featureType": "transit.station", "elementType": "labels.text.fill", "stylers": [{ "color": "#d59563" }] },
    { "featureType": "water", "elementType": "geometry", "stylers": [{ "color": "#17263c" }] },
    { "featureType": "water", "elementType": "labels.text.fill", "stylers": [{ "color": "#515c6d" }] },
    { "featureType": "water", "elementType": "labels.text.stroke", "stylers": [{ "color": "#17263c" }] }
];

const mapStyles = {
    standard: [],
    silver: [
        { "elementType": "geometry", "stylers": [{ "color": "#f5f5f5" }] },
        { "elementType": "labels.icon", "stylers": [{ "visibility": "off" }] },
        { "elementType": "labels.text.fill", "stylers": [{ "color": "#616161" }] },
        { "elementType": "labels.text.stroke", "stylers": [{ "color": "#f5f5f5" }] },
        { "featureType": "administrative.land_parcel", "elementType": "labels.text.fill", "stylers": [{ "color": "#bdbdbd" }] },
        { "featureType": "poi", "elementType": "geometry", "stylers": [{ "color": "#eeeeee" }] },
        { "featureType": "poi", "elementType": "labels.text.fill", "stylers": [{ "color": "#757575" }] },
        { "featureType": "road", "elementType": "geometry", "stylers": [{ "color": "#ffffff" }] },
        { "featureType": "road.arterial", "elementType": "labels.text.fill", "stylers": [{ "color": "#757575" }] },
        { "featureType": "road.highway", "elementType": "geometry", "stylers": [{ "color": "#dadada" }] },
        { "featureType": "road.highway", "elementType": "labels.text.fill", "stylers": [{ "color": "#616161" }] },
        { "featureType": "water", "elementType": "geometry", "stylers": [{ "color": "#c9c9c9" }] },
        { "featureType": "water", "elementType": "labels.text.fill", "stylers": [{ "color": "#9e9e9e" }] }
    ],
    retro: [
        { "elementType": "geometry", "stylers": [{ "color": "#ebe3cd" }] },
        { "elementType": "labels.text.fill", "stylers": [{ "color": "#523735" }] },
        { "elementType": "labels.text.stroke", "stylers": [{ "color": "#f5f1e0" }] },
        { "featureType": "administrative", "elementType": "geometry.stroke", "stylers": [{ "color": "#c9b2a6" }] },
        { "featureType": "administrative.land_parcel", "elementType": "geometry.stroke", "stylers": [{ "color": "#dcd2be" }] },
        { "featureType": "administrative.land_parcel", "elementType": "labels.text.fill", "stylers": [{ "color": "#ae9e90" }] },
        { "featureType": "landscape.natural", "elementType": "geometry", "stylers": [{ "color": "#dfd2ae" }] },
        { "featureType": "poi", "elementType": "geometry", "stylers": [{ "color": "#dfd2ae" }] },
        { "featureType": "poi", "elementType": "labels.text.fill", "stylers": [{ "color": "#93817a" }] },
        { "featureType": "poi.park", "elementType": "geometry.fill", "stylers": [{ "color": "#a5b076" }] },
        { "featureType": "road", "elementType": "geometry", "stylers": [{ "color": "#f5f1e0" }] },
        { "featureType": "road.highway", "elementType": "geometry", "stylers": [{ "color": "#f8c967" }] },
        { "featureType": "water", "elementType": "geometry.fill", "stylers": [{ "color": "#b9d3c2" }] }
    ],
    dark: mapDarkStyle,
    night: [
        { "elementType": "geometry", "stylers": [{ "color": "#242f3e" }] },
        { "elementType": "labels.text.fill", "stylers": [{ "color": "#746855" }] },
        { "elementType": "labels.text.stroke", "stylers": [{ "color": "#242f3e" }] },
        { "featureType": "administrative.locality", "elementType": "labels.text.fill", "stylers": [{ "color": "#d59563" }] },
        { "featureType": "poi", "elementType": "labels.text.fill", "stylers": [{ "color": "#d59563" }] },
        { "featureType": "road", "elementType": "geometry", "stylers": [{ "color": "#38414e" }] },
        { "featureType": "road", "elementType": "geometry.stroke", "stylers": [{ "color": "#212a37" }] },
        { "featureType": "road.highway", "elementType": "geometry", "stylers": [{ "color": "#746855" }] },
        { "featureType": "water", "elementType": "geometry", "stylers": [{ "color": "#17263c" }] }
    ],
    aubergine: [
        { "elementType": "geometry", "stylers": [{ "color": "#1d2c4d" }] },
        { "elementType": "labels.text.fill", "stylers": [{ "color": "#8ec3b9" }] },
        { "elementType": "labels.text.stroke", "stylers": [{ "color": "#1a3646" }] },
        { "featureType": "administrative.land_parcel", "elementType": "labels.text.fill", "stylers": [{ "color": "#64779e" }] },
        { "featureType": "poi", "elementType": "geometry", "stylers": [{ "color": "#33445c" }] },
        { "featureType": "road", "elementType": "geometry", "stylers": [{ "color": "#122039" }] },
        { "featureType": "road.highway", "elementType": "geometry", "stylers": [{ "color": "#2c4591" }] },
        { "featureType": "water", "elementType": "geometry", "stylers": [{ "color": "#0e1626" }] }
    ]
};

// Variáveis Globais de Estado
let map, directionsService, directionsRenderer, placesService;
let db;
let activeWaypoints = [];
let markers = []; // Guardar referência dos marcadores manuais
const MAPS_FREE_LIMIT = 23; // Segurança de faturamento Google

// Variáveis de Estado para Monitoramento Live
let liveTrackers = {}; // Objeto para guardar múltiplos marcadores { marker, path, isReal }
let selectedVendedorId = null;
const GPS_NOISE_THRESHOLD = 15; // Metros para ignorar "jiggles"
let uidToName = {}; // Mapeamento UID -> Nome Real para fallback imediato
let activeChatVendorId = null;
let allChatMessages = {};
let onlineVendorsCache = {}; // UID -> boolean

function showNotification(msg, type = 'info') {
    const container = document.getElementById('notification-container');
    if (!container) return;
    const note = document.createElement('div');
    note.className = `notification ${type}`;
    note.innerText = msg;
    container.appendChild(note);
    setTimeout(() => note.remove(), 3000);
}


function isVendorOnline(uid) {
    if (!uid) return false;
    return !!onlineVendorsCache[uid];
}

// --- HELPERS ---
function closeAllModals() {
    const overlay = document.getElementById('modal-overlay');
    if (overlay) overlay.classList.add('hidden');
    document.querySelectorAll('.modal-content').forEach(m => m.classList.add('hidden'));
}

function formatID(id) {
    if (!id) return "";
    return String(id).replace(/^0+/, ''); // Remove zeros à esquerda
}

function haversineDistance(coords1, coords2) {
    if (!coords1 || !coords2) return null;
    const toRad = x => (x * Math.PI) / 180;
    const R = 6371e3; // Metros
    const dLat = toRad(coords2.lat - coords1.lat);
    const dLon = toRad(coords2.lng - coords1.lng);
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRad(coords1.lat)) * Math.cos(toRad(coords2.lat)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
}

// --- CONFIGURAÇÃO FIREBASE ---
let database = null;

function initFirebase() {
    const firebaseConfig = {
        apiKey: "AIzaSyD3Mh2iQev84QtQJ96TCdOXS5UFn_OpNAg",
        authDomain: "unirotas-e9e9c.firebaseapp.com",
        projectId: "unirotas-e9e9c",
        storageBucket: "unirotas-e9e9c.firebasestorage.app",
        messagingSenderId: "698279255356",
        appId: "1:698279255356:web:8bda755ad6368bb291d239",
        measurementId: "G-3XQHNZL9XS",
        databaseURL: "https://unirotas-e9e9c-default-rtdb.firebaseio.com"
    };

    if (typeof firebase !== 'undefined') {
        try {
            firebase.initializeApp(firebaseConfig);
            database = firebase.database();
            console.log("Firebase Dashboard Inicializado com sucesso.");

            // Novo: Mapeamento de Usuários (UID -> Nome)
            database.ref('usuarios').on('value', (snap) => {
                const users = snap.val();
                if (users) {
                    Object.keys(users).forEach(uid => {
                        uidToName[uid] = users[uid].name;
                    });
                    // Força atualização dos labels existentes
                    updateAllLabels();
                }
            });

            // Ouvinte em Tempo Real para Localizações de Vendedores
            const dbRef = database.ref('vendedores');
            dbRef.on('value', (snapshot) => {
                const locations = snapshot.val();
                if (locations) {
                    updateLiveMonitoring(locations);
                }
            });

            // Novo: Ouvinte de Mensagens
            listenForMessages();
        } catch (e) {
            console.error("Erro ao inicializar Firebase:", e);
        }
    } else {
        console.warn("Firebase SDK não carregado. O monitoramento em tempo real não funcionará.");
    }
}

/**
 * Sistema de Notificação Premium (Toasts)
 */
function showNotification(message, type = "info") {
    console.log(`[Notification] ${type}: ${message}`);
    const container = document.getElementById('notification-container');
    if (!container) {
        console.error("ERRO: Container 'notification-container' não encontrado no HTML!");
        alert(message);
        return;
    }
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    const icon = type === 'success' ? 'check-circle' : (type === 'error' ? 'x-circle' : 'info');
    toast.innerHTML = `<i data-lucide="${icon}"></i> <span>${message}</span>`;
    container.appendChild(toast);
    if (window.lucide) lucide.createIcons();
    setTimeout(() => {
        toast.style.opacity = '0';
        setTimeout(() => toast.remove(), 500);
    }, 3500);
}

/**
 * Mostra um modal de confirmação premium personalizado.
 * Retorna uma Promise que resolve em true (Confirmar) ou false (Cancelar).
 */
function showConfirmModal(title, message) {
    return new Promise((resolve) => {
        const modal = document.getElementById('modal-confirm');
        const overlay = document.getElementById('modal-overlay');
        const titleEl = document.getElementById('confirm-title');
        const messageEl = document.getElementById('confirm-message');
        const btnYes = document.getElementById('btn-confirm-yes');
        const btnNo = document.getElementById('btn-confirm-no');

        titleEl.innerText = title;
        messageEl.innerText = message;

        overlay.classList.remove('hidden');
        overlay.style.zIndex = '999998';
        modal.classList.remove('hidden');
        modal.style.zIndex = '999999';

        const cleanup = (result) => {
            modal.classList.add('hidden');
            modal.style.zIndex = '';
            overlay.classList.add('hidden');
            overlay.style.zIndex = '';
            btnYes.onclick = null;
            btnNo.onclick = null;
            resolve(result);
        };

        btnYes.onclick = () => cleanup(true);
        btnNo.onclick = () => cleanup(false);
        // Também permitir fechar no botão de fechar padrão se houver, ou no Cancelar
        btnNo.onclick = () => cleanup(false);
    });
}

// --- SHORTCUTS ENGINE ---
let activeShortcuts = JSON.parse(localStorage.getItem('uniRotasShortcuts')) || [];

function initShortcuts() {
    renderShortcuts();

    const navLinks = document.querySelector('.nav-links');
    if (!navLinks) return;

    // Use event delegation with capture phase to be robust against Lucide re-renders
    navLinks.addEventListener('click', (e) => {
        const addBtn = e.target.closest('.add-shortcut-btn');
        if (addBtn) {
            e.preventDefault();
            e.stopPropagation();

            const li = addBtn.closest('li');
            if (!li) return;

            const page = li.dataset.page;
            const action = li.dataset.action;
            const span = li.querySelector('span');
            const label = span ? span.innerText : 'Atalho';

            const iconEl = li.querySelector('i:first-child, svg:first-child');
            const icon = iconEl ? (iconEl.dataset.lucide || iconEl.getAttribute('data-lucide')) : 'star';

            addShortcut({ page, action, label, icon });
        }
    }, true);
}

function addShortcut(item) {
    // Check if already exists
    const exists = activeShortcuts.find(s => s.page === item.page && s.action === item.action);
    if (exists) return showNotification("Este atalho já existe!", "info");

    // Check limit
    if (activeShortcuts.length >= 6) {
        showNotification('Limite de atalhos atingido (máximo 6)', 'error');
        return;
    }

    activeShortcuts.push(item);
    saveShortcuts();
    renderShortcuts();
    showNotification(`Atalho para "${item.label}" adicionado!`, "success");
}

function removeShortcut(index) {
    activeShortcuts.splice(index, 1);
    saveShortcuts();
    renderShortcuts();
}

function saveShortcuts() {
    localStorage.setItem('uniRotasShortcuts', JSON.stringify(activeShortcuts));
}

function renderShortcuts() {
    const bar = document.getElementById('shortcuts-bar');
    if (!bar) return;

    if (activeShortcuts.length === 0) {
        bar.classList.add('hidden');
        return;
    }

    bar.classList.remove('hidden');
    bar.innerHTML = '';

    activeShortcuts.forEach((s, idx) => {
        const item = document.createElement('div');
        item.className = 'shortcut-item glass-panel';
        item.dataset.label = s.label;
        item.title = s.label;
        const isTrash = s.icon === 'trash-2' || s.label === 'Lixeira';
        item.innerHTML = `
            ${isTrash ? `
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="custom-trash-icon main-shortcut-icon">
                    <g class="trash-lid">
                        <path d="M3 6h18"></path>
                        <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                    </g>
                    <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                    <line x1="10" x2="10" y1="11" y2="17"></line>
                    <line x1="14" x2="14" y1="11" y2="17"></line>
                </svg>
            ` : `<i data-lucide="${s.icon}" class="main-shortcut-icon"></i>`}
            <div class="remove-shortcut" onclick="event.stopPropagation(); removeShortcut(${idx})">
                <i data-lucide="x"></i>
            </div>
        `;

        item.onclick = () => {
            // Trigger same behavior as sidebar
            if (s.page) {
                const sidebarItem = document.querySelector(`.nav-links li[data-page="${s.page}"]`);
                if (sidebarItem) sidebarItem.click();
            } else if (s.action) {
                const sidebarItem = document.querySelector(`.nav-links li[data-action="${s.action}"]`);
                if (sidebarItem) sidebarItem.click();
            }
        };

        bar.appendChild(item);
    });

    // Only refresh icons in the shortcuts bar to avoid breaking sidebar listeners
    const barElement = document.getElementById('shortcuts-bar');
    if (barElement) {
        lucide.createIcons({
            attrs: { 'stroke-width': 2 },
            nameAttr: 'data-lucide',
            root: barElement
        });
    }
}

function initGreeting() {
    const wrapper = document.getElementById('greeting-wrapper');
    const icon = document.getElementById('greeting-icon');
    const text = document.getElementById('greeting-text');
    if (!wrapper || !icon || !text) return;

    // Horário de Brasília (GMT-3) - O browser já costuma estar no horário local
    const hour = new Date().getHours();
    let message = "";
    let iconName = "";

    if (hour >= 5 && hour < 12) {
        message = "Bom dia! Bem-vindo ao UniRotas.";
        iconName = "sun";
    } else if (hour >= 12 && hour < 18) {
        message = "Boa tarde! Bem-vindo ao UniRotas.";
        iconName = "sunset";
    } else {
        message = "Boa noite! Bem-vindo ao UniRotas.";
        iconName = "moon";
    }

    text.innerText = message;
    icon.setAttribute('data-lucide', iconName);

    // Adiciona classe para estilização de cor específica
    wrapper.classList.add(iconName);

    // Atualiza o ícone via Lucide
    if (window.lucide) {
        lucide.createIcons({
            attrs: { 'stroke-width': 2 },
            nameAttr: 'data-lucide',
            root: wrapper
        });
    }

    // Mostra após um delay maior para garantir que o loader já saiu e o mapa carregou
    setTimeout(() => {
        wrapper.classList.remove('hidden');
    }, 2500);

    // Some após 15 segundos com efeito de desintegração (Thanos snap)
    setTimeout(() => {
        wrapper.classList.add('dismissed');
        // Remove do DOM após a conclusão da animação (1.5s + margem)
        setTimeout(() => wrapper.remove(), 2500);
    }, 17500); // 15s de tempo na tela + 2.5s de delay inicial
}

function initCustomZoom() {
    const zoomIn = document.getElementById('zoom-in');
    const zoomOut = document.getElementById('zoom-out');

    if (zoomIn) {
        zoomIn.onclick = () => {
            if (window.map) {
                const currentZoom = map.getZoom();
                map.setZoom(currentZoom + 1);
            }
        };
    }

    if (zoomOut) {
        zoomOut.onclick = () => {
            if (window.map) {
                const currentZoom = map.getZoom();
                map.setZoom(currentZoom - 1);
            }
        };
    }

    // Inicializa ícones para os controles de zoom
    const zoomContainer = document.querySelector('.custom-zoom-controls');
    if (zoomContainer && window.lucide) {
        lucide.createIcons({
            attrs: { 'stroke-width': 2.5 },
            nameAttr: 'data-lucide',
            root: zoomContainer
        });
    }
}

// Initializing the app
function initApp() {
    console.log("App Inicializado.");
    lucide.createIcons();

    const loaderWrapper = document.getElementById('loader-wrapper');
    const loaderProgress = document.getElementById('loader-progress');
    const appContainer = document.getElementById('app-container');

    let progress = 0;
    const interval = setInterval(() => {
        progress += Math.random() * 10;
        if (progress > 100) progress = 100;
        if (loaderProgress) loaderProgress.style.width = `${progress}%`;

        if (progress === 100) {
            clearInterval(interval);
            setTimeout(() => {
                if (loaderWrapper) {
                    loaderWrapper.style.opacity = '0';
                    loaderWrapper.style.visibility = 'hidden';
                }
                if (appContainer) appContainer.classList.remove('hidden');

                try {
                    initGoogleMaps();
                    initDatabase();
                    setupEventListeners();
                    initShortcuts();
                    initPremiumDatePickers();

                    // Default route panel to closed
                    const routePanel = document.getElementById('route-panel');
                    const minimizeBtn = document.getElementById('minimize-panel');
                    if (routePanel && !routePanel.classList.contains('minimized')) {
                        routePanel.classList.add('minimized');
                        const icon = minimizeBtn.querySelector('i');
                        if (icon) {
                            icon.setAttribute('data-lucide', 'map'); // Ícone do Roteirizador
                            lucide.createIcons();
                        }
                    }

                    // Inicializa mensagem de saudação
                    initGreeting();

                    // Inicializa controles de zoom
                    initCustomZoom();

                    // Inicializa Rastreamento GPS (Cloud)
                    initFirebase();
                } catch (err) {
                    console.error("Erro fatal durante a inicialização:", err);
                    showNotification("Erro ao carregar o aplicativo. Recarregue a página.", "error");
                }
            }, 800);
        }
    }, 150);
}

// Global scope expose for removeShortcut
window.removeShortcut = removeShortcut;

// --- GOOGLE MAPS SETUP ---

// --- GOOGLE MAPS SETUP ---
function initGoogleMaps() {
    console.log("Inicializando Google Maps...");
    const mapCenter = { lat: -23.5505, lng: -46.6333 };

    if (typeof google === 'undefined') {
        console.error("Google Maps API não carregada.");
        return;
    }

    map = new google.maps.Map(document.getElementById("map"), {
        zoom: 12,
        center: mapCenter,
        styles: mapDarkStyle,
        disableDefaultUI: true,
        zoomControl: false,
    });

    directionsService = new google.maps.DirectionsService();
    directionsRenderer = new google.maps.DirectionsRenderer({
        map: map,
        suppressMarkers: true,
        polylineOptions: {
            strokeColor: "#00d2ff",
            strokeWeight: 5,
            strokeOpacity: 0.8
        }
    });

    placesService = new google.maps.places.PlacesService(map);
}

// --- DATABASE (IndexedDB) ---
function initDatabase() {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (e) => {
        const db_v = e.target.result;
        if (!db_v.objectStoreNames.contains('clients')) {
            const clientStore = db_v.createObjectStore('clients', { keyPath: 'code' });
            clientStore.createIndex('vendorCode', 'vendorCode', { unique: false });
        } else {
            // Se já existe mas não tem o índice (v3 -> v4)
            const transaction = e.target.transaction;
            const clientStore = transaction.objectStore('clients');
            if (!clientStore.indexNames.contains('vendorCode')) {
                clientStore.createIndex('vendorCode', 'vendorCode', { unique: false });
            }
        }
        if (!db_v.objectStoreNames.contains('vendors')) {
            db_v.createObjectStore('vendors', { keyPath: 'code' });
        }
        if (!db_v.objectStoreNames.contains('trash')) {
            db_v.createObjectStore('trash', { keyPath: 'id' });
        }
        if (!db_v.objectStoreNames.contains('settings')) {
            db_v.createObjectStore('settings', { keyPath: 'key' });
        }
    };

    request.onsuccess = (e) => {
        db = e.target.result;
        initVendorSearch(); // Novo: Inicializa busca de vendedores
        loadSettingsFromDB();
    };

    request.onerror = (e) => console.error("Database error:", e.target.error);
}

function loadSettingsFromDB() {
    if (!db) return;
    const transaction = db.transaction(['settings'], 'readonly');
    transaction.objectStore('settings').get('mapConfig').onsuccess = (e) => {
        const config = e.target.result;
        if (config) {
            const showPOI = config.showPOI !== undefined ? config.showPOI : true;
            if (config.style) applyMapStyle(config.style, showPOI);

            const poiToggle = document.getElementById('toggle-poi');
            if (poiToggle) poiToggle.checked = showPOI;
        }
    };
}

// --- FUNÇÕES DE MODAL (GLOBAL) ---
function openInfoModal(title, content) {
    const modalOverlay = document.getElementById('modal-overlay');
    const modalInfo = document.getElementById('modal-info');
    if (!modalInfo) {
        showNotification(`${title}: ${content.replace(/<[^>]+>/g, '')}`, "info");
        return;
    }
    modalOverlay.classList.remove('hidden');
    modalInfo.classList.remove('hidden');
    document.getElementById('info-modal-title').innerText = title;
    document.getElementById('info-modal-body').innerHTML = content;
}

function openFormModal(type, existingData = null) {
    const modalOverlay = document.getElementById('modal-overlay');
    const modalForm = document.getElementById('modal-form');
    const sidebar = document.getElementById('main-sidebar');

    modalOverlay.classList.remove('hidden');
    modalForm.classList.remove('hidden');
    document.getElementById('data-form').reset();
    document.getElementById('form-title').innerText = existingData ? `Editar ${type === 'client' ? 'Cliente' : 'Vendedor'}` : `Cadastrar ${type === 'client' ? 'Cliente' : 'Vendedor'}`;
    document.getElementById('data-form').dataset.type = type;

    if (existingData) {
        Object.keys(existingData).forEach(key => {
            const input = document.querySelector(`#data-form [name="${key}"]`);
            if (input) input.value = existingData[key];
        });
    }
    if (sidebar) sidebar.classList.remove('active');

    setTimeout(() => {
        const addressInput = document.getElementById('address-input');
        if (addressInput && typeof google !== 'undefined') {
            if (window._autocompleteInstance) {
                google.maps.event.clearInstanceListeners(window._autocompleteInstance);
            }
            const autocomplete = new google.maps.places.Autocomplete(addressInput, {
                fields: ['geometry', 'formatted_address', 'address_components'],
                componentRestrictions: { country: 'br' }
            });
            autocomplete.addListener('place_changed', () => {
                const place = autocomplete.getPlace();
                if (place.geometry && place.address_components) {
                    const bairroInput = document.querySelector('[name="bairro"]');
                    const cepInput = document.querySelector('[name="cep"]');
                    if (bairroInput) bairroInput.value = '';
                    if (cepInput) cepInput.value = '';
                    place.address_components.forEach(component => {
                        const types = component.types;
                        if (types.includes('sublocality_level_1') || types.includes('sublocality')) {
                            if (bairroInput) bairroInput.value = component.long_name;
                        }
                        if (types.includes('postal_code')) {
                            if (cepInput) cepInput.value = component.long_name;
                        }
                    });
                }
            });
            window._autocompleteInstance = autocomplete;
        }
    }, 400);
}

function renderDataList(type, filter = '') {
    const modalOverlay = document.getElementById('modal-overlay');
    const sidebar = document.getElementById('main-sidebar');
    const listModal = document.getElementById('modal-list');
    const listContainer = document.getElementById('data-list-container');
    const searchInput = document.getElementById('modal-list-search');

    modalOverlay.classList.remove('hidden');
    listModal.classList.remove('hidden');
    document.getElementById('list-title').innerText = type === 'client' ? 'Gerenciar Clientes' : 'Gerenciar Vendedores';
    listContainer.innerHTML = '<p class="loader-inline">Buscando...</p>';

    const q = filter.toLowerCase();
    const storeName = type === 'client' ? 'clients' : 'vendors';
    const transaction = db.transaction([storeName], 'readonly');
    const store = transaction.objectStore(storeName);
    const results = [];
    const MAX_VISIBLE = 40;

    console.log(`Buscando em ${storeName} com filtro: "${q}"`);

    store.openCursor().onsuccess = (e) => {
        const cursor = e.target.result;
        if (cursor) {
            const item = cursor.value;
            const matches = (item.name && item.name.toLowerCase().includes(q)) ||
                (item.code && String(item.code).toLowerCase().includes(q)) ||
                (item.address && item.address.toLowerCase().includes(q));

            if (matches) results.push(item);

            if (results.length < MAX_VISIBLE) {
                cursor.continue();
            } else {
                finalizeRender();
            }
        } else {
            finalizeRender();
        }
    };

    function finalizeRender() {
        console.log(`Exibindo ${results.length} resultados.`);
        listContainer.innerHTML = results.length ? '' : '<p class="empty-msg">Nenhum registro encontrado.</p>';
        const fragment = document.createDocumentFragment();
        results.forEach(item => {
            const row = document.createElement('div');
            row.className = 'data-row';
            row.innerHTML = `
                <div class="info">
                    <strong>${item.name}</strong>
                    <span>${item.code} | ${item.address || 'Sem endereço'}</span>
                </div>
                <div class="actions">
                    <button onclick="editEntry('${type}', '${item.code}')" class="icon-btn-sm edit"><i data-lucide="edit-3"></i></button>
                    <button onclick="deleteEntry('${type}', '${item.code}')" class="icon-btn-sm delete"><i data-lucide="trash-2"></i></button>
                </div>
            `;
            fragment.appendChild(row);
        });
        listContainer.appendChild(fragment);
        if (window.lucide) lucide.createIcons();
    }

    if (searchInput) {
        searchInput.oninput = (e) => {
            clearTimeout(window.modalSearchTimer);
            window.modalSearchTimer = setTimeout(() => {
                renderDataList(type, e.target.value);
            }, 300);
        };
        if (!filter) searchInput.value = '';
    }

    if (sidebar) sidebar.classList.remove('active');
}

// --- EVENT LISTENERS ---
function setupEventListeners() {
    const sidebar = document.getElementById('main-sidebar');
    const routePanel = document.getElementById('route-panel');
    const modalOverlay = document.getElementById('modal-overlay');

    if (document.getElementById('hamburger-btn')) document.getElementById('hamburger-btn').onclick = () => sidebar.classList.add('active');
    if (document.getElementById('close-sidebar')) document.getElementById('close-sidebar').onclick = () => sidebar.classList.remove('active');

    const minimizeBtn = document.getElementById('minimize-panel');
    if (minimizeBtn) {
        minimizeBtn.onclick = function () {
            routePanel.classList.toggle('minimized');
            const icon = this.querySelector('i');
            const isMinimized = routePanel.classList.contains('minimized');
            // Fechado (minimized) -> Mostra o ícone de Mapa
            // Aberto -> Aponta para a direita para fechar
            icon.setAttribute('data-lucide', isMinimized ? 'map' : 'chevron-right');
            lucide.createIcons();
        };
    }

    if (document.getElementById('btn-clear')) {
        document.getElementById('btn-clear').onclick = async () => {
            if (!await showConfirmModal("Limpar Roteiro", "Deseja limpar o roteiro atual?")) return;
            activeWaypoints = [];
            updateWaypointsUI();
            if (directionsRenderer) directionsRenderer.setDirections({ routes: [] });
            document.getElementById('route-summary').classList.add('hidden');
        };
    }

    if (document.getElementById('add-waypoint-btn')) {
        document.getElementById('add-waypoint-btn').onclick = () => {
            if (activeWaypoints.length >= MAPS_FREE_LIMIT) {
                return showNotification(`Limite de ${MAPS_FREE_LIMIT} clientes atingido para evitar cobranças de API.`, "warning");
            }
            openAddClientModal();
        };
    }

    if (document.getElementById('btn-sync-context')) {
        document.getElementById('btn-sync-context').onclick = () => {
            const date = document.getElementById('context-date-picker').value;
            if (!date) return showNotification("Selecione uma data primeiro.", "warning");
            // Abre o modal de sync já com a data preenchida
            const modalSap = document.getElementById('modal-sap');
            const modalOverlay = document.getElementById('modal-overlay');
            document.getElementById('sap-sync-date').value = date;
            modalOverlay.classList.remove('hidden');
            modalSap.classList.remove('hidden');
        };
    }


    document.querySelectorAll('.close-modal').forEach(btn => {
        btn.onclick = () => {
            modalOverlay.classList.add('hidden');
            document.querySelectorAll('.modal-content').forEach(m => m.classList.add('hidden'));
        };
    });

    const importBtn = document.querySelector('[data-action="import"]');
    if (importBtn) {
        importBtn.onclick = () => {
            modalOverlay.classList.remove('hidden');
            document.getElementById('modal-import').classList.remove('hidden');
            sidebar.classList.remove('active');
        };
    }

    if (document.querySelector('[data-action="analyze-proximity"]')) {
        document.querySelector('[data-action="analyze-proximity"]').onclick = () => {
            openProximityModal();
            sidebar.classList.remove('active');
        };
    }

    if (document.querySelector('[data-page="clients"]')) document.querySelector('[data-page="clients"]').onclick = () => renderDataList('client');
    if (document.querySelector('[data-page="vendors"]')) document.querySelector('[data-page="vendors"]').onclick = () => renderDataList('vendor');

    if (document.querySelector('[data-page="history"]')) {
        document.querySelector('[data-page="history"]').onclick = () => {
            showNotification("O histórico de rotas aparecerá em breve.", "info");
            sidebar.classList.remove('active');
        };
    }

    if (document.getElementById('nav-dashboard')) {
        document.getElementById('nav-dashboard').onclick = () => {
            renderDashboard();
            sidebar.classList.remove('active');
        };
    }

    if (document.querySelector('[data-page="trash"]')) {
        document.querySelector('[data-page="trash"]').onclick = () => {
            renderTrashList();
            sidebar.classList.remove('active');
        };
    }

    if (document.querySelector('[data-page="settings"]')) {
        document.querySelector('[data-page="settings"]').onclick = () => {
            openSettingsModal();
            sidebar.classList.remove('active');
        };
    }

    if (document.querySelector('[data-action="open-messages"]')) {
        document.querySelector('[data-action="open-messages"]').onclick = () => {
            openMessagesModal();
            sidebar.classList.remove('active');
        };
    }

    // Monitoramento Seletivo
    const monitorBtn = document.querySelector('[data-action="monitor-vendedor"]');
    if (monitorBtn) {
        monitorBtn.onclick = () => {
            sidebar.classList.remove('active');
            openMonitorSelection();
        };
    }

    const btnStopMonitor = document.getElementById('btn-stop-monitor');
    if (btnStopMonitor) {
        btnStopMonitor.onclick = stopMonitoringVendedor;
    }

    if (document.getElementById('btn-stop-simulation')) {
        document.getElementById('btn-stop-simulation').onclick = stopLiveSimulation;
    }

    if (document.getElementById('btn-assign-route')) {
        document.getElementById('btn-assign-route').onclick = assignRouteToFirebase;
    }

    if (document.getElementById('btn-reset-simulation')) {
        document.getElementById('btn-reset-simulation').onclick = resetLiveSimulation;
    }

    if (document.getElementById('btn-new-entry')) {
        document.getElementById('btn-new-entry').onclick = () => {
            const title = document.getElementById('list-title').innerText;
            const type = title.toLowerCase().includes('cliente') ? 'client' : 'vendor';
            document.getElementById('modal-list').classList.add('hidden');
            openFormModal(type);
        };
    }

    if (document.getElementById('btn-empty-trash')) document.getElementById('btn-empty-trash').onclick = emptyTrash;

    if (document.getElementById('inbox-chat-input')) {
        let typingTimeout;
        document.getElementById('inbox-chat-input').oninput = () => {
            if (!activeChatVendorId) return;
            database.ref(`typing/${activeChatVendorId}/admin`).set(true);
            clearTimeout(typingTimeout);
            typingTimeout = setTimeout(() => {
                database.ref(`typing/${activeChatVendorId}/admin`).set(false);
            }, 3000);
        };
    }

    if (document.getElementById('profile-btn')) {
        document.getElementById('profile-btn').onclick = () => {
            showNotification("Administrador UniRotas", "success");
        };
    }

    if (document.getElementById('data-form')) {
        document.getElementById('data-form').onsubmit = (e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            const data = Object.fromEntries(formData.entries());
            const type = e.target.dataset.type;
            saveSingleEntry(type, data);
        };
    }

    const searchInput = document.getElementById('global-search');
    // Busca global pausada para manutenção
    /*
    if (searchInput) {
        searchInput.oninput = (e) => {
            clearTimeout(searchInput.timeout);
            searchInput.timeout = setTimeout(() => handleSearch(e.target.value), 300);
        };
    }
    */

    const modalSearchInput = document.getElementById('search-select-client');
    if (modalSearchInput) {
        modalSearchInput.oninput = (e) => {
            renderSelectClientList(e.target.value);
        };
    }


    document.addEventListener('click', (e) => {
        if (!e.target.closest('.search-section')) removeSearchResults();
    });

    if (document.getElementById('btn-optimize')) document.getElementById('btn-optimize').onclick = optimizeRoute;

    // Configurações e Estilo do Mapa
    document.querySelectorAll('.style-btn').forEach(btn => {
        btn.onclick = function () {
            document.querySelectorAll('.style-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            applyMapStyle(this.dataset.style);
        };
    });

    // Travel Mode Toggle
    document.querySelectorAll('.mode-btn').forEach(btn => {
        btn.onclick = function () {
            document.querySelectorAll('.mode-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            if (activeWaypoints.length > 0) optimizeRoute(); // Re-calcula se mudar o modo
        };
    });

    // Eventos SAP Sync
    if (document.querySelector('.nav-sync')) {
        document.querySelector('.nav-sync').onclick = () => {
            const modalOverlay = document.getElementById('modal-overlay');
            const modalSap = document.getElementById('modal-sap');
            modalOverlay.classList.remove('hidden');
            modalSap.classList.remove('hidden');

            // O Flatpickr já cuida da data se inicializado globalmente
        };
    }

    if (document.getElementById('btn-do-sync-sap')) {
        document.getElementById('btn-do-sync-sap').onclick = syncFromSAP;
    }

    if (document.getElementById('btn-save-settings')) {
        document.getElementById('btn-save-settings').onclick = saveSettings;
    }
}


// --- FUNÇÕES GLOBAIS DE DADOS ---
window.deleteEntry = async (type, code) => {
    if (!await showConfirmModal("Mover para Lixeira", `Deseja mover este ${type === 'client' ? 'cliente' : 'vendedor'} para a lixeira?`)) return;
    const storeName = type === 'client' ? 'clients' : 'vendors';
    const transaction = db.transaction([storeName, 'trash'], 'readwrite');
    transaction.objectStore(storeName).get(code).onsuccess = (e) => {
        const item = e.target.result;
        if (item) {
            const trashItem = {
                ...item,
                _originalStore: storeName,
                _deletedAt: new Date().toISOString(),
                id: `${storeName}_${code}`
            };
            transaction.objectStore('trash').put(trashItem).onsuccess = () => {
                transaction.objectStore(storeName).delete(code).onsuccess = () => {
                    renderDataList(type);
                    loadDataToUI();
                };
            };
        }
    };
};

window.editEntry = (type, code) => {
    const storeName = type === 'client' ? 'clients' : 'vendors';
    db.transaction([storeName], 'readonly').objectStore(storeName).get(code).onsuccess = (e) => {
        const data = e.target.result;
        document.getElementById('modal-list').classList.add('hidden');
        openFormModal(type, data);
    };
};

window.renderTrashList = () => {
    const modalTrash = document.getElementById('modal-trash');
    const modalOverlay = document.getElementById('modal-overlay');
    const container = document.getElementById('trash-list-container');
    if (!modalTrash) return;

    modalOverlay.classList.remove('hidden');
    modalTrash.classList.remove('hidden');
    container.innerHTML = '<p class="loader-inline">Carregando...</p>';

    const transaction = db.transaction(['trash'], 'readonly');
    const store = transaction.objectStore('trash');
    const all = [];

    store.openCursor().onsuccess = (e) => {
        const cursor = e.target.result;
        if (cursor) {
            all.push(cursor.value);
            cursor.continue();
        } else {
            container.innerHTML = all.length ? '' : '<p class="empty-msg">A lixeira está vazia.</p>';
            all.forEach(item => {
                const row = document.createElement('div');
                row.className = 'data-row trash-row';
                row.innerHTML = `
                    <div class="info">
                        <strong>${item.name}</strong>
                        <span>${item.code} | ${item._originalStore === 'clients' ? 'Cliente' : 'Vendedor'}</span>
                        <small>Excluído em: ${new Date(item._deletedAt).toLocaleString()}</small>
                    </div>
                    <div class="actions">
                        <button onclick="restoreEntry('${item.id}')" class="icon-btn-sm edit" title="Restaurar"><i data-lucide="rotate-ccw"></i></button>
                        <button onclick="permanentDelete('${item.id}')" class="icon-btn-sm delete" title="Excluir Definitivamente"><i data-lucide="trash-2"></i></button>
                    </div>
                `;
                container.appendChild(row);
            });
            lucide.createIcons();
        }
    };
};

window.restoreEntry = (trashId) => {
    const transaction = db.transaction(['trash', 'clients', 'vendors'], 'readwrite');
    const trashStore = transaction.objectStore('trash');

    trashStore.get(trashId).onsuccess = (e) => {
        const item = e.target.result;
        if (item) {
            const targetStoreName = item._originalStore;
            const sourceData = { ...item };
            delete sourceData._originalStore;
            delete sourceData._deletedAt;
            delete sourceData.id;

            transaction.objectStore(targetStoreName).put(sourceData).onsuccess = () => {
                trashStore.delete(trashId).onsuccess = () => {
                    renderTrashList();
                    loadDataToUI();
                };
            };
        }
    };
};

window.permanentDelete = async (trashId) => {
    if (!await showConfirmModal("Excluir Permanentemente", "Deseja excluir este item definitivamente? Não será possível recuperar.")) return;
    const transaction = db.transaction(['trash'], 'readwrite');
    transaction.objectStore('trash').delete(trashId).onsuccess = () => {
        renderTrashList();
    };
};

async function emptyTrash() {
    if (!await showConfirmModal("Esvaziar Lixeira", "Deseja esvaziar TODA a lixeira? Esta ação é irreversível.")) return;
    const transaction = db.transaction(['trash'], 'readwrite');
    transaction.objectStore('trash').clear().onsuccess = () => {
        renderTrashList();
    };
}

function loadDataToUI() {
    const vendorSelect = document.getElementById('select-vendor');
    if (!vendorSelect) return;
    const transaction = db.transaction(['vendors'], 'readonly');
    const store = transaction.objectStore('vendors');

    vendorSelect.innerHTML = '<option value="">Selecione um vendedor...</option>';
    store.openCursor().onsuccess = (e) => {
        const cursor = e.target.result;
        if (cursor) {
            const v = cursor.value;
            const option = new Option(`${v.code} - ${v.name}`, v.code);
            vendorSelect.add(option);
            cursor.continue();
        }
    };
}

function saveSingleEntry(type, data) {
    const storeName = type === 'client' ? 'clients' : 'vendors';
    const transaction = db.transaction([storeName], 'readwrite');
    const store = transaction.objectStore(storeName);

    store.put(data).onsuccess = () => {
        showNotification(`${type === 'client' ? 'Cliente' : 'Vendedor'} salvo com sucesso!`, "success");
        document.getElementById('modal-overlay').classList.add('hidden');
        document.getElementById('modal-form').classList.add('hidden');
        loadDataToUI();
        const modalList = document.getElementById('modal-list');
        if (modalList && !modalList.classList.contains('hidden')) {
            renderDataList(type);
        }
    };
}

// --- LOGICA DE ROTA E SELEÇÃO ---

function openAddClientModal() {
    const modalOverlay = document.getElementById('modal-overlay');
    const modalSelect = document.getElementById('modal-select-client');
    const searchInput = document.getElementById('search-select-client');

    modalOverlay.classList.remove('hidden');
    modalSelect.classList.remove('hidden');
    if (searchInput) {
        searchInput.value = '';
        searchInput.focus();
    }
    renderSelectClientList();
}

function renderSelectClientList(filter = '') {
    const container = document.getElementById('select-client-container');
    if (!container) return;

    container.innerHTML = '<p class="loader-inline">Carregando...</p>';
    const q = filter.toLowerCase();

    const transaction = db.transaction(['clients'], 'readonly');
    const store = transaction.objectStore('clients');
    const results = [];

    store.openCursor().onsuccess = (e) => {
        const cursor = e.target.result;
        if (cursor) {
            const c = cursor.value;
            if ((c.name && c.name.toLowerCase().includes(q)) || (c.code && String(c.code).toLowerCase().includes(q))) {
                results.push(c);
            }
            cursor.continue();
        } else {
            container.innerHTML = results.length ? '' : '<p class="empty-msg">Nenhum cliente disponível.</p>';
            results.forEach(item => {
                const row = document.createElement('div');
                row.className = 'data-row';
                const isAlreadyAdded = activeWaypoints.some(w => w.code === item.code);

                row.innerHTML = `
                    <div class="info">
                        <strong>${item.name}</strong>
                        <span>${item.code} | ${item.address || 'Sem endereço'}</span>
                    </div>
                    <div class="actions">
                        <button class="add-route-btn" ${isAlreadyAdded ? 'disabled style="opacity:0.5; cursor:not-allowed;"' : `onclick="addClientToRouteFromModal('${item.code}')"`}>
                            <i data-lucide="${isAlreadyAdded ? 'check' : 'plus'}"></i>
                            ${isAlreadyAdded ? 'Adicionado' : 'Adicionar'}
                        </button>
                    </div>
                `;
                container.appendChild(row);
            });
            lucide.createIcons();
        }
    };
}

window.addClientToRouteFromModal = (code) => {
    const transaction = db.transaction(['clients'], 'readonly');
    transaction.objectStore('clients').get(code).onsuccess = (e) => {
        const client = e.target.result;
        if (client) {
            addClientToRoute(client);
            renderSelectClientList(document.getElementById('search-select-client').value);
        }
    };
}


function addClientToRoute(client) {
    if (activeWaypoints.find(w => w.code === client.code)) return;
    activeWaypoints.push(client);
    updateWaypointsUI();
}

function setVendorAsOrigin(vendor) {
    const select = document.getElementById('select-vendor');
    if (select) select.value = vendor.code;
    updateWaypointsUI();
}

function updateWaypointsUI() {
    const list = document.getElementById('waypoints-list');
    if (!list) return;

    list.innerHTML = '';

    // Pegar localização do vendedor selecionado para o cálculo de 200m
    const vendorId = document.getElementById('select-vendor').value;
    let vendorCoords = null;

    // Helper para processar a lista após buscar o vendedor
    const processList = (vCoords) => {
        let hasRemoto = false;

        activeWaypoints.forEach((wp, idx) => {
            const item = document.createElement('div');
            item.className = 'waypoint-item';

            const hasCoords = wp.lat && wp.lng;
            let statusClass = 'remoto';
            let statusText = 'Não Presencial';
            let distFound = null;

            if (hasCoords && vCoords) {
                const dist = haversineDistance(vCoords, { lat: wp.lat, lng: wp.lng });
                distFound = dist;
                if (dist > 200) {
                    statusClass = 'presencial';
                    statusText = 'Presencial (>200m)';
                } else {
                    statusClass = 'remoto';
                    statusText = 'Remoto (Dentro do Raio)';
                    hasRemoto = true;
                }
            } else if (!hasCoords) {
                statusClass = 'remoto';
                statusText = 'Sem Coordenadas';
                hasRemoto = true;
            }

            item.innerHTML = `
                <div class="wp-number">${idx + 1}</div>
                <div class="wp-info">
                    <div class="wp-row">
                        <strong>${wp.name}</strong>
                        ${wp.seqSAP ? `<small class="sap-seq">SAP: ${wp.seqSAP}</small>` : ''}
                    </div>
                    <small>${wp.address || 'Sem endereço'}</small>
                    <div class="wp-meta">
                        <span class="status-tag ${statusClass}">${statusText}</span>
                        ${distFound !== null ? `<span class="dist-tag">${(distFound).toFixed(0)}m</span>` : ''}
                        <span class="id-tag">ID: ${wp.code}</span>
                    </div>
                </div>
                <button class="remove-wp" onclick="removeWaypoint('${wp.code}')"><i data-lucide="trash-2"></i></button>
            `;
            list.appendChild(item);
        });

        // Mostrar aviso se houver remotos
        const warningArea = document.getElementById('route-warning-area');
        if (warningArea) {
            if (hasRemoto) {
                warningArea.innerHTML = `
                    <div class="alert alert-warning">
                        <i data-lucide="alert-triangle"></i>
                        <span>Erro, existe clientes remotos na lista, remova para prosseguir</span>
                    </div>
                `;
                warningArea.classList.remove('hidden');
            } else {
                warningArea.classList.add('hidden');
            }
        }

        lucide.createIcons();
    };

    if (vendorId && db) {
        const trans = db.transaction(['vendors'], 'readonly');
        store = trans.objectStore('vendors');
        store.get(String(vendorId)).onsuccess = (e) => {
            const v = e.target.result;
            if (v && v.lat && v.lng) {
                vendorCoords = { lat: v.lat, lng: v.lng };
            }
            processList(vendorCoords);
        };
    } else {
        processList(null);
    }
}

window.removeWaypoint = (code) => {
    activeWaypoints = activeWaypoints.filter(w => w.code !== code);
    updateWaypointsUI();
};

async function optimizeRoute() {
    const vendorCode = document.getElementById('select-vendor').value;
    if (!vendorCode) return showNotification("Selecione um vendedor de partida!", "warning");
    if (activeWaypoints.length === 0) return showNotification("Adicione pelo menos um cliente para a rota!", "warning");

    if (activeWaypoints.length > 23) {
        return showNotification("Máximo de 23 clientes permitido.", "error");
    }

    const transaction = db.transaction(['vendors'], 'readonly');
    transaction.objectStore('vendors').get(vendorCode).onsuccess = (e) => {
        const vendor = e.target.result;
        if (!vendor || (!vendor.lat && !vendor.address)) return showNotification("Vendedor sem endereço cadastrado!", "error");
        calculateAndDisplayRoute(vendor, activeWaypoints);
    };
}

async function calculateAndDisplayRoute(origin, waypoints) {
    // Limpar marcadores anteriores
    markers.forEach(m => m.setMap(null));
    markers = [];
    const originPos = origin.lat ? { lat: origin.lat, lng: origin.lng } : origin.address;
    const googleWaypoints = waypoints.map(wp => ({
        location: wp.lat ? { lat: wp.lat, lng: wp.lng } : wp.address,
        stopover: true
    }));

    const activeModeBtn = document.querySelector('.mode-btn.active');
    const selectedMode = activeModeBtn ? activeModeBtn.dataset.mode : 'DRIVING';

    // O Modo "TWO_WHEELER" (Moto) não é nativo da API JS padrão.
    // Usaremos DRIVING com drivingOptions para simular a melhor rota.
    const googleMode = (selectedMode === 'TWO_WHEELER') ? google.maps.TravelMode.DRIVING : google.maps.TravelMode[selectedMode];

    const request = {
        origin: originPos,
        destination: originPos,
        waypoints: googleWaypoints,
        optimizeWaypoints: true,
        travelMode: googleMode,
        drivingOptions: {
            departureTime: new Date(),
            trafficModel: 'pessimistic' // Mudando para pessimista para ser mais realista com o trânsito pesado
        }
    };

    directionsService.route(request, (result, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
            directionsRenderer.setDirections(result);
            const route = result.routes[0];

            // --- CRIAR MARCADORES PERSONALIZADOS ---
            // 1. Vendedor (Origem)
            const vendorMarker = new google.maps.Marker({
                position: route.legs[0].start_location,
                map: map,
                title: `Vendedor: ${origin.name}\nEndereço: ${origin.address}`,
                icon: {
                    path: "M10,20V14H14V20H19V12H22L12,3L2,12H5V20H10Z",
                    fillColor: "#8B0000", // Vermelho Escuro
                    fillOpacity: 1,
                    strokeColor: "#fff",
                    strokeWeight: 1,
                    scale: 1.5,
                    anchor: new google.maps.Point(12, 12)
                }
            });
            markers.push(vendorMarker);

            // 2. Clientes (Waypoints)
            route.legs.forEach((leg, index) => {
                if (index < route.legs.length - 1) {
                    const waypointIndex = route.waypoint_order[index];
                    const client = waypoints[waypointIndex];

                    const clientMarker = new google.maps.Marker({
                        position: leg.end_location,
                        map: map,
                        title: `Cliente: ${client.name}\nEndereço: ${client.address}`,
                        icon: {
                            path: "M12,2C8.13,2,5,5.13,5,9c0,5.25,7,13,7,13s7-7.75,7-13C19,5.13,15.87,2,12,2z M12,11.5c-1.38,0-2.5-1.12-2.5-2.5s1.12-2.5,2.5-2.5s2.5,1.12,2.5,2.5S13.38,11.5,12,11.5z",
                            fillColor: "#FFD700", // Dourado (Gold)
                            fillOpacity: 1,
                            strokeColor: "#000",
                            strokeWeight: 1,
                            scale: 1.2,
                            anchor: new google.maps.Point(12, 22)
                        }
                    });
                    markers.push(clientMarker);
                }
            });

            let totalDist = 0;
            let totalTime = 0;
            route.legs.forEach(leg => {
                totalDist += leg.distance.value;
                totalTime += leg.duration.value;
            });
            const summary = document.getElementById('route-summary');
            if (summary) {
                summary.classList.remove('hidden');

                // Mostrar botão de envio
                const btnAssign = document.getElementById('btn-assign-route');
                if (btnAssign) btnAssign.classList.remove('hidden');

                // Distância total
                document.getElementById('route-dist').innerText = (totalDist / 1000).toFixed(2) + " km";

                // Tempo Estimado (Considerando trânsito se disponível)
                let durationText = "";
                let totalDurationValue = 0;

                route.legs.forEach(leg => {
                    // leg.duration_in_traffic é onde o Google retorna o tempo real
                    totalDurationValue += (leg.duration_in_traffic ? leg.duration_in_traffic.value : leg.duration.value);
                });

                let finalMinutes = Math.round(totalDurationValue / 60);

                // Ajuste visual para Moto (já que a API não fornece o tempo de moto real, 
                // reduzimos levemente a estimativa pois motos evitam congestionamentos melhor)
                if (selectedMode === 'TWO_WHEELER') {
                    finalMinutes = Math.round(finalMinutes * 0.85);
                }

                const hours = Math.floor(finalMinutes / 60);
                const mins = finalMinutes % 60;
                let finalTimeText = hours > 0 ? `${hours}h ${mins}min` : `${mins}min`;

                document.getElementById('route-time').innerText = finalTimeText;

                // --- NOVO: COMPARAÇÃO SAP VS REAL & REEMBOLSO ---
                renderDashboardSummary(totalDist, selectedMode);
            }
            reorderWaypoints(route.waypoint_order);
        } else {
            showNotification("Falha ao calcular rota: " + status, "error");
        }
    });
}

function renderDashboardSummary(totalDistMeters, mode) {
    const summaryDiv = document.getElementById('route-summary');
    if (!summaryDiv) return;

    const totalKM = totalDistMeters / 1000;
    const rate = (mode === 'TWO_WHEELER') ? 0.40 : 0.90;
    const reimbursement = totalKM * rate;

    // KM Previsto acumulado dos clientes na rota
    const totalKMPrevSAP = activeWaypoints.reduce((acc, wp) => acc + (wp.kmPrev || 0), 0);

    // Remove comparação anterior se existir
    const oldExtra = summaryDiv.querySelector('.summary-comparison');
    if (oldExtra) oldExtra.remove();

    const comparisonHTML = `
        <div class="summary-comparison">
            <div class="comp-row">
                <span class="label">SAP (Prev):</span>
                <span class="val">${totalKMPrevSAP.toFixed(2)} km</span>
            </div>
            <div class="comp-row">
                <span class="label">Diferença:</span>
                <span class="val" style="color: ${Math.abs(totalKM - totalKMPrevSAP) > 5 ? '#e74c3c' : '#2ecc71'}">
                    ${(totalKM - totalKMPrevSAP).toFixed(2)} km
                </span>
            </div>
            <div class="reimbursement-tag">
                <i data-lucide="dollar-sign"></i> 
                Reembolso: <strong>R$ ${reimbursement.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</strong>
                <small>(${mode === 'TWO_WHEELER' ? 'Moto' : 'Carro'})</small>
            </div>
        </div>
    `;

    summaryDiv.insertAdjacentHTML('beforeend', comparisonHTML);
    lucide.createIcons();
}

async function assignRouteToFirebase() {
    if (activeWaypoints.length === 0) return;

    const snapshot = await database.ref('vendedores').once('value');
    const onlineVendors = snapshot.val();

    if (!onlineVendors) {
        return showNotification("Nenhum vendedor online no momento.", "warning");
    }

    const modal = document.getElementById('modal-select-vendor-assign');
    const overlay = document.getElementById('modal-overlay');
    const listContainer = document.getElementById('vendor-assign-list');

    listContainer.innerHTML = '';

    Object.keys(onlineVendors).forEach(id => {
        const v = onlineVendors[id];
        const row = document.createElement('div');
        row.className = 'data-row';
        row.style.cursor = 'pointer';
        row.innerHTML = `
            <div class="info">
                <strong>${v.name}</strong>
                <span>ID: ${id}</span>
            </div>
            <i data-lucide="chevron-right"></i>
        `;
        row.onclick = async () => {
            modal.classList.add('hidden');
            overlay.classList.add('hidden');

            try {
                await database.ref('vendedores/' + id + '/rota').set({
                    waypoints: activeWaypoints,
                    timestamp: ServerValue.TIMESTAMP,
                    optimized: true
                });
                showNotification(`Rota enviada para ${v.name}!`, "success");
            } catch (err) {
                showNotification("Erro ao enviar: " + err.message, "error");
            }
        };
        listContainer.appendChild(row);
    });

    overlay.classList.remove('hidden');
    modal.classList.remove('hidden');
    lucide.createIcons({ root: listContainer });
}

function reorderWaypoints(order) {
    console.log("Reordenando roteiro otimizado:", order);
    const newOrder = order.map(idx => activeWaypoints[idx]);
    activeWaypoints = newOrder;
    updateWaypointsUI();

    // Feedback visual de otimização
    const list = document.getElementById('waypoints-list');
    if (list) {
        list.style.transition = 'all 0.5s ease';
        list.style.transform = 'scale(1.02)';
        setTimeout(() => list.style.transform = 'scale(1)', 500);
    }
}

// --- FUNÇÕES DE CONFIGURAÇÃO ---
function openSettingsModal() {
    const modalOverlay = document.getElementById('modal-overlay');
    const modalSettings = document.getElementById('modal-settings');
    modalOverlay.classList.remove('hidden');
    modalSettings.classList.remove('hidden');

    // Carregar configurações atuais do DB
    const transaction = db.transaction(['settings'], 'readonly');
    transaction.objectStore('settings').get('mapConfig').onsuccess = (e) => {
        const config = e.target.result;
        if (config) {
            const showPOI = config.showPOI !== undefined ? config.showPOI : true;
            if (config.style) {
                document.querySelectorAll('.style-btn').forEach(btn => {
                    btn.classList.toggle('active', btn.dataset.style === config.style);
                });
                applyMapStyle(config.style, showPOI);
            }
            const poiToggle = document.getElementById('toggle-poi');
            if (poiToggle) poiToggle.checked = showPOI;
        }
    };
}

function applyMapStyle(styleName, showPOI = true) {
    if (!map) return;

    if (styleName === 'satellite') {
        map.setMapTypeId(google.maps.MapTypeId.SATELLITE);
    } else {
        map.setMapTypeId(google.maps.MapTypeId.ROADMAP);
        let style = [...(mapStyles[styleName] || mapStyles.dark)];

        if (!showPOI) {
            style.push({
                featureType: "poi",
                elementType: "labels",
                stylers: [{ visibility: "off" }]
            });
        }

        map.setOptions({ styles: style });
    }
}

async function syncFromSAP() {
    const dateInput = document.getElementById('sap-sync-date');
    const statusDiv = document.getElementById('sap-sync-status');
    const btnSync = document.getElementById('btn-do-sync-sap');

    if (!dateInput || !dateInput.value) return alert("Selecione uma data ou período para sincronizar!");

    // flatpickr modo range retorna "YYYY-MM-DD" ou "YYYY-MM-DD to YYYY-MM-DD"
    const dates = dateInput.value.split(" to ");
    const startDate = dates[0];
    const endDate = dates[1] || dates[0]; // se escolheu 1 dia, start e end sao iguais

    const sapUser = document.getElementById('sap-sync-user')?.value || '';
    const sapPass = document.getElementById('sap-sync-pass')?.value || '';

    statusDiv.classList.remove('hidden');
    btnSync.disabled = true;

    try {
        const url = `http://127.0.0.1:5000/sync-sap?start=${startDate}&end=${endDate}&user=${encodeURIComponent(sapUser)}&pass=${encodeURIComponent(sapPass)}`;
        const response = await fetch(url);

        if (!response.ok) {
            const errorBody = await response.json().catch(() => ({}));
            throw new Error(errorBody.error || "A ponte Python respondeu com erro ou o SAP está fora do ar.");
        }

        const data = await response.json();
        const results = data.d?.results || [];

        if (results.length === 0) {
            showNotification("Nenhum dado encontrado no SAP para esta data.", "info");
            btnSync.disabled = false;
            statusDiv.classList.add('hidden');
            return;
        }

        // --- SALVAR CREDENCIAIS SE SUCESSO ---
        localStorage.setItem('sap_saved_user', sapUser);
        localStorage.setItem('sap_saved_pass', sapPass);

        console.log(`Iniciando processamento de ${results.length} registros...`);

        // --- MOTOR DE SINCRONIZAÇÃO EM CHUNKS (BAIXO IMPACTO NA UI) ---
        const CHUNK_SIZE = 500;
        let index = 0;
        let clientsCount = 0;
        let vendorsCount = 0;

        const processChunk = () => {
            const chunk = results.slice(index, index + CHUNK_SIZE);
            if (chunk.length === 0) {
                finalizeSync(clientsCount, vendorsCount);
                return;
            }

            const transaction = db.transaction(['clients', 'vendors'], 'readwrite');
            const clientStore = transaction.objectStore('clients');
            const vendorStore = transaction.objectStore('vendors');

            chunk.forEach(item => {
                const rawClientCode = item.ID_Cliente || item.Kunnr || item.ID_Cl1;
                const rawVendorCode = item.ID_Vendedor || item.Lifnr || item.ID_Vend;

                const clientCode = formatID(rawClientCode);
                const vendorCode = formatID(rawVendorCode);

                if (clientCode) {
                    clientStore.put({
                        code: String(clientCode),
                        name: item.NomeCliente || item.Name1 || ("Cliente " + clientCode),
                        address: (item.Rua || "") + ", " + (item.CidadeCli || "") + " - " + (item.UF_Cli || ""),
                        lat: parseFloat(item.Latitude_Cli || item.Latitude_Cl1) || null,
                        lng: parseFloat(item.Longitude_Cli || item.Longitude_Cl1) || null,
                        vendorCode: vendorCode || null,
                        kmPrev: parseFloat(item.KM_Prev) || 0, // KM do SAP
                        seqSAP: item.Sequencia || 99,
                        updatedAt: new Date().toISOString()
                    });
                    clientsCount++;
                }

                if (vendorCode) {
                    vendorStore.put({
                        code: String(vendorCode),
                        name: item.NomeVendedor || item.NameV_Vend || ("Vendedor " + vendorCode),
                        address: (item.BairroVendedor || "") + ", " + (item.CidadeVendedor || "") + " - " + (item.UF_Vend || ""),
                        lat: parseFloat(item.Lat_Vend) || null,
                        lng: parseFloat(item.Lon_Vend) || null,
                        updatedAt: new Date().toISOString()
                    });
                    vendorsCount++;
                }
            });

            index += CHUNK_SIZE;
            const progress = Math.round((index / results.length) * 100);
            const statusMsg = document.querySelector('.status-msg');
            if (statusMsg) statusMsg.innerHTML = `Processando: ${progress}% (${index}/${results.length})`;

            transaction.oncomplete = () => {
                // Próximo bloco no próximo tick para não travar a UI
                setTimeout(processChunk, 0);
            };
            transaction.onerror = (e) => console.error("Erro no chunk:", e.target.error);
        };

        const finalizeSync = (cc, vc) => {
            console.log(`Sync Finalizado: ${cc} clientes, ${vc} vendedores.`);
            showNotification(`Sincronização concluída! ${cc} clientes e ${vc} vendedores atualizados.`, "success");
            statusDiv.classList.add('hidden');
            btnSync.disabled = false;
            document.getElementById('modal-overlay').classList.add('hidden');
            document.getElementById('modal-sap').classList.add('hidden');
            initVendorSearch(); // Atualiza a busca de vendedores
        };

        processChunk();

    } catch (err) {
        console.error(err);
        showNotification("Erro na sincronização: " + err.message, "error");
        statusDiv.classList.add('hidden');
        btnSync.disabled = false;
    }
}

// --- NOVO MOTOR DE BUSCA DE VENDEDOR (ALTA PERFORMANCE) ---
function initVendorSearch() {
    const input = document.getElementById('vendor-search-input');
    const resultsDiv = document.getElementById('vendor-search-results');
    const hiddenInput = document.getElementById('select-vendor');

    if (!input || !resultsDiv) return;

    let timer;
    input.oninput = (e) => {
        const val = e.target.value;
        clearTimeout(timer);
        if (val.length < 1) {
            resultsDiv.classList.add('hidden');
            return;
        }
        timer = setTimeout(() => searchVendors(val), 200);
    };

    // Fechar ao clicar fora
    document.addEventListener('click', (e) => {
        if (!e.target.closest('#vendor-search-container')) {
            resultsDiv.classList.add('hidden');
        }
    });
}

function searchVendors(query) {
    const resultsDiv = document.getElementById('vendor-search-results');
    resultsDiv.innerHTML = '<p class="loader-inline">Buscando...</p>';
    resultsDiv.classList.remove('hidden');

    const q = query.toLowerCase();
    const transaction = db.transaction(['vendors'], 'readonly');
    const store = transaction.objectStore('vendors');
    const matches = [];
    const LIMIT = 15;

    store.openCursor().onsuccess = (e) => {
        const cursor = e.target.result;
        if (cursor && matches.length < LIMIT) {
            const v = cursor.value;
            if ((v.name && v.name.toLowerCase().includes(q)) || (v.code && String(v.code).toLowerCase().includes(q))) {
                matches.push(v);
            }
            cursor.continue();
        } else {
            renderVendorResults(matches);
        }
    };
}

function renderVendorResults(matches) {
    const resultsDiv = document.getElementById('vendor-search-results');
    const input = document.getElementById('vendor-search-input');
    const hiddenInput = document.getElementById('select-vendor');

    if (matches.length === 0) {
        resultsDiv.innerHTML = '<p class="empty-msg">Nenhum vendedor encontrado.</p>';
        return;
    }

    resultsDiv.innerHTML = '';
    matches.forEach(v => {
        const item = document.createElement('div');
        item.className = 'search-result-item';
        const displayCode = formatID(v.code);
        item.innerHTML = `
            <span class="vendor-name">${displayCode} - ${v.name}</span>
            <span class="vendor-meta">${v.address || 'Sem endereço'}</span>
        `;
        item.onclick = () => {
            input.value = `${displayCode} - ${v.name}`;
            hiddenInput.value = v.code; // Mantemos o code original para lookup no DB
            resultsDiv.classList.add('hidden');
            // Trigger visual de seleção
            input.style.borderColor = 'var(--accent-cyan)';
            setTimeout(() => input.style.borderColor = '', 1000);

            // AUTOMATO: Carregar clientes deste vendedor
            loadClientsForVendor(v.code);
        };
        resultsDiv.appendChild(item);
    });
}

function loadClientsForVendor(vendorCode) {
    console.log(`Carregando clientes para o vendedor: ${vendorCode}`);
    activeWaypoints = []; // Limpa rota anterior
    updateWaypointsUI();

    const transaction = db.transaction(['clients'], 'readonly');
    const store = transaction.objectStore('clients');
    const index = store.index('vendorCode');
    const request = index.getAll(String(vendorCode));

    request.onsuccess = (e) => {
        const clients = e.target.result;
        // Ordenar pela sequência original do SAP
        clients.sort((a, b) => (a.seqSAP || 0) - (b.seqSAP || 0));

        console.log(`${clients.length} clientes encontrados.`);

        if (clients.length > 0) {
            clients.forEach(c => {
                activeWaypoints.push(c);
            });
            updateWaypointsUI();

            // Notificação visual rápida
            const list = document.getElementById('waypoints-list');
            if (list) {
                const toast = document.createElement('div');
                toast.className = 'empty-msg';
                toast.style.color = 'var(--accent-cyan)';
                toast.innerText = `${clients.length} clientes carregados automaticamente!`;
                list.prepend(toast);
                setTimeout(() => toast.remove(), 3000);
            }
        }
    };
}

function renderDashboard() {
    const modalOverlay = document.getElementById('modal-overlay');
    const modalDash = document.getElementById('modal-dashboard');
    modalOverlay.classList.remove('hidden');
    modalDash.classList.remove('hidden');

    // Cálculo simples baseado no roteiro ativo no momento
    // No futuro, isso pode ler todo o banco de 'historico'
    const routeSummary = document.getElementById('route-summary');
    if (!routeSummary || routeSummary.classList.contains('hidden')) {
        return; // Mantém os valores zerados se não houver rota
    }

    const distText = document.getElementById('route-dist').innerText;
    const timeText = document.getElementById('route-time').innerText;

    // Pegar o valor numérico do reembolso da tag
    const reimburseTag = document.querySelector('.reimbursement-tag strong');
    const reimburseText = reimburseTag ? reimburseTag.innerText : "R$ 0,00";

    document.getElementById('dash-total-km').innerText = distText;
    document.getElementById('dash-total-reimbursement').innerText = reimburseText;
    document.getElementById('dash-total-visits').innerText = activeWaypoints.length;

    // Eficiência baseada na comparação SAP
    const sapPrev = document.querySelector('.summary-comparison .val')?.innerText || "0.0";
    const realKM = parseFloat(distText);
    const prevKM = parseFloat(sapPrev);

    if (prevKM > 0) {
        const eff = Math.min((prevKM / realKM) * 100, 100).toFixed(0);
        document.getElementById('dash-efficiency').innerText = eff + "%";
    }
}

// --- FLATPIKRR (PREMIUM DATE PICKER) ---
function initPremiumDatePickers() {
    const config = {
        locale: "pt",
        dateFormat: "Y-m-d",
        altInput: true,
        altFormat: "d/m/Y",
        disableMobile: "true",
        defaultDate: "today",
        onChange: function (selectedDates, dateStr) {
            // Sincroniza os dois campos se necessário
            const other = document.getElementById(this.element.id === 'context-date-picker' ? 'sap-sync-date' : 'context-date-picker');
            if (other && other._flatpickr) other._flatpickr.setDate(dateStr, false);
        }
    };

    if (document.getElementById('context-date-picker')) {
        flatpickr("#context-date-picker", config);
    }

    // SAP Sync aceita range de datas
    const rangeConfig = { ...config, mode: "range" };
    if (document.getElementById('sap-sync-date')) {
        flatpickr("#sap-sync-date", rangeConfig);
    }
}


function saveSettings() {
    const activeStyleBtn = document.querySelector('.style-btn.active');
    const style = activeStyleBtn ? activeStyleBtn.dataset.style : 'dark';
    const showPOI = document.getElementById('toggle-poi') ? document.getElementById('toggle-poi').checked : true;

    const config = {
        key: 'mapConfig',
        style: style,
        showPOI: showPOI,
        updatedAt: new Date().toISOString()
    };

    const transaction = db.transaction(['settings'], 'readwrite');
    transaction.objectStore('settings').put(config).onsuccess = () => {
        applyMapStyle(style, showPOI);
        showNotification("Configurações salvas com sucesso!", "success");
        document.getElementById('modal-overlay').classList.add('hidden');
        document.getElementById('modal-settings').classList.add('hidden');
    };
}

/**
 * Sistema de Monitoramento Seletivo - Assets
 */
function createLiveAssets(id, lat, lng, status, initialName) {
    if (liveTrackers[id]) return;

    const personPath = "M12,2A5,5 0 0,1 17,7A5,5 0 0,1 12,12A5,5 0 0,1 7,7A5,5 0 0,1 12,2M12,14C17.5,14 22,16.24 22,19V22H2V19C2,16.24 6.5,14 12,14Z";

    let vendorName = initialName || id;

    const marker = new google.maps.Marker({
        position: { lat, lng },
        map: (selectedVendedorId && selectedVendedorId !== id) ? null : map,
        icon: {
            path: personPath,
            fillColor: (status === 'Offline' ? '#94a3b8' : '#10b981'),
            fillOpacity: 1,
            strokeWeight: 1.5,
            strokeColor: '#FFFFFF',
            scale: 1.2,
            anchor: new google.maps.Point(12, 12),
            labelOrigin: new google.maps.Point(12, -15)
        },
        label: {
            text: vendorName,
            color: "white",
            fontWeight: "bold",
            fontSize: "12px",
            className: "marker-label"
        }
    });

    const path = new google.maps.Polyline({
        map: (selectedVendedorId === id) ? map : null,
        strokeColor: "#10b981",
        strokeOpacity: 0.8,
        strokeWeight: 6,
        zIndex: 999
    });

    liveTrackers[id] = { marker, path, lastPos: { lat, lng }, totalKm: 0, vendorName: vendorName };
}

function moveMarker(id, pos, status) {
    const tracker = liveTrackers[id];
    if (tracker) {
        if (tracker.marker) {
            tracker.marker.setPosition(pos);
            // Atualiza cor se mudou status
            const icon = tracker.marker.getIcon();
            icon.fillColor = (status === 'Offline' ? '#94a3b8' : '#10b981');
            tracker.marker.setIcon(icon);
        }

        if (selectedVendedorId === id && tracker.path) {
            const lastPos = tracker.lastPos;
            const dist = haversineDistance(lastPos, pos);

            if (dist > GPS_NOISE_THRESHOLD) {
                const p = tracker.path.getPath();
                p.push(new google.maps.LatLng(pos.lat, pos.lng));
                tracker.totalKm += (dist / 1000);
                tracker.lastPos = pos;
            }
        } else {
            tracker.lastPos = pos;
        }
    }
}

function updateAllLabels() {
    Object.keys(liveTrackers).forEach(id => {
        const name = uidToName[id] || liveTrackers[id].vendorName;
        if (name && name !== id) {
            liveTrackers[id].vendorName = name;
            liveTrackers[id].marker.setLabel({
                text: name,
                color: "white",
                fontWeight: "bold",
                fontSize: "12px",
                className: "marker-label"
            });
        }
    });
}

function updateLiveMonitoring(locations) {
    if (!locations) return;

    Object.keys(locations).forEach(id => {
        const data = locations[id];
        if (!data) return;

        const vendorRealName = data.name || uidToName[id] || id;

        const status = (data.status || '').toLowerCase();
        const isOnline = status !== 'offline' && status !== '';

        if (!liveTrackers[id]) {
            // Novo marcador
            if (isOnline) {
                onlineVendorsCache[id] = true;
            } else {
                delete onlineVendorsCache[id];
            }
            renderInboxList(); // Sincroniza bolinhas no primeiro carregamento

            if (data.lat && data.lng) {
                const newPos = { lat: parseFloat(data.lat), lng: parseFloat(data.lng) };
                createLiveAssets(id, newPos.lat, newPos.lng, data.status, vendorRealName);
            }
        } else {
            // Atualização ou Offline
            if (!isOnline) {
                delete onlineVendorsCache[id];
            } else {
                onlineVendorsCache[id] = true;
            }
            renderInboxList(); // Atualizar bolinhas no inbox
            if (data.lat && data.lng) {
                const newPos = { lat: parseFloat(data.lat), lng: parseFloat(data.lng) };
                moveMarker(id, newPos, data.status);
            } else if (data.status) {
                // Atualização apenas de status (ex: logout)
                moveMarker(id, liveTrackers[id].lastPos, data.status);
            }

            // Sincroniza nome
            if (vendorRealName !== id && (liveTrackers[id].vendorName === id || !liveTrackers[id].vendorName)) {
                liveTrackers[id].vendorName = vendorRealName;
                liveTrackers[id].marker.setLabel({
                    text: vendorRealName,
                    color: "white",
                    fontWeight: "bold",
                    fontSize: "12px",
                    className: "marker-label"
                });
            }

            // Atualiza Widget se for o selecionado
            if (id === selectedVendedorId) {
                document.getElementById('monitor-vendor-name').innerText = (vendorRealName).substring(0, 15);
                document.getElementById('monitor-vendor-km').innerText = liveTrackers[id].totalKm.toFixed(1) + " km";
                const st = document.getElementById('monitor-vendor-status');
                st.innerText = data.status || "Ativo";
                st.className = `status-badge ${data.status === 'Offline' ? 'offline' : 'online'}`;
            }
        }
    });
}

function openMonitorSelection() {
    const modal = document.getElementById('modal-select-monitor');
    const overlay = document.getElementById('modal-overlay');
    const list = document.getElementById('monitor-selection-list');

    list.innerHTML = '';
    const activeIds = Object.keys(liveTrackers);

    if (activeIds.length === 0) {
        list.innerHTML = '<p class="empty-msg">Nenhum vendedor online no momento.</p>';
    } else {
        activeIds.forEach(id => {
            const item = document.createElement('div');
            item.className = 'search-result-item';
            const name = liveTrackers[id].vendorName || id;
            item.innerHTML = `<strong>${name}</strong><br><small style="opacity:0.6;">Ver rota detalhada</small>`;
            item.onclick = () => {
                selectVendedor(id);
                overlay.classList.add('hidden');
                modal.classList.add('hidden');
            };
            list.appendChild(item);
        });
    }

    overlay.classList.remove('hidden');
    modal.classList.remove('hidden');
    if (window.lucide) lucide.createIcons();
}

function selectVendedor(id) {
    selectedVendedorId = id;

    // Esconde TODAS as polylines e TODOS os outros marcadores
    Object.keys(liveTrackers).forEach(tid => {
        if (liveTrackers[tid].path) liveTrackers[tid].path.setMap(null);
        if (tid !== id) {
            liveTrackers[tid].marker.setMap(null);
        } else {
            liveTrackers[tid].marker.setMap(map);
        }
    });

    const tracker = liveTrackers[id];
    if (tracker) {
        if (tracker.path) tracker.path.setMap(map);
        map.panTo(tracker.marker.getPosition());
        map.setZoom(16);

        document.getElementById('monitor-widget').classList.remove('hidden');
        document.getElementById('monitor-vendor-name').innerText = (tracker.vendorName || id).substring(0, 15);
        document.getElementById('monitor-vendor-km').innerText = tracker.totalKm.toFixed(1) + " km";
    }
}

function stopMonitoringVendedor() {
    selectedVendedorId = null;

    // Mostra todos os marcadores novamente e remove as linhas de rota
    Object.keys(liveTrackers).forEach(id => {
        liveTrackers[id].marker.setMap(map);
        if (liveTrackers[id].path) liveTrackers[id].path.setMap(null);
    });

    document.getElementById('monitor-widget').classList.add('hidden');
    showNotification("Voltando ao mapa geral.", "info");
}

/**
 * SISTEMA DE CHAT / SUPORTE
 */
function listenForMessages() {
    database.ref('mensagens').on('value', snap => {
        allChatMessages = snap.val() || {};
        let totalUnread = 0;

        Object.keys(allChatMessages).forEach(vendorId => {
            const thread = allChatMessages[vendorId];
            Object.keys(thread).forEach(msgId => {
                if (thread[msgId].sender === 'vendor' && !thread[msgId].read) {
                    totalUnread++;
                }
            });
        });

        updateMsgBadge(totalUnread);

        // Se o modal estiver aberto, atualiza a UI
        if (!document.getElementById('modal-messages').classList.contains('hidden')) {
            renderInboxList();
            if (activeChatVendorId && allChatMessages[activeChatVendorId]) {
                renderActiveChat(allChatMessages[activeChatVendorId]);
            }
        }
    });
}

function updateMsgBadge(count) {
    const badge = document.getElementById('msg-badge');
    if (!badge) return;
    if (count > 0) {
        badge.innerText = count;
        badge.classList.remove('hidden');
    } else {
        badge.classList.add('hidden');
    }
}

function openMessagesModal() {
    document.getElementById('modal-messages').classList.remove('hidden');
    document.getElementById('modal-overlay').classList.remove('hidden');
    renderInboxList();

    // Configura o botão de envio (uma única vez)
    const btn = document.getElementById('btn-send-reply');
    btn.onclick = sendAdminReply;
    const input = document.getElementById('inbox-chat-input');
    input.onkeypress = (e) => { if (e.key === 'Enter') sendAdminReply(); };
}

function renderInboxList() {
    const list = document.getElementById('inbox-list');
    list.innerHTML = '';

    const vendorIds = Object.keys(allChatMessages);
    if (vendorIds.length === 0) {
        list.innerHTML = '<p class="empty-msg" style="padding:20px;">Nenhuma mensagem.</p>';
        return;
    }

    vendorIds.forEach(vendorId => {
        const thread = allChatMessages[vendorId];
        const msgIds = Object.keys(thread);
        const lastMsg = thread[msgIds[msgIds.length - 1]];
        const unreadCount = Object.values(thread).filter(m => m.sender === 'vendor' && !m.read).length;
        const vendorName = uidToName[vendorId] || vendorId;

        const item = document.createElement('div');
        item.className = `inbox-item ${vendorId === activeChatVendorId ? 'active' : ''}`;
        item.style.padding = '12px';
        item.style.borderBottom = '1px solid var(--border)';
        item.style.cursor = 'pointer';
        item.style.background = vendorId === activeChatVendorId ? 'rgba(255,154,86,0.15)' : 'transparent';
        item.style.position = 'relative';

        item.innerHTML = `
    <div style="display:flex; justify-content:space-between; align-items:center;">
        <div style="display:flex; align-items:center; gap:6px;">
            <div class="status-dot ${isVendorOnline(vendorId) ? 'online' : 'offline'}" title="${isVendorOnline(vendorId) ? 'Online' : 'Offline'}"></div>
            <strong style="font-size:0.85rem;">${vendorName.substring(0, 15)}</strong>
        </div>
        <div style="display:flex; gap: 8px; align-items: center;">
            ${unreadCount > 0 ? `<span style="background:#ef4444; color:white; border-radius:10px; padding:1px 6px; font-size:9px;">${unreadCount}</span>` : ''}
            <i data-lucide="trash-2" class="delete-thread-btn" title="Limpar conversa" onclick="event.stopPropagation(); clearConversation('${vendorId}')"></i>
        </div>
    </div>
    <div style="font-size:0.7rem; opacity:0.6; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; margin-top:3px;">${lastMsg.text}</div>
`;

        item.onclick = () => selectInboxChat(vendorId);
        list.appendChild(item);
    });

    if (window.lucide) {
        lucide.createIcons({
            attrs: { 'stroke-width': 2 },
            nameAttr: 'data-lucide',
            root: list
        });
    }
}

function markAsRead(vendorId) {
    const thread = allChatMessages[vendorId];
    if (!thread) return;
    Object.keys(thread).forEach(msgId => {
        if (thread[msgId].sender === 'vendor' && !thread[msgId].read) {
            database.ref(`mensagens/${vendorId}/${msgId}/read`).set(true);
        }
    });
}

function selectInboxChat(vendorId) {
    activeChatVendorId = vendorId;

    // Escutar mensagens
    database.ref(`mensagens/${vendorId}`).off('value');
    database.ref(`mensagens/${vendorId}`).on('value', snap => {
        const thread = snap.val() || {};
        allChatMessages[vendorId] = thread;
        if (activeChatVendorId === vendorId) renderActiveChat(thread);
    });

    // Escutar status de digitando do Vendedor
    database.ref(`typing/${vendorId}/vendor`).off('value');
    database.ref(`typing/${vendorId}/vendor`).on('value', snap => {
        const isTyping = snap.val();
        console.log("Recebido Digitando: ", vendorId, isTyping);
        const indicator = document.getElementById('typing-indicator');
        if (indicator) {
            indicator.style.display = isTyping ? 'flex' : 'none';
            if (isTyping) {
                const chatMsgs = document.getElementById('inbox-chat-messages');
                chatMsgs.scrollTop = chatMsgs.scrollHeight;
            }
        }
    });

    document.getElementById('inbox-chat-input-container').classList.remove('hidden');
    markAsRead(vendorId);
    renderInboxList();
}
function renderActiveChat(thread) {
    const container = document.getElementById('inbox-chat-messages');
    container.innerHTML = '';

    Object.keys(thread).forEach(id => {
        const m = thread[id];
        const div = document.createElement('div');
        div.className = 'chat-bubble-wrapper';
        div.style.alignSelf = m.sender === 'admin' ? 'flex-end' : 'flex-start';
        div.style.display = 'flex';
        div.style.flexDirection = 'column';
        div.style.maxWidth = '85%';
        div.style.marginBottom = '8px';
        div.style.position = 'relative';

        const bubble = document.createElement('div');
        bubble.className = 'chat-bubble';
        bubble.style.background = m.sender === 'admin' ? '#f59e0b' : '#334155';
        bubble.style.color = 'white';
        bubble.style.padding = '8px 12px';
        bubble.style.borderRadius = '12px';
        bubble.style.fontSize = '0.85rem';
        bubble.style.position = 'relative';

        bubble.innerHTML = `
            <div style="padding-right: 15px;">${m.text}</div>
            <div style="font-size:0.6rem; opacity:0.6; text-align:right; margin-top:4px;">${new Date(m.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
        `;

        div.appendChild(bubble);
        container.appendChild(div);
    });

    container.scrollTop = container.scrollHeight;
}

window.deleteMessage = async function (vendorId, msgId) {
    if (!await showConfirmModal("Excluir Mensagem", "Tem certeza que deseja apagar esta mensagem?")) return;
    database.ref(`mensagens/${vendorId}/${msgId}`).remove()
        .then(() => showNotification("Mensagem excluída.", "success"))
        .catch(err => showNotification("Erro ao excluir: " + err.message, "error"));
}

window.clearConversation = async function (vendorId) {
    if (!await showConfirmModal("Apagar Conversa", "Tem certeza que deseja apagar TODA a conversa com este vendedor? Esta ação não pode ser desfeita.")) return;
    database.ref(`mensagens/${vendorId}`).remove()
        .then(() => {
            showNotification("Conversa limpa com sucesso.", "success");
            activeChatVendorId = null;
            renderInboxList();
            document.getElementById('inbox-chat-messages').innerHTML = '<p class="empty-msg" style="margin-top: 150px; text-align: center; opacity: 0.5;">Selecione um vendedor para conversar</p>';
            document.getElementById('inbox-chat-input-container').classList.add('hidden');
        })
        .catch(err => showNotification("Erro ao limpar conversa: " + err.message, "error"));
}

async function sendAdminReply() {
    const input = document.getElementById('inbox-chat-input');

    // Limpar status de digitando ao enviar
    if (activeChatVendorId) {
        database.ref(`typing/${activeChatVendorId}/admin`).set(false);
    }

    const text = input.value.trim();
    if (!text || !activeChatVendorId) return;

    const newMsg = {
        text,
        sender: 'admin',
        timestamp: firebase.database.ServerValue.TIMESTAMP,
        read: false
    };

    try {
        await database.ref(`mensagens/${activeChatVendorId}`).push(newMsg);
        input.value = '';
    } catch (err) {
        showNotification("Erro ao enviar: " + err.message, "error");
    }
}

// --- EVENT LISTENERS GERAIS ---
window.addEventListener('DOMContentLoaded', () => {
    const btnSave = document.getElementById('btn-save-settings');
    if (btnSave) btnSave.onclick = saveSettings;

    // Inicializar Sessão Premium
    const userName = localStorage.getItem('uniRotas_user') || 'Usuário';
    const profileBtn = document.getElementById('profile-btn');
    if (profileBtn) {
        profileBtn.title = `Conectado como: ${userName}`;
    }

    // Auto-fill SAP credentials
    const savedSapUser = localStorage.getItem('sap_saved_user');
    const savedSapPass = localStorage.getItem('sap_saved_pass');
    if (savedSapUser) {
        const inputUser = document.getElementById('sap-sync-user');
        if (inputUser) inputUser.value = savedSapUser;
    }
    if (savedSapPass) {
        const inputPass = document.getElementById('sap-sync-pass');
        if (inputPass) inputPass.value = savedSapPass;
    }

    // Listener para o botão de Logout
    const btnLogout = document.querySelector('.btn-logout');
    if (btnLogout) {
        btnLogout.addEventListener('click', uniRotasLogout);
    }

    // Garantir que os ícones Lucide sejam criados
    if (window.lucide) {
        window.lucide.createIcons();
    }
});

function uniRotasLogout() {
    const modal = document.getElementById('modal-logout');
    const overlay = document.getElementById('modal-overlay');

    if (modal && overlay) {
        closeAllModals(); // Fechar outros modais se abertos
        modal.classList.remove('hidden');
        overlay.classList.remove('hidden');

        // Inicializar ícones do novo modal
        if (window.lucide) window.lucide.createIcons();
    }
}

function confirmLogout() {
    localStorage.removeItem('uniRotas_isLoggedIn');
    localStorage.removeItem('uniRotas_user');
    window.location.href = 'login.html';
}

// === FERRAMENTA DE ANÁLISE DE PROXIMIDADE ===
function openProximityModal() {
    const modalOverlay = document.getElementById('modal-overlay');
    const modalProximity = document.getElementById('modal-proximity');
    const searchInput = document.getElementById('search-proximity-client');
    const step1 = document.getElementById('proximity-step-1');
    const step2 = document.getElementById('proximity-step-2');
    const stepLabel = document.getElementById('proximity-step-label');
    const btnAnalyze = document.getElementById('btn-analyze-proximity');
    const btnBack = document.getElementById('btn-proximity-back');
    const btnViewMap = document.getElementById('btn-proximity-view-map');

    // Resetar para passo 1
    step1.classList.remove('hidden');
    step2.classList.add('hidden');
    stepLabel.textContent = 'Passo 1 — Selecione o cliente que deseja analisar';
    if (btnAnalyze) { btnAnalyze.disabled = true; }
    if (searchInput) searchInput.value = '';
    window.selectedProximityClient = null;

    modalOverlay.classList.remove('hidden');
    modalProximity.classList.remove('hidden');

    renderProximityClientList();

    // Filtro de busca
    if (searchInput) {
        searchInput.oninput = (e) => {
            clearTimeout(window.proximitySearchTimer);
            window.proximitySearchTimer = setTimeout(() => {
                renderProximityClientList(e.target.value);
            }, 300);
        };
    }

    // Botão "Analisar Proximidade"
    if (btnAnalyze) {
        btnAnalyze.onclick = () => {
            if (!window.selectedProximityClient) return;
            step1.classList.add('hidden');
            step2.classList.remove('hidden');
            stepLabel.textContent = 'Passo 2 — Ranking de vendedores mais próximos';
            // Desabilita "Ver no Mapa" até o cálculo terminar
            if (btnViewMap) btnViewMap.disabled = true;
            calculateProximity(window.selectedProximityClient);
        };
    }

    // Botão "Voltar"
    if (btnBack) {
        btnBack.onclick = () => {
            step2.classList.add('hidden');
            step1.classList.remove('hidden');
            stepLabel.textContent = 'Passo 1 — Selecione o cliente que deseja analisar';
        };
    }

    // Botão "Ver no Mapa" — fecha o modal e deixa os marcadores visíveis
    if (btnViewMap) {
        btnViewMap.onclick = () => {
            closeAllModals();
            showNotification('Mapa atualizado com as distâncias!', 'success');
        };
    }

    if (window.lucide) lucide.createIcons();
}

function renderProximityClientList(filter = '') {
    const listContainer = document.getElementById('proximity-client-list');
    const btnAnalyze = document.getElementById('btn-analyze-proximity');
    if (!listContainer) return;

    listContainer.innerHTML = '<p class="loader-inline">Carregando clientes...</p>';
    const q = filter.toLowerCase();

    const transaction = db.transaction(['clients'], 'readonly');
    const store = transaction.objectStore('clients');
    const results = [];
    const MAX_VISIBLE = 30;

    store.openCursor().onsuccess = (e) => {
        const cursor = e.target.result;
        if (cursor) {
            const c = cursor.value;
            if ((c.name && c.name.toLowerCase().includes(q)) ||
                (c.code && String(c.code).toLowerCase().includes(q))) {
                results.push(c);
            }
            if (results.length < MAX_VISIBLE) cursor.continue();
            else finalizeRender();
        } else {
            finalizeRender();
        }
    };

    function finalizeRender() {
        listContainer.innerHTML = results.length
            ? ''
            : '<p class="empty-msg">Nenhum cliente encontrado.</p>';

        results.forEach(item => {
            const row = document.createElement('div');
            row.className = 'data-row';
            row.style.cursor = 'pointer';
            row.style.transition = 'background 0.2s';

            const hasCoords = item.lat && item.lng;
            row.innerHTML = `
                <div class="info">
                    <strong>${item.name}</strong>
                    <span style="font-size:0.78rem;">${item.code || ''} · ${item.address || 'Sem endereço'}</span>
                    ${!hasCoords ? '<span style="color:#e74c3c; font-size:0.72rem;">⚠ Sem coordenadas GPS</span>' : ''}
                </div>
                <div class="actions">
                    <i data-lucide="chevron-right" style="opacity:0.4;"></i>
                </div>
            `;

            row.onclick = () => {
                Array.from(listContainer.children).forEach(c => {
                    c.style.background = '';
                    c.style.border = '';
                    c.style.borderRadius = '';
                });
                row.style.background = 'rgba(191,154,86,0.15)';
                row.style.border = '1px solid #BF9A56';
                row.style.borderRadius = '8px';

                window.selectedProximityClient = item;

                if (btnAnalyze) {
                    btnAnalyze.disabled = false;
                    btnAnalyze.style.opacity = '1';
                }
            };
            listContainer.appendChild(row);
        });

        if (window.lucide) lucide.createIcons({ root: listContainer });
    }
}

function calculateProximity(client) {
    const resultsContainer = document.getElementById('proximity-results-container');
    const selectedName = document.getElementById('proximity-selected-name');
    const selectedAddr = document.getElementById('proximity-selected-addr');
    const btnViewMap = document.getElementById('btn-proximity-view-map');

    // Preenche o banner do cliente
    if (selectedName) selectedName.textContent = client.name || 'Cliente';
    if (selectedAddr) selectedAddr.textContent = client.address || 'Endereço não informado';

    if (!client.lat || !client.lng) {
        resultsContainer.innerHTML = `
            <div style="text-align:center; padding:20px; color:#e74c3c;">
                <i data-lucide="map-pin-off" style="width:36px;height:36px;"></i>
                <p style="margin-top:10px;">Este cliente não possui coordenadas GPS salvas.<br>
                <small>Edite o cliente e geocodifique o endereço.</small></p>
            </div>`;
        if (window.lucide) lucide.createIcons({ root: resultsContainer });
        return;
    }

    resultsContainer.innerHTML = '<p class="loader-inline">Analisando todos os vendedores...</p>';

    const transaction = db.transaction(['vendors'], 'readonly');
    const store = transaction.objectStore('vendors');
    const vendors = [];

    store.openCursor().onsuccess = (e) => {
        const cursor = e.target.result;
        if (cursor) {
            const v = cursor.value;
            if (v.lat && v.lng) vendors.push(v);
            cursor.continue();
        } else {
            finalizeProximity(client, vendors);
        }
    };

    function finalizeProximity(clientTarget, allVendors) {
        // Habilita botão "Ver no Mapa" ao finalizar
        if (btnViewMap) btnViewMap.disabled = false;

        if (allVendors.length === 0) {
            resultsContainer.innerHTML = '<p class="empty-msg">Nenhum vendedor com coordenadas encontrado no sistema.</p>';
            return;
        }

        // Calcula distâncias via Haversine (linha reta)
        const distances = allVendors.map(v => {
            const dist = haversineDistance(
                { lat: v.lat, lng: v.lng },
                { lat: clientTarget.lat, lng: clientTarget.lng }
            );
            return { vendor: v, distanceMeters: dist, distanceKm: (dist / 1000).toFixed(2) };
        }).sort((a, b) => a.distanceMeters - b.distanceMeters);

        // Limpa marcadores anteriores de proximidade
        if (window.proximityMarkers) {
            window.proximityMarkers.forEach(m => { if (m.setMap) m.setMap(null); });
        }
        window.proximityMarkers = [];
        if (window.proximityInfoWindows) {
            window.proximityInfoWindows.forEach(iw => iw.close());
        }
        window.proximityInfoWindows = [];

        // *** CORREÇÃO: usar `map` direto (let map no escopo global) e não window.map ***
        const activeMap = map || null;

        // ── Marcador do Cliente (Prédio) ──
        if (activeMap) {
            const clientMarker = new google.maps.Marker({
                position: { lat: clientTarget.lat, lng: clientTarget.lng },
                map: activeMap,
                title: clientTarget.name,
                zIndex: 999,
                icon: {
                    path: "M17 11V3H7v4H3v14h8v-4h2v4h8V11h-4zM7 19H5v-2h2v2zm0-4H5v-2h2v2zm0-4H5V9h2v2zm4 4H9v-2h2v2zm0-4H9V9h2v2zm0-4H9V5h2v2zm4 8h-2v-2h2v2zm0-4h-2V9h2v2zm0-4h-2V5h2v2zm4 12h-2v-2h2v2zm0-4h-2v-2h2v2z",
                    fillColor: "#e67e22",
                    fillOpacity: 1,
                    strokeColor: "#FFFFFF",
                    strokeWeight: 1.5,
                    scale: 1.6,
                    anchor: new google.maps.Point(12, 12)
                }
            });
            const clientInfoWindow = new google.maps.InfoWindow({
                content: `<div style="color:#000; font-family:Poppins,sans-serif; font-size:13px; min-width:160px;">
                    <strong>🏢 ${clientTarget.name}</strong><br>
                    <small style="color:#555;">${clientTarget.address || ''}</small>
                </div>`
            });
            clientMarker.addListener('mouseover', () => clientInfoWindow.open(activeMap, clientMarker));
            clientMarker.addListener('mouseout', () => clientInfoWindow.close());
            window.proximityMarkers.push(clientMarker);
            window.proximityInfoWindows.push(clientInfoWindow);

            activeMap.panTo({ lat: clientTarget.lat, lng: clientTarget.lng });
            activeMap.setZoom(12);
        }

        // ── Top 5 Vendedores ──
        resultsContainer.innerHTML = '';
        const COLORS = ['#2ecc71', '#3498db', '#9b59b6', '#e67e22', '#e74c3c'];
        const limit = Math.min(5, distances.length);

        for (let i = 0; i < limit; i++) {
            const data = distances[i];
            const isFirst = i === 0;
            const color = COLORS[i];
            const vName = data.vendor.name || 'Vendedor';
            const cName = clientTarget.name;
            const kmIda = data.distanceKm;

            const row = document.createElement('div');
            row.className = 'data-row';
            row.style.cssText = `
                background: ${isFirst ? 'rgba(46,204,113,0.08)' : 'rgba(255,255,255,0.02)'};
                border: 1px solid ${isFirst ? '#2ecc71' : 'rgba(255,255,255,0.07)'};
                border-radius: 10px;
                margin-bottom: 8px;
                padding: 12px 15px;
                display: flex;
                align-items: center;
                gap: 12px;
            `;
            row.innerHTML = `
                <div style="font-size:1.4rem; min-width:32px; text-align:center;">
                    ${isFirst ? '👑' : `<span style="font-size:0.9rem; font-weight:700; color:${color};">${i + 1}º</span>`}
                </div>
                <div style="flex:1; min-width:0;">
                    <strong style="font-size:0.95rem; color:${isFirst ? '#2ecc71' : 'white'};">
                        ${vName}
                    </strong>
                    <div style="font-size:0.75rem; color:var(--text-secondary); margin-top:3px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">
                        ${vName} → <span style="color:#BF9A56;">${cName}</span> → Casa de ${vName.split(' ')[0]}
                    </div>
                    <div style="font-size:0.72rem; color:rgba(255,255,255,0.4); margin-top:2px;">
                        ${data.vendor.address || 'Endereço não cadastrado'}
                    </div>
                </div>
                <div style="text-align:right; flex-shrink:0;">
                    <span style="font-size:1.15rem; font-weight:700; color:${isFirst ? '#2ecc71' : color};">
                        ${kmIda} km
                    </span>
                    <div style="font-size:0.65rem; color:var(--text-secondary);">rota estimada</div>
                </div>
            `;
            resultsContainer.appendChild(row);

            // ── Marcadores e linhas no mapa ──
            if (activeMap) {
                // Desenhar a rota real com Directions API
                const directionsService = new google.maps.DirectionsService();
                const directionsRenderer = new google.maps.DirectionsRenderer({
                    map: activeMap,
                    suppressMarkers: true,
                    preserveViewport: true,
                    polylineOptions: {
                        strokeColor: color,
                        strokeOpacity: isFirst ? 0.9 : 0.6,
                        strokeWeight: isFirst ? 5 : 3
                    }
                });

                // Adicionar um objeto com método setMap para ser limpo na próxima execução
                window.proximityMarkers.push({
                    setMap: (m) => directionsRenderer.setMap(m)
                });

                directionsService.route({
                    origin: { lat: parseFloat(data.vendor.lat), lng: parseFloat(data.vendor.lng) },
                    destination: { lat: parseFloat(clientTarget.lat), lng: parseFloat(clientTarget.lng) },
                    travelMode: google.maps.TravelMode.DRIVING
                }, (response, status) => {
                    if (status === 'OK') {
                        directionsRenderer.setDirections(response);
                    } else {
                        console.warn("Rota falhou para", vName, status);
                    }
                });

                const vendorMarker = new google.maps.Marker({
                    position: { lat: data.vendor.lat, lng: data.vendor.lng },
                    map: activeMap,
                    zIndex: isFirst ? 998 : 100 - i,
                    title: vName,
                    icon: {
                        path: "M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z",
                        fillColor: color,
                        fillOpacity: 1,
                        strokeColor: isFirst ? '#FFFFFF' : '#000000',
                        strokeWeight: isFirst ? 2 : 1,
                        scale: isFirst ? 2.0 : 1.4,
                        anchor: new google.maps.Point(12, 20)
                    }
                });

                const infoHtml = `
                    <div style="font-family:Poppins,sans-serif; font-size:13px; min-width:180px; color:#000;">
                        ${isFirst ? '<div style="color:#27ae60; font-weight:700; margin-bottom:4px;">👑 Mais próximo</div>' : ''}
                        <strong>${vName}</strong><br>
                        <span style="color:#555;">→ ${cName}</span><br>
                        <span style="font-size:15px; font-weight:700; color:${color};">${kmIda} km</span>
                        <span style="font-size:11px; color:#888;"> (rota estimada)</span>
                    </div>`;

                const infoWindow = new google.maps.InfoWindow({ content: infoHtml });
                vendorMarker.addListener('mouseover', () => infoWindow.open(activeMap, vendorMarker));
                vendorMarker.addListener('mouseout', () => infoWindow.close());
                vendorMarker.addListener('click', () => infoWindow.open(activeMap, vendorMarker));

                window.proximityMarkers.push(vendorMarker);
                window.proximityInfoWindows.push(infoWindow);
            }
        }

        if (window.lucide) lucide.createIcons({ root: resultsContainer });
    }
}