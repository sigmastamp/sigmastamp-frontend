/**
 * Note: Routes are in separate javascript (not typescript) file to allow it import from postprocess-build script
 */

export const ROUTES = {
    // Currently used pages:
    VerificationPage: '/verify',
    Blockchains: '/blockchains',
    Oracles: '/oracles',
    SampleCertificates: '/sample-certificates',
    Faq: '/faq',
    Playground: '/playground',
    TechnicalStatus: '/status',
    About: '/about',
    HowItWorks: '/manual',
    Mobile: '/mobile-device',

    // Deprecated pages (but kept because they are still referenced somewhere):
    FirstCertificate: '/',
};
