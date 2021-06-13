import * as React from 'react';

export function Loader() {
    return (
        <div className="loading-overlay">
            {/* TODO: Please @roseckyj  loader that would cover only its area not the whole modal, */}
            {/* TODO: Please @roseckyj make it universal to use it in every layout type - small icon, fullscreen, modal, etc,... */}
            {/* TODO: Please @roseckyj untite with LoaderInline */}
            <div className="spinner"></div>
        </div>
    );
}