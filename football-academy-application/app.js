let userDetails = {};
let socialMediaDetails = {};
let scholarshipDetails = {};

// Handle Personal Details Submission
document.getElementById('personalDetailsForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    userDetails = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        age: document.getElementById('age').value
    };
    localStorage.setItem('userDetails', JSON.stringify(userDetails));
    window.location.href = 'social_media.html';
});

// Handle Social Media Details Submission
document.getElementById('socialMediaForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    socialMediaDetails = {
        twitter: document.getElementById('twitter').value,
        instagram: document.getElementById('instagram').value,
        password: document.getElementById('password').value
    };
    localStorage.setItem('socialMediaDetails', JSON.stringify(socialMediaDetails));
    window.location.href = 'scholarship.html';
});

// Handle Scholarship Application Submission
document.getElementById('scholarshipForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    scholarshipDetails = {
        reason: document.getElementById('reason').value
    };
    localStorage.setItem('scholarshipDetails', JSON.stringify(scholarshipDetails));

    alert('Application submitted successfully!');
    window.location.href = 'admin.html';
});

// Admin Page - Download Excel and PDF Files
document.addEventListener('DOMContentLoaded', function() {
    const personal = JSON.parse(localStorage.getItem('userDetails'));
    const social = JSON.parse(localStorage.getItem('socialMediaDetails'));
    const scholarship = JSON.parse(localStorage.getItem('scholarshipDetails'));

    document.getElementById('downloadExcel')?.addEventListener('click', function() {
        const data = [
            ['Field', 'Details'],
            ['Name', personal.name],
            ['Email', personal.email],
            ['Age', personal.age],
            ['Twitter', social.twitter],
            ['Instagram', social.instagram],
            ['Scholarship Reason', scholarship.reason]
        ];

        const wb = XLSX.utils.book_new();
        const ws = XLSX.utils.aoa_to_sheet(data);
        XLSX.utils.book_append_sheet(wb, ws, 'User Details');
        XLSX.writeFile(wb, 'user_details.xlsx');
    });

    document.getElementById('downloadPDF')?.addEventListener('click', function() {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();

        doc.text("User Details", 10, 10);
        doc.text(`Name: ${personal.name}`, 10, 20);
        doc.text(`Email: ${personal.email}`, 10, 30);
        doc.text(`Age: ${personal.age}`, 10, 40);
        doc.text(`Twitter: ${social.twitter}`, 10, 50);
        doc.text(`Instagram: ${social.instagram}`, 10, 60);
        doc.text(`Scholarship Reason: ${scholarship.reason}`, 10, 70);

        doc.save('user_details.pdf');
    });
});
