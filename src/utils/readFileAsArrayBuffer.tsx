export function readFileAsArrayBuffer(file: File | Blob): Promise<ArrayBuffer> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.addEventListener('loadend', (event) =>
            resolve(event.target!.result as ArrayBuffer),
        );
        reader.addEventListener('error', reject);

        reader.readAsArrayBuffer(file);
    });
}
