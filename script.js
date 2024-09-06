// Initialize Supabase
const { createClient } = supabase;
const supabaseUrl = 'https://edtlzmjyshstofnskogy.supabase.co';  // Replace with your Supabase project URL
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVkdGx6bWp5c2hzdG9mbnNrb2d5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjU2Mzg2MTUsImV4cCI6MjA0MTIxNDYxNX0.wkrNp4MP5Yhgv3S1kNyav9nTU5eFI4_mT_UxD0UOrbA';  // Replace with your Supabase public API key
const supabase = createClient(supabaseUrl, supabaseKey);

// Handle form submission
document.getElementById('signup-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    // Handle file upload
    const resumeFile = formData.get('Resume');
    const { data: fileData, error: fileError } = await supabase.storage
        .from('resumes')
        .upload(`public/${resumeFile.name}`, resumeFile);

    if (fileError) {
        console.error('Error uploading file:', fileError);
        return;
    }

    const { data, error } = await supabase
        .from('resumes')
        .insert([
            {
                name: formData.get('name'),
                year: formData.get('Year'),
                department: formData.get('department'),
                resume_url: fileData.Key // Store file URL or path
            }
        ]);

    if (error) {
        console.error('Error uploading resume details:', error);
        return;
    }

    // Show success modal
    document.getElementById('successModal').style.display = 'block';
});

document.getElementById('okButton').addEventListener('click', () => {
    document.getElementById('successModal').style.display = 'none';
});