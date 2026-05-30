document.addEventListener('DOMContentLoaded', () => {

    // --- Page Loader ---
    const pageLoader = document.getElementById('pageLoader');
    if (pageLoader) {
        setTimeout(() => {
            pageLoader.classList.add('hidden');
            setTimeout(() => pageLoader.remove(), 600);
        }, 1200);
    }

    // --- Custom Cursor ---
    const cursor = document.getElementById('customCursor');
    if (cursor && window.matchMedia("(pointer: fine)").matches) {
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
        });

        // Add hover effect for all interactive elements
        const interactables = document.querySelectorAll('a, button, input, textarea, select, .specialty-cell, label');
        interactables.forEach(el => {
            el.addEventListener('mouseenter', () => cursor.classList.add('hovering'));
            el.addEventListener('mouseleave', () => cursor.classList.remove('hovering'));
        });
    }

    // --- Navbar Scroll Effect ---
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 30) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // --- Mobile Menu Toggle ---
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileLinks = document.querySelectorAll('.mobile-link, .mobile-btn');

    hamburger.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
        const spans = hamburger.querySelectorAll('span');
        if (mobileMenu.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translate(4px, 4px)';
            spans[1].style.transform = 'rotate(-45deg) translate(4px, -4px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.transform = 'none';
        }
    });

    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            const spans = hamburger.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.transform = 'none';
        });
    });

    // --- Premium Reveal Animations ---
    const revealElements = document.querySelectorAll('.reveal-up, .hero-visual');
    
    const revealCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    };

    const revealObserver = new IntersectionObserver(revealCallback, { 
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    });
    
    revealElements.forEach(el => {
        revealObserver.observe(el);
    });

    // --- Counter Animation ---
    const counters = document.querySelectorAll('.counter');
    
    const counterCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = +entry.target.getAttribute('data-target');
                const duration = 2000;
                const increment = target / (duration / 16); 
                
                let current = 0;
                const updateCounter = () => {
                    current += increment;
                    if (current < target) {
                        entry.target.innerText = Math.ceil(current).toLocaleString();
                        requestAnimationFrame(updateCounter);
                    } else {
                        entry.target.innerText = target.toLocaleString();
                    }
                };
                
                updateCounter();
                observer.unobserve(entry.target);
            }
        });
    };

    const counterObserver = new IntersectionObserver(counterCallback, { threshold: 0.5 });
    
    counters.forEach(counter => {
        counterObserver.observe(counter);
    });

    // --- Editorial Quote Slider ---
    const slides = document.querySelectorAll('.quote-slide');
    const prevBtn = document.getElementById('prevQuote');
    const nextBtn = document.getElementById('nextQuote');
    let currentSlide = 0;

    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove('active'));
        
        if (index >= slides.length) currentSlide = 0;
        if (index < 0) currentSlide = slides.length - 1;
        
        slides[currentSlide].classList.add('active');
    }

    if (prevBtn && nextBtn) {
        nextBtn.addEventListener('click', () => {
            currentSlide++;
            showSlide(currentSlide);
        });

        prevBtn.addEventListener('click', () => {
            currentSlide--;
            showSlide(currentSlide);
        });
    }

    // --- Textarea auto-resize (Form Interaction) ---
    const textarea = document.getElementById('message');
    if(textarea) {
        textarea.addEventListener('input', function() {
            this.style.height = 'auto';
            this.style.height = (this.scrollHeight) + 'px';
        });
    }

    // --- Specialty Detail Drawer (Feedback System) ---
    const specialtyCells = document.querySelectorAll('.specialty-cell');
    const specialtyDrawer = document.getElementById('specialtyDrawer');
    const drawerOverlay = document.getElementById('drawerOverlay');
    const drawerClose = document.getElementById('drawerClose');
    const drawerTitle = document.getElementById('drawerTitle');
    const drawerDesc = document.getElementById('drawerDesc');
    const drawerFeatures = document.getElementById('drawerFeatures');
    const drawerBookBtn = document.getElementById('drawerBookBtn');

    const specialtyData = {
        'Neonatal Surgery': {
            desc: 'Our specialized neonatal surgical team handles complex, life-threatening congenital anomalies in premature and critically ill newborns with extraordinary precision.',
            features: ['Dedicated Neonatal Intensive Care Unit (NICU)', 'ECMO capability', 'Minimally invasive approaches for newborns', '24/7 Neonatologist support']
        },
        'Minimally Invasive': {
            desc: 'We utilize advanced laparoscopic and thoracoscopic techniques to perform complex surgeries through incisions as small as a few millimeters, ensuring minimal scarring and rapid recovery.',
            features: ['Advanced robotics integration', 'Reduced post-operative pain', 'Shorter hospital stays', 'Cosmetically superior outcomes']
        },
        'Pediatric Urology': {
            desc: 'Expert diagnostic and reconstructive surgical treatment for conditions affecting the pediatric urinary tract and reproductive organs.',
            features: ['Hypospadias repair', 'Kidney stone management', 'Robotic-assisted urologic surgery', 'Comprehensive urodynamics']
        },
        'Thoracic Surgery': {
            desc: 'World-class care for congenital and acquired conditions of the chest wall, lungs, and airways in pediatric patients.',
            features: ['Pectus excavatum repair (Nuss procedure)', 'Lung resection', 'Airway reconstruction', 'Chest wall deformities']
        },
        'Gastrointestinal': {
            desc: 'Comprehensive surgical management of pediatric digestive disorders, inflammatory bowel disease, and complex congenital bowel conditions.',
            features: ['Appendectomy & Cholecystectomy', 'Bowel resection & reconstruction', 'Hirschsprung disease treatment', 'Anorectal malformations']
        },
        'Trauma & Critical Care': {
            desc: 'Our Level 1 response capability ensures immediate, expert surgical intervention for severe pediatric traumatic injuries and critical care needs.',
            features: ['24/7 dedicated pediatric trauma team', 'Rapid response protocols', 'Advanced burn care', 'Coordinated rehabilitation services']
        }
    };

    if (specialtyCells.length && specialtyDrawer) {
        specialtyCells.forEach(cell => {
            cell.addEventListener('click', () => {
                const title = cell.querySelector('h3').innerText;
                const data = specialtyData[title];
                
                if (data) {
                    drawerTitle.innerText = title;
                    drawerDesc.innerText = data.desc;
                    
                    drawerFeatures.innerHTML = '';
                    data.features.forEach(feature => {
                        const li = document.createElement('li');
                        li.innerHTML = `<i class="fa-solid fa-check"></i> ${feature}`;
                        drawerFeatures.appendChild(li);
                    });
                    
                    specialtyDrawer.classList.add('active');
                    document.body.style.overflow = 'hidden'; // Prevent background scrolling
                }
            });
        });

        function closeDrawer() {
            specialtyDrawer.classList.remove('active');
            document.body.style.overflow = '';
        }

        if (drawerClose) drawerClose.addEventListener('click', closeDrawer);
        if (drawerOverlay) drawerOverlay.addEventListener('click', closeDrawer);
        if (drawerBookBtn) drawerBookBtn.addEventListener('click', closeDrawer);
    }

    // --- Form Submission (WhatsApp Integration) ---
    const premiumForm = document.getElementById('premiumForm');
    if (premiumForm) {
        premiumForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = premiumForm.querySelector('button[type="submit"]');
            const originalHTML = btn.innerHTML;
            
            // Extract Form Data
            const parentName = document.getElementById('parentName').value;
            const patientName = document.getElementById('patientName').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;
            
            const serviceSelect = document.getElementById('service');
            const service = serviceSelect.options[serviceSelect.selectedIndex].text;
            
            const prefDate = document.getElementById('prefDate').value;
            const prefTime = document.getElementById('prefTime').value;
            
            const message = document.getElementById('message').value;

            // Format message for WhatsApp
            const waText = `*New Appointment Request*%0A%0A*Parent/Guardian:* ${parentName}%0A*Patient:* ${patientName}%0A*Phone:* ${phone}%0A*Email:* ${email}%0A*Area of Concern:* ${service}%0A*Preferred Date:* ${prefDate}%0A*Preferred Time:* ${prefTime}%0A*Condition Details:* ${message}`;
            
            btn.innerHTML = 'Redirecting to WhatsApp... <i class="fa-solid fa-spinner fa-spin"></i>';
            btn.disabled = true;
            
            setTimeout(() => {
                window.open(`https://wa.me/918586848883?text=${waText}`, '_blank');
                
                btn.innerHTML = 'Request Prepared <i class="fa-solid fa-check"></i>';
                btn.style.backgroundColor = '#25D366'; // WhatsApp Green
                btn.style.color = '#fff';
                
                premiumForm.reset();
                
                setTimeout(() => {
                    btn.innerHTML = originalHTML;
                    btn.style.backgroundColor = '';
                    btn.style.color = '';
                    btn.disabled = false;
                }, 3000);
            }, 800);
        });
    }

    // --- Global Feedback System ---
    const feedbackTrigger = document.getElementById('feedbackTrigger');
    const feedbackModal = document.getElementById('feedbackModal');
    const feedbackOverlay = document.getElementById('feedbackOverlay');
    const feedbackClose = document.getElementById('feedbackClose');
    const feedbackForm = document.getElementById('feedbackForm');
    const feedbackSuccess = document.getElementById('feedbackSuccess');

    if (feedbackTrigger && feedbackModal) {
        const openFeedback = () => {
            feedbackModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        };

        const closeFeedback = () => {
            feedbackModal.classList.remove('active');
            document.body.style.overflow = '';
            
            setTimeout(() => {
                feedbackForm.style.display = 'block';
                feedbackSuccess.style.display = 'none';
                feedbackForm.reset();
            }, 400);
        };

        feedbackTrigger.addEventListener('click', openFeedback);
        feedbackClose.addEventListener('click', closeFeedback);
        feedbackOverlay.addEventListener('click', closeFeedback);

        feedbackForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = feedbackForm.querySelector('button[type="submit"]');
            
            // Extract Feedback Data
            const rating = document.querySelector('input[name="rating"]:checked').value;
            const fbMessage = document.getElementById('feedbackMessage').value;
            
            // Format WhatsApp Message
            const waText = `*New Clinical Feedback*%0A%0A*Rating:* ${rating} Stars 🌟%0A*Feedback:* ${fbMessage}`;
            
            btn.innerHTML = 'Opening WhatsApp... <i class="fa-solid fa-spinner fa-spin"></i>';
            btn.disabled = true;

            setTimeout(() => {
                window.open(`https://wa.me/918586848883?text=${waText}`, '_blank');
                
                feedbackForm.style.display = 'none';
                feedbackSuccess.style.display = 'block';
                btn.innerHTML = 'Submit Feedback';
                btn.disabled = false;
                
                setTimeout(() => {
                    closeFeedback();
                }, 2000);
            }, 800);
        });
    }

    // --- Biography Drawer ---
    const bioTrigger = document.getElementById('bioTrigger');
    const bioDrawer = document.getElementById('bioDrawer');
    const bioOverlay = document.getElementById('bioOverlay');
    const bioClose = document.getElementById('bioClose');

    if (bioTrigger && bioDrawer) {
        const openBio = (e) => {
            e.preventDefault();
            bioDrawer.classList.add('active');
            document.body.style.overflow = 'hidden';
        };

        const closeBio = () => {
            bioDrawer.classList.remove('active');
            document.body.style.overflow = '';
        };

        bioTrigger.addEventListener('click', openBio);
        bioClose.addEventListener('click', closeBio);
        bioOverlay.addEventListener('click', closeBio);
    }

    // --- Upload Health Report Simulation (Real AJAX Upload) ---
    const uploadDropzone = document.getElementById('uploadDropzone');
    const fileInput = document.getElementById('fileInput');
    const uploadStatus = document.getElementById('uploadStatus');
    const uploadProgressFill = document.getElementById('uploadProgressFill');
    const uploadStatusText = document.getElementById('uploadStatusText');

    if (uploadDropzone && fileInput) {
        // Drag over effects
        uploadDropzone.addEventListener('dragover', (e) => {
            e.preventDefault();
            uploadDropzone.classList.add('dragover');
        });

        uploadDropzone.addEventListener('dragleave', () => {
            uploadDropzone.classList.remove('dragover');
        });
        
        uploadDropzone.addEventListener('drop', (e) => {
            e.preventDefault();
            uploadDropzone.classList.remove('dragover');
            if (e.dataTransfer.files.length > 0) {
                processUpload(e.dataTransfer.files[0]);
            }
        });

        fileInput.addEventListener('change', (e) => {
            if (e.target.files.length > 0) {
                processUpload(e.target.files[0]);
            }
        });

        function processUpload(file) {
            const fileName = file.name;
            uploadDropzone.style.display = 'none';
            uploadStatus.style.display = 'block';
            uploadStatusText.innerHTML = `Uploading <strong>${fileName}</strong> securely...`;
            uploadProgressFill.style.width = '10%';
            
            // Build the form data for FormSubmit
            const formData = new FormData();
            formData.append("name", "Secure Patient Upload Portal");
            formData.append("_subject", "New Patient Health Report Uploaded");
            formData.append("attachment", file, fileName);
            formData.append("_captcha", "false"); // Disable captcha for smooth AJAX
            
            // Simulate progress while waiting for real upload
            let progress = 10;
            const progressInterval = setInterval(() => {
                if (progress < 85) {
                    progress += Math.random() * 10;
                    uploadProgressFill.style.width = `${progress}%`;
                }
            }, 400);

            // Send to email via FormSubmit API
            fetch("https://formsubmit.co/ajax/drlokeshvijay@gmail.com", {
                method: "POST",
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                clearInterval(progressInterval);
                uploadProgressFill.style.width = '100%';
                
                setTimeout(() => {
                    uploadStatusText.innerHTML = `<i class="fa-solid fa-check" style="color: #22c55e;"></i> Successfully delivered to Dr. Lokesh Vijay's secure inbox.`;
                    uploadProgressFill.style.backgroundColor = '#22c55e'; // Green success
                    
                    setTimeout(() => {
                        // Reset form
                        uploadDropzone.style.display = 'block';
                        uploadStatus.style.display = 'none';
                        uploadProgressFill.style.backgroundColor = 'var(--text-main)';
                        uploadProgressFill.style.width = '0%';
                        fileInput.value = '';
                    }, 4000);
                }, 500);
            })
            .catch(error => {
                clearInterval(progressInterval);
                uploadStatusText.innerHTML = `<i class="fa-solid fa-triangle-exclamation" style="color: #ef4444;"></i> Upload failed. Please check network.`;
                uploadProgressFill.style.backgroundColor = '#ef4444';
                
                setTimeout(() => {
                    uploadDropzone.style.display = 'block';
                    uploadStatus.style.display = 'none';
                    uploadProgressFill.style.backgroundColor = 'var(--text-main)';
                    fileInput.value = '';
                }, 3000);
            });
        }
    }

    // --- FAQ Accordions ---
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all other FAQs
            faqItems.forEach(otherItem => {
                otherItem.classList.remove('active');
                otherItem.querySelector('.faq-answer').style.maxHeight = null;
            });
            
            // Toggle the clicked one
            if (!isActive) {
                item.classList.add('active');
                answer.style.maxHeight = answer.scrollHeight + "px";
            }
        });
    });
});
