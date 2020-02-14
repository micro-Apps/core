export function genActiveRule(routerPrefix: string) {
    return (location: Location) => location.pathname.startsWith(routerPrefix);
}
