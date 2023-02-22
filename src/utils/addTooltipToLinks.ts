/**
 *
 * @generator https://sharegpt.com/c/sbKz8rA
 */
export function addTooltipToLinks(element: HTMLElement) {
    const seltUrl = new URL(window.location.href);

    const links = element.querySelectorAll('a');
    for (const link of links) {
        const url = new URL(link.href);

        if (url.origin !== seltUrl.origin) {
            continue;
        }

        const tooltip = document.createElement('div');
        tooltip.classList.add('tooltip');
        tooltip.style.position = 'fixed';
        tooltip.style.visibility = 'hidden';
        tooltip.style.width = '300px';
        tooltip.style.height = '200px';
        tooltip.style.border = 'none';
        tooltip.style.zIndex = '10000';
        document.body.appendChild(tooltip);

        link.addEventListener('mouseover', (event) => {
            const iframe = document.createElement('iframe');
            iframe.src = url.href;

            iframe.style.width = '100%';
            iframe.style.height = '100%';
            iframe.style.border = 'none';
            iframe.style.overflow = 'hidden';
            //iframe.style.border = '1px solid #888';
            iframe.style.boxShadow = '#333 0 0 10px';
            iframe.style.borderRadius = '6px';
            tooltip.appendChild(iframe);
            tooltip.style.top = `${event.clientY + 10}px`;
            tooltip.style.left = `${event.clientX + 10}px`;
            tooltip.style.visibility = 'visible';
        });

        link.addEventListener('mousemove', (event) => {
            tooltip.style.top = `${event.clientY + 10}px`;
            tooltip.style.left = `${event.clientX + 10}px`;
        });

        link.addEventListener('mouseout', () => {
            tooltip.style.visibility = 'hidden';
            tooltip.innerHTML = '';
        });
    }
}
