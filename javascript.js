// Copy Verified GSTIN
function copyGST() {
    const gstText = document.getElementById("gst-number").innerText;
    const tempInput = document.createElement("input");
    tempInput.value = gstText;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand("copy");
    document.body.removeChild(tempInput);

    const copyBtnText = document.getElementById("copy-text");
    copyBtnText.innerText = "Copied!";
    setTimeout(() => {
        copyBtnText.innerText = "Copy GST";
    }, 2000);
}

Live Cost Estimator Algorithm
function calculateCost() {
    const typeSelect = document.getElementById("est-type");
    const selectedOption = typeSelect.options[typeSelect.selectedIndex];
    const basePrice = parseFloat(selectedOption.getAttribute("data-base")) || 2000;

    const scopeMultiplier = parseFloat(document.getElementById("est-scope").value) || 1;
    const urgencyMultiplier = parseFloat(document.getElementById("est-urgency").value) || 1;
    const materialAddition = parseFloat(document.getElementById("est-material").value) || 0;

    let total = (basePrice * scopeMultiplier * urgencyMultiplier) + materialAddition;
    
    // Format to Indian Rupees
    document.getElementById("estimated-price").innerText = "₹" + Math.round(total).toLocaleString('en-IN');
}

// Category Filter
function filterCatalog(category) {
    const items = document.querySelectorAll('.catalog-card');
    const tabs = document.querySelectorAll('.tab-btn');

    tabs.forEach(tab => {
        tab.classList.remove('bg-brand-gold', 'text-slate-950');
        tab.classList.add('text-slate-400');
    });

    const activeTab = document.getElementById(`tab-${category}`);
    if (activeTab) {
        activeTab.classList.add('bg-brand-gold', 'text-slate-950');
        activeTab.classList.remove('text-slate-400');
    }

    items.forEach(item => {
        if (category === 'all' || item.classList.contains(category)) {
            item.style.display = 'flex';
        } else {
            item.style.display = 'none';
        }
    });
}

// Live Catalog Search
function searchCatalog() {
    const input = document.getElementById('catalog-search').value.toLowerCase();
    const cards = document.querySelectorAll('.catalog-card');

    cards.forEach(card => {
        const title = card.querySelector('.card-title').innerText.toLowerCase();
        const desc = card.querySelector('p').innerText.toLowerCase();
        if (title.includes(input) || desc.includes(input)) {
            card.style.display = 'flex';
        } else {
            card.style.display = 'none';
        }
    });
}

// Scroll and pre-select service in quote calculator
function openEstimate(serviceName) {
    const select = document.getElementById('est-type');
    for (let i = 0; i < select.options.length; i++) {
        if (select.options[i].text.toLowerCase().includes(serviceName.toLowerCase())) {
            select.selectedIndex = i;
            break;
        }
    }
    calculateCost();
    document.getElementById('calculator').scrollIntoView({ behavior: 'smooth' });
}

function submitEstimate(event) {
    event.preventDefault();
    document.getElementById('modal').classList.remove('hidden');
    document.getElementById('estimate-form').reset();
}

function closeModal() {
    document.getElementById('modal').classList.add('hidden');
}

// Mobile menu toggle
document.getElementById('mobile-menu-btn').addEventListener('click', () => {
    document.getElementById('mobile-menu').classList.toggle('hidden');
});

// Initialize price on load
window.onload = function() {
    calculateCost();
};