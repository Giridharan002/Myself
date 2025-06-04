import pdf from 'pdf-parse';

export async function extractTextFromPDF(buffer) {
  try {
    const data = await pdf(buffer);
    
    // Clean and format the extracted text
    let text = data.text;
    
    // Remove excessive whitespace and line breaks
    text = text.replace(/\s+/g, ' ').trim();
    
    // Remove page numbers and common PDF artifacts
    text = text.replace(/Page \d+ of \d+/gi, '');
    text = text.replace(/^\d+\s*$/gm, ''); // Remove standalone numbers
    
    // Ensure we have meaningful content
    if (text.length < 50) {
      throw new Error('PDF appears to be empty or contains insufficient text');
    }
    
    console.log('Extracted text length:', text.length);
    console.log('First 200 characters:', text.substring(0, 200));
    
    return text;
  } catch (error) {
    console.error('PDF processing error:', error);
    throw new Error(`Failed to process PDF: ${error.message}`);
  }
}

export function validatePDFBuffer(buffer) {
  if (!buffer || buffer.length === 0) {
    throw new Error('Invalid PDF buffer');
  }
  
  // Check PDF header
  const header = buffer.toString('ascii', 0, 4);
  if (header !== '%PDF') {
    throw new Error('Invalid PDF file format');
  }
  
  return true;
}
