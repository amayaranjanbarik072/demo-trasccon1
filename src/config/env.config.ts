export type EnvName =
    | 'demo_tras'
    | 'demo_keus'
    | 'trasccon_getapcs'
    | 'wyz_getapcs'
    | 'demo_geeyes';

export const ENV_CONFIG = {
    demo_tras: {
        baseUrl: 'https://demo-tras.getapcs.com',
        credentials: {
            username: 'amaya@mail.com',
            password: 'amaya@123',
            unit: 'Bangalore',
        }
    },
    demo_keus: {
        baseUrl: 'https://demo_keus.getapcs.com',
        credentials: {
            username: 'admin@mail.com',
            password: 'Keusadmin@2025',
            unit: 'Bangalore',
        }
    },
    trasccon_getapcs: {
        baseUrl: 'https://trasccon.getapcs.com',
        credentials: {
            username: 'amaya@mail.com',
            password: 'Qwerty@123',
            unit: 'Chennai',
        }
    },
    wyz_getapcs: {
        baseUrl: 'https://wyz.getapcs.com',
        credentials: {
            username: 'admin@mail.com',
            password: 'AATr@ns@2025',
            unit: 'Bangalore',
        }
    },
    demo_geeyes: {
        baseUrl: 'https://geeyes-demo.getapcs.com',
        credentials: {
            username: 'amaya@mail.com',
            password: 'amaya@123',
            unit: 'Bangalore',
        }
    }
} as const;


