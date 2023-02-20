/**
 * Note: Routes are in separate javascript (not typescript) file to allow it import from postprocess-build script
 */

export const ROUTES = {
    // Currently used pages:
    VerificationPage: '/verify',
    Blockchains: '/blockchains',
    Oracles: '/oracles',
    SampleCertificates: '/sample-certificates',
    HowItWorks: '/manual',
    Faq: '/faq',
    TechnicalStatus: '/status',
    About: '/about',
    Playground: '/playground',

    // Deprecated pages (but kept because they are still referenced somewhere):
    FirstCertificate: '/',
};
