       function loadPlotListings() {
    const plots = JSON.parse(localStorage.getItem('plothive_seekers') || []);
    const container = document.getElementById('plotsContainer');
    
    container.innerHTML = seekers.map(seeker => `
        <div class="seeker-card bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
            <div class="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                <div class="flex items-start space-x-4">
                    <div class="w-12 h-12 flex items-center justify-center bg-primary/10 text-primary rounded-xl">
                        <i class="ri-briefcase-line ri-xl"></i>
                    </div>
                    <div>
                        <h3 class="text-lg font-bold text-gray-900">${seeker.title}</h3>
                        <p class="text-gray-600">${seeker.description.substring(0, 100)}...</p>
                        <div class="flex flex-wrap gap-2 mt-2">
                            <span class="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">${seeker.category}</span>
                            ${seeker.duration === 'short-term' ? 
                              '<span class="px-2 py-1 bg-green-300 text-yellow-700 text-xs rounded-full verified-badge">Verified</span>' : ''}
                        </div>
                    </div>
                </div>
                <div class="flex flex-col items-end">
                    <p class="text-xl font-bold text-primary">₦${parseInt(seeker.amount).toLocaleString()}</p>
                    <p class="text-sm text-gray-500">Budget</p>
                    <div class="mt-4 flex space-x-2">
                        <button onclick="applyForPlot('${plot.id}')" class="px-4 py-2 bg-primary text-white rounded-button hover:bg-primary/90">
                            Apply Now
                        </button>
                        <button onclick="savePlot('${plot.id}')" class="px-4 py-2 border border-gray-200 text-gray-700 rounded-button hover:bg-gray-50">
                            Save
                        </button>
                    </div>
                </div>
            </div>
            <div class="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                <div class="flex items-center space-x-2">
                    <i class="ri-time-line text-gray-400"></i>
                    <span class="text-sm text-gray-500">Posted ${formatDate(plot.postedAt)}</span>
                </div>
                <div class="flex items-center space-x-2">
                    <i class="ri-user-line text-gray-400"></i>
                    <span class="text-sm text-gray-500">0 applicants</span>
                </div>
                <div class="flex items-center space-x-2">
                    <i class="ri-calendar-line text-gray-400"></i>
                    <span class="text-sm text-gray-500">Deadline: ${formatDate(plot.due)}</span>
                </div>
            </div>
            <!-- Vendors Info -->
            <div class="mt-4 pt-4 border-t border-gray-100">
                <div class="flex items-center space-x-3">
                    <img src="${plot.vendor.profilePic || 'https://readdy.ai/api/search-image?query=professional%20headshot%20of%20a%20young%20Nigerian%20male%20businessman'}" 
                         alt="${plot.vendor.name}" class="w-10 h-10 rounded-full object-cover">
                    <div>
                        <p class="font-medium">${plot.vendor.name}</p>
                        <div class="flex items-center space-x-2 text-sm text-gray-500">
                            <i class="ri-phone-line"></i>
                            <span>${plot.vendor.phone}</span>
                        </div>
                        <div class="flex items-center space-x-2 text-sm text-gray-500">
                            <i class="ri-mail-line"></i>
                            <span>${plot.vendor.email}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
}

// Call this when the page loads
document.addEventListener('DOMContentLoaded', function() {
    loadPlotListings();
    // Helper function to format dates
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
}

// View order function
function viewOrder(orderId) {
    const plots = JSON.parse(localStorage.getItem('plothive_seekers') || []);
    const plot = plotss.find(j => j.id === orderId);
    
    if (plot) {
        alert(`Plot Details:\n\nTitle: ${plot.title}\nDescription: ${plot.description}\nBudget: ₦${plot.amount.toLocaleString()}\nVendor: ${plot.vendor.name}\nContact: ${plot.vendor.phone}`);
    } else {
        alert('Plot details not found');
    }
}
});
        // Main initialization
        document.addEventListener('DOMContentLoaded', function() {
            // Check authentication
            const email = localStorage.getItem("plothive_loggedIn");
            if (!email) {
                window.location.href = "Landing.html";
                return;
            }
            
            // Load user data
            const user = JSON.parse(localStorage.getItem(`plothive_user_${email}`));
            if (user) {
                document.getElementById('dashboardUserName').textContent = user.name;
                
                // Set profile image if available
                if (user.profileImage) {
                    document.getElementById('headerProfileImage').src = user.profileImage;
                    document.getElementById('sidebarProfileImage').src = user.profileImage;
                }
            }
            
            // Initialize sidebar toggle
            document.getElementById('toggleSidebar').addEventListener('click', function() {
                document.querySelector('.sidebar').classList.toggle('collapsed');
            });
            
            // Initialize mobile menu toggle
            const mobileMenuToggle = document.getElementById('mobileMenuToggle');
            const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');
            const sidebar = document.querySelector('.sidebar');
            
            if (mobileMenuToggle && mobileMenuOverlay && sidebar) {
                mobileMenuToggle.addEventListener('click', function() {
                    sidebar.classList.add('open');
                    mobileMenuOverlay.classList.remove('hidden');
                });
                
                mobileMenuOverlay.addEventListener('click', function() {
                    sidebar.classList.remove('open');
                    mobileMenuOverlay.classList.add('hidden');
                });
            }
        });
        
        function showLogoutModal() {
            document.getElementById('logoutConfirmModal').classList.remove('hidden');
        }
        
        function closeLogoutModal() {
            document.getElementById('logoutConfirmModal').classList.add('hidden');
        }
        
        function confirmLogout() {
            localStorage.removeItem("plothive_loggedIn");
            window.location.href = "Landing.html";
        }
        
        // Function to handle Plot application
        function applyForPlot(plotId) {
            alert(`Requesting for Plot ${plotId} - This would open an application form in a real app`);
        }
        
        // Function to save Plot
        function savePlot(plotId) {
            alert(`Plot ${plotId} saved to your Options`);
        }

        
let plotsData = JSON.parse(localStorage.getItem('plothive_plots')) || [];

// Update the renderOrdersTable function to:
function renderOrdersTable(orders, page = 1, itemsPerPage = 5) {
    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const paginatedOrders = orders.slice(start, end);
    
    const tableBody = document.getElementById('ordersTableBody');
    tableBody.innerHTML = '';
    
    paginatedOrders.forEach(order => {
        const row = document.createElement('tr');
        row.className = 'hover:bg-gray-50 transition-colors duration-300';
        row.innerHTML = `
            <td class="py-3">${order.id}</td>
            <td class="py-3">${order.vendor.name.split(' ')[0]}.</td>
            <td class="py-3">${order.title}</td>
            <td class="py-3 font-medium">₦${order.amount.toLocaleString()}</td>
            <td class="py-3">${new Date(order.due).toLocaleDateString()}</td>
            <td class="py-3">
                <span class="px-2 py-1 ${getStatusClass('pending')} text-xs rounded-full">
                    Pending
                </span>
            </td>
            <td class="py-3">
                <button class="text-primary hover:text-primary/80 mr-2" title="View" onclick="viewOrder('${order.id}')">
                    <i class="ri-eye-line"></i>
                </button>
                <button class="text-blue-500 hover:text-blue-700" title="Message" onclick="openMessageModal('${order.vendor.name.split(' ')[0]}')">
                    <i class="ri-chat-3-line"></i>
                </button>
            </td>
        `;
        tableBody.appendChild(row);
    });
    
    document.getElementById('ordersShown').textContent = `${start + 1}-${Math.min(end, orders.length)}`;
    document.getElementById('totalOrders').textContent = orders.length;
    
    document.getElementById('prevPage').disabled = page === 1;
    document.getElementById('nextPage').disabled = end >= orders.length;
    
    document.getElementById('prevPage').onclick = function() {
        if (page > 1) renderOrdersTable(orders, page - 1);
    };
    
    document.getElementById('nextPage').onclick = function() {
        if (end < orders.length) renderOrdersTable(orders, page + 1);
    };
}

// Initialize with plots data instead of ordersData
renderOrdersTable(plotsData);