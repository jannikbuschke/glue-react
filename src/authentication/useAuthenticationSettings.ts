import * as React from 'react';
import { useData } from '../data/useData';

interface AuthenticationSettings {
    clientId: string
    tenantId: string
}

export function useAuthenticationSettings() {
    const settings = useData<AuthenticationSettings>("/api/AuthenticationSettings?api-version=2.0")
    return settings
}