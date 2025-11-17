const sidebar = document.querySelector(".sidebar");
const sidebarOpenBtn = document.querySelector("#sidebar-open");
const sidebarCloseBtn = document.querySelector("#sidebar-close");
const sidebarLockBtn = document.querySelector("#lock-icon");

// Function to update body padding based on sidebar state
const updateBodyPadding = () => {
  const body = document.body;
  if (sidebar.classList.contains("close")) {
    body.style.paddingLeft = "88px";
  } else {
    body.style.paddingLeft = "260px";
  }
};

// Function to toggle the lock state of the sidebar
const toggleLock = () => {
  sidebar.classList.toggle("locked");
  // If the sidebar is not locked
  if (!sidebar.classList.contains("locked")) {
    sidebar.classList.add("hoverable");
    sidebarLockBtn.classList.replace("bx-lock-alt", "bx-lock-open-alt");
  } else {
    sidebar.classList.remove("hoverable");
    sidebarLockBtn.classList.replace("bx-lock-open-alt", "bx-lock-alt");
  }
  updateBodyPadding();
};
// Function to hide the sidebar when the mouse leaves
const hideSidebar = () => {
  if (sidebar.classList.contains("hoverable")) {
    sidebar.classList.add("close");
    updateBodyPadding();
  }
};
// Function to show the sidebar when the mouse enter
const showSidebar = () => {
  if (sidebar.classList.contains("hoverable")) {
    sidebar.classList.remove("close");
    updateBodyPadding();
  }
};
// Function to show and hide the sidebar
const toggleSidebar = () => {
  sidebar.classList.toggle("close");
  updateBodyPadding();
};
// If the window width is less than 800px, close the sidebar and remove hoverability and lock
if (window.innerWidth < 800) {
  sidebar.classList.add("close");
  sidebar.classList.remove("locked");
  sidebar.classList.remove("hoverable");
  document.body.style.paddingLeft = "0";
}

// Initialize body padding on page load
updateBodyPadding();

// Adding event listeners to buttons and sidebar for the corresponding actions
sidebarLockBtn.addEventListener("click", toggleLock);
sidebar.addEventListener("mouseleave", hideSidebar);
sidebar.addEventListener("mouseenter", showSidebar);
sidebarOpenBtn.addEventListener("click", toggleSidebar);
sidebarCloseBtn.addEventListener("click", toggleSidebar);

// Update body padding on window resize
window.addEventListener("resize", () => {
  if (window.innerWidth < 800) {
    document.body.style.paddingLeft = "0";
  } else {
    updateBodyPadding();
  }
});


  const picker = new easepick.create({
  element: document.getElementById('select-datas'),
  format: 'DD/MM/YYYY',
  lang: 'pt-BR',
  css: [
  'https://cdn.jsdelivr.net/npm/@easepick/bundle@1.2.1/dist/index.css',
  ],
  plugins: ['RangePlugin'],
  RangePlugin: {
  tooltip: true,
  delimiter: ' até ',
  locale: {
  one: 'dia',
  other: 'dias',
},
},
});
</script>

// ========================================
// SIDEBAR ACTIVE LINK
// ========================================

// Get all sidebar links
const sidebarLinks = document.querySelectorAll('.sidebar .link');

// Add click event to each link
sidebarLinks.forEach(link => {
  link.addEventListener('click', function() {
    // Remove active class from all links
    sidebarLinks.forEach(l => l.classList.remove('active'));
    
    // Add active class to clicked link
    this.classList.add('active');
  });
});

// Set active link based on current section
const sections = document.querySelectorAll('section[id]');

const setActiveLink = () => {
  const scrollY = window.pageYOffset;
  
  sections.forEach(section => {
    const sectionHeight = section.offsetHeight;
    const sectionTop = section.offsetTop - 100;
    const sectionId = section.getAttribute('id');
    
    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      const activeLink = document.querySelector(`.sidebar .link[href="#${sectionId}"]`);
      if (activeLink) {
        sidebarLinks.forEach(l => l.classList.remove('active'));
        activeLink.classList.add('active');
      }
    }
  });
};

// Update active link on scroll
window.addEventListener('scroll', setActiveLink);

// Set initial active link
setActiveLink();
