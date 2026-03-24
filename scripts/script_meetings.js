/**
 * UniRotas - Módulo de Reuniões e Vendedores Cadastrados
 * Funcionalidades: Gestão de vendedores + Análise de reuniões/caronas
 */

// ══════════════════════════════════════════════════════════════════════
//  FIREBASE INIT (reutiliza a instância já existente em script.js)
// ══════════════════════════════════════════════════════════════════════
const _db = () => firebase.database();

// ══════════════════════════════════════════════════════════════════════
//  UTILITÁRIOS
// ══════════════════════════════════════════════════════════════════════
function _notify(msg, type = 'success') {
    const c = document.getElementById('notification-container');
    if (!c) return;
    const n = document.createElement('div');
    n.className = `notification ${type}`;
    n.innerHTML = `<i data-lucide="${type === 'success' ? 'check-circle' : type === 'error' ? 'x-circle' : 'info'}"></i><span>${msg}</span>`;
    c.appendChild(n);
    lucide.createIcons();
    setTimeout(() => { n.style.opacity = '0'; setTimeout(() => n.remove(), 400); }, 3500);
}

function _openModal(id) {
    closeAllModals();
    const ov = document.getElementById('modal-overlay');
    const m = document.getElementById(id);
    if (!m || !ov) return;
    ov.classList.remove('hidden');
    m.classList.remove('hidden');
    ov.classList.add('visible');
    m.classList.add('visible');
    lucide.createIcons();
}

// ══════════════════════════════════════════════════════════════════════
//  MÓDULO: VENDEDORES CADASTRADOS
// ══════════════════════════════════════════════════════════════════════

let _allRegisteredVendors = {};
let _currentEditVendorUid = null;

async function openRegisteredVendors() {
    _openModal('modal-registered-vendors');
    await loadRegisteredVendors();
}

async function loadRegisteredVendors() {
    const container = document.getElementById('reg-vendors-list');
    const search = document.getElementById('reg-vendor-search')?.value?.toLowerCase() || '';
    container.innerHTML = `<div style="text-align:center;padding:30px;opacity:0.5"><div class="spinner" style="margin:auto"></div></div>`;

    try {
        const snap = await _db().ref('usuarios').once('value');
        _allRegisteredVendors = snap.val() || {};
        renderRegisteredVendors(search);
    } catch (e) {
        container.innerHTML = `<p style="text-align:center;opacity:0.5;padding:20px">Erro ao carregar vendedores.</p>`;
    }
}

function renderRegisteredVendors(filter = '') {
    const container = document.getElementById('reg-vendors-list');
    const count = document.getElementById('reg-vendor-count');
    const entries = Object.entries(_allRegisteredVendors).filter(([, v]) =>
        !filter || (v.name || '').toLowerCase().includes(filter) || (v.cpf || '').includes(filter)
    );

    if (count) count.textContent = `${entries.length} vendedor${entries.length !== 1 ? 'es' : ''} cadastrado${entries.length !== 1 ? 's' : ''}`;

    if (!entries.length) {
        container.innerHTML = `<div style="text-align:center;padding:40px;opacity:0.4"><i data-lucide="users" style="width:40px;height:40px;margin:0 auto 12px;display:block"></i><p style="font-size:0.9rem">${filter ? 'Nenhum resultado encontrado.' : 'Nenhum vendedor cadastrado.'}</p></div>`;
        lucide.createIcons();
        return;
    }

    container.innerHTML = entries.map(([uid, v]) => {
        const addr = v.address ? `${v.address.rua || ''} ${v.address.numero || ''}, ${v.address.cidade || ''}`.trim() : 'Endereço não cadastrado';
        const initial = (v.name || 'V').charAt(0).toUpperCase();
        return `
        <div class="rv-card" id="rv-${uid}">
            <div class="rv-avatar">${initial}</div>
            <div class="rv-info">
                <div class="rv-name">${v.name || 'Sem nome'}</div>
                <div class="rv-detail"><i data-lucide="hash" style="width:11px;height:11px"></i> CPF: ${formatCPF(v.cpf || '')}</div>
                <div class="rv-detail"><i data-lucide="map-pin" style="width:11px;height:11px"></i> ${addr}</div>
                ${v.email ? `<div class="rv-detail"><i data-lucide="mail" style="width:11px;height:11px"></i> ${v.email}</div>` : ''}
            </div>
            <div class="rv-actions">
                <button class="rv-btn rv-btn-msg" title="Enviar mensagem" onclick="openMessageToVendor('${uid}','${(v.name || 'Vendedor').replace(/'/g, "\\'")}')">
                    <i data-lucide="message-circle"></i>
                </button>
                <button class="rv-btn rv-btn-edit" title="Editar" onclick="openEditVendor('${uid}')">
                    <i data-lucide="edit-2"></i>
                </button>
                <button class="rv-btn rv-btn-delete" title="Excluir" onclick="confirmDeleteVendor('${uid}','${(v.name || 'Vendedor').replace(/'/g, "\\'")}')">
                    <i data-lucide="trash-2"></i>
                </button>
            </div>
        </div>`;
    }).join('');
    lucide.createIcons();
}

function formatCPF(cpf) {
    const c = (cpf || '').replace(/\D/g, '');
    if (c.length !== 11) return cpf;
    return `${c.slice(0, 3)}.${c.slice(3, 6)}.${c.slice(6, 9)}-${c.slice(9)}`;
}

function openEditVendor(uid) {
    const v = _allRegisteredVendors[uid];
    if (!v) return;
    _currentEditVendorUid = uid;
    document.getElementById('edit-vendor-name').value = v.name || '';
    document.getElementById('edit-vendor-email').value = v.email || '';
    document.getElementById('edit-vendor-cpf').value = formatCPF(v.cpf || '');
    const addr = v.address || {};
    document.getElementById('edit-vendor-rua').value = addr.rua || '';
    document.getElementById('edit-vendor-num').value = addr.numero || '';
    document.getElementById('edit-vendor-bairro').value = addr.bairro || '';
    document.getElementById('edit-vendor-cidade').value = addr.cidade || '';
    document.getElementById('edit-vendor-cep').value = addr.cep || '';
    _openModal('modal-edit-vendor');
}

async function saveEditVendor() {
    if (!_currentEditVendorUid) return;
    const btn = document.getElementById('btn-save-vendor');
    btn.disabled = true; btn.textContent = 'Salvando...';
    try {
        const updates = {
            name: document.getElementById('edit-vendor-name').value.trim(),
            email: document.getElementById('edit-vendor-email').value.trim(),
            address: {
                rua: document.getElementById('edit-vendor-rua').value.trim(),
                numero: document.getElementById('edit-vendor-num').value.trim(),
                bairro: document.getElementById('edit-vendor-bairro').value.trim(),
                cidade: document.getElementById('edit-vendor-cidade').value.trim(),
                cep: document.getElementById('edit-vendor-cep').value.trim()
            }
        };
        await _db().ref('usuarios/' + _currentEditVendorUid).update(updates);
        _notify('Vendedor atualizado com sucesso!');
        closeAllModals();
        setTimeout(openRegisteredVendors, 200);
    } catch (e) {
        _notify('Erro ao salvar: ' + e.message, 'error');
    } finally {
        btn.disabled = false; btn.textContent = 'Salvar Alterações';
    }
}

function confirmDeleteVendor(uid, name) {
    _showConfirm(
        `Excluir ${name}?`,
        `Esta ação removerá permanentemente o cadastro de <b>${name}</b>. Os dados de reuniões e chats serão mantidos.`,
        async () => {
            try {
                await _db().ref('usuarios/' + uid).remove();
                _notify(`${name} removido com sucesso.`);
                delete _allRegisteredVendors[uid];
                renderRegisteredVendors(document.getElementById('reg-vendor-search')?.value || '');
            } catch (e) {
                _notify('Erro ao excluir: ' + e.message, 'error');
            }
        }
    );
}

function openMessageToVendor(uid, name) {
    document.getElementById('msg-to-vendor-uid').value = uid;
    document.getElementById('msg-to-vendor-name').textContent = name;
    document.getElementById('msg-to-vendor-input').value = '';
    _openModal('modal-msg-vendor');
}

async function sendMessageToVendor() {
    const uid = document.getElementById('msg-to-vendor-uid').value;
    const text = document.getElementById('msg-to-vendor-input').value.trim();
    if (!text) { _notify('Digite uma mensagem.', 'error'); return; }
    const btn = document.getElementById('btn-send-msg-vendor');
    btn.disabled = true; btn.textContent = 'Enviando...';
    try {
        await _db().ref('mensagens/' + uid).push({
            sender: 'admin', text,
            timestamp: firebase.database.ServerValue.TIMESTAMP,
            read: false
        });
        _notify('Mensagem enviada!');
        document.getElementById('msg-to-vendor-input').value = '';
        closeAllModals();
    } catch (e) {
        _notify('Erro: ' + e.message, 'error');
    } finally {
        btn.disabled = false; btn.textContent = 'Enviar Mensagem';
    }
}

// ══════════════════════════════════════════════════════════════════════
//  MÓDULO: ANALISAR REUNIÕES
// ══════════════════════════════════════════════════════════════════════

let _meetingsData = {};
let _meetingMap = null;
let _meetingDirectionsRenderer = null;

async function openAnalyzeMeetings() {
    _openModal('modal-analyze-meetings');
    await loadMeetingsData();
}

async function loadMeetingsData() {
    const snap = await _db().ref('reunioes').orderByChild('timestamp').limitToLast(50).once('value');
    _meetingsData = snap.val() || {};
    renderMeetingsSummary();
    renderMeetingsList();
}

function renderMeetingsSummary() {
    const meetings = Object.values(_meetingsData);
    const totalKm = meetings.reduce((s, m) => s + (m.totalKm || 0), 0);
    const totalMeetings = meetings.length;
    const totalPassengers = meetings.reduce((s, m) => s + (m.passengers || []).length, 0);
    const uniqueDrivers = [...new Set(meetings.map(m => m.driverId).filter(Boolean))].length;

    document.getElementById('am-stat-km').textContent = totalKm.toFixed(1);
    document.getElementById('am-stat-meetings').textContent = totalMeetings;
    document.getElementById('am-stat-passengers').textContent = totalPassengers;
    document.getElementById('am-stat-drivers').textContent = uniqueDrivers;
}

function renderMeetingsList(filter = '') {
    const container = document.getElementById('am-meetings-list');
    const entries = Object.entries(_meetingsData)
        .sort((a, b) => (b[1].timestamp || 0) - (a[1].timestamp || 0))
        .filter(([, m]) => !filter || (m.driverName || '').toLowerCase().includes(filter.toLowerCase()));

    if (!entries.length) {
        container.innerHTML = `<div style="text-align:center;padding:40px;opacity:0.4"><i data-lucide="calendar-x" style="width:36px;height:36px;display:block;margin:0 auto 10px"></i><p>Nenhuma reunião encontrada.</p></div>`;
        lucide.createIcons();
        return;
    }

    container.innerHTML = entries.map(([id, m]) => {
        const pickedUp = (m.passengers || []).filter(p => p.pickedUp).length;
        const total = (m.passengers || []).length;
        const pct = total > 0 ? Math.round((pickedUp / total) * 100) : 100;
        return `
        <div class="am-card">
            <div class="am-card-header">
                <div>
                    <div class="am-driver-name"><i data-lucide="user" style="width:14px;height:14px"></i> ${m.driverName || 'Motorista'}</div>
                    <div class="am-date">${m.date || ''} &bull; ${m.startTime || ''} – ${m.endTime || ''}</div>
                </div>
                <div class="am-km-badge">${(m.totalKm || 0).toFixed(1)} km</div>
            </div>
            <div class="am-passengers">
                ${(m.passengers || []).map(p => `
                    <span class="am-passenger-tag ${p.pickedUp ? 'picked' : 'not-picked'}">
                        ${p.pickedUp ? '✓' : '○'} ${p.name}
                    </span>`).join('')}
            </div>
            <div class="am-card-footer">
                <div class="am-progress-bar"><div class="am-progress-fill" style="width:${pct}%"></div></div>
                <span class="am-pct">${pickedUp}/${total} confirmados</span>
                ${m.pathPoints && m.pathPoints.length > 0 ? `<button class="am-map-btn" onclick="showMeetingRoute('${id}')"><i data-lucide="map" style="width:13px;height:13px"></i> Ver Rota</button>` : ''}
            </div>
        </div>`;
    }).join('');
    lucide.createIcons();
}

function showMeetingRoute(meetingId) {
    const m = _meetingsData[meetingId];
    if (!m || !m.pathPoints || !m.pathPoints.length) {
        _notify('Rota não disponível para esta reunião.', 'error');
        return;
    }
    _openModal('modal-meeting-route');
    document.getElementById('mr-driver-name').textContent = m.driverName || 'Motorista';
    document.getElementById('mr-date').textContent = `${m.date} • ${m.startTime} → ${m.endTime}`;
    document.getElementById('mr-km').textContent = `${(m.totalKm || 0).toFixed(1)} km`;
    document.getElementById('mr-passengers-list').innerHTML = (m.passengers || []).map(p =>
        `<span class="am-passenger-tag ${p.pickedUp ? 'picked' : ''}">${p.pickedUp ? '✓' : '○'} ${p.name}</span>`
    ).join('');

    setTimeout(() => {
        const mapEl = document.getElementById('meeting-route-map');
        if (!mapEl) return;

        // Reset or init map
        if (!_meetingMap) {
            _meetingMap = new google.maps.Map(mapEl, {
                zoom: 14,
                center: { lat: m.pathPoints[0].lat, lng: m.pathPoints[0].lng },
                styles: [
                    { "elementType": "geometry", "stylers": [{ "color": "#121926" }] },
                    { "elementType": "labels.text.fill", "stylers": [{ "color": "#746855" }] },
                    { "elementType": "labels.text.stroke", "stylers": [{ "color": "#242f3e" }] },
                    { "featureType": "poi", "stylers": [{ "visibility": "off" }] },
                    { "featureType": "road", "elementType": "geometry", "stylers": [{ "color": "#304050" }] },
                    { "featureType": "road", "elementType": "geometry.stroke", "stylers": [{ "color": "#212a37" }] },
                    { "featureType": "water", "elementType": "geometry", "stylers": [{ "color": "#17263c" }] }
                ],
                disableDefaultUI: true, zoomControl: true
            });
        }

        // Limpa desenhos anteriores se existirem
        if (window._prevMeetingElements) {
            window._prevMeetingElements.forEach(e => e.setMap(null));
        }
        window._prevMeetingElements = [];

        // 1. Desenha a ROTA REAL traçada (Polyline dos pathPoints)
        const pathPoints = m.pathPoints || [];
        if (pathPoints.length >= 2) {
            const realPath = new google.maps.Polyline({
                path: pathPoints.map(p => ({ lat: p.lat, lng: p.lng })),
                map: _meetingMap,
                strokeColor: '#BF9A56', 
                strokeWeight: 6, 
                strokeOpacity: 0.9,
                zIndex: 10
            });
            window._prevMeetingElements.push(realPath);

            // Ajusta o zoom para ver toda a rota real
            const bounds = new google.maps.LatLngBounds();
            pathPoints.forEach(p => bounds.extend(p));
            _meetingMap.fitBounds(bounds);
        }

        // 2. Opcional: Desenha rota pelas ruas (Directions) apenas como guia se houver passageiros
        const start = pathPoints.length > 0 ? pathPoints[0] : null;
        const end = pathPoints.length > 0 ? pathPoints[pathPoints.length - 1] : null;
        
        if (start && end) {
            const waypoints = (m.passengers || [])
                .filter(p => p.pickedUp && p.lat && p.lng)
                .map(p => ({ location: { lat: p.lat, lng: p.lng }, stopover: true }));

            const ds = new google.maps.DirectionsService();
            const dr = new google.maps.DirectionsRenderer({
                map: _meetingMap,
                suppressMarkers: true,
                preserveViewport: true, // Não muda o zoom já definido pela rota real
                polylineOptions: { strokeColor: '#BF9A56', strokeWeight: 3, strokeOpacity: 0.3 } // Mais fina e transparente
            });
            window._prevMeetingElements.push(dr);

            ds.route({
                origin: { lat: start.lat, lng: start.lng },
                destination: { lat: end.lat, lng: end.lng },
                waypoints: waypoints,
                travelMode: 'DRIVING'
            }, (result, status) => {
                if (status === 'OK') dr.setDirections(result);
            });
        }

        // 2. Marcadores Início/Fim
        const startMarker = new google.maps.Marker({
            position: { lat: start.lat, lng: start.lng },
            map: _meetingMap,
            icon: { path: google.maps.SymbolPath.CIRCLE, scale: 9, fillColor: '#10b981', fillOpacity: 1, strokeColor: '#fff', strokeWeight: 2.5 },
            title: 'Início do Percurso'
        });
        const endMarker = new google.maps.Marker({
            position: { lat: end.lat, lng: end.lng },
            map: _meetingMap,
            icon: { path: google.maps.SymbolPath.CIRCLE, scale: 9, fillColor: '#ef4444', fillOpacity: 1, strokeColor: '#fff', strokeWeight: 2.5 },
            title: 'Final do Percurso'
        });
        window._prevMeetingElements.push(startMarker, endMarker);

        // 3. Marcadores de Caronas (Diferenciados)
        (m.passengers || []).forEach(p => {
            if (p.lat && p.lng && p.pickedUp) {
                const pMarker = new google.maps.Marker({
                    position: { lat: p.lat, lng: p.lng },
                    map: _meetingMap,
                    icon: {
                        url: 'https://maps.google.com/mapfiles/ms/icons/blue-dot.png',
                        scaledSize: new google.maps.Size(32, 32)
                    },
                    title: `Retirada: ${p.name}`
                });
                window._prevMeetingElements.push(pMarker);
            }
        });

    }, 300);
}

// ══════════════════════════════════════════════════════════════════════
//  CONFIRM DIALOG HELPER
// ══════════════════════════════════════════════════════════════════════
function _showConfirm(title, message, onConfirm) {
    document.getElementById('confirm-title').textContent = title;
    document.getElementById('confirm-message').innerHTML = message;
    _openModal('modal-confirm');
    const btnYes = document.getElementById('btn-confirm-yes');
    const newBtn = btnYes.cloneNode(true);
    btnYes.parentNode.replaceChild(newBtn, btnYes);
    newBtn.addEventListener('click', () => { closeAllModals(); onConfirm(); });
}

// ══════════════════════════════════════════════════════════════════════
//  INJECT NEW SIDEBAR ITEMS
// ══════════════════════════════════════════════════════════════════════
document.addEventListener('DOMContentLoaded', () => {
    const sidebar = document.querySelector('.nav-links');
    if (!sidebar) return;

    // Inject CSS
    const style = document.createElement('style');
    style.textContent = `
        /* ── REGISTERED VENDORS MODAL ──────────────── */
        #modal-registered-vendors, #modal-analyze-meetings, #modal-edit-vendor, #modal-msg-vendor, #modal-meeting-route {
            max-width: 680px; padding: 0; overflow: hidden;
        }
        .meetings-modal-header {
            padding: 22px 28px 18px;
            border-bottom: 1px solid var(--border);
            background: linear-gradient(160deg, var(--bg-tertiary), var(--bg-secondary));
            display: flex; align-items: center; justify-content: space-between;
        }
        .meetings-modal-header h3 { font-size: 1.05rem; display: flex; align-items: center; gap: 10px; margin: 0; }
        .meetings-modal-header .mh-sub { font-size: 0.72rem; color: var(--text-muted); margin-top: 2px; }
        .meetings-modal-body { padding: 20px 28px; max-height: 70vh; overflow-y: auto; }
        .meetings-search-bar { display: flex; gap: 10px; margin-bottom: 16px; }
        .meetings-search-bar input { flex: 1; height: 40px; background: var(--bg-secondary); border: 1px solid var(--border); border-radius: 10px; padding: 0 14px; color: white; font-size: 0.88rem; outline: none; }
        .meetings-search-bar input:focus { border-color: var(--primary); }
        #reg-vendor-count { font-size: 0.72rem; color: var(--text-muted); margin-bottom: 12px; }

        /* Vendor Cards */
        .rv-card { display: flex; align-items: flex-start; gap: 12px; padding: 14px 16px; background: rgba(255,255,255,0.02); border: 1px solid var(--border); border-radius: 14px; margin-bottom: 8px; transition: all 0.2s; }
        .rv-card:hover { background: rgba(255,255,255,0.04); border-color: rgba(191,154,86,0.2); }
        .rv-avatar { width: 40px; height: 40px; background: rgba(191,154,86,0.15); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 1rem; color: var(--primary); flex-shrink: 0; }
        .rv-info { flex: 1; min-width: 0; }
        .rv-name { font-weight: 600; font-size: 0.92rem; margin-bottom: 4px; }
        .rv-detail { font-size: 0.72rem; color: var(--text-muted); display: flex; align-items: center; gap: 5px; margin-bottom: 2px; }
        .rv-actions { display: flex; gap: 6px; flex-shrink: 0; }
        .rv-btn { width: 32px; height: 32px; border-radius: 8px; border: 1px solid var(--border); background: rgba(255,255,255,0.04); display: flex; align-items: center; justify-content: center; cursor: pointer; transition: all 0.15s; }
        .rv-btn i { width: 15px; height: 15px; }
        .rv-btn-msg { color: var(--accent-cyan, #00d2ff); }
        .rv-btn-msg:hover { background: rgba(0,210,255,0.1); border-color: rgba(0,210,255,0.3); }
        .rv-btn-edit { color: var(--primary); }
        .rv-btn-edit:hover { background: rgba(191,154,86,0.1); border-color: var(--primary); }
        .rv-btn-delete { color: #ef4444; }
        .rv-btn-delete:hover { background: rgba(239,68,68,0.1); border-color: rgba(239,68,68,0.4); }

        /* Edit Vendor Form */
        .edit-vendor-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
        .edit-vendor-grid .span2 { grid-column: span 2; }
        .ev-group label { display: block; font-size: 0.72rem; font-weight: 600; color: var(--text-muted); text-transform: uppercase; letter-spacing: 1px; margin-bottom: 6px; }
        .ev-group input { width: 100%; height: 42px; background: var(--bg-secondary); border: 1px solid var(--border); border-radius: 10px; padding: 0 14px; color: white; font-size: 0.88rem; outline: none; }
        .ev-group input:focus { border-color: var(--primary); }
        .section-label { font-size: 0.7rem; font-weight: 700; text-transform: uppercase; letter-spacing: 1.5px; color: var(--primary); margin: 16px 0 10px; display: flex; align-items: center; gap: 6px; }

        /* Meetings Analysis */
        .am-stats-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; margin-bottom: 20px; }
        .am-stat { background: rgba(255,255,255,0.03); border: 1px solid var(--border); border-radius: 12px; padding: 14px; text-align: center; }
        .am-stat .sv { font-size: 1.6rem; font-weight: 800; color: var(--primary); }
        .am-stat .sl { font-size: 0.62rem; color: var(--text-muted); text-transform: uppercase; letter-spacing: 1px; margin-top: 2px; }
        .am-card { background: rgba(255,255,255,0.03); border: 1px solid var(--border); border-radius: 14px; padding: 16px 18px; margin-bottom: 10px; transition: all 0.2s; }
        .am-card:hover { border-color: rgba(191,154,86,0.25); }
        .am-card-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 10px; }
        .am-driver-name { font-weight: 700; font-size: 0.9rem; display: flex; align-items: center; gap: 6px; }
        .am-date { font-size: 0.7rem; color: var(--text-muted); margin-top: 3px; }
        .am-km-badge { background: rgba(191,154,86,0.15); border: 1px solid rgba(191,154,86,0.3); border-radius: 20px; padding: 4px 12px; font-size: 0.78rem; font-weight: 700; color: var(--primary); white-space: nowrap; }
        .am-passengers { display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 10px; }
        .am-passenger-tag { padding: 3px 10px; border-radius: 20px; font-size: 0.7rem; border: 1px solid; }
        .am-passenger-tag.picked { background: rgba(16,185,129,0.1); color: #10b981; border-color: rgba(16,185,129,0.3); }
        .am-passenger-tag.not-picked { background: rgba(255,255,255,0.04); color: var(--text-muted); border-color: var(--border); }
        .am-card-footer { display: flex; align-items: center; gap: 10px; }
        .am-progress-bar { flex: 1; height: 4px; background: rgba(255,255,255,0.08); border-radius: 4px; overflow: hidden; }
        .am-progress-fill { height: 100%; background: linear-gradient(90deg, var(--primary), #10b981); border-radius: 4px; transition: width 0.5s ease; }
        .am-pct { font-size: 0.7rem; color: var(--text-muted); white-space: nowrap; }
        .am-map-btn { background: rgba(59,130,246,0.1); border: 1px solid rgba(59,130,246,0.3); border-radius: 8px; padding: 5px 10px; color: #3b82f6; font-size: 0.72rem; cursor: pointer; display: flex; align-items: center; gap: 5px; transition: all 0.15s; }
        .am-map-btn:hover { background: rgba(59,130,246,0.2); }

        /* Meeting Route Map Modal */
        #meeting-route-map { width: 100%; height: 320px; border-radius: 0 0 16px 16px; }
        .mr-info-bar { display: flex; gap: 16px; padding: 14px 24px; background: rgba(255,255,255,0.02); border-bottom: 1px solid var(--border); flex-wrap: wrap; align-items: center; }
        .mr-driver { font-weight: 700; font-size: 0.95rem; }
        .mr-meta { font-size: 0.78rem; color: var(--text-muted); }
        .mr-km { font-weight: 800; font-size: 1.1rem; color: var(--primary); margin-left: auto; }
        .mr-passengers-wrap { padding: 10px 24px; display: flex; flex-wrap: wrap; gap: 6px; border-bottom: 1px solid var(--border); }

        /* Message to vendor modal */
        #modal-msg-vendor { max-width: 440px; }
        .msg-vendor-header { padding: 20px 24px; border-bottom: 1px solid var(--border); }
        .msg-vendor-header h3 { font-size: 1rem; margin: 0; }
        .msg-vendor-header .mv-to { font-size: 0.78rem; color: var(--text-muted); margin-top: 4px; }
        .msg-vendor-body { padding: 20px 24px; }
        .msg-vendor-body textarea { width: 100%; min-height: 100px; background: var(--bg-secondary); border: 1px solid var(--border); border-radius: 12px; padding: 12px 16px; color: white; font-family: inherit; font-size: 0.88rem; resize: vertical; outline: none; }
        .msg-vendor-body textarea:focus { border-color: var(--primary); }
        .msg-vendor-footer { padding: 16px 24px; border-top: 1px solid var(--border); display: flex; gap: 10px; justify-content: flex-end; }
    `;
    document.head.appendChild(style);

    // Inject new nav items before the <hr>
    const hr = sidebar.querySelector('hr.divider-hr') || sidebar.querySelector('hr');
    const vendorsItem = document.createElement('li');
    vendorsItem.dataset.action = 'open-registered-vendors';
    vendorsItem.innerHTML = `<i data-lucide="contact-2"></i> <span>Vendedores Cadastrados</span><i data-lucide="plus-circle" class="add-shortcut-btn" title="Adicionar Atalho"></i>`;
    vendorsItem.addEventListener('click', openRegisteredVendors);

    const meetingsItem = document.createElement('li');
    meetingsItem.dataset.action = 'open-analyze-meetings';
    meetingsItem.innerHTML = `<i data-lucide="chart-bar-stacked"></i> <span>Analisar Reuniões</span><i data-lucide="plus-circle" class="add-shortcut-btn" title="Adicionar Atalho"></i>`;
    meetingsItem.addEventListener('click', openAnalyzeMeetings);

    if (hr) {
        sidebar.insertBefore(meetingsItem, hr);
        sidebar.insertBefore(vendorsItem, meetingsItem);
    } else {
        sidebar.appendChild(vendorsItem);
        sidebar.appendChild(meetingsItem);
    }
    lucide.createIcons();

    // Inject modals HTML
    const modalsContainer = document.querySelector('.modals-wrapper') || document.getElementById('modal-overlay')?.parentElement || document.body;
    const newModals = document.createElement('div');
    newModals.innerHTML = `

    <!-- ── MODAL: VENDEDORES CADASTRADOS ───────────── -->
    <div id="modal-registered-vendors" class="modal-content glass-panel hidden">
        <div class="meetings-modal-header">
            <div>
                <h3><i data-lucide="contact-2"></i> Vendedores Cadastrados</h3>
                <div class="mh-sub" id="reg-vendor-count">Carregando...</div>
            </div>
            <button class="close-btn icon-btn" onclick="closeAllModals()" style="background:none;border:none;color:var(--text-muted);cursor:pointer;font-size:1.4rem;line-height:1">&times;</button>
        </div>
        <div class="meetings-modal-body">
            <div class="meetings-search-bar">
                <input type="text" id="reg-vendor-search" placeholder="Buscar por nome ou CPF..." oninput="renderRegisteredVendors(this.value)">
            </div>
            <div id="reg-vendors-list"></div>
        </div>
    </div>

    <!-- ── MODAL: EDITAR VENDEDOR ──────────────────── -->
    <div id="modal-edit-vendor" class="modal-content glass-panel hidden" style="max-width:520px">
        <div class="meetings-modal-header">
            <h3><i data-lucide="edit-2"></i> Editar Vendedor</h3>
            <button onclick="closeAllModals()" style="background:none;border:none;color:var(--text-muted);cursor:pointer;font-size:1.4rem">&times;</button>
        </div>
        <div class="meetings-modal-body">
            <div class="edit-vendor-grid">
                <div class="ev-group span2"><label>Nome Completo</label><input type="text" id="edit-vendor-name" placeholder="Nome do vendedor"></div>
                <div class="ev-group"><label>E-mail</label><input type="email" id="edit-vendor-email" placeholder="email@exemplo.com"></div>
                <div class="ev-group"><label>CPF</label><input type="text" id="edit-vendor-cpf" readonly style="opacity:0.5"></div>
            </div>
            <div class="section-label"><i data-lucide="map-pin" style="width:13px;height:13px"></i> Endereço Residencial</div>
            <div class="edit-vendor-grid">
                <div class="ev-group span2"><label>Rua / Avenida</label><input type="text" id="edit-vendor-rua" placeholder="Nome da rua"></div>
                <div class="ev-group"><label>Número</label><input type="text" id="edit-vendor-num" placeholder="123"></div>
                <div class="ev-group"><label>Bairro</label><input type="text" id="edit-vendor-bairro" placeholder="Bairro"></div>
                <div class="ev-group"><label>Cidade</label><input type="text" id="edit-vendor-cidade" placeholder="Cidade"></div>
                <div class="ev-group"><label>CEP</label><input type="text" id="edit-vendor-cep" placeholder="00000-000"></div>
            </div>
        </div>
        <div class="modal-footer">
            <button class="btn btn-secondary close-modal" onclick="closeAllModals()">Cancelar</button>
            <button class="btn btn-primary" id="btn-save-vendor" onclick="saveEditVendor()">Salvar Alterações</button>
        </div>
    </div>

    <!-- ── MODAL: ENVIAR MENSAGEM PARA VENDEDOR ────── -->
    <div id="modal-msg-vendor" class="modal-content glass-panel hidden">
        <div class="msg-vendor-header">
            <h3><i data-lucide="message-circle" style="display:inline;width:18px;height:18px;margin-right:8px"></i> Enviar Mensagem</h3>
            <div class="mv-to">Para: <strong id="msg-to-vendor-name">Vendedor</strong></div>
        </div>
        <div class="msg-vendor-body">
            <input type="hidden" id="msg-to-vendor-uid">
            <textarea id="msg-to-vendor-input" placeholder="Digite sua mensagem para o vendedor..."></textarea>
        </div>
        <div class="msg-vendor-footer">
            <button class="btn btn-secondary" onclick="closeAllModals()">Cancelar</button>
            <button class="btn btn-primary" id="btn-send-msg-vendor" onclick="sendMessageToVendor()">Enviar Mensagem</button>
        </div>
    </div>

    <!-- ── MODAL: ANALISAR REUNIÕES ───────────────── -->
    <div id="modal-analyze-meetings" class="modal-content glass-panel hidden">
        <div class="meetings-modal-header">
            <div>
                <h3><i data-lucide="chart-bar-stacked"></i> Analisar Reuniões</h3>
                <div class="mh-sub">Histórico completo de caronas e percursos</div>
            </div>
            <button onclick="closeAllModals()" style="background:none;border:none;color:var(--text-muted);cursor:pointer;font-size:1.4rem">&times;</button>
        </div>
        <div class="meetings-modal-body">
            <!-- Stats -->
            <div class="am-stats-grid">
                <div class="am-stat"><div class="sv" id="am-stat-km">0</div><div class="sl">KM Total</div></div>
                <div class="am-stat"><div class="sv" id="am-stat-meetings">0</div><div class="sl">Reuniões</div></div>
                <div class="am-stat"><div class="sv" id="am-stat-passengers">0</div><div class="sl">Caronas</div></div>
                <div class="am-stat"><div class="sv" id="am-stat-drivers">0</div><div class="sl">Motoristas</div></div>
            </div>
            <!-- Search -->
            <div class="meetings-search-bar" style="margin-bottom:16px">
                <input type="text" placeholder="Filtrar por motorista..." oninput="renderMeetingsList(this.value)">
            </div>
            <div id="am-meetings-list"></div>
        </div>
    </div>

    <!-- ── MODAL: VER ROTA DE REUNIÃO ────────────── -->
    <div id="modal-meeting-route" class="modal-content glass-panel hidden" style="max-width:700px;padding:0">
        <div class="meetings-modal-header" style="padding:16px 24px">
            <h3><i data-lucide="route"></i> Rota da Reunião</h3>
            <button onclick="closeAllModals()" style="background:none;border:none;color:var(--text-muted);cursor:pointer;font-size:1.4rem">&times;</button>
        </div>
        <div class="mr-info-bar">
            <div>
                <div class="mr-driver" id="mr-driver-name">Motorista</div>
                <div class="mr-meta" id="mr-date">--</div>
            </div>
            <div class="mr-km" id="mr-km">0 km</div>
        </div>
        <div class="mr-passengers-wrap" id="mr-passengers-list"></div>
        <div id="meeting-route-map"></div>
    </div>
    `;
    document.body.insertAdjacentElement('beforeend', newModals);
    lucide.createIcons();
});
