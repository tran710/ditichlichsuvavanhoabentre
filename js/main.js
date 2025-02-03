document.addEventListener("DOMContentLoaded", function () {
  // Intersection Observer for scroll animations
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    {
      threshold: 0.1,
    }
  );

  // Observe all sections
  document
    .querySelectorAll(".overview, .featured-sites, .why-visit")
    .forEach((section) => {
      observer.observe(section);
    });

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      document.querySelector(this.getAttribute("href")).scrollIntoView({
        behavior: "smooth",
      });
    });
  });

  // Mobile menu toggle
  const menuToggle = document.querySelector(".menu-toggle");
  const mainNav = document.querySelector(".main-nav");
  let isAnimating = false;

  if (menuToggle) {
    menuToggle.addEventListener("click", function () {
      if (isAnimating) return;
      isAnimating = true;

      mainNav.classList.toggle("active");
      
      setTimeout(() => {
        isAnimating = false;
      }, 300);
    });
  }

  // Close menu when clicking outside
  document.addEventListener("click", function (event) {
    const isClickInside = mainNav.contains(event.target) || menuToggle.contains(event.target);
    
    if (!isClickInside && mainNav.classList.contains("active")) {
      menuToggle.click();
    }
  });

  // Handle window resize
  let resizeTimer;
  window.addEventListener("resize", function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {
      if (window.innerWidth > 768) {
        mainNav.classList.remove("active");
      }
    }, 250);
  });
});

function shareOnFacebook() {
    const url = encodeURIComponent(window.location.href);
    const title = encodeURIComponent(document.title);
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank');
}

function shareOnTwitter() {
    const url = encodeURIComponent(window.location.href);
    const title = encodeURIComponent(document.title);
    window.open(`https://twitter.com/intent/tweet?url=${url}&text=${title}`, '_blank');
}

function copyPageUrl() {
    navigator.clipboard.writeText(window.location.href).then(() => {
        showToast('Đã sao chép liên kết!');
    });
}

function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    document.body.appendChild(toast);
    
    // Trigger reflow
    toast.offsetHeight;
    
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.remove();
    }, 2000);
}

// Rating System
document.addEventListener('DOMContentLoaded', function() {
    const starRating = document.querySelector('.star-rating');
    if (starRating) {
        const stars = starRating.querySelectorAll('i');
        
        stars.forEach(star => {
            star.addEventListener('mouseover', function() {
                const rating = this.dataset.rating;
                highlightStars(stars, rating);
            });

            star.addEventListener('click', function() {
                const rating = this.dataset.rating;
                submitRating(rating);
                stars.forEach(s => s.classList.add('active'));
            });
        });

        starRating.addEventListener('mouseleave', function() {
            stars.forEach(star => {
                if (!star.classList.contains('active')) {
                    star.className = 'far fa-star';
                }
            });
        });
    }
});

function highlightStars(stars, rating) {
    stars.forEach(star => {
        const starRating = star.dataset.rating;
        if (starRating <= rating) {
            star.className = 'fas fa-star';
        } else {
            star.className = 'far fa-star';
        }
    });
}

function submitRating(rating) {
    // TODO: Implement API call to save rating
    console.log('Rating submitted:', rating);
    showToast('Cảm ơn bạn đã đánh giá!');
}

// Comment System
document.addEventListener('DOMContentLoaded', function() {
    const commentForm = document.getElementById('comment-form');
    if (commentForm) {
        commentForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const comment = this.querySelector('textarea').value;
            submitComment(comment);
            this.reset();
        });
    }

    // Load initial comments
    loadComments();
});

function submitComment(comment) {
    // TODO: Implement API call to save comment
    console.log('Comment submitted:', comment);
    
    // Temporarily add comment to UI
    addCommentToUI({
        author: 'Khách',
        date: new Date(),
        text: comment
    });
    
    showToast('Bình luận đã được gửi!');
}

function addCommentToUI(comment) {
    const commentsList = document.querySelector('.comments-list');
    const commentElement = document.createElement('div');
    commentElement.className = 'comment-item';
    commentElement.innerHTML = `
        <div class="comment-header">
            <span class="comment-author">${comment.author}</span>
            <span class="comment-date">${formatDate(comment.date)}</span>
        </div>
        <div class="comment-text">${comment.text}</div>
    `;
    commentsList.insertBefore(commentElement, commentsList.firstChild);
}

function formatDate(date) {
    return new Date(date).toLocaleDateString('vi-VN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

function loadComments() {
    // TODO: Implement API call to load comments
    // For now, we'll add some dummy comments
    const dummyComments = [
        {
            author: 'Nguyễn Văn A',
            date: new Date(2024, 2, 15),
            text: 'Địa điểm rất đẹp và có ý nghĩa lịch sử.'
        },
        {
            author: 'Trần Thị B',
            date: new Date(2024, 2, 14),
            text: 'Tôi rất thích không gian yên bình ở đây.'
        }
    ];

    dummyComments.forEach(comment => addCommentToUI(comment));
}
