document.addEventListener('DOMContentLoaded', () => {
    const profileImageInput = document.getElementById('image-upload');
    const profileImage = document.getElementById('profile-image');
    const generatePdfButton = document.getElementById('generate-pdf');
    // image url isme dalengy malik 
    let imageDataURL = null; 
// image upload krne wala mamla 
    profileImageInput.addEventListener('change', (event) => {
 const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {

        profileImage.src = e.target.result;
                imageDataURL = e.target.result; 
            };
            reader.readAsDataURL(file);
        }
    });

    generatePdfButton.addEventListener('click', () => {
        const fields = [

        'first-name', 'last-name', 'contact', 'email', 'city',
            'degree', 'institution', 'graduation-year',
            'job-title', 'company', 'experience-years',
            'skills'
        ];
        
        let allFilled = true;
        fields.forEach(id => {

            const value = document.getElementById(id).value.trim();
            if (!value) {
                allFilled = false;
            }
        });
    // condition laga di agr sb input field filll hon tbhi generate ho cv 
        if (!allFilled) {
            alert('Please fill out all fields before generating the PDF.');
            return; // Exit the function if not all fields are filled
        }

//  import krlia pdf ko 
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();

    // agr image ho to add kro 
        if (imageDataURL) {
            doc.addImage(imageDataURL, 'PNG', 10, 10, 50, 50); // Adjust size and position as needed
        }

// pdf me add krne wala mamla 
        doc.setFontSize(18);
        doc.text('Resume', 10, 70); 
        doc.setFontSize(12);
        doc.text(`Name: ${document.getElementById('first-name').value} ${document.getElementById('last-name').value}`, 10, 80);
    doc.text(`Contact: ${document.getElementById('contact').value}`, 10, 90);
        doc.text(`Email: ${document.getElementById('email').value}`, 10, 100);
       doc.text(`City: ${document.getElementById('city').value}`, 10, 110);
      doc.text('Education', 10, 120);
     doc.text(`Degree: ${document.getElementById('degree').value}`, 10, 130);
        doc.text(`Institution: ${document.getElementById('institution').value}`, 10, 140);
        doc.text(`Year of Graduation: ${document.getElementById('graduation-year').value}`, 10, 150);
        doc.text('Working Experience', 10, 160);
        doc.text(`Job Title: ${document.getElementById('job-title').value}`, 10, 170);
        doc.text(`Company: ${document.getElementById('company').value}`, 10, 180);
        doc.text(`Years of Experience: ${document.getElementById('experience-years').value}`, 10, 190);
        doc.text('Skills', 10, 200);
        doc.text(`Skills: ${document.getElementById('skills').value}`, 10, 210);

        const existingViewButton = document.getElementById('view-button');

        // condition jab tamam input fields fill honi cheye 
        if (existingViewButton) {

            existingViewButton.remove();

        }
const existingDownloadButton = document.getElementById('download-button');

if (existingDownloadButton) {

    existingDownloadButton.remove();        }
        // live dekhne ka button 
 
// download button ka kaam 
        
const downloadButton = document.createElement('button');
         downloadButton.id = 'download-button';
    downloadButton.className = 'btn btn-primary';
            downloadButton.textContent = 'Download PDF';
     downloadButton.onclick = () => {
            doc.save('resume.pdf');
        };

        // Append the buttons to the body
     
        document.body.appendChild(downloadButton);
    });
}); 