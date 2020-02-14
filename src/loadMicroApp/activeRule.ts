export function genActiveRule(routerPrefix: string) {
    return (location: Location): boolean => location.pathname.startsWith(routerPrefix);
}
