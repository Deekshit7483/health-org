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
  