export function randomPort(): number {
    return Math.floor(Math.random() * (65535 - 1024)) + 1024;
}
