namespace MyEv {
    export interface Organization {
        id?: string;
        abbrev?: string;
        addresses?: Address[];
        logo_uri?: string;
        name?: string;
        type?: string;
        url?: string;
    }

    export interface Address {
        city?: string;
        is_primary?: boolean;
        line1?: string;
        postal_code?: string;
        state?: string;
    }
}
