export function readFile(file: File | Blob): Promise<ArrayBuffer> {
    return new Promise((resolve, reject) => {
        // Create file reader
        let reader = new FileReader();

        // Register event listeners
        reader.addEventListener('loadend', (event) => resolve(event.target!.result as ArrayBuffer));
        reader.addEventListener('error', reject);

        // Read file
        reader.readAsArrayBuffer(file);
    });
}
