export function genActiveRule(routerPrefix: string) {
    return (location: Location): boolean => {
        return location.pathname.startsWith(routerPrefix);
    };
}
