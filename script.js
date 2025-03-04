
// Mobile Menu Toggle
document.querySelector('.menu-toggle').addEventListener('click', function() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('active');
  });

// Dynamic Book Loading (Catalog Page)
const famousBooks = [
    { 
        title: "The Great Gatsby", 
        author: "F. Scott Fitzgerald", 
        price: 12.99,
        cover: "images/gatsby.jpg",
        genre: "fiction"
    },
    {
        title: "Atomic Habits",
        author: "James Clear",
        price: 14.99,
        cover: "images/atomic-habits.jpg",
        genre: "nonfiction"
    }
];

function renderBooks() {
    const bookGrid = document.querySelector('.book-grid');
    bookGrid.innerHTML = '';
    
    famousBooks.forEach(book => {
        const card = document.createElement('div');
        card.className = 'book-card';
        card.innerHTML = `
            <div class="book-cover">
                <img src="${book.cover}" alt="${book.title}">
                <div class="book-info">
                    <h3>${book.title}</h3>
                    <p>${book.author}</p>
                </div>
            </div>
            <p class="price">$${book.price}</p>
            <button class="cta-button">Add to Cart</button>
        `;
        bookGrid.appendChild(card);
    });

    // Add 3D hover effect
    gsap.utils.toArray(".book-card").forEach(card => {
        card.addEventListener("mousemove", (e) => {
            const rect = card.getBoundingClientRect();
            gsap.to(card, {
                rotationY: ((e.clientX - rect.left) / rect.width - 0.5) * 20,
                rotationX: ((e.clientY - rect.top) / rect.height - 0.5) * -20,
                duration: 0.5
            });
        });

        card.addEventListener("mouseleave", () => {
            gsap.to(card, { rotationX: 0, rotationY: 0, duration: 0.5 });
        });
    });
}

// Initialize on catalog page
if (window.location.pathname.includes('catalog.html')) {
    renderBooks();
}

// Form Submission with Animation (Contact Page)
document.querySelector('.contact-form')?.addEventListener('submit', function(e) {
    e.preventDefault();
    gsap.to(".contact-form", {
        opacity: 0,
        y: 50,
        duration: 0.3,
        onComplete: () => {
            const successMsg = document.createElement('div');
            successMsg.className = 'success-message';
            successMsg.innerHTML = `
                <i class="fas fa-check-circle"></i>
                <p>Message sent successfully!</p>
            `;
            document.querySelector('main').appendChild(successMsg);
            gsap.from(successMsg, { y: 50, opacity: 0, duration: 0.3 });
        }
    });
});
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const successMessage = document.querySelector('.success-message');
    const form = e.target;
    
    // Simulate form submission
    form.style.opacity = '0.5';
    form.querySelector('button').innerHTML = 'Sending... <i class="fas fa-spinner fa-spin"></i>';
    
    setTimeout(() => {
        form.reset();
        form.style.opacity = '1';
        form.querySelector('button').innerHTML = 'Send Message';
        successMessage.style.display = 'block';
        setTimeout(() => successMessage.style.display = 'none', 3000);
    }, 2000);
});