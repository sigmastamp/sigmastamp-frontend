export function findDeepestChild(element: HTMLElement): HTMLElement {
    if (element.children.length === 0) {
        return element;
    } else {
        return findDeepestChild(element.children[0] as HTMLElement);
    }
}
