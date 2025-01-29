function updateBranchInfo() {
    const branchInfo = {
      karnataka: {
        name: "Karnataka",
        address: "113, Royal Corner No 1 & 2, Lal Bagh Road, Bengaluru – 560027",
        contactPerson: "Mr. M. Prakashan, State Head - Karnataka",
        email: "bangalore@helpageindia.org",
        contact: "080-22213107/22124594 / 9980355166",
      },
      maharashtra: {
        name: "Maharashtra",
        address: "123, XYZ Building, Shivaji Road, Pune – 411004",
        contactPerson: "Mr. A. Kulkarni, State Head - Maharashtra",
        email: "maharashtra@helpageindia.org",
        contact: "020-12345678 / 9876543210",
      },
      tamilnadu: {
        name: "Tamil Nadu",
        address: "456, ABC Street, Anna Nagar, Chennai – 600040",
        contactPerson: "Ms. B. Nandini, State Head - Tamil Nadu",
        email: "tamilnadu@helpageindia.org",
        contact: "044-87654321 / 9098765432",
      },
    };
  
    const selectedBranch = document.getElementById("branch-select").value;
    const branchDetails = branchInfo[selectedBranch];
    const branchInfoDiv = document.getElementById("branch-info");
  
    branchInfoDiv.innerHTML = `
      <h3>${branchDetails.name}</h3>
      <p>${branchDetails.address}</p>
      <p><strong>Contact Person:</strong> ${branchDetails.contactPerson}</p>
      <p><strong>E-mail:</strong> ${branchDetails.email}</p>
      <p><strong>Contact:</strong> ${branchDetails.contact}</p>
    `;
  }
  

  // Array to store form submissions
let formSubmissions = [];

// Function to handle form submission
function handleFormSubmit(event) {
    event.preventDefault();
    
    // Get form data
    const formData = {
        timestamp: new Date().toLocaleString(),
        firstName: event.target.querySelector('input[placeholder="First Name"]').value,
        lastName: event.target.querySelector('input[placeholder="Last Name"]').value,
        email: event.target.querySelector('input[type="email"]').value,
        phone: event.target.querySelector('input[type="tel"]').value,
        queryType: event.target.querySelector('input[name="query"]:checked').value,
        message: event.target.querySelector('textarea').value
    };
    
    // Add to submissions array
    formSubmissions.push(formData);
    
    // Save to localStorage as backup
    localStorage.setItem('formSubmissions', JSON.stringify(formSubmissions));
    
    // Convert to CSV and trigger download
    downloadCSV();
    
    // Clear form
    event.target.reset();
    alert('Thank you for your submission!');
}

// Function to convert data to CSV and download
function downloadCSV() {
    // CSV headers
    const headers = [
        'Timestamp',
        'First Name',
        'Last Name',
        'Email',
        'Phone',
        'Query Type',
        'Message'
    ];
    
    // Create CSV content
    let csvContent = headers.join(',') + '\n';
    
    formSubmissions.forEach(submission => {
        const row = [
            submission.timestamp,
            submission.firstName,
            submission.lastName,
            submission.email,
            submission.phone,
            submission.queryType,
            `"${submission.message.replace(/"/g, '""')}"` // Escape quotes in message
        ];
        csvContent += row.join(',') + '\n';
    });
    
    // Create and trigger download
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', `contact_form_submissions_${new Date().toISOString().slice(0,10)}.csv`);
    link.style.display = 'none';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// Function to load saved submissions from localStorage
function loadSavedSubmissions() {
    const saved = localStorage.getItem('formSubmissions');
    if (saved) {
        formSubmissions = JSON.parse(saved);
    }
}

// Add download button to form
function addDownloadButton() {
    const form = document.querySelector('.contact-form form');
    const downloadDiv = document.createElement('div');
    downloadDiv.className = 'form-group download-section';
    downloadDiv.innerHTML = `
        <button type="button" onclick="downloadCSV()" class="download-btn">
            Download All Submissions (CSV)
        </button>
    `;
    form.appendChild(downloadDiv);
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    loadSavedSubmissions();
    addDownloadButton();
    
    // Add form submit handler
    const form = document.querySelector('.contact-form form');
    form.addEventListener('submit', handleFormSubmit);
});